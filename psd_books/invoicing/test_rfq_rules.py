"""Tests for Request for Quotation rules (Sava A7.1). DB-free: the database and the
email sender are mocked.

Run with:
    bench run-tests --app psd_books --module psd_books.invoicing.test_rfq_rules
"""
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import frappe

from psd_books.invoicing import rfq_rules as R


class _D(SimpleNamespace):
	def get(self, k, default=None):
		return getattr(self, k, default)


def mrn(**kw):
	d = dict(name="SB-MRN-26-0001", docstatus=1, status="Approved", material_request_type="Purchase",
		company="C1", project="P1", delivery_warehouse="WH1")
	d.update(kw)
	return d


def line(name="L1", item="CEM", req=100, issued=0, uom="Bag", use="Slab"):
	return _D(name=name, item_code=item, item_name=item, required_qty=req, issued_qty=issued, uom=uom, intended_use=use)


def row(idx=1, mrn_item="L1", item="CEM", qty=10, **kw):
	return _D(idx=idx, mrn_item=mrn_item, item_code=item, qty=qty, uom="", intended_use="", item_name="", **kw)


def sup(supplier, email="a@x.com", status="Pending", name=None):
	return _D(idx=1, supplier=supplier, supplier_name=name or supplier, email_id=email, send_status=status,
		sent_on=None, send_error="")


def doc(items=None, suppliers=None, **kw):
	d = _D(name="SB-RFQ-26-0001", material_request="SB-MRN-26-0001", company="C1", items=items or [row()],
		suppliers=suppliers or [], posting_date="2026-10-15", respond_by="2026-10-22", message="",
		delivery_warehouse="WH1", status="Draft")
	for k, v in kw.items():
		setattr(d, k, v)
	return d


class TestMrnChecks(unittest.TestCase):
	def test_open_statuses_pass(self):
		for s in ("Approved", "Partly Issued"):
			R.check_mrn(mrn(status=s))

	def test_other_statuses_blocked(self):
		for s in ("Draft", "Pending Approval", "Sent Back", "Issued", "Cancelled"):
			with self.assertRaises(frappe.ValidationError):
				R.check_mrn(mrn(status=s))

	def test_unsubmitted_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_mrn(mrn(docstatus=0))

	def test_transfer_request_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_mrn(mrn(material_request_type="Material Transfer"))

	def test_other_company_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_mrn(mrn(), company="C2")


class TestPrefill(unittest.TestCase):
	def test_pending_qty_and_skip_done_lines(self):
		out = R.build_rfq_prefill(mrn(), [line("L1", req=100, issued=30), line("L2", "SAND", req=5, issued=5)])
		self.assertEqual([i["mrn_item"] for i in out["items"]], ["L1"])
		self.assertEqual(out["items"][0]["qty"], 70)
		self.assertEqual(out["project"], "P1")

	def test_nothing_pending(self):
		with self.assertRaises(frappe.ValidationError):
			R.build_rfq_prefill(mrn(), [line(req=5, issued=5)])

	def test_closed_mrn_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.build_rfq_prefill(mrn(status="Issued"), [line()])


class TestItems(unittest.TestCase):
	lines = {"L1": line("L1", req=100, issued=30)}

	def test_within_pending_ok(self):
		R.check_items(doc(items=[row(qty=70)]), self.lines)

	def test_over_pending_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_items(doc(items=[row(qty=71)]), self.lines)

	def test_split_rows_are_added_up(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_items(doc(items=[row(1, qty=40), row(2, qty=40)]), self.lines)

	def test_foreign_line_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_items(doc(items=[row(mrn_item="ZZ")]), self.lines)

	def test_item_mismatch_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_items(doc(items=[row(item="SAND")]), self.lines)

	def test_zero_qty_and_no_items_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_items(doc(items=[row(qty=0)]), self.lines)
		with self.assertRaises(frappe.ValidationError):
			R.check_items(_D(items=[], material_request="M"), self.lines)

	def test_uom_and_use_come_from_mrn(self):
		d = doc(items=[row(qty=10)])
		R.check_items(d, self.lines)
		self.assertEqual((d.items[0].uom, d.items[0].intended_use), ("Bag", "Slab"))


class TestSuppliers(unittest.TestCase):
	def _check(self, rows, info):
		with patch.object(frappe.db, "get_value", side_effect=lambda dt, n, f, as_dict=False: info.get(n)):
			R.check_suppliers(_D(suppliers=rows))

	def test_disabled_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			self._check([sup("S1")], {"S1": _D(supplier_name="S1", email_id="a@x.com", disabled=1)})

	def test_duplicate_blocked(self):
		i = _D(supplier_name="S1", email_id="a@x.com", disabled=0)
		with self.assertRaises(frappe.ValidationError):
			self._check([sup("S1"), sup("S1")], {"S1": i})

	def test_unknown_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			self._check([sup("S9")], {})

	def test_email_defaults_from_supplier_but_edit_kept(self):
		i = _D(supplier_name="Name 1", email_id="master@x.com", disabled=0)
		a, b = sup("S1", email=""), sup("S2", email="mine@x.com")
		self._check([a, b], {"S1": i, "S2": _D(supplier_name="N2", email_id="other@x.com", disabled=0)})
		self.assertEqual(a.email_id, "master@x.com")
		self.assertEqual(b.email_id, "mine@x.com")


class TestDates(unittest.TestCase):
	def test_respond_before_rfq_date(self):
		with self.assertRaises(frappe.ValidationError):
			R.check_dates(doc(respond_by="2026-10-01"))

	def test_ok(self):
		R.check_dates(doc())


class TestPlanSend(unittest.TestCase):
	def three(self, **kw):
		return [sup("S1"), sup("S2"), sup("S3")]

	def test_needs_three_suppliers(self):
		with self.assertRaises(frappe.ValidationError):
			R.plan_send("Draft", [sup("S1"), sup("S2")])

	def test_missing_email_blocked(self):
		rows = self.three()
		rows[1].email_id = " "
		with self.assertRaises(frappe.ValidationError):
			R.plan_send("Draft", rows)

	def test_cancelled_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.plan_send("Cancelled", self.three())

	def test_all_sent_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			R.plan_send("Sent", [sup(s, status="Sent") for s in ("S1", "S2", "S3")])

	def test_resend_only_failed_and_pending(self):
		rows = [sup("S1", status="Sent"), sup("S2", status="Failed"), sup("S3", status="Pending")]
		self.assertEqual([r.supplier for r in R.plan_send("Sent", rows)], ["S2", "S3"])


class TestSending(unittest.TestCase):
	def test_one_email_each_and_no_other_supplier_visible(self):
		d = doc(suppliers=[sup("S1", "s1@x.com", name="Alpha Ltd"), sup("S2", "s2@x.com", name="Beta Ltd"),
			sup("S3", "s3@x.com", name="Gamma Ltd")])
		sender = MagicMock()
		sent, failed = R.send_to_suppliers(d, d.suppliers, sender, "Sava", "Tower", now="NOW")
		self.assertEqual(sender.call_count, 3)
		self.assertEqual((sent, failed), (["S1", "S2", "S3"], []))
		for call in sender.call_args_list:
			to, subject, html, company = call.args
			self.assertEqual(company, "C1")
			others = {"s1@x.com": ("Beta", "Gamma"), "s2@x.com": ("Alpha", "Gamma"), "s3@x.com": ("Alpha", "Beta")}[to]
			for o in others:
				self.assertNotIn(o, html)
				self.assertNotIn(o, subject)
		self.assertTrue(all(r.send_status == "Sent" and r.sent_on == "NOW" for r in d.suppliers))

	def test_one_failure_does_not_stop_the_rest(self):
		d = doc(suppliers=[sup("S1"), sup("S2", "bad@x.com"), sup("S3")])

		def sender(to, *a):
			if to == "bad@x.com":
				raise RuntimeError("mailbox full")
		sent, failed = R.send_to_suppliers(d, d.suppliers, sender, "Sava")
		self.assertEqual(sent, ["S1", "S3"])
		self.assertEqual(failed, [("S2", "mailbox full")])
		self.assertEqual([r.send_status for r in d.suppliers], ["Sent", "Failed", "Sent"])
		self.assertEqual(d.suppliers[1].send_error, "mailbox full")

	def test_error_text_is_cut(self):
		d = doc(suppliers=[sup("S1")])
		R.send_to_suppliers(d, d.suppliers, MagicMock(side_effect=RuntimeError("x" * 500)), "Sava")
		self.assertEqual(len(d.suppliers[0].send_error), R.ERROR_LEN)

	def test_email_escapes_html(self):
		d = doc(message="<script>x</script>", suppliers=[sup("S1")])
		d.items[0].item_name = "A<b>"
		_, html = R.build_email(d, d.suppliers[0], "Sava & Co")
		self.assertNotIn("<script>", html)
		self.assertIn("Sava &amp; Co", html)
		self.assertIn("A&lt;b&gt;", html)


class TestStatusAfterSend(unittest.TestCase):
	def test_sent_needs_three_delivered(self):
		two = [sup("S1", status="Sent"), sup("S2", status="Sent"), sup("S3", status="Failed")]
		self.assertEqual(R.status_after_send("Draft", two), "Draft")
		three = [sup(s, status="Sent") for s in ("S1", "S2", "S3")]
		self.assertEqual(R.status_after_send("Draft", three), "Sent")

	def test_cancelled_stays(self):
		self.assertEqual(R.status_after_send("Cancelled", [sup(s, status="Sent") for s in "abc"]), "Cancelled")