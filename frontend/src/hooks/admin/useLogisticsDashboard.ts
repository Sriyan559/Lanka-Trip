"use client";

import { useCallback, useEffect, useState } from "react";
import { logisticsApi, LogisticsFilterParams } from "@/lib/api/logistics";

export function useLogisticsDashboard(filters: LogisticsFilterParams = {}) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [shipmentsData, setShipmentsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterKey = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, shipRes] = await Promise.all([
        logisticsApi.getDashboard().catch(() => null),
        logisticsApi.getShipments(filters).catch(() => null),
      ]);

      if (dashRes?.data?.dashboard) {
        setDashboard(dashRes.data.dashboard);
      }
      if (shipRes?.data?.shipments) {
        setShipmentsData(shipRes.data.shipments);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load logistics operational data");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    dashboard,
    shipmentsData,
    loading,
    error,
    refresh: fetchData,
  };
}
