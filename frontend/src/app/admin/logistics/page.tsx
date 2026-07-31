"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { LogisticsMetricsRow } from "@/features/admin/logistics/components/LogisticsMetricsRow";
import { LogisticsFilterPanel } from "@/features/admin/logistics/components/LogisticsFilterPanel";
import { ShipmentTable } from "@/features/admin/logistics/components/ShipmentTable";
import { fetchLogisticsMetrics, fetchShipments } from "@/services/api/logisticsService";
import { LogisticsMetrics, Shipment } from "@/types/logistics";
import { mockLogisticsMetrics } from "@/mocks/admin/logistics.mock";

function LogisticsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [metrics, setMetrics] = useState<LogisticsMetrics>(mockLogisticsMetrics);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  const currentFilters = {
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "all",
    page: Number(searchParams.get("page")) || 1,
  };

  const updateUrlFilters = useCallback(
    (newFilters: any) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged = { ...currentFilters, ...newFilters };

      Object.entries(merged).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`/admin/logistics?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [metricsRes, shipmentsRes] = await Promise.all([
          fetchLogisticsMetrics(),
          fetchShipments(currentFilters),
        ]);
        setMetrics(metricsRes);
        setShipments(shipmentsRes.data);
      } catch (err) {
        console.error("Failed loading logistics data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchParams]);

  const handleClearAllFilters = () => {
    router.push("/admin/logistics");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        crumbs={["Logistics", "Overview"]}
        title="Logistics Hub"
        description="Monitor active shipments, track logistics partners' performance, and handle exceptions."
        actions={
          <div className="flex items-center gap-3">
            <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              <Plus size={15} />
              Add Partner
            </button>
            <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-line text-ink text-sm font-medium rounded-lg hover:bg-canvas transition-colors shadow-sm">
              <Download size={15} />
              Export Data
            </button>
          </div>
        }
      />

      <LogisticsMetricsRow metrics={metrics} />

      <div className="mt-6">
        <div className="space-y-6">
          <LogisticsFilterPanel
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
          />

          {loading ? (
            <div className="bg-white rounded-xl border border-line shadow-sm p-6 animate-pulse">
              <div className="h-10 bg-canvas rounded mb-4 w-full" />
              <div className="h-8 bg-canvas rounded mb-3 w-full" />
              <div className="h-8 bg-canvas rounded w-full" />
            </div>
          ) : (
            <ShipmentTable shipments={shipments} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Logistics Hub...</div>}>
      <LogisticsContent />
    </Suspense>
  );
}
