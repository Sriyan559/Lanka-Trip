"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, GitCommit, Search, Filter, Save, 
  Download, DownloadCloud, AlertTriangle, Play, FileText, Check, ShieldAlert, 
  Zap, Globe, Package, Link as LinkIcon, Settings, Grid, Users, Layers, 
  ArrowRight, ShieldCheck, CheckSquare, XCircle, AlertCircle, TrendingUp, 
  Activity, ArrowLeft, Info, Eye, Shield, Lock, FileCode, ExternalLink,
  RefreshCw, GitPullRequest, Sliders, Pause, RotateCcw, ArrowUpRight, AlertOctagon
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { FEATURE_FLAG_DATA, FeatureFlagRegistryItem, RolloutPortfolioItem, AudienceRuleItem, AudienceConflictItem, PercentageRolloutItem, ModuleFlagCoverageItem, EnvironmentMatrixItem, EnvironmentDriftItem, RegionalExposureItem, DependencyConditionItem, ReleaseCompatibilityItem, GovernanceGateItem, ApprovalQueueItem, PausedRolloutItem, RollbackHistoryItem, EmergencyControlItem, FlagActivityItem } from "@/data/ecosystem-modules/featureFlagData";

export function FeatureFlagWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Rollout Overview");

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const registryCols: ColumnDef<FeatureFlagRegistryItem>[] = [
    { header: "Flag Ref", accessorKey: "ref", align: "left", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500">{row.ref}</span> },
    { header: "Flag Name", accessorKey: "name", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.name}</span> },
    { header: "Flag Key", accessorKey: "key", align: "left", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-600">{row.key}</span> },
    { header: "Module", accessorKey: "module", align: "left" },
    { header: "Capability", accessorKey: "capability", align: "left" },
    { header: "Environment", accessorKey: "environment", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600 font-medium">{row.environment}</span> },
    { header: "Strategy", accessorKey: "strategy", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600 font-medium">{row.strategy}</span> },
    { header: "Current %", accessorKey: "currentPct", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.currentPct}</span> },
    { header: "Target %", accessorKey: "targetPct", align: "center", renderCell: (row) => <span className="text-slate-500 font-medium">{row.targetPct}</span> },
    { header: "Audience", accessorKey: "audience", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.audience}</span> },
    { header: "Rollout State", accessorKey: "rolloutState", align: "center", renderCell: (row) => <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9.5px] font-bold rounded">{row.rolloutState}</span> },
    { header: "Health", accessorKey: "health", align: "center", renderCell: (row) => <span className="text-emerald-600 font-bold">{row.health}</span> },
    { header: "Risk", accessorKey: "risk", align: "center", renderCell: (row) => <span className={row.risk === 'High' ? 'text-rose-600 font-bold' : row.risk === 'Medium' ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'}>{row.risk}</span> },
    { header: "Actions", accessorKey: "action", align: "right", renderCell: (row) => (
      <button onClick={() => handleAction(`View ${row.name}`)} className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-50 text-burgundy text-[10px] font-semibold rounded cursor-pointer">
        View
      </button>
    )},
  ];

  const percentageRolloutCols: ColumnDef<PercentageRolloutItem>[] = [
    { header: "Flag Name", accessorKey: "name", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.name}</span> },
    { header: "Current %", accessorKey: "currentPct", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.currentPct}</span> },
    { header: "Target %", accessorKey: "targetPct", align: "center" },
    { header: "Exposed Users", accessorKey: "exposedUsers", align: "center", renderCell: (row) => <span className="font-bold text-slate-900">{row.exposedUsers}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const approvalCols: ColumnDef<ApprovalQueueItem>[] = [
    { header: "Flag Name", accessorKey: "flagName", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.flagName}</span> },
    { header: "Type", accessorKey: "type", align: "center" },
    { header: "Submitted", accessorKey: "submitted", align: "center", renderCell: (row) => <span className="text-slate-500 text-[10px]">{row.submitted}</span> },
    { header: "Owner", accessorKey: "owner", align: "center" },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9.5px] font-bold rounded-full">{row.status}</span> },
  ];

  const pausedCols: ColumnDef<PausedRolloutItem>[] = [
    { header: "Flag Name", accessorKey: "flagName", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.flagName}</span> },
    { header: "Paused Since", accessorKey: "pausedSince", align: "center", renderCell: (row) => <span className="text-slate-500 text-[10px]">{row.pausedSince}</span> },
    { header: "Reason", accessorKey: "reason", align: "left", renderCell: (row) => <span className="text-rose-600 font-semibold">{row.reason}</span> },
    { header: "Owner", accessorKey: "owner", align: "right" },
  ];

  const rollbackHistoryCols: ColumnDef<RollbackHistoryItem>[] = [
    { header: "Event", accessorKey: "event", align: "left", renderCell: (row) => <span className="font-semibold text-rose-700">{row.event}</span> },
    { header: "Flag", accessorKey: "flag", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.flag}</span> },
    { header: "Time", accessorKey: "time", align: "center", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
    { header: "Reason", accessorKey: "reason", align: "left" },
    { header: "Initiated By", accessorKey: "initiatedBy", align: "center" },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <span className="text-emerald-700 font-bold">{row.status}</span> },
  ];

  const activityCols: ColumnDef<FlagActivityItem>[] = [
    { header: "Activity", accessorKey: "activity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.activity}</span> },
    { header: "Flag", accessorKey: "flag", align: "left", renderCell: (row) => <span className="text-slate-600">{row.flag}</span> },
    { header: "User", accessorKey: "user", align: "center" },
    { header: "Time", accessorKey: "time", align: "center", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <span className="text-emerald-700 font-bold">{row.status}</span> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Feature Flags</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {FEATURE_FLAG_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {FEATURE_FLAG_DATA.headerInfo.description}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("Review Active Rollouts")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Active Rollouts
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
            onClick={() => handleAction("Create Feature Flag")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create Feature Flag
          </button>
        </div>
      </div>

      {/* 2. Context Scope Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-11 gap-2 text-xs divide-x divide-slate-100">
          <div className="pl-0"><span className="text-[9px] font-bold text-slate-400 uppercase block">Tenant</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.tenant}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Ecosystem</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.ecosystem}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Scope</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.scope}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Region</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.region}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.environment}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Registry</span><span className="text-emerald-700 font-extrabold block text-[11px]">{FEATURE_FLAG_DATA.contextBar.registry}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Dependencies</span><span className="text-emerald-700 font-extrabold block text-[11px]">{FEATURE_FLAG_DATA.contextBar.dependencies}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Governance</span><span className="text-emerald-700 font-extrabold block text-[11px]">{FEATURE_FLAG_DATA.contextBar.governance}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Data Completeness</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.dataCompleteness}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Last Refreshed</span><span className="font-semibold text-slate-600 block text-[10px]">{FEATURE_FLAG_DATA.contextBar.lastRefreshed}</span></div>
          <div className="px-2"><span className="text-[9px] font-bold text-slate-400 uppercase block">Access</span><span className="font-bold text-slate-800 block text-[11px]">{FEATURE_FLAG_DATA.contextBar.access}</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 3. Primary KPI Row (10 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
            {FEATURE_FLAG_DATA.primaryKpis.map((kpi, idx) => (
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
            {FEATURE_FLAG_DATA.secondaryKpis.map((kpi, idx) => (
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

          {/* 5. Horizontal Tab Navigation Bar (15 Tabs) */}
          <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-1 text-xs whitespace-nowrap min-w-max">
              {FEATURE_FLAG_DATA.tabs.map((tab) => (
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
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Feature Flag</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Flag Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Module</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Capability</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Rollout Strategy</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1 text-[9.5px]">
                <span className="font-bold text-slate-400 mr-1 uppercase">Quick Filters:</span>
                {["Critical", "Disabled", "Pilot", "Scheduled", "Paused", "Percentage Rollout", "Audience Rollout", "Production", "High Risk", "Rollback Ready", "Governance Pending", "Dependency Warning", "Emergency Override", "Expiring Soon", "Needs Review"].map((f) => (
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

          {/* 7. MAIN SECTION 1: Registry + Pipeline + Selected Detail Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Feature Flag Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Feature Flag Registry ({FEATURE_FLAG_DATA.registry.length})</h4>
                  <button onClick={() => handleAction("View all flags")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all flags <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={FEATURE_FLAG_DATA.registry} columns={registryCols} itemsPerPage={6} />
              </div>
            </div>

            {/* Rollout Pipeline & Selected Flag Detail Card */}
            <div className="space-y-3">
              {/* Rollout Pipeline */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Rollout Pipeline</h4>
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] py-1 bg-slate-50 rounded border border-slate-100 mb-2">
                  {FEATURE_FLAG_DATA.rolloutPipeline.stages.map((stage, idx) => (
                    <div key={idx}>
                      <span className="block text-slate-400 font-bold uppercase truncate">{stage.name}</span>
                      <span className="font-extrabold text-slate-800 text-xs block mt-0.5">{stage.count}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-around text-[9px] bg-rose-50/50 p-1.5 rounded border border-rose-100 text-rose-800 font-semibold">
                  <span>Exception States:</span>
                  <span className="font-bold text-rose-700">Pause ({FEATURE_FLAG_DATA.rolloutPipeline.exceptionStates[0].count})</span>
                  <span className="font-bold text-rose-700">Rollback ({FEATURE_FLAG_DATA.rolloutPipeline.exceptionStates[1].count})</span>
                </div>
              </div>

              {/* Selected Flag Detail Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Selected Flag Detail</h4>
                  <span className="text-[10px] font-extrabold text-burgundy">{FEATURE_FLAG_DATA.selectedFlagDetail.flagName}</span>
                </div>

                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between text-slate-600"><span>Environment Scope</span><span className="font-semibold text-slate-800">{FEATURE_FLAG_DATA.selectedFlagDetail.environmentScope}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Flag State</span><span className="font-bold text-blue-700">{FEATURE_FLAG_DATA.selectedFlagDetail.flagState}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Rollout Strategy</span><span className="font-semibold text-slate-800">{FEATURE_FLAG_DATA.selectedFlagDetail.rolloutStrategy}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Current Rollout %</span><span className="font-extrabold text-emerald-700">{FEATURE_FLAG_DATA.selectedFlagDetail.currentRollout}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Target Rollout %</span><span className="font-bold text-slate-800">{FEATURE_FLAG_DATA.selectedFlagDetail.targetRollout}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Audience Scope</span><span className="font-semibold text-slate-800">{FEATURE_FLAG_DATA.selectedFlagDetail.audienceScope}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Health</span><span className="font-bold text-emerald-700">{FEATURE_FLAG_DATA.selectedFlagDetail.health}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Risk Level</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.selectedFlagDetail.riskLevel}</span></div>
                </div>

                {/* Metric Deltas Box */}
                <div className="grid grid-cols-4 gap-1 text-center bg-slate-50 p-1.5 rounded border border-slate-100 text-[9px]">
                  <div><span className="text-slate-400 font-bold block">Error Rate</span><span className="font-bold text-emerald-600">{FEATURE_FLAG_DATA.selectedFlagDetail.metrics.errorRateDelta}</span></div>
                  <div><span className="text-slate-400 font-bold block">P95 Latency</span><span className="font-bold text-emerald-600">{FEATURE_FLAG_DATA.selectedFlagDetail.metrics.latencyP95Delta}</span></div>
                  <div><span className="text-slate-400 font-bold block">Conversion</span><span className="font-bold text-emerald-600">{FEATURE_FLAG_DATA.selectedFlagDetail.metrics.conversionLift}</span></div>
                  <div><span className="text-slate-400 font-bold block">Support</span><span className="font-semibold text-slate-700">{FEATURE_FLAG_DATA.selectedFlagDetail.metrics.supportImpact}</span></div>
                </div>
              </div>
            </div>

          </div>

          {/* 8. MAIN SECTION 2: Active Rollout Portfolio + Stages + Audience Rules + Audience Conflicts */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Active Rollout Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Active Rollout Portfolio</h4>
              <div className="space-y-2 text-xs">
                {FEATURE_FLAG_DATA.activeRollouts.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="font-semibold text-slate-800 truncate max-w-[120px]">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-emerald-700">{item.currentPct}</span>
                      <span className="text-[10px] text-slate-400">&rarr; {item.targetPct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progressive Rollout Stages */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Progressive Rollout Stages</h4>
              <div className="space-y-2 text-[10px]">
                {FEATURE_FLAG_DATA.progressiveRolloutStages.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-slate-700 font-semibold">
                      <span className="truncate max-w-[120px]">{item.name}</span>
                      <span className="text-slate-400 text-[9px]">Step {item.currentStep} of 5</span>
                    </div>
                    {/* Visual Step Progress Bar */}
                    <div className="grid grid-cols-5 gap-1">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} className={`h-1.5 rounded-full ${step <= item.currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Targeting & Rules */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Audience Targeting &amp; Rules</h4>
              <div className="space-y-1.5 text-xs">
                {FEATURE_FLAG_DATA.audienceRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800">{rule.name}</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold text-[9.5px] ${rule.rule === 'Inclusion' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {rule.rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Conflicts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Audience Conflicts</h4>
              <div className="space-y-2 text-xs">
                {FEATURE_FLAG_DATA.audienceConflicts.map((c, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <div>
                      <span className="font-semibold text-slate-800 block text-[11px]">{c.type}</span>
                      <span className="text-[9.5px] text-slate-400">Impact: {c.exposureImpact}</span>
                    </div>
                    <span className={`font-bold text-[10px] ${c.severity === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>
                      {c.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 9. MAIN SECTION 3: Percentage Rollouts + Guardrails + Coverage + Env Matrix + Drift */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Percentage Rollouts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Percentage Rollouts</h4>
              <AnalyticsTable data={FEATURE_FLAG_DATA.percentageRollouts} columns={percentageRolloutCols} itemsPerPage={4} />
            </div>

            {/* Rollout Health & Guardrails */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Rollout Health &amp; Guardrails</h4>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                    <span className="text-[9px] font-bold text-emerald-800 block uppercase">Error Rate</span>
                    <span className="font-black text-emerald-700 text-sm">{FEATURE_FLAG_DATA.rolloutGuardrails.errorRate}</span>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                    <span className="text-[9px] font-bold text-emerald-800 block uppercase">P95 Latency</span>
                    <span className="font-black text-emerald-700 text-sm">{FEATURE_FLAG_DATA.rolloutGuardrails.p95Latency}</span>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                    <span className="text-[9px] font-bold text-emerald-800 block uppercase">Conversion Lift</span>
                    <span className="font-black text-emerald-700 text-sm">{FEATURE_FLAG_DATA.rolloutGuardrails.conversionLift}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Support Impact</span>
                    <span className="font-extrabold text-slate-800 text-sm">{FEATURE_FLAG_DATA.rolloutGuardrails.supportImpact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Module / Capability Flag Coverage */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Module / Capability Flag Coverage</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {FEATURE_FLAG_DATA.moduleFlagCoverage.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="font-medium truncate max-w-[90px]">{m.module}</span>
                    <span className="font-bold text-slate-900">{m.activeFlags} Flags ({m.coverage})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environment Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Environment Matrix</h4>
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px]">
                    <th>Env</th>
                    <th className="text-center">Active</th>
                    <th className="text-right">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {FEATURE_FLAG_DATA.environmentMatrix.map((env, idx) => (
                    <tr key={idx}>
                      <td className="py-1 font-semibold text-slate-800">{env.environment}</td>
                      <td className="py-1 text-center font-bold text-slate-800">{env.active}</td>
                      <td className="py-1 text-right font-bold text-emerald-700">{env.health}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Environment Drift */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Environment Drift</h4>
              <div className="space-y-1.5 text-[10.5px]">
                {FEATURE_FLAG_DATA.environmentDrift.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{d.drift}</span>
                    <span className="font-bold text-rose-600">{d.count} items</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 10. MAIN SECTION 4: Regional Exposures + Dependency Conditions + Release Compatibility */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Business Unit / Channel Exposure */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Business Unit / Channel Exposure</h4>
              <div className="space-y-1 text-[10px]">
                {FEATURE_FLAG_DATA.buChannelExposure.map((exp, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{exp.name}</span>
                    <span className="font-bold text-emerald-700">{exp.exposurePct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant Exposure */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Tenant Exposure</h4>
              <div className="space-y-1 text-[10px]">
                {FEATURE_FLAG_DATA.tenantExposure.map((t, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{t.name}</span>
                    <span className="font-bold text-emerald-700">{t.exposurePct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Country Exposure */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Country Exposure</h4>
              <div className="space-y-1 text-[10px]">
                {FEATURE_FLAG_DATA.countryExposure.map((c, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{c.name}</span>
                    <span className="font-bold text-emerald-700">{c.exposurePct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency Conditions */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Dependency Conditions</h4>
              <div className="space-y-1 text-[10px]">
                {FEATURE_FLAG_DATA.dependencyConditions.map((dep, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[90px]">{dep.dependency}</span>
                    <span className={`font-bold ${dep.status === 'Passed' ? 'text-emerald-700' : 'text-amber-600'}`}>{dep.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Release Compatibility */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Release Compatibility</h4>
              <div className="space-y-1 text-[10px]">
                {FEATURE_FLAG_DATA.releaseCompatibility.map((rel, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[90px]">{rel.release}</span>
                    <span className={`font-bold ${rel.status === 'Compatible' ? 'text-emerald-700' : rel.status === 'Warning' ? 'text-amber-600' : 'text-rose-600'}`}>{rel.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 11. MAIN SECTION 5: Governance Gates + Approval Queue + Paused + Rollback Readiness + Emergency Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Governance Gates */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Governance Gates ({FEATURE_FLAG_DATA.governanceGates.length})</h4>
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                {FEATURE_FLAG_DATA.governanceGates.map((gate, idx) => (
                  <div key={idx} className="p-1.5 bg-slate-50 rounded border border-slate-100">
                    <CheckCircle size={12} className="text-emerald-600 mx-auto mb-0.5" />
                    <span className="text-[8.5px] font-bold text-slate-700 block truncate">{gate.gate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Queue */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Approval Queue ({FEATURE_FLAG_DATA.approvalQueue.length})</h4>
              <AnalyticsTable data={FEATURE_FLAG_DATA.approvalQueue} columns={approvalCols} itemsPerPage={3} />
            </div>

            {/* Paused Rollouts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Paused Rollouts ({FEATURE_FLAG_DATA.pausedRollouts.length})</h4>
              <AnalyticsTable data={FEATURE_FLAG_DATA.pausedRollouts} columns={pausedCols} itemsPerPage={3} />
            </div>

          </div>

          {/* 12. MAIN SECTION 6: Rollback Readiness + History + Emergency Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Rollback Readiness */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Rollback Readiness</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2">
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                    <span className="text-[9px] font-bold text-emerald-800 block uppercase">Ready</span>
                    <span className="text-lg font-black text-emerald-700">{FEATURE_FLAG_DATA.rollbackReadiness.ready}</span>
                  </div>
                  <div className="p-2 bg-amber-50 rounded border border-amber-100">
                    <span className="text-[9px] font-bold text-amber-800 block uppercase">Warning</span>
                    <span className="text-lg font-black text-amber-600">{FEATURE_FLAG_DATA.rollbackReadiness.warning}</span>
                  </div>
                  <div className="p-2 bg-rose-50 rounded border border-rose-100">
                    <span className="text-[9px] font-bold text-rose-800 block uppercase">Not Ready</span>
                    <span className="text-lg font-black text-rose-600">{FEATURE_FLAG_DATA.rollbackReadiness.notReady}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rollback History */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Rollback History</h4>
              <AnalyticsTable data={FEATURE_FLAG_DATA.rollbackHistory} columns={rollbackHistoryCols} itemsPerPage={3} />
            </div>

            {/* Emergency Controls */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Emergency Controls</h4>
              <div className="space-y-1.5">
                {FEATURE_FLAG_DATA.emergencyControls.map((ctrl, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-rose-50/50 rounded border border-rose-100">
                    <span className="font-semibold text-slate-800">{ctrl.control}</span>
                    <button onClick={() => handleAction(`Trigger ${ctrl.control}`)} className="px-2 py-0.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-[9.5px] rounded cursor-pointer">
                      {ctrl.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 13. MAIN SECTION 7: Expiring & Stale Flags + Health Matrix + Exception Center + Activity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Expiring & Stale Flags */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Expiring &amp; Stale Flags</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600"><span>Expiring Soon</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.expiringFlags.expiringSoon}</span></div>
                <div className="flex justify-between text-slate-600"><span>Stale (1-30 days)</span><span className="font-bold text-slate-800">{FEATURE_FLAG_DATA.expiringFlags.stale1to30}</span></div>
                <div className="flex justify-between text-slate-600"><span>Stale (30+ days)</span><span className="font-bold text-rose-600">{FEATURE_FLAG_DATA.expiringFlags.stale30Plus}</span></div>
              </div>
            </div>

            {/* Feature Flag Health Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Feature Flag Health Matrix</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600"><span>Healthy Flags</span><span className="font-bold text-emerald-700">{FEATURE_FLAG_DATA.healthMatrix.healthy}</span></div>
                <div className="flex justify-between text-slate-600"><span>Warning Flags</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.healthMatrix.warning}</span></div>
                <div className="flex justify-between text-slate-600"><span>Critical Flags</span><span className="font-bold text-rose-600">{FEATURE_FLAG_DATA.healthMatrix.critical}</span></div>
              </div>
            </div>

            {/* Exception Center */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Exception Center</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600"><span>Total Exceptions</span><span className="font-bold text-slate-900">{FEATURE_FLAG_DATA.exceptionCenter.totalExceptions}</span></div>
                <div className="flex justify-between text-slate-600"><span>Critical</span><span className="font-bold text-rose-600">{FEATURE_FLAG_DATA.exceptionCenter.critical}</span></div>
                <div className="flex justify-between text-slate-600"><span>High</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.exceptionCenter.high}</span></div>
              </div>
            </div>

            {/* Recent Flag Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Flag Activity</h4>
              <AnalyticsTable data={FEATURE_FLAG_DATA.recentActivity} columns={activityCols} itemsPerPage={3} />
            </div>

          </div>

        </div>

        {/* 14. RIGHT-SIDE MONITORING & ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Rollout Health Score */}
          <AnalyticsPanel number="" title="A. Rollout Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={FEATURE_FLAG_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {FEATURE_FLAG_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5">{FEATURE_FLAG_DATA.rightPanel.overallHealthText}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Feature Flag Summary */}
          <AnalyticsPanel number="" title="B. Feature Flag Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Registered</span><span className="font-bold text-slate-900">{FEATURE_FLAG_DATA.rightPanel.flagSummary.registered}</span></div>
              <div className="flex justify-between text-slate-600"><span>Active</span><span className="font-bold text-emerald-700">{FEATURE_FLAG_DATA.rightPanel.flagSummary.active}</span></div>
              <div className="flex justify-between text-slate-600"><span>Production</span><span className="font-bold text-slate-900">{FEATURE_FLAG_DATA.rightPanel.flagSummary.production}</span></div>
              <div className="flex justify-between text-slate-600"><span>Pilot</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.rightPanel.flagSummary.pilot}</span></div>
              <div className="flex justify-between text-slate-600"><span>Scheduled</span><span className="font-semibold text-slate-700">{FEATURE_FLAG_DATA.rightPanel.flagSummary.scheduled}</span></div>
              <div className="flex justify-between text-slate-600"><span>Paused</span><span className="font-bold text-rose-600">{FEATURE_FLAG_DATA.rightPanel.flagSummary.paused}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Exposure Overview */}
          <AnalyticsPanel number="" title="C. Exposure Overview">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Active Rollouts</span><span className="font-bold text-slate-900">{FEATURE_FLAG_DATA.rightPanel.exposureOverview.activeRollouts}</span></div>
              <div className="flex justify-between text-slate-600"><span>Percentage Rollouts</span><span className="font-bold text-slate-900">{FEATURE_FLAG_DATA.rightPanel.exposureOverview.percentageRollouts}</span></div>
              <div className="flex justify-between text-slate-600"><span>Audience Rollouts</span><span className="font-bold text-slate-900">{FEATURE_FLAG_DATA.rightPanel.exposureOverview.audienceRollouts}</span></div>
              <div className="flex justify-between text-slate-600"><span>Production Exposure</span><span className="font-extrabold text-emerald-700">{FEATURE_FLAG_DATA.rightPanel.exposureOverview.productionExposure}</span></div>
              <div className="flex justify-between text-slate-600"><span>Pilot Exposure</span><span className="font-bold text-slate-800">{FEATURE_FLAG_DATA.rightPanel.exposureOverview.pilotExposure}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Governance Summary */}
          <AnalyticsPanel number="" title="D. Governance Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Pending Approvals</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.rightPanel.governanceSummary.pendingApprovals}</span></div>
              <div className="flex justify-between text-slate-600"><span>High-Risk Flags</span><span className="font-bold text-rose-600">{FEATURE_FLAG_DATA.rightPanel.governanceSummary.highRiskFlags}</span></div>
              <div className="flex justify-between text-slate-600"><span>Dependency Warnings</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.rightPanel.governanceSummary.dependencyWarnings}</span></div>
              <div className="flex justify-between text-slate-600"><span>Compliance Warnings</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.rightPanel.governanceSummary.complianceWarnings}</span></div>
              <div className="flex justify-between text-slate-600"><span>Emergency Overrides</span><span className="font-bold text-rose-600">{FEATURE_FLAG_DATA.rightPanel.governanceSummary.emergencyOverrides}</span></div>
              <div className="flex justify-between text-slate-600"><span>Exceptions</span><span className="font-bold text-amber-600">{FEATURE_FLAG_DATA.rightPanel.governanceSummary.exceptions}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="E. Quick Queues">
            <div className="space-y-1.5 text-xs">
              {FEATURE_FLAG_DATA.rightPanel.quickQueues.map((item, idx) => (
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
              <h4 className="text-xs font-bold text-white">{FEATURE_FLAG_DATA.rightPanel.recommendedNextAction.title}</h4>
              <button className="text-white/60 hover:text-white"><XCircle size={14} /></button>
            </div>
            <p className="text-[10.5px] text-rose-100 leading-snug mb-3">
              {FEATURE_FLAG_DATA.rightPanel.recommendedNextAction.text}
            </p>
            <button
              onClick={() => handleAction("Review Approvals")}
              className="w-full py-1 bg-white hover:bg-slate-100 text-rose-950 text-xs font-extrabold rounded transition-colors cursor-pointer text-center"
            >
              {FEATURE_FLAG_DATA.rightPanel.recommendedNextAction.buttonLabel}
            </button>
          </div>

          {/* G. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="G. Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Create Feature Flag")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                + Create Feature Flag
              </button>
              <button
                onClick={() => handleAction("Review Active Rollouts")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Active Rollouts
              </button>
              <button
                onClick={() => handleAction("Review Pending Approvals")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Pending Approvals
              </button>
              <button
                onClick={() => handleAction("Review High-Risk Flags")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review High-Risk Flags
              </button>
              <button
                onClick={() => handleAction("Review Rollback Readiness")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Rollback Readiness
              </button>
              <button
                onClick={() => handleAction("Review Emergency Overrides")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Emergency Overrides
              </button>
              <button
                onClick={() => handleAction("Review Expiring Flags")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Expiring Flags
              </button>
              <button
                onClick={() => handleAction("Compare Environments")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Compare Environments
              </button>
              <button
                onClick={() => handleAction("Export Feature Flags")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Feature Flags
              </button>
              <button
                onClick={() => handleAction("Open Feature Flag Audit")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Open Feature Flag Audit
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
