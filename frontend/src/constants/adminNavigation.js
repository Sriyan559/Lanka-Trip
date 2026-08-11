import { BarChart3, BookOpen, LayoutDashboard, LayoutGrid, LifeBuoy, Megaphone, Settings, ShieldCheck, Store, Tags, Truck, Users, Wallet } from "lucide-react";

export const ADMIN_NAVIGATION = [
  {id:"dashboard",label:"Dashboard",href:"/admin/dashboard",icon:LayoutDashboard,exact:true},
  {id:"marketplace",label:"Marketplace",href:"/admin/marketplace",icon:Store,children:[
    {id:"command-center",label:"Command Center",href:"/admin/marketplace",exact:true},
    {id:"listings",label:"Listings",href:"/admin/marketplace/listings"},
    {id:"sellers",label:"Sellers",href:"/admin/marketplace/sellers"},
    {id:"promotions",label:"Promotions",href:"/admin/marketplace/promotions"},
    {id:"policy-violations",label:"Policy Violations",href:"/admin/marketplace/policy-violations"},
    {id:"commissions",label:"Commissions",href:"/admin/marketplace/commissions"},
    {id:"orders",label:"Order Management",href:"/admin/marketplace/orders"},
    {id:"manual-order-creation",label:"Manual Order Creation",href:"/admin/marketplace/orders/create",exact:true},
    {id:"cancellation-management",label:"Cancellation Management",href:"/admin/marketplace/orders/cancellations",exact:true},
    {id:"returns",label:"Returns & Disputes",href:"/admin/marketplace/returns"},
    {id:"marketplace-settings",label:"Marketplace Configuration",href:"/admin/marketplace/settings"},
    {id:"sales-channels",label:"Sales Channels",href:"/admin/marketplace/channels"},
  ]},
  {id:"catalogue",label:"Catalogue",href:"/admin/catalogue",icon:BookOpen,children:[
    {id:"command-center",label:"Command Center",href:"/admin/catalogue",exact:true},
    {id:"product-masters",label:"Product Masters",href:"/admin/catalogue/products"},
    {id:"product-approvals",label:"Product Approvals",href:"/admin/catalogue/approvals"},
    {id:"inventory",label:"Inventory & Expiry",href:"/admin/catalogue/inventory"},
    {id:"categories",label:"Categories",href:"/admin/catalogue/categories"},
    {id:"brands",label:"Brands",href:"/admin/catalogue/brands"},
    {id:"attributes",label:"Attributes & Variants",href:"/admin/catalogue/attributes"},
    {id:"media",label:"Media Assets",href:"/admin/catalogue/media"},
    {id:"import-export",label:"Import & Export",href:"/admin/catalogue/import-export"},
    {id:"quality",label:"Catalogue Quality",href:"/admin/catalogue/quality"},
  ]},
  {id:"brands-suppliers",label:"Brands & Suppliers",href:"/admin/brands-suppliers",icon:Tags,children:[
    {id:"command-center",label:"Command Center",href:"/admin/brands-suppliers",exact:true},
    {id:"suppliers",label:"Suppliers",href:"/admin/brands-suppliers/suppliers"},
    {id:"supplier-onboarding",label:"Supplier Onboarding",href:"/admin/brands-suppliers/suppliers/create"},
    {id:"supplier-verification",label:"Supplier Verification",href:"/admin/brands-suppliers/verification"},
    {id:"brand-authorizations",label:"Brand Authorizations",href:"/admin/brands-suppliers/authorizations"},
    {id:"contracts-agreements",label:"Contracts & Agreements",href:"/admin/brands-suppliers/contracts"},
    {id:"catalogue-coverage",label:"Product & Catalogue Coverage",href:"/admin/brands-suppliers/catalogue-coverage"},
    {id:"performance-sla",label:"Performance & SLA",href:"/admin/brands-suppliers/performance"},
    {id:"risk-compliance",label:"Risk & Compliance",href:"/admin/brands-suppliers/risk-compliance"},
    {id:"users-access",label:"Supplier Users & Access",href:"/admin/brands-suppliers/users-access"},
    {id:"import-export-audit",label:"Import, Export & Audit",href:"/admin/brands-suppliers/import-export-audit"},
  ]},
  {id:"verification",label:"Verification & Compliance",href:"/admin/verification-compliance",icon:ShieldCheck,children:[
    {id:"command-center",label:"Command Center",href:"/admin/verification-compliance",exact:true},
    {id:"supplier-verification",label:"Supplier Verification",href:"/admin/verification-compliance/supplier-verification"},
    {id:"brand-authorizations",label:"Brand Authorizations",href:"/admin/verification-compliance/brand-authorizations"},
    {id:"compliance-cases",label:"Compliance Cases",href:"/admin/verification-compliance/cases"},
    {id:"document-verification",label:"Document Verification",href:"/admin/verification-compliance/documents"},
    {id:"product-safety",label:"Product Safety & Regulatory",href:"/admin/verification-compliance/product-safety"},
    {id:"authenticity-investigations",label:"Authenticity Investigations",href:"/admin/verification-compliance/authenticity"},
    {id:"recalls",label:"Recalls & Safety Incidents",href:"/admin/verification-compliance/recalls"},
    {id:"governance",label:"Rules & Policies",href:"/admin/verification-compliance/governance"},
    {id:"sla-escalations",label:"SLA & Escalations",href:"/admin/verification-compliance/governance"},
    {id:"reports",label:"Reports & Analytics",href:"/admin/verification-compliance/reports"},
    {id:"import-export-audit",label:"Import, Export & Audit",href:"/admin/verification-compliance/import-export-audit"},
  ]},
  {id:"customers",label:"Customers",href:"/admin/customers",icon:Users,children:[
    {id:"command-center",label:"Command Center",href:"/admin/customers",exact:true},
    {id:"customer-directory",label:"Customer Directory",href:"/admin/customers/directory"},
    {id:"customer-segments",label:"Customer Segments",href:"/admin/customers/segments"},
    {id:"identity-verification",label:"Identity & Verification",href:"/admin/customers/verification"},
    {id:"addresses-contacts",label:"Addresses & Contacts",href:"/admin/customers/addresses-contacts"},
    {id:"orders-purchase-history",label:"Orders & Purchase History",href:"/admin/customers/orders"},
    {id:"returns-disputes",label:"Returns, Refunds & Disputes",href:"/admin/customers/returns-refunds-disputes"},
    {id:"loyalty-membership",label:"Loyalty, Rewards & Membership",href:"/admin/customers/loyalty"},
    {id:"consent-privacy",label:"Consent, Privacy & Preferences",href:"/admin/customers/consent-privacy"},
    {id:"risk-restrictions",label:"Risk, Restrictions & Fraud Signals",href:"/admin/customers/risk-restrictions"},
    {id:"support-communications",label:"Support & Communications",href:"/admin/customers/support-communications"},
    {id:"import-export-audit",label:"Import, Export & Audit",href:"/admin/customers/import-export-audit"},
  ]},
  {id:"marketing",label:"Marketing",href:"/admin/marketing",icon:Megaphone,children:[
    {id:"command-center",label:"Command Center",href:"/admin/marketing",exact:true},
    {id:"campaigns",label:"Campaigns",href:"/admin/marketing/campaigns"},
    {id:"audiences",label:"Audiences",href:"/admin/marketing/audiences"},
    {id:"journeys",label:"Journeys",href:"/admin/marketing/journeys"},
    {id:"content",label:"Content & Creative",href:"/admin/marketing/content"},
    {id:"channels",label:"Channels",href:"/admin/marketing/channels"},
    {id:"web-app-campaigns",label:"Web & App Campaigns",href:"/admin/marketing/web-app-campaigns"},
    {id:"paid-media",label:"Paid Media",href:"/admin/marketing/paid-media"},
    {id:"budgets",label:"Budgets",href:"/admin/marketing/budgets"},
    {id:"attribution-analytics",label:"Attribution & Analytics",href:"/admin/marketing/attribution-analytics"},
    {id:"governance",label:"Governance",href:"/admin/marketing/governance"},
    {id:"reports-audit",label:"Reports / Audit",href:"/admin/marketing/reports-audit"},
  ]},
  {id:"finance",label:"Finance",icon:Wallet,href:"/admin/finance",children:[
    {id:"command-center",label:"Command Center",href:"/admin/finance",exact:true},
    {id:"revenue-receivables",label:"Revenue & Receivables",href:"/admin/finance/revenue-receivables"},
    {id:"payments-transactions",label:"Payments & Transactions",href:"/admin/finance/payments"},
    {id:"refunds-compensation",label:"Refunds & Compensation",href:"/admin/finance/refunds-compensation"},
    {id:"supplier-payables",label:"Supplier Payables",href:"/admin/finance/supplier-payables"},
    {id:"commissions-fees",label:"Commissions & Fees",href:"/admin/finance/commissions-fees"},
    {id:"settlements-payouts",label:"Settlements & Payouts",href:"/admin/finance/settlements-payouts"},
    {id:"invoices-notes",label:"Invoices & Notes",href:"/admin/finance/invoices-notes"},
    {id:"tax-currency",label:"Tax & Currency",href:"/admin/finance/tax-currency-configuration"},
    {id:"reconciliation-controls",label:"Reconciliation & Controls",href:"/admin/finance/reconciliation-controls"},
    {id:"reports-audit",label:"Reports / Import / Export / Audit",href:"/admin/finance/reports-import-export-audit"},
  ]},
  {id:"logistics",label:"Logistics",icon:Truck,href:"/admin/logistics",children:[
    {id:"logistics-command-center",label:"Command Center",href:"/admin/logistics",exact:true},
    {id:"fulfilment-orders",label:"Fulfilment Orders",href:"/admin/logistics/fulfilment-orders"},
    {id:"warehouses-fulfilment-centres",label:"Warehouses & Fulfilment Centres",href:"/admin/logistics/warehouses"},
    {id:"inventory-allocation",label:"Inventory Allocation",href:"/admin/logistics/inventory-allocation"},
    {id:"shipments-tracking",label:"Shipments & Tracking",href:"/admin/logistics/shipments"},
    {id:"shipment-detail-carrier-tracking",label:"Shipment Detail & Carrier Tracking",href:"/admin/logistics/shipments/SHP-LK-00192"},
    {id:"carriers-delivery-partners",label:"Carriers & Delivery Partners",href:"/admin/logistics/carriers-delivery-partners"},
    {id:"delivery-configuration",label:"Delivery Configuration",href:"/admin/logistics/delivery-configuration"},
    {id:"returns-reverse-logistics",label:"Returns & Reverse Logistics",href:"/admin/logistics/returns-reverse-logistics"},
    {id:"returns-reverse-logistics-details",label:"Return/Reverse Logistics Details",href:"/admin/logistics/reverse-logistics/RET-2026-004281"},
    {id:"exceptions-reconciliation",label:"Exceptions, Claims & Reconciliation",href:"/admin/logistics/exceptions-reconciliation"},
    {id:"reports-import-export-audit",label:"Reports, Import, Export & Audit",href:"/admin/logistics/reports-import-export-audit"},
  ]},
  {id:"customer-support",label:"Customer Support",icon:LifeBuoy,href:"/admin/customer-support/cases"},
  {id:"analytics",label:"Analytics",icon:BarChart3,href:"/admin/analytics",children:[
    {id:"analytics-overview",label:"Analytics & BI",href:"/admin/analytics",exact:true},
    {id:"analytics-reports",label:"Reports",href:"/admin/analytics/reports"},
  ]},
  {id:"ecosystem-modules",label:"Ecosystem Modules",icon:LayoutGrid,href:"/admin/ecosystem-modules"},
  {id:"administration",label:"Administration",icon:Settings,disabled:true,badge:"Coming Soon"},
];

export const navigationItemMatchesPath = (item, pathname) => {
  if (!item?.href || item.disabled) return false;
  if (item.exact) return pathname === item.href;
  if (item.id === "carriers-delivery-partners" && (pathname === "/admin/logistics/carriers" || pathname.startsWith("/admin/logistics/carriers/"))) {
    return true;
  }
  if (item.id === "shipment-detail-carrier-tracking" && pathname.startsWith("/admin/logistics/shipments/") && pathname !== "/admin/logistics/shipments") {
    return true;
  }
  if (item.id === "shipments-tracking" && pathname === "/admin/logistics/shipments") {
    return true;
  }
  if (item.id === "returns-reverse-logistics-details" && pathname.startsWith("/admin/logistics/reverse-logistics/") && pathname !== "/admin/logistics/reverse-logistics") {
    return true;
  }
  if (item.id === "returns-reverse-logistics" && (pathname === "/admin/logistics/returns-reverse-logistics" || pathname === "/admin/logistics/reverse-logistics")) {
    return true;
  }
  if (item.id === "exceptions-reconciliation" && (pathname === "/admin/logistics/exceptions-reconciliation" || pathname === "/admin/logistics/exceptions" || pathname === "/admin/logistics/claims-reconciliation")) {
    return true;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
};

export const getActiveAdminNavigation = (pathname) =>
  ADMIN_NAVIGATION.find((item) =>
    navigationItemMatchesPath(item, pathname) ||
    item.children?.some((child) => navigationItemMatchesPath(child, pathname)),
  ) ?? null;

export const getActiveChildHref = (item, pathname) =>
  item?.children
    ?.filter((child) => navigationItemMatchesPath(child, pathname))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;
