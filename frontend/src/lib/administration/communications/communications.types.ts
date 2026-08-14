/**
 * Type definitions for Communications, Notifications & Template Management (AD09)
 */

export type ChannelType = 'Email' | 'SMS' | 'Push' | 'In-App' | 'Webhook';
export type RuleStatus = 'Active' | 'Inactive' | 'Pending' | 'Draft';
export type CriticalityLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type PriorityLevel = 'P1' | 'P2' | 'P3' | 'P4';
export type ProviderHealth = 'Healthy' | 'Degraded' | 'Failing';
export type VerificationStatus = 'Verified' | 'Expiring Soon' | 'Pending Verification' | 'Failed' | 'Disabled';

export interface NotificationRuleRecord {
  id: string;
  ruleRef: string;
  eventKey: string;
  recipientType: string;
  primaryChannel: ChannelType;
  secondaryChannel?: ChannelType;
  templateRef: string;
  primaryProvider: string;
  fallbackProvider?: string;
  owner: string;
  status: RuleStatus;
  criticality: CriticalityLevel;
  priority: PriorityLevel;
}

export interface SelectedRuleDetails {
  ruleRef: string;
  eventKey: string;
  domain: string;
  audience: string;
  primaryChannel: ChannelType;
  secondaryChannel?: ChannelType;
  templateRef: string;
  primaryProvider: string;
  fallbackProvider?: string;
  owner: string;
  status: RuleStatus;
  criticality: CriticalityLevel;
  priority: PriorityLevel;
}

export interface EventNotificationMappingRow {
  id: string;
  eventKey: string;
  recipient: string;
  channel: string;
  templateRef: string;
  primaryProvider: string;
  status: RuleStatus;
}

export interface NotificationTemplateRecord {
  id: string;
  templateName: string;
  ref: string;
  channel: ChannelType;
  domain: string;
  sourceLocale: string;
  variants: number;
  variables: number;
  owner: string;
  lastUpdated: string;
  status: RuleStatus;
}

export interface SelectedTemplateDetails {
  ref: string;
  channel: ChannelType;
  domain: string;
  sourceLocale: string;
  defaultVariables: number;
  owner: string;
  status: RuleStatus;
}

export interface TemplateVariableRow {
  id: string;
  variable: string;
  type: string;
  required: 'Yes' | 'No';
  sourceDomain: string;
  fallback: string;
  piiClass: string;
  validation: string;
  status: 'Active' | 'Deprecated';
}

export interface LocalizedVariantRow {
  id: string;
  locale: string;
  variantStatus: string;
  readiness: number;
  translationReview: string;
  fallback: string;
  status: 'Active' | 'Warning' | 'Pending';
}

export interface TemplateLocalizationCoverageRow {
  id: string;
  locale: string;
  enabledStatus: 'Yes' | 'No';
  readyStatus: 'Yes' | 'No';
  variablesValid: 'Yes' | 'No';
  readinessIndex: number;
  fallbackLocale: string;
  provider: string;
  status: 'Active' | 'Warning';
}

export interface TemplateGapRow {
  id: string;
  gapType: string;
  count: number;
  locale: string;
  fallback: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved';
}

export interface FallbackTargetRow {
  id: string;
  channel: ChannelType;
  primaryProvider: string;
  fallbackProvider: string;
}

export interface ProviderRegistryRow {
  id: string;
  provider: string;
  channel: ChannelType;
  environment: string;
  availability: string;
  latency: string;
  errorRate: string;
  health: ProviderHealth;
  primary: 'Yes' | 'No';
  fallback: 'Yes' | 'No';
  status: 'Active' | 'Inactive';
}

export interface SenderIdentityRow {
  id: string;
  channel: ChannelType;
  identity: string;
  domain: string;
  purpose: string;
  status: VerificationStatus;
  expiresOn: string;
  owner: string;
}

export interface IdentityExpiryRow {
  id: string;
  identity: string;
  channel: ChannelType;
  expiresOn: string;
  status: 'Expiring Soon' | 'Valid' | 'Failed';
}

export interface FailedDeliveryRow {
  id: string;
  failureReason: string;
  count: number;
  percentage: string;
}

export interface RetryQueueRow {
  id: string;
  window: string;
  count: number;
  percentage: string;
}

export interface DeliveryFailureByProviderRow {
  id: string;
  provider: string;
  failedCount: number;
  errorRate: string;
  topCause: string;
}

export interface RetryQueueByProviderRow {
  id: string;
  provider: string;
  queueCount: number;
  oldestAge: string;
}

export interface GovernanceGateRow {
  id: string;
  gate: string;
  status: 'Passed' | 'Warning' | 'Failed';
  lastEvaluated: string;
}

export interface ChannelReadinessRow {
  id: string;
  channel: ChannelType;
  templates: number;
  providers: number;
  routing: number;
  localization: number;
  readinessScore: number;
}

export interface RecentActivityRow {
  id: string;
  dateTime: string;
  action: string;
  templateRef: string;
  recipient: string;
  changedBy: string;
  details: string;
}

export interface DeadLetterRow {
  id: string;
  dlqId: string;
  event: string;
  channel: ChannelType;
  failureReason: string;
  age: string;
  status: 'Open' | 'Resolved';
}

export interface DeliveryWindowRow {
  id: string;
  channel: ChannelType;
  quietHours: string;
  status: 'Active' | 'Inactive';
}

export interface ExceptionRow {
  id: string;
  type: string;
  count: number;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved';
}

export interface CommunicationsFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  rules: NotificationRuleRecord[];
  selectedRule: SelectedRuleDetails;
  eventMappings: EventNotificationMappingRow[];
  templates: NotificationTemplateRecord[];
  selectedTemplate: SelectedTemplateDetails;
  templateVariables: TemplateVariableRow[];
  localizedVariants: LocalizedVariantRow[];
  localizationCoverage: TemplateLocalizationCoverageRow[];
  templateGaps: TemplateGapRow[];
  fallbackTargets: FallbackTargetRow[];
  providers: ProviderRegistryRow[];
  senderIdentities: SenderIdentityRow[];
  identityExpiries: IdentityExpiryRow[];
  failedDeliveries: FailedDeliveryRow[];
  retryQueue: RetryQueueRow[];
  deliveryFailures: DeliveryFailureByProviderRow[];
  retryQueueByProvider: RetryQueueByProviderRow[];
  governanceGates: GovernanceGateRow[];
  channelReadiness: ChannelReadinessRow[];
  recentActivity: RecentActivityRow[];
  deadLetterQueue: DeadLetterRow[];
  deliveryWindows: DeliveryWindowRow[];
  exceptions: ExceptionRow[];
  charts: {
    fallbackStatus: { name: string; value: number; color: string }[];
    senderIdentityStatus: { name: string; value: number; color: string }[];
    riskPortfolio: { name: string; value: number; color: string }[];
    templateActivity: { label: string; Created: number; Updated: number; Retired: number }[];
    providerHealth: { label: string; Email: number; SMS: number; Push: number }[];
  };
}
