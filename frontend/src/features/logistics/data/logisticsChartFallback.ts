/**
 * Centralized Fallback Data for LG01 Logistics & Fulfilment Command Center.
 * 
 * IMPORTANT:
 * - This dataset is used ONLY for visual chart presentation when the production database contains 0 operational records.
 * - This data MUST NEVER be saved to the database or treated as live metrics.
 */

// 30-Day Fulfilment & Delivery Trend Fallback Dataset
export const fallbackFulfilmentTrend = Array.from({ length: 30 }, (_, i) => {
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - (29 - i));
  const dateLabel = dateObj.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

  const base = 250 + Math.sin(i * 0.4) * 50;
  return {
    date: dateLabel,
    Booked: Math.round(base + Math.random() * 20),
    Shipped: Math.round(base * 0.85 + Math.random() * 15),
    Delivered: Math.round(base * 0.75 + Math.random() * 10),
    Delayed: Math.round(15 + Math.random() * 8),
    Failed: Math.round(5 + Math.random() * 4),
  };
});

// Logistics Status Distribution Donut Fallback Dataset
export const fallbackStatusDistribution = [
  { name: "Allocation Pending", value: 84, color: "#f59e0b" },
  { name: "Picking in Progress", value: 126, color: "#3b82f6" },
  { name: "Packing in Progress", value: 96, color: "#6366f1" },
  { name: "Ready for Dispatch", value: 142, color: "#8b5cf6" },
  { name: "Awaiting Pickup", value: 64, color: "#a855f7" },
  { name: "In Transit", value: 286, color: "#0284c7" },
  { name: "Out for Delivery", value: 118, color: "#06b6d4" },
  { name: "Delivered", value: 842, color: "#10b981" },
  { name: "Delayed", value: 42, color: "#f97316" },
  { name: "Failed", value: 12, color: "#ef4444" },
  { name: "Return in Progress", value: 38, color: "#ec4899" },
];

// Operational Status Summary Horizontal Bar Fallback Dataset
export const fallbackOperationalStatus = [
  { label: "On Track", count: 1422, percentage: 52.4, color: "#10b981" },
  { label: "At Risk", count: 586, percentage: 21.6, color: "#f59e0b" },
  { label: "Delayed", count: 312, percentage: 11.5, color: "#f97316" },
  { label: "Blocked", count: 130, percentage: 4.8, color: "#ef4444" },
  { label: "On Hold", count: 84, percentage: 3.1, color: "#64748b" },
  { label: "Exception", count: 92, percentage: 3.4, color: "#dc2626" },
  { label: "Reconciliation Required", count: 64, percentage: 2.3, color: "#8b5cf6" },
  { label: "Closed", count: 22, percentage: 0.9, color: "#475569" },
];

// Carrier Distribution Fallback Dataset
export const fallbackCarrierDistribution = [
  { carrier: "DHL Express", count: 480, percentage: 38.4 },
  { carrier: "FedEx International", count: 320, percentage: 25.6 },
  { carrier: "Domex Express", count: 240, percentage: 19.2 },
  { carrier: "Pronto Sri Lanka", count: 150, percentage: 12.0 },
  { carrier: "Unassigned", count: 60, percentage: 4.8 },
];

// Illustrative KPI Sparklines (Unique SVG points per card)
export const fallbackSparklines = {
  totalActiveShipments: [18, 22, 21, 28, 25, 32, 30, 36, 34, 41],
  pendingCarrier: [12, 16, 14, 19, 17, 23, 20, 25, 22, 28],
  pickupScheduled: [25, 29, 27, 34, 31, 38, 35, 42, 39, 45],
  awaitingPickup: [10, 14, 12, 17, 15, 20, 18, 23, 21, 26],
  pickedUpToday: [30, 35, 32, 40, 37, 45, 42, 48, 44, 52],
  inTransit: [40, 46, 43, 52, 48, 58, 54, 62, 58, 66],
  outForDelivery: [15, 19, 17, 24, 21, 28, 25, 31, 28, 35],
  deliveredToday: [50, 58, 54, 64, 60, 72, 68, 78, 74, 82],
  deliveryExceptions: [8, 6, 9, 5, 7, 4, 6, 3, 5, 2],
  failedDeliveries: [5, 4, 6, 3, 5, 2, 4, 2, 3, 1],
  returnShipments: [9, 12, 10, 15, 13, 17, 15, 19, 17, 21],
  slaBreaches: [6, 4, 5, 3, 4, 2, 3, 1, 2, 0],
};
