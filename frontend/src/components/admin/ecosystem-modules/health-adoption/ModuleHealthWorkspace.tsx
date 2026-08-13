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
import { MODULE_HEALTH_DATA, ModuleRegistryHealthItem, HealthScorecardItem, AvailabilitySlaItem, ErrorAnalysisItem, PerformanceLatencyItem, ThroughputCapacityItem, AdoptionPortfolioItem, AdoptionCohortItem, FeatureUtilizationItem, ScopeAdoptionItem, EnvironmentHealthItem, EnvironmentDriftItem, DependencyImpactItem, ReleaseImpactItem, RolloutImpactItem, IncidentPortfolioItem, UnderusedModuleItem, DormantModuleItem, ModuleBusinessValueItem, OwnershipAccountabilityItem, GovernanceGateItem, RecentHealthActivityItem } from "@/data/ecosystem-modules/moduleHealthData";

export function ModuleHealthWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Health Overview");

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const registryCols: ColumnDef<ModuleRegistryHealthItem>[] = [
    { header: "Module Code", accessorKey: "code", align: "left", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500">{row.code}</span> },
    { header: "Category", accessorKey: "category", align: "left", renderCell: (row) => <span className="text-[10px] text-slate-500">{row.category}</span> },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <StatusBadge status={row.status} /> },
    { header: "Health Score", accessorKey: "healthScore", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.healthScore}</span> },
    { header: "Availability", accessorKey: "availability", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.availability}</span> },
    { header: "Error Rate", accessorKey: "errorRate", align: "center", renderCell: (row) => <span className="font-semibold text-slate-700">{row.errorRate}</span> },
    { header: "Latency", accessorKey: "latency", align: "center", renderCell: (row) => <span className="font-mono text-[10px] text-slate-600">{row.latency}</span> },
    { header: "SLA Trend", accessorKey: "slaTrend", align: "center", renderCell: (row) => <span className={row.slaTrend === 'Critical' ? 'text-rose-600 font-bold' : row.slaTrend === 'At Risk' ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'}>{row.slaTrend}</span> },
    { header: "MAU", accessorKey: "mau", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.mau}</span> },
    { header: "Transactions", accessorKey: "transactions", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.transactions}</span> },
    { header: "Tenants", accessorKey: "tenantCount", align: "center" },
    { header: "Adoption Rate", accessorKey: "adoptionRate", align: "center", renderCell: (row) => <span className="font-extrabold text-emerald-700">{row.adoptionRate}</span> },
    { header: "Feature Util", accessorKey: "featureUtil", align: "center", renderCell: (row) => <span className="text-[10px] font-semibold text-slate-700">{row.featureUtil}</span> },
    { header: "Incidents", accessorKey: "incidents", align: "center", renderCell: (row) => <span className={row.incidents > 0 ? 'font-bold text-rose-600' : 'text-slate-500'}>{row.incidents}</span> },
    { header: "Dependency", accessorKey: "dependencyHealth", align: "center", renderCell: (row) => <span className={row.dependencyHealth === 'Healthy' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{row.dependencyHealth}</span> },
    { header: "Release", accessorKey: "releaseHealth", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.releaseHealth}</span> },
    { header: "Owner", accessorKey: "businessOwner", align: "left", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.businessOwner}</span> },
    { header: "Last Updated", accessorKey: "lastUpdated", align: "right", renderCell: (row) => <span className="text-slate-400 text-[9.5px]">{row.lastUpdated}</span> },
  ];

  const activityCols: ColumnDef<RecentHealthActivityItem>[] = [
    { header: "Time", accessorKey: "time", align: "left", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
    { header: "Activity", accessorKey: "activity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.activity}</span> },
    { header: "Details", accessorKey: "details", align: "left", renderCell: (row) => <span className="text-slate-600">{row.details}</span> },
    { header: "Severity", accessorKey: "severity", align: "center", renderCell: (row) => <span className={row.severity === 'Critical' ? 'text-rose-600 font-bold' : row.severity === 'Warning' ? 'text-amber-600 font-bold' : 'text-slate-600'}>{row.severity}</span> },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <StatusBadge status={row.status} /> },
    { header: "Owner", accessorKey: "owner", align: "right", renderCell: (row) => <span className="text-slate-500 text-[10px]">{row.owner}</span> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Health &amp; Adoption</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {MODULE_HEALTH_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {MODULE_HEALTH_DATA.headerInfo.description}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("Compare Modules")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Compare Modules
          </button>
          <button
            type="button"
            onClick={() => handleAction("View Incident Trends")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Incident Trends
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Health Report")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download size={12} /> Export Health Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Adoption Risks")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Adoption Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Module Health")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Module Health
          </button>
        </div>
      </div>

      {/* 2. Context Scope Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-17 gap-1.5 text-xs divide-x divide-slate-100 overflow-x-auto">
          <div className="pl-0"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Tenant</span><span className="font-bold text-slate-800 block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.tenant}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Ecosystem</span><span className="font-bold text-slate-800 block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.ecosystem}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Region</span><span className="font-bold text-slate-800 block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.region}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Environment</span><span className="font-bold text-slate-800 block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.environment}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Module Registry</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.moduleRegistry}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Telemetry Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.telemetrySource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Usage Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.usageSource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Assignment Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.assignmentSource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Feature-Flag Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.featureFlagSource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Release Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.releaseSource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Dependency Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.dependencySource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Incident Source</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.incidentSource}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Adoption Engine</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.adoptionEngine}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Matrix Governance</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.matrixGovernance}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Data Completeness</span><span className="font-bold text-slate-800 block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.dataCompleteness}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Last Refreshed</span><span className="font-semibold text-slate-600 block text-[9.5px]">{MODULE_HEALTH_DATA.contextBar.lastRefreshed}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Access</span><span className="font-bold text-slate-800 block text-[10.5px]">{MODULE_HEALTH_DATA.contextBar.access}</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 3. Primary KPI Row (10 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
            {MODULE_HEALTH_DATA.primaryKpis.map((kpi, idx) => (
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
            {MODULE_HEALTH_DATA.secondaryKpis.map((kpi, idx) => (
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

          {/* 5. Horizontal Tab Navigation Bar (17 Tabs) */}
          <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-1 text-xs whitespace-nowrap min-w-max">
              {MODULE_HEALTH_DATA.tabs.map((tab) => (
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
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Module</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Module Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Tenant</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Business Unit</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Channel</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1 text-[9.5px]">
                <span className="font-bold text-slate-400 mr-1 uppercase">Quick Filters:</span>
                {["Healthy", "Warning", "Critical", "High Availability", "SLA Warning", "Error Spike", "Latency Warning", "High Adoption", "Low Adoption", "Growing", "Declining", "Underused", "High Usage", "Incident Open", "Needs Review"].map((f) => (
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

          {/* 7. MAIN SECTION 1: Registry + Health Scorecard + Operational Health Trend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Module Health & Adoption Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Module Health &amp; Adoption Registry ({MODULE_HEALTH_DATA.registry.length})</h4>
                  <button onClick={() => handleAction("View full registry")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View full registry <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={MODULE_HEALTH_DATA.registry} columns={registryCols} itemsPerPage={5} />
              </div>
            </div>

            {/* Health Scorecard & Operational Health Trend */}
            <div className="space-y-3">
              {/* Health Scorecard */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Health Scorecard</h4>
                <div className="space-y-1 text-xs">
                  {MODULE_HEALTH_DATA.scorecard.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] border-b border-slate-50 pb-0.5">
                      <span className="font-semibold text-slate-700">{item.band}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{item.count}</span>
                        <span className="text-slate-400 text-[10px]">({item.percentage})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Health Trend (30 Days) */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Operational Health Trend (30 Days)</h4>
                <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-slate-100 text-xs text-slate-500 font-semibold">
                  [ 30-Day Multi-Series Trend: Health Score, Availability %, Error Rate % ]
                </div>
              </div>
            </div>

          </div>

          {/* 8. MAIN SECTION 2: Availability & SLA + Error + Latency + Throughput + Portfolio + Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Availability & SLA Analysis */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Availability &amp; SLA Analysis</h4>
              <div className="space-y-1.5 text-xs">
                {MODULE_HEALTH_DATA.availabilitySla.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[120px]">{item.module}</span>
                    <span className={`font-bold ${item.slaStatus === 'On Track' ? 'text-emerald-700' : 'text-amber-600'}`}>{item.slaPct} ({item.slaStatus})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Analysis */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Error Analysis</h4>
              <div className="space-y-1.5 text-xs">
                {MODULE_HEALTH_DATA.errorAnalysis.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[120px]">{item.module}</span>
                    <span className="font-bold text-slate-900">{item.errorRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance / Latency Analysis */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Performance / Latency Analysis</h4>
              <div className="space-y-1.5 text-xs">
                {MODULE_HEALTH_DATA.latencyAnalysis.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[120px]">{item.module}</span>
                    <span className="font-mono text-slate-800 font-bold">{item.avgLatency}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 9. MAIN SECTION 3: Throughput + Adoption Portfolio + Adoption Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Throughput / Capacity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Throughput / Capacity</h4>
              <div className="space-y-1.5 text-xs">
                {MODULE_HEALTH_DATA.throughputCapacity.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[120px]">{item.module}</span>
                    <span className="font-bold text-slate-900">{item.transactions} ({item.capacityUtil})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adoption Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Adoption Portfolio</h4>
              <div className="space-y-1.5 text-xs">
                {MODULE_HEALTH_DATA.adoptionPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[120px]">{item.module}</span>
                    <span className="font-extrabold text-emerald-700">{item.adoptionRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adoption Distribution */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Adoption Distribution</h4>
              <div className="space-y-1.5 text-[10px]">
                {MODULE_HEALTH_DATA.adoptionDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-slate-700 font-semibold">
                      <span>{item.module}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-burgundy h-1.5 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 10. MAIN SECTION 4: Cohorts + Utilization + Tenant + BU + Channel + Env Health */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            
            {/* Adoption Cohorts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Adoption Cohorts</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.adoptionCohorts.map((c, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{c.cohort}</span>
                    <span className="font-bold text-emerald-700">{c.avgAdoption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Utilization */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Feature Utilization</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.featureUtilization.map((f, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{f.module}</span>
                    <span className="font-bold text-slate-900">{f.utilization}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant Adoption */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Tenant Adoption</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.tenantAdoption.map((t, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{t.name}</span>
                    <span className="font-bold text-emerald-700">{t.avgAdoption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Unit Adoption */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Business Unit Adoption</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.buAdoption.map((b, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{b.name}</span>
                    <span className="font-bold text-emerald-700">{b.avgAdoption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Adoption */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Channel Adoption</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.channelAdoption.map((ch, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{ch.name}</span>
                    <span className="font-bold text-emerald-700">{ch.avgAdoption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environment Health */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Environment Health</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.environmentHealth.map((env, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{env.environment}</span>
                    <span className="font-bold text-emerald-700">{env.healthScore}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 11. MAIN SECTION 5: Underused + Dormant + Business Value + Matrix Heatmap + Ownership */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Underused Modules */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Underused Modules</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.underusedModules.map((u, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{u.module}</span>
                    <span className="font-bold text-rose-600">{u.adoptionRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dormant Modules */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Dormant Modules</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.dormantModules.map((d, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{d.module}</span>
                    <span className="font-bold text-amber-600">{d.lastActive}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Business Value (30 Days) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Module Business Value (30 Days)</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.moduleBusinessValue.map((bv, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{bv.module}</span>
                    <span className="font-bold text-emerald-700">{bv.valueScore}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Module Health Matrix Heatmap */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Enterprise Module Health Matrix</h4>
              <div className="grid grid-cols-5 gap-1 text-center text-[8.5px]">
                <div className="p-1 bg-emerald-100 text-emerald-800 font-bold rounded">Prod (2)</div>
                <div className="p-1 bg-emerald-100 text-emerald-800 font-bold rounded">Pilot (1)</div>
                <div className="p-1 bg-emerald-100 text-emerald-800 font-bold rounded">Staging (1)</div>
                <div className="p-1 bg-slate-100 text-slate-600 font-bold rounded">Test (0)</div>
                <div className="p-1 bg-slate-100 text-slate-600 font-bold rounded">Dev (0)</div>
              </div>
            </div>

            {/* Ownership & Accountability */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Ownership &amp; Accountability</h4>
              <div className="space-y-1 text-[10px]">
                {MODULE_HEALTH_DATA.ownershipAccountability.map((own, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{own.ownerType}</span>
                    <span className="font-bold text-slate-900">{own.pctOwnership}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 12. MAIN SECTION 6: Recent Activity + Governance Gates + Exception Center */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Recent Health & Adoption Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Health &amp; Adoption Activity</h4>
              <AnalyticsTable data={MODULE_HEALTH_DATA.recentActivity} columns={activityCols} itemsPerPage={3} />
            </div>

            {/* Governance Gates */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Governance Gates</h4>
              <div className="space-y-1.5 text-[10px]">
                {MODULE_HEALTH_DATA.governanceGates.map((gate, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{gate.gate}</span>
                    <span className="font-bold text-emerald-700">{gate.passRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exception Center */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Exception Center</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600"><span>Health Incidents</span><span className="font-bold text-rose-600">{MODULE_HEALTH_DATA.exceptionCenter.healthIncidents}</span></div>
                <div className="flex justify-between text-slate-600"><span>SLA Breaches</span><span className="font-bold text-amber-600">{MODULE_HEALTH_DATA.exceptionCenter.slaBreaches}</span></div>
                <div className="flex justify-between text-slate-600"><span>Perf Degradations</span><span className="font-bold text-amber-600">{MODULE_HEALTH_DATA.exceptionCenter.performanceDegradations}</span></div>
                <div className="flex justify-between text-slate-600"><span>Low Adoption Outliers</span><span className="font-bold text-slate-800">{MODULE_HEALTH_DATA.exceptionCenter.lowAdoptionOutliers}</span></div>
              </div>
            </div>

          </div>

        </div>

        {/* 13. RIGHT-SIDE MODULE HEALTH & ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Module Health Score */}
          <AnalyticsPanel number="" title="A. Module Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={MODULE_HEALTH_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {MODULE_HEALTH_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5">{MODULE_HEALTH_DATA.rightPanel.overallHealthText}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Operational Summary */}
          <AnalyticsPanel number="" title="B. Operational Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Operational</span><span className="font-bold text-emerald-700">{MODULE_HEALTH_DATA.rightPanel.operationalSummary.operational}</span></div>
              <div className="flex justify-between text-slate-600"><span>Degraded</span><span className="font-bold text-amber-600">{MODULE_HEALTH_DATA.rightPanel.operationalSummary.degraded}</span></div>
              <div className="flex justify-between text-slate-600"><span>Critical</span><span className="font-bold text-rose-600">{MODULE_HEALTH_DATA.rightPanel.operationalSummary.critical}</span></div>
              <div className="flex justify-between text-slate-600"><span>Open Incidents</span><span className="font-bold text-rose-600">{MODULE_HEALTH_DATA.rightPanel.operationalSummary.openIncidents}</span></div>
              <div className="flex justify-between text-slate-600"><span>SLA Warnings</span><span className="font-bold text-amber-600">{MODULE_HEALTH_DATA.rightPanel.operationalSummary.slaWarnings}</span></div>
              <div className="flex justify-between text-slate-600"><span>Performance Warnings</span><span className="font-bold text-amber-600">{MODULE_HEALTH_DATA.rightPanel.operationalSummary.performanceWarnings}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Adoption Summary */}
          <AnalyticsPanel number="" title="C. Adoption Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>High Adoption</span><span className="font-bold text-slate-900">{MODULE_HEALTH_DATA.rightPanel.adoptionSummary.highAdoption}</span></div>
              <div className="flex justify-between text-slate-600"><span>Healthy Adoption</span><span className="font-bold text-emerald-700">{MODULE_HEALTH_DATA.rightPanel.adoptionSummary.healthyAdoption}</span></div>
              <div className="flex justify-between text-slate-600"><span>Low Adoption</span><span className="font-bold text-amber-600">{MODULE_HEALTH_DATA.rightPanel.adoptionSummary.lowAdoption}</span></div>
              <div className="flex justify-between text-slate-600"><span>Dormant</span><span className="font-bold text-rose-600">{MODULE_HEALTH_DATA.rightPanel.adoptionSummary.dormant}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Quick Queues */}
          <AnalyticsPanel number="" title="D. Quick Queues">
            <div className="space-y-1.5 text-xs">
              {MODULE_HEALTH_DATA.rightPanel.quickQueues.map((item, idx) => (
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

          {/* E. Recommended Next Action Callout */}
          <div className="bg-rose-900 text-white border border-rose-950 rounded-lg p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-white">{MODULE_HEALTH_DATA.rightPanel.recommendedNextAction.title}</h4>
              <button className="text-white/60 hover:text-white"><XCircle size={14} /></button>
            </div>
            <p className="text-[10.5px] text-rose-100 leading-snug mb-2">
              {MODULE_HEALTH_DATA.rightPanel.recommendedNextAction.text}
            </p>
            <div className="text-[9.5px] text-rose-200 mb-3 flex justify-between">
              <span>Owner: {MODULE_HEALTH_DATA.rightPanel.recommendedNextAction.owner}</span>
              <span>Due: {MODULE_HEALTH_DATA.rightPanel.recommendedNextAction.dueDate}</span>
            </div>
            <button
              onClick={() => handleAction("Review Module Health")}
              className="w-full py-1 bg-white hover:bg-slate-100 text-rose-950 text-xs font-extrabold rounded transition-colors cursor-pointer text-center"
            >
              {MODULE_HEALTH_DATA.rightPanel.recommendedNextAction.buttonLabel}
            </button>
          </div>

          {/* F. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="F. Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Review Module Health")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Review Module Health
              </button>
              <button
                onClick={() => handleAction("Review Critical Modules")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Critical Modules
              </button>
              <button
                onClick={() => handleAction("Review Degraded Modules")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Degraded Modules
              </button>
              <button
                onClick={() => handleAction("Review Open Incidents")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Open Incidents
              </button>
              <button
                onClick={() => handleAction("Review SLA Warnings")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review SLA Warnings
              </button>
              <button
                onClick={() => handleAction("Review Performance Risks")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Performance Risks
              </button>
              <button
                onClick={() => handleAction("Review Low Adoption")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Low Adoption
              </button>
              <button
                onClick={() => handleAction("Review Dormant Modules")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Dormant Modules
              </button>
              <button
                onClick={() => handleAction("Compare Modules")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Compare Modules
              </button>
              <button
                onClick={() => handleAction("Export Health Report")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Health Report
              </button>
              <button
                onClick={() => handleAction("Open Module Health Audit")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Open Module Health Audit
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
