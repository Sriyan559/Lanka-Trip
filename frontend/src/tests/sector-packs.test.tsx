import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SectorPackWorkspace } from "@/components/admin/ecosystem-modules/sector-packs/SectorPackWorkspace";
import { SECTOR_PACK_DATA } from "@/data/ecosystem-modules/sectorPackData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/sector-packs",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Sector Packs & Capability Bundles (EM06)", () => {
  it("renders page header without internal screen ID prefix in title", () => {
    render(<SectorPackWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Sector Packs & Capability Bundles"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM06");
  });

  it("renders release / version summary component", () => {
    render(<SectorPackWorkspace />);
    
    expect(screen.getByText("Release / Version Summary")).toBeInTheDocument();
    expect(screen.getAllByText(SECTOR_PACK_DATA.releaseSummary.currentVersion).length).toBeGreaterThan(0);
    expect(screen.getAllByText(SECTOR_PACK_DATA.releaseSummary.releasedBy).length).toBeGreaterThan(0);
  });

  it("renders all primary KPI cards and health gauge score", () => {
    render(<SectorPackWorkspace />);

    expect(screen.getByText("Sector Packs")).toBeInTheDocument();
    expect(screen.getAllByText("Modules").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dependencies").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Risks & Conflicts").length).toBeGreaterThan(0);
    expect(screen.getAllByText("96 /100").length).toBeGreaterThan(0);
  });

  it("renders sector pack registry matrix", () => {
    render(<SectorPackWorkspace />);

    expect(screen.getAllByText("SL Beauty Core Pack").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SPC-010").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Skincare Specialists").length).toBeGreaterThan(0);
  });
});
