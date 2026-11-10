"""Plain-python tests for amend_purchase_receipt and amend_stock_entry (api/docs.py). No bench, no database.

The two functions are cut out of docs.py and run against a fake frappe, so only their rules are
tested: cancelled only, one amendment per document, receipts refused, copy reset to Draft, QC links cleared.
Run: python3 -m unittest psd_books.invoicing.test_amend_grn_dn  (or: python3 -m unittest test_amend_grn_dn here)
NOT covered: real insert/submit of the amended document, permissions on a live site, the Vue screens.
"""
import ast
import os
import sys
import types
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(HERE, "..", "api", "docs.py")


class Throw(Exception):
	pass


class Doc:
	def __init__(self, **kw):
		self.__dict__.update(kw)
		self.flags = types.SimpleNamespace()
		self.inserted = False
		self.items = kw.get("items", [])

	def get(self, k, d=None):
		return getattr(self, k, d)

	def insert(self, ignore_permissions=False):
		self.inserted = True

	def as_dict(self):
		return {"name": self.name}


class Row:
	def __init__(self, qi):
		self.quality_inspection = qi


def _load():
	tree = ast.parse(open(DOCS, encoding="utf-8").read())
	want = ("amend_purchase_receipt", "amend_stock_entry")
	nodes = []
	for n in tree.body:
		if isinstance(n, ast.FunctionDef) and n.name in want:
			n.decorator_list = []
			nodes.append(n)
	assert len(nodes) == 2, "functions not found in docs.py"
	state = types.SimpleNamespace(docs={}, existing={}, user="u@x.com", calls=[], director=True)
	frappe = types.SimpleNamespace()
	frappe.session = types.SimpleNamespace(user="u@x.com")
	frappe.PermissionError = PermissionError
	def throw(msg, exc=None):
		raise Throw(msg)
	frappe.throw = throw
	frappe.get_doc = lambda dt, name: state.docs[(dt, name)]
	frappe.db = types.SimpleNamespace(
		get_value=lambda dt, flt, fld: state.existing.get((dt, flt["amended_from"])),
		commit=lambda: None)
	def copy_doc(src):
		d = Doc(name="NEW", **{k: v for k, v in src.__dict__.items() if k not in ("name", "flags", "inserted")})
		d.items = [Row(r.quality_inspection) for r in src.items]
		return d
	frappe.copy_doc = copy_doc
	acc = types.ModuleType("psd_books.utils.access")
	acc.require_module = lambda *a, **k: state.calls.append(("module", a, k))
	acc.assert_can = lambda *a, **k: state.calls.append(("can", a))
	def assert_can_amend(doctype, *a, **k):
		state.calls.append(("amend", doctype))
		if not state.director:
			raise PermissionError("Only the Director or a Books Admin can amend")
	acc.assert_can_amend = assert_can_amend
	for name in ("psd_books", "psd_books.utils"):
		sys.modules.setdefault(name, types.ModuleType(name))
	sys.modules["psd_books.utils.access"] = acc
	ns = {"frappe": frappe}
	exec(compile(ast.Module(body=nodes, type_ignores=[]), DOCS, "exec"), ns)
	return ns, state, frappe


NS, ST, FR = _load()


class Grn(unittest.TestCase):
	def setUp(self):
		ST.docs.clear(); ST.existing.clear(); ST.calls.clear(); FR.session.user = "u@x.com"; ST.director = True
		ST.docs[("Purchase Receipt", "39")] = Doc(name="39", docstatus=2, status="Cancelled",
			items=[Row("QCI-1"), Row(None)])

	def test_creates_draft_copy(self):
		r = NS["amend_purchase_receipt"]("39")
		self.assertEqual(r["name"], "NEW")

	def test_copy_fields(self):
		captured = {}
		orig = FR.copy_doc
		def spy(src):
			d = orig(src); captured["d"] = d; return d
		FR.copy_doc = spy
		try:
			NS["amend_purchase_receipt"]("39")
		finally:
			FR.copy_doc = orig
		d = captured["d"]
		self.assertEqual((d.amended_from, d.docstatus, d.status, d.inserted), ("39", 0, "Draft", True))
		self.assertTrue(d.flags.ignore_permissions)
		self.assertEqual([r.quality_inspection for r in d.items], [None, None])
		self.assertEqual(ST.docs[("Purchase Receipt", "39")].items[0].quality_inspection, "QCI-1")  # original untouched

	def test_only_cancelled(self):
		for ds in (0, 1):
			ST.docs[("Purchase Receipt", "39")].docstatus = ds
			with self.assertRaises(Throw):
				NS["amend_purchase_receipt"]("39")

	def test_second_amend_refused(self):
		ST.existing[("Purchase Receipt", "39")] = "40"
		with self.assertRaises(Throw) as c:
			NS["amend_purchase_receipt"]("39")
		self.assertIn("already been amended as 40", str(c.exception))

	def test_guest_and_permission_checks(self):
		NS["amend_purchase_receipt"]("39")
		self.assertIn(("can", ("Purchase Receipt", "create")), ST.calls)
		self.assertEqual(ST.calls[0][1], ("inventory",)); self.assertTrue(ST.calls[0][2]["write"])
		FR.session.user = "Guest"
		with self.assertRaises(Throw):
			NS["amend_purchase_receipt"]("39")


class DirectorOnly(unittest.TestCase):
	def setUp(self):
		ST.docs.clear(); ST.existing.clear(); ST.calls.clear(); ST.director = False
		ST.docs[("Purchase Receipt", "39")] = Doc(name="39", docstatus=2, status="Cancelled", items=[])
		ST.docs[("Stock Entry", "40")] = Doc(name="40", docstatus=2, stock_entry_type="Material Transfer",
			reference_doctype=None, reference_name=None, items=[])

	def tearDown(self):
		ST.director = True

	def test_non_director_refused_before_anything_is_read(self):
		with self.assertRaises(PermissionError):
			NS["amend_purchase_receipt"]("39")
		with self.assertRaises(PermissionError):
			NS["amend_stock_entry"]("40")

	def test_director_allowed(self):
		ST.director = True
		self.assertEqual(NS["amend_purchase_receipt"]("39")["name"], "NEW")
		self.assertIn(("amend", "Purchase Receipt"), ST.calls)


class Dn(unittest.TestCase):
	def setUp(self):
		ST.docs.clear(); ST.existing.clear(); ST.calls.clear(); FR.session.user = "u@x.com"; ST.director = True

	def _se(self, typ="Material Transfer", ref=None, ds=2):
		ST.docs[("Stock Entry", "40")] = Doc(name="40", docstatus=ds, stock_entry_type=typ,
			reference_doctype=ref, reference_name="39" if ref else None, items=[])

	def test_transfer_and_issue_can_be_amended(self):
		for typ in ("Material Transfer", "Material Issue"):
			self._se(typ)
			self.assertEqual(NS["amend_stock_entry"]("40")["name"], "NEW")
		self.assertIn(("can", ("Stock Entry", "create")), ST.calls)

	def test_receipt_refused_with_grn_hint(self):
		self._se("Material Receipt", "Purchase Receipt")
		with self.assertRaises(Throw) as c:
			NS["amend_stock_entry"]("40")
		self.assertIn("Amend the GRN", str(c.exception)); self.assertIn("39", str(c.exception))

	def test_purchase_linked_entry_refused_whatever_the_type(self):
		self._se("Material Transfer", "Purchase Invoice")
		with self.assertRaises(Throw):
			NS["amend_stock_entry"]("40")

	def test_only_cancelled_and_once(self):
		self._se(ds=1)
		with self.assertRaises(Throw):
			NS["amend_stock_entry"]("40")
		self._se(); ST.existing[("Stock Entry", "40")] = "41"
		with self.assertRaises(Throw) as c:
			NS["amend_stock_entry"]("40")
		self.assertIn("already been amended as 41", str(c.exception))


if __name__ == "__main__":
	unittest.main()