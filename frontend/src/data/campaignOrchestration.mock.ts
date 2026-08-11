export type OrchestrationStepId =
  | "basics"
  | "objectives"
  | "audience"
  | "channels"
  | "content"
  | "schedule"
  | "budget"
  | "promotions"
  | "tracking"
  | "governance"
  | "review";

export type StepStatus = "Complete" | "In Progress" | "Needs Attention" | "Optional" | "Blocked";

export interface StepperItem {
  id: OrchestrationStepId;
  stepNumber: number;
  label: string;
  status: StepStatus;
}

export interface OrchestrationContextData {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  baseCurrency: string;
  campaignType: string;
  editingMode: "Create" | "Edit";
  draftStatus: "Autosaved" | "Saving" | "Failed";
  version: string;
  liveVersion?: string;
  lastSaved: string;
  completenessPercent: number;
  governanceChecks: string;
  access: string;
}

export interface ChannelCardData {
  id: string;
  name: string;
  type: "Email" | "Web/App" | "Paid Social";
  status: "Ready" | "Needs Attention";
  fields: Array<{ label: string; value: string }>;
  warning?: {
    message: string;
    actionText: string;
  };
}

export interface FlowMapNode {
  id: string;
  name: string;
  type: "root" | "audience" | "channel" | "execution";
  status?: "Ready" | "Needs Attention";
  subtext?: string;
  sequenceNumber?: number;
}

export interface ValidationIssue {
  id: string;
  type: "blocker" | "warning" | "pending";
  title: string;
  description: string;
  actionText: string;
  targetStep: OrchestrationStepId;
}

export interface ValidationRailData {
  readinessScore: number;
  readinessLabel: string;
  statusText: string;
  summary: {
    passed: number;
    warnings: number;
    blocker: number;
    pending: number;
  };
  blockers: ValidationIssue[];
  warnings: ValidationIssue[];
  pending: ValidationIssue[];
}

export interface FullCampaignOrchestrationData {
  campaignId: string;
  code: string;
  title: string;
  lifecycleStatus: string;
  approvalStatus: string;
  isLive: boolean;
  liveVersion: string;
  draftVersion: string;
  context: OrchestrationContextData;
  stepper: StepperItem[];
  channels: ChannelCardData[];
  flowNodes: FlowMapNode[];
  validation: ValidationRailData;
}

export const mockCampaignOrchestrationData: FullCampaignOrchestrationData = {
  campaignId: "MKT-2026-0087",
  code: "MKT-2026-0087",
  title: "Summer Beauty Festival",
  lifecycleStatus: "Active",
  approvalStatus: "Approved",
  isLive: true,
  liveVersion: "v6",
  draftVersion: "v7",
  context: {
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "Beauty Retail",
    region: "Sri Lanka",
    baseCurrency: "LKR",
    campaignType: "Consumer Beauty",
    editingMode: "Edit",
    draftStatus: "Autosaved",
    version: "Draft v7",
    liveVersion: "v6",
    lastSaved: "May 14, 2026 10:42 AM",
    completenessPercent: 72,
    governanceChecks: "In Progress",
    access: "Assigned business contact",
  },
  stepper: [
    { id: "basics", stepNumber: 1, label: "Campaign Basics", status: "Complete" },
    { id: "objectives", stepNumber: 2, label: "Objectives & Success Metrics", status: "Complete" },
    { id: "audience", stepNumber: 3, label: "Audience & Eligibility", status: "Complete" },
    { id: "channels", stepNumber: 4, label: "Channels", status: "In Progress" },
    { id: "content", stepNumber: 5, label: "Content & Creative", status: "Needs Attention" },
    { id: "schedule", stepNumber: 6, label: "Schedule & Timing", status: "Complete" },
    { id: "budget", stepNumber: 7, label: "Budget & Spend Controls", status: "Complete" },
    { id: "promotions", stepNumber: 8, label: "Marketplace Promotions", status: "Optional" },
    { id: "tracking", stepNumber: 9, label: "Tracking & Attribution", status: "Complete" },
    { id: "governance", stepNumber: 10, label: "Governance & Consent", status: "Needs Attention" },
    { id: "review", stepNumber: 11, label: "Review & Approval", status: "Blocked" },
  ],
  channels: [
    {
      id: "email",
      name: "Email",
      type: "Email",
      status: "Ready",
      fields: [
        { label: "Sender Profile", value: "SL Beauty Marketing" },
        { label: "Template", value: "Seasonal Beauty Master" },
        { label: "Send Strategy", value: "Optimized Send Time" },
        { label: "Frequency Cap", value: "2 emails / 7 days" },
      ],
    },
    {
      id: "webapp",
      name: "Web/App",
      type: "Web/App",
      status: "Ready",
      fields: [
        { label: "Placements", value: "Homepage Hero, Summer Landing Page" },
        { label: "Onsite", value: "Summer Beauty Festival Banner Banners" },
        { label: "Personalization", value: "Audience-based" },
      ],
    },
    {
      id: "paidsocial",
      name: "Paid Social",
      type: "Paid Social",
      status: "Needs Attention",
      fields: [
        { label: "Platforms", value: "Meta Ads" },
        { label: "Account", value: "SL Beauty Sri Lanka" },
        { label: "Objective", value: "Sales" },
        { label: "Audience Sync", value: "482K matched / 497K targetable" },
        { label: "Budget", value: "LKR 1.8M" },
        { label: "Bid Strategy", value: "Maximize Conversions" },
        { label: "Creative", value: "Static + CAP" },
      ],
      warning: {
        message: "CPA target missing",
        actionText: "Resolve",
      },
    },
  ],
  flowNodes: [
    { id: "root", name: "Summer Beauty Festival", type: "root" },
    { id: "audience", name: "Campaign Audience", type: "audience", subtext: "482K Eligible" },
    { id: "ch-email", name: "Email", type: "channel", status: "Ready" },
    { id: "ch-webapp", name: "Web/App", type: "channel", status: "Ready" },
    { id: "ch-social", name: "Paid Social", type: "channel", status: "Needs Attention" },
    { id: "ex-email", name: "Email Send", type: "execution", sequenceNumber: 1, subtext: "Day 1 (09:00 AM)" },
    { id: "ex-webapp", name: "Web/App Live", type: "execution", sequenceNumber: 2, subtext: "Day 1 (12:00 PM)" },
    { id: "ex-social", name: "Paid Social Activation", type: "execution", sequenceNumber: 3, subtext: "Day 1 (02:00 PM)" },
  ],
  validation: {
    readinessScore: 82,
    readinessLabel: "82/100 Readiness",
    statusText: "Campaign needs attention to meet submission criteria.",
    summary: {
      passed: 18,
      warnings: 2,
      blocker: 1,
      pending: 1,
    },
    blockers: [
      {
        id: "b1",
        type: "blocker",
        title: "Paid Social CPA Target Missing",
        description: "A target CPA or cost justification is required for Paid Social as you can occur.",
        actionText: "Resolve in Channels →",
        targetStep: "channels",
      },
    ],
    warnings: [
      {
        id: "w1",
        type: "warning",
        title: "2 Social Creatives Pending",
        description: "Review and upload high-res creative assets.",
        actionText: "Review in Creative →",
        targetStep: "content",
      },
      {
        id: "w2",
        type: "warning",
        title: "Frequency Cap Overlap",
        description: "2 channels may exceed weekly contact limits.",
        actionText: "Review Audience →",
        targetStep: "audience",
      },
    ],
    pending: [
      {
        id: "p1",
        type: "pending",
        title: "Marketing Director Approval Pending",
        description: "Waiting for approval to unlock.",
        actionText: "View Workflow →",
        targetStep: "review",
      },
    ],
  },
};
