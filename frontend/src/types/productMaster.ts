export interface ProductKpi {
  id: string;
  seq: number;
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  iconName: string;
  filterKey: string;
  warningBorder?: boolean;
}

export interface ProductStatusTab {
  id: string;
  label: string;
  count: number;
}

export interface AdvancedFilterState {
  search: string;
  productStatus: string;
  approvalStatus: string;
  publicationStatus: string;
  complianceStatus: string;
  riskLevel: string;
  brand: string;
  supplier: string;
  category: string;
  subcategory: string;
  productType: string;
  businessUnit: string;
  variantReadiness: string;
  mediaReadiness: string;
  inventoryLinkage: string;
  duplicateRisk: string;
  brandAuthorization: string;
  batchEligibility: string;
  channelEligibility: string;
  countryOfOrigin: string;
  createdDate: string;
  updatedDate: string;
  assignedReviewer: string;
  dataCompleteness: string;
}

export interface QuickFilterChip {
  id: string;
  label: string;
  filterKey: string;
}

export interface ProductHealthScorecardMetric {
  label: string;
  percentage: number;
  status: 'good' | 'warning' | 'alert';
  tooltipText: string;
}

export interface ProductMasterRow {
  id: string;
  publicId: string;
  dbProductId: string;
  productName: string;
  variantInfo: string;
  sku: string;
  barcode: string;
  brand: string;
  supplier: string;
  category: string;
  subcategory: string;
  variantCount: number;
  completenessPercent: number;
  brandAuthStatus: 'Valid' | 'Pending' | 'Expired' | 'Rejected' | 'Unavailable';
  complianceStatus: 'Compliant' | 'Pending' | 'Non-Compliant' | 'Unavailable';
  mediaStatus: 'Link' | 'At Risk' | 'Missing';
  inventoryLinkStatus: 'Linked' | 'Unlinked' | 'Unavailable';
  publicationReadyStatus: 'Ready' | 'At Risk' | 'Blocked';
  channelAvailability: string;
  duplicateRisk: 'Low' | 'Medium' | 'High' | 'Unavailable';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Unavailable';
  approvalStatus: 'Approved' | 'Pending Approval' | 'Draft' | 'Rejected';
  productStatus: 'Active' | 'Draft' | 'Incomplete' | 'Archived' | 'Blocked';
  updatedAt: string;
  reviewer: string;
  thumbnail: string;
}

export interface ProductMasterManagementData {
  kpis: ProductKpi[];
  tabs: ProductStatusTab[];
  quickFilters: QuickFilterChip[];
  health: ProductHealthScorecardMetric[];
  products: ProductMasterRow[];
  pagination: { page: number; pageSize: number; total: number; lastPage: number };
  filterOptions: { categories: Array<{ id: number; name: string }>; suppliers: Array<{ id: number; name: string }>; countries: string[] };
  permissions: { canView: boolean; canManage: boolean; canExport: boolean; canImport: boolean };
  capabilities: { supportedBulkActions: string[]; unsupportedFields: Record<string, string>; liveTransport: 'polling' };
  generatedAt: string;
}

export interface PriorityAlertItem {
  id: string;
  name: string;
  count: number;
  severity: 'High' | 'Medium' | 'Low';
}

export interface IntelligenceSummaryItem {
  label: string;
  count: number;
  color?: string;
  percent?: number;
}

export interface ChannelPublicationReadinessRow {
  id: string;
  channel: string;
  eligible: number;
  published: number;
  missingMedia: number;
  pricingIssues: number;
  inventoryIssues: number;
  policyIssues: number;
  readinessPercent: number;
}

export interface RecentProductActivityItem {
  id: string;
  activity: string;
  product: string;
  performedBy: string;
  dateTime: string;
  result: 'Success' | 'Warning' | 'Failed';
}
