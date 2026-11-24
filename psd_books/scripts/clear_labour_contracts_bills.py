"""
clear_labour_contracts_bills.py - delete ALL Labour Contracts and ALL Labour Weekly Bills.

Run (dry run first: it only prints what would be deleted):
  bench --site sava execute psd_books.scripts.clear_labour_contracts_bills.execute

Delete for real (a database backup is taken first):
  bench --site sava execute psd_books.scripts.clear_labour_contracts_bills.execute --kwargs "{'confirm': 1}"

Deletes: every Labour Weekly Bill (and its lines) and every Labour Contract, in any status (Paid, Closed,
Cancelled ...; the normal delete rules are skipped on purpose), with their version history, comments,
activity log, to-dos, shares and notifications. The numbering restarts at 01 for both.

KEEPS: Contractors, Activities, Attendance sheets, projects and every other record. Activities used on a
deleted contract become free to use again.
"""
import frappe

BILL, LINE, CONTRACT = "Labour Weekly Bill", "Labour Weekly Bill Line", "Labour Contract"
# (table doctype, column holding the document type, column holding the document name or None for "all rows of that type")
RELATED = [
	("Version", "ref_doctype", "docname"),
	("Comment", "reference_doctype", "reference_name"),
	("Activity Log", "reference_doctype", "reference_name"),
	("ToDo", "reference_type", "reference_name"),
	("DocShare", "share_doctype", "share_name"),
	("Notification Log", "document_type", "document_name"),
]


def _counts():
	return {
		BILL: frappe.db.count(BILL),
		LINE: frappe.db.count(LINE),
		CONTRACT: frappe.db.count(CONTRACT),
	}


def execute(confirm=0):
	confirm = str(confirm).lower() in ("1", "true", "yes")
	before = _counts()
	print("Found:", ", ".join(f"{k}: {v}" for k, v in before.items()))
	if not confirm:
		print("DRY RUN - nothing deleted. Add --kwargs \"{'confirm': 1}\" to delete.")
		return before

	from frappe.utils.backups import new_backup
	new_backup(ignore_files=True, force=True)
	print("Backup taken.")

	# lines first, then the bills, then the contracts (a line links to a contract)
	frappe.db.delete(LINE)
	frappe.db.delete(BILL)
	frappe.db.delete(CONTRACT)
	for table, dt_col, _name_col in RELATED:
		for dt in (BILL, CONTRACT):
			frappe.db.delete(table, {dt_col: dt})
	# numbering back to 01 (next_plain_name also recounts from the highest existing number)
	for dt in (BILL, CONTRACT):
		frappe.db.sql("update `tabSeries` set `current` = 0 where `name` = %s", (f"PLAIN-{dt}",))
	frappe.db.commit()
	frappe.clear_cache()

	after = _counts()
	print("Now:", ", ".join(f"{k}: {v}" for k, v in after.items()))
	return after