export interface TenantAssignmentItem {
  id: string;
  moduleCode: string;
  moduleName: string;
  moduleKey: string;
  moduleType: "Core Module" | "Value-Added Module" | "Optional Module";
  category: string;
  lifecycle: "Live" | "Beta" | "Pilot" | "Planned";
  assignmentSource: "Platform Core" | "Tenant Direct" | "Sector Pack" | "Temporary Pilot" | "Ecosystem Direct";
  inheritedFrom: string;
  assignmentState: "Assigned" | "Inherited" | "Temporary" | "Restricted" | "Exception";
  inheritedScope: boolean;
  securityPosture: "Compliant" | "Pending" | "Non-Compliant";
  complianceStatus: "Compliant" | "Under Review" | "Non-Compliant";
  dependencyCoverage: "Covered" | "Partial" | "Uncovered";
  productionEligibility: "Eligible" | "Not Eligible" | "Pending Review";
  environmentState: "Production" | "Non-Prod" | "Sandbox";
  dataSensitivity: "High" | "Medium" | "Low";
  restrictions: string;
  assignmentsCount: string;
}

export interface ContextSelectorItem {
  id: string;
  label: string;
  value: string;
  options?: string[];
  tone?: "success" | "warning" | "info" | "neutral";
  hasBadge?: boolean;
}

export interface TopologyNode {
  id: string;
  label: string;
  sublabel: string;
  count: number;
}

export interface ConflictRow {
  module: string;
  parentAssignment: string;
  childAssignment: string;
  conflictType: string;
  severity: "High" | "Medium" | "Low";
}

export interface ChangeRequestRow {
  changeType: string;
  moduleCount: number;
  requestedBy: string;
  requestedOn: string;
  status: "Pending" | "Under Review" | "Approved";
}

export interface AssignmentActivityRow {
  activity: string;
  module: string;
  user: string;
  time: string;
}

export const TENANT_ASSIGNMENT_DATA = {
  headerInfo: {
    visibleTitle: "Tenant & Ecosystem Module Assignment",
    breadcrumb: "Enterprise Modules > Assignments",
    description: "Manage tenant module assignments, inheritance, production eligibility across tenant and ecosystem scopes.",
  },

  contextSelectors: [
    { id: "tenant", label: "Tenant", value: "SL Beauty", options: ["SL Beauty", "DermaCare SG", "Luxe Cosmetics IN"] },
    { id: "environment", label: "Environment", value: "SL-BTY-PROD", options: ["SL-BTY-PROD", "SL-BTY-STAGE", "SL-BTY-DEV"] },
    { id: "ecosystem", label: "Ecosystem", value: "Beauty Marketplace", options: ["Beauty Marketplace", "Retail B2B", "Spa & Wellness"] },
    { id: "inheritanceRoot", label: "Inheritance Root", value: "All Business Units", options: ["All Business Units", "Retail BU", "Digital Channels"] },
    { id: "sector", label: "Sector", value: "Sri Lanka", options: ["Sri Lanka", "India", "Singapore", "UAE"] },
    { id: "dataSensitivity", label: "Data Sensitivity", value: "Beauty & Wellness", options: ["Beauty & Wellness", "General", "High Risk"] },
    { id: "assignmentGovernance", label: "Assignment Governance", value: "Governed", tone: "success", hasBadge: true },
    { id: "dependencyEdge", label: "Dependency Edge", value: "Covered", tone: "success", hasBadge: true },
    { id: "securityPosture", label: "Security Posture", value: "Compliant", tone: "success", hasBadge: true },
    { id: "complianceStatus", label: "Compliance Status", value: "Compliant", tone: "success", hasBadge: true },
    { id: "tenantReadiness", label: "Tenant Readiness", value: "Ready", tone: "success", hasBadge: true },
    { id: "dataCompleteness", label: "Data Completeness", value: "99%", tone: "success" },
    { id: "lastEvaluated", label: "Last Evaluated", value: "May 14, 2025 10:15 AM" },
    { id: "assignedScope", label: "Access", value: "Assigned Scope", options: ["Assigned Scope", "Full Scope", "Restricted Scope"] },
  ] as ContextSelectorItem[],

  primaryKpis: [
    { id: "total-mods", label: "Total Modules", value: 16, icon: "package", color: "blue", subtext: "Ecosystem Total" },
    { id: "assigned", label: "Assigned", value: 13, icon: "check-circle", color: "green", subtext: "Active in Tenant" },
    { id: "inherited", label: "Inherited", value: 11, icon: "play", color: "green-light", subtext: "From Parent BU" },
    { id: "optional", label: "Optional", value: 7, icon: "anchor", color: "purple", subtext: "Value-Add Modules" },
    { id: "core", label: "Core", value: 6, icon: "user", color: "blue-light", subtext: "Mandatory Core" },
    { id: "pending", label: "Pending", value: 3, icon: "clock", color: "orange", subtext: "Requires Review" },
    { id: "restricted", label: "Restricted", value: 2, icon: "lock", color: "red", subtext: "Policy Locked" },
    { id: "prod-eligible", label: "Production Eligible", value: 10, icon: "shield-check", color: "green", subtext: "Cleared for Prod" },
    { id: "compliance-holds", label: "Compliance Holds", value: 4, icon: "alert-triangle", color: "orange", subtext: "Active Holds" },
  ],

  assignmentHealthKpi: {
    score: 96,
    maxScore: 100,
    label: "Excellent Alignment",
    subtext: "Across tenant and ecosystem scopes.",
  },

  filters: {
    context: ["All", "Tenant Direct", "Platform Core", "Sector Pack"],
    moduleType: ["All Types", "Core Module", "Value-Added Module", "Optional Module"],
    category: ["All Categories", "Order Management", "Inventory", "Marketing", "Payments"],
    assignmentSource: ["All Sources", "Platform Core", "Sector Pack", "Tenant Direct"],
    inheritedFrom: ["All Parents", "Beauty & Wellness", "Platform Core", "Tenant"],
    assignmentState: ["All States", "Assigned", "Inherited", "Temporary", "Restricted"],
    productionEligibility: ["All", "Eligible", "Not Eligible", "Pending Review"],
    environment: ["All", "Production", "Non-Prod", "Sandbox"],
    status: ["All", "Active", "Pending", "Locked"],
  },

  matrix: [
    {
      id: "asn-1",
      moduleCode: "MOD-1001",
      moduleName: "Order Orchestration",
      moduleKey: "order-orchestration",
      moduleType: "Core Module",
      category: "Order Management",
      lifecycle: "Live",
      assignmentSource: "Platform Core",
      inheritedFrom: "-",
      assignmentState: "Assigned",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Covered",
      productionEligibility: "Eligible",
      environmentState: "Production",
      dataSensitivity: "High",
      restrictions: "-",
      assignmentsCount: "3 Tenants",
    },
    {
      id: "asn-2",
      moduleCode: "MOD-1002",
      moduleName: "Inventory Visibility",
      moduleKey: "inventory-visibility",
      moduleType: "Core Module",
      category: "Inventory",
      lifecycle: "Live",
      assignmentSource: "Platform Core",
      inheritedFrom: "-",
      assignmentState: "Assigned",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Covered",
      productionEligibility: "Eligible",
      environmentState: "Production",
      dataSensitivity: "High",
      restrictions: "-",
      assignmentsCount: "3 Tenants",
    },
    {
      id: "asn-3",
      moduleCode: "MOD-1003",
      moduleName: "AI Beauty Advisor",
      moduleKey: "ai-beauty-advisor",
      moduleType: "Value-Added Module",
      category: "Customer Experience",
      lifecycle: "Live",
      assignmentSource: "Tenant Direct",
      inheritedFrom: "-",
      assignmentState: "Assigned",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Covered",
      productionEligibility: "Eligible",
      environmentState: "Production",
      dataSensitivity: "High",
      restrictions: "-",
      assignmentsCount: "1 Tenant",
    },
    {
      id: "asn-4",
      moduleCode: "MOD-1004",
      moduleName: "Promotions Engine",
      moduleKey: "promotions-engine",
      moduleType: "Core Module",
      category: "Marketing",
      lifecycle: "Live",
      assignmentSource: "Platform Core",
      inheritedFrom: "-",
      assignmentState: "Assigned",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Partial",
      productionEligibility: "Eligible",
      environmentState: "Production",
      dataSensitivity: "Medium",
      restrictions: "-",
      assignmentsCount: "3 Tenants",
    },
    {
      id: "asn-5",
      moduleCode: "MOD-1005",
      moduleName: "Customer Support",
      moduleKey: "customer-support",
      moduleType: "Core Module",
      category: "Service",
      lifecycle: "Live",
      assignmentSource: "Sector Pack",
      inheritedFrom: "Beauty & Wellness",
      assignmentState: "Inherited",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Covered",
      productionEligibility: "Eligible",
      environmentState: "Production",
      dataSensitivity: "Medium",
      restrictions: "-",
      assignmentsCount: "-",
    },
    {
      id: "asn-6",
      moduleCode: "MOD-1006",
      moduleName: "Loyalty Management",
      moduleKey: "loyalty-management",
      moduleType: "Value-Added Module",
      category: "Loyalty",
      lifecycle: "Beta",
      assignmentSource: "Tenant Direct",
      inheritedFrom: "-",
      assignmentState: "Assigned",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Covered",
      productionEligibility: "Not Eligible",
      environmentState: "Non-Prod",
      dataSensitivity: "Medium",
      restrictions: "-",
      assignmentsCount: "1 Tenant",
    },
    {
      id: "asn-7",
      moduleCode: "MOD-1007",
      moduleName: "Sustainability Tracker",
      moduleKey: "sustainability-tracker",
      moduleType: "Optional Module",
      category: "Sustainability",
      lifecycle: "Pilot",
      assignmentSource: "Temporary Pilot",
      inheritedFrom: "Tenant",
      assignmentState: "Temporary",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Partial",
      productionEligibility: "Not Eligible",
      environmentState: "Non-Prod",
      dataSensitivity: "Low",
      restrictions: "Time-Limited",
      assignmentsCount: "-",
    },
    {
      id: "asn-8",
      moduleCode: "MOD-1008",
      moduleName: "Payment Gateway",
      moduleKey: "payment-gateway",
      moduleType: "Core Module",
      category: "Payments",
      lifecycle: "Live",
      assignmentSource: "Platform Core",
      inheritedFrom: "-",
      assignmentState: "Assigned",
      inheritedScope: true,
      securityPosture: "Compliant",
      complianceStatus: "Compliant",
      dependencyCoverage: "Covered",
      productionEligibility: "Eligible",
      environmentState: "Production",
      dataSensitivity: "High",
      restrictions: "-",
      assignmentsCount: "3 Tenants",
    },
  ] as TenantAssignmentItem[],

  assignmentSourcesData: [
    { name: "Platform Core", value: 6, percentage: 46, color: "#4f46e5" },
    { name: "Sector Pack", value: 2, percentage: 15, color: "#2563eb" },
    { name: "Tenant Direct", value: 3, percentage: 23, color: "#d97706" },
    { name: "Ecosystem Direct", value: 1, percentage: 8, color: "#059669" },
    { name: "Temporary Pilot", value: 1, percentage: 8, color: "#a855f7" },
  ],

  assignmentStatusSummary: [
    { status: "Assigned", count: 13, bg: "bg-emerald-50 border-emerald-200 text-emerald-800" },
    { status: "Inherited", count: 3, bg: "bg-blue-50 border-blue-200 text-blue-800" },
    { status: "Temporary", count: 2, bg: "bg-purple-50 border-purple-200 text-purple-800" },
    { status: "Restricted", count: 2, bg: "bg-rose-50 border-rose-200 text-rose-800" },
    { status: "Exception", count: 1, bg: "bg-amber-50 border-amber-200 text-amber-800" },
  ],

  inheritanceTopology: [
    { id: "platform-core", label: "Platform Core", sublabel: "6 Modules", count: 6 },
    { id: "sector-pack", label: "Sector Pack", sublabel: "2 Modules", count: 2 },
    { id: "ecosystem", label: "Ecosystem", sublabel: "1 Module", count: 1 },
    { id: "tenant", label: "Tenant", sublabel: "3 Modules", count: 3 },
    { id: "temporary-pilot", label: "Temporary Pilot", sublabel: "1 Module", count: 1 },
  ] as TopologyNode[],

  inheritanceConflicts: [
    { module: "Customer Support", parentAssignment: "Beauty & Wellness", childAssignment: "Tenant", conflictType: "Scope Mismatch", severity: "High" },
    { module: "Loyalty Management", parentAssignment: "Platform Core", childAssignment: "Tenant", conflictType: "Eligibility Conflict", severity: "Medium" },
  ] as ConflictRow[],

  productionEligibilitySummary: [
    { name: "Eligible", value: 10, percentage: 77, color: "#059669" },
    { name: "Not Eligible", value: 2, percentage: 15, color: "#dc2626" },
    { name: "Pending Review", value: 1, percentage: 8, color: "#d97706" },
  ],

  governanceGates: [
    { label: "Dependency Validation", status: "Passed", tone: "success" },
    { label: "Security Review", status: "Passed", tone: "success" },
    { label: "Compliance Review", status: "Passed", tone: "success" },
    { label: "Data Quality Validation", status: "Passed", tone: "success" },
    { label: "Tenant Readiness", status: "Ready", tone: "success" },
  ],

  coreModuleCoverage: {
    assignedCount: 7,
    totalCount: 7,
    percentage: 100,
    modules: ["Order Management", "Inventory", "Customer Service", "Payments", "Marketing", "Logistics", "Analytics"],
  },

  optionalModulePortfolio: [
    { name: "AI Beauty Advisor", state: "Assigned", tone: "success" },
    { name: "Loyalty Management", state: "Assigned", tone: "success" },
    { name: "Sustainability Tracker", state: "Pilot", tone: "warning" },
    { name: "Advanced Analytics", state: "Not Assigned", tone: "neutral" },
    { name: "Marketplace Connect", state: "Not Assigned", tone: "neutral" },
    { name: "Returns Manager", state: "Not Assigned", tone: "neutral" },
    { name: "Omnichannel CRM", state: "Not Assigned", tone: "neutral" },
  ],

  sectorPackMapping: {
    packName: "Beauty & Wellness",
    inheritedRatio: "2 / 6 Modules Inherited",
    inherited: ["Customer Support", "Sustainability Tracker (Partial)"],
    notInherited: ["Compliance Toolkit", "Product Information", "Content Library", "Training Academy"],
  },

  countryConstraints: [
    { country: "Sri Lanka", allowed: 13, restricted: 0 },
    { country: "India", allowed: 12, restricted: 1 },
    { country: "Singapore", allowed: 11, restricted: 2 },
    { country: "UAE", allowed: 10, restricted: 2 },
    { country: "Malaysia", allowed: 12, restricted: 1 },
  ],

  environmentEnablementMatrix: [
    { environment: "Production", enabled: 10, progress: 77 },
    { environment: "Non-Production", enabled: 3, progress: 23 },
    { environment: "Sandbox", enabled: 2, progress: 15 },
    { environment: "Development", enabled: 5, progress: 38 },
    { environment: "Test", enabled: 6, progress: 46 },
  ],

  assignmentHolds: [
    { label: "Security Holds", count: 1, tone: "danger" },
    { label: "Compliance Holds", count: 1, tone: "warning" },
    { label: "Legal Holds", count: 0, tone: "neutral" },
    { label: "Data Holds", count: 0, tone: "neutral" },
  ],

  dependencyConstraints: [
    { label: "Blocked", count: 1, tone: "danger" },
    { label: "At Risk", count: 2, tone: "warning" },
    { label: "Warning", count: 1, tone: "warning" },
    { label: "Healthy", count: 9, tone: "success" },
  ],

  assignmentHealthMatrix: {
    healthScore: "96% Excellent",
    securityPosture: "Compliant 100%",
    complianceStatus: "Compliant 100%",
    dataQuality: "High 98%",
    tenantReadiness: "Ready 95%",
  },

  pendingAssignmentChanges: [
    { changeType: "Assignment", moduleCount: 2, requestedBy: "Priya Kumar", requestedOn: "May 14, 2025", status: "Pending" },
    { changeType: "Source Change", moduleCount: 1, requestedBy: "Arun Silva", requestedOn: "May 13, 2025", status: "Pending" },
    { changeType: "Removal Request", moduleCount: 1, requestedBy: "Nimal Perera", requestedOn: "May 12, 2025", status: "Under Review" },
  ] as ChangeRequestRow[],

  exceptionCenter: [
    { label: "Scope Violations", count: 1, tone: "danger" },
    { label: "Eligibility Exceptions", count: 1, tone: "warning" },
    { label: "Dependency Exceptions", count: 2, tone: "warning" },
    { label: "Configuration Exceptions", count: 0, tone: "neutral" },
  ],

  recentActivity: [
    { activity: "Assigned", module: "AI Beauty Advisor", user: "Priya Kumar", time: "10:12 AM" },
    { activity: "Inherited", module: "Customer Support", user: "System", time: "9:45 AM" },
    { activity: "Source Changed", module: "Customer Support", user: "Arun Silva", time: "Yesterday" },
    { activity: "Restricted", module: "Loyalty Management", user: "System", time: "May 13" },
    { activity: "Pilot Created", module: "Sustainability Tracker", user: "Nimal Perera", time: "May 12" },
  ] as AssignmentActivityRow[],

  tenantAlignmentSummary: [
    { label: "Assigned", count: 13 },
    { label: "Inherited", count: 3 },
    { label: "Temporary", count: 2 },
    { label: "Restricted", count: 2 },
    { label: "Exception", count: 1 },
    { label: "Total", count: 21 },
  ],

  governanceSummary: [
    { label: "Dependency Coverage", count: 9 },
    { label: "Security Posture", count: 9 },
    { label: "Compliance Status", count: 9 },
    { label: "Tenant Readiness", count: 9 },
    { label: "Data Completeness", count: 9 },
    { label: "Governance Violations", count: 1 },
  ],

  productionEligibilityRight: [
    { label: "Production Eligible", count: 10 },
    { label: "Not Eligible", count: 2 },
    { label: "Pending Review", count: 1 },
    { label: "Production Enabled", count: 10 },
    { label: "Non-Production", count: 11 },
  ],

  finalActions: [
    { label: "Create Module Assignment", primary: true, route: "/admin/ecosystem-modules/capabilities" },
    { label: "Review Pending Changes", primary: false },
    { label: "Review Restricted Modules", primary: false },
    { label: "Review Production Eligibility", primary: false },
    { label: "Review Security Holds", primary: false },
    { label: "Review Compliance Holds", primary: false },
    { label: "Review Dependency Blocks", primary: false },
    { label: "Compare Tenants", primary: false },
    { label: "View Sector Pack Mapping", primary: false },
    { label: "Export Assignment Matrix", primary: false },
    { label: "Open Assignment Audit", primary: false },
  ],
};
