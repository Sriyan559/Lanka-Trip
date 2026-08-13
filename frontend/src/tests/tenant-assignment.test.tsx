import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TenantAssignmentWorkspace } from "@/components/admin/ecosystem-modules/assignment/TenantAssignmentWorkspace";
import { TENANT_ASSIGNMENT_DATA } from "@/data/ecosystem-modules/tenantAssignmentData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/assignments",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Tenant & Ecosystem Module Assignment (EM04)", () => {
  it("renders page header without internal screen ID prefix in title", () => {
    render(<TenantAssignmentWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Tenant & Ecosystem Module Assignment"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM04");
  });

  it("renders all primary KPI cards and health gauge score", () => {
    render(<TenantAssignmentWorkspace />);

    expect(screen.getByText("Total Modules")).toBeInTheDocument();
    expect(screen.getAllByText("Assigned").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Inherited").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Production Eligible").length).toBeGreaterThan(0);
    expect(screen.getAllByText("96").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Excellent Alignment").length).toBeGreaterThan(0);
  });

  it("renders context selectors and assignment matrix table", () => {
    render(<TenantAssignmentWorkspace />);

    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SL-BTY-PROD").length).toBeGreaterThan(0);
    expect(screen.getByText("Order Orchestration")).toBeInTheDocument();
    expect(screen.getByText("MOD-1001")).toBeInTheDocument();
    expect(screen.getAllByText("AI Beauty Advisor").length).toBeGreaterThan(0);
  });

  it("renders analytics charts, inheritance topology, and lower summary sections", () => {
    render(<TenantAssignmentWorkspace />);

    expect(screen.getByText("Assignment Sources")).toBeInTheDocument();
    expect(screen.getByText("Inheritance Topology")).toBeInTheDocument();
    expect(screen.getAllByText("Platform Core").length).toBeGreaterThan(0);
    expect(screen.getByText("Inheritance Conflicts")).toBeInTheDocument();
    expect(screen.getByText("Core Module Coverage")).toBeInTheDocument();
    expect(screen.getByText("Sector Pack Mapping")).toBeInTheDocument();
  });
});
