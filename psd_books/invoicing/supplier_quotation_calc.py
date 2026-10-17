"""Supplier Quotation money maths (Sava A8.1). No database, no frappe: plain functions.

A line with no rate is "not quoted": it has no amount and is ignored in the totals.
amount     = qty x rate x (1 - discount%)          (before VAT)
tax_amount = amount x VAT%
Money is rounded to 2 decimals, half up. net_rate is rounded to 4.
"""
from decimal import ROUND_HALF_UP, Decimal


def _d(value):
	if value in (None, ""):
		return Decimal(0)
	return Decimal(str(value))


def _money(value, places="0.01"):
	return float(value.quantize(Decimal(places), rounding=ROUND_HALF_UP))


def is_quoted(rate):
	return _d(rate) > 0


def calc_line(qty, rate, discount_percent=0, vat_percent=0):
	"""-> dict(net_rate, amount, tax_amount) for one line."""
	if not is_quoted(rate):
		return {"net_rate": 0.0, "amount": 0.0, "tax_amount": 0.0}
	net_rate = _d(rate) * (Decimal(100) - _d(discount_percent)) / Decimal(100)
	amount = (_d(qty) * net_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
	tax = (amount * _d(vat_percent) / Decimal(100)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
	return {"net_rate": _money(net_rate, "0.0001"), "amount": float(amount), "tax_amount": float(tax)}


def calc_totals(lines):
	"""lines: dicts with amount and tax_amount (as returned by calc_line)."""
	net = sum((_d(l.get("amount")) for l in lines), Decimal(0))
	tax = sum((_d(l.get("tax_amount")) for l in lines), Decimal(0))
	return {"net_total": _money(net), "total_tax": _money(tax), "grand_total": _money(net + tax)}


def apply_to_doc(doc):
	"""Fill every item row and the header totals on a Supplier Quotation."""
	rows = []
	for row in doc.get("items") or []:
		res = calc_line(row.get("qty"), row.get("rate"), row.get("discount_percent"), row.get("vat_percent"))
		row.net_rate, row.amount, row.tax_amount = res["net_rate"], res["amount"], res["tax_amount"]
		rows.append(res)
	totals = calc_totals(rows)
	doc.net_total, doc.total_tax, doc.grand_total = totals["net_total"], totals["total_tax"], totals["grand_total"]