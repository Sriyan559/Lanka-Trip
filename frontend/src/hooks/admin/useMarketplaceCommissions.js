"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {fetchMarketplaceCommissions} from "@/services/api/marketplaceCommissionsService";

export function useMarketplaceCommissions(filters) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [stale, setStale] = useState(false);
  const request = useRef(null);
  const filterKey = JSON.stringify(filters);
  const refresh = useCallback(async (background = false) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    background ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {setData(await fetchMarketplaceCommissions(filters, controller.signal)); setStale(false);}
    catch (exception) {if (exception?.name !== "AbortError") {setError(exception instanceof Error ? exception.message : "Commission data could not be loaded."); if (background) setStale(true);}}
    finally {if (request.current === controller) {setLoading(false); setRefreshing(false);}}
  }, [filterKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => {if (document.visibilityState === "visible") void refresh(true);}, (data?.meta?.refreshIntervalSeconds ?? 60) * 1000);
    return () => {window.clearInterval(timer); request.current?.abort();};
  }, [data?.meta?.refreshIntervalSeconds, refresh]);
  return {data, loading, refreshing, error, stale, refresh};
}
