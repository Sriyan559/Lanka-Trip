export type ExceptionSeverity = "Critical" | "High" | "Medium" | "Low";
export type ExceptionType =
  | "Carrier Charge Variance"
  | "Lost Shipment"
  | "Weight Discrepancy"
  | "COD Variance"
  | "Reverse Logistics Dispute"
  | "Damaged Item"
  | "Failed Delivery"
  | "Warehouse Charge Discrepancy"
  | "Revenue Leakage"
  | "SLA Breach";

export type ClaimType = "Carrier Claim" | "Supplier Claim" | "Customer Claim" | "Internal Liability";
export type LiabilityParty = "Carrier" | "Supplier" | "Warehouse" | "Internal Ops" | "Customer";
export type MatchStatus = "Matched" | "Partially Matched" | "Unmatched" | "Missing External Record" | "Missing Internal Record" | "Duplicate";
export type ReconciliationStatus = "Reconciled" | "Pending Verification" | "Under Investigation" | "Unreconciled" | "Closed";
export type InvestigationStatus = "Pending" | "In Progress" | "Evidence Requested" | "Investigation Complete";
export type ApprovalStatus = "Pending Approval" | "Approved" | "Rejected";
export type RecoveryStatus = "Pending" | "Initiated" | "Confirmed" | "Recovered" | "Waived";

export interface EvidenceItem {
  id: string;
  source: string;
  fileName: string;
  uploadedDate: string;
  status: "Verified" | "Pending Review" | "Rejected";
  score: string;
  notes?: string;
  uploader?: string;
}

export interface ClaimWorkflowStep {
  stage: string;
  status: "completed" | "current" | "pending" | "exception";
  timestamp?: string;
  notes?: string;
}

export interface LogisticsExceptionRecord {
  id: string;
  referenceId: string;
  recordType: "Exception" | "Claim" | "Cost Variance" | "Unmatched Record";
  exceptionType: ExceptionType;
  severity: ExceptionSeverity;
  claimRef: string;
  claimType: ClaimType;
  orderRef: string;
  fulfilmentRef: string;
  shipmentRef?: string;
  carrier: string;
  warehouse: string;
  supplierName: string;
  customerName: string;
  costType: string;
  expectedAmount: number;
  actualAmount: number;
  varianceAmount: number;
  claimValue: number;
  recoveryExpected: number;
  recoveryRecovered: number;
  liabilityParty: LiabilityParty;
  matchStatus: MatchStatus;
  reconciliationStatus: ReconciliationStatus;
  evidenceStatus: "Verified" | "Evidence Requested" | "Pending";
  investigationStatus: InvestigationStatus;
  approvalStatus: ApprovalStatus;
  recoveryStatus: RecoveryStatus;
  holdStatus: "No Hold" | "Active Hold" | "Hold Released";
  slaStatus: "On Track" | "At Risk" | "Breached";
  owner: string;
  createdDate: string;
  updatedDate: string;
  evidenceList?: EvidenceItem[];
  workflowSteps?: ClaimWorkflowStep[];
  liabilitySplit?: {
    carrierPct: number;
    warehousePct: number;
    supplierPct: number;
    customerPct: number;
    internalPct: number;
  };
}

export interface LogisticsControlIntelligence {
  healthScore: number;
  healthTrendText: string;
  priorityAlerts: {
    title: string;
    count: number;
    severity: "critical" | "warning" | "info";
  }[];
  exceptionsSummary: {
    totalOpen: number;
    critical: number;
    high: number;
  };
  claimsSummary: {
    open: number;
    pendingCarrierResponse: number;
    overdue: number;
  };
  costSummary: {
    variancesCount: number;
    unreconciledCost: number;
  };
  reconciliationSummary: {
    unmatchedRecords: number;
    exceptionsCount: number;
  };
  recoverySummary: {
    pendingRecoveriesCount: number;
    overdueCount: number;
    recoveredAmount: number;
  };
  controlSummary: {
    breaches: number;
    slaBreaches: number;
    holdsActive: number;
  };
  quickQueues: {
    exceptionsQueue: number;
    claimsQueue: number;
    reconciliationQueue: number;
    recoveriesQueue: number;
  };
}
