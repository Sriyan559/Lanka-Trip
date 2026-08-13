import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CapabilityAssignmentWorkspace } from "@/components/admin/ecosystem-modules/capabilities/CapabilityAssignmentWorkspace";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/capabilities",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Business Unit & Channel Capability Assignment (EM05)", () => {
  it("renders page header without internal screen ID prefix in title", () => {
    render(<CapabilityAssignmentWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Business Unit & Channel Capability Assignment"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM05");
  });

  it("renders all primary KPI cards and health gauge score", () => {
    render(<CapabilityAssignmentWorkspace />);

    expect(screen.getAllByText("Total Modules").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Assigned").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Inherited").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Optional").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Core").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pending").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Restricted").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Production Eligible").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compliance Holds").length).toBeGreaterThan(0);
  });

  it("renders secondary KPI cards specific to capabilities", () => {
    render(<CapabilityAssignmentWorkspace />);

    expect(screen.getByText("Business Units")).toBeInTheDocument();
    expect(screen.getByText("Active Channels")).toBeInTheDocument();
    expect(screen.getByText("Core Capabilities")).toBeInTheDocument();
    expect(screen.getByText("Optional Capabilities")).toBeInTheDocument();
    expect(screen.getAllByText("Security Restrictions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compliance Restrictions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dependency Blocks").length).toBeGreaterThan(0);
    expect(screen.getByText("Country Restrictions")).toBeInTheDocument();
  });
});
