"""Tests for Supplier Quotation rules (Sava A8.2). DB-free: the database is mocked.

Run with either:
    bench run-tests --app psd_books --module psd_books.invoicing.test_supplier_quotation_rules
    python3 test_supplier_quotation_rules.py   (a small frappe stand-in is used outside the bench)
"""
import importlib.util
import os
import sys
import types
import unittest
from datetime import date
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

try:
	import frappe
	from psd_books.invoicing import supplier_quotation_rules as R
except ImportError:  # plain python, outside the bench
	class _Err(Exception):
		pass

	def _throw(msg, *a, **k):
		raise _Err(msg)

	_f = types.ModuleType("frappe")
	_f._ = lambda s: s
	_f.throw = _throw
	_f.db = MagicMock()
	_f.get_all = MagicMock()
	_u = types.ModuleType("frappe.utils")
	_u.flt = lambda v, p=None: float(v or 0)
	_u.nowdate = lambda: "2026-10-16"
	_u.getdate = lambda v: v if isinstance(v, date) else date.fromisoformat(str(v))
	_f.utils = _u
	sys.modules.update({"frappe": _f, "frappe.utils": _u})
	_here = os.path.dirname(os.path.abspath(__file__))
	for _n in ("supplier_quotation_calc", "supplier_quotation_rules"):
		_s = importlib.util.spec_from_file_location(f"psd_books.invoicing.{_n}", os.path.join(_here, _n + ".py"))
		_m = importlib.util.module_from_spec(_s)
		sys.modules[f"psd_books.invoicing.{_n}"] = _m
		if _n == "supplier_quotation_rules":
			_pkg = types.ModuleType("psd_books.invoicing")
			_pkg.supplier_quotation_calc = sys.modules["psd_books.invoicing.supplier_quotation_calc"]
			sys.modules.setdefault("psd_books", types.ModuleType("psd_books"))
			sys.modules["psd_books.invoicing"] = _pkg
		_s.loader.exec_module(_m)
	R = sys.modules["psd_books.invoicing.supplier_quotation_rules"]
	frappe = _f

ERR = getattr(sys.modules["frappe"], "ValidationError", Exception)


class _D(SimpleNamespace):
	def get(self, k, default=None):
		return getattr(self, k, default)


class _Doc(_D):
	def __init__(self, **kw):
		super().__init__(**kw)
		self.flags = _D()

	def is_new(self):
		return self.name is None


def rfq(**kw):
	d = dict(name="RFQ1", status="Sent", company="C1", project="P1", posting_date="2026-10-15")
	d.update(kw)
	return d


def line(i=1, mrn_item="L1", item="CEM", qty=10, uom="Bag"):
	return _D(name=f"r{i}", mrn_item=mrn_item, item_code=item, item_name=item, qty=qty, uom=uom)


def qrow(i=1, mrn_item="L1", item="CEM", rate=100, disc=0, **kw):
	return _D(idx=i, mrn_item=mrn_item, item_code=item, item_name="", uom="", qty=0, rate=rate,
		discount_percent=disc, vat_percent=0, **kw)


def sq(items=None, **kw):
	d = dict(name=None, request_for_quotation="RFQ1", supplier="S1", supplier_name="", company="C1",
		quotation_date="2026-10-16", delivery_days=7, items=items if items is not None else [qrow()], project=None)
	d.update(kw)
	return _Doc(**d)


class TestRfqChecks(unittest.TestCase):
	def test_sent_ok(self):
		R.check_rfq(rfq(), "C1")

	def test_draft_and_cancelled_blocked(self):
		for st in ("Draft", "Cancelled"):
			with self.assertRaises(Exception) as c:
				R.check_rfq(rfq(status=st), "C1")
			self.assertIn("Sent request", str(c.exception))

	def test_other_company_blocked(self):
		with self.assertRaises(Exception):
			R.check_rfq(rfq(), "C2")


class TestSupplier(unittest.TestCase):
	def test_on_rfq_ok_and_name_filled(self):
		d = sq()
		R.check_supplier(d, {"S1": "Alpha Ltd"})
		self.assertEqual(d.supplier_name, "Alpha Ltd")

	def test_not_on_rfq(self):
		with self.assertRaises(Exception) as c:
			R.check_supplier(sq(supplier="S9"), {"S1": "Alpha"})
		self.assertIn("not on Request", str(c.exception))

	def test_missing_supplier(self):
		with self.assertRaises(Exception):
			R.check_supplier(sq(supplier=""), {"S1": "Alpha"})


class TestLines(unittest.TestCase):
	def wanted(self):
		return R.wanted_lines([line(1, "L1", "CEM", 10), line(2, "L2", "STL", 5, "Kg")])

	def test_split_rfq_rows_are_added_up(self):
		w = R.wanted_lines([line(1, "L1", "CEM", 4), line(2, "L1", "CEM", 6)])
		self.assertEqual(w["L1"]["qty"], 10)

	def test_ok_copies_qty_uom_item(self):
		d = sq(items=[qrow(1, "L1", "CEM"), qrow(2, "L2", "STL")])
		R.check_lines(d, self.wanted())
		self.assertEqual([(r.qty, r.uom) for r in d.items], [(10, "Bag"), (5, "Kg")])

	def test_client_cannot_change_qty(self):
		d = sq(items=[qrow(1, "L1", "CEM"), qrow(2, "L2", "STL")])
		d.items[0].qty = 999
		R.check_lines(d, self.wanted())
		self.assertEqual(d.items[0].qty, 10)

	def test_extra_line_blocked(self):
		with self.assertRaises(Exception) as c:
			R.check_lines(sq(items=[qrow(1, "L1"), qrow(2, "L9", "XXX")]), self.wanted())
		self.assertIn("not on Request", str(c.exception))

	def test_duplicate_line_blocked(self):
		with self.assertRaises(Exception) as c:
			R.check_lines(sq(items=[qrow(1, "L1"), qrow(2, "L1")]), self.wanted())
		self.assertIn("more than once", str(c.exception))

	def test_missing_line_blocked(self):
		with self.assertRaises(Exception) as c:
			R.check_lines(sq(items=[qrow(1, "L1")]), self.wanted())
		self.assertIn("STL", str(c.exception))

	def test_item_mismatch_blocked(self):
		with self.assertRaises(Exception):
			R.check_lines(sq(items=[qrow(1, "L1", "ZZZ"), qrow(2, "L2", "STL")]), self.wanted())

	def test_empty_and_no_rfq_line(self):
		with self.assertRaises(Exception):
			R.check_lines(sq(items=[]), self.wanted())
		with self.assertRaises(Exception):
			R.check_lines(sq(items=[qrow(1, "")]), self.wanted())


class TestNumbers(unittest.TestCase):
	def test_ok(self):
		R.check_numbers(sq(items=[qrow(rate=100, disc=10)]))

	def test_negative_rate(self):
		with self.assertRaises(Exception):
			R.check_numbers(sq(items=[qrow(rate=-1), qrow(2, rate=5)]))

	def test_discount_limits(self):
		for bad in (-1, 100.01):
			with self.assertRaises(Exception):
				R.check_numbers(sq(items=[qrow(disc=bad)]))
		R.check_numbers(sq(items=[qrow(disc=100)]))
		R.check_numbers(sq(items=[qrow(disc=0)]))

	def test_negative_delivery_days(self):
		with self.assertRaises(Exception):
			R.check_numbers(sq(delivery_days=-2))

	def test_blank_delivery_days_ok(self):
		R.check_numbers(sq(delivery_days=None))

	def test_nothing_quoted_blocked(self):
		for rate in (None, 0, ""):
			with self.assertRaises(Exception) as c:
				R.check_numbers(sq(items=[qrow(rate=rate)]))
			self.assertIn("at least one", str(c.exception))

	def test_partly_quoted_ok(self):
		R.check_numbers(sq(items=[qrow(1, rate=None), qrow(2, rate=50)]))


class TestDates(unittest.TestCase):
	def test_default_today(self):
		d = sq(quotation_date=None)
		R.check_dates(d, rfq())
		self.assertTrue(d.quotation_date)

	def test_before_rfq_blocked(self):
		with self.assertRaises(Exception):
			R.check_dates(sq(quotation_date="2026-10-14"), rfq())

	def test_same_day_ok(self):
		R.check_dates(sq(quotation_date="2026-10-15"), rfq())


class TestVat(unittest.TestCase):
	def test_lookup_overrides_client_value(self):
		d = sq(items=[qrow(1, "L1", "CEM"), qrow(2, "L2", "STL")])
		d.items[0].vat_percent = 0
		R.apply_vat(d, lookup=lambda code: 16.0)
		self.assertEqual([r.vat_percent for r in d.items], [16.0, 16.0])

	def test_one_lookup_per_item(self):
		lk = MagicMock(return_value=16.0)
		R.apply_vat(sq(items=[qrow(1, "L1", "CEM"), qrow(2, "L2", "CEM")]), lookup=lk)
		self.assertEqual(lk.call_count, 1)

	def test_template_rates_added(self):
		with patch.object(R.frappe, "db") as db, patch.object(R.frappe, "get_all") as ga:
			db.get_value.return_value = "Input VAT 16% - C1"
			ga.return_value = [_D(rate=16)]
			self.assertEqual(R.item_vat_percent("CEM"), 16.0)

	def test_item_without_template_blocked(self):
		with patch.object(R.frappe, "db") as db:
			db.get_value.return_value = None
			with self.assertRaises(Exception) as c:
				R.item_vat_percent("CEM")
			self.assertIn("no purchase tax template", str(c.exception))


class TestSingleActive(unittest.TestCase):
	def test_none_other_ok(self):
		with patch.object(R.frappe, "db") as db:
			db.get_value.return_value = None
			R.check_single_active(sq())

	def test_other_active_blocked(self):
		with patch.object(R.frappe, "db") as db:
			db.get_value.return_value = "SB-SQ-26-0001"
			with self.assertRaises(Exception) as c:
				R.check_single_active(sq())
			self.assertIn("SB-SQ-26-0001", str(c.exception))

	def test_saved_doc_excludes_itself(self):
		with patch.object(R.frappe, "db") as db:
			db.get_value.return_value = None
			R.check_single_active(sq(name="SB-SQ-26-0002"))
			self.assertEqual(db.get_value.call_args[0][1]["name"], ["!=", "SB-SQ-26-0002"])


class TestStatus(unittest.TestCase):
	def test_new_forced_active(self):
		d = sq(status="Cancelled")
		R.keep_status_server_side(d, None)
		self.assertEqual(d.status, "Active")

	def test_existing_keeps_old(self):
		d = sq(name="X", status="Active")
		R.keep_status_server_side(d, _D(status="Superseded"))
		self.assertEqual(d.status, "Superseded")

	def test_workflow_flag_allows_change(self):
		d = sq(name="X", status="Cancelled")
		d.flags.sq_workflow = True
		R.keep_status_server_side(d, _D(status="Active"))
		self.assertEqual(d.status, "Cancelled")


class TestValidateActive(unittest.TestCase):
	def run_it(self, d, rfq_row=None, lines=None, sups=None, active=None):
		with patch.object(R, "load_rfq", return_value=rfq_row or rfq()), \
			patch.object(R, "rfq_lines", return_value=lines or [line()]), \
			patch.object(R, "rfq_suppliers", return_value=sups or {"S1": "Alpha"}), \
			patch.object(R, "item_vat_percent", return_value=16.0), \
			patch.object(R.frappe, "db") as db:
			db.get_value.return_value = active
			R.validate_active(d)

	def test_happy_path_stamps_company_project_vat(self):
		d = sq(company=None)
		self.run_it(d)
		self.assertEqual((d.company, d.project, d.supplier_name), ("C1", "P1", "Alpha"))
		self.assertEqual((d.items[0].qty, d.items[0].vat_percent), (10, 16.0))

	def test_draft_rfq_blocked(self):
		with self.assertRaises(Exception):
			self.run_it(sq(), rfq_row=rfq(status="Draft"))

	def test_no_rfq(self):
		with self.assertRaises(Exception):
			self.run_it(sq(request_for_quotation=""))

	def test_duplicate_active_blocked(self):
		with self.assertRaises(Exception):
			self.run_it(sq(), active="SB-SQ-26-0001")


if __name__ == "__main__":
	unittest.main()