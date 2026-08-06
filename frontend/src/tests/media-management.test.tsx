import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";
import MediaManagementPage from "@/app/admin/catalogue/media/page";

describe("MediaManagementPage (C12 - Screen C12 Media Asset Management)", () => {
  it("registers Media Assets in ADMIN_NAVIGATION under Catalogue", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    const mediaItem = catalogueNav?.children?.find((child) => child.id === "media");
    expect(mediaItem).toBeDefined();
    expect(mediaItem?.href).toBe("/admin/catalogue/media");
  });

  it("renders page header, title, actions, KPIs, and main workspace", () => {
    render(<MediaManagementPage />);

    // Page title and breadcrumbs
    expect(screen.getByText("Media Asset Management")).toBeInTheDocument();
    expect(screen.getByText("Catalogue")).toBeInTheDocument();
    expect(screen.getAllByText(/Media Assets/i).length).toBeGreaterThan(0);

    // Top Right Action Buttons
    expect(screen.getByText("Export Media Report")).toBeInTheDocument();
    expect(screen.getByText("Import Media")).toBeInTheDocument();
    expect(screen.getByText("Upload Media")).toBeInTheDocument();

    // Business Context Strip
    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Sri Lanka")).toBeInTheDocument();

    // Key KPI Cards
    expect(screen.getByText("Total Media Assets")).toBeInTheDocument();
    expect(screen.getByText("48,620")).toBeInTheDocument();
    expect(screen.getByText("Active Assets")).toBeInTheDocument();
    expect(screen.getAllByText("Approved Assets").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pending Approval").length).toBeGreaterThan(0);

    // Table Content
    expect(screen.getAllByText("MED-2026-818421").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Radiance Vitamin C Serum").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Estée Lauder").length).toBeGreaterThan(0);

    // Media Intelligence Sidebar
    expect(screen.getByText("Media Catalogue Health")).toBeInTheDocument();
    expect(screen.getByText("Priority Media Alerts")).toBeInTheDocument();
    expect(screen.getByText("Selected Asset Preview")).toBeInTheDocument();

    // Lower Operational Panels
    expect(screen.getByText("Media Health Scorecard")).toBeInTheDocument();
    expect(screen.getByText("Mandatory Media Coverage")).toBeInTheDocument();
    expect(screen.getByText("Product Media Readiness")).toBeInTheDocument();
    expect(screen.getByText("By sales channel")).toBeInTheDocument();

    // Product Media Readiness headers and channels
    expect(screen.getAllByText("Channel").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ready").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Partial").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Not Ready").length).toBeGreaterThan(0);

    expect(screen.getAllByText("Marketplace").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Mobile App").length).toBeGreaterThan(0);
    expect(screen.getAllByText("B2B Wholesale").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Partner Storefront").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Social Commerce").length).toBeGreaterThan(0);

    expect(screen.getByText("12,450")).toBeInTheDocument();
    expect(screen.getByText("1,020")).toBeInTheDocument();
    expect(screen.getByText("240")).toBeInTheDocument();

    expect(screen.getByText(/View channel report/i)).toBeInTheDocument();

    expect(screen.getByText("Automated Media Validation")).toBeInTheDocument();
    expect(screen.getByText("Recent Media Activity")).toBeInTheDocument();
  });
});
