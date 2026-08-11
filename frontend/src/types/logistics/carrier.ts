// Type definitions for LG09 Carriers, Couriers & Delivery Partners

export type CarrierType =
  | "National Courier"
  | "Regional Courier"
  | "Same-Day Partner"
  | "3PL"
  | "Internal Fleet"
  | "Specialist Carrier";

export type CarrierApprovalStatus =
  | "Approved"
  | "Pending Review"
  | "Rejected"
  | "Conditional";

export type CarrierOperationalStatus =
  | "Active"
  | "Limited Service"
  | "Suspended"
  | "On Hold"
  | "Compliance Review"
  | "Capacity Restricted"
  | "Pending Review"
  | "Offline";

export interface CarrierService {
  id: string;
  name: string;
  code: string;
  serviceType: "Same-Day" | "Next-Day" | "Standard" | "Express" | "Reverse Logistics";
  cutoffTime: string;
  targetTransitDays: number;
  active: boolean;
}

export interface CarrierCoverage {
  regionsCovered: number;
  totalRegions: number;
  districtsCovered: number;
  totalDistricts: number;
  deliveryZonesCovered: number;
  totalDeliveryZones: number;
  islandwidePercentage: number;
}

export interface CarrierCapacity {
  dailyCapacity: number;
  currentLoad: number;
  remainingCapacity: number;
  peakCapacity: number;
  utilizationPercentage: number;
}

export interface CarrierPerformance {
  assignedShipments: number;
  deliveredShipments: number;
  onTimePickupPercentage: number;
  onTimeDeliveryPercentage: number;
  firstAttemptDeliveryPercentage: number;
  trackingCompletenessPercentage: number;
  podCompletenessPercentage: number;
  failedDeliveryPercentage: number;
  damageRatePercentage: number;
  openClaimsCount: number;
  claimsRatePercentage: number;
  codExceptionsCount: number;
  slaStatus: "On Track" | "At Risk" | "Breached" | "Suspended";
}

export interface CarrierTrackingIntegration {
  type: "API" | "Webhook" | "SFTP" | "Manual" | "EDI";
  completenessPercentage: number;
  exceptionsCount: number;
  apiGatewayHealth: "Healthy" | "Degraded" | "Offline";
  lastSyncTimestamp: string;
}

export interface CarrierCompliance {
  insuranceActive: boolean;
  contractActive: boolean;
  identityVerified: boolean;
  legalReviewCompleted: boolean;
  auditScore: number;
  complianceReadyPercentage: number;
}

export interface CarrierAlert {
  id: string;
  message: string;
  count: number;
  severity: "High" | "Medium" | "Low" | "Info";
  category: "Capacity" | "Gateway" | "POD" | "Claims" | "COD";
}

export interface CarrierNetworkIntelligenceData {
  healthScore: number;
  healthLabel: "Excellent" | "Good" | "At Risk" | "Critical";
  healthDescription: string;
  healthTrend: string;
  alerts: CarrierAlert[];
  carrierSummary: {
    totalCarriers: number;
    active: number;
    limited: number;
    suspended: number;
  };
  capacitySummary: {
    utilizationPercentage: number;
    totalCapacity: string;
    usedCapacity: string;
    remainingCapacity: string;
  };
  shipmentSummary: {
    assigned: number;
    delivered: number;
    inTransit: number;
    failed: number;
  };
  performanceSummary: {
    onTimePickupPercentage: number;
    onTimeDeliveryPercentage: number;
    firstAttemptPercentage: number;
    trackingCompletePercentage: number;
  };
  claimsCodSummary: {
    claimsOpen: number;
    codExceptions: number;
    reconciliation: number;
    claimsRatePercentage: number;
  };
  complianceSummary: {
    complianceReadyPercentage: number;
    insuranceActiveRatio: string;
    contractActiveCount: number;
    auditCompletePercentage: number;
  };
  quickQueues: {
    pickupQueue: number;
    dispatchQueue: number;
    exceptionQueue: number;
    carrierReview: number;
  };
}

export interface Carrier {
  id: string;
  carrierRef: string;
  carrierName: string;
  logo?: string;
  carrierType: CarrierType;
  operator: string;
  businessRegNo: string;
  contactNumber: string;
  email: string;
  contractStart: string;
  contractEnd: string;
  paymentTerms: string;
  currency: string;

  approvalStatus: CarrierApprovalStatus;
  operationalStatus: CarrierOperationalStatus;

  regionCoverageText: string;
  coverage: CarrierCoverage;
  capacity: CarrierCapacity;
  performance: CarrierPerformance;
  tracking: CarrierTrackingIntegration;
  compliance: CarrierCompliance;

  services: CarrierService[];
  statusBadges: string[];
  updatedAt: string;

  lifecycleStage: string;
  lifecycleTimeline: {
    stage: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export interface CarrierDashboardMetrics {
  totalCarriers: number;
  activeCarriers: number;
  approvedPartners: number;
  limitedServiceCarriers: number;
  suspendedCarriers: number;
  activeShippingServices: number;
  shipmentsAssignedThisPeriod: number;
  pickupSlaBreaches: number;
  deliverySlaBreaches: number;
  trackingExceptions: number;
  carrierClaimsOpen: number;
  codReconciliationExceptions: number;
  lastSynced: string;
}
