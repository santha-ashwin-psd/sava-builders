import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt


class BOM(Document):
    def validate(self):
        self.bom_type = self.bom_type or "Manufacturing"

        if self.bom_type == "Packing":
            self.validate_packing_bom()
        elif self.bom_type == "Sub-Assembly":
            self.validate_sub_assembly_bom()
        else:
            self.validate_manufacturing_bom()

        self.validate_scrap_items()
        self.validate_description_length()
        self._calc_costs()

        # Carry the version number forward on amendment so it reads 2, 3, 4...
        # instead of resetting to 1 (amended_from is only set on the copy Frappe
        # creates when you amend a cancelled BOM).
        if self.amended_from and not self.is_new():
            pass  # version already set by set_version_on_amend at insert time

    def validate_description_length(self):
        # Hard cap of 500 chars on Description (mirrors the textarea's
        # maxlength in the UI, More Information tab). Enforced here too
        # since the client-side maxlength can be bypassed via a direct API
        # call, and so that a legacy record saved before this cap existed
        # self-heals the next time it's saved rather than getting stuck
        # unable to save at all. This description is also what gets copied
        # onto the Work Order when it is submitted, so keeping it bounded
        # here keeps that copy bounded too.
        if self.description and len(self.description) > 500:
            self.description = self.description[:500]

    def validate_manufacturing_bom(self):
        if not self.items or len(self.items) == 0:
            frappe.throw(_("BOM must have at least one Raw Material row before it can be saved."))

    def validate_sub_assembly_bom(self):
        """Sub-Assembly BOMs follow the same rules as Manufacturing BOMs — they
        just produce an intermediate item consumed by a parent BOM."""
        if not self.items or len(self.items) == 0:
            frappe.throw(_("Sub-Assembly BOM must have at least one Raw Material row."))
        # Guard against self-referencing sub-assembly rows
        for row in self.items:
            if row.sub_assembly_bom == self.name:
                frappe.throw(_("Row for {0}: Sub-Assembly BOM cannot reference itself.").format(row.item_code))

    def validate_packing_bom(self):
        if not self.bulk_item:
            frappe.throw(_("Packing BOM requires a Bulk Item to consume from."))
        if not self.bulk_qty_per_unit or self.bulk_qty_per_unit <= 0:
            frappe.throw(_("Packing BOM requires a positive Bulk Qty Consumed per Packed Unit."))
        if self.bulk_item == self.item:
            frappe.throw(_("Bulk Item cannot be the same as the Production Item being packed."))
        if not self.packing_items or len(self.packing_items) == 0:
            frappe.throw(_("Packing BOM must have at least one Packing Material row before it can be saved."))
        # Packing BOMs don't consume raw materials or run operations directly —
        # those belong to the Manufacturing BOM that produced the bulk item.
        if self.items:
            frappe.throw(_("Packing BOM should not have Raw Materials rows. Use the Packing Materials table instead."))
        if self.operations:
            frappe.throw(_("Packing BOM should not have Operations. Operations belong to the Manufacturing BOM."))

    def validate_scrap_items(self):
        """Phase 1a: BOM Scrap Item rows are either recoverable scrap/by-product
        (needs an Item Code, may carry a Rate) or process loss (material that
        never becomes stock -- evaporation, trimming, spillage -- so it has no
        item and no recovery value).

        Rather than teach _calc_costs() a new branch, a process-loss row's
        Rate is forced to 0 here, before _calc_costs() runs -- amount = qty *
        rate then naturally comes out to 0 and the existing scrap_value
        summation already excludes it with no change to that loop. The
        qty itself is left untouched; feeding it into process_loss_qty at
        Work Order completion time is a later phase, not a BOM-level concern.
        """
        for row in (self.scrap_items or []):
            if row.is_process_loss:
                row.rate = 0
            elif not row.item_code:
                frappe.throw(_(
                    "Row #{0} in Scrap Items: Item Code is required unless "
                    "the row is marked as Process Loss."
                ).format(row.idx))

    def _calc_costs(self):
        """Recompute all cost roll-up fields from child rows.
        Called on every save so the stored values are always in sync with the
        actual rows — no stale figures even if rows were edited via API."""

        # Raw material / packing material cost
        source_items = self.packing_items if self.bom_type == "Packing" else (self.items or [])
        rm = 0.0
        for r in source_items:
            # "Set Rate of Sub-Assembly from BOM" (toggle on the BOM, defaulted
            # from Manufacturing Settings when the BOM is created): for a row
            # linked to a Sub-Assembly BOM, derive its rate from that BOM's
            # actual per-unit cost instead of leaving it as a manually-typed
            # (and easily stale) standard rate.
            if self.set_rate_of_sub_assembly_from_bom and getattr(r, "sub_assembly_bom", None):
                sub_cost, sub_qty = frappe.db.get_value(
                    "BOM", r.sub_assembly_bom, ["total_cost", "quantity"]
                ) or (None, None)
                if sub_cost is not None and flt(sub_qty):
                    r.rate = flt(flt(sub_cost) / flt(sub_qty), 4)
            r.amount = round(flt(r.qty) * flt(r.rate), 2)
            rm += r.amount

        # Packing BOMs also consume the bulk item itself (bulk_qty_per_unit
        # per packed unit, for this BOM's own batch quantity) but it lives
        # outside packing_items with no rate field of its own until now --
        # without this, a Packing BOM's Total Cost silently omitted the bulk
        # item's value entirely, which for something like bottling a liquid
        # is usually the majority of the real cost.
        if self.bom_type == "Packing" and self.bulk_item and flt(self.bulk_qty_per_unit) > 0:
            rm += flt(self.bulk_qty_per_unit) * flt(self.quantity or 1) * flt(self.bulk_rate)

        # Operation cost  (time_in_mins / 60 * hour_rate)
        op = 0.0
        for r in (self.operations or []):
            r.cost = round(flt(r.time_in_mins) / 60.0 * flt(r.hour_rate), 2)
            op += r.cost

        # Scrap / by-product value
        scrap = 0.0
        for r in (self.scrap_items or []):
            r.amount = round(flt(r.qty) * flt(r.rate), 2)
            scrap += r.amount

        self.rm_cost = round(rm, 2)
        self.op_cost = round(op, 2)
        self.scrap_value = round(scrap, 2)
        self.total_cost = round(rm + op - scrap, 2)

    def before_insert(self):
        # Stamp the user's company for multi-tenant isolation if not yet set.
        if not self.company:
            from zoho_books_clone.utils.tenancy import get_user_company, _is_bypass
            company = get_user_company(frappe.session.user)
            if not company and _is_bypass(frappe.session.user):
                company = (
                    frappe.db.get_single_value("Books Settings", "default_company")
                    or frappe.db.get_value("Company", {}, "name")
                )
            if company:
                self.company = company

        if self.amended_from:
            prev_version = frappe.db.get_value("BOM", self.amended_from, "bom_version") or 1
            self.bom_version = int(prev_version) + 1
            # A new revision starts as the active one; the row it amends should
            # not keep competing as "default" once superseded.
            self.is_active = 1
            # frappe.copy_doc() (used by api.docs.amend_doc for "+ New Version")
            # carries every child row over verbatim, including Raw Material
            # rows whose Sub-Assembly BOM points at a BOM that has, in the
            # meantime, been cancelled to create its own new version. Frappe's
            # link validation then blocks inserting this document with
            # "Cannot link cancelled document". Re-point those rows at the
            # sub-assembly's current revision instead of making the user
            # track it down and fix it by hand.
            self._relink_stale_sub_assembly_boms()

    def _relink_stale_sub_assembly_boms(self):
        for row in (self.items or []):
            sub = getattr(row, "sub_assembly_bom", None)
            if not sub:
                continue
            docstatus = frappe.db.get_value("BOM", sub, "docstatus")
            if docstatus != 2:
                continue  # still a valid (draft or submitted) link, leave it alone
            replacement = self._find_latest_non_cancelled_version(sub)
            if replacement and replacement != sub:
                row.sub_assembly_bom = replacement

    def _find_latest_non_cancelled_version(self, bom_name):
        """Follow the amended_from -> name chain forward from a cancelled BOM
        to the newest revision that isn't itself cancelled (e.g. dhbgs v1 ->
        v2 -> v3 -> v4, where v4 is the current Active one). Falls back to
        whatever BOM is currently marked default/active for that item if the
        chain doesn't lead anywhere usable (e.g. the sub-assembly was
        cancelled outright with no replacement version ever created)."""
        seen = set()
        current = bom_name
        latest_valid = None
        item = None
        while current and current not in seen:
            seen.add(current)
            row = frappe.db.get_value("BOM", current, ["docstatus", "item"], as_dict=True)
            if not row:
                break
            item = row.get("item") or item
            if row.get("docstatus") != 2:
                latest_valid = current
            current = frappe.db.get_value("BOM", {"amended_from": current}, "name")

        if latest_valid:
            return latest_valid

        if item:
            return frappe.db.get_value(
                "BOM",
                {"item": item, "docstatus": 1, "is_active": 1, "is_default": 1},
                "name",
            )
        return None

    def on_submit(self):
        # Only one submitted, active BOM should be flagged default per item —
        # supersede any earlier default BOM for the same production item.
        if self.is_default:
            frappe.db.sql(
                """UPDATE `tabBOM` SET is_default = 0
                   WHERE item = %s AND bom_type = %s AND company = %s
                   AND name != %s AND docstatus = 1""",
                (self.item, self.bom_type, self.company, self.name),
            )
        # The BOM this one amends is no longer the active revision.
        if self.amended_from:
            frappe.db.set_value("BOM", self.amended_from, "is_active", 0)

    def before_cancel(self):
        # Frappe's generic check_if_doc_is_linked() runs right after this
        # hook and blocks cancel on ANY submitted (docstatus=1) linked Work
        # Order — including ones whose status is "Completed", since
        # completing a document never changes its docstatus back down.
        # That made "+ New Version" (which cancels the old BOM under the
        # hood) permanently impossible once a WO on that BOM finished,
        # even though a finished WO is historically correct and shouldn't
        # block revising the recipe for future production.
        #
        # Do our own smarter check here, then tell Frappe to skip its
        # blind docstatus-only check.
        self._block_if_active_work_order()
        self.flags.ignore_links = True

    def _block_if_active_work_order(self):
        linked = frappe.get_all(
            "Work Order",
            filters={
                "bom": self.name,
                "docstatus": 1,
                "status": ["not in", ["Completed", "Cancelled"]],
            },
            limit=1,
        )
        if linked:
            frappe.throw(_(
                "Cannot cancel: submitted Work Order {0} still uses this BOM. "
                "Cancel/complete that Work Order first if this was cancelled in error."
            ).format(linked[0].name))

    def on_cancel(self):
        self.is_active = 0
        self.db_set("is_active", 0)