import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CatalogueCommandCenterPage from "@/app/admin/catalogue/page";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.setConfig({ testTimeout: 15000 });

describe("Catalogue Command Center", () => {
  it("renders the route title, subtitle, breadcrumb and action buttons", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Catalogue Command Center", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Monitor product masters, approvals, catalogue quality/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Export Catalogue Report/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Import Catalogue/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Catalogue Settings/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Product Master/i })).toBeInTheDocument();
  });

  it("renders all 12 primary KPI cards with correct mock values", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getAllByText("12,840").length).toBeGreaterThan(0);
    expect(screen.getByText("10,962")).toBeInTheDocument();
    expect(screen.getAllByText("312").length).toBeGreaterThan(0);
    expect(screen.getAllByText("486").length).toBeGreaterThan(0);
    expect(screen.getAllByText("248").length).toBeGreaterThan(0);
    expect(screen.getAllByText("36").length).toBeGreaterThan(0);
    expect(screen.getAllByText("124").length).toBeGreaterThan(0);
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("184,620 units")).toBeInTheDocument();
    expect(screen.getAllByText("318").length).toBeGreaterThan(0);
    expect(screen.getAllByText("42").length).toBeGreaterThan(0);
    expect(screen.getAllByText("14").length).toBeGreaterThan(0);
  });

  it("renders Catalogue Health sidebar, alerts, status summary, SLA, and quick queues", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Catalogue Health" })).toBeInTheDocument();
    expect(screen.getByText("89")).toBeInTheDocument();
    expect(screen.getByText("Stable")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Priority Catalogue Alerts" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Approval Status Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Catalogue SLA Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Inventory Risk Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quick Queues" })).toBeInTheDocument();
  });

  it("renders Growth & Approval Trend chart and Composition donut panel", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Catalogue Growth & Approval Trend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Catalogue Composition" })).toBeInTheDocument();
  });

  it("renders Product Approval Operations workflow and Priority Product Approvals table", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Product Approval Operations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Priority Product Approvals" })).toBeInTheDocument();
    expect(screen.getAllByText("Radiance Vitamin C Serum").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tokyo Brightening Essence").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Luxe Silk Lipstick Ruby Red").length).toBeGreaterThan(0);
  });

  it("renders Quality & Readiness, Completeness, Category & Brand Coverage", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Catalogue Quality & Data Readiness" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Product Completeness Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Category Coverage" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Brand Coverage" })).toBeInTheDocument();
  });

  it("renders Inventory & Expiry Operations and Recent Catalogue Activity", () => {
    render(<CatalogueCommandCenterPage />);
    expect(screen.getByRole("heading", { name: "Inventory & Expiry Operations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent Catalogue Activity" })).toBeInTheDocument();
  });

  it("opens and closes Import Catalogue Modal", async () => {
    render(<CatalogueCommandCenterPage />);
    const importBtn = screen.getByRole("button", { name: /Import Catalogue/i });
    fireEvent.click(importBtn);
    expect(screen.getByText("Import Catalogue Data")).toBeInTheDocument();
    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(screen.queryByText("Import Catalogue Data")).not.toBeInTheDocument();
    });
  });

  it("opens and closes Quick Query drawer and Data Check modal", async () => {
    render(<CatalogueCommandCenterPage />);
    
    // Quick Query
    const queryBtn = screen.getByTitle("Open Quick Query Console");
    fireEvent.click(queryBtn);
    expect(screen.getByText("Quick Query Console")).toBeInTheDocument();
    const closeQueryBtn = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeQueryBtn);
    await waitFor(() => {
      expect(screen.queryByText("Quick Query Console")).not.toBeInTheDocument();
    });

    // Data Check
    const dataCheckBtn = screen.getByTitle("Run Catalogue Data Integrity Scan");
    fireEvent.click(dataCheckBtn);
    expect(screen.getByText("Catalogue Data Check")).toBeInTheDocument();
    const doneBtn = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneBtn);
    await waitFor(() => {
      expect(screen.queryByText("Catalogue Data Check")).not.toBeInTheDocument();
    });
  });

  it("verifies ADMIN_NAVIGATION exposes Catalogue route correctly", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    expect(catalogueNav?.href).toBe("/admin/catalogue");
    const commandCenterChild = catalogueNav?.children?.find((child) => child.id === "command-center");
    expect(commandCenterChild?.href).toBe("/admin/catalogue");
  });
});
