"""Logic tests for the Labour Weekly Bill rules (no database needed).

Run in the bench:
    bench --site sava run-tests --app psd_books --module psd_books.invoicing.doctype.labour_weekly_bill.test_labour_weekly_bill
"""
import datetime
import sys
import types
import unittest
from unittest import mock

try:
	import frappe  # noqa: F401
except ImportError:  # plain-python run outside a bench
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s
	fm.db = mock.MagicMock()

	class _Err(Exception):
		pass

	def _throw(msg, title=None):
		raise _Err(msg)

	fm.throw = _throw
	fm.whitelist = lambda *a, **k: (lambda f: f)
	fm.get_all = mock.MagicMock(return_value=[])
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	utils.getdate = lambda d=None: d if isinstance(d, datetime.date) else datetime.date.fromisoformat(str(d)[:10])
	utils.nowdate = lambda: "2026-11-14"
	fm.model, model.document, fm.utils = model, document, utils
	sys.modules.update({"frappe": fm, "frappe.model": model, "frappe.model.document": document, "frappe.utils": utils})

import frappe  # noqa: E402,F811
from psd_books.invoicing.doctype.labour_weekly_bill import labour_weekly_bill as wb  # noqa: E402

GOOD = {"LCON-1": {"contractor_name": "Kamau", "disabled": 0, "tax_cert_expiry": "2027-03-31"}}


def ln(contract="LC-1", amount=100, balance=500, contractor="LCON-1"):
	return {"contract": contract, "contractor": contractor, "amount_to_pay": amount, "balance": balance}


class Doc:
	def __init__(self, status="Draft", new=False):
		self.name, self.status, self._new = "LWB-1", status, new
		self.raised_by = self.approved_by = self.approved_on = self.rejection_reason = None
		self.flags = types.SimpleNamespace(get=lambda k, d=None: getattr(self.flags, k, d))

	def is_new(self):
		return self._new


class TestWeek(unittest.TestCase):
	def test_any_day_moves_to_saturday(self):
		for d in ("2026-11-14", "2026-11-18", "2026-11-20"):  # Sat, Wed, Fri
			self.assertEqual(wb.monday_of(d), datetime.date(2026, 11, 14))
		self.assertEqual(wb.monday_of("2026-11-21"), datetime.date(2026, 11, 21))

	def test_friday(self):
		self.assertEqual(wb.sunday_of("2026-11-18"), datetime.date(2026, 11, 20))

	def test_across_month_and_year(self):
		self.assertEqual(wb.monday_of("2027-01-01"), datetime.date(2026, 12, 26))
		self.assertEqual(wb.sunday_of("2027-01-01"), datetime.date(2027, 1, 1))


class TestAmounts(unittest.TestCase):
	def test_balance(self):
		self.assertEqual(wb.balance_of(500000, 270000, 30000), 200000)

	def test_amount_within_balance_ok_and_equal_ok(self):
		self.assertEqual(wb.amount_errors([ln(amount=500, balance=500), ln(amount=0, balance=0)]), [])

	def test_amount_above_balance(self):
		self.assertEqual(len(wb.amount_errors([ln(amount=501, balance=500)])), 1)

	def test_negative_amount(self):
		self.assertEqual(len(wb.amount_errors([ln(amount=-1)])), 1)


class TestBlockers(unittest.TestCase):
	def test_clean(self):
		self.assertEqual(wb.blockers([ln()], GOOD, "2026-11-14"), [])

	def test_needs_an_amount(self):
		self.assertEqual(len(wb.blockers([ln(amount=0)], GOOD, "2026-11-14")), 1)
		self.assertEqual(len(wb.blockers([], GOOD, "2026-11-14")), 1)

	def test_expired_certificate_blocks_only_paid_lines(self):
		bad = {"LCON-1": dict(GOOD["LCON-1"], tax_cert_expiry="2026-09-30"), "LCON-2": GOOD["LCON-1"]}
		self.assertEqual(len(wb.blockers([ln(contractor="LCON-1"), ln("LC-2", contractor="LCON-2")], bad, "2026-11-14")), 1)
		# an unpaid line of an expired contractor does not block
		self.assertEqual(wb.blockers([ln(amount=0, contractor="LCON-1"), ln("LC-2", contractor="LCON-2")], bad, "2026-11-14"), [])

	def test_certificate_expiring_today_is_valid(self):
		ok = {"LCON-1": dict(GOOD["LCON-1"], tax_cert_expiry="2026-11-14")}
		self.assertEqual(wb.blockers([ln()], ok, "2026-11-14"), [])

	def test_inactive_contractor(self):
		self.assertEqual(len(wb.blockers([ln()], {"LCON-1": dict(GOOD["LCON-1"], disabled=1)}, "2026-11-14")), 1)

	def test_over_balance_blocks(self):
		self.assertEqual(len(wb.blockers([ln(amount=600, balance=500)], GOOD, "2026-11-14")), 1)


class TestWorkflow(unittest.TestCase):
	def test_send_then_director_approves(self):
		d = Doc()
		wb.send_for_approval(d, [], "a@x")
		self.assertEqual((d.status, d.raised_by), ("Pending approval", "a@x"))
		wb.approve(d, [], "d@x", ["Director"], "now")
		self.assertEqual((d.status, d.approved_by), ("Approved", "d@x"))

	def test_only_draft_or_sent_back_can_be_sent(self):
		for st in ("Pending approval", "Approved", "Paid", "Cancelled"):
			with self.assertRaises(Exception):
				wb.send_for_approval(Doc(st), [], "a@x")
		wb.send_for_approval(Doc("Sent back"), [], "a@x")

	def test_send_refused_with_problems(self):
		with self.assertRaises(Exception):
			wb.send_for_approval(Doc(), ["x"], "a@x")

	def test_books_admin_without_director_cannot_approve(self):
		with self.assertRaises(Exception):
			wb.approve(Doc("Pending approval"), [], "a@x", ["Admin", "Books Admin"], "now")

	def test_approve_needs_pending_and_no_problems(self):
		with self.assertRaises(Exception):
			wb.approve(Doc(), [], "d@x", ["Director"], "now")
		with self.assertRaises(Exception):
			wb.approve(Doc("Pending approval"), ["Certificate expired"], "d@x", ["Director"], "now")

	def test_mark_paid(self):
		d = Doc("Approved")
		for roles in (["Site Engineer"], ["Books Admin"], []):
			with self.assertRaises(Exception):
				wb.mark_paid(d, "s@x", roles, "now")
		wb.mark_paid(d, "d@x", ["Director"], "now")
		self.assertEqual((d.status, d.paid_by, d.paid_on), ("Paid", "d@x", "now"))
		for role in ("Purchase Manager", "Admin"):
			e = Doc("Approved")
			wb.mark_paid(e, "u@x", [role], "now")
			self.assertEqual((e.status, e.paid_by), ("Paid", "u@x"))
		for st in ("Draft", "Pending approval", "Sent back", "Paid"):
			with self.assertRaises(Exception):
				wb.mark_paid(Doc(st), "d@x", ["Director"], "now")

	def test_reopen_unpaid_cancel(self):
		d = Doc("Approved")
		d.approved_by, d.approved_on = "d@x", "t"
		with self.assertRaises(Exception):
			wb.reopen(d, "a@x", ["Books Admin"])
		wb.reopen(d, "d@x", ["Director"])
		self.assertEqual((d.status, d.approved_by, d.approved_on), ("Draft", None, None))
		for st in ("Draft", "Pending approval", "Paid", "Cancelled"):
			with self.assertRaises(Exception):
				wb.reopen(Doc(st), "d@x", ["Director"])
		p = Doc("Paid")
		p.paid_by, p.paid_on = "d@x", "t"
		with self.assertRaises(Exception):
			wb.mark_unpaid(p, "a@x", ["Books Admin"])
		wb.mark_unpaid(p, "d@x", ["Director"])
		self.assertEqual((p.status, p.paid_by, p.paid_on), ("Approved", None, None))
		with self.assertRaises(Exception):
			wb.mark_unpaid(Doc("Approved"), "d@x", ["Director"])

	def test_cancel_needs_approved_director_and_reason(self):
		with self.assertRaises(Exception):
			wb.cancel(Doc("Paid"), "d@x", ["Director"], "wrong", "now")  # mark unpaid first
		for st in ("Draft", "Pending approval", "Sent back", "Cancelled"):
			with self.assertRaises(Exception):
				wb.cancel(Doc(st), "d@x", ["Director"], "wrong", "now")
		with self.assertRaises(Exception):
			wb.cancel(Doc("Approved"), "a@x", ["Books Admin"], "wrong", "now")
		with self.assertRaises(Exception):
			wb.cancel(Doc("Approved"), "d@x", ["Director"], "  ", "now")
		d = Doc("Approved")
		wb.cancel(d, "d@x", ["Director"], "entered twice", "now")
		self.assertEqual((d.status, d.cancel_reason, d.cancelled_by, d.cancelled_on), ("Cancelled", "entered twice", "d@x", "now"))

	def test_can_delete(self):
		self.assertTrue(wb.can_delete("Draft", None))
		self.assertTrue(wb.can_delete("Cancelled", "a@x"))
		self.assertTrue(wb.can_delete("Sent back", "a@x"))
		for st in ("Draft", "Pending approval", "Approved", "Paid"):
			self.assertFalse(wb.can_delete(st, "a@x"))
		self.assertFalse(wb.can_delete("Approved", None))

	def test_send_back(self):
		d = Doc("Pending approval")
		with self.assertRaises(Exception):
			wb.send_back(d, "d@x", ["Director"], " ")
		with self.assertRaises(Exception):
			wb.send_back(d, "a@x", ["Admin"], "wrong")
		wb.send_back(d, "d@x", ["Director"], "wrong amount")
		self.assertEqual((d.status, d.rejection_reason), ("Sent back", "wrong amount"))
		wb.send_for_approval(d, [], "a@x")
		self.assertIsNone(d.rejection_reason)


class TestEditLock(unittest.TestCase):
	def test_locked(self):
		for st in ("Pending approval", "Approved", "Paid", "Cancelled"):
			with self.assertRaises(Exception):
				wb.check_edit(Doc(st), st)

	def test_editable(self):
		for st in ("Draft", "Sent back"):
			wb.check_edit(Doc(st), st)

	def test_status_not_editable_and_workflow_flag_bypasses(self):
		with self.assertRaises(Exception):
			wb.check_edit(Doc("Approved"), "Draft")
		d = Doc("Approved")
		d.flags.lwb_workflow = True
		wb.check_edit(d, "Pending approval")

	def test_new_starts_draft(self):
		d = Doc("", new=True)
		wb.check_edit(d, None)
		self.assertEqual(d.status, "Draft")
		with self.assertRaises(Exception):
			wb.check_edit(Doc("Approved", new=True), None)


class FakeBill:
	"""Minimal stand-in for the document, to run sync_lines against mocked database calls."""
	def __init__(self, lines=(), name="LWB-1", new=False):
		self.name, self.project, self._new = name, "P1", new
		self.lines = [types.SimpleNamespace(contract=c, amount_to_pay=a) for c, a in lines]
		self.total_amount = 0

	def get(self, k, d=None):
		return getattr(self, k, d)

	def is_new(self):
		return self._new

	def set(self, k, v):
		setattr(self, k, v)

	def append(self, k, row):
		self.lines.append(types.SimpleNamespace(**row))


class TestSync(unittest.TestCase):
	def setUp(self):
		cons = [types.SimpleNamespace(name="LC-1", contractor="LCON-1", contract_value=500000),
			types.SimpleNamespace(name="LC-2", contractor="LCON-2", contract_value=750000)]
		p1 = mock.patch.object(wb, "approved_contracts", return_value=cons)
		p2 = mock.patch.object(frappe.db, "sql", return_value=[("LC-2", "Paid", 270000), ("LC-2", "Approved", 10000), ("LC-2", "Pending approval", 20000)])
		p1.start(); p2.start()
		self.addCleanup(p1.stop); self.addCleanup(p2.stop)

	def test_figures(self):
		f = {r["contract"]: r for r in wb.figures("P1", "LWB-1")}
		self.assertEqual((f["LC-1"]["paid_till_now"], f["LC-1"]["balance"]), (0, 500000))
		self.assertEqual((f["LC-2"]["paid_till_now"], f["LC-2"]["pending_amount"], f["LC-2"]["balance"]), (270000, 30000, 450000))

	def test_sync_keeps_amounts_and_totals(self):
		b = FakeBill([("LC-2", 100000)])
		self.assertEqual(wb.sync_lines(b), [])
		self.assertEqual([(x.contract, x.amount_to_pay) for x in b.lines], [("LC-1", 0), ("LC-2", 100000)])
		self.assertEqual(b.total_amount, 100000)

	def test_sync_reports_dropped_contract_with_amount(self):
		b = FakeBill([("LC-9", 5000), ("LC-8", 0)])
		self.assertEqual(wb.sync_lines(b), ["LC-9"])  # LC-8 had no amount, so nothing is lost
		self.assertEqual([x.contract for x in b.lines], ["LC-1", "LC-2"])

	def test_list_columns_only_paid_lines_and_balance_after(self):
		lines = [
			{"parent": "B1", "contract": "LC-1", "balance": 100000, "amount_to_pay": 30000},
			{"parent": "B1", "contract": "LC-2", "balance": 50000, "amount_to_pay": 0},
			{"parent": "B1", "contract": "LC-3", "balance": 20000, "amount_to_pay": 20000},
			{"parent": "B2", "contract": "LC-1", "balance": 70000, "amount_to_pay": 0},
		]
		out = wb.list_columns(lines)
		self.assertEqual(out, {"B1": {"contracts": ["LC-1", "LC-3"], "projects": [], "balance_after": 70000}})  # B2 pays nothing, so it is left out

	def test_list_columns_projects_of_paid_contracts_once_each(self):
		lines = [
			{"parent": "B1", "contract": "LC-1", "balance": 100, "amount_to_pay": 10},
			{"parent": "B1", "contract": "LC-2", "balance": 100, "amount_to_pay": 10},
			{"parent": "B1", "contract": "LC-3", "balance": 100, "amount_to_pay": 10},
			{"parent": "B1", "contract": "LC-4", "balance": 100, "amount_to_pay": 0},
		]
		out = wb.list_columns(lines, {"LC-1": "P1", "LC-2": "P2", "LC-3": "P1", "LC-4": "P9"})
		self.assertEqual(out["B1"]["projects"], ["P1", "P2"])  # LC-4 is not paid, P1 not repeated

	def test_week_errors_only_for_paid_lines_on_a_taken_contract(self):
		lines = [{"contract": "LC-1", "amount_to_pay": 5000}, {"contract": "LC-2", "amount_to_pay": 0}, {"contract": "LC-3", "amount_to_pay": 100}]
		errs = wb.week_errors(lines, {"LC-1": "LWB-9", "LC-2": "LWB-9"})
		self.assertEqual(len(errs), 1)  # LC-2 has no amount, LC-3 is free
		self.assertIn("LC-1", errs[0])
		self.assertIn("LWB-9", errs[0])
		self.assertEqual(wb.week_errors(lines, {}), [])

	def test_is_past_week(self):
		self.assertTrue(wb.is_past_week("2026-11-20", "2026-11-23"))  # Friday of last week
		self.assertFalse(wb.is_past_week("2026-11-23", "2026-11-23"))
		self.assertFalse(wb.is_past_week("2026-11-27", "2026-11-23"))  # Friday of this week
		self.assertFalse(wb.is_past_week("2026-12-07", "2026-11-23"))
		self.assertTrue(wb.is_past_week("2026-11-02", "2026-11-26"))

	def test_past_week_errors_only_paid_contracts_with_payments(self):
		lines = [{"contract": "LC-1", "amount_to_pay": 100, "paid_till_now": 0}, {"contract": "LC-2", "amount_to_pay": 100, "paid_till_now": 6000},
			{"contract": "LC-3", "amount_to_pay": 0, "paid_till_now": 6000}]
		errs = wb.past_week_errors(lines, "2026-11-16", "2026-11-23")
		self.assertEqual(len(errs), 1)
		self.assertIn("LC-2", errs[0])
		self.assertEqual(wb.past_week_errors(lines, "2026-11-23", "2026-11-23"), [])  # current week: no limit

	def test_list_columns_empty(self):
		self.assertEqual(wb.list_columns([]), {})


if __name__ == "__main__":
	unittest.main()