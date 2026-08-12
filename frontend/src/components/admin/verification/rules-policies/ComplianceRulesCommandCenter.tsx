"use client";

import { useEffect, useMemo, useState } from "react";
import { verificationComplianceApi } from "@/lib/api/verificationCompliance";

import {
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    Bell,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    CircleAlert,
    Clock3,
    FileCheck2,
    FileText,
    GitBranch,
    MoreVertical,
    Pencil,
    Plus,
    RefreshCw,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Upload,
} from "lucide-react";

import {
    complianceRules,
    governanceHealth,
    governanceKpis,
    lifecycleSteps,
    operationalCards,
} from "./governance.data";

import {
    GovernanceActivityTrend,
    GovernanceStatusSummary,
    RuleDomainDistribution,
} from "./GovernanceCharts";

import type {
    ComplianceRule,
    GovernanceKpi,
} from "./governance.types";

function Card({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-md border border-gray-200 bg-white ${className}`}
        >
            {children}
        </section>
    );
}

function SectionTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <h2 className="text-[11px] font-semibold text-gray-800">
            {children}
        </h2>
    );
}

function KpiIcon({
    type,
}: {
    type: GovernanceKpi["icon"];
}) {
    const iconClass = "h-[18px] w-[18px]";

    switch (type) {
        case "rules":
            return <FileText className={iconClass} />;
        case "active":
            return <CheckCircle2 className={iconClass} />;
        case "draft":
            return <Pencil className={iconClass} />;
        case "approval":
            return <Clock3 className={iconClass} />;
        case "scheduled":
            return <CalendarDays className={iconClass} />;
        case "conflict":
            return <AlertTriangle className={iconClass} />;
        case "version":
            return <ShieldCheck className={iconClass} />;
        case "sla":
            return <GitBranch className={iconClass} />;
        case "escalation":
            return <FileCheck2 className={iconClass} />;
        case "exception":
            return <CircleAlert className={iconClass} />;
        case "revalidation":
            return <RefreshCw className={iconClass} />;
        default:
            return <Clock3 className={iconClass} />;
    }
}

function GovernanceKpiCard({
    item,
}: {
    item: GovernanceKpi;
}) {
    const positive = Boolean(item.positive);

    return (
        <Card className="relative min-h-[74px] p-3">
            <div className="absolute left-2 top-2 text-[11px] font-semibold text-gray-700">
                {item.id}
            </div>

            <div className="ml-5">
                <div className="pr-9 text-[10px] text-gray-600">
                    {item.title}
                </div>

                <div className="mt-1 flex items-end gap-3">
                    <span className="text-[21px] font-semibold leading-none text-gray-900">
                        {item.value}
                    </span>

                    <span
                        className={`flex items-center gap-0.5 text-[10px] font-semibold ${positive ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {item.trendDirection === "up" ? (
                            <ArrowUp className="h-3 w-3" />
                        ) : (
                            <ArrowDown className="h-3 w-3" />
                        )}

                        {item.trend}%
                    </span>
                </div>
            </div>

            <div
                className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${positive
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                    }`}
            >
                <KpiIcon type={item.icon} />
            </div>
        </Card>
    );
}

function FilterButton({
    children,
}: {
    children: React.ReactNode;
}) {
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
        <span
            className={`inline-flex rounded border px-1.5 py-[2px] text-[8px] font-medium ${styles[type]}`}
        >
            {children}
        </span>
    );
}

function severityType(
    severity: ComplianceRule["severity"],
) {
    if (severity === "CRITICAL") return "red";
    if (severity === "HIGH") return "orange";
    if (severity === "LOW") return "green";

    return "orange";
}

function ComplianceRuleTable({
    rows,
    onSelect,
}: {
    rows: ComplianceRule[];
    onSelect: (rule: ComplianceRule) => void;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px] border-collapse text-[8px]">
                <thead>
                    <tr className="border-y bg-gray-50 text-left text-gray-600">
                        <th className="px-2 py-2">
                            <input type="checkbox" />
                        </th>
                        <th className="px-2 py-2">Rule</th>
                        <th className="px-2 py-2">Rule ID</th>
                        <th className="px-2 py-2">Rule Domain</th>
                        <th className="px-2 py-2">Rule Type</th>
                        <th className="px-2 py-2">Trigger</th>
                        <th className="px-2 py-2">
                            Condition Summary
                        </th>
                        <th className="px-2 py-2">
                            Outcome / Control
                        </th>
                        <th className="px-2 py-2">Entity Scope</th>
                        <th className="px-2 py-2">Severity</th>
                        <th className="px-2 py-2">Conflict Status</th>
                        <th className="px-2 py-2">Current Version</th>
                        <th className="px-2 py-2">Rule Owner</th>
                        <th className="px-2 py-2">Effective Date</th>
                        <th className="px-2 py-2">Expiry Date</th>
                        <th className="px-2 py-2">Status</th>
                        <th className="px-2 py-2">Updated At</th>
                        <th className="px-2 py-2" />
                    </tr>
                </thead>

                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={18}
                                className="h-24 text-center text-[11px] text-gray-500"
                            >
                                No compliance rules match the current filters.
                            </td>
                        </tr>
                    ) : (
                        rows.filter(Boolean).map((rule) => (
                            <tr
                                key={rule?.id || Math.random()}
                                onClick={() => onSelect(rule)}
                                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="px-2 py-1.5">
                                    <input
                                        type="checkbox"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>

                                <td className="max-w-[180px] truncate px-2 py-1.5 font-medium">
                                    {rule?.name || 'Unnamed Rule'}
                                </td>

                                <td className="px-2 py-1.5 text-blue-600">
                                    {rule?.id || '—'}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule?.domain || '—'}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule?.type || '—'}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule?.trigger || '—'}
                                </td>

                                <td className="max-w-[190px] truncate px-2 py-1.5">
                                    {rule?.conditionSummary || '—'}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule?.outcome || '—'}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule?.entityScope || '—'}
                                </td>

                                <td className="px-2 py-1.5">
                                    <StatusBadge
                                        type={severityType(rule?.severity)}
                                    >
                                        {rule?.severity || 'MEDIUM'}
                                    </StatusBadge>
                                </td>

                                <td className="px-2 py-1.5">
                                    <StatusBadge
                                        type={
                                            rule.conflictStatus === "None"
                                                ? "green"
                                                : "orange"
                                        }
                                    >
                                        {rule.conflictStatus}
                                    </StatusBadge>
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule.version}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule.owner}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule.effectiveDate}
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule.expiryDate}
                                </td>

                                <td className="px-2 py-1.5">
                                    <StatusBadge
                                        type={
                                            rule.status === "Active"
                                                ? "green"
                                                : rule.status === "Scheduled"
                                                    ? "blue"
                                                    : "orange"
                                        }
                                    >
                                        {rule.status}
                                    </StatusBadge>
                                </td>

                                <td className="px-2 py-1.5">
                                    {rule.updatedAt}
                                </td>

                                <td className="px-2 py-1.5">
                                    <button
                                        aria-label={`Actions for ${rule.id}`}
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

function SelectedRulePreview({
    rule,
}: {
    rule: ComplianceRule | null;
}) {
    if (!rule) {
        return (
            <Card className="h-full p-3 flex flex-col justify-center items-center text-center text-gray-400 text-xs">
                <div>No rule selected for preview</div>
            </Card>
        );
    }

    return (
        <Card className="h-full p-3">
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <div className="text-[9px] text-gray-500">
                        Selected Rule Preview
                    </div>

                    <h3 className="mt-1 text-[11px] font-semibold leading-tight">
                        {rule?.name || 'Unnamed Rule'}
                    </h3>
                </div>

                <StatusBadge type="green">
                    {rule?.status || 'Active'}
                </StatusBadge>
            </div>

            <div className="grid grid-cols-3 gap-3 border-b pb-3 text-[9px]">
                <div>
                    <span className="block text-gray-400">
                        Rule ID
                    </span>
                    <span className="font-medium text-blue-600">
                        {rule?.id || '—'}
                    </span>
                </div>

                <div>
                    <span className="block text-gray-400">
                        Domain
                    </span>
                    <span>{rule?.domain || '—'}</span>
                </div>

                <div>
                    <span className="block text-gray-400">
                        Severity
                    </span>
                    <StatusBadge type="red">
                        {rule?.severity || 'MEDIUM'}
                    </StatusBadge>
                </div>
            </div>

            <div className="space-y-3 py-3 text-[9px]">
                <div>
                    <div className="text-gray-400">
                        Trigger Summary
                    </div>
                    <p>{rule?.trigger || '—'}</p>
                </div>

                <div>
                    <div className="text-gray-400">
                        Outcome / Control
                    </div>
                    <p>{rule?.outcome || '—'}</p>
                </div>

                <div>
                    <div className="text-gray-400">
                        Scope & Eligibility
                    </div>

                    <div className="mt-1 flex flex-wrap gap-1">
                        <StatusBadge type="blue">
                            Business Units
                        </StatusBadge>

                        <StatusBadge type="blue">
                            All BUs
                        </StatusBadge>

                        <StatusBadge type="blue">
                            All Channels
                        </StatusBadge>

                        <StatusBadge type="blue">
                            Sri Lanka
                        </StatusBadge>
                    </div>
                </div>
            </div>

            <div className="border-t pt-3">
                <div className="grid grid-cols-2 gap-2 text-[9px]">
                    <div>
                        <span className="block text-gray-400">
                            Conflict Status
                        </span>
                        <span className="text-green-600">
                            None Detected
                        </span>
                    </div>

                    <div>
                        <span className="block text-gray-400">
                            Last Simulation
                        </span>
                        <span>Passed</span>
                    </div>

                    <div>
                        <span className="block text-gray-400">
                            Effective Date
                        </span>
                        <span>{rule?.effectiveDate || '—'}</span>
                    </div>

                    <div>
                        <span className="block text-gray-400">
                            Expiry Date
                        </span>
                        <span>{rule?.expiryDate || '—'}</span>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                    <button className="rounded border border-red-200 px-2 py-1.5 text-[9px] font-medium text-red-700">
                        Edit Rule
                    </button>

                    <button className="rounded border border-red-200 px-2 py-1.5 text-[9px] font-medium text-red-700">
                        Run Simulation
                    </button>

                    <button className="rounded border border-red-200 px-2 py-1.5 text-[9px] font-medium text-red-700">
                        View Policy
                    </button>
                </div>
            </div>
        </Card>
    );
}

function OperationalGrid() {
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
            {operationalCards.map((card) => (
                <Card
                    key={card.id}
                    className="min-h-[140px] p-2"
                >
                    <div className="mb-2 flex items-center justify-between">
                        <SectionTitle>
                            {card.id}. {card.title}
                        </SectionTitle>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-[8px]">
                            <thead>
                                <tr>
                                    <th className="pb-1 text-left font-medium text-gray-400">
                                        Status
                                    </th>

                                    {card.headers.map((header) => (
                                        <th
                                            key={header}
                                            className="pb-1 text-right font-medium text-gray-400"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {card.rows.map((row) => (
                                    <tr key={row.label}>
                                        <td className="py-[2px]">
                                            {row.label}
                                        </td>

                                        {row.values.map((value, index) => (
                                            <td
                                                key={index}
                                                className="py-[2px] text-right font-medium"
                                            >
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="mt-2 text-[8px] font-medium text-red-700">
                        View details
                    </button>
                </Card>
            ))}
        </div>
    );
}

function GovernanceIntelligenceRail() {
    const alerts = [
        "Critical rule conflict detected",
        "RULE-PCRM-0006 vs RULE-CLAIMS-0031",
        "SLA breach for 5 owners",
        "Revalidation due for 26 rules",
        "Missing KYC docs for 12 suppliers",
        "Exception approvals pending",
        "Escalation pending for 5 cases",
        "Upcoming rule expiries",
    ];

    return (
        <aside className="space-y-2">
            <Card className="p-3">
                <SectionTitle>
                    Governance Intelligence Health
                </SectionTitle>

                <div className="mt-3 grid grid-cols-[90px_1fr] gap-3">
                    <div className="flex flex-col items-center">
                        <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border-[7px] border-green-500 text-xl font-semibold">
                            88
                        </div>

                        <span className="mt-1 text-[9px] font-medium text-green-600">
                            Good / Stable
                        </span>
                    </div>

                    <div className="space-y-2">
                        {[
                            ["Rule Coverage", 90],
                            ["Policy Accuracy", 88],
                            ["SLA Health", 86],
                            ["Escalation Readiness", 85],
                            ["Conflict Control", 78],
                            ["Approval Governance", 87],
                            ["Audit Readiness", 85],
                        ].map(([label, value]) => (
                            <div
                                key={String(label)}
                                className="grid grid-cols-[1fr_55px_25px] items-center gap-1 text-[8px]"
                            >
                                <span>{label}</span>

                                <div className="h-1 bg-gray-100">
                                    <div
                                        className="h-full bg-green-600"
                                        style={{
                                            width: `${value}%`,
                                        }}
                                    />
                                </div>

                                <span className="text-right">
                                    {value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Card className="p-3">
                <div className="flex justify-between">
                    <SectionTitle>Priority Alerts</SectionTitle>

                    <button className="text-[8px] text-red-600">
                        View all
                    </button>
                </div>

                <div className="mt-2 space-y-2">
                    {alerts.map((alert, index) => (
                        <div
                            key={alert}
                            className="flex items-center gap-2 text-[8px]"
                        >
                            <CircleAlert
                                className={`h-3 w-3 shrink-0 ${index < 3
                                        ? "text-red-500"
                                        : "text-orange-500"
                                    }`}
                            />

                            <span className="flex-1">
                                {alert}
                            </span>

                            <StatusBadge
                                type={index < 2 ? "red" : "orange"}
                            >
                                {index < 2 ? "High" : "Medium"}
                            </StatusBadge>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-3">
                <SectionTitle>
                    Rule Status Summary
                </SectionTitle>

                <div className="mt-3 space-y-2">
                    {[
                        ["Active", 362, "84.6%"],
                        ["Draft", 24, "5.6%"],
                        ["Pending Approval", 18, "4.2%"],
                        ["Scheduled", 14, "3.3%"],
                        ["Retired", 12, "2.8%"],
                    ].map(([label, count, percentage]) => (
                        <div
                            key={String(label)}
                            className="grid grid-cols-[1fr_30px_38px] text-[8px]"
                        >
                            <span>{label}</span>
                            <span className="text-right">
                                {count}
                            </span>
                            <span className="text-right text-gray-500">
                                {percentage}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-3">
                <SectionTitle>Quick Queues</SectionTitle>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                        ["Assigned to Me", "18"],
                        ["Critical Conflicts", "6"],
                        ["Pending Approval", "18"],
                        ["Revalidation Due", "26"],
                        ["Exception Open", "7"],
                    ].map(([label, value]) => (
                        <button
                            key={label}
                            className="flex justify-between rounded border px-2 py-2 text-[8px] hover:bg-gray-50"
                        >
                            <span>{label}</span>
                            <span className="font-semibold text-blue-600">
                                {value}
                            </span>
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="p-3">
                <SectionTitle>
                    Final Governance Actions
                </SectionTitle>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                        "Publish Rule Changes",
                        "Bulk Revalidation",
                        "Review Conflicts",
                        "Export Governance Report",
                    ].map((action) => (
                        <button
                            key={action}
                            className="rounded border border-red-200 px-2 py-2 text-[8px] font-medium text-red-700 hover:bg-red-50"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </Card>
        </aside>
    );
}

function LifecycleWorkflow() {
    return (
        <Card className="p-3">
            <SectionTitle>
                Compliance Rule Lifecycle / Workflow
            </SectionTitle>

            <div className="mt-4 overflow-x-auto pb-2">
                <div className="flex min-w-[1450px] items-start">
                    {lifecycleSteps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex flex-1 items-start"
                        >
                            <div className="flex min-w-[70px] flex-col items-center text-center">
                                <div
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold text-white ${step.active
                                            ? "bg-[#8b001b]"
                                            : "bg-gray-500"
                                        }`}
                                >
                                    {step.id}
                                </div>

                                <span
                                    className={`mt-1 text-[8px] ${step.active
                                            ? "font-semibold text-red-700"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {step.title}
                                </span>

                                {step.count !== undefined && (
                                    <span className="text-[8px] text-gray-400">
                                        {step.count}
                                    </span>
                                )}
                            </div>

                            {index !== lifecycleSteps.length - 1 && (
                                <div className="mt-3 h-px flex-1 border-t border-dashed border-gray-400" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default function ComplianceRulesCommandCenter() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Overview");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [governanceData, setGovernanceData] = useState<any>(null);

    const fetchGovernance = async () => {
        setLoading(true);
        try {
            const res = await verificationComplianceApi.getGovernanceDashboard({ search, status: activeTab, page, per_page: 15 });
            setGovernanceData(res);
        } catch (err) {
            console.error("Governance API fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGovernance();
    }, [search, activeTab, page]);

    const displayRules: ComplianceRule[] = governanceData?.rules?.data || [];
    const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(displayRules[0] || null);

    useEffect(() => {
        if (displayRules.length > 0 && !selectedRule) {
            setSelectedRule(displayRules[0]);
        }
    }, [displayRules]);

    const kpis: GovernanceKpi[] = governanceData?.kpis || governanceKpis.map(k => ({ ...k, value: 0, trend: 0 }));

    const filteredRules = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) {
            return displayRules;
        }

        return displayRules.filter((rule) =>
            [
                rule.id,
                rule.name,
                rule.domain,
                rule.owner,
                rule.trigger,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [search, displayRules]);

    const tabs = [
        "Overview",
        "Compliance Rules",
        "Policies",
        "Drafts",
        "Pending Approval",
        "Scheduled",
        "Active",
        "Conflicts",
        "SLA Definitions",
        "Escalation Paths",
        "Exceptions & Waivers",
        "Revalidation",
        "Retired",
        "Audit History",
    ];

    return (
        <div className="min-h-screen bg-[#fbfbfb] text-gray-800">
            <div className="px-3 py-2">
                {/* HEADER */}

                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="mb-1 flex items-center gap-2 text-[9px]">
                            <span className="font-semibold text-[#920020]">
                                Verification & Compliance
                            </span>

                            <span>/</span>

                            <span>Rules & Policies</span>
                        </div>

                        <h1 className="text-[21px] font-semibold leading-none">
                            Compliance Rules, Policies, SLA & Escalations
                        </h1>

                        <p className="mt-1 text-[9px] text-gray-500">
                            Manage compliance rules, policy governance,
                            SLA controls, escalations, exceptions,
                            revalidation and audit-ready publishing
                            across the beauty marketplace.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="flex h-8 items-center gap-2 rounded border bg-white px-3 text-[9px]">
                            <Upload className="h-3.5 w-3.5" />
                            Export Governance Report
                        </button>

                        <button className="flex h-8 items-center gap-2 rounded border bg-white px-3 text-[9px]">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Review Rule Conflicts
                        </button>

                        <button className="flex h-8 items-center gap-2 rounded bg-[#850019] px-3 text-[9px] font-medium text-white">
                            <Plus className="h-3.5 w-3.5" />
                            Create Compliance Rule
                        </button>
                    </div>
                </div>

                {/* CONTEXT BAR */}

                <Card className="mt-2 px-3 py-2">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-9">
                        {[
                            ["Tenant", "SL Beauty"],
                            ["Ecosystem", "Beauty Marketplace"],
                            ["Business Unit", "All Business Units"],
                            ["Sales Channels", "All Channels"],
                            ["Region", "Sri Lanka"],
                            ["Currency", "LKR"],
                            ["Governance Scope", "Active Controls"],
                            ["Date Range", "Last 30 Days"],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="border-r border-gray-100 pr-2"
                            >
                                <div className="text-[8px] text-gray-400">
                                    {label}
                                </div>

                                <div className="mt-[2px] text-[9px] font-medium">
                                    {value}
                                </div>
                            </div>
                        ))}

                        <div>
                            <div className="flex items-center gap-1 text-[9px] font-medium">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Live Data
                            </div>

                            <div className="text-[8px] text-gray-400">
                                Last synced: 04 Aug 2025, 12:57 AM
                            </div>
                        </div>
                    </div>
                </Card>

                {/* MAIN + RIGHT RAIL */}

                <div className="mt-2 grid grid-cols-1 gap-2 2xl:grid-cols-[minmax(0,1fr)_265px]">
                    <main className="min-w-0 space-y-2">
                        {/* KPI */}

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            {kpis.map((item) => (
                                <GovernanceKpiCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>

                        {/* TABS */}

                        <Card className="overflow-x-auto">
                            <div className="flex min-[#8b001b] max-w-full overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setPage(1);
                                        }}
                                        className={`relative px-4 py-2 text-[9px] whitespace-nowrap ${activeTab === tab
                                                ? "font-medium text-[#8b001b]"
                                                : "text-gray-600"
                                            }`}
                                    >
                                        {tab}

                                        {activeTab === tab && (
                                            <span className="absolute inset-x-2 bottom-0 h-[2px] bg-[#8b001b]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* CHARTS */}

                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.2fr_1fr_1.1fr]">
                            <Card className="p-3">
                                <SectionTitle>
                                    Governance Activity Trend
                                </SectionTitle>

                                <div className="text-[8px] text-gray-400">
                                    Last 30 Days
                                </div>

                                <GovernanceActivityTrend data={governanceData?.trend || []} />
                            </Card>

                            <Card className="p-3">
                                <SectionTitle>
                                    Rule Domain Distribution
                                </SectionTitle>

                                <RuleDomainDistribution data={governanceData?.ruleDomains || []} />
                            </Card>

                            <Card className="p-3">
                                <SectionTitle>
                                    Governance Status Summary
                                </SectionTitle>

                                <GovernanceStatusSummary data={governanceData?.governanceStatuses || []} />
                            </Card>
                        </div>

                        {/* HEALTH */}

                        <Card className="p-3">
                            <SectionTitle>
                                Governance Health Scorecard
                            </SectionTitle>

                            <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-5 xl:grid-cols-10">
                                {governanceHealth.map((metric) => (
                                    <div key={metric.label}>
                                        <div className="flex justify-between text-[8px]">
                                            <span className="truncate">
                                                {metric.label}
                                            </span>

                                            <span className="font-semibold">
                                                {metric.value}%
                                            </span>
                                        </div>

                                        <div className="mt-1 h-[3px] bg-gray-100">
                                            <div
                                                className={`h-full ${metric.value >= 85
                                                        ? "bg-green-600"
                                                        : metric.value >= 80
                                                            ? "bg-orange-500"
                                                            : "bg-red-500"
                                                    }`}
                                                style={{
                                                    width: `${metric.value}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* FILTERS */}

                        <Card className="p-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative min-w-[280px] flex-1">
                                    <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />

                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search rule, policy, SLA, escalation or owner..."
                                        className="h-8 w-full rounded border border-gray-200 pl-8 pr-3 text-[10px] outline-none focus:border-[#8b001b]"
                                    />
                                </div>

                                <FilterButton>Rule Domain</FilterButton>
                                <FilterButton>Status</FilterButton>
                                <FilterButton>Severity</FilterButton>
                                <FilterButton>Business Unit</FilterButton>
                                <FilterButton>Channel</FilterButton>
                                <FilterButton>Region</FilterButton>
                                <FilterButton>Owner</FilterButton>
                                <FilterButton>Updated Date</FilterButton>

                                <button className="flex h-8 items-center gap-1 rounded border px-3 text-[9px]">
                                    <SlidersHorizontal className="h-3 w-3" />
                                    More Filters
                                </button>

                                <button className="ml-auto h-8 px-3 text-[9px] text-red-600">
                                    Clear All
                                </button>

                                <button className="h-8 rounded border px-3 text-[9px]">
                                    Save View
                                </button>

                                <button
                                    aria-label="Refresh"
                                    className="flex h-8 w-8 items-center justify-center rounded border"
                                >
                                    <RefreshCw className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="text-[8px] text-gray-400">
                                    Quick Filters:
                                </span>

                                <StatusBadge type="green">
                                    Assigned to Me
                                </StatusBadge>

                                <StatusBadge type="red">
                                    Critical Conflict
                                </StatusBadge>

                                <StatusBadge type="red">
                                    Pending Approval
                                </StatusBadge>

                                <StatusBadge type="orange">
                                    SLA Breached
                                </StatusBadge>

                                <StatusBadge type="red">
                                    Revalidation Due
                                </StatusBadge>

                                <StatusBadge type="green">
                                    Exceptions
                                </StatusBadge>
                            </div>
                        </Card>

                        {/* TABLE + PREVIEW */}

                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_310px]">
                            <Card className="min-w-0 overflow-hidden">
                                <div className="flex items-center justify-between border-b px-3 py-2">
                                    <div className="flex items-center gap-3">
                                        <SectionTitle>
                                            Compliance Rule Portfolio
                                        </SectionTitle>

                                        <span className="text-[8px] text-gray-400">
                                            Total 428
                                        </span>
                                    </div>

                                    <MoreVertical className="h-4 w-4" />
                                </div>

                                <ComplianceRuleTable
                                    rows={filteredRules}
                                    onSelect={setSelectedRule}
                                />

                                <div className="flex items-center justify-between border-t px-3 py-2 text-[8px]">
                                    <span>
                                        Showing 1 to {filteredRules.length} of 428
                                        entries
                                    </span>

                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4].map((page) => (
                                            <button
                                                key={page}
                                                className={`h-6 min-w-6 rounded border px-2 ${page === 1
                                                        ? "border-[#8b001b] bg-[#8b001b] text-white"
                                                        : ""
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            <SelectedRulePreview
                                rule={selectedRule}
                            />
                        </div>

                        {/* LOWER OPERATIONAL GRID */}

                        <OperationalGrid />

                        {/* WORKFLOW */}

                        <LifecycleWorkflow />
                    </main>

                    <GovernanceIntelligenceRail />
                </div>
            </div>
        </div>
    );
}