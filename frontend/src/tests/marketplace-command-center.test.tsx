import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MarketplacePage from "@/app/admin/marketplace/page";
import { fetchMarketplaceDashboard } from "@/services/api/marketplaceDashboardService";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

describe("Marketplace Command Center", () => {
  it("loads typed dashboard fixture data through the service", async () => {
    const result = await fetchMarketplaceDashboard();
    expect(result.kpis).toHaveLength(8);
    expect(result.sellers).toHaveLength(4);
    expect(result.alerts).toHaveLength(4);
  });

  it("renders the route heading, KPIs, charts, queues and operational rail", async () => {
    render(<MarketplacePage />);
    expect(await screen.findByRole("heading", { name: "Marketplace Command Center", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText("LKR 45.2M").length).toBeGreaterThan(0);
    expect(screen.getByText("1,452")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Marketplace Sales & Revenue Trend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Marketplace Health" })).toBeInTheDocument();
    expect(screen.getByText("New Registrations")).toBeInTheDocument();
  });

  it("switches trend periods and composition tabs", async () => {
    render(<MarketplacePage />);
    await screen.findAllByText("LKR 45.2M");
    fireEvent.click(screen.getByRole("button", { name: "weekly" }));
    expect(screen.getByRole("button", { name: "weekly" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "seller" }));
    expect(screen.getByRole("button", { name: "seller" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("Ceylon Beauty").length).toBeGreaterThan(0);
  });

  it("connects lifecycle and queue cards to existing context-preserving routes", async () => {
    render(<MarketplacePage />);
    const delivered = (await screen.findByText("Delivered")).closest("a");
    expect(delivered).not.toBeNull();
    expect(delivered).toHaveAttribute("href", "/admin/marketplace/orders?deliveryStatus=delivered&tenant=sl-beauty-enterprise&businessUnit=LK");
    expect(screen.getByText("Return Orders").closest("a")).toHaveAttribute("href", "/admin/marketplace/returns?tenant=sl-beauty-enterprise&businessUnit=LK");
  });

  it.each([
    ["Generate Report", "Generate Marketplace Report"],
    ["Export Report", "Export Report"],
    ["Marketplace Settings", "Marketplace Settings"],
    ["Manage Marketplaces", "Connected Marketplaces"],
  ])("opens the %s workflow", async (button, dialog) => {
    render(<MarketplacePage />);
    fireEvent.click(await screen.findByRole("button", { name: button }));
    expect(screen.getByRole("dialog", { name: dialog })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("exposes seller and audit actions without undefined routes", async () => {
    render(<MarketplacePage />);
    fireEvent.click(await screen.findByRole("button", { name: "Actions for Ceylon Beauty" }));
    fireEvent.click(screen.getByRole("button", { name: "Open actions" }));
    expect(screen.getByRole("dialog", { name: "Seller Actions" })).toBeInTheDocument();
  });

  it("makes Marketplace parent and Command Center child point to the new route", () => {
    const marketplace = ADMIN_NAVIGATION.find(item => item.id === "marketplace");
    expect(marketplace?.href).toBe("/admin/marketplace");
    expect(marketplace?.children?.find(item => item.id === "command-center")?.href).toBe("/admin/marketplace");
  });
});
