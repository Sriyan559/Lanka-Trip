"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {fetchMarketplacePolicyViolations} from "@/services/api/marketplacePolicyViolationsService";

export function useMarketplacePolicyViolations(filters) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [stale, setStale] = useState(false);
  const activeRequest = useRef(null);
  const filterKey = JSON.stringify(filters);
  const refresh = useCallback(async (background = false) => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    background ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {setData(await fetchMarketplacePolicyViolations(filters, controller.signal)); setStale(false);}
    catch (exception) {if (exception?.name !== "AbortError") {setError(exception instanceof Error ? exception.message : "Policy cases could not be loaded."); if (background) setStale(true);}}
    finally {if (activeRequest.current === controller) {setLoading(false); setRefreshing(false);}}
  }, [filterKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    void refresh();
    const timer = setInterval(() => {if (document.visibilityState === "visible") void refresh(true);}, (data?.meta?.refreshIntervalSeconds ?? 60) * 1000);
    return () => {clearInterval(timer); activeRequest.current?.abort();};
  }, [data?.meta?.refreshIntervalSeconds, refresh]);
  return {data, loading, refreshing, error, stale, refresh};
}
