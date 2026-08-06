export type CategoryStatus = 'Active' | 'Draft' | 'Review Required' | 'Archived';
export type CategoryRisk = 'Low' | 'Medium' | 'High';
export type ComplianceStatus = 'Configured' | 'Partial' | 'Missing';

export interface CategoryItem {
  id: string;
  categoryName: string;
  categoryId: string;
  hierarchyPath: string;
  level: number;
  parentCategory: string;
  activeProductsCount: number;
  childCategoriesCount: number;
  requiredAttributesCount: number;
  attributeCoveragePercent: number;
  channelEligibilityText: string;
  seoReadinessPercent: number;
  complianceStatus: ComplianceStatus;
  status: CategoryStatus;
  riskLevel: CategoryRisk;
  owner: string;
  updatedDate: string;
  slug: string;
  description?: string;
}

export interface HierarchyNode {
  id: string;
  name: string;
  productCount: number;
  level: number;
  children?: HierarchyNode[];
  isExpanded?: boolean;
}

export interface CategoryKpiItem {
  id: string;
  label: string;
  value: string | number;
  changeText?: string;
  isPositive?: boolean;
  filterKey: string;
}

export interface CategoryStatusTab {
  id: string;
  label: string;
  count: number;
}

export interface AttributeCoverageItem {
  categoryName: string;
  coveragePercent: number;
  statusText: 'Excellent' | 'Good' | 'Needs Work';
}

export interface ProductCoverageLevelItem {
  level: number;
  categoriesCount: number;
  activeProductsCount: number;
  avgPerCategory: number;
}

export interface ChannelEligibilityRow {
  channel: string;
  eligibleCount: number;
  partialCount: number;
  notEligibleCount: number;
}

export interface DuplicateCategoryPair {
  id: string;
  categoryA: string;
  categoryB: string;
  similarityPercent: number;
  risk: CategoryRisk;
  productsCount: number;
}

export interface UncategorizedQueueSummary {
  uncategorizedProducts: number;
  misclassifiedProducts: number;
  needsReassignment: number;
}

export interface CategoryActivityItem {
  id: string;
  action: string;
  categoryName: string;
  user: string;
  dateTime: string;
  result: 'Approved' | 'Pending' | 'Passed';
}

export interface CategoryComplianceRuleItem {
  id: string;
  ruleName: string;
  affectedCategoriesCount: number;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Inactive';
  complianceRatePercent: number;
}

export interface GovernanceAuditItem {
  id: string;
  event: string;
  categoryName: string;
  reviewer: string;
  dateTime: string;
  result: 'Approved' | 'Passed' | 'Reviewed';
}

export interface CategoryFilterState {
  searchQuery: string;
  department: string;
  parentCategory: string;
  categoryLevel: string;
  status: string;
  requiredAttributes: string;
  channelEligibility: string;
  complianceStatus: string;
  owner: string;
  updatedDate: string;
}
