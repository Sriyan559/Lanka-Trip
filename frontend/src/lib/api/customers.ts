import { api } from './client';
import { CustomerRecord, CustomerKpiCard, CustomerStatusSummaryData, CustomerHealthMetricItem, LifecycleNode, CustomerTabItem, CustomerOperationCard } from '@/types/customer';
import {
  CustomerSegment,
  SegmentMetric,
  SegmentHealthMetric,
  PriorityAlertItem,
  SelectedSegmentDetails,
  SegmentOperationsMetrics,
  SegmentMembershipSummary,
  SegmentConflictSummary,
  SegmentRecalculationSummary,
  SegmentQuickQueues,
} from '@/types/customer-segments';

export interface CustomerDashboardResponse {
  kpis: CustomerKpiCard[];
  tabs?: CustomerTabItem[];
  operationCards?: CustomerOperationCard[];
  lifecycleNodes?: LifecycleNode[];
  statusSummary?: CustomerStatusSummaryData;
  healthScorecard?: CustomerHealthMetricItem[];
  customers: CustomerRecord[];
  pagination: {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
  };
  rightRail: {
    healthScore: number;
    healthGrade: string;
    healthTitle?: string;
    healthBars: { label: string; val: number }[];
    alertsTitle?: string;
    alerts: { id: string; text: string; count?: number; severity: "High" | "Medium" | "Low" }[];
    summaries?: { title: string; items: { label: string; count: string; pct: string; color?: string }[] }[];
    quickQueues: { label: string; count: string | number }[];
  };
}

export interface SegmentDashboardResponse {
  kpis: SegmentMetric[];
  segments: CustomerSegment[];
  pagination: {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
  };
  selectedSegmentDetails: SelectedSegmentDetails | null;
  priorityAlerts: PriorityAlertItem[];
  typeDistribution: { name: string; value: number }[];
  statusDistribution?: { name: string; value: number }[];
  healthMetrics: SegmentHealthMetric[];
  operationsMetrics?: SegmentOperationsMetrics;
  membershipSummary?: SegmentMembershipSummary;
  conflictSummary?: SegmentConflictSummary;
  recalculationSummary?: SegmentRecalculationSummary;
  quickQueues?: SegmentQuickQueues;
  segmentationHealth?: number | null;
}

export const customerApi = {
  getCommandCenterDashboard: async (params?: Record<string, any>): Promise<CustomerDashboardResponse> => {
    const response = await api.get('/admin/customers/dashboard', { params });
    return response.data ?? response;
  },

  getDirectory: async (params?: Record<string, any>): Promise<CustomerDashboardResponse> => {
    const response = await api.get('/admin/customers/directory', { params });
    return response.data ?? response;
  },

  getSegments: async (params?: Record<string, any>): Promise<SegmentDashboardResponse> => {
    const response = await api.get('/admin/customers/segments', { params });
    return response.data ?? response;
  },

  createSegment: async (data: Record<string, any>) => {
    const response = await api.post('/admin/customers/segments', data);
    return response.data ?? response;
  },

  recalculateSegment: async (id: string | number) => {
    const response = await api.post(`/admin/customers/segments/${id}/recalculate`);
    return response.data ?? response;
  },

  approveSegment: async (id: string | number) => {
    const response = await api.post(`/admin/customers/segments/${id}/approve`);
    return response.data ?? response;
  },

  bulkActionSegments: async (action: string, ids: (string | number)[]) => {
    const response = await api.post('/admin/customers/segments/bulk-action', { action, ids });
    return response.data ?? response;
  },

  getModuleDashboard: async (module: string, params?: Record<string, any>): Promise<CustomerDashboardResponse> => {
    const response = await api.get(`/admin/customers/${module}/dashboard`, { params });
    return response.data ?? response;
  },

  getCustomerDetail: async (id: string): Promise<any> => {
    const response = await api.get(`/admin/customers/${id}`);
    return response.data ?? response;
  },

  updateCustomerDetail: async (id: string, data: Record<string, any>): Promise<any> => {
    const response = await api.put(`/admin/customers/${id}`, data);
    return response.data ?? response;
  },

  deleteCustomer: async (id: string): Promise<any> => {
    const response = await api.delete(`/admin/customers/${id}`);
    return response.data ?? response;
  },
};
