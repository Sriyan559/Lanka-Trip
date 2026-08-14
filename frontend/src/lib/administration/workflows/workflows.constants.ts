import { WorkflowFullData } from './workflows.types';

export const WORKFLOW_METADATA = {
  id: 'AD11',
  name: 'Workflows, Approvals & Administrative Process Control',
  route: '/admin/administration/workflows',
  module: 'Administration',
  domain: 'Workflows & Approvals',
};

export const WORKFLOW_TABS = [
  { id: 'overview', label: 'Workflow Overview' },
  { id: 'definitions', label: 'Workflow Definitions' },
  { id: 'approval-policies', label: 'Approval Policies' },
  { id: 'active-instances', label: 'Active Instances' },
  { id: 'approval-queue', label: 'Approval Queue' },
  { id: 'routing-rules', label: 'Routing Rules' },
  { id: 'sla-escalation', label: 'SLA & Escalation' },
  { id: 'delegations', label: 'Delegations' },
  { id: 'reassignments', label: 'Reassignments' },
  { id: 'versions', label: 'Versions' },
  { id: 'process-health', label: 'Process Health' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'activity', label: 'Activity' },
  { id: 'audit-history', label: 'Audit History' },
] as const;

export const WORKFLOW_FILTERS = [
  { id: 'workflow', label: 'Workflow' },
  { id: 'workflow-type', label: 'Workflow Type' },
  { id: 'domain', label: 'Domain' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'business-unit', label: 'Business Unit' },
  { id: 'environment', label: 'Environment' },
  { id: 'workflow-status', label: 'Workflow Status' },
  { id: 'approval-status', label: 'Approval Status' },
  { id: 'sla-status', label: 'SLA Status' },
  { id: 'risk-level', label: 'Risk Level' },
  { id: 'owner', label: 'Owner' },
  { id: 'approver-role', label: 'Approver Role' },
];

export const QUICK_FILTERS = [
  { id: 'active', label: 'Active', count: 36 },
  { id: 'draft', label: 'Draft', count: 5 },
  { id: 'pending-approval', label: 'Pending Approval', count: 28 },
  { id: 'sla-warning', label: 'SLA Warning', count: 14 },
  { id: 'sla-breach', label: 'SLA Breach', count: 6 },
  { id: 'blocked', label: 'Blocked', count: 4 },
  { id: 'escalated', label: 'Escalated', count: 7 },
  { id: 'deferred', label: 'Deferred', count: 3 },
  { id: 'request-changes', label: 'Request Changes', count: 26 },
  { id: 'high-risk', label: 'High Risk', count: 12 },
  { id: 'step-up-required', label: 'Step-Up Required', count: 18 },
  { id: 'review-due', label: 'Review Due', count: 3 },
  { id: 'exceptions', label: 'Exceptions', count: 5 },
  { id: 'needs-attention', label: 'Needs Attention', count: 20 },
];

export const DEFAULT_WORKFLOW_DATA: WorkflowFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    workflowRegistry: 'Connected',
    approvalRegistry: 'Connected',
    ruleRegistry: 'Connected',
    securityEngine: 'Healthy',
    notificationEngine: 'Healthy',
    slaEngine: 'Healthy',
    escalationEngine: 'Healthy',
    auditService: 'Connected',
    dataCompleteness: '99%',
    lastRefreshed: 'Aug 13, 2026 4:40 AM',
    accessScope: 'Assigned Administration Scope',
  },

  kpis: {
    workflowDefinitions: { value: 42, trend: '2%', trendDirection: 'up', sparkline: [40, 40, 41, 41, 42, 42] },
    activeWorkflows: { value: 36, trend: '4%', trendDirection: 'up', sparkline: [33, 34, 34, 35, 35, 36] },
    activeInstances: { value: '1,284', trend: '6%', trendDirection: 'up', sparkline: [1150, 1190, 1220, 1250, 1270, 1284] },
    pendingApproval: { value: 28, trend: '12%', trendDirection: 'down', sparkline: [35, 33, 31, 30, 29, 28] },
    slaBreaches: { value: 6, trend: '25%', trendDirection: 'down', sparkline: [10, 9, 8, 7, 7, 6] },
    blockedWorkflows: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [6, 5, 5, 4, 4, 4] },
    escalated: { value: 7, trend: '12%', trendDirection: 'down', sparkline: [9, 8, 8, 7, 7, 7] },
    delegations: { value: 5, trend: '0%', trendDirection: 'up', sparkline: [5, 5, 5, 5, 5, 5] },
    reviewsDue: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
    workflowHealth: { value: '96 / 100', trend: '1 pt', trendDirection: 'up', sparkline: [94, 94, 95, 95, 96, 96] },

    approvalPolicies: { value: 34, trend: '3%', trendDirection: 'up', sparkline: [32, 32, 33, 33, 34, 34] },
    workflowVersions: { value: 78, trend: '5%', trendDirection: 'up', sparkline: [72, 74, 75, 76, 77, 78] },
    stages: { value: 214, trend: '2%', trendDirection: 'up', sparkline: [205, 208, 210, 212, 213, 214] },
    routingRules: { value: 96, trend: '4%', trendDirection: 'up', sparkline: [90, 92, 93, 94, 95, 96] },
    autoApproved: { value: 318, trend: '8%', trendDirection: 'up', sparkline: [280, 290, 300, 305, 312, 318] },
    rejected: { value: 42, trend: '5%', trendDirection: 'down', sparkline: [48, 46, 45, 44, 43, 42] },
    requestChanges: { value: 26, trend: '10%', trendDirection: 'down', sparkline: [32, 30, 29, 28, 27, 26] },
    delegationsTemp: { value: 12, trend: '8%', trendDirection: 'up', sparkline: [10, 11, 11, 11, 12, 12] },
    workflowExceptions: { value: 5, trend: '16%', trendDirection: 'down', sparkline: [8, 7, 6, 6, 5, 5] },
    overdueTasks: { value: 9, trend: '18%', trendDirection: 'down', sparkline: [14, 12, 11, 10, 9, 9] },
  },

  definitions: [
    { id: 'wd1', workflowKey: 'WF-CONFIG-PROD-001', workflowName: 'Platform Configuration Change', workflowType: 'system.configuration.change', domain: 'Platform Config', version: 'v1.2', triggerType: 'Approval Change Request', stages: 4, stepUp: 'Yes', approvalSource: 'Platform Admin', routingMode: 'Parallel', owner: 'Platform Admin', securityReview: 'Passed', autoApproved: 126, pendingApproval: 7, slaLevel: '0–1h', risk: 'High' },
    { id: 'wd2', workflowKey: 'WF-ACCESS-PROV-002', workflowName: 'User Access Provisioning', workflowType: 'user.access.provisioning', domain: 'Identity & Access', version: 'v2.0', triggerType: 'Access Request', stages: 3, stepUp: 'No', approvalSource: 'Security Admin', routingMode: 'Parallel', owner: 'IAM Team', securityReview: 'Passed', autoApproved: 94, pendingApproval: 4, slaLevel: '0–2h', risk: 'High' },
    { id: 'wd3', workflowKey: 'WF-TEAM-UPDATE-003', workflowName: 'Team Structure Change', workflowType: 'team.structure.change', domain: 'Organization', version: 'v1.5', triggerType: 'Admin Change Request', stages: 3, stepUp: 'Yes', approvalSource: 'Org Admin', routingMode: 'Sequential', owner: 'Org Admin', securityReview: 'Passed', autoApproved: 68, pendingApproval: 2, slaLevel: '0–4h', risk: 'Medium' },
    { id: 'wd4', workflowKey: 'WF-DATA-EXPORT-004', workflowName: 'Data Export Compliance', workflowType: 'data.export.request', domain: 'Data Governance', version: 'v1.1', triggerType: 'Compliance Request', stages: 4, stepUp: 'Yes', approvalSource: 'Data Governance', routingMode: 'Parallel', owner: 'Data Gov Team', securityReview: 'Passed', autoApproved: 32, pendingApproval: 1, slaLevel: '0–8h', risk: 'Medium' },
    { id: 'wd5', workflowKey: 'WF-BU-SET-005', workflowName: 'Business Units Scope Change', workflowType: 'bu.scope.change', domain: 'Organization', version: 'v1.3', triggerType: 'Admin Request', stages: 2, stepUp: 'No', approvalSource: 'Org Admin', routingMode: 'Parallel', owner: 'Finance Ops', securityReview: 'Passed', autoApproved: 22, pendingApproval: 3, slaLevel: '0–2h', risk: 'Low' },
  ],

  selectedWorkflow: {
    workflowKey: 'WF-CONFIG-PROD-001',
    workflowName: 'Platform Configuration Change',
    domain: 'Platform Configuration',
    version: 'v1.2',
    triggerType: 'Approval Change Request',
    description: 'Governed workflow for production configuration changes.',
    stages: 4,
    approvalSteps: 4,
    stepUp: 'Yes',
    sla: '1 Hour',
    escalation: 'Enabled',
    routingMode: 'Parallel',
    owner: 'Platform Administration',
    instances: 126,
    approvalRate: 94,
    slaCompliance: 96,
    workflowHealth: 97,
    status: 'Active',
  },

  pipelineStages: [
    { id: 'stg1', label: 'Request Created', count: 124, status: 'Completed' },
    { id: 'stg2', label: 'Validation', count: 124, status: 'Completed' },
    { id: 'stg3', label: 'Security Review', count: 64, status: 'Completed' },
    { id: 'stg4', label: 'Owner Approval', count: 36, status: 'Completed' },
    { id: 'stg5', label: 'Change Execution', count: 36, status: 'Completed' },
    { id: 'stg6', label: 'Change Execution', count: 28, status: 'In-Progress' },
    { id: 'stg7', label: 'Verification', count: 18, status: 'Pending' },
    { id: 'stg8', label: 'Completed', count: 96, status: 'Upcoming' },
  ],

  approvalChain: [
    { id: 'ac1', role: 'Requester', actor: 'You', status: 'Completed' },
    { id: 'ac2', role: 'Security Review', actor: 'S. Ishan', status: 'Current' },
    { id: 'ac3', role: 'Change Execution', actor: 'J. Fernando', status: 'Pending' },
    { id: 'ac4', role: 'Final Validation', actor: 'QA Team', status: 'Upcoming' },
  ],

  pendingApprovals: [
    { id: 'pa1', requestId: 'REQ-2025-0812-001', workflow: 'WF-CONFIG-PROD-001', step: 'Security Review', approver: 'S. Ishan', currentStage: 'Security Review', requestedBy: 'Platform Admin', age: '25m', sla: '1h', status: 'Pending' },
    { id: 'pa2', requestId: 'REQ-2025-0812-002', workflow: 'WF-ACCESS-PROV-002', step: 'Admin Approval', approver: 'IAM Admin', currentStage: 'Access Approval', requestedBy: 'Security Admin', age: '1h 10m', sla: '2h', status: 'Pending' },
    { id: 'pa3', requestId: 'REQ-2025-0812-003', workflow: 'WF-TEAM-UPDATE-003', step: 'Owner Approval', approver: 'J. Fernando', currentStage: 'Admin Approval', requestedBy: 'Org Admin', age: '40m', sla: '2h', status: 'Pending' },
    { id: 'pa4', requestId: 'REQ-2025-0812-004', workflow: 'WF-DATA-EXPORT-004', step: 'Data Governance', approver: 'Data Gov Lead', currentStage: 'Data Governance', requestedBy: 'Data Team', age: '2h 05m', sla: '4h', status: 'Pending' },
    { id: 'pa5', requestId: 'REQ-2025-0812-005', workflow: 'WF-CONFIG-PROD-001', step: 'Final Validation', approver: 'QA Lead', currentStage: 'Final Validation', requestedBy: 'Platform Admin', age: '1h 12m', sla: '1h', status: 'Pending' },
  ],

  approvalPolicies: [
    { id: 'ap1', policyName: 'Platform Change Policy', domain: 'Platform Config', approvalModel: 'Parallel', minApprovers: 2, stepUp: 'Yes', autoApproval: '< 1% (Conditions)', status: 'Active' },
    { id: 'ap2', policyName: 'Access Approval Policy', domain: 'Identity & Access', approvalModel: 'Parallel', minApprovers: 1, stepUp: 'No', autoApproval: '< 5% (Conditions)', status: 'Active' },
    { id: 'ap3', policyName: 'Data Governance Policy', domain: 'Data Governance', approvalModel: 'Sequential', minApprovers: 2, stepUp: 'Yes', autoApproval: 'None', status: 'Active' },
    { id: 'ap4', policyName: 'Finance Approval Policy', domain: 'Finance', approvalModel: 'Sequential', minApprovers: 1, stepUp: 'No', autoApproval: '< 8% (Conditions)', status: 'Active' },
  ],

  routingRules: [
    { id: 'rr1', ruleName: 'High-Risk Routes', domain: 'Platform Config', condition: 'Risk == High', routingMode: 'Parallel', owner: 'Security Admin', status: 'Active' },
    { id: 'rr2', ruleName: 'Access by Role', domain: 'Identity & Access', condition: 'Role-based', routingMode: 'Parallel', owner: 'IAM Team', status: 'Active' },
    { id: 'rr3', ruleName: 'Data Export Rule', domain: 'Data Governance', condition: 'Export request', routingMode: 'Sequential', owner: 'Data Gov Team', status: 'Active' },
    { id: 'rr4', ruleName: 'Finance Threshold', domain: 'Finance', condition: 'Amount > Threshold', routingMode: 'Sequential', owner: 'Finance Ops', status: 'Active' },
  ],

  slaEscalations: [
    { id: 'se1', slaName: 'Config Change SLA', domain: 'Platform Config', slaDuration: '1h', escalationAfter: '30m', escalationTo: 'Security Admin', status: 'Active' },
    { id: 'se2', slaName: 'Access Provision SLA', domain: 'Identity & Access', slaDuration: '2h', escalationAfter: '1h', escalationTo: 'IAM Admin', status: 'Active' },
    { id: 'se3', slaName: 'Data Export SLA', domain: 'Data Governance', slaDuration: '4h', escalationAfter: '2h', escalationTo: 'Data Gov Lead', status: 'Active' },
    { id: 'se4', slaName: 'Finance Approval SLA', domain: 'Finance', slaDuration: '8h', escalationAfter: '4h', escalationTo: 'Finance Manager', status: 'Active' },
  ],

  stepUpRequirements: [
    { id: 'sur1', scenario: 'Production Change', trigger: 'Risk == Medium', stepUpLevel: 2, approvalSource: 'Security Admin', status: 'Active' },
    { id: 'sur2', scenario: 'Access Elevation', trigger: 'Privilege Increase', stepUpLevel: 1, approvalSource: 'IAM Admin', status: 'Active' },
    { id: 'sur3', scenario: 'Data Export', trigger: 'Sensitive Data', stepUpLevel: 2, approvalSource: 'Data Gov Lead', status: 'Active' },
    { id: 'sur4', scenario: 'Finance High Value', trigger: 'Amount > Threshold', stepUpLevel: 1, approvalSource: 'Finance Manager', status: 'Active' },
  ],

  segregationControls: [
    { id: 'sc1', control: 'Maker-Checker', description: 'Requester cannot approve own request', status: 'Active' },
    { id: 'sc2', control: 'Role Separation', description: 'Incompatible roles cannot approve', status: 'Active' },
    { id: 'sc3', control: 'SoD Matrix', description: 'Critical duties separated by role', status: 'Active' },
    { id: 'sc4', control: 'Conflict of Interest', description: 'Approver conflict detection enabled', status: 'Active' },
  ],

  governanceGates: [
    { id: 'gg1', gate: 'Security Review', description: 'Security assessment passed', required: 'Yes', status: 'Active' },
    { id: 'gg2', gate: 'Compliance Check', description: 'Compliance validation passed', required: 'Yes', status: 'Active' },
    { id: 'gg3', gate: 'Data Classification', description: 'Data classification verified', required: 'Yes', status: 'Active' },
    { id: 'gg4', gate: 'Risk Assessment', description: 'Risk level assessed', required: 'Yes', status: 'Active' },
  ],

  processHealth: [
    { id: 'ph1', metric: 'SLA Compliance', score: 96, healthScore: '96/100', trend: 'up', trendValue: '1%', last7Days: '95%' },
    { id: 'ph2', metric: 'Approval Timeliness', score: 94, healthScore: '94/100', trend: 'up', trendValue: '2%', last7Days: '93%' },
    { id: 'ph3', metric: 'Exception Rate', score: 2, healthScore: '98/100', trend: 'down', trendValue: '1%', last7Days: '3%' },
    { id: 'ph4', metric: 'Rework Rate', score: 1, healthScore: '99/100', trend: 'up', trendValue: '0%', last7Days: '2%' },
  ],

  dependencies: [
    { id: 'dep1', dependentWorkflow: 'Production Deployment', dependsOn: 'Production Config Change', dependencyType: 'Blocking', status: 'Active' },
    { id: 'dep2', dependentWorkflow: 'Access Rollback', dependsOn: 'Access Provisioning', dependencyType: 'Blocking', status: 'Active' },
    { id: 'dep3', dependentWorkflow: 'Data Governance Audit', dependsOn: 'Data Export Request', dependencyType: 'Informational', status: 'Active' },
    { id: 'dep4', dependentWorkflow: 'Finance Payout', dependsOn: 'Finance Approval', dependencyType: 'Blocking', status: 'Active' },
  ],

  bottlenecks: [
    { id: 'b1', stage: 'Security Review', instances: 224, avgWaitTime: '38m', impact: 'High' },
    { id: 'b2', stage: 'Owner Approval', instances: 184, avgWaitTime: '27m', impact: 'High' },
    { id: 'b3', stage: 'Data Governance', instances: 132, avgWaitTime: '41m', impact: 'Medium' },
    { id: 'b4', stage: 'Final Validation', instances: 98, avgWaitTime: '22m', impact: 'Low' },
    { id: 'b5', stage: 'Change Execution', instances: 76, avgWaitTime: '15m', impact: 'Low' },
  ],

  recentActivity: [
    { id: 'ra1', workflow: 'WF-CONFIG-PROD-001', activity: 'Security Review Approved', by: 'S. Ishan', time: 'Aug 13, 4:35 AM', status: 'Approved' },
    { id: 'ra2', workflow: 'WF-ACCESS-PROV-002', activity: 'Approval Requested', by: 'IAM Admin', time: 'Aug 13, 4:20 AM', status: 'Pending' },
    { id: 'ra3', workflow: 'WF-TEAM-UPDATE-003', activity: 'Owner Approval Pending', by: 'J. Fernando', time: 'Aug 13, 4:05 AM', status: 'Pending' },
    { id: 'ra4', workflow: 'WF-DATA-EXPORT-004', activity: 'Data Governance Approved', by: 'N. Perera', time: 'Aug 13, 3:45 AM', status: 'Approved' },
    { id: 'ra5', workflow: 'WF-CONFIG-PROD-001', activity: 'Change Execution Started', by: 'Ops Team', time: 'Aug 13, 3:30 AM', status: 'In-Progress' },
  ],

  migrationReadiness: [
    { id: 'mr1', dimension: 'Workflow Compatibility', readiness: 100, status: 'Ready' },
    { id: 'mr2', dimension: 'Data Migration', readiness: 95, status: 'Ready' },
    { id: 'mr3', dimension: 'Security Mapping', readiness: 98, status: 'Ready' },
    { id: 'mr4', dimension: 'Routing & Rules', readiness: 96, status: 'Ready' },
    { id: 'mr5', dimension: 'Overall Readiness', readiness: 97, status: 'Ready' },
  ],

  ownership: [
    { id: 'ow1', domain: 'Platform Config', owner: 'Platform Admin', backupOwner: 'Security Admin', status: 'Active' },
    { id: 'ow2', domain: 'Identity & Access', owner: 'IAM Team', backupOwner: 'Security Admin', status: 'Active' },
    { id: 'ow3', domain: 'Data Governance', owner: 'Data Gov Team', backupOwner: 'Compliance Lead', status: 'Active' },
    { id: 'ow4', domain: 'Finance', owner: 'Finance Ops', backupOwner: 'Finance Manager', status: 'Active' },
  ],

  charts: {
    throughputTrend: [
      { label: 'Jul 15', Created: 600, Completed: 550, Rejected: 40, Deferred: 20 },
      { label: 'Jul 20', Created: 640, Completed: 590, Rejected: 42, Deferred: 22 },
      { label: 'Jul 25', Created: 680, Completed: 630, Rejected: 38, Deferred: 18 },
      { label: 'Jul 30', Created: 710, Completed: 670, Rejected: 44, Deferred: 24 },
      { label: 'Aug 4', Created: 740, Completed: 700, Rejected: 41, Deferred: 20 },
      { label: 'Aug 9', Created: 780, Completed: 740, Rejected: 43, Deferred: 25 },
      { label: 'Aug 13', Created: 820, Completed: 780, Rejected: 42, Deferred: 26 },
    ],
    slaTrend: [
      { label: 'Jul 15', 'Within SLA': 94, 'At Risk': 4, Breach: 2 },
      { label: 'Jul 20', 'Within SLA': 95, 'At Risk': 3, Breach: 2 },
      { label: 'Jul 25', 'Within SLA': 95, 'At Risk': 4, Breach: 1 },
      { label: 'Jul 30', 'Within SLA': 96, 'At Risk': 3, Breach: 1 },
      { label: 'Aug 4', 'Within SLA': 96, 'At Risk': 3, Breach: 1 },
      { label: 'Aug 9', 'Within SLA': 96, 'At Risk': 3, Breach: 1 },
      { label: 'Aug 13', 'Within SLA': 96, 'At Risk': 3, Breach: 1 },
    ],
  },
};
