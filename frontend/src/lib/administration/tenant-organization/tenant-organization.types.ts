/**
 * Type definitions for Tenant, Ecosystem & Organizational Structure (AD05)
 */

export type EntityType = 'Tenant' | 'Ecosystem' | 'Organization' | 'Business Unit' | 'Legal Entity' | 'Operating Entity';
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type EntityStatus = 'Active' | 'Inactive' | 'Draft' | 'Proposed' | 'Under Review' | 'Deprecated' | 'Retired';

export interface TenantOrgRegistryItem {
  id: string;
  name: string;
  type: EntityType;
  keyRef: string;
  ecosystem: string;
  region: string;
  country: string;
  legalEntity: string;
  operatingEntity: string;
  parentOrg: string;
  status: EntityStatus;
  health: number; // e.g. 100%
  risk: RiskLevel;
  lastUpdated: string;
}

export interface SelectedTenantDetails {
  tenantRef: string;
  ecosystemKey: string;
  organizationKey: string;
  publicRef: string;
  environment: string;
  legalEntityCount: number;
  operatingEntityCount: number;
  adminScope: string;
  regionCountry: string;
  healthScore: number;
  lastEvaluated: string;
}

export interface OrgHierarchyNodeItem {
  id: string;
  name: string;
  type: EntityType;
  status: EntityStatus;
  children?: OrgHierarchyNodeItem[];
}

export interface HierarchyRelationshipRow {
  id: string;
  relationshipType: string;
  count: number;
  valid: number;
  conflicts: number;
  orphaned: number;
  total: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  subCount1: number; // e.g. Ecosystems / Organizations
  subCount2: number; // e.g. Organizations / Entities
  health: number;
}

export interface LegalEntityItem {
  id: string;
  key: string;
  name: string;
  country: string;
  status: EntityStatus;
  health: number;
}

export interface OperatingEntityItem {
  id: string;
  key: string;
  name: string;
  country: string;
  status: EntityStatus;
  health: number;
}

export interface OwnershipRecordRow {
  id: string;
  ownerType: string;
  total: number;
  inherited: number;
  direct: number;
  overridden: number;
  unassigned: number;
}

export interface PendingOrgChangeRow {
  id: string;
  changeType: string;
  count: number;
  high: number;
  medium: number;
  low: number;
}

export interface StructureReviewRow {
  id: string;
  reviewType: string;
  dueDate: string;
  status: 'Scheduled' | 'In Progress' | 'Overdue' | 'Completed';
  health: number;
}

export interface OrgExceptionRow {
  id: string;
  exceptionType: string;
  count: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface OrgRiskRow {
  id: string;
  riskCategory: string;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface OrgActivityItem {
  id: string;
  dateTime: string;
  entity: string;
  type: string;
  action: string;
  performedBy: string;
  impact: string;
  status: 'Success' | 'Warning' | 'Failed' | 'Pending';
}

export interface TenantOrgFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string }>;
  registry: TenantOrgRegistryItem[];
  selectedTenant: SelectedTenantDetails;
  hierarchyRoot: OrgHierarchyNodeItem;
  relationships: HierarchyRelationshipRow[];
  integrity: {
    valid: number;
    conflicts: number;
    orphaned: number;
    circular: number;
  };
  tenantPortfolio: PortfolioItem[];
  ecosystemPortfolio: PortfolioItem[];
  legalEntities: LegalEntityItem[];
  operatingEntities: OperatingEntityItem[];
  scopeInheritance: {
    inherited: number;
    direct: number;
    overridden: number;
    coverage: number;
  };
  ownershipRecords: OwnershipRecordRow[];
  ownershipCoverage: {
    fullyOwned: number;
    partiallyOwned: number;
    unowned: number;
    coverage: number;
  };
  lifecycleMatrix: {
    stage: string;
    tenants: number;
    ecosystems: number;
    organizations: number;
  }[];
  pendingChanges: PendingOrgChangeRow[];
  structureReviews: StructureReviewRow[];
  exceptions: OrgExceptionRow[];
  risks: OrgRiskRow[];
  governanceGates: { gate: string; status: 'Passed' | 'Warning' | 'Failed' }[];
  healthMatrix: {
    category: string;
    tenants: number;
    ecosystems: number;
    organizations: number;
    overall: number;
  }[];
  recentActivity: OrgActivityItem[];
}
