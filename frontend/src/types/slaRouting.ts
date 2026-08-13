export interface SlaPolicyItem {
  id: string;
  policyId: string;
  policyName: string;
  type: string;
  scope: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  customerTier: string;
  channel: string;
  firstResponse: string;
  updateInterval: string;
  resolution: string;
  escalationThreshold: string;
  businessCalendar: string;
  version: string;
  status: 'Active' | 'Draft' | 'Scheduled' | 'Archived';
  approvalState: 'Approved' | 'Pending Review' | 'Draft' | 'Rejected';
  lastUpdated: string;
}

export interface RoutingRuleItem {
  id: string;
  ruleId: string;
  ruleName: string;
  category: string;
  triggerCondition: string;
  targetQueue: string;
  assignedTeam: string;
  assignedAgent: string;
  precedence: number;
  status: 'Active' | 'Draft' | 'Disabled';
}

export interface EscalationRuleItem {
  trigger: string;
  at: string;
  escalateTo: string;
  action: string;
}

export interface PolicyExceptionItem {
  id: string;
  reason: string;
  approvedBy: string;
  from: string;
  to: string;
  status: 'Approved' | 'Pending' | 'Expired' | 'Rejected';
}

export interface ConflictItem {
  conflict: string;
  severity: 'High' | 'Medium' | 'Low';
  resolution: string;
}

export interface PolicyVersionItem {
  version: string;
  status: 'Active' | 'Archived' | 'Draft' | 'Scheduled';
  effectiveFrom: string;
  changesCount: number;
}

export interface SimulationResult {
  customerTier: string;
  priority: string;
  issueType: string;
  channel: string;
  region: string;
  matchedPolicy: string;
  assignedQueue: string;
  assignedTeam: string;
  assignedAgent: string;
  firstResponseTarget: string;
  escalationRule: string;
  status: 'Passed' | 'Failed' | 'Warning';
}

export interface SlaRoutingFilterParams {
  search?: string;
  status?: string;
  type?: string;
  businessUnit?: string;
  category?: string;
  channel?: string;
  queue?: string;
  priority?: string;
  customerTier?: string;
  region?: string;
  effectiveState?: string;
  approvalState?: string;
  conflictState?: string;
  dateRange?: string;
}
