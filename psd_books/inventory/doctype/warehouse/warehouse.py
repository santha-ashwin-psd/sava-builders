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
        self._validate_projects()
        self._validate_store_role()

    def _project_names(self):
        return [(r.project or "").strip() for r in (self.get("projects") or []) if (r.project or "").strip()]

    def _validate_projects(self):
        """Sava A2/A13: a warehouse can be shared by several projects. Each row
        must be a real project of this company. A Closed project can't be added,
        but an existing row keeps working after the project is closed."""
        before = set()
        if not self.is_new():
            before = set(frappe.get_all("Warehouse Project",
                filters={"parent": self.name, "parenttype": "Warehouse", "parentfield": "projects"},
                pluck="project"))
        seen = set()
        for row in self.get("projects") or []:
            proj_name = (row.project or "").strip()
            if not proj_name:
                frappe.throw(_("Row #{0}: Project is required").format(row.idx))
            if proj_name in seen:
                frappe.throw(_("Project {0} is listed twice in this warehouse").format(proj_name))
            seen.add(proj_name)
            row.project = proj_name
            proj = frappe.db.get_value("Project", proj_name, ["status", "company"], as_dict=True)
            if not proj:
                frappe.throw(_("Project {0} does not exist").format(proj_name))
            if proj_name not in before and proj.status == "Closed":
                frappe.throw(_("Project {0} is Closed. It can't be used on new documents.").format(proj_name))
            if proj.company and self.company and proj.company != self.company:
                frappe.throw(_("Project {0} belongs to company {1}, not {2}").format(
                    proj_name, proj.company, self.company))

    def _validate_store_role(self):
        """Sava A2: a warehouse is either a company-level store (Central / Rejected,
        no projects) or a project store (Project Main Store / Site Store, at least
        one project). Plain warehouses (no role) are untouched."""
        role = (self.get("store_role") or "").strip()
        projects = self._project_names()

        if not role:
            if projects:
                frappe.throw(_("Select a Store Role for a warehouse that has projects"))
            return

        if role in COMPANY_STORE_ROLES:
            if projects:
                frappe.throw(_("{0} cannot be linked to a project").format(role))
            self._validate_single_company_store(role)
            return

        if not projects:
            frappe.throw(_("{0} needs at least one Project").format(role))

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