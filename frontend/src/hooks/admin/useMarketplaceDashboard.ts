"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMarketplaceDashboard } from "@/services/api/marketplaceDashboardService";
import type { MarketplaceDashboardData, MarketplaceDashboardFilters } from "@/types/marketplaceDashboard";

export function useMarketplaceDashboard(filters: MarketplaceDashboardFilters) {
  const [data, setData] = useState<MarketplaceDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stale, setStale] = useState(false);
  const request = useRef<AbortController | null>(null);
  const filterKey = JSON.stringify(filters);

  const refresh = useCallback(async (background = false) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    background ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const next = await fetchMarketplaceDashboard(filters, controller.signal);
      setData(next);
      setStale(false);
    } catch (caught) {
      if ((caught as Error).name !== "AbortError") {
        setError(caught instanceof Error ? caught.message : "Unable to load the marketplace dashboard.");
        if (background) setStale(true);
      }
    } finally {
      if (request.current === controller) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => { if (document.visibilityState === "visible") void refresh(true); }, data?.meta.refresh_interval_seconds ? data.meta.refresh_interval_seconds * 1000 : 30_000);
    const visible = () => { if (document.visibilityState === "visible") void refresh(true); };
    document.addEventListener("visibilitychange", visible);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", visible); request.current?.abort(); };
  }, [data?.meta.refresh_interval_seconds, refresh]);

  return { data, loading, refreshing, error, stale, refresh };
}
