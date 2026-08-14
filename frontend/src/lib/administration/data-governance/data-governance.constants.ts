import { DataGovernanceFullData } from './data-governance.types';

export const DATA_GOVERNANCE_METADATA = {
  id: 'AD12',
  name: 'Data Governance, Retention, Privacy & Administrative Data Controls',
  route: '/admin/administration/data-governance',
  module: 'Administration',
  domain: 'Data Governance',
};

export const DATA_GOVERNANCE_TABS = [
  { id: 'overview', label: 'Data Governance Overview' },
  { id: 'data-assets', label: 'Data Assets' },
  { id: 'data-domains', label: 'Data Domains' },
  { id: 'classification', label: 'Classification' },
  { id: 'ownership', label: 'Ownership & Stewardship' },
  { id: 'retention-policies', label: 'Retention Policies' },
  { id: 'retention-schedule', label: 'Retention Schedule' },
  { id: 'archived-disposal', label: 'Archived & Disposal' },
  { id: 'privacy-controls', label: 'Privacy Controls' },
  { id: 'residency', label: 'Residency' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-quality', label: 'Data Quality Governance' },
  { id: 'lineage', label: 'Lineage Summary' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const DATA_GOVERNANCE_FILTERS = [
  { id: 'data-domain', label: 'Data Domain' },
  { id: 'data-asset', label: 'Data Asset' },
  { id: 'classification', label: 'Classification' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'business-unit', label: 'Business Unit' },
  { id: 'country-region', label: 'Country / Region' },
  { id: 'environment', label: 'Environment' },
  { id: 'retention-status', label: 'Retention Status' },
  { id: 'residency-status', label: 'Residency Status' },
  { id: 'privacy-status', label: 'Privacy Status' },
  { id: 'risk-level', label: 'Risk Level' },
  { id: 'owner', label: 'Owner' },
];

export const QUICK_FILTERS = [
  { id: 'classified', label: 'Classified' },
  { id: 'unclassified', label: 'Unclassified' },
  { id: 'personal-data', label: 'Personal Data' },
  { id: 'sensitive-data', label: 'Sensitive Data' },
  { id: 'restricted-data', label: 'Restricted Data' },
  { id: 'high-risk', label: 'High Risk' },
  { id: 'retention-due', label: 'Retention Due' },
  { id: 'archive-due', label: 'Archive Due' },
  { id: 'disposal-due', label: 'Disposal Due' },
  { id: 'disposal-pending', label: 'Disposal Pending' },
  { id: 'retention-breach', label: 'Retention Breach' },
  { id: 'legal-hold', label: 'Legal Hold' },
];

export const DEFAULT_DATA_GOVERNANCE_DATA: DataGovernanceFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    dataRegistry: 'Connected',
    classificationRegistry: 'Connected',
    ownershipRegistry: 'Connected',
    retentionEngine: 'Connected',
    privacyEngine: 'Connected',
    residencyRegistry: 'Connected',
    auditService1: 'Connected',
    auditService2: 'Connected',
    dataCompleteness: '99%',
    lastEvaluated: 'May 13, 2025 5:00 AM',
    accessScope: 'Administration Scope',
  },

  kpis: {
    dataDomains: { value: 18, trend: '0%', trendDirection: 'up', sparkline: [18, 18, 18, 18, 18, 18] },
    registeredAssets: { value: 146, trend: '4%', trendDirection: 'up', sparkline: [136, 138, 140, 142, 144, 146] },
    classifiedAssets: { value: 138, trend: '5%', trendDirection: 'up', sparkline: [128, 130, 132, 134, 136, 138] },
    sensitiveAssets: { value: 42, trend: '2%', trendDirection: 'up', sparkline: [40, 41, 41, 42, 42, 42] },
    highRiskAssets: { value: 8, trend: '11%', trendDirection: 'down', sparkline: [11, 10, 10, 9, 8, 8] },
    retentionPolicies: { value: 24, trend: '0%', trendDirection: 'up', sparkline: [24, 24, 24, 24, 24, 24] },
    retentionBreaches: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [7, 6, 5, 5, 4, 4] },
    ownershipGaps: { value: 5, trend: '16%', trendDirection: 'down', sparkline: [8, 7, 6, 6, 5, 5] },
    reviewsDue: { value: 6, trend: '25%', trendDirection: 'down', sparkline: [10, 9, 8, 7, 6, 6] },
    governanceHealth: { value: '95 / 100', trend: '2 pts', trendDirection: 'up', sparkline: [91, 92, 93, 94, 94, 95] },

    personalDataAssets: { value: 38, trend: '3%', trendDirection: 'up', sparkline: [35, 36, 36, 37, 37, 38] },
    confidentialAssets: { value: 26, trend: '0%', trendDirection: 'up', sparkline: [26, 26, 26, 26, 26, 26] },
    restrictedAssets: { value: 12, trend: '0%', trendDirection: 'up', sparkline: [12, 12, 12, 12, 12, 12] },
    archivedAssets: { value: 18, trend: '5%', trendDirection: 'up', sparkline: [16, 16, 17, 17, 18, 18] },
    disposalDue: { value: 9, trend: '10%', trendDirection: 'down', sparkline: [12, 11, 10, 10, 9, 9] },
    residencyConstraints: { value: 14, trend: '0%', trendDirection: 'up', sparkline: [14, 14, 14, 14, 14, 14] },
    sharingAgreements: { value: 22, trend: '4%', trendDirection: 'up', sparkline: [20, 20, 21, 21, 22, 22] },
    stewardshipAssignments: { value: 128, trend: '6%', trendDirection: 'up', sparkline: [115, 118, 120, 124, 126, 128] },
    privacyExceptions: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
    dataQualityWarnings: { value: 7, trend: '12%', trendDirection: 'down', sparkline: [10, 9, 8, 8, 7, 7] },
  },

  dataAssets: [
    { id: 'da1', assetRef: 'DATA-CUST-ORD-001', assetName: 'customer_order_history', dataDomain: 'Customer Orders', businessUnit: 'Sales', classification: 'Confidential', sensitivity: 'Sensitive', risk: 'High', owner: 'C. Operations', dataOwner: 'Data Gov Team', steward: 'Finance Steward', retentionPolicy: 'RET-CUST-001', retention: '7 Years', residency: 'Sri Lanka', status: 'Active' },
    { id: 'da2', assetRef: 'DATA-FIN-PAY-002', assetName: 'finance_payment_transactions', dataDomain: 'Finance', businessUnit: 'Finance', classification: 'Restricted', sensitivity: 'Restricted', risk: 'High', owner: 'Finance Ops', dataOwner: 'Data Gov Team', steward: 'Supply Chain Steward', retentionPolicy: 'RET-FIN-001', retention: '10 Years', residency: 'Sri Lanka', status: 'Active' },
    { id: 'da3', assetRef: 'DATA-SUP-REG-003', assetName: 'supplier_information_registry', dataDomain: 'Suppliers', businessUnit: 'Procurement', classification: 'Confidential', sensitivity: 'Personal', risk: 'Medium', owner: 'Procurement Ops', dataOwner: 'Data Gov Team', steward: 'Supplier Steward', retentionPolicy: 'RET-SUP-001', retention: '7 Years', residency: 'Sri Lanka', status: 'Active' },
    { id: 'da4', assetRef: 'DATA-EMP-DIR-004', assetName: 'employee_payroll_directory', dataDomain: 'People', businessUnit: 'HR', classification: 'Restricted', sensitivity: 'Personal', risk: 'High', owner: 'People Ops', dataOwner: 'Data Gov Team', steward: 'HR Steward', retentionPolicy: 'RET-HRM-001', retention: '7 Years', residency: 'Sri Lanka', status: 'Active' },
    { id: 'da5', assetRef: 'DATA-ANA-SEG-005', assetName: 'analytics_customer_segments', dataDomain: 'Analytics', businessUnit: 'Marketing', classification: 'Internal', sensitivity: 'Internal', risk: 'Low', owner: 'Marketing Ops', dataOwner: 'Data Gov Team', steward: 'Analytics Steward', retentionPolicy: 'RET-ANA-001', retention: '3 Years', residency: 'Sri Lanka', status: 'Active' },
  ],

  selectedAsset: {
    assetRef: 'DATA-CUST-ORD-001',
    assetName: 'Customer Order History',
    domain: 'Customer Orders',
    businessUnit: 'Customer Operations',
    classification: 'Confidential',
    sensitivity: 'Sensitive',
    riskLevel: 'High',
    dataOwner: 'Customer Operations',
    steward: 'Finance Steward',
    primaryPurpose: 'Order Fulfillment & Customer Service',
    retentionPolicy: 'RET-CUST-001',
    retention: '7 Years',
    retentionStatus: 'Active',
    residency: 'Sri Lanka',
    residencyConstraints: 'None',
    privacyStatus: 'Compliant',
    riskScore: 97,
    status: 'Excellent',
    ownerName: 'Nimal Perera',
    stewardName: 'Finance Steward',
    reviewFrequency: 'Annual',
    lastReviewed: 'Apr 15, 2025',
    nextReview: 'Apr 15, 2026',
  },

  classificationMatrix: [
    { id: 'cm1', classification: 'Personal', p: 38, c: 0, r: 0, total: 38 },
    { id: 'cm2', classification: 'Confidential', p: 0, c: 26, r: 0, total: 26 },
    { id: 'cm3', classification: 'Restricted', p: 0, c: 0, r: 12, total: 12 },
    { id: 'cm4', classification: 'Internal', p: 0, c: 0, r: 68, total: 68 },
    { id: 'cm5', classification: 'Public', p: 0, c: 0, r: 2, total: 2 },
    { id: 'cm6', classification: 'Total', p: 38, c: 26, r: 12, total: 146 },
  ],

  domainPortfolio: [
    { id: 'dp1', domain: 'Customer Orders', count: 22, percentage: '15.1%' },
    { id: 'dp2', domain: 'Finance', count: 21, percentage: '14.4%' },
    { id: 'dp3', domain: 'People', count: 19, percentage: '13.0%' },
    { id: 'dp4', domain: 'Suppliers', count: 15, percentage: '10.3%' },
    { id: 'dp5', domain: 'Products', count: 13, percentage: '8.9%' },
    { id: 'dp6', domain: 'Marketing', count: 11, percentage: '7.5%' },
    { id: 'dp7', domain: 'Analytics', count: 9, percentage: '6.2%' },
    { id: 'dp8', domain: 'Other', count: 37, percentage: '25.3%' },
  ],

  ownershipStewardship: [
    { id: 'os1', role: 'Data Owners', assigned: 15, coverage: 100 },
    { id: 'os2', role: 'Data Stewards', assigned: 52, coverage: 98 },
    { id: 'os3', role: 'Business Owners', assigned: 25, coverage: 96 },
    { id: 'os4', role: 'System Owners', assigned: 16, coverage: 100 },
    { id: 'os5', role: 'Privacy Owners', assigned: 8, coverage: 100 },
  ],

  dataPurposes: [
    { id: 'pu1', purposeCategory: 'Customer Service', assets: 44, compliance: 'Compliant' },
    { id: 'pu2', purposeCategory: 'Order Fulfillment', assets: 32, compliance: 'Compliant' },
    { id: 'pu3', purposeCategory: 'Reporting & Analytics', assets: 28, compliance: 'Compliant' },
    { id: 'pu4', purposeCategory: 'Operational Monitoring', assets: 24, compliance: 'Compliant' },
    { id: 'pu5', purposeCategory: 'Finance & Accounting', assets: 18, compliance: 'Compliant' },
  ],

  retentionPolicies: [
    { id: 'rp1', policyRef: 'RET-CUST-001', policyName: 'Customer Data Retention', assets: 38, retention: '7 Years' },
    { id: 'rp2', policyRef: 'RET-ORD-001', policyName: 'Order Data Retention', assets: 22, retention: '7 Years' },
    { id: 'rp3', policyRef: 'RET-FIN-001', policyName: 'Finance Data Retention', assets: 21, retention: '10 Years' },
    { id: 'rp4', policyRef: 'RET-SUP-001', policyName: 'Supplier Data Retention', assets: 15, retention: '7 Years' },
    { id: 'rp5', policyRef: 'RET-ANA-001', policyName: 'Analytics Data Retention', assets: 9, retention: '3 Years' },
  ],

  retentionSchedule: [
    { id: 'rs1', policyRef: 'RET-CUST-001', asset: 'customer_loyalty_points', retentionDue: 'May 18, 2025', action: 'Archive' },
    { id: 'rs2', policyRef: 'RET-FIN-001', asset: 'old_invoices_records', retentionDue: 'May 19, 2025', action: 'Archive' },
    { id: 'rs3', policyRef: 'RET-ORD-001', asset: 'inactive_customer_data', retentionDue: 'May 20, 2025', action: 'Archive' },
    { id: 'rs4', policyRef: 'RET-ORD-001', asset: 'cancelled_orders', retentionDue: 'May 25, 2025', action: 'Archive' },
    { id: 'rs5', policyRef: 'RET-SUP-001', asset: 'vendor_inactive_data', retentionDue: 'May 29, 2025', action: 'Archive' },
  ],

  retentionBreaches: [
    { id: 'rb1', asset: 'expired_promo_data', breachType: 'Retention Breach', daysOverdue: 45, severity: 'High' },
    { id: 'rb2', asset: 'old_support_tickets', breachType: 'Retention Breach', daysOverdue: 32, severity: 'High' },
    { id: 'rb3', asset: 'temp_upload_files', breachType: 'Retention Breach', daysOverdue: 21, severity: 'Medium' },
    { id: 'rb4', asset: 'test_user_data', breachType: 'Retention Breach', daysOverdue: 11, severity: 'Medium' },
  ],

  archivalPortfolio: [
    { id: 'ap1', archiveType: 'Cold Storage', assets: 28, size: '7.5 TB', lastArchived: 'May 10, 2025' },
    { id: 'ap2', archiveType: 'Nearline Archive', assets: 16, size: '3.2 TB', lastArchived: 'May 09, 2025' },
    { id: 'ap3', archiveType: 'Compressed Archive', assets: 12, size: '1.4 TB', lastArchived: 'May 08, 2025' },
  ],

  disposalQueue: [
    { id: 'dq1', asset: 'temp_upload_files', disposalType: 'Secure Delete', scheduledDate: 'May 17, 2025', status: 'Pending' },
    { id: 'dq2', asset: 'old_invoice_records', disposalType: 'Secure Delete', scheduledDate: 'May 18, 2025', status: 'Pending' },
    { id: 'dq3', asset: 'inactive_user_logs', disposalType: 'Anonymize', scheduledDate: 'May 22, 2025', status: 'Pending' },
    { id: 'dq4', asset: 'test_environment_data', disposalType: 'Secure Delete', scheduledDate: 'May 24, 2025', status: 'Pending' },
  ],

  governanceHolds: [
    { id: 'gh1', holdType: 'Legal Hold', assets: 3, reason: 'Litigation', expiryOn: 'May 30, 2025' },
    { id: 'gh2', holdType: 'Compliance Hold', assets: 4, reason: 'Internal Regulatory', expiryOn: 'Jun 15, 2025' },
    { id: 'gh3', holdType: 'Investigation Hold', assets: 1, reason: 'Internal', expiryOn: 'Jun 01, 2025' },
  ],

  privacyControls: [
    { id: 'pc1', control: 'Consent Tracking', status: 'Enabled' },
    { id: 'pc2', control: 'Purpose Limitation', status: 'Enabled' },
    { id: 'pc3', control: 'Data Subject Rights', status: 'Enabled' },
    { id: 'pc4', control: 'Retention Enforcement', status: 'Enabled' },
    { id: 'pc5', control: 'Privacy Impact Assessments', status: 'Enabled' },
    { id: 'pc6', control: 'Purpose Impact Assessments', status: 'Enabled' },
  ],

  personalDataAssets: [
    { id: 'pda1', category: 'Customer PII', assets: 24, percentage: '63.2%' },
    { id: 'pda2', category: 'Employee PII', assets: 9, percentage: '23.7%' },
    { id: 'pda3', category: 'Vendor PII', assets: 3, percentage: '7.9%' },
    { id: 'pda4', category: 'Other Personal Data', assets: 2, percentage: '5.3%' },
  ],

  minimizationReview: [
    { id: 'mr1', status: 'Compliant', assets: 55, percentage: '58.2%' },
    { id: 'mr2', status: 'In Review', assets: 20, percentage: '21.1%' },
    { id: 'mr3', status: 'Non-Compliant', assets: 12, percentage: '12.3%' },
    { id: 'mr4', status: 'Not Assessed', assets: 11, percentage: '7.4%' },
  ],

  residencyLocations: [
    { id: 'rl1', location: 'Sri Lanka', assets: 122, percentage: '83.6%', residencyStatus: 'Compliant' },
    { id: 'rl2', location: 'Singapore', assets: 12, percentage: '8.2%', residencyStatus: 'Compliant' },
    { id: 'rl3', location: 'EU', assets: 8, percentage: '5.5%', residencyStatus: 'Restricted' },
    { id: 'rl4', location: 'United States', assets: 4, percentage: '2.7%', residencyStatus: 'Restricted' },
  ],

  sharingControls: [
    { id: 'sc1', sharingType: 'Internal Sharing', agreements: 22, compliance: 22, exceptions: 0 },
    { id: 'sc2', sharingType: 'Partner Sharing', agreements: 14, compliance: 13, exceptions: 1 },
    { id: 'sc3', sharingType: 'Third-Party Sharing', agreements: 12, compliance: 10, exceptions: 2 },
  ],

  sourceEndpoints: [
    { id: 'se1', source: 'Data Classification', status: 'Passed' },
    { id: 'se2', source: 'Ownership Assigned', status: 'Passed' },
    { id: 'se3', source: 'Retention Policy Assigned', status: 'Passed' },
    { id: 'se4', source: 'Residency Verified', status: 'Passed' },
    { id: 'se5', source: 'Privacy Controls Verified', status: 'Passed' },
    { id: 'se6', source: 'Access Controls Verified', status: 'Passed' },
    { id: 'se7', source: 'Audit Enabled', status: 'Passed' },
  ],

  accessGovernance: [
    { id: 'ag1', controlArea: 'Access Reviews', status: 'Compliant', coverage: 95 },
    { id: 'ag2', controlArea: 'Least Privilege', status: 'Compliant', coverage: 94 },
    { id: 'ag3', controlArea: 'Role Approvals', status: 'Compliant', coverage: 98 },
    { id: 'ag4', controlArea: 'Access Monitoring', status: 'Compliant', coverage: 95 },
  ],

  governanceReviews: [
    { id: 'gr1', reviewType: 'Ownership', due: 4, overdue: 1, completed: 28 },
    { id: 'gr2', reviewType: 'Retention', due: 3, overdue: 1, completed: 22 },
    { id: 'gr3', reviewType: 'Classification', due: 5, overdue: 2, completed: 34 },
    { id: 'gr4', reviewType: 'Privacy', due: 6, overdue: 1, completed: 20 },
  ],

  recentActivity: [
    { id: 'ra1', time: 'May 13, 2025 04:30 PM', activity: 'Retention Updated', assetDomain: 'DATA-CUST-ORD-001', performedBy: 'nimal.perera@slbeauty.com', status: 'Success' },
    { id: 'ra2', time: 'May 13, 2025 02:18 PM', activity: 'Ownership Assigned', assetDomain: 'supplier_information_registry', performedBy: 'samitha.jaya@slbeauty.com', status: 'Success' },
    { id: 'ra3', time: 'May 13, 2025 11:05 AM', activity: 'Classification Updated', assetDomain: 'finance_payment_transactions', performedBy: 'chanaka.dissanayake@slbeauty.com', status: 'Success' },
    { id: 'ra4', time: 'May 13, 2025 09:48 AM', activity: 'Retention Breach Detected', assetDomain: 'expired_promo_data', performedBy: 'system@slbeauty.com', status: 'Alert' },
    { id: 'ra5', time: 'May 12, 2025 05:20 PM', activity: 'Disposal Completed', assetDomain: 'old_invoice_records', performedBy: 'system@slbeauty.com', status: 'Success' },
  ],

  governanceGates: [
    { id: 'gg1', gate: 'Data Classification', status: 'Passed' },
    { id: 'gg2', gate: 'Ownership Assigned', status: 'Passed' },
    { id: 'gg3', gate: 'Retention Policy Assigned', status: 'Passed' },
    { id: 'gg4', gate: 'Residency Verified', status: 'Passed' },
    { id: 'gg5', gate: 'Privacy Controls Verified', status: 'Passed' },
    { id: 'gg6', gate: 'Access Controls Verified', status: 'Passed' },
    { id: 'gg7', gate: 'Audit Enabled', status: 'Passed' },
  ],

  charts: {
    retentionDisposalTrend: [
      { label: 'Apr 14', 'Retention Due': 20, Archived: 8, Disposed: 2 },
      { label: 'Apr 21', 'Retention Due': 22, Archived: 10, Disposed: 3 },
      { label: 'Apr 28', 'Retention Due': 21, Archived: 9, Disposed: 3 },
      { label: 'May 5', 'Retention Due': 23, Archived: 11, Disposed: 4 },
      { label: 'May 12', 'Retention Due': 24, Archived: 9, Disposed: 4 },
    ],
    healthTrend: [
      { label: 'Apr 14', 'Health Score': 91 },
      { label: 'Apr 21', 'Health Score': 92 },
      { label: 'Apr 28', 'Health Score': 93 },
      { label: 'May 5', 'Health Score': 94 },
      { label: 'May 12', 'Health Score': 95 },
    ],
    riskTrend: [
      { label: 'Apr 14', 'High Risk': 11, 'Medium Risk': 15, 'Low Risk': 22 },
      { label: 'Apr 21', 'High Risk': 10, 'Medium Risk': 14, 'Low Risk': 23 },
      { label: 'Apr 28', 'High Risk': 10, 'Medium Risk': 13, 'Low Risk': 24 },
      { label: 'May 5', 'High Risk': 9, 'Medium Risk': 12, 'Low Risk': 25 },
      { label: 'May 12', 'High Risk': 8, 'Medium Risk': 11, 'Low Risk': 26 },
    ],
    aiAnalyticsDataUse: [
      { name: 'Compliant', value: 18, color: '#10b981' },
      { name: 'Review', value: 6, color: '#f59e0b' },
      { name: 'Pending', value: 4, color: '#64748b' },
    ],
    governanceExceptions: [
      { name: 'Approved', value: 3, color: '#10b981' },
      { name: 'Review', value: 2, color: '#f59e0b' },
      { name: 'Expired', value: 2, color: '#64748b' },
    ],
    governanceRisks: [
      { name: 'High', value: 4, color: '#f43f5e' },
      { name: 'Medium', value: 4, color: '#f59e0b' },
      { name: 'Low', value: 3, color: '#10b981' },
    ],
  },
};
