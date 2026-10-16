"""Quotation comparison ranking and totals (Sava A9.2). No database, no frappe: plain functions.

Ranking, per RFQ item, over the Active quotations that quoted it:
  1. lowest net rate (rate after the line discount, before VAT) is L1;
  2. a tie goes to the shorter delivery days (no delivery days ranks last);
  3. then to the earlier quotation date;
  4. then to the lower quotation number, so the order never changes between runs.
A supplier that left the rate blank is not ranked for that item.

A reason is required only when the chosen net rate is higher than the lowest one.
Choosing another supplier at the same lowest rate needs no reason.
Money is rounded to 2 decimals, half up.
"""
from decimal import ROUND_HALF_UP, Decimal

_NO_DAYS = 10 ** 9
_NO_DATE = "9999-12-31"


def _d(value):
	if value in (None, ""):
		return Decimal(0)
	return Decimal(str(value))


def _money(value):
	return float(value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


def _is_quoted(row):
	return _d((row or {}).get("net_rate")) > 0


def _days(q):
	v = q.get("delivery_days")
	return _NO_DAYS if v in (None, "") else int(v)


def _sort_key(offer):
	return (_d(offer["net_rate"]), _days(offer), str(offer.get("quotation_date") or _NO_DATE), str(offer["quotation"]))


def rank_item(mrn_item, quotations):
	"""Ranked offers for one RFQ line.

	quotations: dicts with name, supplier, supplier_name, quotation_date, delivery_days
	and items (rows with mrn_item, net_rate, vat_percent, amount, tax_amount).
	-> list of offers, best first, each with rank 1, 2, 3 ... and label "L1", "L2" ...
	"""
	offers = []
	for q in quotations:
		row = next((r for r in (q.get("items") or []) if r.get("mrn_item") == mrn_item), None)
		if not _is_quoted(row):
			continue
		offers.append({
			"quotation": q["name"], "supplier": q["supplier"], "supplier_name": q.get("supplier_name") or q["supplier"],
			"quotation_date": q.get("quotation_date"), "delivery_days": q.get("delivery_days"),
			"net_rate": float(_d(row["net_rate"])), "vat_percent": float(_d(row.get("vat_percent"))),
			"amount": float(_d(row.get("amount"))), "tax_amount": float(_d(row.get("tax_amount"))),
		})
	offers.sort(key=_sort_key)
	for i, o in enumerate(offers, 1):
		o["rank"], o["label"] = i, "L%d" % i
	return offers


def rank_comparison(rfq_lines, quotations):
	"""One entry per RFQ line: the line, its ranked offers, and the lowest (L1) offer or None."""
	out = []
	for line in rfq_lines:
		offers = rank_item(line["mrn_item"], quotations)
		out.append({"line": line, "offers": offers, "lowest": offers[0] if offers else None})
	return out


def unquoted_items(ranking):
	"""Item codes that no supplier quoted (these block approval)."""
	return [r["line"].get("item_code") or r["line"]["mrn_item"] for r in ranking if not r["offers"]]


def default_choice(entry):
	"""Quotation number of the lowest offer, or None when nobody quoted the item."""
	return entry["lowest"]["quotation"] if entry["lowest"] else None


def find_offer(entry, quotation):
	for o in entry["offers"]:
		if o["quotation"] == quotation:
			return o
	return None


def reason_required(entry, quotation):
	"""True when the chosen offer costs more than the lowest. Raises if the quotation did not quote the item."""
	chosen = find_offer(entry, quotation)
	if chosen is None:
		raise ValueError("%s did not quote this item" % quotation)
	return _d(chosen["net_rate"]) > _d(entry["lowest"]["net_rate"])


def totals(lines):
	"""lines: dicts with amount and tax_amount -> net_total, total_tax, grand_total."""
	net = sum((_d(l.get("amount")) for l in lines), Decimal(0))
	tax = sum((_d(l.get("tax_amount")) for l in lines), Decimal(0))
	return {"net_total": _money(net), "total_tax": _money(tax), "grand_total": _money(net + tax)}


def supplier_totals(lines):
	"""Group lines by supplier -> {supplier: {supplier_name, lines, net_total, total_tax, grand_total}}.
	One LPO is raised for each key, in the order the suppliers first appear."""
	groups = {}
	for l in lines:
		g = groups.setdefault(l["supplier"], {"supplier_name": l.get("supplier_name") or l["supplier"], "lines": []})
		g["lines"].append(l)
	for g in groups.values():
		g.update(totals(g["lines"]))
	return groups