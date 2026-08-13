export interface CapabilityAssignmentItem {
  id: string;
  moduleCode: string;
  moduleName: string;
  moduleKey: string;
  moduleType: "Core Module" | "Value-Added Module" | "Optional Module";
  category: string;
  lifecycle: "Live" | "Beta" | "Pilot" | "Planned";
  assignmentSource: "Platform Core" | "Tenant Direct" | "Sector Pack" | "Temporary Pilot" | "Ecosystem Group";
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

export const CAPABILITY_ASSIGNMENT_DATA = {
  headerInfo: {
    visibleTitle: "Business Unit & Channel Capability Assignment",
    breadcrumb: "Enterprise Modules > Capabilities",
    description: "Govern capability availability across business units and channels, manage inherited access and controlled overrides, and ensure capability enablement remains within tenant, module, security, compliance and dependency constraints.",
  },

  contextSelectors: [
    { id: "tenant", label: "Tenant", value: "SL Beauty", options: ["SL Beauty", "DermaCare SG", "Luxe Cosmetics IN"] },
    { id: "environment", label: "Environment", value: "SL-BTY-PROD", options: ["SL-BTY-PROD", "SL-BTY-STAGE", "SL-BTY-DEV"] },
    { id: "inheritance", label: "Inheritance", value: "Beauty Marketplace", options: ["Beauty Marketplace", "Retail B2B", "Spa & Wellness"] },
    { id: "inheritanceRoot", label: "Inheritance Root", value: "All Business Units", options: ["All Business Units", "Retail BU", "Digital Channels"] },
    { id: "region", label: "Region", value: "Sri Lanka / Beauty & Wellness", options: ["Sri Lanka / Beauty & Wellness", "India", "Singapore", "UAE"] },
    { id: "dataSensitivity", label: "Data Sensitivity", value: "Beauty & Wellness", options: ["Beauty & Wellness", "General", "High Risk"] },
    { id: "assignmentGovernance", label: "Assignment Governance", value: "Governed", tone: "success", hasBadge: true },
    { id: "dependencyEdge", label: "Dependency Edge", value: "Covered", tone: "success", hasBadge: true },
    { id: "securityPosture", label: "Security Posture", value: "Compliant", tone: "success", hasBadge: true },
    { id: "complianceStatus", label: "Compliance Status", value: "Compliant", tone: "success", hasBadge: true },
    { id: "tenantReadiness", label: "Tenant Readiness", value: "Ready", tone: "success", hasBadge: true },
    { id: "lastEvaluated", label: "Last Evaluated", value: "May 14, 2026 10:15 AM" },
    { id: "access", label: "Access", value: "Assigned Scope", options: ["Assigned Scope", "Partial Scope", "Restricted Scope"] },
  ] as ContextSelectorItem[],

  primaryKpis: [
    { id: "total-mods", label: "Total Modules", value: 16, icon: "package", subtext: "" },
    { id: "assigned", label: "Assigned", value: 13, icon: "check-circle", subtext: "" },
    { id: "inherited", label: "Inherited", value: 11, icon: "play", subtext: "" },
    { id: "optional", label: "Optional", value: 7, icon: "anchor", subtext: "" },
    { id: "core", label: "Core", value: 6, icon: "user", subtext: "" },
    { id: "pending", label: "Pending", value: 3, icon: "clock", subtext: "" },
    { id: "restricted", label: "Restricted", value: 2, icon: "lock", subtext: "" },
    { id: "prod-eligible", label: "Production Eligible", value: 10, icon: "shield-check", subtext: "" },
    { id: "compliance-holds", label: "Compliance Holds", value: 4, icon: "alert-triangle", subtext: "" },
  ],

  secondaryKpis: [
    { id: "business-units", label: "Business Units", value: 84, icon: "building", subtext: "" },
    { id: "active-channels", label: "Active Channels", value: 8, icon: "radio", subtext: "" },
    { id: "core-capabilities", label: "Core Capabilities", value: 32, icon: "settings", subtext: "" },
    { id: "optional-capabilities", label: "Optional Capabilities", value: 52, icon: "sliders", subtext: "" },
    { id: "security-restrictions", label: "Security Restrictions", value: 2, icon: "shield-alert", subtext: "" },
    { id: "compliance-restrictions", label: "Compliance Restrictions", value: 2, icon: "shield-warning", subtext: "" },
    { id: "dependency-blocks", label: "Dependency Blocks", value: 3, icon: "link", subtext: "" },
    { id: "country-restrictions", label: "Country Restrictions", value: 2, icon: "globe", subtext: "" },
  ],

  assignmentHealthKpi: {
    score: 95,
    maxScore: 100,
    label: "Excellent Alignment",
    subtext: "",
  },

  filters: {
    module: ["All Modules", "Order Orchestration", "Inventory Visibility", "AI Beauty Advisor", "Promotions Engine"],
    capability: ["All Capabilities", "Order Management", "Inventory", "Support", "Loyalty"],
    capabilityType: ["All Types", "Core Capability", "Optional Capability"],
    businessUnit: ["All Business Units", "Retail BU", "Spa BU", "Online Channel"],
    channel: ["All Channels", "Web Store", "Mobile App", "POS Terminal", "Call Center"],
    assignmentSource: ["All Sources", "Platform Core", "Sector Pack", "Tenant Direct"],
    assignmentType: ["All Types", "Direct", "Inherited", "Temporary", "Override"],
    status: ["All Statuses", "Enabled", "Disabled", "Restricted", "Pending Approval"],
    environment: ["All Environments", "Production", "Non-Prod", "Sandbox"],
    country: ["All Countries", "Sri Lanka", "India", "Singapore", "UAE"],
    security: ["All Security", "Compliant", "Restricted"],
    compliance: ["All Compliance", "Compliant", "Under Review"],
    productionEligibility: ["All Eligibility", "Eligible", "Not Eligible", "Pending Review"],
    risk: ["All Risk", "Low", "Medium", "High"],
    owner: ["All Owners", "Priya Kumar", "Arun Silva", "Nimal Perera"],
  },

  quickFilters: [
    "Core Capability", "Optional", "Inherited", "Direct", "Enabled", "Disabled",
    "Restricted", "Pending Approval", "Production Eligible", "Security Restricted",
    "Compliance Restricted", "Dependency Blocked", "Channel Restricted",
    "Country Restricted", "Override Requested", "Needs Review"
  ],

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
      assignmentsCount: "84 BUs",
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
      assignmentsCount: "84 BUs",
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
      assignmentsCount: "12 Channels",
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
      assignmentsCount: "84 BUs",
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
      assignmentsCount: "4 BUs",
    },
  ] as CapabilityAssignmentItem[],

  assignmentSourcesData: [
    { name: "Platform Core", value: 4, percentage: 66.7, color: "#4f46e5" },
    { name: "Sector Pack", value: 1, percentage: 16.7, color: "#2563eb" },
    { name: "Tenant Direct", value: 1, percentage: 16.7, color: "#d97706" },
    { name: "Temporary Pilot", value: 1, percentage: 16.7, color: "#a855f7" },
  ],

  assignmentStatusSummary: [
    { status: "Assigned", count: 13, bg: "bg-emerald-50 border-emerald-200 text-emerald-800" },
    { status: "Inherited", count: 11, bg: "bg-blue-50 border-blue-200 text-blue-800" },
    { status: "Temporary", count: 2, bg: "bg-purple-50 border-purple-200 text-purple-800" },
    { status: "Restricted", count: 2, bg: "bg-rose-50 border-rose-200 text-rose-800" },
    { status: "Exception", count: 1, bg: "bg-amber-50 border-amber-200 text-amber-800" },
  ],

  inheritanceTopology: [
    { id: "platform-core", label: "Platform Core", sublabel: "4 Modules", count: 4 },
    { id: "sector-pack", label: "Sector Pack", sublabel: "1 Module", count: 1 },
    { id: "ecosystem", label: "Ecosystem", sublabel: "8 Modules", count: 8 },
    { id: "tenant", label: "Tenant", sublabel: "2 Modules", count: 2 },
    { id: "temporary-pilot", label: "Temporary Pilot", sublabel: "1 Module", count: 1 },
  ] as TopologyNode[],

  inheritanceConflicts: [
    { module: "Customer Support", parentAssignment: "Beauty & Wellness", childAssignment: "Tenant", conflictType: "Scope Mismatch", severity: "High" },
    { module: "Loyalty Management", parentAssignment: "Platform Core", childAssignment: "Tenant", conflictType: "Eligibility Conflict", severity: "Medium" },
  ] as ConflictRow[],

  productionEligibilitySummary: [
    { name: "Production Eligible", value: 10, percentage: 62.5, color: "#059669" },
    { name: "Not Eligible", value: 2, percentage: 12.5, color: "#dc2626" },
    { name: "Pending Review", value: 3, percentage: 18.8, color: "#d97706" },
    { name: "Non-Production", value: 7, percentage: 43.8, color: "#9333ea" },
  ],

  governanceGates: [
    { label: "Dependency Validation", status: "Passed", tone: "success" },
    { label: "Security Review", status: "Passed", tone: "success" },
    { label: "Compliance Review", status: "Passed", tone: "success" },
    { label: "Data Quality Validation", status: "Passed", tone: "success" },
    { label: "Tenant Readiness", status: "Ready", tone: "success" },
  ],

  coreModuleCoverage: {
    assignedCount: 5,
    totalCount: 6,
    percentage: 83,
    modules: ["Order Management", "Inventory", "Customer Service", "Payments", "Marketing", "Logistics"],
  },

  optionalModulePortfolio: [
    { name: "AI Beauty Advisor", state: "Controlled (Pilot)", tone: "success" },
    { name: "Sustainability Tracker", state: "Pilot", tone: "warning" },
    { name: "Loyalty Management", state: "Beta", tone: "info" },
    { name: "Advanced Analytics", state: "Not Assigned", tone: "neutral" },
    { name: "Marketplace Connect", state: "Not Assigned", tone: "neutral" },
    { name: "Return Manager", state: "Not Assigned", tone: "neutral" },
    { name: "Omnichannel CRM", state: "Not Assigned", tone: "neutral" },
  ],

  countryConstraints: [
    { country: "Sri Lanka", allowed: 13, restricted: 0, coverage: "100%" },
    { country: "India", allowed: 12, restricted: 1, coverage: "92%" },
    { country: "Singapore", allowed: 11, restricted: 2, coverage: "85%" },
    { country: "UAE", allowed: 10, restricted: 2, coverage: "82%" },
    { country: "Malaysia", allowed: 12, restricted: 1, coverage: "92%" },
  ],

  environmentEnablementMatrix: [
    { environment: "Production", enabled: "10 / 16", progress: 63 },
    { environment: "Non-Production", enabled: "7 / 16", progress: 44 },
    { environment: "Sandbox", enabled: "5 / 16", progress: 31 },
    { environment: "Development", enabled: "6 / 16", progress: 38 },
    { environment: "Test", enabled: "7 / 16", progress: 44 },
  ],

  assignmentHolds: [
    { label: "Security Holds", count: 1, tone: "danger" },
    { label: "Compliance Holds", count: 1, tone: "warning" },
    { label: "Legal Holds", count: 1, tone: "success" },
    { label: "Data Holds", count: 0, tone: "neutral" },
  ],

  dependencyConstraints: [
    { label: "Blocked", count: 1, tone: "danger" },
    { label: "At Risk", count: 2, tone: "warning" },
    { label: "Warning", count: 1, tone: "warning" },
    { label: "Healthy", count: 9, tone: "success" },
  ],

  assignmentHealthMatrix: {
    healthScore: "95% Excellent",
    securityPosture: "Compliant 100%",
    complianceStatus: "Compliant 100%",
    dataQuality: "High 98%",
    tenantReadiness: "Ready 95%",
  },

  pendingAssignmentChanges: [
    { changeType: "Assignment", moduleCount: 2, requestedBy: "Priya Kumar", requestedOn: "May 14, 2026", status: "Pending" },
    { changeType: "Source Change", moduleCount: 1, requestedBy: "Arun Silva", requestedOn: "May 13, 2026", status: "Pending" },
    { changeType: "Removal Request", moduleCount: 1, requestedBy: "Nimal Perera", requestedOn: "May 12, 2026", status: "Under Review" },
  ] as ChangeRequestRow[],

  exceptionCenter: [
    { label: "Scope Violations", count: 1, tone: "danger" },
    { label: "Eligibility Exceptions", count: 1, tone: "info" },
    { label: "Dependency Exceptions", count: 2, tone: "warning" },
    { label: "Configuration Exceptions", count: 1, tone: "neutral" },
  ],

  recentActivity: [
    { activity: "Assigned", module: "AI Beauty Advisor", user: "Priya Kumar", time: "May 14, 2026 10:12 AM" },
    { activity: "Inherited", module: "Customer Support", user: "Arun Silva", time: "May 14, 2026 9:45 AM" },
    { activity: "Source Change", module: "Customer Support", user: "Arun Silva", time: "May 14, 2026 9:05 AM" },
    { activity: "Restricted", module: "Loyalty Management", user: "System", time: "May 13, 2026 4:20 PM" },
    { activity: "Pilot Created", module: "Sustainability Tracker", user: "Nimal Perera", time: "May 13, 2026 9:15 AM" },
  ] as AssignmentActivityRow[],

  // Sidebar Summaries matching Screenshot exactly
  tenantAssignmentSummaryRight: [
    { label: "Assigned", count: 13, tone: "emerald" },
    { label: "Inherited", count: 11, tone: "emerald" },
    { label: "Optional", count: 7, tone: "blue" },
    { label: "Pending", count: 3, tone: "amber" },
    { label: "Restricted", count: 2, tone: "rose" },
    { label: "Total", count: 16, tone: "rose" },
  ],

  governanceSummaryRight: [
    { label: "Dependency Coverage", count: 8, tone: "blue" },
    { label: "Security Posture", count: 8, tone: "blue" },
    { label: "Compliance Status", count: 8, tone: "blue" },
    { label: "Tenant Readiness", count: 8, tone: "purple" },
    { label: "Data Completeness", count: 8, tone: "blue" },
    { label: "Governance Violations", count: 2, tone: "rose" },
  ],

  productionEligibilityRight: [
    { label: "Production Eligible", count: 10, tone: "emerald" },
    { label: "Not Eligible", count: 2, tone: "amber" },
    { label: "Pending Review", count: 3, tone: "amber" },
    { label: "Production Enabled", count: 9, tone: "rose" },
    { label: "Non-Production", count: 7, tone: "rose" },
  ],

  quickQueues: [
    { label: "Pending Changes", count: 6, tone: "amber" },
    { label: "Restricted Capabilities", count: 2, tone: "rose" },
    { label: "Security Restrictions", count: 2, tone: "blue" },
    { label: "Compliance Restrictions", count: 2, tone: "blue" },
    { label: "Dependency Blocks", count: 3, tone: "blue" },
    { label: "Channel Conflicts", count: 3, tone: "purple" },
    { label: "Capability Exceptions", count: 5, tone: "emerald" },
  ],

  finalActions: [
    { label: "Create Capability Assignment", primary: true, route: "/admin/ecosystem-modules/capabilities" },
    { label: "Review Pending Changes", primary: false },
    { label: "Review Restricted Modules", primary: false },
    { label: "Review Production Eligibility", primary: false },
    { label: "Review Security Holds", primary: false },
    { label: "Review Compliance Holds", primary: false },
    { label: "Review Dependency Blocks", primary: false },
    { label: "Compare Business Units", primary: false },
    { label: "Compare Channels", primary: false },
    { label: "View Sector Pack Mapping", primary: false },
    { label: "Export Assignment Matrix", primary: false },
    { label: "Open Assignment Audit", primary: false },
  ],
};
