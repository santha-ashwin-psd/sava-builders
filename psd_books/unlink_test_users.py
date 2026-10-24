"""Unlinks the @example.invalid test users from every record, so they can be deleted from the Users page.
Dry run by default (prints counts, writes nothing).
Dry run:  bench --site sava execute psd_books.unlink_test_users.run
Apply:    bench --site sava execute psd_books.unlink_test_users.run --kwargs "{'apply': 1}"
Does NOT delete the users. Take a backup first.
"""
import frappe

REPLACE_WITH = "Administrator"

# (doctype, field) rows to delete (child/approval rows, shares, memberships)
DELETE_ROWS = [
	("Purchase Order Approval", "approver"),
	("Quotation Comparison Approval", "approver"),
	("Books Company Member", "user"),
	("DocShare", "user"),
]
# (doctype, field, new value) links to repoint or clear
UPDATE_LINKS = [
	("Purchase Order", "raised_by", REPLACE_WITH),
	("Quotation Comparison", "raised_by", REPLACE_WITH),
	("Project", "project_manager", REPLACE_WITH),
	("Contact", "user", None),
]


def run(apply=0):
	apply = int(apply or 0)
	users = frappe.get_all("User", filters={"name": ["like", "%@example.invalid"]}, pluck="name")
	print("Mode:", "APPLY" if apply else "DRY RUN")
	print("Test users:", len(users))
	if not users:
		return

	total = 0
	for dt, fn in DELETE_ROWS:
		n = frappe.db.count(dt, {fn: ["in", users]})
		print(f"delete rows  {dt}.{fn}: {n}")
		total += n
		if apply and n:
			frappe.db.delete(dt, {fn: ["in", users]})

	for dt, fn, value in UPDATE_LINKS:
		n = frappe.db.count(dt, {fn: ["in", users]})
		print(f"{'set ' + str(value) if value else 'clear'}  {dt}.{fn}: {n}")
		total += n
		if apply and n:
			frappe.db.sql(
				f"update `tab{dt}` set `{fn}` = %s where `{fn}` in %s",
				(value, tuple(users)))

	if apply:
		frappe.db.commit()
		frappe.clear_cache()
		print("Done. Total rows changed:", total)
		print("Re-run list_user_links.run to confirm 0 remain, then delete the users from the Users page.")
	else:
		print("Dry run only. Total rows that would change:", total)