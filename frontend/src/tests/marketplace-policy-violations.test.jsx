import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import MarketplacePolicyViolationsPage from "@/app/admin/marketplace/policy-violations/page";
import {ADMIN_NAVIGATION} from "@/constants/adminNavigation";
import {fetchMarketplacePolicyViolations} from "@/services/api/marketplacePolicyViolationsService";

const apiData = {
  context: {dateFrom: "2026-07-09", dateTo: "2026-08-07", timezone: "Asia/Colombo"},
  kpis: [{id: "total", label: "Total Cases", available: true, value: 1, definition: "filtered_count"}, {id: "overdue", label: "Overdue Cases", available: false, value: null, reason: "policy_case_sla_deadline_not_present"}],
  trend: {available: true, items: [{period: "2026-08-07", createdCount: 1}]},
  categories: {available: true, items: [{key: "counterfeit_claim", count: 1, percentage: 100}]},
  sources: {available: true, items: [{key: "App\\Models\\Supplier", count: 1, percentage: 100}]},
  statuses: {available: true, items: [{key: "open", count: 1, percentage: 100}]},
  scorecard: {available: false, reason: "policy_health_formula_not_defined"}, openOverdue: {available: false, reason: "policy_case_sla_deadline_not_present"}, evidence: {available: false, reason: "policy_evidence_domain_not_present"}, enforcement: {available: false, reason: "enforcement_domain_not_present"}, repeatOffenders: {available: false, reason: "repeat_offender_rule_not_defined"}, appeals: {available: false, reason: "appeal_domain_not_present"}, health: {available: false, reason: "policy_health_formula_not_defined"}, sla: {available: false, reason: "policy_case_sla_deadline_not_present"}, impact: {available: false, reason: "enforcement_impact_domain_not_present"},
  items: [{id: "41", caseCode: "POL-DB-041", category: "counterfeit_claim", status: "open", complianceStatus: "pending", severity: "high", policy: {name: "Authenticity Rule"}, source: {type: "Supplier", id: "9"}, assignedReviewer: {name: "Database Reviewer"}, noteCount: 2, createdAt: "2026-08-07T08:00:00Z", updatedAt: "2026-08-07T09:00:00Z"}],
  permissions: {canView: true, canCreate: false, canUpdate: false, canEnforce: false, canExport: true, canViewInternalNotes: false},
  meta: {page: 1, perPage: 25, total: 1, totalPages: 1, from: 1, to: 1, dataAsOf: "2026-08-07T10:00:00Z", refreshIntervalSeconds: 600},
};

vi.mock("next/navigation", () => ({useRouter: () => ({replace: vi.fn()}), usePathname: () => "/admin/marketplace/policy-violations", useSearchParams: () => new URLSearchParams()}));
vi.mock("@/services/api/marketplacePolicyViolationsService", () => ({fetchMarketplacePolicyViolations: vi.fn(async () => apiData), exportMarketplacePolicyViolations: vi.fn()}));
vi.mock("recharts", () => ({ResponsiveContainer: ({children}) => <div data-testid="chart">{children}</div>, LineChart: ({children}) => <div>{children}</div>, CartesianGrid: () => null, XAxis: () => null, YAxis: () => null, Tooltip: () => null, Line: () => null}));

describe("Marketplace Policy Violations", () => {
  it("registers the Marketplace navigation item", () => {const marketplace = ADMIN_NAVIGATION.find(item => item.id === "marketplace"); expect(marketplace.children.find(child => child.id === "policy-violations").href).toBe("/admin/marketplace/policy-violations");});
  it("renders real API records and makes unsupported operations explicit", async () => {
    render(<MarketplacePolicyViolationsPage/>);
    expect(await screen.findByRole("heading", {name: "Marketplace Policy Violations"})).toBeInTheDocument();
    expect(screen.getByText("POL-DB-041")).toBeInTheDocument();
    expect(screen.getByText("Database Reviewer")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Create Policy Case"})).toBeDisabled();
    expect(screen.getAllByText(/Not available -/).length).toBeGreaterThan(3);
    expect(fetchMarketplacePolicyViolations).toHaveBeenCalled();
  });
});
