export interface ModuleIncludedItem {
  id: string;
  name: string;
  type: string;
  requirement: "Required" | "Optional";
  minVersion: string;
  maxVersion: string;
  currentVersion: string;
  targetVersion: string;
  compatibility: string;
  security: "Approved" | "Pending" | "Review";
  compliance: "Compliant" | "Non-Compliant" | "Review";
  dualChannelReady: boolean;
  status: "Active" | "Inactive" | "Beta";
}

export interface CapabilityBundleItem {
  code: string;
  name: string;
  capabilitiesCount: number;
  requiredCount: number;
  optionalCount: number;
  parentModules: number;
  overridePolicy: string;
  health: string;
  status: "Active" | "Inactive" | "Draft";
}

export interface CapabilityConfigItem {
  reference: string;
  name: string;
  parentModule: string;
  bundle: string;
  requirement: "Required" | "Optional";
  defaultState: "Enabled" | "Disabled";
  tenantOverride: boolean;
  channelOverride: boolean;
  packRequired: boolean;
  featureFlag: string;
  country: number;
  dependencyCount: number;
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Inactive";
}

export interface RequiredOptionalRuleItem {
  bundle: string;
  required: boolean;
  optional: boolean;
  tenantOverrideAllowed: boolean;
  buOverrideAllowed: boolean;
  channelOverrideAllowed: boolean;
  canRestrict: boolean;
  canPromote: boolean;
  prodRequired: boolean;
  status: "Active" | "Inactive";
}

export interface InheritanceConflictItem {
  component: string;
  parentRule: string;
  thisPackRule: string;
  conflict: string;
  severity: "High" | "Medium" | "Low";
  blocking: boolean;
  owner: string;
  status: "Open" | "Resolved" | "Warning";
}

export interface ModuleCompatibilityItem {
  module: string;
  minVersion: string;
  currentVersion: string;
  targetVersion: string;
  compatibility: string;
  breakingChange: boolean;
  upgradeRequired: boolean;
  tenantImpact: "Low" | "Medium" | "High";
  status: "Active" | "Warning";
}

export interface DependencyValidationItem {
  component: string;
  dependencyType: string;
  requiredBy: string;
  requiredVersion: string;
  availableVersion: string;
  reqOpt: "Req" | "Opt";
  blocking: boolean;
  health: "Healthy" | "Warning" | "Critical";
  status: "Passed" | "Warning" | "Blocked";
}

export interface CountryApplicabilityItem {
  country: string;
  enabled: boolean;
  legalReady: boolean;
  complianceReady: boolean;
  localizationReady: boolean;
  currencyReady: boolean;
  dataResidencyReady: boolean;
  moduleCoverage: string;
  capabilityCoverage: string;
  status: "Ready" | "In-Review" | "Pending";
}

export interface CountryRestrictionItem {
  country: string;
  moduleCapability: string;
  restrictionType: string;
  defaultPackData: string;
  countryState: string;
  reason: string;
  effectiveDate: string;
  owner: string;
  status: "Active" | "Inactive";
}

export interface TenantUsageItem {
  tenant: string;
  ecosystem: string;
  packVersion: string;
  assignedModules: number;
  enabledCapabilities: number;
  overrides: number;
  restrictions: number;
  adoption: string;
  health: string;
  readiness: string;
  lastEvaluated: string;
  status: "Active" | "Warning";
}

export const BEAUTY_WELLNESS_DATA = {
  headerInfo: {
    visibleTitle: "Beauty & Wellness",
    breadcrumb: "Ecosystem Modules > Sector Packs > Beauty & Wellness",
    description: "Reusable sector pack for beauty, retail, professional services, customer experience, compliance, fulfilment, analytics and AI capabilities.",
    version: "v2.5.1",
    status: "Active",
  },

  metadataGrid: [
    { label: "Public Pack Reference", value: "SPK-2026-000001" },
    { label: "Pack Key", value: "beauty-wellness" },
    { label: "Sector", value: "Beauty & Personal Care" },
    { label: "Lifecycle", value: "Active", badge: "Active" },
    { label: "Current Version", value: "v2.5.1", subtext: "Released" },
    { label: "Target Version", value: "v2.6.0", subtext: "In Progress" },
    { label: "Benefit Related", value: "Priya" },
    { label: "Business Unit", value: "Priya Kumar" },
    { label: "Business Owner", value: "Arun Silva" },
    { label: "Effective Since", value: "May 02, 2026" },
    { label: "Next Review", value: "May 30, 2026" },
    { label: "Region", value: "Sri Lanka" },
    { label: "Registry Scope", value: "Enterprise Wide" },
    { label: "Data Completeness", value: "99%", progress: 99 },
    { label: "Access", value: "Assigned Scope" },
  ],

  statusSummary: [
    { icon: "Activity", label: "Lifecycle", value: "Active", tone: "success" },
    { icon: "CheckCircle", label: "Release Status", value: "Released", tone: "info" },
    { icon: "Clock", label: "Target Version Status", value: "In Progress", tone: "warning" },
    { icon: "Layers", label: "Composition Status", value: "Complete", tone: "success" },
    { icon: "CheckSquare", label: "Module Compatibility", value: "Healthy", tone: "success" },
    { icon: "Package", label: "Capability Coverage", value: "Healthy", tone: "success" },
    { icon: "Link", label: "Dependency Health", value: "Healthy", tone: "success" },
    { icon: "ShieldCheck", label: "Security Status", value: "Approved", tone: "success" },
    { icon: "Shield", label: "Compliance Status", value: "Approved", tone: "success" },
    { icon: "Globe", label: "Country Readiness", value: "Healthy", tone: "success" },
    { icon: "Users", label: "Tenant Impact", value: "Review Required", tone: "warning" },
    { icon: "AlertTriangle", label: "Risk Level", value: "Low", tone: "success" },
  ],

  primaryKpis: [
    { label: "Pack Health", value: "96 / 100", status: "Excellent", tone: "success", sparkline: [85, 88, 90, 92, 94, 96] },
    { label: "Modules Included", value: "16", status: "Complete", tone: "info", sparkline: [12, 14, 15, 16, 16, 16] },
    { label: "Capability Bundles", value: "5", status: "Active", tone: "info", sparkline: [4, 4, 5, 5, 5, 5] },
    { label: "Required Capabilities", value: "62", status: "Core", tone: "info", sparkline: [50, 54, 58, 60, 62, 62] },
    { label: "Optional Capabilities", value: "38", status: "Available", tone: "info", sparkline: [30, 32, 35, 36, 38, 38] },
    { label: "Dependencies", value: "24", status: "Validated", tone: "info", sparkline: [20, 21, 22, 23, 24, 24] },
    { label: "Active Tenant Assignments", value: "486", status: "95% Adoption", tone: "success", sparkline: [400, 420, 450, 470, 480, 486] },
    { label: "Tenant Overrides", value: "12", status: "Controlled", tone: "warning", sparkline: [18, 16, 15, 14, 13, 12] },
    { label: "Open Exceptions", value: "3", status: "Monitored", tone: "warning", sparkline: [5, 4, 4, 3, 3, 3] },
    { label: "Release Readiness", value: "96%", status: "Ready for v2.6", tone: "success", sparkline: [80, 85, 90, 92, 95, 96] },
  ],

  secondaryKpis: [
    { label: "Countries Supported", value: "6", status: "Global", tone: "info" },
    { label: "Business Units Supported", value: "6", status: "Aligned", tone: "info" },
    { label: "Channels Supported", value: "8", status: "Omnichannel", tone: "info" },
    { label: "Current Version Adoption", value: "95%", status: "v2.5.1 Live", tone: "success" },
    { label: "Pending Approvals", value: "1", status: "Final Gate", tone: "warning" },
    { label: "Compatibility Risks", value: "2", status: "Low Impact", tone: "warning" },
    { label: "Compliance Warnings", value: "1", status: "Reviewed", tone: "warning" },
    { label: "Version Changes", value: "4", status: "Target v2.6.0", tone: "info" },
  ],

  tabs: [
    "Pack Overview", "Composition", "Modules", "Capability Bundles",
    "Required / Optional Rules", "Inheritance", "Compatibility", "Dependencies",
    "Countries", "Tenant Usage", "Overrides", "Versions",
    "Release Readiness", "Governance", "Exceptions", "Audit History"
  ],

  compositionOverview: {
    parentPack: "General Retail Core",
    modulesIncluded: 16,
    capabilityBundles: 5,
    requiredCapabilities: 62,
    optionalCapabilities: 38,
    requiredDependencies: 24,
    countriesSupported: 6,
  },

  modulesIncluded: [
    { id: "MOD-MKT-001", name: "B2C Marketplace", type: "Core", requirement: "Required", minVersion: "v2.1.0", maxVersion: "v2.5.1", currentVersion: "v2.5.1", targetVersion: "v2.6.0", compatibility: "98%", security: "Approved", compliance: "Compliant", dualChannelReady: true, status: "Active" },
    { id: "MOD-CAT-001", name: "Catalogue", type: "Core", requirement: "Required", minVersion: "v1.4.0", maxVersion: "v2.5.0", currentVersion: "v2.5.0", targetVersion: "v2.6.0", compatibility: "97%", security: "Approved", compliance: "Compliant", dualChannelReady: true, status: "Active" },
    { id: "MOD-CS-001", name: "Customer Support", type: "Core", requirement: "Required", minVersion: "v1.8.0", maxVersion: "v2.2.0", currentVersion: "v2.2.0", targetVersion: "v2.3.0", compatibility: "96%", security: "Approved", compliance: "Compliant", dualChannelReady: true, status: "Active" },
    { id: "MOD-AI-001", name: "AI Beauty Advisor", type: "General", requirement: "Optional", minVersion: "v1.0.0", maxVersion: "v2.4.0", currentVersion: "v2.2.0", targetVersion: "v2.4.0", compatibility: "94%", security: "Approved", compliance: "Compliant", dualChannelReady: true, status: "Active" },
    { id: "MOD-LOY-001", name: "Loyalty Management", type: "Core", requirement: "Required", minVersion: "v1.6.0", maxVersion: "v2.4.0", currentVersion: "v2.4.0", targetVersion: "v2.5.0", compatibility: "95%", security: "Approved", compliance: "Compliant", dualChannelReady: true, status: "Active" },
    { id: "MOD-ANA-001", name: "Analytics & Insights", type: "Core", requirement: "Required", minVersion: "v1.6.0", maxVersion: "v2.3.0", currentVersion: "v2.3.0", targetVersion: "v2.4.0", compatibility: "97%", security: "Approved", compliance: "Compliant", dualChannelReady: true, status: "Active" },
  ] as ModuleIncludedItem[],

  capabilityBundles: [
    { code: "CBL-COM-CORE", name: "Commerce Core", capabilitiesCount: 12, requiredCount: 10, optionalCount: 2, parentModules: 6, overridePolicy: "Restrict", health: "98%", status: "Active" },
    { code: "CBL-CUS-ENG", name: "Customer Engagement", capabilitiesCount: 12, requiredCount: 8, optionalCount: 4, parentModules: 4, overridePolicy: "Restrict", health: "96%", status: "Active" },
    { code: "CBL-FUL-EXC", name: "Fulfillment Excellence", capabilitiesCount: 10, requiredCount: 7, optionalCount: 3, parentModules: 5, overridePolicy: "Restrict", health: "97%", status: "Active" },
    { code: "CBL-EDA-CMP", name: "Beauty Compliance & Safety", capabilitiesCount: 13, requiredCount: 9, optionalCount: 4, parentModules: 3, overridePolicy: "Restrict", health: "94%", status: "Active" },
    { code: "CBL-ANA-INS", name: "Analytics & Insights", capabilitiesCount: 15, requiredCount: 11, optionalCount: 4, parentModules: 4, overridePolicy: "Restrict", health: "98%", status: "Active" },
  ] as CapabilityBundleItem[],

  capabilityConfiguration: [
    { reference: "CAP-PRO-001", name: "Customer Profile", parentModule: "Customer Support", bundle: "Customer Engagement", requirement: "Required", defaultState: "Enabled", tenantOverride: true, channelOverride: true, packRequired: true, featureFlag: "Yes", country: 2, dependencyCount: 3, risk: "Low", status: "Active" },
    { reference: "CAP-LOY-001", name: "Loyalty Tiering", parentModule: "Loyalty Management", bundle: "Customer Engagement", requirement: "Required", defaultState: "Enabled", tenantOverride: true, channelOverride: true, packRequired: true, featureFlag: "Yes", country: 2, dependencyCount: 1, risk: "Low", status: "Active" },
    { reference: "CAP-AI-ADV-001", name: "AI Beauty Advisor", parentModule: "AI Beauty Advisor", bundle: "Customer Engagement", requirement: "Optional", defaultState: "Enabled", tenantOverride: true, channelOverride: true, packRequired: false, featureFlag: "Yes", country: 3, dependencyCount: 2, risk: "Medium", status: "Active" },
    { reference: "CAP-REV-001", name: "Product Reviews", parentModule: "B2C Marketplace", bundle: "Commerce Core", requirement: "Optional", defaultState: "Enabled", tenantOverride: true, channelOverride: true, packRequired: false, featureFlag: "Yes", country: 2, dependencyCount: 3, risk: "Low", status: "Active" },
    { reference: "CAP-CMP-001", name: "Ingredient Safety", parentModule: "Verification & Compliance", bundle: "Beauty Compliance & Safety", requirement: "Required", defaultState: "Enabled", tenantOverride: true, channelOverride: true, packRequired: true, featureFlag: "Yes", country: 4, dependencyCount: 4, risk: "Low", status: "Active" },
  ] as CapabilityConfigItem[],

  requiredOptionalRules: [
    { bundle: "Commerce Core", required: true, optional: true, tenantOverrideAllowed: true, buOverrideAllowed: true, channelOverrideAllowed: true, canRestrict: true, canPromote: true, prodRequired: true, status: "Active" },
    { bundle: "Customer Engagement", required: true, optional: true, tenantOverrideAllowed: true, buOverrideAllowed: true, channelOverrideAllowed: true, canRestrict: true, canPromote: true, prodRequired: true, status: "Active" },
    { bundle: "Featured Excellence", required: true, optional: true, tenantOverrideAllowed: true, buOverrideAllowed: true, channelOverrideAllowed: true, canRestrict: true, canPromote: true, prodRequired: true, status: "Active" },
    { bundle: "Beauty Compliance", required: true, optional: true, tenantOverrideAllowed: true, buOverrideAllowed: true, channelOverrideAllowed: true, canRestrict: true, canPromote: true, prodRequired: true, status: "Active" },
    { bundle: "Beauty Governance", required: true, optional: false, tenantOverrideAllowed: true, buOverrideAllowed: false, channelOverrideAllowed: true, canRestrict: true, canPromote: true, prodRequired: true, status: "Active" },
  ] as RequiredOptionalRuleItem[],

  inheritanceDelta: {
    addedModules: 2,
    addedCapabilities: 7,
    requirementChanges: 5,
    restrictedDefaults: 3,
    countryConstraints: 2,
    overridePolicy: 1,
  },

  inheritanceConflicts: [
    { component: "Marketplace Reviews", parentRule: "Optional", thisPackRule: "Required", conflict: "Conflict", severity: "High", blocking: true, owner: "Arun Silva", status: "Open" },
    { component: "Loyalty Tiers", parentRule: "Optional", thisPackRule: "Restricted", conflict: "Restriction Added", severity: "Low", blocking: false, owner: "Priya Kumar", status: "Open" },
  ] as InheritanceConflictItem[],

  moduleCompatibilitySummary: [
    { module: "AI Beauty Advisor", minVersion: "v2.1.0", currentVersion: "v2.2.0", targetVersion: "v2.4.0", compatibility: "94%", breakingChange: false, upgradeRequired: true, tenantImpact: "Medium", status: "Active" },
    { module: "Customer Support", minVersion: "v1.8.0", currentVersion: "v2.2.0", targetVersion: "v2.3.0", compatibility: "96%", breakingChange: false, upgradeRequired: false, tenantImpact: "Low", status: "Active" },
    { module: "Analytics & Insights", minVersion: "v1.6.0", currentVersion: "v2.3.0", targetVersion: "v2.4.0", compatibility: "97%", breakingChange: false, upgradeRequired: false, tenantImpact: "Low", status: "Active" },
  ] as ModuleCompatibilityItem[],

  dependencyValidationSummary: [
    { component: "AI Beauty Advisor", dependencyType: "Service", requiredBy: "AI Gateway", requiredVersion: "v1.0.0", availableVersion: "v1.2.1", reqOpt: "Req", blocking: false, health: "Healthy", status: "Passed" },
    { component: "B2C Marketplace", dependencyType: "Service", requiredBy: "Payment Gateway", requiredVersion: "v2.1.0", availableVersion: "v2.5.0", reqOpt: "Req", blocking: false, health: "Healthy", status: "Passed" },
    { component: "Notifications", dependencyType: "Service", requiredBy: "Email/SMS Service", requiredVersion: "v1.1.0", availableVersion: "v1.2.2", reqOpt: "Req", blocking: false, health: "Healthy", status: "Passed" },
    { component: "Logistics", dependencyType: "Service", requiredBy: "Carrier Registry", requiredVersion: "v1.0.0", availableVersion: "v1.1.0", reqOpt: "Opt", blocking: false, health: "Healthy", status: "Passed" },
  ] as DependencyValidationItem[],

  countryApplicability: [
    { country: "Sri Lanka", enabled: true, legalReady: true, complianceReady: true, localizationReady: true, currencyReady: true, dataResidencyReady: true, moduleCoverage: "100%", capabilityCoverage: "100%", status: "Ready" },
    { country: "India", enabled: true, legalReady: true, complianceReady: true, localizationReady: true, currencyReady: true, dataResidencyReady: true, moduleCoverage: "100%", capabilityCoverage: "99%", status: "Ready" },
    { country: "Singapore", enabled: true, legalReady: true, complianceReady: true, localizationReady: true, currencyReady: true, dataResidencyReady: true, moduleCoverage: "98%", capabilityCoverage: "98%", status: "Ready" },
    { country: "UAE", enabled: true, legalReady: true, complianceReady: true, localizationReady: true, currencyReady: true, dataResidencyReady: true, moduleCoverage: "95%", capabilityCoverage: "95%", status: "Ready" },
    { country: "Malaysia", enabled: true, legalReady: true, complianceReady: true, localizationReady: true, currencyReady: true, dataResidencyReady: true, moduleCoverage: "92%", capabilityCoverage: "90%", status: "In-Review" },
    { country: "Maldives", enabled: true, legalReady: true, complianceReady: true, localizationReady: true, currencyReady: true, dataResidencyReady: true, moduleCoverage: "88%", capabilityCoverage: "85%", status: "Pending" },
  ] as CountryApplicabilityItem[],

  countryRestrictions: [
    { country: "Maldives", moduleCapability: "AI Beauty Advisor", restrictionType: "Restricted", defaultPackData: "Optional", countryState: "Disabled", reason: "Data Residency", effectiveDate: "May 01, 2026", owner: "Arun Silva", status: "Active" },
    { country: "UAE", moduleCapability: "Ingredient Safety", restrictionType: "Restricted", defaultPackData: "Required", countryState: "Conditional", reason: "Local Regulation", effectiveDate: "Apr 15, 2026", owner: "Priya Kumar", status: "Active" },
  ] as CountryRestrictionItem[],

  tenantUsage: [
    { tenant: "SL Beauty", ecosystem: "SL Beauty", packVersion: "v2.5.1", assignedModules: 16, enabledCapabilities: 60, overrides: 2, restrictions: 0, adoption: "100%", health: "Healthy", readiness: "96%", lastEvaluated: "May 14, 2026", status: "Active" },
    { tenant: "Beauty Hub", ecosystem: "Beauty Hub", packVersion: "v2.5.1", assignedModules: 16, enabledCapabilities: 58, overrides: 3, restrictions: 1, adoption: "98%", health: "Healthy", readiness: "96%", lastEvaluated: "May 14, 2026", status: "Active" },
    { tenant: "Glow Retail", ecosystem: "Glow Retail", packVersion: "v2.5.1", assignedModules: 15, enabledCapabilities: 56, overrides: 1, restrictions: 1, adoption: "95%", health: "Healthy", readiness: "95%", lastEvaluated: "May 14, 2026", status: "Active" },
    { tenant: "Clinic Network", ecosystem: "Clinic Network", packVersion: "v2.4.0", assignedModules: 14, enabledCapabilities: 52, overrides: 2, restrictions: 1, adoption: "90%", health: "Warning", readiness: "90%", lastEvaluated: "May 14, 2026", status: "Active" },
    { tenant: "Academy Platform", ecosystem: "Academy", packVersion: "v2.3.1", assignedModules: 12, enabledCapabilities: 45, overrides: 2, restrictions: 0, adoption: "85%", health: "Warning", readiness: "88%", lastEvaluated: "May 14, 2026", status: "Active" },
  ] as TenantUsageItem[],

  rightPanel: {
    healthScore: 96,
    healthLabel: "Excellent",

    packSummary: {
      currentVersion: "v2.5.1",
      targetVersion: "v2.6.0",
      modules: 16,
      capabilityBundles: 5,
      requiredCapabilities: 62,
      optionalCapabilities: 38,
      dependencies: 24,
      countriesSupported: 6,
    },

    releaseSummary: {
      releaseReadiness: "96%",
      targetRelease: "May 30, 2026",
      pendingApprovals: 1,
      compatibilityRisks: 2,
      breakingChanges: 0,
      migrationRequired: "Yes",
    },

    tenantImpact: {
      activeTenants: 486,
      affectedByTarget: 96,
      activeOverrides: 12,
      expiringOverrides: 2,
      tenantsRequiringReview: 4,
    },

    quickQueues: [
      { label: "Compatibility Risks", count: 2, tone: "danger" },
      { label: "Pending Approval", count: 1, tone: "warning" },
      { label: "Country Readiness", count: 1, tone: "warning" },
      { label: "Expiring Overrides", count: 2, tone: "warning" },
      { label: "Open Exceptions", count: 3, tone: "warning" },
      { label: "Version Changes", count: 4, tone: "info" },
      { label: "Migration Review", count: 2, tone: "info" },
      { label: "Compliance Warning", count: 1, tone: "warning" },
    ],

    recommendedNextAction: {
      description: "Complete the final country-readiness review and approve the remaining compliance gate before releasing v2.6.0.",
      owner: "Priya Kumar",
      dueDate: "May 28, 2026",
    }
  }
};
