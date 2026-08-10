import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CatalogueCommandCenterPage from "@/app/admin/catalogue/page";
import type { CatalogueCommandCenterData } from "@/types/catalogue";

const push = vi.fn(); const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/services/api/catalogueCommandCenter", () => ({
  getPriorityApprovals: vi.fn(async () => data.priorityApprovals),
  getCatalogueTrends: vi.fn(async () => data.trend),
  getCatalogueComposition: vi.fn(async () => data.composition),
  exportCatalogueCommandCenter: vi.fn(async () => undefined),
  importCatalogue: vi.fn(async () => ({ data: { created: 1, updated: 0 } })),
}));

let hookState: { data: CatalogueCommandCenterData | null; error: Error | null; loading: boolean; refreshing: boolean; refresh: typeof refresh };
vi.mock("@/hooks/useCatalogueCommandCenter", () => ({ useCatalogueCommandCenter: () => hookState }));

const data: CatalogueCommandCenterData = {
  context: { defaults: { tenant: "Platform catalogue", ecosystem: "All ecosystems", businessUnit: "All business units", salesChannel: "All channels", region: "All regions", currency: "", dateRange: "Last 30 Days" }, options: { tenant: [{ value: "platform", label: "Platform catalogue" }] }, dateFrom: "2026-07-12", dateTo: "2026-08-10", unsupportedFilters: ["tenant", "ecosystem", "businessUnit", "salesChannel", "region"] },
  kpis: Array.from({ length: 12 }, (_, index) => ({ id: `kpi-${index + 1}`, seq: index + 1, label: ["Total Product Masters","Active Products","Pending Approval","Draft Products","Incomplete Records","Duplicate Risks","Missing Media","Compliance Issues","Available Inventory","Low-Stock Products","Near-Expiry Batches","Recalled or Quarantined"][index], value: index < 10 ? String(index + 1) : "Unavailable", rawValue: index < 10 ? index + 1 : null, trend: "0%", isPositive: true, iconName: "Package", filterKey: ["all","active","pending","draft","incomplete","duplicate","missing-media","compliance","available-inventory","low-stock","near-expiry","recalled"][index], availability: index < 10 ? "available" : "unavailable" })),
  trend: { granularity: "weekly", points: [] }, composition: { availability: "available", dimension: "category", total: 0, items: [] },
  health: { availability: "available", score: 80, state: "Needs Attention", metrics: { completeness: 80, approvalEfficiency: 70, dataQuality: 75, media: 85, compliance: 90 } },
  healthScorecard: [{ label: "Product Completeness", percentage: 80, status: "warning" }], alerts: [],
  approvalPipeline: [{ id: "draft", label: "Draft", count: 1, iconName: "FileEdit" }], approvalStatusSummary: [{ label: "Draft", count: 1, color: "#999" }],
  slaSummary: { availability: "unavailable", items: [] }, inventoryRiskSummary: [{ label: "Low Stock", count: 2, color: "#f59e0b" }], quickQueues: [{ id: "pending", label: "Pending Product Approvals", count: 1, filterKey: "pending" }],
  priorityApprovals: { items: [], pagination: { page: 1, pageSize: 20, total: 0, lastPage: 1 } },
  quality: { issues: [], completeness: [], categoryCoverage: { totalCategories: 1, activeCategories: 1, emptyCategories: 0, productsMissingCategory: 0, categoriesRequiringReview: 0, topCategoryGaps: [] }, brandCoverage: { totalBrands: 1, verifiedBrands: 1, pendingVerification: 0, unauthorizedBrandUse: 0, productsMissingBrand: 0, expiringAuthorization: 0 } },
  inventory: { availability: "partial", availableStock: 4, lowStockProducts: 2, batches: [], expiryExposure: [], channels: [], reason: "not_modelled" }, recentActivity: [], permissions: { canExport: true, canManage: true }, meta: { generatedAt: "2026-08-10T10:00:00Z", timezone: "Asia/Colombo", refreshIntervalSeconds: 30 },
};

describe("Catalogue Command Center", () => {
  beforeEach(() => { push.mockReset(); refresh.mockReset(); hookState = { data, error: null, loading: false, refreshing: false, refresh }; });

  it("renders database values and explicit unavailable states", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Catalogue Command Center" })).toBeInTheDocument();
    expect(screen.getByText("Total Product Masters")).toBeInTheDocument();
    expect(screen.getAllByText("Unavailable").length).toBeGreaterThan(0);
    expect(screen.getByText("No matching catalogue approvals found.")).toBeInTheDocument();
  });

  it("shows a retryable API error state", () => {
    hookState = { data: null, error: new Error("failed"), loading: false, refreshing: false, refresh };
    render(<CatalogueCommandCenterPage />); fireEvent.click(screen.getByRole("button", { name: "Retry" })); expect(refresh).toHaveBeenCalled();
  });

  it("runs manual refresh and changes date range", () => {
    render(<CatalogueCommandCenterPage />); fireEvent.click(screen.getByTitle("Refresh data")); expect(refresh).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText("Date Range"), { target: { value: "Last 7 Days" } }); expect(screen.getByLabelText("Date Range")).toHaveValue("Last 7 Days");
  });

  it("opens import and navigates creation", () => {
    render(<CatalogueCommandCenterPage />);
    fireEvent.click(screen.getByRole("button", { name: /Import Catalogue/i })); expect(screen.getByText("Import Catalogue Data")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Create Product Master/i })); expect(push).toHaveBeenCalledWith("/admin/catalogue/products/create");
  });

  it("opens the database-backed data check", async () => {
    render(<CatalogueCommandCenterPage />); fireEvent.click(screen.getByTitle("Run Catalogue Data Integrity Scan"));
    expect(screen.getByText("Catalogue Data Check")).toBeInTheDocument(); fireEvent.click(screen.getByText("Re-run Validation Scan")); await waitFor(() => expect(refresh).toHaveBeenCalled());
  });
});
