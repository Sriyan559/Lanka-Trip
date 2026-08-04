export type MarketplaceKpi = { id: string; label: string; value: string; change: string; positive: boolean; note?: string; trend?: number[] };
export type TrendPoint = { label: string; gmv: number; sales: number; commission: number; refunds: number };
export type CompositionItem = { label: string; value: number; color: string };
export type LifecycleStage = { label: string; count: number; href: string; tone: "neutral" | "warning" | "info" | "success" | "danger" };
export type QueueItem = { label: string; count: number; href?: string };
export type SellerRow = { rank: number; seller: string; unit: string; orders: number; gmv: string; fulfilment: string; cancellation: string; returnRate: string; rating: string; risk: "Low" | "High"; status: "Live" | "Under Review" };
export type AuditRow = { event: string; reference: string; entity: string; action: string; timestamp: string; by: string; unit: string; href?: string };
export type HealthMetric = { label: string; value: number; display: string; tone?: "green" | "amber" | "burgundy" };
export type PriorityAlert = { title: string; description: string; time: string; action: string; href?: string; severity: "danger" | "warning" | "info" };
export interface MarketplaceDashboardData {
  lastUpdated: string;
  kpis: MarketplaceKpi[];
  trends: Record<"daily" | "weekly" | "monthly", TrendPoint[]>;
  composition: Record<"category" | "seller" | "channel" | "business", CompositionItem[]>;
  lifecycle: LifecycleStage[];
  queues: QueueItem[];
  sellers: SellerRow[];
  audits: AuditRow[];
  health: HealthMetric[];
  alerts: PriorityAlert[];
}
