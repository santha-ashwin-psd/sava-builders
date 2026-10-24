"""
The Users screen shows OWNER on every member whose Books Company Member.invited_by is blank.
The a7/a9 test users were created by check scripts with a blank invited_by, so all show OWNER.
This sets invited_by = Administrator on the @example.invalid members only. Nothing deleted.

Dry run (default):   bench --site sava execute psd_books.fix_test_user_owner.run
For real:            bench --site sava execute psd_books.fix_test_user_owner.run --kwargs "{'dry_run': 0}"
"""
import frappe

SUFFIX = "@example.invalid"


def run(dry_run=1):
    dry_run = int(dry_run)
    rows = frappe.get_all("Books Company Member", filters={"user": ["like", "%" + SUFFIX]},
                          fields=["name", "user", "invited_by"])
    rows = [r for r in rows if r["user"].lower().endswith(SUFFIX) and not (r["invited_by"] or "").strip()]
    print(("DRY RUN" if dry_run else "UPDATING") + f": {len(rows)} member row(s) with blank invited_by")
    for r in rows:
        print(f" - {r['user']}")
        if not dry_run:
            frappe.db.set_value("Books Company Member", r["name"], "invited_by", "Administrator",
                                update_modified=False)
    if not dry_run:
        frappe.db.commit()
        print("Done.")