"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMarketplaceListings } from "@/services/api/marketplaceListingsService";
import type { MarketplaceListingsData, MarketplaceListingsFilters } from "@/types/marketplaceListings";

export function useMarketplaceListings(filters: MarketplaceListingsFilters) {
  const [data, setData] = useState<MarketplaceListingsData | null>(null); const [loading, setLoading] = useState(true); const [refreshing, setRefreshing] = useState(false); const [error, setError] = useState<string | null>(null); const [stale, setStale] = useState(false); const active = useRef<AbortController | null>(null); const key = JSON.stringify(filters);
  const refresh = useCallback(async (background = false) => { active.current?.abort(); const controller = new AbortController(); active.current = controller; background ? setRefreshing(true) : setLoading(true); setError(null); try { const next = await fetchMarketplaceListings(filters, controller.signal); setData(next); setStale(false); } catch (caught) { if ((caught as Error).name !== "AbortError") { setError("Marketplace listings could not be loaded."); if (background) setStale(true); } } finally { if (active.current === controller) { setLoading(false); setRefreshing(false); } } }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { void refresh(); const timer = window.setInterval(() => { if (document.visibilityState === "visible") void refresh(true); }, (data?.meta.refreshIntervalSeconds ?? 30) * 1000); const visible = () => { if (document.visibilityState === "visible") void refresh(true); }; document.addEventListener("visibilitychange", visible); return () => { clearInterval(timer); document.removeEventListener("visibilitychange", visible); active.current?.abort(); }; }, [data?.meta.refreshIntervalSeconds, refresh]);
  return { data, loading, refreshing, error, stale, refresh };
}
