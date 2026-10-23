"""A15 live check: procurement reports (MRN vs LPO, LPO vs GRN, project summary, supplier analysis).

Put this file in the app folder (next to a14_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a15_check.run

Run after a11_check (it creates the LPOs and GRNs these reports read). Each check prints OK or FAILED.
INFO lines are not pass/fail.

Scenarios:
	A  every report runs and returns rows
	B  the project filter keeps only that project's rows
	C  totals agree across reports (LPO value and received quantity)
	D  quantities are sensible (pending and not-yet-ordered are never negative)
"""
import frappe
from frappe.utils import flt

from psd_books import a9_check as A
from psd_books import a7_seed_and_check as S

ok, fail, check = A.ok, A.fail, A.check
PROJECTS = ["TEST-001", "TEST-002"]


def api():
	from psd_books.api import procurement_reports as R
	return R


def run():
	frappe.set_user("Administrator")
	R = api()

	print("\n--- A: reports run ---")
	mrn = R.mrn_vs_lpo()
	lpo = R.lpo_vs_grn()
	proj = R.project_summary()
	sup = R.supplier_analysis()
	check("MRN vs LPO returns rows", len(mrn) > 0, len(mrn))
	check("LPO vs GRN returns rows", len(lpo) > 0, len(lpo))
	check("project summary returns rows", len(proj) > 0, len(proj))
	check("supplier analysis returns rows", len(sup) > 0, len(sup))

	print("\n--- B: project filter ---")
	for p in PROJECTS:
		lp = R.lpo_vs_grn(project=p)
		check("LPO vs GRN for %s only has %s" % (p, p), all(r["project"] == p for r in lp), {r["project"] for r in lp})
		ps = R.project_summary(project=p)
		check("project summary for %s has one row" % p, len(ps) == 1 and ps[0]["project"] == p, ps)
		mr = R.mrn_vs_lpo(project=p)
		check("MRN vs LPO for %s only has %s" % (p, p), all(r["project"] == p for r in mr), {r["project"] for r in mr})

	print("\n--- C: totals agree ---")
	lpo_value_projects = sum(flt(r["lpo_value"]) for r in proj)
	lpo_value_suppliers = sum(flt(r["lpo_value"]) for r in sup)
	check("LPO value: project summary equals supplier analysis",
		abs(lpo_value_projects - lpo_value_suppliers) < 0.01, (lpo_value_projects, lpo_value_suppliers))
	received_lines = sum(flt(r["received_qty"]) for r in lpo)
	received_projects = sum(flt(r["received_qty"]) for r in proj)
	check("received quantity: LPO lines equal project summary",
		abs(received_lines - received_projects) < 0.01, (received_lines, received_projects))

	print("\n--- D: quantities make sense ---")
	check("no negative pending quantity on LPO lines", all(flt(r["pending_qty"]) >= 0 for r in lpo),
		[r for r in lpo if flt(r["pending_qty"]) < 0][:2])
	check("no negative not-yet-ordered quantity on MRN lines", all(flt(r["not_yet_ordered"]) >= 0 for r in mrn),
		[r for r in mrn if flt(r["not_yet_ordered"]) < 0][:2])
	check("received never more than ordered on LPO lines",
		all(flt(r["received_qty"]) <= flt(r["ordered_qty"]) + 0.0001 for r in lpo),
		[r for r in lpo if flt(r["received_qty"]) > flt(r["ordered_qty"])][:2])

	print("\nDONE    see OK/FAILED lines above")