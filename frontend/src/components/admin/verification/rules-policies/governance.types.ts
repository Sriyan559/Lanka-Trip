export type TrendDirection = "up" | "down";

export interface GovernanceKpi {
    id: number;
    title: string;
    value: string | number;
    trend: number;
    trendDirection: TrendDirection;
    positive?: boolean;
    icon:
    | "rules"
    | "active"
    | "draft"
    | "approval"
    | "scheduled"
    | "conflict"
    | "version"
    | "sla"
    | "escalation"
    | "exception"
    | "revalidation"
    | "breach";
}

export interface GovernanceHealthMetric {
    label: string;
    value: number;
}

export interface GovernanceStatus {
    label: string;
    value: number;
    percentage: number;
    color: string;
}

export interface RuleDomain {
    name: string;
    value: number;
}

export interface ComplianceRule {
    id: string;
    name: string;
    domain: string;
    type: string;
    trigger: string;
    conditionSummary: string;
    outcome: string;
    entityScope: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    conflictStatus: string;
    version: string;
    owner: string;
    effectiveDate: string;
    expiryDate: string;
    status: "Active" | "Draft" | "Scheduled" | "Pending";
    updatedAt: string;
}

export interface OperationalCard {
    id: number;
    title: string;
    headers: string[];
    rows: Array<{
        label: string;
        values: Array<string | number>;
    }>;
}

export interface LifecycleStep {
    id: number;
    title: string;
    count?: number;
    active?: boolean;
}