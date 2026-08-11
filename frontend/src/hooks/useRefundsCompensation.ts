'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  fetchRefundsOverview,
  fetchRefundsTable,
  fetchRefundDetail,
  reviewRefund,
  approveRefund,
  rejectRefund,
  processRefund,
  exportRefundsReport,
  type RefundFilters,
  type RefundOverviewData,
  type RefundTableResponse,
  type RefundDetail,
} from '@/services/api/financeRefundsService';

/* ── Overview hook (KPIs, charts, sidebar) ─────────────────────────────────
   Polls every 30s. Refreshes on window focus and after mutations.
────────────────────────────────────────────────────────────────────────── */
export function useRefundsOverview(filters: RefundFilters) {
  const [data, setData] = useState<RefundOverviewData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const reqId = useRef(0);

  const refresh = useCallback(async (background = false) => {
    const id = ++reqId.current;
    background ? setRefreshing(true) : setLoading(true);
    const controller = new AbortController();
    try {
      const res = await fetchRefundsOverview(filters, controller.signal);
      if (id === reqId.current) {
        setData(res.data);
        setUpdatedAt(res.data.updatedAt ?? new Date().toISOString());
        setError(null);
      }
    } catch (cause) {
      if (id === reqId.current && !(cause instanceof DOMException && cause.name === 'AbortError')) {
        setError(cause instanceof Error ? cause : new Error('Unable to load refund operations.'));
      }
    } finally {
      if (id === reqId.current) { setLoading(false); setRefreshing(false); }
    }
    return () => controller.abort();
  }, [
    filters.dateFrom, filters.dateTo, filters.currency,
  ]);

  useEffect(() => { void refresh(false); }, [refresh]);

  useEffect(() => {
    const timer = window.setInterval(() => void refresh(true), 30_000);
    const focus = () => void refresh(true);
    window.addEventListener('focus', focus);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', focus); };
  }, [refresh]);

  return { data, error, loading, refreshing, updatedAt, refresh: () => refresh(true) };
}

/* ── Refund table hook ─────────────────────────────────────────────────────
   Server-side paginated, sorted, filtered table. Polls every 60s.
────────────────────────────────────────────────────────────────────────── */
export function useRefundsTable(filters: RefundFilters) {
  const [data, setData] = useState<RefundTableResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const reqId = useRef(0);

  const refresh = useCallback(async (background = false) => {
    const id = ++reqId.current;
    background ? setRefreshing(true) : setLoading(true);
    const controller = new AbortController();
    try {
      const res = await fetchRefundsTable(filters, controller.signal);
      if (id === reqId.current) { setData(res.data); setError(null); }
    } catch (cause) {
      if (id === reqId.current && !(cause instanceof DOMException && cause.name === 'AbortError')) {
        setError(cause instanceof Error ? cause : new Error('Unable to load refund table.'));
      }
    } finally {
      if (id === reqId.current) { setLoading(false); setRefreshing(false); }
    }
    return () => controller.abort();
  }, [
    filters.dateFrom, filters.dateTo, filters.currency, filters.search,
    filters.status, filters.eligibility, filters.processing, filters.refundType,
    filters.paymentMethod, filters.gateway, filters.sort, filters.direction,
    filters.page, filters.perPage,
  ]);

  useEffect(() => { void refresh(false); }, [refresh]);

  useEffect(() => {
    const timer = window.setInterval(() => void refresh(true), 60_000);
    const focus = () => void refresh(true);
    window.addEventListener('focus', focus);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', focus); };
  }, [refresh]);

  return { data, error, loading, refreshing, refresh: () => refresh(true) };
}

/* ── Refund detail hook ────────────────────────────────────────────────────
   Lazy-loaded when a row is selected. Does not poll.
────────────────────────────────────────────────────────────────────────── */
export function useRefundDetail(refundId: string | null) {
  const [detail, setDetail] = useState<RefundDetail | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    if (!refundId) { setDetail(null); return; }
    const id = ++reqId.current;
    setLoading(true);
    const controller = new AbortController();

    fetchRefundDetail(refundId, controller.signal)
      .then((res) => {
        if (id === reqId.current) { setDetail(res.data); setError(null); }
      })
      .catch((cause) => {
        if (id === reqId.current && !(cause instanceof DOMException && cause.name === 'AbortError')) {
          setError(cause instanceof Error ? cause : new Error('Unable to load refund detail.'));
          setDetail(null);
        }
      })
      .finally(() => { if (id === reqId.current) setLoading(false); });

    return () => controller.abort();
  }, [refundId]);

  return { detail, error, loading };
}

/* ── Refund action mutations ───────────────────────────────────────────────
   Each action shows toast feedback and triggers a refresh on success.
────────────────────────────────────────────────────────────────────────── */
export function useRefundActions(onSuccess?: () => void) {
  const [submitting, setSubmitting] = useState<string | null>(null);

  const withGuard = async (key: string, fn: () => Promise<{ success: boolean; message: string }>) => {
    if (submitting) return;
    setSubmitting(key);
    try {
      const res = await fn();
      if (res.success) {
        toast.success(res.message ?? 'Action completed.');
        onSuccess?.();
      } else {
        toast.error(res.message ?? 'Action failed.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred.';
      toast.error(msg);
    } finally {
      setSubmitting(null);
    }
  };

  return {
    submitting,
    review:  (id: number, notes?: string) => withGuard('review',  () => reviewRefund(id, notes)),
    approve: (id: number, notes?: string) => withGuard('approve', () => approveRefund(id, notes)),
    reject:  (id: number, reason: string)  => withGuard('reject',  () => rejectRefund(id, reason)),
    process: (id: number)                  => withGuard('process', () => processRefund(id)),

    exportReport: async (filters: RefundFilters) => {
      const tid = toast.loading('Generating export…');
      try {
        await exportRefundsReport(filters);
        toast.success('Export downloaded.', { id: tid });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Export failed.', { id: tid });
      }
    },
  };
}
