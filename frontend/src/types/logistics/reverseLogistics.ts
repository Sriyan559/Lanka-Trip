// Type definitions for LG11 & LG12 Returns, Collections & Reverse Logistics

export type ReturnType =
  | "Customer Return"
  | "Warranty Return"
  | "Exchange Return"
  | "Supplier Return"
  | "RTO Return"
  | "Damaged Return";

export type CollectionMethod =
  | "Courier Pickup"
  | "Drop-off Station"
  | "Uber Flash"
  | "Self Return"
  | "Luxe Courier"
  | "Home Collection";

export type CollectionStatus =
  | "Scheduled"
  | "Overdue"
  | "Collected"
  | "Failed"
  | "Pending Scheduling"
  | "In Transit"
  | "Collection Failed";

export type InspectionStatus =
  | "Pending"
  | "In Progress"
  | "Passed"
  | "Failed"
  | "Condition Degraded"
  | "Quarantined";

export type ProposedDisposition =
  | "Restock System"
  | "Quarantine"
  | "Return to Supplier"
  | "Dispose"
  | "Exchange"
  | "Refurbish"
  | "Investigation Pending"
  | "Pending";

export interface CollectionAttempt {
  attemptNumber: number;
  timestamp: string;
  status: "Collected" | "Failed" | "Pending";
  notes?: string;
}

export interface ReturnSLASummary {
  eligibilitySLA: "Met" | "Breached" | "Pending";
  collectionSLA: "Met" | "Breached" | "Pending";
  reverseTransitSLA: "Met" | "At Risk" | "Breached" | "Pending";
  warehouseReceiptSLA: "Met" | "Pending" | "Breached";
  inspectionSLA: "Met" | "Pending" | "Breached";
  overallSLA: "On Track" | "At Risk" | "Breached";
}

export interface ReturnCase {
  id: string;
  returnRef: string;
  returnType: ReturnType;
  orderRef: string;
  fulfilmentRef: string;
  originalShipment: string;
  originalTracking?: string;
  customerName: string;
  customerId?: string;
  customerContact: string;
  customerSegment?: string;
  contactState?: string;
  collectionAddressVerified?: boolean;
  supplierName: string;
  productSku: string;
  productName: string;
  brand?: string;
  variant?: string;
  quantity: number;
  returnedQuantity?: number;
  unitValue?: number;
  returnValue: number;
  orderValue?: number;
  paymentStatus?: "Paid" | "Pending" | "Refunded";
  deliveryDate?: string;
  batchLot?: string;
  expiryDate?: string;
  returnReason: string;
  priority?: "Standard" | "High" | "Urgent";
  returnEligibility: "Eligible" | "Ineligible" | "Conditional";
  policyRef?: string;
  returnWindow?: string;
  daysSinceDelivery?: number;
  returnApproval: "Approved" | "Pending Approval" | "Rejected";
  approvedBy?: string;
  approvalExpiry?: string;
  collectionMethod: CollectionMethod;
  carrier: string;
  collectionStatus: CollectionStatus;
  collectionScheduledDate: string;
  pickupWindow?: string;
  collectionAttempts?: CollectionAttempt[];
  reverseShipmentRef: string;
  reverseTrackingNumber: string;
  shipmentStatus: "In Transit" | "Arrived at WH" | "Collected" | "Pickup Scheduled" | "Failed Collection" | "Awaiting Receipt";
  originAddress?: string;
  currentLocation?: string;
  destinationWarehouse: string;
  expectedArrivalDate: string;
  receiptStatus: "Pending" | "Completed" | "Delayed" | "Awaiting Receipt";
  inspectionStatus: InspectionStatus;
  inspectionWindow?: string;
  inspector?: string;
  proposedDisposition: ProposedDisposition;
  approvedDisposition?: ProposedDisposition;
  supplierImpact?: string;
  financialImpact?: string;
  restockStatus: "Pending" | "Completed" | "Quarantined" | "Not Applicable";
  quarantineStatus?: string;
  supplierReturnStatus?: string;
  exchangeStatus?: string;
  refundDependencyStatus: "Pending" | "Cleared" | "Blocked" | "Not Applicable" | "Blocked until inspection";
  slaStatus: "On Track" | "At Risk" | "SLA Breached";
  returnOwner: string;
  dueDate: string;
  updatedAt: string;
  lastUpdatedBy?: string;
  lastEventDescription?: string;

  slaSummary?: ReturnSLASummary;

  lifecycleTimeline?: {
    stage: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
    failed?: boolean;
  }[];
}

export interface ReverseLogisticsMetrics {
  totalReverseCases: number;
  approvedAwaitingCollection: number;
  collectionsScheduled: number;
  collectionsOverdue: number;
  reverseShipmentsInTransit: number;
  returnsAwaitingWarehouseReceipt: number;
  inspectionPending: number;
  restockEligible: number;
  quarantineRequired: number;
  supplierReturnsPending: number;
  reverseExceptions: number;
  reverseSlaBreaches: number;
  collectionSuccessRatePercentage: number;
  averageCollectionTimeDays: string;
  warehouseReceiptSlaPercentage: number;
  inspectionPassRatePercentage: number;
  restockRatePercentage: number;
  averageReverseCycleTimeDays: string;
  lastSynced: string;
}

export interface ReverseLogisticsIntelligenceData {
  healthScore: number;
  healthLabel: "Reverse Logistics Health Score" | "Optimal State" | "At Risk";
  healthTrend: string;
  alerts: {
    id: string;
    message: string;
    count: number;
    severity: "High" | "Medium" | "Low";
  }[];
  returnsSummary: {
    totalCases: number;
    openCases: number;
  };
  collectionSummary: {
    scheduled: number;
    overdue: number;
    failed: number;
  };
  receivingInspectionSummary: {
    awaitingReceipt: number;
    inspectionPending: number;
    passedPercentage: number;
  };
  dispositionSummary: {
    restockEligible: number;
    quarantine: number;
    supplierReturn: number;
  };
  refundDependencySummary: {
    pending: number;
    cleared: number;
    blocked: number;
  };
  slaSummary: {
    onTrack: number;
    atRisk: number;
    breached: number;
  };
  quickQueues: {
    collectionQueue: number;
    inspectionQueue: number;
    dispositionQueue: number;
    exceptionQueue: number;
    reconciliationQueue: number;
  };
}
