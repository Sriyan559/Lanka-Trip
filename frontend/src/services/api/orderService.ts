import {
  mockMarketplaceOrders,
  mockOrderMetrics,
  mockPaymentSummary,
  mockPriorityAlerts,
  mockQuickQueue,
  mockOfficers,
  getMockOrderDetail,
} from "@/mocks/admin/orders.mock";
import type {
  AssignOrdersDto,
  MarketplaceOrder,
  MarketplaceOrderFilterParams,
  OrderMetricSummary,
  PaymentSummaryMetrics,
  PriorityAlertItem,
  QuickQueueItem,
  OrderDetail,
} from "@/types/admin";
import { api, withQuery } from "@/lib/api";
import { useAdminMocks } from "./adminDataSource";

export async function fetchMarketplaceOrders(
  filters: MarketplaceOrderFilterParams = {}
): Promise<{
  data: MarketplaceOrder[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  if (!useAdminMocks) {
    try {
      const response = await api.get(withQuery('/admin/orders', {
        page: filters.page || 1,
        q: filters.search || undefined,
      }));
      
      const mappedData: MarketplaceOrder[] = (response.data || []).map((order: any) => ({
        id: String(order.id),
        orderReference: order.order_number,
        dbOrderId: String(order.id),
        customerName: order.buyer?.name || "Unknown Customer",
        customerEmail: order.buyer?.email || "",
        customerPhone: order.buyer?.phone || "",
        orderDateTime: order.created_at || new Date().toISOString(),
        orderTotal: Number(order.total_amount) || 0,
        currency: order.currency || "LKR",
        itemsCount: order.items ? order.items.length : 1,
        orderStatus: order.status || "Pending",
        paymentStatus: "Paid", // Backend doesn't provide this yet
        paymentMethod: order.payment_terms || "Card",
        fulfilmentStatus: "Processing",
        deliveryStatus: "Pending",
        riskLevel: "Low",
        assignedOfficer: null,
        supplierIds: [String(order.supplier_id)],
        supplierNames: [order.supplier?.company_name || "Unknown Supplier"],
        logistics: { provider: "Default", trackingId: "", estimatedDelivery: "", cost: 0 },
        paymentSummary: { subtotal: Number(order.total_amount) || 0, platformFee: 0, supplierPayouts: 0 }
      }));

      return {
        data: mappedData,
        total: response.total || mappedData.length,
        page: response.current_page || 1,
        pageSize: response.per_page || 10,
        totalPages: response.last_page || 1,
      };
    } catch (err) {
      console.error("Failed to fetch live orders", err);
      // fallback to mocks if live fails for some reason
    }
  }

  let filtered = [...mockMarketplaceOrders];

  if (filters.search && filters.search.trim() !== "") {
    const q = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (o) =>
        o.orderReference.toLowerCase().includes(q) ||
        o.dbOrderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q))
    );
  }

  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const pageSize = filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 10;
  const total = filtered.length === mockMarketplaceOrders.length ? 1482 : filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    data: filtered,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function fetchOrderMetrics(): Promise<OrderMetricSummary> {
  if (!useAdminMocks) {
    try {
      const response = await api.get('/admin/dashboard');
      const data = response.data || response;
      
      return {
        totalToday: data.orders_count || 0,
        pendingPayment: data.pending_orders_count || 0,
        paymentFailed: 0,
        processing: 0,
        awaitingSupplier: 0,
        readyForDispatch: 0,
        inTransit: 0,
        deliveredToday: 0,
        cancelled: 0,
        returnsInProgress: 0,
        slaBreaches: 0,
        highRiskOrders: 0,
      };
    } catch (err) {
      console.error("Failed to fetch live order metrics", err);
    }
  }

  return mockOrderMetrics;
}

export async function fetchPriorityAlerts(): Promise<PriorityAlertItem[]> {
  return mockPriorityAlerts;
}

export async function fetchPaymentSummary(): Promise<PaymentSummaryMetrics> {
  return mockPaymentSummary;
}

export async function fetchQuickQueue(): Promise<QuickQueueItem[]> {
  return mockQuickQueue;
}

export async function fetchOfficersList() {
  return mockOfficers;
}

export async function assignOrders(dto: AssignOrdersDto): Promise<{ success: boolean; message: string }> {
  if (!dto.orderIds || dto.orderIds.length === 0) {
    throw new Error("No orders selected for assignment");
  }
  if (!dto.officerName) {
    throw new Error("Officer name is required");
  }
  return {
    success: true,
    message: `Successfully assigned ${dto.orderIds.length} order(s) to ${dto.officerName}`,
  };
}

export async function exportOrdersCsv(filters: MarketplaceOrderFilterParams = {}): Promise<string> {
  const result = await fetchMarketplaceOrders(filters);
  const headers = ["Order Reference", "Database Order ID", "Customer Name", "Order Date", "Items", "Order Total (LKR)"];
  const rows = result.data.map((o) => [o.orderReference, o.dbOrderId, `"${o.customerName}"`, `"${o.orderDateTime}"`, o.itemsCount, o.orderTotal.toFixed(2)]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export async function fetchOrderDetail(orderIdOrRef: string): Promise<OrderDetail | null> {
  const detail = getMockOrderDetail(orderIdOrRef);
  return detail;
}

export async function updateOrderStatus(orderId: string, newStatus: string, reason: string): Promise<{ success: boolean; message: string }> {
  if (!reason.trim()) {
    throw new Error("A reason is required to update order status.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.orderStatus = newStatus;
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Status Updated",
      detail: `Order status updated to ${newStatus}`,
      reason,
    });
  }
  return { success: true, message: `Order status updated to ${newStatus}.` };
}

export async function holdOrder(orderId: string, reason: string, note?: string): Promise<{ success: boolean; message: string }> {
  if (!reason.trim()) {
    throw new Error("A mandatory reason is required to place an order on hold.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.orderStatus = "On Hold";
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Order Held",
      detail: `Order placed on hold. ${note ? `Note: ${note}` : ""}`,
      reason,
    });
  }
  return { success: true, message: "Order placed on hold." };
}

export async function cancelOrder(orderId: string, reason: string): Promise<{ success: boolean; message: string }> {
  if (!reason.trim()) {
    throw new Error("A mandatory cancellation reason is required.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.orderStatus = "Cancelled";
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Order Cancelled",
      detail: "Order was cancelled by officer",
      reason,
    });
  }
  return { success: true, message: "Order has been cancelled." };
}

export async function startRefundReview(orderId: string, reason: string): Promise<{ success: boolean; message: string }> {
  if (!reason.trim()) {
    throw new Error("A reason is required to initiate a refund review.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.returnSummary.refundStatus = "Pending Review";
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Refund Review Started",
      detail: "Initiated refund review workflow",
      reason,
    });
  }
  return { success: true, message: "Refund review initiated." };
}

export async function startReturnReview(orderId: string, reason: string, overrideInspection = false): Promise<{ success: boolean; message: string }> {
  if (!reason.trim()) {
    throw new Error("A reason is required to initiate a return review.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.returnSummary.returnStatus = "Eligibility Review";
    if (overrideInspection) {
      detail.returnSummary.inspectionStatus = "Overridden";
    }
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: overrideInspection ? "Return Review Started (Inspection Overridden)" : "Return Review Started",
      detail: "Initiated return review workflow",
      reason,
    });
  }
  return { success: true, message: "Return review initiated." };
}

export async function escalateOrder(orderId: string, category: string, priority: string, reason: string, assignedTo?: string): Promise<{ success: boolean; message: string }> {
  if (!reason.trim()) {
    throw new Error("A reason is required to escalate an order.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.riskLevel = priority === "Critical" || priority === "High" ? "High" : "Medium";
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Order Escalated",
      detail: `Escalated under category '${category}' with priority '${priority}'${assignedTo ? ` assigned to ${assignedTo}` : ""}`,
      reason,
    });
  }
  return { success: true, message: `Order escalated (${priority} priority).` };
}

export async function contactCustomer(orderId: string, subject: string, message: string): Promise<{ success: boolean; message: string }> {
  if (!subject.trim() || !message.trim()) {
    throw new Error("Subject and message content are required.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Customer Contacted",
      detail: `Subject: ${subject} | Content: ${message.substring(0, 60)}...`,
    });
  }
  return { success: true, message: "Message sent to customer successfully." };
}

export async function contactSuppliers(orderId: string, supplierIds: string[], subject: string, message: string): Promise<{ success: boolean; message: string }> {
  if (!supplierIds.length || !subject.trim() || !message.trim()) {
    throw new Error("Suppliers, subject, and message are required.");
  }
  const detail = getMockOrderDetail(orderId);
  if (detail) {
    detail.auditHistory.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      actor: "Current User",
      action: "Suppliers Contacted",
      detail: `Contacted ${supplierIds.length} supplier(s). Subject: ${subject}`,
    });
  }
  return { success: true, message: `Message sent to ${supplierIds.length} supplier(s).` };
}

export { getAdminRecord, listAdminData, submitAdminAction } from "./adminDataSource";
