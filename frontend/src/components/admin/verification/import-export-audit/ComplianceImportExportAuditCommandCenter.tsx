"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    Calendar,
    CheckCircle2,
    ChevronDown,
    CircleAlert,
    Clock,
    Download,
    FileCheck,
    FileSpreadsheet,
    FileText,
    Filter,
    Plus,
    RefreshCw,
    Search,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    Upload,
} from "lucide-react";

import { verificationComplianceApi } from "@/lib/api/verificationCompliance";
import {
    defaultDataOpsKpis,
    defaultDataOpsTrend,
    defaultJobStatusDonut,
    importTemplatesList,
    scheduledExportsList,
    scorecardMetrics,
    workflowStages,
} from "./data-operations.data";
import { DataOpsTrendChart, JobStatusDistributionDonut } from "./DataOpsCharts";
import type { DataJobRow } from "./data-operations.types";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <section className={`rounded-md border border-gray-200 bg-white ${className}`}>
            {children}
        </section>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-[11px] font-semibold text-gray-800">{children}</h2>;
}

function FilterButton({ children }: { children: React.ReactNode }) {
    return (
        <button className="flex h-8 items-center gap-2 rounded border border-gray-200 bg-white px-3 text-[10px] text-gray-700 transition hover:bg-gray-50">
            {children}
            <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>
    );
}

function StatusBadge({
    children,
    type = "neutral",
}: {
    children: React.ReactNode;
    type?: "red" | "orange" | "green" | "blue" | "neutral";
}) {
    const styles = {
        red: "border-red-200 bg-red-50 text-red-600",
        orange: "border-orange-200 bg-orange-50 text-orange-600",
        green: "border-green-200 bg-green-50 text-green-600",
        blue: "border-blue-200 bg-blue-50 text-blue-600",
        neutral: "border-gray-200 bg-gray-50 text-gray-600",
    };

    return (
        <span className={`inline-flex rounded border px-1.5 py-[2px] text-[8px] font-medium ${styles[type]}`}>
            {children}
        </span>
    );
}

export default function ComplianceImportExportAuditCommandCenter() {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Overview");
    const [selectedJob, setSelectedJob] = useState<DataJobRow | null>(null);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const res = await verificationComplianceApi.getImportExportAuditDashboard();
            setDashboardData(res);
            if (res?.jobs?.data?.length > 0) {
                setSelectedJob(res.jobs.data[0]);
            }
        } catch (err) {
            console.error("Failed to fetch import export audit dashboard", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const kpis = dashboardData?.kpis || defaultDataOpsKpis;
    const trendData = dashboardData?.trend || defaultDataOpsTrend;
    const donutData = dashboardData?.donut || defaultJobStatusDonut;
    const jobsList: DataJobRow[] = dashboardData?.jobs?.data || [];

    const filteredJobs = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return jobsList;
        return jobsList.filter(
            (job) =>
                job.jobCode?.toLowerCase().includes(query) ||
                job.title?.toLowerCase().includes(query) ||
                job.domain?.toLowerCase().includes(query) ||
                job.status?.toLowerCase().includes(query)
        );
    }, [search, jobsList]);

    const tabs = [
        "Overview",
        "Import Jobs",
        "Export Operations",
        "Scheduled Exports",
        "Import Templates",
        "Validation Rules",
        "Field Mappings",
        "Duplicate Conflicts",
        "Reconciliation",
        "Audit Trail",
        "Controls & Governance",
        "Activity Log",
    ];

    return (
        <div className="min-h-screen bg-[#fbfbfb] text-gray-800">
            <div className="px-3 py-2">
                {/* 1. HEADER AREA */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="mb-1 flex items-center gap-2 text-[9px]">
                            <span className="font-semibold text-[#850019]">
                                Verification & Compliance
                            </span>
                            <span>/</span>
                            <span>Import, Export & Audit</span>
                        </div>

                        <h1 className="text-[21px] font-semibold leading-none">
                            Compliance Data Operations & Audit Log
                        </h1>

                        <p className="mt-1 text-[9px] text-gray-500">
                            Execute compliance data imports, export regulatory reports, and inspect audit logs across the marketplace.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="flex h-8 items-center gap-2 rounded border bg-white px-3 text-[9px] hover:bg-gray-50">
                            <Download className="h-3.5 w-3.5 text-gray-600" />
                            Export Operations Report
                        </button>

                        <button className="flex h-8 items-center gap-2 rounded border bg-white px-3 text-[9px] hover:bg-gray-50">
                            <Calendar className="h-3.5 w-3.5 text-gray-600" />
                            Schedule Export
                        </button>

                        <button className="flex h-8 items-center gap-2 rounded bg-[#850019] px-3 text-[9px] font-medium text-white hover:bg-[#6b0014]">
                            <Plus className="h-3.5 w-3.5" />
                            New Import
                        </button>
                    </div>
                </div>

                {/* 2. GOVERNANCE CONTEXT BAR */}
                <Card className="mt-2 px-3 py-2">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-9">
                        {[
                            ["Tenant", "SL Beauty"],
                            ["Ecosystem", "Beauty Marketplace"],
                            ["Business Unit", "All Business Units"],
                            ["Sales Channels", "All Channels"],
                            ["Region", "Sri Lanka"],
                            ["Currency", "LKR"],
                            ["Data Scope", "Imports & Exports"],
                            ["Date Range", "Last 30 Days"],
                        ].map(([label, value]) => (
                            <div key={label} className="border-r border-gray-100 pr-2">
                                <div className="text-[8px] text-gray-400">{label}</div>
                                <div className="mt-[2px] text-[9px] font-medium">{value}</div>
                            </div>
                        ))}

                        <div>
                            <div className="flex items-center gap-1 text-[9px] font-medium">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                Live Data
                            </div>
                            <div className="text-[8px] text-gray-400">
                                Last synced: {dashboardData?.lastSynced || "Just now"}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* MAIN CONTENT + RIGHT SIDEBAR */}
                <div className="mt-3 grid grid-cols-1 gap-2 2xl:grid-cols-[minmax(0,1fr)_265px]">
                    <main className="min-w-0 space-y-2">
                        {/* 3. 12 DATA OPERATIONS KPI CARDS */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-12">
                            {kpis.map((kpi: any) => (
                                <Card key={kpi.id} className="relative p-2.5 flex flex-col justify-between min-h-[72px]">
                                    <div>
                                        <div className="text-[8.5px] text-gray-500 truncate" title={kpi.title}>
                                            {kpi.title}
                                        </div>
                                        <div className="mt-1 flex items-baseline gap-1">
                                            <span className="text-[16px] font-bold text-gray-900 leading-none">
                                                {kpi.value}
                                            </span>
                                            <span className="text-[8px] font-semibold text-green-600">
                                                {kpi.delta}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* 4. PRIMARY NAVIGATION TABS */}
                        <Card className="overflow-x-auto">
                            <div className="flex min-w-max">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative px-3.5 py-2 text-[9px] ${
                                            activeTab === tab
                                                ? "font-semibold text-[#850019]"
                                                : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <span className="absolute inset-x-2 bottom-0 h-[2px] bg-[#850019]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* 5. ANALYTICS ROW */}
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.2fr_1fr_1.1fr]">
                            <Card className="p-3">
                                <SectionTitle>Compliance Data Operations Trend</SectionTitle>
                                <div className="text-[8px] text-gray-400 mb-2">Last 30 Days</div>
                                <DataOpsTrendChart data={trendData} />
                            </Card>

                            <Card className="p-3">
                                <SectionTitle>Job Status Distribution</SectionTitle>
                                <JobStatusDistributionDonut data={donutData} />
                            </Card>

                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Data Operations Health Scorecard</SectionTitle>
                                    <div className="mt-3 space-y-2 text-[9px]">
                                        {scorecardMetrics.map((m) => (
                                            <div key={m.label} className="space-y-1">
                                                <div className="flex justify-between text-[8px]">
                                                    <span className="text-gray-600">{m.label}</span>
                                                    <span className="font-semibold text-gray-900">{m.score}%</span>
                                                </div>
                                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-600" style={{ width: `${m.score}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t pt-2 flex items-center justify-between text-[8px] text-gray-400">
                                    <span>Target Compliance: 95%</span>
                                    <button onClick={fetchDashboard} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                                        <RefreshCw className={`h-2.5 w-2.5 ${loading ? "animate-spin" : ""}`} />
                                        Sync
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* 6. ADVANCED FILTER TOOLBAR */}
                        <Card className="p-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative min-w-[240px] flex-1">
                                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search job code, domain, file, submitter..."
                                        className="h-8 w-full rounded border border-gray-200 pl-8 pr-3 text-[10px] outline-none focus:border-[#850019]"
                                    />
                                </div>

                                <FilterButton>Job Type</FilterButton>
                                <FilterButton>Source</FilterButton>
                                <FilterButton>Business Unit</FilterButton>
                                <FilterButton>Template</FilterButton>
                                <FilterButton>Approval Status</FilterButton>
                                <FilterButton>Validation Status</FilterButton>
                                <FilterButton>Date Range</FilterButton>

                                <button
                                    onClick={() => setSearch("")}
                                    className="ml-auto h-8 px-3 text-[9px] text-red-600 hover:underline font-medium"
                                >
                                    Clear All
                                </button>

                                <button className="h-8 rounded border px-3 text-[9px] bg-white hover:bg-gray-50 font-medium text-gray-700">
                                    Save View
                                </button>
                            </div>
                        </Card>

                        {/* 7. COMPLIANCE DATA JOB PORTFOLIO & WORKFLOW PREVIEW */}
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_310px]">
                            {/* Table */}
                            <Card className="min-w-0 overflow-hidden">
                                <div className="flex items-center justify-between border-b px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <SectionTitle>Compliance Data Job Portfolio</SectionTitle>
                                        <span className="text-[8px] text-gray-400">
                                            Total {filteredJobs.length} Jobs
                                        </span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1000px] border-collapse text-[8px]">
                                        <thead>
                                            <tr className="border-b bg-gray-50 text-left text-gray-600">
                                                <th className="px-2 py-2">Job Code</th>
                                                <th className="px-2 py-2">Title</th>
                                                <th className="px-2 py-2">Domain</th>
                                                <th className="px-2 py-2">Type</th>
                                                <th className="px-2 py-2 text-right">Processed</th>
                                                <th className="px-2 py-2 text-right">Rejected</th>
                                                <th className="px-2 py-2 text-right">Total</th>
                                                <th className="px-2 py-2">Status</th>
                                                <th className="px-2 py-2">Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredJobs.length === 0 ? (
                                                <tr>
                                                    <td colSpan={9} className="h-24 text-center text-[11px] text-gray-500">
                                                        No compliance data jobs found for selected filters.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredJobs.map((job) => {
                                                    const isSelected = selectedJob?.id === job.id;
                                                    return (
                                                        <tr
                                                            key={job.id}
                                                            onClick={() => setSelectedJob(job)}
                                                            className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                                                                isSelected ? "bg-red-50/40" : ""
                                                            }`}
                                                        >
                                                            <td className="px-2 py-1.5 font-bold font-mono text-gray-900">
                                                                {job.jobCode}
                                                            </td>
                                                            <td className="px-2 py-1.5 font-medium text-gray-800">
                                                                {job.title}
                                                            </td>
                                                            <td className="px-2 py-1.5">{job.domain}</td>
                                                            <td className="px-2 py-1.5">{job.jobType}</td>
                                                            <td className="px-2 py-1.5 text-right text-green-600 font-semibold">
                                                                {job.processedRecords}
                                                            </td>
                                                            <td className="px-2 py-1.5 text-right text-red-500 font-semibold">
                                                                {job.rejectedRecords}
                                                            </td>
                                                            <td className="px-2 py-1.5 text-right font-medium">
                                                                {job.totalRecords}
                                                            </td>
                                                            <td className="px-2 py-1.5">
                                                                <StatusBadge
                                                                    type={
                                                                        job.status === "Completed"
                                                                            ? "green"
                                                                            : job.status === "Failed"
                                                                            ? "red"
                                                                            : "orange"
                                                                    }
                                                                >
                                                                    {job.status}
                                                                </StatusBadge>
                                                            </td>
                                                            <td className="px-2 py-1.5 text-gray-400">
                                                                {job.createdAt}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between border-t px-3 py-2 text-[8px] text-gray-500">
                                    <span>Showing 1 to {filteredJobs.length} of {filteredJobs.length} entries</span>
                                    <div className="flex items-center gap-1">
                                        <button className="h-5 rounded border bg-[#850019] px-2 text-white font-medium">1</button>
                                    </div>
                                </div>
                            </Card>

                            {/* Selected Job Workflow Preview */}
                            <Card className="h-full p-3 flex flex-col justify-between">
                                {selectedJob ? (
                                    <div>
                                        <div className="mb-2 flex items-center justify-between border-b pb-2">
                                            <div>
                                                <div className="text-[8px] uppercase text-gray-400">Selected Job Preview</div>
                                                <h3 className="text-[11px] font-bold text-gray-900 font-mono mt-0.5">{selectedJob.jobCode}</h3>
                                            </div>
                                            <StatusBadge type={selectedJob.status === "Completed" ? "green" : "orange"}>
                                                {selectedJob.status}
                                            </StatusBadge>
                                        </div>

                                        <div className="space-y-2 text-[9px]">
                                            <div>
                                                <span className="block text-gray-400 text-[8px]">Title</span>
                                                <span className="font-semibold text-gray-800">{selectedJob.title}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 rounded bg-gray-50 p-2">
                                                <div>
                                                    <span className="block text-gray-400 text-[8px]">Domain</span>
                                                    <span className="font-medium text-gray-800">{selectedJob.domain}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-gray-400 text-[8px]">Type</span>
                                                    <span className="font-medium text-gray-800">{selectedJob.jobType}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-gray-400 text-[8px]">Processed</span>
                                                    <span className="font-bold text-green-600">{selectedJob.processedRecords}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-gray-400 text-[8px]">Rejected</span>
                                                    <span className="font-bold text-red-500">{selectedJob.rejectedRecords}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <span className="block text-gray-400 text-[8px] mb-1">Execution Status</span>
                                                <div className="rounded border border-gray-100 p-2 space-y-1 text-[8px]">
                                                    <div className="flex justify-between">
                                                        <span>File Validation:</span>
                                                        <span className="text-green-600 font-semibold">Passed</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Field Mapping:</span>
                                                        <span className="text-green-600 font-semibold">100% Matched</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Duplicate Check:</span>
                                                        <span className="text-gray-600 font-medium">0 Conflicts</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center text-center text-gray-400 text-[10px]">
                                        <span>No job selected</span>
                                    </div>
                                )}

                                <div className="mt-4 border-t pt-2 flex gap-2">
                                    <button className="flex-1 rounded border border-red-200 py-1.5 text-[8.5px] font-semibold text-[#850019] hover:bg-red-50">
                                        View Details
                                    </button>
                                    <button className="flex-1 rounded bg-[#850019] py-1.5 text-[8.5px] font-semibold text-white hover:bg-[#6b0014]">
                                        Download Log
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* 8. ACTIVE IMPORT WORKFLOW PIPELINE */}
                        <Card className="p-3">
                            <SectionTitle>Active Import Workflow / Pipeline</SectionTitle>
                            <div className="mt-3 overflow-x-auto pb-2">
                                <div className="flex min-w-[1100px] items-center justify-between">
                                    {workflowStages.map((stage, idx) => (
                                        <React.Fragment key={stage.id}>
                                            <div className="flex flex-col items-center min-w-[80px]">
                                                <div
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold text-white ${
                                                        stage.active ? "bg-[#850019]" : "bg-gray-300"
                                                    }`}
                                                >
                                                    {stage.id}
                                                </div>
                                                <span className={`mt-1 text-[8px] font-medium text-center ${stage.active ? "text-[#850019]" : "text-gray-500"}`}>
                                                    {stage.title}
                                                </span>
                                            </div>
                                            {idx < workflowStages.length - 1 && (
                                                <div className="h-0.5 flex-1 bg-gray-200 mx-1" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* 9. COMPLIANCE DATA OPERATIONS DETAIL MODULES */}
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 xl:grid-cols-4">
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Field Mapping Summary</SectionTitle>
                                    <div className="mt-2 space-y-1.5 text-[8.5px]">
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="text-gray-600">Matched Fields</span>
                                            <span className="font-semibold text-green-600">24 / 24</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="text-gray-600">Unmapped Fields</span>
                                            <span className="font-semibold text-gray-800">0</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="text-gray-600">Transformed Fields</span>
                                            <span className="font-semibold text-blue-600">6</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View Field Mapping →
                                </button>
                            </Card>

                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Import Validation Summary</SectionTitle>
                                    <div className="mt-2 space-y-1.5 text-[8.5px]">
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="text-gray-600">Valid Records</span>
                                            <span className="font-semibold text-green-600">100%</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="text-gray-600">Blocking Errors</span>
                                            <span className="font-semibold text-gray-800">0</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="text-gray-600">Warnings</span>
                                            <span className="font-semibold text-orange-500">0</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View Validation Report →
                                </button>
                            </Card>

                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Scheduled Exports</SectionTitle>
                                    <div className="mt-2 space-y-1.5 text-[8.5px]">
                                        {scheduledExportsList.map((exp) => (
                                            <div key={exp.id} className="border-b pb-1">
                                                <div className="font-medium text-gray-800 truncate" title={exp.name}>{exp.name}</div>
                                                <div className="text-[7.5px] text-gray-400 mt-0.5">{exp.frequency}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View Scheduled Exports →
                                </button>
                            </Card>

                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Import Templates Profile</SectionTitle>
                                    <div className="mt-2 space-y-1.5 text-[8.5px]">
                                        {importTemplatesList.map((tpl) => (
                                            <div key={tpl.id} className="border-b pb-1">
                                                <div className="font-medium text-gray-800 truncate" title={tpl.name}>{tpl.name}</div>
                                                <div className="text-[7.5px] text-gray-400 mt-0.5">{tpl.domain} ({tpl.mappingsCount} fields)</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    Manage Templates →
                                </button>
                            </Card>
                        </div>
                    </main>

                    {/* 10. RIGHT OPERATIONS SIDEBAR */}
                    <aside className="space-y-2">
                        <Card className="p-3">
                            <SectionTitle>Compliance Data Operations Health</SectionTitle>
                            <div className="mt-3 grid grid-cols-[85px_1fr] gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[6px] border-green-500 text-xl font-bold text-gray-900">
                                        {dashboardData?.health?.score || 88}
                                    </div>
                                    <span className="mt-1 text-[9px] font-semibold text-green-600">
                                        {dashboardData?.health?.state || "Good / Stable"}
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    {[
                                        ["File Validation", 96],
                                        ["Mapping Accuracy", 98],
                                        ["Approval Readiness", 92],
                                        ["Execution Control", 94],
                                        ["Reconciliation", 90],
                                        ["Audit Completeness", 95],
                                    ].map(([label, val]) => (
                                        <div key={String(label)} className="grid grid-cols-[1fr_45px_22px] items-center gap-1 text-[8px]">
                                            <span className="truncate text-gray-600">{label}</span>
                                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-600" style={{ width: `${val}%` }} />
                                            </div>
                                            <span className="text-right text-gray-700 font-medium">{val}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <Card className="p-3">
                            <div className="flex justify-between items-center mb-2">
                                <SectionTitle>Priority Data Alerts</SectionTitle>
                                <button className="text-[8px] font-semibold text-[#850019] hover:underline">View all</button>
                            </div>
                            <div className="space-y-2 text-[8px]">
                                {[
                                    { text: "Scheduled export queue active", severity: "Low" as const },
                                    { text: "Validation engine online", severity: "Low" as const },
                                    { text: "Data mapping templates synced", severity: "Low" as const },
                                ].map((alert, idx) => (
                                    <div key={idx} className="flex items-center gap-2 border-b border-gray-50 pb-1">
                                        <CircleAlert className="h-3 w-3 shrink-0 text-blue-500" />
                                        <span className="flex-1 truncate text-gray-800">{alert.text}</span>
                                        <StatusBadge type="neutral">{alert.severity}</StatusBadge>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-3">
                            <SectionTitle>Quick Actions</SectionTitle>
                            <div className="mt-2 grid grid-cols-2 gap-1.5">
                                {[
                                    "New Import",
                                    "Schedule Export",
                                    "Manage Templates",
                                    "View Audit Trail",
                                    "Reconciliation",
                                    "Save As View",
                                ].map((action, idx) => (
                                    <button
                                        key={action}
                                        className={`rounded border px-2 py-1.5 text-[8px] font-medium transition ${
                                            idx === 0
                                                ? "border-[#850019] bg-[#850019] text-white hover:bg-[#6b0014]"
                                                : "border-red-200 text-[#850019] hover:bg-red-50"
                                        }`}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
