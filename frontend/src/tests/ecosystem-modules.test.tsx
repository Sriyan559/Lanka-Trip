import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EcosystemModulesDashboard } from "@/components/admin/ecosystem-modules/EcosystemModulesDashboard";
import {
  fetchEcosystemModuleByKey,
  fetchEcosystemModules,
} from "@/services/api/ecosystemModules";

const push = vi.fn();

const moduleRecord = vi.hoisted(() => ({
  id: "1", publicReference: "MOD-2036-00001", databaseModuleId: 1,
  moduleName: "B2C Marketplace", moduleKey: "b2c-marketplace", category: "Commerce",
  moduleType: "Core", lifecycle: "Operational", operationalStatus: "Operational",
  releaseStatus: "Blocked", currentVersion: "1.0.0", targetVersion: null,
  productionEnabled: true, configurationStatus: "Configured", integrationReadiness: "Healthy",
  dependencyHealth: "Healthy", complianceStatus: "Approved", securityReview: "Approved",
  countriesEnabled: 1, activeUsers: 10, monthlyTransactions: 20, adoptionRate: 75,
  availability: 99.9, errorRate: 0.1, healthScore: 95, riskLevel: "Low", riskTrend: "Stable",
  primaryOwner: "Commerce", technicalOwner: "Platform", region: "Sri Lanka",
  lastRelease: null, nextUpdate: null, lastUpdated: "2026-08-14T00:00:00Z",
}));

vi.mock("@/services/api/ecosystemModules", () => ({
  fetchEcosystemModules: vi.fn(async () => ({ data: [moduleRecord], total: 1, page: 1, pageSize: 5, totalPages: 1 })),
  fetchEcosystemModuleByKey: vi.fn(async () => moduleRecord),
  fetchEcosystemModuleDashboard: vi.fn(async () => ({
    kpis: [{ id: "total", label: "Total Registered Modules", detail: "Portfolio records", tone: "info", value: "1" }],
    portfolioHealth: [{ label: "Portfolio Health Score", value: "95%", progress: 95, tone: "success" }],
    alerts: [], risks: [],
    distributions: { category: [{ name: "Commerce", value: 1 }], lifecycle: [{ name: "Operational", value: 1 }], moduleType: [{ name: "Core", value: 1 }], health: [{ name: "Healthy", value: 1 }], environment: [{ name: "Production", value: 1 }] },
    permissions: { canRegister: true, canConfigure: true, canExport: true },
    generatedAt: "2026-08-14T00:00:00Z", source: "ecosystem_modules", freshness: "fresh",
  })),
  getModulePermissions: () => ({ canRegister: true, canCompare: true, canExport: true, canManageReleases: true }),
  exportEcosystemModuleReport: vi.fn(async () => "module"),
  registerEcosystemModule: vi.fn(async () => moduleRecord),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/admin/ecosystem-modules",
  useSearchParams: () => new URLSearchParams(),
  notFound: () => { throw new Error("404 Not Found"); },
}));

describe("Screen 20 - Ecosystem Modules Management", () => {
  it("keeps module identifiers distinct and resolves moduleKey routes", async () => {
    const result = await fetchEcosystemModules({ search: "B2C Marketplace" });
    const registeredModule = result.data[0];

    expect(registeredModule.publicReference).toBe("MOD-2036-00001");
    expect(registeredModule.databaseModuleId).toBe(1);
    expect(registeredModule.moduleKey).toBe("b2c-marketplace");
    expect(await fetchEcosystemModuleByKey(registeredModule.moduleKey)).toMatchObject({
      id: registeredModule.id,
      publicReference: registeredModule.publicReference,
    });
  });

  it("filters the registry through a named portfolio KPI", async () => {
    const result = await fetchEcosystemModules({ metric: "blocked" });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].releaseStatus).toBe("Blocked");
  });

  it("renders the required dashboard controls and module navigation", async () => {
    render(<EcosystemModulesDashboard />);

    await waitFor(() => expect(screen.getByText("Total Registered Modules")).toBeInTheDocument());
    expect(screen.getAllByRole("button", { name: /Register Module/i })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /Export Module Report/i })).toHaveLength(2);
    expect(screen.getByText("Module Portfolio Health Summary")).toBeInTheDocument();
    expect(screen.getByText("Module Registry")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Open Module" })[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/admin/ecosystem-modules/"),
    );
  });

  it("opens the controlled registration workflow without a production toggle", async () => {
    render(<EcosystemModulesDashboard />);
    await waitFor(() => expect(screen.getByRole("button", { name: /Register Module/i })).toBeInTheDocument());

    fireEvent.click(screen.getAllByRole("button", { name: /Register Module/i })[0]);
    expect(screen.getByRole("heading", { name: "Register module" })).toBeInTheDocument();
    expect(screen.getByText(/Production enablement requires a separate approved workflow/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Production Enabled/i)).not.toBeInTheDocument();
  });
});

