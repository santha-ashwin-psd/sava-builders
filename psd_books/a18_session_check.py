"""A18 step 1 check: what the SPA session now says each user may do.

Read-only. Put this file in the app folder, then from ~/sava-bench:

    bench --site sava execute psd_books.a18_session_check.run

Prints, for each live test user, the Sava roles and the read / create / edit rights
for the key documents. Expected for se@sava.test (Site Engineer):
    Purchase Order  read False  create False  edit False
    Material Request read True  create True   edit True
"""
import frappe

from psd_books.api.session import _get_membership

USERS = ["se@sava.test", "sk@sava.test", "po@sava.test", "pm@sava.test",
         "fin@sava.test", "dir@sava.test", "ao@sava.test"]
DOCS = ["Material Request", "Purchase Order", "Purchase Receipt", "Delivery Note", "Item"]


def run(users=None):
    for user in (users or USERS):
        if not frappe.db.exists("User", user):
            print(f"{user}: not found on this site")
            continue
        frappe.set_user(user)
        perm = _get_membership(user)
        print(f"\n{user}  sava_roles={perm['sava_roles']}  books_role={perm['books_role']}")
        for doc in DOCS:
            a = perm["doc_access"].get(doc, {})
            print(f"  {doc:<18} read={a.get('read')}  create={a.get('create')}  edit={a.get('edit')}")
    frappe.set_user("Administrator")