import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ReportsAuditPage from "@/components/administration/reports-audit/ReportsAuditPage";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/administration/reports-audit",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Administration Reports, Audit, Export & Change History (AD14)", () => {
  it("renders visible page title strictly as 'Administration Reports, Audit, Export & Change History' without AD14", async () => {
    render(<ReportsAuditPage />);

    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Administration Reports, Audit, Export & Change History");
    expect(heading).not.toHaveTextContent("AD14");
  });

  it("renders breadcrumb as Administration > Reports & Audit without AD14", async () => {
    render(<ReportsAuditPage />);

    expect((await screen.findAllByText("Administration")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("Reports & Audit")).length).toBeGreaterThan(0);
    expect(screen.queryByText("AD14")).toBeNull();
  });

  it("renders top KPI metric cards and right rail Audit Health", async () => {
    render(<ReportsAuditPage />);

    expect((await screen.findAllByText(/Audit Events/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/326.4K/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Administration Changes/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/8,742/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Audit Health/i)).length).toBeGreaterThan(0);
  });

  it("renders filter bar and audit registry table", async () => {
    render(<ReportsAuditPage />);

    expect(await screen.findByPlaceholderText("Search audit records...")).toBeInTheDocument();
    expect(await screen.findByText("Administration Audit & Change Registry")).toBeInTheDocument();
    expect(await screen.findByText("Selected Audit Record")).toBeInTheDocument();
    expect(await screen.findByText("Before / After Comparison")).toBeInTheDocument();
  });

  it("renders recommended next action red card and final actions", async () => {
    render(<ReportsAuditPage />);

    expect(await screen.findByText("Recommended Next Action")).toBeInTheDocument();
    expect(await screen.findByText("Review 22 audit exceptions before the upcoming compliance review cycle.")).toBeInTheDocument();
    expect(await screen.findByText("Final Actions")).toBeInTheDocument();
  });
});
