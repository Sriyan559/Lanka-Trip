import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";
import CatalogueImportExportPage from "@/app/admin/catalogue/import-export/page";

describe("CatalogueImportExportPage (C13 - Screen C13 Catalogue Import & Export)", () => {
  it("registers Import & Export in ADMIN_NAVIGATION under Catalogue", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    const importExportItem = catalogueNav?.children?.find((child) => child.id === "import-export");
    expect(importExportItem).toBeDefined();
    expect(importExportItem?.href).toBe("/admin/catalogue/import-export");
  });

  it("renders page header, title, actions, business context, KPIs, and main workspace", () => {
    render(<CatalogueImportExportPage />);

    // Page title and breadcrumbs
    expect(screen.getAllByText("Catalogue Import & Export").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Catalogue").length).toBeGreaterThan(0);

    // Header actions
    expect(screen.getByText("Export Data Operations Report")).toBeInTheDocument();
    expect(screen.getByText("+ New Import")).toBeInTheDocument();
    expect(screen.getByText("Schedule Export")).toBeInTheDocument();

    // Business Context Strip
    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Beauty Marketplace").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sri Lanka").length).toBeGreaterThan(0);

    // Key KPI Cards
    expect(screen.getByText("Imports This Month")).toBeInTheDocument();
    expect(screen.getAllByText("1,248").length).toBeGreaterThan(0);
    expect(screen.getByText("Successful Imports")).toBeInTheDocument();
    expect(screen.getByText("1,102")).toBeInTheDocument();
    expect(screen.getByText("Records Processed")).toBeInTheDocument();
    expect(screen.getByText("4.2M")).toBeInTheDocument();

    // Charts
    expect(screen.getByText("Data Operations Trend")).toBeInTheDocument();
    expect(screen.getByText("Job Status Distribution")).toBeInTheDocument();
    expect(screen.getByText("2,356")).toBeInTheDocument();
    expect(screen.getByText("Total Jobs")).toBeInTheDocument();

    // Table Content
    expect(screen.getAllByText("IMP-8902").length).toBeGreaterThan(0);
    expect(screen.getByText("product_master_full.csv")).toBeInTheDocument();
    expect(screen.getByText("IMP-8898")).toBeInTheDocument();
    expect(screen.getAllByText("EXP-2216").length).toBeGreaterThan(0);

    // Active Import Workflow Stepper
    expect(screen.getByText(/Active Import Workflow/i)).toBeInTheDocument();
    expect(screen.getByText("Field Mapping")).toBeInTheDocument();
    expect(screen.getByText("Duplicate Review")).toBeInTheDocument();

    // Lower Operational Panels
    expect(screen.getByText("Field Mapping & Transformation Summary")).toBeInTheDocument();
    expect(screen.getByText("Validation Summary")).toBeInTheDocument();
    expect(screen.getByText("Duplicate Conflict Review")).toBeInTheDocument();
    expect(screen.getByText("Change Preview Summary")).toBeInTheDocument();

    // Bottom Operational Panels
    expect(screen.getByText("Catalogue Export Operations")).toBeInTheDocument();
    expect(screen.getAllByText("Scheduled Exports").length).toBeGreaterThan(0);
    expect(screen.getByText("Import Templates & Mapping Profiles")).toBeInTheDocument();
    expect(screen.getByText("Reconciliation & Audit Summary")).toBeInTheDocument();

    // Right Sidebar
    expect(screen.getByText("Data Operations Health")).toBeInTheDocument();
    expect(screen.getByText("Priority Data Alerts")).toBeInTheDocument();
    expect(screen.getByText("Import Status Summary")).toBeInTheDocument();
    expect(screen.getByText("Export Status Summary")).toBeInTheDocument();
  });
});
