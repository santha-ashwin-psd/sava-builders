"""A10.3 data and wiring check: what the Purchase Order screen reads and calls, without a browser.

Put this file in the app folder (next to a10_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a10_ui_check.run

Reuses the a9_check seed and users, plus the read-only Finance approver from a9_ui_check (Finance role,
Books Viewer membership). Creates TEST data only. Safe to run again.

1  source: every endpoint PurchaseOrders.vue calls exists, is whitelisted, takes the parameters the screen
   sends and uses the HTTP method the screen uses
2  client read-only guard: which approval endpoints it treats as writes (printed as NOTE, not a failure)
3  bundle: the rebuilt books.js contains the new screen code and is newer than the .vue file
4  data: the drawer's own save payload, what the panel reads (Draft, Pending Approval, Sent Back,
   submitted) as each real user, edit while Sent Back keeps the approval history, a read-only approver
   approves the last level

Not covered: browser rendering (badges, timeline, panel layout, buttons), the VAT boundaries on a real PO,
LPOs split over two suppliers.
"""
import inspect
import os
import re

import frappe
from frappe.utils import nowdate

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as T
from psd_books import a9_ui_check as U

ok, fail, check, expect_ok, expect_block, as_user = T.ok, T.fail, T.check, T.expect_ok, T.expect_block, T.as_user
RAISER, PM, FIN, VIEWER = T.RAISER, T.PM, T.FIN, U.VIEWER_FIN

MOD = "psd_books.api.purchase_order_approval"
EXPECTED_CALLS = {"get_approval_state", "send_for_approval", "approve_po", "send_back_po", "cancel_po"}
STATE_KEYS = {"name", "status", "docstatus", "grand_total", "raised_by", "rejection_reason", "approval_steps",
	"can_send", "preview_roles", "action", "can_cancel"}
ACTION_KEYS = {"level", "role", "can_act", "reason"}
STEP_KEYS = {"level", "role", "status", "approver", "approved_on", "remarks"}


def pkg_path(*parts):
	return os.path.join(frappe.get_app_path("psd_books"), *parts)


def read(path):
	try:
		with open(path, encoding="utf-8") as f:
			return f.read()
	except OSError:
		return None


# --- 1: source wiring --------------------------------------------------------
def wiring():
	print("\n--- 1: what PurchaseOrders.vue calls (source) ---")
	path = pkg_path("public", "js", "books_vue", "src", "pages", "PurchaseOrders.vue")
	src = read(path)
	if src is None:
		fail("PurchaseOrders.vue not found at %s" % path)
		return
	calls = re.findall(r'(apiGET|apiPOST)\(\s*"%s\.(\w+)"\s*,\s*\{([^}]*)\}' % re.escape(MOD), src)
	check("the screen calls exactly the five approval endpoints", {c[1] for c in calls} == EXPECTED_CALLS,
		sorted({c[1] for c in calls}))
	for verb, name, args in calls:
		label = "%s (%s)" % (name, verb)
		try:
			fn = frappe.get_attr("%s.%s" % (MOD, name))
		except Exception as e:  # noqa: BLE001
			fail("%s: endpoint missing: %s" % (label, e))
			continue
		check("%s is whitelisted" % label, fn in frappe.whitelisted)
		allowed = getattr(frappe, "allowed_http_methods_for_whitelisted_func", {}).get(fn)
		want = "GET" if verb == "apiGET" else "POST"
		if allowed is None:
			print("INFO    %s: HTTP methods not readable on this Frappe, skipped" % label)
		else:
			check("%s allows %s" % (label, want), want in [m.upper() for m in allowed], allowed)
		sent_keys = set(re.findall(r"(\w+)\s*:", args))
		params = inspect.signature(inspect.unwrap(fn)).parameters
		required = {p for p, v in params.items() if v.default is inspect.Parameter.empty}
		check("%s: screen sends %s, endpoint takes %s" % (label, sorted(sent_keys), sorted(params)),
			sent_keys <= set(params) and required <= sent_keys, (sent_keys, sorted(params)))


# --- 2: client read-only guard ------------------------------------------------
def client_guard():
	print("\n--- 2: client read-only guard (api/client.js) ---")
	js = read(pkg_path("public", "js", "books_vue", "src", "api", "client.js"))
	m = re.search(r"_WRITE_VERB\s*=\s*/(.*)/;", js or "")
	if not m:
		fail("could not read _WRITE_VERB from client.js")
		return
	rx = re.compile(m.group(1))
	for name in ("send_for_approval", "approve_po", "send_back_po", "get_approval_state"):
		blocked = bool(rx.search("%s.%s" % (MOD, name)))
		print("NOTE    %s is %s by the client guard for a read-only (Books Viewer) user" % (
			name, "BLOCKED as a write" if blocked else "allowed (not treated as a write)"))
	ok("client guard read (see the NOTE lines)")


# --- 3: bundle ------------------------------------------------------------------
def bundle():
	print("\n--- 3: rebuilt bundle ---")
	bpath = pkg_path("public", "js", "books.js")
	vpath = pkg_path("public", "js", "books_vue", "src", "pages", "PurchaseOrders.vue")
	js = read(bpath)
	if js is None:
		fail("bundle not found at %s (run npm run build, then bench build --app psd_books)" % bpath)
		return
	for needle in ("purchase_order_approval.get_approval_state", "purchase_order_approval.send_for_approval",
			"purchase_order_approval.approve_po", "purchase_order_approval.send_back_po", "Send for approval"):
		check("bundle contains %s" % needle, needle in js)
	if "Issue PO" in js:
		print("NOTE    'Issue PO' still appears in the bundle (another screen, or an old build)")
	if os.path.exists(vpath):
		check("bundle is newer than PurchaseOrders.vue (rebuilt after the last edit)",
			os.path.getmtime(bpath) >= os.path.getmtime(vpath), (os.path.getmtime(bpath), os.path.getmtime(vpath)))


# --- 4: data ----------------------------------------------------------------------
def po_payload(supplier, rate, name=None, status="Draft"):
	"""The document PurchaseOrders.vue savePO() sends to save_doc."""
	uom = frappe.db.get_value("Item", S.ITEM, "stock_uom") or ""
	doc = {
		"doctype": "Purchase Order", "company": S.CO, "supplier": supplier, "transaction_date": nowdate(),
		"purchase_type": "Goods", "expected_delivery_date": frappe.utils.add_days(nowdate(), 7),
		"billing_address": "", "delivery_address": "", "billing_address_name": "", "delivery_address_name": "",
		"set_warehouse": "", "material_request": "", "project": S.PROJECT, "status": status, "docstatus": 0, "terms": "",
		"items": [{"doctype": "Purchase Order Item", "item_code": S.ITEM, "description": S.ITEM, "qty": 100,
			"rate": rate, "amount": rate * 100, "uom": uom, "tax_code": ""}],
		"taxes": []}
	if name:
		doc["name"] = name
	return doc


def view(name, user):
	from psd_books.api import purchase_order_approval as api
	return as_user(user, lambda: api.get_approval_state(name))


def scenario():
	print("\n--- 4: screen data: 250,000 -> two levels, send back, edit, read-only approver ---")
	from psd_books.api import docs
	from psd_books.api import purchase_order_approval as api

	supplier = S.seed()[0]
	rec = expect_ok("raiser saves a Draft with the drawer's own payload (save_doc)",
		lambda: as_user(RAISER, lambda: docs.save_doc(po_payload(supplier, 2500))))
	if not rec:
		return
	name = rec["name"]

	# Draft
	s = expect_ok("Draft: approval state readable by the raiser", lambda: view(name, RAISER))
	if not s:
		return
	check("state has every key the panel reads", STATE_KEYS <= set(s), sorted(STATE_KEYS - set(s)))
	check("action has level, role, can_act, reason", ACTION_KEYS <= set(s["action"]), s["action"])
	check("Draft: can send, preview needs Purchase Manager then Finance, no steps yet",
		s["status"] == "Draft" and s["can_send"] and s["preview_roles"] == ["Purchase Manager", "Finance"]
		and not s["approval_steps"], s)
	check("Draft: nobody can act", not s["action"]["can_act"], s["action"])
	d = expect_ok("drawer read: get_doc as the raiser", lambda: as_user(RAISER, lambda: docs.get_doc("Purchase Order", name)))
	check("get_doc has the items and total 250,000", d and len(d["items"]) == 1 and float(d["grand_total"]) == 250000, d and d.get("grand_total"))
	expect_ok("drawer read: get_doc as the read-only approver", lambda: as_user(VIEWER, lambda: docs.get_doc("Purchase Order", name)))

	# Pending Approval
	expect_ok("raiser sends for approval", lambda: as_user(RAISER, lambda: api.send_for_approval(name)))
	s = view(name, RAISER)
	check("Pending: status, two steps with every column, not sendable",
		s["status"] == "Pending Approval" and len(s["approval_steps"]) == 2
		and all(STEP_KEYS <= set(st) for st in s["approval_steps"]) and not s["can_send"] and not s["preview_roles"], s)
	check("Pending: raised_by is the raiser", s["raised_by"] == RAISER, s["raised_by"])
	a = s["action"]
	check("Pending: raiser sees level 1 (Purchase Manager), can't act, gets a reason",
		a["level"] == 1 and a["role"] == "Purchase Manager" and not a["can_act"] and a["reason"], a)
	check("Pending: Purchase Manager can act", view(name, PM)["action"]["can_act"])
	a = view(name, FIN)["action"]
	check("Pending: Finance can't act on level 1, reason names the role", not a["can_act"] and "Purchase Manager" in (a["reason"] or ""), a)
	a = expect_ok("Pending: read-only approver can read the state", lambda: view(name, VIEWER))
	check("Pending: read-only Finance approver can't act on level 1", a and not a["action"]["can_act"], a and a["action"])

	# Sent Back
	reason = "Rate too high, renegotiate"
	expect_ok("Purchase Manager sends back with a reason", lambda: as_user(PM, lambda: api.send_back_po(name, reason)))
	s = view(name, RAISER)
	check("Sent Back: status, reason, can send again, preview roles",
		s["status"] == "Sent Back" and s["rejection_reason"] == reason and s["can_send"]
		and s["preview_roles"] == ["Purchase Manager", "Finance"], s)
	st = s["approval_steps"][0] if s["approval_steps"] else {}
	check("Sent Back: level 1 shows Rejected, the approver and the reason as remarks",
		st.get("status") == "Rejected" and st.get("approver") == PM and st.get("remarks") == reason, st)
	check("Sent Back: nobody can act", not s["action"]["can_act"], s["action"])

	# edit through the drawer while Sent Back keeps the history
	expect_ok("edit while Sent Back through the drawer payload (rate 2600)",
		lambda: as_user(RAISER, lambda: docs.save_doc(po_payload(supplier, 2600, name, "Sent Back"))))
	row = frappe.db.get_value("Purchase Order", name, ["status", "docstatus", "grand_total", "rejection_reason", "raised_by"], as_dict=True)
	check("after the edit: still Sent Back, total 260,000, reason and sender kept",
		row.status == "Sent Back" and row.docstatus == 0 and float(row.grand_total) == 260000
		and row.rejection_reason == reason and row.raised_by == RAISER, row)
	hist = [(r.level, r.status) for r in frappe.get_all("Purchase Order Approval", filters={"parent": name},
		fields=["level", "status"], order_by="idx asc")]
	check("after the edit: the approval history is still there (level 1 Rejected, level 2 still Pending)",
		hist == [(1, "Rejected"), (2, "Pending")], hist)

	# send again, then approve with a read-only approver on the last level
	expect_ok("raiser sends it again", lambda: as_user(RAISER, lambda: api.send_for_approval(name)))
	s = view(name, RAISER)
	check("sent again: Pending Approval, reason cleared, two fresh Pending steps",
		s["status"] == "Pending Approval" and not s["rejection_reason"] and len(s["approval_steps"]) == 2
		and all(x["status"] == "Pending" for x in s["approval_steps"]), s)
	expect_ok("Purchase Manager approves level 1 with remarks", lambda: as_user(PM, lambda: api.approve_po(name, "Rates checked")))
	s = view(name, PM)
	st = s["approval_steps"][0]
	check("level 1 shows approver and remarks", st["status"] == "Approved" and st["approver"] == PM and st["remarks"] == "Rates checked", st)
	check("Purchase Manager can't act on level 2", not s["action"]["can_act"] and s["action"]["reason"], s["action"])
	a = view(name, VIEWER)["action"]
	check("read-only Finance approver can act on level 2", a["can_act"] and a["level"] == 2 and a["role"] == "Finance", a)
	res = expect_ok("read-only Finance approver approves the last level", lambda: as_user(VIEWER, lambda: api.approve_po(name)))
	check("approve_po returns the submitted PO (docstatus 1, To Receive)",
		res and res["docstatus"] == 1 and res["status"] == "To Receive", res)

	# submitted
	s = view(name, RAISER)
	check("submitted: both steps Approved with approvers, nothing to send or approve",
		s["docstatus"] == 1 and s["status"] == "To Receive" and not s["can_send"] and not s["action"]["can_act"]
		and all(x["status"] == "Approved" and x["approver"] for x in s["approval_steps"]), s)
	d = as_user(RAISER, lambda: docs.get_doc("Purchase Order", name))
	check("get_doc agrees: docstatus 1, To Receive", d["docstatus"] == 1 and d["status"] == "To Receive", (d["docstatus"], d["status"]))


def run():
	frappe.set_user("Administrator")
	T.make_users()
	U.make_viewer_approver()
	for fn in (wiring, client_guard, bundle, scenario):
		try:
			fn()
		except Exception:  # noqa: BLE001
			import traceback
			fail("%s crashed:\n%s" % (fn.__name__, traceback.format_exc()))
		finally:
			frappe.set_user("Administrator")
			frappe.db.commit()
	print("\nDone: %d OK, %d FAILED" % (T.RESULT["ok"], T.RESULT["failed"]))