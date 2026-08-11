// Type definitions for LG08 Shipment Detail & Carrier Tracking

export type ShipmentState =
  | "Eligible"
  | "Created"
  | "Validated"
  | "Carrier Selected"
  | "Carrier Assigned"
  | "Pickup Requested"
  | "Pickup Scheduled"
  | "Carrier Arrived"
  | "Handoff Confirmed"
  | "Collected"
  | "In Transit"
  | "Delivery Hub"
  | "Cluster Delivery"
  | "Out for Delivery"
  | "Delivery Attempt"
  | "Delivered"
  | "POD Captured"
  | "COD Confirmed"
  | "Reconciled"
  | "Closed"
  | "Archived";

export type DeliveryState =
  | "Pending Pickup"
  | "Collected"
  | "In Transit"
  | "At Delivery Hub"
  | "Out for Delivery"
  | "Failed Attempt"
  | "Delivered"
  | "Returned to Origin";

export type ServiceHealthStatus = "Healthy" | "Degraded" | "Critical";

export interface ServiceHealthItem {
  id: string;
  name: string;
  status: ServiceHealthStatus;
}

export interface ShipmentPackage {
  id: string;
  packageRef: string;
  packageType: string;
  fulfilmentRef: string;
  itemCount: number;
  weight: string;
  dimensions: string;
  declaredValue: string;
  labelStatus: "Printed" | "Pending" | "Voided";
  barcode: string;
  sealStatus: "Intact" | "Broken" | "Unsealed";
  fragile: boolean;
  tempCtrl: boolean;
  specialHandling: string;
  packageStatus: "In Transit" | "Delivered" | "Pending" | "Exception";
}

export interface CarrierAlternative {
  id: string;
  carrierName: string;
  logo?: string;
  service: string;
  coverage: string;
  capacity: "High" | "Medium" | "Low";
  pickupWindow: string;
  eta: string;
  rate: string;
  slaScore: number;
  podRate: number;
  damageRate: number;
  trackingQuality: number;
  eligibility: "Eligible" | "Ineligible";
  score: number;
  isCurrent?: boolean;
}

export interface PickupOperation {
  pickupRef: string;
  requestedAt: string;
  scheduledAt: string;
  pickupWindow: string;
  warehouse: string;
  dock: string;
  courierName: string;
  courierContact: string;
  pickupEta: string;
  carrierArrival: string;
  handoffConfirmed: string;
  collectedAt: string;
  packageCount: number;
  pickupSla: string;
  status: "Collected" | "Pending" | "Failed" | "Scheduled";
  timeline: {
    stage: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface TrackingEvent {
  id: string;
  dateTime: string;
  carrier: string;
  providerEventCode: string;
  providerEvent: string;
  normalizedEvent: string;
  location: string;
  hub: string;
  source: "API" | "Manual" | "Webhook" | "EDI";
  confidence: number;
  rawEventValid: boolean;
  result: "Success" | "Warning" | "Failure";
}

export interface TrackingIntegrityMetrics {
  rawEventsCount: number;
  normalizedEventsCount: number;
  duplicateEventsCount: number;
  outOfOrderEventsCount: number;
  missingMilestonesCount: number;
  trackingConflictsCount: number;
  timestampConflictsCount: number;
  locationConflictsCount: number;
  normalizationConfidence: number;
  lastSync: string;
}

export interface TransitMilestone {
  id: string;
  milestone: string;
  scheduledTime: string;
  actualTime: string;
  variance: string;
  location: string;
  hubName: string;
  status: "Completed / On Time" | "Completed / Delayed" | "Pending" | "Exception";
}

export interface TransitOperations {
  originHub: string;
  currentHub: string;
  destinationHub: string;
  distanceProgress: string;
  estRemainingTime: string;
  hubDwellTime: string;
  routeInstruction: string;
  hubRisk: "Low" | "Medium" | "High";
  milestones: TransitMilestone[];
}

export interface DeliveryAttempt {
  attemptNumber: number;
  dateTime: string;
  courier: string;
  location: string;
  result: string;
  failureReason: string;
  customerContacted: boolean;
  evidence: string;
  nextAction: string;
  retryScheduled: string;
  status: string;
}

export interface PODGovernanceData {
  podStatus: "Pending" | "Captured" | "Rejected" | "Verified";
  deliveryTimestamp: string;
  recipient: string;
  recipientType: string;
  signatureStatus: "Pending" | "Captured" | "Missing";
  photoStatus: "Pending" | "Captured" | "Missing";
  otpStatus: "Pending" | "Verified" | "Failed";
  geoValidation: "Pending" | "Verified" | "Mismatch";
  deliveryLocationMatch: "Pending" | "Passed" | "Failed";
  courierConfirmation: "Pending" | "Confirmed";
  carrierConfirmation: "Pending" | "Confirmed";
  evidenceIntegrity: "Pending" | "Verified";
  podReviewStatus: "Pending" | "Approved" | "Flagged";
}

export interface CODSummaryData {
  codRequired: boolean;
  codAmount: string;
  collectionStatus: "N/A" | "Pending" | "Collected" | "Failed";
  reconciliationStatus: "Not Required" | "Pending" | "Reconciled";
  collectedAmount?: string;
  variance?: string;
}

export interface CostDetailData {
  baseShippingCharge: string;
  fuelSurcharge: string;
  remoteAreaCharge: string;
  handlingCharge: string;
  specialHandlingCharge: string;
  totalCarrierCharge: string;
}

export interface ReconciliationSummaryData {
  shipmentChargeReconciledStatus: "Not Required" | "Pending" | "Reconciled" | "Disputed";
  reconciledAmount: string;
  variance: string;
  auditTrailAvailable: boolean;
}

export interface HoldSummaryData {
  placed: number;
  activeHolds: number;
  approvedHolds: number;
  releasePending: number;
  releaseStatus: string;
  notes?: string;
}

export interface ExceptionSummaryData {
  totalExceptions: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface SLASummaryData {
  slaPlan: string;
  slaProgress: number;
  slaRisk: "Low" | "Medium" | "High";
  onTrack: boolean;
  promisedDelivery: string;
  actualEstimate: string;
}

export interface RecordAlert {
  id: string;
  message: string;
  timeAgo: string;
  severity: "High" | "Medium" | "Low" | "Info";
}

export interface ShipmentIntelligenceData {
  healthScore: number;
  healthLabel: "Excellent" | "Good" | "At Risk" | "Critical";
  healthPercentile: string;
  alerts: RecordAlert[];
  snapshot: {
    state: string;
    deliveryState: string;
    slaProgress: number;
    eta: string;
  };
  packageSummary: {
    count: number;
    weight: string;
    value: string;
  };
  carrierSummary: {
    name: string;
    status: string;
    slaMet: boolean;
  };
  trackingSummary: {
    completeness: number;
    normalizedEvents: number;
    gaps: number;
  };
  deliverySummary: {
    attempts: number;
    status: string;
    etaVariance: string;
  };
  podCodSummary: {
    podStatus: string;
    codRequired: boolean;
    codCollected: string;
  };
}

export interface ShipmentDetail {
  id: string;
  shipmentRef: string;
  trackingRef: string;
  shipmentType: string;
  shipmentState: ShipmentState;
  deliveryState: DeliveryState;
  priority: "Standard" | "Express" | "Urgent" | "Economy";
  owner: string;
  created: string;
  updated: string;
  recordVersion: string;

  tenant: string;
  ecosystem: string;
  businessUnit: string;
  salesChannel: string;
  region: string;
  baseCurrency: string;
  shipmentScope: string;
  operationalPeriod: string;
  liveData: boolean;
  dataCompleteness: number;
  updatedBy: string;

  fulfilmentRef: string;
  orderRef: string;
  customerName: string;
  supplierName: string;
  orderValue: string;
  paymentStatus: "Paid" | "Pending" | "Refunded" | "Partial";

  originWarehouse: string;
  facility: string;
  originDistrict: string;
  dispatchDock: string;
  destinationRegion: string;
  destinationDistrict: string;
  destinationCity: string;
  deliveryZone: string;
  addressValidation: "Verified" | "Unverified" | "Pending";

  carrierName: string;
  courierName: string;
  carrierRef: string;
  shippingService: string;
  serviceLevel: string;
  pickupWindow: string;
  transitTarget: string;
  promisedDelivery: string;
  carrierSlaScore: number;

  statusBadges: string[];

  // KPI Metrics
  kpis: {
    packageCount: number;
    shipmentWeight: string;
    shipmentValue: string;
    shippingCost: string;
    codAmount: string;
    trackingCompleteness: number;
    transitProgress: number;
    deliveryAttempts: number;
    slaProgress: number;
    trackingGap: number;
    etaVariance: string;
    healthScore: number;
  };

  // Sub-sections
  packages: ShipmentPackage[];
  carrierAssignment: CarrierAlternative;
  carrierAlternatives: CarrierAlternative[];
  pickup: PickupOperation;
  trackingEvents: TrackingEvent[];
  trackingIntegrity: TrackingIntegrityMetrics;
  transit: TransitOperations;
  deliveryAttemptsList: DeliveryAttempt[];
  pod: PODGovernanceData;
  cod: CODSummaryData;
  costs: CostDetailData;
  reconciliation: ReconciliationSummaryData;
  holds: HoldSummaryData;
  exceptions: ExceptionSummaryData;
  sla: SLASummaryData;
  intelligence: ShipmentIntelligenceData;
}
