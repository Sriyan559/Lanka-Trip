export interface CatalogueKpi {
  id: string;
  seq: number;
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  iconName: string;
  filterKey: string;
}

export interface BusinessContextFilter {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  salesChannel: string;
  region: string;
  currency: string;
  dateRange: string;
}

export interface HealthMetric {
  label: string;
  value: number;
}

export interface CatalogueAlert {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  category: string;
}

export interface StatusSummaryItem {
  label: string;
  count: number;
  color: string;
}

export interface SlaSummaryItem {
  stage: string;
  withinSlaPercent: number;
  breachedCount: number;
}

export interface InventoryRiskSummaryItem {
  label: string;
  count: number;
  color: string;
}

export interface QuickQueueItem {
  id: string;
  label: string;
  count: number;
  filterKey: string;
}

export interface GrowthTrendDataPoint {
  date: string;
  created: number;
  submitted: number;
  approved: number;
  rejected: number;
  published: number;
}

export interface CompositionDataItem {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

export interface HealthScorecardItem {
  label: string;
  percentage: number;
  status: 'good' | 'warning' | 'alert';
}

export interface ApprovalStageItem {
  id: string;
  label: string;
  count: number;
  iconName: string;
}

export interface ProductApprovalItem {
  id: string;
  submissionId: string;
  productName: string;
  brand: string;
  category: string;
  supplier: string;
  completeness: number;
  brandAuthStatus: 'Valid' | 'Pending' | 'Expired' | 'Rejected';
  complianceStatus: 'Valid' | 'Pending' | 'Review';
  risk: 'High' | 'Medium' | 'Low';
  submittedDate: string;
  slaDays: number;
  reviewer: string;
  status: string;
  thumbnail: string;
}

export interface QualityIssueItem {
  id: string;
  title: string;
  count: number;
  severity: 'High' | 'Medium' | 'Low';
  iconName: string;
}

export interface CompletenessSummaryItem {
  label: string;
  percentage: number;
}

export interface CategoryGapItem {
  name: string;
  count: number;
}

export interface CategoryCoverageData {
  totalCategories: number;
  activeCategories: number;
  emptyCategories: number;
  productsMissingCategory: number;
  categoriesRequiringReview: number;
  topCategoryGaps: CategoryGapItem[];
}

export interface BrandCoverageData {
  totalBrands: number;
  verifiedBrands: number;
  pendingVerification: number;
  unauthorizedBrandUse: number;
  productsMissingBrand: number;
  expiringAuthorization: number;
}

export interface InventoryBatchItem {
  id: string;
  batchId: string;
  batchName: string;
  productName: string;
  supplier: string;
  warehouse: string;
  availableQty: number;
  expiryDate: string;
  daysRemaining: number;
  stockStatus: 'Low Stock' | 'In Stock' | 'Out of Stock' | 'Near Expiry';
  qualityStatus: 'Active' | 'Quarantined' | 'Expired';
  risk: 'High' | 'Medium' | 'Low';
}

export interface ExpiryExposureRange {
  range: string;
  qty: number;
  percentage: number;
  color: string;
}

export interface ChannelReadinessItem {
  id: string;
  channel: string;
  readinessPercent: number;
  eligibleCount: number;
  blockedCount: number;
  mediaIssuesCount: number;
  pricingIssuesCount: number;
  policyIssuesCount: number;
}

export interface RecentActivityItem {
  id: string;
  action: string;
  productRecord: string;
  performedBy: string;
  dateTime: string;
  businessContext: string;
  result: 'Approved' | 'Authorized' | 'Merged' | 'Quarantined' | 'Recall Initiated' | 'Published';
}
