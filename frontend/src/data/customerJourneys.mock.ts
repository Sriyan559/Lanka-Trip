export interface JourneyContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  scope: string;
  customerSource: string;
  automationEngine: string;
  consentSync: string;
  dateRange: string;
  completenessPercent: number;
  lastSynced: string;
  access: string;
}

export interface JourneyKpiItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
}

export interface JourneyReadinessCounters {
  runningHealthy: number;
  needsAttention: number;
  reviewRequired: number;
  warning: number;
  blocked: number;
  clear: number;
}

export interface JourneyRecord {
  id: string;
  code: string;
  name: string;
  status: "Running" | "Scheduled" | "Draft" | "Paused" | "Review Required";
  type: string;
  owner: string;
  entryAudience: string;
  trigger: string;
  activeCustomers: string;
  stepCount: number;
  primaryChannels: string[];
  entryRate: string;
  conversion: string;
  revenue: string;
  exceptions: number;
  governance: "Clear" | "Warning" | "Review Required" | "Blocked";
  lastActivity: string;
}

export interface FlowNodeData {
  id: string;
  type: "entry" | "action" | "wait" | "decision" | "success" | "exit";
  title: string;
  subtitle?: string;
  timeframe?: string;
  count?: string;
  passCount?: string;
  dropCount?: string;
  yesNodeId?: string;
  noNodeId?: string;
  nextNodeId?: string;
}

export interface SelectedJourneyDetails {
  code: string;
  name: string;
  status: string;
  activeCustomers: string;
  entries24h: string;
  completed24h: string;
  conversion: string;
  recoveredRevenue: string;
  avgTimeInJourney: string;
  exceptionsCount: number;
  healthScore: number;
  flowNodes: FlowNodeData[];
  stepPerformance: Array<{
    step: string;
    type: string;
    entered: string;
    completed: string;
    dropOff: string;
    conversion: string;
    avgTime: string;
    deliveryHealth: string;
  }>;
  entryAudience: {
    name: string;
    activeInJourney: string;
    segmentation: string;
    audienceSize: string;
  };
  entryTrigger: {
    event: string;
    condition: string;
    frequency: string;
    timezone: string;
    ignoreInitial: string;
    status: string;
  };
  channelExecution: Array<{
    channel: string;
    delivered: string;
    engagement: string;
    conversion: string;
    deliveryHealth: "Healthy" | "Warning" | "Degraded";
  }>;
  goals: Array<{
    goal: string;
    type: "Primary" | "Secondary";
    target: string;
    current: string;
    achievement: number;
  }>;
  performanceChart: Array<{
    date: string;
    entries: number;
    completions: number;
    conversions: number;
    revenueLkr: number;
  }>;
  performanceSummary: {
    entries: string;
    completions: string;
    conversions: string;
    revenue: string;
  };
  timingAnalysis: {
    avgDuration: string;
    median: string;
    waitingNow: string;
    delayed: string;
    waitHealth: string;
  };
  exceptions: Array<{
    exception: string;
    severity: "Warning" | "Review Required" | "Critical";
    affected: string;
    step: string;
    status: string;
  }>;
  collision: Array<{
    name: string;
    overlappingCustomers: string;
    riskLevel: "Low" | "Medium" | "High";
  }>;
  exitAnalysis: Array<{
    code: string;
    count: string;
    percentage: number;
  }>;
  governance: {
    approval: string;
    contentEligibility: string;
    frequencyCap: string;
    consentBasis: string;
    dataResidency: string;
    legalReview: string;
    healthScore: number;
  };
  linkedCampaigns: Array<{ id: string; name: string; status: string }>;
  linkedAudiences: Array<{ id: string; name: string; status: string }>;
  recentActivity: Array<{
    date: string;
    time: string;
    activity: string;
    user: string;
  }>;
  version: {
    liveVersion: string;
    lastPublished: string;
    draftVersion: string;
    lastEdited: string;
    createdBy: string;
    lastEditedBy: string;
  };
}

export interface JourneyRightRailData {
  healthScore: number;
  metrics: Array<{ label: string; score: number }>;
  journeySummary: { total: number; running: number; scheduled: number; draft: number; paused: number };
  customerFlow: { active: string; enteredToday: string; completedToday: string; convertedToday: string };
  deliverySummary: Array<{ channel: string; score: string; status: string }>;
  exceptionsSummary: { open: number; critical: number; warnings: number; info: number };
  approvalSummary: { pending: number; overdue: number };
  quickQueues: Array<{ label: string; count: number; severity: "red" | "orange" | "purple" }>;
}

export interface FullCustomerJourneysData {
  context: JourneyContextData;
  kpis: JourneyKpiItem[];
  readiness: JourneyReadinessCounters;
  portfolio: JourneyRecord[];
  selectedJourney: SelectedJourneyDetails;
  rightRail: JourneyRightRailData;
}

export const mockCustomerJourneysData: FullCustomerJourneysData = {
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    scope: "All Marketing Journeys",
    customerSource: "Customer Domain",
    automationEngine: "Healthy",
    consentSync: "Healthy",
    dateRange: "Last 30 Days",
    completenessPercent: 97,
    lastSynced: "May 14, 2026 10:19 AM",
    access: "Limited to assigned business context",
  },
  kpis: [
    { id: "1", label: "TOTAL JOURNEYS", value: "38", subtext: "Configured automations" },
    { id: "2", label: "ACTIVE JOURNEYS", value: "12", subtext: "Currently running flows" },
    { id: "3", label: "CUSTOMERS IN JOURNEYS", value: "318K", subtext: "Active enrolled identities" },
    { id: "4", label: "AUTOMATED MESSAGES", value: "1.26M", subtext: "Triggered execution volume" },
    { id: "5", label: "JOURNEY CONVERSION", value: "7.2%", subtext: "Overall lifecycle conversion" },
    { id: "6", label: "RECOVERED REVENUE", value: "LKR 6.84M", subtext: "Attributed automation revenue" },
    { id: "7", label: "JOURNEY EXCEPTIONS", value: "9", subtext: "Open automation alerts" },
    { id: "8", label: "AUTOMATION HEALTH", value: "93 /100", subtext: "Healthy engine status" },
  ],
  readiness: {
    runningHealthy: 9,
    needsAttention: 3,
    reviewRequired: 4,
    warning: 2,
    blocked: 0,
    clear: 20,
  },
  portfolio: [
    {
      id: "JRN-2026-0001",
      code: "JRN-2026-0001",
      name: "New Customer Welcome",
      status: "Running",
      type: "Onboarding",
      owner: "CRM Marketing",
      entryAudience: "New Customers",
      trigger: "Account Created",
      activeCustomers: "48,210",
      stepCount: 5,
      primaryChannels: ["Email", "Push", "SMS"],
      entryRate: "32%",
      conversion: "8.8%",
      revenue: "LKR 2.14M",
      exceptions: 0,
      governance: "Clear",
      lastActivity: "12 min ago",
    },
    {
      id: "JRN-2026-0026",
      code: "JRN-2026-0026",
      name: "Abandoned Cart Recovery",
      status: "Running",
      type: "Recovery",
      owner: "CRM Marketing",
      entryAudience: "Cart Abandoners",
      trigger: "Cart Abandoned",
      activeCustomers: "72,440",
      stepCount: 7,
      primaryChannels: ["Push", "Email", "SMS"],
      entryRate: "41%",
      conversion: "9.8%",
      revenue: "LKR 3.10M",
      exceptions: 1,
      governance: "Warning",
      lastActivity: "3 min ago",
    },
    {
      id: "JRN-2026-0009",
      code: "JRN-2026-0009",
      name: "90-Day Customer Reactivation",
      status: "Running",
      type: "Reactivation",
      owner: "CRM Marketing",
      entryAudience: "Inactive 90 Days",
      trigger: "90 Days Inactive",
      activeCustomers: "36,120",
      stepCount: 6,
      primaryChannels: ["Email", "SMS"],
      entryRate: "28%",
      conversion: "6.2%",
      revenue: "LKR 1.62M",
      exceptions: 0,
      governance: "Clear",
      lastActivity: "21 min ago",
    },
    {
      id: "JRN-2026-0015",
      code: "JRN-2026-0015",
      name: "Loyalty Upsell Journey",
      status: "Running",
      type: "Engagement",
      owner: "Loyalty Team",
      entryAudience: "Loyalty Members",
      trigger: "Purchase Milestone",
      activeCustomers: "24,810",
      stepCount: 6,
      primaryChannels: ["Push", "Email"],
      entryRate: "18%",
      conversion: "12.4%",
      revenue: "LKR 2.91M",
      exceptions: 0,
      governance: "Clear",
      lastActivity: "15 min ago",
    },
    {
      id: "JRN-2026-0017",
      code: "JRN-2026-0017",
      name: "Post-Purchase Skincare Education",
      status: "Running",
      type: "Education",
      owner: "Content Team",
      entryAudience: "Recent Purchasers",
      trigger: "Purchase Completed",
      activeCustomers: "55,330",
      stepCount: 5,
      primaryChannels: ["Email", "Push"],
      entryRate: "38%",
      conversion: "7.1%",
      revenue: "LKR 1.24M",
      exceptions: 0,
      governance: "Clear",
      lastActivity: "8 min ago",
    },
    {
      id: "JRN-2026-0021",
      code: "JRN-2026-0021",
      name: "High-Value Win-Back",
      status: "Review Required",
      type: "Reactivation",
      owner: "CRM Marketing",
      entryAudience: "High Value Inactive",
      trigger: "Churn Risk Score",
      activeCustomers: "18,920",
      stepCount: 8,
      primaryChannels: ["Email", "SMS"],
      entryRate: "22%",
      conversion: "5.3%",
      revenue: "LKR 892K",
      exceptions: 2,
      governance: "Clear",
      lastActivity: "2 hr ago",
    },
  ],
  selectedJourney: {
    code: "JRN-2026-0026",
    name: "Abandoned Cart Recovery",
    status: "Running",
    activeCustomers: "72,440",
    entries24h: "5,214",
    completed24h: "4,612",
    conversion: "9.8%",
    recoveredRevenue: "LKR 3.10M",
    avgTimeInJourney: "18h 24m",
    exceptionsCount: 1,
    healthScore: 95,
    flowNodes: [
      {
        id: "node-1",
        type: "entry",
        title: "ENTRY",
        subtitle: "Cart Abandoned",
        timeframe: "0–40 min",
        count: "5,214",
      },
      {
        id: "node-2",
        type: "action",
        title: "Eligibility Check",
        count: "5,214",
        passCount: "5,214",
        dropCount: "609",
      },
      {
        id: "node-3",
        type: "wait",
        title: "Wait 30 min",
        count: "5,214",
      },
      {
        id: "node-4",
        type: "action",
        title: "Push Reminder",
        count: "5,056",
      },
      {
        id: "node-5",
        type: "wait",
        title: "Wait 6h",
        count: "4,612",
      },
      {
        id: "node-6",
        type: "decision",
        title: "Purchased?",
        yesNodeId: "node-7",
        noNodeId: "node-8",
      },
      {
        id: "node-7",
        type: "success",
        title: "SUCCESS",
        subtitle: "Purchase Completed",
        count: "4,264",
      },
      {
        id: "node-8",
        type: "action",
        title: "Email Reminder",
        count: "3,400",
      },
      {
        id: "node-9",
        type: "wait",
        title: "Wait 20h",
        count: "3,002",
      },
      {
        id: "node-10",
        type: "action",
        title: "SMS Final Reminder",
        count: "2,800",
      },
      {
        id: "node-11",
        type: "decision",
        title: "Purchased?",
        yesNodeId: "node-12",
        noNodeId: "node-13",
      },
      {
        id: "node-12",
        type: "success",
        title: "SUCCESS",
        subtitle: "Purchase Completed",
        count: "2,412",
      },
      {
        id: "node-13",
        type: "exit",
        title: "EXIT",
        subtitle: "No Conversion",
        count: "388",
      },
    ],
    stepPerformance: [
      {
        step: "Eligibility Check",
        type: "Decision",
        entered: "5,214",
        completed: "4,412",
        dropOff: "15.4%",
        conversion: "84.6%",
        avgTime: "2m",
        deliveryHealth: "Healthy",
      },
      {
        step: "Push Reminder",
        type: "Push",
        entered: "5,056",
        completed: "4,412",
        dropOff: "12.7%",
        conversion: "9.7%",
        avgTime: "25m",
        deliveryHealth: "Healthy",
      },
      {
        step: "Email Reminder",
        type: "Email",
        entered: "3,400",
        completed: "3,002",
        dropOff: "17.6%",
        conversion: "8.1%",
        avgTime: "20h 20m",
        deliveryHealth: "Healthy",
      },
      {
        step: "SMS Final Reminder",
        type: "SMS",
        entered: "3,002",
        completed: "2,412",
        dropOff: "19.6%",
        conversion: "8.0%",
        avgTime: "26h 08m",
        deliveryHealth: "Warning",
      },
    ],
    entryAudience: {
      name: "Cart Abandoners",
      activeInJourney: "72,440",
      segmentation: "High Intent",
      audienceSize: "134,690",
    },
    entryTrigger: {
      event: "Cart Abandoned",
      condition: "Cart remains abandoned for 10min",
      frequency: "Once per customer",
      timezone: "Asia/Colombo (GMT+5:30)",
      ignoreInitial: "5,214",
      status: "Clear",
    },
    channelExecution: [
      { channel: "Push", delivered: "5,056", engagement: "34.1%", conversion: "9.2%", deliveryHealth: "Healthy" },
      { channel: "Email", delivered: "3,400", engagement: "28.7%", conversion: "8.1%", deliveryHealth: "Healthy" },
      { channel: "SMS", delivered: "3,002", engagement: "24.3%", conversion: "7.6%", deliveryHealth: "Warning" },
    ],
    goals: [
      { goal: "Purchase Completed", type: "Primary", target: "8.0%", current: "9.8%", achievement: 122 },
      { goal: "Cart Recovered", type: "Secondary", target: "6.0%", current: "7.2%", achievement: 120 },
      { goal: "New Revenue", type: "Secondary", target: "LKR 3.0M", current: "LKR 3.18M", achievement: 106 },
      { goal: "Early Without Conversion", type: "Secondary", target: "2.4%", current: "2.4%", achievement: 100 },
    ],
    performanceChart: [
      { date: "Jul 19", entries: 28000, completions: 22000, conversions: 7800, revenueLkr: 2.4 },
      { date: "Jul 26", entries: 31000, completions: 24500, conversions: 8500, revenueLkr: 2.7 },
      { date: "Aug 02", entries: 34000, completions: 26000, conversions: 9200, revenueLkr: 2.9 },
      { date: "Aug 09", entries: 35600, completions: 27400, conversions: 9800, revenueLkr: 3.18 },
    ],
    performanceSummary: {
      entries: "35.6K",
      completions: "27.4K",
      conversions: "9.8K",
      revenue: "LKR 3.18M",
    },
    timingAnalysis: {
      avgDuration: "18h 24m",
      median: "14h 08m",
      waitingNow: "28.4K",
      delayed: "814",
      waitHealth: "Clear",
    },
    exceptions: [
      { exception: "Frequency Cap Conflict", severity: "Warning", affected: "1,245", step: "SMS Final Reminder", status: "Open" },
      { exception: "Delivery Step Exception", severity: "Warning", affected: "1,118", step: "Email Reminder", status: "Open" },
      { exception: "Trigger Optimization Protection", severity: "Review Required", affected: "600", step: "Entry Trigger", status: "Review" },
    ],
    collision: [
      { name: "Loyalty Upsell Journey", overlappingCustomers: "1,642", riskLevel: "Medium" },
      { name: "90 Day Reactivation", overlappingCustomers: "1,118", riskLevel: "Low" },
      { name: "Summer Beauty Follow-Up", overlappingCustomers: "646", riskLevel: "Low" },
    ],
    exitAnalysis: [
      { code: "Goal Achieved", count: "5,460", percentage: 46.2 },
      { code: "Journey Completed", count: "3,280", percentage: 27.7 },
      { code: "Channel Dropped", count: "1,142", percentage: 9.7 },
      { code: "Frequency Capped", count: "812", percentage: 6.9 },
      { code: "Customer Removed", count: "408", percentage: 3.5 },
      { code: "Max Duration Reached", count: "328", percentage: 2.8 },
      { code: "Manual Exit", count: "168", percentage: 1.4 },
    ],
    governance: {
      approval: "Approved",
      contentEligibility: "Clear",
      frequencyCap: "Warning",
      consentBasis: "Customer Required",
      dataResidency: "Clear",
      legalReview: "Clear",
      healthScore: 95,
    },
    linkedCampaigns: [
      { id: "c1", name: "Summer Beauty Festival", status: "Active" },
      { id: "c2", name: "Cart Recovery Always-On", status: "Active" },
    ],
    linkedAudiences: [
      { id: "a1", name: "Cart Abandoners", status: "Active" },
      { id: "a2", name: "Recent Purchasers", status: "Active" },
      { id: "a3", name: "Loyalty VIP", status: "Active" },
    ],
    recentActivity: [
      { date: "May 14, 10:19 AM", time: "10:19 AM", activity: "Rule Recalculated", user: "System" },
      { date: "May 14, 10:12 AM", time: "10:12 AM", activity: "Auto-Restarted Exception", user: "CRM Marketing" },
      { date: "May 14, 09:55 AM", time: "09:55 AM", activity: "Flow Edited", user: "Dulanjana Perera" },
      { date: "May 14, 09:30 AM", time: "09:30 AM", activity: "Journey Draft Updated", user: "CRM Marketing" },
      { date: "May 14, 08:12 AM", time: "08:12 AM", activity: "Journey Started", user: "System" },
    ],
    version: {
      liveVersion: "v14",
      lastPublished: "Aug 14, 2026 09:30 AM",
      draftVersion: "v15",
      lastEdited: "May 14, 2026 10:05 AM",
      createdBy: "CRM Marketing",
      lastEditedBy: "Marketing Automation Manager",
    },
  },
  rightRail: {
    healthScore: 93,
    metrics: [
      { label: "Trigger Processing", score: 96 },
      { label: "Journey Execution", score: 94 },
      { label: "Channel Delivery", score: 95 },
      { label: "Audience Eligibility", score: 93 },
      { label: "Conversion Tracking", score: 92 },
      { label: "Governance", score: 91 },
      { label: "Queue Health", score: 90 },
    ],
    journeySummary: { total: 38, running: 12, scheduled: 6, draft: 9, paused: 4 },
    customerFlow: { active: "318K", enteredToday: "24.8K", completedToday: "21.2K", convertedToday: "2.46K" },
    deliverySummary: [
      { channel: "Email", score: "97%", status: "Clear" },
      { channel: "Push", score: "95%", status: "Clear" },
      { channel: "SMS", score: "92%", status: "Warning" },
    ],
    exceptionsSummary: { open: 9, critical: 0, warnings: 5, info: 4 },
    approvalSummary: { pending: 4, overdue: 1 },
    quickQueues: [
      { label: "Needs Attention", count: 3, severity: "orange" },
      { label: "Approval Pending", count: 4, severity: "purple" },
      { label: "Trigger Warnings", count: 2, severity: "orange" },
      { label: "Delivery Warnings", count: 3, severity: "orange" },
      { label: "Governance Exceptions", count: 2, severity: "red" },
    ],
  },
};
