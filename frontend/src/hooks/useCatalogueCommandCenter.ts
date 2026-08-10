"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getCatalogueCommandCenter, type CatalogueQuery } from "@/services/api/catalogueCommandCenter";
import type { CatalogueCommandCenterData } from "@/types/catalogue";

export function useCatalogueCommandCenter(filters: CatalogueQuery) {
  const [data, setData] = useState<CatalogueCommandCenterData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const request = useRef(0);

  const refresh = useCallback(async (background = false) => {
    const id = ++request.current;
    background ? setRefreshing(true) : setLoading(true);
    const controller = new AbortController();
    try {
      const result = await getCatalogueCommandCenter(filters, controller.signal);
      if (id === request.current) { setData(result); setError(null); }
    } catch (cause) {
      if (id === request.current) setError(cause instanceof Error ? cause : new Error("Unable to load catalogue metrics."));
    } finally {
      if (id === request.current) { setLoading(false); setRefreshing(false); }
    }
    return () => controller.abort();
  }, [filters.dateFrom, filters.dateTo]);

  useEffect(() => { void refresh(false); }, [refresh]);
  useEffect(() => {
    const timer = window.setInterval(() => void refresh(true), 30_000);
    const focus = () => void refresh(true);
    window.addEventListener("focus", focus);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", focus); };
  }, [refresh]);

  return { data, error, loading, refreshing, refresh: () => refresh(true) };
}
