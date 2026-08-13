"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, Search, Filter, Save, 
  Download, DownloadCloud, AlertTriangle, Play, FileText, Check, ShieldAlert, 
  Zap, Globe, Package, Link as LinkIcon, Settings, Grid, Users, Layers, 
  ArrowRight, ShieldCheck, CheckSquare, XCircle, AlertCircle, TrendingUp, 
  Activity, ArrowLeft, Info, Eye, Shield, Lock, FileCode, ExternalLink,
  RefreshCw, GitPullRequest, Sliders, Pause, RotateCcw, ArrowUpRight, Calendar, Server, Key
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { REPORTS_AUDIT_DATA, AuditRegistryItem, ConfigHistoryItem, AssignmentHistoryItem, ReleaseHistoryItem, FeatureFlagHistoryItem, IntegrationHistoryItem, GovernanceAccessHistoryItem, SecurityEventItem, ReportItem, ScheduledReportItem, ExportJobItem, FailedExportItem, EvidencePackageItem, RecentAuditActivityItem } from "@/data/ecosystem-modules/reportsAuditData";

export function ReportsAuditWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Audit Overview");

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const auditCols: ColumnDef<AuditRegistryItem>[] = [
    { header: "Audit Ref", accessorKey: "auditRef", align: "left", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500 font-bold">{row.auditRef}</span> },
    { header: "Timestamp", accessorKey: "timestamp", align: "left", renderCell: (row) => <span className="text-slate-400 text-[9.5px]">{row.timestamp}</span> },
    { header: "Event Type", accessorKey: "eventType", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.eventType}</span> },
    { header: "Entity Type", accessorKey: "entityType", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.entityType}</span> },
    { header: "Entity ID", accessorKey: "entityId", align: "center", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500">{row.entityId}</span> },
    { header: "Module", accessorKey: "module", align: "left" },
    { header: "Actor", accessorKey: "actor", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.actor}</span> },
    { header: "Actor Type", accessorKey: "actorType", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.actorType}</span> },
    { header: "Env", accessorKey: "environment", align: "center", renderCell: (row) => <span className="text-[9.5px] text-slate-500">{row.environment}</span> },
    { header: "Change Type", accessorKey: "changeType", align: "center", renderCell: (row) => <span className="text-[10px] font-medium text-slate-700">{row.changeType}</span> },
    { header: "Previous", accessorKey: "previous", align: "center", renderCell: (row) => <span className="text-slate-400">{row.previous}</span> },
    { header: "New", accessorKey: "new", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.new}</span> },
    { header: "Risk", accessorKey: "risk", align: "center", renderCell: (row) => <span className={row.risk === 'High' ? 'text-rose-600 font-bold' : row.risk === 'Medium' ? 'text-amber-600 font-bold' : 'text-slate-600'}>{row.risk}</span> },
    { header: "Result", accessorKey: "result", align: "center", renderCell: (row) => <span className={row.result === 'Success' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{row.result}</span> },
    { header: "Correlation Ref", accessorKey: "correlationRef", align: "center", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500">{row.correlationRef}</span> },
  ];

  const recentActivityCols: ColumnDef<RecentAuditActivityItem>[] = [
    { header: "Timestamp", accessorKey: "timestamp", align: "left", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.timestamp}</span> },
    { header: "Audit Ref", accessorKey: "auditRef", align: "left", renderCell: (row) => <span className="font-mono text-[9.5px] text-slate-500">{row.auditRef}</span> },
    { header: "Event", accessorKey: "event", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.event}</span> },
    { header: "Entity", accessorKey: "entity", align: "left" },
    { header: "Module", accessorKey: "module", align: "left" },
    { header: "Actor", accessorKey: "actor", align: "left" },
    { header: "Risk", accessorKey: "risk", align: "center", renderCell: (row) => <span className={row.risk === 'High' ? 'text-rose-600 font-bold' : row.risk === 'Medium' ? 'text-amber-600 font-bold' : 'text-slate-600'}>{row.risk}</span> },
    { header: "Result", accessorKey: "result", align: "center", renderCell: (row) => <span className="font-bold text-emerald-600">{row.result}</span> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Reports &amp; Audit</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {REPORTS_AUDIT_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {REPORTS_AUDIT_DATA.headerInfo.subtitle}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("View Scheduled Reports")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Scheduled Reports
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Changes")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Compare Changes
          </button>
          <button
            type="button"
            onClick={() => handleAction("Create Export")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Create Export
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Audit Exceptions")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Audit Exceptions
          </button>
          <button
            type="button"
            onClick={() => handleAction("Generate Ecosystem Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileText size={12} /> Generate Ecosystem Report
          </button>
        </div>
      </div>

      {/* 2. Context Scope Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-13 gap-1 text-xs divide-x divide-slate-100 overflow-x-auto">
          <div className="pl-0"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Tenant</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.tenant}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Ecosystem</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.ecosystem}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Scope</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.scope}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Region</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.region}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Environment</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.environment}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Audit Engine</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.auditEngine}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Change Registry</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.changeRegistry}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Export Governance</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.exportGovernance}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Evidence Registry</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.evidenceRegistry}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Retention Policy</span><span className="text-emerald-700 font-extrabold block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.retentionPolicy}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Data Completeness</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.dataCompleteness}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Last Evaluated</span><span className="font-semibold text-slate-600 block text-[9.5px]">{REPORTS_AUDIT_DATA.contextBar.lastEvaluated}</span></div>
          <div className="px-1.5"><span className="text-[8.5px] font-bold text-slate-400 uppercase block">Access</span><span className="font-bold text-slate-800 block text-[10.5px]">{REPORTS_AUDIT_DATA.contextBar.access}</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 3. Primary KPI Row (10 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
            {REPORTS_AUDIT_DATA.primaryKpis.map((kpi, idx) => (
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
            {REPORTS_AUDIT_DATA.secondaryKpis.map((kpi, idx) => (
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
              {REPORTS_AUDIT_DATA.tabs.map((tab) => (
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
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Audit Reference</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Entity Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Module</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Event Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Actor</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1 text-[9.5px]">
                <span className="font-bold text-slate-400 mr-1 uppercase">Quick Filters:</span>
                {REPORTS_AUDIT_DATA.quickFilters.map((f) => (
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

          {/* 7. MAIN SECTION 1: Registry Table + Selected Record Detail + Before/After Comparison + Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Ecosystem Audit & Change Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Ecosystem Audit &amp; Change Registry ({REPORTS_AUDIT_DATA.auditRegistry.length})</h4>
                  <button onClick={() => handleAction("View full registry")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View full registry <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={REPORTS_AUDIT_DATA.auditRegistry} columns={auditCols} itemsPerPage={5} />
              </div>
            </div>

            {/* Selected Audit Record Detail */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Selected Audit Record Detail</h4>
                  <span className="font-mono text-[10px] font-extrabold text-burgundy">{REPORTS_AUDIT_DATA.selectedRecordDetail.auditRef}</span>
                </div>

                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between text-slate-600"><span>Entity Type</span><span className="font-semibold text-slate-800">{REPORTS_AUDIT_DATA.selectedRecordDetail.eventType}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Entity</span><span className="font-semibold text-slate-800">{REPORTS_AUDIT_DATA.selectedRecordDetail.entity}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Module</span><span className="font-semibold text-slate-800">{REPORTS_AUDIT_DATA.selectedRecordDetail.module}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Actor</span><span className="font-semibold text-slate-800">{REPORTS_AUDIT_DATA.selectedRecordDetail.actor}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Status</span><span className="font-bold text-emerald-700">{REPORTS_AUDIT_DATA.selectedRecordDetail.status}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Risk Level</span><span className="font-bold text-rose-600">{REPORTS_AUDIT_DATA.selectedRecordDetail.riskLevel}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Correlation Ref</span><span className="font-mono text-slate-800">{REPORTS_AUDIT_DATA.selectedRecordDetail.correlationRef}</span></div>
                </div>

                <div className="flex gap-1.5">
                  <button onClick={() => handleAction("View Record")} className="flex-1 py-1 bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[10.5px] rounded hover:bg-slate-100 cursor-pointer">View Record</button>
                  <button onClick={() => handleAction("Link Evidence")} className="flex-1 py-1 bg-burgundy text-white font-semibold text-[10.5px] rounded hover:bg-burgundy-dark cursor-pointer">Link Evidence</button>
                </div>
              </div>
            </div>

            {/* Before / After Comparison */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Before / After Comparison</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600"><span>Status</span><span className="font-bold text-emerald-700">{REPORTS_AUDIT_DATA.beforeAfterComparison.status.before} &rarr; {REPORTS_AUDIT_DATA.beforeAfterComparison.status.after}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Scope</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.beforeAfterComparison.scope.after}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Owner</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.beforeAfterComparison.owner.after}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Version</span><span className="font-mono text-slate-800">{REPORTS_AUDIT_DATA.beforeAfterComparison.version.after}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Environment</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.beforeAfterComparison.environment.after}</span></div>
                </div>
              </div>
              <button onClick={() => handleAction("View Full Comparison")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View Full Comparison <ArrowRight size={10} />
              </button>
            </div>

          </div>

          {/* 8. MAIN SECTION 2: 7 Compact History Tables */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            
            {/* Configuration History */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Configuration History</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.configHistory.map((c, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{c.configKey}</span>
                    <span className="font-bold text-slate-900">{c.toValue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment History */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Assignment History</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.assignmentHistory.map((a, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{a.scope}</span>
                    <span className="font-bold text-slate-900">{a.to}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Release History */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Release History</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.releaseHistory.map((r, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{r.module}</span>
                    <span className="font-mono text-emerald-700 font-bold">{r.version}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Flag History */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Feature Flag History</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.featureFlagHistory.map((ff, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{ff.flag}</span>
                    <span className="font-bold text-emerald-700">{ff.to}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration History */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Integration History</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.integrationHistory.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{i.integration}</span>
                    <span className="font-bold text-slate-900">{i.to}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance & Access History */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Governance History</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.governanceAccessHistory.map((g, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{g.event}</span>
                    <span className="font-bold text-emerald-700">{g.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Events */}
            <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Security Events</h4>
              <div className="space-y-1 text-[9.5px]">
                {REPORTS_AUDIT_DATA.securityEvents.map((s, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-semibold truncate max-w-[65px]">{s.event}</span>
                    <span className={s.severity === 'High' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{s.severity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 9. MAIN SECTION 3: Report Catalogue + Scheduled + Exports + Failed + Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Report Catalogue */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Report Catalogue ({REPORTS_AUDIT_DATA.reports.length})</h4>
              <div className="space-y-1.5 text-xs">
                {REPORTS_AUDIT_DATA.reports.map((rep) => (
                  <div key={rep.id} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{rep.name}</span>
                    <span className="text-[10px] text-slate-500">{rep.frequency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Reports */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Scheduled Reports ({REPORTS_AUDIT_DATA.scheduledReports.length})</h4>
              <div className="space-y-1.5 text-xs">
                {REPORTS_AUDIT_DATA.scheduledReports.map((srep) => (
                  <div key={srep.id} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{srep.report}</span>
                    <span className="font-bold text-emerald-700">{srep.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Jobs */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Export Jobs ({REPORTS_AUDIT_DATA.exportJobs.length})</h4>
              <div className="space-y-1.5 text-xs">
                {REPORTS_AUDIT_DATA.exportJobs.map((exp) => (
                  <div key={exp.id} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{exp.exportName}</span>
                    <span className="font-mono text-slate-800">{exp.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Failed Exports */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Failed Exports ({REPORTS_AUDIT_DATA.failedExports.length})</h4>
              <div className="space-y-1.5 text-xs">
                {REPORTS_AUDIT_DATA.failedExports.map((fexp) => (
                  <div key={fexp.id} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{fexp.exportName}</span>
                    <span className="font-bold text-rose-600">{fexp.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Packages */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Evidence Packages ({REPORTS_AUDIT_DATA.evidencePackages.length})</h4>
              <div className="space-y-1.5 text-xs">
                {REPORTS_AUDIT_DATA.evidencePackages.map((ev) => (
                  <div key={ev.id} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{ev.package}</span>
                    <span className="font-bold text-emerald-700">{ev.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 10. MAIN SECTION 4: Ecosystem Change Activity Chart + Reports & Exports Trend Chart + Recent Audit Activity + Audit Health Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Ecosystem Change Activity (Last 90 Days) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Ecosystem Change Activity (Last 90 Days)</h4>
              <div className="h-28 flex items-center justify-center bg-slate-50 rounded border border-slate-100 text-xs text-slate-500 font-semibold">
                [ Multi-Series Trend: Config, Assignment, Release, Flag, Integration, Governance ]
              </div>
            </div>

            {/* Reports & Exports Trend (Last 90 Days) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Reports &amp; Exports Trend (Last 90 Days)</h4>
              <div className="h-28 flex items-center justify-center bg-slate-50 rounded border border-slate-100 text-xs text-slate-500 font-semibold">
                [ Multi-Series Trend: Generated, Completed, Scheduled, Failed ]
              </div>
            </div>

            {/* Recent Ecosystem Audit Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Ecosystem Audit Activity</h4>
              <AnalyticsTable data={REPORTS_AUDIT_DATA.recentAuditActivity} columns={recentActivityCols} itemsPerPage={3} />
            </div>

            {/* Audit Health Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Audit Health Matrix</h4>
              <div className="space-y-1 text-[10px]">
                {REPORTS_AUDIT_DATA.auditHealthMatrix.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold">{item.domain}</span>
                    <span className="font-bold text-emerald-700">{item.overall}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 11. RIGHT-SIDE MONITORING & ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Audit Health Score */}
          <AnalyticsPanel number="" title="Audit Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={REPORTS_AUDIT_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {REPORTS_AUDIT_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9.5px] text-emerald-600 font-semibold mt-0.5">{REPORTS_AUDIT_DATA.rightPanel.trendText}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Change Activity Summary */}
          <AnalyticsPanel number="" title="Change Activity Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Changes</span><span className="font-bold text-slate-900">{REPORTS_AUDIT_DATA.rightPanel.changeActivitySummary.changes}</span></div>
              <div className="flex justify-between text-slate-600"><span>High-Risk Changes</span><span className="font-bold text-rose-600">{REPORTS_AUDIT_DATA.rightPanel.changeActivitySummary.highRiskChanges}</span></div>
              <div className="flex justify-between text-slate-600"><span>Config Changes</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.rightPanel.changeActivitySummary.configChanges}</span></div>
              <div className="flex justify-between text-slate-600"><span>Assignment Changes</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.rightPanel.changeActivitySummary.assignmentChanges}</span></div>
              <div className="flex justify-between text-slate-600"><span>Release Events</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.rightPanel.changeActivitySummary.releaseEvents}</span></div>
              <div className="flex justify-between text-slate-600"><span>Governance Events</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.rightPanel.changeActivitySummary.governanceAccessEvents}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Reports & Exports Summary */}
          <AnalyticsPanel number="" title="Reports &amp; Exports Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Reports Generated</span><span className="font-bold text-slate-900">{REPORTS_AUDIT_DATA.rightPanel.reportsExportsSummary.reportsGenerated}</span></div>
              <div className="flex justify-between text-slate-600"><span>Exports Completed</span><span className="font-bold text-emerald-700">{REPORTS_AUDIT_DATA.rightPanel.reportsExportsSummary.exportsCompleted}</span></div>
              <div className="flex justify-between text-slate-600"><span>Scheduled Reports</span><span className="font-bold text-slate-800">{REPORTS_AUDIT_DATA.rightPanel.reportsExportsSummary.scheduledReports}</span></div>
              <div className="flex justify-between text-slate-600"><span>Evidence Packages</span><span className="font-bold text-emerald-700">{REPORTS_AUDIT_DATA.rightPanel.reportsExportsSummary.evidencePackages}</span></div>
              <div className="flex justify-between text-slate-600"><span>Failed Exports</span><span className="font-bold text-rose-600">{REPORTS_AUDIT_DATA.rightPanel.reportsExportsSummary.failedExports}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Audit Risk Summary */}
          <AnalyticsPanel number="" title="Audit Risk Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Audit Exceptions</span><span className="font-bold text-amber-600">{REPORTS_AUDIT_DATA.rightPanel.auditRiskSummary.auditExceptions}</span></div>
              <div className="flex justify-between text-slate-600"><span>Retention Warnings</span><span className="font-bold text-amber-600">{REPORTS_AUDIT_DATA.rightPanel.auditRiskSummary.retentionWarnings}</span></div>
              <div className="flex justify-between text-slate-600"><span>Failed Exports</span><span className="font-bold text-rose-600">{REPORTS_AUDIT_DATA.rightPanel.auditRiskSummary.failedExports}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="Quick Queues">
            <div className="space-y-1.5 text-xs">
              {REPORTS_AUDIT_DATA.rightPanel.quickQueues.map((item, idx) => (
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
              <h4 className="text-xs font-bold text-white">{REPORTS_AUDIT_DATA.rightPanel.recommendedNextAction.title}</h4>
              <button className="text-white/60 hover:text-white"><XCircle size={14} /></button>
            </div>
            <p className="text-[10.5px] text-rose-100 leading-snug mb-3">
              {REPORTS_AUDIT_DATA.rightPanel.recommendedNextAction.text}
            </p>
            <button
              onClick={() => handleAction("Review Exceptions")}
              className="w-full py-1 bg-white hover:bg-slate-100 text-rose-950 text-xs font-extrabold rounded transition-colors cursor-pointer text-center"
            >
              {REPORTS_AUDIT_DATA.rightPanel.recommendedNextAction.buttonLabel}
            </button>
          </div>

          {/* G. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Generate Ecosystem Report")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Generate Ecosystem Report
              </button>
              <button
                onClick={() => handleAction("Create Export")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Create Export
              </button>
              <button
                onClick={() => handleAction("Review Audit Exceptions")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Audit Exceptions
              </button>
              <button
                onClick={() => handleAction("Review High-Risk Changes")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review High-Risk Changes
              </button>
              <button
                onClick={() => handleAction("Review Failed Exports")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Failed Exports
              </button>
              <button
                onClick={() => handleAction("Review Retention Warnings")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Retention Warnings
              </button>
              <button
                onClick={() => handleAction("Generate Evidence Package")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Generate Evidence Package
              </button>
              <button
                onClick={() => handleAction("Generate Release History")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Generate Release History
              </button>
              <button
                onClick={() => handleAction("Generate Access Audit")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Generate Access Audit
              </button>
              <button
                onClick={() => handleAction("Compare Changes")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Compare Changes
              </button>
              <button
                onClick={() => handleAction("View Scheduled Reports")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                View Scheduled Reports
              </button>
              <button
                onClick={() => handleAction("Verify Audit Integrity")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Verify Audit Integrity
              </button>
              <button
                onClick={() => handleAction("Open Full Audit History")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Open Full Audit History
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
