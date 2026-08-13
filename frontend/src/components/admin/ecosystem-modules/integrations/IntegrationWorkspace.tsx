"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, GitCommit, Search, Filter, Save, 
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
import { INTEGRATION_DATA, MainIntegrationRegistryItem, InternalSharedServiceItem, ExternalProviderItem, ApiItem, WebhookItem, AuthPortfolioItem, CredentialCertificateItem, FallbackResilienceItem, RegionalRestrictionItem, ProviderConcentrationItem, DependencyBlastRadiusItem, ComplianceGovernanceItem, RecentIntegrationActivityItem } from "@/data/ecosystem-modules/integrationData";

export function IntegrationWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Integration Overview");

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const registryCols: ColumnDef<MainIntegrationRegistryItem>[] = [
    { header: "Integration", accessorKey: "integrationName", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.integrationName}</span> },
    { header: "Source Module", accessorKey: "sourceModule", align: "left" },
    { header: "Target Service", accessorKey: "targetService", align: "left" },
    { header: "Type", accessorKey: "type", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600 font-medium">{row.type}</span> },
    { header: "Provider", accessorKey: "provider", align: "center" },
    { header: "Auth", accessorKey: "auth", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.auth}</span> },
    { header: "Env / Region", accessorKey: "environment", align: "center", renderCell: (row) => <span className="text-[9.5px] text-slate-500">{row.environment}</span> },
    { header: "Health", accessorKey: "health", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.health}</span> },
    { header: "SLA", accessorKey: "sla", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.sla}</span> },
    { header: "Security", accessorKey: "security", align: "center", renderCell: (row) => <span className={row.security === 'Healthy' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{row.security}</span> },
    { header: "Compliance", accessorKey: "compliance", align: "center", renderCell: (row) => <span className="text-[10px] font-medium text-slate-700">{row.compliance}</span> },
    { header: "Fallback", accessorKey: "fallback", align: "center", renderCell: (row) => <span className="text-emerald-600 font-bold">{row.fallback}</span> },
    { header: "Score", accessorKey: "score", align: "center", renderCell: (row) => <span className="font-black text-slate-900">{row.score}</span> },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <StatusBadge status={row.status} /> },
    { header: "Owner", accessorKey: "owner", align: "left", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.owner}</span> },
    { header: "Last Updated", accessorKey: "lastUpdated", align: "right", renderCell: (row) => <span className="text-slate-400 text-[9.5px]">{row.lastUpdated}</span> },
  ];

  const activityCols: ColumnDef<RecentIntegrationActivityItem>[] = [
    { header: "Time", accessorKey: "time", align: "left", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
    { header: "Activity", accessorKey: "activity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.activity}</span> },
    { header: "Integration", accessorKey: "integration", align: "left", renderCell: (row) => <span className="text-slate-600">{row.integration}</span> },
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
            <span className="font-semibold text-slate-700">Integrations &amp; Services</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            {INTEGRATION_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {INTEGRATION_DATA.headerInfo.description}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse block" /> Overall Status: {INTEGRATION_DATA.headerInfo.overallStatus}
          </span>
          <button
            type="button"
            onClick={() => handleAction("Register Integration")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Register Integration
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
            onClick={() => handleAction("Export Registry")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download size={12} /> Export Registry
          </button>
        </div>
      </div>

      {/* 2. Context Scope Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-19 gap-1 text-xs divide-x divide-slate-100 overflow-x-auto">
          <div className="pl-0"><span className="text-[8px] font-bold text-slate-400 uppercase block">Tenant</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.tenant}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Ecosystem</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.ecosystem}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Scope</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.scope}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Region</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.region}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Environment</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.environment}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Integration Registry</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.integrationRegistry}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Service Registry</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.serviceRegistry}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Provider Registry</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.providerRegistry}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Module Registry</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.moduleRegistry}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Dependency Registry</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.dependencyRegistry}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Security Posture</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.securityPosture}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Security Source</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.securitySource}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Compliance Source</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.complianceSource}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Secret Manager</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.secretManager}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Monitoring Source</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.monitoringSource}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">SLA Engine</span><span className="text-emerald-700 font-extrabold block text-[10px]">{INTEGRATION_DATA.contextBar.slaEngine}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Data Completeness</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.dataCompleteness}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Last Evaluated</span><span className="font-semibold text-slate-600 block text-[9px]">{INTEGRATION_DATA.contextBar.lastEvaluated}</span></div>
          <div className="px-1"><span className="text-[8px] font-bold text-slate-400 uppercase block">Access</span><span className="font-bold text-slate-800 block text-[10px]">{INTEGRATION_DATA.contextBar.access}</span></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 3. Primary KPI Row (10 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
            {INTEGRATION_DATA.primaryKpis.map((kpi, idx) => (
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
            {INTEGRATION_DATA.secondaryKpis.map((kpi, idx) => (
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
              {INTEGRATION_DATA.tabs.map((tab) => (
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
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Integration</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Source Module</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Target Service</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Integration Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Provider</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Authentication</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1 text-[9.5px]">
                <span className="font-bold text-slate-400 mr-1 uppercase">Quick Filters:</span>
                {["Healthy", "Warning", "Failed", "Critical", "External Provider", "Shared Service", "APIs", "Webhook", "SLA Breach", "High Latency", "Error Spike", "Security Review", "Compliance Review", "Credential Expiring", "No Fallback", "Regional Restriction", "Needs Review"].map((f) => (
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

          {/* 7. MAIN SECTION 1: Registry Table + Selected Detail + Trend Chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Main Integration Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Main Integration Registry ({INTEGRATION_DATA.registry.length})</h4>
                  <button onClick={() => handleAction("View full registry")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View full registry <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={INTEGRATION_DATA.registry} columns={registryCols} itemsPerPage={5} />
              </div>
            </div>

            {/* Selected Integration Detail Card + Integration Health Trend */}
            <div className="space-y-3">
              {/* Selected Integration Detail Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Selected Integration Details</h4>
                  <span className="text-[10px] font-extrabold text-burgundy">{INTEGRATION_DATA.selectedIntegrationDetail.name}</span>
                </div>

                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between text-slate-600"><span>Source Module</span><span className="font-semibold text-slate-800">{INTEGRATION_DATA.selectedIntegrationDetail.sourceModule}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Target Service</span><span className="font-semibold text-slate-800">{INTEGRATION_DATA.selectedIntegrationDetail.targetService}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Type</span><span className="font-semibold text-slate-800">{INTEGRATION_DATA.selectedIntegrationDetail.integrationType}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Authentication</span><span className="font-mono text-[10px] text-slate-800">{INTEGRATION_DATA.selectedIntegrationDetail.authentication}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Availability / SLA</span><span className="font-extrabold text-emerald-700">{INTEGRATION_DATA.selectedIntegrationDetail.availability} ({INTEGRATION_DATA.selectedIntegrationDetail.availabilitySla})</span></div>
                  <div className="flex justify-between text-slate-600"><span>Latency P95</span><span className="font-mono text-slate-800">{INTEGRATION_DATA.selectedIntegrationDetail.latencyP95}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Throughput</span><span className="font-bold text-slate-900">{INTEGRATION_DATA.selectedIntegrationDetail.throughput}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Health Score</span><span className="font-black text-emerald-700">{INTEGRATION_DATA.selectedIntegrationDetail.score}/100</span></div>
                </div>

                <button onClick={() => handleAction("View Integration Details")} className="w-full py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-burgundy font-bold text-xs rounded transition-colors cursor-pointer text-center">
                  View Integration Details
                </button>
              </div>

              {/* Integration Health Trend (30 Days) */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Integration Health Trend (30 Days)</h4>
                <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-slate-100 text-xs text-slate-500 font-semibold">
                  [ 30-Day Trend: Availability %, Error Rate %, Latency, Throughput ]
                </div>
              </div>
            </div>

          </div>

          {/* 8. MAIN SECTION 2: Internal Services + External Providers + APIs + Webhooks + Auth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Internal & Shared Services */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Internal &amp; Shared Services</h4>
              <div className="space-y-1.5 text-xs">
                {INTEGRATION_DATA.internalSharedServices.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{item.service}</span>
                    <span className="font-bold text-emerald-700">{item.availability} ({item.latency})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Providers */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">External Providers</h4>
              <div className="space-y-1.5 text-xs">
                {INTEGRATION_DATA.externalProviders.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{item.provider}</span>
                    <span className="font-bold text-slate-900">{item.sla} ({item.criticality})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* APIs */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">APIs</h4>
              <div className="space-y-1.5 text-xs">
                {INTEGRATION_DATA.apis.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 border-b border-slate-50 pb-0.5">
                    <span className="font-semibold truncate max-w-[120px]">{item.api}</span>
                    <span className="font-extrabold text-emerald-700">{item.successRate} ({item.p95Latency})</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 9. MAIN SECTION 3: Webhooks + Authentication Portfolio + Credentials + Fallback + Regional */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* Webhooks */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Webhooks</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.webhooks.map((w, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{w.webhook}</span>
                    <span className="font-bold text-emerald-700">{w.successRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Authentication Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Authentication Portfolio</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.authPortfolio.map((auth, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold truncate max-w-[80px]">{auth.authType}</span>
                    <span className="font-bold text-slate-900">{auth.pctOfTotal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials & Certificates */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Credentials &amp; Certificates</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.credentialsCertificates.map((c, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{c.type}</span>
                    <span className="font-bold text-amber-600">{c.expiring30Days} Expiring</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fallback & Resilience */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Fallback &amp; Resilience</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.fallbackResilience.map((f, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{f.service}</span>
                    <span className="font-bold text-emerald-700">{f.successRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Restrictions */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Regional Restrictions</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.regionalRestrictions.map((reg, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{reg.region}</span>
                    <span className="font-bold text-slate-900">{reg.activeIntegrations} Active</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 10. MAIN SECTION 4: Provider Concentration + Dependency Blast Radius + Compliance + Activity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Provider Concentration */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Provider Concentration</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.providerConcentration.map((p, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{p.provider}</span>
                    <span className="font-bold text-slate-900">{p.criticalPct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency / Impact (Blast Radius) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Dependency / Impact (Blast Radius)</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.dependencyBlastRadius.map((dep, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{dep.domain}</span>
                    <span className={`font-bold ${dep.criticality === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>{dep.criticality}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Governance */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Compliance &amp; Governance</h4>
              <div className="space-y-1 text-[10px]">
                {INTEGRATION_DATA.complianceGovernance.map((comp, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{comp.standard}</span>
                    <span className="font-bold text-emerald-700">{comp.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Activity</h4>
              <AnalyticsTable data={INTEGRATION_DATA.recentActivity} columns={activityCols} itemsPerPage={3} />
            </div>

          </div>

        </div>

        {/* 11. RIGHT-SIDE MONITORING & ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Integration Ecosystem Health Gauge */}
          <AnalyticsPanel number="" title="A. Integration Ecosystem Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={INTEGRATION_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {INTEGRATION_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5">{INTEGRATION_DATA.rightPanel.overallHealthText}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Integration Summary */}
          <AnalyticsPanel number="" title="B. Integration Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Registered</span><span className="font-bold text-slate-900">{INTEGRATION_DATA.rightPanel.integrationSummary.registered}</span></div>
              <div className="flex justify-between text-slate-600"><span>Active</span><span className="font-bold text-emerald-700">{INTEGRATION_DATA.rightPanel.integrationSummary.active}</span></div>
              <div className="flex justify-between text-slate-600"><span>Healthy</span><span className="font-bold text-emerald-700">{INTEGRATION_DATA.rightPanel.integrationSummary.healthy}</span></div>
              <div className="flex justify-between text-slate-600"><span>Warning</span><span className="font-bold text-amber-600">{INTEGRATION_DATA.rightPanel.integrationSummary.warning}</span></div>
              <div className="flex justify-between text-slate-600"><span>Failed</span><span className="font-bold text-rose-600">{INTEGRATION_DATA.rightPanel.integrationSummary.failed}</span></div>
              <div className="flex justify-between text-slate-600"><span>High Risk</span><span className="font-bold text-rose-600">{INTEGRATION_DATA.rightPanel.integrationSummary.highRisk}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Provider Summary */}
          <AnalyticsPanel number="" title="C. Provider Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>External Providers</span><span className="font-bold text-slate-900">{INTEGRATION_DATA.rightPanel.providerSummary.externalProviders}</span></div>
              <div className="flex justify-between text-slate-600"><span>Critical Providers</span><span className="font-bold text-rose-600">{INTEGRATION_DATA.rightPanel.providerSummary.criticalProviders}</span></div>
              <div className="flex justify-between text-slate-600"><span>With Fallback</span><span className="font-bold text-emerald-700">{INTEGRATION_DATA.rightPanel.providerSummary.withFallback}</span></div>
              <div className="flex justify-between text-slate-600"><span>Contract Reviews Due</span><span className="font-bold text-amber-600">{INTEGRATION_DATA.rightPanel.providerSummary.contractReviewsDue}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Governance Summary */}
          <AnalyticsPanel number="" title="D. Governance Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>SLA Breaches</span><span className="font-bold text-rose-600">{INTEGRATION_DATA.rightPanel.governanceSummary.slaBreaches}</span></div>
              <div className="flex justify-between text-slate-600"><span>Credentials Expiring</span><span className="font-bold text-amber-600">{INTEGRATION_DATA.rightPanel.governanceSummary.credentialsExpiring}</span></div>
              <div className="flex justify-between text-slate-600"><span>Security Reviews</span><span className="font-semibold text-slate-700">{INTEGRATION_DATA.rightPanel.governanceSummary.securityReviews}</span></div>
              <div className="flex justify-between text-slate-600"><span>Compliance Reviews</span><span className="font-semibold text-slate-700">{INTEGRATION_DATA.rightPanel.governanceSummary.complianceReviews}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="E. Quick Queues">
            <div className="space-y-1.5 text-xs">
              {INTEGRATION_DATA.rightPanel.quickQueues.map((item, idx) => (
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
              <h4 className="text-xs font-bold text-white">{INTEGRATION_DATA.rightPanel.recommendedNextAction.title}</h4>
              <button className="text-white/60 hover:text-white"><XCircle size={14} /></button>
            </div>
            <p className="text-[10.5px] text-rose-100 leading-snug mb-2">
              {INTEGRATION_DATA.rightPanel.recommendedNextAction.text}
            </p>
            <div className="text-[9.5px] text-rose-200 mb-3 flex justify-between">
              <span>Owner: {INTEGRATION_DATA.rightPanel.recommendedNextAction.owner}</span>
              <span>Due: {INTEGRATION_DATA.rightPanel.recommendedNextAction.dueDate}</span>
            </div>
            <button
              onClick={() => handleAction("View Details")}
              className="w-full py-1 bg-white hover:bg-slate-100 text-rose-950 text-xs font-extrabold rounded transition-colors cursor-pointer text-center"
            >
              {INTEGRATION_DATA.rightPanel.recommendedNextAction.buttonLabel}
            </button>
          </div>

          {/* G. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="G. Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Register Integration")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                + Register Integration
              </button>
              <button
                onClick={() => handleAction("Review Failed Integrations")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Failed Integrations
              </button>
              <button
                onClick={() => handleAction("Review High Risk Integrations")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review High Risk Integrations
              </button>
              <button
                onClick={() => handleAction("Review SLA Breaches")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review SLA Breaches
              </button>
              <button
                onClick={() => handleAction("Review Contract Expiry")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Contract Expiry
              </button>
              <button
                onClick={() => handleAction("Review Security Reviews")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Security Reviews
              </button>
              <button
                onClick={() => handleAction("Review Environments")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Environments
              </button>
              <button
                onClick={() => handleAction("Review Compliance Status")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Compliance Status
              </button>
              <button
                onClick={() => handleAction("Review Providers")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Providers
              </button>
              <button
                onClick={() => handleAction("Compare Environments")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Compare Environments
              </button>
              <button
                onClick={() => handleAction("Export Integration Registry")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Integration Registry
              </button>
              <button
                onClick={() => handleAction("Open Integration Audit")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Open Integration Audit
              </button>
            </div>
          </AnalyticsPanel>

          {/* H. Issue Watch */}
          <AnalyticsPanel number="" title="H. Issue Watch">
            <div className="space-y-1 text-xs">
              {INTEGRATION_DATA.rightPanel.issueWatch.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className="font-bold text-slate-800">{item.count}</span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
