export type TrendDirection = "up" | "down";

export interface AnalyticsKpi {
    id: number;
    title: string;
    value: string | number;
    trend: number;
    trendDirection: TrendDirection;
    positive?: boolean;
    sparklineData: number[];
}

export interface ScorecardMetric {
    label: string;
    score: number;
    target: number;
}

export interface OperationalStatusItem {
    status: string;
    count: number;
    percentage: number;
    color: string;
}

export interface RiskCategory {
    name: string;
    value: number;
    percentage: number;
}

export interface DomainPerformanceRow {
    id: number;
    domain: string;
    totalRecords: number;
    highRisk: number;
    criticalIssues: number;
    resolved: number;
    resolutionRate: number;
    slaCompliance: number;
    currentScore: number;
    targetScore: number;
    sparklineData: number[];
}

export interface AnalyticsCardItem {
    id: number;
    title: string;
    value: string | number;
    change: string;
    positive: boolean;
    sparklineType: "bar" | "line";
    sparklineData: number[];
}

export interface ScheduledReportItem {
    id: string;
    name: string;
    frequency: string;
    nextRun: string;
    recipients: string;
}

export interface ReportExportItem {
    id: string;
    name: string;
    exportedOn: string;
    format: "PDF" | "XLSX" | "CSV";
    status: "Completed" | "Processing" | "Failed";
}

export interface SavedSubscriptionItem {
    id: string;
    name: string;
    frequency: string;
    nextRun: string;
}
