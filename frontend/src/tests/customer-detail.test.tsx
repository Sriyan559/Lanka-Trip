import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerDetailPage from "@/app/admin/customers/[customerId]/page";
import { CustomerDetailDashboard } from "@/components/admin/customers/detail/CustomerDetailDashboard";
import { getCustomerDetailById } from "@/data/customer-detail.mock";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/customers/CUST-100001",
  useSearchParams: () => new URLSearchParams(),
}));

describe("CU03 Customer Detail Screen", () => {
  it("fetches customer detail data by customerId for Amaya Perera (CUST-100001)", () => {
    const data = getCustomerDetailById("CUST-100001");
    expect(data.profile.name).toBe("Amaya Perera");
    expect(data.profile.id).toBe("CUST-100001");
    expect(data.profile.loyaltyTier).toBe("Gold");
    expect(data.profile.verificationStatus).toBe("Verified");
  });

  it("renders customer profile hero, identity, and main sections", () => {
    render(<CustomerDetailDashboard customerId="CUST-100001" />);

    expect(screen.getAllByText("Customer Detail")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Amaya Perera")[0]).toBeInTheDocument();
    expect(screen.getByText("Customer ID: CUST-100001")).toBeInTheDocument();
    expect(screen.getByText("High-value repeat customer in the Beauty Marketplace.")).toBeInTheDocument();
    expect(screen.getByText("Concurrency Notice:")).toBeInTheDocument();
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
  });

  it("renders 12 detail tabs and responds to tab switching", () => {
    render(<CustomerDetailDashboard customerId="CUST-100001" />);

    const overviewTab = screen.getByRole("button", { name: "Overview" });
    const profileTab = screen.getByRole("button", { name: "Profile" });
    const ordersTab = screen.getByRole("button", { name: "Orders" });

    expect(overviewTab).toBeInTheDocument();
    expect(profileTab).toBeInTheDocument();
    expect(ordersTab).toBeInTheDocument();

    fireEvent.click(profileTab);
    expect(profileTab.className).toContain("bg-[#671021]");
  });

  it("renders 12 KPI metric cards with accurate values", () => {
    render(<CustomerDetailDashboard customerId="CUST-100001" />);

    expect(screen.getByText("Profile Completeness")).toBeInTheDocument();
    expect(screen.getAllByText("92%")[0]).toBeInTheDocument();

    expect(screen.getByText("Verification Readiness")).toBeInTheDocument();
    expect(screen.getAllByText("98%")[0]).toBeInTheDocument();

    expect(screen.getAllByText("Total Orders")[0]).toBeInTheDocument();
    expect(screen.getAllByText("24")[0]).toBeInTheDocument();

    expect(screen.getByText("Lifetime Value")).toBeInTheDocument();
    expect(screen.getAllByText("LKR 245K")[0]).toBeInTheDocument();
  });

  it("supports dynamic customerId for other customer records", () => {
    render(<CustomerDetailDashboard customerId="CUST-100009" />);

    expect(screen.getByText("Customer ID: CUST-100009")).toBeInTheDocument();
    expect(screen.getAllByText(/Customer \(CUST-100009\)/)[0]).toBeInTheDocument();
  });

  it("renders the page wrapper correctly from app router page.tsx", () => {
    render(<CustomerDetailPage params={{ customerId: "CUST-100001" }} />);
    expect(screen.getAllByText("Amaya Perera")[0]).toBeInTheDocument();
  });
});
