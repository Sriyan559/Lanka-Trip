import {
  QaEvaluationItem,
  TeamQualityItem,
  ScorecardCategoryItem,
  CriticalDefectItem,
  LowCsatCaseItem,
  QualityDefectItem,
  ServiceInitiativeItem,
  ScorecardVersionItem,
} from '@/types/satisfactionQa';

export const mockQaEvaluations: QaEvaluationItem[] = [
  { id: '1', evaluationId: 'QA-2026-00421', caseId: 'CS-586129', customerName: 'S. Richards', agentName: 'J. Patel', teamName: 'Cust Ops', channel: 'Chat', evaluatorName: 'A. Perera', score: 97, qaScore: 97, criticalDefects: 0, policyAdherence: 90, status: 'Passed', evaluatedAt: 'May 18, 10:02 AM' },
  { id: '2', evaluationId: 'QA-2026-00420', caseId: 'CS-586121', customerName: 'M. Chen', agentName: 'K. Fernando', teamName: 'Order & Delivery', channel: 'Email', evaluatorName: 'A. Perera', score: 94, qaScore: 90, criticalDefects: 1, policyAdherence: 94, status: 'Passed', evaluatedAt: 'May 18, 09:41 AM' },
  { id: '3', evaluationId: 'QA-2026-00419', caseId: 'CS-584171', customerName: 'A. Das', agentName: 'R. Rajakaruna', teamName: 'Returns & Refunds', channel: 'Email', evaluatorName: 'A. Perera', score: 79, qaScore: 76, criticalDefects: 'Yes', policyAdherence: 74, status: 'Needs Attention', evaluatedAt: 'May 17, 04:30 PM' },
  { id: '4', evaluationId: 'QA-2026-00418', caseId: 'CS-584156', customerName: 'S. Kim', agentName: 'T. Fernando', teamName: 'Product & Supplier', channel: 'Phone', evaluatorName: 'W. Wijesinghe', score: 84, qaScore: 80, criticalDefects: 0, policyAdherence: 87, status: 'Review Due', evaluatedAt: 'May 17, 02:15 PM' },
  { id: '5', evaluationId: 'QA-2026-00417', caseId: 'CS-584132', customerName: 'K. Jayasinghe', agentName: 'C. De Silva', teamName: 'Complaints & Esc', channel: 'Email', evaluatorName: 'B. Fernando', score: 88, qaScore: 90, criticalDefects: 0, policyAdherence: 84, status: 'Passed', evaluatedAt: 'May 17, 11:30 AM' },
];

export const mockTeamQuality: TeamQualityItem[] = [
  { id: '1', name: 'Customer Operations', evaluations: 142, csat: 92, qaScore: 96, ces: 4.5, repeatContactPercent: 5, policyAdherencePercent: 97, criticalDefects: 1, coachingDue: 4, status: 'Excellent' },
  { id: '2', name: 'Order & Delivery', evaluations: 298, csat: 90, qaScore: 92, ces: 4.2, repeatContactPercent: 8, policyAdherencePercent: 95, criticalDefects: 2, coachingDue: 6, status: 'Good' },
  { id: '3', name: 'Returns & Refunds', evaluations: 264, csat: 89, qaScore: 91, ces: 4.1, repeatContactPercent: 9, policyAdherencePercent: 94, criticalDefects: 2, coachingDue: 7, status: 'Good' },
  { id: '4', name: 'Product & Supplier', evaluations: 186, csat: 91, qaScore: 96, ces: 4.4, repeatContactPercent: 5, policyAdherencePercent: 96, criticalDefects: 1, coachingDue: 5, status: 'Good' },
  { id: '5', name: 'Complaints & Escalations', evaluations: 124, csat: 87, qaScore: 89, ces: 3.8, repeatContactPercent: 14, policyAdherencePercent: 92, criticalDefects: 1, coachingDue: 6, status: 'Needs Attention' },
];

export const mockScorecardCategories: ScorecardCategoryItem[] = [
  { category: 'Greeting & Authentication', weight: 10, score: 96 },
  { category: 'Needs Identification', weight: 15, score: 94 },
  { category: 'Accuracy & Policy', weight: 25, score: 98 },
  { category: 'Ownership & Next Steps', weight: 20, score: 96 },
  { category: 'Communication Quality', weight: 15, score: 97 },
  { category: 'Documentation', weight: 15, score: 95 },
];

export const mockCriticalDefects: CriticalDefectItem[] = [
  { type: 'Incorrect Regulatory Guidance', count: 2, severity: 'High' },
  { type: 'Unclear Product Guidance', count: 2, severity: 'High' },
  { type: 'Unauthorized Refund Promise', count: 1, severity: 'High' },
  { type: 'Privacy / Security Breach', count: 1, severity: 'Critical' },
  { type: 'Missed Critical Escalation', count: 1, severity: 'High' },
];

export const mockLowCsatCases: LowCsatCaseItem[] = [
  { caseId: 'CS-586120', customerName: 'M. Silva', teamName: 'Returns', issue: 'Refund delay', csat: 1, repeatContact: true, recoveryProgress: 'In Progress', owner: 'R. Silva' },
  { caseId: 'CS-585991', customerName: 'U. Perera', teamName: 'Delivery', issue: 'Order not delivered', csat: 1, repeatContact: true, recoveryProgress: 'In Progress', owner: 'N. Silva' },
  { caseId: 'CS-585900', customerName: 'S. Fernando', teamName: 'Cust Ops', issue: 'Rude behavior', csat: 2, repeatContact: false, recoveryProgress: 'Not Started', owner: 'T. De Silva' },
];

export const mockQualityDefects: QualityDefectItem[] = [
  { id: '1', defectId: 'QD-2026-0104', category: 'Policy Violation', severity: 'High', customerImpact: 'High', coachingRequired: true, owner: 'R. Fernando', status: 'Open' },
  { id: '2', defectId: 'QD-2026-0100', category: 'Communication', severity: 'Medium', customerImpact: 'Medium', coachingRequired: true, owner: 'S. Perera', status: 'Review Due' },
  { id: '3', defectId: 'QD-2026-0097', category: 'Resolution Accuracy', severity: 'High', customerImpact: 'High', coachingRequired: true, owner: 'R. Williams', status: 'In Review' },
];

export const mockServiceInitiatives: ServiceInitiativeItem[] = [
  { name: 'Improve FCR Rate', baseline: '72%', target: '85%', current: '81%', owner: 'A. Perera', status: 'On Track' },
  { name: 'Reduce Repeat Contact', baseline: '12%', target: '5%', current: '7%', owner: 'K. Fernando', status: 'Review Due' },
  { name: 'Increase Policy Adherence', baseline: '90%', target: '98%', current: '96%', owner: 'S. Withana', status: 'On Track' },
];

export const mockScorecardVersions: ScorecardVersionItem[] = [
  { version: 'QA-SC-v4', status: 'Active', effectiveFrom: 'May 1, 2026', notes: 'Added Resolution Accuracy updates' },
  { version: 'QA-SC-v3', status: 'Archived', effectiveFrom: 'Jan 1, 2026', notes: 'Previous framework' },
  { version: 'QA-SC-v2', status: 'Archived', effectiveFrom: 'Jul 1, 2025', notes: 'Legacy framework' },
];
