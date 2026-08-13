export interface SectorPackItem {
  id: string;
  sectorPack: string;
  industry: string;
  status: "Active" | "In Review" | "Draft";
  version: string;
  targetVersion: string;
  modules: number;
  capabilityBundles: number;
  tenantOverrides: number;
  compatibilityScore: string;
  releaseReadiness: string;
  risks: number;
  exceptions: number;
  tenants: number;
  countries: number;
  updatedOn: string;
  updatedBy: string;
}

export const SECTOR_PACK_DATA = {
  headerInfo: {
    visibleTitle: "Sector Packs & Capability Bundles",
    breadcrumb: "Ecosystem Modules > Sector Packs & Capability Bundles",
    description: "Create, compose, version, and release sector packs with modular capability bundles, compatibility, and tenant overrides.",
  },

  releaseSummary: {
    currentVersion: "V2.5.1",
    releasedOn: "May 02, 2026 14:05",
    releasedBy: "Elena Wang",
    targetVersion: "V2.6.0",
    targetRelease: "May 30, 2026",
    status: "In Progress",
  },

  primaryKpis: [
    { id: "sector-packs", label: "Sector Packs", value: 8, icon: "box", tone: "info" },
    { id: "capability-bundles", label: "Capability Bundles", value: 5, icon: "shield-check", tone: "success" },
    { id: "modules", label: "Modules", value: 62, icon: "package", tone: "warning" },
    { id: "tenant-overrides", label: "Tenant Overrides", value: "1,124", icon: "file-text", tone: "info" },
    { id: "dependencies", label: "Dependencies", value: 24, icon: "file-check", tone: "info" },
    { id: "module-attachments", label: "Module Attachments", value: 13, icon: "link", tone: "warning" },
    { id: "risks-conflicts", label: "Risks & Conflicts", value: 2, icon: "alert-triangle", tone: "warning" },
    { id: "compatibility-score", label: "Compatibility Score", value: "96%", icon: "shield-check", tone: "success" },
    { id: "release-readiness", label: "Release Readiness", value: "96 /100", icon: "trending-up", tone: "success", hasProgressBar: true },
  ],

  secondaryKpis: [
    { id: "active-customers", label: "Active Customers", value: 62, icon: "user", tone: "info" },
    { id: "customers-onboarding", label: "Customers Onboarding", value: 38, icon: "users", tone: "info" },
    { id: "countries-supported", label: "Countries Supported", value: 6, icon: "globe", tone: "info" },
    { id: "tenants", label: "Tenants", value: 512, icon: "building", tone: "info" },
    { id: "platform-languages", label: "Platform Languages", value: 5, icon: "globe", tone: "info" },
    { id: "patch-available", label: "Patch Available", value: "Yes", icon: "shield-check", tone: "warning" },
    { id: "exceptions", label: "Exceptions", value: 3, icon: "alert-triangle", tone: "warning" },
    { id: "pending-approvals", label: "Pending Approvals", value: 1, icon: "shield-check", tone: "warning" },
    { id: "open-support-tickets", label: "Open Support Tickets", value: 2, icon: "clock", tone: "info" },
  ],

  registry: [
    { id: "spc-core", sectorPack: "SL Beauty Core Pack", industry: "Beauty & Personal Care", status: "Active", version: "V2.5.1", targetVersion: "V2.6.0", modules: 16, capabilityBundles: 4, tenantOverrides: 142, compatibilityScore: "98%", releaseReadiness: "100%", risks: 0, exceptions: 0, tenants: 124, countries: 6, updatedOn: "May 02, 2026", updatedBy: "Elena Wang" },
    { id: "spc-010", sectorPack: "SPC-010", industry: "Skincare Specialists", status: "Active", version: "V2.4.0", targetVersion: "V2.5.0", modules: 14, capabilityBundles: 4, tenantOverrides: 136, compatibilityScore: "97%", releaseReadiness: "98%", risks: 0, exceptions: 1, tenants: 96, countries: 6, updatedOn: "May 01, 2026", updatedBy: "Arjun Patel" },
    { id: "spc-020", sectorPack: "SPC-020", industry: "Clinics & Professionals", status: "Active", version: "V2.5.0", targetVersion: "V2.6.0", modules: 18, capabilityBundles: 5, tenantOverrides: 158, compatibilityScore: "96%", releaseReadiness: "95%", risks: 1, exceptions: 1, tenants: 88, countries: 6, updatedOn: "May 01, 2026", updatedBy: "Mei Ling" },
    { id: "spc-030", sectorPack: "SPC-030", industry: "Wellness & Spa", status: "Active", version: "V2.3.0", targetVersion: "V2.4.0", modules: 12, capabilityBundles: 3, tenantOverrides: 98, compatibilityScore: "95%", releaseReadiness: "94%", risks: 1, exceptions: 0, tenants: 64, countries: 5, updatedOn: "Apr 30, 2026", updatedBy: "David Chen" },
    { id: "spc-040", sectorPack: "SPC-040", industry: "Hair Care Specialists", status: "Active", version: "V2.4.1", targetVersion: "V2.5.0", modules: 13, capabilityBundles: 4, tenantOverrides: 120, compatibilityScore: "97%", releaseReadiness: "97%", risks: 0, exceptions: 0, tenants: 72, countries: 5, updatedOn: "Apr 30, 2026", updatedBy: "Sara Khan" },
    { id: "spc-050", sectorPack: "SPC-050", industry: "Fragrance & Perfume", status: "In Review", version: "V2.3.0", targetVersion: "V2.4.0", modules: 11, capabilityBundles: 3, tenantOverrides: 76, compatibilityScore: "94%", releaseReadiness: "90%", risks: 1, exceptions: 0, tenants: 38, countries: 5, updatedOn: "Apr 29, 2026", updatedBy: "Luca Bianchi" },
    { id: "spc-060", sectorPack: "SPC-060", industry: "Retail & E-Commerce", status: "Draft", version: "V1.2.0", targetVersion: "V1.3.0", modules: 8, capabilityBundles: 2, tenantOverrides: 42, compatibilityScore: "88%", releaseReadiness: "72%", risks: 1, exceptions: 1, tenants: 12, countries: 4, updatedOn: "Apr 29, 2026", updatedBy: "Priya Nair" },
    { id: "spc-070", sectorPack: "SPC-070", industry: "Sustainable Beauty", status: "Draft", version: "V1.1.0", targetVersion: "V1.2.0", modules: 7, capabilityBundles: 2, tenantOverrides: 28, compatibilityScore: "86%", releaseReadiness: "60%", risks: 2, exceptions: 0, tenants: 6, countries: 3, updatedOn: "Apr 28, 2026", updatedBy: "James O'Neill" },
  ] as SectorPackItem[],

  healthScore: {
    value: 96,
    max: 100,
    label: "Excellent"
  },

  modulesIncluded: [
    { category: "Commerce & Ordering", modules: 6, status: "Active" },
    { category: "Pricing & Promotions", modules: 4, status: "Active" },
    { category: "Inventory & Fulfillment", modules: 5, status: "Active" },
    { category: "Customer & Loyalty", modules: 4, status: "Active" },
    { category: "Content & Experience", modules: 3, status: "Active" },
  ],

  capabilityBundles: [
    { bundle: "Core Commerce", modules: 12, status: "Active" },
    { bundle: "Customer Engagement", modules: 10, status: "Active" },
    { bundle: "Fulfillment Excellence", modules: 8, status: "Active" },
    { bundle: "Digital Experience", modules: 9, status: "Active" },
    { bundle: "Analytics & Insights", modules: 6, status: "Active" },
  ],

  requiredOptionalMatrix: [
    { bundle: "Core Commerce", req: 10, opt: 2, total: 12 },
    { bundle: "Customer Engagement", req: 7, opt: 3, total: 10 },
    { bundle: "Fulfillment Excellence", req: 6, opt: 2, total: 8 },
    { bundle: "Digital Experience", req: 6, opt: 3, total: 9 },
    { bundle: "Analytics & Insights", req: 4, opt: 2, total: 6 },
  ],

  inheritanceConflicts: [
    { conflictType: "Module Version Mismatch", instances: 1, severity: "High" },
    { conflictType: "Capability Override", instances: 1, severity: "Medium" },
  ],

  compatibilityMatrix: {
    columns: ["Core", "SPC-010", "SPC-020", "SPC-030", "SPC-040", "SPC-050", "SPC-060", "SPC-070"],
    rows: [
      { pack: "Core", values: ["100%", "98%", "96%", "95%", "97%", "94%", "88%", "86%"] },
      { pack: "SPC-010", values: ["98%", "100%", "97%", "94%", "96%", "93%", "87%", "85%"] },
      { pack: "SPC-020", values: ["96%", "97%", "100%", "95%", "95%", "92%", "86%", "84%"] },
      { pack: "SPC-030", values: ["95%", "94%", "95%", "100%", "94%", "91%", "85%", "83%"] },
      { pack: "SPC-040", values: ["97%", "96%", "95%", "94%", "100%", "93%", "87%", "85%"] },
      { pack: "SPC-050", values: ["94%", "93%", "92%", "91%", "93%", "100%", "85%", "82%"] },
      { pack: "SPC-060", values: ["88%", "87%", "86%", "85%", "87%", "85%", "100%", "92%"] },
      { pack: "SPC-070", values: ["86%", "85%", "84%", "83%", "85%", "82%", "92%", "100%"] },
    ]
  },

  moduleVersionCompatibility: [
    { category: "Commerce & Ordering", current: "V2.5.1", target: "V2.6.0", compatibility: "100%" },
    { category: "Pricing & Promotions", current: "V2.4.0", target: "V2.5.0", compatibility: "98%" },
    { category: "Inventory & Fulfillment", current: "V2.5.0", target: "V2.6.0", compatibility: "98%" },
    { category: "Customer & Loyalty", current: "V2.5.1", target: "V2.6.0", compatibility: "97%" },
    { category: "Content & Experience", current: "V2.4.1", target: "V2.5.0", compatibility: "96%" },
    { category: "Analytics & Reporting", current: "V2.4.0", target: "V2.5.0", compatibility: "95%" },
  ],

  dependencyValidation: [
    { checkType: "Module Dependencies", status: true, result: "Passed" },
    { checkType: "Data Model Dependencies", status: true, result: "Passed" },
    { checkType: "Integration Dependencies", status: true, result: "Passed" },
    { checkType: "Version Constraints", status: true, result: "Passed" },
    { checkType: "Security Dependencies", status: true, result: "Passed" },
  ],

  countryApplicability: [
    { country: "Singapore", supported: true, overrides: 28, applicability: "100%" },
    { country: "Malaysia", supported: true, overrides: 24, applicability: "100%" },
    { country: "Indonesia", supported: true, overrides: 26, applicability: "100%" },
    { country: "Thailand", supported: true, overrides: 20, applicability: "95%" },
    { country: "Philippines", supported: true, overrides: 18, applicability: "95%" },
    { country: "Vietnam", supported: true, overrides: 16, applicability: "90%" },
  ],

  tenantUsage: {
    totalTenants: 512,
    activeTenants: 486,
    activePercentage: "95%",
    adoptionStages: [
      { name: "Live", count: 286, percentage: "56%", color: "bg-emerald-600" },
      { name: "Pilot", count: 108, percentage: "21%", color: "bg-blue-500" },
      { name: "Onboarding", count: 62, percentage: "12%", color: "bg-amber-500" },
      { name: "Planned", count: 56, percentage: "11%", color: "bg-slate-400" },
    ]
  },

  packAdoption: {
    adoptionRate: "95%",
    tenantsUsingPacks: "486 / 512",
    bySector: [
      { sector: "Beauty & Personal Care", percentage: "98%" },
      { sector: "Skincare Specialists", percentage: "94%" },
      { sector: "Clinics & Professionals", percentage: "95%" },
      { sector: "Wellness & Spa", percentage: "93%" },
      { sector: "Hair Care Specialists", percentage: "96%" },
    ]
  },

  packHealthMatrix: {
    versionCompliance: "98%",
    configurationHealth: "96%",
    riskPosture: "97%",
    riskPostureStatus: "Good",
    overrideImpact: "Low",
    operationalHealth: "Optimal"
  },

  releaseReadiness: {
    score: 96,
    blockers: 0,
    warnings: 2,
    approvals: "5 / 5",
    goNoGo: "Go"
  },

  changeImpactAnalysis: {
    targetVersion: "V2.6.0",
    impactedTenants: 96,
    impactedModules: 12,
    newModules: 2,
    deprecatedModules: 1,
    dataChanges: 4
  },

  exceptionCenter: {
    openExceptions: 3,
    critical: 1,
    high: 1,
    medium: 1,
    low: 0
  },

  recentActivity: [
    { activity: "Sector Pack Updated", entity: "SPC-020", user: "Mei Ling", when: "May 02, 2026 13:42" },
    { activity: "Module Added", entity: "Core Pack", user: "Elena Wang", when: "May 02, 2026 10:18" },
    { activity: "Tenant Override Added", entity: "SPC-010", user: "Arjun Patel", when: "May 02, 2026 09:35" },
    { activity: "Risk Resolved", entity: "SPC-030", user: "David Chen", when: "May 01, 2026 16:50" },
    { activity: "Pack Published", entity: "Core Pack", user: "Elena Wang", when: "May 01, 2026 14:05" },
  ],

  quickQueues: [
    { label: "Pending Tenant Overrides", count: 12, badgeColor: "bg-rose-100 text-rose-700 font-bold" },
    { label: "Pending Approvals", count: 1, badgeColor: "bg-amber-100 text-amber-700 font-bold" },
    { label: "Risks Requiring Review", count: 2, badgeColor: "bg-rose-100 text-rose-700 font-bold" },
    { label: "Exceptions Requiring Action", count: 3, badgeColor: "bg-amber-100 text-amber-700 font-bold" },
    { label: "Modules Pending Update", count: 6, badgeColor: "bg-blue-100 text-blue-700 font-bold" },
  ]
};
