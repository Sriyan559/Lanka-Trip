import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DependencyWorkspace } from "@/components/admin/ecosystem-modules/dependencies/DependencyWorkspace";
import { DEPENDENCY_DATA } from "@/data/ecosystem-modules/dependencyData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/dependencies",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Module Dependencies & Compatibility Map (EM08)", () => {
  it("renders page header strictly as 'Module Dependencies & Compatibility Map' without EM08", () => {
    render(<DependencyWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Module Dependencies & Compatibility Map"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM08");
  });

  it("renders context filter strip and engine status cards", () => {
    render(<DependencyWorkspace />);

    expect(screen.getAllByText("Dependency Engine").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compatibility Engine").length).toBeGreaterThan(0);
  });

  it("renders primary KPI cards", () => {
    render(<DependencyWorkspace />);

    expect(screen.getByText("Registered Dependencies")).toBeInTheDocument();
    expect(screen.getByText("Critical Dependencies")).toBeInTheDocument();
    expect(screen.getByText("Healthy Dependencies")).toBeInTheDocument();
  });

  it("renders dependency map card and selected dependency detail panel", () => {
    render(<DependencyWorkspace />);

    expect(screen.getByText("Ecosystem Dependency Map")).toBeInTheDocument();
    expect(screen.getByText("Selected Dependency Detail")).toBeInTheDocument();
  });

  it("renders right-side summary panel components", () => {
    render(<DependencyWorkspace />);

    expect(screen.getByText("A. Dependency Health")).toBeInTheDocument();
    expect(screen.getByText("B. Dependency Summary")).toBeInTheDocument();
    expect(screen.getByText("C. Compatibility Summary")).toBeInTheDocument();
    expect(screen.getByText("G. Final Actions")).toBeInTheDocument();
  });
});
