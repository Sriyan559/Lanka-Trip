import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN07ProductsBrandsDashboard } from "@/components/admin/analytics/AN07ProductsBrandsDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/products-brands",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Product, Catalogue, Brand & Category Analytics (AN07)", () => {
  it("registers Products & Brands in ADMIN_NAVIGATION pointing to /admin/analytics/products-brands", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const pbChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/products-brands"
    );
    expect(pbChild).toBeDefined();
    expect(pbChild?.label).toBe("Products & Brands");
  });

  it("renders visible page header title without AN07", () => {
    render(<AN07ProductsBrandsDashboard />);
    expect(
      screen.getByText("Product, Catalogue, Brand & Category Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Analyze product performance, catalogue health/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN07ProductsBrandsDashboard />);
    expect(screen.getAllByText("Generate Product Analytics Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Product Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Catalogue Quality").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Run Product Forecast").length).toBeGreaterThan(0);
  });

  it("renders context strip and readiness status strip", () => {
    render(<AN07ProductsBrandsDashboard />);
    expect(screen.getByText("All Business Units")).toBeInTheDocument();
    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Pricing Warnings")).toBeInTheDocument();
  });

  it("renders 10 top KPI metrics including Active Products and Analytics Health", () => {
    render(<AN07ProductsBrandsDashboard />);
    expect(screen.getAllByText("18,420").length).toBeGreaterThan(0);
    expect(screen.getAllByText("42,816").length).toBeGreaterThan(0);
    expect(screen.getAllByText("248").length).toBeGreaterThan(0);
    expect(screen.getAllByText("186").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 116.8M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 84.2M").length).toBeGreaterThan(0);
    expect(screen.getByText("10. Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("Very Good").length).toBeGreaterThan(0);
  });

  it("renders SKU & variant analytics, compliance audit, and right health rail", () => {
    render(<AN07ProductsBrandsDashboard />);
    expect(screen.getByText("SKU & Variant Analytics")).toBeInTheDocument();
    expect(screen.getByText("Product Compliance Audit")).toBeInTheDocument();
    expect(screen.getByText("Exception Center")).toBeInTheDocument();
    expect(screen.getByText("Product Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("96").length).toBeGreaterThan(0);
  });
});
