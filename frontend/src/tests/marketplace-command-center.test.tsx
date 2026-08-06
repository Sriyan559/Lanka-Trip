import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MarketplacePage from "@/app/admin/marketplace/page";
import { exportMarketplaceDashboard, fetchMarketplaceDashboard } from "@/services/api/marketplaceDashboardService";
import type { DashboardMetric, MarketplaceDashboardData } from "@/types/marketplaceDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("@/services/api/marketplaceDashboardService", () => ({ fetchMarketplaceDashboard: vi.fn(), exportMarketplaceDashboard: vi.fn() }));

const money = (value: number): DashboardMetric => ({ availability: "available", value, currency: "USD", definition: "database_value" });
const fixture: MarketplaceDashboardData = {
  filters: { date_from: "2026-07-07", date_to: "2026-08-05", timezone: "Asia/Colombo", currency: "USD" },
  available_currencies: ["USD"],
  summary: { gmv: money(4850), nmv: money(0), total_orders: { availability: "available", value: 1 }, aov: money(4850), active_sellers: { availability: "available", value: 13 }, active_listings: { availability: "available", value: 13 }, commission: money(0), expenses: { availability: "unavailable", value: null, reason: "marketplace_expense_business_rule_not_defined" } },
  trend: { availability: "available", items: [{ date: "2026-07-30", gmv: 4850, revenue: 0, orders: 1 }] },
  composition: { category: [{ id: "1", label: "Skin Care", value: 13, percentage: 100 }], seller: [{ id: "1", label: "Serendib", value: 13, percentage: 100 }], channel: [{ id: "quotation", label: "quotation", value: 1, percentage: 100 }] },
  order_lifecycle: { confirmed: 1 },
  operational_queues: [{ id: "listing_approvals", label: "Listing Approvals", count: 43, href: "/admin/catalogue/product-approvals?status=pending" }],
  top_sellers: [{ id: "1", name: "Serendib", orders: 1, gmv: 4850, fulfilment_rate: 0, cancellation_rate: 0, rating: 4.9, status: "active" }],
  recent_activity: [{ id: "74", source: "orders", action: "order.created", entity_type: "Order", entity_id: "1", actor: "System", occurred_at: "2026-07-30T12:02:32+05:30" }],
  marketplace_health: { availability: "unavailable", score: null, reason: "approved_health_score_formula_not_defined", components: [] },
  priority_alerts: [],
  financial_snapshot: { gmv: money(4850), nmv: money(0), commission: money(0), pending_settlements: money(0) },
  risk_signals: { availability: "available", items: [] },
  permissions: { can_export: true, can_manage: true },
  meta: { generated_at: "2026-08-05T12:00:00+05:30", data_as_of: "2026-08-05T12:00:00+05:30", timezone: "Asia/Colombo", currency: "USD", refresh_interval_seconds: 30 },
};

describe("Marketplace Command Center", () => {
  beforeEach(() => {
    vi.mocked(fetchMarketplaceDashboard).mockResolvedValue(fixture);
    vi.mocked(exportMarketplaceDashboard).mockResolvedValue();
  });

  it("renders API-backed KPIs, queues, tables and explicit unavailable metrics", async () => {
    render(<MarketplacePage />);
    expect(await screen.findByRole("heading", { name: "Marketplace Command Center", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText("USD 4,850").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Not available").length).toBeGreaterThan(0);
    expect(screen.getByText("Listing Approvals")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open seller" })).toHaveAttribute("href", "/admin/marketplace/sellers/1");
  });

  it("switches real trend aggregation and composition views", async () => {
    render(<MarketplacePage />);
    await screen.findAllByText("Skin Care");
    fireEvent.click(screen.getByRole("button", { name: "weekly" }));
    expect(screen.getByRole("button", { name: "weekly" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "seller" }));
    expect(screen.getAllByText("Serendib").length).toBeGreaterThan(0);
  });

  it("uses real navigation routes and invokes the export service", async () => {
    render(<MarketplacePage />);
    expect(await screen.findByRole("link", { name: "Generate Report" })).toHaveAttribute("href", "/admin/analytics/reports/order-performance?from=2026-07-07&to=2026-08-05");
    expect(screen.getByRole("link", { name: "Marketplace Settings" })).toHaveAttribute("href", "/admin/marketplace/settings");
    expect(screen.getByRole("link", { name: "Manage Marketplace" })).toHaveAttribute("href", "/admin/marketplace/channels");
    fireEvent.click(screen.getByRole("button", { name: "Export Report" }));
    await waitFor(() => expect(exportMarketplaceDashboard).toHaveBeenCalledWith({}));
  });

  it("shows API errors with a retry action instead of fixture data", async () => {
    vi.mocked(fetchMarketplaceDashboard).mockRejectedValueOnce(new Error("Backend unavailable"));
    render(<MarketplacePage />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Backend unavailable");
    vi.mocked(fetchMarketplaceDashboard).mockResolvedValueOnce(fixture);
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(await screen.findByText("Listing Approvals")).toBeInTheDocument();
  });

  it("keeps Marketplace navigation pointed at the command center", () => {
    const marketplace = ADMIN_NAVIGATION.find(item => item.id === "marketplace");
    expect(marketplace?.href).toBe("/admin/marketplace");
    expect(marketplace?.children?.find(item => item.id === "command-center")?.href).toBe("/admin/marketplace");
  });
});
