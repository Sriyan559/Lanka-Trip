import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN04SalesRevenueDashboard } from "@/components/admin/analytics/AN04SalesRevenueDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/sales-revenue",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Sales, Revenue, Margin & Commercial Analytics (AN04)", () => {
  it("registers Sales & Revenue in ADMIN_NAVIGATION pointing to /admin/analytics/sales-revenue", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const salesChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/sales-revenue"
    );
    expect(salesChild).toBeDefined();
    expect(salesChild?.label).toBe("Sales & Revenue");
  });

  it("renders visible title without displaying AN04 in the header title", () => {
    render(<AN04SalesRevenueDashboard />);
    expect(
      screen.getByText("Sales, Revenue, Margin & Commercial Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/End-to-end commercial performance across channels/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN04SalesRevenueDashboard />);
    expect(screen.getAllByText("Generate Commercial Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Revenue Exceptions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Margin Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Run Commercial Forecast").length).toBeGreaterThan(0);
  });

  it("renders context strip and readiness status row", () => {
    render(<AN04SalesRevenueDashboard />);
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
    expect(screen.getByText("Beauty & Wellness")).toBeInTheDocument();
    expect(screen.getByText("Commercial Readiness Status")).toBeInTheDocument();
    expect(screen.getByText("Data Freshness")).toBeInTheDocument();
  });

  it("renders primary 14 KPI metrics and Commercial Health card (95/100)", () => {
    render(<AN04SalesRevenueDashboard />);
    expect(screen.getAllByText("1.8B").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1.6B").length).toBeGreaterThan(0);
    expect(screen.getAllByText("31.4%").length).toBeGreaterThan(0);
    expect(screen.getByText("42.61%")).toBeInTheDocument();
    expect(screen.getAllByText("842.1K").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1.9K").length).toBeGreaterThan(0);
    expect(screen.getByText("7. Commercial Health")).toBeInTheDocument();
  });

  it("renders tabs navigation and primary charts", () => {
    render(<AN04SalesRevenueDashboard />);
    expect(screen.getByText("Commercial Overview")).toBeInTheDocument();
    expect(screen.getByText("Sales & Returns Trend")).toBeInTheDocument();
    expect(screen.getByText("Revenue Bridge")).toBeInTheDocument();
    expect(screen.getByText("Margin Bridge")).toBeInTheDocument();
    expect(screen.getByText("Revenue vs Target")).toBeInTheDocument();
  });

  it("renders tables, bottom visual analytics, and right Commercial Analytics Health rail", () => {
    render(<AN04SalesRevenueDashboard />);
    expect(screen.getByText("Commercial Target Scorecard")).toBeInTheDocument();
    expect(screen.getByText("Channel Performance")).toBeInTheDocument();
    expect(screen.getByText("Category Revenue & Margin")).toBeInTheDocument();
    expect(screen.getByText("Supplier Performance")).toBeInTheDocument();
    expect(screen.getByText("Promotion Performance")).toBeInTheDocument();
    expect(screen.getByText("Sales Scatter")).toBeInTheDocument();
    expect(screen.getByText("Profitability Matrix")).toBeInTheDocument();
    expect(screen.getByText("Price Positioning")).toBeInTheDocument();
    expect(screen.getByText("Commercial Insights (AI)")).toBeInTheDocument();
    expect(screen.getByText("Commercial Analytics Health")).toBeInTheDocument();
  });
});
