import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { BrandManagementView } from "@/components/admin/catalogue/brands/BrandManagementView";

vi.setConfig({ testTimeout: 15000 });

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/catalogue/brands",
}));

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Screen C10 — Brand Management Workspace", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header title, subtitle, breadcrumb and action buttons", () => {
    render(<BrandManagementView />);
    expect(screen.getByText("Catalogue > Brands")).toBeDefined();
    expect(screen.getByRole("heading", { name: "Brand Management" })).toBeDefined();
    expect(screen.getByText(/Manage brand masters, ownership, verification/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Export Brand Report/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Import Brands/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /Create Brand/i })).toBeDefined();
  });

  it("renders business context strip and live data indicator", () => {
    render(<BrandManagementView />);
    expect(screen.getByText("SL Beauty")).toBeDefined();
    expect(screen.getByText("Beauty Marketplace")).toBeDefined();
    expect(screen.getByText("Live Data")).toBeDefined();
  });

  it("renders all 12 primary KPI cards", () => {
    render(<BrandManagementView />);
    expect(screen.getAllByText("Total Brands").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active Brands").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Verified Brands").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pending Verification").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Conditional Authorization").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Expiring Authorizations").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Expired Authorizations").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Unauthorized Brand Use").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Brands Missing Owner").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Brand Risks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Channel Eligibility Conflicts").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Archived Brands").length).toBeGreaterThan(0);
  });

  it("renders status tabs and filters records when clicked", () => {
    render(<BrandManagementView />);
    const activeTabs = screen.getAllByRole("button", { name: /Active/i });
    expect(activeTabs.length).toBeGreaterThan(0);
    fireEvent.click(activeTabs[0]);
    expect(screen.getAllByText("Shiseido").length).toBeGreaterThan(0);
  });

  it("renders search input and filter dropdowns", () => {
    render(<BrandManagementView />);
    const searchInput = screen.getByPlaceholderText(/Search brand, ID, owner, supplier/i);
    expect(searchInput).toBeDefined();

    fireEvent.change(searchInput, { target: { value: "Estée Lauder" } });
    expect(screen.getAllByText("Estée Lauder").length).toBeGreaterThan(0);
  });

  it("renders Brand Table with rows and copy ID buttons", () => {
    render(<BrandManagementView />);
    expect(screen.getAllByText("Estée Lauder").length).toBeGreaterThan(0);
    expect(screen.getByText("BRD-24-0124")).toBeDefined();
    expect(screen.getAllByText("Tokyo Beauty").length).toBeGreaterThan(0);

    const copyButtons = screen.getAllByTitle("Copy ID");
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it("renders far-right Brand Intelligence Sidebar with health score", () => {
    render(<BrandManagementView />);
    expect(screen.getByText("Brand Catalogue Health")).toBeDefined();
    expect(screen.getByText("89")).toBeDefined();
    expect(screen.getByText("Priority Brand Alerts")).toBeDefined();
    expect(screen.getByText("Brand Status Summary")).toBeDefined();
  });

  it("renders lower summary dashboards", () => {
    render(<BrandManagementView />);
    expect(screen.getByText("Brand Health Scorecard")).toBeDefined();
    expect(screen.getByText("Product Coverage by Brand")).toBeDefined();
    expect(screen.getByText("Brand Readiness Distribution")).toBeDefined();
    expect(screen.getByText("Priority Authorization Operations")).toBeDefined();
    expect(screen.getByText("Brand & Supplier Relationship Matrix")).toBeDefined();
    expect(screen.getByText("Brand Eligibility by Channel")).toBeDefined();
    expect(screen.getAllByText("Unauthorized Brand Use").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Brand Candidates").length).toBeGreaterThan(0);
  });

  it("opens Create Brand drawer", async () => {
    render(<BrandManagementView />);
    const createBtn = screen.getByRole("button", { name: /Create Brand/i });
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(screen.getByText("Create New Brand Master")).toBeDefined();
    });
  });

  it("opens Import Brands modal", async () => {
    render(<BrandManagementView />);
    const importBtn = screen.getByRole("button", { name: /Import Brands/i });
    fireEvent.click(importBtn);

    await waitFor(() => {
      expect(screen.getByText("Import Brand Masters")).toBeDefined();
    });
  });
});
