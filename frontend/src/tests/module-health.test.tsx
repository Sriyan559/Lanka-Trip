import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModuleHealthWorkspace } from "@/components/admin/ecosystem-modules/health-adoption/ModuleHealthWorkspace";
import { MODULE_HEALTH_DATA } from "@/data/ecosystem-modules/moduleHealthData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/health-adoption",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Module Health, Performance & Adoption (EM11)", () => {
  it("renders page header strictly as 'Module Health, Performance & Adoption' without EM11", () => {
    render(<ModuleHealthWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Module Health, Performance & Adoption"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM11");
  });

  it("renders horizontal context scope bar fields", () => {
    render(<ModuleHealthWorkspace />);

    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getAllByText("Connected").length).toBeGreaterThan(0);
  });

  it("renders primary KPI cards", () => {
    render(<ModuleHealthWorkspace />);

    expect(screen.getAllByText("Registered Modules").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Operational Modules").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Degraded Modules").length).toBeGreaterThan(0);
  });

  it("renders module health registry and scorecard components", () => {
    render(<ModuleHealthWorkspace />);

    expect(screen.getByText("Module Health & Adoption Registry (5)")).toBeInTheDocument();
    expect(screen.getByText("Health Scorecard")).toBeInTheDocument();
    expect(screen.getAllByText("B2C Marketplace").length).toBeGreaterThan(0);
  });

  it("renders right-side monitoring panel components", () => {
    render(<ModuleHealthWorkspace />);

    expect(screen.getByText("A. Module Health")).toBeInTheDocument();
    expect(screen.getByText("B. Operational Summary")).toBeInTheDocument();
    expect(screen.getByText("C. Adoption Summary")).toBeInTheDocument();
    expect(screen.getByText("F. Final Actions")).toBeInTheDocument();
  });
});
