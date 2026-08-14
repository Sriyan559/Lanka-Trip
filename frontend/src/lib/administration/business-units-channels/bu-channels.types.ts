/**
 * Type definitions for Business Units, Channels & Operating Scope (AD06)
 */

export type OperatingEntityType = 'Business Unit' | 'Operational Group' | 'Channel' | 'Sub-unit';
export type LifecycleState = 'Active' | 'Pilot' | 'Restricted' | 'Inactive';
export type EligibilityState = 'Eligible' | 'Conditional' | 'Blocked';
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type ChangeStatus = 'Pending' | 'Approved' | 'Rejected' | 'Scheduled';

export interface BuChannelRegistryItem {
  id: string;
  name: string;
  type: OperatingEntityType;
  primaryOwner: string;
  lifecycleState: LifecycleState;
  eligibilityState: EligibilityState;
  productionReadiness: string;
  scopeType: string;
  inheritedFrom: string;
  sharedChannel: 'Yes' | 'No';
  ownershipMode: string;
  restrictionSources: string;
}

export interface SelectedBuDetails {
  publicRef: string;
  buKey: string;
  parentOrg: string;
  ecosystem: string;
  lifecycleState: LifecycleState;
  productionReadiness: string;
  reviewState: string;
  lastScopeChange: string;
}

export interface BuTopologyNodeItem {
  id: string;
  name: string;
  type: OperatingEntityType;
  status: string;
  children?: BuTopologyNodeItem[];
}

export interface BuPortfolioRow {
  lifecycle: string;
  units: number;
  active: number;
  pilot: number;
  restricted: number;
  inactive: number;
}

export interface ChannelPortfolioRow {
  type: string;
  channels: number;
  active: number;
  shared: number;
}

export interface RegionalAvailabilityRow {
  region: string;
  countries: number;
  units: number;
  channels: number;
  scopes: number;
}

export interface CountryRestrictionRow {
  country: string;
  restrictedUnits: number;
  restrictedChannels: number;
  restrictions: string;
}

export interface EnvironmentMatrixRow {
  environment: string;
  units: number;
  active: number;
  channels: number;
  availability: string;
}

export interface SharedChannelPortfolioRow {
  bu: string;
  channels: number;
  shared: number;
}

export interface SharedOperatingRelationshipRow {
  id: string;
  primaryOwner: string;
  participatingBu: string;
  connections: number;
  sharedChannels: number;
  status: 'Active' | 'Warning' | 'Restricted';
}

export interface PendingScopeChangeRow {
  id: string;
  change: string;
  count: number;
  owner: string;
  impact: string;
  requestedBy: string;
  targetDate: string;
  status: ChangeStatus;
}

export interface ScopeChangeImpactRow {
  riskType: string;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface ScopeConflictRow {
  id: string;
  conflictType: string;
  description: string;
  businessUnit: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  risk: RiskLevel;
  status: string;
}

export interface OperatingExceptionRow {
  id: string;
  exceptionType: string;
  count: number;
  trend: number[];
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface OperatingRiskRow {
  id: string;
  riskType: string;
  count: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface OperatingActivityItem {
  id: string;
  dateTime: string;
  action: string;
  entity: string;
  performedBy: string;
  status: 'Success' | 'Warning' | 'Failed' | 'Pending';
}

export interface BuChannelsFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  registry: BuChannelRegistryItem[];
  selectedBu: SelectedBuDetails;
  topologyRoot: BuTopologyNodeItem;
  scopeInheritance: {
    inherited: number;
    direct: number;
    conditional: number;
    blocked: number;
    total: number;
  };
  buPortfolio: BuPortfolioRow[];
  channelPortfolio: ChannelPortfolioRow[];
  regionalAvailability: RegionalAvailabilityRow[];
  countryRestrictions: CountryRestrictionRow[];
  environmentMatrix: EnvironmentMatrixRow[];
  eligibility: {
    eligible: number;
    conditional: number;
    blocked: number;
    total: string;
  };
  channelReadiness: {
    high: number;
    medium: number;
    low: number;
    total: string;
  };
  sharedChannelPortfolio: SharedChannelPortfolioRow[];
  sharedRelationships: SharedOperatingRelationshipRow[];
  ownership: {
    owned: number;
    shared: number;
    unassigned: number;
    coverage: string;
  };
  pendingChanges: PendingScopeChangeRow[];
  changeImpact: ScopeChangeImpactRow[];
  conflicts: ScopeConflictRow[];
  exceptions: OperatingExceptionRow[];
  risks: OperatingRiskRow[];
  healthMatrix: {
    category: string;
    poor: number;
    fair: number;
    good: number;
    excellent: number;
  }[];
  recentActivity: OperatingActivityItem[];
}
