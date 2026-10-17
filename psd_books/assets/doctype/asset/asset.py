import frappe
from frappe import _
from frappe.utils import flt, cint
from frappe.model.document import Document

from psd_books.assets.asset_gl import (
    post_asset_capitalization,
    reverse_asset_capitalization,
    validate_capitalization_setup,
)
from psd_books.assets.depreciation_engine import build_schedule

class Asset(Document):

    def validate(self):
        if not (self.asset_name or "").strip():
            frappe.throw(_("Asset Name is required."))
        if not self.asset_category:
            frappe.throw(_("Asset Category is required."))
        if not self.qty:
            self.qty = 1
        if self.purchase_invoice and not self.is_existing_asset:
            # Guards the server side of the same rule the Asset drawer
            # enforces by disabling the toggle (see AssetDetails.vue). An
            # asset auto-created from a Purchase Bill (assets/asset_link.py)
            # is always is_existing_asset=1 because that bill's own GL
            # posting already capitalized its cost -- letting this flip to 0
            # (whether via the UI, a direct API call, or a bulk update)
            # would make post_asset_capitalization() post that same cost a
            # second time on submit. This can't be relaxed per-asset; if the
            # bill linkage is wrong, fix/unlink purchase_invoice instead.
            frappe.throw(
                _(
                    "This asset was auto-created from Purchase Bill {0}, whose own "
                    "posting already capitalized this cost. It must stay marked as "
                    "an Existing Asset to avoid capitalizing it a second time."
                ).format(frappe.bold(self.purchase_invoice))
            )
        self.calculate_totals()
        self.generate_depreciation_schedule()
        self.validate_units()
        if self.docstatus == 1:
            # Only enforce full capitalization setup (Fixed Asset Account,
            # GST Input Account if needed, Credit Account) at submit time.
            # validate() also runs on every plain Draft save -- Frappe sets
            # docstatus=1 before calling validate() during doc.submit(), so
            # this still fires before on_submit()/post_asset_capitalization,
            # just no longer blocks saving an incomplete Draft.
            validate_capitalization_setup(self)

    def calculate_totals(self):
        """Mirrors PurchaseInvoice.calculate_totals(): tax lines are
        calculated on taxable_value, then split by is_itc_eligible —
        eligible tax is claimable input credit (not part of the asset's
        book value); non-eligible tax is a blocked credit that gets
        folded into the capitalized Purchase Cost instead. Existing
        assets (is_existing_asset) and assets with no tax lines behave
        exactly as before this field was added.
        """
        if self.is_existing_asset:
            # Legacy/opening assets: purchase_cost is whatever was typed
            # in directly, matching pre-tax-schema behaviour. Don't
            # overwrite it or force taxable_value/tax bookkeeping on
            # something that isn't being capitalized through this doctype.
            self.purchase_cost = flt(self.purchase_cost)
            self.taxable_value = 0
            self.total_tax = 0
            self.grand_total = self.purchase_cost
            self.taxes = []
            if self.docstatus == 1 and self.purchase_cost <= 0:
                frappe.throw(_("Purchase Cost must be greater than zero."))
            return

        self.taxable_value = flt(self.taxable_value)
        if not self.taxable_value and self.purchase_cost and not (self.taxes or []):
            # Backward compatibility: a record saved before this field
            # existed (or one where the user is still typing straight
            # into Purchase Cost with no tax lines) is treated as
            # taxable_value == purchase_cost, tax = 0.
            self.taxable_value = flt(self.purchase_cost)

        eligible_tax = 0.0
        non_eligible_tax = 0.0
        for row in (self.taxes or []):
            if flt(row.rate) < 0:
                frappe.throw(_("Tax rate cannot be negative (row: {0}).").format(row.tax_type or row.idx))
            row.amount = round(self.taxable_value * flt(row.rate) / 100, 2)
            if row.is_itc_eligible:
                eligible_tax += row.amount
            else:
                non_eligible_tax += row.amount

        self.total_tax = round(eligible_tax + non_eligible_tax, 2)
        self.purchase_cost = round(self.taxable_value + non_eligible_tax, 2)
        self.grand_total = round(self.taxable_value + self.total_tax, 2)

        if self.purchase_cost <= 0 and not self.is_existing_asset and self.purchase_invoice and self.docstatus == 1:
            frappe.throw(_("Taxable Value must be greater than zero."))

    def validate_units(self):
        """Per-unit tracking (e.g. one row per physical laptop when Qty=5).
        Rows are optional -- an asset can be tracked at the qty level only,
        with no unit rows at all -- but if any are entered, they're capped
        at Qty and each Unit/Serial No must be unique, both within this
        asset and across every other Asset in the system (a serial number
        that already exists elsewhere is almost always a data-entry mistake,
        not a real duplicate unit)."""
        rows = self.units or []
        if not rows:
            return

        if len(rows) > flt(self.qty):
            frappe.throw(
                _("This Asset has Qty {0}, but {1} Unit rows were entered. "
                  "Remove the extra row(s) or increase Qty first.").format(
                    cint(self.qty), len(rows)
                )
            )

        seen = {}
        for row in rows:
            unit_no = (row.unit_no or "").strip()
            if not unit_no:
                frappe.throw(_("Row {0}: Unit / Serial No is required.").format(row.idx))
            if unit_no in seen:
                frappe.throw(
                    _("Row {0}: Unit / Serial No {1} is already used in row {2} of this "
                      "Asset.").format(row.idx, frappe.bold(unit_no), seen[unit_no])
                )
            seen[unit_no] = row.idx

            clash = frappe.db.sql(
                """
                SELECT parent FROM `tabAsset Unit`
                WHERE unit_no = %s AND parent != %s
                LIMIT 1
                """,
                (unit_no, self.name or ""),
            )
            if clash:
                frappe.throw(
                    _("Row {0}: Unit / Serial No {1} already exists on Asset {2}.").format(
                        row.idx, frappe.bold(unit_no), frappe.bold(clash[0][0])
                    )
                )

    def on_submit(self):
        # Nothing set this before -- the old free-text status dropdown was
        # the only thing that ever touched it. Depreciation posting later
        # moves this on to Partially/Fully Depreciated, and Asset Disposal
        # moves it to Scrapped/Sold; this is just the initial value.
        self.status = "Submitted"
        post_asset_capitalization(self)

    def on_cancel(self):
        reverse_asset_capitalization(self)
        self.db_set("status", "Cancelled", update_modified=False)

    def generate_depreciation_schedule(self):
        # Regenerating a schedule after any period has already been posted
        # would silently discard the posted GL history recorded on those
        # rows (see depreciation_posting.py). Once a schedule has live
        # postings, further edits to the asset's depreciation inputs
        # (method/frequency/life/salvage) must not blow that away here.
        if any(
            row.status == "Completed" for row in (self.depreciation_schedule or [])
        ):
            return

        self.depreciation_schedule = []

        rows = build_schedule(self)
        for row in rows:
            self.append("depreciation_schedule", row)

        # Not conditional on `rows`: build_schedule() returns [] whenever the
        # asset has no useful_life set (a non-depreciating asset is valid --
        # it just never gets a schedule), and current_value still needs to
        # start at purchase_cost either way. The guard above already bailed
        # out before this point if a period has actually been posted, so
        # it's always safe here to (re)initialize to purchase_cost --
        # *except* when current_value has already been explicitly set to
        # something else (Current Value is now a directly-editable field
        # while the asset is Draft -- see AssetDetails.vue -- most useful
        # for a manually-created tracking-only asset that has no
        # purchase_cost at all). Only fall back to purchase_cost when
        # current_value is still at its untouched default of 0/None, so a
        # deliberate manual entry survives every subsequent save.
        #
        # A tracking-only asset (no purchase_invoice, not is_existing_asset)
        # may now also carry an optional Purchase Cost as a plain memo field
        # (see AssetDetails.vue) -- deliberately NOT capitalized and NOT
        # meant to seed Current Value, since it isn't a real acquisition
        # cost in the books. Only a purchase_cost backed by an actual
        # Purchase Bill, or a declared Existing Asset's opening cost, should
        # auto-seed Current Value here.
        if not self.current_value and (self.purchase_invoice or self.is_existing_asset):
            self.current_value = self.purchase_cost