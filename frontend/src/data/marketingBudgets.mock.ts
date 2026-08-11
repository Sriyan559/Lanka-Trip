export interface BudgetContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  budgetScope: string;
  financeReference: string;
  campaignSync: string;
  paidMediaSync: string;
  budgetPeriod: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface BudgetKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  variant: "blue" | "green" | "red" | "orange" | "amber";
}

export interface BudgetReadinessCounters {
  healthy: number;
  needsAttention: number;
  overspendRisk: number;
  underspendRisk: number;
  approvalPending: number;
  reallocationPending: number;
  commitmentWarning: number;
  forecastVariance: number;
}

export interface BudgetRecord {
  id: string;
  budgetName: string;
  budgetId: string;
  status: "Active" | "Pending Approval" | "Closed" | "Draft";
  budgetType: "Annual" | "Campaign" | "Monthly";
  owner: string;
  businessUnit: string;
  brand: string;
  period: string;
  approvedBudget: string;
  committed: string;
  actualSpend: string;
  unspentBalance: string;
  utilizationPercent: number;
  commitmentCoveragePercent: number;
  forecastFinalSpend: string;
  forecastVariancePercent: string;
  spendHealth: "Healthy" | "Overspend Risk" | "Underspend Risk" | "Warning";
  approval: "Approved" | "Pending Approval" | "Awaiting Approval" | "Rejected";
  lastUpdated: string;
}

export interface ChannelAllocationItem {
  channel: string;
  approvedBudget: string;
  percentOfTotal: string;
  committed: string;
  actualSpend: string;
}

export interface ChannelVsBudgetItem {
  channel: string;
  budget: string;
  committed: string;
  actual: string;
  utilizationPercent: number;
  commitmentCoveragePercent: number;
  status: "Healthy" | "Warning" | "Overcommit" | "Overspend Risk";
}

export interface CampaignBudgetAllocationItem {
  id: string;
  campaign: string;
  campaignId: string;
  approvedBudget: string;
  committed: string;
  actual: string;
  utilizationPercent: number;
  status: "Healthy" | "Warning" | "Overspend Risk";
}

export interface SpendvsPlanPoint {
  date: string;
  planned: number;
  actual: number;
}

export interface BudgetVarianceItem {
  id: string;
  area: string;
  variance: string;
  variancePercent: string;
  status: "Underspend" | "Healthy" | "Overspend";
}

export interface BudgetReallocationItem {
  id: string;
  reallocationId: string;
  fromArea: string;
  toArea: string;
  amount: string;
  status: "Awaiting Approval" | "Approved" | "Rejected" | "Completed";
}

export interface ReallocationImpactData {
  reallocationId: string;
  fromName: string;
  fromBefore: string;
  fromAfter: string;
  toName: string;
  toBefore: string;
  toAfter: string;
  residualHeadroom: string;
  approvalRequired: boolean;
}

export interface ApprovalWorkflowStage {
  id: string;
  role: string;
  status: "Approved" | "Pending" | "Rejected" | "Not Required";
  date: string;
}

export interface BudgetControlSetting {
  label: string;
  value: string;
}

export interface BudgetExceptionItem {
  id: string;
  exception: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  detected: string;
}

export interface PaidMediaSpendRefItem {
  platform: string;
  budget: string;
  actual: string;
  pacingPercent: number;
}

export interface CampaignBudgetUsageItem {
  channelCampaign: string;
  utilizationPercent: number;
  spend: string;
  forecast: string;
  status: "Healthy" | "Warning" | "Overspend Risk";
}

export interface SelectedBudgetDetails {
  budget: BudgetRecord;
  summaryMetrics: {
    approvedBudget: string;
    committed: string;
    actualSpend: string;
    remainingUnspent: string;
    availableToCommit: string;
    utilizationPercent: number;
    commitmentCoveragePercent: number;
    forecastFinalSpend: string;
    forecastVariancePercent: string;
    spendHealthScore: number;
  };
  channelAllocations: ChannelAllocationItem[];
  channelVsBudget: ChannelVsBudgetItem[];
  campaignAllocations: CampaignBudgetAllocationItem[];
  commitmentSummary: {
    totalCommitted: string;
    breakdown: Array<{ channel: string; amount: string }>;
    availableToCommit: string;
  };
  actualSpendBreakdown: {
    totalActualSpend: string;
    breakdown: Array<{ channel: string; amount: string }>;
  };
  spendVsPlanTrend: SpendvsPlanPoint[];
  forecast: {
    forecastFinalSpend: string;
    forecastUtilizationPercent: number;
    expectedRemaining: string;
    forecastConfidencePercent: number;
    forecastVariancePercent: string;
    forecastStatus: string;
  };
  varianceList: BudgetVarianceItem[];
  reallocations: BudgetReallocationItem[];
  reallocationImpact: ReallocationImpactData;
  approvalWorkflow: ApprovalWorkflowStage[];
  controls: BudgetControlSetting[];
  activeActivity: Array<{ id: string; time: string; event: string }>;
  activeExceptions: BudgetExceptionItem[];
  paidMediaRef: PaidMediaSpendRefItem[];
  campaignUsage: CampaignBudgetUsageItem[];
  financeReference: {
    status: string;
    spendIntegration: string;
    reconciliation: string;
    workingCapitalImpact: string;
    cashFlowImpact: string;
  };
  version: {
    version: string;
    currentStatus: string;
    draftEffectiveDate: string;
    createdBy: string;
    approvedOn: string;
  };
  recentActivity: Array<{ id: string; time: string; event: string; actor: string }>;
  auditSummary: {
    period: string;
    budgetChanges: number;
    reallocations: number;
    exceptionsDetected: number;
    commitments: number;
    approvals: number;
  };
}

export interface BudgetRailData {
  healthScore: number;
  healthLabel: string;
  healthDimensions: {
    allocationIntegrity: number;
    spendControl: number;
    commitmentCoverage: number;
    forecastAccuracy: number;
    approvalEfficiency: number;
    reallocationGovernance: number;
    financeSync: number;
  };
  budgetSummary: {
    approved: string;
    committed: string;
    actual: string;
    unspent: string;
  };
  forecastSummary: {
    forecast: string;
    utilizationPercent: number;
    conservativeVariancePercent: number;
    overUnderBudget: string;
  };
  allocationSummary: Array<{
    name: string;
    percent: number;
    barColor: string;
  }>;
  approvalSummary: {
    pending: number;
    overdue: number;
    reallocations: number;
  };
  exceptionsSummary: {
    open: number;
    high: number;
    warnings: number;
    information: number;
  };
  quickQueues: {
    overspendRisk: number;
    underspendRisk: number;
    approvalPending: number;
    reallocationPending: number;
    commitmentWarnings: number;
    forecastVariance: number;
  };
}

export interface MarketingBudgetsData {
  context: BudgetContextData;
  kpis: BudgetKpiItem[];
  readiness: BudgetReadinessCounters;
  budgets: BudgetRecord[];
  selectedBudgetDetails: Record<string, SelectedBudgetDetails>;
  rail: BudgetRailData;
}

export const MARKETING_BUDGETS_MOCK_DATA: MarketingBudgetsData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    budgetScope: "All Marketing Budgets",
    financeReference: "Connected",
    campaignSync: "Healthy",
    paidMediaSync: "Healthy",
    budgetPeriod: "FY2026",
    completenessPercent: 98,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    {
      id: "total_budget",
      label: "Total Marketing Budget",
      value: "LKR 11.70M",
      variant: "red",
    },
    {
      id: "committed",
      label: "Committed",
      value: "LKR 9.02M",
      variant: "green",
    },
    {
      id: "actual_spend",
      label: "Actual Spend",
      value: "LKR 8.42M",
      variant: "blue",
    },
    {
      id: "remaining_unspent",
      label: "Remaining (Unspent Balance)",
      value: "LKR 3.28M",
      variant: "orange",
    },
    {
      id: "forecast_final",
      label: "Forecast Final Spend",
      value: "LKR 11.34M",
      variant: "green",
    },
    {
      id: "at_risk",
      label: "At Risk",
      value: "LKR 1.18M",
      variant: "amber",
    },
    {
      id: "open_exceptions",
      label: "Open Budget Exceptions",
      value: "9",
      variant: "red",
    },
    {
      id: "budget_health",
      label: "Budget Health",
      value: "93 /100",
      variant: "green",
    },
  ],
  readiness: {
    healthy: 14,
    needsAttention: 4,
    overspendRisk: 3,
    underspendRisk: 2,
    approvalPending: 4,
    reallocationPending: 2,
    commitmentWarning: 2,
    forecastVariance: 3,
  },
  budgets: [
    {
      id: "BUD-2026-0001",
      budgetName: "FY26 Marketing Master Budget",
      budgetId: "BUD-2026-0001",
      status: "Active",
      budgetType: "Annual",
      owner: "Amaya Perera",
      businessUnit: "All Business Units",
      brand: "All Brands",
      period: "FY2026",
      approvedBudget: "LKR 11.70M",
      committed: "LKR 9.02M",
      actualSpend: "LKR 8.42M",
      unspentBalance: "LKR 3.28M",
      utilizationPercent: 72,
      commitmentCoveragePercent: 77,
      forecastFinalSpend: "LKR 11.34M",
      forecastVariancePercent: "-3.1%",
      spendHealth: "Healthy",
      approval: "Approved",
      lastUpdated: "Aug 14, 2026",
    },
    {
      id: "BUD-2026-0002",
      budgetName: "Summer Beauty Festival Budget",
      budgetId: "BUD-2026-0002",
      status: "Active",
      budgetType: "Campaign",
      owner: "Kavindi Silva",
      businessUnit: "Beauty Enthusiasts",
      brand: "SL Beauty",
      period: "Jul-Aug 2026",
      approvedBudget: "LKR 2.60M",
      committed: "LKR 2.10M",
      actualSpend: "LKR 1.84M",
      unspentBalance: "LKR 760K",
      utilizationPercent: 71,
      commitmentCoveragePercent: 81,
      forecastFinalSpend: "LKR 2.55M",
      forecastVariancePercent: "-2.0%",
      spendHealth: "Healthy",
      approval: "Approved",
      lastUpdated: "Aug 13, 2026",
    },
    {
      id: "BUD-2026-0003",
      budgetName: "Paid Media — August",
      budgetId: "BUD-2026-0003",
      status: "Active",
      budgetType: "Monthly",
      owner: "Hasini Fernando",
      businessUnit: "All Business Units",
      brand: "All Brands",
      period: "Aug 2026",
      approvedBudget: "LKR 1.20M",
      committed: "LKR 1.10M",
      actualSpend: "LKR 1.11M",
      unspentBalance: "LKR 90K",
      utilizationPercent: 92,
      commitmentCoveragePercent: 91,
      forecastFinalSpend: "LKR 1.35M",
      forecastVariancePercent: "+12%",
      spendHealth: "Overspend Risk",
      approval: "Approved",
      lastUpdated: "Aug 12, 2026",
    },
    {
      id: "BUD-2026-0004",
      budgetName: "CRM & Messaging Budget",
      budgetId: "BUD-2026-0004",
      status: "Active",
      budgetType: "Annual",
      owner: "Dilini Jayawardene",
      businessUnit: "All Business Units",
      brand: "All Brands",
      period: "FY2026",
      approvedBudget: "LKR 1.52M",
      committed: "LKR 1.08M",
      actualSpend: "LKR 820K",
      unspentBalance: "LKR 700K",
      utilizationPercent: 54,
      commitmentCoveragePercent: 71,
      forecastFinalSpend: "LKR 1.36M",
      forecastVariancePercent: "-10%",
      spendHealth: "Healthy",
      approval: "Approved",
      lastUpdated: "Aug 13, 2026",
    },
    {
      id: "BUD-2026-0005",
      budgetName: "Content & Creative Budget",
      budgetId: "BUD-2026-0005",
      status: "Active",
      budgetType: "Annual",
      owner: "Sachini de Silva",
      businessUnit: "All Business Units",
      brand: "All Brands",
      period: "FY2026",
      approvedBudget: "LKR 1.84M",
      committed: "LKR 1.04M",
      actualSpend: "LKR 1.32M",
      unspentBalance: "LKR 520K",
      utilizationPercent: 72,
      commitmentCoveragePercent: 68,
      forecastFinalSpend: "LKR 1.65M",
      forecastVariancePercent: "-10%",
      spendHealth: "Healthy",
      approval: "Approved",
      lastUpdated: "Aug 12, 2026",
    },
    {
      id: "BUD-2026-0006",
      budgetName: "Partnerships / Events Budget",
      budgetId: "BUD-2026-0006",
      status: "Pending Approval",
      budgetType: "Annual",
      owner: "Nirosha Bandara",
      businessUnit: "All Business Units",
      brand: "All Brands",
      period: "FY2026",
      approvedBudget: "LKR 1.90M",
      committed: "LKR 1.10M",
      actualSpend: "LKR 920K",
      unspentBalance: "LKR 980K",
      utilizationPercent: 52,
      commitmentCoveragePercent: 66,
      forecastFinalSpend: "LKR 2.12M",
      forecastVariancePercent: "+12%",
      spendHealth: "Underspend Risk",
      approval: "Pending Approval",
      lastUpdated: "Aug 11, 2026",
    },
  ],
  selectedBudgetDetails: {
    "BUD-2026-0001": {
      budget: {
        id: "BUD-2026-0001",
        budgetName: "FY26 Marketing Master Budget",
        budgetId: "BUD-2026-0001",
        status: "Active",
        budgetType: "Annual",
        owner: "Amaya Perera",
        businessUnit: "All Business Units",
        brand: "All Brands",
        period: "FY2026",
        approvedBudget: "LKR 11.70M",
        committed: "LKR 9.02M",
        actualSpend: "LKR 8.42M",
        unspentBalance: "LKR 3.28M",
        utilizationPercent: 72,
        commitmentCoveragePercent: 77,
        forecastFinalSpend: "LKR 11.34M",
        forecastVariancePercent: "-3.1%",
        spendHealth: "Healthy",
        approval: "Approved",
        lastUpdated: "Aug 14, 2026",
      },
      summaryMetrics: {
        approvedBudget: "LKR 11.70M",
        committed: "LKR 9.02M",
        actualSpend: "LKR 8.42M",
        remainingUnspent: "LKR 3.28M",
        availableToCommit: "LKR 2.68M",
        utilizationPercent: 72,
        commitmentCoveragePercent: 77,
        forecastFinalSpend: "LKR 11.34M",
        forecastVariancePercent: "-3.1%",
        spendHealthScore: 93,
      },
      channelAllocations: [
        { channel: "Paid Media", approvedBudget: "LKR 4.56M", percentOfTotal: "39%", committed: "LKR 3.50M", actualSpend: "LKR 3.12M" },
        { channel: "CRM / Messaging", approvedBudget: "LKR 1.52M", percentOfTotal: "13%", committed: "LKR 1.20M", actualSpend: "LKR 0.82M" },
        { channel: "Content & Creative", approvedBudget: "LKR 1.84M", percentOfTotal: "16%", committed: "LKR 1.60M", actualSpend: "LKR 1.32M" },
        { channel: "Web & App", approvedBudget: "LKR 1.20M", percentOfTotal: "10%", committed: "LKR 1.00M", actualSpend: "LKR 0.78M" },
        { channel: "Partnerships / Events", approvedBudget: "LKR 1.90M", percentOfTotal: "16%", committed: "LKR 1.20M", actualSpend: "LKR 0.92M" },
        { channel: "Other / Research", approvedBudget: "LKR 0.68M", percentOfTotal: "6%", committed: "LKR 0.54M", actualSpend: "LKR 0.46M" },
      ],
      channelVsBudget: [
        { channel: "Paid Media", budget: "LKR 4.56M", committed: "LKR 3.50M", actual: "LKR 3.12M", utilizationPercent: 70, commitmentCoveragePercent: 77, status: "Healthy" },
        { channel: "CRM / Messaging", budget: "LKR 1.52M", committed: "LKR 1.20M", actual: "LKR 0.82M", utilizationPercent: 54, commitmentCoveragePercent: 79, status: "Healthy" },
        { channel: "Content & Creative", budget: "LKR 1.84M", committed: "LKR 1.60M", actual: "LKR 1.32M", utilizationPercent: 72, commitmentCoveragePercent: 87, status: "Healthy" },
        { channel: "Web & App", budget: "LKR 1.20M", committed: "LKR 1.00M", actual: "LKR 0.78M", utilizationPercent: 65, commitmentCoveragePercent: 83, status: "Healthy" },
        { channel: "Partnerships / Events", budget: "LKR 1.90M", committed: "LKR 1.20M", actual: "LKR 0.92M", utilizationPercent: 52, commitmentCoveragePercent: 63, status: "Healthy" },
        { channel: "Other / Research", budget: "LKR 0.68M", committed: "LKR 0.74M", actual: "LKR 0.46M", utilizationPercent: 50, commitmentCoveragePercent: 109, status: "Overspend Risk" },
      ],
      campaignAllocations: [
        { id: "c1", campaign: "Summer Beauty Festival", campaignId: "MKT-2026-0087", approvedBudget: "LKR 2.60M", committed: "LKR 2.10M", actual: "LKR 1.84M", utilizationPercent: 71, status: "Healthy" },
        { id: "c2", campaign: "New Customer Acquisition", campaignId: "MKT-2026-0055", approvedBudget: "LKR 2.20M", committed: "LKR 1.80M", actual: "LKR 1.52M", utilizationPercent: 70, status: "Healthy" },
        { id: "c3", campaign: "Premium Skincare Re-Engagement", campaignId: "MKT-2026-0044", approvedBudget: "LKR 1.00M", committed: "LKR 1.05M", actual: "LKR 0.88M", utilizationPercent: 88, status: "Healthy" },
        { id: "c4", campaign: "Loyalty Program Push", campaignId: "MKT-2026-0019", approvedBudget: "LKR 0.90M", committed: "LKR 0.75M", actual: "LKR 0.58M", utilizationPercent: 64, status: "Healthy" },
      ],
      commitmentSummary: {
        totalCommitted: "LKR 9.02M",
        breakdown: [
          { channel: "Paid Media", amount: "LKR 3.50M" },
          { channel: "CRM / Messaging", amount: "LKR 1.20M" },
          { channel: "Content & Creative", amount: "LKR 1.60M" },
          { channel: "Web & App", amount: "LKR 1.00M" },
          { channel: "Partnerships / Events", amount: "LKR 1.20M" },
          { channel: "Other / Research", amount: "LKR 0.54M" },
        ],
        availableToCommit: "LKR 2.68M",
      },
      actualSpendBreakdown: {
        totalActualSpend: "LKR 8.42M",
        breakdown: [
          { channel: "Paid Media", amount: "LKR 3.12M" },
          { channel: "CRM / Messaging", amount: "LKR 0.82M" },
          { channel: "Content & Creative", amount: "LKR 1.32M" },
          { channel: "Web & App", amount: "LKR 0.78M" },
          { channel: "Partnerships / Events", amount: "LKR 0.92M" },
          { channel: "Other / Research", amount: "LKR 0.46M" },
        ],
      },
      spendVsPlanTrend: [
        { date: "Jul", planned: 0.9, actual: 0.8 },
        { date: "Aug", planned: 1.8, actual: 1.6 },
        { date: "Sep", planned: 2.7, actual: 2.5 },
        { date: "Oct", planned: 3.6, actual: 3.4 },
        { date: "Nov", planned: 4.5, actual: 4.2 },
        { date: "Dec", planned: 5.8, actual: 5.5 },
        { date: "Jan", planned: 6.7, actual: 6.4 },
        { date: "Feb", planned: 7.6, actual: 7.2 },
        { date: "Mar", planned: 8.5, actual: 8.1 },
        { date: "Apr", planned: 9.5, actual: 8.42 },
        { date: "May", planned: 10.6, actual: 8.42 },
        { date: "Jun", planned: 11.7, actual: 8.42 },
      ],
      forecast: {
        forecastFinalSpend: "LKR 11.34M",
        forecastUtilizationPercent: 97,
        expectedRemaining: "LKR 360K",
        forecastConfidencePercent: 92,
        forecastVariancePercent: "-3.1%",
        forecastStatus: "On Track",
      },
      varianceList: [
        { id: "v1", area: "Paid Search", variance: "-LKR 120K", variancePercent: "-9%", status: "Underspend" },
        { id: "v2", area: "Content & Creative", variance: "-LKR 270K", variancePercent: "-10%", status: "Underspend" },
        { id: "v3", area: "Paid Social", variance: "LKR 0K", variancePercent: "0%", status: "Healthy" },
        { id: "v4", area: "Email / SMS / Push", variance: "-LKR 60K", variancePercent: "-5%", status: "Healthy" },
        { id: "v5", area: "Partnerships / Events", variance: "+LKR 250K", variancePercent: "+12%", status: "Overspend" },
      ],
      reallocations: [
        { id: "r1", reallocationId: "REA-2026-0020", fromArea: "Content & Creative", toArea: "Paid Search", amount: "LKR 250K", status: "Awaiting Approval" },
        { id: "r2", reallocationId: "REA-2026-0021", fromArea: "Partnerships / Events", toArea: "Paid Social", amount: "LKR 150K", status: "Approved" },
        { id: "r3", reallocationId: "REA-2026-0022", fromArea: "Web & App", toArea: "Messaging", amount: "LKR 120K", status: "Approved" },
      ],
      reallocationImpact: {
        reallocationId: "REA-2026-0020",
        fromName: "Content & Creative",
        fromBefore: "1.84M",
        fromAfter: "1.59M",
        toName: "Paid Search",
        toBefore: "1.45M",
        toAfter: "1.70M",
        residualHeadroom: "350K",
        approvalRequired: true,
      },
      approvalWorkflow: [
        { id: "w1", role: "Business Owner", status: "Approved", date: "Aug 10, 2026" },
        { id: "w2", role: "Finance Reviewer", status: "Approved", date: "Aug 11, 2026" },
        { id: "w3", role: "Category Buyer", status: "Approved", date: "Aug 12, 2026" },
        { id: "w4", role: "Budget Steward", status: "Approved", date: "Aug 12, 2026" },
      ],
      controls: [
        { label: "Warning Threshold", value: "80%" },
        { label: "High-Risk Threshold", value: "90%" },
        { label: "Freeze Limit (Buffer)", value: "100%" },
        { label: "Forecast Accuracy Min.", value: "95%" },
        { label: "Reallocation Approval Threshold", value: "LKR 150K" },
        { label: "Emergency Override", value: "Restricted" },
        { label: "Budget Freeze", value: "None" },
      ],
      activeActivity: [
        { id: "aa1", time: "Aug 14, 2026 10:15 AM", event: "Paid Media Sync Completed" },
        { id: "aa2", time: "Aug 14, 2026 09:41 AM", event: "Forecast Refreshed" },
        { id: "aa3", time: "Aug 13, 2026 04:22 PM", event: "Reallocation Submitted" },
        { id: "aa4", time: "Aug 13, 2026 03:35 PM", event: "Commitment Submitted" },
        { id: "aa5", time: "Aug 13, 2026 01:25 PM", event: "Spend Import Completed" },
      ],
      activeExceptions: [
        { id: "ex1", exception: "Forecast Variance", severity: "High", detected: "Aug 14, 2026" },
        { id: "ex2", exception: "Commitment Coverage", severity: "Medium", detected: "Aug 13, 2026" },
        { id: "ex3", exception: "Overspend Risk", severity: "High", detected: "Aug 13, 2026" },
        { id: "ex4", exception: "Missing Commitment Ref.", severity: "Low", detected: "Aug 12, 2026" },
        { id: "ex5", exception: "Missing Creative Ref.", severity: "Low", detected: "Aug 12, 2026" },
      ],
      paidMediaRef: [
        { platform: "Meta Ads", budget: "2.40M", actual: "2.35M", pacingPercent: 98 },
        { platform: "Google Ads", budget: "1.45M", actual: "1.52M", pacingPercent: 105 },
        { platform: "TikTok Ads", budget: "0.60M", actual: "0.51M", pacingPercent: 85 },
      ],
      campaignUsage: [
        { channelCampaign: "Paid Media", utilizationPercent: 79, spend: "3.12M", forecast: "3.24M", status: "Healthy" },
        { channelCampaign: "Content & Creative", utilizationPercent: 72, spend: "1.32M", forecast: "1.45M", status: "Healthy" },
        { channelCampaign: "Premium Skincare Re-Eng.", utilizationPercent: 88, spend: "0.88M", forecast: "1.00M", status: "Healthy" },
      ],
      financeReference: {
        status: "Connected",
        spendIntegration: "Connected (LKR 11.70M)",
        reconciliation: "Healthy",
        workingCapitalImpact: "Healthy",
        cashFlowImpact: "Healthy",
      },
      version: {
        version: "v6",
        currentStatus: "Approved",
        draftEffectiveDate: "Aug 10, 2026",
        createdBy: "Amaya Perera",
        approvedOn: "Aug 13, 2026 11:45 AM",
      },
      recentActivity: [
        { id: "ra1", time: "Aug 14, 2026 10:15 AM", event: "Draft v6 Approved", actor: "Amaya Perera" },
        { id: "ra2", time: "Aug 14, 2026 09:41 AM", event: "Reallocation Draft Submitted", actor: "Hasini Fernando" },
        { id: "ra3", time: "Aug 13, 2026 04:22 PM", event: "Commitment Submitted", actor: "Kavindi Silva" },
        { id: "ra4", time: "Aug 13, 2026 03:35 PM", event: "Budget Updated", actor: "Amaya Perera" },
        { id: "ra5", time: "Aug 13, 2026 01:25 PM", event: "Forecast Updated", actor: "System" },
      ],
      auditSummary: {
        period: "FY2026",
        budgetChanges: 14,
        reallocations: 7,
        exceptionsDetected: 9,
        commitments: 18,
        approvals: 14,
      },
    },
  },
  rail: {
    healthScore: 93,
    healthLabel: "Excellent",
    healthDimensions: {
      allocationIntegrity: 98,
      spendControl: 94,
      commitmentCoverage: 96,
      forecastAccuracy: 91,
      approvalEfficiency: 94,
      reallocationGovernance: 92,
      financeSync: 97,
    },
    budgetSummary: {
      approved: "11.70M",
      committed: "9.02M",
      actual: "8.42M",
      unspent: "3.28M",
    },
    forecastSummary: {
      forecast: "11.34M",
      utilizationPercent: 97,
      conservativeVariancePercent: -3.1,
      overUnderBudget: "-360K",
    },
    allocationSummary: [
      { name: "Paid Media", percent: 39, barColor: "#2563eb" },
      { name: "CRM / Messaging", percent: 13, barColor: "#059669" },
      { name: "Content & Creative", percent: 16, barColor: "#d97706" },
      { name: "Web & App", percent: 10, barColor: "#7c3aed" },
      { name: "Partnerships / Events", percent: 16, barColor: "#e11d48" },
      { name: "Other / Research", percent: 6, barColor: "#475569" },
    ],
    approvalSummary: {
      pending: 4,
      overdue: 2,
      reallocations: 2,
    },
    exceptionsSummary: {
      open: 9,
      high: 3,
      warnings: 5,
      information: 1,
    },
    quickQueues: {
      overspendRisk: 3,
      underspendRisk: 2,
      approvalPending: 4,
      reallocationPending: 2,
      commitmentWarnings: 2,
      forecastVariance: 3,
    },
  },
};
