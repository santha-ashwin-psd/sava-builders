import frappe
from frappe import _
from frappe.model.document import Document

from psd_books.invoicing import rfq_rules


class RequestforQuotation(Document):
	def validate(self):
		# Entry Date: the day the record was entered. Filled automatically when blank, so documents
		# created by other steps (GRN, stock entries, orders from a comparison) never fail on it.
		if self.is_new() and not self.get("entry_date"):
			self.entry_date = frappe.utils.nowdate()
		before = self.get_doc_before_save()
		self._keep_status_server_side(before)
		if before is not None and before.status == "Cancelled":
			frappe.throw(_("A cancelled Request for Quotation can't be edited."))
		if self.status == "Cancelled":
			return  # cancelling must work even if the MRN has moved on since
		self._keep_send_state(before)
		rfq_rules.validate_draft(self)
		self._lock_items_after_send(before)

	def _keep_status_server_side(self, before):
		"""Status changes only through api/rfq.py (flags.rfq_workflow)."""
		if self.flags.get("rfq_workflow"):
			return
		self.status = "Draft" if (self.is_new() or before is None) else before.status

	def _keep_send_state(self, before):
		"""A client can't mark a supplier row as sent: keep what the server recorded."""
		if self.flags.get("rfq_workflow"):
			return
		old = {r.supplier: r for r in (before.get("suppliers") if before else []) or []}
		for row in self.get("suppliers") or []:
			prev = old.get(row.supplier)
			row.send_status = prev.send_status if prev else "Pending"
			row.sent_on = prev.sent_on if prev else None
			row.send_error = prev.send_error if prev else ""

	def _lock_items_after_send(self, before):
		"""Suppliers already received these items, so they can't change after sending."""
		if self.flags.get("rfq_workflow") or before is None or before.status != "Sent":
			return
		key = lambda rows: [(r.mrn_item, r.item_code, float(r.qty or 0)) for r in rows or []]  # noqa: E731
		if key(before.get("items")) != key(self.get("items")):
			frappe.throw(_("Items can't be changed after the request was sent. Cancel it and raise a new one."))