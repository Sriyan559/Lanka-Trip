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
  validationRuleId: string;
  inheritance: string;
  channelEligibilityText: string;
  eligibleChannelsCount: number;
  totalChannelsCount: number;
  completenessPercent: number;
  issuesCount: number;
  riskLevel: AttributeRiskLevel;
  owner: string;
  updatedAt: string;
  definition?: string;
  allowedValues?: string[];
  validationLogic?: string;
  dependentAttributes?: string[];
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
  value: string;
  trend: string;
  trendUp: boolean;
  isWarning?: boolean;
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
