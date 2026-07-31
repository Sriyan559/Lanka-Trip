"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShipmentFilterParams, LogisticsShipment, ShipmentMetrics, PriorityAlertItem } from "@/types/admin";
import { fetchShipmentOperations, fetchShipmentMetrics, fetchLogisticsPriorityAlerts } from "@/services/api/logisticsService";
import { ShipmentKpiCards } from "@/components/admin/logistics/ShipmentKpiCards";
import { ShipmentFilters } from "@/components/admin/logistics/ShipmentFilters";
import { ShipmentTable } from "@/components/admin/logistics/ShipmentTable";
import { ShipmentPagination } from "@/components/admin/logistics/ShipmentPagination";
import { Upload, Download, PackageOpen, LayoutList, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import "../../logistics/logistics.css";

function LogisticsShipmentsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<ShipmentMetrics | null>(null);
  const [alerts, setAlerts] = useState<PriorityAlertItem[]>([]);
  const [shipments, setShipments] = useState<LogisticsShipment[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeKpiFilter, setActiveKpiFilter] = useState("all");

  const buildFiltersFromUrl = (): ShipmentFilterParams => {
    return {
      page: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      search: searchParams.get("search") || "",
      shipmentStatus: searchParams.get("shipmentStatus") || "all",
      pickupStatus: searchParams.get("pickupStatus") || "all",
      deliveryStatus: searchParams.get("deliveryStatus") || "all",
      packageStatus: searchParams.get("packageStatus") || "all",
      codStatus: searchParams.get("codStatus") || "all",
      riskLevel: searchParams.get("riskLevel") || "all",
      slaStatus: searchParams.get("slaStatus") || "all",
      carrier: searchParams.get("carrier") || "all",
      filterKey: searchParams.get("filterKey") || "all",
    };
  };

  const currentFilters = buildFiltersFromUrl();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [shipmentsData, metricsData, alertsData] = await Promise.all([
          fetchShipmentOperations(currentFilters),
          fetchShipmentMetrics(),
          fetchLogisticsPriorityAlerts()
        ]);
        setShipments(shipmentsData.data);
        setTotal(shipmentsData.total);
        setTotalPages(shipmentsData.totalPages);
        setMetrics(metricsData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Failed to load logistics data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchParams]);

  useEffect(() => {
    setActiveKpiFilter(currentFilters.filterKey || "all");
  }, [currentFilters.filterKey]);

  const updateUrl = (newFilters: ShipmentFilterParams) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        params.set(key, String(value));
      }
    });
    router.push(`/admin/logistics/shipments?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: ShipmentFilterParams) => {
    updateUrl(newFilters);
  };

  const handleKpiFilterChange = (filter: string) => {
    updateUrl({ ...currentFilters, filterKey: filter, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateUrl({ ...currentFilters, page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateUrl({ ...currentFilters, pageSize, page: 1 });
  };

  const handleExportManifest = () => {
    if (shipments.length === 0) {
      toast.error("There are no shipments to export.");
      return;
    }

    const escapeCsv = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const rows = shipments.map((shipment) => [
      shipment.publicReference,
      shipment.orderReference,
      shipment.customerName,
      shipment.carrier,
      shipment.status,
      shipment.deliveryStatus,
      shipment.slaStatus,
    ].map(escapeCsv).join(","));
    const csv = [
      "Shipment,Order,Customer,Carrier,Status,Delivery Status,SLA Status",
      ...rows,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "shipment-manifest.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Shipment manifest exported.");
  };

  return (
    <div className="logistics-operations-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Logistics Operations</h1>
          <p className="text-sm text-slate-500">Monitor end-to-end shipment lifecycles, operational aggregates, and delivery performance.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="button small icon-only bg-white text-slate-700 hover:bg-slate-50"
            onClick={() => handleKpiFilterChange("priority")}
          >
            <LayoutList size={16} /> Quick Queue
          </button>
          <button
            type="button"
            className="button small icon-only bg-white text-slate-700 hover:bg-slate-50"
            onClick={() => toast("Carrier update import will be enabled with the logistics API.")}
          >
            <Upload size={16} /> Import Updates
          </button>
          <button type="button" className="button small primary" onClick={handleExportManifest}>
            <Download size={16} className="mr-1" /> Export Manifest
          </button>
        </div>
      </div>

      <div className="metrics-row-rich">
        <ShipmentKpiCards 
          metrics={metrics} 
          activeFilter={activeKpiFilter} 
          onFilterChange={handleKpiFilterChange} 
        />
        
        <div className="priority-alerts-panel">
          <div className="panel-header">
            <h3 className="panel-title">Priority Alerts</h3>
            <span className="badge danger">{alerts.length}</span>
          </div>
          <div className="alerts-list">
            {alerts.length === 0 ? (
              <p className="text-sm text-slate-500 p-2">No active alerts.</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type === 'SLA Breach' || alert.type === 'Failed Delivery' ? 'danger' : 'warning'}`}>
                  <AlertTriangle size={18} />
                  <div className="alert-content">
                    <span className="alert-type">{alert.type}</span>
                    <span className="alert-ref">{alert.shipmentReference}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <ShipmentFilters 
          filters={currentFilters} 
          onChange={handleFilterChange} 
        />
        
        <div className="relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
          )}
          <ShipmentTable shipments={shipments} />
        </div>
        
        {shipments.length > 0 && (
          <ShipmentPagination 
            currentPage={currentFilters.page || 1}
            totalPages={totalPages}
            pageSize={currentFilters.pageSize || 10}
            totalItems={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  );
}

export default function LogisticsShipmentsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-slate-500">Loading workspace...</div>}>
      <LogisticsShipmentsContent />
    </React.Suspense>
  );
}
