from __future__ import annotations
"""
Customer Portal Access — lets a Books user set a login email + password on a
Customer record so that customer can log into the separate `customer_portal`
app. This deliberately keeps using Frappe's standard User/session system
(path 1 from the design discussion) rather than building a parallel auth
system:

  Customer (books) --[Portal User child row]--> User (frappe core, role "Customer")

Login itself goes through the standard /login route. `customer_portal`'s
hooks.py `role_home_page = {"Customer": "portal"}` redirects any User with
role "Customer" to /portal after login, and
`customer_portal/www/get_base_context.py` resolves that logged-in User back
to a Customer via the Portal User child table (or a matching Contact).

The email the customer logs in with is the User's `name` (its email) — not
the Customer's own naming-series ID (e.g. CUST-2026-00001).

Password handling mirrors `api/admin.py`'s pattern for internal Books users
(`invite_user` / `admin_reset_user_password`): never touch the password hash
directly, always go through `frappe.utils.password.update_password`, which
takes care of proper hashing.
"""
import frappe
from frappe import _
from frappe.utils.password import update_password

from psd_books.utils.access import assert_can
from psd_books.api.docs import _assert_doc_tenancy

PORTAL_ROLE = "Customer"

# The customer portal is not used in this project. While this is False the
# endpoints below create nothing and change nothing. Set it to True to turn
# the portal login back on.
PORTAL_ENABLED = False


def _portal_off():
    if not PORTAL_ENABLED:
        frappe.throw(_("The customer portal is not used in this project."))


def _get_customer(customer: str):
    doc = frappe.get_doc("Customer", customer)
    _assert_doc_tenancy(doc)
    return doc


def _ensure_portal_role_exists():
    """The customer_portal app's role_home_page hook already references a
    "Customer" role without shipping it as a fixture, so on a fresh site it
    may not exist yet. Create it defensively (Website User accounts, no
    desk access) rather than failing the whole flow on a missing role."""
    if frappe.db.exists("Role", PORTAL_ROLE):
        return
    role = frappe.new_doc("Role")
    role.role_name = PORTAL_ROLE
    role.desk_access = 0
    role.insert(ignore_permissions=True)


def _portal_row(doc):
    """Return the first Portal User child row with a linked User, or None."""
    for row in doc.get("portal_users") or []:
        if row.user:
            return row
    return None


def _assert_email_not_taken(email: str, customer: str):
    """Make sure `email` isn't already wired up as some OTHER customer's
    portal login. Must run unconditionally — first-time setup included —
    not just when an existing login's email is being changed, otherwise a
    brand-new portal login can silently steal an email that already belongs
    to another customer's Portal User row."""
    other_customer = frappe.db.get_value(
        "Portal User", {"user": email, "parenttype": "Customer"}, "parent"
    )
    if other_customer and other_customer != customer:
        frappe.throw(
            _("{0} is already the portal login for another customer.").format(email)
        )


@frappe.whitelist(allow_guest=False)
def get_portal_login_status(customer):
    """Current portal-login state for a Customer: whether a linked User
    exists, its login email, and whether that User is enabled."""
    if not PORTAL_ENABLED:
        return {"has_login": False, "email": None, "enabled": False}
    doc = _get_customer(customer)
    assert_can("Customer", "read")

    row = _portal_row(doc)
    if not row:
        return {"has_login": False, "email": None, "enabled": False}

    enabled = frappe.db.get_value("User", row.user, "enabled")
    if enabled is None:
        # Stale Portal User row pointing at a User that no longer exists.
        return {"has_login": False, "email": None, "enabled": False}
    return {"has_login": True, "email": row.user, "enabled": bool(enabled)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def set_portal_login(customer, email, password=None, enabled=1):
    """Create or update the Customer's portal login.

    - No existing login for this customer -> creates a new Website User
      (role "Customer", no desk access) and requires a password.
    - Existing login, same email -> updates enabled state and, if a new
      password was given, resets it via update_password.
    - Existing login, different email -> re-points the Customer's Portal
      User row at the new email (creating that User if needed) and disables
      the old User account as a safety default, without deleting it (Users
      are shared/global records other parts of the system may reference).

    In every case, `email` is checked up front against every OTHER
    customer's Portal User row so one customer's portal login can never be
    silently taken over by another customer.
    """
    _portal_off()
    _ensure_portal_role_exists()
    doc = _get_customer(customer)
    assert_can("Customer", "write")

    email = (email or "").strip().lower()
    if not email:
        frappe.throw(_("Login email is required"))

    password = (password or "").strip()
    if password and len(password) < 8:
        frappe.throw(_("Password must be at least 8 characters"))

    enabled = 1 if str(enabled).lower() in ("1", "true") else 0

    existing_row = _portal_row(doc)
    old_email = existing_row.user if existing_row else None

    # Ownership check now runs unconditionally (first-time setup included),
    # not just when the email is changing.
    _assert_email_not_taken(email, customer)

    user_exists = frappe.db.exists("User", email)

    if user_exists:
        user = frappe.get_doc("User", email)
        # Don't silently take over an existing internal Books/system account —
        # only ever reuse a User that is already a portal (non-system) login,
        # or genuinely new to the system.
        already_portal_user = user.user_type != "System User"
        if not already_portal_user:
            frappe.throw(
                _("{0} already exists as an internal system user and can't be used as a customer login.").format(email)
            )
        # Guard against taking over an orphaned/unrelated Website User: the
        # ownership check above only catches Users already linked via a
        # Portal User row. A Website User with no Portal User row at all
        # (stray account, or something unrelated to Books) is a foreign
        # account too — only reuse it if it already carries the Customer
        # portal role, otherwise refuse rather than silently repurposing it.
        already_customer_role = any(r.role == PORTAL_ROLE for r in user.roles)
        if not already_customer_role and not old_email:
            frappe.throw(
                _(
                    "{0} already exists as a website user unrelated to any customer portal login. "
                    "Use a different email or resolve that account first."
                ).format(email)
            )
        if password:
            update_password(email, password)
        user.enabled = enabled
        if not already_customer_role:
            user.append("roles", {"role": PORTAL_ROLE})
        user.save(ignore_permissions=True)
    else:
        if not password:
            frappe.throw(_("A password is required to create a new portal login"))
        user = frappe.new_doc("User")
        user.email = email
        user.first_name = doc.customer_name or email.split("@")[0]
        user.user_type = "Website User"
        user.send_welcome_email = 0
        user.enabled = enabled
        user.new_password = password
        user.append("roles", {"role": PORTAL_ROLE})
        user.insert(ignore_permissions=True)

    if old_email and old_email != email:
        try:
            frappe.db.set_value("User", old_email, "enabled", 0)
        except Exception:
            pass  # best-effort — don't fail the whole request over this

    # Re-point the Customer's Portal User child table at the current email.
    doc.set("portal_users", [])
    doc.append("portal_users", {"user": email})
    doc.save(ignore_permissions=True)
    frappe.db.commit()

    return {"success": True, "email": email, "enabled": bool(enabled)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def toggle_portal_login(customer, enabled):
    """Enable or disable the Customer's existing portal login without
    touching its email or password."""
    _portal_off()
    doc = _get_customer(customer)
    assert_can("Customer", "write")

    row = _portal_row(doc)
    if not row:
        frappe.throw(_("This customer has no portal login set up yet."))

    enabled = 1 if str(enabled).lower() in ("1", "true") else 0
    frappe.db.set_value("User", row.user, "enabled", enabled)
    frappe.db.commit()
    return {"success": True, "email": row.user, "enabled": bool(enabled)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reset_portal_password(customer, new_password):
    """Reset the password on the Customer's existing portal login."""
    _portal_off()
    doc = _get_customer(customer)
    assert_can("Customer", "write")

    row = _portal_row(doc)
    if not row:
        frappe.throw(_("This customer has no portal login set up yet."))

    new_password = (new_password or "").strip()
    if len(new_password) < 8:
        frappe.throw(_("Password must be at least 8 characters"))

    update_password(row.user, new_password)
    frappe.db.commit()
    return {"success": True, "email": row.user}