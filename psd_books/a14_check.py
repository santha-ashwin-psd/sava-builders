"""A14 live check: supplier bill (purchase invoice) with eTIMS number, paid in part and in full.

Put this file in the app folder (next to a13_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a14_check.run

Needs the TEST company and suppliers from the a7 seed. Everything goes through the real controllers.
Each check prints OK or FAILED with the reason. INFO lines are not pass/fail.

Scenarios:
	A  a bill is saved with its KRA eTIMS CU invoice number and is outstanding for the full amount
	B  a part payment reduces the outstanding amount and moves the bill to Partly Paid
	C  paying the rest makes it Paid with nothing outstanding
	D  paying more than is outstanding is blocked
"""
import frappe
from frappe.utils import flt, nowdate

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A

ok, fail, check = A.ok, A.fail, A.check
expect_block = A.expect_block
ETIMS = "CU-TEST-0001"


def _accounts():
	payable = frappe.db.get_value("Account", {"account_type": "Payable", "company": S.CO, "is_group": 0}, "name")
	bank = (frappe.db.get_value("Account", {"account_type": "Bank", "company": S.CO, "is_group": 0}, "name")
		or frappe.db.get_value("Account", {"account_type": "Cash", "company": S.CO, "is_group": 0}, "name"))
	return payable, bank


def _expense():
	from psd_books.api.docs import _default_expense_account
	return _default_expense_account(S.CO)


def _supplier():
	return frappe.get_all("Supplier", filters={"disabled": 0}, pluck="name", limit=1)[0]


def _bill(amount_qty=10, rate=1000):
	payable, _ = _accounts()
	pi = frappe.get_doc({
		"doctype": "Purchase Invoice", "supplier": _supplier(), "company": S.CO, "posting_date": nowdate(),
		"bill_no": "SUP-TEST-A14", "etims_cu_invoice_no": ETIMS, "project": S.PROJECT,
		"credit_to": payable, "expense_account": _expense(), "update_stock": 0,
		"items": [{"item_code": S.ITEM, "item_name": S.ITEM, "qty": amount_qty, "rate": rate, "uom": "Bag",
			"expense_account": _expense()}]})
	pi.flags.ignore_permissions = True
	pi.insert()
	pi.submit()
	frappe.db.commit()
	return pi.name


def _pay(pi_name, amount):
	payable, bank = _accounts()
	pe = frappe.get_doc({
		"doctype": "Payment Entry", "payment_type": "Pay", "party_type": "Supplier", "party": _supplier(),
		"payment_date": nowdate(), "company": S.CO, "paid_amount": amount,
		"paid_from": bank, "paid_to": payable,
		"references": [{"reference_doctype": "Purchase Invoice", "reference_name": pi_name,
			"allocated_amount": amount}]})
	pe.flags.ignore_permissions = True
	pe.insert()
	pe.submit()
	frappe.db.commit()
	return pe.name


def _state(pi_name):
	return frappe.db.get_value("Purchase Invoice", pi_name, ["grand_total", "outstanding_amount", "status",
		"etims_cu_invoice_no", "docstatus"], as_dict=True)


def run():
	frappe.set_user("Administrator")
	payable, bank = _accounts()
	check("payable and bank accounts exist for the TEST company", bool(payable and bank), (payable, bank))

	print("\n--- A: bill with eTIMS number ---")
	pi = _bill()
	s = _state(pi)
	check("bill submitted", s.docstatus == 1, s)
	check("eTIMS CU invoice number kept", s.etims_cu_invoice_no == ETIMS, s.etims_cu_invoice_no)
	total = flt(s.grand_total)
	check("outstanding is the full amount", flt(s.outstanding_amount) == total, (s.outstanding_amount, total))
	check("status Submitted before any payment", s.status == "Submitted", s.status)

	print("\n--- B: part payment ---")
	part = round(total * 0.4, 2)
	_pay(pi, part)
	s = _state(pi)
	check("outstanding reduced by the part payment", abs(flt(s.outstanding_amount) - (total - part)) < 0.01,
		(s.outstanding_amount, total - part))
	check("status Partly Paid", s.status == "Partly Paid", s.status)

	print("\n--- C: pay the rest ---")
	_pay(pi, round(total - part, 2))
	s = _state(pi)
	check("nothing outstanding", abs(flt(s.outstanding_amount)) < 0.01, s.outstanding_amount)
	check("status Paid", s.status == "Paid", s.status)

	print("\n--- D: overpayment blocked ---")
	expect_block("paying more than is outstanding blocked",
		lambda: _pay(pi, 1), "outstanding", "exceed", "more than")

	print("\nDONE    see OK/FAILED lines above")