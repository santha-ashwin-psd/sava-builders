"""A10.5 live check: the data the Purchase Order print reads, and the rebuilt bundle.

Put this file in the app folder (next to a10_check.py), then from ~/sava-bench:

	bench --site sava execute psd_books.a10_print_check.run

It does not open a browser: the print layout itself (KES words, VAT line, Vendor / Deliver To box, payment
details) was tested with a node script; this checks the pieces that depend on your site.
"""
import os

import frappe

from psd_books import a9_check as A

ok, fail, check = A.ok, A.fail, A.check

SUPPLIER_FIELDS = ("tax_id", "mobile_no", "phone", "address_line1", "address_line2", "city", "state", "pincode",
	"country", "payment_terms")
PAYMENT_TERMS_FIELDS = ("credit_days", "description")
PO_FIELDS = ("supplier_name", "expected_delivery_date", "billing_address", "delivery_address", "taxes", "net_total",
	"total_tax", "grand_total", "terms")
BUNDLE_NEEDLES = ("Kenya Shillings", "Payment Details :", "Deliver To", "KRA PIN :", "Total Amount in Words :",
	"Delivery Date :")


def pkg_path(*parts):
	return os.path.join(frappe.get_app_path("psd_books"), *parts)


def read(path):
	try:
		with open(path, encoding="utf-8") as f:
			return f.read()
	except OSError:
		return None


def data_checks():
	print("\n--- 1: fields the PO print reads exist on this site ---")
	for dt, fields in (("Supplier", SUPPLIER_FIELDS), ("Payment Terms", PAYMENT_TERMS_FIELDS), ("Purchase Order", PO_FIELDS)):
		meta = frappe.get_meta(dt)
		missing = [f for f in fields if not meta.get_field(f)]
		check("%s has %s" % (dt, ", ".join(fields)), not missing, missing)
	linked = frappe.get_all("Supplier", filters={"payment_terms": ["is", "set"]}, fields=["name", "payment_terms"], limit=200)
	dangling = [s.name for s in linked if not frappe.db.exists("Payment Terms", s.payment_terms)]
	check("every supplier payment term points at an existing Payment Terms record (%d suppliers have one)" % len(linked),
		not dangling, dangling)


def source_checks():
	print("\n--- 2: screen source ---")
	vue = read(pkg_path("public", "js", "books_vue", "src", "pages", "PurchaseOrders.vue"))
	live = read(pkg_path("public", "js", "books_vue", "src", "composables", "useLivePreview.js"))
	mail = read(pkg_path("public", "js", "books_vue", "src", "components", "EmailDialog.vue"))
	if vue is None or live is None or mail is None:
		fail("source files not found")
		return
	check("PurchaseOrders.vue uses PO_PRINT_CONFIG for download and email",
		vue.count("PO_PRINT_CONFIG") >= 4 and 'partyField: "supplier_name" }' not in vue, vue.count("PO_PRINT_CONFIG"))
	check("the email attachment prepares the PO the same way", "prepareDoc" in mail and "prepareDoc: preparePOPrint" in vue)
	check("the invoice wording is still the default (only the PO overrides it)",
		"Total Invoice Amount in Words :" in live and "E. &amp; O. E." in live)


def bundle_checks():
	print("\n--- 3: rebuilt bundle ---")
	bpath = pkg_path("public", "js", "books.js")
	js = read(bpath)
	if js is None:
		fail("bundle not found at %s (run npm run build, then bench build --app psd_books)" % bpath)
		return
	for needle in BUNDLE_NEEDLES:
		check("bundle contains %s" % needle, needle in js)
	for rel in (("pages", "PurchaseOrders.vue"), ("composables", "useLivePreview.js"), ("components", "EmailDialog.vue")):
		p = pkg_path("public", "js", "books_vue", "src", *rel)
		if os.path.exists(p):
			check("bundle is newer than %s" % rel[-1], os.path.getmtime(bpath) >= os.path.getmtime(p))


def run():
	frappe.set_user("Administrator")
	for fn in (data_checks, source_checks, bundle_checks):
		try:
			fn()
		except Exception:  # noqa: BLE001
			import traceback
			fail("%s crashed:\n%s" % (fn.__name__, traceback.format_exc()))
	print("\nDone: %d OK, %d FAILED" % (A.RESULT["ok"], A.RESULT["failed"]))