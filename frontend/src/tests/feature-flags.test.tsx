import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FeatureFlagWorkspace } from "@/components/admin/ecosystem-modules/feature-flags/FeatureFlagWorkspace";
import { FEATURE_FLAG_DATA } from "@/data/ecosystem-modules/featureFlagData";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/ecosystem-modules/feature-flags",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Feature Flags, Rollouts & Controlled Enablement (EM09)", () => {
  it("renders page header strictly as 'Feature Flags, Rollouts & Controlled Enablement' without EM09", () => {
    render(<FeatureFlagWorkspace />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Feature Flags, Rollouts & Controlled Enablement"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("EM09");
  });

  it("renders horizontal context scope bar fields", () => {
    render(<FeatureFlagWorkspace />);

    expect(screen.getAllByText("SL Beauty").length).toBeGreaterThan(0);
    expect(screen.getByText("Beauty Marketplace")).toBeInTheDocument();
    expect(screen.getAllByText("Enterprise Wide").length).toBeGreaterThan(0);
  });

  it("renders primary KPI cards", () => {
    render(<FeatureFlagWorkspace />);

    expect(screen.getAllByText("Registered").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Production").length).toBeGreaterThan(0);
    expect(screen.getByText("Rollout Ready")).toBeInTheDocument();
  });

  it("renders feature flag registry and rollout pipeline components", () => {
    render(<FeatureFlagWorkspace />);

    expect(screen.getByText("Feature Flag Registry (6)")).toBeInTheDocument();
    expect(screen.getByText("Rollout Pipeline")).toBeInTheDocument();
    expect(screen.getAllByText("AI Recommendation V2").length).toBeGreaterThan(0);
  });

  it("renders right-side monitoring panel components", () => {
    render(<FeatureFlagWorkspace />);

    expect(screen.getByText("A. Rollout Health")).toBeInTheDocument();
    expect(screen.getByText("B. Feature Flag Summary")).toBeInTheDocument();
    expect(screen.getByText("C. Exposure Overview")).toBeInTheDocument();
    expect(screen.getByText("G. Final Actions")).toBeInTheDocument();
  });
});
