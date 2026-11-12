// Vue router for the new bundle. Only routes the Vue bundle owns are listed
// here; everything else is handled by the legacy SPA via the cutover loader
// in books.html. New phases append routes to this table and to
// window.BOOKS_VUE_ROUTES.

import { createRouter, createWebHistory } from "vue-router";
const PhaseAHome = () => import("./pages/PhaseAHome.vue");
const Dashboard = () => import("./pages/Dashboard.vue");
const Customers = () => import("./pages/Customers.vue");
const CustomerProfile = () => import("./pages/CustomerProfile.vue");
const Vendors = () => import("./pages/Vendors.vue");
const SalesPersons = () => import("./pages/SalesPersons.vue");
const InventoryItems = () => import("./pages/InventoryItems.vue");
const InventoryItemView = () => import("./pages/InventoryItemView.vue");
const InventoryVariants = () => import("./pages/InventoryVariants.vue");
const InventoryItemGroups = () => import("./pages/InventoryItemGroups.vue");
const InventoryWarehouses = () => import("./pages/InventoryWarehouses.vue");
const InventoryBatches = () => import("./pages/InventoryBatches.vue");
const InventorySettings = () => import("./pages/InventorySettings.vue");
const Asset = () => import("./pages/Asset.vue");
const AssetDetails = () => import("./pages/AssetDetails.vue");
const AssetCategory = () => import("./pages/AssetCategory.vue");
const AssetDisposal = () => import("./pages/AssetDisposal.vue");
const AssetReports = () => import("./pages/AssetReports.vue");
const AssetMovement = () => import("./pages/AssetMovement.vue");
const AssetRepair = () => import("./pages/AssetRepair.vue");
const AssetValueAdjustment = () => import("./pages/AssetValueAdjustment.vue");
const AssetQuantityAdjustment = () => import("./pages/AssetQuantityAdjustment.vue");
const Department = () => import("./pages/Department.vue");
const Projects = () => import("./pages/Projects.vue");
const Employees = () => import("./pages/Employees.vue");
const DepreciationSchedule = () => import("./pages/DepreciationSchedule.vue");
const MaintenanceLog = () => import("./pages/MaintenanceLog.vue");
const OpeningStockBatchEntry = () => import("./pages/OpeningStockBatchEntry.vue");
const SettingsProfile = () => import("./pages/SettingsProfile.vue");
const SettingsCompany = () => import("./pages/SettingsCompany.vue");
const SettingsNumberSeries = () => import("./pages/SettingsNumberSeries.vue");
const SettingsPaymentTerms = () => import("./pages/SettingsPaymentTerms.vue");
const SettingsUsers = () => import("./pages/SettingsUsers.vue");
const SettingsEmail = () => import("./pages/SettingsEmail.vue");
const SettingsEmailTemplates = () => import("./pages/SettingsEmailTemplates.vue");
const SettingsRoles = () => import("./pages/SettingsRoles.vue");
const SettingsAuditLog = () => import("./pages/SettingsAuditLog.vue");
const SettingsOrganization = () => import("./pages/SettingsOrganization.vue");
const SettingsSecurity = () => import("./pages/SettingsSecurity.vue");
const SettingsIntegrations = () => import("./pages/SettingsIntegrations.vue");
const SettingsSSO = () => import("./pages/SettingsSSO.vue");
// import SettingsCurrencyExchange from "./pages/SettingsCurrencyExchange.vue"; // KES-only: hidden
const ChartOfAccounts = () => import("./pages/ChartOfAccounts.vue");
const JournalEntries = () => import("./pages/JournalEntries.vue");
const OpeningBalances = () => import("./pages/OpeningBalances.vue");
const CostCenters = () => import("./pages/CostCenters.vue");
const FiscalYears = () => import("./pages/FiscalYears.vue");
const Invoices = () => import("./pages/Invoices.vue");
const Quotes = () => import("./pages/Quotes.vue");
const SalesOrders = () => import("./pages/SalesOrders.vue");
const CreditNotes = () => import("./pages/CreditNotes.vue");
const Bills = () => import("./pages/Bills.vue");
const PurchaseOrders = () => import("./pages/PurchaseOrders.vue");
const Expenses = () => import("./pages/Expenses.vue");
const Payments = () => import("./pages/Payments.vue");
const DebitNotes = () => import("./pages/DebitNotes.vue");
const Recurring = () => import("./pages/Recurring.vue");
const EwayBills = () => import("./pages/EwayBills.vue");
const BankAccounts = () => import("./pages/BankAccounts.vue");
const BankTransactions = () => import("./pages/BankTransactions.vue");
const BankReconciliation = () => import("./pages/BankReconciliation.vue");
const BankTransfers = () => import("./pages/BankTransfers.vue");
const BankCheques = () => import("./pages/BankCheques.vue");
const BankCash = () => import("./pages/BankCash.vue");
const StockEntries = () => import("./pages/StockEntries.vue");
const InventoryAdjustments = () => import("./pages/InventoryAdjustments.vue");
const StockLedger = () => import("./pages/StockLedger.vue");
const StockValuation = () => import("./pages/StockValuation.vue");
const ReorderAlerts = () => import("./pages/ReorderAlerts.vue");
const GSTReturn1 = () => import("./pages/GSTReturn1.vue");
const GSTReturn3B = () => import("./pages/GSTReturn3B.vue");
const EInvoice = () => import("./pages/EInvoice.vue");
const TDS = () => import("./pages/TDS.vue");
const TaxTemplates = () => import("./pages/TaxTemplates.vue");
const ExpenseCategories = () => import("./pages/ExpenseCategories.vue");
const Reports = () => import("./pages/Reports.vue");
const PriceLists = () => import("./pages/PriceLists.vue");
const RecurringBills = () => import("./pages/RecurringBills.vue");
const BulkImport = () => import("./pages/BulkImport.vue");
const DeliveryChallans = () => import("./pages/DeliveryChallans.vue");
const ProformaInvoices = () => import("./pages/ProformaInvoices.vue");
const PurchaseReceipts = () => import("./pages/PurchaseReceipts.vue");
const RequestForQuotation = () => import("./pages/RequestForQuotation.vue");
const LandedCostVoucher = () => import("./pages/LandedCostVoucher.vue");
const QualityInspections = () => import("./pages/QualityInspections.vue");
const QCTemplates = () => import("./pages/QCTemplates.vue");
const QCApprovals = () => import("./pages/QCApprovals.vue");
const MaterialSubstitutions = () => import("./pages/MaterialSubstitutions.vue");
const BOM = () => import("./pages/BOM.vue");
const ManufacturingDashboard = () => import("./pages/ManufacturingDashboard.vue");
const Operation = () => import("./pages/Operation.vue");
const Workstation = () => import("./pages/Workstation.vue");
const WorkstationType = () => import("./pages/WorkstationType.vue");
const Routing = () => import("./pages/Routing.vue");
const JobCard = () => import("./pages/JobCard.vue");
const WorkOrder = () => import("./pages/WorkOrder.vue");
const ProductionPlan = () => import("./pages/ProductionPlan.vue");
const MaterialRequest = () => import("./pages/MaterialRequest.vue");
const PackingSlip = () => import("./pages/PackingSlip.vue");
const AlternativeItem = () => import("./pages/AlternativeItem.vue");
const ManufacturingSettings = () => import("./pages/ManufacturingSettings.vue");
const ManufacturingReports = () => import("./pages/ManufacturingReports.vue");

import { useToast } from "./composables/useToast.js";
import { usePermissions } from "./composables/usePermissions.js";
import { session } from "./api/session.js";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { module: null },
  },
  {
    path: "/books",
    redirect: "/dashboard",
  },
  {
    path: "/home",
    name: "home",
    component: PhaseAHome,
    meta: { module: null },
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
    meta: { module: "customers" },
  },
  {
    path: "/customers/:name",
    name: "customer-profile",
    component: CustomerProfile,
    meta: { module: "customers" },
  },
  {
    path: "/vendors",
    name: "vendors",
    component: Vendors,
    meta: { module: "customers" },  // Vendors share the customers module flag in Books Company Member
  },
  {
    path: "/sales-persons",
    name: "sales-persons",
    component: SalesPersons,
    meta: { module: "customers" },  // Sales Persons share the customers module flag in Books Company Member
  },
  {
    path: "/inventory/items",
    name: "inventory-items",
    component: InventoryItems,
    meta: { module: "inventory" },
  },
  {
    path: "/inventory/items/:itemCode",
    name: "item-view",
    component: InventoryItemView,
    meta: { module: "inventory" },
  },
  {
    path: "/inventory/variants/:template",
    name: "inventory-variants",
    component: InventoryVariants,
    meta: { module: "inventory" },
  },
  {
    path: "/inventory/item-groups",
    name: "inventory-item-groups",
    component: InventoryItemGroups,
    meta: { module: "inventory" },
  },
  {
    path: "/inventory/warehouses",
    name: "inventory-warehouses",
    component: InventoryWarehouses,
    meta: { module: "inventory" },
  },
  {
    path: "/inventory/settings",
    name: "inventory-settings",
    component: InventorySettings,
    meta: { module: "inventory" },
  },
  {
    path: "/assets",
    name: "assets-assets",
    component: Asset,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/:id",
    name: "asset-details",
    component: AssetDetails,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/asset-category",
    name: "assets-asset-category",
    component: AssetCategory,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/disposals",
    name: "assets-disposals",
    component: AssetDisposal,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/reports",
    name: "assets-reports",
    component: AssetReports,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/movements",
    name: "assets-movements",
    component: AssetMovement,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/repairs",
    name: "assets-repairs",
    component: AssetRepair,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/value-adjustments",
    name: "assets-value-adjustments",
    component: AssetValueAdjustment,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/quantity-adjustments",
    name: "assets-quantity-adjustments",
    component: AssetQuantityAdjustment,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/department",
    name: "assets-department",
    component: Department,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/depreciation-schedule",
    name: "assets-depreciation-schedule",
    component: DepreciationSchedule,
    meta: { module: "inventory" },
  },
  {
    path: "/assets/maintenance-log",
    name: "assets-maintenance-log",
    component: MaintenanceLog,
    meta: { module: "inventory" },
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
    meta: { module: "inventory" },
  },
  {
    path: "/employees",
    name: "employees",
    component: Employees,
    meta: { module: "admin" },
  },
  {
    path: "/settings/profile",
    name: "settings-profile",
    component: SettingsProfile,
    meta: { module: null },  // every user can edit their own profile
  },
  {
    path: "/settings/company",
    name: "settings-company",
    component: SettingsCompany,
    meta: { module: "admin" },
  },
  {
    path: "/settings/number-series",
    name: "settings-number-series",
    component: SettingsNumberSeries,
    meta: { module: "admin" },
  },
  {
    path: "/settings/payment-terms",
    name: "settings-payment-terms",
    component: SettingsPaymentTerms,
    meta: { module: "admin" },
  },
  {
    path: "/settings/users",
    name: "settings-users",
    component: SettingsUsers,
    meta: { module: "admin" },
  },
  {
    path: "/settings/email",
    name: "settings-email",
    component: SettingsEmail,
    meta: { module: "admin" },
  },
  {
    path: "/settings/email-templates",
    name: "settings-email-templates",
    component: SettingsEmailTemplates,
    meta: { module: "admin" },
  },
  { path: "/settings/roles",             name: "settings-roles",        component: SettingsRoles,         meta: { module: "admin" } },
  { path: "/settings/audit-log",         name: "settings-audit-log",    component: SettingsAuditLog,      meta: { module: "admin" } },
  { path: "/settings/organization",      name: "settings-organization", component: SettingsOrganization,  meta: { module: "admin" } },
  { path: "/settings/security",          name: "settings-security",     component: SettingsSecurity,      meta: { module: null    } },
  { path: "/settings/sso",              name: "settings-sso",          component: SettingsSSO,            meta: { module: "admin" } },
  { path: "/settings/integrations",      name: "settings-integrations", component: SettingsIntegrations,  meta: { module: "admin" } },
  // { path: "/settings/currency-exchange", name: "settings-currency", component: SettingsCurrencyExchange, meta: { module: "admin" } }, // KES-only: hidden
  { path: "/accounting/chart-of-accounts", name: "chart-of-accounts", component: ChartOfAccounts,  meta: { module: "accounts" } },
  { path: "/accounting/journal-entries",   name: "journal-entries",   component: JournalEntries,   meta: { module: "accounts" } },
  { path: "/accounting/opening-balances",  name: "opening-balances",  component: OpeningBalances,  meta: { module: "accounts" } },
  { path: "/accounting/cost-centers",      name: "cost-centers",      component: CostCenters,      meta: { module: "accounts" } },
  { path: "/accounting/fiscal-years",      name: "fiscal-years",      component: FiscalYears,      meta: { module: "accounts" } },
  { path: "/invoices",          name: "invoices",         component: Invoices,       meta: { module: "invoices" } },
  { path: "/quotes",            name: "quotes",           component: Quotes,         meta: { module: "invoices" } },
  { path: "/sales-orders",      name: "sales-orders",     component: SalesOrders,    meta: { module: "invoices" } },
  { path: "/credit-notes",      name: "credit-notes",     component: CreditNotes,    meta: { module: "invoices" } },
  { path: "/purchases",         name: "purchases",        component: Bills,          meta: { module: "bills"    } },
  { path: "/purchase-orders",   name: "purchase-orders",  component: PurchaseOrders, meta: { module: "bills", doctype: "Purchase Order" } },
  { path: "/expenses",          name: "expenses",         component: Expenses,       meta: { module: "bills"    } },
  { path: "/expenses/categories", name: "expense-categories", component: ExpenseCategories, meta: { module: "bills" } },
  { path: "/payments",          name: "payments",         component: Payments,       meta: { module: "payments" } },
  { path: "/payments-received", name: "payments-received",component: Payments,       meta: { module: "payments" } },
  { path: "/debit-notes",       name: "debit-notes",      component: DebitNotes,     meta: { module: "bills"    } },
  { path: "/recurring-bills",   name: "recurring-bills",  component: RecurringBills, meta: { module: "bills"    } },
  { path: "/recurring",         name: "recurring",        component: Recurring,      meta: { module: "invoices" } },
  { path: "/eway-bills",        name: "eway-bills",       component: EwayBills,      meta: { module: "invoices" } },
  { path: "/banking/accounts",       name: "banking-accounts",       component: BankAccounts,       meta: { module: "accounts" } },
  { path: "/banking/transactions",   name: "banking-transactions",   component: BankTransactions,   meta: { module: "accounts" } },
  { path: "/banking/reconciliation", name: "banking-reconciliation", component: BankReconciliation, meta: { module: "accounts" } },
  { path: "/banking/transfers",      name: "banking-transfers",      component: BankTransfers,      meta: { module: "accounts" } },
  { path: "/banking/cheques",        name: "banking-cheques",        component: BankCheques,        meta: { module: "accounts" } },
  { path: "/banking/cash",           name: "banking-cash",           component: BankCash,           meta: { module: "accounts" } },
  { path: "/inventory/stock-entries",  name: "stock-entries",   component: StockEntries,   meta: { module: "inventory" } },
  { path: "/inventory/opening-stock",  name: "opening-stock",   component: OpeningStockBatchEntry, meta: { module: "inventory" } },
  { path: "/inventory/adjustments",    name: "inventory-adjustments", component: InventoryAdjustments, meta: { module: "inventory" } },
  { path: "/inventory/stock-ledger",   name: "stock-ledger",    component: StockLedger,    meta: { module: "inventory" } },
  { path: "/inventory/valuation",      name: "stock-valuation", component: StockValuation, meta: { module: "inventory" } },
  { path: "/inventory/reorder-alerts", name: "reorder-alerts",  component: ReorderAlerts,  meta: { module: "inventory" } },
  { path: "/inventory/price-lists",    name: "price-lists",     component: PriceLists,     meta: { module: "inventory" } },
  { path: "/inventory/batches",        name: "inventory-batches", component: InventoryBatches, meta: { module: "inventory" } },
  { path: "/gst/gstr1",    name: "gstr1",    component: GSTReturn1,  meta: { module: "accounts" } },
  { path: "/gst/gstr3b",   name: "gstr3b",   component: GSTReturn3B, meta: { module: "accounts" } },
  { path: "/gst/einvoice", name: "einvoice", component: EInvoice,    meta: { module: "invoices" } },
  { path: "/gst/tds",      name: "tds",      component: TDS,         meta: { module: "accounts" } },
  { path: "/gst/tax-templates", name: "tax-templates", component: TaxTemplates, meta: { module: "taxes" } },
  { path: "/reports",      name: "reports",  component: Reports,     meta: { module: null       } },
  { path: "/bulk-import",        name: "bulk-import",       component: BulkImport,       meta: { module: "admin"    } },
  { path: "/delivery-challans",   name: "delivery-challans",   component: StockEntries,   meta: { module: "inventory" } },
  { path: "/proforma-invoices",   name: "proforma-invoices",   component: ProformaInvoices,   meta: { module: "invoices" } },
  { path: "/purchase-receipts",   name: "purchase-receipts",   component: PurchaseReceipts,   meta: { module: "inventory"} },
  { path: "/rfqs",               name: "rfqs",               component: RequestForQuotation, meta: { module: "bills"    } },
  { path: "/purchasing/landed-cost-vouchers",       name: "landed-cost-vouchers",       component: LandedCostVoucher, meta: { module: "bills" } },
  { path: "/purchasing/landed-cost-vouchers/:name", name: "landed-cost-vouchers-view",  component: LandedCostVoucher, meta: { module: "bills" } },
  // Quality
  { path: "/quality/inspections", name: "quality-inspections", component: QualityInspections, meta: { module: "inventory" } },
  { path: "/quality/templates",   name: "quality-templates",   component: QCTemplates,         meta: { module: "inventory" } },
  { path: "/quality/approvals",   name: "quality-approvals",   component: QCApprovals,         meta: { module: "inventory" } },
  // Manufacturing
  { path: "/manufacturing",                      name: "manufacturing-dashboard",         component: ManufacturingDashboard, meta: { module: "inventory" } },
  { path: "/manufacturing/bom",                 name: "manufacturing-bom",              component: BOM,             meta: { module: "inventory" } },
  { path: "/manufacturing/bom/:name",            name: "manufacturing-bom-view",          component: BOM,             meta: { module: "inventory" } },
  { path: "/manufacturing/operation",            name: "manufacturing-operation",         component: Operation,       meta: { module: "inventory" } },
  { path: "/manufacturing/operation/:name",      name: "manufacturing-operation-view",    component: Operation,       meta: { module: "inventory" } },
  { path: "/manufacturing/workstation",          name: "manufacturing-workstation",       component: Workstation,     meta: { module: "inventory" } },
  { path: "/manufacturing/workstation/:name",    name: "manufacturing-workstation-view",  component: Workstation,     meta: { module: "inventory" } },
  { path: "/manufacturing/workstation-type",       name: "manufacturing-workstation-type",      component: WorkstationType,     meta: { module: "inventory" } },
  { path: "/manufacturing/workstation-type/:name", name: "manufacturing-workstation-type-view", component: WorkstationType,     meta: { module: "inventory" } },
  { path: "/manufacturing/routing",               name: "manufacturing-routing",               component: Routing,             meta: { module: "inventory" } },
  { path: "/manufacturing/routing/:name",         name: "manufacturing-routing-view",          component: Routing,             meta: { module: "inventory" } },
  { path: "/manufacturing/job-card",              name: "manufacturing-job-card",              component: JobCard,             meta: { module: "inventory" } },
  { path: "/manufacturing/job-card/:name",        name: "manufacturing-job-card-view",         component: JobCard,             meta: { module: "inventory" } },
  { path: "/manufacturing/work-order",            name: "manufacturing-work-order",            component: WorkOrder,           meta: { module: "inventory" } },
  { path: "/manufacturing/work-order/:name",      name: "manufacturing-work-order-view",       component: WorkOrder,           meta: { module: "inventory" } },
  { path: "/manufacturing/production-plan",       name: "manufacturing-production-plan",       component: ProductionPlan,      meta: { module: "inventory" } },
  { path: "/manufacturing/production-plan/:name", name: "manufacturing-production-plan-view",  component: ProductionPlan,      meta: { module: "inventory" } },
  { path: "/manufacturing/material-request",       name: "manufacturing-material-request",       component: MaterialRequest,     meta: { module: "inventory", doctype: "Material Request" } },
  { path: "/manufacturing/material-request/:name", name: "manufacturing-material-request-view",  component: MaterialRequest,     meta: { module: "inventory", doctype: "Material Request" } },
  { path: "/manufacturing/packing-slip",           name: "manufacturing-packing-slip",           component: PackingSlip,         meta: { module: "inventory" } },
  { path: "/manufacturing/packing-slip/:name",     name: "manufacturing-packing-slip-view",      component: PackingSlip,         meta: { module: "inventory" } },
  { path: "/manufacturing/alternative-item",       name: "manufacturing-alternative-item",       component: AlternativeItem,       meta: { module: "inventory" } },
  { path: "/manufacturing/alternative-item/:name", name: "manufacturing-alternative-item-view",  component: AlternativeItem,       meta: { module: "inventory" } },
  { path: "/manufacturing/material-substitutions", name: "manufacturing-material-substitutions", component: MaterialSubstitutions, meta: { module: "inventory" } },
  { path: "/manufacturing/settings",               name: "manufacturing-settings",               component: ManufacturingSettings, meta: { module: "inventory" } },
  { path: "/manufacturing/reports",               name: "manufacturing-reports",                component: ManufacturingReports,  meta: { module: "inventory" } },
  // Future phases append entries here.
  // Any unknown / wrong URL falls through to the dashboard instead of a 404.
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Hidden for Sava: pages already removed from the sidebar (see layout/nav.js).
// Direct URLs to these send the user to the dashboard, like an unknown URL.
// Matching is by path prefix, minus the exceptions below.
const HIDDEN_PREFIXES = [
  "/assets",
  "/manufacturing",
  "/gst/gstr1",
  "/gst/gstr3b",
  "/gst/einvoice",
  "/gst/tds",
  "/settings/sso",
  "/settings/integrations",
  "/settings/roles",
];
// Still visible in the sidebar, so they must stay reachable.
const HIDDEN_EXCEPTIONS = [
  "/manufacturing/material-request",
];
const _pathUnder = (path, prefix) => path === prefix || path.startsWith(prefix + "/");
export function isHiddenPath(path) {
  if (HIDDEN_EXCEPTIONS.some((p) => _pathUnder(path, p))) return false;
  return HIDDEN_PREFIXES.some((p) => _pathUnder(path, p));
}

router.beforeEach((to) => {
  // Auth: bootstrapSession() either populated session.ready or redirected.
  if (!session.ready) return false;

  if (isHiddenPath(to.path)) return { path: "/dashboard" };

  const { can, flags } = usePermissions();
  const docRead = to.meta?.doctype && !!flags.value.doc_access?.[to.meta.doctype]?.read;
  if (to.meta?.module && !can(to.meta.module) && !docRead) {
    useToast().error(`You don't have access to "${to.name || to.path}".`);
    return { path: "/dashboard" };
  }
  return true;
});

export default router;