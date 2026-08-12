export type TrendDirection = "up" | "down";

export interface DataOpsKpi {
    id: number;
    title: string;
    value: string | number;
    delta: string;
}

export interface DataJobRow {
    id: string;
    jobCode: string;
    title: string;
    domain: string;
    jobType: string;
    status: string;
    processedRecords: number;
    rejectedRecords: number;
    totalRecords: number;
    createdAt: string;
}

export interface ScheduledExportItem {
    id: string;
    name: string;
    frequency: string;
    nextRun: string;
    destination: string;
}

export interface ImportTemplateItem {
    id: string;
    name: string;
    domain: string;
    mappingsCount: number;
    lastUsed: string;
}
