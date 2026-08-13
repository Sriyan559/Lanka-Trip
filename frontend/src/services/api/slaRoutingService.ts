import {
  mockSlaPolicies,
  mockEscalationRules,
  mockPolicyExceptions,
  mockConflicts,
  mockPolicyVersions,
  mockSimulationResult,
} from '@/mocks/admin/slaRouting.mock';
import {
  SlaPolicyItem,
  EscalationRuleItem,
  PolicyExceptionItem,
  ConflictItem,
  PolicyVersionItem,
  SimulationResult,
  SlaRoutingFilterParams,
} from '@/types/slaRouting';

export async function fetchSlaPolicies(filters: SlaRoutingFilterParams = {}): Promise<SlaPolicyItem[]> {
  let list = [...mockSlaPolicies];

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.policyName.toLowerCase().includes(q) ||
        p.policyId.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters.status && filters.status !== 'All') {
    list = list.filter((p) => p.status === filters.status);
  }

  if (filters.priority && filters.priority !== 'All') {
    list = list.filter((p) => p.priority === filters.priority);
  }

  if (filters.category && filters.category !== 'All') {
    list = list.filter((p) => p.category === filters.category);
  }

  return list;
}

export async function fetchEscalationRules(): Promise<EscalationRuleItem[]> {
  return [...mockEscalationRules];
}

export async function fetchPolicyExceptions(): Promise<PolicyExceptionItem[]> {
  return [...mockPolicyExceptions];
}

export async function fetchConflicts(): Promise<ConflictItem[]> {
  return [...mockConflicts];
}

export async function fetchPolicyVersions(): Promise<PolicyVersionItem[]> {
  return [...mockPolicyVersions];
}

export async function simulateRoutingInput(inputParams: Partial<SimulationResult>): Promise<SimulationResult> {
  return {
    ...mockSimulationResult,
    ...inputParams,
    status: 'Passed',
  };
}
