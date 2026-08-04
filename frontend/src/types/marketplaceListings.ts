export type ListingTone = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

export type ListingRow = {
  id: string; name: string; descriptor: string; seller: string; product: string; brand: string;
  businessUnit: string; channel: string; price: string; stock: number; sales: string; conversion: string;
  verification: string; policy: string; risk: string; status: string; updated: string; reviewer: string;
};

export type ListingMetric = { id: string; label: string; value: number; tone: ListingTone };
export type ListingAlert = { title: string; detail: string; action: string; tone: ListingTone; filter: string };
export type ListingQueue = { label: string; count: number; filter: string; tone: ListingTone };

export interface MarketplaceListingsData {
  source: "frontend-fixture" | "api";
  lastUpdated: string;
  total: number;
  metrics: ListingMetric[];
  listings: ListingRow[];
  alerts: ListingAlert[];
  queues: ListingQueue[];
}
