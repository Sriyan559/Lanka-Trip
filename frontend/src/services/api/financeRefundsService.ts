import { api, withQuery, API_BASE, getAuthToken } from '@/lib/api/client';

// ── Types ──────────────────────────────────────────────────────────────────

export interface RefundOverviewData {
  kpis: RefundKpi[];
  trend: RefundTrendPoint[];
  typeDistribution: RefundTypeItem[];
  statusSummary: RefundStatusItem[];
  healthMetrics: RefundHealthMetric[];
  healthScore: number;
  workflowSteps: RefundWorkflowStep[];
  alerts: RefundAlert[];
  quickSummary: RefundQuickSummaryItem[];
  quickQueues: RefundQueueItem[];
  actionButtons: string[];
  context: RefundContext;
  updatedAt: string;
}

export interface RefundKpi {
  id: string;
  num: number;
  iconName: string;
  title: string;
  subLabel: string;
  value: string;
  delta: string;
  isPositive: boolean;
  status: 'positive' | 'warning' | 'negative' | 'neutral';
  hasWarningIcon?: boolean;
  sparkline: number[];
}

export interface RefundTrendPoint {
  date: string;
  requests: number;
  completed: number;
  compPaid: number;
  failed: number;
  slaBreaches: number;
}

export interface RefundTypeItem {
  name: string;
  count: number;
  amount: number;
  percentage: number;
  color: string;
}

export interface RefundStatusItem {
  id: string;
  status: string;
  count: number;
  amount: string;
  color: string;
  percentage: number;
}

export interface RefundHealthMetric {
  label: string;
  score: number;
  pct: number;
}

export interface RefundWorkflowStep {
  stepNum: number;
  title: string;
  metrics: { label: string; val: string }[];
  progressPct: number;
  statusText: string;
}

export interface RefundAlert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  message: string;
}

export interface RefundQuickSummaryItem {
  label: string;
  value: string;
}

export interface RefundQueueItem {
  label: string;
  count: number;
  iconName: string;
}

export interface RefundContext {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  salesChannel: string;
  region: string;
  baseCurrency: string;
  scope: string;
  accountingPeriod: string;
  dateRange: string;
  liveData: boolean;
  dataCompleteness: number;
  lastSynced: string;
  periodState: 'Open' | 'Closed' | 'Locked';
  accessNotice: string;
}

export interface RefundTableRow {
  id: string;
  orderId: string;
  customerName: string;
  customerId: string;
  reasonCode: string;
  paymentMethod: string;
  productSeller: string;
  refundType: string;
  refundAmount: number;
  compensationAmount: number;
  eligibility: string;
  approval: string;
  processing: string;
  settlementMethod: string;
  gateway: string;
  locationRegion: string;
  reconciliationStatus: string;
  dateRequested: string;
  sla: string;
  csat: number;
}

export interface RefundTableMeta {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  generatedAt: string;
}

export interface RefundTableResponse {
  rows: RefundTableRow[];
  meta: RefundTableMeta;
  permissions: Record<string, boolean>;
}

export interface RefundDetail {
  id: string;
  orderId: string;
  customerName: string;
  customerId: string;
  reasonCode: string;
  paymentMethod: string;
  productSeller: string;
  refundType: string;
  refundAmount: number;
  compensationAmount: number;
  eligibility: string;
  approval: string;
  processing: string;
  settlementMethod: string;
  gateway: string;
  locationRegion: string;
  reconciliationStatus: string;
  dateRequested: string;
  sla: string;
  csat: number;
  contactEmail: string;
  contactPhone: string;
  transactionId: string;
  authCode: string;
  capturedOn: string;
  refundReason: string;
  processedBy: string;
  processedOn: string;
  settlementBatch: string;
  reconciledOn: string;
  customerNotified: string;
  notificationChannel: string;
  slaStatus: string;
  resolutionTime: string;
}

export interface RefundFilters {
  dateFrom?: string;
  dateTo?: string;
  currency?: string;
  search?: string;
  status?: string;
  eligibility?: string;
  processing?: string;
  refundType?: string;
  paymentMethod?: string;
  gateway?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

// ── API Functions ──────────────────────────────────────────────────────────

export async function fetchRefundsOverview(
  filters: RefundFilters,
  signal?: AbortSignal
): Promise<{ data: RefundOverviewData }> {
  const params = buildParams(filters);
  const response = await api.get(withQuery('/admin/finance/refunds-compensation/overview', params), { signal });
  if (!response.success) throw new Error(response.message ?? 'Failed to load refund overview');
  return { data: response.data };
}

export async function fetchRefundsTable(
  filters: RefundFilters,
  signal?: AbortSignal
): Promise<{ data: RefundTableResponse }> {
  const params = buildParams(filters);
  const response = await api.get(withQuery('/admin/finance/refunds-compensation', params), { signal });
  if (!response.success) throw new Error(response.message ?? 'Failed to load refund table');
  return { data: response.data };
}

export async function fetchRefundDetail(
  refundId: string,
  signal?: AbortSignal
): Promise<{ data: RefundDetail }> {
  const response = await api.get(`/admin/finance/refunds-compensation/${encodeURIComponent(refundId)}`, { signal });
  if (!response.success) throw new Error(response.message ?? 'Failed to load refund detail');
  return { data: response.data };
}

export async function fetchRefundAudit(
  refundId: number,
  signal?: AbortSignal
): Promise<{ data: unknown }> {
  const response = await api.get(`/admin/finance/refunds-compensation/${refundId}/audit`, { signal });
  if (!response.success) throw new Error(response.message ?? 'Failed to load audit trail');
  return { data: response.data };
}

export async function reviewRefund(refundId: number, notes?: string): Promise<{ success: boolean; message: string }> {
  const response = await api.post(`/admin/finance/refunds-compensation/${refundId}/review`, { notes });
  return response;
}

export async function approveRefund(refundId: number, notes?: string): Promise<{ success: boolean; message: string }> {
  const response = await api.post(`/admin/finance/refunds-compensation/${refundId}/approve`, { notes });
  return response;
}

export async function rejectRefund(refundId: number, reason: string): Promise<{ success: boolean; message: string }> {
  const response = await api.post(`/admin/finance/refunds-compensation/${refundId}/reject`, { reason });
  return response;
}

export async function processRefund(refundId: number): Promise<{ success: boolean; message: string }> {
  const response = await api.post(`/admin/finance/refunds-compensation/${refundId}/process`, {});
  return response;
}

export async function exportRefundsReport(filters: RefundFilters): Promise<void> {
  const token = getAuthToken();
  const params = buildParams(filters);
  const url = `${API_BASE}${withQuery('/admin/finance/refunds-compensation/export', params)}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'text/csv',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 403) throw new Error('You do not have permission to export refund data.');
    throw new Error('Unable to export refund operations report. Please try again.');
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = `refund-operations-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

function buildParams(filters: RefundFilters): Record<string, string | number> {
  const p: Record<string, string | number> = {};
  if (filters.dateFrom)     p.dateFrom = filters.dateFrom;
  if (filters.dateTo)       p.dateTo = filters.dateTo;
  if (filters.currency)     p.currency = filters.currency;
  if (filters.search)       p.search = filters.search;
  if (filters.status && filters.status !== 'All Statuses') p.status = filters.status;
  if (filters.eligibility && filters.eligibility !== 'All Eligibility') p.eligibility = filters.eligibility;
  if (filters.processing && filters.processing !== 'All Processing') p.processing = filters.processing;
  if (filters.refundType && filters.refundType !== 'All Compensation') p.refundType = filters.refundType;
  if (filters.paymentMethod && filters.paymentMethod !== 'All Methods') p.paymentMethod = filters.paymentMethod;
  if (filters.gateway && filters.gateway !== 'All Gateways') p.gateway = filters.gateway;
  if (filters.sort)         p.sort = filters.sort;
  if (filters.direction)    p.direction = filters.direction;
  if (filters.page)         p.page = filters.page;
  if (filters.perPage)      p.perPage = filters.perPage;
  return p;
}
