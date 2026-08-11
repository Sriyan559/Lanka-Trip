export interface MarketingContext {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  salesChannels: string;
  region: string;
  baseCurrency: string;
  marketingScope: string;
  campaignPeriod: string;
  dateRange: string;
  liveData: boolean;
  dataCompleteness: number;
  lastSynced: string;
  campaignPeriodState: string;
  accessScope: string;
}

export interface MarketingKpi {
  id: string;
  label: string;
  value: string;
  change?: string;
  subtext?: string;
  target?: string;
  progress?: number;
  health?: 'good' | 'warning' | 'critical';
  icon: string;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  spend: number;
  conversions: number;
}

export interface CampaignOperationRow {
  label: string;
  count: number;
  statusKey: string;
  color: string;
}

export interface ChannelPerformanceRow {
  channel: string;
  icon: string;
  deliveredOrSpend: string;
  engagement: string;
  conversions: string;
  revenue: string;
}

export interface CampaignPortfolioItem {
  id: string;
  name: string;
  status: 'Active' | 'Scheduled' | 'Awaiting Approval' | 'Draft' | 'Paused' | 'Completed';
  channels: string[];
  audience: string;
  spend: string;
  revenue: string;
  roas: string;
  conversion: string;
  endDate: string;
  owner: string;
  period: string;
  objective: string;
  primaryChannel: string;
}

export interface JourneyItem {
  name: string;
  status: string;
  customers: string;
  metric: string;
}

export interface BudgetBreakdownItem {
  category: string;
  amount: string;
  percentage: number;
  color: string;
}

export interface GovernanceIssue {
  id: string;
  type: 'Approval Required' | 'Consent Warning' | 'Frequency Cap' | 'Creative Review';
  title: string;
  subtitle: string;
  actionText: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface UpcomingActivityItem {
  id: string;
  dayMonth: string;
  title: string;
  detail: string;
  timeTag: string;
}

export interface JourneyAlertItem {
  id: string;
  severity: 'High Priority' | 'Warning' | 'Information';
  message: string;
  actionText: string;
  route: string;
}

export interface AudienceSegment {
  name: string;
  count: string;
}

export interface ChannelContributionItem {
  channel: string;
  percentage: number;
}

export interface LinkedPromotionItem {
  campaign: string;
  promotion: string;
  status: string;
}

export interface MarketingAuditItem {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  source?: string;
}

export interface PriorityAlert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  description: string;
}

export interface HealthMetric {
  label: string;
  score: number;
}

export interface MarketingCommandCenterMockData {
  context: MarketingContext;
  kpis: MarketingKpi[];
  performanceChart: ChartDataPoint[];
  campaignOperations: CampaignOperationRow[];
  channelPerformance: ChannelPerformanceRow[];
  campaignPortfolio: CampaignPortfolioItem[];
  journeys: {
    activeJourneys: number;
    customers: string;
    automatedMessages: string;
    journeyConversion: string;
    list: JourneyItem[];
  };
  budget: {
    totalBudget: string;
    committed: string;
    actualSpend: string;
    remaining: string;
    utilizedPercent: number;
    breakdown: BudgetBreakdownItem[];
  };
  governance: {
    awaitingApproval: number;
    consentWarnings: number;
    frequencyCapExceptions: number;
    creativePolicyReviews: number;
    issues: GovernanceIssue[];
  };
  upcomingActivity: UpcomingActivityItem[];
  journeyAlerts: JourneyAlertItem[];
  audience: {
    marketable: string;
    suppressed: string;
    highValue: string;
    recentlyActive: string;
    atRisk: string;
    segments: AudienceSegment[];
  };
  attribution: {
    attributedRevenue: string;
    assistedRevenue: string;
    influencedOrders: string;
    averageCac: string;
    contributions: ChannelContributionItem[];
  };
  linkedPromotions: LinkedPromotionItem[];
  recentActivity: MarketingAuditItem[];
  operationalRail: {
    healthScore: number;
    healthMetrics: HealthMetric[];
    priorityAlerts: PriorityAlert[];
    campaignSummary: { active: number; change: string; scheduledNext: number };
    audienceSummary: { reach: string; change: string; suppressed: string };
    spendSummary: { actualSpend: string; utilizedPercent: number; remaining: string };
    attributionSummary: { attributedRevenue: string; change: string; roas: string };
    quickOverview: { approvals: number; campaigns: number; contentReviews: number; exceptions: number; alerts: number };
  };
}

export const MARKETING_MOCK_DATA: MarketingCommandCenterMockData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    salesChannels: "All Channels",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    marketingScope: "Active Marketing Network",
    campaignPeriod: "Aug 2026",
    dateRange: "Last 30 Days",
    liveData: true,
    dataCompleteness: 96,
    lastSynced: "Aug 14, 2026 10:15 AM",
    campaignPeriodState: "Open",
    accessScope: "Limited to assigned business context"
  },
  kpis: [
    {
      id: "active-campaigns",
      label: "ACTIVE CAMPAIGNS",
      value: "24",
      change: "▲ 3 vs previous period",
      subtext: "5 scheduled next",
      icon: "Megaphone"
    },
    {
      id: "audience-reach",
      label: "AUDIENCE REACH",
      value: "1.84M",
      change: "▲ 12.6%",
      subtext: "Eligible unique customers",
      icon: "Users"
    },
    {
      id: "marketing-spend",
      label: "MARKETING SPEND",
      value: "LKR 8.42M",
      subtext: "72% of allocated budget",
      progress: 72,
      icon: "Wallet"
    },
    {
      id: "attributed-revenue",
      label: "ATTRIBUTED REVENUE",
      value: "LKR 31.7M",
      change: "▲ 18.4%",
      icon: "TrendingUp"
    },
    {
      id: "roas",
      label: "ROAS",
      value: "3.76x",
      target: "Target 3.20x",
      health: "good",
      icon: "Target"
    },
    {
      id: "conversion-rate",
      label: "CONVERSION RATE",
      value: "4.82%",
      change: "▲ 0.46 pp",
      subtext: "Cross-channel",
      icon: "Percent"
    }
  ],
  performanceChart: [
    { date: "15 Jul", revenue: 1.8, spend: 0.5, conversions: 520 },
    { date: "17 Jul", revenue: 2.1, spend: 0.6, conversions: 610 },
    { date: "19 Jul", revenue: 2.4, spend: 0.65, conversions: 730 },
    { date: "21 Jul", revenue: 2.0, spend: 0.55, conversions: 650 },
    { date: "23 Jul", revenue: 2.6, spend: 0.7, conversions: 810 },
    { date: "25 Jul", revenue: 3.1, spend: 0.8, conversions: 940 },
    { date: "27 Jul", revenue: 2.9, spend: 0.75, conversions: 890 },
    { date: "29 Jul", revenue: 3.4, spend: 0.85, conversions: 1050 },
    { date: "31 Jul", revenue: 3.8, spend: 0.95, conversions: 1180 },
    { date: "2 Aug", revenue: 3.2, spend: 0.8, conversions: 980 },
    { date: "4 Aug", revenue: 4.1, spend: 1.05, conversions: 1290 },
    { date: "6 Aug", revenue: 4.5, spend: 1.15, conversions: 1410 },
    { date: "8 Aug", revenue: 4.2, spend: 1.10, conversions: 1350 },
    { date: "10 Aug", revenue: 4.8, spend: 1.25, conversions: 1520 },
    { date: "12 Aug", revenue: 5.2, spend: 1.35, conversions: 1680 },
    { date: "14 Aug", revenue: 4.9, spend: 1.30, conversions: 1590 },
    { date: "16 Aug", revenue: 5.4, spend: 1.40, conversions: 1740 }
  ],
  campaignOperations: [
    { label: "Active", count: 24, statusKey: "active", color: "bg-emerald-500" },
    { label: "Scheduled", count: 8, statusKey: "scheduled", color: "bg-blue-500" },
    { label: "Awaiting Approval", count: 5, statusKey: "awaiting_approval", color: "bg-amber-500" },
    { label: "Draft", count: 12, statusKey: "draft", color: "bg-gray-400" },
    { label: "Paused", count: 3, statusKey: "paused", color: "bg-purple-500" },
    { label: "Completed – 30 Days", count: 31, statusKey: "completed", color: "bg-emerald-700" }
  ],
  channelPerformance: [
    { channel: "Email", icon: "Mail", deliveredOrSpend: "1.42M", engagement: "32.8%", conversions: "9,642", revenue: "LKR 9.4M" },
    { channel: "SMS", icon: "MessageSquare", deliveredOrSpend: "486K", engagement: "18.6%", conversions: "3,105", revenue: "LKR 2.6M" },
    { channel: "Push", icon: "Bell", deliveredOrSpend: "712K", engagement: "21.4%", conversions: "4,270", revenue: "LKR 3.8M" },
    { channel: "Paid Social", icon: "Share2", deliveredOrSpend: "LKR 3.12M", engagement: "—", conversions: "7,204", revenue: "LKR 9.92M" },
    { channel: "Paid Search", icon: "Search", deliveredOrSpend: "LKR 1.44M", engagement: "—", conversions: "3,995", revenue: "LKR 3.79M" }
  ],
  campaignPortfolio: [
    {
      id: "cmp-001",
      name: "Summer Beauty Festival",
      status: "Active",
      channels: ["Email", "Web", "Paid Social"],
      audience: "482K",
      spend: "LKR 1.44M",
      revenue: "LKR 7.92M",
      roas: "5.42x",
      conversion: "6.8%",
      endDate: "18 Aug 2026",
      owner: "Marketing Team",
      period: "Jul 16 – Aug 18, 2026",
      objective: "Drive sales & new customers",
      primaryChannel: "Email"
    },
    {
      id: "cmp-002",
      name: "Premium Skincare Re-Engagement",
      status: "Active",
      channels: ["Email", "Push"],
      audience: "174K",
      spend: "LKR 420K",
      revenue: "LKR 1.81M",
      roas: "4.31x",
      conversion: "5.9%",
      endDate: "Ongoing",
      owner: "Retention Team",
      period: "Aug 01 – Ongoing",
      objective: "Winback dormant skincare buyers",
      primaryChannel: "Push"
    },
    {
      id: "cmp-003",
      name: "New Customer Acquisition — Meta",
      status: "Active",
      channels: ["Paid Social"],
      audience: "713K",
      spend: "LKR 2.10M",
      revenue: "LKR 6.10M",
      roas: "2.91x",
      conversion: "3.7%",
      endDate: "31 Aug 2026",
      owner: "Acquisition Team",
      period: "Aug 01 – Aug 31, 2026",
      objective: "Acquire new beauty customers",
      primaryChannel: "Paid Social"
    },
    {
      id: "cmp-004",
      name: "Haircare Launch",
      status: "Scheduled",
      channels: ["Web", "Email", "SMS"],
      audience: "296K",
      spend: "LKR 650K",
      revenue: "—",
      roas: "—",
      conversion: "—",
      endDate: "11 Aug 2026",
      owner: "Brand Team",
      period: "Aug 11 – Sep 01, 2026",
      objective: "Product Category Launch",
      primaryChannel: "Web"
    },
    {
      id: "cmp-005",
      name: "VIP Loyalty Reactivation",
      status: "Awaiting Approval",
      channels: ["Email", "Push"],
      audience: "42K",
      spend: "LKR 185K",
      revenue: "—",
      roas: "—",
      conversion: "—",
      endDate: "13 Aug 2026",
      owner: "Loyalty Operations",
      period: "Aug 13 – Aug 27, 2026",
      objective: "VIP Loyalty engagement",
      primaryChannel: "Email"
    }
  ],
  journeys: {
    activeJourneys: 12,
    customers: "318K",
    automatedMessages: "1.26M → 30 Days",
    journeyConversion: "7.2%",
    list: [
      { name: "New Customer Welcome", status: "Running", customers: "48,120", metric: "8.1%" },
      { name: "Abandoned Cart Recovery", status: "Running", customers: "22,440", metric: "LKR 3.10M" },
      { name: "90-Day Customer Reactivation", status: "Running", customers: "36,208", metric: "5.4%" }
    ]
  },
  budget: {
    totalBudget: "LKR 11.70M",
    committed: "LKR 9.02M",
    actualSpend: "LKR 8.42M",
    remaining: "LKR 3.28M",
    utilizedPercent: 72,
    breakdown: [
      { category: "Paid Media", amount: "LKR 4.12M", percentage: 49, color: "bg-[#800020]" },
      { category: "Messaging", amount: "LKR 1.60M", percentage: 19, color: "bg-[#a31c44]" },
      { category: "Creative & Content", amount: "LKR 1.80M", percentage: 22, color: "bg-[#d94870]" },
      { category: "Partnerships / Other", amount: "LKR 1.35M", percentage: 16, color: "bg-[#f39cb3]" }
    ]
  },
  governance: {
    awaitingApproval: 5,
    consentWarnings: 7,
    frequencyCapExceptions: 3,
    creativePolicyReviews: 2,
    issues: [
      {
        id: "gov-1",
        type: "Approval Required",
        title: "VIP Loyalty Reactivation",
        subtitle: "Campaign scheduled for 13 Aug 2026",
        actionText: "Review",
        severity: "critical"
      },
      {
        id: "gov-2",
        type: "Consent Warning",
        title: "Skincare Retargeting",
        subtitle: "1,264 audience members suppressed",
        actionText: "View",
        severity: "warning"
      },
      {
        id: "gov-3",
        type: "Frequency Cap",
        title: "August SMS Campaign",
        subtitle: "Potential repetitive communication limit exceeded",
        actionText: "Review",
        severity: "warning"
      }
    ]
  },
  upcomingActivity: [
    {
      id: "act-1",
      dayMonth: "18 AUG",
      title: "Haircare Launch — Content Finalisation",
      detail: "Marketing Team",
      timeTag: "Tomorrow"
    },
    {
      id: "act-2",
      dayMonth: "20 AUG",
      title: "VIP Loyalty Reactivation — Approval Deadline",
      detail: "Governance Queue",
      timeTag: "10:00 AM"
    },
    {
      id: "act-3",
      dayMonth: "14 AUG",
      title: "Summer Beauty Festival — Paid Media Expansion",
      detail: "Meta + Google",
      timeTag: "In Progress"
    },
    {
      id: "act-4",
      dayMonth: "16 AUG",
      title: "Summer Beauty Festival — Campaign Ends",
      detail: "Scheduled",
      timeTag: "End of Day"
    },
    {
      id: "act-5",
      dayMonth: "20 AUG",
      title: "September Campaign Planning Review",
      detail: "Executive Board",
      timeTag: "2:00 PM"
    }
  ],
  journeyAlerts: [
    {
      id: "alt-1",
      severity: "High Priority",
      message: "Paid Social CPA increased 28%",
      actionText: "Investigate",
      route: "/admin/marketing/paid-media"
    },
    {
      id: "alt-2",
      severity: "Warning",
      message: "Campaign budget nearing limit",
      actionText: "View Campaign",
      route: "/admin/marketing/campaigns"
    },
    {
      id: "alt-3",
      severity: "Warning",
      message: "Email delivery degradation",
      actionText: "View Channel",
      route: "/admin/marketing/channels"
    },
    {
      id: "alt-4",
      severity: "Information",
      message: "Audience size changed",
      actionText: "View Audience",
      route: "/admin/marketing/audiences"
    }
  ],
  audience: {
    marketable: "1.21M",
    suppressed: "86.4K",
    highValue: "112K",
    recentlyActive: "684K",
    atRisk: "93K",
    segments: [
      { name: "Repeat Enthusiasts", count: "520K" },
      { name: "Premium Skincare Buyers", count: "430K" },
      { name: "New Customers", count: "186K" },
      { name: "Loyalty VIP", count: "62K" },
      { name: "Dormant 90+ Days", count: "97K" }
    ]
  },
  attribution: {
    attributedRevenue: "LKR 31.7M",
    assistedRevenue: "LKR 8.9M",
    influencedOrders: "34,820",
    averageCac: "LKR 242",
    contributions: [
      { channel: "Email", percentage: 38 },
      { channel: "Paid Social", percentage: 28 },
      { channel: "Paid Search", percentage: 18 },
      { channel: "Push", percentage: 12 },
      { channel: "SMS", percentage: 7 },
      { channel: "Web / App", percentage: 5 }
    ]
  },
  linkedPromotions: [
    { campaign: "Summer Beauty Festival", promotion: "20% Off Selected Skincare", status: "Approved" },
    { campaign: "Haircare Launch", promotion: "Haircare Launch Bundle", status: "Approved" },
    { campaign: "Premium Skincare Re-Engagement", promotion: "Free Travel Size Cleanser", status: "Approved" }
  ],
  recentActivity: [
    {
      id: "log-1",
      timestamp: "Aug 14, 10:15 AM",
      action: 'Campaign "Summer Beauty Festival" performance data synced',
      actor: "Marketing Integration Service"
    },
    {
      id: "log-2",
      timestamp: "Aug 14, 08:42 AM",
      action: "VIP Loyalty Reactivation approved",
      actor: "Upeksha Rodrigo"
    },
    {
      id: "log-3",
      timestamp: "Aug 14, 08:30 AM",
      action: "Email channel delivery warning acknowledged",
      actor: "Marketing Operations"
    },
    {
      id: "log-4",
      timestamp: "Aug 13, 06:15 PM",
      action: "Paid Social campaign performance data updated",
      source: "Meta Ads",
      actor: "Integration Service"
    }
  ],
  operationalRail: {
    healthScore: 92,
    healthMetrics: [
      { label: "Campaign Delivery", score: 94 },
      { label: "Audience Health", score: 92 },
      { label: "Consent Compliance", score: 96 },
      { label: "Channel Delivery", score: 92 },
      { label: "Budget Control", score: 90 },
      { label: "Attribution Readiness", score: 93 },
      { label: "Journey Automation", score: 90 },
      { label: "Approval Governance", score: 94 }
    ],
    priorityAlerts: [
      { id: "p1", severity: "Critical", description: "14 critical issues require review" },
      { id: "p2", severity: "High", description: "7 campaign approvals pending" },
      { id: "p3", severity: "High", description: "3 consent breaches at risk of override" },
      { id: "p4", severity: "Medium", description: "5 budget limits pending > 7 days" },
      { id: "p5", severity: "Medium", description: "6 frequency cap exceptions open" },
      { id: "p6", severity: "Low", description: "2 approvals pending > SLA" },
      { id: "p7", severity: "Low", description: "7 channel delivery warnings" },
      { id: "p8", severity: "Info", description: "4 info updates in 5 days (Aug 10-20, 2026)" }
    ],
    campaignSummary: {
      active: 24,
      change: "▲ 3 vs prev. period",
      scheduledNext: 8
    },
    audienceSummary: {
      reach: "1.84M",
      change: "▲ 12.6%",
      suppressed: "86.4K"
    },
    spendSummary: {
      actualSpend: "LKR 8.42M",
      utilizedPercent: 72,
      remaining: "LKR 3.28M"
    },
    attributionSummary: {
      attributedRevenue: "LKR 31.7M",
      change: "▲ 18.4%",
      roas: "3.76x"
    },
    quickOverview: {
      approvals: 15,
      campaigns: 24,
      contentReviews: 18,
      exceptions: 12,
      alerts: 16
    }
  }
};
