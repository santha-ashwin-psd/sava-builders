"""Sava: make KES the base currency. Seeds KES, sets Books Company currency
and fiscal year start (January), and moves default price lists and
company accounts still on INR to KES. Nothing is deleted. Safe to re-run."""
import frappe


def execute():
	if not frappe.db.exists("Currency", "KES"):
		frappe.get_doc({
			"doctype": "Currency",
			"currency_name": "KES",
			"symbol": "KSh",
			"fraction": "Cents",
			"fraction_units": 100,
			"number_format": "#,###.##",
			"enabled": 1,
		}).insert(ignore_permissions=True)

	for company in frappe.get_all("Books Company", pluck="name"):
		frappe.db.set_value("Books Company", company, "currency", "KES")
		frappe.db.set_value("Books Company", company, "fiscal_year_start_month", "January")
		if frappe.db.exists("DocType", "Account"):
			frappe.db.sql(
				"UPDATE `tabAccount` SET currency='KES' WHERE company=%s AND currency='INR'",
				company,
			)

	if frappe.db.exists("DocType", "Price List"):
		for pl in ("Standard Selling", "Standard Buying"):
			if frappe.db.exists("Price List", pl):
				frappe.db.set_value("Price List", pl, "currency", "KES")

	frappe.db.commit()