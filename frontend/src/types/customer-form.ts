export type CustomerFormMode = "create" | "edit";

export interface CustomerBasicIdentityFormState {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  dob: string;
  gender: string;
  preferredLanguage: string;
  nationality: string;
  occupation: string;
  customerNotes: string;
}

export interface CustomerWorkflowStep {
  stepNumber: number;
  id: string;
  label: string;
  status: "Completed" | "Current" | "Warning" | "Blocked" | "Upcoming";
  completionPct: number;
  statusText: string;
}

export interface CustomerFormFullData {
  mode: CustomerFormMode;
  customerId?: string;
  draftId: string;
  version: string;
  createdBy: string;
  lastAutosave: string;
  basicIdentity: CustomerBasicIdentityFormState;
  workflowSteps: CustomerWorkflowStep[];
  completenessMetrics: {
    overallCompleteness: number;
    requiredCompleted: number;
    totalRequired: number;
    optionalCompleted: number;
    totalOptional: number;
    openValidationIssues: number;
    blockingIssues: number;
    warnings: number;
    duplicateCandidates: number;
    autosaveStatus: string;
    currentStepLabel: string;
    approvalRequired: string;
  };
  businessContext: {
    businessUnit: string;
    salesChannels: string;
    region: string;
    eligiblePrograms: string[];
  };
  duplicateIntelligence: {
    matchScore: number;
    legalNameMatch: "Exact" | "Partial" | "None";
    emailMatch: "Exact" | "Partial" | "None";
    phoneMatch: "Exact" | "Partial" | "None";
    riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
    validationFindingsPassed: number;
    validationFindingsTotal: number;
  };
  correctiveActions: {
    id: number;
    description: string;
  }[];
  onboardingHealth: {
    score: number;
    statusText: string;
    progressList: { label: string; pct: number }[];
    requiredCompleted: number;
    requiredRemaining: number;
    requiredMissing: number;
    blockingIssuesList: string[];
    warningsList: string[];
    duplicateRisk: string;
    approvalReadiness: {
      status: string;
      reviewer: string;
      approvalPath: string;
      estimatedSla: string;
      requiredDocumentsMissing: number;
    };
  };
}
