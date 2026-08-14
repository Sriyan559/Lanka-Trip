/**
 * Type definitions for Security, Authentication & Session Control (AD10)
 */

export type PolicyStatus = 'Active' | 'Inactive' | 'Pending' | 'Draft';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ProviderStatus = 'Healthy' | 'Warning' | 'Failed';
export type MethodStatus = 'Enabled' | 'Disabled' | 'Break-Glass';

export interface AuthenticationPolicyRecord {
  id: string;
  policyRef: string;
  policyName: string;
  type: string;
  tenant: string;
  environment: string;
  provider: string;
  authMethod: string;
  mfa: 'Yes' | 'No' | 'N/A';
  stepUp: 'Yes' | 'No' | 'N/A';
  session: string;
  deviceTrust: string;
  owner: string;
  compliance: number;
  risk: RiskLevel;
  status: PolicyStatus;
  lastUpdated: string;
}

export interface SelectedPolicyDetails {
  policyRef: string;
  policyName: string;
  ssoRequired: 'Yes' | 'No';
  mfaRequired: 'Yes' | 'No';
  phishingResistantPreferred: 'Yes' | 'No';
  stepUpForCriticalActions: 'Yes' | 'No';
  sessionDuration: string;
  idleTimeout: string;
  trustedDeviceRequired: 'Yes' | 'No';
  owner: string;
  status: PolicyStatus;
  compliance: number;
  riskLevel: RiskLevel;
}

export interface AuthenticationProviderRow {
  id: string;
  provider: string;
  protocol: string;
  users: number;
  mfaCoverage: number;
  mfaStatus: string;
  avgLatency: string;
  errorRate: string;
  status: ProviderStatus;
  connectivity: 'Connected' | 'Disconnected';
}

export interface SSODomainMappingRow {
  id: string;
  domain: string;
  users: number;
  coverage: number;
  status: 'Connected' | 'Pending' | 'Failed';
}

export interface MFAMethodRow {
  id: string;
  method: string;
  users: number;
  coverage: number;
  status: 'Enabled' | 'Disabled';
}

export interface MFAGapRow {
  id: string;
  userGroup: string;
  users: number;
  reason: string;
  priority: RiskLevel;
}

export interface StepUpPolicyRow {
  id: string;
  trigger: string;
  usersImpacted: number;
  status: 'Enabled' | 'Disabled';
}

export interface SessionPolicyRow {
  id: string;
  policy: string;
  usersImpacted: number;
  status: string;
}

export interface SessionLimitRow {
  id: string;
  trigger: string;
  count: number;
}

export interface HighRiskSessionRow {
  id: string;
  session: string;
  riskReason: string;
  count: number;
}

export interface SessionRevocationQueueRow {
  id: string;
  reason: string;
  sessions: number;
}

export interface DeviceTrustRuleRow {
  id: string;
  rule: string;
  status: 'Enabled' | 'Disabled';
}

export interface LoginProtectionRow {
  id: string;
  control: string;
  status: 'Enabled' | 'Disabled';
}

export interface AuthRiskSignalRow {
  id: string;
  signal: string;
  count: number;
}

export interface ServiceIdentityRow {
  id: string;
  serviceIdentities: number;
  activeCredentials: number;
  lastRotated: string;
  expiresIn: string;
}

export interface CertificateRow {
  id: string;
  activeCertificates: number;
  expiring30Days: number;
  expired: number;
  lastRotated: string;
}

export interface RecoveryControlRow {
  id: string;
  recoveryMethods: number;
  selfServiceRecovery: 'Enabled' | 'Disabled';
  recoveryApproval: 'Required' | 'Not Required';
  recoveryAttemptsLimit: number;
}

export interface PasswordPolicyRow {
  id: string;
  minimumLength: number;
  complexityRequired: 'Yes' | 'No';
  selfServiceReset: 'Yes' | 'No';
  passwordExpiryDays: number;
}

export interface EnterpriseAuthHealthRow {
  id: string;
  enterprise: string;
  overall: number;
  sso: number;
  mfa: number;
  sessions: number;
  deviceTrust: number;
  credential: number;
}

export interface GovernanceGateRow {
  id: string;
  gate: string;
  status: 'Passed' | 'Warning' | 'Failed';
  compliance: number;
}

export interface SecurityActivityRow {
  id: string;
  dateTime: string;
  event: string;
  actor: string;
  details: string;
}

export interface SecurityFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  policies: AuthenticationPolicyRecord[];
  selectedPolicy: SelectedPolicyDetails;
  providers: AuthenticationProviderRow[];
  ssoDomains: SSODomainMappingRow[];
  mfaMethods: MFAMethodRow[];
  mfaGaps: MFAGapRow[];
  stepUpPolicies: StepUpPolicyRow[];
  sessionPolicies: SessionPolicyRow[];
  sessionLimits: SessionLimitRow[];
  highRiskSessions: HighRiskSessionRow[];
  revocationQueue: SessionRevocationQueueRow[];
  deviceTrustRules: DeviceTrustRuleRow[];
  loginProtection: LoginProtectionRow[];
  riskSignals: AuthRiskSignalRow[];
  serviceIdentities: ServiceIdentityRow[];
  certificates: CertificateRow[];
  recoveryControls: RecoveryControlRow[];
  passwordPolicy: PasswordPolicyRow[];
  authHealthMatrix: EnterpriseAuthHealthRow[];
  governanceGates: GovernanceGateRow[];
  operationsGates: GovernanceGateRow[];
  recentActivity: SecurityActivityRow[];
  charts: {
    mfaCoverage: { name: string; value: number; color: string }[];
    activeSessions: { name: string; value: number; color: string }[];
    deviceTrust: { name: string; value: number; color: string }[];
    lockedAccounts: { name: string; value: number; color: string }[];
    securityReviews: { name: string; value: number; color: string }[];
    securityExceptions: { name: string; value: number; color: string }[];
    riskPortfolio: { name: string; value: number; color: string }[];
    healthTrend: { label: string; 'Overall Health': number; 'Privileged Sessions': number }[];
  };
}
