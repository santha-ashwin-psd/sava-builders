"""Plain-python check of patch v1_28 on an in-memory SQLite database (frappe stubbed). No bench.
Run: python3 -m unittest psd_books.patches.v1_28.test_backfill_grn_rate   (NOT covered: MariaDB itself, a live migrate)"""
import importlib.util, os, sqlite3, sys, types, unittest

HERE = os.path.dirname(os.path.abspath(__file__))


def load(db):
    f = types.ModuleType("frappe")
    class DB:
        def sql(self, q, p=(), as_dict=False):
            cur = db.execute(q.replace("%s", "?").replace("`", ""), p)
            if as_dict:
                cols = [c[0] for c in cur.description]
                return [types.SimpleNamespace(**dict(zip(cols, r))) for r in cur.fetchall()]
            return cur.fetchall()
        def get_value(self, dt, name, field):
            r = db.execute(f"select {field} from {dt.replace(' ', '_')} where name=?", (name,)).fetchone()
            return r[0] if r else None
        def set_value(self, dt, name, vals, update_modified=True):
            assert update_modified is False
            for k, v in vals.items():
                db.execute(f"update {dt.replace(' ', '_')} set {k}=? where name=?", (v, name))
        def commit(self): pass
    f.db = DB()
    u = types.ModuleType("frappe.utils"); u.flt = lambda v: float(v or 0)
    sys.modules["frappe"], sys.modules["frappe.utils"] = f, u
    spec = importlib.util.spec_from_file_location("p", os.path.join(HERE, "backfill_grn_rate.py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m


class T(unittest.TestCase):
    def setUp(self):
        d = self.db = sqlite3.connect(":memory:")
        # the patch's SQL uses backticked table names with spaces; map them to underscores for SQLite
        orig = d.execute
        class Conn:
            def execute(s, q, p=()): return orig(q.replace("tabPurchase Receipt Item", "Purchase_Receipt_Item")
                .replace("tabPurchase Receipt", "Purchase_Receipt").replace("tabPurchase Order Item", "Purchase_Order_Item"), p)
        self.conn = Conn()
        d.execute("create table Purchase_Receipt(name, purchase_order)")
        d.execute("create table Purchase_Receipt_Item(name, parent, qty, item_code, po_item, rate, amount)")
        d.execute("create table Purchase_Order_Item(name, parent, item_code, rate, idx)")
        d.executemany("insert into Purchase_Order_Item values(?,?,?,?,?)", [
            ("POI1", "PO1", "GLOVE", 200, 1), ("POI2", "PO1", "WIRE", 150, 2), ("POI3", "PO1", "ZERO", 0, 3)])
        d.executemany("insert into Purchase_Receipt values(?,?)", [("PR1", "PO1"), ("PR2", None)])
        d.executemany("insert into Purchase_Receipt_Item values(?,?,?,?,?,?,?)", [
            ("A", "PR1", 6, "GLOVE", "POI1", 0, 0),      # via po_item
            ("B", "PR1", 2, "WIRE", None, 0, 0),         # via item code
            ("C", "PR1", 3, "GLOVE", "POI1", 99, 297),   # already has a rate: untouched
            ("D", "PR1", 1, "ZERO", "POI3", 0, 0),       # PO rate is 0: untouched
            ("E", "PR2", 4, "GLOVE", None, 0, 0)])       # no PO: untouched
        self.mod = load(self.conn)

    def test_backfill(self):
        self.mod.execute()
        get = lambda n: self.db.execute("select rate, amount from Purchase_Receipt_Item where name=?", (n,)).fetchone()
        self.assertEqual(get("A"), (200, 1200)); self.assertEqual(get("B"), (150, 300))
        self.assertEqual(get("C"), (99, 297)); self.assertEqual(get("D"), (0, 0)); self.assertEqual(get("E"), (0, 0))

    def test_rerun_is_safe(self):
        self.mod.execute(); self.mod.execute()
        self.assertEqual(self.db.execute("select rate from Purchase_Receipt_Item where name='A'").fetchone()[0], 200)


if __name__ == "__main__":
    unittest.main()