'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  identityService,
  IdentityUser,
  IdentityPagination,
  IdentityScorecardResponse,
  CreateUserPayload,
  UpdateUserPayload,
} from '@/services/api/administrationService';
import { useDebounce } from '@/hooks/useDebounce';

const POLL_INTERVAL_MS = 60_000; // 60 seconds

export interface UseIdentityManagementFilters {
  search?: string;
  role?: string;
  state?: string;
  status?: string;
  tenant?: string;
  businessUnit?: string;
  privilege?: string;
  authMethod?: string;
  mfaStatus?: string;
  reviewStatus?: string;
  riskLevel?: string;
}

interface UseIdentityManagementReturn {
  // Users list
  users: IdentityUser[];
  pagination: IdentityPagination | null;
  loading: boolean;
  error: string | null;
  // Scorecard
  scorecard: IdentityScorecardResponse | null;
  scorecardLoading: boolean;
  scorecardError: string | null;
  // Pagination controls
  page: number;
  setPage: (p: number) => void;
  perPage: number;
  // Refresh
  refresh: () => void;
  lastUpdated: Date | null;
  // Mutations
  createUser: (payload: CreateUserPayload) => Promise<IdentityUser>;
  updateUser: (id: number, payload: UpdateUserPayload) => Promise<IdentityUser>;
  updateStatus: (id: number, status: string, reason?: string) => Promise<IdentityUser>;
  resetPassword: (id: number) => Promise<string>;
  exportUsers: () => Promise<void>;
  mutationLoading: boolean;
  mutationError: string | null;
}

/**
 * Manages state for the Users, Accounts & Identity Management page.
 * Fetches users with server-side filtering, sorting, pagination.
 * Also loads the scorecard stats separately.
 * Auto-refreshes the user list every 60 seconds.
 */
export function useIdentityManagement(
  filters: UseIdentityManagementFilters = {}
): UseIdentityManagementReturn {
  const [users, setUsers] = useState<IdentityUser[]>([]);
  const [pagination, setPagination] = useState<IdentityPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [scorecard, setScorecard] = useState<IdentityScorecardResponse | null>(null);
  const [scorecardLoading, setScorecardLoading] = useState(true);
  const [scorecardError, setScorecardError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const perPage = 20;

  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  // Debounce search so we don't hammer the API on every keystroke
  const debouncedSearch = useDebounce(filters.search ?? '', 300);

  // Build the clean filters object for the API (strip empty values)
  const apiFilters = useRef<Record<string, string>>({});
  apiFilters.current = Object.fromEntries(
    Object.entries({
      search: debouncedSearch,
      role: filters.role ?? '',
      state: filters.state ?? '',
      status: filters.status ?? '',
      tenant: filters.tenant ?? '',
      businessUnit: filters.businessUnit ?? '',
      privilege: filters.privilege ?? '',
      authMethod: filters.authMethod ?? '',
      mfaStatus: filters.mfaStatus ?? '',
      reviewStatus: filters.reviewStatus ?? '',
      riskLevel: filters.riskLevel ?? '',
    }).filter(([, v]) => v && v !== 'all')
  );

  const fetchUsers = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await identityService.getUsers(apiFilters.current, page, perPage);
      if (!signal?.aborted) {
        setUsers(result.users);
        setPagination(result.pagination);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      if (!signal?.aborted) {
        setError(err?.message ?? 'Failed to load user data.');
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [page]);

  const fetchScorecard = useCallback(async (signal?: AbortSignal) => {
    setScorecardLoading(true);
    setScorecardError(null);
    try {
      const result = await identityService.getScorecard();
      if (!signal?.aborted) {
        setScorecard(result);
      }
    } catch (err: any) {
      if (!signal?.aborted) {
        setScorecardError(err?.message ?? 'Failed to load scorecard data.');
      }
    } finally {
      if (!signal?.aborted) {
        setScorecardLoading(false);
      }
    }
  }, []);

  // Fetch users when filters or page change
  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(controller.signal);
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    filters.role,
    filters.state,
    filters.status,
    filters.tenant,
    filters.businessUnit,
    filters.privilege,
    filters.authMethod,
    filters.mfaStatus,
    filters.reviewStatus,
    filters.riskLevel,
    page,
  ]);

  // Fetch scorecard once on mount
  useEffect(() => {
    const controller = new AbortController();
    fetchScorecard(controller.signal);
    return () => controller.abort();
  }, [fetchScorecard]);

  // Polling — refresh user list every 60s
  useEffect(() => {
    const id = setInterval(() => {
      fetchUsers();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchUsers]);

  const refresh = useCallback(() => {
    fetchUsers();
    fetchScorecard();
  }, [fetchUsers, fetchScorecard]);

  // ─── Mutations ──────────────────────────────────────────────────────────────

  const createUser = useCallback(async (payload: CreateUserPayload): Promise<IdentityUser> => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      const user = await identityService.createUser(payload);
      await fetchUsers(); // refresh list
      await fetchScorecard(); // refresh counts
      return user;
    } catch (err: any) {
      setMutationError(err?.message ?? 'Failed to create user.');
      throw err;
    } finally {
      setMutationLoading(false);
    }
  }, [fetchUsers, fetchScorecard]);

  const updateUser = useCallback(async (id: number, payload: UpdateUserPayload): Promise<IdentityUser> => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      const user = await identityService.updateUser(id, payload);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
      return user;
    } catch (err: any) {
      setMutationError(err?.message ?? 'Failed to update user.');
      throw err;
    } finally {
      setMutationLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (id: number, status: string, reason?: string): Promise<IdentityUser> => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      const user = await identityService.updateStatus(id, status, reason);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: user.status } : u));
      await fetchScorecard();
      return user;
    } catch (err: any) {
      setMutationError(err?.message ?? 'Failed to update user status.');
      throw err;
    } finally {
      setMutationLoading(false);
    }
  }, [fetchScorecard]);

  const resetPassword = useCallback(async (id: number): Promise<string> => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      return await identityService.resetPassword(id);
    } catch (err: any) {
      setMutationError(err?.message ?? 'Failed to reset password.');
      throw err;
    } finally {
      setMutationLoading(false);
    }
  }, []);

  const exportUsers = useCallback(async (): Promise<void> => {
    setMutationLoading(true);
    setMutationError(null);
    try {
      await identityService.exportUsers(apiFilters.current);
    } catch (err: any) {
      setMutationError(err?.message ?? 'Failed to export users.');
      throw err;
    } finally {
      setMutationLoading(false);
    }
  }, []);

  return {
    users,
    pagination,
    loading,
    error,
    scorecard,
    scorecardLoading,
    scorecardError,
    page,
    setPage,
    perPage,
    refresh,
    lastUpdated,
    createUser,
    updateUser,
    updateStatus,
    resetPassword,
    exportUsers,
    mutationLoading,
    mutationError,
  };
}
