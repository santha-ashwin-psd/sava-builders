"""Project close / reopen (Sava A1).

A project can be closed only when it has no open MRN, LPO or GRN (labour
bills are added in Phase 2). A Closed project is then rejected on new
documents by utils/project_guard.py.

Endpoints
- get_project_close_status(project): what is still open, without changing anything
- close_project(project): close it, recording closed_by / closed_on
- reopen_project(project): Books Admin only, for mistakes
"""
import frappe
from frappe import _
from frappe.utils import now_datetime

from zoho_books_clone.utils.access import _membership, assert_can, assert_company

# (doctype, label, extra filters). A document counts as open when it matches.
# Extend this list for labour bills in Phase 2.
OPEN_DOCUMENT_RULES = (
    ("Material Request", "MRN", {
        "docstatus": ["<", 2],
        "status": ["in", ["Draft", "Submitted"]],
    }),
    ("Purchase Order", "LPO", {
        "docstatus": ["<", 2],
        "status": ["in", ["Draft", "Sent", "Confirmed", "To Receive", "Partially Received"]],
    }),
    ("Purchase Receipt", "GRN", {
        "docstatus": 0,
    }),
)

_NAMES_SHOWN = 5


def get_open_documents(project):
    """Return [{doctype, label, count, names}] for every kind that is still open."""
    open_docs = []
    for doctype, label, extra in OPEN_DOCUMENT_RULES:
        filters = {"project": project, **extra}
        count = frappe.db.count(doctype, filters)
        if not count:
            continue
        names = frappe.get_all(doctype, filters=filters, pluck="name",
                               order_by="creation asc", limit_page_length=_NAMES_SHOWN)
        open_docs.append({"doctype": doctype, "label": label, "count": count, "names": names})
    return open_docs


def _blockers_message(open_docs):
    parts = []
    for d in open_docs:
        shown = ", ".join(d["names"])
        more = d["count"] - len(d["names"])
        if more > 0:
            shown += _(" and {0} more").format(more)
        parts.append(f"{d['count']} {d['label']} ({shown})")
    return "; ".join(parts)


def _load_project(project):
    if not project or not frappe.db.exists("Project", project):
        frappe.throw(_("Project {0} not found").format(project), frappe.DoesNotExistError)
    doc = frappe.get_doc("Project", project)
    assert_company(doc.company)
    return doc


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_project_close_status(project):
    assert_can("Project", "read")
    doc = _load_project(project)
    open_docs = get_open_documents(doc.name) if doc.status != "Closed" else []
    return {
        "project": doc.name,
        "status": doc.status,
        "can_close": doc.status != "Closed" and not open_docs,
        "open": open_docs,
    }


@frappe.whitelist(allow_guest=False, methods=["POST"])
def close_project(project):
    assert_can("Project", "write")
    doc = _load_project(project)
    if doc.status == "Closed":
        frappe.throw(_("Project {0} is already Closed").format(doc.name))

    open_docs = get_open_documents(doc.name)
    if open_docs:
        frappe.throw(
            _("Can't close project {0} while these are open: {1}").format(
                doc.name, _blockers_message(open_docs)),
            title=_("Project has open documents"),
        )

    doc.status = "Closed"
    doc.closed_by = frappe.session.user
    doc.closed_on = now_datetime()
    doc.flags.allow_status_change = True
    doc.flags.ignore_permissions = True
    doc.save()
    return {"project": doc.name, "status": doc.status,
            "closed_by": doc.closed_by, "closed_on": str(doc.closed_on)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_project(project):
    if not _membership(frappe.session.user)["admin"]:
        frappe.throw(_("Only a Books Admin can reopen a project."), frappe.PermissionError)
    doc = _load_project(project)
    if doc.status != "Closed":
        frappe.throw(_("Project {0} is not Closed").format(doc.name))

    doc.status = "Open"
    doc.closed_by = None
    doc.closed_on = None
    doc.flags.allow_status_change = True
    doc.flags.ignore_permissions = True
    doc.save()
    return {"project": doc.name, "status": doc.status}