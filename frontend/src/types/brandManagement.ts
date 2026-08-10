export type Availability = number | null;

export interface CatalogueBrand {
  id: string; brandName: string; brandId: string; slug: string; initials: string; logoPath: string | null;
  description: string | null; website: string | null; countryId: string | null; country: string; status: string;
  verificationStatus: "Verified" | "Unverified"; authorizationStatus: "Valid" | "Pending" | "Expired" | "Not Authorized";
  authorizationCount: number; territory: string; authorizationStartDate: string | null; authorizationExpiryDate: string | null;
  legalOwner: string; manufacturer: string; primarySupplier: string; activeProductsCount: Availability; categoriesCount: Availability;
  channelEligibility: string; eligibleChannelsCount: Availability; totalChannelsCount: Availability; complianceStatus: string;
  catalogueReadinessPercent: Availability; duplicateRisk: string; riskLevel: string; brandOwner: string; createdBy: string | null;
  updatedAt: string | null; archivedAt: string | null;
}
export interface BrandKpi { id: string; label: string; value: number | null; trend: number | null; filterKey: string; }
export interface BrandTab { id: string; label: string; count: number | null; }
export interface NamedOption { id: string; name: string; }
export interface DuplicateBrandPair { id: string; brandA: string; brandB: string; similarityPercent: number; risk: string; productsCount: number | null; }
export interface UnauthorizedBrandIncident { id: string; incidentId: string; brandName: string; channel: string; detectedDate: string; risk: string; }
export interface PriorityAuthorizationItem { id: string; brandName: string; authorizationType: string; status: string; expiresOn: string; priority: string; }
export interface BrandSupplierRelationship { id: string; supplierName: string; totalBrands: number; approvedAuthorizations: number; atRiskAuthorizations: number; }
export interface BrandActivity { id: string; activity: string; brandName: string; actionBy: string; dateTime: string; result: string; }
export interface BrandAnalytics {
  health: { verificationCoverage: Availability; authorizationReadiness: Availability; supplierMapping: Availability; logoCoverage: Availability };
  readiness: { ready: number; partial: number; notReady: number };
  authorizationSummary: Record<string, number>;
  supplierRelationships: BrandSupplierRelationship[]; duplicates: DuplicateBrandPair[]; activities: BrandActivity[];
}
export interface BrandCapabilities {
  canManage: boolean; canExport: boolean; canImport: boolean; canReviewAuthorizations: boolean; tenantScope: boolean;
  pendingVerification: boolean; conditionalAuthorization: boolean; expiryWarningWindow: boolean; ownership: boolean;
  products: boolean; categories: boolean; channels: boolean; compliance: boolean; unauthorizedUse: boolean; savedViews: boolean;
  merge: boolean; reason: string;
}
export interface BrandManagementData {
  kpis: BrandKpi[]; tabs: BrandTab[];
  brands: { data: CatalogueBrand[]; currentPage: number; pageSize: number; total: number; lastPage: number };
  options: { countries: NamedOption[]; suppliers: NamedOption[]; authorizationStatuses: string[] };
  analytics: BrandAnalytics; capabilities: BrandCapabilities; lastSyncedAt: string;
}
export interface BrandFilterState {
  searchQuery: string; statusTab: string; verificationStatus: string; authorizationStatus: string; brandOwner: string;
  supplier: string; country: string; channelEligibility: string; riskLevel: string; updatedDate: string;
}
