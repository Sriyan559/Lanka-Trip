import { CommunicationsFullData } from './communications.types';

export const COMMUNICATIONS_METADATA = {
  id: 'AD09',
  name: 'Communications, Notifications & Template Management',
  route: '/admin/administration/communications',
  module: 'Administration',
  domain: 'Communications',
};

export const COMMUNICATIONS_TABS = [
  { id: 'overview', label: 'Communications Overview' },
  { id: 'rules', label: 'Notification Rules' },
  { id: 'templates', label: 'Templates' },
  { id: 'localized-variants', label: 'Localized Variants' },
  { id: 'providers', label: 'Providers' },
  { id: 'routing', label: 'Routing' },
  { id: 'sender-identities', label: 'Sender Identities' },
  { id: 'delivery-health', label: 'Delivery Health' },
  { id: 'failures-retries', label: 'Failures & Retries' },
  { id: 'fallback-resilience', label: 'Fallback & Resilience' },
  { id: 'quick-filters', label: 'Quick Filters' },
  { id: 'critical-notifications', label: 'Critical Notifications' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const COMMUNICATIONS_FILTERS = [
  { id: 'channel', label: 'Channel' },
  { id: 'provider', label: 'Provider (Primary)' },
  { id: 'fallback-provider', label: 'Provider (Secondary / Fallback)' },
  { id: 'template', label: 'Template' },
  { id: 'environment', label: 'Environment' },
  { id: 'locale', label: 'Locale' },
  { id: 'delivery-status', label: 'Delivery Status' },
  { id: 'provider-health', label: 'Provider Health' },
  { id: 'template-status', label: 'Template Status' },
  { id: 'risk-level', label: 'Risk Level' },
  { id: 'owner', label: 'Owner' },
];

export const QUICK_FILTERS = [
  { id: 'healthy', label: 'Healthy' },
  { id: 'warning', label: 'Warning' },
  { id: 'failed', label: 'Failed' },
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push' },
  { id: 'in-app', label: 'In-App' },
  { id: 'webhook', label: 'Webhook' },
  { id: 'missing-localization', label: 'Missing Localization' },
  { id: 'retry-queue', label: 'Retry Queue' },
  { id: 'fallback-active', label: 'Fallback Active' },
  { id: 'provider-degraded', label: 'Provider Degraded' },
  { id: 'critical-notification', label: 'Critical Notification' },
  { id: 'review-due', label: 'Review Due' },
  { id: 'needs-attention', label: 'Needs Attention' },
];

export const DEFAULT_COMMUNICATIONS_DATA: CommunicationsFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    notificationRegistry: 'Connected',
    templateRegistry: 'Connected',
    providerRegistry: 'Connected',
    localizationRegistry: 'Connected',
    routingEngine: 'Healthy',
    retryEngine: 'Healthy',
    eventRegistry: 'Connected',
    auditService: 'Connected',
    dataCompleteness: '99%',
    lastExported: 'Aug 13, 2024 4:05 AM',
    accessScope: 'Assigned Administration Scope',
  },

  kpis: {
    activeTemplates: { value: 126, trend: '4%', trendDirection: 'up', sparkline: [118, 120, 122, 124, 125, 126] },
    notificationRules: { value: 84, trend: '2%', trendDirection: 'up', sparkline: [80, 81, 82, 83, 84, 84] },
    providers: { value: 11, trend: '0%', trendDirection: 'up', sparkline: [11, 11, 11, 11, 11, 11] },
    activeChannels: { value: 6, trend: '0%', trendDirection: 'up', sparkline: [6, 6, 6, 6, 6, 6] },
    deliveries24h: { value: '186K', trend: '12%', trendDirection: 'up', sparkline: [160, 168, 172, 178, 182, 186] },
    deliverySuccess: { value: '98.7%', trend: '0.4%', trendDirection: 'up', sparkline: [98.1, 98.3, 98.4, 98.5, 98.6, 98.7] },
    failedDeliveries: { value: '1,842', trend: '8%', trendDirection: 'down', sparkline: [2100, 2050, 1980, 1910, 1870, 1842] },
    retryQueue: { value: 742, trend: '5%', trendDirection: 'down', sparkline: [890, 840, 810, 780, 760, 742] },
    templateGaps: { value: 5, trend: '20%', trendDirection: 'down', sparkline: [8, 7, 7, 6, 5, 5] },
    communicationsHealth: { value: '96 / 100', trend: '2 pts', trendDirection: 'up', sparkline: [92, 93, 94, 95, 95, 96] },
    emailTemplates: { value: 52, trend: '2%', trendDirection: 'up', sparkline: [48, 49, 50, 51, 51, 52] },
    smsTemplates: { value: 28, trend: '0%', trendDirection: 'up', sparkline: [28, 28, 28, 28, 28, 28] },
    pushTemplates: { value: 18, trend: '5%', trendDirection: 'up', sparkline: [16, 17, 17, 18, 18, 18] },
    inAppTemplates: { value: 14, trend: '0%', trendDirection: 'up', sparkline: [14, 14, 14, 14, 14, 14] },
    webhookNotifications: { value: 9, trend: '0%', trendDirection: 'up', sparkline: [9, 9, 9, 9, 9, 9] },
    localizedVariants: { value: 312, trend: '6%', trendDirection: 'up', sparkline: [290, 298, 302, 308, 310, 312] },
    fallbackRoutes: { value: 18, trend: '0%', trendDirection: 'up', sparkline: [18, 18, 18, 18, 18, 18] },
    reviewsDue: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [6, 6, 5, 5, 4, 4] },
    communicationExceptions: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
  },

  rules: [
    { id: '1', ruleRef: 'NR-ORD-001', eventKey: 'order.placed', recipientType: 'Customer', primaryChannel: 'Email', secondaryChannel: 'SMS', templateRef: 'TMP-ORD-001', primaryProvider: 'Provider Email', fallbackProvider: 'Provider Email', owner: 'Orders Ops', status: 'Active', criticality: 'Critical', priority: 'P1' },
    { id: '2', ruleRef: 'NR-SHP-002', eventKey: 'shipment.updated', recipientType: 'Customer', primaryChannel: 'Email', secondaryChannel: 'SMS', templateRef: 'TMP-SHP-002', primaryProvider: 'Provider Email', fallbackProvider: 'Provider SMS', owner: 'Logistics Ops', status: 'Active', criticality: 'High', priority: 'P2' },
    { id: '3', ruleRef: 'NR-PAY-FAIL-001', eventKey: 'payment.failed', recipientType: 'Customer + Finance', primaryChannel: 'Email', secondaryChannel: 'SMS', templateRef: 'TMP-PAY-FAIL-001', primaryProvider: 'Provider Email', fallbackProvider: 'Provider SMS', owner: 'Payments Eng', status: 'Active', criticality: 'Critical', priority: 'P1' },
    { id: '4', ruleRef: 'NR-SEC-004', eventKey: 'password.reset', recipientType: 'All Users', primaryChannel: 'Email', secondaryChannel: 'SMS', templateRef: 'TMP-SEC-ALERT-001', primaryProvider: 'Provider Email', fallbackProvider: 'Provider Email', owner: 'Security Team', status: 'Active', criticality: 'Critical', priority: 'P1' },
    { id: '5', ruleRef: 'NR-LOY-005', eventKey: 'loyalty.earned', recipientType: 'Customer', primaryChannel: 'Push', secondaryChannel: 'In-App', templateRef: 'TMP-LOY-001', primaryProvider: 'Provider Push', fallbackProvider: 'Provider Push', owner: 'Loyalty Ops', status: 'Active', criticality: 'Low', priority: 'P4' },
  ],

  selectedRule: {
    ruleRef: 'NR-PAY-FAIL-001',
    eventKey: 'payment.failed',
    domain: 'Payments',
    audience: 'Customer + Finance Operations',
    primaryChannel: 'Email',
    secondaryChannel: 'SMS',
    templateRef: 'TMP-PAY-FAIL-001',
    primaryProvider: 'Provider Email',
    fallbackProvider: 'Provider SMS',
    owner: 'Payments Eng',
    status: 'Active',
    criticality: 'Critical',
    priority: 'P1',
  },

  eventMappings: [
    { id: 'm1', eventKey: 'order.placed', recipient: 'Customer', channel: 'Email, SMS', templateRef: 'TMP-ORD-001', primaryProvider: 'Provider Email', status: 'Active' },
    { id: 'm2', eventKey: 'shipment.updated', recipient: 'Customer', channel: 'Email, Push', templateRef: 'TMP-SHP-002', primaryProvider: 'Provider Email', status: 'Active' },
    { id: 'm3', eventKey: 'payment.failed', recipient: 'Customer + Finance', channel: 'Email, SMS', templateRef: 'TMP-PAY-FAIL-001', primaryProvider: 'Provider Email', status: 'Active' },
    { id: 'm4', eventKey: 'password.reset', recipient: 'All Users', channel: 'Email, In-App', templateRef: 'TMP-SEC-ALERT-001', primaryProvider: 'Provider Email', status: 'Active' },
    { id: 'm5', eventKey: 'loyalty.earned', recipient: 'Customer', channel: 'Push', templateRef: 'TMP-LOY-001', primaryProvider: 'Provider Push', status: 'Active' },
  ],

  templates: [
    { id: 't1', templateName: 'Order Confirmation', ref: 'TMP-ORD-001', channel: 'Email', domain: 'Orders', sourceLocale: 'en-LK', variants: 6, variables: 12, owner: 'Orders Ops', lastUpdated: 'Aug 12, 2024', status: 'Active' },
    { id: 't2', templateName: 'Shipment Updates', ref: 'TMP-SHP-002', channel: 'Email', domain: 'Logistics', sourceLocale: 'en-LK', variants: 6, variables: 10, owner: 'Logistics Ops', lastUpdated: 'Aug 12, 2024', status: 'Active' },
    { id: 't3', templateName: 'Payment Failed Alert', ref: 'TMP-PAY-FAIL-001', channel: 'Email', domain: 'Finance', sourceLocale: 'en-LK', variants: 5, variables: 9, owner: 'Finance Ops', lastUpdated: 'Aug 12, 2024', status: 'Active' },
    { id: 't4', templateName: 'Security Alert', ref: 'TMP-SEC-ALERT-001', channel: 'Email', domain: 'Security', sourceLocale: 'en-LK', variants: 5, variables: 8, owner: 'Platform Eng', lastUpdated: 'Aug 12, 2024', status: 'Active' },
  ],

  selectedTemplate: {
    ref: 'TMP-PAY-FAIL-001',
    channel: 'Email',
    domain: 'Finance',
    sourceLocale: 'en-LK',
    defaultVariables: 9,
    owner: 'Finance Ops',
    status: 'Active',
  },

  templateVariables: [
    { id: 'tv1', variable: 'customer_name', type: 'String', required: 'Yes', sourceDomain: 'Customers', fallback: 'N/A', piiClass: 'None', validation: 'Max 100', status: 'Active' },
    { id: 'tv2', variable: 'order_reference', type: 'String', required: 'Yes', sourceDomain: 'Orders', fallback: 'N/A', piiClass: 'None', validation: 'Regex', status: 'Active' },
    { id: 'tv3', variable: 'amount', type: 'Decimal', required: 'Yes', sourceDomain: 'Payments', fallback: 'N/A', piiClass: 'None', validation: 'Number', status: 'Active' },
    { id: 'tv4', variable: 'currency', type: 'String', required: 'Yes', sourceDomain: 'Payments', fallback: 'N/A', piiClass: 'None', validation: 'ISO 4217', status: 'Active' },
    { id: 'tv5', variable: 'support_contact', type: 'String', required: 'No', sourceDomain: 'Support', fallback: 'N/A', piiClass: 'None', validation: 'Email', status: 'Active' },
  ],

  localizedVariants: [
    { id: 'lv1', locale: 'en-LK', variantStatus: 'Valid', readiness: 100, translationReview: 'Approved', fallback: 'en-LK', status: 'Active' },
    { id: 'lv2', locale: 'si-LK', variantStatus: 'Valid', readiness: 98, translationReview: 'Approved', fallback: 'en-LK', status: 'Active' },
    { id: 'lv3', locale: 'ta-LK', variantStatus: 'Valid', readiness: 95, translationReview: 'Approved', fallback: 'en-LK', status: 'Active' },
    { id: 'lv4', locale: 'en-AE', variantStatus: 'Pending Verification', readiness: 68, translationReview: 'In Review', fallback: 'en-LK', status: 'Warning' },
  ],

  localizationCoverage: [
    { id: 'lc1', locale: 'en-LK', enabledStatus: 'Yes', readyStatus: 'Yes', variablesValid: 'Yes', readinessIndex: 100, fallbackLocale: 'en-LK', provider: 'Primary', status: 'Active' },
    { id: 'lc2', locale: 'si-LK', enabledStatus: 'Yes', readyStatus: 'Yes', variablesValid: 'Yes', readinessIndex: 98, fallbackLocale: 'en-LK', provider: 'Primary', status: 'Active' },
    { id: 'lc3', locale: 'ta-LK', enabledStatus: 'Yes', readyStatus: 'Yes', variablesValid: 'Yes', readinessIndex: 95, fallbackLocale: 'en-LK', provider: 'Primary', status: 'Active' },
    { id: 'lc4', locale: 'en-IN', enabledStatus: 'Yes', readyStatus: 'Yes', variablesValid: 'Yes', readinessIndex: 92, fallbackLocale: 'en-LK', provider: 'Secondary', status: 'Active' },
    { id: 'lc5', locale: 'en-AE', enabledStatus: 'Yes', readyStatus: 'No', variablesValid: 'Yes', readinessIndex: 68, fallbackLocale: 'en-LK', provider: 'Secondary', status: 'Warning' },
  ],

  templateGaps: [
    { id: 'tg1', gapType: 'Missing Variants', count: 4, locale: 'en-AE, zh-CN', fallback: 'en-LK', severity: 'High', status: 'Open' },
    { id: 'tg2', gapType: 'Missing SMS Variants', count: 2, locale: 'si-LK', fallback: 'en-LK', severity: 'Medium', status: 'Open' },
    { id: 'tg3', gapType: 'Outdated Translation', count: 5, locale: 'si-LK, ta-LK', fallback: 'en-LK', severity: 'Medium', status: 'Open' },
    { id: 'tg4', gapType: 'Invalid Variables', count: 1, locale: 'en-AE', fallback: 'en-LK', severity: 'Low', status: 'Open' },
    { id: 'tg5', gapType: 'No Fallback Template', count: 1, locale: 'ar-AE', fallback: 'en-LK', severity: 'High', status: 'Open' },
  ],

  fallbackTargets: [
    { id: 'ft1', channel: 'Email', primaryProvider: 'Provider Email', fallbackProvider: 'Provider SMS' },
    { id: 'ft2', channel: 'SMS', primaryProvider: 'Provider SMS', fallbackProvider: 'Provider Email' },
    { id: 'ft3', channel: 'Push', primaryProvider: 'Provider Push', fallbackProvider: 'Provider Email' },
    { id: 'ft4', channel: 'In-App', primaryProvider: 'In-App Service', fallbackProvider: 'Provider Email' },
    { id: 'ft5', channel: 'Webhook', primaryProvider: 'Webhook Service', fallbackProvider: 'Provider Email' },
  ],

  providers: [
    { id: 'p1', provider: 'Provider Email', channel: 'Email', environment: 'Prod', availability: '99.95%', latency: '120 ms', errorRate: '0.21%', health: 'Healthy', primary: 'Yes', fallback: 'No', status: 'Active' },
    { id: 'p2', provider: 'Provider SMS', channel: 'SMS', environment: 'Prod', availability: '98.80%', latency: '260 ms', errorRate: '2.14%', health: 'Healthy', primary: 'Yes', fallback: 'No', status: 'Active' },
    { id: 'p3', provider: 'Provider Push', channel: 'Push', environment: 'Prod', availability: '99.50%', latency: '98 ms', errorRate: '0.62%', health: 'Healthy', primary: 'Yes', fallback: 'No', status: 'Active' },
    { id: 'p4', provider: 'In-App Service', channel: 'In-App', environment: 'Prod', availability: '99.90%', latency: '45 ms', errorRate: '0.15%', health: 'Healthy', primary: 'Yes', fallback: 'No', status: 'Active' },
    { id: 'p5', provider: 'Webhook Service', channel: 'Webhook', environment: 'Prod', availability: '99.60%', latency: '160 ms', errorRate: '0.52%', health: 'Healthy', primary: 'Yes', fallback: 'No', status: 'Active' },
  ],

  senderIdentities: [
    { id: 'si1', channel: 'Email', identity: 'no-reply@slbeauty.lk', domain: 'slbeauty.lk', purpose: 'Primary Email', status: 'Verified', expiresOn: 'May 14, 2025', owner: 'Platform Eng' },
    { id: 'si2', channel: 'Email', identity: 'orders@slbeauty.lk', domain: 'slbeauty.lk', purpose: 'Orders Email', status: 'Verified', expiresOn: 'N/A', owner: 'Platform Eng' },
    { id: 'si3', channel: 'SMS', identity: 'SLBEAUTY', domain: 'N/A', purpose: 'Primary SMS', status: 'Verified', expiresOn: 'N/A', owner: 'Platform Eng' },
    { id: 'si4', channel: 'Push', identity: 'SL Beauty App', domain: 'N/A', purpose: 'Push Notifications', status: 'Verified', expiresOn: 'N/A', owner: 'Platform Eng' },
    { id: 'si5', channel: 'In-App', identity: 'SL Beauty In-App', domain: 'N/A', purpose: 'In-App Messaging', status: 'Verified', expiresOn: 'N/A', owner: 'Platform Eng' },
    { id: 'si6', channel: 'Email', identity: 'billing@slbeauty.lk', domain: 'slbeauty.lk', purpose: 'Billing Email', status: 'Expiring Soon', expiresOn: 'Oct 14, 2024', owner: 'Finance Ops' },
  ],

  identityExpiries: [
    { id: 'ie1', identity: 'billing@slbeauty.lk', channel: 'Email', expiresOn: 'Aug 19, 2024', status: 'Expiring Soon' },
    { id: 'ie2', identity: 'Promotional SMS Sender', channel: 'SMS', expiresOn: 'Aug 24, 2024', status: 'Expiring Soon' },
    { id: 'ie3', identity: 'alerts@slbeauty.lk', channel: 'Email', expiresOn: 'Aug 28, 2024', status: 'Expiring Soon' },
    { id: 'ie4', identity: 'marketing@slbeauty.lk', channel: 'Email', expiresOn: 'Aug 30, 2024', status: 'Expiring Soon' },
    { id: 'ie5', identity: 'OTPSMS Gateway', channel: 'SMS', expiresOn: 'Sep 05, 2024', status: 'Expiring Soon' },
  ],

  failedDeliveries: [
    { id: 'fd1', failureReason: 'Permanent Failure', count: 1104, percentage: '59.9%' },
    { id: 'fd2', failureReason: 'Invalid Recipient', count: 468, percentage: '25.4%' },
    { id: 'fd3', failureReason: 'Provider Rejection', count: 184, percentage: '10.0%' },
    { id: 'fd4', failureReason: 'Other', count: 86, percentage: '4.7%' },
  ],

  retryQueue: [
    { id: 'rq1', window: '0–15 Min', count: 312, percentage: '42%' },
    { id: 'rq2', window: '15–60 Min', count: 268, percentage: '36%' },
    { id: 'rq3', window: '60+ Min', count: 162, percentage: '22%' },
  ],

  deliveryFailures: [
    { id: 'df1', provider: 'Provider Email', failedCount: 946, errorRate: '0.51%', topCause: 'Permanent Failure' },
    { id: 'df2', provider: 'Provider SMS', failedCount: 612, errorRate: '0.74%', topCause: 'Invalid Recipient' },
    { id: 'df3', provider: 'Provider Push', failedCount: 226, errorRate: '0.31%', topCause: 'Provider Rejection' },
    { id: 'df4', provider: 'In-App Service', failedCount: 58, errorRate: '0.07%', topCause: 'Permanent Failure' },
  ],

  retryQueueByProvider: [
    { id: 'rqp1', provider: 'Provider Email', queueCount: 312, oldestAge: '45m' },
    { id: 'rqp2', provider: 'Provider SMS', queueCount: 268, oldestAge: '1h 10m' },
    { id: 'rqp3', provider: 'Provider Push', queueCount: 122, oldestAge: '30m' },
    { id: 'rqp4', provider: 'In-App Service', queueCount: 40, oldestAge: '15m' },
  ],

  governanceGates: [
    { id: 'gg1', gate: 'Template Approval', status: 'Passed', lastEvaluated: 'Aug 13, 2024' },
    { id: 'gg2', gate: 'Provider Health', status: 'Passed', lastEvaluated: 'Aug 13, 2024' },
    { id: 'gg3', gate: 'Localization Readiness', status: 'Passed', lastEvaluated: 'Aug 13, 2024' },
    { id: 'gg4', gate: 'Sender Identity', status: 'Passed', lastEvaluated: 'Aug 13, 2024' },
    { id: 'gg5', gate: 'Audit Logging', status: 'Passed', lastEvaluated: 'Aug 13, 2024' },
  ],

  channelReadiness: [
    { id: 'cr1', channel: 'Email', templates: 100, providers: 100, routing: 100, localization: 100, readinessScore: 100 },
    { id: 'cr2', channel: 'SMS', templates: 100, providers: 100, routing: 100, localization: 100, readinessScore: 100 },
    { id: 'cr3', channel: 'Push', templates: 96, providers: 100, routing: 100, localization: 95, readinessScore: 96 },
    { id: 'cr4', channel: 'In-App', templates: 98, providers: 100, routing: 100, localization: 98, readinessScore: 98 },
    { id: 'cr5', channel: 'Webhook', templates: 100, providers: 100, routing: 100, localization: 100, readinessScore: 100 },
  ],

  recentActivity: [
    { id: 'ra1', dateTime: 'Aug 13, 2024 04:02 AM', action: 'Template Registered', templateRef: 'TMP-PAY-FAIL-001', recipient: 'Customer', changedBy: 'Platform Eng', details: 'Automated sync' },
    { id: 'ra2', dateTime: 'Aug 13, 2024 03:45 AM', action: 'Rule Updated', templateRef: 'NR-SHP-002', recipient: 'Customer', changedBy: 'Finance Ops', details: 'Routing changed' },
    { id: 'ra3', dateTime: 'Aug 13, 2024 03:10 AM', action: 'Sender Verified', templateRef: 'no-reply@slbeauty.lk', recipient: 'Platform', changedBy: 'Security Ops', details: 'Domain verified' },
    { id: 'ra4', dateTime: 'Aug 13, 2024 02:50 AM', action: 'Provider Health Check', templateRef: 'Provider SMS', recipient: 'System', changedBy: 'System', details: 'Latency OK' },
    { id: 'ra5', dateTime: 'Aug 13, 2024 01:15 AM', action: 'Fallback Activated', templateRef: 'Provider Email -> SMS', recipient: 'System', changedBy: 'System', details: 'Fallback triggered' },
  ],

  deadLetterQueue: [
    { id: 'dlq1', dlqId: 'DLQ-00012', event: 'payment.failed', channel: 'Email', failureReason: 'Invalid Recipient', age: '2h 14m', status: 'Open' },
    { id: 'dlq2', dlqId: 'DLQ-000124', event: 'order.placed', channel: 'SMS', failureReason: 'Provider Rejection', age: '3h 10m', status: 'Open' },
    { id: 'dlq3', dlqId: 'DLQ-000125', event: 'shipment.updated', channel: 'Email', failureReason: 'Template Error', age: '5h 45m', status: 'Open' },
  ],

  deliveryWindows: [
    { id: 'dw1', channel: 'Email', quietHours: '00:00 - 06:00', status: 'Active' },
    { id: 'dw2', channel: 'SMS', quietHours: '22:00 - 08:00', status: 'Active' },
    { id: 'dw3', channel: 'Push', quietHours: '23:00 - 07:00', status: 'Active' },
    { id: 'dw4', channel: 'In-App', quietHours: '00:00 - 06:00', status: 'Active' },
  ],

  exceptions: [
    { id: 'ex1', type: 'Missing Templates', count: 3, severity: 'High', status: 'Open' },
    { id: 'ex2', type: 'Template Errors', count: 2, severity: 'Medium', status: 'Open' },
    { id: 'ex3', type: 'Provider Outages', count: 1, severity: 'High', status: 'Open' },
  ],

  charts: {
    fallbackStatus: [
      { name: 'Healthy', value: 54, color: '#10b981' },
      { name: 'Degraded', value: 23, color: '#f59e0b' },
      { name: 'At Risk', value: 10, color: '#f43f5e' },
      { name: 'Failed', value: 13, color: '#64748b' },
    ],
    senderIdentityStatus: [
      { name: 'Verified', value: 16, color: '#10b981' },
      { name: 'Expiring Soon', value: 3, color: '#f59e0b' },
      { name: 'Pending Verification', value: 2, color: '#3b82f6' },
      { name: 'Failed', value: 2, color: '#f43f5e' },
      { name: 'Disabled', value: 1, color: '#64748b' },
    ],
    riskPortfolio: [
      { name: 'High', value: 6, color: '#f43f5e' },
      { name: 'Medium', value: 10, color: '#f59e0b' },
      { name: 'Low', value: 8, color: '#10b981' },
    ],
    templateActivity: [
      { label: 'Jul 15', Created: 12, Updated: 24, Retired: 4 },
      { label: 'Jul 22', Created: 18, Updated: 30, Retired: 2 },
      { label: 'Jul 29', Created: 15, Updated: 22, Retired: 5 },
      { label: 'Aug 5', Created: 22, Updated: 35, Retired: 3 },
      { label: 'Aug 12', Created: 20, Updated: 28, Retired: 4 },
    ],
    providerHealth: [
      { label: 'Jul 15', Email: 99.8, SMS: 98.2, Push: 99.4 },
      { label: 'Jul 22', Email: 99.9, SMS: 98.4, Push: 99.5 },
      { label: 'Jul 29', Email: 99.7, SMS: 98.1, Push: 99.3 },
      { label: 'Aug 5', Email: 99.9, SMS: 98.6, Push: 99.6 },
      { label: 'Aug 12', Email: 99.9, SMS: 98.8, Push: 99.5 },
    ],
  },
};
