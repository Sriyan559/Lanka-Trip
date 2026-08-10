"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAttributeManagement } from "@/services/api/attributeManagement";
import type { AttributeManagementData, AttributeQuery } from "@/types/attributeManagement";

export function useAttributeManagement(query: AttributeQuery) {
  const [data, setData] = useState<AttributeManagementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const controller = useRef<AbortController | null>(null);
  const serialized = JSON.stringify(query);
  const refresh = useCallback(async (background = false) => {
    controller.current?.abort();
    const next = new AbortController(); controller.current = next;
    background ? setRefreshing(true) : setLoading(true);
    try { setData(await getAttributeManagement(query, next.signal)); setError(null); }
    catch (cause) { if (!next.signal.aborted) setError(cause instanceof Error ? cause : new Error("Unable to load Attribute & Variant Management.")); }
    finally { if (!next.signal.aborted) { setLoading(false); setRefreshing(false); } }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized]);
  useEffect(() => { void refresh(); return () => controller.current?.abort(); }, [refresh]);
  useEffect(() => {
    const interval = window.setInterval(() => { if (document.visibilityState === "visible") void refresh(true); }, (data?.meta.refreshIntervalSeconds ?? 30) * 1000);
    const focus = () => void refresh(true); window.addEventListener("focus", focus);
    return () => { window.clearInterval(interval); window.removeEventListener("focus", focus); };
  }, [data?.meta.refreshIntervalSeconds, refresh]);
  return { data, loading, refreshing, error, refresh: () => refresh(true) };
}
