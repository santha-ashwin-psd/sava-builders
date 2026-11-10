"""
Plain sequential document numbers: 01, 02, ... 99, 100, 101 ... (no prefix, no limit).

Each doctype gets its own counter, stored in the standard `tabSeries` table under the
key "PLAIN-<doctype>". It must be per doctype: Frappe's built-in series with an empty
prefix would share ONE counter across every doctype that uses it.

Used from the `autoname` method of Material Request, Request for Quotation,
Purchase Order, Purchase Receipt (GRN) and Stock Entry (Delivery Notes).
"""
import frappe
from frappe.model.naming import getseries

MIN_DIGITS = 2


def next_plain_name(doctype, min_digits=MIN_DIGITS, reuse_deleted=False):
	"""Return the next free name for `doctype`: "01", "02" ... (grows past 99 on its own).

	getseries() locks the Series row (SELECT ... FOR UPDATE) and increments it, so two
	users saving at the same moment get different numbers. The exists() loop only matters
	if someone renamed a document by hand to a number the counter has not reached yet.

	reuse_deleted=True: number from the highest plain number that still exists + 1, instead of
	the ever-growing counter. A cancelled document still exists, so the next one moves on; if the
	latest document is deleted, its number is handed out again. Only the latest number is reused,
	never a gap in the middle.
	"""
	key = f"PLAIN-{doctype}"
	if reuse_deleted:
		# getseries() creates the Series row if needed and keeps it locked until commit, so
		# concurrent saves queue here while we work out the highest existing number.
		getseries(key, min_digits)
		numbers = [int(n) for n in frappe.get_all(doctype, pluck="name", limit_page_length=0)
				   if str(n).isdigit()]
		next_no = (max(numbers) if numbers else 0) + 1
		frappe.db.sql("update `tabSeries` set `current` = %s where `name` = %s", (next_no, key))
		return str(next_no).zfill(min_digits)
	while True:
		name = getseries(key, min_digits)
		if not frappe.db.exists(doctype, name):
			return name