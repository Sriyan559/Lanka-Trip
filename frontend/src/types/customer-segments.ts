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
  type: SegmentType;
  membershipType: "Inclusive" | "Exclusive";
  customerScope: "Active Customers" | "All Customers" | "App Users" | "Risk Pool";
  entryRuleSummary: string;
  exitRuleSummary: string;
  customerCount: number;
  newMembersCount: number;
  removedMembersCount: number;
  avgLtvFormatted: string;
  avgLtvNumber: number;
  orderFrequency: number;
  retentionRatePct: number;
  consentEligibility: ConsentEligibility;
  riskLevel: RiskLevel;
  overlapCount: number;
  conflictStatus: "None" | "Warning" | "Conflict";
  recalculationSchedule: string;
  lastRecalculated: string;
  owner: string;
  version: string;
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
  valuePct: number;
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
  score: number;
  scoreStatus: string;
  description: string;
  ruleDetails: string;
  linkedGroups: string[];
  consentRequirement: string;
  riskNote: string;
  nextRecalculation: string;
}
