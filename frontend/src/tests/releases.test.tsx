import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReleaseWorkspace } from "@/components/admin/ecosystem-modules/releases/ReleaseWorkspace";
import { RELEASE_DATA } from "@/data/ecosystem-modules/releaseData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/releases",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Versions, Releases & Environment Management (EM10)", () => {
  it("renders page header strictly as 'Versions, Releases & Environment Management' without EM10", () => {
    render(<ReleaseWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Versions, Releases & Environment Management"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM10");
  });

  it("renders horizontal context scope bar fields", () => {
    render(<ReleaseWorkspace />);

    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getByText("GMT+5:30")).toBeInTheDocument();
  });

  it("renders primary KPI cards", () => {
    render(<ReleaseWorkspace />);

    expect(screen.getAllByText("Registered Versions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Released Versions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Release Candidates").length).toBeGreaterThan(0);
  });

  it("renders version registry and environment promotion components", () => {
    render(<ReleaseWorkspace />);

    expect(screen.getByText("Version & Release Registry (8)")).toBeInTheDocument();
    expect(screen.getByText("Environment Promotion")).toBeInTheDocument();
    expect(screen.getAllByText("AI Beauty Advisor v1.0.0").length).toBeGreaterThan(0);
  });

  it("renders right-side monitoring panel components", () => {
    render(<ReleaseWorkspace />);

    expect(screen.getByText("A. Release Health")).toBeInTheDocument();
    expect(screen.getByText("B. Release Summary")).toBeInTheDocument();
    expect(screen.getByText("C. Environment Summary")).toBeInTheDocument();
    expect(screen.getByText("G. Final Actions")).toBeInTheDocument();
  });
});
