import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  EcosystemModulesSubNavigation,
  ecosystemModuleNavigation,
  isEcosystemRouteActive,
} from "@/components/admin/layout/EcosystemModulesSubNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/registry",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Ecosystem Modules Sub-Navigation", () => {
  it("contains all 14 EM01-EM14 screens in exact sequential order", () => {
    expect(ecosystemModuleNavigation).toHaveLength(14);
    expect(ecosystemModuleNavigation[0]).toEqual({
      id: "EM01",
      label: "Ecosystem Modules Command Center",
      route: "/admin/ecosystem-modules",
      exact: true,
    });
    expect(ecosystemModuleNavigation[1]).toEqual({
      id: "EM02",
      label: "Module Registry & Catalogue",
      route: "/admin/ecosystem-modules/registry",
    });
    expect(ecosystemModuleNavigation[13]).toEqual({
      id: "EM14",
      label: "Reports, Audit, Export & Ecosystem Change History",
      route: "/admin/ecosystem-modules/reports-audit",
    });
  });

  it("dynamically resolves active screen based on current pathname", () => {
    const em02 = ecosystemModuleNavigation[1];
    const em01 = ecosystemModuleNavigation[0];
    const em03 = ecosystemModuleNavigation[2];
    const em07 = ecosystemModuleNavigation[6];

    // On /admin/ecosystem-modules/registry -> EM02 active
    expect(isEcosystemRouteActive(em02, "/admin/ecosystem-modules/registry")).toBe(true);
    expect(isEcosystemRouteActive(em01, "/admin/ecosystem-modules/registry")).toBe(false);

    // On /admin/ecosystem-modules -> EM01 active
    expect(isEcosystemRouteActive(em01, "/admin/ecosystem-modules")).toBe(true);
    expect(isEcosystemRouteActive(em02, "/admin/ecosystem-modules")).toBe(false);

    // On /admin/ecosystem-modules/modules/crm-platform -> EM03 active
    expect(isEcosystemRouteActive(em03, "/admin/ecosystem-modules/modules/crm-platform")).toBe(true);

    // On /admin/ecosystem-modules/sector-packs/spa-salons -> EM07 active
    expect(isEcosystemRouteActive(em07, "/admin/ecosystem-modules/sector-packs/spa-salons")).toBe(true);
  });

  it("renders all 14 submenu items with clean screen names", () => {
    render(<EcosystemModulesSubNavigation />);

    const menu = screen.getByRole("menu", { name: "Ecosystem Modules Submenu" });
    expect(menu).toBeInTheDocument();

    const links = screen.getAllByRole("menuitem");
    expect(links).toHaveLength(14);

    // Check EM02 is active on /admin/ecosystem-modules/registry
    const em02Link = screen.getByTitle("Module Registry & Catalogue");
    expect(em02Link).toHaveAttribute("aria-current", "page");
    expect(em02Link).toHaveClass("active");

    // Check EM01 is not active
    const em01Link = screen.getByTitle("Ecosystem Modules Command Center");
    expect(em01Link).not.toHaveAttribute("aria-current");
    expect(em01Link).not.toHaveClass("active");

    // Check Screen Names
    expect(screen.getByText("Ecosystem Modules Command Center")).toBeInTheDocument();
    expect(screen.getByText("Module Registry & Catalogue")).toBeInTheDocument();
    expect(screen.getByText("Reports, Audit, Export & Ecosystem Change History")).toBeInTheDocument();
  });
});
