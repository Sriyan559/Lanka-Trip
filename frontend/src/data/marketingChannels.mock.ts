export interface ChannelContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  channelScope: string;
  messagingGateway: string;
  consentSync: string;
  providerSync: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface ChannelKpiItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  variant: "blue" | "green" | "red" | "orange";
}

export interface ChannelReadinessCounters {
  healthy: number;
  warning: number;
  degraded: number;
  disconnected: number;
  senderVerificationIssue: number;
  providerWarning: number;
  queueDelay: number;
}

export interface ChannelRecord {
  id: string;
  channelName: string;
  channelId: string;
  type: "Email" | "SMS" | "Push" | "WhatsApp" | "Web-Push" | "Other";
  status: "Healthy" | "Warning" | "Degraded" | "Disconnected";
  provider: string;
  businessUnit: string;
  market: string;
  senderAccount: string;
  consentScope: string;
  messages30D: string;
  deliveryRate: string;
  engagement: string;
  failureRate: string;
  suppressionRate: string;
  queue: string;
  providerSync: "Healthy" | "Warning" | "Degraded" | "Disconnected";
  governance: "Compliant" | "Non-Compliant" | "Under Review";
  lastActivity: string;
  iconType?: string;
}

export interface ProviderConnectionDetails {
  provider: string;
  connectionStatus: string;
  credentialStatus: string; // Must NEVER reveal secrets (e.g. "Valid")
  oauthTokenStatus: string;
  lastValidated: string;
  rotationDue: string;
  ipAllowlist: string;
  dataResidency: string;
}

export interface SenderIdentityDetails {
  fromName: string;
  fromDomain: string;
  fromEmail: string;
  replyTo: string;
  returnPathDomain: string;
  spf: "Pass" | "Fail" | "Warning";
  dkim: "Pass" | "Fail" | "Warning";
  dmarc: "Pass" | "Fail" | "Warning";
  domainReputation: "Good" | "Fair" | "Poor";
}

export interface DeliveryTrendPoint {
  date: string;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
}

export interface DeliveryPerformanceDetails {
  deliveryRate: string;
  deliveryRateTrend: string;
  openRate: string;
  openRateTrend: string;
  clickRate: string;
  clickRateTrend: string;
  bounceRate: string;
  bounceRateTrend: string;
  complaintRate: string;
  complaintRateTrend: string;
  trendData: DeliveryTrendPoint[];
}

export interface DeliveryFailuresDetails {
  hardBounce: string;
  softBounce: string;
  suppressed: string;
  blocked: string;
  spamComplaint: string;
  invalidAddress: string;
  other: string;
}

export interface ChannelSuppressionItem {
  category: string;
  count: string;
  percentage: string;
}

export interface ChannelSuppressionsDetails {
  totalSuppressions: string;
  items: ChannelSuppressionItem[];
}

export interface DeliveryQueueDetails {
  waiting: string;
  processing: string;
  delayed: string;
  failed: string;
}

export interface RoutingFallbackDetails {
  primaryChannel: string;
  fallback1: string;
  fallback2: string;
  fallback3: string;
  routingPolicy: string;
  autoFailover: string;
}

export interface LimitsFrequencyDetails {
  dailySendTotal: string;
  dailySendToday: string;
  dailySendPercent: string;
  healthyThrottle: string;
  cooldownWindow: string;
  frequencyCap: string;
  burstCap: string;
}

export interface EligibilityConsentDetails {
  consentModel: string;
  consentMethod: string;
  lastConsentSync: string;
  eligibleAudience: string;
  suppressedAudience: string;
  consentCompliance: string;
}

export interface CampaignUsageDetails {
  activeCampaigns: number;
  messagesToday: string;
  percentDailyLimitUsed: string;
  topCampaign: string;
  nextScheduled: string;
}

export interface JourneyUsageDetails {
  activeJourneys: number;
  messagesToday: string;
  topJourney: string;
  enrolmentRate: string;
  nextScheduled: string;
}

export interface MessageContentDetails {
  templates: number;
  contentAssets: string;
  lastUpdated: string;
  approvalRequired: number;
}

export interface GovernanceComplianceDetails {
  policyCompliance: string;
  dataHandling: string;
  auditLogging: string;
  lastAudit: string;
}

export interface ChannelExceptionsDetails {
  openExceptions: number;
  severity: string;
  lastException: string;
}

export interface ProviderHealthDetails {
  apiHealth: string;
  latencyP95: string;
  uptime30D: string;
  incidents30D: number;
}

export interface ChannelActivityItem {
  id: string;
  time: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  summary: string;
  status: "Investigating" | "Open" | "Monitoring" | "Resolved";
  owner: string;
}

export interface SelectedChannelDetails {
  channel: ChannelRecord;
  providerConnection: ProviderConnectionDetails;
  senderIdentity: SenderIdentityDetails;
  deliveryPerformance: DeliveryPerformanceDetails;
  deliveryFailures: DeliveryFailuresDetails;
  channelSuppressions: ChannelSuppressionsDetails;
  deliveryQueue: DeliveryQueueDetails;
  routingFallback: RoutingFallbackDetails;
  limitsFrequency: LimitsFrequencyDetails;
  eligibilityConsent: EligibilityConsentDetails;
  campaignUsage: CampaignUsageDetails;
  journeyUsage: JourneyUsageDetails;
  messageContent: MessageContentDetails;
  governanceCompliance: GovernanceComplianceDetails;
  activeExceptions: ChannelExceptionsDetails;
  providerHealth: ProviderHealthDetails;
  recentActivity: ChannelActivityItem[];
}

export interface ChannelRailScoreMetric {
  name: string;
  score: number;
}

export interface ChannelRailData {
  healthScore: number;
  updatedTime: string;
  healthMetrics: ChannelRailScoreMetric[];
  channelSummary: {
    totalChannels: number;
    owned: number;
    referenceOutside: number;
    healthy: number;
    warning: number;
    degraded: number;
    disconnected: number;
  };
  deliverySummary: {
    messagesSent: string;
    deliveryRate: string;
    engagementRate: string;
    failedDeliveries: string;
  };
  messagingSummary: {
    messagesSent: string;
    openRate: string;
    clickRate: string;
    bounceRate: string;
    complaintRate: string;
  };
  queueSummary: {
    waiting: string;
    processing: string;
    delayed: string;
    failed: string;
    totalInQueue: string;
  };
  suppressionSummary: {
    totalSuppressions: string;
    unsubscribed: string;
    hardBounced: string;
    spamComplaints: string;
    doNotContact: string;
    legalCompliance: string;
  };
  providerSummary: {
    totalProviders: number;
    healthy: number;
    warning: number;
    disconnected: number;
  };
  quickQueues: {
    deliveryExceptions: number;
    channelAlerts: number;
    messageQueue: string;
    senderIdentityIssues: number;
  };
}

export interface MarketingChannelsData {
  context: ChannelContextData;
  kpis: ChannelKpiItem[];
  readiness: ChannelReadinessCounters;
  channels: ChannelRecord[];
  selectedChannelDetails: Record<string, SelectedChannelDetails>;
  rail: ChannelRailData;
}

export const MARKETING_CHANNELS_MOCK_DATA: MarketingChannelsData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    channelScope: "All Marketing Channels",
    messagingGateway: "Healthy",
    consentSync: "Healthy",
    providerSync: "Healthy",
    dateRange: "Last 30 Days",
    completenessPercent: 98,
    lastSynced: "Aug 14, 2026 10:15 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    { id: "active_channels", label: "Active Channels", value: "8", variant: "blue" },
    { id: "messages_sent", label: "Messages Sent", value: "3.84M", variant: "blue" },
    { id: "delivery_rate", label: "Delivery Rate", value: "97.4%", variant: "green" },
    { id: "engagement_rate", label: "Engagement Rate", value: "26.8%", variant: "blue" },
    { id: "failed_deliveries", label: "Failed Deliveries", value: "38.6K", variant: "red" },
    { id: "suppressed", label: "Suppressed", value: "112K", variant: "orange" },
    { id: "open_exceptions", label: "Open Delivery Exceptions", value: "14", variant: "blue" },
    { id: "channel_health", label: "Channel Health", value: "94/100", variant: "green" },
  ],
  readiness: {
    healthy: 5,
    warning: 2,
    degraded: 1,
    disconnected: 0,
    senderVerificationIssue: 2,
    providerWarning: 3,
    queueDelay: 1,
  },
  channels: [
    {
      id: "CRM-EMS-0001",
      channelName: "SL Beauty Email",
      channelId: "CRM-EMS-0001",
      type: "Email",
      status: "Healthy",
      provider: "Marketing Cloud",
      businessUnit: "Beauty Enterprise",
      market: "Sri Lanka",
      senderAccount: "email@slbeauty.lk",
      consentScope: "Explicit",
      messages30D: "1.42M",
      deliveryRate: "98.7%",
      engagement: "22.4%",
      failureRate: "0.6%",
      suppressionRate: "1.8%",
      queue: "6.1K",
      providerSync: "Healthy",
      governance: "Compliant",
      lastActivity: "1 min ago",
    },
    {
      id: "CRM-SMS-0002",
      channelName: "SL Beauty SMS",
      channelId: "CRM-SMS-0002",
      type: "SMS",
      status: "Warning",
      provider: "Twilio",
      businessUnit: "Beauty Enterprise",
      market: "Sri Lanka",
      senderAccount: "SLBeauty SMS",
      consentScope: "Explicit",
      messages30D: "568K",
      deliveryRate: "96.1%",
      engagement: "18.2%",
      failureRate: "1.1%",
      suppressionRate: "3.2%",
      queue: "5.0K",
      providerSync: "Healthy",
      governance: "Compliant",
      lastActivity: "2 mins ago",
    },
    {
      id: "PUSH-FCM-0001",
      channelName: "SL Beauty Push",
      channelId: "PUSH-FCM-0001",
      type: "Push",
      status: "Healthy",
      provider: "Firebase Cloud",
      businessUnit: "App & Loyalty",
      market: "Sri Lanka",
      senderAccount: "SLBeauty App",
      consentScope: "Implicit",
      messages30D: "364K",
      deliveryRate: "97.8%",
      engagement: "31.6%",
      failureRate: "0.8%",
      suppressionRate: "2.5%",
      queue: "3.2K",
      providerSync: "Healthy",
      governance: "Compliant",
      lastActivity: "1 min ago",
    },
    {
      id: "WA-BSP-0001",
      channelName: "WhatsApp Marketing",
      channelId: "WA-BSP-0001",
      type: "WhatsApp",
      status: "Healthy",
      provider: "Meta BSP",
      businessUnit: "Customer Engagement",
      market: "Sri Lanka",
      senderAccount: "SLBeauty WhatsApp",
      consentScope: "Explicit",
      messages30D: "299K",
      deliveryRate: "96.5%",
      engagement: "29.4%",
      failureRate: "0.9%",
      suppressionRate: "2.1%",
      queue: "4.2K",
      providerSync: "Healthy",
      governance: "Compliant",
      lastActivity: "2 mins ago",
    },
    {
      id: "MAIL-PFN-0001",
      channelName: "Web Notification",
      channelId: "MAIL-PFN-0001",
      type: "Web-Push",
      status: "Degraded",
      provider: "OneSignal",
      businessUnit: "Loyalty & Retention",
      market: "Sri Lanka",
      senderAccount: "SLBeauty Web",
      consentScope: "Implicit",
      messages30D: "124K",
      deliveryRate: "92.2%",
      engagement: "14.8%",
      failureRate: "1.7%",
      suppressionRate: "3.8%",
      queue: "2.7K",
      providerSync: "Warning",
      governance: "Compliant",
      lastActivity: "3 mins ago",
    },
    {
      id: "CRM-TRANS-0001",
      channelName: "Secondary SMS Provider",
      channelId: "CRM-TRANS-0001",
      type: "SMS",
      status: "Healthy",
      provider: "Infobip",
      businessUnit: "Technology",
      market: "Sri Lanka",
      senderAccount: "SLBeauty Trans",
      consentScope: "Explicit",
      messages30D: "2.04M",
      deliveryRate: "99.2%",
      engagement: "17.9%",
      failureRate: "0.5%",
      suppressionRate: "1.2%",
      queue: "7.8K",
      providerSync: "Healthy",
      governance: "Compliant",
      lastActivity: "1 min ago",
    },
  ],
  selectedChannelDetails: {
    "CRM-EMS-0001": {
      channel: {
        id: "CRM-EMS-0001",
        channelName: "SL Beauty Email",
        channelId: "CRM-EMS-0001",
        type: "Email",
        status: "Healthy",
        provider: "Marketing Cloud",
        businessUnit: "Beauty Enterprise",
        market: "Sri Lanka",
        senderAccount: "email@slbeauty.lk",
        consentScope: "Explicit",
        messages30D: "1.42M",
        deliveryRate: "98.7%",
        engagement: "22.4%",
        failureRate: "0.6%",
        suppressionRate: "1.8%",
        queue: "6.1K",
        providerSync: "Healthy",
        governance: "Compliant",
        lastActivity: "1 min ago",
      },
      providerConnection: {
        provider: "Marketing Cloud",
        connectionStatus: "Connected",
        credentialStatus: "Valid",
        oauthTokenStatus: "Valid",
        lastValidated: "Aug 14, 2026 09:15",
        rotationDue: "Oct 15, 2026",
        ipAllowlist: "Configured",
        dataResidency: "Sri Lanka",
      },
      senderIdentity: {
        fromName: "SL Beauty",
        fromDomain: "slbeauty.lk",
        fromEmail: "email@slbeauty.lk",
        replyTo: "hello@slbeauty.lk",
        returnPathDomain: "r.slbeauty.lk",
        spf: "Pass",
        dkim: "Pass",
        dmarc: "Pass",
        domainReputation: "Good",
      },
      deliveryPerformance: {
        deliveryRate: "98.7%",
        deliveryRateTrend: "0.8%",
        openRate: "22.4%",
        openRateTrend: "1.1%",
        clickRate: "3.1%",
        clickRateTrend: "0.3%",
        bounceRate: "0.6%",
        bounceRateTrend: "0.1%",
        complaintRate: "0.02%",
        complaintRateTrend: "0.01%",
        trendData: [
          { date: "Jul 16", deliveryRate: 98.1, openRate: 21.5, clickRate: 2.8 },
          { date: "Jul 21", deliveryRate: 98.4, openRate: 21.8, clickRate: 2.9 },
          { date: "Jul 26", deliveryRate: 98.2, openRate: 22.0, clickRate: 3.0 },
          { date: "Aug 01", deliveryRate: 98.6, openRate: 22.2, clickRate: 3.0 },
          { date: "Aug 07", deliveryRate: 98.5, openRate: 22.3, clickRate: 3.1 },
          { date: "Aug 14", deliveryRate: 98.7, openRate: 22.4, clickRate: 3.1 },
        ],
      },
      deliveryFailures: {
        hardBounce: "8.2K",
        softBounce: "22.4K",
        suppressed: "5.1K",
        blocked: "1.5K",
        spamComplaint: "528",
        invalidAddress: "386",
        other: "492",
      },
      channelSuppressions: {
        totalSuppressions: "112K",
        items: [
          { category: "Blacklisted", count: "54K", percentage: "48.2%" },
          { category: "Unsubscribed", count: "28K", percentage: "25.0%" },
          { category: "Hard Bounced", count: "22K", percentage: "19.6%" },
          { category: "Spam Complaint", count: "5K", percentage: "4.5%" },
          { category: "Do Not Contact", count: "1K", percentage: "0.9%" },
          { category: "Legal / Compliance", count: "2K", percentage: "1.8%" },
        ],
      },
      deliveryQueue: {
        waiting: "14.8K",
        processing: "9.1K",
        delayed: "4.7K",
        failed: "1.2K",
      },
      routingFallback: {
        primaryChannel: "Email",
        fallback1: "SMS",
        fallback2: "Push",
        fallback3: "Other Mail",
        routingPolicy: "Engagement Score",
        autoFailover: "Enabled",
      },
      limitsFrequency: {
        dailySendTotal: "1.50M",
        dailySendToday: "1.42M",
        dailySendPercent: "94.7%",
        healthyThrottle: "75K / hr",
        cooldownWindow: "24 hrs",
        frequencyCap: "8 / 7 days",
        burstCap: "150K",
      },
      eligibilityConsent: {
        consentModel: "Explicit",
        consentMethod: "Website & App",
        lastConsentSync: "Aug 14, 2026 09:25",
        eligibleAudience: "2.81M",
        suppressedAudience: "112K",
        consentCompliance: "Compliant",
      },
      campaignUsage: {
        activeCampaigns: 154,
        messagesToday: "412K",
        percentDailyLimitUsed: "94%",
        topCampaign: "Spring Sale",
        nextScheduled: "Aug 15, 2026 10:00",
      },
      journeyUsage: {
        activeJourneys: 28,
        messagesToday: "164K",
        topJourney: "Welcome Series",
        enrolmentRate: "3.1K / hr",
        nextScheduled: "Aug 15, 2026 10:00",
      },
      messageContent: {
        templates: 214,
        contentAssets: "1,243",
        lastUpdated: "Aug 14, 2026",
        approvalRequired: 3,
      },
      governanceCompliance: {
        policyCompliance: "Compliant",
        dataHandling: "Compliant",
        auditLogging: "Enabled",
        lastAudit: "Aug 12, 2026",
      },
      activeExceptions: {
        openExceptions: 3,
        severity: "1 High / 2 Medium",
        lastException: "Aug 14, 2026 08:47",
      },
      providerHealth: {
        apiHealth: "Healthy",
        latencyP95: "312 ms",
        uptime30D: "99.98%",
        incidents30D: 0,
      },
      recentActivity: [
        {
          id: "act-1",
          time: "Aug 14, 2026 09:12",
          severity: "Medium",
          summary: "Delayed messages backlog (2.1K)",
          status: "Investigating",
          owner: "Operations",
        },
        {
          id: "act-2",
          time: "Aug 14, 2026 09:31",
          severity: "High",
          summary: "Hard bounce rate exceeded threshold (0.8%)",
          status: "Open",
          owner: "Deliverability Team",
        },
        {
          id: "act-3",
          time: "Aug 15, 2026 09:21",
          severity: "Low",
          summary: "API Latency elevated",
          status: "Monitoring",
          owner: "Platform",
        },
      ],
    },
  },
  rail: {
    healthScore: 94,
    updatedTime: "1 min ago",
    healthMetrics: [
      { name: "Provider Connectivity", score: 94 },
      { name: "Delivery Health", score: 90 },
      { name: "Sender Verification", score: 98 },
      { name: "Consent Enforcement", score: 91 },
      { name: "Queue Health", score: 96 },
      { name: "Routing Readiness", score: 92 },
      { name: "Governance", score: 92 },
    ],
    channelSummary: {
      totalChannels: 8,
      owned: 8,
      referenceOutside: 0,
      healthy: 5,
      warning: 2,
      degraded: 1,
      disconnected: 0,
    },
    deliverySummary: {
      messagesSent: "3.84M",
      deliveryRate: "97.4%",
      engagementRate: "26.8%",
      failedDeliveries: "38.6K",
    },
    messagingSummary: {
      messagesSent: "3.84M",
      openRate: "22.4%",
      clickRate: "3.1%",
      bounceRate: "0.6%",
      complaintRate: "0.02%",
    },
    queueSummary: {
      waiting: "28.7K",
      processing: "17.4K",
      delayed: "9.7K",
      failed: "2.7K",
      totalInQueue: "58.5K",
    },
    suppressionSummary: {
      totalSuppressions: "112K",
      unsubscribed: "56K",
      hardBounced: "28K",
      spamComplaints: "18K",
      doNotContact: "8K",
      legalCompliance: "4K",
    },
    providerSummary: {
      totalProviders: 6,
      healthy: 5,
      warning: 1,
      disconnected: 0,
    },
    quickQueues: {
      deliveryExceptions: 5,
      channelAlerts: 3,
      messageQueue: "18.3K",
      senderIdentityIssues: 2,
    },
  },
};
