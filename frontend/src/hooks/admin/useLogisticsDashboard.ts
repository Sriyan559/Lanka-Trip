"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { logisticsApi, LogisticsFilterParams } from "@/lib/api/logistics";

export function useLogisticsDashboard(filters: LogisticsFilterParams = {}) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [shipmentsData, setShipmentsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const firstLoad = useRef(true);

  const filterKey = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
    if (firstLoad.current) setLoading(true);
    setError(null);
    try {
      const [dashRes, shipRes] = await Promise.all([
        logisticsApi.getDashboard(filters),
        logisticsApi.getShipments(filters),
      ]);
      setDashboard(dashRes?.data?.dashboard ?? null);
      setShipmentsData(shipRes?.data?.shipments ?? null);
      setLastUpdated(dashRes?.data?.dashboard?.updated_at ?? new Date().toISOString());
    } catch (err: any) {
      setError(err?.message || "Failed to load logistics operational data");
    } finally {
      setLoading(false);
      firstLoad.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  useEffect(() => {
    void fetchData();
    const interval = window.setInterval(() => void fetchData(), 30_000);
    return () => window.clearInterval(interval);
  }, [fetchData]);

  return {
    dashboard,
    shipmentsData,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  };
}
