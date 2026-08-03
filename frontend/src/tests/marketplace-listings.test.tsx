import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MarketplaceListingsPage from "@/app/admin/marketplace/listings/page";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";
import { fetchMarketplaceListings } from "@/services/api/marketplaceListingsService";

describe("Marketplace Listings Management", () => {
  it("loads the explicit typed fixture through its service", async () => {
    const result = await fetchMarketplaceListings();
    expect(result.source).toBe("frontend-fixture");
    expect(result.metrics).toHaveLength(12);
    expect(result.listings).toHaveLength(4);
  });

  it("renders the workspace and operational rail", async () => {
    render(<MarketplaceListingsPage />);
    await screen.findByText("Radiance Vitamin C Serum");
    expect(screen.getByRole("heading", { name: "Marketplace Listings Management" })).toBeInTheDocument();
    expect(screen.getAllByText("12,450").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Listing Health/ })).toBeInTheDocument();
    expect(screen.getByText("Radiance Vitamin C Serum")).toBeInTheDocument();
    expect(screen.getByText("Priority Alerts")).toBeInTheDocument();
  });

  it("filters rows from KPI/status controls", async () => {
    render(<MarketplaceListingsPage />);
    await screen.findByText("Radiance Vitamin C Serum");
    fireEvent.click(screen.getAllByRole("button", { name: /Rejected/ })[0]);
    expect(screen.getByText("Tokyo Essence Lip Tint")).toBeInTheDocument();
    expect(screen.queryByText("Radiance Vitamin C Serum")).not.toBeInTheDocument();
  });

  it("enables bulk actions only after selection and opens the workflow", async () => {
    render(<MarketplaceListingsPage />);
    await screen.findByText("Radiance Vitamin C Serum");
    const bulk = screen.getByRole("button", { name: /Bulk Actions/ });
    expect(bulk).toBeDisabled();
    fireEvent.click(screen.getByRole("checkbox", { name: "Select Radiance Vitamin C Serum" }));
    expect(bulk).toBeEnabled();
    fireEvent.click(bulk);
    expect(screen.getByRole("dialog", { name: "Bulk Actions" })).toBeInTheDocument();
  });

  it("keeps row actions in a drawer instead of opening missing routes", async () => {
    render(<MarketplaceListingsPage />);
    fireEvent.click(await screen.findByRole("button", { name: "Actions for Radiance Vitamin C Serum" }));
    fireEvent.click(screen.getByRole("button", { name: "View Listing" }));
    expect(screen.getByRole("dialog", { name: "View Listing" })).toBeInTheDocument();
  });

  it("registers an active Listings child route", () => {
    const marketplace = ADMIN_NAVIGATION.find(item => item.id === "marketplace");
    expect(marketplace?.children?.find(item => item.id === "listings")?.href).toBe("/admin/marketplace/listings");
  });
});
