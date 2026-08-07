import { CustomerFormFullData, CustomerWorkflowStep } from "@/types/customer-form";

export const CU04_WORKFLOW_STEPS: CustomerWorkflowStep[] = [
  { stepNumber: 1, id: "customer-type", label: "Customer Type", status: "Completed", completionPct: 100, statusText: "Complete" },
  { stepNumber: 2, id: "basic-identity", label: "Basic Identity", status: "Current", completionPct: 82, statusText: "In Progress" },
  { stepNumber: 3, id: "contact-info", label: "Contact Information", status: "Upcoming", completionPct: 84, statusText: "Partial" },
  { stepNumber: 4, id: "addresses", label: "Addresses", status: "Upcoming", completionPct: 78, statusText: "Partial" },
  { stepNumber: 5, id: "business-context", label: "Business Context", status: "Completed", completionPct: 100, statusText: "Complete" },
  { stepNumber: 6, id: "verification-requirements", label: "Verification Requirements", status: "Upcoming", completionPct: 88, statusText: "Partial" },
  { stepNumber: 7, id: "communication-preferences", label: "Communication Preferences", status: "Upcoming", completionPct: 71, statusText: "Partial" },
  { stepNumber: 8, id: "consent-privacy", label: "Consent & Privacy", status: "Upcoming", completionPct: 75, statusText: "Partial" },
  { stepNumber: 9, id: "loyalty-membership", label: "Loyalty & Membership", status: "Warning", completionPct: 75, statusText: "Partial" },
  { stepNumber: 10, id: "segments", label: "Segments", status: "Upcoming", completionPct: 80, statusText: "Partial" },
  { stepNumber: 11, id: "customer-ownership", label: "Customer Ownership", status: "Blocked", completionPct: 92, statusText: "Blocked" },
  { stepNumber: 12, id: "validation-risk", label: "Validation & Risk", status: "Upcoming", completionPct: 68, statusText: "Partial" },
  { stepNumber: 13, id: "review-save", label: "Review & Save", status: "Upcoming", completionPct: 22, statusText: "Not Ready" },
];

export const EDIT_MODE_AMAYA_MOCK: CustomerFormFullData = {
  mode: "edit",
  customerId: "CUST-100001",
  draftId: "CUS-EDIT-2025-0042",
  version: "v4.2",
  createdBy: "Elena Vance",
  lastAutosave: "Today 10:12 AM",
  basicIdentity: {
    title: "Ms.",
    firstName: "Amaya",
    middleName: "",
    lastName: "Perera",
    displayName: "Amaya P.",
    dob: "1990-10-12",
    gender: "Female",
    preferredLanguage: "English",
    nationality: "Sri Lankan",
    occupation: "Consultant",
    customerNotes: "High-value, repeat customer with strong purchase history and positive service interactions.",
  },
  workflowSteps: CU04_WORKFLOW_STEPS,
  completenessMetrics: {
    overallCompleteness: 82,
    requiredCompleted: 96,
    totalRequired: 128,
    optionalCompleted: 24,
    totalOptional: 42,
    openValidationIssues: 7,
    blockingIssues: 3,
    warnings: 6,
    duplicateCandidates: 2,
    autosaveStatus: "Saved (2 minutes ago)",
    currentStepLabel: "Basic Identity",
    approvalRequired: "Verification Review",
  },
  businessContext: {
    businessUnit: "Consumer Beauty",
    salesChannels: "Marketplace / Mobile App / Retail",
    region: "Sri Lanka",
    eligiblePrograms: ["Gold Member", "Repeat Buyer"],
  },
  duplicateIntelligence: {
    matchScore: 86,
    legalNameMatch: "Exact",
    emailMatch: "Exact",
    phoneMatch: "Partial",
    riskLevel: "Low Risk",
    validationFindingsPassed: 9,
    validationFindingsTotal: 14,
  },
  correctiveActions: [
    { id: 1, description: "Update KYC expiry date" },
    { id: 2, description: "Add alternate phone" },
    { id: 3, description: "Confirm marketing consent" },
  ],
  onboardingHealth: {
    score: 82,
    statusText: "Needs Attention",
    progressList: [
      { label: "Identity", pct: 96 },
      { label: "Contact", pct: 84 },
      { label: "Addresses", pct: 78 },
      { label: "Verification", pct: 80 },
      { label: "Consent & Privacy", pct: 71 },
      { label: "Loyalty & Membership", pct: 75 },
      { label: "Segments", pct: 80 },
      { label: "Ownership", pct: 92 },
      { label: "Validation & Risk", pct: 68 },
      { label: "Final Review", pct: 22 },
    ],
    requiredCompleted: 96,
    requiredRemaining: 32,
    requiredMissing: 12,
    blockingIssuesList: [
      "KYC expiry date missing",
      "Consent source missing",
      "Restricted risk review pending",
    ],
    warningsList: [
      "Duplicate phone candidate detected",
      "Dormant loyalty account link detected",
      "Incomplete secondary address",
      "+3 more warnings",
    ],
    duplicateRisk: "Low Risk",
    approvalReadiness: {
      status: "Not ready for submission",
      reviewer: "Not assigned",
      approvalPath: "Standard Customer Approval",
      estimatedSla: "1 business day",
      requiredDocumentsMissing: 2,
    },
  },
};

export const CREATE_MODE_DEFAULT_MOCK: CustomerFormFullData = {
  mode: "create",
  draftId: "CUS-DRAFT-NEW-0001",
  version: "v1.0",
  createdBy: "Admin User",
  lastAutosave: "Just now",
  basicIdentity: {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    dob: "",
    gender: "",
    preferredLanguage: "English",
    nationality: "Sri Lankan",
    occupation: "",
    customerNotes: "",
  },
  workflowSteps: CU04_WORKFLOW_STEPS.map((s, idx) => ({
    ...s,
    status: idx === 0 ? "Current" : "Upcoming",
    completionPct: idx === 0 ? 50 : 0,
    statusText: idx === 0 ? "In Progress" : "Not Started",
  })),
  completenessMetrics: {
    overallCompleteness: 10,
    requiredCompleted: 12,
    totalRequired: 128,
    optionalCompleted: 0,
    totalOptional: 42,
    openValidationIssues: 5,
    blockingIssues: 2,
    warnings: 3,
    duplicateCandidates: 0,
    autosaveStatus: "Draft saved",
    currentStepLabel: "Customer Type",
    approvalRequired: "Initial Entry",
  },
  businessContext: {
    businessUnit: "Consumer Beauty",
    salesChannels: "Marketplace / Mobile App / Retail",
    region: "Sri Lanka",
    eligiblePrograms: [],
  },
  duplicateIntelligence: {
    matchScore: 0,
    legalNameMatch: "None",
    emailMatch: "None",
    phoneMatch: "None",
    riskLevel: "Low Risk",
    validationFindingsPassed: 0,
    validationFindingsTotal: 14,
  },
  correctiveActions: [
    { id: 1, description: "Enter customer first & last name" },
    { id: 2, description: "Enter valid contact email" },
  ],
  onboardingHealth: {
    score: 15,
    statusText: "Draft Mode",
    progressList: [
      { label: "Identity", pct: 10 },
      { label: "Contact", pct: 0 },
      { label: "Addresses", pct: 0 },
      { label: "Verification", pct: 0 },
      { label: "Consent & Privacy", pct: 0 },
      { label: "Loyalty & Membership", pct: 0 },
      { label: "Segments", pct: 0 },
      { label: "Ownership", pct: 0 },
      { label: "Validation & Risk", pct: 0 },
      { label: "Final Review", pct: 0 },
    ],
    requiredCompleted: 12,
    requiredRemaining: 116,
    requiredMissing: 25,
    blockingIssuesList: [
      "First & Last name required",
      "Email address required",
    ],
    warningsList: [
      "No secondary phone provided",
    ],
    duplicateRisk: "Low Risk",
    approvalReadiness: {
      status: "Draft - Initial Entry",
      reviewer: "Not assigned",
      approvalPath: "Standard Customer Approval",
      estimatedSla: "1 business day",
      requiredDocumentsMissing: 3,
    },
  },
};

export function getCustomerFormInitialData(mode: "create" | "edit", customerId?: string): CustomerFormFullData {
  if (mode === "edit") {
    if (customerId === "CUST-100001" || !customerId) {
      return EDIT_MODE_AMAYA_MOCK;
    }
    // Dynamic prefill for other customer IDs
    const formattedId = customerId.toUpperCase().startsWith("CUST-")
      ? customerId.toUpperCase()
      : `CUST-${customerId}`;
    return {
      ...EDIT_MODE_AMAYA_MOCK,
      customerId: formattedId,
      draftId: `CUS-EDIT-${formattedId}`,
      basicIdentity: {
        ...EDIT_MODE_AMAYA_MOCK.basicIdentity,
        firstName: `Customer`,
        lastName: formattedId,
        displayName: `Customer ${formattedId}`,
      },
    };
  }
  return CREATE_MODE_DEFAULT_MOCK;
}
