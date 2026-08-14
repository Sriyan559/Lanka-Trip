/**
 * Type definitions for Workflows, Approvals & Administrative Process Control (AD11)
 */

export type WorkflowStatus = 'Active' | 'Draft' | 'Pending' | 'Blocked' | 'Escalated' | 'Completed';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type SLAStatus = 'Within SLA' | 'SLA Warning' | 'SLA Breach' | 'At Risk';
export type StageStatus = 'Completed' | 'In-Progress' | 'Pending' | 'Upcoming' | 'Skipped';

export interface WorkflowDefinitionRecord {
  id: string;
  workflowKey: string;
  workflowName: string;
  workflowType: string;
  domain: string;
  version: string;
  triggerType: string;
  stages: number;
  stepUp: 'Yes' | 'No';
  approvalSource: string;
  routingMode: 'Parallel' | 'Sequential' | 'Conditional';
  owner: string;
  securityReview: 'Passed' | 'Pending' | 'Required';
  autoApproved: number;
  pendingApproval: number;
  slaLevel: '0–1h' | '0–2h' | '0–4h' | '0–8h';
  risk: RiskLevel;
}

export interface SelectedWorkflowDetails {
  workflowKey: string;
  workflowName: string;
  domain: string;
  version: string;
  triggerType: string;
  description: string;
  stages: number;
  approvalSteps: number;
  stepUp: 'Yes' | 'No';
  sla: string;
  escalation: string;
  routingMode: string;
  owner: string;
  instances: number;
  approvalRate: number;
  slaCompliance: number;
  workflowHealth: number;
  status: WorkflowStatus;
}

export interface WorkflowStageNode {
  id: string;
  label: string;
  count: number;
  status: StageStatus;
}

export interface ApprovalChainNode {
  id: string;
  role: string;
  actor: string;
  status: 'Completed' | 'Current' | 'Pending' | 'Upcoming';
}

export interface PendingApprovalRow {
  id: string;
  requestId: string;
  workflow: string;
  step: string;
  approver: string;
  currentStage: string;
  requestedBy: string;
  age: string;
  sla: string;
  status: 'Pending' | 'Escalated' | 'Breached';
}

export interface ApprovalPolicyRow {
  id: string;
  policyName: string;
  domain: string;
  approvalModel: string;
  minApprovers: number;
  stepUp: 'Yes' | 'No';
  autoApproval: string;
  status: 'Active' | 'Draft' | 'Pending';
}

export interface RoutingRuleRow {
  id: string;
  ruleName: string;
  domain: string;
  condition: string;
  routingMode: 'Parallel' | 'Sequential' | 'Conditional';
  owner: string;
  status: 'Active' | 'Draft' | 'Disabled';
}

export interface SlaEscalationRow {
  id: string;
  slaName: string;
  domain: string;
  slaDuration: string;
  escalationAfter: string;
  escalationTo: string;
  status: 'Active' | 'Warning' | 'Breached';
}

export interface StepUpRequirementRow {
  id: string;
  scenario: string;
  trigger: string;
  stepUpLevel: number;
  approvalSource: string;
  status: 'Active' | 'Disabled';
}

export interface SegregationControlRow {
  id: string;
  control: string;
  description: string;
  status: 'Active' | 'Warning' | 'Failed';
}

export interface GovernanceGateRow {
  id: string;
  gate: string;
  description: string;
  required: 'Yes' | 'No';
  status: 'Active' | 'Passed' | 'Warning';
}

export interface ProcessHealthRow {
  id: string;
  metric: string;
  score: number;
  healthScore: string;
  trend: 'up' | 'down';
  trendValue: string;
  last7Days: string;
}

export interface WorkflowDependencyRow {
  id: string;
  dependentWorkflow: string;
  dependsOn: string;
  dependencyType: 'Blocking' | 'Informational' | 'Active';
  status: 'Active' | 'Warning';
}

export interface ProcessBottleneckRow {
  id: string;
  stage: string;
  instances: number;
  avgWaitTime: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface WorkflowActivityRow {
  id: string;
  workflow: string;
  activity: string;
  by: string;
  time: string;
  status: 'Approved' | 'Pending' | 'In-Progress' | 'Rejected';
}

export interface MigrationReadinessRow {
  id: string;
  dimension: string;
  readiness: number;
  status: 'Ready' | 'In-Progress';
}

export interface WorkflowOwnershipRow {
  id: string;
  domain: string;
  owner: string;
  backupOwner: string;
  status: 'Active' | 'Pending';
}

export interface WorkflowFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  definitions: WorkflowDefinitionRecord[];
  selectedWorkflow: SelectedWorkflowDetails;
  pipelineStages: WorkflowStageNode[];
  approvalChain: ApprovalChainNode[];
  pendingApprovals: PendingApprovalRow[];
  approvalPolicies: ApprovalPolicyRow[];
  routingRules: RoutingRuleRow[];
  slaEscalations: SlaEscalationRow[];
  stepUpRequirements: StepUpRequirementRow[];
  segregationControls: SegregationControlRow[];
  governanceGates: GovernanceGateRow[];
  processHealth: ProcessHealthRow[];
  dependencies: WorkflowDependencyRow[];
  bottlenecks: ProcessBottleneckRow[];
  recentActivity: WorkflowActivityRow[];
  migrationReadiness: MigrationReadinessRow[];
  ownership: WorkflowOwnershipRow[];
  charts: {
    throughputTrend: { label: string; Created: number; Completed: number; Rejected: number; Deferred: number }[];
    slaTrend: { label: string; 'Within SLA': number; 'At Risk': number; Breach: number }[];
  };
}
