import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";
import CustomerCommandCenterPage from "@/app/admin/customers/page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/customers",
}));

describe("CustomerCommandCenterPage (Screen CU01 Customer Management Command Center)", () => {
  it("registers Customers in ADMIN_NAVIGATION with Command Center child", () => {
    const customersNav = ADMIN_NAVIGATION.find((item) => item.id === "customers");
    expect(customersNav).toBeDefined();
    expect(customersNav?.disabled).toBeFalsy();
    const commandCenter = customersNav?.children?.find((child) => child.id === "command-center");
    expect(commandCenter).toBeDefined();
    expect(commandCenter?.href).toBe("/admin/customers");
  });

  it("renders page header, title, actions, context strip, KPI cards, and main workspace", () => {
    render(<CustomerCommandCenterPage />);

    // Page title and breadcrumbs
    expect(screen.getAllByText("Customer Management Command Center").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Command Center").length).toBeGreaterThan(0);

    // Header actions
    expect(screen.getAllByText("Export Customer Operations Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("+ Add Customer").length).toBeGreaterThan(0);

    // Context Strip
    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Beauty Marketplace").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sri Lanka").length).toBeGreaterThan(0);

    // Key KPI Cards
    expect(screen.getAllByText("Total Customers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("186,420").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active Customers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("142,680").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Verified Customers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("128,460").length).toBeGreaterThan(0);

    // Horizontal Tabs
    expect(screen.getAllByText("Overview").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Verified").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Privacy Requests").length).toBeGreaterThan(0);

    // Charts & Scorecard
    expect(screen.getByText("Customer Growth & Activity Trend")).toBeInTheDocument();
    expect(screen.getByText("Customer Segment Distribution")).toBeInTheDocument();
    expect(screen.getByText("Customer Status Summary")).toBeInTheDocument();
    expect(screen.getByText("Customer Health Scorecard")).toBeInTheDocument();

    // Table Content
    expect(screen.getAllByText("CUST-100001").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Amaya Perera").length).toBeGreaterThan(0);
    expect(screen.getAllByText("CUST-100002").length).toBeGreaterThan(0);

    // Preview Panel
    expect(screen.getByText("Selected Customer Preview")).toBeInTheDocument();
    expect(screen.getAllByText("amaya.perera@mail.lk").length).toBeGreaterThan(0);

    // Right Sidebar
    expect(screen.getByText("Customer Operations Health")).toBeInTheDocument();
    expect(screen.getByText("Priority Customer Alerts")).toBeInTheDocument();

    // Lower Summary Cards & Lifecycle Journey
    expect(screen.getByText("1. Customer Lifecycle Operations")).toBeInTheDocument();
    expect(screen.getByText("4. Identity & Verification Summary")).toBeInTheDocument();
    expect(screen.getByText("Customer Lifecycle Journey")).toBeInTheDocument();
  });
});
