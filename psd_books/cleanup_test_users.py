"""
Remove the leftover test users (emails ending @example.invalid) created by the
a7/a9 check scripts, plus their Books Company Member rows.

Only users whose email ends with @example.invalid are touched. Administrator, Guest and
any real account are never selected. Projects, POs and other test documents are NOT deleted.

Dry run (default, deletes nothing):
    bench --site <site> execute psd_books.cleanup_test_users.run
Delete for real:
    bench --site <site> execute psd_books.cleanup_test_users.run --kwargs "{'dry_run': 0}"
Delete and also clear them as Project Manager on projects (needed if a project points at one):
    bench --site <site> execute psd_books.cleanup_test_users.run --kwargs "{'dry_run': 0, 'clear_pm': 1}"
"""
import frappe

SUFFIX = "@example.invalid"
PROTECTED = {"Administrator", "Guest"}


def run(dry_run=1, clear_pm=0):
    dry_run, clear_pm = int(dry_run), int(clear_pm)
    users = [u for u in frappe.get_all("User", filters={"name": ["like", "%" + SUFFIX]}, pluck="name")
             if u not in PROTECTED and u.lower().endswith(SUFFIX)]
    print(("DRY RUN - nothing will be deleted" if dry_run else "DELETING") + f": {len(users)} user(s)")
    deleted, skipped = [], []
    for u in sorted(users):
        members = frappe.get_all("Books Company Member", filters={"user": u}, pluck="name")
        pm_projects = frappe.get_all("Project", filters={"project_manager": u}, pluck="name")
        print(f" - {u}: {len(members)} company member row(s), Project Manager on {pm_projects or 'no projects'}")
        if dry_run:
            continue
        try:
            if pm_projects and not clear_pm:
                raise frappe.LinkExistsError(f"is Project Manager on {', '.join(pm_projects)} (use clear_pm=1)")
            for p in pm_projects:
                frappe.db.set_value("Project", p, "project_manager", None, update_modified=False)
            for m in members:
                frappe.delete_doc("Books Company Member", m, ignore_permissions=True, force=True)
            frappe.delete_doc("User", u, ignore_permissions=True)
            frappe.db.commit()
            deleted.append(u)
        except Exception as e:
            frappe.db.rollback()
            skipped.append((u, str(e)[:200]))
    if not dry_run:
        print(f"Deleted {len(deleted)}: {deleted}")
        for u, why in skipped:
            print(f"SKIPPED {u}: {why}")