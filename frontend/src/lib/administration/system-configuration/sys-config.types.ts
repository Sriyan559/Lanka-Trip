/**
 * Type definitions for System Configuration & Global Settings (AD07)
 */

export type ConfigurationScope = 'Platform Default' | 'Tenant' | 'Ecosystem' | 'Business Unit' | 'Channel' | 'Environment';
export type ConfigurationValueType = 'Duration' | 'Number' | 'Boolean' | 'Text' | 'Secret';
export type LifecycleState = 'Active' | 'Deprecated' | 'Pending';
export type ValidationStatus = 'Valid' | 'Warning' | 'Error';
export type DriftStatus = 'None' | 'Low' | 'Medium' | 'High';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ConfigurationRegistryItem {
  id: string;
  configKey: string;
  domain: string;
  scopeLevel: ConfigurationScope;
  valueType: ConfigurationValueType;
  lifecycleState: LifecycleState;
  validationStatus: ValidationStatus;
  driftStatus: DriftStatus;
  owner: string;
  prodReadiness: 'Ready' | 'Review' | 'Blocked';
  lastChanged: string;
  risk: RiskLevel;
}

export interface SelectedConfigurationDetails {
  configId: string;
  configKey: string;
  domain: string;
  scopeLevel: ConfigurationScope;
  valueType: ConfigurationValueType;
  description: string;
  lifecycleState: LifecycleState;
  validationStatus: ValidationStatus;
  productionReadiness: 'Ready' | 'Review' | 'Blocked';
  driftStatus: DriftStatus;
  lastChanged: string;
  riskLevel: RiskLevel;
  currentValue: string;
  effectiveValue: string;
  overrideSource: string;
  owner: string;
}

export interface EffectiveValueNode {
  scope: string;
  value: string;
  isEffective?: boolean;
}

export interface DomainSummaryRow {
  domain: string;
  keys: number;
  overrides: number;
  warnings: number;
  critical: number;
  drift: number;
  owner: string;
  health: number;
}

export interface PlatformDefaultOverrideRow {
  configKey: string;
  scope: string;
  value: string;
  type: ConfigurationValueType;
  lastChanged: string;
  risk: RiskLevel;
}

export interface ScopedOverrideRow {
  configKey: string;
  scope: string;
  count: number;
  type: ConfigurationValueType;
  risk: RiskLevel;
}

export interface OverrideSpreadRow {
  domain: string;
  keys: number;
  overrides: number;
  highRisk: number;
}

export interface EnvironmentMatrixRow {
  domain: string;
  dev: ValidationStatus;
  test: ValidationStatus;
  staging: ValidationStatus;
  pilot: ValidationStatus;
  prod: ValidationStatus;
}

export interface ConfigurationDriftRow {
  configKey: string;
  drift: DriftStatus;
  environment: string;
  lastDetected: string;
}

export interface RecentActivityRow {
  dateTime: string;
  action: string;
  configKey: string;
  changedBy: string;
  scope: string;
  environment: string;
  details: string;
}

export interface GovernanceGateRow {
  gate: string;
  status: 'Pass' | 'Fail' | 'Warning' | 'Pending';
  lastChecked: string;
}

export interface SysConfigFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  registry: ConfigurationRegistryItem[];
  selectedConfig: SelectedConfigurationDetails;
  effectiveFlow: {
    nodes: EffectiveValueNode[];
    resolution: {
      source: string;
      appliedBy: string;
      overrideType: string;
      priority: string;
      appliedOn: string;
      lastEvaluated: string;
      lifecycleState: LifecycleState;
      validationStatus: ValidationStatus;
      productionReadiness: string;
      driftStatus: DriftStatus;
    };
  };
  domainSummary: DomainSummaryRow[];
  platformDefaults: PlatformDefaultOverrideRow[];
  scopedOverrides: ScopedOverrideRow[];
  overrideSpread: OverrideSpreadRow[];
  environmentMatrix: EnvironmentMatrixRow[];
  driftAnalysis: ConfigurationDriftRow[];
  recentActivity: RecentActivityRow[];
  healthMatrix: { category: string; validation: number; drift: number; readiness: number; ownership: number; risk: string }[];
  governanceGates: GovernanceGateRow[];
}
