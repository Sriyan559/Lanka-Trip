export interface IdentityRegistryItem {
  id: string;
  identity: string;
  type: "Human" | "Group" | "Service";
  businessUnit: string;
  entitlements: number;
  privilegeLevel: "P1" | "P2" | "P3";
  riskLevel: "High" | "Medium" | "Low";
  mfaAuth: "MFA" | "N/A" | "SSO";
}

export interface AccessPolicyItem {
  id: string;
  policyName: string;
  lifecycleStatus: "Active" | "Draft" | "Suspended" | "Deprecated";
  lastUpdated: string;
  owner: string;
  appliesTo: string;
  evaluationResult: "Allow" | "Approval Required" | "Conditional" | "Deny";
}

export interface EffectivePermissionItem {
  id: string;
  identity: string;
  applicationSystem: string;
  role: string;
  permissionSet: string;
  accessType: string;
  privilegeLevel: "P1" | "P2" | "P3";
  riskLevel: "High" | "Medium" | "Low";
  evaluationResult: "Allow" | "Conditional" | "Deny";
  lastEvaluated: string;
}

export interface RoleRegistryItem {
  id: string;
  roleName: string;
  type: "Human" | "Service" | "System";
  identities: number;
  applications: number;
  privilegeLevel: "P1" | "P2" | "P3";
  riskLevel: "High" | "Medium" | "Low";
}

export interface PermissionSetItem {
  id: string;
  permissionSet: string;
  type: "Human" | "Service" | "System";
  assignments: number;
  privilegeLevel: "P1" | "P2" | "P3";
  riskLevel: "High" | "Medium" | "Low";
}

export interface ServicePrincipalItem {
  id: string;
  servicePrincipal: string;
  owner: string;
  applications: string;
  credentialType: string;
  credentialRotation: string;
  tokenLifetime: string;
  mTLS: "Yes" | "No";
  serviceScope: string;
  riskLevel: "High" | "Medium" | "Low";
}

export interface SodMatrixItem {
  id: string;
  sodRule: string;
  conflictingRoles: string;
  conflicts: number;
  riskLevel: "High" | "Medium" | "Low";
  status: "Active" | "Inactive";
}

export interface RecentGovernanceActivityItem {
  time: string;
  actor: string;
  action: string;
  target: string;
  result: "Success" | "Warning" | "Denied";
  details: string;
}

export const GOVERNANCE_ACCESS_DATA = {
  headerInfo: {
    visibleTitle: "Governance, Access, Security & Policy Control",
    breadcrumb: "Ecosystem Modules > Governance & Access",
    subtitle: "Central governance for identity, access, security posture, and policy control across the SL Beauty enterprise.",
  },

  primaryKpis: [
    { label: "Human Identities", value: "2,148", supportingText: "+3% vs last 30 days", tone: "info" },
    { label: "Service Principals", value: "368", supportingText: "+5% vs last 30 days", tone: "info" },
    { label: "Active Users (30D)", value: "1,248", supportingText: "58% of total", tone: "success" },
    { label: "Privileged Accounts", value: "162", supportingText: "+2% vs last 30 days", tone: "warning" },
    { label: "Access Policies", value: "142", supportingText: "12 Draft • 8 Suspended", tone: "info" },
    { label: "Policy Evaluations (30D)", value: "48,912", supportingText: "+6% vs last 30 days", tone: "success" },
    { label: "Access Requests (30D)", value: "214", supportingText: "38 Pending", tone: "warning" },
    { label: "High Risk Access", value: "29", supportingText: "+3 vs last 30 days", tone: "danger" },
  ],

  decisionFlowSteps: [
    { step: 1, name: "Explicit Deny", description: "Block immediately if matched", type: "deny" },
    { step: 2, name: "Security Conditions", description: "MFA, Device, Location, IP, Time", type: "security" },
    { step: 3, name: "Scope Validation", description: "Verify resource & data scope", type: "scope" },
    { step: 4, name: "Role / Permission", description: "Check roles & permission sets", type: "role" },
    { step: 5, name: "Conditional Policy", description: "Evaluate conditions & constraints", type: "conditional" },
    { step: 6, name: "Approval", description: "Approval required (if applicable)", type: "approval" },
    { step: 7, name: "Final Decision", description: "Allow, Deny, or Conditional", type: "decision" },
  ],

  topIdentities: [
    { id: "id-01", identity: "Elena Vance", type: "Human", businessUnit: "IT", entitlements: 28, privilegeLevel: "P2", riskLevel: "Medium", mfaAuth: "MFA" },
    { id: "id-02", identity: "Priya Kumar", type: "Human", businessUnit: "Finance", entitlements: 22, privilegeLevel: "P1", riskLevel: "High", mfaAuth: "MFA" },
    { id: "id-03", identity: "Arun Silva", type: "Human", businessUnit: "Operations", entitlements: 19, privilegeLevel: "P2", riskLevel: "Medium", mfaAuth: "MFA" },
    { id: "id-04", identity: "Nimal Perera", type: "Human", businessUnit: "Supply Chain", entitlements: 16, privilegeLevel: "P1", riskLevel: "High", mfaAuth: "MFA" },
    { id: "id-05", identity: "Security Team", type: "Group", businessUnit: "Security", entitlements: 41, privilegeLevel: "P1", riskLevel: "High", mfaAuth: "MFA" },
    { id: "id-06", identity: "OrderSync Service", type: "Service", businessUnit: "Integrations", entitlements: 12, privilegeLevel: "P3", riskLevel: "Low", mfaAuth: "N/A" },
    { id: "id-07", identity: "InventoryAPI SP", type: "Service", businessUnit: "Platform", entitlements: 8, privilegeLevel: "P3", riskLevel: "Low", mfaAuth: "MFA" },
    { id: "id-08", identity: "EmailRelay SP", type: "Service", businessUnit: "Communications", entitlements: 6, privilegeLevel: "P3", riskLevel: "Low", mfaAuth: "N/A" },
  ] as IdentityRegistryItem[],

  policies: [
    { id: "pol-01", policyName: "Finance Data Access", lifecycleStatus: "Active", lastUpdated: "May 10, 2025", owner: "Priya Kumar", appliesTo: "Human", evaluationResult: "Allow" },
    { id: "pol-02", policyName: "Vendor Onboarding", lifecycleStatus: "Active", lastUpdated: "May 9, 2025", owner: "Arun Silva", appliesTo: "Human", evaluationResult: "Approval Required" },
    { id: "pol-03", policyName: "Privileged Access Policy", lifecycleStatus: "Active", lastUpdated: "May 8, 2025", owner: "Security Team", appliesTo: "Human", evaluationResult: "Conditional" },
    { id: "pol-04", policyName: "API Access Control", lifecycleStatus: "Active", lastUpdated: "May 7, 2025", owner: "Nimal Perera", appliesTo: "Service", evaluationResult: "Allow" },
    { id: "pol-05", policyName: "SoD - Finance", lifecycleStatus: "Active", lastUpdated: "May 6, 2025", owner: "Priya Kumar", appliesTo: "Human", evaluationResult: "Deny" },
    { id: "pol-06", policyName: "Data Export Restrictions", lifecycleStatus: "Draft", lastUpdated: "May 5, 2025", owner: "Security Team", appliesTo: "Human", evaluationResult: "Conditional" },
    { id: "pol-07", policyName: "Legacy System Access", lifecycleStatus: "Suspended", lastUpdated: "Apr 28, 2025", owner: "Arun Silva", appliesTo: "Human", evaluationResult: "Deny" },
    { id: "pol-08", policyName: "Third-Party Integrations", lifecycleStatus: "Deprecated", lastUpdated: "Apr 20, 2025", owner: "Nimal Perera", appliesTo: "Service", evaluationResult: "Deny" },
  ] as AccessPolicyItem[],

  effectivePermissions: [
    { id: "ep-01", identity: "Elena Vance", applicationSystem: "ERP Core", role: "Finance Analyst", permissionSet: "Finance Read", accessType: "Data Read", privilegeLevel: "P2", riskLevel: "Medium", evaluationResult: "Allow", lastEvaluated: "May 12, 2025 10:12 AM" },
    { id: "ep-02", identity: "Priya Kumar", applicationSystem: "Finance Data Mart", role: "Finance Manager", permissionSet: "Finance Full Access", accessType: "Data Write", privilegeLevel: "P1", riskLevel: "High", evaluationResult: "Allow", lastEvaluated: "May 12, 2025 09:45 AM" },
    { id: "ep-03", identity: "Arun Silva", applicationSystem: "Procurement Portal", role: "Procurement Lead", permissionSet: "Vendor Manage", accessType: "Data Write", privilegeLevel: "P2", riskLevel: "Medium", evaluationResult: "Conditional", lastEvaluated: "May 12, 2025 09:10 AM" },
    { id: "ep-04", identity: "Nimal Perera", applicationSystem: "Inventory System", role: "Inventory Controller", permissionSet: "Inventory Manage", accessType: "Data Write", privilegeLevel: "P2", riskLevel: "Medium", evaluationResult: "Allow", lastEvaluated: "May 12, 2025 09:01 AM" },
    { id: "ep-05", identity: "OrderSync Service", applicationSystem: "ERP Core API", role: "Service Role", permissionSet: "Order Write", accessType: "API Access", privilegeLevel: "P3", riskLevel: "Low", evaluationResult: "Allow", lastEvaluated: "May 12, 2025 08:55 AM" },
  ] as EffectivePermissionItem[],

  roles: [
    { id: "r-01", roleName: "Finance Manager", type: "Human", identities: 18, applications: 4, privilegeLevel: "P1", riskLevel: "High" },
    { id: "r-02", roleName: "Security Administrator", type: "Human", identities: 6, applications: 8, privilegeLevel: "P1", riskLevel: "High" },
    { id: "r-03", roleName: "Procurement Lead", type: "Human", identities: 12, applications: 4, privilegeLevel: "P2", riskLevel: "Medium" },
    { id: "r-04", roleName: "Inventory Controller", type: "Human", identities: 9, applications: 3, privilegeLevel: "P2", riskLevel: "Medium" },
    { id: "r-05", roleName: "Service Integration Role", type: "Service", identities: 24, applications: 7, privilegeLevel: "P3", riskLevel: "Low" },
  ] as RoleRegistryItem[],

  permissionSets: [
    { id: "ps-01", permissionSet: "Finance Full Access", type: "Human", assignments: 28, privilegeLevel: "P1", riskLevel: "High" },
    { id: "ps-02", permissionSet: "User Administration", type: "Human", assignments: 6, privilegeLevel: "P1", riskLevel: "High" },
    { id: "ps-03", permissionSet: "Vendor Manage", type: "Human", assignments: 21, privilegeLevel: "P2", riskLevel: "Medium" },
    { id: "ps-04", permissionSet: "Inventory Manage", type: "Human", assignments: 18, privilegeLevel: "P2", riskLevel: "Medium" },
    { id: "ps-05", permissionSet: "Order Write", type: "Service", assignments: 31, privilegeLevel: "P3", riskLevel: "Low" },
  ] as PermissionSetItem[],

  accessRequestQueue: {
    totalPending: 38,
    newCount: 14,
    inReview: 10,
    approvalPending: 9,
    additionalInfo: 5,
  },

  recentRequests: [
    { request: "Finance Data Mart Access", requester: "Priya Kumar", date: "May 12, 2025" },
    { request: "Vendor Portal Access", requester: "Arun Silva", date: "May 12, 2025" },
    { request: "Inventory System Access", requester: "Nimal Perera", date: "May 11, 2025" },
  ],

  temporaryAccess: {
    activeGrants: 12,
    expiring7Days: 4,
    overdue: 1,
  },

  accessCertification: {
    dueSoon: 6,
    inProgress: 8,
    completedThisMonth: 14,
  },

  accessReviewsByState: {
    totalReviews: 28,
    states: [
      { label: "Current", count: 10, pct: "36%" },
      { label: "Due Soon", count: 6, pct: "21%" },
      { label: "Overdue", count: 5, pct: "18%" },
      { label: "In Review", count: 2, pct: "7%" },
      { label: "Completed", count: 5, pct: "18%" },
    ]
  },

  dormantAccess: {
    dormantAccounts: 46,
    over90Days: 28,
    over180Days: 12,
    over365Days: 6,
  },

  servicePrincipals: [
    { id: "sp-01", servicePrincipal: "OrderSync Service", owner: "Nimal Perera", applications: "ERP Core, WMS", credentialType: "Client Secret", credentialRotation: "30 days", tokenLifetime: "1 hour", mTLS: "Yes", serviceScope: "Orders: Read/Write", riskLevel: "Low" },
    { id: "sp-02", servicePrincipal: "InventoryAPI SP", owner: "Arun Silva", applications: "Inventory System", credentialType: "Certificate", credentialRotation: "60 days", tokenLifetime: "2 hours", mTLS: "Yes", serviceScope: "Inventory: Read/Write", riskLevel: "Low" },
    { id: "sp-03", servicePrincipal: "EmailRelay SP", owner: "Security Team", applications: "Email Service", credentialType: "Client Secret", credentialRotation: "30 days", tokenLifetime: "1 hour", mTLS: "No", serviceScope: "Email: Send", riskLevel: "Low" },
    { id: "sp-04", servicePrincipal: "VendorAPI SP", owner: "Nimal Perera", applications: "Vendor Portal", credentialType: "Certificate", credentialRotation: "90 days", tokenLifetime: "4 hours", mTLS: "Yes", serviceScope: "Vendors: Read", riskLevel: "Low" },
    { id: "sp-05", servicePrincipal: "AnalyticsCollector SP", owner: "Arun Silva", applications: "Analytics Platform", credentialType: "Managed Identity", credentialRotation: "N/A", tokenLifetime: "1 hour", mTLS: "Yes", serviceScope: "Metrics: Write", riskLevel: "Low" },
  ] as ServicePrincipalItem[],

  sodMatrix: [
    { id: "sod-01", sodRule: "Create Vendor vs Pay Vendor", conflictingRoles: "Procurement Lead vs Finance Manager", conflicts: 4, riskLevel: "High", status: "Active" },
    { id: "sod-02", sodRule: "Grant MFA vs Approve Invoice", conflictingRoles: "Warehouse Lead vs Finance Manager", conflicts: 3, riskLevel: "High", status: "Active" },
    { id: "sod-03", sodRule: "Request Access vs Approve Access", conflictingRoles: "IT Staff vs Security Admin", conflicts: 2, riskLevel: "Medium", status: "Active" },
    { id: "sod-04", sodRule: "Deploy Change vs Approve Change", conflictingRoles: "DevOps Engineer vs Change Manager", conflicts: 2, riskLevel: "Medium", status: "Active" },
    { id: "sod-05", sodRule: "Manage Users vs Manage Roles", conflictingRoles: "Security Admin vs HR Admin", conflicts: 1, riskLevel: "Medium", status: "Active" },
  ] as SodMatrixItem[],

  recentActivity: [
    { time: "May 12, 2025 10:25 AM", actor: "Elena Vance", action: "Policy Updated", target: "Finance Data Access", result: "Success", details: "Conditions updated" },
    { time: "May 12, 2025 09:21 AM", actor: "Priya Kumar", action: "Access Approved", target: "Finance Data Mart", result: "Success", details: "Read/Write access" },
    { time: "May 12, 2025 09:15 AM", actor: "Security Team", action: "Access Revoked", target: "Legacy System Access", result: "Success", details: "Policy suspended" },
    { time: "May 12, 2025 09:42 AM", actor: "Arun Silva", action: "Role Assigned", target: "Procurement Lead", result: "Success", details: "Assigned to user" },
    { time: "May 12, 2025 09:15 AM", actor: "Nimal Perera", action: "SP Credential Rotated", target: "OrderSync Service", result: "Success", details: "Certificate rotated" },
  ] as RecentGovernanceActivityItem[],

  rightPanel: {
    healthScore: 96,
    healthLabel: "Excellent",
    trendText: "+4 vs last week",

    accessSummary: {
      humanIdentities: "2,148",
      servicePrincipals: "368",
      activeUsers: "1,248",
      privilegedAccounts: "162",
      highRiskAccess: "29",
    },

    riskSummary: {
      highRisk: 29,
      mediumRisk: 81,
      lowRisk: 104,
      info: 23,
    },

    reviewCertification: {
      certificationsDueSoon: 6,
      reviewsDueSoon: 6,
      reviewsOverdue: 4,
      inProgress: 10,
      completedThisMonth: 15,
    },

    quickQueues: [
      { label: "Access Requests", count: 38, tone: "warning" },
      { label: "Access Approvals", count: 9, tone: "warning" },
      { label: "Temporary Access", count: 12, tone: "info" },
      { label: "Access Reviews", count: 28, tone: "warning" },
      { label: "Dormant Accounts", count: 46, tone: "danger" },
    ],

    recommendedNextActions: [
      { id: "act-1", title: "Review High Risk Access", subtitle: "29 identities require review", type: "warning" },
      { id: "act-2", title: "Approve Pending Requests", subtitle: "20 requests waiting", type: "info" },
      { id: "act-3", title: "Run Access Certifications", subtitle: "6 certifications due soon", type: "info" },
    ]
  }
};
