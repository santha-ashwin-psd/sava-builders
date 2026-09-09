"""
Tests for LandedCostVoucher._cancel_expense_entries -- the on_cancel step
that cancels the auto-created Expense record(s) for each charge row
(_create_expense_entries created these on submit), so a cancelled LCV
doesn't leave a still-Submitted Expense behind with live GL entries of its
own. See scripts/find_orphaned_landed_cost_expenses.py for the audit that
originally surfaced this gap.

Same style as test_landed_cost_guardrails.py: bind the real unbound method
onto a lightweight SimpleNamespace and mock frappe.get_doc, rather than
constructing a full frappe.model.Document.

Run with:
    bench run-tests --app zoho_books_clone \
        --module zoho_books_clone.inventory.tests.test_landed_cost_cancel_expenses
"""
from __future__ import annotations

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import frappe

from zoho_books_clone.inventory.doctype.landed_cost_voucher.landed_cost_voucher import (
    LandedCostVoucher,
)


def _make_lcv(charges, name="LCV-2026-00022"):
    doc = SimpleNamespace(charges=charges, name=name)
    doc._cancel_expense_entries = LandedCostVoucher._cancel_expense_entries.__get__(doc)
    return doc


def _charge_row(reference_doctype=None, reference_name=None, idx=1):
    return SimpleNamespace(
        reference_doctype=reference_doctype, reference_name=reference_name, idx=idx
    )


class TestCancelExpenseEntries(unittest.TestCase):

    @patch.object(frappe, "get_doc")
    def test_cancels_submitted_expense_for_auto_created_charge_row(self, mock_get_doc):
        expense = MagicMock(docstatus=1)
        expense.flags = SimpleNamespace()
        mock_get_doc.return_value = expense
        doc = _make_lcv([_charge_row("Expense", "EXP-2026-00843")])

        doc._cancel_expense_entries()

        mock_get_doc.assert_called_once_with("Expense", "EXP-2026-00843")
        expense.cancel.assert_called_once()

    @patch.object(frappe, "get_doc")
    def test_sets_ignore_permissions_before_cancelling(self, mock_get_doc):
        # Regression: Expense.cancel() -> save() -> check_permission("write")
        # runs against the user cancelling the LCV, who may not have direct
        # write access to Expense -- caught this via a real PermissionError
        # from the LCV cancel flow. ignore_permissions must be set first.
        expense = MagicMock(docstatus=1)
        expense.flags = SimpleNamespace()
        mock_get_doc.return_value = expense
        doc = _make_lcv([_charge_row("Expense", "EXP-2026-00843")])

        doc._cancel_expense_entries()

        self.assertTrue(expense.flags.ignore_permissions)

    @patch.object(frappe, "get_doc")
    def test_skips_charge_row_booked_against_existing_bill(self, mock_get_doc):
        # reference_doctype is something other than "Expense" -- this
        # charge was already booked elsewhere and never got an auto-created
        # Expense, so nothing here belongs to the LCV to cancel.
        doc = _make_lcv([_charge_row("Purchase Invoice", "PINV-2026-00125")])

        doc._cancel_expense_entries()

        mock_get_doc.assert_not_called()

    @patch.object(frappe, "get_doc")
    def test_skips_charge_row_with_no_reference(self, mock_get_doc):
        doc = _make_lcv([_charge_row(None, None)])

        doc._cancel_expense_entries()

        mock_get_doc.assert_not_called()

    @patch.object(frappe, "get_doc")
    def test_does_not_re_cancel_an_already_cancelled_expense(self, mock_get_doc):
        expense = MagicMock(docstatus=2)
        mock_get_doc.return_value = expense
        doc = _make_lcv([_charge_row("Expense", "EXP-2026-00843")])

        doc._cancel_expense_entries()

        expense.cancel.assert_not_called()

    @patch.object(frappe, "log_error")
    @patch.object(frappe, "get_doc")
    def test_one_failing_row_does_not_block_the_rest(self, mock_get_doc, mock_log_error):
        good_expense = MagicMock(docstatus=1)
        bad_expense = MagicMock(docstatus=1)
        bad_expense.cancel.side_effect = Exception("locked downstream")
        mock_get_doc.side_effect = [bad_expense, good_expense]

        doc = _make_lcv([
            _charge_row("Expense", "EXP-2026-00001", idx=1),
            _charge_row("Expense", "EXP-2026-00002", idx=2),
        ])

        doc._cancel_expense_entries()  # should not raise

        good_expense.cancel.assert_called_once()
        mock_log_error.assert_called_once()


if __name__ == "__main__":
    unittest.main()