"use client";

export type SegmentType =
  | "Dynamic"
  | "Static Group"
  | "Lifecycle"
  | "Value"
  | "Loyalty"
  | "Behavioral"
  | "Risk Pool"
  | "B2B Group";

export type SegmentStatus =
  | "Active"
  | "Draft"
  | "Pending Approval"
  | "Scheduled"
  | "Conflict"
  | "Retired"
  | "Error / Failed";

export type RiskLevel = "Low" | "Medium" | "High";

export type ConsentEligibility = "Eligible" | "Partial" | "Not Eligible";

export interface CustomerSegment {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  type: SegmentType;
  membershipType: "Inclusive" | "Exclusive";
  customerScope: "Active Customers" | "All Customers" | "App Users" | "Risk Pool";
  entryRuleSummary: string | null;
  exitRuleSummary: string | null;
  customerCount: number;
  newMembersCount: number;
  removedMembersCount: number;
  avgLtvFormatted: string;
  avgLtvNumber: number | null;
  orderFrequency: number | null;
  retentionRatePct: number | null;
  consentEligibility: ConsentEligibility;
  riskLevel: RiskLevel;
  overlapCount: number;
  conflictStatus: "None" | "Warning" | "Conflict";
  recalculationSchedule: string;
  lastRecalculated: string | null;
  owner: string | null;
  version: string | null;
  status: SegmentStatus;
  updatedAt: string;
}

export interface SegmentMetric {
  id: string;
  title: string;
  value: string | number;
  changePct: number;
  trend: "up" | "down" | "neutral";
  comparisonText: string;
  statusText?: string;
  color?: string;
}

export interface SegmentHealthMetric {
  id: string;
  label: string;
  valuePct: number | null;
  statusText?: string;
  color?: string;
}

export interface PriorityAlertItem {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  count?: number;
  actionText?: string;
}

export interface SelectedSegmentDetails {
  segment: CustomerSegment;
  score: number | null;
  scoreStatus: string | null;
  description: string | null;
  ruleDetails: string | null;
  linkedGroups: string[];
  consentRequirement: string | null;
  riskNote: string | null;
  nextRecalculation: string | null;
}

export interface SegmentOperationsMetrics {
  totalSegments: number;
  dynamicCount: number;
  staticGroupCount: number;
  lifecycleCount: number;
  otherTypeCount: number;
  totalRules: number;
  entryRules: number;
  exitRules: number;
  exclusions: number;
  ruleAccuracy: number | null;
  totalConditions: number;
  entryConditions: number;
  exitConditions: number;
  exclusionConditions: number;
  avgRuleComplexity: string;
  membershipAdditions: number;
  membershipRemovals: number;
  netMembershipChange: number;
  overlapCustomersCount: number;
  totalConflicts: number;
  conflictCritical: number;
  conflictHigh: number;
  conflictMediumLow: number;
  resolutionRate: number | null;
  recalculationScheduled: number;
  recalculationInProgress: number;
  recalculationCompleted: number;
  recalculationFailed: number;
  recalculationSuccessRate: number | null;
  recentActivitiesCount: number;
  consentEligible: number;
  consentPending: number;
  consentNotEligible: number;
  highRiskSegments: number;
  restrictedCustomers: number;
  onWatchlist: number;
  fraudSignals: number;
  riskCoverage: number | null;
  totalGroups: number;
  systemGroups: number;
  activeMembers: number;
}

export interface SegmentMembershipSummary {
  totalInSegments: number;
  newMembers: number;
  removedMembers: number;
}

export interface SegmentConflictSummary {
  noConflict: number;
  warning: number;
  conflict: number;
}

export interface SegmentRecalculationSummary {
  scheduled: number;
  inProgress: number;
  completed: number;
  failed: number;
}

export interface SegmentQuickQueues {
  pendingApprovals: number;
  revalidationDue: number;
  conflictsToResolve: number;
  scheduledRecals: number;
}
