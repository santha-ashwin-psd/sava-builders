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


def next_plain_name(doctype, min_digits=MIN_DIGITS):
	"""Return the next free name for `doctype`: "01", "02" ... (grows past 99 on its own).

	getseries() locks the Series row (SELECT ... FOR UPDATE) and increments it, so two
	users saving at the same moment get different numbers. The exists() loop only matters
	if someone renamed a document by hand to a number the counter has not reached yet.
	"""
	key = f"PLAIN-{doctype}"
	while True:
		name = getseries(key, min_digits)
		if not frappe.db.exists(doctype, name):
			return name