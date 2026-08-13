import { SupportPriority, CustomerSentiment } from "@/types/customerSupport";

export type ComplaintSeverity = "Low" | "Medium" | "High" | "Critical";

export type ComplaintStatus =
  | "Open"
  | "In Progress"
  | "Escalated"
  | "Executive Review"
  | "Waiting Customer"
  | "Resolved"
  | "Closed"
  | "Reopened";

export type RecoveryStatus =
  | "Pending"
  | "Active"
  | "Completed"
  | "Customer Accepted"
  | "Customer Rejected";

export type RemedyStatus =
  | "Pending"
  | "Pending Approval"
  | "Approved"
  | "Rejected";

export interface ComplaintItem {
  id: string; // e.g. "CMP-2025-00284"
  reference: string;
  relatedCaseId?: string; // e.g. "CS-2025-008241"
  customerName: string;
  customerId: string;
  isVip?: boolean;
  severity: ComplaintSeverity;
  status: ComplaintStatus;
  category: string; // e.g. "Delivery Failure"
  issueType: string; // e.g. "Shipment Not Dispatched"
  rootCause: string; // e.g. "Carrier Assignment Failure"
  escalationLevel: string; // e.g. "Support Manager"
  sentiment: CustomerSentiment;
  customerImpact: "Low" | "Medium" | "High" | "Critical";
  financialImpact: "Low" | "Medium" | "High" | "Critical";
  slaStatus: "Within SLA" | "At Risk" | "Breached";
  recoveryStatus: RecoveryStatus;
  remedyStatus: RemedyStatus;
  assignedOwner: string;
  assignedTeam: string;
  relatedOrderId: string;
  supplierName: string;
  lastActivityAt: string;
  age: string;
}

export interface ComplaintLifecycleStep {
  label: string;
  status: "completed" | "in-progress" | "pending";
}

export interface RecoveryPlanStep {
  stepNumber: number;
  label: string;
  status: "Completed" | "In Progress" | "Pending";
}

export interface ComplaintDetailsData {
  complaint: ComplaintItem;
  customerStatement: {
    text: string;
    tags: string[];
  };
  lifecycle: ComplaintLifecycleStep[];
  escalation: {
    currentLevel: string;
    previousLevel: string;
    escalationDue: string;
    reason: string;
    hierarchy: { name: string; isCurrent: boolean }[];
    dependencies: string[];
  };
  rootCauseAnalysis: {
    primary: string;
    domain: string;
    repeatFailure: string;
    similarComplaintsCount: number;
    confidencePercent: number;
    factors: { label: string; percent: number }[];
  };
  recoveryPlan: {
    slaState: string;
    steps: RecoveryPlanStep[];
  };
  remedyApproval: {
    approvedValue: string;
    approvalAuthority: string;
    approvedBy: string;
    approvalTime: string;
  };
  customerRecoveryOffer: {
    offerType: string;
    status: string;
    sendWhen: string;
    customerState: string;
  };
  customerAcceptance: {
    states: { label: string; isActive: boolean; variant?: string }[];
  };
  relatedSupportHistory: {
    linkedCaseId: string;
    conversationId: string;
    previousComplaintId: string;
  };
  relatedOperationalRecords: {
    orderId: string;
    shipmentId: string;
    paymentId: string;
    returnId: string;
    productName: string;
    supplierName: string;
    carrierName: string;
  };
  crossModuleDependencies: {
    module: string;
    status: string;
    team: string;
    slaRemaining?: string;
  }[];
  complaintSla: {
    acknowledgementTarget: string;
    acknowledgementElapsed: string;
    investigationTarget: string;
    investigationElapsed: string;
    recoveryPlanTarget: string;
    recoveryPlanElapsed: string;
    customerUpdateInterval: string;
    currentSlaState: string;
    policy: string;
  };
  reopenedQueueSummary: {
    reopenedCount: number;
    customerSupportFailureCount: number;
    repeatFailureCount: number;
    executiveEscalationCount: number;
  };
  executiveReviewQueue: {
    id: string;
    severity: string;
    reason: string;
    businessImpact: string;
    owner: string;
    age: string;
  }[];
  evidenceAttachments: { category: string; count: number }[];
}

export interface ComplaintOperationsRailData {
  healthScore: number;
  responseSlaPercent: number;
  resolutionStabilityPercent: number;
  customerConfidencePercent: number;
  recoveryEffectivenessPercent: number;
  communicationContinuityPercent: number;

  complaintSummary: {
    open: number;
    critical: number;
    escalated: number;
    executive: number;
    reopened: number;
  };

  recoverySummary: {
    activePlans: number;
    pending: number;
    completedToday: number;
    customerAccepted: number;
    customerRejected: number;
  };

  remedySummary: {
    pendingApproval: number;
    approved: number;
    rejected: number;
    cashRefund: number;
    goodwill: number;
  };

  slaSummary: {
    withinTargetPercent: number;
    atRisk: number;
    breached: number;
    avgComplaintAge: string;
  };

  rootCauseSummary: {
    category: string;
    percent: number;
  }[];

  quickQueues: {
    label: string;
    count: number;
    variant: "danger" | "warning" | "info" | "neutral";
  }[];
}
