import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN02ExecutivePerformanceDashboard } from "@/components/admin/analytics/AN02ExecutivePerformanceDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/executive-performance",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Executive Performance & Enterprise KPI Analytics", () => {
  it("registers Executive Performance in ADMIN_NAVIGATION under Analytics", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const execChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/executive-performance"
    );
    expect(execChild).toBeDefined();
    expect(execChild?.label).toBe("Executive Performance");
  });

  it("renders page header title without AN02, descriptive subtitle, and header action buttons", () => {
    render(<AN02ExecutivePerformanceDashboard />);
    expect(
      screen.getByText("Executive Performance & Enterprise KPI Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Executive performance overview across the enterprise/)
    ).toBeInTheDocument();

    expect(screen.getByText("Review KPI Guardrails")).toBeInTheDocument();
    expect(screen.getByText("Compare Periods")).toBeInTheDocument();
    expect(screen.getByText("Export Executive Report")).toBeInTheDocument();
    expect(screen.getByText("Open Forecast")).toBeInTheDocument();
    expect(screen.getAllByText("Executive Insights Report").length).toBeGreaterThan(0);
  });

  it("renders compact context / data status strip", () => {
    render(<AN02ExecutivePerformanceDashboard />);
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Executive Analytics Scope")).toBeInTheDocument();
  });

  it("renders primary KPI cards and Overall Executive Performance Health card", () => {
    render(<AN02ExecutivePerformanceDashboard />);
    expect(screen.getAllByText(/Net Revenue/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 116.8M").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Gross Margin/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("31.4%").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Orders/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("62,618").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Active Customers/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("28,416").length).toBeGreaterThan(0);
    expect(screen.getByText("Overall Executive Performance Health")).toBeInTheDocument();
  });

  it("renders strategic scorecard and lower analytics tables", () => {
    render(<AN02ExecutivePerformanceDashboard />);
    expect(screen.getByText("Enterprise Strategic Scorecard")).toBeInTheDocument();
    expect(screen.getAllByText("Operational Excellence").length).toBeGreaterThan(0);

    expect(screen.getByText("Growth Scorecard")).toBeInTheDocument();
    expect(screen.getByText("Customer Health")).toBeInTheDocument();
    expect(screen.getByText("Commercial Performance")).toBeInTheDocument();
    expect(screen.getByText("Supplier Health")).toBeInTheDocument();
    expect(screen.getByText("Inventory & Operations Health")).toBeInTheDocument();
    expect(screen.getByText("Marketing Efficiency")).toBeInTheDocument();
    expect(screen.getByText("Finance & Cash Health")).toBeInTheDocument();
    expect(screen.getByText("Customer Support")).toBeInTheDocument();
    expect(screen.getByText("Compliance & Risk")).toBeInTheDocument();
  });

  it("renders right-side Executive Health Rail", () => {
    render(<AN02ExecutivePerformanceDashboard />);
    expect(screen.getByText("Executive Health Summary")).toBeInTheDocument();
    expect(screen.getByText("Expanded view of overall health.")).toBeInTheDocument();
    expect(screen.getByText("Health by Pillar")).toBeInTheDocument();
    expect(screen.getByText("High Priority Alerts")).toBeInTheDocument();
    expect(screen.getByText("Review KPI Exceptions")).toBeInTheDocument();
  });
});
