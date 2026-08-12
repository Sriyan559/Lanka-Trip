import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN05CustomersSegmentsDashboard } from "@/components/admin/analytics/AN05CustomersSegmentsDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/customers-segments",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Customer, Segment, Retention & Lifetime Value Analytics (AN05)", () => {
  it("registers Customers & Segments in ADMIN_NAVIGATION pointing to /admin/analytics/customers-segments", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const custChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/customers-segments"
    );
    expect(custChild).toBeDefined();
    expect(custChild?.label).toBe("Customers & Segments");
  });

  it("renders visible page header title without AN05", () => {
    render(<AN05CustomersSegmentsDashboard />);
    expect(
      screen.getByText("Customer, Segment, Retention & Lifetime Value Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive customer analytics across value, retention/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN05CustomersSegmentsDashboard />);
    expect(screen.getAllByText("Generate Customer Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Churn Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Run Retention Forecast").length).toBeGreaterThan(0);
  });

  it("renders context strip and active filter chips", () => {
    render(<AN05CustomersSegmentsDashboard />);
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("Medium Risk")).toBeInTheDocument();
    expect(screen.getAllByText("Churn Risk").length).toBeGreaterThan(0);
  });

  it("renders 10 top KPI metrics including Active Customers and Customer Analytics Health", () => {
    render(<AN05CustomersSegmentsDashboard />);
    expect(screen.getAllByText("28,416").length).toBeGreaterThan(0);
    expect(screen.getAllByText("4,218").length).toBeGreaterThan(0);
    expect(screen.getAllByText("24,198").length).toBeGreaterThan(0);
    expect(screen.getAllByText("34.5%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("78.6%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2.8%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Customer Analytics Health").length).toBeGreaterThan(0);
  });

  it("renders cohort heatmap table, exception center, and right health rail", () => {
    render(<AN05CustomersSegmentsDashboard />);
    expect(screen.getByText("Customer Cohort Retention")).toBeInTheDocument();
    expect(screen.getAllByText("May 2026").length).toBeGreaterThan(0);
    expect(screen.getByText("Customer Exception Center")).toBeInTheDocument();
    expect(screen.getAllByText("Customer Analytics Health").length).toBeGreaterThan(0);
    expect(screen.getAllByText("96").length).toBeGreaterThan(0);
    expect(screen.getByText("Very Good")).toBeInTheDocument();
  });
});
