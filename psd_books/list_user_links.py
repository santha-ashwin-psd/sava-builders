"""Read-only. Lists every record that links to an @example.invalid test user.
Run: bench --site sava execute psd_books.list_user_links.run
"""
import frappe


def run():
	users = frappe.get_all("User", filters={"name": ["like", "%@example.invalid"]}, pluck="name")
	print("Test users found:", len(users))
	for u in users:
		print("  ", u)
	if not users:
		return

	targets = set()
	for r in frappe.get_all("DocField", filters={"fieldtype": "Link", "options": "User"}, fields=["parent", "fieldname"]):
		targets.add((r.parent, r.fieldname))
	for r in frappe.get_all("Custom Field", filters={"fieldtype": "Link", "options": "User"}, fields=["dt", "fieldname"]):
		targets.add((r.dt, r.fieldname))

	found = 0
	for dt, fn in sorted(targets):
		if not frappe.db.table_exists(dt):
			continue
		try:
			rows = frappe.db.sql(
				f"select `{fn}` as u, count(*) as c from `tab{dt}` where `{fn}` in %s group by `{fn}`",
				(tuple(users),), as_dict=True)
		except Exception:
			continue
		if not rows:
			continue
		istable = frappe.get_meta(dt).istable
		for r in rows:
			found += r.c
			print(f"{dt}.{fn}: {r.u} x{r.c}")
		if istable:
			for p in frappe.db.sql(
				f"select distinct parenttype, parent from `tab{dt}` where `{fn}` in %s limit 8",
				(tuple(users),), as_dict=True):
				print(f"     in {p.parenttype} {p.parent}")
	print("Total linking rows:", found)