import {
  mockSupportTeams,
  mockAgentTiers,
  mockAgentSkills,
  mockShifts,
  mockWorkforceForecast,
  mockQueueForecast,
  mockWorkforceAlerts,
  mockAssignmentHistory,
} from '@/mocks/admin/teamsPerformance.mock';
import {
  SupportTeamItem,
  AgentTierSummary,
  AgentSkillItem,
  ShiftCoverageItem,
  WorkforceForecastItem,
  QueueForecastItem,
  WorkforceAlertItem,
  AssignmentHistoryItem,
  TeamsFilterParams,
} from '@/types/teamsPerformance';

export async function fetchSupportTeams(filters: TeamsFilterParams = {}): Promise<SupportTeamItem[]> {
  let list = [...mockSupportTeams];
  if (filters.statusFilter && filters.statusFilter !== 'All') {
    if (filters.statusFilter === 'At Capacity') {
      list = list.filter((t) => t.atCapacity > 0);
    } else if (filters.statusFilter === 'Overloaded') {
      list = list.filter((t) => t.overloaded > 0);
    } else if (filters.statusFilter === 'SLA At Risk') {
      list = list.filter((t) => t.risk === 'High');
    }
  }
  return list;
}

export async function fetchAgentTiers(): Promise<AgentTierSummary[]> {
  return [...mockAgentTiers];
}

export async function fetchAgentSkills(): Promise<AgentSkillItem[]> {
  return [...mockAgentSkills];
}

export async function fetchShifts(): Promise<ShiftCoverageItem[]> {
  return [...mockShifts];
}

export async function fetchWorkforceForecast(): Promise<WorkforceForecastItem[]> {
  return [...mockWorkforceForecast];
}

export async function fetchQueueForecast(): Promise<QueueForecastItem[]> {
  return [...mockQueueForecast];
}

export async function fetchWorkforceAlerts(): Promise<WorkforceAlertItem[]> {
  return [...mockWorkforceAlerts];
}

export async function fetchAssignmentHistory(): Promise<AssignmentHistoryItem[]> {
  return [...mockAssignmentHistory];
}
