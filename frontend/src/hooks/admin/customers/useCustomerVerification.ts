import { useState, useEffect, useCallback } from "react";

export function useCustomerVerificationDashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/customers/verification/dashboard");
      if (!res.ok) throw new Error("Failed to fetch verification dashboard");
      const json = await res.json();
      setData(json.data);
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, isLoading, error, refetch: fetchDashboard };
}

export function useCustomerVerificationPortfolio(filters: any) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (filters.status) query.set("status", filters.status);
      if (filters.type) query.set("type", filters.type);
      if (filters.search) query.set("search", filters.search);
      if (filters.sort) query.set("sort", filters.sort);
      if (filters.direction) query.set("direction", filters.direction);
      if (filters.page) query.set("page", filters.page.toString());
      if (filters.perPage) query.set("perPage", filters.perPage.toString());

      const res = await fetch(`/api/admin/customers/verification?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch verification portfolio");
      const json = await res.json();
      setData(json.data);
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return { data, isLoading, error, refetch: fetchPortfolio };
}

export function useCustomerVerificationActions() {
  const verify = async (id: number) => {
    const res = await fetch(`/api/admin/customers/verification/${id}/verify`, { method: 'POST' });
    if (!res.ok) throw new Error("Action failed");
    return res.json();
  };

  const reject = async (id: number) => {
    const res = await fetch(`/api/admin/customers/verification/${id}/reject`, { method: 'POST' });
    if (!res.ok) throw new Error("Action failed");
    return res.json();
  };

  const requestEvidence = async (id: number) => {
    const res = await fetch(`/api/admin/customers/verification/${id}/evidence`, { method: 'POST' });
    if (!res.ok) throw new Error("Action failed");
    return res.json();
  };

  return { verify, reject, requestEvidence };
}
