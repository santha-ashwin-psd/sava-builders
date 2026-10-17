from __future__ import annotations
"""
Per-company SMTP — used for all BUSINESS email:
  invoices, payment reminders, statements, customer notifications, etc.

Each Books Company stores its own SMTP credentials. This helper reads them,
sends via raw smtplib, and refuses to fall back to the system OTP SMTP
(which is reserved for pre-auth flows only).
"""
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

import frappe
from frappe import _


class CompanySmtpNotConfigured(Exception):
    """Raised when the company has not configured SMTP yet."""


def _resolve_company(company: str | None) -> str:
    if company:
        return company
    user = frappe.session.user
    if not user or user in ("Guest", "Administrator"):
        frappe.throw(_("No active session — cannot resolve company for email."))
    name = frappe.db.get_value("Books Company Member", {"user": user}, "company")
    if not name:
        frappe.throw(_("Your user is not linked to any Books Company."))
    return name


def get_company_smtp_config(company: str | None = None) -> dict:
    """Return the company's decrypted SMTP config. Raises CompanySmtpNotConfigured if unset."""
    company = _resolve_company(company)
    doc = frappe.get_doc("Books Company", company)
    cfg = doc.get_smtp_config()
    if not cfg:
        raise CompanySmtpNotConfigured(
            f"Company '{company}' has not configured SMTP. "
            f"Ask the company admin to set it up under Settings → Email."
        )
    return cfg


def _smtp_send(
    cfg: dict,
    to: str | list[str],
    subject: str,
    html: str,
    text_fallback: str = "",
    cc: list[str] | None = None,
    attachments: list[dict] | None = None,
) -> bool:
    """Low-level send via an SMTP config dict. The config shape is identical for
    the per-company SMTP and the platform (system/wecode) SMTP, so both routes
    reuse this single sender. `attachments`, if given, is a list of dicts as
    returned by frappe.attach_print(), each with "fname" and "fcontent" keys."""
    recipients = [to] if isinstance(to, str) else list(to)
    cc_list = list(cc or [])

    msg = MIMEMultipart("alternative" if not attachments else "mixed")
    msg["Subject"] = subject
    msg["From"] = formataddr((cfg["from_name"], cfg["from_email"]))
    msg["To"] = ", ".join(recipients)
    if cc_list:
        msg["Cc"] = ", ".join(cc_list)

    body = MIMEMultipart("alternative") if attachments else msg
    if text_fallback:
        body.attach(MIMEText(text_fallback, "plain", "utf-8"))
    body.attach(MIMEText(html, "html", "utf-8"))
    if attachments:
        msg.attach(body)
        from email.mime.application import MIMEApplication
        for att in attachments:
            fname = att.get("fname") or "attachment"
            fcontent = att.get("fcontent") or b""
            part = MIMEApplication(fcontent, Name=fname)
            part["Content-Disposition"] = f'attachment; filename="{fname}"'
            msg.attach(part)

    envelope_to = recipients + cc_list

    if cfg["use_ssl"]:
        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL(cfg["server"], cfg["port"], context=ctx, timeout=20) as server:
            server.login(cfg["login"], cfg["password"])
            server.sendmail(cfg["from_email"], envelope_to, msg.as_string())
    else:
        with smtplib.SMTP(cfg["server"], cfg["port"], timeout=20) as server:
            server.ehlo()
            if cfg["use_tls"]:
                server.starttls(context=ssl.create_default_context())
                server.ehlo()
            server.login(cfg["login"], cfg["password"])
            server.sendmail(cfg["from_email"], envelope_to, msg.as_string())
    return True


def send_company_email(
    to: str | list[str],
    subject: str,
    html: str,
    company: str | None = None,
    text_fallback: str = "",
    cc: list[str] | None = None,
    attachments: list[dict] | None = None,
) -> bool:
    """Send strictly via the company's configured SMTP.
    Raises CompanySmtpNotConfigured if the company hasn't set up SMTP."""
    cfg = get_company_smtp_config(company)
    return _smtp_send(cfg, to, subject, html, text_fallback, cc, attachments)


def send_business_email(
    to: str | list[str],
    subject: str,
    html: str,
    company: str | None = None,
    text_fallback: str = "",
    cc: list[str] | None = None,
    attachments: list[dict] | None = None,
) -> str:
    """Send a customer/vendor-facing email (invoices, reminders, statements …).

    Routing:
      • If the company has **enabled & fully configured** its own SMTP → use it.
      • Otherwise → use the platform (system) SMTP — wecode18@gmail.com — which
        always works out of the box. This is the default.

    A configured-but-failing company SMTP is logged and also falls back to the
    platform SMTP, so a send never hard-fails on a transient problem. Sign-in /
    OTP email is unaffected — it always uses the system SMTP directly.

    Returns "company" or "system" to indicate which transport was used.
    """
    try:
        cfg = get_company_smtp_config(company)
    except CompanySmtpNotConfigured:
        cfg = None
    if cfg:
        try:
            _smtp_send(cfg, to, subject, html, text_fallback, cc, attachments)
            return "company"
        except Exception:
            frappe.log_error(frappe.get_traceback(), "Company SMTP send failed; using platform SMTP")

    from psd_books.utils.email_system import get_system_smtp_config
    _smtp_send(get_system_smtp_config(), to, subject, html, text_fallback, cc, attachments)
    return "system"


def test_company_smtp(
    to: str,
    company: str | None = None,
    overrides: dict | None = None,
) -> dict:
    """Test SMTP connectivity. If `overrides` is given, uses those instead of the saved config
    (lets the admin verify creds before saving). Returns {success, message}."""
    if overrides:
        cfg = {
            "server":   overrides.get("smtp_server", ""),
            "port":     int(overrides.get("smtp_port") or 587),
            "login":    overrides.get("smtp_login", ""),
            "password": overrides.get("smtp_password", ""),
            "use_tls":  bool(int(overrides.get("smtp_use_tls", 1))),
            "use_ssl":  bool(int(overrides.get("smtp_use_ssl", 0))),
            "from_email": overrides.get("smtp_from_email") or overrides.get("smtp_login", ""),
            "from_name":  overrides.get("smtp_from_name") or "Books",
        }
        if not (cfg["server"] and cfg["login"] and cfg["password"]):
            return {"success": False, "message": "SMTP server, username, and password are required."}
    else:
        try:
            cfg = get_company_smtp_config(company)
        except CompanySmtpNotConfigured as exc:
            return {"success": False, "message": str(exc)}

    msg = MIMEText("This is a test email from Books. If you received it, your SMTP is working.", "plain", "utf-8")
    msg["Subject"] = "Books — SMTP Test"
    msg["From"] = formataddr((cfg["from_name"], cfg["from_email"]))
    msg["To"] = to

    try:
        if cfg["use_ssl"]:
            with smtplib.SMTP_SSL(cfg["server"], cfg["port"], context=ssl.create_default_context(), timeout=15) as s:
                s.login(cfg["login"], cfg["password"])
                s.sendmail(cfg["from_email"], [to], msg.as_string())
        else:
            with smtplib.SMTP(cfg["server"], cfg["port"], timeout=15) as s:
                s.ehlo()
                if cfg["use_tls"]:
                    s.starttls(context=ssl.create_default_context())
                    s.ehlo()
                s.login(cfg["login"], cfg["password"])
                s.sendmail(cfg["from_email"], [to], msg.as_string())
        return {"success": True, "message": f"Test email sent to {to}."}
    except smtplib.SMTPAuthenticationError as exc:
        return {"success": False, "message": f"Authentication failed: {exc.smtp_error.decode() if isinstance(exc.smtp_error, bytes) else exc.smtp_error}"}
    except Exception as exc:
        return {"success": False, "message": f"SMTP error: {exc}"}