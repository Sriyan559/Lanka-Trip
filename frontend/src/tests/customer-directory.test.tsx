import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";
import CustomerDirectoryPage from "@/app/admin/customers/directory/page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/customers/directory",
}));

describe("CustomerDirectoryPage (Screen CU02 Customer Directory)", () => {
  it("registers Customer Directory in ADMIN_NAVIGATION under customers", () => {
    const customersNav = ADMIN_NAVIGATION.find((item) => item.id === "customers");
    expect(customersNav).toBeDefined();
    expect(customersNav?.disabled).toBeFalsy();
    const directory = customersNav?.children?.find((child) => child.id === "customer-directory");
    expect(directory).toBeDefined();
    expect(directory?.href).toBe("/admin/customers/directory");
  });

  it("renders page header, title, actions, directory tabs, KPI grid, and directory table", () => {
    render(<CustomerDirectoryPage />);

    // Page title and breadcrumbs
    expect(screen.getAllByText("Customer Directory").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Export Directory Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Duplicate Customers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Add Customer").length).toBeGreaterThan(0);

    // Context Strip
    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Beauty Marketplace").length).toBeGreaterThan(0);

    // Key Directory KPI Cards
    expect(screen.getAllByText("Total Customers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Incomplete Profiles").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Candidates").length).toBeGreaterThan(0);

    // 14 Directory Tabs
    expect(screen.getAllByText("All Customers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Incomplete Profiles").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Duplicate Candidates").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Audit History").length).toBeGreaterThan(0);

    // Analytics Panels & Scorecard
    expect(screen.getByText("Customer Growth & Activity Trend")).toBeInTheDocument();
    expect(screen.getByText("Customer Segment Distribution")).toBeInTheDocument();
    expect(screen.getByText("Customer Status Summary")).toBeInTheDocument();
    expect(screen.getByText("Customer Health Scorecard")).toBeInTheDocument();

    // Table Content
    expect(screen.getAllByText("CUST-100001").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Amaya Perera").length).toBeGreaterThan(0);

    // Selected Customer Preview
    expect(screen.getByText("Selected Customer Preview")).toBeInTheDocument();

    // Lower Summary Cards & Lifecycle Journey
    expect(screen.getByText("1. Customer Lifecycle Operations")).toBeInTheDocument();
    expect(screen.getByText("Customer Lifecycle Journey")).toBeInTheDocument();
  });
});
