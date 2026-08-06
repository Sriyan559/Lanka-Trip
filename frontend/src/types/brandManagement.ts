export type BrandVerificationStatus = "Verified" | "Pending" | "Unverified";
export type BrandAuthorizationStatus = "Valid" | "Expiring Soon" | "Conditional" | "Expired" | "Pending";
export type BrandComplianceStatus = "Compliant" | "Needs Review" | "Non-Compliant";
export type BrandRiskLevel = "Low" | "Medium" | "High";

export interface CatalogueBrand {
  id: string;
  brandName: string;
  brandId: string;
  initials: string;
  legalOwner: string;
  manufacturer: string;
  primarySupplier: string;
  country: string;
  activeProductsCount: number;
  categoriesCount: number;
  verificationStatus: BrandVerificationStatus;
  authorizationStatus: BrandAuthorizationStatus;
  territory: string;
  channelEligibility: string; // e.g. "5 / 5"
  eligibleChannelsCount: number;
  totalChannelsCount: number;
  complianceStatus: BrandComplianceStatus;
  catalogueReadinessPercent: number;
  duplicateRisk: BrandRiskLevel;
  riskLevel: BrandRiskLevel;
  brandOwner: string;
  updatedAt: string;
  authorizationStartDate?: string;
  authorizationExpiryDate?: string;
  description?: string;
  website?: string;
}

export interface BrandKpi {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  isWarning?: boolean;
}

export interface DuplicateBrandPair {
  id: string;
  brandA: string;
  brandB: string;
  similarityPercent: number;
  risk: BrandRiskLevel;
  productsCount: number;
}

export interface UnauthorizedBrandIncident {
  id: string;
  incidentId: string;
  brandName: string;
  channel: string;
  detectedDate: string;
  risk: BrandRiskLevel;
}

export interface PriorityAuthorizationItem {
  id: string;
  brandName: string;
  authorizationType: string;
  status: BrandAuthorizationStatus;
  expiresOn: string;
  priority: BrandRiskLevel;
}

export interface BrandSupplierRelationship {
  id: string;
  supplierName: string;
  totalBrands: number;
  activeBrands: number;
  atRiskBrands: number;
  coveragePercent: number;
}

export interface BrandActivity {
  id: string;
  activity: string;
  brandName: string;
  actionBy: string;
  dateTime: string;
  result: "Success" | "Flagged" | "Pending";
}

export interface BrandAuditEvent {
  id: string;
  event: string;
  brandName: string;
  reviewer: string;
  dateTime: string;
  result: "Approved" | "Passed" | "Failed" | "Pending";
}

export interface BrandFilterState {
  searchQuery: string;
  statusTab: string;
  verificationStatus: string;
  authorizationStatus: string;
  brandOwner: string;
  supplier: string;
  country: string;
  channelEligibility: string;
  riskLevel: string;
  updatedDate: string;
}
