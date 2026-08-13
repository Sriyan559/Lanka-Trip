import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GovernanceAccessWorkspace } from "@/components/admin/ecosystem-modules/governance-access/GovernanceAccessWorkspace";
import { GOVERNANCE_ACCESS_DATA } from "@/data/ecosystem-modules/governanceAccessData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/governance-access",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Governance, Access, Security & Policy Control (EM13)", () => {
  it("renders page header strictly as 'Governance, Access, Security & Policy Control' without EM13", () => {
    render(<GovernanceAccessWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Governance, Access, Security & Policy Control"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM13");
  });

  it("renders top KPI cards", () => {
    render(<GovernanceAccessWorkspace />);

    expect(screen.getAllByText("Human Identities").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Service Principals").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Active Users (30D)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Privileged Accounts").length).toBeGreaterThan(0);
  });

  it("renders registries and policy decision flow component", () => {
    render(<GovernanceAccessWorkspace />);

    expect(screen.getByText("Access Governance Registry")).toBeInTheDocument();
    expect(screen.getByText("Access Policy Registry")).toBeInTheDocument();
    expect(screen.getByText("Policy Decision Flow")).toBeInTheDocument();
    expect(screen.getByText("Explicit Deny")).toBeInTheDocument();
  });

  it("renders effective permissions matrix, role registry, and permission sets", () => {
    render(<GovernanceAccessWorkspace />);

    expect(screen.getByText("Effective Permissions Matrix")).toBeInTheDocument();
    expect(screen.getByText("Role Registry")).toBeInTheDocument();
    expect(screen.getByText("Permission Sets")).toBeInTheDocument();
  });

  it("renders right-side governance panel components", () => {
    render(<GovernanceAccessWorkspace />);

    expect(screen.getByText("Governance Health")).toBeInTheDocument();
    expect(screen.getByText("Access Summary")).toBeInTheDocument();
    expect(screen.getByText("Governance Risk Summary")).toBeInTheDocument();
    expect(screen.getByText("Review & Certification")).toBeInTheDocument();
  });
});
