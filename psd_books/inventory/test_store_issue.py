"""Logic tests for Issue from store (Sava A6.1), no database needed.

Run in the bench:
	bench --site sava run-tests --module psd_books.inventory.test_store_issue
"""
import sys
import types
import unittest
from unittest import mock

try:
	import frappe  # noqa: F401
	STUBBED = False
except ImportError:  # plain-python run outside a bench
	STUBBED = True
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s

	class _Err(Exception):
		pass

	def _throw(msg, title=None):
		raise _Err(msg)

	fm.throw = _throw
	fm.bold = lambda s: s
	fm.msgprint = lambda *a, **k: None
	fm.whitelist = lambda *a, **k: (lambda f: f)
	fm.get_doc = lambda d: d
	fm.db = types.SimpleNamespace()
	fm.get_all = lambda *a, **k: fm._get_all(*a, **k)
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	utils.today = lambda: "2026-10-15"
	utils.nowtime = lambda: "12:00:00"
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	fm.utils, fm.model = utils, model
	model.document = document
	sys.modules.update({"frappe": fm, "frappe.utils": utils, "frappe.model": model,
		"frappe.model.document": document})
	vm = types.ModuleType("psd_books.db.validators")
	vm.validate_fiscal_year = lambda *a, **k: None
	vm.set_posting_time = lambda *a, **k: None
	sys.modules["psd_books.db.validators"] = vm

import frappe  # noqa: E402,F811
from psd_books.inventory import store_issue as si  # noqa: E402
from psd_books.inventory import stock_link as sl  # noqa: E402

MRN = "SB-MRN-26-0001"


class D(dict):
	"""Like frappe._dict: dict with attribute access."""
	__getattr__ = dict.get


class Row:
	def __init__(self, item_code="CEM-50", qty=10, mrn_item="L1", idx=1, uom="Nos", intended_use=""):
		self.item_code, self.qty, self.mrn_item, self.idx = item_code, qty, mrn_item, idx
		self.uom, self.intended_use, self.warehouse = uom, intended_use, ""

	def get(self, k, d=None):
		return getattr(self, k, d)


class DN:
	def __init__(self, rows=None, **kw):
		self.material_request = MRN
		self.company = "Sava Builders"
		self.project = ""
		self.from_warehouse = "Central Store"
		self.to_warehouse = "SB-001 Main Store"
		self.driver_name, self.driver_id, self.truck_no = "Juma", "12345678", "KDA 123X"
		self.items = [Row()] if rows is None else rows
		self.customer = ""
		self.name = "DN-2026-00001"
		self.doctype = "Delivery Note"
		self.posting_date = "2026-10-15"
		self.posting_time = "12:00:00"
		self.__dict__.update(kw)

	def get(self, k, d=None):
		return getattr(self, k, d)


class FakeDB:
	def __init__(self):
		self.mrn = {"name": MRN, "docstatus": 1, "status": "Approved", "company": "Sava Builders",
			"project": "SB-001", "delivery_warehouse": "SB-001 Site Store"}
		self.lines = [
			{"name": "L1", "item_code": "CEM-50", "required_qty": 100.0, "uom": "Nos", "intended_use": "Slab"},
			{"name": "L2", "item_code": "STEEL", "required_qty": 50.0, "uom": "Kg", "intended_use": "Beams"},
		]
		self.issued = {"L1": 0.0, "L2": 0.0}
		self.stock_items = {"CEM-50": 1, "STEEL": 1, "SERVICE": 0}
		self.set_calls = []
		self.status_calls = []
		self.lock_args = []

	def get_value(self, doctype, name, fields=None, as_dict=False, for_update=False):
		if doctype == "Material Request":
			return D(self.mrn) if self.mrn else None
		if doctype == "Material Request Item":
			self.lock_args.append(for_update)
			return self.issued.get(name, 0.0)
		if doctype == "Item":
			return self.stock_items.get(name)

	def set_value(self, doctype, name, field, value, update_modified=True):
		if doctype == "Material Request":
			self.mrn[field] = value
			self.status_calls.append((name, field, value, update_modified))
			return
		self.issued[name] = value
		self.set_calls.append((name, field, value, update_modified))


def get_all(doctype, filters=None, fields=None):
	return [D(dict(d, issued_qty=DB.issued.get(d["name"], 0.0))) for d in DB.lines]


DB = None


class StoreIssueTest(unittest.TestCase):
	def setUp(self):
		global DB
		DB = FakeDB()
		self.balance = {("CEM-50", "Central Store"): 500.0, ("STEEL", "Central Store"): 500.0}
		patches = [
			mock.patch.object(frappe, "db", DB),
			mock.patch.object(frappe, "get_all", get_all, create=True),
			mock.patch("psd_books.inventory.utils.get_stock_balance",
				lambda i, w, d=None: self.balance.get((i, w), 0.0), create=True),
			mock.patch("psd_books.inventory.utils.get_conversion_factor",
				lambda i, u: 1.0, create=True),
			mock.patch("psd_books.inventory.doctype.stock_entry.stock_entry._allow_negative_stock",
				lambda: False, create=True),
		]
		self.mods = []
		if STUBBED:
			for name, attrs in (
				("psd_books.inventory.utils", {}),
				("psd_books.inventory.doctype", {}),
				("psd_books.inventory.doctype.stock_entry", {}),
				("psd_books.inventory.doctype.stock_entry.stock_entry", {}),
			):
				m = sys.modules.get(name) or types.ModuleType(name)
				sys.modules[name] = m
				self.mods.append(name)
		for p in patches:
			p.start()
			self.addCleanup(p.stop)

	# --- no-op for ordinary Delivery Notes
	def test_plain_delivery_note_untouched(self):
		dn = DN(material_request="", customer="C1")
		si.validate_store_issue(dn)
		si.update_issued_qty(dn, 1)
		self.assertEqual(DB.set_calls, [])
		self.assertEqual(dn.project, "")

	# --- MRN state
	def test_mrn_must_be_approved(self):
		for status, docstatus in (("Pending Approval", 0), ("Submitted", 1), ("Cancelled", 2), ("Ordered", 1),
				("Issued", 1)):
			DB.mrn.update(status=status, docstatus=docstatus)
			with self.assertRaises(Exception, msg=status):
				si.validate_store_issue(DN())

	def test_partly_issued_mrn_can_still_be_issued(self):
		DB.mrn.update(status="Partly Issued")
		DB.issued["L1"] = 40.0
		si.validate_store_issue(DN(rows=[Row(qty=60)]))  # the 60 still pending

	def test_mrn_missing(self):
		DB.mrn = None
		with self.assertRaises(Exception):
			si.validate_store_issue(DN())

	def test_other_company_blocked(self):
		DB.mrn["company"] = "Other"
		with self.assertRaises(Exception):
			si.validate_store_issue(DN())

	# --- header
	def test_driver_truck_and_warehouses_required(self):
		for f in ("driver_name", "driver_id", "truck_no", "from_warehouse"):
			dn = DN(**{f: ""})
			with self.assertRaises(Exception, msg=f):
				si.validate_store_issue(dn)

	def test_to_warehouse_defaults_from_mrn(self):
		dn = DN(to_warehouse="")
		si.validate_store_issue(dn)
		self.assertEqual(dn.to_warehouse, "SB-001 Site Store")

	def test_same_warehouse_blocked(self):
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(to_warehouse="Central Store"))

	def test_defaults_filled(self):
		dn = DN()
		si.validate_store_issue(dn)
		self.assertEqual(dn.project, "SB-001")
		self.assertEqual(dn.items[0].warehouse, "Central Store")
		self.assertEqual(dn.items[0].intended_use, "Slab")
		self.assertEqual(dn.items[0].uom, "Nos")

	def test_row_intended_use_kept(self):
		dn = DN(rows=[Row(intended_use="Column")])
		si.validate_store_issue(dn)
		self.assertEqual(dn.items[0].intended_use, "Column")

	# --- rows
	def test_row_needs_mrn_line(self):
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(mrn_item="")]))

	def test_row_line_not_on_mrn(self):
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(mrn_item="ZZ")]))

	def test_row_item_must_match_line(self):
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(item_code="STEEL", mrn_item="L1")]))

	def test_uom_taken_from_mrn_line(self):
		dn = DN(rows=[Row(item_code="STEEL", mrn_item="L2", qty=5, uom="Nos")])
		si.validate_store_issue(dn)
		self.assertEqual(dn.items[0].uom, "Kg")

	# --- pending MRN qty
	def test_qty_within_pending_ok(self):
		si.validate_store_issue(DN(rows=[Row(qty=100)]))

	def test_qty_over_required_blocked(self):
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(qty=100.5)]))

	def test_pending_after_earlier_issue(self):
		DB.issued["L1"] = 90.0
		si.validate_store_issue(DN(rows=[Row(qty=10)]))
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(qty=10.5)]))

	def test_rows_for_same_line_are_summed(self):
		rows = [Row(qty=60, idx=1), Row(qty=50, idx=2)]
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=rows))

	def test_fully_issued_line_blocked(self):
		DB.issued["L1"] = 100.0
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(qty=1)]))

	def test_lock_flag_passed_on_submit_check(self):
		si.validate_store_issue(DN(), lock=False)
		si.validate_store_issue(DN(), lock=True)
		self.assertEqual(DB.lock_args, [False, True])

	# --- stock in source warehouse
	def test_stock_short_blocked(self):
		self.balance[("CEM-50", "Central Store")] = 5.0
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=[Row(qty=10)]))

	def test_stock_exact_ok(self):
		self.balance[("CEM-50", "Central Store")] = 10.0
		si.validate_store_issue(DN(rows=[Row(qty=10)]))

	def test_stock_summed_across_rows(self):
		self.balance[("CEM-50", "Central Store")] = 15.0
		rows = [Row(qty=10, idx=1), Row(qty=10, idx=2)]
		with self.assertRaises(Exception):
			si.validate_store_issue(DN(rows=rows))

	def test_non_stock_item_not_checked(self):
		DB.lines.append({"name": "L3", "item_code": "SERVICE", "required_qty": 5.0, "uom": "Nos", "intended_use": "x"})
		DB.issued["L3"] = 0.0
		si.validate_store_issue(DN(rows=[Row(item_code="SERVICE", mrn_item="L3", qty=5)]))

	def test_allow_negative_stock_skips_check(self):
		self.balance[("CEM-50", "Central Store")] = 0.0
		with mock.patch("psd_books.inventory.doctype.stock_entry.stock_entry._allow_negative_stock",
				lambda: True, create=True):
			si.validate_store_issue(DN(rows=[Row(qty=10)]))

	def test_uom_factor_applied_to_stock_check(self):
		self.balance[("CEM-50", "Central Store")] = 40.0
		with mock.patch("psd_books.inventory.utils.get_conversion_factor",
				lambda i, u: 5.0, create=True):
			with self.assertRaises(Exception):
				si.validate_store_issue(DN(rows=[Row(qty=10)]))  # 10 x 5 = 50 > 40

	# --- issued_qty bookkeeping
	def test_issued_qty_added_and_taken_back(self):
		dn = DN(rows=[Row(qty=30), Row(item_code="STEEL", mrn_item="L2", qty=7, idx=2)])
		si.update_issued_qty(dn, +1)
		self.assertEqual((DB.issued["L1"], DB.issued["L2"]), (30.0, 7.0))
		si.update_issued_qty(dn, -1)
		self.assertEqual((DB.issued["L1"], DB.issued["L2"]), (0.0, 0.0))
		self.assertTrue(all(c[3] is False for c in DB.set_calls))

	def test_issued_qty_never_negative(self):
		si.update_issued_qty(DN(rows=[Row(qty=30)]), -1)
		self.assertEqual(DB.issued["L1"], 0.0)

	def test_row_without_mrn_line_skipped(self):
		si.update_issued_qty(DN(rows=[Row(mrn_item="")]), +1)
		self.assertEqual(DB.set_calls, [])
		self.assertEqual(DB.status_calls, [])

	# --- MRN status (A6.3)
	def test_status_from_lines(self):
		f = si.status_from_lines
		self.assertEqual(f([]), "Approved")
		self.assertEqual(f([{"required_qty": 10, "issued_qty": 0}]), "Approved")
		self.assertEqual(f([{"required_qty": 10, "issued_qty": 4}, {"required_qty": 5, "issued_qty": 0}]), "Partly Issued")
		self.assertEqual(f([{"required_qty": 10, "issued_qty": 10}, {"required_qty": 5, "issued_qty": 0}]), "Partly Issued")
		self.assertEqual(f([{"required_qty": 10, "issued_qty": 10}, {"required_qty": 5, "issued_qty": 5}]), "Issued")
		self.assertEqual(f([{"required_qty": 0.3, "issued_qty": 0.1 + 0.2}]), "Issued")

	def test_status_partly_then_issued_then_reversed(self):
		first = DN(rows=[Row(qty=30)])
		si.update_issued_qty(first, +1)
		self.assertEqual(DB.mrn["status"], "Partly Issued")
		rest = DN(rows=[Row(qty=70), Row(item_code="STEEL", mrn_item="L2", qty=50, idx=2)])
		si.update_issued_qty(rest, +1)
		self.assertEqual(DB.mrn["status"], "Issued")
		si.update_issued_qty(rest, -1)
		self.assertEqual(DB.mrn["status"], "Partly Issued")
		si.update_issued_qty(first, -1)
		self.assertEqual(DB.mrn["status"], "Approved")
		self.assertTrue(all(c[3] is False for c in DB.status_calls))

	def test_status_not_written_when_unchanged(self):
		si.update_issued_qty(DN(rows=[Row(qty=10)]), +1)
		si.update_issued_qty(DN(rows=[Row(qty=10)]), +1)
		self.assertEqual(len(DB.status_calls), 1)  # Approved -> Partly Issued once

	def test_ordered_and_other_statuses_left_alone(self):
		for status in ("Ordered", "Submitted", "Cancelled"):
			DB.mrn["status"] = status
			DB.status_calls.clear()
			si.update_issued_qty(DN(rows=[Row(qty=10)]), +1)
			si.update_issued_qty(DN(rows=[Row(qty=10)]), -1)
			self.assertEqual(DB.mrn["status"], status)
			self.assertEqual(DB.status_calls, [])


class StockLinkTest(unittest.TestCase):
	"""Delivery Note submit: MRN-linked posts a transfer, others still issue."""

	def _submit(self, dn):
		calls = []
		rows = [{"item_code": "CEM-50", "item_name": "Cement", "qty": 10.0, "basic_rate": 0,
			"warehouse": "Central Store", "batch_no": None}]
		with mock.patch.object(sl, "_stock_rows", lambda d, direction, zero_rate=False: [dict(r) for r in rows]), \
				mock.patch.object(sl, "_build_stock_entry",
					lambda **kw: calls.append(kw) or types.SimpleNamespace(name="SE-1")):
			sl.on_delivery_note_submit(dn)
		return calls

	def test_mrn_note_posts_material_transfer(self):
		calls = self._submit(DN(project="SB-001", sales_order=None))
		self.assertEqual(len(calls), 1)
		self.assertEqual(calls[0]["entry_type"], "Material Transfer")
		self.assertEqual(calls[0]["project"], "SB-001")
		self.assertEqual(calls[0]["rows"][0]["to_warehouse"], "SB-001 Main Store")

	def test_plain_note_still_material_issue(self):
		dn = DN(material_request="", customer="C1", sales_order=None, project="P")
		calls = self._submit(dn)
		self.assertEqual(calls[0]["entry_type"], "Material Issue")
		self.assertIsNone(calls[0]["project"])
		self.assertNotIn("to_warehouse", calls[0]["rows"][0])

	def test_build_stock_entry_sets_both_warehouses_and_project(self):
		captured = {}

		class SE:
			def __init__(self, d):
				captured.update(d)
				self.flags = types.SimpleNamespace()

			def insert(self): pass
			def submit(self): pass

		rows = [{"item_code": "CEM-50", "item_name": "Cement", "qty": 10.0, "basic_rate": 0,
			"warehouse": "Central Store", "to_warehouse": "SB-001 Main Store"}]
		with mock.patch.object(frappe, "get_doc", SE):
			sl._build_stock_entry("Material Transfer", "2026-10-15", "Sava Builders", "r", rows,
				"Delivery Note", "DN-1", posting_time="12:00:00", project="SB-001")
		item = captured["items"][0]
		self.assertEqual((item["s_warehouse"], item["t_warehouse"]), ("Central Store", "SB-001 Main Store"))
		self.assertEqual(captured["project"], "SB-001")
		self.assertEqual(captured["stock_entry_type"], "Material Transfer")

	def test_build_stock_entry_issue_unchanged(self):
		captured = {}

		class SE:
			def __init__(self, d):
				captured.update(d)
				self.flags = types.SimpleNamespace()

			def insert(self): pass
			def submit(self): pass

		rows = [{"item_code": "CEM-50", "item_name": "Cement", "qty": 10.0, "basic_rate": 0, "warehouse": "W"}]
		with mock.patch.object(frappe, "get_doc", SE):
			sl._build_stock_entry("Material Issue", "2026-10-15", "Sava Builders", "r", rows, "Delivery Note", "DN-1",
				posting_time="12:00:00")
		self.assertNotIn("t_warehouse", captured["items"][0])
		self.assertNotIn("project", captured)


class ControllerTest(unittest.TestCase):
	"""DeliveryNote controller: reservation release is skipped for store issues."""

	def setUp(self):
		from psd_books.invoicing.doctype.delivery_note import delivery_note as dnm
		self.dnm = dnm
		self.calls = []
		for name, fn in (
			("update_issued_qty", lambda d, n: self.calls.append(("issued", n))),
			("set_posting_time", lambda d: None),
			("validate_fiscal_year", lambda *a, **k: None),
		):
			patcher = mock.patch.object(dnm, name, fn)
			patcher.start()
			self.addCleanup(patcher.stop)

	def _dn(self, **kw):
		d = self.dnm.DeliveryNote.__new__(self.dnm.DeliveryNote)  # skip Document.__init__ (needs a doctype)
		d.sales_order = None
		d.items = []
		d.customer = "C1"
		d.material_request = ""
		d.release = []
		d._adjust_so_delivered = lambda direction: None
		d._release_reserved_qty = lambda direction: d.release.append(direction)
		d.db_set = lambda *a, **k: None
		if STUBBED:  # the real Document already has get()
			d.get = lambda k, default=None: getattr(d, k, default)
		d.__dict__.update(kw)
		return d

	def test_store_issue_skips_reservation_and_updates_issued(self):
		d = self._dn(material_request=MRN)
		d.on_submit()
		d.on_cancel()
		self.assertEqual(d.release, [])
		self.assertEqual(self.calls, [("issued", 1), ("issued", -1)])

	def test_plain_note_still_releases_reservation(self):
		d = self._dn()
		d.on_submit()
		d.on_cancel()
		self.assertEqual(d.release, [-1, 1])

	def test_customer_required_without_mrn(self):
		d = self._dn(customer="", items=[Row(qty=1)], posting_date="2026-10-15", company="Sava Builders")
		with mock.patch.object(self.dnm, "validate_store_issue", lambda doc, lock=False: None):
			with self.assertRaises(Exception):
				d.validate()

	def test_validate_calls_store_checks_when_mrn(self):
		d = self._dn(customer="", material_request=MRN, items=[Row(qty=1)],
			posting_date="2026-10-15", company="Sava Builders")
		seen = []
		with mock.patch.object(self.dnm, "validate_store_issue", lambda doc, lock=False: seen.append(lock)):
			d.validate()
			d.before_submit()
		self.assertEqual(seen, [False, True])


if __name__ == "__main__":
	unittest.main()