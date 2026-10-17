"""Logic tests for api/mrn.py (MRN approval, Sava A5.3), no database needed.

Run in the bench:
	bench --site sava run-tests --module psd_books.api.tests.test_mrn_approval
Outside a bench the frappe pieces are stubbed, so only the logic is exercised.
"""
import sys
import types
import unittest
from unittest import mock

try:
	import frappe  # noqa: F401
except ImportError:
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s
	fm.db = mock.MagicMock()
	fm.session = types.SimpleNamespace(user="req@x.com")
	fm.whitelist = lambda **kw: (lambda f: f)
	fm.DoesNotExistError = type("DoesNotExistError", (Exception,), {})
	fm.PermissionError = type("PermissionError", (Exception,), {})

	def _throw(msg, exc=None, title=None):
		raise (exc or Exception)(msg)

	fm.throw = _throw
	fu = types.ModuleType("frappe.utils")
	fu.now_datetime = lambda: "2026-10-14 10:00:00"
	fm.utils = fu
	sys.modules["frappe"] = fm
	sys.modules["frappe.utils"] = fu
	acc = types.ModuleType("psd_books.utils.access")
	acc._membership = mock.MagicMock(return_value={"admin": False, "readonly": False})
	acc.assert_can = mock.MagicMock()
	acc.assert_company = mock.MagicMock()
	sys.modules["psd_books.utils.access"] = acc

from psd_books.api import mrn


class FakeMR:
	def __init__(self, status="Draft", docstatus=0, project="SB-001", production_plan="", owner="req@x.com"):
		self.name = "MR-2026-00009"
		self.status = status
		self.docstatus = docstatus
		self.project = project
		self.production_plan = production_plan
		self.owner = owner
		self.company = "Sava"
		self.approved_by = None
		self.approved_on = None
		self.send_back_reason = None
		self.sent_back_by = None
		self.sent_back_on = None
		self.flags = types.SimpleNamespace()
		self.saved = False
		self.submitted = False

	def get(self, k):
		return getattr(self, k, None)

	def save(self):
		self.saved = True

	def submit(self):
		self.submitted = True
		self.status = "Approved"


def run(fn, doc, user="req@x.com", pm="pm@x.com", admin=False, readonly=False):
	mrn.frappe.session.user = user
	with mock.patch.object(mrn, "_load", return_value=doc), \
			mock.patch.object(mrn, "_project_manager", return_value=pm), \
			mock.patch.object(mrn, "_membership", return_value={"admin": admin, "readonly": readonly}), \
			mock.patch.object(mrn, "assert_can"), \
			mock.patch.object(mrn, "assert_company"):
		return fn(doc.name)


class TestBlockReason(unittest.TestCase):
	def reason(self, **kw):
		args = dict(owner="req@x.com", user="pm@x.com", pm="pm@x.com", is_admin=False, readonly=False)
		args.update(kw)
		return mrn.approval_block_reason(**args)

	def test_project_manager_can_approve(self):
		self.assertEqual(self.reason(), "")

	def test_other_user_cannot(self):
		self.assertIn("Only the Project Manager (pm@x.com)", self.reason(user="other@x.com"))

	def test_manager_cannot_approve_own_mrn(self):
		self.assertIn("someone else", self.reason(owner="pm@x.com"))

	def test_admin_can_approve_anything_including_own_and_no_manager(self):
		self.assertEqual(self.reason(is_admin=True, user="a@x.com", owner="a@x.com"), "")
		self.assertEqual(self.reason(is_admin=True, pm=None), "")

	def test_no_project_manager_blocks_everyone_else(self):
		self.assertIn("no Project Manager", self.reason(pm=None))

	def test_read_only_user_cannot(self):
		self.assertIn("Read-only", self.reason(readonly=True))


class TestSendForApproval(unittest.TestCase):
	def test_draft_is_sent(self):
		doc = FakeMR()
		out = run(mrn.send_for_approval, doc)
		self.assertTrue(doc.saved)
		self.assertTrue(doc.flags.mrn_workflow)
		self.assertEqual(doc.status, "Pending Approval")
		self.assertEqual(out["status"], "Pending Approval")

	def test_sent_back_can_be_resent(self):
		doc = FakeMR(status="Sent Back")
		run(mrn.send_for_approval, doc)
		self.assertEqual(doc.status, "Pending Approval")

	def test_not_draft_blocked(self):
		for doc in (FakeMR(status="Pending Approval"), FakeMR(status="Approved", docstatus=1)):
			with self.assertRaises(Exception):
				run(mrn.send_for_approval, doc)
			self.assertFalse(doc.saved)

	def test_production_plan_request_blocked(self):
		with self.assertRaises(Exception):
			run(mrn.send_for_approval, FakeMR(production_plan="PP-1"))

	def test_no_project_blocked(self):
		with self.assertRaises(Exception) as cm:
			run(mrn.send_for_approval, FakeMR(project=""))
		self.assertIn("Select a project", str(cm.exception))

	def test_project_without_manager_blocked(self):
		doc = FakeMR()
		with self.assertRaises(Exception) as cm:
			run(mrn.send_for_approval, doc, pm=None)
		self.assertIn("no Project Manager", str(cm.exception))
		self.assertFalse(doc.saved)


class TestApprove(unittest.TestCase):
	def test_project_manager_approves(self):
		doc = FakeMR(status="Pending Approval")
		out = run(mrn.approve_mrn, doc, user="pm@x.com")
		self.assertTrue(doc.submitted)
		self.assertTrue(doc.flags.mrn_workflow)
		self.assertEqual(doc.approved_by, "pm@x.com")
		self.assertIsNotNone(doc.approved_on)
		self.assertEqual(out["status"], "Approved")

	def test_other_user_blocked(self):
		doc = FakeMR(status="Pending Approval")
		with self.assertRaises(Exception):
			run(mrn.approve_mrn, doc, user="other@x.com")
		self.assertFalse(doc.submitted)

	def test_requester_cannot_approve_own(self):
		doc = FakeMR(status="Pending Approval", owner="pm@x.com")
		with self.assertRaises(Exception):
			run(mrn.approve_mrn, doc, user="pm@x.com")
		self.assertFalse(doc.submitted)

	def test_admin_approves(self):
		doc = FakeMR(status="Pending Approval", owner="a@x.com")
		run(mrn.approve_mrn, doc, user="a@x.com", admin=True, pm=None)
		self.assertTrue(doc.submitted)

	def test_not_pending_blocked(self):
		for doc in (FakeMR(status="Draft"), FakeMR(status="Approved", docstatus=1)):
			with self.assertRaises(Exception):
				run(mrn.approve_mrn, doc, user="pm@x.com")
			self.assertFalse(doc.submitted)


class TestApprovalState(unittest.TestCase):
	def test_manager_sees_can_approve(self):
		out = run(mrn.get_approval_state, FakeMR(status="Pending Approval"), user="pm@x.com")
		self.assertTrue(out["can_approve"])
		self.assertEqual(out["project_manager"], "pm@x.com")

	def test_requester_cannot_and_gets_reason(self):
		out = run(mrn.get_approval_state, FakeMR(status="Pending Approval"), user="req@x.com")
		self.assertFalse(out["can_approve"])
		self.assertIn("Only the Project Manager", out["reason"])

	def test_not_pending_has_no_reason(self):
		out = run(mrn.get_approval_state, FakeMR(status="Draft"), user="req@x.com")
		self.assertFalse(out["can_approve"])
		self.assertEqual(out["reason"], "")


class TestSendBack(unittest.TestCase):
	def send_back(self, doc, reason="Quantity is wrong", **kw):
		return run(lambda name: mrn.send_back_mrn(name, reason), doc, **kw)

	def test_manager_sends_back_with_reason(self):
		doc = FakeMR(status="Pending Approval")
		out = self.send_back(doc, user="pm@x.com")
		self.assertTrue(doc.saved)
		self.assertTrue(doc.flags.mrn_workflow)
		self.assertFalse(doc.submitted)
		self.assertEqual(doc.status, "Sent Back")
		self.assertEqual(doc.send_back_reason, "Quantity is wrong")
		self.assertEqual(doc.sent_back_by, "pm@x.com")
		self.assertIsNotNone(doc.sent_back_on)
		self.assertEqual(out["status"], "Sent Back")

	def test_reason_is_required(self):
		for reason in ("", "   ", None):
			doc = FakeMR(status="Pending Approval")
			with self.assertRaises(Exception) as cm:
				self.send_back(doc, reason=reason, user="pm@x.com")
			self.assertIn("reason", str(cm.exception))
			self.assertFalse(doc.saved)
			self.assertEqual(doc.status, "Pending Approval")

	def test_other_user_blocked(self):
		doc = FakeMR(status="Pending Approval")
		with self.assertRaises(Exception):
			self.send_back(doc, user="other@x.com")
		self.assertFalse(doc.saved)

	def test_requester_cannot_send_back_own(self):
		doc = FakeMR(status="Pending Approval", owner="pm@x.com")
		with self.assertRaises(Exception):
			self.send_back(doc, user="pm@x.com")
		self.assertFalse(doc.saved)

	def test_admin_can_send_back(self):
		doc = FakeMR(status="Pending Approval", owner="a@x.com")
		self.send_back(doc, user="a@x.com", admin=True, pm=None)
		self.assertEqual(doc.status, "Sent Back")

	def test_not_pending_blocked(self):
		for doc in (FakeMR(status="Draft"), FakeMR(status="Approved", docstatus=1)):
			with self.assertRaises(Exception):
				self.send_back(doc, user="pm@x.com")
			self.assertFalse(doc.saved)

	def test_sent_back_can_be_corrected_and_resent(self):
		doc = FakeMR(status="Pending Approval")
		self.send_back(doc, user="pm@x.com")
		run(mrn.send_for_approval, doc)
		self.assertEqual(doc.status, "Pending Approval")


if __name__ == "__main__":
	unittest.main()