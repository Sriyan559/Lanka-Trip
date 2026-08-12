import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AN10MarketingDashboard } from "@/components/admin/analytics/AN10MarketingDashboard";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/analytics/marketing",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Marketing, Campaign, Acquisition & Attribution Analytics (AN10)", () => {
  it("registers Marketing in ADMIN_NAVIGATION pointing to /admin/analytics/marketing", () => {
    const analyticsItem = ADMIN_NAVIGATION.find((item) => item.id === "analytics");
    expect(analyticsItem).toBeDefined();
    const mktChild = analyticsItem?.children?.find(
      (child) => child.href === "/admin/analytics/marketing"
    );
    expect(mktChild).toBeDefined();
    expect(mktChild?.label).toBe("Marketing");
  });

  it("renders visible page header title without AN10", () => {
    render(<AN10MarketingDashboard />);
    expect(
      screen.getByText("Marketing, Campaign, Acquisition & Attribution Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive marketing analytics across campaigns/)
    ).toBeInTheDocument();
  });

  it("renders top action buttons", () => {
    render(<AN10MarketingDashboard />);
    expect(screen.getAllByText("Generate Marketing Analytics Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Campaign Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compare Channels").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Run Marketing Forecast").length).toBeGreaterThan(0);
  });

  it("renders readiness status strip", () => {
    render(<AN10MarketingDashboard />);
    expect(screen.getAllByText("Spend Risk").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ROAS Risk").length).toBeGreaterThan(0);
  });

  it("renders 10 primary KPI metrics including Marketing Spend and Analytics Health", () => {
    render(<AN10MarketingDashboard />);
    expect(screen.getAllByText("LKR 22.6M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 85.1M").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3.76x").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2.84x").length).toBeGreaterThan(0);
    expect(screen.getByText("10. Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("Very Good").length).toBeGreaterThan(0);
  });

  it("renders channel performance, underlying records, and right health rail", () => {
    render(<AN10MarketingDashboard />);
    expect(screen.getByText("Channel Performance")).toBeInTheDocument();
    expect(screen.getAllByText("Paid Search").length).toBeGreaterThan(0);
    expect(screen.getByText("Underlying Marketing Analytics Records")).toBeInTheDocument();
    expect(screen.getByText("Marketing Analytics Health")).toBeInTheDocument();
    expect(screen.getAllByText("95").length).toBeGreaterThan(0);
  });
});
