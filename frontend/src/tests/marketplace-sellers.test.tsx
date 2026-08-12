import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN06MarketplaceSellersDashboard } from "@/components/admin/analytics/AN06MarketplaceSellersDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/marketplace-sellers",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Marketplace, Seller & Channel Analytics (AN06)", () => {
  it("registers Marketplace & Sellers in ADMIN_NAVIGATION pointing to /admin/analytics/marketplace-sellers", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const mpChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/marketplace-sellers"
    );
    expect(mpChild).toBeDefined();
    expect(mpChild?.label).toBe("Marketplace & Sellers");
  });

  it("renders visible page header title without AN06", () => {
    render(<AN06MarketplaceSellersDashboard />);
    expect(
      screen.getByText("Marketplace, Seller & Channel Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Analyze marketplace growth, seller contribution/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN06MarketplaceSellersDashboard />);
    expect(screen.getAllByText("Generate Marketplace Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Seller Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compare Channels").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Run Seller Forecast").length).toBeGreaterThan(0);
  });

  it("renders context strip and status alert strip", () => {
    render(<AN06MarketplaceSellersDashboard />);
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getAllByText("Seller Risk").length).toBeGreaterThan(0);
  });

  it("renders 10 top KPI metrics including Marketplace GMV and Analytics Health", () => {
    render(<AN06MarketplaceSellersDashboard />);
    expect(screen.getAllByText("LKR 128.4M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 18.6M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("42,618").length).toBeGreaterThan(0);
    expect(screen.getAllByText("186").length).toBeGreaterThan(0);
    expect(screen.getAllByText("18").length).toBeGreaterThan(0);
    expect(screen.getAllByText("18,420").length).toBeGreaterThan(0);
    expect(screen.getByText("10. Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("Excellent").length).toBeGreaterThan(0);
  });

  it("renders funnel chart, exception center, and right health rail", () => {
    render(<AN06MarketplaceSellersDashboard />);
    expect(screen.getByText("Marketplace Funnel")).toBeInTheDocument();
    expect(screen.getByText("Sessions")).toBeInTheDocument();
    expect(screen.getByText("Marketplace Exception Center")).toBeInTheDocument();
    expect(screen.getByText("EXCP-1021")).toBeInTheDocument();
    expect(screen.getByText("Marketplace Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("95").length).toBeGreaterThan(0);
  });
});
