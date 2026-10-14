import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import nowdate


class MaterialRequest(Document):
	def validate(self):
		if not self.posting_date:
			self.posting_date = nowdate()
		if not self.items:
			frappe.throw(_("Material Request must have at least one item."))
		for row in self.items:
			if not row.required_qty or row.required_qty <= 0:
				frappe.throw(_("Row for {0}: Required Qty must be greater than zero.").format(row.item_code))
		self._lock_while_pending()
		self._keep_status_server_side()
		self._default_row_warehouse()
		self._validate_mrn_fields()

	def _approval_required(self):
		"""Sava A5.3: an MRN is approved by the Project Manager, not submitted directly.

		Not applied to Production Plan requests, nor during install, patch, migrate and tests.
		"""
		if self.get("production_plan"):
			return False
		flags = frappe.flags
		if any(flags.get(k) for k in ("in_install", "in_patch", "in_migrate", "in_test")):
			return False
		return not self.flags.get("skip_mrn_rules")

	def _lock_while_pending(self):
		"""A request waiting for approval can't be edited (api/mrn.py sets flags.mrn_workflow)."""
		if self.flags.get("mrn_workflow") or not self._approval_required():
			return
		before = self.get_doc_before_save()
		if before is not None and before.status == "Pending Approval":
			frappe.throw(
				_("This Material Request is waiting for approval and can't be edited."),
				title=_("Pending Approval"),
			)

	def _keep_status_server_side(self):
		"""Status is set by the server only: a new document starts at Draft and a plain
		save can't change it (a client could send any status)."""
		if self.flags.get("mrn_workflow"):
			return
		before = self.get_doc_before_save()
		if self.is_new() or before is None:
			self.status = "Draft"
		else:
			self.status = before.status

	def _default_row_warehouse(self):
		"""A line without its own warehouse goes to the MRN's delivery warehouse."""
		if not self.get("delivery_warehouse"):
			return
		for row in self.items:
			if not row.get("warehouse"):
				row.warehouse = self.delivery_warehouse

	def _validate_mrn_fields(self):
		"""Sava A5: a new MRN needs a project, a delivery warehouse and an intended use on every line.

		Not applied to Production Plan requests, to documents that are already submitted
		(editing after submit, cancel), or during install, patch, migrate and tests.
		"""
		if not self._mrn_rules_apply():
			return
		missing = []
		if not self.get("project"):
			missing.append(_("Project"))
		if not self.get("delivery_warehouse"):
			missing.append(_("Delivery Warehouse"))
		for idx, row in enumerate(self.items, 1):
			if not (row.get("intended_use") or "").strip():
				missing.append(_("Row {0}: Intended Use").format(idx))
		if missing:
			frappe.throw(
				_("Please fill in: {0}").format(", ".join(missing)),
				title=_("Material Request incomplete"),
			)

	def _mrn_rules_apply(self):
		if not self._approval_required():
			return False
		# draft saves, new documents and the submit step (0 -> 1) only
		if self.docstatus == 0 or self.is_new():
			return True
		before = self.get_doc_before_save()
		return before is None or before.docstatus == 0

	def before_submit(self):
		if self._approval_required() and not self.flags.get("mrn_workflow"):
			frappe.throw(
				_("A Material Request is approved by the Project Manager, not submitted directly. "
					"Use Send for Approval."),
				title=_("Approval required"),
			)

	def on_submit(self):
		self.db_set("status", "Approved" if self.flags.get("mrn_workflow") else "Submitted")

	def on_cancel(self):
		self.db_set("status", "Cancelled")