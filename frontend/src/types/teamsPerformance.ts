export type WorkforceRisk = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SupportTeamItem {
  id: string;
  name: string;
  agents: number;
  available: number;
  busy: number;
  atCapacity: number;
  overloaded: number;
  utilisation: number;
  slaPercent: number;
  csat: number;
  avgResponseMinutes: number;
  avgResolutionHours: number;
  risk: WorkforceRisk;
}

export interface AgentTierSummary {
  tier: string;
  agents: number;
  activeCases: number;
  atCapacity: number;
  overloaded: number;
  utilisation: number;
  slaPercent: number;
  csat: number;
  avgResponseMinutes: number;
  avgCasesPerAgent: number;
  fcrPercent: number;
  qaScore: number;
  slaCompliance: number;
  gslScore: number;
}

export interface AgentSkillItem {
  skill: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  demand: 'High' | 'Medium' | 'Low';
  staffed: 'Good' | 'Low' | 'Medium';
  gap: string;
}

export interface ShiftCoverageItem {
  shift: string;
  timeWindow: string;
  required: number;
  scheduled: number;
  coveragePercent: number;
  status: 'Good' | 'Warning' | 'Critical';
}

export interface WorkforceForecastItem {
  date: string;
  day: string;
  required: number;
  scheduled: number;
  gap: number;
  peakVolume: number;
  peakHours: string;
}

export interface QueueForecastItem {
  queue: string;
  cases: number;
  avgPerDay: number;
  required: number;
  scheduled: number;
  gap: number;
}

export interface WorkforceAlertItem {
  type: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  team: string;
  agentsCount: number;
  since: string;
}

export interface AssignmentHistoryItem {
  agentName: string;
  fromTeam: string;
  toTeam: string;
  reason: string;
  date: string;
  impactPositive: boolean;
}

export interface TeamsFilterParams {
  brand?: string;
  division?: string;
  region?: string;
  agentType?: string;
  site?: string;
  dateRange?: string;
  shift?: string;
  channel?: string;
  priority?: string;
  skillRef?: string;
  skillPerf?: string;
  statusFilter?: string;
}
