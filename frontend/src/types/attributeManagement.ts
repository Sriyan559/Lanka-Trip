export type AttributeDataType = "Text" | "Number" | "Boolean" | "Date" | "Select";
export type AttributeInputType = "Dropdown" | "Multi-select" | "Text" | "Number" | "Radio" | "Checkbox";
export type AttributeRiskLevel = "Low" | "Medium" | "High";
export type AttributeStatus = "Active" | "Draft" | "Pending Review" | "Deprecated" | "Retired";

export interface CatalogueAttribute {
  id: string;
  attributeName: string;
  attributeId: string;
  groupName: string;
  dataType: AttributeDataType;
  inputType: AttributeInputType;
  isRequired: boolean;
  isVariantGenerating: boolean;
  categoryCoveragePercent: number;
  productUsageCount: number;
  allowedValueCount: number;
  variantCount: number;
  validationRuleId: string | null;
  inheritance: string;
  channelEligibilityText: string;
  eligibleChannelsCount: number | null;
  totalChannelsCount: number | null;
  completenessPercent: number;
  issuesCount: number;
  riskLevel: AttributeRiskLevel;
  owner: string;
  updatedAt: string;
  definition?: string;
  allowedValues?: string[];
  validationLogic?: string;
  dependentAttributes?: string[];
  groupId?: string | null;
  categoryCount?: number;
  unit?: string | null;
  status?: string;
}

export interface AttributeGroupItem {
  id: string;
  groupName: string;
  attributeCount: number;
  readinessPercent: number;
}

export interface AttributeKpi {
  id: string;
  label: string;
  value: number | null;
  trend: string | null;
  trendUp: boolean | null;
  isWarning?: boolean;
  filterKey?: string;
  available?: boolean;
  reason?: string | null;
}

export interface VariantGenerationRule {
  id: string;
  ruleName: string;
  conditionText: string;
  resultType: string;
  status: "Active" | "Draft" | "Inactive";
}

export interface DuplicateAttributePair {
  id: string;
  attributeName: string;
  potentialDuplicatesCount: number;
  similarityPercent: number;
  attributeIds?: string[];
}

export interface AttributeQualityIssueItem {
  id: string;
  issueName: string;
  count: number;
  riskLevel: AttributeRiskLevel;
}

export interface AttributeActivity {
  id: string;
  activity: string;
  entityType: string;
  entityName: string;
  actionBy: string;
  dateTime: string;
  details: string;
  result: "Success" | "Failed" | "Pending";
}

export interface AttributeFilterState {
  searchQuery: string;
  statusTab: string;
  group: string;
  category: string;
  status: string;
  dataType: string;
  requiredStatus: string;
  variantGenerating: string;
  channelEligibility: string;
  riskLevel: string;
  owner: string;
  updatedDate: string;
}

export interface AttributeOption { id: string; name: string }
export interface AttributeTab { id: string; label: string; count: number | null; scope: string; available?: boolean }
export interface AttributeHealthMetric { label: string; value: number }
export interface AttributeAlert { id: string; label: string; count: number; severity: string; scope: string }
export interface AttributeStatusSummary { label: string; count: number }
export interface AttributeManagementData {
  kpis: AttributeKpi[];
  tabs: AttributeTab[];
  attributes: { data: CatalogueAttribute[]; currentPage: number; pageSize: number; total: number; lastPage: number };
  groups: AttributeGroupItem[];
  options: { groups: AttributeOption[]; categories: AttributeOption[]; dataTypes: string[]; statuses: string[]; owners: AttributeOption[]; channels: AttributeOption[] };
  health: { score: number; status: string; dimensions: AttributeHealthMetric[] };
  alerts: AttributeAlert[];
  statusSummary: AttributeStatusSummary[];
  variantReadiness: { ready: number; partial: number; blocked: number; invalid: number | null; total: number; available: boolean };
  coverageSummary: { productCoveragePercent: number; variantCoveragePercent: number; categoryCoveragePercent: number | null; channelCoveragePercent: number | null };
  lower: {
    healthScorecard: AttributeHealthMetric[];
    missingValues: Array<{ id: string; name: string; missing: number }>;
    categoryMatrix: Array<{ id: string; category: string; required: number; optional: number }>;
    variantRules: VariantGenerationRule[];
    channelReadiness: unknown[];
    validationStatus: unknown[];
    dependencies: unknown[];
    channelRequirements: unknown[];
    qualityIssues: AttributeAlert[];
    duplicateCandidates: DuplicateAttributePair[];
    activities: AttributeActivity[];
  };
  capabilities: Record<string, boolean | string>;
  lastSyncedAt: string;
  meta: { refreshIntervalSeconds: number };
}

export interface AttributeQuery {
  page: number;
  pageSize: number;
  search?: string;
  groupId?: string;
  categoryId?: string;
  status?: string;
  dataType?: string;
  required?: boolean;
  variantGenerating?: boolean;
  scope?: string;
  updatedFrom?: string;
  sort?: string;
  direction?: "asc" | "desc";
}

export interface AttributeMutationPayload {
  name: string;
  attribute_group_id?: number | null;
  data_type: string;
  input_type?: string;
  unit?: string | null;
  is_required: boolean;
  is_filterable?: boolean;
  is_variant_defining: boolean;
  status?: string;
  definition?: string;
  allowed_values?: string[];
  category_ids?: number[];
}
