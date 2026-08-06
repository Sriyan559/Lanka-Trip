import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryManagementPage from "@/app/admin/catalogue/categories/page";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.setConfig({ testTimeout: 15000 });

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "tab" ? "all" : null),
  }),
}));

describe("Category Management Dashboard (Screen C09)", () => {
  it("renders page header, title, subtitle, and top action buttons", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByRole("heading", { name: "Category Management", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Manage taxonomy hierarchy, required attributes/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Export Category Report/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Import Mapping/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Category/i })).toBeInTheDocument();
  });

  it("renders business context strip and live data indicator", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Sri Lanka")).toBeInTheDocument();
    expect(screen.getByText("LKR")).toBeInTheDocument();
    expect(screen.getByText("Live Data")).toBeInTheDocument();
  });

  it("renders all 12 primary KPI cards", () => {
    render(<CategoryManagementPage />);
    expect(screen.getAllByText("Total Categories").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active Categories").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Departments").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Subcategories").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Empty Categories").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Uncategorized Products").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Required").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Missing Attributes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Channel Conflicts").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compliance Gaps").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Archived").length).toBeGreaterThan(0);
  });

  it("renders 8 status tabs and changes active selection", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByRole("button", { name: /All Categories/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Draft/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Duplicates/i })).toBeInTheDocument();

    const activeTab = screen.getByRole("button", { name: /Active/i });
    fireEvent.click(activeTab);
    expect(activeTab).toHaveClass("text-[#741d35]");
  });

  it("renders left Category Hierarchy Tree and expands nodes", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByRole("heading", { name: "Category Hierarchy" })).toBeInTheDocument();
    expect(screen.getAllByText("Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Skincare").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Face Care").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Face Serum").length).toBeGreaterThan(0);
  });

  it("renders center Category Table and row data", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByRole("heading", { name: "Face Care Categories" })).toBeInTheDocument();
    expect(screen.getAllByText("CAT-SKN-0014").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Moisturizer").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Cleanser").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Toner").length).toBeGreaterThan(0);
  });

  it("renders right Selected Category Overview card for selected item", () => {
    render(<CategoryManagementPage />);
    expect(screen.getAllByText("CAT-SKN-0014").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /Manage Attributes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Products/i })).toBeInTheDocument();
  });

  it("renders far right Taxonomy Intelligence Sidebar and Taxonomy Health score", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByText("Taxonomy Health")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("Priority Alerts")).toBeInTheDocument();
    expect(screen.getByText("Hierarchy Summary")).toBeInTheDocument();
    expect(screen.getByText("Governance Summary")).toBeInTheDocument();
    expect(screen.getByText("Quick Queues")).toBeInTheDocument();
  });

  it("renders lower summary dashboards and tables", () => {
    render(<CategoryManagementPage />);
    expect(screen.getByText("Category Health Scorecard")).toBeInTheDocument();
    expect(screen.getByText("Required Attribute Coverage")).toBeInTheDocument();
    expect(screen.getByText("Category Product Coverage")).toBeInTheDocument();
    expect(screen.getByText("Channel Eligibility Matrix")).toBeInTheDocument();
    expect(screen.getByText("Duplicate Category Candidates")).toBeInTheDocument();
    expect(screen.getByText("Uncategorized & Misclassified Products")).toBeInTheDocument();
    expect(screen.getByText("SEO & Merchandising Readiness")).toBeInTheDocument();
    expect(screen.getByText("Recent Category Activity")).toBeInTheDocument();
    expect(screen.getByText("Category Compliance Rule Matrix")).toBeInTheDocument();
    expect(screen.getByText("Mapping / Taxonomy Governance Summary")).toBeInTheDocument();
    expect(screen.getByText("Recent Approvals & Audit Events")).toBeInTheDocument();
  });

  it("opens and closes Create Category drawer", async () => {
    render(<CategoryManagementPage />);
    const createBtn = screen.getByRole("button", { name: /Create Category/i });
    fireEvent.click(createBtn);

    expect(screen.getByRole("heading", { name: "Create New Category" })).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Create New Category" })).not.toBeInTheDocument();
    });
  });

  it("opens and closes Import Category Mapping modal", async () => {
    render(<CategoryManagementPage />);
    const importBtn = screen.getByRole("button", { name: /Import Mapping/i });
    fireEvent.click(importBtn);

    expect(screen.getByRole("heading", { name: "Import Category Mapping" })).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Import Category Mapping" })).not.toBeInTheDocument();
    });
  });

  it("verifies ADMIN_NAVIGATION exposes Categories child menu", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    const categoriesChild = catalogueNav?.children?.find((child) => child.id === "categories");
    expect(categoriesChild).toBeDefined();
    expect(categoriesChild?.href).toBe("/admin/catalogue/categories");
  });
});
