/**
 * Type definitions for Data Governance, Retention, Privacy & Administrative Data Controls (AD12)
 */

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ClassificationType = 'Personal' | 'Confidential' | 'Restricted' | 'Internal' | 'Public';
export type SensitivityLevel = 'Personal' | 'Restricted' | 'Sensitive' | 'Internal' | 'Public';
export type AssetStatus = 'Active' | 'Review' | 'Pending' | 'Archived';
export type ComplianceStatus = 'Compliant' | 'Review' | 'In Review' | 'Non-Compliant' | 'Not Assessed';

export interface DataAssetRecord {
  id: string;
  assetRef: string;
  assetName: string;
  dataDomain: string;
  businessUnit: string;
  classification: ClassificationType;
  sensitivity: SensitivityLevel;
  risk: RiskLevel;
  owner: string;
  dataOwner: string;
  steward: string;
  retentionPolicy: string;
  retention: string;
  residency: string;
  status: AssetStatus;
}

export interface SelectedDataAssetDetails {
  assetRef: string;
  assetName: string;
  domain: string;
  businessUnit: string;
  classification: ClassificationType;
  sensitivity: SensitivityLevel;
  riskLevel: RiskLevel;
  dataOwner: string;
  steward: string;
  primaryPurpose: string;
  retentionPolicy: string;
  retention: string;
  retentionStatus: 'Active' | 'Pending' | 'Archived';
  residency: string;
  residencyConstraints: string;
  privacyStatus: ComplianceStatus;
  riskScore: number;
  status: 'Excellent' | 'Good' | 'Warning';
  ownerName: string;
  stewardName: string;
  reviewFrequency: string;
  lastReviewed: string;
  nextReview: string;
}

export interface DataClassificationMatrixRow {
  id: string;
  classification: string;
  p: number;
  c: number;
  r: number;
  total: number;
}

export interface DataDomainPortfolioRow {
  id: string;
  domain: string;
  count: number;
  percentage: string;
}

export interface OwnershipStewardshipRow {
  id: string;
  role: string;
  assigned: number;
  coverage: number;
}

export interface DataPurposeRow {
  id: string;
  purposeCategory: string;
  assets: number;
  compliance: ComplianceStatus;
}

export interface RetentionPolicyRow {
  id: string;
  policyRef: string;
  policyName: string;
  assets: number;
  retention: string;
}

export interface RetentionScheduleRow {
  id: string;
  policyRef: string;
  asset: string;
  retentionDue: string;
  action: 'Archive' | 'Review' | 'Dispose' | 'Pending';
}

export interface RetentionBreachRow {
  id: string;
  asset: string;
  breachType: string;
  daysOverdue: number;
  severity: RiskLevel;
}

export interface ArchivalPortfolioRow {
  id: string;
  archiveType: string;
  assets: number;
  size: string;
  lastArchived: string;
}

export interface DataDisposalQueueRow {
  id: string;
  asset: string;
  disposalType: string;
  scheduledDate: string;
  status: 'Pending' | 'Scheduled' | 'Review';
}

export interface GovernanceHoldRow {
  id: string;
  holdType: string;
  assets: number;
  reason: string;
  expiryOn: string;
}

export interface PrivacyControlRow {
  id: string;
  control: string;
  status: 'Enabled' | 'Review' | 'Disabled';
}

export interface PersonalDataAssetRow {
  id: string;
  category: string;
  assets: number;
  percentage: string;
}

export interface DataMinimizationReviewRow {
  id: string;
  status: ComplianceStatus;
  assets: number;
  percentage: string;
}

export interface ResidencyLocationRow {
  id: string;
  location: string;
  assets: number;
  percentage: string;
  residencyStatus: 'Compliant' | 'Review' | 'Restricted';
}

export interface SharingControlsRow {
  id: string;
  sharingType: string;
  agreements: number;
  compliance: number;
  exceptions: number;
}

export interface SourceDataEndpointRow {
  id: string;
  source: string;
  status: 'Connected' | 'Passed' | 'Review' | 'Disabled';
}

export interface DataAccessGovernanceRow {
  id: string;
  controlArea: string;
  status: ComplianceStatus;
  coverage: number;
}

export interface DataGovernanceReviewRow {
  id: string;
  reviewType: string;
  due: number;
  overdue: number;
  completed: number;
}

export interface GovernanceActivityRow {
  id: string;
  time: string;
  activity: string;
  assetDomain: string;
  performedBy: string;
  status: 'Success' | 'Warning' | 'Alert';
}

export interface GovernanceGateRow {
  id: string;
  gate: string;
  status: 'Passed' | 'Warning' | 'Failed';
}

export interface DataGovernanceFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  dataAssets: DataAssetRecord[];
  selectedAsset: SelectedDataAssetDetails;
  classificationMatrix: DataClassificationMatrixRow[];
  domainPortfolio: DataDomainPortfolioRow[];
  ownershipStewardship: OwnershipStewardshipRow[];
  dataPurposes: DataPurposeRow[];
  retentionPolicies: RetentionPolicyRow[];
  retentionSchedule: RetentionScheduleRow[];
  retentionBreaches: RetentionBreachRow[];
  archivalPortfolio: ArchivalPortfolioRow[];
  disposalQueue: DataDisposalQueueRow[];
  governanceHolds: GovernanceHoldRow[];
  privacyControls: PrivacyControlRow[];
  personalDataAssets: PersonalDataAssetRow[];
  minimizationReview: DataMinimizationReviewRow[];
  residencyLocations: ResidencyLocationRow[];
  sharingControls: SharingControlsRow[];
  sourceEndpoints: SourceDataEndpointRow[];
  accessGovernance: DataAccessGovernanceRow[];
  governanceReviews: DataGovernanceReviewRow[];
  recentActivity: GovernanceActivityRow[];
  governanceGates: GovernanceGateRow[];
  charts: {
    retentionDisposalTrend: { label: string; 'Retention Due': number; Archived: number; Disposed: number }[];
    healthTrend: { label: string; 'Health Score': number }[];
    riskTrend: { label: string; 'High Risk': number; 'Medium Risk': number; 'Low Risk': number }[];
    aiAnalyticsDataUse: { name: string; value: number; color: string }[];
    governanceExceptions: { name: string; value: number; color: string }[];
    governanceRisks: { name: string; value: number; color: string }[];
  };
}
