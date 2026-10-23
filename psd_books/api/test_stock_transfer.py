"""Tests for check_confirmation (Sava A12.1): the rules for confirming receipt of a stock
transfer or store issue. DB-free: check_confirmation gets plain objects and a fixed "now".

Run with:
	bench --site sava set-config allow_tests true
	bench run-tests --app psd_books --module psd_books.api.test_stock_transfer
	bench --site sava set-config allow_tests false
"""
import unittest
from datetime import datetime
from types import SimpleNamespace

import frappe

from psd_books.api.stock_transfer import check_confirmation

NOW = datetime(2026, 10, 21, 12, 0, 0)


def note(**kw):
	"""A submitted stock transfer dispatched today, not yet confirmed."""
	fields = dict(docstatus=1, is_stock_transfer=1, material_request=None,
		received_on=None, posting_date="2026-10-21")
	fields.update(kw)
	return SimpleNamespace(get=lambda k, d=None: fields.get(k, d), **fields)


def confirm(doc=None, name="John Kamau", rid="12345678", on=None):
	return check_confirmation(doc or note(), name, rid, on, NOW)


class TestWhichNotesCanBeConfirmed(unittest.TestCase):
	def test_submitted_stock_transfer_is_accepted(self):
		self.assertEqual(confirm()[:2], ("John Kamau", "12345678"))

	def test_submitted_store_issue_is_accepted(self):
		doc = note(is_stock_transfer=0, material_request="MRN-1")
		self.assertEqual(confirm(doc)[:2], ("John Kamau", "12345678"))

	def test_draft_is_blocked(self):
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(note(docstatus=0))
		self.assertIn("submitted", str(cm.exception))

	def test_cancelled_is_blocked(self):
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(note(docstatus=2))
		self.assertIn("submitted", str(cm.exception))

	def test_customer_delivery_is_blocked(self):
		doc = note(is_stock_transfer=0, material_request=None)
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(doc)
		self.assertIn("not customer deliveries", str(cm.exception))

	def test_already_confirmed_is_blocked(self):
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(note(received_on=datetime(2026, 10, 21, 9, 0)))
		self.assertIn("already confirmed", str(cm.exception))


class TestReceiverDetails(unittest.TestCase):
	def test_name_and_id_are_trimmed(self):
		self.assertEqual(confirm(name="  John Kamau ", rid=" 12345678  ")[:2], ("John Kamau", "12345678"))

	def test_missing_name_is_blocked(self):
		for bad in (None, "", "   "):
			with self.subTest(name=bad), self.assertRaises(frappe.ValidationError) as cm:
				confirm(name=bad)
			self.assertIn("name and I.D.", str(cm.exception))

	def test_missing_id_is_blocked(self):
		for bad in (None, "", "   "):
			with self.subTest(rid=bad), self.assertRaises(frappe.ValidationError) as cm:
				confirm(rid=bad)
			self.assertIn("name and I.D.", str(cm.exception))


class TestReceivedTime(unittest.TestCase):
	def test_blank_time_defaults_to_now(self):
		self.assertEqual(confirm()[2], NOW)
		self.assertEqual(confirm(on="")[2], NOW)

	def test_given_time_is_used(self):
		self.assertEqual(confirm(on="2026-10-21 09:30:00")[2], datetime(2026, 10, 21, 9, 30))

	def test_a_few_minutes_ahead_is_allowed(self):
		self.assertEqual(confirm(on="2026-10-21 12:05:00")[2], datetime(2026, 10, 21, 12, 5))

	def test_more_than_five_minutes_ahead_is_blocked(self):
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(on="2026-10-21 12:06:00")
		self.assertIn("future", str(cm.exception))

	def test_a_later_day_is_blocked(self):
		with self.assertRaises(frappe.ValidationError):
			confirm(on="2026-10-22 08:00:00")

	def test_same_day_as_dispatch_is_allowed(self):
		doc = note(posting_date="2026-10-21")
		self.assertEqual(confirm(doc, on="2026-10-21 00:30:00")[2], datetime(2026, 10, 21, 0, 30))

	def test_earlier_than_dispatch_date_is_blocked(self):
		doc = note(posting_date="2026-10-21")
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(doc, on="2026-10-20 23:00:00")
		self.assertIn("before the dispatch date", str(cm.exception))
		self.assertIn("2026-10-21", str(cm.exception))

	def test_note_without_a_posting_date_skips_the_dispatch_check(self):
		doc = note(posting_date=None)
		self.assertEqual(confirm(doc, on="2020-01-01 08:00:00")[2], datetime(2020, 1, 1, 8))


class TestOrderOfChecks(unittest.TestCase):
	def test_state_is_checked_before_receiver_details(self):
		with self.assertRaises(frappe.ValidationError) as cm:
			confirm(note(docstatus=0), name="", rid="")
		self.assertIn("submitted", str(cm.exception))