import { SupportPriority, CustomerSentiment } from "@/types/customerSupport";

export type ConversationChannel =
  | "whatsapp"
  | "email"
  | "web"
  | "instagram"
  | "facebook"
  | "in-app-chat"
  | "sms"
  | "delivery"
  | "returns"
  | "call";

export type ConversationStatus =
  | "new"
  | "open"
  | "in-progress"
  | "waiting-for-agent"
  | "waiting-for-customer"
  | "priority"
  | "escalated"
  | "closed"
  | "archived";

export interface ConversationQueueItem {
  id: string; // e.g. "CON-2024-0512482"
  reference: string;
  customerId: string; // e.g. "CUS-2024-0512482"
  customerName: string;
  customerAvatar?: string;
  isVip?: boolean;
  country: string;
  channel: ConversationChannel;
  channelLabel: string;
  priority: SupportPriority;
  sentiment: CustomerSentiment;
  unreadCount: number;
  slaRemaining: string;
  isSlaAtRisk?: boolean;
  assignedAgentName: string;
  assignedAgentAvatar?: string;
  lastActivityAt: string;
  linkedCaseId?: string;
  status: ConversationStatus;
  statusLabel: string;
  resolutionConfidence: number;
}

export type TimelineMessageType =
  | "customer"
  | "system"
  | "agent"
  | "internal_note"
  | "escalation";

export interface TimelineMessage {
  id: string;
  type: TimelineMessageType;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  content: string;
  isPrivateNote?: boolean;
  badges?: { label: string; variant: "danger" | "warning" | "info" | "neutral" }[];
}

export interface SuggestedReplyData {
  id: string;
  confidencePercent: number;
  text: string;
}

export interface IntelligenceData {
  healthScore: number;
  responseSlaPercent: number;
  resolutionStabilityPercent: number;
  resolutionConfidencePercent: number;
  communicationContinuityPercent: number;

  customerContext: {
    name: string;
    avatar?: string;
    isVip: boolean;
    country: string;
    openCases: number;
    recentCases: number;
    preferredChannel: string;
    repeatContactRate: string;
  };

  linkedCase: {
    caseId: string;
    priority: string;
    subject: string;
    assignedAgent: string;
    orderId: string;
    firstResponse: string;
    status: string;
  };

  relatedRecords: {
    orderId: string;
    shipmentId: string;
    productName: string;
    supplierName: string;
  };

  messageIntelligence: {
    currentSentiment: string;
    tone: string;
    detectedIntent: string;
    urgency: string;
    resolutionRisk: string;
  };

  slaPrognosis: {
    firstResponse: string;
    nextResponseDue: string;
    resolutionTarget: string;
    slaPolicy: string;
    status: string;
  };

  routingSummary: {
    queue: string;
    team: string;
    agent: string;
    workload: string;
    availability: string;
  };
}
