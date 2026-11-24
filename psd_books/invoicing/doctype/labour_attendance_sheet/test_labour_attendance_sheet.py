"""Logic tests for the Labour Attendance Sheet rules (no database needed).

Run in the bench:
    bench --site sava run-tests --app psd_books --module psd_books.invoicing.doctype.labour_attendance_sheet.test_labour_attendance_sheet
"""
import datetime
import sys
import types
import unittest
from unittest import mock

try:
	import frappe  # noqa: F401
except ImportError:  # plain-python run outside a bench
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s
	fm.db = mock.MagicMock()

	class _Err(Exception):
		pass

	def _throw(msg, title=None):
		raise _Err(msg)

	fm.throw = _throw
	fm.whitelist = lambda *a, **k: (lambda f: f)
	fm.get_all = mock.MagicMock(return_value=[])
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	fm.model, model.document, fm.utils = model, document, utils
	sys.modules.update({"frappe": fm, "frappe.model": model, "frappe.model.document": document, "frappe.utils": utils})

import frappe  # noqa: E402,F811
from psd_books.invoicing.doctype.labour_attendance_sheet import labour_attendance_sheet as las  # noqa: E402

D = las.DAYS


def line(days=7, rate=600, ot=0, sha=125, name="Ann", emp="EMP-1", **kw):
	row = {"employee": emp, "employee_name": name, "id_no": "", "grade": "C", "area_of_work": "", "rate": rate, "ot_hours": ot, "sha": sha}
	row.update({k: 1 if i < days else 0 for i, k in enumerate(D)})
	row.update(kw)
	return row


class Doc:
	def __init__(self, status="Draft", new=False):
		self.name, self.status, self._new = "LAS-1", status, new
		self.raised_by = self.approved_by = self.approved_on = self.rejection_reason = self.submitted_by = self.submitted_on = None
		self.cancelled_by = self.cancelled_on = self.cancel_reason = None
		self.week_start = datetime.date(2026, 11, 14)
		self.company = "CO"
		self.lines = []
		self.flags = types.SimpleNamespace(get=lambda k, d=None: getattr(self.flags, k, d))

	def is_new(self):
		return self._new

	def get(self, k, d=None):
		return getattr(self, k, d)


class TestWeek(unittest.TestCase):
	def test_week_runs_saturday_to_friday(self):
		for d in ("2026-10-24", "2026-10-25", "2026-10-26", "2026-10-28", "2026-10-30"):  # Sat .. Fri
			self.assertEqual(las.saturday_of(d), datetime.date(2026, 10, 24), d)
			self.assertEqual(las.friday_of(d), datetime.date(2026, 10, 30), d)
		self.assertEqual(las.saturday_of("2026-10-31"), datetime.date(2026, 10, 31))

	def test_across_year_end(self):
		self.assertEqual(las.saturday_of("2027-01-01"), datetime.date(2026, 12, 26))
		self.assertEqual(las.friday_of("2027-01-01"), datetime.date(2027, 1, 1))

	def test_date_object_accepted(self):
		self.assertEqual(las.saturday_of(datetime.date(2026, 11, 23)), datetime.date(2026, 11, 21))


class TestFigures(unittest.TestCase):
	def test_rows_from_the_client_sheet(self):
		# (days, rate, ot hours, expected OT amount, expected total) read off the paper sheet of 24/10/26 to 30/10/26
		for days, rate, ot, ota, total in [(7, 660, 0, 0, 4495), (7, 600, 0, 0, 4075), (5, 600, 0, 0, 2875), (6, 550, 0, 0, 3175),
				(5, 660, 1, 82.5, 3258), (5, 600, 6, 450, 3325), (4, 600, 0, 0, 2275), (5, 750, 0, 0, 3625),
				(7, 660, 3, 247.5, 4743), (5, 660, 0, 0, 3175)]:
			f = las.figures(line(days=days, rate=rate, ot=ot))
			self.assertEqual((f["days"], f["ot_amount"], f["total"]), (days, ota, total), (days, rate, ot))

	def test_total_rounds_half_up_to_the_shilling(self):
		self.assertEqual(las.figures(line(days=5, rate=660, ot=1))["total"], 3258)  # 3257.5
		self.assertEqual(las.figures(line(days=1, rate=100, sha=0.5))["total"], 100)  # 99.5

	def test_ot_amount_two_decimals_half_up(self):
		self.assertEqual(las.figures(line(rate=650, ot=0.5))["ot_amount"], 40.63)  # 40.625

	def test_no_days_and_no_ot_pays_nothing_and_takes_no_sha(self):
		self.assertEqual(las.figures(line(days=0, rate=600))["total"], 0)

	def test_ot_without_days_still_pays_and_takes_sha(self):
		self.assertEqual(las.figures(line(days=0, rate=800, ot=8, sha=125))["total"], 675)

	def test_days_counts_only_ticks(self):
		self.assertEqual(las.days_of(line(days=3)), 3)
		self.assertEqual(las.days_of({"d_sat": "1", "d_sun": 0, "d_mon": None}), 1)


class TestMerge(unittest.TestCase):
	def base(self, emp, name):
		return line(days=0, rate=0, sha=125, name=name, emp=emp)

	def test_saved_values_kept_new_employee_added(self):
		saved = [line(days=5, rate=700, ot=2, sha=100, name="Ann", emp="E1", area_of_work="Casting")]
		out = las.merge_lines(saved, [self.base("E1", "Ann"), self.base("E2", "Bob")])
		self.assertEqual([r["employee"] for r in out], ["E1", "E2"])
		self.assertEqual((las.days_of(out[0]), out[0]["rate"], out[0]["ot_hours"], out[0]["sha"], out[0]["area_of_work"]), (5, 700, 2, 100, "Casting"))
		self.assertEqual((las.days_of(out[1]), out[1]["sha"]), (0, 125))

	def test_inactive_without_days_dropped_with_days_kept(self):
		saved = [line(days=0, name="Gone", emp="E9"), line(days=2, name="Left", emp="E8")]
		out = las.merge_lines(saved, [self.base("E1", "Ann")])
		self.assertEqual(sorted(r["employee"] for r in out), ["E1", "E8"])

	def test_sorted_by_name(self):
		out = las.merge_lines([], [self.base("E2", "bob"), self.base("E1", "Ann")])
		self.assertEqual([r["employee_name"] for r in out], ["Ann", "bob"])


class TestBlockers(unittest.TestCase):
	def test_nobody_ticked(self):
		self.assertEqual(len(las.blockers([line(days=0)])), 1)

	def test_rate_missing_for_paid_employee(self):
		out = las.blockers([line(days=3, rate=0, name="Ann"), line(days=0, rate=0, name="Bob", emp="E2")])
		self.assertEqual(len(out), 1)
		self.assertIn("Ann", out[0])

	def test_total_below_zero(self):
		self.assertEqual(len(las.blockers([line(days=1, rate=100, sha=125)])), 1)

	def test_good_sheet_has_no_blockers(self):
		self.assertEqual(las.blockers([line(days=6), line(days=0, emp="E2", name="Bob", rate=0)]), [])

	def test_negative_inputs(self):
		self.assertEqual(len(las.line_errors([line(rate=-1, ot=-2, sha=-3)])), 3)
		self.assertEqual(las.line_errors([line()]), [])


class TestWorkflow(unittest.TestCase):
	def test_new_sheet_starts_draft(self):
		d = Doc(status="Approved", new=True)
		with self.assertRaises(Exception):
			las.check_edit(d, None)
		d = Doc(status="", new=True)
		las.check_edit(d, None)
		self.assertEqual(d.status, "Draft")

	def test_locked_statuses_cannot_be_edited(self):
		for st in ("Pending approval", "Approved", "Submitted"):
			with self.assertRaises(Exception):
				las.check_edit(Doc(status=st), st)
		for st in ("Draft", "Sent back"):
			las.check_edit(Doc(status=st), st)

	def test_status_cannot_be_changed_by_editing(self):
		with self.assertRaises(Exception):
			las.check_edit(Doc(status="Approved"), "Draft")

	def test_send_approve_submit_path(self):
		d = Doc()
		las.send_for_approval(d, [], "a@x")
		self.assertEqual((d.status, d.raised_by), ("Pending approval", "a@x"))
		las.approve(d, [], "dir@x", ["Director"], "now")
		self.assertEqual((d.status, d.approved_by), ("Approved", "dir@x"))
		las.submit(d, "adm@x", "later")
		self.assertEqual((d.status, d.submitted_by, d.submitted_on), ("Submitted", "adm@x", "later"))
		self.assertTrue(d.flags.las_workflow)

	def test_send_blocked_by_problems_and_wrong_status(self):
		with self.assertRaises(Exception):
			las.send_for_approval(Doc(), ["x"], "a@x")
		with self.assertRaises(Exception):
			las.send_for_approval(Doc(status="Approved"), [], "a@x")

	def test_only_director_approves_or_sends_back(self):
		for roles in (["Books Admin"], ["Admin"], []):
			with self.assertRaises(Exception):
				las.approve(Doc(status="Pending approval"), [], "u", roles, "now")
			with self.assertRaises(Exception):
				las.send_back(Doc(status="Pending approval"), "u", roles, "why")

	def test_approve_needs_pending_and_no_problems(self):
		with self.assertRaises(Exception):
			las.approve(Doc(), [], "u", ["Director"], "now")
		with self.assertRaises(Exception):
			las.approve(Doc(status="Pending approval"), ["bad"], "u", ["Director"], "now")

	def test_send_back_needs_reason_and_clears_on_resend(self):
		with self.assertRaises(Exception):
			las.send_back(Doc(status="Pending approval"), "u", ["Director"], "  ")
		d = Doc(status="Pending approval")
		las.send_back(d, "u", ["Director"], "Check Ann's days")
		self.assertEqual((d.status, d.rejection_reason), ("Sent back", "Check Ann's days"))
		las.send_for_approval(d, [], "a@x")
		self.assertIsNone(d.rejection_reason)

	def test_submit_only_from_approved(self):
		for st in ("Draft", "Pending approval", "Sent back", "Submitted"):
			with self.assertRaises(Exception):
				las.submit(Doc(status=st), "u", "now")


class TestBaseline(unittest.TestCase):
	def run_baseline(self, employees, prev_sheet, prev_lines, company="CO"):
		def get_all(dt, **kw):
			return employees if dt == "Employee" else prev_sheet
		with mock.patch.object(frappe, "get_all", side_effect=get_all) as ga, \
				mock.patch.object(frappe.db, "sql", return_value=prev_lines):
			rows = las.baseline_rows(datetime.date(2026, 10, 31), company)
		return rows, ga

	def test_carries_last_values_and_defaults_for_new_employee(self):
		emps = [{"name": "E1", "employee_name": "Ann", "id_no": "40528637"}, {"name": "E2", "employee_name": "Bob", "id_no": None}]
		prev = [{"employee": "E1", "grade": "SK", "area_of_work": "Store", "rate": 750, "ot_hours": 2, "sha": 100}]
		rows, _ga = self.run_baseline(emps, ["LAS-2026-0001"], prev)
		a, b = rows
		self.assertEqual((a["grade"], a["area_of_work"], a["rate"], a["ot_hours"], a["sha"], a["id_no"]), ("SK", "Store", 750, 0, 100, "40528637"))   # OT hours are not carried (previous sheet had 2)
		self.assertEqual((b["grade"], b["area_of_work"], b["rate"], b["ot_hours"], b["sha"], b["id_no"]), ("C", "", 0, 0, 125, ""))
		self.assertEqual(las.days_of(a) + las.days_of(b), 0)

	def test_no_earlier_sheet_gives_defaults(self):
		rows, _ga = self.run_baseline([{"name": "E1", "employee_name": "Ann", "id_no": ""}], [], [])
		self.assertEqual((rows[0]["rate"], rows[0]["sha"], rows[0]["grade"]), (0, 125, "C"))

	def test_only_active_employees_and_company_filter_asked_for(self):
		_rows, ga = self.run_baseline([], [], [])
		kw = [c for c in ga.call_args_list if c.args[0] == "Employee"][0].kwargs
		self.assertEqual(kw["filters"], {"status": "Active"})
		self.assertIn(["company", "=", "CO"], kw["or_filters"])


class TestCancelAmend(unittest.TestCase):
	def test_cancel_from_sent_back_approved_submitted(self):
		for st in ("Sent back", "Approved", "Submitted"):
			d = Doc(status=st)
			las.cancel(d, "dir", ["Director"], "  Wrong rates  ", "now")
			self.assertEqual((d.status, d.cancelled_by, d.cancelled_on, d.cancel_reason), ("Cancelled", "dir", "now", "Wrong rates"))
			self.assertTrue(d.flags.las_workflow)

	def test_cancel_not_from_other_statuses(self):
		for st in ("Draft", "Pending approval", "Cancelled"):
			with self.assertRaises(Exception):
				las.cancel(Doc(status=st), "dir", ["Director"], "x", "now")

	def test_only_director_cancels_and_reason_needed(self):
		with self.assertRaises(Exception):
			las.cancel(Doc(status="Approved"), "u", ["Books Admin"], "x", "now")
		for r in ("", "   ", None):
			with self.assertRaises(Exception):
				las.cancel(Doc(status="Approved"), "dir", ["Director"], r, "now")

	def test_cancelled_sheet_is_locked(self):
		with self.assertRaises(Exception):
			las.check_edit(Doc(status="Cancelled"), "Cancelled")

	def test_amend_only_a_cancelled_sheet_without_amendment(self):
		las.check_amend(Doc(status="Cancelled"), None)
		for st in ("Draft", "Pending approval", "Approved", "Submitted", "Sent back"):
			with self.assertRaises(Exception):
				las.check_amend(Doc(status=st), None)
		with self.assertRaises(Exception):
			las.check_amend(Doc(status="Cancelled"), "LAS-9")

	def test_amended_values_copy_week_company_and_lines(self):
		d = Doc(status="Cancelled")
		d.lines = [types.SimpleNamespace(get=lambda k, df=None, _r=line(3, emp="E1"): _r.get(k, df))]
		v = las.amended_values(d)
		self.assertEqual((v["doctype"], v["amends_sheet"], v["company"], v["week_start"]), ("Labour Attendance Sheet", "LAS-1", "CO", datetime.date(2026, 11, 14)))
		self.assertEqual(len(v["lines"]), 1)
		self.assertEqual((v["lines"][0]["employee"], las.days_of(v["lines"][0]), v["lines"][0]["rate"]), ("E1", 3, 600))

	def test_delete_rule(self):
		self.assertTrue(las.can_delete("Draft", None))
		self.assertFalse(las.can_delete("Draft", "u"))
		for st in ("Pending approval", "Approved", "Submitted", "Sent back"):
			self.assertFalse(las.can_delete(st, "u"))
		self.assertTrue(las.can_delete("Cancelled", "u", None))
		self.assertFalse(las.can_delete("Cancelled", "u", "LAS-2"))

	def test_cancelled_sheets_ignored_when_carrying_values(self):
		with mock.patch.object(frappe, "get_all", return_value=[]) as ga:
			las.previous_values(datetime.date(2026, 10, 31), "CO")
		self.assertEqual(ga.call_args.kwargs["filters"]["status"], ["!=", "Cancelled"])


if __name__ == "__main__":
	unittest.main()