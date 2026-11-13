import frappe
from frappe import _
from frappe.model.document import Document
from psd_books.utils.naming import next_plain_name
from frappe.utils import nowdate


class MaterialRequest(Document):
	def autoname(self):
		# Plain sequential number (01, 02, ...), counter kept per doctype.
		# MRN only: if the latest MRN was deleted, its number is used again (a cancelled one still counts).
		self.name = next_plain_name(self.doctype, reuse_deleted=True)

	def validate(self):
		if not self.posting_date:
			self.posting_date = nowdate()
		if self.is_new() and not self.get("entry_date") and self._approval_required():
			frappe.throw(_("Entry Date is required."))
		if not self.items:
			frappe.throw(_("Material Request must have at least one item."))
		self._validate_max_items()
		for row in self.items:
			if not row.required_qty or row.required_qty <= 0:
				frappe.throw(_("Row for {0}: Required Qty must be greater than zero.").format(row.item_code))
		self._lock_while_pending()
		self._keep_status_server_side()
		self._default_row_warehouse()
		self._validate_mrn_fields()

	MAX_ITEMS = 10

	def _validate_max_items(self):
		"""A Material Request has at most 10 item rows. Not applied to Production Plan requests or to
		install/patch/migrate/tests; an existing request that already has more is only blocked if rows are added."""
		if self.get("production_plan") or any(frappe.flags.get(k) for k in ("in_install", "in_patch", "in_migrate", "in_test")):
			return
		count = len(self.items or [])
		if count <= self.MAX_ITEMS:
			return
		before = self.get_doc_before_save()
		if before is not None and count <= len(before.items or []):
			return
		frappe.throw(_("A Material Request can have at most {0} items. Raise a second request for the rest.").format(self.MAX_ITEMS))

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
		"""Sava A5: a new MRN needs a project and a delivery warehouse (Intended Use is optional).

		Not applied to Production Plan requests, to documents that are already submitted
		(editing after submit, cancel), or during install, patch, migrate and tests.
		"""
		if not self._mrn_rules_apply():
			return
		missing = []
		# an Asset request needs no project
		if not self.get("project") and self.material_request_type != "Asset":
			missing.append(_("Project"))
		if not self.get("delivery_warehouse"):
			missing.append(_("Delivery Warehouse"))
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

	def before_cancel(self):
		# Fail early, before anything is cancelled: refuse when a linked Purchase Order cannot be
		# cancelled along with this request (goods received / billed, or it also covers other MRNs).
		blocked = [p["reason"] for p in self._linked_po_plan() if p["action"] == "block"]
		if blocked:
			frappe.throw("<br>".join(blocked), title=_("Cannot cancel {0}").format(self.name))

	def on_cancel(self):
		self.db_set("status", "Cancelled")
		self._cancel_linked_purchase_orders()

	def _linked_po_plan(self):
		"""What to do with each live Purchase Order that covers this MRN (see classify_linked_po)."""
		from psd_books.invoicing.doctype.purchase_order.purchase_order import po_material_requests
		names = frappe.db.sql_list("""select distinct po.name
				from `tabPurchase Order` po
				left join `tabPurchase Order Item` poi on poi.parent = po.name
			 where po.docstatus < 2 and ifnull(po.status, '') != 'Cancelled'
				 and (po.material_request = %(mr)s or poi.material_request = %(mr)s)""", {"mr": self.name})
		plan = []
		for name in names:
			po = frappe.get_doc("Purchase Order", name)
			mrns = po_material_requests(po)
			if self.name not in mrns:
				continue
			has_grn = frappe.db.exists("Purchase Receipt", {"purchase_order": name, "docstatus": ["<", 2]})
			has_bill = frappe.db.exists("Purchase Invoice", {"purchase_order": name, "docstatus": ["<", 2], "is_return": 0})
			plan.append(dict(classify_linked_po(name, po.docstatus, self.name, mrns, bool(has_grn), bool(has_bill)), po=po))
		return plan

	def _cancel_linked_purchase_orders(self):
		"""A cancelled MRN takes its Purchase Orders with it. Orders not yet issued (Draft, Pending Approval,
		Sent Back) are closed the way the PO screen closes them; issued orders with nothing received or billed
		are cancelled normally. Anything else was already refused in before_cancel."""
		from psd_books.invoicing import po_approval_rules as rules
		note = _("Cancelled because Material Request {0} was cancelled.").format(self.name)
		for p in self._linked_po_plan():
			po = p["po"]
			if p["action"] == "cancel_unissued":
				for step in rules.cancel_open_steps(po):
					frappe.db.set_value("Purchase Order Approval", step.name, "status", step.status, update_modified=False)
			elif p["action"] == "cancel_issued":
				po.flags.ignore_permissions = True
				po.cancel()
			else:
				continue
			frappe.db.set_value("Purchase Order", po.name, "status", "Cancelled", update_modified=True)
			po.add_comment("Info", note)


def classify_linked_po(po_name, docstatus, mr_name, mrns, has_grn, has_bill):
	"""Decide what cancelling Material Request `mr_name` does to one live Purchase Order. Pure function.
	Returns {"po", "action", "reason"}; action is cancel_unissued (docstatus 0), cancel_issued (docstatus 1)
	or block."""
	other = [m for m in mrns if m != mr_name]
	if other:
		return {"po": po_name, "action": "block",
			"reason": _("Purchase Order {0} also covers Material Request {1}. Take this request's lines off the "
				"order, or cancel the order yourself first.").format(po_name, ", ".join(other))}
	if has_grn or has_bill:
		return {"po": po_name, "action": "block",
			"reason": _("Purchase Order {0} already has a GRN or bill. Cancel those (or the order, from the "
				"Purchase Orders screen) first.").format(po_name)}
	return {"po": po_name, "action": "cancel_issued" if docstatus == 1 else "cancel_unissued", "reason": ""}