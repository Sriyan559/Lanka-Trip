import { SupportPriority } from "@/types/customerSupport";

export type DeliveryRiskLevel = "Low" | "Medium" | "High";

export type DeliverySlaStatus = "On Track" | "At Risk" | "Breached" | "Pending";

export type DeliveryCaseStatus =
  | "Open"
  | "Awaiting Dispatch"
  | "Shipment Delay"
  | "Dispatch Delay"
  | "Tracking Issue"
  | "Failed Delivery"
  | "Waiting Logistics"
  | "Escalated"
  | "Resolved"
  | "Closed";

export interface DeliverySupportCase {
  id: string; // e.g. "CS-2024-001821"
  reference: string;
  customerName: string;
  customerId: string;
  isVip?: boolean;
  loyaltyTier?: string; // e.g. "Gold"
  issueType: string; // e.g. "Dispatch Delay"
  orderSource: string; // e.g. "SLB WEBSITE"
  orderStatus: string; // e.g. "Order Confirmed"
  fulfilmentStatus: string; // e.g. "Ready for Pickup"
  shipmentStatus: string; // e.g. "In Transit"
  shipmentSource: "Connected" | "Disconnected" | "Pending";
  carrier: string; // e.g. "FedEx"
  deliveryStatus: string; // e.g. "Delayed"
  risk: DeliveryRiskLevel;
  slaStatus: DeliverySlaStatus;
  deliverySlaState: "On Track" | "At Risk" | "Breached";
  assignedAgent: string;
  assignedTeam: string;
  lastUpdated: string;
  estimatedResolution: string;
  age: string;

  orderId: string; // e.g. "SLB-7843921"
  fulfilmentId: string; // e.g. "FL-667823"
  deliveryEta: string; // e.g. "Apr 22, 09:00 AM"
  slaDue: string;
}

export interface DeliveryTimelineStage {
  label: string; // e.g. "Order Confirmed"
  timestamp?: string; // e.g. "Apr 19 10:21 AM"
  status: "completed" | "active" | "pending";
}

export interface ChecklistItem {
  label: string;
  isCompleted: boolean;
}

export interface RecoveryPlanStep {
  stepNumber: number;
  label: string;
  status: "Completed" | "In Progress" | "Pending";
}

export interface ExceptionHistoryItem {
  dateTime: string;
  exception: string;
  source: string;
  status: "Open" | "Resolved" | "Pending";
}

export interface SelectedCaseDetailsData {
  caseInfo: DeliverySupportCase;
  caseOverview: {
    caseSource: string;
    created: string;
    issueType: string;
    category: string;
    subcategory: string;
    impact: string;
    customerImpact: string;
  };
  fulfilmentDetails: {
    orderSource: string;
    orderDate: string;
    orderStatus: string;
    fulfilmentSource: string;
    fulfilmentStatus: string;
    warehouse: string;
    shipFrom: string;
  };
  shipmentDetails: {
    shipmentSource: string;
    trackingNumber: string;
    shipmentStatus: string;
    estimatedDelivery: string;
    currentLocation: string;
    lastScan: string;
  };
  carrierTracking: {
    carrier: string;
    serviceLevel: string;
    trackingLink: string;
    proactiveTrackingRisk: string;
  };
  deliveryTimeline: {
    stages: DeliveryTimelineStage[];
    delayReason: string;
    warningAlert: string;
  };
  slaSummary: {
    healthPercent: number;
    slaTarget: string;
    timeRemaining: string;
    stageCompliancePercent: number;
  };
  issueClassification: {
    primaryIssue: string;
    rootCauseLikely: string;
    contributingFactors: string;
    issueDetected: string;
    customerNotified: string;
  };
  investigationChecklist: ChecklistItem[];
  relatedIssues: {
    sameOrderCount: number;
    sameCustomer30dCount: number;
    sameAddress30dCount: number;
    sameTracking30dCount: number;
    similarIssues30dCount: number;
  };
  dependencies: {
    warehouse: { name: string; status: "normal" | "warning" | "danger" };
    inventory: string;
    payment: string;
    fraudReview: string;
    supplier: string;
    carrier: { name: string; status: "normal" | "warning" | "danger" };
  };
  logisticsEscalation: {
    escalationLevel: string;
    escalatedTo: string;
    escalationStatus: string;
    escalatedOn: string;
    nextUpdateEta: string;
  };
  recoveryPlan: {
    progressPercent: number;
    steps: RecoveryPlanStep[];
  };
  customerAvailability: {
    shippingAddress: string;
    deliveryInstructions: string;
    customerAvailability: string;
    bestContactChannel: string;
    doNotDisturb: string;
  };
  customerCommunication: {
    lastContact: string;
    by: string;
    channel: string;
    status: string;
    summary: string;
  };
  customerInput: {
    messageText: string;
    sentiment: string;
    attachmentsCount: number;
    preferredResolution: string;
  };
  slaOverview: {
    dispatch: string;
    transit: string;
    delivery: string;
    overall: string;
  };
  exceptionHistory: ExceptionHistoryItem[];
  repeatIssueAnalysis: {
    repeatIssue30d: string;
    frequency: number;
    lastOccurrence: string;
    pattern: string;
  };
  customerSatisfaction: {
    previousCsat: string;
    thisCaseCsat: string;
    npsImpact: string;
  };
  notes: {
    internalNote: string;
  };
}

export interface DeliveryOperationsRailData {
  healthScore: number;
  scoreLegend: { label: string; range: string; color: string }[];

  caseSummary: {
    open: number;
    closed: number;
    slaAtRisk: number;
    escalated: number;
    unassigned: number;
  };

  fulfilmentSummary: {
    warehouse: { connected: number; pending: number; slaAtRisk: number };
    supplier: { connected: number; pending: number; slaAtRisk: number };
  };

  shipmentSummary: {
    inTransit: number;
    delayed: number;
    outForDelivery: number;
    exception: number;
    attemptedDelivery: number;
  };

  dependencySummary: {
    open: number;
    pending: number;
    resolved: number;
    overdue: number;
  };

  quickLinks: {
    label: string;
    count: number;
    variant: "danger" | "warning" | "info" | "neutral";
  }[];
}
