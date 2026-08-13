export type QaEvaluationStatus = 'Passed' | 'Needs Attention' | 'Review Due' | 'Failed';

export type DefectSeverity = 'High' | 'Critical' | 'Medium' | 'Low';

export interface QaEvaluationItem {
  id: string;
  evaluationId: string;
  caseId: string;
  customerName: string;
  agentName: string;
  teamName: string;
  channel: string;
  evaluatorName: string;
  score: number;
  qaScore: number;
  criticalDefects: number | string;
  policyAdherence: number;
  status: QaEvaluationStatus;
  evaluatedAt: string;
}

export interface TeamQualityItem {
  id: string;
  name: string;
  evaluations: number;
  csat: number;
  qaScore: number;
  ces: number;
  repeatContactPercent: number;
  policyAdherencePercent: number;
  criticalDefects: number;
  coachingDue: number;
  status: 'Excellent' | 'Good' | 'Needs Attention';
}

export interface ScorecardCategoryItem {
  category: string;
  weight: number;
  score: number;
}

export interface CriticalDefectItem {
  type: string;
  count: number;
  severity: DefectSeverity;
}

export interface LowCsatCaseItem {
  caseId: string;
  customerName: string;
  teamName: string;
  issue: string;
  csat: number;
  repeatContact: boolean;
  recoveryProgress: string;
  owner: string;
}

export interface QualityDefectItem {
  id: string;
  defectId: string;
  category: string;
  severity: DefectSeverity;
  customerImpact: 'High' | 'Medium' | 'Low';
  coachingRequired: boolean;
  owner: string;
  status: 'Open' | 'Review Due' | 'In Review';
}

export interface ServiceInitiativeItem {
  name: string;
  baseline: string;
  target: string;
  current: string;
  owner: string;
  status: 'On Track' | 'Review Due' | 'Needs Attention';
}

export interface ScorecardVersionItem {
  version: string;
  status: 'Active' | 'Archived';
  effectiveFrom: string;
  notes: string;
}

export interface SatisfactionQaFilterParams {
  team?: string;
  agent?: string;
  queue?: string;
  channel?: string;
  category?: string;
  qaStatus?: string;
  severity?: string;
  csatBand?: string;
  effort?: string;
  readinessFilter?: string;
}
