// Type definitions for LG10 Delivery Zones, Rates, Capacity & SLA

export type ConfigurationType =
  | "Delivery Zone"
  | "Rate Rule"
  | "Capacity Rule"
  | "SLA Rule"
  | "Cut-Off Rule"
  | "Surcharge Rule"
  | "Blackout Rule";

export type ConfigurationApprovalStatus =
  | "Approved"
  | "Pending Review"
  | "Pending Approval"
  | "Draft"
  | "Rejected";

export type ConfigurationActivationStatus =
  | "Active"
  | "Scheduled"
  | "Expiring"
  | "Suspended"
  | "At Capacity"
  | "In Conflict";

export interface DeliveryZone {
  id: string;
  code: string;
  name: string;
  type: "Urban" | "Suburban" | "Regional" | "Remote";
  region: string;
  province: string;
  district: string;
  cityArea: string;
  status: "Active" | "Inactive";
  effectiveFrom: string;
  effectiveTo: string;
}

export interface CarrierEligibilityItem {
  carrierId: string;
  carrierName: string;
  standardEligible: boolean;
  expressEligible: boolean;
  sameDayEligible: boolean;
  codEligible: boolean;
  rtoEligible: boolean;
  status: "Active" | "Restricted" | "Ineligible";
}

export interface RateRuleItem {
  id: string;
  rateType: "Flat Rate" | "Weight Based" | "Distance Based" | "Value Based" | "Custom Rate";
  baseRate: number;
  surcharge: number;
  minOrder: number;
  freeShipThreshold: number;
}

export interface CapacityRuleItem {
  dailyLimit: number;
  currentUsed: number;
  sameDayLimit: number;
  heavyDayLimit: number;
  peakDayDate: string;
  projectedUtilisationPercentage: number;
}

export interface CutoffSLARule {
  serviceName: string;
  cutoffTime: string;
  promisedSLADays: string;
}

export interface ConfigurationRecord {
  id: string;
  configRef: string;
  configName: string;
  ruleType: ConfigurationType;
  zoneName: string;
  region: string;
  province: string;
  district: string;
  cityArea: string;
  businessUnit: string;
  channel: string;
  carrier: string;
  service: string;
  serviceLevel: string;
  weightBand: string;
  coverageStatus: "Active" | "Inactive" | "At Capacity" | "Suspended";
  sameDay: boolean;
  nextDay: boolean;
  cod: boolean;
  rto: boolean;
  specialHandling: boolean;
  rateType: string;
  baseRate: number;
  surcharge: number;
  freeShipThreshold: number;
  capacityLimit: number;
  capacityUsed: number;
  cutoffTime: string;
  promisedSLA: string;
  effectiveFrom: string;
  effectiveTo: string;
  version: string;
  approvalStatus: ConfigurationApprovalStatus;
  activationStatus: ConfigurationActivationStatus;
  conflictStatus: "None" | "Overlap" | "Cut-Off Conflict" | "Rate Conflict";
  exceptionStatus: "None" | "Capacity Risk" | "Expiring Soon" | "No Carrier";
  health: "Healthy" | "At Risk" | "Breached" | "Conflict";
}

export interface ConfigurationMetrics {
  activeDeliveryZones: number;
  activeDeliveryServices: number;
  activeRateRules: number;
  activeSlaRules: number;
  activeCapacityRules: number;
  carrierZoneMappings: number;
  configurationConflicts: number;
  zonesAtCapacityRisk: number;
  rateRulesExpiring: number;
  rateRulesExpiringSoon: number;
  slaBreachRiskRules: number;
  pendingConfigurationApprovals: number;
  configurationExceptions: number;
  lastSynced: string;
}

export interface DeliveryConfigurationIntelligenceData {
  healthScore: number;
  healthLabel: "Optimal State" | "Good" | "At Risk" | "Critical";
  healthTrend: string;
  alerts: {
    id: string;
    message: string;
    count: number;
    severity: "High" | "Medium" | "Low";
  }[];
  coverageSummary: {
    zonesCoveredRatio: string;
    zonesPercentage: number;
    servicesCoveredRatio: string;
    servicesPercentage: number;
  };
  rateSummary: {
    activeRateRules: number;
    expiring: number;
    conflicts: number;
  };
  capacitySummary: {
    utilisationPercentage: number;
    atRiskZones: number;
    capacityLimitText: string;
  };
  slaSummary: {
    slaCompliancePercentage: number;
    breachRiskRules: number;
    breached30D: number;
  };
  carrierEligibilitySummary: {
    eligible: number;
    restricted: number;
    ineligible: number;
  };
  approvalConflictSummary: {
    pendingApproval: number;
    pendingReview: number;
    conflicts: number;
  };
  quickQueues: {
    conflicts: number;
    pendingApproval: number;
    exceptions: number;
  };
}

export interface ImpactSimulationScenario {
  scenarioName: string;
  orderVolumeIncreasePercentage: number;
  projectedCapacityUtilisation: number;
  slaComplianceImpactPercentage: number;
  additionalDriversNeeded: number;
  affectedZonesCount: number;
  affectedCarriersCount: number;
}
