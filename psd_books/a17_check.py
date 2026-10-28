"""A17.4 live check: do the 7 Sava roles control who can raise and approve each document?

Put this file in the app folder (next to a16..a15_check.py), then from ~/sava-bench:

    bench --site sava execute psd_books.a17_check.run

It creates 7 TEST users (one per Sava role) in TEST Company, set up the way the Users screen sets them
(Sava role + the Books role and modules the screen pre-fills). Then:

  1  roles    the Sava role lands on the user, is replaced cleanly, and unknown roles are refused
  2  raise    who may create / submit each document through the app's own permission check
              (utils.access.assert_can, the check every save/submit endpoint in the SPA uses)
  3  approve  LPO approval levels by value, and who may act on each level (po_approval_rules)
  4  mrn      who may approve an MRN (Project Manager rule in api/mrn.py)

Part 2 compares the app with the plan (A5, A6, A7-A11, A14: who raises what). A FAILED line there means
the app lets that role do something the plan says it should not (or blocks something it should allow);
it is a finding, not a script error. Safe to run again. Test users stay on the site (same as a9_check).
"""
import frappe

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A
from psd_books.api import admin as ADM
from psd_books.api.mrn import approval_block_reason
from psd_books.invoicing import po_approval_rules as PO
from psd_books.utils import access

ok, fail, check = A.ok, A.fail, A.check

ROLE_USER = {r: "a17-%s@example.invalid" % r.lower().replace(" ", "-") for r in ADM.SAVA_ROLES}

# Same as SAVA_PREFILL in public/js/books_vue/src/utils/savaRoles.js (what the Users screen applies).
PREFILL = {
	"Store Keeper": ("Books Manager", ["inventory"]),
	"Site Engineer": ("Books Manager", ["inventory"]),
	"Purchase Officer": ("Books Manager", ["bills", "inventory", "customers"]),
	"Accounts Officer": ("Accountant", ["bills", "payments", "reports", "customers"]),
	"Purchase Manager": ("Books Manager", ["bills", "inventory", "reports", "customers"]),
	"Finance": ("Accountant", ["bills", "payments", "reports"]),
	"Director": ("Books Viewer", ["bills", "reports"]),
	"Project Manager": ("Books Manager", ["inventory"]),
}

# (role, doctype, action, expected) - from the plan. Approval roles raise nothing; they approve.
MR, DN, GRN, LPO, RFQ, SQ, QC, PI, PE = (
	"Material Request", "Delivery Note", "Purchase Receipt", "Purchase Order", "Request for Quotation",
	"Supplier Quotation", "Quotation Comparison", "Purchase Invoice", "Payment Entry")
CAN = [
	("Site Engineer", MR, "create", True),
	("Store Keeper", DN, "create", True), ("Store Keeper", DN, "submit", True),
	("Store Keeper", GRN, "create", True), ("Store Keeper", GRN, "submit", True),
	("Purchase Officer", RFQ, "create", True), ("Purchase Officer", SQ, "create", True),
	("Purchase Officer", QC, "create", True),
	("Purchase Officer", LPO, "create", True), ("Purchase Officer", LPO, "submit", True),
	("Accounts Officer", PI, "create", True), ("Accounts Officer", PI, "submit", True),
	("Accounts Officer", PE, "create", True),
]
CANNOT = [
	("Site Engineer", LPO, "create"), ("Site Engineer", GRN, "create"), ("Site Engineer", DN, "create"),
	("Site Engineer", PI, "create"),
	("Store Keeper", MR, "create"), ("Store Keeper", LPO, "create"), ("Store Keeper", RFQ, "create"),
	("Store Keeper", PI, "create"),
	("Purchase Officer", MR, "create"), ("Purchase Officer", GRN, "create"), ("Purchase Officer", DN, "create"),
	("Purchase Officer", PI, "submit"), ("Purchase Officer", PE, "create"),
	("Accounts Officer", MR, "create"), ("Accounts Officer", LPO, "create"), ("Accounts Officer", GRN, "create"),
	("Accounts Officer", RFQ, "create"),
	("Purchase Manager", MR, "create"), ("Purchase Manager", LPO, "create"), ("Purchase Manager", GRN, "create"),
	("Purchase Manager", PI, "create"),
	("Finance", MR, "create"), ("Finance", LPO, "create"), ("Finance", GRN, "create"),
	("Director", MR, "create"), ("Director", LPO, "create"), ("Director", GRN, "create"),
]
READ_ALL = ["Project", "Warehouse"]  # every role needs to see these (A17.2 gives all 7 read)


def _user_doc(email):
	if not frappe.db.exists("User", email):
		frappe.get_doc({"doctype": "User", "email": email, "first_name": email.split("@")[0], "enabled": 1,
			"user_type": "System User", "send_welcome_email": 0}).insert(ignore_permissions=True)
	return frappe.get_doc("User", email)


def make_users():
	module_fields = {f for f in ADM.MODULE_FIELDS}
	for role, email in ROLE_USER.items():
		books_role, modules = PREFILL[role]
		flags = {f: 1 if f.removeprefix("mod_") in modules else 0 for f in module_fields}
		doc = _user_doc(email)  # the User must exist before its Books Company Member row
		member = frappe.db.get_value("Books Company Member", {"user": email}, ["name", "company"], as_dict=True)
		if member and member.company != S.CO:
			frappe.throw("%s already belongs to %s" % (email, member.company))
		if member:
			frappe.db.set_value("Books Company Member", member.name, {"books_role": books_role, **flags})
		else:
			frappe.get_doc({"doctype": "Books Company Member", "user": email, "company": S.CO,
				"books_role": books_role, **flags}).insert(ignore_permissions=True)
		doc = frappe.get_doc("User", email)
		ADM._apply_sava_roles(doc, [role])
		doc.save(ignore_permissions=True)
		frappe.clear_cache(user=email)
	frappe.db.commit()
	ok("7 test users ready, one per Sava role (Books role + modules as the Users screen pre-fills)")


def check_roles():
	for role, email in ROLE_USER.items():
		have = [r for r in ADM.SAVA_ROLES if r in frappe.get_roles(email)]
		check("%s user holds exactly that Sava role" % role, have == [role], have)
	# replace cleanly: two roles then back to one
	email = ROLE_USER["Store Keeper"]
	doc = _user_doc(email)
	ADM._apply_sava_roles(doc, ADM._clean_sava_roles(["Store Keeper", "Site Engineer"]))
	doc.save(ignore_permissions=True)
	both = {r for r in ADM.SAVA_ROLES if r in frappe.get_roles(email)}
	check("two Sava roles can be held together", both == {"Store Keeper", "Site Engineer"}, both)
	doc = _user_doc(email)
	ADM._apply_sava_roles(doc, ["Store Keeper"])
	doc.save(ignore_permissions=True)
	frappe.clear_cache(user=email)
	left = {r for r in ADM.SAVA_ROLES if r in frappe.get_roles(email)}
	check("setting roles again replaces the old ones", left == {"Store Keeper"}, left)
	A.expect_block("unknown Sava role", lambda: ADM._clean_sava_roles(["Store Keeper", "Boss"]), "invalid")
	frappe.db.commit()


def _allowed(email, doctype, action):
	try:
		access.assert_can(doctype, action, user=email)
		return True
	except Exception:  # noqa: BLE001
		return False


def check_raise():
	for role, dt, action, _x in CAN:
		check("%s can %s %s" % (role, action, dt), _allowed(ROLE_USER[role], dt, action),
			"blocked by the app")
	for role, dt, action in CANNOT:
		check("%s cannot %s %s" % (role, action, dt), not _allowed(ROLE_USER[role], dt, action),
			"the app allows it")
	for role in ADM.SAVA_ROLES:
		for dt in READ_ALL:
			check("%s can read %s" % (role, dt), _allowed(ROLE_USER[role], dt, "read"), "blocked by the app")


def _steps(total, approved=()):
	steps = PO.build_steps(total)
	out = []
	for s in steps:
		s = dict(s)
		by = dict(approved).get(s["role"])
		if by:
			s["status"], s["approver"] = PO.STEP_APPROVED, by
		out.append(s)
	return out


def _can_act(role, steps, raised_by):
	state = PO.action_state(PO.PENDING_APPROVAL, raised_by, steps, ROLE_USER[role],
		frappe.get_roles(ROLE_USER[role]))
	return state["can_act"]


def check_approve():
	for total, want in ((150000, ["Purchase Manager"]), (200000, ["Purchase Manager"]),
			(250000, ["Purchase Manager", "Finance"]), (500000, ["Purchase Manager", "Finance"]),
			(600000, ["Purchase Manager", "Finance"])):
		check("LPO of %s needs %s" % (total, " > ".join(want)), PO.required_roles(total) == want,
			PO.required_roles(total))
	raiser = ROLE_USER["Purchase Officer"]
	s600 = _steps(600000)
	for role in ADM.SAVA_ROLES:
		check("level 1: %s %s act" % (role, "can" if role == "Purchase Manager" else "cannot"),
			_can_act(role, s600, raiser) == (role == "Purchase Manager"))
	pm = ROLE_USER["Purchase Manager"]
	s_l2 = _steps(600000, {"Purchase Manager": pm})
	for role in ADM.SAVA_ROLES:
		check("level 2: %s %s act" % (role, "can" if role == "Finance" else "cannot"),
			_can_act(role, s_l2, raiser) == (role == "Finance"))
	check("the Purchase Manager who sent the LPO can approve it",
		_can_act("Purchase Manager", s600, pm))
	check("a Books Admin can act on any level",
		PO.action_state(PO.PENDING_APPROVAL, pm, s_l2, "admin@example.invalid", [], True)["can_act"])


def check_mrn():
	owner, pm = ROLE_USER["Site Engineer"], ROLE_USER["Purchase Manager"]
	r = approval_block_reason
	check("MRN: the named Project Manager can approve", r(owner, pm, pm, False, False) == "")
	check("MRN: another user (Store Keeper) cannot", r(owner, ROLE_USER["Store Keeper"], pm, False, False) != "")
	check("MRN: the Site Engineer who raised it cannot", r(owner, owner, owner, False, False) != "")
	check("MRN: a read-only user (Director) cannot", r(owner, ROLE_USER["Director"], pm, False, True) != "")
	check("MRN: a project with no manager blocks approval", r(owner, pm, None, False, False) != "")
	check("MRN: a Books Admin can approve any MRN", r(owner, "admin@example.invalid", None, True, False) == "")


def run():
	frappe.set_user("Administrator")
	S.seed()
	make_users()
	for label, fn in (("roles", check_roles), ("raise", check_raise), ("approve", check_approve), ("mrn", check_mrn)):
		print("\n--- %s ---" % label)
		try:
			fn()
		except Exception:  # noqa: BLE001
			import traceback
			fail("%s crashed:\n%s" % (label, traceback.format_exc()))
		finally:
			frappe.set_user("Administrator")
			frappe.db.commit()
	print("\nDone: %d OK, %d FAILED" % (A.RESULT["ok"], A.RESULT["failed"]))