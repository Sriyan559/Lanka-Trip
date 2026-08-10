import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AttributeManagementView } from "@/components/admin/catalogue/attributes/AttributeManagementView";
import type { AttributeManagementData } from "@/types/attributeManagement";

const refresh = vi.fn();
const data: AttributeManagementData = {
  kpis: [{ id: "total", label: "Total Attributes", value: 1, trend: null, trendUp: null, available: true }],
  tabs: [{ id: "all", label: "All Attributes", count: 1, scope: "all" }, { id: "invalid", label: "Invalid Combinations", count: null, scope: "invalid", available: false }],
  attributes: { data: [{ id: "1", attributeName: "Shade", attributeId: "ATTR-1", groupName: "Colour", groupId: "1", dataType: "Text", inputType: "Dropdown", isRequired: true, isVariantGenerating: true, categoryCoveragePercent: 50, productUsageCount: 2, allowedValueCount: 1, allowedValues: ["Ruby"], variantCount: 1, validationRuleId: null, inheritance: "Unavailable", channelEligibilityText: "N/A", eligibleChannelsCount: null, totalChannelsCount: null, completenessPercent: 80, issuesCount: 1, riskLevel: "Medium", owner: "Unavailable", updatedAt: "2026-08-10", status: "active" }], currentPage: 1, pageSize: 10, total: 1, lastPage: 1 },
  groups: [{ id: "1", groupName: "Colour", attributeCount: 1, readinessPercent: 80 }],
  options: { groups: [{ id: "1", name: "Colour" }], categories: [], dataTypes: ["text"], statuses: ["active"], owners: [], channels: [] },
  health: { score: 80, status: "Good", dimensions: [{ label: "Completeness", value: 80 }] }, alerts: [{ id: "missing", label: "Missing values", count: 1, severity: "High", scope: "quality" }], statusSummary: [{ label: "Active", count: 1 }],
  variantReadiness: { ready: 1, partial: 0, blocked: 0, invalid: null, total: 1, available: true }, coverageSummary: { productCoveragePercent: 50, variantCoveragePercent: 50, categoryCoveragePercent: 50, channelCoveragePercent: null },
  lower: { healthScorecard: [{ label: "Completeness", value: 80 }], missingValues: [{ id: "1", name: "Shade", missing: 1 }], categoryMatrix: [], variantRules: [], channelReadiness: [], validationStatus: [], dependencies: [], channelRequirements: [], qualityIssues: [], duplicateCandidates: [], activities: [] },
  capabilities: { canExport: true, canImport: true, canManage: true, variantRules: false, variantRulesReason: "no schema", validationRulesReason: "no schema", dependenciesReason: "no schema", channelsReason: "no schema", savedViews: false }, lastSyncedAt: "2026-08-10T10:00:00Z", meta: { refreshIntervalSeconds: 30 }
};

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(), useRouter: () => ({ replace: vi.fn() }), usePathname: () => "/admin/catalogue/attributes" }));
vi.mock("@/hooks/useAttributeManagement", () => ({ useAttributeManagement: () => ({ data, loading: false, refreshing: false, error: null, refresh }) }));
vi.mock("@/services/api/attributeManagement", () => ({ archiveAttribute: vi.fn(), bulkAttributes: vi.fn(), createAttribute: vi.fn(), exportAttributes: vi.fn(), importAttributes: vi.fn(), mergeAttributes: vi.fn(), updateAttribute: vi.fn(), updateAttributeValues: vi.fn() }));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe("Attribute & Variant Management", () => {
  beforeEach(() => vi.clearAllMocks());
  it("renders live API data and preserves the management layout", () => { render(<AttributeManagementView/>); expect(screen.getByRole("heading", { name: /Attribute & Variant Management/i })).toBeDefined(); expect(screen.getAllByText("Shade").length).toBeGreaterThan(0); expect(screen.getByText("Overall Attribute & Variant Health")).toBeDefined(); });
  it("shows unavailable states for missing authoritative schemas", () => { render(<AttributeManagementView/>); expect(screen.getAllByText(/Unavailable — no schema/i).length).toBeGreaterThan(0); expect(screen.getAllByText("N/A").length).toBeGreaterThan(0); });
  it("opens the real create and import workflows", () => { render(<AttributeManagementView/>); fireEvent.click(screen.getByRole("button", { name: /Create Attribute/i })); expect(screen.getByText("Create New Attribute Master")).toBeDefined(); fireEvent.click(screen.getByRole("button", { name: /Import Attributes/i })); expect(screen.getByText("Import Attribute Masters")).toBeDefined(); });
  it("refreshes from the backend", () => { render(<AttributeManagementView/>); fireEvent.click(screen.getByTitle("Refresh Data")); expect(refresh).toHaveBeenCalled(); });
});
