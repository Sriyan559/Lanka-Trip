import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";
import QualityManagementPage from "@/app/admin/catalogue/quality/page";

describe("QualityManagementPage (Screen C14 Catalogue Quality & Duplicate Resolution)", () => {
  it("registers Catalogue Quality in ADMIN_NAVIGATION under Catalogue", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    const qualityItem = catalogueNav?.children?.find((child) => child.id === "quality");
    expect(qualityItem).toBeDefined();
    expect(qualityItem?.href).toBe("/admin/catalogue/quality");
  });

  it("renders page header, title, actions, business context, KPIs, and main workspace", () => {
    render(<QualityManagementPage />);

    // Page title and breadcrumbs
    expect(screen.getAllByText("Catalogue Quality & Duplicate Resolution").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Catalogue Quality").length).toBeGreaterThan(0);

    // Header actions
    expect(screen.getByText("Export Quality Report")).toBeInTheDocument();
    expect(screen.getByText("Run Validation")).toBeInTheDocument();
    expect(screen.getByText("+ Create Quality Case")).toBeInTheDocument();

    // Business Context Strip
    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Beauty Marketplace").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sri Lanka").length).toBeGreaterThan(0);

    // Key KPI Cards
    expect(screen.getByText("Overall Quality Score")).toBeInTheDocument();
    expect(screen.getByText("89 /100")).toBeInTheDocument();
    expect(screen.getByText("Open Quality Issues")).toBeInTheDocument();
    expect(screen.getAllByText("Critical Issues").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Product Candidates").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Publication Blockers").length).toBeGreaterThan(0);

    // Horizontal Tabs
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Duplicate Products")).toBeInTheDocument();
    expect(screen.getByText("Incomplete Records")).toBeInTheDocument();
    expect(screen.getAllByText("Validation Failures").length).toBeGreaterThan(0);

    // Charts & Summaries
    expect(screen.getByText("Catalogue Quality Trend")).toBeInTheDocument();
    expect(screen.getByText("Issue Distribution")).toBeInTheDocument();
    expect(screen.getByText("Issue Status Summary")).toBeInTheDocument();

    // Scorecard
    expect(screen.getByText("Catalogue Quality Scorecard")).toBeInTheDocument();
    expect(screen.getByText("Identity Completeness")).toBeInTheDocument();
    expect(screen.getByText("Compliance Readiness")).toBeInTheDocument();

    // Table Content
    expect(screen.getAllByText("QLT-2026-004821").length).toBeGreaterThan(0);
    expect(screen.getByText("Radiance Vitamin C Serum")).toBeInTheDocument();
    expect(screen.getByText("QLT-2026-004799")).toBeInTheDocument();
    expect(screen.getByText("QLT-2026-004702")).toBeInTheDocument();

    // Lower Panels
    expect(screen.getAllByText("Incomplete Product Records").length).toBeGreaterThan(0);
    expect(screen.getByText("Validation Failure Summary")).toBeInTheDocument();
    expect(screen.getByText("Publication Readiness Impact")).toBeInTheDocument();
    expect(screen.getByText("Merge & Resolution Performance")).toBeInTheDocument();
    expect(screen.getByText("Quality Governance Summary")).toBeInTheDocument();
    expect(screen.getByText("Recent Catalogue Quality Activity")).toBeInTheDocument();

    // Right Sidebar
    expect(screen.getByText("Quality Operations Health")).toBeInTheDocument();
    expect(screen.getByText("Priority Quality Alerts")).toBeInTheDocument();
    expect(screen.getByText("Duplicate Summary")).toBeInTheDocument();
    expect(screen.getByText("SLA Summary")).toBeInTheDocument();
  });
});
