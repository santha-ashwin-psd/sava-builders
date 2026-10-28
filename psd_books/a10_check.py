"""A10.4 live check: Purchase Order approval by value and the submit gate.

Put this file in the app folder (next to a9_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a10_check.run

It reuses the a9_check helpers, seed and the 4 TEST users (raiser, Purchase Manager, Finance, Director)
and runs the PO approval API as those real users. Each check prints OK or FAILED with the reason.
Safe to run again (it leaves its TEST purchase orders on the site, like a9_check does).

Scenarios (PO of 100 bags, no VAT line, so the total is 100 x rate):
	A  600,000 -> 2 levels, gate blocks every other submit route, out-of-order and repeat approvals
	B  250,000 -> 2 levels, send back (reason), edit while Sent Back, raise the total, send again
	C  100,000 -> 1 level, statuses can't be set by editing, no-value PO can't be sent
	D  100,000 -> LPO made from an approved comparison still goes through PO approval
	E  cancel and delete: cancel while Pending Approval (reason, sender or pending-level approver), cancel
	   and delete a Sent Back PO, a Pending Approval PO can't be deleted
"""
import frappe
from frappe.utils import nowdate

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A

ok, fail, check = A.ok, A.fail, A.check
expect_block, expect_ok, as_user = A.expect_block, A.expect_ok, A.as_user
RAISER, PM, FIN, DIR = A.RAISER, A.PM, A.FIN, A.DIR

DOCTYPE = "Purchase Order"


def api():
	from psd_books.api import purchase_order_approval as po_api
	return po_api


# --- helpers ---------------------------------------------------------------
def make_po(rate, qty=100):
	"""A Draft PO for the TEST company, total = qty x rate (no tax line)."""
	supplier = S.seed()[0]
	item = {"item_code": S.ITEM, "qty": qty, "rate": rate}
	uom = frappe.db.get_value("Item", S.ITEM, "stock_uom")
	if uom:
		item["uom"] = uom
	po = frappe.get_doc({
		"doctype": DOCTYPE, "status": "Draft", "supplier": supplier, "company": S.CO,
		"transaction_date": nowdate(), "purchase_type": "Goods", "project": S.PROJECT, "items": [item]})
	po.insert(ignore_permissions=True)
	frappe.db.commit()
	return po.name


def state(name):
	d = frappe.db.get_value(DOCTYPE, name, ["docstatus", "status", "grand_total", "raised_by", "rejection_reason"], as_dict=True)
	return d


def steps(name):
	rows = frappe.get_all("Purchase Order Approval", filters={"parent": name, "parenttype": DOCTYPE},
		fields=["level", "role", "status", "approver"], order_by="idx asc")
	return [(r.level, r.role, r.status, r.approver) for r in rows]


def roles_of(name):
	return [s[1] for s in steps(name)]


def direct_submit(name):
	"""Submit the way Frappe's own Submit button or the REST API does (as Administrator, no permission check)."""
	po = frappe.get_doc(DOCTYPE, name)
	po.flags.ignore_permissions = True
	po.submit()


def edit_rate(name, rate, user=RAISER):
	def go():
		po = frappe.get_doc(DOCTYPE, name)
		po.items[0].rate = rate
		po.flags.ignore_permissions = True
		po.save()
		frappe.db.commit()
	return as_user(user, go)


def sent(name):
	return expect_ok("raiser sends %s for approval" % name, lambda: as_user(RAISER, lambda: api().send_for_approval(name)))


def reload():
	"""bench execute does not auto-commit like a web request: persist what the last call did before reading it back."""
	frappe.db.commit()


# --- setup checks -----------------------------------------------------------
def doctype_checks():
	print("\n--- 0: A10.1 doctype changes are on the site ---")
	meta = frappe.get_meta(DOCTYPE)
	for f in ("raised_by", "rejection_reason", "approval_steps"):
		check("Purchase Order has field %s" % f, bool(meta.get_field(f)))
	options = (meta.get_field("status").options or "").split("\n")
	check("status options include Pending Approval and Sent Back",
		"Pending Approval" in options and "Sent Back" in options, options)
	check("child table Purchase Order Approval exists", bool(frappe.db.exists("DocType", "Purchase Order Approval")))


# --- scenarios -------------------------------------------------------------
def scenario_a():
	print("\n--- A: 600,000 -> two levels, gate on every submit route ---")
	name = make_po(6000)
	st = state(name)
	check("PO %s is a Draft with total 600,000" % name, st.docstatus == 0 and st.status == "Draft" and float(st.grand_total) == 600000,
		(st.docstatus, st.status, st.grand_total))

	# the gate: a Draft PO can't be submitted by any other route, Administrator included
	expect_block("Administrator submitting a Draft PO directly", lambda: direct_submit(name), "approval")
	from psd_books.api import docs
	expect_block("Issue PO route (submit_purchase_order) on a Draft",
		lambda: as_user(RAISER, lambda: docs.submit_purchase_order(name)), "approval")
	expect_block("add-drawer route (save_doc with docstatus 1) on a Draft", lambda: as_user(
		RAISER, lambda: docs.save_doc({"doctype": DOCTYPE, "name": name, "docstatus": 1})), "approval")
	reload()
	check("still a Draft after the blocked submits", state(name).docstatus == 0, state(name))

	# a Draft previews the levels it will need
	pre = as_user(PM, lambda: api().get_approval_state(name))
	check("Draft preview: 2 roles", pre["preview_roles"] == ["Purchase Manager", "Finance"], pre["preview_roles"])
	check("Draft can be sent, nobody can act yet", pre["can_send"] and not pre["action"]["can_act"], pre)

	res = sent(name)
	if not res:
		return
	reload()
	st = state(name)
	check("status Pending Approval, not submitted", st.status == "Pending Approval" and st.docstatus == 0, (st.status, st.docstatus))
	check("2 levels: Purchase Manager, Finance", roles_of(name) == ["Purchase Manager", "Finance"], steps(name))
	check("raised_by is the sender", st.raised_by == RAISER, st.raised_by)

	# who can do what right now (level 1 = Purchase Manager)
	check("PM can act on level 1", as_user(PM, lambda: api().get_approval_state(name))["action"]["can_act"])
	check("Finance can't act on level 1", not as_user(FIN, lambda: api().get_approval_state(name))["action"]["can_act"])
	check("sender can't act", not as_user(RAISER, lambda: api().get_approval_state(name))["action"]["can_act"])

	expect_block("sender approving (no approver role)", lambda: as_user(RAISER, lambda: api().approve_po(name)), "needs the")
	expect_block("sender sending back (no approver role)", lambda: as_user(RAISER, lambda: api().send_back_po(name, "no")), "needs the")
	expect_block("Finance approving level 1 (out of order)", lambda: as_user(FIN, lambda: api().approve_po(name)), "needs the")
	expect_block("send back without a reason", lambda: as_user(PM, lambda: api().send_back_po(name, "  ")), "reason")
	expect_block("sending again while Pending Approval", lambda: as_user(RAISER, lambda: api().send_for_approval(name)), "Draft or Sent Back")
	expect_block("edit while Pending Approval", lambda: edit_rate(name, 5000), "pending approval")
	reload()
	expect_block("submit while Pending Approval (Administrator)", lambda: direct_submit(name), "pending approval")
	reload()

	expect_ok("Purchase Manager approves level 1", lambda: as_user(PM, lambda: api().approve_po(name, "ok")))
	reload()
	check("still Pending Approval after level 1, not submitted",
		state(name).status == "Pending Approval" and state(name).docstatus == 0, state(name))

	# one person holding two roles may not approve two levels
	pm_doc = frappe.get_doc("User", PM)
	pm_doc.add_roles("Finance")
	frappe.clear_cache(user=PM)
	expect_block("same person approving a second level", lambda: as_user(PM, lambda: api().approve_po(name)), "already approved")
	pm_doc.remove_roles("Finance")
	frappe.clear_cache(user=PM)

	res = expect_ok("Finance approves level 2 (last)", lambda: as_user(FIN, lambda: api().approve_po(name, "approved")))
	reload()
	st = state(name)
	check("final approval submits the PO: docstatus 1, status To Receive", st.docstatus == 1 and st.status == "To Receive",
		(st.docstatus, st.status))
	check("both steps Approved with an approver, two different people",
		all(s[2] == "Approved" and s[3] for s in steps(name)) and len({s[3] for s in steps(name)}) == 2, steps(name))
	expect_block("approve again after it is submitted", lambda: as_user(FIN, lambda: api().approve_po(name)), "pending approval")
	expect_block("send for approval after it is submitted", lambda: as_user(RAISER, lambda: api().send_for_approval(name)),
		"already submitted")


def scenario_b():
	print("\n--- B: 250,000 -> two levels, send back, edit, raise the total, send again ---")
	name = make_po(2500)
	if not sent(name):
		return
	reload()
	check("2 levels: Purchase Manager, Finance", roles_of(name) == ["Purchase Manager", "Finance"], steps(name))
	expect_block("send back without a reason", lambda: as_user(PM, lambda: api().send_back_po(name, "")), "reason")
	expect_ok("Purchase Manager sends back with a reason",
		lambda: as_user(PM, lambda: api().send_back_po(name, "Rate too high, renegotiate")))
	reload()
	st = state(name)
	check("status Sent Back, reason kept, not submitted",
		st.status == "Sent Back" and st.docstatus == 0 and st.rejection_reason == "Rate too high, renegotiate",
		(st.status, st.docstatus, st.rejection_reason))
	check("level 1 step Rejected", steps(name)[0][2] == "Rejected", steps(name))
	expect_block("approve after Sent Back", lambda: as_user(FIN, lambda: api().approve_po(name)), "pending approval")
	expect_block("submit while Sent Back", lambda: direct_submit(name), "approval")
	reload()

	expect_ok("Sent Back PO can be edited (rate 2400)", lambda: edit_rate(name, 2400))
	reload()
	st = state(name)
	check("still Sent Back after the edit, total 240,000", st.status == "Sent Back" and float(st.grand_total) == 240000,
		(st.status, st.grand_total))

	# raise the total over 500,000: sending again must build fresh levels for the new total
	expect_ok("raise the rate to 6000 (600,000)", lambda: edit_rate(name, 6000))
	if not sent(name):
		return
	reload()
	st = state(name)
	check("sent again: Pending Approval, reason cleared", st.status == "Pending Approval" and not st.rejection_reason,
		(st.status, st.rejection_reason))
	check("fresh 2 levels for the new total, all Pending",
		roles_of(name) == ["Purchase Manager", "Finance"] and all(s[2] == "Pending" for s in steps(name)), steps(name))


def scenario_c():
	print("\n--- C: 100,000 -> one level, status can't be set by editing ---")
	name = make_po(1000)
	if not sent(name):
		return
	reload()
	check("1 level: Purchase Manager", roles_of(name) == ["Purchase Manager"], steps(name))
	expect_block("Finance approving a Purchase Manager level", lambda: as_user(FIN, lambda: api().approve_po(name)), "needs the")
	expect_ok("Purchase Manager approves (last level)", lambda: as_user(PM, lambda: api().approve_po(name)))
	reload()
	st = state(name)
	check("submitted, status To Receive after one level", st.docstatus == 1 and st.status == "To Receive", (st.docstatus, st.status))

	# the two approval statuses belong to the flow
	for target in ("Pending Approval", "Sent Back"):
		draft = make_po(1000)

		def set_status(draft=draft, target=target):
			po = frappe.get_doc(DOCTYPE, draft)
			po.status = target
			po.flags.ignore_permissions = True
			po.save()
		expect_block("setting status %s by editing a Draft" % target, lambda: as_user(RAISER, set_status), "sending")
		reload()

	# a PO with no value can't be sent
	empty = make_po(0)
	expect_block("sending a PO with no value", lambda: as_user(RAISER, lambda: api().send_for_approval(empty)), "no value")


def scenario_d():
	print("\n--- D: LPO from an approved comparison still goes through PO approval ---")
	from psd_books.api import quotation_comparison as qc

	rfq_name, _ = A.make_rfq_with_quotes([1000, 1100, 1200])
	summ = expect_ok("raiser creates the comparison", lambda: as_user(RAISER, lambda: qc.create_comparison(rfq_name)))
	if not summ:
		return
	cmp_name = summ["name"]
	expect_ok("raiser submits the comparison", lambda: as_user(RAISER, lambda: qc.submit_for_approval(cmp_name)))
	expect_ok("Purchase Manager approves the comparison", lambda: as_user(PM, lambda: qc.approve_comparison(cmp_name)))
	res = expect_ok("Purchase Manager creates the LPOs", lambda: as_user(PM, lambda: qc.create_lpos(cmp_name)))
	if not res or not res.get("lpos"):
		return
	name = res["lpos"][0]["name"]
	st = state(name)
	check("LPO %s is a Draft, not submitted" % name, st.docstatus == 0 and st.status == "Draft", (st.docstatus, st.status))
	expect_block("submitting the LPO directly", lambda: direct_submit(name), "approval")
	reload()
	if not sent(name):
		return
	reload()
	check("LPO total at or below 200,000 -> 1 level, Purchase Manager", roles_of(name) == ["Purchase Manager"], steps(name))
	expect_ok("Purchase Manager approves the LPO", lambda: as_user(PM, lambda: api().approve_po(name)))
	reload()
	st = state(name)
	check("LPO submitted, status To Receive", st.docstatus == 1 and st.status == "To Receive", (st.docstatus, st.status))
	po = frappe.get_doc(DOCTYPE, name)
	check("LPO still linked to the comparison", po.quotation_comparison == cmp_name, po.quotation_comparison)


def scenario_e():
	print("\n--- E: cancel and delete in Pending Approval and Sent Back ---")
	from psd_books.api import docs

	# 250,000 -> two levels. Cancel by the sender.
	name = make_po(2500)
	if not sent(name):
		return
	reload()
	s = as_user(RAISER, lambda: api().get_approval_state(name))
	check("state says the sender can cancel", s.get("can_cancel") is True, s.get("can_cancel"))
	s = as_user(FIN, lambda: api().get_approval_state(name))
	check("state says Finance can't cancel while level 1 is pending", s.get("can_cancel") is False, s.get("can_cancel"))
	expect_block("cancel without a reason", lambda: as_user(RAISER, lambda: api().cancel_po(name, " ")), "reason")
	expect_block("Finance cancelling a level 1 PO", lambda: as_user(FIN, lambda: api().cancel_po(name, "no longer needed")), "can cancel it")
	expect_block("cancel_purchase_order_safe on a Pending Approval PO", lambda: docs.cancel_purchase_order_safe(name), "pending approval")
	expect_block("delete_doc on a Pending Approval PO", lambda: docs.delete_doc(DOCTYPE, name), "pending approval")
	reload()
	check("still Pending Approval after the refused attempts", state(name).status == "Pending Approval", state(name).status)
	expect_ok("sender cancels with a reason", lambda: as_user(RAISER, lambda: api().cancel_po(name, "Ordered from another supplier")))
	reload()
	st = state(name)
	check("status Cancelled, not submitted", st.status == "Cancelled" and st.docstatus == 0, (st.status, st.docstatus))
	check("both levels Cancelled", [x[2] for x in steps(name)] == ["Cancelled", "Cancelled"], steps(name))
	remarks = frappe.db.get_value("Purchase Order Approval", {"parent": name, "level": 1}, "remarks")
	check("level 1 remarks carry the reason", (remarks or "").startswith("Cancelled:") and "another supplier" in remarks, remarks)
	expect_block("approve a cancelled PO", lambda: as_user(PM, lambda: api().approve_po(name)), "pending approval")
	expect_block("cancel it again", lambda: as_user(RAISER, lambda: api().cancel_po(name, "again")), "pending approval")

	# Cancel by an approver of the pending level.
	name2 = make_po(1000)
	if not sent(name2):
		return
	reload()
	expect_ok("Purchase Manager (pending level) cancels", lambda: as_user(PM, lambda: api().cancel_po(name2, "Wrong project")))
	reload()
	st = state(name2)
	check("approver's cancel: Cancelled", st.status == "Cancelled", st.status)
	check("approver recorded on the cancelled level", steps(name2)[0][2] == "Cancelled" and steps(name2)[0][3] == PM, steps(name2))

	# Sent Back: cancel closes the untouched levels, and a Sent Back PO can be deleted.
	name3 = make_po(2500)
	if not sent(name3):
		return
	reload()
	expect_ok("send back", lambda: as_user(PM, lambda: api().send_back_po(name3, "Rate too high")))
	reload()
	check("Sent Back: level 1 Rejected, level 2 Pending", [x[2] for x in steps(name3)] == ["Rejected", "Pending"], steps(name3))
	expect_ok("cancel a Sent Back PO", lambda: docs.cancel_purchase_order_safe(name3))
	reload()
	check("Cancelled; levels Rejected, Cancelled", state(name3).status == "Cancelled" and [x[2] for x in steps(name3)] == ["Rejected", "Cancelled"],
		(state(name3).status, steps(name3)))

	name4 = make_po(2500)
	if not sent(name4):
		return
	reload()
	expect_ok("send back again", lambda: as_user(PM, lambda: api().send_back_po(name4, "Check the quantity")))
	reload()
	expect_ok("delete a Sent Back PO", lambda: docs.delete_doc(DOCTYPE, name4))
	reload()
	check("the Sent Back PO and its levels are gone",
		not frappe.db.exists(DOCTYPE, name4) and not frappe.db.exists("Purchase Order Approval", {"parent": name4}), name4)


def run():
	frappe.set_user("Administrator")
	A.make_users()
	for fn in (doctype_checks, scenario_a, scenario_b, scenario_c, scenario_d, scenario_e):
		try:
			fn()
		except Exception:  # noqa: BLE001
			import traceback
			fail("%s crashed:\n%s" % (fn.__name__, traceback.format_exc()))
		finally:
			frappe.set_user("Administrator")
			frappe.db.commit()
	print("\nDone: %d OK, %d FAILED" % (A.RESULT["ok"], A.RESULT["failed"]))