import { SupportPriority } from "@/types/customerSupport";

export type ProductSupportPriority = "Low" | "Medium" | "High" | "Critical";

export type AuthenticityStatus =
  | "Verified"
  | "Under Verification"
  | "Under Review"
  | "Unverified"
  | "Suspected"
  | "Failed"
  | "Not Required"
  | "—";

export type SafetyStatus =
  | "Clear"
  | "Under Review"
  | "Warning"
  | "Critical"
  | "—";

export interface ProductSupplierCase {
  id: string; // e.g. "CS-2025-008402"
  reference: string;
  customerName: string;
  customerId: string;
  isVip?: boolean;
  priority: ProductSupportPriority;
  issueType: string; // e.g. "Authenticity"
  caseStatus: string; // e.g. "Under Review"
  productName: string; // e.g. "Radiance Vitamin C Serum 30 ml"
  productId: string; // e.g. "PRO-00004512"
  sku: string; // e.g. "SLB-VITC-30ML"
  brand: string; // e.g. "Radiance"
  supplier: string; // e.g. "Lane Distribution"
  batchLot: string; // e.g. "LOT-ABC-006421"
  productQualityRisk: "High" | "Medium" | "Low" | "Good" | "At Risk";
  authenticityStatus: AuthenticityStatus;
  safetyStatus: SafetyStatus;
  complianceStatus: "On Track" | "At Risk" | "Breached" | "Pending";
  dependency: string; // e.g. "Auth Team"
  sentiment: "Negative" | "Concerned" | "Neutral" | "Satisfied";
  risk: "High" | "Medium" | "Low";
  slaStatus: "At Risk" | "On Track" | "Breached";
  assignedAgent: string;
  assignedTeam: string;
  lastSupplierUpdate: string;
  lastComplianceUpdate: string;
  lastCustomerUpdate: string;
  age: string;
}

export interface AuthenticityTimelineStage {
  label: string;
  timestamp?: string;
  status: "completed" | "active" | "pending";
}

export interface CustomerEvidenceItem {
  label: string;
  status: "Uploaded" | "Pending";
  isUploaded: boolean;
}

export interface SelectedProductCaseDetailsData {
  caseInfo: ProductSupplierCase;
  summaryMetrics: {
    caseAge: string;
    productIssuesCount: string;
    supplierCases30dCount: string;
    similarAuthenticityReportsCount: number;
    evidenceCompletenessPercent: number;
    currentDependency: string;
    nextCustomerUpdate: string;
    caseHealthPercent: number;
  };
  productSummary: {
    productId: string;
    brand: string;
    category: string;
    sku: string;
    confidenceQuality: string;
    returnableItem: string;
    complianceStatus: string;
    verifiedSupplier: string;
  };
  supplierSummary: {
    supplierId: string;
    name: string;
    tier: string;
    contractStatus: string;
    productCoverage: string;
    supplierSla: string;
    supplierRiskHealth: string;
    authenticityIncidentsCount: number;
  };
  variantBatchLot: {
    batchLot: string;
    mfgDate: string;
    expiryDate: string;
    batchStatus: string;
    unitLevelComplaintsCount: number;
    relatedReturnsCount: number;
    safetyAlerts: string;
  };
  productQualityAssessment: {
    issueType: string;
    reportedCondition: string;
    productType: string;
    usability: string;
    confidencePercent: number;
  };
  authenticityAssessment: {
    confidenceScorePercent: number;
    status: string;
    batchTrace: boolean;
    qrSerialVerification: boolean;
    packaging: boolean;
    imagingOverlay: boolean;
    knownComparison: boolean;
  };
  safetyAssessment: {
    severity: string;
    immediateGuidance: string;
    incidentStatus: string;
    complianceTrigger: string;
    evidenceRequired: string;
  };
  customerStatement: {
    text: string;
    author: string;
  };
  customerEvidence: CustomerEvidenceItem[];
  authenticityTimeline: {
    stages: AuthenticityTimelineStage[];
  };
  similarIssueAnalysis: {
    sameSku: number;
    sameBatch: number;
    sameSupplier: number;
    samePackaging: number;
    confirmedCounterfeit90d: number;
  };
  investigationChecklist: { label: string; isCompleted: boolean }[];
  blockingGuidance: {
    guidanceText: string;
    updateEta: string;
  };
  dependencies: {
    verificationCompliance: string;
    supplier: string;
    packagingTeam: string;
    finance: string;
    customer: string;
  };
  complianceEscalation: {
    escalationId: string;
    owner: string;
    reason: string;
    status: string;
    risk: string;
  };
  customerProductImpact: {
    sentiment: string;
    authenticityRisk: string;
    supplierRisk: string;
  };
  recommendedCustomerGuidance: {
    previewText: string;
  };
  caseHistorySnapshot: {
    initialResponseSla: string;
    supplierResponseSla: string;
    supplierResponseTime: string;
    complianceReviewSla: string;
    complianceReviewTime: string;
  };
  exceptionHistory: {
    type: string;
    raisedOn: string;
    raisedBy: string;
    status: string;
  }[];
}

export interface ProductSupplierOperationsRailData {
  supportHealthScore: number;
  supportHealthLabel: string;
  targetScore: string;

  selectedCaseHealthScore: number;
  selectedCaseHealthLabel: string;

  caseSummary: {
    open: number;
    atRisk: number;
    reopened: number;
    critical: number;
    escalated: number;
  };

  productIssueSummary: {
    quality: number;
    defective: number;
    usageIngredient: number;
    damaged: number;
    packaging: number;
  };

  authenticitySummary: {
    concerns: number;
    complianceCases: number;
    confirmedCounterfeit: number;
    reviewRequired: number;
    counterfeitSuspected: number;
  };

  supplierSummary: {
    supplierIssues: number;
    slaRisk: number;
    repeatedSupplierIssues: number;
    waitingSupplier: number;
    qualityIncidents: number;
  };

  safetySummary: {
    safetyConcerns: number;
    complianceEscalated: number;
    highSeverity: number;
    openSafetyCases: number;
  };

  dependencySummary: {
    waitingCompliance: number;
    waitingCustomer: number;
    waitingSupplier: number;
    waitingCatalogue: number;
  };

  quickQueues: {
    label: string;
    count: number;
    variant: "danger" | "warning" | "info" | "neutral";
  }[];
}
