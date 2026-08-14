'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  administrationService,
  AdministrationCommandCenterResponse,
} from '@/services/api/administrationService';

const POLL_INTERVAL_MS = 30_000; // 30 seconds

interface UseAdministrationCommandCenterReturn {
  data: AdministrationCommandCenterResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

/**
 * Fetches and polls the Administration Command Center data.
 * Re-fetches when `filters` changes.
 * Auto-refreshes every 30 seconds.
 */
export function useAdministrationCommandCenter(
  filters: Record<string, string> = {}
): UseAdministrationCommandCenterReturn {
  const [data, setData] = useState<AdministrationCommandCenterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Stable reference to filters to avoid stale closure in interval
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await administrationService.getCommandCenterData(filtersRef.current);
      if (!signal?.aborted) {
        setData(result);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      if (!signal?.aborted) {
        setError(err?.message ?? 'Failed to load Administration data.');
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch + re-fetch when filters change
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  // Polling interval
  useEffect(() => {
    const id = setInterval(() => {
      fetchData();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, lastUpdated, refresh };
}
