import frappe
from frappe import _
from frappe.model.document import Document


PROJECT_STORE_ROLES = ("Project Main Store", "Site Store")
COMPANY_STORE_ROLES = ("Central Store", "Rejected Store")


class Warehouse(Document):
    def validate(self):
        if not self.warehouse_name:
            frappe.throw(_("Warehouse Name is required"))
        self.warehouse_name = self.warehouse_name.strip()
        self._validate_store_role()
        self._validate_racks()

    def _validate_store_role(self):
        """Sava A2: a warehouse can be a company-level store (Central / Rejected)
        or belong to one project (Project Main Store / Site Store). Plain
        warehouses (no role, no project) are untouched."""
        role = (self.get("store_role") or "").strip()
        project = (self.get("project") or "").strip()

        if not role:
            if project:
                frappe.throw(_("Select a Store Role for the project warehouse"))
            return

        if role in COMPANY_STORE_ROLES:
            if project:
                frappe.throw(_("{0} cannot be linked to a project").format(role))
            self._validate_single_company_store(role)
            return

        if not project:
            frappe.throw(_("{0} needs a Project").format(role))

        proj = frappe.db.get_value("Project", project, ["status", "company"], as_dict=True)
        if not proj:
            frappe.throw(_("Project {0} does not exist").format(project))

        # A Closed project can't gain a store, but an existing store keeps
        # working (and stays editable) after its project is closed.
        changed = True
        if not self.is_new():
            before = frappe.db.get_value(
                "Warehouse", self.name, ["store_role", "project"], as_dict=True)
            if before:
                changed = (before.store_role or "") != role or (before.project or "") != project
        if changed and proj.status == "Closed":
            frappe.throw(_("Project {0} is Closed. It can't be used on new documents.").format(project))

        if proj.company and self.company and proj.company != self.company:
            frappe.throw(_("Project {0} belongs to company {1}, not {2}").format(
                project, proj.company, self.company))

        if role == "Project Main Store" and not self.disabled:
            existing = frappe.db.get_value("Warehouse", {
                "project": project,
                "store_role": "Project Main Store",
                "disabled": 0,
                "name": ["!=", self.name or ""],
            }, "name")
            if existing:
                frappe.throw(_("Project {0} already has a Main Store ({1})").format(project, existing))

    def _validate_single_company_store(self, role):
        """Sava A2: one active Central Store and one active Rejected Store per
        company, so stock can't end up split across two of them. A disabled
        store doesn't count, so a store can be replaced by disabling the old
        one first."""
        if self.disabled or not self.company:
            return
        existing = frappe.db.get_value("Warehouse", {
            "company": self.company,
            "store_role": role,
            "disabled": 0,
            "name": ["!=", self.name or ""],
        }, "name")
        if existing:
            frappe.throw(_("Company {0} already has a {1} ({2})").format(
                self.company, role, existing))

    def _validate_racks(self):
        """
        Rack numbers are label-only and only need to be unique *within* this
        warehouse (the same rack name/number is fine in a different warehouse,
        since each Warehouse Rack row belongs to its own parent).

        Also blocks removing/renaming a rack that's still referenced by a Bin
        in this warehouse, so Bin.rack_no never points at a rack that no
        longer exists in the warehouse's rack list.
        """
        seen = set()
        current_rack_nos = set()
        for row in self.get("racks") or []:
            rack_no = (row.rack_no or "").strip()
            if not rack_no:
                frappe.throw(_("Row #{0}: Rack No is required").format(row.idx))
            row.rack_no = rack_no
            key = rack_no.lower()
            if key in seen:
                frappe.throw(
                    _("Rack '{0}' is duplicated in this warehouse. Rack numbers must be unique within a warehouse.").format(rack_no)
                )
            seen.add(key)
            current_rack_nos.add(rack_no)

        if not self.is_new():
            in_use = frappe.get_all(
                "Bin",
                filters={"warehouse": self.name, "rack_no": ["not in", [""]]},
                fields=["rack_no"],
                pluck="rack_no",
            )
            removed = {r for r in in_use if r and r not in current_rack_nos}
            if removed:
                frappe.throw(
                    _("Cannot remove rack(s) {0} — they are still assigned to items in stock in this warehouse. Clear the rack assignment on those items first.").format(
                        ", ".join(sorted(removed))
                    )
                )

    def before_save(self):
        # Ensure a Bin record exists for any items already associated with this warehouse
        pass

    def on_trash(self):
        # Prevent deletion if stock exists
        if frappe.db.exists("Bin", {"warehouse": self.name, "actual_qty": [">", 0]}):
            frappe.throw(
                _("Cannot delete Warehouse '{0}' — it has stock. Clear all stock first.").format(self.name)
            )

    @frappe.whitelist()
    def get_stock_summary(self):
        """Return all Bins for this warehouse with current stock."""
        return frappe.get_all(
            "Bin",
            filters={"warehouse": self.name, "actual_qty": [">", 0]},
            fields=["item_code", "actual_qty", "valuation_rate", "stock_value"],
            order_by="item_code asc",
        )