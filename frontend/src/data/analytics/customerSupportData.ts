import { KpiMetricData } from "./executivePerformanceData";
import { FunnelStage } from "./marketplaceSellersData";

export interface SupportKpiData extends KpiMetricData {}

export interface SecondaryKpiData {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "flat";
  isPositive?: boolean;
}

export interface SlaScorecardRow {
  metric: string;
  actual: string;
  target: string;
  variance: string;
  status: "Good" | "Warning" | "Critical";
  isPositive?: boolean;
}

export interface QueuePerformanceRow {
  queue: string;
  cases: number;
  newCases: number;
  backlog: number;
  sla: string;
  firstResponse: string;
  resolution: string;
  fcr: string;
  responseRate: string;
  escalationRate: string;
  csat: string;
  utilization: string;
  risk: "Low" | "Med" | "High";
}

export interface ChannelPerformanceRow {
  channel: string;
  newCases: number;
  resolvedCases: number;
  sla: string;
  fcr: string;
  csat: string;
}

export interface TeamPerformanceRow {
  team: string;
  cases: number;
  sla: string;
  fcr: string;
  csat: string;
  backlog: number;
  resolution: string;
}

export interface AgentPerformanceRow {
  agent: string;
  resolved: number;
  cases: number;
  sla: string;
  fcr: string;
  csat: string;
  avgResolution: string;
}

export interface SupportExceptionRow {
  exception: string;
  count: number;
  impact: "High" | "Med" | "Low";
  status: "Open" | "Investigating" | "Resolved";
}

export interface UnderlyingSupportRecord {
  caseReference: string;
  customer: string;
  segment: string;
  queue: string;
  team: string;
  agent: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  created: string;
  firstResponse: string;
  resolution: string;
  sla: string;
  fcr: string;
  csat: number;
  ces: number;
  qaScore: string;
  escalated: "Yes" | "No";
  recovery: "Yes" | "No";
  supportCost: number;
  risk: "Low" | "Med" | "High";
  action: string;
}

export interface CustomerSupportHealthRailData {
  healthScore: number;
  label: string;
  subtext: string;
  serviceSummary: {
    openCases: string;
    newCases: string;
    backlog: string;
    firstResponse: string;
    avgResolution: string;
  };
  experienceSummary: {
    slaCompliance: string;
    csat: string;
    ces: string;
    repeatContact: string;
    escalationRate: string;
  };
  qualitySummary: {
    qaScore: string;
    evaluatedCases: number;
    coachingDue: number;
    knowledgeGaps: number;
  };
  workforceSummary: {
    active: number;
    available: number;
    atCapacity: number;
    overloaded: number;
  };
  supportCostSummary: {
    totalCost: string;
    costPerCase: string;
    costPerResolved: string;
    recoveryCost: string;
  };
  riskSummary: {
    slaRisk: number;
    backlogRisk: number;
    qualityRisk: number;
    escalationRisk: number;
    dataRisk: number;
  };
  quickQueues: {
    label: string;
    count: number;
    type: "danger" | "warning" | "info";
  }[];
}

export const CUSTOMER_SUPPORT_DATA = {
  headerMeta: {
    breadcrumb: "Analytics > Customer Support",
    title: "Customer Support, Service & Experience Analytics",
    subtitle:
      "Analyze support demand, service performance, customer satisfaction, queue health, agent productivity, quality, service recovery and customer-experience outcomes across the retail ecosystem.",
  },

  connectionStatus: [
    { label: "Time", value: "Last 30 Days" },
    { label: "Ecosystem", value: "Beauty Marketplace" },
    { label: "Business Unit", value: "All Business Units" },
    { label: "Region", value: "All Regions" },
    { label: "Support Scope", value: "All Customer Support" },
    { label: "Case Source", value: "Connected", status: "connected" },
    { label: "Conversation Source", value: "Connected", status: "connected" },
    { label: "Customer Source", value: "Connected", status: "connected" },
    { label: "Order Source", value: "Connected", status: "connected" },
    { label: "Return Source", value: "Connected", status: "connected" },
    { label: "Product Source", value: "Connected", status: "connected" },
    { label: "Supplier Source", value: "Connected", status: "connected" },
    { label: "Knowledge Source", value: "Connected", status: "connected" },
    { label: "Workforce Source", value: "Connected", status: "connected" },
    { label: "QA Source", value: "Connected", status: "connected" },
    { label: "Survey Source", value: "Connected", status: "connected" },
    { label: "SLA Engine", value: "Healthy", status: "success" },
    { label: "Metric Governance", value: "Healthy", status: "success" },
    { label: "Data Completeness", value: "97%" },
    { label: "Last Refreshed", value: "May 14, 2026 10:15 AM" },
    { label: "Access", value: "Assigned Scope" },
  ],

  primaryKpis: [
    {
      id: "open-cases",
      number: "1.",
      title: "Open Cases",
      mainValue: "1,286",
      trendPercentage: 4.6,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior Period (-4.6%)",
      sparklineData: [1400, 1380, 1350, 1320, 1290, 1286],
    },
    {
      id: "new-cases",
      number: "2.",
      title: "New Cases",
      mainValue: "1,184",
      trendPercentage: 5.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior Period (+5.2%)",
      sparklineData: [1100, 1120, 1140, 1150, 1170, 1184],
    },
    {
      id: "sla-compliance",
      number: "3.",
      title: "SLA Compliance",
      mainValue: "93%",
      trendPercentage: 1.4,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 95% (+1.4pp)",
      sparklineData: [90, 91, 91.5, 92, 92.5, 93],
    },
    {
      id: "first-response",
      number: "4.",
      title: "First Response",
      mainValue: "18m",
      trendPercentage: 3.0,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "m",
      comparisonLabel: "vs. Prior Period (-3m)",
      sparklineData: [24, 22, 21, 20, 19, 18],
    },
    {
      id: "avg-resolution",
      number: "5.",
      title: "Avg Resolution",
      mainValue: "6.4h",
      trendPercentage: 0.5,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "h",
      comparisonLabel: "vs. Target 8.0h (-0.5h)",
      sparklineData: [7.2, 7.0, 6.8, 6.7, 6.5, 6.4],
    },
    {
      id: "fcr",
      number: "6.",
      title: "FCR",
      mainValue: "81%",
      trendPercentage: 2.7,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 80% (+2.7pp)",
      sparklineData: [76, 77, 78, 79, 80, 81],
    },
    {
      id: "csat",
      number: "7.",
      title: "CSAT",
      mainValue: "92%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 90% (+1.2pp)",
      sparklineData: [89, 90, 90.5, 91, 91.8, 92],
    },
    {
      id: "repeat-contact",
      number: "8.",
      title: "Repeat Contact",
      mainValue: "7%",
      trendPercentage: 0.8,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "pp",
      comparisonLabel: "vs. Target 10% (-0.8pp)",
      sparklineData: [9.5, 9.0, 8.5, 8.0, 7.5, 7.0],
    },
    {
      id: "escalated-cases",
      number: "9.",
      title: "Escalated Cases",
      mainValue: "17",
      trendPercentage: 6.3,
      trendDirection: "down",
      isPositive: true,
      trendSuffix: "%",
      comparisonLabel: "vs. Prior Period (-6.3%)",
      sparklineData: [24, 22, 20, 19, 18, 17],
    },
  ] as SupportKpiData[],

  secondaryKpis: [
    { id: "conversations", title: "Conversations", value: "7,836", trend: "+12.5%", trendDirection: "up", isPositive: true },
    { id: "backlog", title: "Backlog", value: "312", trend: "+0.2%", trendDirection: "up", isPositive: false },
    { id: "reopened-cases", title: "Reopened Cases", value: "48", trend: "+11.1%", trendDirection: "up", isPositive: false },
    { id: "ces", title: "CES", value: "4.3 / 5", trend: "+0.2", trendDirection: "up", isPositive: true },
    { id: "qa-score", title: "QA Score", value: "95%", trend: "+1.6pp", trendDirection: "up", isPositive: true },
    { id: "support-cost", title: "Support Cost", value: "LKR 4.8M", trend: "+9.3%", trendDirection: "up", isPositive: false },
    { id: "cost-resolved", title: "Cost / Resolved Case", value: "LKR 1,420", trend: "+7.2%", trendDirection: "up", isPositive: false },
    { id: "self-service-deflection", title: "Self-Service Deflection", value: "34%", trend: "+3.1pp", trendDirection: "up", isPositive: true },
  ] as SecondaryKpiData[],

  analyticsHealthKpi: {
    score: 95,
    label: "Very Good",
    subtext: "2 pts vs prior period",
  },

  tabs: [
    "Support Overview",
    "Demand",
    "Cases & Queues",
    "Channels",
    "SLA",
    "Resolution",
    "Customer Satisfaction",
    "Customer Effort",
    "Complaints",
    "Escalations",
    "Teams & Agents",
    "Capacity",
    "Quality Assurance",
    "Knowledge & Assistance",
    "Self-Service",
    "Service Recovery",
    "Cost",
    "Customer Impact",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  readinessStrip: [
    { label: "Healthy", count: 52, type: "success" },
    { label: "SLA Risk", count: 7, type: "warning" },
    { label: "Backlog Risk", count: 6, type: "warning" },
    { label: "Low CSAT", count: 5, type: "danger" },
    { label: "Quality Warning", count: 7, type: "warning" },
    { label: "Capacity Risk", count: 4, type: "warning" },
    { label: "Escalation Risk", count: 6, type: "warning" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  supportDemandTrend: [
    { date: "Jul 16", newCases: 980, resolvedCases: 950, openBacklog: 280, slaCompliance: 91, csat: 89 },
    { date: "Jul 20", newCases: 1040, resolvedCases: 1010, openBacklog: 290, slaCompliance: 92, csat: 90 },
    { date: "Jul 24", newCases: 1120, resolvedCases: 1090, openBacklog: 300, slaCompliance: 92, csat: 91 },
    { date: "Jul 28", newCases: 1150, resolvedCases: 1130, openBacklog: 310, slaCompliance: 93, csat: 91 },
    { date: "Aug 01", newCases: 1200, resolvedCases: 1180, openBacklog: 320, slaCompliance: 94, csat: 92 },
    { date: "Aug 05", newCases: 1160, resolvedCases: 1140, openBacklog: 305, slaCompliance: 93, csat: 92 },
    { date: "Aug 09", newCases: 1184, resolvedCases: 1160, openBacklog: 312, slaCompliance: 93, csat: 92 },
    { date: "Aug 13", newCases: 1190, resolvedCases: 1175, openBacklog: 310, slaCompliance: 93.5, csat: 92.5 },
  ],

  demandComposition: [
    { name: "Order & Delivery", value: 38, count: 450, color: "#800020" },
    { name: "Product & Quality", value: 26, count: 308, color: "#2563eb" },
    { name: "Returns & Refunds", value: 16, count: 189, color: "#d97706" },
    { name: "Payment & Billing", value: 9, count: 107, color: "#059669" },
    { name: "Account & Profile", value: 6, count: 71, color: "#7c3aed" },
    { name: "Other", value: 5, count: 59, color: "#64748b" },
  ],

  caseLifecycleFunnel: [
    { stage: "Case Created", count: "1,184", percentage: "100%", color: "#800020" },
    { stage: "Assigned", count: "1,142", percentage: "96%", color: "#991b1b" },
    { stage: "Investigating", count: "1,062", percentage: "90%", color: "#b91c1c" },
    { stage: "Resolution Proposed", count: "876", percentage: "74%", color: "#c2410c" },
    { stage: "Customer Confirmed", count: "734", percentage: "62%", color: "#d97706" },
    { stage: "Resolved", count: "623", percentage: "53%", color: "#059669" },
    { stage: "Closed", count: "562", percentage: "47%", color: "#2563eb" },
  ] as FunnelStage[],

  slaPerformance: {
    score: 93,
    breakdown: [
      { label: "Met", value: 1196, percentage: "92%", color: "#059669" },
      { label: "Breached", value: 63, percentage: "5%", color: "#dc2626" },
      { label: "At Risk", value: 27, percentage: "3%", color: "#d97706" },
    ],
  },

  slaScorecard: [
    { metric: "Overall SLA", actual: "93%", target: "95%", variance: "-2.0pp", status: "Warning", isPositive: false },
    { metric: "Response SLA", actual: "95%", target: "95%", variance: "0.0pp", status: "Good", isPositive: true },
    { metric: "Resolution SLA", actual: "91%", target: "93%", variance: "-2.0pp", status: "Warning", isPositive: false },
    { metric: "Escalation SLA", actual: "96%", target: "95%", variance: "+1.0pp", status: "Good", isPositive: true },
    { metric: "Update SLA", actual: "92%", target: "94%", variance: "-2.0pp", status: "Warning", isPositive: false },
  ] as SlaScorecardRow[],

  queuePerformance: [
    { queue: "Order & Delivery", cases: 422, newCases: 380, backlog: 42, sla: "92%", firstResponse: "15m", resolution: "5.2h", fcr: "84%", responseRate: "96%", escalationRate: "1.2%", csat: "93%", utilization: "78%", risk: "Low" },
    { queue: "Returns & Refunds", cases: 218, newCases: 190, backlog: 28, sla: "91%", firstResponse: "18m", resolution: "6.8h", fcr: "81%", responseRate: "94%", escalationRate: "2.1%", csat: "91%", utilization: "72%", risk: "Low" },
    { queue: "Product Support", cases: 350, newCases: 310, backlog: 40, sla: "94%", firstResponse: "16m", resolution: "6.0h", fcr: "82%", responseRate: "95%", escalationRate: "1.5%", csat: "92%", utilization: "80%", risk: "Low" },
    { queue: "Payment & Billing", cases: 142, newCases: 125, backlog: 17, sla: "95%", firstResponse: "12m", resolution: "4.5h", fcr: "88%", responseRate: "98%", escalationRate: "0.8%", csat: "94%", utilization: "65%", risk: "Low" },
    { queue: "Account & Access", cases: 76, newCases: 68, backlog: 8, sla: "96%", firstResponse: "10m", resolution: "2.5h", fcr: "90%", responseRate: "99%", escalationRate: "0.5%", csat: "95%", utilization: "58%", risk: "Low" },
    { queue: "VIP / Priority", cases: 78, newCases: 64, backlog: 14, sla: "98%", firstResponse: "5m", resolution: "2.1h", fcr: "92%", responseRate: "100%", escalationRate: "0.2%", csat: "97%", utilization: "45%", risk: "Low" },
  ] as QueuePerformanceRow[],

  channelPerformance: [
    { channel: "Channel", newCases: 422, resolvedCases: 395, sla: "94%", fcr: "85%", csat: "93%" },
    { channel: "Email", newCases: 310, resolvedCases: 284, sla: "91%", fcr: "78%", csat: "90%" },
    { channel: "WhatsApp", newCases: 254, resolvedCases: 242, sla: "96%", fcr: "88%", csat: "94%" },
    { channel: "Phone", newCases: 212, resolvedCases: 198, sla: "93%", fcr: "82%", csat: "91%" },
    { channel: "Web Form", newCases: 84, resolvedCases: 76, sla: "89%", fcr: "74%", csat: "88%" },
    { channel: "Social", newCases: 42, resolvedCases: 38, sla: "87%", fcr: "71%", csat: "86%" },
  ] as ChannelPerformanceRow[],

  topContactReasons: [
    { category: "Billing", count: 248, percentage: 21, color: "#800020" },
    { category: "Refund Status", count: 191, percentage: 16, color: "#991b1b" },
    { category: "Product Quality", count: 148, percentage: 13, color: "#b91c1c" },
    { category: "Payment Failure", count: 124, percentage: 10, color: "#c2410c" },
    { category: "Wrong Item", count: 95, percentage: 8, color: "#d97706" },
    { category: "Missing Item", count: 83, percentage: 7, color: "#2563eb" },
  ],

  casePriorityDistribution: [
    { name: "High", value: 27, count: 320, color: "#dc2626" },
    { name: "Medium", value: 41, count: 485, color: "#d97706" },
    { name: "Low", value: 32, count: 379, color: "#2563eb" },
  ],

  resolutionDistribution: [
    { category: "Resolved", count: 561, percentage: 47, color: "#059669" },
    { category: "Closed", count: 342, percentage: 29, color: "#2563eb" },
    { category: "In Progress", count: 162, percentage: 14, color: "#d97706" },
    { category: "Awaiting Customer", count: 78, percentage: 7, color: "#7c3aed" },
    { category: "Pending Third Party", count: 41, percentage: 3, color: "#64748b" },
  ],

  fcrAnalytics: {
    score: 81,
    label: "FCR",
    breakdown: [
      { name: "Resolved at first contact", value: 81, count: 960, color: "#059669" },
      { name: "Multiple contacts", value: 19, count: 224, color: "#d97706" },
    ],
  },

  csatAnalytics: {
    positive: 70,
    neutral: 20,
    negative: 10,
    avg: "4.2 / 5",
    positiveDelta: "+7pp",
    neutralDelta: "-5pp",
    negativeDelta: "-2pp",
  },

  cesAnalytics: {
    score: "4.3/5",
    label: "Average",
    highEffort: 10,
    medEffort: 28,
    lowEffort: 62,
  },

  cesDonut: [
    { name: "High Effort (1-2)", value: 10, color: "#ef4444" },
    { name: "Medium (3)", value: 28, color: "#f59e0b" },
    { name: "Low Effort (4-5)", value: 62, color: "#16a34a" },
  ],

  aiSentiment: [
    { name: "Positive", value: 61, color: "#059669" },
    { name: "Neutral", value: 24, color: "#d97706" },
    { name: "Negative", value: 15, color: "#dc2626" },
  ],

  complaintsAnalytics: {
    totalComplaints: 96,
    trend: "-8.6%",
    complaintRate: "8.1%",
    rateTrend: "-1.1pp",
  },

  rootCauseAnalysis: [
    { category: "Delivery Issues", count: 37, percentage: 37, color: "#800020" },
    { category: "Product Quality", count: 28, percentage: 28, color: "#2563eb" },
    { category: "Refund Delay", count: 21, percentage: 21, color: "#d97706" },
    { category: "Payment Error", count: 14, percentage: 14, color: "#7c3aed" },
  ],

  escalationAnalytics: {
    totalEscalations: 17,
    trend: "-6.3%",
    reasons: [
      { name: "Executive Ops", count: 29 },
      { name: "Escalation Ops", count: 12 },
      { name: "Risk Team", count: 8 },
    ],
  },

  escalationPath: [
    { stage: "L1 -> L2", rate: "32%", color: "#2563eb" },
    { stage: "L2 -> L3", rate: "12%", color: "#d97706" },
    { stage: "L3 -> Mgmt", rate: "4%", color: "#dc2626" },
  ],

  teamPerformance: [
    { team: "Customer Ops", cases: 382, sla: "94%", fcr: "84%", csat: "4.2", backlog: 42, resolution: "5.2h" },
    { team: "Returns Team", cases: 264, sla: "91%", fcr: "81%", csat: "4.1", backlog: 28, resolution: "6.8h" },
    { team: "Product Support", cases: 310, sla: "94%", fcr: "82%", csat: "4.3", backlog: 40, resolution: "6.0h" },
    { team: "Payment & Billing", cases: 210, sla: "95%", fcr: "88%", csat: "4.5", backlog: 17, resolution: "4.5h" },
    { team: "Tech Support", cases: 142, sla: "96%", fcr: "90%", csat: "4.6", backlog: 8, resolution: "2.5h" },
    { team: "VIP Support", cases: 76, sla: "98%", fcr: "92%", csat: "4.8", backlog: 14, resolution: "2.1h" },
  ] as TeamPerformanceRow[],

  agentPerformance: [
    { agent: "Aarav Khan", resolved: 142, cases: 150, sla: "96%", fcr: "88%", csat: "4.6", avgResolution: "4.2h" },
    { agent: "Rahul Das", resolved: 128, cases: 135, sla: "94%", fcr: "84%", csat: "4.5", avgResolution: "4.8h" },
    { agent: "Priya Mehta", resolved: 119, cases: 125, sla: "95%", fcr: "86%", csat: "4.7", avgResolution: "4.0h" },
    { agent: "Ananya Sen", resolved: 112, cases: 120, sla: "92%", fcr: "81%", csat: "4.4", avgResolution: "5.1h" },
    { agent: "Rahul Kapoor", resolved: 104, cases: 110, sla: "93%", fcr: "83%", csat: "4.5", avgResolution: "4.9h" },
    { agent: "Vikram Singh", resolved: 98, cases: 105, sla: "91%", fcr: "80%", csat: "4.3", avgResolution: "5.3h" },
  ] as AgentPerformanceRow[],

  workforceCapacity: {
    score: 82,
    label: "Utilization",
    active: 128,
    available: 24,
    atCapacity: 46,
    overloaded: 6,
  },

  qaAnalytics: {
    qaScore: "95%",
    trend: "+1.6pp",
    evaluatedCases: 584,
    monitoredAgents: 48,
  },

  qualityDefects: [
    { category: "Incomplete Info", count: 38, percentage: 38, color: "#800020" },
    { category: "Policy Violation", count: 26, percentage: 26, color: "#d97706" },
    { category: "Incorrect Resolution", count: 18, percentage: 18, color: "#dc2626" },
    { category: "Tone & Language", count: 18, percentage: 18, color: "#2563eb" },
  ],

  knowledgeAssistance: {
    articlesUsed: "1,842",
    trend: "+12.5%",
    helpfulVotes: "32%",
    knowledgeGaps: 7,
    gapTrend: "-2",
  },

  serviceRecovery: {
    totalRecoveries: 64,
    trend: "+12.3%",
    recoveryRate: "9.7%",
    rateTrend: "+1.6pp",
    recoveredCsat: "4.2 / 5",
  },

  supportCostAnalytics: {
    totalCost: "LKR 4.8M",
    trend: "+9.3%",
    costPerCase: "LKR 608",
    caseTrend: "+7.2%",
    costPerResolved: "LKR 1,420",
    resolvedTrend: "+7.2%",
  },

  customerImpact: {
    impactedCustomers: "1,048",
    trend: "-5.4%",
    repeatImpact: "2.1%",
    repeatTrend: "-1.2pp",
    churnRisk: "2.3%",
    churnTrend: "-0.4pp",
  },

  serviceOutcomeMatrix: [
    { x: 2, y: 4.8, z: 120, name: "VIP Queue" },
    { x: 3, y: 4.6, z: 140, name: "Account Queue" },
    { x: 4, y: 4.5, z: 210, name: "Payment Queue" },
    { x: 5, y: 4.2, z: 380, name: "Order Queue" },
    { x: 6, y: 4.3, z: 310, name: "Product Queue" },
    { x: 7, y: 4.1, z: 260, name: "Returns Queue" },
  ],

  supportRiskPortfolio: [
    { name: "SLA Risk", value: 7, color: "#dc2626" },
    { name: "Backlog Risk", value: 6, color: "#d97706" },
    { name: "Quality Risk", value: 7, color: "#c2410c" },
    { name: "Escalation Risk", value: 6, color: "#7c3aed" },
    { name: "Data Risk", value: 2, color: "#059669" },
    { name: "Other Risk", value: 4, color: "#64748b" },
  ],

  supportExceptions: [
    { exception: "SLA Breach", count: 8, impact: "High", status: "Open" },
    { exception: "Backlog Risk", count: 6, impact: "High", status: "Open" },
    { exception: "Low CSAT Cases", count: 5, impact: "Med", status: "Open" },
    { exception: "Agent Over Capacity", count: 4, impact: "High", status: "Investigating" },
    { exception: "QA Score Critical", count: 2, impact: "High", status: "Open" },
  ] as SupportExceptionRow[],

  supportForecast: [
    { date: "Aug 14", forecast: 1195, target: 1200 },
    { date: "Aug 15", forecast: 1210, target: 1200 },
    { date: "Aug 16", forecast: 1180, target: 1200 },
    { date: "Aug 17", forecast: 1225, target: 1200 },
    { date: "Aug 18", forecast: 1240, target: 1200 },
    { date: "Aug 19", forecast: 1215, target: 1200 },
    { date: "Aug 20", forecast: 1190, target: 1200 },
  ],

  workforceForecast: [
    { date: "Aug 14", required: 130, available: 135 },
    { date: "Aug 15", required: 132, available: 135 },
    { date: "Aug 16", required: 128, available: 132 },
    { date: "Aug 17", required: 136, available: 134 },
    { date: "Aug 18", required: 138, available: 136 },
    { date: "Aug 19", required: 134, available: 135 },
    { date: "Aug 20", required: 131, available: 135 },
  ],

  underlyingRecords: [
    {
      caseReference: "CAS3-2026-001248",
      customer: "Aditi Sharma",
      segment: "Premium",
      queue: "Customer Ops",
      team: "Customer Ops",
      agent: "Asha Khan",
      issue: "Delivery Delay",
      priority: "High",
      created: "Aug 14, 10:15 AM",
      firstResponse: "18m",
      resolution: "6.2h",
      sla: "Met",
      fcr: "Yes",
      csat: 5,
      ces: 4,
      qaScore: "96%",
      escalated: "No",
      recovery: "No",
      supportCost: 1250,
      risk: "Low",
      action: "Resolved",
    },
    {
      caseReference: "CAS3-2026-001249",
      customer: "Lakshmi S",
      segment: "Standard",
      queue: "Returns & Refunds",
      team: "Returns Team",
      agent: "Rahul Das",
      issue: "Refund Status",
      priority: "Medium",
      created: "Aug 14, 09:40 AM",
      firstResponse: "12m",
      resolution: "5.4h",
      sla: "Met",
      fcr: "Yes",
      csat: 4,
      ces: 4,
      qaScore: "94%",
      escalated: "No",
      recovery: "No",
      supportCost: 800,
      risk: "Low",
      action: "Resolved",
    },
    {
      caseReference: "CAS3-2026-001250",
      customer: "Shreya B",
      segment: "Standard",
      queue: "Product Support",
      team: "Product Support",
      agent: "Priya Mehta",
      issue: "Product Quality",
      priority: "High",
      created: "Aug 14, 08:30 AM",
      firstResponse: "22m",
      resolution: "4.1h",
      sla: "Met",
      fcr: "No",
      csat: 3,
      ces: 3,
      qaScore: "90%",
      escalated: "No",
      recovery: "Yes",
      supportCost: 1500,
      risk: "Med",
      action: "Resolved",
    },
    {
      caseReference: "CAS3-2026-001251",
      customer: "Mehru Patel",
      segment: "VIP",
      queue: "Payment & Billing",
      team: "Payment Team",
      agent: "Arjun Nair",
      issue: "Payment Failure",
      priority: "High",
      created: "Aug 14, 07:15 AM",
      firstResponse: "8m",
      resolution: "2.8h",
      sla: "Met",
      fcr: "Yes",
      csat: 5,
      ces: 5,
      qaScore: "98%",
      escalated: "No",
      recovery: "No",
      supportCost: 650,
      risk: "Low",
      action: "Resolved",
    },
    {
      caseReference: "CAS3-2026-001252",
      customer: "Farah Khan",
      segment: "Standard",
      queue: "Account Access",
      team: "Tech Support",
      agent: "Neha Kapoor",
      issue: "Login Issue",
      priority: "Low",
      created: "Aug 14, 06:50 AM",
      firstResponse: "15m",
      resolution: "1.5h",
      sla: "Met",
      fcr: "Yes",
      csat: 4,
      ces: 4,
      qaScore: "92%",
      escalated: "No",
      recovery: "No",
      supportCost: 400,
      risk: "Low",
      action: "Resolved",
    },
  ] as UnderlyingSupportRecord[],

  healthRailData: {
    healthScore: 95,
    label: "Very Good",
    subtext: "2 pts vs prior period",
    serviceSummary: {
      openCases: "1,286",
      newCases: "1,184",
      backlog: "312",
      firstResponse: "18m",
      avgResolution: "6.4h",
    },
    experienceSummary: {
      slaCompliance: "93%",
      csat: "92%",
      ces: "4.3 / 5",
      repeatContact: "7%",
      escalationRate: "1.4%",
    },
    qualitySummary: {
      qaScore: "95%",
      evaluatedCases: 584,
      coachingDue: 14,
      knowledgeGaps: 7,
    },
    workforceSummary: {
      active: 128,
      available: 24,
      atCapacity: 46,
      overloaded: 6,
    },
    supportCostSummary: {
      totalCost: "LKR 4.8M",
      costPerCase: "LKR 608",
      costPerResolved: "LKR 1,420",
      recoveryCost: "LKR 346K",
    },
    riskSummary: {
      slaRisk: 7,
      backlogRisk: 6,
      qualityRisk: 7,
      escalationRisk: 6,
      dataRisk: 2,
    },
    quickQueues: [
      { label: "SLA Breached", count: 8, type: "danger" as const },
      { label: "High Backlog", count: 12, type: "warning" as const },
      { label: "Low CSAT", count: 5, type: "danger" as const },
      { label: "Escalation Risk", count: 6, type: "warning" as const },
      { label: "Coaching Due", count: 14, type: "warning" as const },
      { label: "Knowledge Gaps", count: 7, type: "info" as const },
    ],
  } as CustomerSupportHealthRailData,
};
