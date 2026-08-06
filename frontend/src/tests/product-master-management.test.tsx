import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductMastersPage from "@/app/admin/catalogue/products/page";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.setConfig({ testTimeout: 15000 });

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Product Master Management (Screen C06)", () => {
  it("renders route title, subtitle, breadcrumb and primary action buttons", () => {
    render(<ProductMastersPage />);
    expect(screen.getByRole("heading", { name: "Product Master Management", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Manage master product records, variants, compliance/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Export Products/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Import Products/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Bulk Actions/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Product Master/i })).toBeInTheDocument();
  });

  it("renders all 12 primary KPI cards", () => {
    render(<ProductMastersPage />);
    expect(screen.getAllByText("12,840").length).toBeGreaterThan(0);
    expect(screen.getAllByText("10,962").length).toBeGreaterThan(0);
    expect(screen.getAllByText("486").length).toBeGreaterThan(0);
    expect(screen.getAllByText("312").length).toBeGreaterThan(0);
    expect(screen.getAllByText("248").length).toBeGreaterThan(0);
    expect(screen.getAllByText("36").length).toBeGreaterThan(0);
    expect(screen.getAllByText("124").length).toBeGreaterThan(0);
    expect(screen.getAllByText("29").length).toBeGreaterThan(0);
    expect(screen.getAllByText("8,920").length).toBeGreaterThan(0);
    expect(screen.getAllByText("11,420").length).toBeGreaterThan(0);
    expect(screen.getAllByText("9,846").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1,128").length).toBeGreaterThan(0);
  });

  it("renders horizontal status tabs and changes selection", () => {
    render(<ProductMastersPage />);
    expect(screen.getByRole("button", { name: /All Products/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Active/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Draft/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Pending Approval/i }).length).toBeGreaterThan(0);

    const activeTabBtn = screen.getByRole("button", { name: /Active/i });
    fireEvent.click(activeTabBtn);
    expect(activeTabBtn.className).toContain("font-bold");
  });

  it("renders 5-row advanced filters and quick filter chips", () => {
    render(<ProductMastersPage />);
    expect(screen.getByPlaceholderText(/Search by product name, SKU, barcode, or ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick Filters:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Assigned to Me/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Pending Approval/i }).length).toBeGreaterThan(0);
  });

  it("renders Product Master Health Scorecard metrics", () => {
    render(<ProductMastersPage />);
    expect(screen.getByRole("heading", { name: "Product Master Health Scorecard" })).toBeInTheDocument();
    expect(screen.getByText("Identity Completeness")).toBeInTheDocument();
    expect(screen.getAllByText("98%").length).toBeGreaterThan(0);
    expect(screen.getByText("Media Readiness")).toBeInTheDocument();
    expect(screen.getAllByText("84%").length).toBeGreaterThan(0);
  });

  it("renders Product Masters table with mock rows", () => {
    render(<ProductMastersPage />);
    expect(screen.getByRole("heading", { name: /Product Masters/i })).toBeInTheDocument();
    expect(screen.getAllByText("Radiance Vitamin C Serum").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tokyo Brightening Essence").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Luxe Silk Lipstick Ruby Red").length).toBeGreaterThan(0);
  });

  it("renders right Product Master Intelligence sidebar", () => {
    render(<ProductMastersPage />);
    expect(screen.getByRole("heading", { name: "Product Master Intelligence" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Priority Product Alerts" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Product Status Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Completeness Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Publication Risk Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quick Queues" })).toBeInTheDocument();
  });

  it("renders lower summary dashboards", () => {
    render(<ProductMastersPage />);
    expect(screen.getByRole("heading", { name: "Product Data Quality" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Variant & Attribute Readiness" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Product Media Readiness" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Inventory & Batch Linkage" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Publication Readiness by Channel" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Approval Status Summary" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Duplicate Product Risk" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent Product Master Activity" })).toBeInTheDocument();
  });

  it("opens and closes Import Products modal", async () => {
    render(<ProductMastersPage />);
    const importBtn = screen.getAllByRole("button", { name: /Import Products/i })[0];
    fireEvent.click(importBtn);
    expect(screen.getByRole("heading", { name: "Import Product Masters" })).toBeInTheDocument();
    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Import Product Masters" })).not.toBeInTheDocument();
    });
  });

  it("opens and closes Save View modal and More Filters drawer", async () => {
    render(<ProductMastersPage />);

    // Save View Modal
    const saveViewBtn = screen.getByRole("button", { name: /Save View/i });
    fireEvent.click(saveViewBtn);
    expect(screen.getByRole("heading", { name: "Save Custom Product View" })).toBeInTheDocument();
    const cancelModalBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelModalBtn);
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Save Custom Product View" })).not.toBeInTheDocument();
    });

    // More Filters Drawer
    const moreFiltersBtn = screen.getByRole("button", { name: /More Filters/i });
    fireEvent.click(moreFiltersBtn);
    expect(screen.getByRole("heading", { name: "Extended Product Filters" })).toBeInTheDocument();
    const cancelDrawerBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelDrawerBtn);
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Extended Product Filters" })).not.toBeInTheDocument();
    });
  });

  it("verifies ADMIN_NAVIGATION links Product Masters correctly", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    const pmChild = catalogueNav?.children?.find((child) => child.id === "product-masters");
    expect(pmChild?.href).toBe("/admin/catalogue/products");
  });
});
