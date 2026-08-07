import { apiClient, downloadApiFile } from "@/services/api/apiClient";
import type {
  ReturnCaseItem,
  ReturnFilterParams,
  ReturnsMetricSummary,
  ReturnsOperationsHealth,
  PriorityAlert,
  RefundPerformanceMetrics,
  QuickQueueItem,
  LiabilitySummary,
  BulkAssignReturnsDto,
} from "@/types/admin";

export type MarketplaceReturnsApiResponse = {
  data: ReturnCaseItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  metrics: ReturnsMetricSummary;
  operationsHealth: ReturnsOperationsHealth;
  priorityAlerts: PriorityAlert[];
  refundPerformance: RefundPerformanceMetrics;
  quickQueue: QuickQueueItem[];
  liabilitySummary: LiabilitySummary;
  permissions: {
    canView: boolean;
    canExport: boolean;
    canMutate: boolean;
  };
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    from: number | null;
    to: number | null;
    generatedAt: string;
  };
};

function buildQueryString(filters: ReturnFilterParams = {}): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "" && String(value) !== "all") {
      params.set(key, String(value));
    }
  });
  const str = params.toString();
  return str ? `?${str}` : "";
}

export async function fetchMarketplaceReturnsApi(
  filters: ReturnFilterParams = {},
  signal?: AbortSignal
): Promise<MarketplaceReturnsApiResponse> {
  const response = await apiClient<{ success: boolean; data: MarketplaceReturnsApiResponse }>(
    `/admin/marketplace/returns${buildQueryString(filters)}`,
    { signal }
  );
  return response.data;
}

export async function exportMarketplaceReturnsCsvApi(
  filters: ReturnFilterParams = {},
  signal?: AbortSignal
): Promise<void> {
  await downloadApiFile(
    `/admin/marketplace/returns/export${buildQueryString(filters)}`,
    `Returns_Report_${Date.now()}.csv`,
    signal
  );
}

export async function bulkAssignReturnsApi(
  dto: BulkAssignReturnsDto,
  signal?: AbortSignal
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient<{ success: boolean; data: { success: boolean; message: string } }>(
    "/admin/marketplace/returns/bulk-assign",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
      signal,
    }
  );
  return response.data;
}

export async function overrideInspectionApi(
  returnId: string,
  reason: string,
  signal?: AbortSignal
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient<{ success: boolean; data: { success: boolean; message: string } }>(
    `/admin/marketplace/returns/${encodeURIComponent(returnId)}/override-inspection`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
      signal,
    }
  );
  return response.data;
}

export async function approveRefundApi(
  returnId: string,
  reason: string,
  signal?: AbortSignal
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient<{ success: boolean; data: { success: boolean; message: string } }>(
    `/admin/marketplace/returns/${encodeURIComponent(returnId)}/approve-refund`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
      signal,
    }
  );
  return response.data;
}
