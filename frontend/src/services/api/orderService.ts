import { apiClient, downloadApiFile } from "@/services/api/apiClient";
import type { AssignOrdersDto, MarketplaceOrderFilterParams } from "@/types/admin";

export interface Availability { available: boolean; reason?: string }
export interface OrderMetric extends Availability { id: string; label: string; value: number | null; definition?: string }
export interface MarketplaceOrderRecord {
  id: string; orderReference: string; databaseOrderId: string;
  customer: { id: string; name: string }; supplier: { id: string; name: string } | null;
  itemsCount: number; suppliersCount: number; splitOrder: false;
  total: { amount: string; currency: string }; paymentMethod: string | null; paymentStatus: string;
  orderStatus: string; fulfilmentStatus: string;
  delivery: { status: string; carrier: string | null; estimatedDeliveryDate: string | null; deliveredAt: string | null } | null;
  createdAt: string; updatedAt: string;
  availability: Record<string, boolean>;
}
export interface OrderFilterOptions {
  orderStatuses: string[]; paymentStatuses: string[]; fulfilmentStatuses: string[]; deliveryStatuses: string[];
  paymentMethods: Array<{ slug: string; name: string }>; suppliers: Array<{ id: number; name: string }>;
}
export interface MarketplaceOrdersResponse {
  context: { currency: string | null; dateFrom: string; dateTo: string; timezone: string };
  availableCurrencies: string[]; kpis: OrderMetric[];
  orders: { available: true; items: MarketplaceOrderRecord[] }; filters: OrderFilterOptions;
  health: Availability; alerts: Array<{ id: string; type: string; orderId: string; orderReference: string; tone: string; createdAt: string }>;
  paymentSummary: Availability & { currency?: string; paidToday?: string; pendingPayments?: string; failedPayments?: string; codPending?: string; refundsPending?: string };
  quickQueue: Array<{ id: string; label: string; orderReference: string; createdAt: string }>;
  capabilities: Record<string, Availability>; permissions: { canView: boolean; canExport: boolean; canAssign: boolean; canCreateManualOrder: boolean };
  meta: { page: number; perPage: number; total: number; totalPages: number; from: number | null; to: number | null; generatedAt: string; dataAsOf: string; refreshIntervalSeconds: number };
  /** @deprecated Use orders.items. Retained only for source compatibility during migration. */
  data: MarketplaceOrderRecord[];
}
export interface MarketplaceOrderDetail extends MarketplaceOrderRecord {
  items: Array<Record<string, string | number | null>>; payments: Array<Record<string, string | number | null>>;
  shipments: Array<Record<string, string | number | null>>; returns: Array<Record<string, string | number | null>>;
  capabilities: Record<string, Availability>; permissions: { canView: boolean; canExport: boolean; canUpdate: boolean; canAssign: boolean };
}
export interface ManualOrderCapabilities extends Availability { missingCapabilities: string[]; supportedCreationPath: string }

const query = (filters: Record<string, unknown> = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") params.set(key, String(value));
  });
  const value = params.toString();
  return value ? `?${value}` : "";
};

export async function fetchMarketplaceOrders(filters: Record<string, unknown> = {}, signal?: AbortSignal): Promise<MarketplaceOrdersResponse> {
  const response = await apiClient<{ success: true; data: MarketplaceOrdersResponse }>(`/admin/marketplace/orders${query(filters)}`, { signal });
  return { ...response.data, data: response.data.orders.items };
}
export async function exportOrdersCsv(filters: Record<string, unknown> = {}, signal?: AbortSignal): Promise<void> {
  await downloadApiFile(`/admin/marketplace/orders/export${query(filters)}`, "marketplace-orders.csv", signal);
}
export async function fetchOrderDetail(orderId: string, signal?: AbortSignal): Promise<MarketplaceOrderDetail> {
  const response = await apiClient<{ success: true; data: MarketplaceOrderDetail }>(`/admin/marketplace/orders/${encodeURIComponent(orderId)}`, { signal });
  return response.data;
}
export async function fetchManualOrderCapabilities(signal?: AbortSignal): Promise<ManualOrderCapabilities> {
  const response = await apiClient<{ success: true; data: ManualOrderCapabilities }>("/admin/marketplace/orders/manual-capabilities", { signal });
  return response.data;
}

type UnsupportedActionResult = { success: boolean; message: string };
const unavailable = async (): Promise<UnsupportedActionResult> => { throw new Error("This operation is unavailable because no authoritative backend workflow exists."); };
export const assignOrders = (_dto: AssignOrdersDto): Promise<UnsupportedActionResult> => unavailable();
export const updateOrderStatus = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const holdOrder = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const cancelOrder = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const startRefundReview = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const startReturnReview = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const escalateOrder = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const contactCustomer = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const contactSuppliers = (..._args: unknown[]): Promise<UnsupportedActionResult> => unavailable();
export const fetchOrderMetrics = unavailable;
export const fetchPriorityAlerts = unavailable;
export const fetchPaymentSummary = unavailable;
export const fetchQuickQueue = unavailable;
export const fetchOfficersList = unavailable;

export type { MarketplaceOrderFilterParams };
