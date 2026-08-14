"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowDownUp, Download, Plus, RefreshCw, Search } from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import type { EcosystemModule, EcosystemModuleDashboard, EcosystemModuleFilters, EcosystemModulePage } from "@/components/admin/ecosystem-modules/types";
import { exportEcosystemModuleReport, fetchEcosystemModuleDashboard, fetchEcosystemModules } from "@/services/api/ecosystemModules";

const EMPTY_PAGE: EcosystemModulePage = { data: [], total: 0, page: 1, pageSize: 25, totalPages: 1 };

function downloadCsv(csv: string) {
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ecosystem-module-registry.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function display(value: string | number | null | undefined, suffix = "") {
  return value === null || value === undefined || value === "" ? "—" : `${value}${suffix}`;
}

export function ModuleRegistryWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams?.get("search") ?? "");
  const [modules, setModules] = useState<EcosystemModulePage>(EMPTY_PAGE);
  const [dashboard, setDashboard] = useState<EcosystemModuleDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const filters = useMemo<EcosystemModuleFilters>(() => ({
    search: searchParams?.get("search") ?? undefined,
    category: searchParams?.get("category") ?? undefined,
    lifecycle: searchParams?.get("lifecycle") ?? undefined,
    operationalStatus: searchParams?.get("status") ?? undefined,
    environment: searchParams?.get("environment") ?? undefined,
    risk: searchParams?.get("risk") ?? undefined,
    sort: (searchParams?.get("sort") as keyof EcosystemModule | null) ?? "lastUpdated",
    direction: searchParams?.get("direction") === "asc" ? "asc" : "desc",
    page: Number(searchParams?.get("page") ?? 1),
    pageSize: 25,
  }), [searchParams]);

  const setQuery = useCallback((changes: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    Object.entries(changes).forEach(([key, value]) => value === null || value === "" ? params.delete(key) : params.set(key, String(value)));
    router.push(`/admin/ecosystem-modules/registry${params.size ? `?${params}` : ""}`, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([fetchEcosystemModuleDashboard(), fetchEcosystemModules(filters)])
      .then(([dashboardData, moduleData]) => {
        if (!active) return;
        setDashboard(dashboardData);
        setModules(moduleData);
      })
      .catch((reason: unknown) => active && setError(reason instanceof Error ? reason.message : "Unable to load the module registry."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [filters, refreshKey]);

  const sort = (key: keyof EcosystemModule) => setQuery({
    sort: key,
    direction: filters.sort === key && filters.direction === "asc" ? "desc" : "asc",
    page: 1,
  });

  const kpis = dashboard?.kpis.slice(0, 9) ?? [];

  return (
    <AnalyticsShell>
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs text-slate-500">Enterprise Modules &gt; Registry</p>
          <h1 className="text-xl font-extrabold text-slate-900">Module Registry &amp; Catalogue</h1>
          <p className="mt-1 text-xs text-slate-500">Database-backed registry, lifecycle, health, ownership, release, security and compliance status.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="flex items-center gap-1 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold"><RefreshCw size={13} /> Refresh</button>
          <button type="button" disabled={!dashboard?.permissions.canExport} onClick={() => void exportEcosystemModuleReport(filters).then(downloadCsv)} className="flex items-center gap-1 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-50"><Download size={13} /> Export Registry</button>
          <Link href="/admin/ecosystem-modules" aria-disabled={!dashboard?.permissions.canRegister} className={`flex items-center gap-1 rounded bg-burgundy px-3 py-2 text-xs font-semibold text-white ${!dashboard?.permissions.canRegister ? "pointer-events-none opacity-50" : ""}`}><Plus size={13} /> Register Module</Link>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-9" aria-label="Registry summary">
        {loading && !dashboard ? Array.from({ length: 9 }, (_, index) => <div key={index} className="h-20 animate-pulse rounded-lg border border-slate-200 bg-slate-100" />) : kpis.map((kpi) => (
          <article key={kpi.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="truncate text-[10px] font-bold uppercase text-slate-500">{kpi.label}</p>
            <strong className="mt-2 block text-lg text-slate-900">{kpi.value}</strong>
            <p className="mt-1 truncate text-[9px] text-slate-400">{kpi.detail}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <form onSubmit={(event) => { event.preventDefault(); setQuery({ search: search.trim() || null, page: 1 }); }} className="grid gap-2 md:grid-cols-[2fr_repeat(4,1fr)_auto]">
          <label className="relative"><Search size={14} className="absolute left-3 top-2.5 text-slate-400" /><input aria-label="Search registry" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search modules or owners…" className="w-full rounded border border-slate-200 py-2 pl-8 pr-2 text-xs" /></label>
          {[
            ["category", "All Categories", ["Commerce", "Operations", "Analytics", "AI", "Support"]],
            ["lifecycle", "All Lifecycles", ["planned", "coming_soon", "pilot", "release_candidate", "operational", "deprecated"]],
            ["status", "All Statuses", ["draft", "operational", "degraded", "maintenance", "inactive", "blocked"]],
            ["risk", "All Risks", ["unknown", "low", "medium", "high", "critical"]],
          ].map(([key, label, options]) => (
            <select key={key as string} aria-label={label as string} value={searchParams?.get(key as string) ?? ""} onChange={(event) => setQuery({ [key as string]: event.target.value || null, page: 1 })} className="rounded border border-slate-200 bg-white px-2 py-2 text-xs">
              <option value="">{label as string}</option>
              {(options as string[]).map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}
            </select>
          ))}
          <button className="rounded bg-burgundy px-4 py-2 text-xs font-semibold text-white" type="submit">Apply</button>
        </form>
      </section>

      {error ? <section role="alert" className="rounded-lg border border-red-200 bg-white p-8 text-center"><AlertTriangle className="mx-auto text-red-600" /><h2 className="mt-2 font-bold">Registry unavailable</h2><p className="mt-1 text-sm text-slate-600">{error}</p><button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="mt-4 rounded border px-4 py-2 text-xs font-semibold">Retry</button></section> : (
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-4"><div><h2 className="text-sm font-bold">Module Registry</h2><p className="text-[11px] text-slate-500">Server-filtered, sorted and paginated records.</p></div><strong className="text-xs">{modules.total} modules</strong></div>
          <div className="overflow-x-auto">
            <table className="min-w-[1900px] w-full text-left text-xs">
              <thead className="bg-slate-50"><tr>{[
                ["publicReference", "Module Code"], ["moduleName", "Module Name"], ["category", "Category"], ["lifecycle", "Lifecycle"], ["operationalStatus", "Status"], ["currentVersion", "Current Version"], ["targetVersion", "Target Version"], ["releaseStatus", "Release"], ["securityReview", "Security"], ["complianceStatus", "Compliance"], ["integrationReadiness", "Integration"], ["dependencyHealth", "Dependency"], ["healthScore", "Health"], ["riskLevel", "Risk"], ["primaryOwner", "Owner"], ["lastUpdated", "Updated"],
              ].map(([key, label]) => <th className="whitespace-nowrap border-b p-3" key={key}><button type="button" className="flex items-center gap-1 font-bold" onClick={() => sort(key as keyof EcosystemModule)}>{label}<ArrowDownUp size={10} /></button></th>)}<th className="border-b p-3">Action</th></tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={17} className="p-12 text-center text-slate-500">Loading registry…</td></tr> : !modules.data.length ? <tr><td colSpan={17} className="p-12 text-center text-slate-500">No ecosystem modules found.</td></tr> : modules.data.map((module) => (
                  <tr key={module.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-bold text-burgundy">{module.publicReference}</td><td className="p-3 font-bold">{module.moduleName}</td><td className="p-3">{module.category}</td>
                    <td className="p-3"><StatusBadge status="info" label={module.lifecycle} /></td><td className="p-3"><StatusBadge status={module.operationalStatus === "Operational" ? "success" : "warning"} label={module.operationalStatus} /></td>
                    <td className="p-3 font-mono">{display(module.currentVersion)}</td><td className="p-3 font-mono">{display(module.targetVersion)}</td><td className="p-3">{module.releaseStatus}</td><td className="p-3">{module.securityReview}</td><td className="p-3">{module.complianceStatus}</td><td className="p-3">{module.integrationReadiness}</td><td className="p-3">{module.dependencyHealth}</td><td className="p-3">{display(module.healthScore, "/100")}</td><td className="p-3">{module.riskLevel}</td><td className="p-3">{display(module.primaryOwner)}</td><td className="p-3">{module.lastUpdated ? new Date(module.lastUpdated).toLocaleString() : "—"}</td>
                    <td className="p-3"><Link className="font-bold text-burgundy hover:underline" href={`/admin/ecosystem-modules/modules/${module.moduleKey}`}>View Module</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="flex items-center justify-between bg-slate-50 p-4 text-xs"><span>Page {modules.page} of {modules.totalPages}</span><div className="flex gap-2"><button disabled={modules.page <= 1} onClick={() => setQuery({ page: modules.page - 1 })} className="rounded border bg-white px-3 py-1 disabled:opacity-40">Previous</button><button disabled={modules.page >= modules.totalPages} onClick={() => setQuery({ page: modules.page + 1 })} className="rounded border bg-white px-3 py-1 disabled:opacity-40">Next</button></div></footer>
        </section>
      )}

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(dashboard?.distributions ?? {}).map(([name, points]) => <article key={name} className="min-h-48 rounded-lg border border-slate-200 bg-white p-4"><h2 className="text-sm font-bold capitalize">{name.replace(/([A-Z])/g, " $1")}</h2><div className="mt-4 space-y-3">{!points.length ? <p className="text-xs text-slate-500">No data available.</p> : points.map((point) => <div key={point.name ?? "unknown"}><div className="flex justify-between text-xs"><span>{point.name ?? "Unknown"}</span><strong>{point.value}</strong></div><div className="mt-1 h-1.5 rounded bg-slate-100"><div className="h-full rounded bg-burgundy" style={{ width: `${modules.total ? Math.min(100, point.value / modules.total * 100) : 0}%` }} /></div></div>)}</div></article>)}
      </section>
    </AnalyticsShell>
  );
}
