import { SecurityFullData } from './security-authentication.types';

export const SECURITY_METADATA = {
  id: 'AD10',
  name: 'Security, Authentication & Session Control',
  route: '/admin/administration/security-authentication',
  module: 'Administration',
  domain: 'Security & Authentication',
};

export const SECURITY_TABS = [
  { id: 'overview', label: 'Security Overview' },
  { id: 'providers', label: 'Authentication Providers' },
  { id: 'methods', label: 'Authentication Methods' },
  { id: 'sso', label: 'SSO' },
  { id: 'mfa', label: 'MFA' },
  { id: 'step-up', label: 'Step-Up Authentication' },
  { id: 'session-policies', label: 'Session Policies' },
  { id: 'active-sessions', label: 'Active Sessions' },
  { id: 'device-trust', label: 'Device Trust' },
  { id: 'login-protection', label: 'Login Protection' },
  { id: 'lockouts', label: 'Lockouts' },
  { id: 'suspicious-activity', label: 'Suspicious Activity' },
  { id: 'break-glass', label: 'Break-Glass Access' },
  { id: 'service-auth', label: 'Service Authentication' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const SECURITY_FILTERS = [
  { id: 'provider', label: 'Provider' },
  { id: 'auth-method', label: 'Authentication Method' },
  { id: 'environment', label: 'Environment' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'risk-level', label: 'Risk Level' },
  { id: 'status', label: 'Status' },
  { id: 'session-type', label: 'Session Type' },
  { id: 'device-trust', label: 'Device Trust' },
  { id: 'mfa-status', label: 'MFA Status' },
  { id: 'review-status', label: 'Review Status' },
  { id: 'owner', label: 'Owner' },
];

export const QUICK_FILTERS = [
  { id: 'healthy', label: 'Healthy' },
  { id: 'warning', label: 'Warning' },
  { id: 'failed', label: 'Failed' },
  { id: 'high-risk', label: 'High Risk' },
  { id: 'mfa-gap', label: 'MFA Gap' },
  { id: 'privileged', label: 'Privileged' },
  { id: 'locked', label: 'Locked' },
  { id: 'suspicious-activity', label: 'Suspicious Activity' },
  { id: 'expiring-credentials', label: 'Expiring Credentials' },
  { id: 'pending-reviews', label: 'Pending Reviews' },
  { id: 'break-glass', label: 'Break-Glass' },
  { id: 'needs-attention', label: 'Needs Attention' },
];

export const DEFAULT_SECURITY_DATA: SecurityFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    identityRegistry: 'Connected',
    authenticationRegistry: 'Connected',
    mfaService: 'Healthy',
    ssoRegistry: 'Connected',
    sessionService: 'Healthy',
    deviceTrustService: 'Healthy',
    riskEngine: 'Healthy',
    auditService: 'Connected',
    dataCompleteness: '99%',
    lastEvaluated: 'Aug 13, 2024 4:20 AM',
    accessScope: 'Assigned Administration Scope',
  },

  kpis: {
    activePolicies: { value: 28, trend: '4%', trendDirection: 'up', sparkline: [25, 26, 27, 27, 28, 28] },
    authProviders: { value: 6, trend: '0%', trendDirection: 'up', sparkline: [6, 6, 6, 6, 6, 6] },
    ssoUsers: { value: 286, trend: '2%', trendDirection: 'up', sparkline: [275, 278, 280, 282, 284, 286] },
    mfaCoverage: { value: '98%', trend: '1%', trendDirection: 'up', sparkline: [95, 96, 96, 97, 97, 98] },
    activeSessions: { value: '1,248', trend: '8%', trendDirection: 'up', sparkline: [1100, 1150, 1180, 1210, 1230, 1248] },
    privilegedSessions: { value: 18, trend: '0%', trendDirection: 'up', sparkline: [18, 18, 18, 18, 18, 18] },
    lockedAccounts: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [7, 6, 6, 5, 5, 4] },
    highRiskSessions: { value: 7, trend: '12%', trendDirection: 'down', sparkline: [10, 9, 8, 8, 7, 7] },
    authWarnings: { value: 5, trend: '16%', trendDirection: 'down', sparkline: [8, 7, 6, 6, 5, 5] },
    securityHealth: { value: '97 / 100', trend: '2 pts', trendDirection: 'up', sparkline: [93, 94, 95, 96, 96, 97] },

    mfaEnrolledUsers: { value: 416, trend: '3%', trendDirection: 'up', sparkline: [400, 405, 408, 412, 414, 416] },
    mfaGaps: { value: 6, trend: '14%', trendDirection: 'down', sparkline: [9, 8, 7, 7, 6, 6] },
    trustedDevices: { value: 342, trend: '5%', trendDirection: 'up', sparkline: [320, 328, 332, 338, 340, 342] },
    stepUpPolicies: { value: 12, trend: '0%', trendDirection: 'up', sparkline: [12, 12, 12, 12, 12, 12] },
    sessionPolicies: { value: 9, trend: '0%', trendDirection: 'up', sparkline: [9, 9, 9, 9, 9, 9] },
    suspiciousLoginSignals: { value: 8, trend: '11%', trendDirection: 'down', sparkline: [12, 11, 10, 9, 9, 8] },
    breakGlassAccounts: { value: 2, trend: '0%', trendDirection: 'up', sparkline: [2, 2, 2, 2, 2, 2] },
    expiringCredentials: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [7, 6, 5, 5, 4, 4] },
    reviewsDue: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
    securityExceptions: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
  },

  policies: [
    { id: 'p1', policyRef: 'POL-AUTH-001', policyName: 'Privileged Admin Auth', type: 'Access', tenant: 'SL Beauty', environment: 'Prod', provider: 'Enterprise SSO', authMethod: 'SSO + MFA', mfa: 'Yes', stepUp: 'Yes', session: '8h', deviceTrust: 'Required', owner: 'Security Admin', compliance: 99, risk: 'Low', status: 'Active', lastUpdated: 'Aug 12, 2024' },
    { id: 'p2', policyRef: 'POL-AUTH-002', policyName: 'Standard User Authentication', type: 'Access', tenant: 'SL Beauty', environment: 'Prod', provider: 'Enterprise SSO', authMethod: 'SSO + MFA', mfa: 'Yes', stepUp: 'No', session: '8h', deviceTrust: 'Trusted', owner: 'Identity Operations', compliance: 98, risk: 'Low', status: 'Active', lastUpdated: 'Aug 12, 2024' },
    { id: 'p3', policyRef: 'POL-AUTH-003', policyName: 'Partner Vendor Authentication', type: 'Partner', tenant: 'SL Beauty', environment: 'Prod', provider: 'Service Identity', authMethod: 'Service Cred', mfa: 'No', stepUp: 'N/A', session: '24h', deviceTrust: 'N/A', owner: 'Partner Security', compliance: 97, risk: 'Low', status: 'Active', lastUpdated: 'Aug 12, 2024' },
    { id: 'p4', policyRef: 'POL-AUTH-004', policyName: 'Partner Vendor Access', type: 'Partner', tenant: 'SL Beauty', environment: 'Prod', provider: 'Partner Identity', authMethod: 'SSO + MFA', mfa: 'Yes', stepUp: 'Yes', session: '4h', deviceTrust: 'Required', owner: 'Partner Security', compliance: 92, risk: 'Medium', status: 'Active', lastUpdated: 'Aug 12, 2024' },
    { id: 'p5', policyRef: 'POL-AUTH-005', policyName: 'Break-Glass Emergency Access', type: 'Emergency', tenant: 'SL Beauty', environment: 'Prod', provider: 'Local Directory', authMethod: 'Password + MFA', mfa: 'Yes', stepUp: 'N/A', session: '1h', deviceTrust: 'Required', owner: 'Security Admin', compliance: 96, risk: 'High', status: 'Active', lastUpdated: 'Aug 11, 2024' },
  ],

  selectedPolicy: {
    policyRef: 'POL-AUTH-001',
    policyName: 'Privileged Admin Authentication',
    ssoRequired: 'Yes',
    mfaRequired: 'Yes',
    phishingResistantPreferred: 'Yes',
    stepUpForCriticalActions: 'Yes',
    sessionDuration: '8 hours',
    idleTimeout: '15 minutes',
    trustedDeviceRequired: 'Yes',
    owner: 'Security Administration',
    status: 'Active',
    compliance: 99,
    riskLevel: 'Low',
  },

  providers: [
    { id: 'pr1', provider: 'Enterprise SSO Provider', protocol: 'SAML 2.0', users: 256, mfaCoverage: 99, mfaStatus: 'Enrolled', avgLatency: '120 ms', errorRate: '0.01%', status: 'Healthy', connectivity: 'Connected' },
    { id: 'pr2', provider: 'Local Directory (AD)', protocol: 'LDAP', users: 23, mfaCoverage: 95, mfaStatus: 'Required', avgLatency: '35 ms', errorRate: '0.05%', status: 'Healthy', connectivity: 'Connected' },
    { id: 'pr3', provider: 'Service Identity Provider', protocol: 'OAuth 2.0', users: 24, mfaCoverage: 91, mfaStatus: 'Enrolled', avgLatency: '210 ms', errorRate: '0.02%', status: 'Healthy', connectivity: 'Connected' },
    { id: 'pr4', provider: 'Partner Identity Provider', protocol: 'SAML 2.0', users: 16, mfaCoverage: 90, mfaStatus: 'Enrolled', avgLatency: '140 ms', errorRate: '0.15%', status: 'Healthy', connectivity: 'Connected' },
    { id: 'pr5', provider: 'Customer Identity Provider', protocol: 'OpenID Connect', users: 132, mfaCoverage: 99, mfaStatus: 'Enrolled', avgLatency: '150 ms', errorRate: '0.19%', status: 'Healthy', connectivity: 'Connected' },
  ],

  ssoDomains: [
    { id: 'd1', domain: 'slbeauty.lk', users: 189, coverage: 99, status: 'Connected' },
    { id: 'd2', domain: 'brands.slbeauty.lk', users: 62, coverage: 97, status: 'Connected' },
    { id: 'd3', domain: 'partners.slbeauty.lk', users: 18, coverage: 92, status: 'Connected' },
    { id: 'd4', domain: 'customers.slbeauty.lk', users: 22, coverage: 95, status: 'Connected' },
  ],

  mfaMethods: [
    { id: 'm1', method: 'Authenticator App', users: 296, coverage: 70, status: 'Enabled' },
    { id: 'm2', method: 'SMS / Email OTP', users: 232, coverage: 57, status: 'Enabled' },
    { id: 'm3', method: 'Hardware Security Key', users: 24, coverage: 7, status: 'Enabled' },
  ],

  mfaGaps: [
    { id: 'mg1', userGroup: 'Contractors', users: 3, reason: 'No MFA Enrolled', priority: 'Medium' },
    { id: 'mg2', userGroup: 'Legacy Accounts', users: 2, reason: 'Missing MFA', priority: 'Medium' },
    { id: 'mg3', userGroup: 'Service Accounts', users: 1, reason: 'Exclusion', priority: 'Low' },
  ],

  stepUpPolicies: [
    { id: 'su1', trigger: 'Production Configuration Change', usersImpacted: 18, status: 'Enabled' },
    { id: 'su2', trigger: 'Privileged Access Tasks', usersImpacted: 18, status: 'Enabled' },
    { id: 'su3', trigger: 'Restricted Admin Export', usersImpacted: 24, status: 'Enabled' },
    { id: 'su4', trigger: 'Authentication Policy Change', usersImpacted: 6, status: 'Enabled' },
    { id: 'su5', trigger: 'Critical Data Access', usersImpacted: 2, status: 'Enabled' },
  ],

  sessionPolicies: [
    { id: 'sp1', policy: 'Critical Change', usersImpacted: 18, status: 'Step-Up Required' },
    { id: 'sp2', policy: 'Privileged Access', usersImpacted: 18, status: 'Step-Up Required' },
    { id: 'sp3', policy: 'Data Sensitivity', usersImpacted: 24, status: 'Step-Up Required' },
    { id: 'sp4', policy: 'Policy Admin', usersImpacted: 6, status: 'Step-Up Required' },
    { id: 'sp5', policy: 'Compliance Override', usersImpacted: 2, status: 'Step-Up Required' },
  ],

  sessionLimits: [
    { id: 'sl1', trigger: 'Inactivity Timeout', count: 106 },
    { id: 'sl2', trigger: 'Session Duration', count: 24 },
    { id: 'sl3', trigger: 'Privilege Elevation', count: 60 },
    { id: 'sl4', trigger: 'Concurrent Sessions', count: 33 },
    { id: 'sl5', trigger: 'Device Change', count: 21 },
  ],

  highRiskSessions: [
    { id: 'hr1', session: 'Impossible Travel', riskReason: 'Location Anomaly', count: 2 },
    { id: 'hr2', session: 'Open Admin Session', riskReason: 'Idle Duration', count: 2 },
    { id: 'hr3', session: 'New Device Untrusted', riskReason: 'Untrusted Device', count: 2 },
    { id: 'hr4', session: 'Long-Running Session', riskReason: 'Duration Exceeded', count: 1 },
  ],

  revocationQueue: [
    { id: 'rq1', reason: 'Untrusted Device', sessions: 3 },
    { id: 'rq2', reason: 'Anomalous Location', sessions: 4 },
    { id: 'rq3', reason: 'Risky Authentication', sessions: 2 },
    { id: 'rq4', reason: 'Policy Violation', sessions: 1 },
  ],

  deviceTrustRules: [
    { id: 'dtr1', rule: 'Known Device', status: 'Enabled' },
    { id: 'dtr2', rule: 'Device Compliance', status: 'Enabled' },
    { id: 'dtr3', rule: 'Risk-Based Trust', status: 'Enabled' },
    { id: 'dtr4', rule: 'Untrusted Device Step-Up', status: 'Enabled' },
  ],

  loginProtection: [
    { id: 'lp1', control: 'Brute Force Protection', status: 'Enabled' },
    { id: 'lp2', control: 'Rate Limiting', status: 'Enabled' },
    { id: 'lp3', control: 'Anomaly Detection', status: 'Enabled' },
    { id: 'lp4', control: 'IP Reputation', status: 'Enabled' },
  ],

  riskSignals: [
    { id: 'rs1', signal: 'Unusual Location', count: 8 },
    { id: 'rs2', signal: 'New Device', count: 2 },
    { id: 'rs3', signal: 'MFA Exposed', count: 5 },
    { id: 'rs4', signal: 'Impossible Travel', count: 4 },
    { id: 'rs5', signal: 'High-Risk Login Spike', count: 12 },
  ],

  serviceIdentities: [
    { id: 'si1', serviceIdentities: 54, activeCredentials: 52, lastRotated: 'Aug 10, 2024', expiresIn: '24d' },
  ],

  certificates: [
    { id: 'c1', activeCertificates: 24, expiring30Days: 0, expired: 0, lastRotated: 'Aug 10, 2024' },
  ],

  recoveryControls: [
    { id: 'rc1', recoveryMethods: 2, selfServiceRecovery: 'Enabled', recoveryApproval: 'Required', recoveryAttemptsLimit: 5 },
  ],

  passwordPolicy: [
    { id: 'pp1', minimumLength: 12, complexityRequired: 'Yes', selfServiceReset: 'Yes', passwordExpiryDays: 90 },
  ],

  authHealthMatrix: [
    { id: 'ah1', enterprise: 'SL Beauty', overall: 98, sso: 99, mfa: 98, sessions: 97, deviceTrust: 98, credential: 98 },
    { id: 'ah2', enterprise: 'B2C Partners', overall: 94, sso: 95, mfa: 92, sessions: 94, deviceTrust: 93, credential: 94 },
    { id: 'ah3', enterprise: 'B2B Customers', overall: 96, sso: 97, mfa: 96, sessions: 95, deviceTrust: 96, credential: 96 },
  ],

  governanceGates: [
    { id: 'gg1', gate: 'Authentication Governance', status: 'Passed', compliance: 95 },
    { id: 'gg2', gate: 'Access Governance', status: 'Passed', compliance: 92 },
    { id: 'gg3', gate: 'Data Protection Controls', status: 'Passed', compliance: 91 },
    { id: 'gg4', gate: 'Session Governance', status: 'Passed', compliance: 90 },
  ],

  operationsGates: [
    { id: 'og1', gate: 'Incident Response', status: 'Passed', compliance: 98 },
    { id: 'og2', gate: 'Breach Prevention', status: 'Passed', compliance: 97 },
    { id: 'og3', gate: 'Threat Detection', status: 'Passed', compliance: 94 },
    { id: 'og4', gate: 'Vulnerability Management', status: 'Passed', compliance: 93 },
  ],

  recentActivity: [
    { id: 'ra1', dateTime: 'Aug 13, 4:18 AM', event: 'High-risk session detected', actor: 'Admin', details: 'Location anomaly' },
    { id: 'ra2', dateTime: 'Aug 13, 3:52 AM', event: 'MFA enrollment completed', actor: 'User', details: 'Authenticator App' },
    { id: 'ra3', dateTime: 'Aug 13, 3:21 AM', event: 'New device trusted', actor: 'Admin', details: 'Device compliance verified' },
    { id: 'ra4', dateTime: 'Aug 13, 2:47 AM', event: 'Break-glass access requested', actor: 'System', details: 'Emergency procedure' },
    { id: 'ra5', dateTime: 'Aug 13, 2:10 AM', event: 'Session revoked', actor: 'Admin', details: 'Policy violation' },
  ],

  charts: {
    mfaCoverage: [
      { name: 'Enrolled', value: 416, color: '#10b981' },
      { name: 'Gaps', value: 6, color: '#f59e0b' },
      { name: 'Exempt', value: 2, color: '#64748b' },
    ],
    activeSessions: [
      { name: 'Standard', value: 1150, color: '#10b981' },
      { name: 'Privileged', value: 18, color: '#f59e0b' },
      { name: 'Service', value: 80, color: '#3b82f6' },
    ],
    deviceTrust: [
      { name: 'Trusted', value: 342, color: '#10b981' },
      { name: 'Untrusted', value: 11, color: '#f59e0b' },
      { name: 'Exempted', value: 5, color: '#64748b' },
    ],
    lockedAccounts: [
      { name: 'Temporary Lock', value: 3, color: '#f59e0b' },
      { name: 'Manual Lock', value: 1, color: '#f43f5e' },
    ],
    securityReviews: [
      { name: 'Completed', value: 16, color: '#10b981' },
      { name: 'In Progress', value: 6, color: '#3b82f6' },
      { name: 'Pending', value: 2, color: '#f59e0b' },
    ],
    securityExceptions: [
      { name: 'Approved', value: 3, color: '#10b981' },
      { name: 'Pending', value: 2, color: '#f59e0b' },
      { name: 'Expired', value: 2, color: '#64748b' },
    ],
    riskPortfolio: [
      { name: 'Low', value: 6, color: '#10b981' },
      { name: 'Medium', value: 10, color: '#f59e0b' },
      { name: 'High', value: 5, color: '#f43f5e' },
    ],
    healthTrend: [
      { label: 'Jul 15', 'Overall Health': 93, 'Privileged Sessions': 16 },
      { label: 'Jul 20', 'Overall Health': 94, 'Privileged Sessions': 17 },
      { label: 'Jul 25', 'Overall Health': 95, 'Privileged Sessions': 18 },
      { label: 'Jul 30', 'Overall Health': 96, 'Privileged Sessions': 18 },
      { label: 'Aug 4', 'Overall Health': 96, 'Privileged Sessions': 18 },
      { label: 'Aug 9', 'Overall Health': 97, 'Privileged Sessions': 18 },
      { label: 'Aug 13', 'Overall Health': 97, 'Privileged Sessions': 18 },
    ],
  },
};
