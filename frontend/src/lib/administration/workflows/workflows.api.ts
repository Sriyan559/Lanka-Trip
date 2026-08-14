import { WorkflowFullData } from './workflows.types';
import { DEFAULT_WORKFLOW_DATA } from './workflows.constants';

/**
 * Service API for Workflows, Approvals & Administrative Process Control (AD11)
 * Namespace: /api/admin/administration/workflows/...
 */
import { apiClient } from '@/services/api/apiClient';

export async function fetchWorkflowData(): Promise<WorkflowFullData> {
  try {
    const res = await apiClient<WorkflowFullData>('/api/admin/administration/workflows');

    if (res && res.kpis) {

      return res;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using default data structure:', err);
  }
  return DEFAULT_WORKFLOW_DATA;
}


export async function createWorkflowDefinition(name: string, domain: string): Promise<{ success: boolean; workflowKey: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    workflowKey: `WF-NEW-${Date.now()}`,
  };
}

export async function createApprovalPolicy(policyName: string, domain: string): Promise<{ success: boolean; policyId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    policyId: `POL-${Date.now()}`,
  };
}

export async function reviewSlaBreaches(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-SLA-${Date.now()}`,
  };
}
