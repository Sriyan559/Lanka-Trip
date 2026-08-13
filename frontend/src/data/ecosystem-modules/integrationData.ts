export interface MainIntegrationRegistryItem {
  id: string;
  integrationName: string;
  sourceModule: string;
  targetService: string;
  type: string;
  provider: string;
  auth: string;
  environment: string;
  region: string;
  health: string;
  sla: string;
  security: "Healthy" | "Warning" | "Critical";
  compliance: "Compliant" | "Non-Compliant" | "Review";
  fallback: "Ready" | "Warning" | "Not Configured";
  monitoring: "Active" | "Warning" | "Inactive";
  score: number;
  status: "Active" | "Warning" | "Failed" | "Pending";
  owner: string;
  lastUpdated: string;
}

export interface InternalSharedServiceItem {
  service: string;
  dependentModules: number;
  env: string;
  availability: string;
  latency: string;
  owner: string;
  health: number;
}

export interface ExternalProviderItem {
  provider: string;
  type: string;
  region: string;
  sla: string;
  security: "Green" | "Amber" | "Red";
  compliance: "Green" | "Amber" | "Red";
  criticality: "Critical" | "High" | "Medium" | "Low";
  fallback: "No" | "Yes";
  monitoring: "Up" | "Down";
  score: number;
}

export interface ApiItem {
  api: string;
  env: string;
  reqPerDay: string;
  successRate: string;
  p95Latency: string;
  health: string;
}

export interface WebhookItem {
  webhook: string;
  events: number;
  successRate: string;
  deliveryStatus: "Healthy" | "Warning" | "Failed";
  retryCount: number;
  lastReceived: string;
}

export interface AuthPortfolioItem {
  authType: string;
  integrations: number;
  pctOfTotal: string;
  mau: string;
  keyRotation: string;
  expiringSoon: number;
}

export interface CredentialCertificateItem {
  type: string;
  total: number;
  expiring30Days: number;
  expiring90Days: number;
  compliant: string;
  autoRotate: "Yes" | "No";
  owner: string;
}

export interface FallbackResilienceItem {
  service: string;
  primaryProvider: string;
  secondaryProvider: string;
  failoverTime: string;
  successRate: string;
  autoFailover: "Yes" | "No";
  status: "Healthy" | "Warning" | "Critical";
}

export interface RegionalRestrictionItem {
  region: string;
  activeIntegrations: number;
  restricted: number;
  blocked: number;
  notes: string;
}

export interface ProviderConcentrationItem {
  provider: string;
  criticalPct: string;
  highPct: string;
  mediumPct: string;
}

export interface DependencyBlastRadiusItem {
  domain: string;
  lastTested: string;
  impactIfDown: string;
  rto: string;
  criticality: "Critical" | "High" | "Medium" | "Low";
}

export interface ComplianceGovernanceItem {
  standard: string;
  status: "Compliant" | "Review Needed" | "Non-Compliant";
  lastAssessment: string;
  nextReview: string;
}

export interface RecentIntegrationActivityItem {
  time: string;
  activity: string;
  integration: string;
  severity: "Critical" | "High" | "Medium" | "Info";
  status: "Open" | "Resolved" | "Closed";
  owner: string;
}

export const INTEGRATION_DATA = {
  headerInfo: {
    visibleTitle: "Integrations, Services & External Providers",
    breadcrumb: "Ecosystem Modules > Integrations & Services",
    description: "Govern internal services, ecosystem integrations, third-party providers, authentication, availability, SLA, security, compliance, fallback and regional readiness across modules and environments.",
    overallStatus: "Stable",
  },

  contextBar: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    scope: "Enterprise Wide",
    region: "Sri Lanka",
    environment: "All",
    integrationRegistry: "Connected",
    serviceRegistry: "Connected",
    providerRegistry: "Connected",
    moduleRegistry: "Connected",
    dependencyRegistry: "Healthy",
    securityPosture: "Healthy",
    securitySource: "Connected",
    complianceSource: "Connected",
    secretManager: "Active",
    monitoringSource: "Connected",
    slaEngine: "Healthy",
    dataCompleteness: "99%",
    lastEvaluated: "Aug 12, 2026, 1:45 PM",
    access: "Assigned Scope",
  },

  primaryKpis: [
    { label: "Registered Integrations", value: 84, tone: "info" },
    { label: "Active", value: 76, tone: "success" },
    { label: "Shared Services", value: 14, tone: "info" },
    { label: "External Providers", value: 18, tone: "info" },
    { label: "Healthy", value: 69, tone: "success" },
    { label: "Warning", value: 10, tone: "warning" },
    { label: "Failed", value: 5, tone: "danger" },
    { label: "High Risk", value: 4, tone: "danger" },
    { label: "SLA Breaches", value: 6, tone: "danger" },
    { label: "Health", value: "93/100", tone: "success" },
  ],

  secondaryKpis: [
    { label: "Modules Integrated", value: 16, tone: "info" },
    { label: "Critical Services", value: 12, tone: "info" },
    { label: "Fallback Configured", value: 15, tone: "success" },
    { label: "Credentials Expiring", value: 4, tone: "warning" },
    { label: "Contract Reviews Due", value: 2, tone: "warning" },
    { label: "Security Reviews Pending", value: 3, tone: "warning" },
    { label: "Compliance Reviews Pending", value: 3, tone: "warning" },
    { label: "Regional Restrictions", value: 5, tone: "info" },
  ],

  tabs: [
    "Integration Overview", "All Integrations", "Internal Services", "Shared Services",
    "External Providers", "APIs", "Webhooks", "Authentication", "Health & SLA",
    "Security & Compliance", "Fallback & Resilience", "Countries & Regions",
    "Credentials & Certificates", "Contracts & Lifecycle", "Incidents",
    "Exceptions", "History"
  ],

  registry: [
    { id: "int-001", integrationName: "AI Beauty Advisor → AI Gateway", sourceModule: "AI Beauty Advisor", targetService: "AI Gateway", type: "API Gateway", provider: "Internal", auth: "Signed Request", environment: "Prod / Sri Lanka", region: "Sri Lanka", health: "98.9%", sla: "100%", security: "Healthy", compliance: "Compliant", fallback: "Ready", monitoring: "Active", score: 98, status: "Active", owner: "Platform Ops", lastUpdated: "Aug 11, 2026" },
    { id: "int-002", integrationName: "Checkout → Payment Gateway", sourceModule: "Checkout", targetService: "Stripe / PayPal", type: "Payment API", provider: "Stripe / PayPal", auth: "OAuth 2.0", environment: "Prod", region: "Global", health: "91.1%", sla: "98.2%", security: "Warning", compliance: "Compliant", fallback: "Ready", monitoring: "Active", score: 86, status: "Warning", owner: "Finance Ops", lastUpdated: "Aug 11, 2026" },
    { id: "int-003", integrationName: "Inventory → WMS Sync", sourceModule: "Inventory", targetService: "WMS Engine", type: "Webhook", provider: "Internal", auth: "API Key", environment: "Prod", region: "Sri Lanka", health: "99.8%", sla: "100%", security: "Healthy", compliance: "Compliant", fallback: "Ready", monitoring: "Active", score: 99, status: "Active", owner: "Logistics", lastUpdated: "Aug 10, 2026" },
    { id: "int-004", integrationName: "Notifications → Twilio SMS", sourceModule: "Customer Support", targetService: "Twilio Gateway", type: "REST API", provider: "Twilio", auth: "API Key", environment: "Prod", region: "Global", health: "95.6%", sla: "99.1%", security: "Healthy", compliance: "Compliant", fallback: "Warning", monitoring: "Active", score: 94, status: "Active", owner: "Support Tech", lastUpdated: "Aug 10, 2026" },
    { id: "int-005", integrationName: "Search → Algolia Index", sourceModule: "B2C Marketplace", targetService: "Algolia Search", type: "Search API", provider: "Algolia", auth: "API Key", environment: "Prod", region: "Global", health: "99.2%", sla: "100%", security: "Healthy", compliance: "Compliant", fallback: "Ready", monitoring: "Active", score: 98, status: "Active", owner: "Catalog Team", lastUpdated: "Aug 09, 2026" },
  ] as MainIntegrationRegistryItem[],

  selectedIntegrationDetail: {
    name: "AI Beauty Advisor → AI Gateway",
    sourceModule: "AI Beauty Advisor",
    targetService: "AI Gateway",
    integrationType: "External Provider / HTTPS",
    authentication: "Signed Request",
    environmentRegion: "Prod / Sri Lanka",
    dataSensitivity: "Low",
    securityCompliance: "Approved / Approved",
    fallbackStatus: "Secondary provider configured",
    lastValidated: "Aug 11, 2026, 1:45 PM",
    availability: "98.91%",
    availabilitySla: "100%",
    latencyP95: "198ms",
    latencySla: "≤ 250ms",
    errorRate: "0.12%",
    errorSla: "≤ 0.5%",
    throughput: "2.2K req/m",
    score: 98,
    status: "Active",
  },

  internalSharedServices: [
    { service: "Identity Service", dependentModules: 8, env: "Prod", availability: "99.98%", latency: "100ms", owner: "Platform Ops", health: 97 },
    { service: "Payment Gateway", dependentModules: 6, env: "Prod", availability: "99.91%", latency: "120ms", owner: "Finance Ops", health: 94 },
    { service: "Inventory Service", dependentModules: 5, env: "Prod", availability: "99.96%", latency: "180ms", owner: "Logistics Ops", health: 98 },
    { service: "Media Service", dependentModules: 4, env: "Prod", availability: "99.88%", latency: "250ms", owner: "Media Ops", health: 95 },
    { service: "Notification Service", dependentModules: 7, env: "Prod", availability: "99.92%", latency: "210ms", owner: "Support Tech", health: 96 },
    { service: "Analytics Pipeline", dependentModules: 5, env: "Prod", availability: "99.40%", latency: "350ms", owner: "Data Platform", health: 92 },
  ] as InternalSharedServiceItem[],

  externalProviders: [
    { provider: "AWS (Cloud)", type: "Cloud Storage", region: "US", sla: "99.99%", security: "Green", compliance: "Green", criticality: "Critical", fallback: "No", monitoring: "Up", score: 96 },
    { provider: "Twilio", type: "Communications", region: "US", sla: "99.95%", security: "Green", compliance: "Green", criticality: "High", fallback: "Yes", monitoring: "Up", score: 94 },
    { provider: "Stripe", type: "Payments", region: "US", sla: "99.90%", security: "Green", compliance: "Green", criticality: "Critical", fallback: "Yes", monitoring: "Up", score: 91 },
    { provider: "Algolia", type: "Search", region: "US", sla: "99.90%", security: "Green", compliance: "Green", criticality: "High", fallback: "Yes", monitoring: "Up", score: 97 },
    { provider: "SendGrid", type: "Email", region: "US", sla: "99.90%", security: "Green", compliance: "Green", criticality: "Medium", fallback: "Yes", monitoring: "Up", score: 91 },
  ] as ExternalProviderItem[],

  apis: [
    { api: "Product API", env: "Prod", reqPerDay: "1.2M", successRate: "99.87%", p95Latency: "130ms", health: "Healthy" },
    { api: "Payment API", env: "Prod", reqPerDay: "900K", successRate: "99.91%", p95Latency: "210ms", health: "Healthy" },
    { api: "Inventory API", env: "Prod", reqPerDay: "1.6M", successRate: "99.72%", p95Latency: "180ms", health: "Healthy" },
    { api: "Analytics API", env: "Prod", reqPerDay: "2.5M", successRate: "99.68%", p95Latency: "350ms", health: "Healthy" },
    { api: "Loyalty API", env: "Prod", reqPerDay: "1.5M", successRate: "99.50%", p95Latency: "145ms", health: "Healthy" },
  ] as ApiItem[],

  webhooks: [
    { webhook: "Order Created", events: 23, successRate: "99.72%", deliveryStatus: "Healthy", retryCount: 0, lastReceived: "1m ago" },
    { webhook: "Payment Succeeded", events: 14, successRate: "99.91%", deliveryStatus: "Healthy", retryCount: 1, lastReceived: "3m ago" },
    { webhook: "Inventory Updated", events: 18, successRate: "99.62%", deliveryStatus: "Healthy", retryCount: 0, lastReceived: "1m ago" },
    { webhook: "User Registered", events: 8, successRate: "99.95%", deliveryStatus: "Healthy", retryCount: 0, lastReceived: "5m ago" },
    { webhook: "Loyalty Earned", events: 12, successRate: "99.56%", deliveryStatus: "Healthy", retryCount: 1, lastReceived: "2m ago" },
  ] as WebhookItem[],

  authPortfolio: [
    { authType: "OAuth 2.0", integrations: 38, pctOfTotal: "45.2%", mau: "98%", keyRotation: "90 days", expiringSoon: 2 },
    { authType: "API Key", integrations: 22, pctOfTotal: "26.2%", mau: "—", keyRotation: "180 days", expiringSoon: 1 },
    { authType: "OIDC / SSO", integrations: 11, pctOfTotal: "13.1%", mau: "99%", keyRotation: "90 days", expiringSoon: 1 },
    { authType: "mTLS", integrations: 7, pctOfTotal: "8.3%", mau: "—", keyRotation: "60 days", expiringSoon: 0 },
    { authType: "Basic Auth (Legacy)", integrations: 6, pctOfTotal: "7.1%", mau: "—", keyRotation: "—", expiringSoon: 0 },
  ] as AuthPortfolioItem[],

  credentialsCertificates: [
    { type: "API Keys", total: 56, expiring30Days: 3, expiring90Days: 11, compliant: "96.4%", autoRotate: "Yes", owner: "Platform Ops" },
    { type: "Client Secrets", total: 26, expiring30Days: 2, expiring90Days: 4, compliant: "92.3%", autoRotate: "Yes", owner: "Platform Ops" },
    { type: "Certificates", total: 36, expiring30Days: 1, expiring90Days: 5, compliant: "97.2%", autoRotate: "Yes", owner: "Security" },
    { type: "Access Tokens", total: 46, expiring30Days: 4, expiring90Days: 8, compliant: "95.6%", autoRotate: "Yes", owner: "Platform Ops" },
  ] as CredentialCertificateItem[],

  fallbackResilience: [
    { service: "Payments", primaryProvider: "Stripe", secondaryProvider: "PayPal", failoverTime: "1.6s", successRate: "99.41%", autoFailover: "Yes", status: "Healthy" },
    { service: "Messaging", primaryProvider: "Twilio", secondaryProvider: "Vonage", failoverTime: "2.1s", successRate: "99.28%", autoFailover: "Yes", status: "Healthy" },
    { service: "Storage", primaryProvider: "AWS S3", secondaryProvider: "Azure Blob", failoverTime: "3.2s", successRate: "99.85%", autoFailover: "Yes", status: "Healthy" },
    { service: "Email", primaryProvider: "SendGrid", secondaryProvider: "Amazon SES", failoverTime: "1.8s", successRate: "99.52%", autoFailover: "Yes", status: "Healthy" },
  ] as FallbackResilienceItem[],

  regionalRestrictions: [
    { region: "Sri Lanka", activeIntegrations: 52, restricted: 2, blocked: 0, notes: "—" },
    { region: "Singapore", activeIntegrations: 48, restricted: 3, blocked: 0, notes: "PDPA" },
    { region: "EU (GDPR)", activeIntegrations: 41, restricted: 5, blocked: 1, notes: "GDPR" },
    { region: "US", activeIntegrations: 37, restricted: 2, blocked: 0, notes: "—" },
    { region: "UAE", activeIntegrations: 29, restricted: 4, blocked: 1, notes: "Data Locality" },
  ] as RegionalRestrictionItem[],

  providerConcentration: [
    { provider: "AWS", criticalPct: "68.4%", highPct: "23.0%", mediumPct: "23.4%" },
    { provider: "Stripe", criticalPct: "32.1%", highPct: "12.6%", mediumPct: "19.5%" },
    { provider: "Twilio", criticalPct: "10.7%", highPct: "9.8%", mediumPct: "9.8%" },
    { provider: "SendGrid", criticalPct: "16.7%", highPct: "3.8%", mediumPct: "10.9%" },
  ] as ProviderConcentrationItem[],

  dependencyBlastRadius: [
    { domain: "Payments", lastTested: "Aug 11, 10:02 AM", impactIfDown: "Checkout, Payouts, Refunds", rto: "15 min", criticality: "Critical" },
    { domain: "Inventory", lastTested: "Aug 11, 09:45 AM", impactIfDown: "Catalog, Stock Update, OMS", rto: "30 min", criticality: "High" },
    { domain: "Identity", lastTested: "Aug 11, 10:05 AM", impactIfDown: "Login, SSO, Access Control", rto: "15 min", criticality: "Critical" },
    { domain: "Notifications", lastTested: "Aug 11, 08:25 AM", impactIfDown: "Alerts, Emails, SMS", rto: "60 min", criticality: "Medium" },
  ] as DependencyBlastRadiusItem[],

  complianceGovernance: [
    { standard: "SOC 2", status: "Compliant", lastAssessment: "Jul 20, 2026", nextReview: "Oct 20, 2026" },
    { standard: "ISO 27001", status: "Compliant", lastAssessment: "Jul 22, 2026", nextReview: "Oct 22, 2026" },
    { standard: "PCI DSS", status: "Compliant", lastAssessment: "Jul 30, 2026", nextReview: "Oct 30, 2026" },
    { standard: "GDPR", status: "Compliant", lastAssessment: "Jul 25, 2026", nextReview: "Oct 25, 2026" },
    { standard: "PDPA", status: "Compliant", lastAssessment: "Jul 20, 2026", nextReview: "Oct 20, 2026" },
  ] as ComplianceGovernanceItem[],

  recentActivity: [
    { time: "Aug 12, 2026, 1:40 PM", activity: "Integration Registered", integration: "AI Beauty Advisor → AI Gateway", severity: "Info", status: "Closed", owner: "Platform Ops" },
    { time: "Aug 12, 2026, 12:30 PM", activity: "Contract Updated", integration: "Stripe (Payments)", severity: "Info", status: "Closed", owner: "System Admin" },
    { time: "Aug 12, 2026, 11:15 AM", activity: "Credential Rotated", integration: "Twilio (SMS Gateway)", severity: "Info", status: "Closed", owner: "Security Analyst" },
    { time: "Aug 11, 2026, 3:20 PM", activity: "Provider Status Changed", integration: "SendGrid (Email)", severity: "Warning", status: "Resolved", owner: "Platform Ops" },
    { time: "Aug 11, 2026, 10:05 AM", activity: "Failover Tested", integration: "Identity Service", severity: "Info", status: "Closed", owner: "Compliance Team" },
  ] as RecentIntegrationActivityItem[],

  rightPanel: {
    healthScore: 93,
    healthLabel: "Stable",
    overallHealthText: "Overall Health",
    lastEvaluated: "Aug 12, 2026, 1:45 PM",

    integrationSummary: {
      registered: 84,
      active: 76,
      healthy: 69,
      warning: 10,
      failed: 5,
      highRisk: 4,
    },

    providerSummary: {
      externalProviders: 18,
      criticalProviders: 7,
      confidential: 2,
      withFallback: 15,
      singleProviderRisks: 3,
      contractReviewsDue: 3,
    },

    governanceSummary: {
      slaBreaches: 6,
      credentialsExpiring: 4,
      securityReviews: 3,
      complianceReviews: 3,
      regionalRestrictions: 5,
      fallbackGaps: 1,
    },

    quickQueues: [
      { label: "Contracts Expiring", count: 5, tone: "warning" },
      { label: "High Risk Integrations", count: 4, tone: "danger" },
      { label: "Auth Expired", count: 2, tone: "danger" },
      { label: "Security Reviews", count: 3, tone: "warning" },
      { label: "Incidents", count: 5, tone: "danger" },
      { label: "No Fallback", count: 3, tone: "warning" },
      { label: "Credential Expiry", count: 4, tone: "warning" },
      { label: "Compliance Reviews", count: 3, tone: "warning" },
    ],

    recommendedNextAction: {
      title: "Recommended Next Action",
      text: "Review the flagged Payment Gateway integration. Error rate above target (0.12%), failover to PayPal not configured. Full remediation plan is available before the next logistics release.",
      owner: "Platform Ops",
      dueDate: "Aug 19, 2026",
      buttonLabel: "View Details →",
    },

    issueWatch: [
      { label: "SLA Breach (> 24h)", count: 6 },
      { label: "High Risk Integrations", count: 4 },
      { label: "Credential Expiring (< 30d)", count: 4 },
      { label: "Compliance Reviews Due", count: 3 },
      { label: "No Fallback Configured", count: 3 },
      { label: "Regional Restrictions", count: 2 },
      { label: "Security Reviews Pending", count: 3 },
      { label: "Service Incidents", count: 2 },
    ]
  }
};
