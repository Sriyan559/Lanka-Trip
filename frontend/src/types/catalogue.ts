export interface CatalogueKpi {
  id: string;
  seq: number;
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  iconName: string;
  filterKey: string;
  availability?: 'available' | 'unavailable';
  reason?: string;
  rawValue?: number | null;
  changePercent?: number | null;
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
  count?: number;
  actionRoute?: string;
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
  count: number | null;
  color: string;
  availability?: string;
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
  risk: 'High' | 'Medium' | 'Low' | 'Unavailable';
  submittedDate: string;
  slaDays: number | null;
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
  result: string;
}

export interface GrowthTrendResponse { granularity: string; points: GrowthTrendDataPoint[]; }
export interface CompositionResponse { availability: 'available' | 'unavailable'; dimension: string; total: number; items: CompositionDataItem[]; reason?: string; }
export interface PriorityApprovalsResponse { items: ProductApprovalItem[]; pagination: { page: number; pageSize: number; total: number; lastPage: number }; }
export interface CatalogueCommandCenterData {
  context: { defaults: BusinessContextFilter; options: Record<string, Array<{ value: string; label: string }>>; dateFrom: string; dateTo: string; unsupportedFilters: string[] };
  kpis: CatalogueKpi[];
  trend: GrowthTrendResponse;
  composition: CompositionResponse;
  health: { availability: string; score: number; state: string; metrics: Record<string, number> };
  healthScorecard: HealthScorecardItem[];
  alerts: CatalogueAlert[];
  approvalPipeline: ApprovalStageItem[];
  approvalStatusSummary: StatusSummaryItem[];
  slaSummary: { availability: string; reason?: string; items: SlaSummaryItem[] };
  inventoryRiskSummary: InventoryRiskSummaryItem[];
  quickQueues: QuickQueueItem[];
  priorityApprovals: PriorityApprovalsResponse;
  quality: { issues: QualityIssueItem[]; completeness: CompletenessSummaryItem[]; categoryCoverage: CategoryCoverageData; brandCoverage: BrandCoverageData };
  inventory: { availability: string; availableStock: number; lowStockProducts: number; batches: InventoryBatchItem[]; expiryExposure: ExpiryExposureRange[]; channels: ChannelReadinessItem[]; reason?: string };
  recentActivity: RecentActivityItem[];
  permissions: { canExport?: boolean; canManage?: boolean; canImport?: boolean };
  meta: { generatedAt: string; timezone: string; refreshIntervalSeconds: number };
}
