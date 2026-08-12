"use client";

import React, { useEffect, useMemo, useState } from "react";
import { verificationComplianceApi } from "@/lib/api/verificationCompliance";
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
    TrendingUp,
} from "lucide-react";

import {
    analyticsKpis,
    analyticsMetricCards,
    domainTableRows,
    exportHistory,
    reportLibraryItems,
    riskDistributionData,
    savedSubscriptions,
    scheduledReports,
    scorecardMetrics,
} from "./reports.data";

import {
    ComplianceHealthTrendChart,
    ComplianceRiskDistributionDonut,
    MiniBarChart,
    MiniSparkline,
    OperationalStatusSummaryChart,
} from "./ReportsCharts";

import type { DomainPerformanceRow } from "./reports.types";

function Card({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section className={`rounded-md border border-gray-200 bg-white ${className}`}>
            {children}
        </section>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-[11px] font-semibold text-gray-800">
            {children}
        </h2>
    );
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

export default function ComplianceReportsCommandCenter() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Executive Overview");
    const [loading, setLoading] = useState(false);
    const [reportsData, setReportsData] = useState<any>(null);
    const [selectedDomain, setSelectedDomain] = useState<DomainPerformanceRow>(domainTableRows[2]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await verificationComplianceApi.getReportsDashboard({ search, category: activeTab });
            setReportsData(res);
        } catch (err) {
            console.error("Reports API fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [search, activeTab]);

    const filteredDomains = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return domainTableRows;
        return domainTableRows.filter(row =>
            row.domain.toLowerCase().includes(query)
        );
    }, [search]);

    const tabs = [
        "Executive Overview",
        "Verification",
        "Brand Authorization",
        "Compliance Cases",
        "Documents",
        "Product Safety",
        "Authenticity",
        "Recalls & Incidents",
        "SLA & Escalations",
        "Rules & Policies",
        "Suppliers & Brands",
        "Channels & Regions",
        "Audit Readiness",
        "Schedules/Exports",
        "Report History",
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
                            <span>Reports & Analytics</span>
                        </div>

                        <h1 className="text-[21px] font-semibold leading-none">
                            Compliance Reports & Analytics
                        </h1>

                        <p className="mt-1 text-[9px] text-gray-500">
                            Analyze compliance performance, risk exposure, escalations, SLA adherence, recalls, rule effectiveness, and audit readiness.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="flex h-8 items-center gap-2 rounded border bg-white px-3 text-[9px] hover:bg-gray-50">
                            <Download className="h-3.5 w-3.5 text-gray-600" />
                            Export
                        </button>

                        <button className="flex h-8 items-center gap-2 rounded border bg-white px-3 text-[9px] hover:bg-gray-50">
                            <Calendar className="h-3.5 w-3.5 text-gray-600" />
                            Schedule
                        </button>

                        <button className="flex h-8 items-center gap-2 rounded bg-[#850019] px-3 text-[9px] font-medium text-white hover:bg-[#6b0014]">
                            <Plus className="h-3.5 w-3.5" />
                            Create Custom Report
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT + RIGHT SIDEBAR */}
                <div className="mt-3 grid grid-cols-1 gap-2 2xl:grid-cols-[minmax(0,1fr)_265px]">
                    <main className="min-w-0 space-y-2">
                        {/* 2. ANALYTICS KPI STRIP */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 2xl:grid-cols-13">
                            {analyticsKpis.map((kpi) => {
                                const positive = kpi.positive;
                                return (
                                    <Card key={kpi.id} className="relative p-2 flex flex-col justify-between min-h-[70px]">
                                        <div>
                                            <div className="text-[9px] text-gray-500 truncate" title={kpi.title}>
                                                {kpi.title}
                                            </div>
                                            <div className="mt-1 flex items-baseline gap-1">
                                                <span className="text-[15px] font-bold text-gray-900 leading-none">
                                                    {kpi.value}
                                                </span>
                                                <span className={`flex items-center text-[8px] font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
                                                    {kpi.trendDirection === "up" ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />}
                                                    {kpi.trend}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-end">
                                            <MiniSparkline data={kpi.sparklineData} color={positive ? "#16a34a" : "#dc2626"} width={45} height={14} />
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* 3. REPORT NAVIGATION TABS */}
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

                        {/* 4. MAIN ANALYTICS ROW */}
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.2fr_1fr_1.1fr]">
                            {/* Panel A — Compliance Health Trend */}
                            <Card className="p-3">
                                <SectionTitle>Compliance Health Trend</SectionTitle>
                                <div className="text-[8px] text-gray-400 mb-2">Last 90 Days</div>
                                <ComplianceHealthTrendChart />
                            </Card>

                            {/* Panel B — Compliance Risk Distribution */}
                            <Card className="p-3">
                                <SectionTitle>Compliance Risk Distribution</SectionTitle>
                                <ComplianceRiskDistributionDonut />
                            </Card>

                            {/* Panel C — Operational Status Summary */}
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <SectionTitle>Operational Status Summary</SectionTitle>
                                        <div className="flex items-center gap-1.5 text-[8px] text-gray-500">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span>Live Data</span>
                                        </div>
                                    </div>
                                    <OperationalStatusSummaryChart />
                                </div>
                                <div className="border-t pt-2 flex items-center justify-between text-[8px] text-gray-400">
                                    <span>Data as of: Today, 10:45 AM</span>
                                    <div className="flex items-center gap-2">
                                        <span>Auto refresh: 30s</span>
                                        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                                            <RefreshCw className="h-2.5 w-2.5" />
                                            Sync
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 5. COMPLIANCE HEALTH SCORECARD */}
                        <Card className="p-3">
                            <SectionTitle>Compliance Health Scorecard</SectionTitle>
                            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-5 xl:grid-cols-10">
                                {scorecardMetrics.map((metric) => (
                                    <div key={metric.label}>
                                        <div className="flex justify-between text-[8px]">
                                            <span className="truncate text-gray-600" title={metric.label}>
                                                {metric.label}
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                {metric.score}%
                                            </span>
                                        </div>
                                        <div className="mt-1 h-[3px] bg-gray-100 overflow-hidden rounded-full">
                                            <div
                                                className={`h-full ${
                                                    metric.score >= metric.target
                                                        ? "bg-green-600"
                                                        : metric.score >= metric.target - 5
                                                        ? "bg-orange-500"
                                                        : "bg-red-500"
                                                }`}
                                                style={{ width: `${metric.score}%` }}
                                            />
                                        </div>
                                        <div className="mt-0.5 text-[7px] text-gray-400 text-right">
                                            Target: {metric.target}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* 6. ADVANCED FILTER TOOLBAR */}
                        <Card className="p-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative min-w-[240px] flex-1">
                                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search brands, suppliers, cases..."
                                        className="h-8 w-full rounded border border-gray-200 pl-8 pr-3 text-[10px] outline-none focus:border-[#850019]"
                                    />
                                </div>

                                <FilterButton>Business Category</FilterButton>
                                <FilterButton>Marketplace</FilterButton>
                                <FilterButton>Region</FilterButton>
                                <FilterButton>Brand Owner</FilterButton>
                                <FilterButton>Supplier Tier</FilterButton>
                                <FilterButton>Compliance Status</FilterButton>
                                <FilterButton>Risk Level</FilterButton>
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

                        {/* 7. COMPLIANCE DOMAIN PERFORMANCE TABLE & 8. SELECTED PREVIEW */}
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_310px]">
                            {/* Table */}
                            <Card className="min-w-0 overflow-hidden">
                                <div className="flex items-center justify-between border-b px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <SectionTitle>Compliance Domain Performance</SectionTitle>
                                        <span className="text-[8px] text-gray-400">Total 8 Domains</span>
                                    </div>
                                    <span className="text-[8px] text-gray-400">Click a row to inspect custom report preview</span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[900px] border-collapse text-[8px]">
                                        <thead>
                                            <tr className="border-b bg-gray-50 text-left text-gray-600">
                                                <th className="px-2 py-2 w-8">#</th>
                                                <th className="px-2 py-2">Compliance Domain</th>
                                                <th className="px-2 py-2 text-right">Total Records</th>
                                                <th className="px-2 py-2 text-right">High Risk</th>
                                                <th className="px-2 py-2 text-right">Critical Issues</th>
                                                <th className="px-2 py-2 text-right">Resolved</th>
                                                <th className="px-2 py-2 text-right">Resolution Rate</th>
                                                <th className="px-2 py-2 text-right">SLA Compliance</th>
                                                <th className="px-2 py-2 text-right">Current Score</th>
                                                <th className="px-2 py-2 text-right">Target</th>
                                                <th className="px-2 py-2 text-center">Trend</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredDomains.map((row) => {
                                                const isSelected = selectedDomain.id === row.id;
                                                return (
                                                    <tr
                                                        key={row.id}
                                                        onClick={() => setSelectedDomain(row)}
                                                        className={`cursor-pointer border-b border-gray-100 transition hover:bg-gray-50 ${
                                                            isSelected ? "bg-red-50/40" : ""
                                                        }`}
                                                    >
                                                        <td className="px-2 py-1.5 font-medium text-gray-500">{row.id}</td>
                                                        <td className="px-2 py-1.5 font-semibold text-gray-900">{row.domain}</td>
                                                        <td className="px-2 py-1.5 text-right font-medium text-gray-700">{row.totalRecords.toLocaleString()}</td>
                                                        <td className="px-2 py-1.5 text-right text-orange-600 font-medium">{row.highRisk}</td>
                                                        <td className="px-2 py-1.5 text-right text-red-600 font-semibold">{row.criticalIssues}</td>
                                                        <td className="px-2 py-1.5 text-right text-green-600 font-medium">{row.resolved.toLocaleString()}</td>
                                                        <td className="px-2 py-1.5 text-right">{row.resolutionRate}%</td>
                                                        <td className="px-2 py-1.5 text-right font-medium">{row.slaCompliance}%</td>
                                                        <td className="px-2 py-1.5 text-right">
                                                            <StatusBadge type={row.currentScore >= row.targetScore ? "green" : "orange"}>
                                                                {row.currentScore}%
                                                            </StatusBadge>
                                                        </td>
                                                        <td className="px-2 py-1.5 text-right text-gray-400">{row.targetScore}%</td>
                                                        <td className="px-2 py-1.5 text-center flex justify-center items-center">
                                                            <MiniSparkline data={row.sparklineData} color={row.currentScore >= row.targetScore ? "#16a34a" : "#f59e0b"} width={45} height={14} />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between border-t px-3 py-2 text-[8px] text-gray-500">
                                    <span>Showing 1 to {filteredDomains.length} of 8 domains</span>
                                    <div className="flex items-center gap-1">
                                        <button className="h-5 rounded border bg-[#850019] px-2 text-white font-medium">1</button>
                                    </div>
                                </div>
                            </Card>

                            {/* 8. Selected Report / Custom Preview Panel */}
                            <Card className="h-full p-3 flex flex-col justify-between">
                                <div>
                                    <div className="mb-2 flex items-center justify-between border-b pb-2">
                                        <div>
                                            <div className="text-[8px] uppercase tracking-wider text-gray-400">
                                                Selected Report / Custom Preview
                                            </div>
                                            <h3 className="mt-0.5 text-[11px] font-bold text-gray-900">
                                                {selectedDomain.domain}
                                            </h3>
                                        </div>
                                        <StatusBadge type={selectedDomain.currentScore >= selectedDomain.targetScore ? "green" : "orange"}>
                                            {selectedDomain.currentScore}% Score
                                        </StatusBadge>
                                    </div>

                                    <div className="space-y-2.5 text-[9px]">
                                        <div className="grid grid-cols-2 gap-2 rounded bg-gray-50 p-2">
                                            <div>
                                                <span className="block text-gray-400 text-[8px]">Data Source</span>
                                                <span className="font-semibold text-gray-800">Regulatory & Audits</span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-400 text-[8px]">Date Range</span>
                                                <span className="font-semibold text-gray-800">Last 90 Days</span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-400 text-[8px]">Last Run</span>
                                                <span className="font-medium text-gray-700">Today, 08:30 AM</span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-400 text-[8px]">Report Type</span>
                                                <span className="font-medium text-gray-700">Scheduled Audit</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-[8px] text-gray-400 mb-1">90-Day Score Trend</div>
                                            <div className="rounded border border-gray-100 bg-white p-2 flex items-center justify-between">
                                                <MiniSparkline data={selectedDomain.sparklineData} color="#16a34a" width={140} height={28} />
                                                <span className="text-[10px] font-bold text-green-600">+2.4%</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-[8px] text-gray-400 mb-1">Top Insights</div>
                                            <div className="space-y-1 text-[8.5px]">
                                                <div className="flex items-center justify-between text-gray-700">
                                                    <span>Packaging Defects:</span>
                                                    <span className="font-semibold text-green-600">-12% Reduction</span>
                                                </div>
                                                <div className="flex items-center justify-between text-gray-700">
                                                    <span>Labeling Compliance:</span>
                                                    <span className="font-semibold text-blue-600">+4% Adherence</span>
                                                </div>
                                                <div className="flex items-center justify-between text-gray-700">
                                                    <span>Ingredient Safety:</span>
                                                    <span className="font-semibold text-green-600">99.8% Pass Rate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 border-t pt-2">
                                    <button className="w-full rounded bg-red-50 py-1.5 text-[9px] font-semibold text-[#850019] hover:bg-red-100 transition">
                                        View Full Report →
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* 9. ANALYTICS METRIC CARDS (9 CARDS ROW) */}
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-9">
                            {analyticsMetricCards.map((card) => (
                                <Card key={card.id} className="p-2 flex flex-col justify-between min-h-[90px]">
                                    <div>
                                        <div className="text-[8.5px] font-semibold text-gray-700 truncate" title={card.title}>
                                            {card.title}
                                        </div>
                                        <div className="mt-1 flex items-baseline gap-1">
                                            <span className="text-[13px] font-bold text-gray-900 leading-none">
                                                {card.value}
                                            </span>
                                            <span className="text-[7.5px] font-semibold text-green-600">
                                                {card.change}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        {card.sparklineType === "bar" ? (
                                            <MiniBarChart data={card.sparklineData} color="#850019" width={45} height={14} />
                                        ) : (
                                            <MiniSparkline data={card.sparklineData} color="#16a34a" width={45} height={14} />
                                        )}
                                        <button className="text-[7.5px] text-[#850019] hover:underline font-medium">
                                            Details
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* 10. REPORT MANAGEMENT MODULES (5 BOTTOM PANELS) */}
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 xl:grid-cols-5">
                            {/* Card 1: Compliance Report Library */}
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Compliance Report Library</SectionTitle>
                                    <div className="mt-2 space-y-1.5">
                                        {reportLibraryItems.map((item) => (
                                            <div key={item.name} className="flex items-center justify-between text-[8px] border-b border-gray-50 pb-1">
                                                <span className="truncate font-medium text-gray-800" title={item.name}>{item.name}</span>
                                                <span className="text-gray-400">{item.format}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View all reports →
                                </button>
                            </Card>

                            {/* Card 2: Scheduled Compliance Reports */}
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Scheduled Compliance Reports</SectionTitle>
                                    <div className="mt-2 space-y-1.5">
                                        {scheduledReports.map((sch) => (
                                            <div key={sch.id} className="text-[8px] border-b border-gray-50 pb-1">
                                                <div className="flex justify-between font-medium text-gray-800">
                                                    <span className="truncate" title={sch.name}>{sch.name}</span>
                                                    <StatusBadge type="blue">{sch.frequency}</StatusBadge>
                                                </div>
                                                <div className="text-[7.5px] text-gray-400 mt-0.5">Next: {sch.nextRun}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View all schedules →
                                </button>
                            </Card>

                            {/* Card 3: Custom Report Builder Summary */}
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Custom Report Builder Summary</SectionTitle>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-[9px]">
                                        <div className="rounded bg-gray-50 p-2 text-center">
                                            <span className="block text-[8px] text-gray-400">Draft Reports</span>
                                            <span className="text-[13px] font-bold text-gray-900">4</span>
                                        </div>
                                        <div className="rounded bg-gray-50 p-2 text-center">
                                            <span className="block text-[8px] text-gray-400">Saved Reports</span>
                                            <span className="text-[13px] font-bold text-gray-900">18</span>
                                        </div>
                                        <div className="rounded bg-gray-50 p-2 text-center">
                                            <span className="block text-[8px] text-gray-400">Shared Reports</span>
                                            <span className="text-[13px] font-bold text-gray-900">12</span>
                                        </div>
                                        <div className="rounded bg-gray-50 p-2 text-center">
                                            <span className="block text-[8px] text-gray-400">Recently Updated</span>
                                            <span className="text-[13px] font-bold text-gray-900">3</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    Create new custom report →
                                </button>
                            </Card>

                            {/* Card 4: Report Exports & Export History */}
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Report Exports & History</SectionTitle>
                                    <div className="mt-2 space-y-1.5">
                                        {exportHistory.map((exp) => (
                                            <div key={exp.id} className="text-[8px] border-b border-gray-50 pb-1">
                                                <div className="flex justify-between font-medium text-gray-800">
                                                    <span className="truncate" title={exp.name}>{exp.name}</span>
                                                    <StatusBadge type="green">{exp.status}</StatusBadge>
                                                </div>
                                                <div className="flex justify-between text-[7.5px] text-gray-400 mt-0.5">
                                                    <span>{exp.exportedOn}</span>
                                                    <span className="font-semibold text-gray-600">{exp.format}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View all exports →
                                </button>
                            </Card>

                            {/* Card 5: Saved Reports / Subscriptions */}
                            <Card className="p-3 flex flex-col justify-between">
                                <div>
                                    <SectionTitle>Saved Subscriptions</SectionTitle>
                                    <div className="mt-2 space-y-1.5">
                                        {savedSubscriptions.map((sub) => (
                                            <div key={sub.id} className="text-[8px] border-b border-gray-50 pb-1">
                                                <div className="font-medium text-gray-800 truncate" title={sub.name}>{sub.name}</div>
                                                <div className="flex justify-between text-[7.5px] text-gray-400 mt-0.5">
                                                    <span>{sub.frequency}</span>
                                                    <span className="text-gray-600">{sub.nextRun}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-3 text-[8.5px] font-semibold text-[#850019] text-left hover:underline">
                                    View all subscriptions →
                                </button>
                            </Card>
                        </div>
                    </main>

                    {/* 11. SCREEN 2 — RIGHT ANALYTICS SIDEBAR */}
                    <aside className="space-y-2">
                        {/* Compliance Analytics Health Gauge */}
                        <Card className="p-3">
                            <SectionTitle>Compliance Analytics Health</SectionTitle>
                            <div className="mt-3 grid grid-cols-[85px_1fr] gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[6px] border-green-500 text-xl font-bold text-gray-900">
                                        88
                                    </div>
                                    <span className="mt-1 text-[9px] font-semibold text-green-600">
                                        Good / Stable
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    {[
                                        ["Data Completeness", 94],
                                        ["Accuracy", 96],
                                        ["Timeliness", 91],
                                        ["Consistency", 93],
                                        ["Coverage", 89],
                                        ["Uniqueness", 98],
                                        ["Processing Integrity", 95],
                                        ["Freshness", 92],
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

                        {/* Priority Alerts */}
                        <Card className="p-3">
                            <div className="flex justify-between items-center mb-2">
                                <SectionTitle>Priority Alerts</SectionTitle>
                                <button className="text-[8px] font-semibold text-[#850019] hover:underline">View all</button>
                            </div>
                            <div className="space-y-2 text-[8px]">
                                {[
                                    { text: "SLA Breach on Supplier KYC", severity: "High" as const },
                                    { text: "Expiring LOA for 4 Brands", severity: "High" as const },
                                    { text: "Recall Warning Batch #LK-402", severity: "Critical" as const },
                                    { text: "Product Safety Re-test Pending", severity: "Medium" as const },
                                    { text: "Unverified Account Login", severity: "Low" as const },
                                    { text: "Annual Audit Renewal Due", severity: "Medium" as const },
                                ].map((alert, idx) => (
                                    <div key={idx} className="flex items-center gap-2 border-b border-gray-50 pb-1">
                                        <CircleAlert className={`h-3 w-3 shrink-0 ${alert.severity === 'Critical' ? 'text-red-500' : alert.severity === 'High' ? 'text-orange-500' : 'text-blue-500'}`} />
                                        <span className="flex-1 truncate text-gray-800">{alert.text}</span>
                                        <StatusBadge type={alert.severity === 'Critical' ? 'red' : alert.severity === 'High' ? 'orange' : 'neutral'}>
                                            {alert.severity}
                                        </StatusBadge>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Compliance Domain Summary */}
                        <Card className="p-3">
                            <SectionTitle>Compliance Domain Summary</SectionTitle>
                            <div className="mt-2 space-y-1.5 text-[8.5px]">
                                {[
                                    ["Domains", "8"],
                                    ["High Risk", "87"],
                                    ["Cases", "42"],
                                    ["Compliance", "94.2%"],
                                    ["Open Cases", "42"],
                                    ["Critical Issues", "16"],
                                    ["Overdue", "6"],
                                    ["SLA Compliance", "98.1%"],
                                ].map(([label, val]) => (
                                    <div key={label} className="flex justify-between border-b border-gray-50 pb-0.5">
                                        <span className="text-gray-600">{label}</span>
                                        <span className="font-semibold text-gray-900">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Risk Summary */}
                        <Card className="p-3">
                            <SectionTitle>Risk Summary</SectionTitle>
                            <div className="mt-2 space-y-1.5 text-[8.5px]">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">High Risk</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-red-600">87</span>
                                        <span className="text-[7.5px] text-green-600 font-semibold">-4.2%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Medium Risk</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-orange-500">142</span>
                                        <span className="text-[7.5px] text-green-600 font-semibold">-2.1%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Low Risk</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-green-600">227</span>
                                        <span className="text-[7.5px] text-green-600 font-semibold">+5.8%</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* SLA Summary */}
                        <Card className="p-3">
                            <SectionTitle>SLA Summary</SectionTitle>
                            <div className="mt-2 space-y-1.5 text-[8.5px]">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">SLA Compliance</span>
                                    <span className="font-bold text-green-600">98.1% (+0.5%)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">SLA Breaches</span>
                                    <span className="font-bold text-red-600">3 (-1)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">At Risk</span>
                                    <span className="font-bold text-orange-500">8 (-2)</span>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions / Filter & Analytics Actions */}
                        <Card className="p-3">
                            <SectionTitle>Quick Actions</SectionTitle>
                            <div className="mt-2 grid grid-cols-2 gap-1.5">
                                {[
                                    "Run Audit",
                                    "Ad-hoc Report",
                                    "Generate Executive Pack",
                                    "Open Report Library",
                                    "View Saved Report",
                                    "Save As View",
                                ].map((action, idx) => (
                                    <button
                                        key={action}
                                        className={`rounded border px-2 py-1.5 text-[8px] font-medium transition ${
                                            idx === 2 || idx === 0
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
