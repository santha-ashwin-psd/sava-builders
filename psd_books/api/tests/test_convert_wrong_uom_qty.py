"""
Tests for the "Fix qty" API (api/inventory.py): qty typed in the wrong UOM,
e.g. stock UOM Kg, 100 typed for 100 grams -> corrected to 0.1 Kg.

DB-free: frappe.db / frappe.get_doc are mocked; assert_can and _get_company are
patched out. What is locked in here:
  - the converted qty and the Stock Adjustment delta posted (-99.9 for 100 g)
  - the delta is valued at the current valuation rate, so stock value becomes
    corrected qty x rate (0.1 x rate), not 100 x rate; the rate is not changed
  - a missing conversion never silently falls back to 1.0
  - batch-tracked items need a batch and post it on the adjustment row
  - the wrong qty can't exceed what is on hand

Run with:
    bench run-tests --app psd_books \
        --module psd_books.api.tests.test_convert_wrong_uom_qty
"""
from __future__ import annotations

import unittest
from unittest.mock import MagicMock, patch

from psd_books.api import inventory as inv


class _D(dict):
	"""dict with attribute access, like frappe._dict."""

	__getattr__ = dict.get


class _Boom(Exception):
	"""Stands in for the exception frappe.throw raises."""


class _FakeDB:
	"""Just enough of frappe.db for convert_wrong_uom_qty / get_wrong_uom_fix_info."""

	def __init__(self, stock_uom="Kg", has_batch_no=0, factors=None, bin_qty=100.0,
				valuation_rate=300.0, batch_qty=None, item_rates=None, already_fixed=False):
		self.item = _D(item_name="Sweet", stock_uom=stock_uom, has_batch_no=has_batch_no,
					name="S123")
		self.factors = factors if factors is not None else {"Gram": 0.001}
		self.bin = _D(actual_qty=bin_qty, valuation_rate=valuation_rate)
		self.batch_qty = batch_qty
		self.item_rates = item_rates or {}
		self.already_fixed = already_fixed
		self.sql_calls = []

	def get_value(self, doctype, filters=None, fieldname=None, as_dict=False):
		if doctype == "Item":
			if isinstance(fieldname, list) and "standard_rate" in fieldname:
				return _D(self.item_rates)
			return self.item
		if doctype == "Item UOM Conversion Detail":
			return self.factors.get(filters.get("uom"))
		if doctype == "Bin":
			if isinstance(fieldname, list):
				return self.bin
			return self.bin.get(fieldname)
		return None

	def exists(self, doctype, name):
		return True

	def sql(self, query, params=None):
		self.sql_calls.append(params)
		if "adjustment_reason" in query:  # the "already fixed once?" lookup
			return [["SEC-OLD"]] if self.already_fixed else []
		return [[self.batch_qty]]

	def commit(self):
		pass


def _run(db, **kwargs):
	"""Call convert_wrong_uom_qty with frappe mocked; return (result, posted_doc_dict)."""
	posted = {}
	fake_frappe = MagicMock()
	fake_frappe.db = db
	fake_frappe.throw.side_effect = _Boom
	fake_frappe.generate_hash.return_value = "ABCD1234"
	fake_frappe.session.user = "tester"

	def _get_doc(d):
		posted.update(d)
		return MagicMock()

	fake_frappe.get_doc.side_effect = _get_doc
	args = dict(item_code="S123", warehouse="fg", wrong_qty=100, actual_uom="Gram")
	args.update(kwargs)
	with patch.object(inv, "frappe", fake_frappe), \
			patch("psd_books.utils.access.assert_can"), \
			patch.object(inv, "_get_company", return_value="Test Co"):
		res = inv.convert_wrong_uom_qty(**args)
	return res, posted


class TestConvertWrongUomQty(unittest.TestCase):

	def test_second_fix_for_same_item_and_warehouse_is_blocked(self):
		with self.assertRaises(_Boom):
			_run(_FakeDB(already_fixed=True))

	def test_first_fix_is_allowed(self):
		res, _ = _run(_FakeDB(already_fixed=False))
		self.assertAlmostEqual(res["correct_qty"], 0.1, places=6)

	def test_100_typed_for_100_grams_becomes_0_1_kg(self):
		res, posted = _run(_FakeDB())
		self.assertAlmostEqual(res["correct_qty"], 0.1, places=6)
		self.assertAlmostEqual(res["delta"], -99.9, places=6)
		row = posted["items"][0]
		self.assertAlmostEqual(row["qty"], -99.9, places=6)
		self.assertEqual(row["t_warehouse"], "fg")
		self.assertEqual(posted["stock_entry_type"], "Stock Adjustment")
		self.assertNotIn("batch_no", row)

	def test_value_is_corrected_qty_times_rate_not_wrong_qty_times_rate(self):
		# 100 Kg @ 300 = 30,000 on the books. After the fix 0.1 Kg @ 300 = 30.
		res, posted = _run(_FakeDB(valuation_rate=300.0))
		self.assertEqual(posted["items"][0]["basic_rate"], 300.0)
		self.assertAlmostEqual(res["value_change"], -29970.0, places=2)
		self.assertAlmostEqual(100 * 300.0 + res["value_change"], 0.1 * 300.0, places=2)

	def test_unsaved_conversion_uses_per_stock(self):
		res, _ = _run(_FakeDB(factors={}), per_stock=1000)
		self.assertAlmostEqual(res["correct_qty"], 0.1, places=6)

	def test_saved_conversion_wins_over_per_stock(self):
		res, _ = _run(_FakeDB(factors={"Gram": 0.001}), per_stock=5)
		self.assertAlmostEqual(res["correct_qty"], 0.1, places=6)

	def test_missing_conversion_throws_instead_of_falling_back_to_1(self):
		with self.assertRaises(_Boom):
			_run(_FakeDB(factors={}))

	def test_same_uom_throws(self):
		with self.assertRaises(_Boom):
			_run(_FakeDB(), actual_uom="Kg")

	def test_wrong_qty_cannot_exceed_on_hand(self):
		with self.assertRaises(_Boom):
			_run(_FakeDB(bin_qty=50.0), wrong_qty=100)

	def test_zero_or_negative_wrong_qty_throws(self):
		for q in (0, -5):
			with self.assertRaises(_Boom):
				_run(_FakeDB(), wrong_qty=q)

	def test_partial_fix_only_converts_the_wrong_part(self):
		# 105 Kg on hand: 5 correct + 100 typed for grams. Fix only the 100.
		res, posted = _run(_FakeDB(bin_qty=105.0), wrong_qty=100)
		self.assertAlmostEqual(posted["items"][0]["qty"], -99.9, places=6)
		self.assertAlmostEqual(105.0 + res["delta"], 5.1, places=6)

	def test_larger_uom_raises_stock(self):
		# Stock UOM Gram, 5 typed but it was 5 Kg (1 Kg = 1000 Gram) -> +4995.
		res, posted = _run(_FakeDB(stock_uom="Gram", factors={"Kg": 1000.0}, bin_qty=5.0),
						wrong_qty=5, actual_uom="Kg")
		self.assertAlmostEqual(res["correct_qty"], 5000.0, places=6)
		self.assertAlmostEqual(posted["items"][0]["qty"], 4995.0, places=6)

	def test_rate_falls_back_to_item_standard_rate(self):
		db = _FakeDB(valuation_rate=0, item_rates={"standard_buying_rate": 0, "standard_rate": 12.5})
		_, posted = _run(db)
		self.assertEqual(posted["items"][0]["basic_rate"], 12.5)

	def test_batch_item_needs_a_batch(self):
		with self.assertRaises(_Boom):
			_run(_FakeDB(has_batch_no=1, batch_qty=100.0))

	def test_batch_item_posts_batch_and_checks_batch_qty(self):
		db = _FakeDB(has_batch_no=1, batch_qty=100.0, bin_qty=500.0)
		res, posted = _run(db, batch_no="B-1")
		self.assertEqual(posted["items"][0]["batch_no"], "B-1")
		self.assertAlmostEqual(posted["items"][0]["qty"], -99.9, places=6)
		# the on-hand check used the batch's own ledger qty, not the Bin total
		with self.assertRaises(_Boom):
			_run(_FakeDB(has_batch_no=1, batch_qty=40.0, bin_qty=500.0), batch_no="B-1")


class TestGetWrongUomFixInfo(unittest.TestCase):

	def test_rows_are_returned_in_one_stock_uom_equals_n_form(self):
		fake_frappe = MagicMock()
		fake_frappe.db = _FakeDB(factors={"Gram": 0.001})
		fake_frappe.throw.side_effect = _Boom
		fake_frappe.get_all.return_value = [_D(uom="Gram", conversion_factor=0.001)]
		with patch.object(inv, "frappe", fake_frappe), \
				patch("psd_books.utils.access.assert_can"):
			info = inv.get_wrong_uom_fix_info("S123", "fg")
		self.assertEqual(info["stock_uom"], "Kg")
		self.assertEqual(info["rows"], [{"uom": "Gram", "per_stock": 1000.0}])
		self.assertEqual(info["bin_qty"], 100.0)
		self.assertEqual(info["valuation_rate"], 300.0)
		self.assertEqual(info["batches"], [])


if __name__ == "__main__":
	unittest.main()