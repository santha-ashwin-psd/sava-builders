"""
Disable the leftover test users (emails ending @example.invalid). Deletes nothing.
Only users whose email ends with @example.invalid are touched; Administrator, Guest and
real accounts are never selected. Already-disabled users are skipped (safe to re-run).

Dry run (default, changes nothing):
    bench --site sava execute psd_books.disable_test_users.run
Disable for real:
    bench --site sava execute psd_books.disable_test_users.run --kwargs "{'dry_run': 0}"
"""
import frappe

SUFFIX = "@example.invalid"
PROTECTED = {"Administrator", "Guest"}


def run(dry_run=1):
    dry_run = int(dry_run)
    rows = frappe.get_all("User", filters={"name": ["like", "%" + SUFFIX]}, fields=["name", "enabled"])
    users = [r for r in rows if r["name"] not in PROTECTED and r["name"].lower().endswith(SUFFIX)]
    print(("DRY RUN - nothing will change" if dry_run else "DISABLING") + f": {len(users)} user(s)")
    done = 0
    for r in sorted(users, key=lambda x: x["name"]):
        if not r["enabled"]:
            print(f" - {r['name']}: already disabled")
            continue
        print(f" - {r['name']}: enabled -> disabled")
        if dry_run:
            continue
        frappe.db.set_value("User", r["name"], "enabled", 0)
        done += 1
    if not dry_run:
        frappe.db.commit()
        print(f"Disabled {done} user(s). Nothing deleted.")