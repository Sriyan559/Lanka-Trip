import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReportsAuditWorkspace } from "@/components/admin/ecosystem-modules/reports-audit/ReportsAuditWorkspace";
import { REPORTS_AUDIT_DATA } from "@/data/ecosystem-modules/reportsAuditData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/reports-audit",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Reports, Audit, Export & Ecosystem Change History (EM14)", () => {
  it("renders page header strictly as 'Reports, Audit, Export & Ecosystem Change History' without EM14", () => {
    render(<ReportsAuditWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Reports, Audit, Export & Ecosystem Change History"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM14");
  });

  it("renders horizontal context scope bar fields", () => {
    render(<ReportsAuditWorkspace />);

    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getAllByText("Connected").length).toBeGreaterThan(0);
  });

  it("renders primary KPI cards", () => {
    render(<ReportsAuditWorkspace />);

    expect(screen.getAllByText("Audit Records").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Changes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Reports").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Exports").length).toBeGreaterThan(0);
  });

  it("renders main audit registry table and selected record detail", () => {
    render(<ReportsAuditWorkspace />);

    expect(screen.getByText("Ecosystem Audit & Change Registry (6)")).toBeInTheDocument();
    expect(screen.getByText("Selected Audit Record Detail")).toBeInTheDocument();
    expect(screen.getByText("Before / After Comparison")).toBeInTheDocument();
  });

  it("renders right-side monitoring panel components", () => {
    render(<ReportsAuditWorkspace />);

    expect(screen.getAllByText("Audit Health").length).toBeGreaterThan(0);
    expect(screen.getByText("Change Activity Summary")).toBeInTheDocument();
    expect(screen.getByText("Reports & Exports Summary")).toBeInTheDocument();
    expect(screen.getByText("Audit Risk Summary")).toBeInTheDocument();
  });
});
