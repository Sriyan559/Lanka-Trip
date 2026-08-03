import { api, withQuery } from '@/lib/api';

export type Availability = 'available' | 'unavailable';
export type Metric =
  | { value: number; availability: 'available'; definition?: string }
  | { value: null; availability: 'unavailable'; reason: string };

export type DashboardOverview = {
  reporting_range: { from: string; to: string };
  revenue: {
    availability: Availability;
    reason?: string;
    by_currency?: Array<{ currency: string; gross: number; completed_refunds: number; net: number }>;
    lkr_aggregate?: Metric & { gross?: number };
  };
  paid_payouts: {
    availability: Availability;
    reason?: string;
    by_currency?: Array<{ currency: string; amount: number | string; count: number }>;
  };
  orders: Metric;
  active_accounts: Metric;
  purchasing_customers: Metric;
  active_brands: Metric;
  pending_approvals: Metric & { breakdown?: Record<string, Metric> };
  sales_trend: {
    availability: Availability;
    reason?: string;
    by_currency?: Array<{
      currency: string;
      items: Array<{ date: string; gross: number; completed_refunds: number; net: number }>;
    }>;
  };
  ecosystem_composition: {
    availability: Availability;
    reason?: string;
    basis?: string;
    items?: Array<{
      category_id: number;
      category_name: string;
      product_count: number;
      percentage: number;
    }>;
  };
  recent_orders: Array<{
    id: number;
    order_number: string;
    currency: string;
    total_amount: number | string;
    payment_status?: string | null;
    status: string;
    created_at: string;
    buyer?: { id: number; name: string } | null;
    supplier?: { id: number; company_name: string } | null;
  }>;
  pending_verifications: Array<{
    id: string;
    entity_name: string;
    entity_type: string;
    status: string;
    required_action: string;
    detail_route: string;
    updated_at: string;
  }>;
  high_risk_alerts: {
    availability: Availability;
    reason?: string;
    items?: Array<{
      id: number;
      event_type: string;
      risk_level: string;
      risk_score: number | string;
      created_at: string;
    }>;
  };
  data_availability_notices: Array<{ code: string; message: string }>;
  generated_at: string;
};

export async function getDashboardOverview(options: {
  from?: string;
  to?: string;
  signal?: AbortSignal;
} = {}): Promise<DashboardOverview> {
  const response = await api.get(
    withQuery('/admin/dashboard/overview', { from: options.from, to: options.to }),
    { signal: options.signal },
  );

  if (!response?.overview || typeof response.overview !== 'object') {
    throw new Error('The dashboard response is missing its overview data.');
  }

  return response.overview as DashboardOverview;
}
