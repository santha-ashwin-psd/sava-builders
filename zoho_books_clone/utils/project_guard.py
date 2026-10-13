"""Project guard (Sava A1).

A Closed project can't be used on new documents. Wired in hooks.py as a
`validate` hook on every document that carries a `project` link: Material
Request (MRN), Purchase Order (LPO), Purchase Receipt (GRN), Delivery Note,
Stock Entry and Purchase Invoice.

Rules
- Draft (docstatus 0): any save against a Closed project is rejected.
- Submit (0 -> 1): rejected if the project is Closed.
- New document created straight at docstatus 1: rejected.
- Already-submitted documents are left alone, so editing after submit and
  cancelling (docstatus 2) keep working. Frappe does not run `validate`
  on cancel or update-after-submit, so nothing extra is needed for those.
"""
import frappe
from frappe import _


def validate_project_open(doc, method=None):
    project = doc.get("project")
    if not project:
        return

    status = frappe.db.get_value("Project", project, "status")
    if status != "Closed":
        return

    if _is_blocked(doc):
        frappe.throw(
            _("Project {0} is Closed. It can't be used on new documents.").format(project),
            title=_("Project Closed"),
        )


def _is_blocked(doc):
    if doc.docstatus == 0:
        return True

    # docstatus 1 reaching validate means a submit (0 -> 1) or a new doc
    # inserted already submitted; both count as using the project.
    before = doc.get_doc_before_save()
    return doc.is_new() or before is None or before.docstatus == 0