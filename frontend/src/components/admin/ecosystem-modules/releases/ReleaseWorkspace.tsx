"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, GitCommit, Search, Filter, Save, 
  Download, DownloadCloud, AlertTriangle, Play, FileText, Check, ShieldAlert, 
  Zap, Globe, Package, Link as LinkIcon, Settings, Grid, Users, Layers, 
  ArrowRight, ShieldCheck, CheckSquare, XCircle, AlertCircle, TrendingUp, 
  Activity, ArrowLeft, Info, Eye, Shield, Lock, FileCode, ExternalLink,
  RefreshCw, GitPullRequest, Sliders, Pause, RotateCcw, ArrowUpRight, Calendar
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { RELEASE_DATA, VersionReleaseItem, EnvironmentPromotionItem, EnvironmentMatrixRow, ReadinessPortfolioItem, GovernanceGateItem, EnvironmentDriftItem, PromotionQueueItem, ReleaseCalendarItem, WindowConflictItem, MigrationReadinessItem, RollbackReadinessItem, DependencyImpactItem, FeatureFlagReadinessItem, RegionalReadinessItem, PostReleaseMonitoringItem, SupportLifecycleItem, RecentReleaseActivityItem } from "@/data/ecosystem-modules/releaseData";

export function ReleaseWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Release Overview");

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const registryCols: ColumnDef<VersionReleaseItem>[] = [
    { header: "Release Ref", accessorKey: "ref", align: "left", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500">{row.ref}</span> },
    { header: "Component", accessorKey: "component", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.component}</span> },
    { header: "Type", accessorKey: "componentType", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600 font-medium">{row.componentType}</span> },
    { header: "Target Env", accessorKey: "targetEnv", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.targetEnv}</span> },
    { header: "Status", accessorKey: "releaseStatus", align: "center", renderCell: (row) => <StatusBadge status={row.releaseStatus} /> },
    { header: "Version", accessorKey: "releaseVersion", align: "center", renderCell: (row) => <span className="text-[10px] font-bold text-slate-700">{row.releaseVersion}</span> },
    { header: "Current", accessorKey: "currentVersion", align: "center", renderCell: (row) => <span className="font-mono text-[10px] text-slate-500">{row.currentVersion}</span> },
    { header: "Target", accessorKey: "targetVersion", align: "center", renderCell: (row) => <span className="font-mono text-[10px] font-bold text-slate-900">{row.targetVersion}</span> },
    { header: "Compat", accessorKey: "compatibility", align: "center", renderCell: (row) => <span className="text-emerald-700 font-bold">{row.compatibility}</span> },
    { header: "Security", accessorKey: "security", align: "center", renderCell: (row) => <span className={row.security === 'Green' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{row.security}</span> },
    { header: "Compliance", accessorKey: "compliance", align: "center", renderCell: (row) => <span className="text-[10px] font-medium text-slate-700">{row.compliance}</span> },
    { header: "Migration", accessorKey: "migration", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.migration}</span> },
    { header: "Rollback", accessorKey: "rollback", align: "center", renderCell: (row) => <span className={row.rollback === 'Ready' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{row.rollback}</span> },
    { header: "Readiness", accessorKey: "readiness", align: "center", renderCell: (row) => <span className="font-extrabold text-emerald-700">{row.readiness}</span> },
    { header: "Risk", accessorKey: "risk", align: "center", renderCell: (row) => <span className={row.risk === 'High' ? 'text-rose-600 font-bold' : row.risk === 'Medium' ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'}>{row.risk}</span> },
  ];

  const promotionQueueCols: ColumnDef<PromotionQueueItem>[] = [
    { header: "From Env", accessorKey: "fromEnv", align: "left" },
    { header: "To Env", accessorKey: "toEnv", align: "left" },
    { header: "Release", accessorKey: "release", align: "center", renderCell: (row) => <span className="font-mono text-[10px] font-bold text-slate-800">{row.release}</span> },
    { header: "Approval", accessorKey: "approval", align: "center" },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <StatusBadge status={row.status} /> },
    { header: "Window", accessorKey: "window", align: "right", renderCell: (row) => <span className="text-slate-500 text-[9.5px]">{row.window}</span> },
  ];

  const activityCols: ColumnDef<RecentReleaseActivityItem>[] = [
    { header: "Activity", accessorKey: "activity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.activity}</span> },
    { header: "Component", accessorKey: "component", align: "left", renderCell: (row) => <span className="text-slate-600">{row.component}</span> },
    { header: "User", accessorKey: "user", align: "center" },
    { header: "Time", accessorKey: "time", align: "center", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
    { header: "Details", accessorKey: "details", align: "right", renderCell: (row) => <span className="text-slate-500 text-[10px] truncate max-w-[140px] block">{row.details}</span> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Versions &amp; Releases</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {RELEASE_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {RELEASE_DATA.headerInfo.description}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("View Release Calendar")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Calendar size={12} /> View Release Calendar
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Environments")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Compare Environments
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Release Readiness")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Release Readiness
          </button>
          <button
            type="button"
            onClick={() => handleAction("Create Release Candidate")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create Release Candidate
          </button>
        </div>
      </div>

      {/* 2. Context Scope Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-xs divide-x divide-slate-100">
          <div className="pl-0"><span className="text-[9px] font-bold text-slate-400 uppercase block">Tenant</span><span className="font-bold text-slate-800 block text-[11px]">{RELEASE_DATA.contextBar.tenant}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Ecosystem</span><span className="font-bold text-slate-800 block text-[11px]">{RELEASE_DATA.contextBar.ecosystem}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Scope</span><span className="font-bold text-slate-800 block text-[11px]">{RELEASE_DATA.contextBar.scope}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Region</span><span className="font-bold text-slate-800 block text-[11px]">{RELEASE_DATA.contextBar.region}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Timezone</span><span className="font-bold text-slate-800 block text-[11px]">{RELEASE_DATA.contextBar.timezone}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Registry Status</span><span className="text-emerald-700 font-extrabold block text-[11px]">{RELEASE_DATA.contextBar.registryStatus}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Release Governance</span><span className="text-emerald-700 font-extrabold block text-[11px]">{RELEASE_DATA.contextBar.releaseGovernance}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Last Updated</span><span className="font-semibold text-slate-600 block text-[10px]">{RELEASE_DATA.contextBar.lastUpdated}</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 3. Primary KPI Row (10 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
            {RELEASE_DATA.primaryKpis.map((kpi, idx) => (
              <div
                key={idx}
                onClick={() => handleAction(`KPI ${kpi.label}`)}
                className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer min-w-0 text-center items-center"
              >
                <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight truncate block mb-1">
                  {kpi.label}
                </span>
                <span className={`text-base font-black leading-none ${kpi.tone === 'success' ? 'text-emerald-700' : kpi.tone === 'danger' ? 'text-rose-600' : kpi.tone === 'warning' ? 'text-amber-600' : 'text-slate-800'}`}>
                  {kpi.value}
                </span>
              </div>
            ))}
          </div>

          {/* 4. Secondary KPI Row (8 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2 min-w-0">
            {RELEASE_DATA.secondaryKpis.map((kpi, idx) => (
              <div
                key={idx}
                onClick={() => handleAction(`KPI ${kpi.label}`)}
                className="bg-white p-2 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer min-w-0 text-center items-center"
              >
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight truncate block mb-1">
                  {kpi.label}
                </span>
                <span className={`text-sm font-extrabold leading-none ${kpi.tone === 'success' ? 'text-emerald-700' : kpi.tone === 'danger' ? 'text-rose-600' : kpi.tone === 'warning' ? 'text-amber-600' : 'text-slate-800'}`}>
                  {kpi.value}
                </span>
              </div>
            ))}
          </div>

          {/* 5. Horizontal Tab Navigation Bar (16 Tabs) */}
          <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-1 text-xs whitespace-nowrap min-w-max">
              {RELEASE_DATA.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-burgundy text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Advanced Filter Area */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Component</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Component Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Release Status</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Readiness</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Approval Status</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1 text-[9.5px]">
                <span className="font-bold text-slate-400 mr-1 uppercase">Quick Filters:</span>
                {["Release Candidate", "Scheduled", "In Progress", "Released", "Production", "Blocked", "Pending Approval", "Dependency Block", "Migration Required", "Breaking Change", "Rollback Ready", "Environment Drift", "Support Expiring", "Needs Review"].map((f) => (
                  <button key={f} onClick={() => handleAction(`Quick Filter ${f}`)} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer">
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => handleAction("Apply Filters")} className="px-2.5 py-1 bg-burgundy hover:bg-burgundy-dark text-white font-semibold rounded text-[10.5px] cursor-pointer">Apply Filters</button>
                <button onClick={() => handleAction("Clear All")} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer">Clear All</button>
                <button onClick={() => handleAction("Save View")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Save size={10} /> Save View</button>
                <button onClick={() => handleAction("Refresh")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><RefreshCw size={10} /> Refresh</button>
                <button onClick={() => handleAction("Export")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Download size={10} /> Export</button>
              </div>
            </div>
          </div>

          {/* 7. MAIN SECTION 1: Registry Table + Selected Detail + Lifecycle Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Version & Release Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Version &amp; Release Registry ({RELEASE_DATA.registry.length})</h4>
                  <button onClick={() => handleAction("View full registry")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View full registry <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={RELEASE_DATA.registry} columns={registryCols} itemsPerPage={5} />
              </div>
            </div>

            {/* Selected Release Detail Card + Lifecycle Pipeline */}
            <div className="space-y-3">
              {/* Selected Release Detail Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Selected Release Detail</h4>
                  <span className="text-[10px] font-extrabold text-burgundy">{RELEASE_DATA.selectedReleaseDetail.component} v1.0.0</span>
                </div>

                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between text-slate-600"><span>Release Ref</span><span className="font-mono text-[10px] font-semibold text-slate-800">{RELEASE_DATA.selectedReleaseDetail.releaseRef}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Component</span><span className="font-semibold text-slate-800">{RELEASE_DATA.selectedReleaseDetail.component}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Target Environment</span><span className="font-semibold text-slate-800">{RELEASE_DATA.selectedReleaseDetail.targetEnvironment}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Current / Target Version</span><span className="font-mono text-[10px] text-slate-800">{RELEASE_DATA.selectedReleaseDetail.currentVersion} &rarr; {RELEASE_DATA.selectedReleaseDetail.targetVersion}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Release Status</span><span className="font-bold text-amber-700">{RELEASE_DATA.selectedReleaseDetail.releaseStatus}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Readiness</span><span className="font-extrabold text-emerald-700">{RELEASE_DATA.selectedReleaseDetail.readiness}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Risk Level</span><span className="font-bold text-amber-600">{RELEASE_DATA.selectedReleaseDetail.riskLevel}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Approval Status</span><span className="font-bold text-amber-700">{RELEASE_DATA.selectedReleaseDetail.approvalStatus}</span></div>
                </div>

                <button onClick={() => handleAction("View Full Detail")} className="w-full py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-burgundy font-bold text-xs rounded transition-colors cursor-pointer text-center">
                  View Full Detail
                </button>
              </div>

              {/* Release Lifecycle Pipeline */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Release Lifecycle Pipeline</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-8 gap-1 text-center text-[8.5px]">
                    {RELEASE_DATA.lifecyclePipeline.stages.map((stage, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className={`h-2 rounded-full ${idx <= RELEASE_DATA.lifecyclePipeline.currentStageIndex ? 'bg-burgundy' : 'bg-slate-200'}`} />
                        <span className={`block font-bold truncate ${idx === RELEASE_DATA.lifecyclePipeline.currentStageIndex ? 'text-burgundy' : 'text-slate-500'}`}>{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-around text-[9px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-burgundy block" /> Current Step</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block" /> Completed</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 block" /> Upcoming</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 8. MAIN SECTION 2: Environment Promotion Cards + Governance Gates */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Environment Promotion (5 Env Cards) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-3">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Environment Promotion</h4>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {RELEASE_DATA.environmentPromotion.map((promo, idx) => (
                  <div key={idx} className={`p-2.5 rounded-lg border flex flex-col justify-between ${promo.stateColor}`}>
                    <span className="text-[9.5px] font-bold uppercase block">{promo.env}</span>
                    <span className="font-mono text-sm font-extrabold block my-1">{promo.version}</span>
                    <span className="text-[9.5px] font-bold block">{promo.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Gates */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Governance Gates ({RELEASE_DATA.governanceGates.length})</h4>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {RELEASE_DATA.governanceGates.map((gate, idx) => (
                  <div key={idx} className="p-1.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 truncate pr-1">{gate.gate}</span>
                    <span className="text-emerald-700 font-bold shrink-0">{gate.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 9. MAIN SECTION 3: Env Version Matrix + Readiness Portfolio + Drift + Promotion Queue */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Environment Version Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Environment Version Matrix</h4>
              <div className="space-y-1.5 text-[10px]">
                {RELEASE_DATA.environmentMatrix.map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[110px]">{row.component}</span>
                    <span className="font-mono text-slate-500">{row.production}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Release Readiness Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Release Readiness Portfolio</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.readinessPortfolio.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{item.status}</span>
                    <span className="font-extrabold text-emerald-700">{item.readinessPct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environment Drift */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Environment Drift</h4>
              <div className="space-y-1 text-[10.5px]">
                {RELEASE_DATA.environmentDrift.map((d, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{d.env}</span>
                    <span className="font-bold text-rose-600">{d.components} Drift</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promotion Queue */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Promotion Queue ({RELEASE_DATA.promotionQueue.length})</h4>
              <AnalyticsTable data={RELEASE_DATA.promotionQueue} columns={promotionQueueCols} itemsPerPage={3} />
            </div>

          </div>

          {/* 10. MAIN SECTION 4: Release Calendar + Conflicts + Version Comparison + Migration Readiness */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Release Calendar Preview */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Release Calendar</h4>
              <div className="space-y-1.5 text-[10px]">
                {RELEASE_DATA.releaseCalendar.map((cal, idx) => (
                  <div key={idx} className="p-1 bg-slate-50 rounded border border-slate-100 flex justify-between">
                    <div><span className="font-bold text-slate-800 block">{cal.release}</span><span className="text-[9px] text-slate-400">{cal.date} ({cal.env})</span></div>
                    <span className="text-blue-700 font-bold">{cal.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Release Window Conflicts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Release Window Conflicts</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.windowConflicts.map((c, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{c.date}</span>
                    <span className="font-bold text-amber-600">{c.conflicts} Conflict</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Version Comparison */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Version Comparison</h4>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-1.5 bg-slate-50 rounded border border-slate-100"><span className="text-[9px] font-bold text-slate-400 block uppercase">Changes</span><span className="font-extrabold text-slate-800 text-sm">{RELEASE_DATA.versionComparison.changes}</span></div>
                <div className="p-1.5 bg-rose-50 rounded border border-rose-100"><span className="text-[9px] font-bold text-rose-800 block uppercase">Breaking</span><span className="font-extrabold text-rose-600 text-sm">{RELEASE_DATA.versionComparison.breakingChanges}</span></div>
                <div className="p-1.5 bg-amber-50 rounded border border-amber-100"><span className="text-[9px] font-bold text-amber-800 block uppercase">Deprecated</span><span className="font-extrabold text-amber-600 text-sm">{RELEASE_DATA.versionComparison.deprecatedFeatures}</span></div>
                <div className="p-1.5 bg-emerald-50 rounded border border-emerald-100"><span className="text-[9px] font-bold text-emerald-800 block uppercase">New Features</span><span className="font-extrabold text-emerald-700 text-sm">{RELEASE_DATA.versionComparison.newFeatures}</span></div>
              </div>
            </div>

            {/* Migration Readiness */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Migration Readiness</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.migrationReadiness.map((m, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{m.component}</span>
                    <span className="font-bold text-slate-900">{m.migrationStatus}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 11. MAIN SECTION 5: Rollback Readiness + Dependency Impact + Feature Flag Readiness + Regional */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Rollback Readiness */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Rollback Readiness</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.rollbackReadiness.map((r, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[90px]">{r.component}</span>
                    <span className={`font-bold ${r.status === 'Ready' ? 'text-emerald-700' : 'text-amber-600'}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency Impact */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Dependency Impact</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.dependencyImpact.map((d, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{d.impactLevel} Impact</span>
                    <span className="font-bold text-slate-900">{d.components} Modules</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Flag Readiness */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Feature Flag Readiness</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.featureFlagReadiness.map((ff, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[90px]">{ff.flag}</span>
                    <span className="font-extrabold text-emerald-700">{ff.readinessPct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant Impact */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Tenant Impact</h4>
              <div className="space-y-1.5 text-[10.5px]">
                <div className="flex justify-between text-slate-700"><span>SL Beauty</span><span className="font-bold text-emerald-700">Ready</span></div>
                <div className="flex justify-between text-slate-700"><span>Glam Retail</span><span className="font-bold text-emerald-700">Ready</span></div>
                <div className="flex justify-between text-slate-700"><span>Beauty Hub</span><span className="font-bold text-amber-600">Pending</span></div>
              </div>
            </div>

            {/* Regional Readiness */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Regional Readiness</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {RELEASE_DATA.regionalReadiness.map((reg, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{reg.region}</span>
                    <span className="font-bold text-emerald-700">{reg.health}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 12. MAIN SECTION 6: Post-Release Monitoring + Support Lifecycle + Activity Audit */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Post-Release Monitoring */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Post-Release Monitoring</h4>
              <div className="space-y-1 text-xs">
                {RELEASE_DATA.postReleaseMonitoring.map((mon, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{mon.component}</span>
                    <span className="font-bold text-emerald-700">{mon.health}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Lifecycle */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Support Lifecycle</h4>
              <div className="space-y-1 text-xs">
                {RELEASE_DATA.supportLifecycle.map((supp, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{supp.lifecycleStage}</span>
                    <span className="font-bold text-slate-900">{supp.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Release Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Release Activity</h4>
              <AnalyticsTable data={RELEASE_DATA.recentActivity} columns={activityCols} itemsPerPage={3} />
            </div>

          </div>

        </div>

        {/* 13. RIGHT-SIDE RELEASE HEALTH & ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Release Health Score */}
          <AnalyticsPanel number="" title="A. Release Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={RELEASE_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {RELEASE_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5">{RELEASE_DATA.rightPanel.overallHealthText}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Release Summary */}
          <AnalyticsPanel number="" title="B. Release Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Registered Versions</span><span className="font-bold text-slate-900">{RELEASE_DATA.rightPanel.releaseSummary.registeredVersions}</span></div>
              <div className="flex justify-between text-slate-600"><span>Release Candidates</span><span className="font-bold text-amber-600">{RELEASE_DATA.rightPanel.releaseSummary.releaseCandidates}</span></div>
              <div className="flex justify-between text-slate-600"><span>Scheduled Releases</span><span className="font-semibold text-slate-700">{RELEASE_DATA.rightPanel.releaseSummary.scheduledReleases}</span></div>
              <div className="flex justify-between text-slate-600"><span>In Progress Releases</span><span className="font-semibold text-slate-700">{RELEASE_DATA.rightPanel.releaseSummary.inProgressReleases}</span></div>
              <div className="flex justify-between text-slate-600"><span>Production Releases</span><span className="font-bold text-emerald-700">{RELEASE_DATA.rightPanel.releaseSummary.productionReleases}</span></div>
              <div className="flex justify-between text-slate-600"><span>Blocked Releases</span><span className="font-bold text-rose-600">{RELEASE_DATA.rightPanel.releaseSummary.blockedReleases}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Environment Summary */}
          <AnalyticsPanel number="" title="C. Environment Summary">
            <div className="space-y-1.5 text-xs">
              {RELEASE_DATA.rightPanel.environmentSummary.map((env, idx) => (
                <div key={idx} className="flex justify-between text-slate-600">
                  <span className="font-semibold">{env.env}</span>
                  <span className="text-emerald-700 font-extrabold">{env.status}</span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* D. Governance Summary */}
          <AnalyticsPanel number="" title="D. Governance Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Pending Approvals</span><span className="font-bold text-amber-600">{RELEASE_DATA.rightPanel.governanceSummary.pendingApprovals}</span></div>
              <div className="flex justify-between text-slate-600"><span>Dependency Blocks</span><span className="font-bold text-rose-600">{RELEASE_DATA.rightPanel.governanceSummary.dependencyBlocks}</span></div>
              <div className="flex justify-between text-slate-600"><span>Security Reviews</span><span className="font-semibold text-slate-700">{RELEASE_DATA.rightPanel.governanceSummary.securityReviews}</span></div>
              <div className="flex justify-between text-slate-600"><span>Compliance Reviews</span><span className="font-semibold text-slate-700">{RELEASE_DATA.rightPanel.governanceSummary.complianceReviews}</span></div>
              <div className="flex justify-between text-slate-600"><span>Migration Pending</span><span className="font-bold text-amber-600">{RELEASE_DATA.rightPanel.governanceSummary.migrationPending}</span></div>
              <div className="flex justify-between text-slate-600"><span>Rollback Warnings</span><span className="font-bold text-amber-600">{RELEASE_DATA.rightPanel.governanceSummary.rollbackWarnings}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="E. Quick Queues">
            <div className="space-y-1.5 text-xs">
              {RELEASE_DATA.rightPanel.quickQueues.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                    item.tone === 'danger' ? 'bg-rose-100 text-rose-700' :
                    item.tone === 'warning' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* F. Recommended Next Action Callout */}
          <div className="bg-rose-900 text-white border border-rose-950 rounded-lg p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-white">{RELEASE_DATA.rightPanel.recommendedNextAction.title}</h4>
              <button className="text-white/60 hover:text-white"><XCircle size={14} /></button>
            </div>
            <p className="text-[10.5px] text-rose-100 leading-snug mb-3">
              {RELEASE_DATA.rightPanel.recommendedNextAction.text}
            </p>
            <button
              onClick={() => handleAction("Review & Approve Now")}
              className="w-full py-1 bg-white hover:bg-slate-100 text-rose-950 text-xs font-extrabold rounded transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
            >
              {RELEASE_DATA.rightPanel.recommendedNextAction.buttonLabel}
            </button>
          </div>

          {/* G. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="G. Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Create Release Candidate")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                + Create Release Candidate
              </button>
              <button
                onClick={() => handleAction("Review Release Readiness")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Release Readiness
              </button>
              <button
                onClick={() => handleAction("Review Pending Approvals")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Pending Approvals
              </button>
              <button
                onClick={() => handleAction("Review Blocked Releases")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Blocked Releases
              </button>
              <button
                onClick={() => handleAction("Review Environment Drift")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Environment Drift
              </button>
              <button
                onClick={() => handleAction("Review Rollback Readiness")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Rollback Readiness
              </button>
              <button
                onClick={() => handleAction("Review Migration Readiness")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Migration Readiness
              </button>
              <button
                onClick={() => handleAction("Review Breaking Changes")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Breaking Changes
              </button>
              <button
                onClick={() => handleAction("Compare Environments")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Compare Environments
              </button>
              <button
                onClick={() => handleAction("View Release Calendar")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                View Release Calendar
              </button>
              <button
                onClick={() => handleAction("Export Release Registry")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Release Registry
              </button>
              <button
                onClick={() => handleAction("Open Release Audit")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Open Release Audit
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
