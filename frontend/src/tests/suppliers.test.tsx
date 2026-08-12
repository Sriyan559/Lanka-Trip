import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN08SuppliersDashboard } from "@/components/admin/analytics/AN08SuppliersDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/suppliers",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Supplier & Procurement Analytics (AN08)", () => {
  it("registers Suppliers in ADMIN_NAVIGATION pointing to /admin/analytics/suppliers", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const supChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/suppliers"
    );
    expect(supChild).toBeDefined();
    expect(supChild?.label).toBe("Suppliers");
  });

  it("renders visible page header title without AN08", () => {
    render(<AN08SuppliersDashboard />);
    expect(
      screen.getByText("Supplier & Procurement Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive supplier, procurement, cost, quality/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN08SuppliersDashboard />);
    expect(screen.getAllByText("Generate Supplier Analytics Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Supplier Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compare Suppliers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Run Procurement Forecast").length).toBeGreaterThan(0);
  });

  it("renders governance context strip and readiness status strip", () => {
    render(<AN08SuppliersDashboard />);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getAllByText("Healthy").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SLA Risk").length).toBeGreaterThan(0);
  });

  it("renders 10 top KPI metrics including Active Suppliers and Analytics Health", () => {
    render(<AN08SuppliersDashboard />);
    expect(screen.getAllByText("186").length).toBeGreaterThan(0);
    expect(screen.getAllByText("62.8M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3.8K").length).toBeGreaterThan(0);
    expect(screen.getAllByText("94.3%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("92.6%").length).toBeGreaterThan(0);
    expect(screen.getByText("10. Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("Healthy").length).toBeGreaterThan(0);
  });

  it("renders cost bridge, underlying PO records, and right health rail", () => {
    render(<AN08SuppliersDashboard />);
    expect(screen.getByText("Cost Bridge")).toBeInTheDocument();
    expect(screen.getByText("Underlying Procurement Analytics Records")).toBeInTheDocument();
    expect(screen.getByText("PO-36001")).toBeInTheDocument();
    expect(screen.getByText("Supplier Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("95").length).toBeGreaterThan(0);
  });
});
