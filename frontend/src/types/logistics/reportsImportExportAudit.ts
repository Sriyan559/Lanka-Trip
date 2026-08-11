export type OperationType = "Import" | "Export" | "Report" | "Audit" | "Reconciliation";
export type ValidationStatus = "Passed" | "Failed" | "Pending" | "Quarantined" | "Partial";
export type JobApprovalStatus = "Approved" | "Pending Approval" | "Rejected";
export type ProcessingStatus = "Completed" | "Running" | "Failed" | "Draft" | "Archived";
export type DeliveryStatus = "Delivered" | "Pending" | "Failed" | "N/A";
export type OperationReconciliationStatus = "Reconciled" | "Pending" | "Unmatched" | "Under Investigation";

export interface RejectedRecord {
  row: number;
  sourceRef: string;
  field: string;
  submittedValue: string;
  businessRule: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  resolution: string;
  entryEligible: boolean;
  status: "Open" | "Resolved" | "Ignored";
}

export interface DuplicateRecord {
  duplicateRef: string;
  field: string;
  originalValue: string;
  duplicateCount: number;
  firstOccurrence: string;
  lastOccurrence: string;
  exportAction: string;
  status: "Open" | "Merged" | "Ignored";
}

export interface LogisticsOperationRecord {
  id: string;
  operationRef: string;
  operationType: OperationType;
  logisticsDomain: string;
  reportOrTemplateName: string;
  sourceSystem: string;
  destination: string;
  businessUnit: string;
  salesChannel: string;
  region: string;
  operationalPeriod: string;
  fileType: string;
  fileSize: string;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  rejectedRecords: number;
  duplicateRecords: number;
  quarantinedRecords: number;
  validationStatus: ValidationStatus;
  approvalStatus: JobApprovalStatus;
  processingStatus: ProcessingStatus;
  deliveryStatus: DeliveryStatus;
  reconciliationStatus: OperationReconciliationStatus;
  exportChannel: string;
  encryption: string;
  retention: string;
  legalHold: "Yes" | "No";
  jobOwner: string;
  reviewer: string;
  approver: string;
  createdAt: string;
  completedAt: string;
  updatedAt: string;
  sla: string;
  rejectedRecordsList?: RejectedRecord[];
  duplicateRecordsList?: DuplicateRecord[];
  linkedEntities?: {
    productsSkusCount: number;
    warehousesCount: number;
    shipmentsCount: number;
    purchaseOrdersCount: number;
    carriersCount: number;
  };
}

export interface GovernanceIntelligence {
  healthScore: number;
  healthTrendText: string;
  governanceScorecards: {
    label: string;
    value: number;
    trend: string;
  }[];
  recentReconciliationSummary: {
    title: string;
    actualAmount: number;
    expectedAmount: number;
    matchRate: string;
  }[];
  quickQueues: {
    exportsQueue: number;
    claimsQueue: number;
    reconciliationQueue: number;
    recoveriesQueue: number;
  };
}
