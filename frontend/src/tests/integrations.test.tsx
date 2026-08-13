import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IntegrationWorkspace } from "@/components/admin/ecosystem-modules/integrations/IntegrationWorkspace";
import { INTEGRATION_DATA } from "@/data/ecosystem-modules/integrationData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/integrations",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Integrations, Services & External Providers (EM12)", () => {
  it("renders page header strictly as 'Integrations, Services & External Providers' without EM12", () => {
    render(<IntegrationWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Integrations, Services & External Providers"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM12");
  });

  it("renders horizontal context scope bar fields", () => {
    render(<IntegrationWorkspace />);

    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getAllByText("Connected").length).toBeGreaterThan(0);
  });

  it("renders primary KPI cards", () => {
    render(<IntegrationWorkspace />);

    expect(screen.getByText("Registered Integrations")).toBeInTheDocument();
    expect(screen.getAllByText("Shared Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("External Providers").length).toBeGreaterThan(0);
  });

  it("renders main integration registry and detail card", () => {
    render(<IntegrationWorkspace />);

    expect(screen.getByText("Main Integration Registry (5)")).toBeInTheDocument();
    expect(screen.getByText("Selected Integration Details")).toBeInTheDocument();
    expect(screen.getAllByText("AI Beauty Advisor → AI Gateway").length).toBeGreaterThan(0);
  });

  it("renders right-side monitoring panel components", () => {
    render(<IntegrationWorkspace />);

    expect(screen.getByText("A. Integration Ecosystem Health")).toBeInTheDocument();
    expect(screen.getByText("B. Integration Summary")).toBeInTheDocument();
    expect(screen.getByText("C. Provider Summary")).toBeInTheDocument();
    expect(screen.getByText("G. Final Actions")).toBeInTheDocument();
    expect(screen.getByText("H. Issue Watch")).toBeInTheDocument();
  });
});
