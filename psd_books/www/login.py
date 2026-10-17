import frappe

no_cache = 1


def get_context(context):
    redirect_to = frappe.local.request.args.get("redirect-to") or "/books"

    # Prevent open redirects — only allow same-origin paths
    if not redirect_to.startswith("/"):
        redirect_to = "/books"

    # Already logged in — send to destination. A Customer-role user (the
    # customer_portal app) always belongs on /portal, regardless of what
    # redirect-to happened to be on the URL — see api/auth.get_post_login_redirect
    # for why this can't just be left to role_home_page.
    if frappe.session.user and frappe.session.user != "Guest":
        roles = frappe.get_roles(frappe.session.user)
        if "Customer" in roles and "System Manager" not in roles:
            redirect_to = "/portal"
        frappe.local.flags.redirect_location = redirect_to
        raise frappe.Redirect

    context.no_header = 1
    context.no_footer = 1
    context.no_sidebar = 1
    context.title = "Sign In — Books"
    context.redirect_to = redirect_to

    # CSRF token — available even for guest sessions
    try:
        context.csrf_token = frappe.session.data.csrf_token or ""
    except Exception:
        context.csrf_token = ""

    return context