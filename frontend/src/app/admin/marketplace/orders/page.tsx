"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Download, UserCheck, ShieldAlert, AlertTriangle, RotateCcw, XCircle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { OrderMetricsRow } from "@/components/admin/orders/OrderMetricsRow";
import { OrderFilterPanel } from "@/components/admin/orders/OrderFilterPanel";
import { OrderTable } from "@/components/admin/orders/OrderTable";
import { OrderOperationsPanel } from "@/components/admin/orders/OrderOperationsPanel";
import { OrderPagination } from "@/components/admin/orders/OrderPagination";
import { AssignOrdersModal } from "@/components/admin/orders/AssignOrdersModal";
import {
  assignOrders,
  exportOrdersCsv,
  fetchMarketplaceOrders,
  fetchOrderMetrics,
  fetchPaymentSummary,
  fetchPriorityAlerts,
  fetchQuickQueue,
} from "@/services/api/orderService";
import type {
  MarketplaceOrder,
  MarketplaceOrderFilterParams,
  OrderMetricSummary,
  PaymentSummaryMetrics,
  PriorityAlertItem,
  QuickQueueItem,
} from "@/types/admin";
import { mockOrderMetrics, mockPaymentSummary, mockPriorityAlerts, mockQuickQueue } from "@/mocks/admin/orders.mock";

function MarketplaceOrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);
  const [metrics, setMetrics] = useState<OrderMetricSummary>(mockOrderMetrics);
  const [alerts, setAlerts] = useState<PriorityAlertItem[]>(mockPriorityAlerts);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryMetrics>(mockPaymentSummary);
  const [quickQueue, setQuickQueue] = useState<QuickQueueItem[]>(mockQuickQueue);

  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(1482);
  const [totalPages, setTotalPages] = useState(149);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignTargetIds, setAssignTargetIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Extract filters from URL query parameters
  const currentFilters: MarketplaceOrderFilterParams = {
    search: searchParams.get("search") || "",
    orderStatus: searchParams.get("orderStatus") || "all",
    paymentStatus: searchParams.get("paymentStatus") || "all",
    paymentMethod: searchParams.get("paymentMethod") || "all",
    fulfilmentStatus: searchParams.get("fulfilmentStatus") || "all",
    deliveryStatus: searchParams.get("deliveryStatus") || "all",
    supplier: searchParams.get("supplier") || "all",
    brand: searchParams.get("brand") || "all",
    logisticsPartner: searchParams.get("logisticsPartner") || "all",
    riskLevel: searchParams.get("riskLevel") || "all",
    assignedOfficer: searchParams.get("assignedOfficer") || "all",
    filterKey: searchParams.get("filterKey") || "",
    flags: searchParams.get("flags") ? searchParams.get("flags")!.split(",") : [],
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  // Helper to push filter updates to URL
  const updateUrlFilters = useCallback(
    (newFilters: Partial<MarketplaceOrderFilterParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      const merged = { ...currentFilters, ...newFilters };

      Object.entries(merged).forEach(([key, value]) => {
        if (key === "flags" && Array.isArray(value)) {
          if (value.length > 0) {
            params.set("flags", value.join(","));
          } else {
            params.delete("flags");
          }
        } else if (value && value !== "all" && value !== "" && value !== 0) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`/admin/marketplace/orders?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  // Load order data whenever URL query parameters change
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [ordersRes, metricsRes, alertsRes, paymentRes, queueRes] = await Promise.all([
          fetchMarketplaceOrders(currentFilters),
          fetchOrderMetrics(),
          fetchPriorityAlerts(),
          fetchPaymentSummary(),
          fetchQuickQueue(),
        ]);

        setOrders(ordersRes.data);
        setTotalRecords(ordersRes.total);
        setTotalPages(ordersRes.totalPages);
        setMetrics(metricsRes);
        setAlerts(alertsRes);
        setPaymentSummary(paymentRes);
        setQuickQueue(queueRes);
      } catch (err) {
        console.error("Failed loading marketplace orders:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchParams]);

  // Toast notification timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handler for Selecting individual order checkbox
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  // Handler for Select All checkbox
  const handleSelectAllOrders = (selected: boolean) => {
    if (selected) {
      setSelectedOrderIds(orders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  // Header Actions
  const handleReviewPriorityOrders = () => {
    updateUrlFilters({ filterKey: "priority", page: 1 });
  };

  const handleOpenAssignModal = (ids?: string[]) => {
    const targets = ids && ids.length > 0 ? ids : selectedOrderIds;
    if (targets.length === 0) {
      setToastMessage({ type: "error", text: "Please select at least one order to assign." });
      return;
    }
    setAssignTargetIds(targets);
    setAssignModalOpen(true);
  };

  const handleConfirmAssignment = async (officerId: string, officerName: string, note?: string) => {
    const res = await assignOrders({
      orderIds: assignTargetIds,
      officerId,
      officerName,
      note,
    });
    setToastMessage({ type: "success", text: res.message });
    setSelectedOrderIds([]);

    // Refresh orders list
    const updated = await fetchMarketplaceOrders(currentFilters);
    setOrders(updated.data);
  };

  const handleExportCsv = async () => {
    try {
      const csv = await exportOrdersCsv(currentFilters);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `marketplace_orders_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToastMessage({ type: "success", text: "Exported current filtered orders to CSV file." });
    } catch (err) {
      setToastMessage({ type: "error", text: "Failed to export CSV." });
    }
  };

  const handleViewFailedPayments = () => {
    updateUrlFilters({ paymentStatus: "failed", page: 1 });
  };

  const handleViewReturnRequests = () => {
    router.push("/admin/marketplace/returns");
  };

  const handleViewCancelled = () => {
    updateUrlFilters({ orderStatus: "cancelled", page: 1 });
  };

  const handleClearAllFilters = () => {
    router.push("/admin/marketplace/orders");
  };

  return (
    <div className="marketplace-orders-page">
      {/* Toast Banner */}
      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`} role="alert">
          {toastMessage.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        crumbs={["Marketplace", "Order Management"]}
        title="Order Management"
        description="Monitor customer orders, payments, multi-supplier fulfilment, batch allocation, packing, dispatch, delivery progress, return escalations, and service-level exceptions across the SL Beauty marketplace."
        actions={
          <div className="header-button-group">
            <div className="header-action-row">
              <button
                type="button"
                className="button primary"
                onClick={handleReviewPriorityOrders}
              >
                <ShieldAlert size={15} />
                Review Priority Orders
              </button>

              <button
                type="button"
                className="button secondary"
                onClick={() => handleOpenAssignModal()}
              >
                <UserCheck size={15} />
                Assign Orders
              </button>

              <button
                type="button"
                className="button secondary"
                onClick={handleExportCsv}
              >
                <Download size={15} />
                Export Orders
              </button>

              <button
                type="button"
                className="button outline-danger"
                onClick={handleViewFailedPayments}
              >
                View Failed Payments
              </button>
            </div>

            <div className="header-action-row">
              <button
                type="button"
                className="button outline-danger"
                onClick={handleViewReturnRequests}
              >
                View Return Requests
              </button>

              <button
                type="button"
                className="button outline-danger"
                onClick={handleViewCancelled}
              >
                View Cancelled
              </button>
            </div>
          </div>
        }
      />

      {/* Metric Cards Row 1 & Row 2 */}
      <OrderMetricsRow
        metrics={metrics}
        activeFilterKey={currentFilters.filterKey}
        onSelectMetric={(key) => {
          if (currentFilters.filterKey === key) {
            updateUrlFilters({ filterKey: "", page: 1 });
          } else {
            updateUrlFilters({ filterKey: key, page: 1 });
          }
        }}
      />

      {/* Main Grid: Left Workspace (Filter + Table + Pagination) & Right Operations Panel */}
      <div className="orders-workspace-grid">
        <div className="orders-main-column">
          {/* Filter Panel */}
          <OrderFilterPanel
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
          />

          {/* Data Table */}
          {loading ? (
            <div className="card loading-card">
              <div className="skeleton" style={{ height: "40px" }} />
              <div className="skeleton" style={{ height: "30px" }} />
              <div className="skeleton" style={{ height: "30px" }} />
              <div className="skeleton" style={{ height: "30px" }} />
              <div className="skeleton" style={{ height: "30px" }} />
            </div>
          ) : (
            <OrderTable
              orders={orders}
              selectedOrderIds={selectedOrderIds}
              onSelectOrder={handleSelectOrder}
              onSelectAllOrders={handleSelectAllOrders}
              onOpenAssignModal={(ids) => handleOpenAssignModal(ids)}
            />
          )}

          {/* Table Pagination */}
          <OrderPagination
            currentPage={currentFilters.page || 1}
            pageSize={currentFilters.pageSize || 10}
            totalRecords={totalRecords}
            totalPages={totalPages}
            onPageChange={(page) => updateUrlFilters({ page })}
            onPageSizeChange={(pageSize) => updateUrlFilters({ pageSize, page: 1 })}
          />
        </div>

        {/* Right-Side Operations Panel */}
        <OrderOperationsPanel
          alerts={alerts}
          paymentSummary={paymentSummary}
          quickQueue={quickQueue}
          onSelectAlert={(alert) => {
            updateUrlFilters({ search: alert.orderReference, page: 1 });
          }}
        />
      </div>

      {/* Assign Orders Modal */}
      <AssignOrdersModal
        isOpen={assignModalOpen}
        orderIds={assignTargetIds}
        onClose={() => setAssignModalOpen(false)}
        onConfirm={handleConfirmAssignment}
      />
    </div>
  );
}

export default function OrderManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="state">
          <div className="skeleton" style={{ width: "200px", height: "24px" }} />
          <div className="skeleton" style={{ height: "120px", marginTop: "16px" }} />
        </div>
      }
    >
      <MarketplaceOrdersContent />
    </Suspense>
  );
}
