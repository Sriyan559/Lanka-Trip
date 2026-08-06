"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMarketplaceSellers } from "@/services/api/marketplaceSellersService";

export function useMarketplaceSellers(filters) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [stale, setStale] = useState(false);
  const active = useRef(null);
  const key = JSON.stringify(filters);
  const refresh = useCallback(async (background = false) => {
    active.current?.abort();
    const controller = new AbortController(); active.current = controller;
    background ? setRefreshing(true) : setLoading(true); setError("");
    try { setData(await fetchMarketplaceSellers(filters, controller.signal)); setStale(false); }
    catch (caught) { if (caught?.name !== "AbortError") { setError("Seller marketplace performance could not be loaded."); if (background) setStale(true); } }
    finally { if (active.current === controller) { setLoading(false); setRefreshing(false); } }
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") void refresh(true); }, (data?.meta?.refreshIntervalSeconds || 30) * 1000);
    const visible = () => { if (document.visibilityState === "visible") void refresh(true); };
    document.addEventListener("visibilitychange", visible);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", visible); active.current?.abort(); };
  }, [data?.meta?.refreshIntervalSeconds, refresh]);
  return { data, loading, refreshing, error, stale, refresh };
}
