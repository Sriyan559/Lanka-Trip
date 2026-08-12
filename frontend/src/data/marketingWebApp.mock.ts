export interface PlacementContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  experienceScope: string;
  catalogueSource: string;
  contentLibrary: string;
  audienceSync: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface PlacementKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  variant: "blue" | "green" | "red" | "neutral";
}

export interface PlacementReadinessCounters {
  healthy: number;
  needsAttention: number;
  contentMissing: number;
  placementConflict: number;
  audienceWarning: number;
  governanceReview: number;
  renderingError: number;
}

export interface PlacementRecord {
  id: string;
  placementName: string;
  placementId: string;
  status: "Active" | "Scheduled" | "Paused" | "Draft" | "Expired";
  surface: "Website" | "Mobile App" | "Website Search" | "Landing Page";
  type:
    | "Hero Banner"
    | "App Home Card"
    | "Category Spotlight"
    | "Search Merchandiser"
    | "Modal"
    | "Landing Hero"
    | "Recommendation Block";
  campaign: string;
  campaignId?: string;
  audience: string;
  content: string;
  device: "Desktop + Mobile" | "iOS + Android" | "Desktop" | "Mobile";
  startDate: string;
  endDate: string;
  priority: number;
  impressions: string;
  engagement: string;
  conversion: string;
  revenueReference: string;
  contentReadiness: "Ready" | "Pending" | "Warning" | "Missing";
  governance: "Clear" | "Review Required" | "Pending";
  lastActivity: string;
}

export interface ExperiencePreviewData {
  desktopImage: string;
  tabletImage: string;
  mobileImage: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
}

export interface PlacementDetailsData {
  type: string;
  surface: string;
  pageLocation: string;
  zone: string;
  campaign: string;
  businessUnit: string;
  region: string;
  status: string;
  startDate: string;
  endDate: string;
  placementId: string;
}

export interface PlacementTargetingData {
  primaryAudience: string;
  audienceSize: string;
  eligibleReach: string;
  suppressed: string;
  personalization: string;
  fallbackForAnonymous: string;
  ruleExample: string;
}

export interface AssignedContentData {
  contentName: string;
  variant: string;
  contentId: string;
  contentStatus: string;
  contentType: string;
  dimensions: string;
  format: string;
}

export interface PlacementScheduleData {
  startDate: string;
  endDate: string;
  timeZone: string;
  activationMode: string;
  fallbackAfter: string;
  fallbackAfterExpiry: string;
  scheduleValid: boolean;
}

export interface MerchandisingRulesData {
  pricingRule: "Valid" | "Warning" | "Invalid";
  campaignPriority: "Valid" | "Warning" | "Invalid";
  productAvailabilityRule: "Valid" | "Warning" | "Invalid";
  inventoryRule: "Valid" | "Warning" | "Invalid";
  complianceRule: "Valid" | "Warning" | "Invalid";
  audienceRule: "Valid" | "Warning" | "Invalid";
  allRulesValid: boolean;
}

export interface MerchandisingReferencesData {
  categories: string[];
  keyProducts: string[];
}

export interface ConflictAnalysisData {
  zoneHierarchy: string;
  highestPriority: number;
  conflictWarning?: string;
  hasConflict: boolean;
}

export interface DeviceReadinessData {
  desktop: "Ready" | "Warning" | "Unsupported" | "N/A";
  tablet: "Ready" | "Warning" | "Unsupported" | "N/A";
  mobileWeb: "Ready" | "Warning" | "Unsupported" | "N/A";
  ios: "Ready" | "Warning" | "Unsupported" | "N/A";
  android: "Ready" | "Warning" | "Unsupported" | "N/A";
  overallReadinessPercent: number;
}

export interface PerformanceTrendPoint {
  date: string;
  impressions: number;
  engagementRate: number;
  conversionRate: number;
}

export interface InteractionFunnelStage {
  stage: string;
  count: string;
  percentage: string;
  widthPercent: number;
}

export interface LandingPageHealthData {
  status: "Healthy" | "Warning" | "Critical";
  loadTime: string;
  mobilePerformance: string;
  brokenLinks: number;
  tracking: string;
  seoMetadata: string;
  accessibility: string;
}

export interface PersonalizationData {
  status: string;
  audienceVariants: number;
  defaultVariant: string;
  enablement: string;
  decisionLatency: string;
  personalizationHealth: string;
}

export interface ExperimentReferenceData {
  experimentName: string;
  status: string;
  variantA: string;
  variantB: string;
  trafficSplit: string;
  primaryMetric: string;
  currentLift: string;
}

export interface PlacementExceptionItem {
  id: string;
  exception: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

export interface GovernanceComplianceData {
  governanceStatus: string;
  approvalStatus: string;
  lastReviewed: string;
  reviewedBy: string;
  dataUsePolicy: string;
  privacyMarking: string;
}

export interface LinkedCampaignData {
  campaignName: string;
  campaignId: string;
}

export interface PlacementActivityItem {
  id: string;
  time: string;
  activity: string;
  actor: string;
}

export interface PlacementVersioningData {
  currentLiveVersion: string;
  publishedOn: string;
  publishedBy: string;
  draftRevision: string;
}

export interface SelectedPlacementDetails {
  placement: PlacementRecord;
  preview: ExperiencePreviewData;
  details: PlacementDetailsData;
  targeting: PlacementTargetingData;
  content: AssignedContentData;
  schedule: PlacementScheduleData;
  merchandisingRules: MerchandisingRulesData;
  merchandisingReferences: MerchandisingReferencesData;
  conflictAnalysis: ConflictAnalysisData;
  deviceReadiness: DeviceReadinessData;
  performanceTrend: PerformanceTrendPoint[];
  funnelStages: InteractionFunnelStage[];
  landingPageHealth: LandingPageHealthData;
  personalization: PersonalizationData;
  experiment: ExperimentReferenceData;
  exceptions: PlacementExceptionItem[];
  governance: GovernanceComplianceData;
  linkedCampaign: LinkedCampaignData;
  recentActivity: PlacementActivityItem[];
  versioning: PlacementVersioningData;
}

export interface ExperienceRailData {
  healthScore: number;
  healthLabel: string;
  placementSummary: {
    total: number;
    active: number;
    scheduled: number;
    draft: number;
    paused: number;
  };
  surfaceSummary: {
    website: number;
    mobileWeb: number;
    ios: number;
    android: number;
    landingPages: number;
  };
  performanceSummary: {
    impressions: string;
    engagementRate: string;
    conversionRate: string;
    revenueReference: string;
  };
  contentReadinessSummary: {
    ready: number;
    pending: number;
    missingContent: number;
    warning: number;
  };
  exceptionsSummary: {
    open: number;
    high: number;
    warning: number;
    informational: number;
  };
  quickQueues: {
    placementConflicts: number;
    renderingErrors: number;
    contentMissing: number;
    governanceReview: number;
    audienceWarnings: number;
  };
}

export interface MarketingWebAppData {
  context: PlacementContextData;
  kpis: PlacementKpiItem[];
  readiness: PlacementReadinessCounters;
  placements: PlacementRecord[];
  selectedPlacementDetails: Record<string, SelectedPlacementDetails>;
  rail: ExperienceRailData;
}

export const MARKETING_WEB_APP_MOCK_DATA: MarketingWebAppData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    experienceScope: "Website + Mobile App",
    catalogueSource: "Connected",
    contentLibrary: "Connected",
    audienceSync: "Healthy",
    dateRange: "Last 30 Days",
    completenessPercent: 97,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    {
      id: "active_campaigns",
      label: "Active Placement Campaigns",
      value: "18",
      trend: "12% vs prev 30 days",
      variant: "blue",
    },
    {
      id: "active_placements",
      label: "Active Placements",
      value: "46",
      trend: "15% vs prev 30 days",
      variant: "blue",
    },
    {
      id: "impressions",
      label: "Impressions",
      value: "12.8M",
      trend: "14.2%",
      variant: "blue",
    },
    {
      id: "engagement_rate",
      label: "Engagement Rate",
      value: "8.7%",
      trend: "0.9 pp",
      variant: "blue",
    },
    {
      id: "conversion_rate",
      label: "Conversion Rate",
      value: "5.2%",
      trend: "0.4 pp",
      variant: "blue",
    },
    {
      id: "revenue_reference",
      label: "Revenue Reference",
      value: "LKR 18.4M",
      trend: "10.1%",
      variant: "green",
    },
    {
      id: "open_exceptions",
      label: "Open Exceptions",
      value: "11",
      trend: "22% vs prev 30 days",
      variant: "red",
    },
    {
      id: "experience_health",
      label: "Experience Health",
      value: "95/100",
      subtext: "Excellent",
      variant: "green",
    },
  ],
  readiness: {
    healthy: 36,
    needsAttention: 5,
    contentMissing: 2,
    placementConflict: 2,
    audienceWarning: 1,
    governanceReview: 2,
    renderingError: 1,
  },
  placements: [
    {
      id: "PLC-2026-0011",
      placementName: "Homepage Hero — Summer Beauty",
      placementId: "PLC-2026-0011",
      status: "Active",
      surface: "Website",
      type: "Hero Banner",
      campaign: "Summer Beauty Festival",
      campaignId: "MKT-2026-0087",
      audience: "All Marketable Customers",
      content: "Summer Beauty Festival Hero v5",
      device: "Desktop + Mobile",
      startDate: "16 Jul 2026",
      endDate: "18 Aug 2026",
      priority: 1,
      impressions: "3.82M",
      engagement: "4.8%",
      conversion: "3.2%",
      revenueReference: "LKR 4.12M",
      contentReadiness: "Ready",
      governance: "Clear",
      lastActivity: "1 min ago",
    },
    {
      id: "PLC-2026-0032",
      placementName: "App Home — Premium Skincare",
      placementId: "PLC-2026-0032",
      status: "Active",
      surface: "Mobile App",
      type: "App Home Card",
      campaign: "Premium Skincare Re-Engagement",
      campaignId: "MKT-2026-0044",
      audience: "Premium Skincare Buyers App Card v2",
      content: "Premium Skincare App Card v2",
      device: "iOS + Android",
      startDate: "14 Jul 2026",
      endDate: "20 Aug 2026",
      priority: 2,
      impressions: "1.04M",
      engagement: "8.4%",
      conversion: "5.9%",
      revenueReference: "LKR 3.36M",
      contentReadiness: "Ready",
      governance: "Clear",
      lastActivity: "2 mins ago",
    },
    {
      id: "PLC-2026-0012",
      placementName: "Category Spotlight — Haircare Launch",
      placementId: "PLC-2026-0012",
      status: "Scheduled",
      surface: "Website",
      type: "Category Spotlight",
      campaign: "Haircare Launch",
      campaignId: "MKT-2026-0091",
      audience: "Haircare Interested Customers",
      content: "Haircare Launch Spotlight v1",
      device: "Desktop + Mobile",
      startDate: "20 Aug 2026",
      endDate: "31 Aug 2026",
      priority: 3,
      impressions: "-",
      engagement: "-",
      conversion: "-",
      revenueReference: "-",
      contentReadiness: "Pending",
      governance: "Clear",
      lastActivity: "15 mins ago",
    },
    {
      id: "PLC-2026-0014",
      placementName: "Search Merchandising — Summer Offers",
      placementId: "PLC-2026-0014",
      status: "Active",
      surface: "Website Search",
      type: "Search Merchandiser",
      campaign: "Summer Offer Campaign",
      campaignId: "MKT-2026-0082",
      audience: "All Shoppers",
      content: "Summer Offers Search Results v2",
      device: "Desktop + Mobile",
      startDate: "12 Jul 2026",
      endDate: "31 Aug 2026",
      priority: 2,
      impressions: "1.26M",
      engagement: "7.2%",
      conversion: "4.1%",
      revenueReference: "LKR 2.45M",
      contentReadiness: "Ready",
      governance: "Clear",
      lastActivity: "3 mins ago",
    },
    {
      id: "PLC-2026-0035",
      placementName: "App Modal — Loyalty VIP",
      placementId: "PLC-2026-0035",
      status: "Paused",
      surface: "Mobile App",
      type: "Modal",
      campaign: "Loyalty VIP Program",
      campaignId: "MKT-2026-0019",
      audience: "VIP Customers",
      content: "VIP Exclusive Model v1",
      device: "iOS + Android",
      startDate: "05 Jul 2026",
      endDate: "31 Jul 2026",
      priority: 1,
      impressions: "454K",
      engagement: "6.1%",
      conversion: "2.2%",
      revenueReference: "LKR 0.98M",
      contentReadiness: "Ready",
      governance: "Review Required",
      lastActivity: "1 hr ago",
    },
    {
      id: "PLC-2026-0016",
      placementName: "Landing Hero — Acquisition Meta",
      placementId: "PLC-2026-0016",
      status: "Active",
      surface: "Landing Page",
      type: "Hero Banner",
      campaign: "Acquisition Meta Campaign",
      campaignId: "MKT-2026-0055",
      audience: "New Visitors",
      content: "Acquisition Hero LP v4",
      device: "Desktop + Mobile",
      startDate: "10 Jul 2026",
      endDate: "25 Aug 2026",
      priority: 2,
      impressions: "892K",
      engagement: "5.6%",
      conversion: "2.8%",
      revenueReference: "LKR 1.97M",
      contentReadiness: "Warning",
      governance: "Clear",
      lastActivity: "9 mins ago",
    },
  ],
  selectedPlacementDetails: {
    "PLC-2026-0011": {
      placement: {
        id: "PLC-2026-0011",
        placementName: "Homepage Hero — Summer Beauty",
        placementId: "PLC-2026-0011",
        status: "Active",
        surface: "Website",
        type: "Hero Banner",
        campaign: "Summer Beauty Festival",
        campaignId: "MKT-2026-0087",
        audience: "All Marketable Customers",
        content: "Summer Beauty Festival Hero v5",
        device: "Desktop + Mobile",
        startDate: "16 Jul 2026",
        endDate: "18 Aug 2026",
        priority: 1,
        impressions: "3.82M",
        engagement: "4.8%",
        conversion: "3.2%",
        revenueReference: "LKR 4.12M",
        contentReadiness: "Ready",
        governance: "Clear",
        lastActivity: "1 min ago",
      },
      preview: {
        desktopImage: "/images/hero-preview-desktop.jpg",
        tabletImage: "/images/hero-preview-tablet.jpg",
        mobileImage: "/images/hero-preview-mobile.jpg",
        heroTitle: "Glow Into Summer Beauty",
        heroSubtitle: "Discover radiant skin with our summer essentials.",
        ctaText: "SHOP NOW",
      },
      details: {
        type: "Hero Banner",
        surface: "Website",
        pageLocation: "Homepage",
        zone: "Hero",
        campaign: "Summer Beauty Festival",
        businessUnit: "Beauty Marketplace",
        region: "Sri Lanka",
        status: "Active",
        startDate: "16 Jul 2026",
        endDate: "18 Aug 2026",
        placementId: "PLC-2026-0011",
      },
      targeting: {
        primaryAudience: "All Marketable Customers",
        audienceSize: "1.21M",
        eligibleReach: "1.08M",
        suppressed: "84.6K",
        personalization: "Enabled",
        fallbackForAnonymous: "Default Hero",
        ruleExample: "IF Premium Skincare Buyers THEN Version B ELSE Default Hero",
      },
      content: {
        contentName: "Summer Beauty Festival Hero v5",
        variant: "Version A (Live)",
        contentId: "CNT-3929-7712",
        contentStatus: "Published",
        contentType: "Hero Creative",
        dimensions: "1920 x 640",
        format: "Image",
      },
      schedule: {
        startDate: "16 Jul 2026",
        endDate: "18 Aug 2026",
        timeZone: "Asia/Colombo",
        activationMode: "Scheduled",
        fallbackAfter: "Live",
        fallbackAfterExpiry: "Default Homepage Hero",
        scheduleValid: true,
      },
      merchandisingRules: {
        pricingRule: "Valid",
        campaignPriority: "Valid",
        productAvailabilityRule: "Valid",
        inventoryRule: "Valid",
        complianceRule: "Valid",
        audienceRule: "Valid",
        allRulesValid: true,
      },
      merchandisingReferences: {
        categories: ["Skincare", "Sunscreen"],
        keyProducts: ["SPF50 Daily Shield", "Vitamin C Serum"],
      },
      conflictAnalysis: {
        zoneHierarchy: "Homepage > Hero > Slot 1",
        highestPriority: 1,
        conflictWarning: "Top priority campaign overlap between 7-18 Aug",
        hasConflict: true,
      },
      deviceReadiness: {
        desktop: "Ready",
        tablet: "Ready",
        mobileWeb: "Ready",
        ios: "N/A",
        android: "N/A",
        overallReadinessPercent: 100,
      },
      performanceTrend: [
        { date: "Jul 16", impressions: 320, engagementRate: 4.2, conversionRate: 2.9 },
        { date: "Jul 23", impressions: 580, engagementRate: 4.5, conversionRate: 3.0 },
        { date: "Jul 30", impressions: 890, engagementRate: 4.7, conversionRate: 3.1 },
        { date: "Aug 06", impressions: 1240, engagementRate: 4.8, conversionRate: 3.2 },
        { date: "Aug 13", impressions: 1420, engagementRate: 4.8, conversionRate: 3.2 },
      ],
      funnelStages: [
        { stage: "Impressions", count: "3.82M", percentage: "100%", widthPercent: 100 },
        { stage: "Engaged", count: "1.96M", percentage: "51.3%", widthPercent: 51 },
        { stage: "Click", count: "1.21M", percentage: "31.7%", widthPercent: 32 },
        { stage: "Product Viewed", count: "642K", percentage: "16.8%", widthPercent: 17 },
        { stage: "Added to Cart", count: "382K", percentage: "10.0%", widthPercent: 10 },
        { stage: "Converted (Orders)", count: "122K", percentage: "3.2%", widthPercent: 3 },
      ],
      landingPageHealth: {
        status: "Healthy",
        loadTime: "1.7 sec",
        mobilePerformance: "96/100",
        brokenLinks: 0,
        tracking: "Healthy",
        seoMetadata: "Complete",
        accessibility: "Pass",
      },
      personalization: {
        status: "Enabled",
        audienceVariants: 4,
        defaultVariant: "Version A",
        enablement: "100%",
        decisionLatency: "42 ms",
        personalizationHealth: "99%",
      },
      experiment: {
        experimentName: "Hero CTA Test",
        status: "Running",
        variantA: "Existing CTA",
        variantB: "Explore Summer Beauty",
        trafficSplit: "50% / 50%",
        primaryMetric: "CTR",
        currentLift: "+8.4%",
      },
      exceptions: [
        { id: "e1", exception: "Pricing Collision", severity: "High" },
        { id: "e2", exception: "Missing Mobile Variant", severity: "High" },
        { id: "e3", exception: "Rendering Error", severity: "High" },
        { id: "e4", exception: "Audience Sync Delay", severity: "Medium" },
      ],
      governance: {
        governanceStatus: "Clear",
        approvalStatus: "Approved",
        lastReviewed: "14 Aug 2026",
        reviewedBy: "M. Fernando",
        dataUsePolicy: "Compliant",
        privacyMarking: "Clear",
      },
      linkedCampaign: {
        campaignName: "Summer Beauty Festival",
        campaignId: "MKT-2026-0087",
      },
      recentActivity: [
        {
          id: "act-1",
          time: "13 Aug 2026 09:42 AM",
          activity: "Content updated to v5 by M. Fernando",
          actor: "M. Fernando",
        },
        {
          id: "act-2",
          time: "12 Aug 2026 02:10 PM",
          activity: "Schedule modified by A. Perera",
          actor: "A. Perera",
        },
        {
          id: "act-3",
          time: "11 Aug 2026 11:00 AM",
          activity: "Audience rule updated by J. Silva",
          actor: "J. Silva",
        },
      ],
      versioning: {
        currentLiveVersion: "v5 (Published)",
        publishedOn: "13 Aug 2026",
        publishedBy: "M. Fernando",
        draftRevision: "None",
      },
    },
  },
  rail: {
    healthScore: 95,
    healthLabel: "Excellent",
    placementSummary: {
      total: 64,
      active: 46,
      scheduled: 8,
      draft: 6,
      paused: 4,
    },
    surfaceSummary: {
      website: 28,
      mobileWeb: 12,
      ios: 9,
      android: 9,
      landingPages: 6,
    },
    performanceSummary: {
      impressions: "12.8M",
      engagementRate: "8.7%",
      conversionRate: "5.2%",
      revenueReference: "LKR 18.4M",
    },
    contentReadinessSummary: {
      ready: 12,
      pending: 2,
      missingContent: 4,
      warning: 1,
    },
    exceptionsSummary: {
      open: 11,
      high: 3,
      warning: 6,
      informational: 2,
    },
    quickQueues: {
      placementConflicts: 2,
      renderingErrors: 1,
      contentMissing: 2,
      governanceReview: 2,
      audienceWarnings: 1,
    },
  },
};
