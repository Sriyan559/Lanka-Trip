import { MarketingContext } from "./marketingCommandCenter.mock";

export interface CampaignKpiItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  badgeColor?: string;
  valueColor?: string;
}

export interface ReadinessCounter {
  id: string;
  label: string;
  count: number;
  color: "green" | "orange" | "red";
}

export interface CampaignPortfolioRecord {
  id: string;
  code: string;
  name: string;
  lifecycleStatus: "Active" | "Scheduled" | "Awaiting Approval" | "Draft" | "Paused" | "Completed" | "Cancelled" | "Archived";
  type: string;
  owner: string;
  businessUnit: string;
  channels: string[];
  audience: string;
  startDate: string;
  endDate: string;
  budget: string;
  spend: string;
  revenue: string;
  roas: string;
  conversion: string;
  approvalStatus: "Approved" | "Pending" | "Not Submitted" | "Rejected" | "Changes Requested";
  governanceStatus: "Clear" | "Consent Clear" | "Review Required" | "Frequency Check" | "Exception";
  deliveryHealth: "Healthy" | "Ready" | "CPA Warning" | "Delivery Warning" | "Blocked" | "Not Ready" | "Degraded";
  updated: string;
  objective: string;
}

export interface ApprovalQueueRecord {
  id: string;
  campaignName: string;
  status: string;
  submitted: string;
  nextApprover: string;
  risk: "Low" | "Medium" | "High";
}

export interface CampaignExceptionRecord {
  id: string;
  campaignName: string;
  issue: string;
  impact: string;
  actionText: string;
}

export interface ChannelChartItem {
  channel: string;
  count: number;
}

export interface CampaignMixItem {
  category: string;
  percentage: number;
  color: string;
}

export interface BudgetUtilizationRecord {
  campaignName: string;
  percentage: number;
}

export interface LinkedPromotionRecord {
  campaignName: string;
  promotionName: string;
  status: string;
}

export interface RecentActivityRecord {
  id: string;
  time: string;
  activity: string;
  user: string;
  system: string;
}

export interface CampaignOperationalRailData {
  healthScore: number;
  healthMetrics: Array<{ label: string; score: number }>;
  priorityAlerts: {
    total: number;
    items: Array<{ severity: "Critical" | "High" | "Medium" | "Low"; count: number; description: string }>;
  };
  campaignSummary: { total: number; active: number; scheduled: number };
  approvalSummary: { pending: number; overdue: number };
  budgetSummary: { spend: string; remaining: string };
  deliverySummary: { healthyPercent: number; warnings: number; blocked: number };
  quickQueues: { approvals: number; drafts: number; exceptions: number; budgetRisk: number; deliveryWarnings: number };
}

export interface CampaignManagementMockData {
  context: MarketingContext;
  kpis: CampaignKpiItem[];
  readinessStrip: ReadinessCounter[];
  portfolioRecords: CampaignPortfolioRecord[];
  selectedCampaign: CampaignPortfolioRecord;
  lifecycleCounts: Array<{ stage: string; count: number; color: string }>;
  approvalQueue: ApprovalQueueRecord[];
  exceptions: CampaignExceptionRecord[];
  channelChartData: ChannelChartItem[];
  campaignMixData: CampaignMixItem[];
  budgetControl: {
    allocatedBudget: string;
    committed: string;
    committedPercent: number;
    actualSpend: string;
    actualSpendPercent: number;
    atRisk: string;
    atRiskPercent: number;
    utilization: BudgetUtilizationRecord[];
  };
  linkedPromotions: LinkedPromotionRecord[];
  recentActivity: RecentActivityRecord[];
  operationalRail: CampaignOperationalRailData;
}

export const CAMPAIGN_MANAGEMENT_MOCK_DATA: CampaignManagementMockData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    salesChannels: "All Channels",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    marketingScope: "Active Marketing Network",
    campaignPeriod: "Aug 2026",
    dateRange: "Last 90 Days",
    liveData: true,
    dataCompleteness: 96,
    lastSynced: "Aug 14, 2026 10:15 AM",
    campaignPeriodState: "Open",
    accessScope: "Limited to assigned business context"
  },
  kpis: [
    { id: "kpi-1", label: "TOTAL CAMPAIGNS", value: "128", subtext: "Across all channels" },
    { id: "kpi-2", label: "ACTIVE", value: "24", subtext: "18.8% of total", valueColor: "text-emerald-700" },
    { id: "kpi-3", label: "SCHEDULED", value: "8", subtext: "6.3% of total", valueColor: "text-blue-700" },
    { id: "kpi-4", label: "AWAITING APPROVAL", value: "5", subtext: "3.9% of total", valueColor: "text-amber-700" },
    { id: "kpi-5", label: "PAUSED", value: "3", subtext: "2.3% of total", valueColor: "text-[#800020]" },
    { id: "kpi-6", label: "COMPLETED — 30 DAYS", value: "31", subtext: "24.2% of total", valueColor: "text-emerald-800" },
    { id: "kpi-7", label: "TOTAL SPEND", value: "LKR 8.42M", subtext: "72% of budget", valueColor: "text-[#800020]" },
    { id: "kpi-8", label: "AVERAGE ROAS", value: "3.76x", subtext: "Target 3.20x", valueColor: "text-emerald-700" }
  ],
  readinessStrip: [
    { id: "r-1", label: "Execution Ready", count: 42, color: "green" },
    { id: "r-2", label: "Needs Attention", count: 11, color: "orange" },
    { id: "r-3", label: "Approval Blocked", count: 5, color: "red" },
    { id: "r-4", label: "Budget Risk", count: 4, color: "orange" },
    { id: "r-5", label: "Delivery Warning", count: 3, color: "orange" },
    { id: "r-6", label: "Governance Exception", count: 6, color: "red" }
  ],
  portfolioRecords: [
    {
      id: "cmp-001",
      code: "MKT-2026-0087",
      name: "Summer Beauty Festival",
      lifecycleStatus: "Active",
      type: "Seasonal",
      owner: "Marketing Team",
      businessUnit: "Beauty Retail",
      channels: ["Email", "Web", "Paid Social"],
      audience: "482K",
      startDate: "16 Jul 2026",
      endDate: "18 Aug 2026",
      budget: "LKR 1.80M",
      spend: "LKR 1.46M",
      revenue: "LKR 7.92M",
      roas: "5.42x",
      conversion: "6.8%",
      approvalStatus: "Approved",
      governanceStatus: "Clear",
      deliveryHealth: "Healthy",
      updated: "10 min ago",
      objective: "Drive seasonal beauty sales and new-customer acquisition"
    },
    {
      id: "cmp-002",
      code: "MKT-2026-0089",
      name: "Premium Skincare Re-Engagement",
      lifecycleStatus: "Active",
      type: "Re-engagement",
      owner: "CRM Marketing",
      businessUnit: "Beauty Retail",
      channels: ["Email", "Push"],
      audience: "174K",
      startDate: "22 Jul 2026",
      endDate: "Ongoing",
      budget: "LKR 530K",
      spend: "LKR 420K",
      revenue: "LKR 1.81M",
      roas: "4.31x",
      conversion: "5.9%",
      approvalStatus: "Approved",
      governanceStatus: "Consent Clear",
      deliveryHealth: "Healthy",
      updated: "25 min ago",
      objective: "Re-engage inactive premium skincare buyers"
    },
    {
      id: "cmp-003",
      code: "MKT-2026-0095",
      name: "New Customer Acquisition — Meta",
      lifecycleStatus: "Active",
      type: "Acquisition",
      owner: "Performance Marketing",
      businessUnit: "Beauty Retail",
      channels: ["Paid Social"],
      audience: "713K",
      startDate: "1 Aug 2026",
      endDate: "31 Aug 2026",
      budget: "LKR 2.60M",
      spend: "LKR 2.10M",
      revenue: "LKR 6.12M",
      roas: "2.91x",
      conversion: "3.7%",
      approvalStatus: "Approved",
      governanceStatus: "Clear",
      deliveryHealth: "CPA Warning",
      updated: "42 min ago",
      objective: "Acquire first-time buyers via Meta Ads"
    },
    {
      id: "cmp-004",
      code: "MKT-2026-0101",
      name: "Haircare Launch",
      lifecycleStatus: "Scheduled",
      type: "Product Launch",
      owner: "Brand Marketing",
      businessUnit: "Beauty Retail",
      channels: ["Web", "Email", "SMS"],
      audience: "296K",
      startDate: "11 Aug 2026",
      endDate: "18 Aug 2026",
      budget: "LKR 650K",
      spend: "LKR 0",
      revenue: "—",
      roas: "—",
      conversion: "—",
      approvalStatus: "Approved",
      governanceStatus: "Clear",
      deliveryHealth: "Ready",
      updated: "1 hr ago",
      objective: "Launch new premium haircare category line"
    },
    {
      id: "cmp-005",
      code: "MKT-2026-0104",
      name: "VIP Loyalty Reactivation",
      lifecycleStatus: "Awaiting Approval",
      type: "Retention",
      owner: "CRM Marketing",
      businessUnit: "Loyalty",
      channels: ["Email", "Push"],
      audience: "412K",
      startDate: "13 Aug 2026",
      endDate: "28 Aug 2026",
      budget: "LKR 185K",
      spend: "LKR 0",
      revenue: "—",
      roas: "—",
      conversion: "—",
      approvalStatus: "Pending",
      governanceStatus: "Review Required",
      deliveryHealth: "Blocked",
      updated: "1 hr ago",
      objective: "Reactivate dormant VIP loyalty tier members"
    },
    {
      id: "cmp-006",
      code: "MKT-2026-0107",
      name: "August SMS Retention",
      lifecycleStatus: "Draft",
      type: "Retention",
      owner: "Lifecycle Marketing",
      businessUnit: "Beauty Retail",
      channels: ["SMS"],
      audience: "86K",
      startDate: "—",
      endDate: "—",
      budget: "LKR 220K",
      spend: "LKR 0",
      revenue: "—",
      roas: "—",
      conversion: "—",
      approvalStatus: "Not Submitted",
      governanceStatus: "Frequency Check",
      deliveryHealth: "Not Ready",
      updated: "3 hrs ago",
      objective: "Target repeat customers with SMS offers"
    }
  ],
  selectedCampaign: {
    id: "cmp-001",
    code: "MKT-2026-0087",
    name: "Summer Beauty Festival",
    lifecycleStatus: "Active",
    type: "Seasonal",
    owner: "Marketing Team",
    businessUnit: "Beauty Retail",
    channels: ["Email", "Web", "Paid Social"],
    audience: "482,200",
    startDate: "16 Jul 2026",
    endDate: "18 Aug 2026",
    budget: "LKR 1.80M",
    spend: "LKR 1.46M",
    revenue: "LKR 7.92M",
    roas: "5.42x",
    conversion: "6.8%",
    approvalStatus: "Approved",
    governanceStatus: "Clear",
    deliveryHealth: "Healthy",
    updated: "10 min ago",
    objective: "Drive seasonal beauty sales and new-customer acquisition"
  },
  lifecycleCounts: [
    { stage: "Draft", count: 12, color: "text-gray-500 bg-gray-100" },
    { stage: "Awaiting Approval", count: 5, color: "text-amber-700 bg-amber-50" },
    { stage: "Scheduled", count: 8, color: "text-blue-700 bg-blue-50" },
    { stage: "Active", count: 24, color: "text-emerald-700 bg-emerald-50" },
    { stage: "Completed", count: 31, color: "text-emerald-800 bg-emerald-100" },
    { stage: "Paused", count: 3, color: "text-rose-700 bg-rose-50" },
    { stage: "Cancelled", count: 2, color: "text-gray-400 bg-gray-100" }
  ],
  approvalQueue: [
    { id: "ap-1", campaignName: "VIP Loyalty Reactivation", status: "Pending", submitted: "2h ago", nextApprover: "Marketing Director", risk: "Low" },
    { id: "ap-2", campaignName: "Premium Skincare Re-Engagement", status: "Pending", submitted: "5h ago", nextApprover: "Marketing Director", risk: "Low" },
    { id: "ap-3", campaignName: "August SMS Retention", status: "Not Submitted", submitted: "3h ago", nextApprover: "—", risk: "Low" }
  ],
  exceptions: [
    { id: "ex-1", campaignName: "New Customer Acquisition — Meta", issue: "CPA Warning", impact: "20% above target", actionText: "Investigate" },
    { id: "ex-2", campaignName: "Summer Beauty Festival", issue: "Budget Variance", impact: "77% budget consumed", actionText: "View Budget" },
    { id: "ex-3", campaignName: "August SMS Retention", issue: "Frequency Cap", impact: "Weekly cadence at risk", actionText: "Review Governance" },
    { id: "ex-4", campaignName: "Haircare Launch", issue: "Content Missing", impact: "2 web creatives at risk", actionText: "View Activity" }
  ],
  channelChartData: [
    { channel: "Email", count: 41 },
    { channel: "Paid Social", count: 33 },
    { channel: "Web/App", count: 29 },
    { channel: "SMS", count: 16 },
    { channel: "Push", count: 18 },
    { channel: "Paid Search", count: 17 }
  ],
  campaignMixData: [
    { category: "Acquisition", percentage: 24, color: "#800020" },
    { category: "Retention", percentage: 21, color: "#a31c44" },
    { category: "Seasonal", percentage: 18, color: "#d94870" },
    { category: "Re-engagement", percentage: 15, color: "#f39cb3" },
    { category: "Product Launch", percentage: 12, color: "#2563eb" },
    { category: "Loyalty", percentage: 7, color: "#10b981" },
    { category: "Awareness", percentage: 3, color: "#f59e0b" }
  ],
  budgetControl: {
    allocatedBudget: "LKR 11.70M",
    committed: "LKR 9.02M",
    committedPercent: 77,
    actualSpend: "LKR 8.42M",
    actualSpendPercent: 72,
    atRisk: "LKR 1.18M",
    atRiskPercent: 10,
    utilization: [
      { campaignName: "Summer Beauty Festival", percentage: 81 },
      { campaignName: "New Customer Acquisition — Meta", percentage: 80 },
      { campaignName: "Premium Skincare Re-Engagement", percentage: 81 }
    ]
  },
  linkedPromotions: [
    { campaignName: "Summer Beauty Festival", promotionName: "20% Off Selected Skincare", status: "Approved" },
    { campaignName: "Haircare Launch", promotionName: "Haircare Launch Bundle", status: "Approved" }
  ],
  recentActivity: [
    { id: "act-1", time: "10:15", activity: "Summer Beauty Festival performance metrics synchronized", user: "System", system: "System" },
    { id: "act-2", time: "09:42", activity: "VIP Loyalty Reactivation submitted for approval", user: "CRM Marketing", system: "CRM Marketing" },
    { id: "act-3", time: "09:18", activity: "Haircare Launch audience refined (296,164)", user: "Brand Marketing", system: "Brand Marketing" },
    { id: "act-4", time: "08:47", activity: "New Customer Acquisition budget updated LKR 2.40M to LKR 2.60M", user: "Performance Mktg", system: "Performance Mktg" },
    { id: "act-5", time: "08:22", activity: "August SMS Retention generated a frequency-cap warning", user: "Lifecycle Marketing", system: "Lifecycle Marketing" }
  ],
  operationalRail: {
    healthScore: 91,
    healthMetrics: [
      { label: "Execution Readiness", score: 94 },
      { label: "Approval Readiness", score: 89 },
      { label: "Audience Eligibility", score: 96 },
      { label: "Budget Health", score: 90 },
      { label: "Channel Delivery", score: 92 },
      { label: "Governance Compliance", score: 93 },
      { label: "Attribution Coverage", score: 88 }
    ],
    priorityAlerts: {
      total: 29,
      items: [
        { severity: "Critical", count: 2, description: "2 campaigns blocked from launch" },
        { severity: "High", count: 5, description: "5 approvals pending" },
        { severity: "Medium", count: 9, description: "4 campaigns nearing budget threshold" },
        { severity: "Low", count: 13, description: "Upcoming campaign content reviews" }
      ]
    },
    campaignSummary: { total: 128, active: 24, scheduled: 8 },
    approvalSummary: { pending: 5, overdue: 2 },
    budgetSummary: { spend: "LKR 8.42M", remaining: "LKR 3.28M" },
    deliverySummary: { healthyPercent: 89, warnings: 7, blocked: 3 },
    quickQueues: { approvals: 5, drafts: 12, exceptions: 11, budgetRisk: 4, deliveryWarnings: 3 }
  }
};
