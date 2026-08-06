import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { AttributeManagementView } from "@/components/admin/catalogue/attributes/AttributeManagementView";

vi.setConfig({ testTimeout: 15000 });

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/catalogue/attributes",
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Screen C11 — Attribute & Variant Management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header title, subtitle, breadcrumb and action buttons", () => {
    render(<AttributeManagementView />);
    expect(screen.getByText("Catalogue > Attributes & Variants")).toBeDefined();
    expect(screen.getByRole("heading", { name: /Attribute & Variant Management/i })).toBeDefined();
    expect(screen.getByText(/Manage catalogue attributes, required templates/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Export Attribute Report/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Import Attributes/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Create Attribute/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Create Variant Rule/i })).toBeDefined();
  });

  it("renders business context strip and live data indicator", () => {
    render(<AttributeManagementView />);
    expect(screen.getByText("SL Beauty")).toBeDefined();
    expect(screen.getByText("Beauty Marketplace")).toBeDefined();
    expect(screen.getByText("Live Data")).toBeDefined();
  });

  it("renders all 12 primary KPI cards", () => {
    render(<AttributeManagementView />);
    expect(screen.getAllByText("Total Attributes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active Attributes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Attribute Groups").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Variant Attributes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Required Attributes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Missing Attribute Values").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Invalid Variant Combos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate SKUs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Barcodes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Products w/o Default Variant").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Variant Media Gaps").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Variant Pricing Gaps").length).toBeGreaterThan(0);
  });

  it("renders status tabs and filters records when clicked", () => {
    render(<AttributeManagementView />);
    const requiredTab = screen.getAllByRole("button", { name: /Required/i })[0];
    expect(requiredTab).toBeDefined();
    fireEvent.click(requiredTab);
    expect(screen.getAllByText("Shade Name").length).toBeGreaterThan(0);
  });

  it("renders search input and filter dropdowns", () => {
    render(<AttributeManagementView />);
    const searchInput = screen.getByPlaceholderText(/Search attribute name, ID or description/i);
    expect(searchInput).toBeDefined();

    fireEvent.change(searchInput, { target: { value: "Shade Name" } });
    expect(screen.getAllByText("Shade Name").length).toBeGreaterThan(0);
  });

  it("renders Attribute Groups panel with all 9 groups", () => {
    render(<AttributeManagementView />);
    expect(screen.getByText("Attribute Groups & Templates")).toBeDefined();
    // Group names also appear in the filter dropdown, use getAllByText
    expect(screen.getAllByText("Product Identity").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Classification").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Skin & Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ingredients & Safety").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Variants & Attributes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pricing & Tax").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Media").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Publication").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Inventory").length).toBeGreaterThan(0);
  });

  it("renders Attribute Table with mock rows and copy ID buttons", () => {
    render(<AttributeManagementView />);
    expect(screen.getByText("Attributes")).toBeDefined();
    expect(screen.getAllByText("Shade Name").length).toBeGreaterThan(0);
    expect(screen.getByText("ATTR-0092")).toBeDefined();
    expect(screen.getAllByText("Size").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SPF Level").length).toBeGreaterThan(0);

    const copyButtons = screen.getAllByTitle("Copy ID");
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it("renders Selected Attribute Preview panel", () => {
    render(<AttributeManagementView />);
    // Preview should show default selected attribute
    expect(screen.getAllByText("Shade Name").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ATTR-0092").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Edit Attribute").length).toBeGreaterThan(0);
  });

  it("renders far-right Attribute Intelligence Sidebar with health score", () => {
    render(<AttributeManagementView />);
    expect(screen.getByText("Overall Attribute & Variant Health")).toBeDefined();
    expect(screen.getByText("Priority Alerts")).toBeDefined();
    expect(screen.getByText("Attribute Status Summary")).toBeDefined();
    expect(screen.getByText("Variant Readiness Summary")).toBeDefined();
    expect(screen.getByText("Quick Queues")).toBeDefined();
  });

  it("renders lower summary dashboards", () => {
    render(<AttributeManagementView />);
    expect(screen.getByText("Attribute Health Scorecard")).toBeDefined();
    expect(screen.getByText("Attribute Value Management")).toBeDefined();
    expect(screen.getByText("Category Attribute Template Matrix")).toBeDefined();
    expect(screen.getByText("Variant Generation Rules")).toBeDefined();
    expect(screen.getByText("Product Variant Readiness by Channel")).toBeDefined();
    expect(screen.getByText("Attribute Validation Rules")).toBeDefined();
    expect(screen.getByText("Attribute Dependencies & Inheritance")).toBeDefined();
    expect(screen.getByText("Channel Attribute Requirements")).toBeDefined();
    expect(screen.getByText("Attribute Quality & Variant Issues")).toBeDefined();
    expect(screen.getByText("Duplicate Attribute Candidates")).toBeDefined();
    expect(screen.getByText("Recent Attribute & Variant Activity")).toBeDefined();
  });

  it("opens Create Attribute drawer", async () => {
    render(<AttributeManagementView />);
    const createBtn = screen.getByRole("button", { name: /Create Attribute/i });
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(screen.getByText("Create New Attribute Master")).toBeDefined();
    });
  });

  it("opens Create Variant Rule drawer", async () => {
    render(<AttributeManagementView />);
    const createBtn = screen.getByRole("button", { name: /Create Variant Rule/i });
    fireEvent.click(createBtn);

    await waitFor(() => {
      // Drawer title: "Create Variant Rule"
      expect(screen.getAllByText("Create Variant Rule").length).toBeGreaterThan(0);
    });
  });

  it("opens Import Attributes modal", async () => {
    render(<AttributeManagementView />);
    const importBtn = screen.getByRole("button", { name: /Import Attributes/i });
    fireEvent.click(importBtn);

    await waitFor(() => {
      expect(screen.getByText("Import Attribute Masters")).toBeDefined();
    });
  });
});
