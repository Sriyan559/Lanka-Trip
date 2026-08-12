import {
    DataJobRow,
    DataOpsKpi,
    ImportTemplateItem,
    ScheduledExportItem,
} from "./data-operations.types";

export const defaultDataOpsKpis: DataOpsKpi[] = [
    { id: 1, title: "Imports This Period", value: 0, delta: "0%" },
    { id: 2, title: "Successful Imports", value: 0, delta: "0%" },
    { id: 3, title: "Partial Imports", value: 0, delta: "0%" },
    { id: 4, title: "Failed Imports", value: 0, delta: "0%" },
    { id: 5, title: "Records Processed", value: 0, delta: "0%" },
    { id: 6, title: "Records Rejected", value: 0, delta: "0%" },
    { id: 7, title: "Mapping Issues", value: 0, delta: "0%" },
    { id: 8, title: "Duplicate Conflicts", value: 0, delta: "0%" },
    { id: 9, title: "Exports Generated", value: 0, delta: "0%" },
    { id: 10, title: "Scheduled Exports", value: 0, delta: "0%" },
    { id: 11, title: "Export Failures", value: 0, delta: "0%" },
    { id: 12, title: "Pending Review Jobs", value: 0, delta: "0%" },
];

export const defaultDataOpsTrend = [
    { date: "May 15", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
    { date: "May 30", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
    { date: "Jun 15", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
    { date: "Jun 30", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
    { date: "Jul 15", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
    { date: "Jul 30", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
    { date: "Aug 12", Imports: 0, Exports: 0, "Processed Records": 0, "Failed Records": 0 },
];

export const defaultJobStatusDonut = [
    { name: "Completed", value: 0, color: "#16a34a" },
    { name: "Pending Review", value: 0, color: "#f59e0b" },
    { name: "Failed", value: 0, color: "#dc2626" },
    { name: "Scheduled", value: 0, color: "#2563eb" },
    { name: "Running", value: 0, color: "#06b6d4" },
    { name: "Draft", value: 0, color: "#9ca3af" },
];

export const scorecardMetrics = [
    { label: "File Validation", score: 0 },
    { label: "Mapping Accuracy", score: 0 },
    { label: "Approval Readiness", score: 0 },
    { label: "Execution Control", score: 0 },
    { label: "Reconciliation", score: 0 },
    { label: "Audit Completeness", score: 0 },
];

export const workflowStages = [
    { id: 1, title: "Select Type", count: 0, active: true },
    { id: 2, title: "Upload File", count: 0, active: false },
    { id: 3, title: "Inspection", count: 0, active: false },
    { id: 4, title: "Field Mapping", count: 0, active: false },
    { id: 5, title: "Validation", count: 0, active: false },
    { id: 6, title: "Duplicate Review", count: 0, active: false },
    { id: 7, title: "Change Preview", count: 0, active: false },
    { id: 8, title: "Approval", count: 0, active: false },
    { id: 9, title: "Execute", count: 0, active: false },
    { id: 10, title: "Reconcile", count: 0, active: false },
];

export const scheduledExportsList: ScheduledExportItem[] = [
    { id: "EXP-SCH-01", name: "Daily Compliance Audit Export", frequency: "Daily @ 06:00 AM", nextRun: "Tomorrow", destination: "S3 Bucket / Internal FTP" },
    { id: "EXP-SCH-02", name: "Weekly Supplier Verification Dump", frequency: "Weekly @ Monday", nextRun: "17 Aug 2026", destination: "Compliance Portal" },
    { id: "EXP-SCH-03", name: "Monthly Regulatory Dossier Archive", frequency: "Monthly @ 1st", nextRun: "01 Sep 2026", destination: "Secure Vault" },
];

export const importTemplatesList: ImportTemplateItem[] = [
    { id: "TPL-01", name: "NMRA Regulatory Registration Template", domain: "Product Safety", mappingsCount: 24, lastUsed: "10 Aug 2026" },
    { id: "TPL-02", name: "Supplier KYC & Tax Evidence Mapping", domain: "Supplier Verification", mappingsCount: 18, lastUsed: "11 Aug 2026" },
    { id: "TPL-03", name: "Brand Authorization Clearance Format", domain: "Brand Authorization", mappingsCount: 15, lastUsed: "08 Aug 2026" },
];
