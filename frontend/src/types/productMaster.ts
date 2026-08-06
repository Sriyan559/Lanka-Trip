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
  brandAuthStatus: 'Valid' | 'Pending' | 'Expired' | 'Rejected';
  complianceStatus: 'Compliant' | 'Pending' | 'Non-Compliant';
  mediaStatus: 'Link' | 'At Risk' | 'Missing';
  inventoryLinkStatus: 'Linked' | 'Unlinked';
  publicationReadyStatus: 'Ready' | 'At Risk' | 'Blocked';
  channelAvailability: string;
  duplicateRisk: 'Low' | 'Medium' | 'High';
  riskLevel: 'Low' | 'Medium' | 'High';
  approvalStatus: 'Approved' | 'Pending Approval' | 'Draft' | 'Rejected';
  productStatus: 'Active' | 'Draft' | 'Incomplete' | 'Archived' | 'Blocked';
  updatedAt: string;
  reviewer: string;
  thumbnail: string;
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
