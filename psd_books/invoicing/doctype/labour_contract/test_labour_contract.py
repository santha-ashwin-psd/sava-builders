"""Logic tests for the Labour Contract rules (no database needed).

Run in the bench:
    bench --site sava run-tests --app psd_books --module psd_books.invoicing.doctype.labour_contract.test_labour_contract
"""
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
	fm.flags = types.SimpleNamespace()
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	import datetime
	utils.getdate = lambda d=None: d if isinstance(d, datetime.date) else datetime.date.fromisoformat(str(d)[:10])
	utils.nowdate = lambda: "2026-11-14"
	fm.model, model.document, fm.utils = model, document, utils
	sys.modules.update({"frappe": fm, "frappe.model": model, "frappe.model.document": document, "frappe.utils": utils})

import frappe  # noqa: E402,F811
from psd_books.invoicing.doctype.labour_contract import labour_contract as lc  # noqa: E402


class Doc:
	def __init__(self, **k):
		self.name = k.get("name", "LC-2026-0001")
		self.status = k.get("status", "Draft")
		self.contractor = "LCON-00001"
		self.contract_value = k.get("contract_value", 500000)
		self.start_date, self.end_date = k.get("start_date", "2026-11-09"), k.get("end_date", "2027-01-31")
		self.raised_by = self.approved_by = self.approved_on = self.rejection_reason = self.closed_on = None
		self.flags = types.SimpleNamespace(get=lambda key, d=None: getattr(self.flags, key, d))
		self._new = k.get("new", False)

	def is_new(self):
		return self._new


GOOD = {"name": "LCON-00001", "disabled": 0, "tax_cert_expiry": "2027-03-31"}
Err = frappe.ValidationError if hasattr(frappe, "ValidationError") else Exception


class TestBlockers(unittest.TestCase):
	def test_clean_contract_has_no_blockers(self):
		self.assertEqual(lc.blockers(Doc(), GOOD, "2026-11-14"), [])

	def test_expired_certificate(self):
		c = dict(GOOD, tax_cert_expiry="2026-09-30")
		self.assertIn("Certificate expired on 2026-09-30", lc.blockers(Doc(), c, "2026-11-14")[0])

	def test_certificate_expiring_today_is_still_valid(self):
		c = dict(GOOD, tax_cert_expiry="2026-11-14")
		self.assertEqual(lc.blockers(Doc(), c, "2026-11-14"), [])

	def test_inactive_contractor(self):
		self.assertEqual(len(lc.blockers(Doc(), dict(GOOD, disabled=1), "2026-11-14")), 1)

	def test_value_must_be_above_zero(self):
		self.assertEqual(len(lc.blockers(Doc(contract_value=0), GOOD, "2026-11-14")), 1)

	def test_missing_contractor(self):
		self.assertEqual(len(lc.blockers(Doc(), None, "2026-11-14")), 1)


class TestWorkflow(unittest.TestCase):
	def test_send_then_approve_by_director(self):
		d = Doc()
		lc.send_for_approval(d, [], "a@x")
		self.assertEqual((d.status, d.raised_by), ("Pending approval", "a@x"))
		lc.approve(d, [], "d@x", ["Director"], "now")
		self.assertEqual((d.status, d.approved_by, d.approved_on), ("Approved", "d@x", "now"))

	def test_only_draft_or_sent_back_can_be_sent(self):
		for st in ("Pending approval", "Approved", "Closed"):
			with self.assertRaises(Exception):
				lc.send_for_approval(Doc(status=st), [], "a@x")
		lc.send_for_approval(Doc(status="Sent back"), [], "a@x")

	def test_send_refused_with_blockers(self):
		with self.assertRaises(Exception):
			lc.send_for_approval(Doc(), ["Enter the contract value."], "a@x")

	def test_only_director_approves_even_books_admin(self):
		with self.assertRaises(Exception):
			lc.approve(Doc(status="Pending approval"), [], "a@x", ["Admin", "Books Admin"], "now")

	def test_approve_rechecks_blockers(self):
		with self.assertRaises(Exception):
			lc.approve(Doc(status="Pending approval"), ["Certificate expired"], "d@x", ["Director"], "now")

	def test_approve_needs_pending(self):
		with self.assertRaises(Exception):
			lc.approve(Doc(), [], "d@x", ["Director"], "now")

	def test_send_back_needs_reason_and_director(self):
		d = Doc(status="Pending approval")
		with self.assertRaises(Exception):
			lc.send_back(d, "d@x", ["Director"], "  ")
		with self.assertRaises(Exception):
			lc.send_back(d, "a@x", ["Admin"], "bad rate")
		lc.send_back(d, "d@x", ["Director"], "bad rate")
		self.assertEqual((d.status, d.rejection_reason), ("Sent back", "bad rate"))

	def test_resend_clears_reason(self):
		d = Doc(status="Sent back")
		d.rejection_reason = "bad rate"
		lc.send_for_approval(d, [], "a@x")
		self.assertIsNone(d.rejection_reason)

	def test_close_only_when_approved(self):
		for st in ("Draft", "Pending approval", "Sent back", "Closed"):
			with self.assertRaises(Exception):
				lc.close(Doc(status=st), "now")
		d = Doc(status="Approved")
		lc.close(d, "now")
		self.assertEqual((d.status, d.closed_on), ("Closed", "now"))


	def test_reopen_only_closed_and_only_director(self):
		for st in ("Draft", "Pending approval", "Sent back", "Approved"):
			with self.assertRaises(Exception):
				lc.reopen(Doc(status=st), "d@x", ["Director"])
		with self.assertRaises(Exception) as cm:
			lc.reopen(Doc(status="Closed"), "a@x", ["Books Admin"])
		self.assertIn("Only a Director", str(cm.exception))
		d = Doc(status="Closed")
		d.closed_on = "then"
		lc.reopen(d, "d@x", ["Director"])
		self.assertEqual((d.status, d.closed_on), ("Approved", None))
		self.assertTrue(d.flags.lc_workflow)

	def test_reopen_refused_when_project_closed(self):
		d = Doc(status="Closed")
		d.project = "P1"
		d.get = lambda k, default=None: getattr(d, k, default)
		with self.assertRaises(Exception) as cm:
			lc.reopen(d, "d@x", ["Director"], project_closed=True)
		self.assertIn("Project P1 is Closed", str(cm.exception))
		self.assertEqual(d.status, "Closed")


	def test_delete_rules(self):
		d = Doc(status="Draft"); d.raised_by = ""
		lc.check_delete(d, [])  # never-sent draft: anyone
		for st in ("Pending approval", "Approved", "Sent back"):
			with self.assertRaises(Exception):
				lc.check_delete(Doc(status=st), ["Director"])
		sent = Doc(status="Draft"); sent.raised_by = "a@x"
		with self.assertRaises(Exception):
			lc.check_delete(sent, ["Director"])
		c = Doc(status="Closed")
		with self.assertRaises(Exception) as cm:
			lc.check_delete(c, ["Books Admin"])
		self.assertIn("Only a Director", str(cm.exception))
		lc.check_delete(c, ["Director"], [])  # closed, Director, no bills

	def test_closed_contract_on_a_weekly_bill_is_not_deleted(self):
		c = Doc(status="Closed"); c.name = "LC-2026-0003"
		with self.assertRaises(Exception) as cm:
			lc.check_delete(c, ["Director"], ["WB-1", "WB-1", "WB-2"])
		self.assertIn("weekly bill WB-1, WB-2", str(cm.exception))


class TestEditLock(unittest.TestCase):
	def test_locked_statuses_refuse_edits(self):
		for st in ("Pending approval", "Approved", "Closed"):
			with self.assertRaises(Exception):
				lc.check_edit(Doc(status=st), st)

	def test_draft_and_sent_back_are_editable(self):
		for st in ("Draft", "Sent back"):
			lc.check_edit(Doc(status=st), st)

	def test_narration_saved_only_when_approved(self):
		d = Doc(status="Approved")
		lc.set_narration(d, "  site visit done  ")
		self.assertEqual(d.narration, "site visit done")
		self.assertTrue(d.flags.lc_workflow)
		for st in ("Draft", "Pending approval", "Sent back", "Closed"):
			with self.assertRaises(Exception):
				lc.set_narration(Doc(status=st), "x")

	def test_status_cannot_be_edited_directly(self):
		with self.assertRaises(Exception):
			lc.check_edit(Doc(status="Approved"), "Draft")

	def test_workflow_flag_bypasses_lock(self):
		d = Doc(status="Approved")
		d.flags.lc_workflow = True
		lc.check_edit(d, "Pending approval")

	def test_new_contract_starts_draft(self):
		d = Doc(status="", new=True)
		lc.check_edit(d, None)
		self.assertEqual(d.status, "Draft")
		with self.assertRaises(Exception):
			lc.check_edit(Doc(status="Approved", new=True), None)


class TestDates(unittest.TestCase):
	def test_end_before_start(self):
		with self.assertRaises(Exception):
			lc.check_dates(Doc(start_date="2026-11-09", end_date="2026-11-01"))

	def test_same_day_ok(self):
		lc.check_dates(Doc(start_date="2026-11-09", end_date="2026-11-09"))


if __name__ == "__main__":
	unittest.main()


class TestActivityUsedOnce(unittest.TestCase):
	def _doc(self, new, stored_activity, others, disabled=0):
		d = Doc(new=new)
		d.activity = "ACT-001"
		frappe.db.get_value = mock.MagicMock(
			side_effect=lambda dt, n, f=None, *a, **k: stored_activity if dt == "Labour Contract" else disabled)
		frappe.get_all = mock.MagicMock(return_value=others)
		return d

	def test_lookup_ignores_project_and_status(self):
		frappe.get_all = mock.MagicMock(return_value=["LC-2026-0001"])
		self.assertEqual(lc.activity_contracts("ACT-001", "LC-2026-0009"), ["LC-2026-0001"])
		self.assertEqual(frappe.get_all.call_args[1]["filters"], {"activity": "ACT-001", "name": ["!=", "LC-2026-0009"]})

	def test_new_contract_on_used_activity_is_refused(self):
		with self.assertRaises(Exception) as cm:
			lc.check_activity(self._doc(True, None, ["LC-2026-0001"]))
		self.assertIn("already used on contract LC-2026-0001", str(cm.exception))

	def test_changing_to_a_used_activity_is_refused(self):
		with self.assertRaises(Exception):
			lc.check_activity(self._doc(False, "ACT-009", ["LC-2026-0001"]))

	def test_unchanged_activity_is_not_rechecked(self):
		lc.check_activity(self._doc(False, "ACT-001", ["LC-2026-0002"]))

	def test_free_activity_is_fine_and_inactive_is_refused(self):
		lc.check_activity(self._doc(True, None, []))
		with self.assertRaises(Exception) as cm:
			lc.check_activity(self._doc(True, None, [], disabled=1))
		self.assertIn("inactive", str(cm.exception))