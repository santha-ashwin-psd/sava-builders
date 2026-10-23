"""Tests for the GRN rules (Sava A11): over-receipt and the project store warning. DB-free.

Run with:
	bench run-tests --app psd_books --module psd_books.invoicing.doctype.purchase_receipt.test_purchase_receipt_grn
"""
import unittest
from types import SimpleNamespace

from psd_books.invoicing.doctype.purchase_receipt.purchase_receipt import (
	over_receipt_errors,
	project_store_warnings,
)


def po_row(name="r1", item="CEM", qty=100, received=0):
	return {"name": name, "item_code": item, "item_name": item, "qty": qty, "received_qty": received}


def rec_row(item="CEM", qty=10, po_item="r1", idx=1):
	return SimpleNamespace(idx=idx, item_code=item, qty=qty, po_item=po_item)


class TestOverReceipt(unittest.TestCase):
	def test_partial_receipt_fits(self):
		self.assertEqual(over_receipt_errors([po_row()], [rec_row(qty=60)]), [])

	def test_exactly_the_pending_quantity_fits(self):
		self.assertEqual(over_receipt_errors([po_row(received=60)], [rec_row(qty=40)]), [])

	def test_more_than_pending_is_blocked(self):
		errs = over_receipt_errors([po_row(received=60)], [rec_row(qty=50)])
		self.assertEqual(len(errs), 1)
		self.assertIn("40", errs[0])

	def test_fully_received_lpo_blocks_anything_more(self):
		self.assertEqual(len(over_receipt_errors([po_row(received=100)], [rec_row(qty=1)])), 1)

	def test_item_not_on_the_lpo_is_blocked(self):
		errs = over_receipt_errors([po_row()], [rec_row(item="STEEL", po_item=None)])
		self.assertEqual(len(errs), 1)
		self.assertIn("not on this LPO", errs[0])

	def test_rows_without_po_item_are_pooled_by_item(self):
		rows = [rec_row(qty=60, po_item=None, idx=1), rec_row(qty=50, po_item=None, idx=2)]
		self.assertEqual(len(over_receipt_errors([po_row()], rows)), 1)

	def test_two_rows_on_one_lpo_line_are_added_together(self):
		rows = [rec_row(qty=60, idx=1), rec_row(qty=50, idx=2)]
		self.assertEqual(len(over_receipt_errors([po_row()], rows)), 1)


class TestProjectStoreWarnings(unittest.TestCase):
	def test_same_project_no_warning(self):
		self.assertEqual(project_store_warnings("P1", {"WH1": "P1"}), [])

	def test_other_project_warns_with_all_three_names(self):
		out = project_store_warnings("P1", {"WH2": "P2"})
		self.assertEqual(len(out), 1)
		for needle in ("WH2", "P2", "P1"):
			self.assertIn(needle, out[0])

	def test_warehouse_without_project_never_warns(self):
		self.assertEqual(project_store_warnings("P1", {"Rejected Store": None, "Plain": ""}), [])

	def test_no_project_on_the_receipt_never_warns(self):
		self.assertEqual(project_store_warnings(None, {"WH2": "P2"}), [])

	def test_one_warning_per_wrong_warehouse(self):
		out = project_store_warnings("P1", {"WH1": "P1", "WH2": "P2", "WH3": "P3"})
		self.assertEqual(len(out), 2)