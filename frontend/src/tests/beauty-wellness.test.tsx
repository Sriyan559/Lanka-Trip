import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BeautyWellnessWorkspace } from "@/components/admin/ecosystem-modules/sector-packs/BeautyWellnessWorkspace";
import { BEAUTY_WELLNESS_DATA } from "@/data/ecosystem-modules/beautyWellnessData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/sector-packs/beauty-wellness",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Beauty & Wellness Sector Pack Detail & Capability Configuration (EM07)", () => {
  it("renders page header strictly as 'Beauty & Wellness' without EM07", () => {
    render(<BeautyWellnessWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Beauty & Wellness"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM07");
  });

  it("renders pack information metadata grid", () => {
    render(<BeautyWellnessWorkspace />);

    expect(screen.getByText("SPK-2026-000001")).toBeInTheDocument();
    expect(screen.getByText("beauty-wellness")).toBeInTheDocument();
    expect(screen.getByText("Beauty & Personal Care")).toBeInTheDocument();
  });

  it("renders primary KPI cards with sparkline elements", () => {
    render(<BeautyWellnessWorkspace />);

    expect(screen.getByText("Pack Health")).toBeInTheDocument();
    expect(screen.getByText("96 / 100")).toBeInTheDocument();
    expect(screen.getByText("Active Tenant Assignments")).toBeInTheDocument();
  });

  it("renders read-only released version notice banner", () => {
    render(<BeautyWellnessWorkspace />);

    expect(screen.getByText("Released Version — Read Only")).toBeInTheDocument();
  });

  it("renders right-side summary panel components", () => {
    render(<BeautyWellnessWorkspace />);

    expect(screen.getByText("A. Pack Health Score")).toBeInTheDocument();
    expect(screen.getByText("B. Pack Summary")).toBeInTheDocument();
    expect(screen.getByText("C. Release Summary")).toBeInTheDocument();
    expect(screen.getByText("F. Recommended Next Action")).toBeInTheDocument();
  });
});
