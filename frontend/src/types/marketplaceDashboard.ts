export type Availability = "available" | "unavailable";

export type DashboardMetric = {
  availability: Availability;
  value: number | null;
  currency?: string | null;
  definition?: string;
  reason?: string;
};

export type TrendPoint = { date: string; gmv: number; revenue: number; orders: number };
export type CompositionItem = { id: string; label: string; value: number; percentage: number };
export type QueueItem = { id: string; label: string; count: number; href: string };
export type SellerRow = { id: string; name: string; orders: number; gmv: number; fulfilment_rate: number; cancellation_rate: number; rating: number | null; status: string };
export type AuditRow = { id: string; source: string; action: string; entity_type: string | null; entity_id: string | null; actor: string; occurred_at: string };
export type PriorityAlert = { id: string; title: string; severity: "danger" | "warning"; entity_type: string | null; entity_id: string | null; risk_score: number | null; created_at: string };

export interface MarketplaceDashboardData {
  filters: { date_from: string; date_to: string; timezone: string; currency: string | null };
  available_currencies: string[];
  summary: Record<"gmv" | "nmv" | "total_orders" | "aov" | "active_sellers" | "active_listings" | "commission" | "expenses", DashboardMetric>;
  trend: { availability: Availability; reason?: string | null; items: TrendPoint[] };
  composition: Record<"category" | "seller" | "channel", CompositionItem[]>;
  order_lifecycle: Record<string, number>;
  operational_queues: QueueItem[];
  top_sellers: SellerRow[];
  recent_activity: AuditRow[];
  marketplace_health: { availability: Availability; score: number | null; reason?: string; components: Array<{ label: string; value: number }> };
  priority_alerts: PriorityAlert[];
  financial_snapshot: Record<"gmv" | "nmv" | "commission" | "pending_settlements", DashboardMetric>;
  risk_signals: { availability: Availability; items: PriorityAlert[] };
  permissions: { can_export: boolean; can_manage: boolean };
  meta: { generated_at: string; data_as_of: string; timezone: string; currency: string | null; refresh_interval_seconds: number };
}

export type MarketplaceDashboardFilters = { dateFrom?: string; dateTo?: string; timezone?: string; currency?: string };
