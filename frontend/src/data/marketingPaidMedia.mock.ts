export interface PaidMediaContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  mediaScope: string;
  adPlatforms: string;
  audienceSync: string;
  audienceActivationSync: string;
  attributionSync: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface PaidMediaKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  variant: "blue" | "green" | "red" | "neutral";
}

export interface PaidMediaReadinessCounters {
  healthy: number;
  needsAttention: number;
  budgetRisk: number;
  deliveryWarning: number;
  creativeIssue: number;
  trackingWarning: number;
  platformPolicyIssue: number;
  syncFailure: number;
}

export interface PaidMediaRecord {
  id: string;
  paidCampaign: string;
  mediaId: string;
  status: "Active" | "Scheduled" | "Paused" | "Limited" | "Draft" | "Completed";
  platform: "Meta Ads" | "Google Ads" | "TikTok Ads" | "LinkedIn";
  adAccount: string;
  objective: "Sales" | "Awareness" | "Conversions" | "Leads" | "Traffic";
  linkedMarketingCampaign: string;
  campaignId?: string;
  audience: string;
  creativeSet: string;
  startDate: string;
  endDate: string;
  budget: string;
  spend: string;
  pacingPercent: number;
  impressions: string;
  clicks: string;
  ctr: string;
  conversions: string;
  cpa: string;
  roasReference: string;
  deliveryHealth: "Healthy" | "Warning" | "Limited" | "Critical";
  tracking: "Healthy" | "Warning" | "Partial" | "Broken";
  governance: "Clear" | "Review Required" | "Pending";
  lastSync: string;
}

export interface TrendPoint {
  date: string;
  value1: number;
  value2?: number;
}

export interface SelectedPaidCampaignDetails {
  campaign: PaidMediaRecord;
  summaryMetrics: {
    budget: string;
    spend: string;
    impressions: string;
    clicks: string;
    ctr: string;
    conversions: string;
    cpa: string;
    roasReference: string;
  };
  details: {
    status: string;
    platform: string;
    objective: string;
    mediaId: string;
    adAccount: string;
    startDate: string;
    endDate: string;
  };
  platformConnection: {
    apiHealthPercent: number;
    syncStatus: string;
    connectionHealth: string;
    lastSync: string;
  };
  audienceActivation: {
    matchRatePercent: number;
    activationStatus: string;
    audienceSync: string;
    sparkData: number[];
  };
  creativeReadiness: {
    readinessPercent: number;
    approvedAssets: number;
    rejectedAssets: number;
    missingAssets: number;
  };
  spendPacing: {
    utilizationPercent: number;
    budget: string;
    spend: string;
    trendData: TrendPoint[];
  };
  deliveryPerformance: {
    ctrPercent: string;
    impressions: string;
    clicks: string;
    trendData: TrendPoint[];
  };
  acquisitionPerformance: {
    cac: string;
    cpa: string;
    conversions: string;
    conversionRate: string;
    barData: TrendPoint[];
  };
  revenueRoasReference: {
    roasReference: string;
    attributedRevenueReference: string;
  };
  trackingMeasurement: {
    trackingHealthPercent: number;
    pixelTagStatus: string;
    eventCoverage: string;
    conversionTracking: string;
    utmIntegrity: string;
    eventActivityData: number[];
  };
  biddingOptimization: {
    currentCpa: string;
    bidStrategy: string;
    targetCpa: string;
    optimizationGoal: string;
    learningStatus: string;
  };
  platformPolicy: {
    policyStatus: string;
    reviewStatus: string;
    rejectedAds: number;
    restrictedCategories: string;
    policyWarnings: number;
  };
  platformReconciliation: {
    spendVariancePercent: string;
    impressionVariancePercent: string;
    conversionVariancePercent: string;
    lastReconciled: string;
    reconciliationHealth: string;
  };
  activeExceptions: {
    openExceptions: number;
    critical: number;
    high: number;
    medium: number;
  };
  linkedMarketingCampaign: {
    campaignName: string;
    campaignId: string;
    lifecycleStatus: string;
  };
  linkedAudiences: {
    countLabel: string;
    primaryAudience: string;
    audienceSize: string;
  };
  linkedCreative: {
    countLabel: string;
    creativeSetName: string;
  };
  accountHealth: {
    statusLabel: string;
    primaryAccount: string;
    accountStatus: string;
    paymentStatus: string;
  };
  governance: {
    governanceHealthPercent: number;
    approvalStatus: string;
    policyCompliance: string;
    businessRestrictions: string;
  };
  recentActivity: {
    activityCountLabel: string;
    latestActivity: string;
    timestamp: string;
    actor: string;
  };
  configuration: {
    version: string;
    configStatus: string;
    lastModified: string;
    publishedBy: string;
  };
}

export interface PaidMediaRailData {
  healthScore: number;
  healthLabel: string;
  healthDimensions: {
    platformConnectivity: number;
    audienceActivation: number;
    creativeReadiness: number;
    budgetPacing: number;
    trackingHealth: number;
    acquisitionEfficiency: number;
    governance: number;
  };
  campaignSummary: {
    total: number;
    active: number;
    scheduled: number;
    paused: number;
    limited: number;
  };
  spendSummary: {
    budget: string;
    spend: string;
    remaining: string;
    pacingPercent: number;
  };
  platformSummary: Array<{
    name: string;
    spend: string;
    percent: number;
    barColor: string;
  }>;
  acquisitionSummary: {
    newCustomers: string;
    avgCac: string;
    conversions: string;
    avgConvRate: string;
  };
  performanceSummary: {
    impressions: string;
    clicks: string;
    ctr: string;
    roasReference: string;
  };
  exceptionsSummary: {
    open: number;
    critical: number;
    high: number;
    warning: number;
    informational: number;
  };
  quickQueues: {
    budgetRisk: number;
    deliveryWarnings: number;
    creativeIssues: number;
    trackingWarnings: number;
    policyIssues: number;
    syncFailures: number;
  };
}

export interface MarketingPaidMediaData {
  context: PaidMediaContextData;
  kpis: PaidMediaKpiItem[];
  readiness: PaidMediaReadinessCounters;
  campaigns: PaidMediaRecord[];
  selectedCampaignDetails: Record<string, SelectedPaidCampaignDetails>;
  rail: PaidMediaRailData;
}

export const MARKETING_PAID_MEDIA_MOCK_DATA: MarketingPaidMediaData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    mediaScope: "All Paid Media",
    adPlatforms: "Connected",
    audienceSync: "Healthy",
    audienceActivationSync: "Healthy",
    attributionSync: "Healthy",
    dateRange: "Last 30 Days",
    completenessPercent: 97,
    lastSynced: "Aug 14, 2025 10:15 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    {
      id: "active_campaigns",
      label: "Active Paid Campaigns",
      value: "21",
      variant: "blue",
    },
    {
      id: "media_spend",
      label: "Media Spend",
      value: "LKR 8.42M",
      subtext: "72% of allocated media budget",
      variant: "blue",
    },
    {
      id: "impressions",
      label: "Impressions",
      value: "28.6M",
      variant: "blue",
    },
    {
      id: "clicks",
      label: "Clicks",
      value: "842K",
      subtext: "CTR 2.94%",
      variant: "blue",
    },
    {
      id: "conversions",
      label: "Conversions",
      value: "28,416",
      variant: "green",
    },
    {
      id: "avg_cpa",
      label: "Average CPA",
      value: "LKR 296",
      subtext: "Target LKR 320",
      variant: "green",
    },
    {
      id: "attributed_revenue",
      label: "Attributed Revenue Reference",
      value: "LKR 31.7M",
      variant: "green",
    },
    {
      id: "paid_media_health",
      label: "Paid Media Health",
      value: "92 /100",
      variant: "green",
    },
  ],
  readiness: {
    healthy: 14,
    needsAttention: 6,
    budgetRisk: 3,
    deliveryWarning: 2,
    creativeIssue: 2,
    trackingWarning: 1,
    platformPolicyIssue: 2,
    syncFailure: 1,
  },
  campaigns: [
    {
      id: "MED-0306-001",
      paidCampaign: "Summer Beauty Acquisition — Meta",
      mediaId: "MED-0306-001",
      status: "Active",
      platform: "Meta Ads",
      adAccount: "SL Beauty Sri Lanka",
      objective: "Sales",
      linkedMarketingCampaign: "Summer Beauty Festival",
      campaignId: "MKT-2026-0087",
      audience: "Beauty Enthusiasts",
      creativeSet: "Summer Paid Social Set v1",
      startDate: "16 Jul 2025",
      endDate: "16 Aug 2025",
      budget: "LKR 2.60M",
      spend: "LKR 2.10M",
      pacingPercent: 81,
      impressions: "8.4M",
      clicks: "264K",
      ctr: "3.14%",
      conversions: "9,842",
      cpa: "LKR 213",
      roasReference: "4.3x",
      deliveryHealth: "Healthy",
      tracking: "Healthy",
      governance: "Clear",
      lastSync: "2 mins ago",
    },
    {
      id: "MED-0306-004",
      paidCampaign: "Premium Skincare Retargeting — Meta",
      mediaId: "MED-0306-004",
      status: "Active",
      platform: "Meta Ads",
      adAccount: "SL Beauty Sri Lanka",
      objective: "Sales",
      linkedMarketingCampaign: "Premium Skincare Re-Engagement",
      campaignId: "MKT-2026-0044",
      audience: "Premium Skincare Retargeting",
      creativeSet: "Retargeting Set v3",
      startDate: "10 Jul 2025",
      endDate: "20 Aug 2025",
      budget: "LKR 1.50M",
      spend: "LKR 1.18M",
      pacingPercent: 86,
      impressions: "9.2M",
      clicks: "184K",
      ctr: "2.00%",
      conversions: "5,128",
      cpa: "LKR 230",
      roasReference: "5.1x",
      deliveryHealth: "Healthy",
      tracking: "Healthy",
      governance: "Clear",
      lastSync: "3 mins ago",
    },
    {
      id: "MED-0306-003",
      paidCampaign: "Summer Beauty Search — Google",
      mediaId: "MED-0306-003",
      status: "Active",
      platform: "Google Ads",
      adAccount: "SL Beauty Sri Lanka",
      objective: "Sales",
      linkedMarketingCampaign: "Summer Beauty Search",
      campaignId: "MKT-2026-0082",
      audience: "High Intent Shoppers",
      creativeSet: "Search Ad Group v2",
      startDate: "12 Jul 2025",
      endDate: "31 Aug 2025",
      budget: "LKR 1.80M",
      spend: "LKR 1.45M",
      pacingPercent: 81,
      impressions: "4.6M",
      clicks: "78K",
      ctr: "1.70%",
      conversions: "2,945",
      cpa: "LKR 492",
      roasReference: "3.0x",
      deliveryHealth: "Warning",
      tracking: "Healthy",
      governance: "Clear",
      lastSync: "4 mins ago",
    },
    {
      id: "MED-0306-002",
      paidCampaign: "New Customer Acquisition — Meta",
      mediaId: "MED-0306-002",
      status: "Active",
      platform: "Meta Ads",
      adAccount: "SL Beauty Sri Lanka",
      objective: "Sales",
      linkedMarketingCampaign: "New Customer Acquisition",
      campaignId: "MKT-2026-0055",
      audience: "Lookalike 1% — Buyers",
      creativeSet: "Prospecting Set v2",
      startDate: "14 Jul 2025",
      endDate: "12 Aug 2025",
      budget: "LKR 1.20M",
      spend: "LKR 0.96M",
      pacingPercent: 80,
      impressions: "3.6M",
      clicks: "102K",
      ctr: "2.83%",
      conversions: "2,412",
      cpa: "LKR 398",
      roasReference: "3.4x",
      deliveryHealth: "Healthy",
      tracking: "Healthy",
      governance: "Clear",
      lastSync: "5 mins ago",
    },
    {
      id: "MED-0306-006",
      paidCampaign: "Haircare Launch Awareness — TikTok",
      mediaId: "MED-0306-006",
      status: "Scheduled",
      platform: "TikTok Ads",
      adAccount: "SL Beauty Sri Lanka",
      objective: "Awareness",
      linkedMarketingCampaign: "Haircare Launch Campaign",
      campaignId: "MKT-2026-0091",
      audience: "Beauty Enthusiasts",
      creativeSet: "Launch Video Set v1",
      startDate: "18 Aug 2025",
      endDate: "15 Sep 2025",
      budget: "LKR 0.80M",
      spend: "LKR 0",
      pacingPercent: 0,
      impressions: "0",
      clicks: "0",
      ctr: "0%",
      conversions: "0",
      cpa: "-",
      roasReference: "-",
      deliveryHealth: "Healthy",
      tracking: "Healthy",
      governance: "Clear",
      lastSync: "1 min ago",
    },
    {
      id: "MED-0306-009",
      paidCampaign: "VIP Loyalty Retargeting — Meta",
      mediaId: "MED-0306-009",
      status: "Limited",
      platform: "Meta Ads",
      adAccount: "SL Beauty Sri Lanka",
      objective: "Sales",
      linkedMarketingCampaign: "VIP Loyalty Program",
      campaignId: "MKT-2026-0019",
      audience: "VIP Members",
      creativeSet: "Loyalty Set v1",
      startDate: "01 Aug 2025",
      endDate: "31 Aug 2025",
      budget: "LKR 450K",
      spend: "LKR 120K",
      pacingPercent: 27,
      impressions: "380K",
      clicks: "9.2K",
      ctr: "2.42%",
      conversions: "89",
      cpa: "LKR 1.35K",
      roasReference: "1.2x",
      deliveryHealth: "Limited",
      tracking: "Warning",
      governance: "Clear",
      lastSync: "6 mins ago",
    },
  ],
  selectedCampaignDetails: {
    "MED-0306-001": {
      campaign: {
        id: "MED-0306-001",
        paidCampaign: "Summer Beauty Acquisition — Meta",
        mediaId: "MED-0306-001",
        status: "Active",
        platform: "Meta Ads",
        adAccount: "SL Beauty Sri Lanka",
        objective: "Sales",
        linkedMarketingCampaign: "Summer Beauty Festival",
        campaignId: "MKT-2026-0087",
        audience: "Beauty Enthusiasts",
        creativeSet: "Summer Paid Social Set v1",
        startDate: "16 Jul 2025",
        endDate: "16 Aug 2025",
        budget: "LKR 2.60M",
        spend: "LKR 2.10M",
        pacingPercent: 81,
        impressions: "8.4M",
        clicks: "264K",
        ctr: "3.14%",
        conversions: "9,842",
        cpa: "LKR 213",
        roasReference: "4.3x",
        deliveryHealth: "Healthy",
        tracking: "Healthy",
        governance: "Clear",
        lastSync: "2 mins ago",
      },
      summaryMetrics: {
        budget: "LKR 2.60M",
        spend: "LKR 2.10M",
        impressions: "8.4M",
        clicks: "264K",
        ctr: "3.14%",
        conversions: "9,842",
        cpa: "LKR 213",
        roasReference: "4.3x",
      },
      details: {
        status: "Active",
        platform: "Meta Ads",
        objective: "Sales",
        mediaId: "MED-0306-001",
        adAccount: "SL Beauty Sri Lanka",
        startDate: "16 Jul 2025",
        endDate: "16 Aug 2025",
      },
      platformConnection: {
        apiHealthPercent: 99.8,
        syncStatus: "Synced",
        connectionHealth: "Healthy",
        lastSync: "2 mins ago",
      },
      audienceActivation: {
        matchRatePercent: 89,
        activationStatus: "Active",
        audienceSync: "Healthy",
        sparkData: [40, 55, 70, 82, 89],
      },
      creativeReadiness: {
        readinessPercent: 100,
        approvedAssets: 12,
        rejectedAssets: 0,
        missingAssets: 0,
      },
      spendPacing: {
        utilizationPercent: 81,
        budget: "LKR 2.60M",
        spend: "LKR 2.10M",
        trendData: [
          { date: "Jul 16", value1: 200, value2: 180 },
          { date: "Jul 23", value1: 500, value2: 460 },
          { date: "Jul 30", value1: 1100, value2: 1020 },
          { date: "Aug 06", value1: 1800, value2: 1650 },
          { date: "Aug 13", value1: 2600, value2: 2100 },
        ],
      },
      deliveryPerformance: {
        ctrPercent: "3.14%",
        impressions: "8.4M",
        clicks: "264K",
        trendData: [
          { date: "Jul 16", value1: 2.8, value2: 12 },
          { date: "Jul 23", value1: 2.9, value2: 28 },
          { date: "Jul 30", value1: 3.1, value2: 45 },
          { date: "Aug 06", value1: 3.14, value2: 68 },
          { date: "Aug 13", value1: 3.14, value2: 85 },
        ],
      },
      acquisitionPerformance: {
        cac: "LKR 338",
        cpa: "LKR 213",
        conversions: "9,842",
        conversionRate: "3.72%",
        barData: [
          { date: "W1", value1: 1800 },
          { date: "W2", value1: 2400 },
          { date: "W3", value1: 2900 },
          { date: "W4", value1: 2742 },
        ],
      },
      revenueRoasReference: {
        roasReference: "4.30x",
        attributedRevenueReference: "LKR 9.03M",
      },
      trackingMeasurement: {
        trackingHealthPercent: 97,
        pixelTagStatus: "Active",
        eventCoverage: "100%",
        conversionTracking: "Healthy",
        utmIntegrity: "Pass",
        eventActivityData: [60, 75, 80, 90, 97],
      },
      biddingOptimization: {
        currentCpa: "LKR 213",
        bidStrategy: "Lowest Cost",
        targetCpa: "LKR 250",
        optimizationGoal: "Conversions",
        learningStatus: "Completed",
      },
      platformPolicy: {
        policyStatus: "Clear",
        reviewStatus: "Approved",
        rejectedAds: 0,
        restrictedCategories: "None",
        policyWarnings: 0,
      },
      platformReconciliation: {
        spendVariancePercent: "0.1%",
        impressionVariancePercent: "0.05%",
        conversionVariancePercent: "0.02%",
        lastReconciled: "Today 09:00 AM",
        reconciliationHealth: "Reconciled",
      },
      activeExceptions: {
        openExceptions: 2,
        critical: 0,
        high: 1,
        medium: 1,
      },
      linkedMarketingCampaign: {
        campaignName: "Summer Beauty Festival",
        campaignId: "MKT-2026-0087",
        lifecycleStatus: "Active",
      },
      linkedAudiences: {
        countLabel: "3 Linked",
        primaryAudience: "Beauty Enthusiasts",
        audienceSize: "840K",
      },
      linkedCreative: {
        countLabel: "12 Assets",
        creativeSetName: "Summer Paid Social Set v1",
      },
      accountHealth: {
        statusLabel: "3 Healthy / 1 Warning",
        primaryAccount: "SL Beauty Sri Lanka",
        accountStatus: "Active",
        paymentStatus: "Good Standing",
      },
      governance: {
        governanceHealthPercent: 96,
        approvalStatus: "Approved",
        policyCompliance: "Compliant",
        businessRestrictions: "None",
      },
      recentActivity: {
        activityCountLabel: "6 New Activities",
        latestActivity: "Spend pacing adjusted to 81% by M. Fernando",
        timestamp: "14 Aug 2025 09:12 AM",
        actor: "M. Fernando",
      },
      configuration: {
        version: "Version v8",
        configStatus: "Published",
        lastModified: "14 Aug 2025",
        publishedBy: "M. Fernando",
      },
    },
  },
  rail: {
    healthScore: 92,
    healthLabel: "Excellent",
    healthDimensions: {
      platformConnectivity: 97,
      audienceActivation: 92,
      creativeReadiness: 96,
      budgetPacing: 81,
      trackingHealth: 91,
      acquisitionEfficiency: 90,
      governance: 94,
    },
    campaignSummary: {
      total: 48,
      active: 21,
      scheduled: 6,
      paused: 3,
      limited: 10,
    },
    spendSummary: {
      budget: "LKR 11.70M",
      spend: "LKR 8.42M",
      remaining: "LKR 3.28M",
      pacingPercent: 72,
    },
    platformSummary: [
      { name: "Meta", spend: "LKR 3.12M", percent: 37, barColor: "#2563eb" },
      { name: "Google", spend: "LKR 2.64M", percent: 31, barColor: "#ea580c" },
      { name: "TikTok", spend: "LKR 1.61M", percent: 19, barColor: "#0f172a" },
      { name: "LinkedIn / Other", spend: "LKR 1.05M", percent: 13, barColor: "#0284c7" },
    ],
    acquisitionSummary: {
      newCustomers: "24.5K",
      avgCac: "LKR 296",
      conversions: "28.4K",
      avgConvRate: "3.11%",
    },
    performanceSummary: {
      impressions: "28.6M",
      clicks: "842K",
      ctr: "2.94%",
      roasReference: "3.76x",
    },
    exceptionsSummary: {
      open: 16,
      critical: 1,
      high: 4,
      warning: 8,
      informational: 3,
    },
    quickQueues: {
      budgetRisk: 3,
      deliveryWarnings: 2,
      creativeIssues: 2,
      trackingWarnings: 1,
      policyIssues: 2,
      syncFailures: 1,
    },
  },
};
