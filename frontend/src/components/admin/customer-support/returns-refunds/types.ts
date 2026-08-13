import { SupportPriority } from "@/types/customerSupport";

export type ReturnCasePriority = "Low" | "Medium" | "High" | "Critical";

export type ReturnStatus =
  | "Requested"
  | "Pickup Open"
  | "Collected"
  | "In Transit"
  | "Delivered"
  | "Received"
  | "Inspection"
  | "Completed"
  | "Rejected"
  | "—";

export type RefundStatus =
  | "Pending"
  | "Refund Pending"
  | "Approved"
  | "Refund Approved"
  | "Failed"
  | "Refund Failed"
  | "Rejected"
  | "Partial"
  | "Completed"
  | "—";

export type DisputeStatus =
  | "No Dispute"
  | "Dispute Open"
  | "Under Review"
  | "Awaiting Decision"
  | "Resolved"
  | "—";

export interface ReturnRefundCase {
  id: string; // e.g. "CS-2026-008315"
  reference: string;
  customerName: string;
  customerId: string;
  isVip?: boolean;
  priority: ReturnCasePriority;
  issueType: string; // e.g. "Refund Delay"
  caseStatus: string; // e.g. "Refund Pending"
  relatedOrderId: string; // e.g. "ORD-1029381"
  returnRef: string; // e.g. "RET-2026-7831"
  returnStatus: ReturnStatus;
  pickupStatus: string; // e.g. "Collected"
  inspectionStatus: string; // e.g. "Inspection Pass"
  refundRef: string; // e.g. "RFD-2026-4421"
  refundStatus: RefundStatus;
  refundAmount: string; // e.g. "LKR 12,450.00"
  disputeStatus: DisputeStatus;
  eligibility: "Eligible" | "Under Review" | "Not Eligible";
  supplier: string; // e.g. "GlowLine"
  dependency: string; // e.g. "Waiting Finance"
  sentiment: "Concerned" | "Neutral" | "Satisfied" | "Very Concerned";
  risk: "High" | "Medium" | "Low";
  slaStatus: "At Risk" | "On Track" | "Breached";
  assignedAgent: string;
  assignedTeam: string;
  lastCustomerUpdate: string;
  age: string;
}

export interface RefundTimelineStage {
  label: string;
  timestamp?: string;
  status: "completed" | "active" | "pending";
}

export interface InspectionDetails {
  status: string;
  result: string;
  condition: string;
  packaging: string;
  date: string;
  inspector: string;
  eligibilityResult: string;
}

export interface ExceptionHistoryItem {
  dateTime: string;
  exception: string;
  status: "Open" | "Resolved" | "Pending";
}

export interface SelectedReturnRefundCaseDetailsData {
  caseInfo: ReturnRefundCase;
  summaryMetrics: {
    caseAge: string;
    returnAge: string;
    refundValue: string;
    refundDelay: string;
    customerContactsCount: number;
    currentDependency: string;
    nextCustomerUpdate: string;
    caseHealthPercent: number;
  };
  originalOrder: {
    orderId: string;
    orderDate: string;
    creditValue: string;
    status: string;
    customer: string;
    returnableValue: string;
  };
  returnDetails: {
    returnRef: string;
    reason: string;
    requestedDate: string;
    returnStatus: string;
    eligibility: string;
    returnMethod: string;
    returnValue: string;
  };
  reverseLogistics: {
    collectionStatus: string;
    pickupDate: string;
    carrier: string;
    waybill: string;
    warehouseReceipt: string;
    returnLogisticsSla: string;
    lastLogisticsUpdate: string;
  };
  inspection: InspectionDetails;
  refundDetails: {
    refundRef: string;
    refundStatus: string;
    requestedAmount: string;
    approvedAmount: string;
    paymentMethod: string;
    expectedCompletion: string;
  };
  refundTimeline: {
    stages: RefundTimelineStage[];
  };
  timingAnalysis: {
    expectedReturnCompletion: string;
    actualReturnCompletion: string;
    expectedRefundApproval: string;
    actualRefundApproval: string;
    expectedRefundCompletion: string;
    currentRefundCommitment: string;
    refundVariance: string;
    confidencePercent: number;
  };
  eligibilityPolicy: {
    returnWindow: string;
    productCondition: string;
    productCategory: string;
    fraudSafeEvaluation: string;
    hygieneRestriction: string;
    promotionalRestriction: string;
    proofOfPurchase: string;
    overallEligible: string;
    policyCode: string;
  };
  disputeWorkspace: {
    disputeRef: string;
    reason: string;
    customerPosition: string;
    evidenceCompleteness: string;
    customerClaim: string;
    escalationLevel: string;
    decisionDue: string;
  };
  investigationChecklist: { label: string; isCompleted: boolean }[];
  blockingIssues: {
    financeProcessing: string;
    customerUpdateDue: string;
    inspectionPending: string;
  };
  dependencies: {
    logistics: string;
    warehouseQa: string;
    finance: string;
    supplier: string;
    customer: string;
    compliance: string;
  };
  financeEscalation: {
    escalationStatus: string;
    owner: string;
    reason: string;
    escalatedAt: string;
    nextEscalation: string;
    due: string;
  };
  recoveryPlan: {
    progressPercent: number;
    steps: { stepNumber: number; label: string; status: "done" | "in progress" | "pending" }[];
  };
  customerCommunication: {
    latestMessage: string;
    sentiment: string;
    botArticleUsed: string;
    agentNotes: string;
    customerFollowUp: string;
    lastContact: string;
  };
  customerImpact: {
    sentiment: string;
    repeatContactRisk: string;
    churnRisk: string;
    financialImpact: string;
    reputationRisk: string;
  };
  returnRefundSla: {
    metric: string;
    target: string;
    status: "Met" | "At Risk" | "Breached";
  }[];
  exceptionHistory: ExceptionHistoryItem[];
  repeatIssueAnalysis: {
    previousReturns90d: number;
    productReturnRate: string;
    itemLevelOutcome: string;
    exchangeEligibility: string;
  };
}

export interface ReturnsRefundOperationsRailData {
  healthScore: number;
  scoreLegend: { label: string; range: string; color: string }[];

  caseSummary: {
    open: number;
    critical: number;
    atRisk: number;
    escalated: number;
    reopened: number;
  };

  returnSummary: {
    pending: number;
    pickupDelayed: number;
    inspectionPending: number;
    rejected: number;
  };

  refundSummary: {
    pending: number;
    approved: number;
    failed: number;
    rejected: number;
    partial: number;
  };

  disputeSummary: {
    active: number;
    highSeverity: number;
    refundAmountCount: number;
    awaitingDecision: number;
  };

  dependencySummary: {
    waitingLogistics: number;
    waitingFinance: number;
    waitingSupplier: number;
    waitingCustomer: number;
  };

  quickQueues: {
    label: string;
    count: number;
    variant: "danger" | "warning" | "info" | "neutral";
  }[];
}
