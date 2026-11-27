"""Logic tests for api/labour_reports.py (Sava Phase 2 labour reports), no database needed.

Run in the bench:
	bench --site sava run-tests --module psd_books.api.tests.test_labour_reports
Outside a bench the frappe pieces are stubbed, so only the logic is exercised.
"""
import datetime
import sys
import types
import unittest
from unittest import mock

try:
	import frappe  # noqa: F401
except ImportError:
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s
	fm.db = mock.MagicMock()
	fm.whitelist = lambda **kw: (lambda f: f)
	fu = types.ModuleType("frappe.utils")
	fu.flt = lambda v, p=None: float(v or 0)
	fu.getdate = lambda d: d if isinstance(d, datetime.date) else datetime.date.fromisoformat(str(d)[:10])
	fu.nowdate = lambda: "2026-11-24"
	fm.utils = fu
	sys.modules["frappe"], sys.modules["frappe.utils"] = fm, fu

from psd_books.api import labour_reports as r  # noqa: E402


class TestContractStatus(unittest.TestCase):
	def test_rows_and_total(self):
		cons = [{"name": "LC-1", "project": "P1", "activity": "A1", "contractor": "C1", "status": "Approved", "contract_value": 500000},
			{"name": "LC-2", "project": "P1", "activity": "A2", "contractor": "C2", "status": "Draft", "contract_value": 750000}]
		rows = r.build_contract_status(cons, {"LC-1": 125000}, {"P1": "AJ-005"}, {"A1": "Painting"}, {"C1": "Kamau"})
		self.assertEqual(rows[0]["billed_pct"], 25.0)
		self.assertEqual(rows[0]["balance_value"], 375000)
		self.assertEqual(rows[0]["project_name"], "AJ-005")
		self.assertEqual(rows[1]["task"], "A2")  # falls back to the code
		self.assertEqual(rows[1]["billed_pct"], 0.0)
		t = rows[-1]
		self.assertEqual((t["contract"], t["contract_value"], t["paid_value"], t["balance_value"]), ("Total", 1250000, 125000, 1125000))
		self.assertEqual(t["billed_pct"], 10.0)

	def test_zero_value_and_empty(self):
		self.assertEqual(r.build_contract_status([], {}), [])
		rows = r.build_contract_status([{"name": "X", "contract_value": 0}], {"X": 5})
		self.assertEqual(rows[0]["billed_pct"], 0.0)


class TestEmployeeWages(unittest.TestCase):
	def test_adds_up_and_latest_rate(self):
		lines = [
			{"employee": "E1", "employee_name": "Abinesh", "week_end": "2026-11-06", "days": 6, "rate": 600, "ot_amount": 0, "sha": 125, "total": 3475},
			{"employee": "E1", "employee_name": "Abinesh", "week_end": "2026-11-13", "days": 5, "rate": 650, "ot_amount": 81.25, "sha": 125, "total": 3206.25},
			{"employee": "E2", "employee_name": "AJ", "week_end": "2026-11-13", "days": 6, "rate": 600, "ot_amount": 0, "sha": 125, "total": 3475}]
		rows = r.build_employee_wages(lines)
		self.assertEqual([x["employee"] for x in rows], ["Abinesh", "AJ", "Total"])
		ab = rows[0]
		self.assertEqual((ab["days"], ab["rate"], ab["sha"], ab["net_wages"]), (11, 650, 250, 6681.25))
		self.assertEqual(rows[-1]["net_wages"], 3475 + 6681.25)
		self.assertEqual(rows[-1]["days"], 17)

	def test_id_no_shown(self):
		base = {"week_end": "2026-11-06", "days": 1, "rate": 500, "ot_amount": 0, "sha": 0, "total": 500}
		lines = [
			{**base, "employee": "WRK-00001", "employee_name": "worker - 1", "id_no": "old", "worker_id_no": "001"},
			{**base, "employee": "EMP-2026-00007", "employee_name": "Abinesh", "id_no": "", "worker_id_no": None},
			{**base, "employee": "EMP-2026-00008", "employee_name": "Abishek", "id_no": "A-8", "worker_id_no": None},
			{**base, "week_end": "2026-11-13", "employee": "EMP-2026-00008", "employee_name": "Abishek", "id_no": "A-9", "worker_id_no": None}]
		rows = {x["employee"]: x for x in r.build_employee_wages(lines)}
		self.assertEqual(rows["worker - 1"]["id_no"], "001")            # the Workers screen ID No. wins
		self.assertEqual(rows["Abinesh"]["id_no"], "EMP-2026-00007")    # no ID No. anywhere: falls back to the code
		self.assertEqual(rows["Abishek"]["id_no"], "A-9")               # latest sheet line with an ID No.
		self.assertEqual(rows["Total"]["id_no"], "")
		self.assertNotIn("employee_id", rows["Abinesh"])

	def test_empty(self):
		self.assertEqual(r.build_employee_wages([]), [])


class TestWeeklyPayments(unittest.TestCase):
	def test_sheet_friday_lands_in_its_saturday_week(self):
		bills = [{"week_start": datetime.date(2026, 11, 7), "amount": 100000}]
		sheets = [{"week_end": datetime.date(2026, 11, 13), "amount": 33200}]   # Fri 13 Nov -> week of Sat 7 Nov
		rows = r.build_weekly_payments(bills, sheets)
		self.assertEqual(len(rows), 2)
		self.assertEqual(rows[0]["week"], "07 Nov to 13 Nov 2026")
		self.assertEqual((rows[0]["paid_to_contractors"], rows[0]["paid_to_employees"], rows[0]["total_for_week"]), (100000, 33200, 133200))
		self.assertEqual(rows[1]["week"], "Total")

	def test_weeks_sorted_and_summed(self):
		bills = [{"week_start": datetime.date(2026, 11, 7), "amount": 10}, {"week_start": datetime.date(2026, 11, 7), "amount": 5}]
		sheets = [{"week_end": datetime.date(2026, 10, 30), "amount": 7}]
		rows = r.build_weekly_payments(bills, sheets)
		self.assertEqual([x["week"] for x in rows], ["24 Oct to 30 Oct 2026", "07 Nov to 13 Nov 2026", "Total"])
		self.assertEqual(rows[1]["paid_to_contractors"], 15)
		self.assertEqual(rows[-1]["total_for_week"], 22)

	def test_empty(self):
		self.assertEqual(r.build_weekly_payments([], []), [])


class TestRange(unittest.TestCase):
	def test_blank_to_has_no_end(self):
		self.assertEqual(r._range("2026-10-30", ""), ("2026-10-30", "9999-12-31"))
		self.assertEqual(r._range(None, None), ("1900-01-01", "9999-12-31"))

	def test_both_given(self):
		self.assertEqual(r._range("2026-10-30", "2026-11-24"), ("2026-10-30", "2026-11-24"))


if __name__ == "__main__":
	unittest.main()