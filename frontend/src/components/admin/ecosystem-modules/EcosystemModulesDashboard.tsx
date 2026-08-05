"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpDown,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleDashed,
  CloudCog,
  Component,
  Download,
  Filter,
  Gauge,
  Globe2,
  HeartPulse,
  Layers3,
  Link2,
  ListFilter,
  Network,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  UsersRound,
  X,
  XCircle,
} from "lucide-react";
import { adminRoute } from "@/lib/admin";
import { EmptyState, ErrorState, LoadingSkeleton, PermissionDeniedState } from "@/components/admin/common/States";
import {
  exportEcosystemModuleReport,
  fetchEcosystemModuleDashboard,
  fetchEcosystemModules,
  getModulePermissions,
  registerEcosystemModule,
} from "@/services/api/ecosystemModules";
import type {
  EcosystemModule,
  EcosystemModuleDashboard as DashboardData,
  EcosystemModuleFilters,
  EcosystemModulePage,
  ModuleRegistrationDraft,
  StatusTone,
} from "./types";

const PAGE_SIZE = 5;

const selectFilters = [
  { key: "lifecycle", label: "Lifecycle", options: ["Operational", "Pilot", "Coming Soon", "Planned"] },
  { key: "operationalStatus", label: "Status", options: ["Operational", "Degraded", "Partially Configured", "Unavailable"] },
  { key: "owner", label: "Owner", options: ["Elena Vance", "AI Product Team", "Suresh Kumar", "Maya Perera", "Sanjana Wickram"] },
  { key: "category", label: "Category", options: ["Commerce", "AI", "Wholesale", "Analytics", "Logistics", "Support", "Partner"] },
  { key: "region", label: "Region", options: ["Sri Lanka", "India", "Singapore"] },
  { key: "compliance", label: "Compliance", options: ["Approved", "Conditionally Approved", "Pending Review", "Not Assessed"] },
  { key: "risk", label: "Risk", options: ["Low", "Medium", "High"] },
  { key: "release", label: "Release", options: ["Released", "Candidate", "Blocked", "Not Scheduled"] },
  { key: "environment", label: "Environment", options: ["Production", "Staging", "Development"] },
] as const;

const quickFilters = [
  { id: "operational", label: "Operational", tone: "success" },
  { id: "pilot", label: "Pilot", tone: "info" },
  { id: "release-candidate", label: "Release Candidate", tone: "info" },
  { id: "requires-attention", label: "Requiring Attention", tone: "warning" },
  { id: "high-risk", label: "High Risk", tone: "danger" },
  { id: "not-configured", label: "Not Configured", tone: "neutral" },
  { id: "blocked", label: "Blocked", tone: "danger" },
  { id: "upcoming-releases", label: "Upcoming Releases", tone: "info" },
] as const;

const kpiIcons = {
  total: Layers3,
  active: CheckCircle2,
  pilot: Sparkles,
  "coming-soon": CircleDashed,
  planned: Component,
  "needs-attention": TriangleAlert,
  operational: ShieldCheck,
  degraded: AlertTriangle,
  blocked: XCircle,
  "pending-config": Settings2,
  "integration-issues": Link2,
  "dependency-risk": AlertTriangle,
  "countries-enabled": Globe2,
  "average-health": HeartPulse,
} as const;

type QueryUpdate = Record<string, string | null | undefined>;
type FilterKey = (typeof selectFilters)[number]["key"];
type DialogContent = { title: string; body: ReactNode } | null;

function toFilters(searchParams: URLSearchParams): EcosystemModuleFilters {
  const get = (key: string) => searchParams.get(key) || undefined;
  const page = Number(searchParams.get("page")) || 1;
  return {
    search: get("search"),
    lifecycle: get("lifecycle"),
    operationalStatus: get("operationalStatus"),
    owner: get("owner"),
    category: get("category"),
    region: get("region"),
    compliance: get("compliance"),
    risk: get("risk"),
    release: get("release"),
    environment: get("environment"),
    metric: get("metric"),
    quick: get("quick"),
    sort: (get("sort") as keyof EcosystemModule | undefined) ?? "moduleName",
    direction: get("direction") === "desc" ? "desc" : "asc",
    page,
    pageSize: PAGE_SIZE,
  };
}

export function statusTone(value: string): StatusTone {
  const lower = value.toLowerCase();
  if (/blocked|high|attention|required|unavailable|degraded/.test(lower)) return "danger";
  if (/pending|candidate|pilot|partial|progress|conditional|medium/.test(lower)) return "warning";
  if (/approved|operational|released|configured|healthy|low|yes/.test(lower)) return "success";
  if (/planned|coming|staging/.test(lower)) return "info";
  return "neutral";
}

function StatusPill({ value }: { value: string }) {
  const tone = statusTone(value);
  const toneClasses = {
    success: "text-[#059669] bg-[#ecfdf5] border-[#a7f3d0]",
    danger: "text-[#dc2626] bg-[#fef2f2] border-[#fecaca]",
    warning: "text-[#d97706] bg-[#fffbeb] border-[#fde68a]",
    info: "text-[#2563eb] bg-[#eff6ff] border-[#bfdbfe]",
    neutral: "text-[#6b7280] bg-[#f9fafb] border-[#e5e7eb]",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${toneClasses[tone]}`}>{value}</span>;
}

function MetricBar({ value, tone = "success" }: { value: number; tone?: "success" | "warning" }) {
  return (
    <span className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
      <i className={`block h-full rounded-full ${tone === "warning" ? "bg-[#d97706]" : "bg-[#059669]"}`} style={{ width: `${value}%` }} />
    </span>
  );
}

function formatMetric(value: number | null, suffix: string) {
  return value === null ? "-" : `${value.toFixed(value % 1 === 0 ? 0 : 1)}${suffix}`;
}

function safeReturnPath(value: string | null) {
  return value?.startsWith("/admin/ecosystem-modules") ? value : "/admin/ecosystem-modules";
}

function RegistrationModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (module: EcosystemModule) => void;
}) {
  const [draft, setDraft] = useState<ModuleRegistrationDraft>({
    moduleName: "", moduleKey: "", category: "Operations", primaryOwner: "", technicalOwner: "", environment: "Development",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      onSaved(await registerEcosystemModule(draft));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The module could not be registered.");
    } finally {
      setSaving(false);
    }
  }

  function update(key: keyof ModuleRegistrationDraft, value: string) {
    setDraft((previous) => ({ ...previous, [key]: key === "moduleKey" ? value.toLowerCase().replace(/\s+/g, "-") : value }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="bg-white rounded-xl shadow-xl w-full max-w-[500px] overflow-hidden flex flex-col" onSubmit={submit} aria-labelledby="register-module-title">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-canvas/30">
          <div><p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Controlled frontend workflow</p><h2 id="register-module-title" className="text-[14px] font-bold text-ink">Register module</h2></div>
          <button className="text-muted hover:text-ink hover:bg-canvas p-1.5 rounded transition-colors" type="button" onClick={onClose} aria-label="Close register module dialog"><X size={18} /></button>
        </div>
        <p className="px-6 py-4 text-[12px] text-muted border-b border-line bg-[#f8fafc]">New modules begin in a planned, non-production state. Production enablement requires a separate approved workflow.</p>
        <div className="p-6 grid gap-4 max-h-[60vh] overflow-y-auto">
          <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">Module name<input required className="px-3 py-2 border border-line rounded text-[12px] font-medium outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 placeholder:text-gray-300" value={draft.moduleName} onChange={(event) => update("moduleName", event.target.value)} placeholder="e.g. Client Portal" /></label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">Module key<input required className="px-3 py-2 border border-line rounded text-[12px] font-medium outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 placeholder:text-gray-300" value={draft.moduleKey} onChange={(event) => update("moduleKey", event.target.value)} placeholder="client-portal" pattern="[a-z0-9-]+" /></label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">Category<select className="px-3 py-2 border border-line rounded text-[12px] font-medium outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 bg-white" value={draft.category} onChange={(event) => update("category", event.target.value)}><option>Operations</option><option>Commerce</option><option>AI</option><option>Analytics</option><option>Partner</option></select></label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">Environment<select className="px-3 py-2 border border-line rounded text-[12px] font-medium outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 bg-white" value={draft.environment} onChange={(event) => update("environment", event.target.value)}><option>Development</option><option>Staging</option></select></label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">Primary owner<input required className="px-3 py-2 border border-line rounded text-[12px] font-medium outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 placeholder:text-gray-300" value={draft.primaryOwner} onChange={(event) => update("primaryOwner", event.target.value)} placeholder="Business owner" /></label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">Technical owner<input required className="px-3 py-2 border border-line rounded text-[12px] font-medium outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 placeholder:text-gray-300" value={draft.technicalOwner} onChange={(event) => update("technicalOwner", event.target.value)} placeholder="Engineering owner" /></label>
        </div>
        {error && <p className="mx-6 mb-4 px-3 py-2 bg-red-50 text-red-600 border border-red-100 rounded text-[12px] font-medium flex items-center gap-2" role="alert"><CircleAlert size={14} />{error}</p>}
        <div className="px-6 py-4 border-t border-line bg-canvas flex justify-end gap-3"><button className="px-4 py-1.5 rounded text-[11px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors" type="button" onClick={onClose} disabled={saving}>Cancel</button><button className="px-4 py-1.5 rounded text-[11px] font-bold text-white bg-primary-900 hover:bg-[#5d172a] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed" disabled={saving}>{saving ? "Registering..." : "Register module"}</button></div>
      </form>
    </div>
  );
}

function StandardDialog({ content, onClose }: { content: DialogContent; onClose: () => void }) {
  if (!content) return null;
  return (
    <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="bg-white rounded-xl shadow-xl w-full max-w-[450px] overflow-hidden flex flex-col" role="dialog" aria-modal="true" aria-labelledby="module-dialog-title">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-canvas/30">
          <h2 id="module-dialog-title" className="text-[14px] font-bold text-ink">{content.title}</h2>
          <button className="text-muted hover:text-ink hover:bg-canvas p-1.5 rounded transition-colors" type="button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        <div className="p-6 text-[13px] text-muted leading-relaxed [&>p:not(:last-child)]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:my-3 [&>ul>li]:mb-1">{content.body}</div>
        <div className="px-6 py-4 border-t border-line bg-canvas flex justify-end">
          <button className="px-4 py-1.5 rounded text-[11px] font-bold text-white bg-primary-900 hover:bg-[#5d172a] transition-colors shadow-sm" type="button" onClick={onClose}>Done</button>
        </div>
      </section>
    </div>
  );
}

export function EcosystemModulesDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const filters = useMemo(() => toFilters(new URLSearchParams(queryString)), [queryString]);
  const screenState = searchParams.get("state") ?? "ready";
  const permissions = getModulePermissions(searchParams.get("access") === "read-only");
  const [search, setSearch] = useState(filters.search ?? "");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [registry, setRegistry] = useState<EcosystemModulePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogContent>(null);
  const [notice, setNotice] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const updateQuery = (changes: QueryUpdate, resetPage = true) => {
    const next = new URLSearchParams(queryString);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === "all") next.delete(key);
      else next.set(key, value);
    });
    if (resetPage && changes.page === undefined) next.delete("page");
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
  };

  useEffect(() => setSearch(filters.search ?? ""), [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (search !== (filters.search ?? "")) updateQuery({ search });
    }, 350);
    return () => window.clearTimeout(timer);
    // URL updates intentionally occur only after the user pauses typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    let current = true;
    if (screenState === "error") {
      setLoading(false);
      setError("The module registry service is unavailable. No registry values were replaced with zero.");
      return () => { current = false; };
    }
    setLoading(true);
    setError("");
    Promise.all([fetchEcosystemModuleDashboard(), fetchEcosystemModules(filters)])
      .then(([summary, response]) => {
        if (!current) return;
        setDashboard({ ...summary, freshness: screenState === "stale" ? "stale" : screenState === "partial" ? "partial" : "fresh" });
        setRegistry(screenState === "empty" ? { ...response, data: [], total: 0, totalPages: 1 } : response);
      })
      .catch(() => current && setError("The module registry could not be loaded."))
      .finally(() => current && setLoading(false));
    return () => { current = false; };
  }, [filters, refreshKey, screenState]);

  const returnTo = `${pathname}${queryString ? `?${queryString}` : ""}`;

  function selectMetric(metric: string) {
    updateQuery({ metric: filters.metric === metric || metric === "total" ? null : metric, quick: null });
  }

  function selectQuickFilter(quick: string) {
    updateQuery({ quick: filters.quick === quick ? null : quick, metric: null });
  }

  function updateSort(key: keyof EcosystemModule) {
    const direction = filters.sort === key && filters.direction === "asc" ? "desc" : "asc";
    updateQuery({ sort: key, direction }, false);
  }

  async function exportReport() {
    if (!permissions.canExport) return;
    const csv = await exportEcosystemModuleReport(filters);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ecosystem-module-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Module report exported with the current registry filters.");
  }

  function showReleaseCalendar() {
    setDialog({ title: "Release calendar", body: <><p>The release calendar remains a controlled frontend view until scheduling is connected to the backend.</p><ul className="list-disc pl-5 mt-3 space-y-1"><li>Aug 1 - AI Beauty Advisor candidate review</li><li>Aug 8 - Salon & Spa Portal readiness checkpoint</li><li>Aug 15 - B2B Wholesale dependency review</li></ul></> });
  }

  function onRegistered(module: EcosystemModule) {
    setRegisterOpen(false);
    setNotice(`${module.moduleName} was registered as planned. Production is disabled until a separate approval is completed.`);
    setRefreshKey((value) => value + 1);
  }

  if (screenState === "unauthorized") return <PermissionDeniedState />;

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-canvas font-sans">
      <header className="flex justify-between items-end mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-bold text-ink mb-1">Ecosystem Modules Management</h1>
          <p className="text-[13px] text-muted">Monitor module portfolio, track launches, ensure compliance, and maintain a healthy ecosystem.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-1.5 rounded text-[11px] font-bold text-white bg-[#741d35] border border-[#741d35] hover:bg-[#5d172a] hover:border-[#5d172a] transition-colors shadow-sm flex items-center gap-2" type="button" onClick={() => selectMetric("needs-attention")}><AlertTriangle size={14} />Review Priority Modules</button>
          <button className="px-4 py-1.5 rounded text-[11px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!permissions.canRegister} onClick={() => setRegisterOpen(true)}><Plus size={14} />Register Module</button>
          <button className="px-4 py-1.5 rounded text-[11px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!permissions.canCompare} onClick={() => setDialog({ title: "Compare modules", body: <><p>Choose two module records from the registry to compare their health, readiness and release domains.</p><p className="text-warning mt-2 italic">Comparison is a frontend-only review and does not change module state.</p></> })}><SlidersHorizontal size={14} />Compare Modules</button>
          <button className="px-4 py-1.5 rounded text-[11px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!permissions.canExport} onClick={() => void exportReport()}><ArrowDownToLine size={14} />Export Module Report</button>
          <button className="px-4 py-1.5 rounded text-[11px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!permissions.canManageReleases} onClick={showReleaseCalendar}><CalendarDays size={14} />View Release Calendar</button>
        </div>
      </header>

      {searchParams.get("access") === "read-only" && <div className="mb-6 px-4 py-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-[13px] flex items-center gap-2"><ShieldCheck size={16} />Read-only access: registration, comparison, export and release actions are disabled for this session.</div>}
      {notice && <div className="mb-6 px-4 py-3 bg-green-50 text-green-800 border border-green-200 rounded-lg text-[13px] flex items-center justify-between" role="status"><div className="flex items-center gap-2"><CheckCircle2 size={16} /><span>{notice}</span></div><button className="text-green-800 hover:text-green-900" type="button" aria-label="Dismiss confirmation" onClick={() => setNotice("")}><X size={14} /></button></div>}
      {dashboard?.freshness === "stale" && <div className="mb-6 px-4 py-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-[13px] flex items-center gap-2"><CircleAlert size={16} />Showing the most recently generated portfolio aggregate from {dashboard.generatedAt}. A refresh is pending.</div>}
      {dashboard?.freshness === "partial" && <div className="mb-6 px-4 py-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-[13px] flex items-center gap-2"><CircleAlert size={16} />Partial registry data: availability and error-rate values may be temporarily unavailable for selected modules.</div>}

      {loading ? <LoadingSkeleton /> : error ? <ErrorState message={error} /> : dashboard && registry ? <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3" aria-label="Module portfolio key performance indicators">
            {dashboard.kpis.map((metric) => {
              const Icon = kpiIcons[metric.id as keyof typeof kpiIcons] ?? Gauge;
              const selected = filters.metric === metric.id || (metric.id === "total" && !filters.metric && !filters.quick);
              const toneClass = metric.tone === "danger" ? "text-danger" : metric.tone === "warning" ? "text-warning" : metric.tone === "success" ? "text-success" : "text-muted";
              return <button className={`bg-white rounded-lg border p-4 flex flex-col items-start gap-1 text-left transition-all hover-lift ${selected ? "border-[#741d35] ring-1 ring-[#741d35] shadow-sm" : "border-line"}`} type="button" key={metric.id} onClick={() => selectMetric(metric.id)} aria-pressed={selected}><span className={`mb-1 ${toneClass}`}><Icon size={18} /></span><span className="text-[11px] font-bold text-muted">{metric.label}</span><strong className={`text-[18px] leading-tight ${metric.tone === "danger" ? "text-danger" : "text-ink"}`}>{metric.value}</strong><small className="text-[11px] text-muted">{metric.detail}</small></button>;
            })}
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-line p-5">
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="text-[13px] font-bold text-ink">Module Portfolio Health Summary</h2><p className="text-[11px] text-muted">{dashboard.source} - generated {dashboard.generatedAt}</p></div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-success rounded text-[11px] font-bold border border-green-100"><CheckCircle2 size={13} />{dashboard.freshness === "fresh" ? "Fresh" : dashboard.freshness}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {dashboard.portfolioHealth.map((metric) => (
                <div className="flex flex-col gap-1.5" key={metric.label}>
                  <span className="text-[11px] text-muted">{metric.label}</span>
                  <strong className="text-[16px] text-ink">{metric.value}</strong>
                  <MetricBar value={metric.progress} tone={metric.tone} />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-line flex flex-col" aria-label="Module registry workspace">
            <form className="p-4 border-b border-line flex items-center justify-between gap-4" onSubmit={(event) => { event.preventDefault(); updateQuery({ search }); }}>
              <label className="flex-1 flex items-center gap-2 bg-canvas px-3 py-2 rounded-lg border border-line focus-within:border-primary-900 focus-within:ring-1 focus-within:ring-primary-900 transition-shadow">
                <Search size={16} className="text-muted" />
                <input className="flex-1 bg-transparent border-none outline-none text-[13px] text-ink placeholder:text-gray-400" aria-label="Search modules" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search modules by name, key, owner, or reference..." />
              </label>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-line rounded-lg text-[12px] font-bold text-ink hover:bg-gray-50 transition-colors" type="button" onClick={() => setDialog({ title: "Applied registry filters", body: <p>All selected filters, sorting and the current page are stored in the address bar so this operational view can be shared.</p> })}><Filter size={16} />Filters</button>
            </form>
            
            <div className="p-4 border-b border-line grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {selectFilters.map((filter) => (
                <label className="flex flex-col gap-1.5 text-[11px] font-bold text-muted" key={filter.key}>
                  {filter.label}
                  <select className="px-2.5 py-1.5 bg-white border border-line rounded text-[12px] font-medium text-ink outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900" aria-label={filter.label} value={filters[filter.key] ?? ""} onChange={(event) => updateQuery({ [filter.key]: event.target.value } as QueryUpdate)}>
                    <option value="">All {filter.label === "Status" ? "Statuses" : `${filter.label}s`}</option>
                    {filter.options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              ))}
            </div>
            
            <div className="p-4 bg-[#f8fafc] flex flex-wrap items-center gap-3">
              <span className="text-[12px] font-bold text-muted">Quick Filters:</span>
              {quickFilters.map((filter) => {
                const isActive = filters.quick === filter.id;
                const dotColor = filter.tone === "danger" ? "bg-danger" : filter.tone === "warning" ? "bg-warning" : filter.tone === "success" ? "bg-success" : filter.tone === "info" ? "bg-info" : "bg-muted";
                return <button key={filter.id} type="button" onClick={() => selectQuickFilter(filter.id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors border ${isActive ? "bg-white border-[#741d35] text-[#741d35] shadow-sm" : "bg-white border-line text-muted hover:bg-gray-50"}`}>
                  <i className={`w-2 h-2 rounded-full ${dotColor}`} />{filter.label}
                </button>;
              })}
              <button className="ml-auto text-[11px] font-bold text-[#741d35] hover:underline" type="button" onClick={() => { setSearch(""); router.push(pathname, { scroll: false }); }}>Clear All</button>
            </div>
          </section>

          {!registry.data.length ? <div className="py-12 flex flex-col items-center gap-4 bg-white rounded-xl border border-line shadow-sm"><EmptyState title="No modules match this registry view" /><button className="px-4 py-2 rounded-lg border border-line text-[12px] font-bold bg-white hover:bg-gray-50 transition-colors" type="button" onClick={() => router.push(pathname)}>Clear registry filters</button></div> : <ModuleRegistryTable registry={registry} filters={filters} returnTo={returnTo} onSort={updateSort} onPageChange={(page) => updateQuery({ page: String(page) }, false)} />}

          <PortfolioPanels onAction={(title, body) => setDialog({ title, body })} />
        </div>
        <OperationsPanel
          onFilter={(changes) => updateQuery(changes)}
          onDialog={(title, body) => setDialog({ title, body })}
          onRegister={() => setRegisterOpen(true)}
          onCalendar={showReleaseCalendar}
          canManageActions={permissions.canRegister}
        />
      </div> : null}

      {registerOpen && <RegistrationModal onClose={() => setRegisterOpen(false)} onSaved={onRegistered} />}
      <StandardDialog content={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}

function ModuleRegistryTable({
  registry,
  filters,
  returnTo,
  onSort,
  onPageChange,
}: {
  registry: EcosystemModulePage;
  filters: EcosystemModuleFilters;
  returnTo: string;
  onSort: (key: keyof EcosystemModule) => void;
  onPageChange: (page: number) => void;
}) {
  const columns: Array<{ key: keyof EcosystemModule; label: string; render: (module: EcosystemModule) => ReactNode }> = [
    { key: "publicReference", label: "Public Module Reference", render: (module) => module.publicReference },
    { key: "databaseModuleId", label: "Database Module ID", render: (module) => module.databaseModuleId },
    { key: "moduleName", label: "Module Name", render: (module) => <strong>{module.moduleName}</strong> },
    { key: "moduleKey", label: "Module Key", render: (module) => module.moduleKey },
    { key: "category", label: "Category", render: (module) => module.category },
    { key: "lifecycle", label: "Lifecycle", render: (module) => <StatusPill value={module.lifecycle} /> },
    { key: "operationalStatus", label: "Operational Status", render: (module) => <StatusPill value={module.operationalStatus} /> },
    { key: "releaseStatus", label: "Release Status", render: (module) => <StatusPill value={module.releaseStatus} /> },
    { key: "currentVersion", label: "Current Version", render: (module) => module.currentVersion },
    { key: "targetVersion", label: "Target Version", render: (module) => module.targetVersion },
    { key: "productionEnabled", label: "Production Enabled", render: (module) => <StatusPill value={module.productionEnabled ? "Yes" : "No"} /> },
    { key: "configurationStatus", label: "Configuration Status", render: (module) => <StatusPill value={module.configurationStatus} /> },
    { key: "integrationReadiness", label: "Integration Readiness", render: (module) => <StatusPill value={module.integrationReadiness} /> },
    { key: "dependencyHealth", label: "Dependency Health", render: (module) => <StatusPill value={module.dependencyHealth} /> },
    { key: "complianceStatus", label: "Compliance Status", render: (module) => <StatusPill value={module.complianceStatus} /> },
    { key: "securityReview", label: "Security Review", render: (module) => <StatusPill value={module.securityReview} /> },
    { key: "countriesEnabled", label: "Countries Enabled", render: (module) => module.countriesEnabled },
    { key: "activeUsers", label: "Active Users", render: (module) => module.activeUsers.toLocaleString() },
    { key: "monthlyTransactions", label: "Monthly Transactions", render: (module) => module.monthlyTransactions.toLocaleString() },
    { key: "adoptionRate", label: "Adoption Rate", render: (module) => `${module.adoptionRate}%` },
    { key: "availability", label: "Availability", render: (module) => formatMetric(module.availability, "%") },
    { key: "errorRate", label: "Error Rate", render: (module) => formatMetric(module.errorRate, "%") },
    { key: "healthScore", label: "Health Score", render: (module) => `${module.healthScore}/100` },
    { key: "riskLevel", label: "Risk Level", render: (module) => <StatusPill value={module.riskLevel} /> },
    { key: "riskTrend", label: "Risk Trend", render: (module) => module.riskTrend },
    { key: "primaryOwner", label: "Primary Owner", render: (module) => module.primaryOwner },
    { key: "technicalOwner", label: "Technical Owner", render: (module) => module.technicalOwner },
    { key: "lastRelease", label: "Last Release", render: (module) => module.lastRelease },
    { key: "nextUpdate", label: "Next Update", render: (module) => module.nextUpdate },
    { key: "lastUpdated", label: "Last Updated", render: (module) => module.lastUpdated },
  ];
  const resultStart = registry.total ? (registry.page - 1) * registry.pageSize + 1 : 0;
  const resultEnd = Math.min(registry.page * registry.pageSize, registry.total);

  return <section className="bg-white rounded-xl shadow-sm border border-line flex flex-col overflow-hidden">
    <div className="p-5 border-b border-line flex items-center justify-between">
      <div><h2 className="text-[13px] font-bold text-ink">Module Registry</h2><p className="text-[11px] text-muted">30-field module data model - horizontal scrolling keeps every status domain available.</p></div>
      <span className="text-[12px] font-bold text-muted bg-canvas px-2.5 py-1 rounded-md border border-line">{registry.total} module{registry.total === 1 ? "" : "s"}</span>
    </div>
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full min-w-[2800px] border-collapse text-left text-[12px]">
        <thead>
          <tr className="bg-canvas/50 border-b border-line">
            {columns.map((column) => (
              <th key={column.key} scope="col" className="p-3 font-bold text-muted border-r border-line last:border-r-0 whitespace-nowrap">
                <button className="flex items-center gap-1.5 hover:text-ink transition-colors outline-none" type="button" onClick={() => onSort(column.key)}>
                  {column.label}
                  <ArrowUpDown size={11} className={`transition-colors ${filters.sort === column.key ? "text-[#741d35]" : "opacity-30"}`} />
                </button>
              </th>
            ))}
            <th scope="col" className="p-3 font-bold text-muted whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-line">
          {registry.data.map((module) => (
            <tr key={module.id} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className="p-3 border-r border-line last:border-r-0 whitespace-nowrap align-middle">
                  {column.render(module)}
                </td>
              ))}
              <td className="p-3 whitespace-nowrap align-middle">
                <Link className="text-[11px] font-bold text-[#741d35] hover:underline" href={`${adminRoute.ecosystemModule(module.moduleKey)}?returnTo=${encodeURIComponent(returnTo)}`}>Open Module</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="p-4 border-t border-line bg-[#f8fafc] flex items-center justify-between">
      <span className="text-[11px] font-bold text-muted">Showing {resultStart}-{resultEnd} of {registry.total} modules</span>
      <div className="flex items-center gap-4">
        <button className="text-muted hover:text-ink hover:bg-white p-1 rounded border border-transparent hover:border-line transition-all disabled:opacity-30 disabled:cursor-not-allowed" type="button" aria-label="Previous module registry page" disabled={registry.page === 1} onClick={() => onPageChange(registry.page - 1)}><ChevronLeft size={16} /></button>
        <strong className="text-[11px] font-bold text-ink">{registry.page} / {registry.totalPages}</strong>
        <button className="text-muted hover:text-ink hover:bg-white p-1 rounded border border-transparent hover:border-line transition-all disabled:opacity-30 disabled:cursor-not-allowed" type="button" aria-label="Next module registry page" disabled={registry.page === registry.totalPages} onClick={() => onPageChange(registry.page + 1)}><ChevronRight size={16} /></button>
      </div>
    </div>
  </section>;
}

function PortfolioPanels({ onAction }: { onAction: (title: string, body: ReactNode) => void }) {
  const panels = [
    { title: "Adoption by Module", rows: [["B2C Marketplace", "92%"], ["Orders & Fulfilment", "89%"], ["Logistics", "81%"], ["Customer Support", "74%"], ["AI Beauty Advisor", "41%"]], action: "View full adoption report" },
    { title: "Release Readiness", rows: [["AI Beauty Advisor", "86%"], ["B2B Wholesale", "58%"], ["Salon & Spas", "44%"], ["Clinics & Dermatologists", "36%"], ["Academy & Training", "29%"]], action: "View release timeline" },
    { title: "Integration Health", rows: [["Payment Gateway", "Healthy"], ["Email Service", "Healthy"], ["SMS Service", "Healthy"], ["Logistics Providers", "Degraded"], ["Gemini Provider", "Attention Required"]], action: "View integration registry" },
    { title: "Dependency Risks", rows: [["AI Beauty Advisor depends on Gemini API", "High"], ["B2B Wholesale waiting on ERP integration", "Medium"], ["Logistics module depends on 2 degraded providers", "Medium"], ["Beauty Issue Analyzer blocked by ML model validation", "High"]], action: "View dependency map" },
    { title: "Country Availability", rows: [["Sri Lanka - LK", "11 enabled"], ["Canada - CA", "Planning"], ["United Kingdom - GB", "Not Configured"], ["Australia - AU", "Not Configured"], ["Maldives - MV", "Planning"]], action: "View country availability" },
    { title: "Security & Compliance", rows: [["Approved", "8"], ["Conditionally Approved", "2"], ["Reviews Pending", "3"], ["Not Assessed", "3"], ["High-Risk Findings", "2"]], action: "View compliance center" },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {panels.map((panel) => (
        <article className="bg-white rounded-xl shadow-sm border border-line flex flex-col" key={panel.title}>
          <h2 className="p-4 border-b border-line text-[13px] font-bold text-ink">{panel.title}</h2>
          <div className="flex-1 p-4 flex flex-col gap-3">
            {panel.rows.map(([label, value]) => (
              <div className="flex items-center justify-between text-[12px]" key={label}>
                <span className="text-muted line-clamp-1 mr-2">{label}</span>
                {panel.title.includes("Adoption") || panel.title.includes("Readiness") ? (
                  <span className="flex items-center gap-2 min-w-[100px]">
                    <span className="flex-1 h-1.5 bg-canvas rounded-full overflow-hidden"><i className="block h-full bg-[#741d35] rounded-full" style={{ width: value }} /></span>
                    <strong className="text-ink font-bold w-[32px] text-right">{value}</strong>
                  </span>
                ) : (
                  <strong className={`font-bold whitespace-nowrap ${statusTone(value) === "danger" ? "text-danger" : statusTone(value) === "warning" ? "text-warning" : statusTone(value) === "success" ? "text-success" : "text-ink"}`}>{value}</strong>
                )}
              </div>
            ))}
          </div>
          <button className="px-4 py-3 border-t border-line text-[11px] font-bold text-[#741d35] bg-[#f8fafc] hover:bg-gray-50 flex items-center justify-between transition-colors mt-auto" type="button" onClick={() => onAction(panel.title, <p>{panel.action} is ready for a route-level integration. This frontend view preserves the current module workspace state.</p>)}>
            {panel.action} <ChevronRight size={13} />
          </button>
        </article>
      ))}
    </section>
  );
}

function OperationsPanel({
  onFilter,
  onDialog,
  onRegister,
  onCalendar,
  canManageActions,
}: {
  onFilter: (changes: QueryUpdate) => void;
  onDialog: (title: string, body: ReactNode) => void;
  onRegister: () => void;
  onCalendar: () => void;
  canManageActions: boolean;
}) {
  const healthRows = [["Operational Availability", "99.4%", 99.4], ["Configuration Completeness", "88%", 88], ["Integration Readiness", "84%", 84], ["Dependency Health", "89%", 89], ["Compliance Readiness", "92%", 92], ["Release Readiness", "86%", 86], ["Adoption Growth", "+12.0%", 82]];
  const alerts = ["AI Beauty Advisor security review pending", "B2B Wholesale integration readiness blocked", "Beauty Issue Analyzer validation not started", "Logistics provider health degraded", "Three modules have pending compliance reviews", "One release is currently blocked"];
  
  return (
    <aside className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">
      <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink">Portfolio Health</h2>
        <div className="p-5 flex flex-col gap-4">
          {healthRows.map(([label, value, progress]) => (
            <div className="flex items-center justify-between gap-3 text-[12px]" key={String(label)}>
              <span className="text-muted w-[140px] truncate">{label}</span>
              <MetricBar value={Number(progress)} />
              <strong className="text-ink font-bold w-[45px] text-right">{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><TriangleAlert size={15} className="text-warning" />Priority Alerts</h2>
        <div className="flex flex-col divide-y divide-line">
          {alerts.map((alert, index) => (
            <button type="button" className="p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors" key={alert} onClick={() => onFilter({ quick: index === 5 ? "blocked" : "requires-attention", metric: null })}>
              <TriangleAlert size={14} className="text-warning shrink-0 mt-0.5" />
              <span className="text-[12px] text-ink leading-snug font-medium">{alert}</span>
            </button>
          ))}
          <button className="px-5 py-3 text-[11px] font-bold text-[#741d35] bg-[#f8fafc] hover:bg-gray-50 flex items-center justify-between transition-colors" type="button" onClick={() => onFilter({ quick: "requires-attention", metric: null })}>View all alerts <ChevronRight size={13} /></button>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><ListFilter size={15} className="text-info" />Quick Queue</h2>
        <div className="flex flex-col divide-y divide-line">
          {[["Highest-Risk Module", "Beauty Issue Analyzer"], ["Next Scheduled Release", "B2C Marketplace (Jul 24)"], ["Oldest Pending Configuration", "B2B Wholesale (62%)"], ["Most-Adopted Module", "B2C Marketplace (92%)"], ["Lowest-Adoption Active Module", "AI Beauty Advisor (41%)"], ["Dependency Review Required", "AI Beauty Advisor"]].map(([label, value]) => (
            <button className="p-4 flex flex-col gap-1 text-left hover:bg-gray-50 transition-colors" type="button" key={label} onClick={() => onFilter({ search: value.split(" (")[0], page: null })}>
              <span className="text-[11px] text-muted font-bold">{label}</span>
              <strong className="text-[12px] text-ink">{value}</strong>
            </button>
          ))}
          <button className="px-5 py-3 text-[11px] font-bold text-[#741d35] bg-[#f8fafc] hover:bg-gray-50 flex items-center justify-between transition-colors" type="button" onClick={() => onDialog("Priority queue", <p>Queue entries open their matching filtered registry views while preserving all current URL state.</p>)}>View full queue <ChevronRight size={13} /></button>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><CloudCog size={15} className="text-muted" />Environment Health</h2>
        <div className="p-5 flex flex-col gap-3">
          {[["Production", "Operational"], ["Staging", "Operational"], ["Development", "Operational"], ["Failed Deployments", "1"], ["Configuration Drift", "2 modules"], ["Pending Migrations", "1"]].map(([label, value]) => (
            <div className="flex items-center justify-between text-[12px]" key={label}>
              <span className="text-muted">{label}</span>
              <strong className={`font-bold ${value === "Operational" ? "text-success" : value === "1" || value === "2 modules" ? "text-warning" : "text-ink"}`}>{value}</strong>
            </div>
          ))}
        </div>
        <button className="px-5 py-3 border-t border-line text-[11px] font-bold text-[#741d35] bg-[#f8fafc] hover:bg-gray-50 flex items-center justify-between transition-colors" type="button" onClick={() => onDialog("Environment health", <p>Environment health is an aggregate read-only summary. No production controls are exposed here.</p>)}>View environment dashboard <ChevronRight size={13} /></button>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><CalendarDays size={15} className="text-muted" />Release Summary</h2>
        <div className="p-5 flex flex-col gap-3">
          {[["Released This Month", "3"], ["Release Candidates", "3"], ["Scheduled Releases", "2"], ["Blocked Releases", "1"], ["Rollback Events", "0"], ["Modules Connected", "8"]].map(([label, value]) => (
            <div className="flex items-center justify-between text-[12px]" key={label}>
              <span className="text-muted">{label}</span>
              <strong className="text-ink font-bold">{value}</strong>
            </div>
          ))}
        </div>
        <button className="px-5 py-3 border-t border-line text-[11px] font-bold text-[#741d35] bg-[#f8fafc] hover:bg-gray-50 flex items-center justify-between transition-colors" type="button" onClick={onCalendar}>View release dashboard <ChevronRight size={13} /></button>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><Network size={15} className="text-muted" />Module Actions</h2>
        <div className="flex flex-col">
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!canManageActions} onClick={onRegister}>Register Module</button>
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!canManageActions} onClick={() => onDialog("Compare modules", <p>Select two registry records to compare their current health and release readiness.</p>)}>Compare Modules</button>
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors" type="button" onClick={() => onDialog("Feature flags", <p>Feature flags are maintained in each module workspace and never reveal secret values.</p>)}>View Feature Flags</button>
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors" type="button" onClick={() => onDialog("Dependency map", <p>Dependency map data will use the selected module registry filters when the backend integration is connected.</p>)}>View Dependency Map</button>
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors" type="button" onClick={() => onDialog("Integration registry", <p>Integration registry supports operational review only; mutations require the detail workspace.</p>)}>View Integration Registry</button>
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors" type="button" onClick={() => onDialog("Country availability", <p>Country availability status is available for planning and readiness review.</p>)}>View Country Availability</button>
          <button className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!canManageActions} onClick={onCalendar}>View Release Calendar</button>
          <button className="px-5 py-3 text-[12px] font-medium text-ink text-left hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!canManageActions} onClick={() => onDialog("Export module report", <p>Use the export action in the page header to download the current registry view.</p>)}>Export Module Report</button>
        </div>
      </section>
    </aside>
  );
}

