"""Tests for Supplier Quotation money maths (Sava A8.1). No database and no frappe.

Run with either:
    bench run-tests --app zoho_books_clone --module zoho_books_clone.invoicing.test_supplier_quotation_calc
    python3 test_supplier_quotation_calc.py
"""
import importlib.util
import os
import unittest
from types import SimpleNamespace

try:
	from zoho_books_clone.invoicing import supplier_quotation_calc as C
except ImportError:  # plain python, outside the bench
	_p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "supplier_quotation_calc.py")
	_s = importlib.util.spec_from_file_location("supplier_quotation_calc", _p)
	C = importlib.util.module_from_spec(_s)
	_s.loader.exec_module(C)


class _Doc(SimpleNamespace):
	def get(self, k, default=None):
		return getattr(self, k, default)


def row(**kw):
	d = dict(qty=10, rate=None, discount_percent=0, vat_percent=0)
	d.update(kw)
	return _Doc(**d)


class TestLine(unittest.TestCase):
	def test_plain(self):
		self.assertEqual(C.calc_line(10, 100), {"net_rate": 100.0, "amount": 1000.0, "tax_amount": 0.0})

	def test_discount_then_vat(self):
		r = C.calc_line(10, 100, 10, 16)
		self.assertEqual(r, {"net_rate": 90.0, "amount": 900.0, "tax_amount": 144.0})

	def test_not_quoted(self):
		for blank in (None, "", 0, "0"):
			self.assertEqual(C.calc_line(10, blank, 10, 16), {"net_rate": 0.0, "amount": 0.0, "tax_amount": 0.0})

	def test_rounding_half_up(self):
		# 3 x 0.335 = 1.005 -> 1.01 (a float would give 1.0)
		self.assertEqual(C.calc_line(3, 0.335)["amount"], 1.01)
		# VAT 16% of 1.01 = 0.1616 -> 0.16
		self.assertEqual(C.calc_line(3, 0.335, 0, 16)["tax_amount"], 0.16)

	def test_blank_discount_and_vat(self):
		self.assertEqual(C.calc_line(2, 50, None, None)["amount"], 100.0)


class TestTotals(unittest.TestCase):
	def test_totals(self):
		lines = [C.calc_line(10, 100, 10, 16), C.calc_line(5, 20, 0, 16)]
		self.assertEqual(C.calc_totals(lines), {"net_total": 1000.0, "total_tax": 160.0, "grand_total": 1160.0})

	def test_unquoted_lines_ignored(self):
		lines = [C.calc_line(10, 100), C.calc_line(5, None, 0, 16)]
		self.assertEqual(C.calc_totals(lines)["grand_total"], 1000.0)

	def test_empty(self):
		self.assertEqual(C.calc_totals([]), {"net_total": 0.0, "total_tax": 0.0, "grand_total": 0.0})


class TestApplyToDoc(unittest.TestCase):
	def test_fills_rows_and_header(self):
		doc = _Doc(items=[row(rate=100, discount_percent=10, vat_percent=16), row(qty=4)])
		C.apply_to_doc(doc)
		self.assertEqual((doc.items[0].net_rate, doc.items[0].amount, doc.items[0].tax_amount), (90.0, 900.0, 144.0))
		self.assertEqual((doc.items[1].net_rate, doc.items[1].amount), (0.0, 0.0))
		self.assertEqual((doc.net_total, doc.total_tax, doc.grand_total), (900.0, 144.0, 1044.0))

	def test_no_items(self):
		doc = _Doc(items=[])
		C.apply_to_doc(doc)
		self.assertEqual(doc.grand_total, 0.0)


if __name__ == "__main__":
	unittest.main()