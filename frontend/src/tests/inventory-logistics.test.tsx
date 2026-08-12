import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN09InventoryLogisticsDashboard } from "@/components/admin/analytics/AN09InventoryLogisticsDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/inventory-logistics",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Inventory, Warehouse, Fulfilment & Logistics Analytics (AN09)", () => {
  it("registers Inventory & Logistics in ADMIN_NAVIGATION pointing to /admin/analytics/inventory-logistics", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const invChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/inventory-logistics"
    );
    expect(invChild).toBeDefined();
    expect(invChild?.label).toBe("Inventory & Logistics");
  });

  it("renders visible page header title without AN09", () => {
    render(<AN09InventoryLogisticsDashboard />);
    expect(
      screen.getByText("Inventory, Warehouse, Fulfilment & Logistics Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Analyze inventory health, warehouse productivity/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN09InventoryLogisticsDashboard />);
    expect(screen.getAllByText("Generate Logistics Analytics Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Inventory Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Warehouse Capacity").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Fulfilment SLA").length).toBeGreaterThan(0);
  });

  it("renders readiness status strip", () => {
    render(<AN09InventoryLogisticsDashboard />);
    expect(screen.getByText("Stock Risk")).toBeInTheDocument();
    expect(screen.getByText("Fulfilment Risk")).toBeInTheDocument();
  });

  it("renders 10 top KPI metrics including Inventory Value and Analytics Health", () => {
    render(<AN09InventoryLogisticsDashboard />);
    expect(screen.getAllByText("LKR 142.8M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("84,216").length).toBeGreaterThan(0);
    expect(screen.getAllByText("6.2x").length).toBeGreaterThan(0);
    expect(screen.getAllByText("94.8%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("42,618").length).toBeGreaterThan(0);
    expect(screen.getByText("10. Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("Healthy").length).toBeGreaterThan(0);
  });

  it("renders warehouse performance, underlying records, and right health rail", () => {
    render(<AN09InventoryLogisticsDashboard />);
    expect(screen.getByText("Warehouse Portfolio Performance")).toBeInTheDocument();
    expect(screen.getAllByText("Colombo Central DC").length).toBeGreaterThan(0);
    expect(screen.getByText("Underlying Inventory & Logistics Records")).toBeInTheDocument();
    expect(screen.getByText("Inventory & Logistics Health")).toBeInTheDocument();
    expect(screen.getAllByText("94").length).toBeGreaterThan(0);
  });
});
