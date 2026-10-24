"""
Show what still points at the @example.invalid test users (read-only, deletes nothing):
    bench --site sava execute psd_books.find_user_links.run
"""
import frappe


def run():
    users = frappe.get_all("User", filters={"name": ["like", "%@example.invalid"]}, pluck="name")
    fields = frappe.get_all("DocField", filters={"fieldtype": "Link", "options": "User"},
                            fields=["parent", "fieldname"])
    fields += frappe.get_all("Custom Field", filters={"fieldtype": "Link", "options": "User"},
                             fields=["dt as parent", "fieldname"])
    for u in sorted(users):
        print(u)
        found = False
        for f in fields:
            try:
                n = frappe.db.count(f["parent"], {f["fieldname"]: u})
            except Exception:
                continue
            if n:
                found = True
                print(f"   {f['parent']}.{f['fieldname']}: {n}")
        # Dynamic links (e.g. Comment, Version) are not Link fields; show the common ones too
        for dt in ("Comment", "Version", "Activity Log"):
            try:
                n = frappe.db.count(dt, {"owner": u})
                if n:
                    print(f"   {dt} (owner): {n}")
            except Exception:
                pass
        if not found:
            print("   no Link-field references")