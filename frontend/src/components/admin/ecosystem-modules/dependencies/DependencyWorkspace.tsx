"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, GitCommit, Search, Filter, Save, 
  Download, DownloadCloud, AlertTriangle, Play, FileText, Check, ShieldAlert, 
  Zap, Globe, Package, Link as LinkIcon, Settings, Grid, Users, Layers, 
  ArrowRight, ShieldCheck, CheckSquare, XCircle, AlertCircle, TrendingUp, 
  Activity, ArrowLeft, Info, Eye, Shield, Lock, FileCode, ExternalLink,
  RefreshCw, GitPullRequest, Maximize2, ZoomIn, ZoomOut, RotateCcw, Sliders
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { DEPENDENCY_DATA, DependencyRegistryItem, SharedServiceItem, OwnershipItem, GovernanceGateItem, DependencyActivityItem } from "@/data/ecosystem-modules/dependencyData";

export function DependencyWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dependency Overview");
  const [selectedTenant, setSelectedTenant] = useState(DEPENDENCY_DATA.contextFilters.tenant);
  const [selectedBU, setSelectedBU] = useState(DEPENDENCY_DATA.contextFilters.businessUnit);
  const [selectedEnv, setSelectedEnv] = useState(DEPENDENCY_DATA.contextFilters.environment);

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const registryCols: ColumnDef<DependencyRegistryItem>[] = [
    { header: "From Module", accessorKey: "fromModule", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.fromModule}</span> },
    { header: "From Type", accessorKey: "fromType", align: "center", renderCell: (row) => <span className="text-slate-500 font-medium text-[10px]">{row.fromType}</span> },
    { header: "To Module / Service", accessorKey: "toModuleService", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.toModuleService}</span> },
    { header: "To Type", accessorKey: "toType", align: "center", renderCell: (row) => <span className="text-slate-500 font-medium text-[10px]">{row.toType}</span> },
    { header: "Criticality", accessorKey: "criticality", align: "center", renderCell: (row) => <span className={`font-bold ${row.criticality === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>{row.criticality}</span> },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <span className={`font-semibold ${row.status === 'Required' ? 'text-emerald-700' : row.status === 'Warning' ? 'text-amber-600' : 'text-blue-700'}`}>{row.status}</span> },
    { header: "Compatibility", accessorKey: "compatibility", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.compatibility}</span> },
    { header: "Version", accessorKey: "version", align: "center", renderCell: (row) => <span className="font-mono text-slate-600 text-[10px]">{row.version}</span> },
    { header: "Last Validated", accessorKey: "lastValidated", align: "right", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.lastValidated}</span> },
  ];

  const ownershipCols: ColumnDef<OwnershipItem>[] = [
    { header: "Owner", accessorKey: "owner", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.owner}</span> },
    { header: "Owned Dependencies", accessorKey: "ownedDependencies", align: "center", renderCell: (row) => <span className="font-bold text-slate-900">{row.ownedDependencies}</span> },
    { header: "Health", accessorKey: "health", align: "right", renderCell: (row) => <span className="font-bold text-emerald-700">{row.health}</span> },
  ];

  const activityCols: ColumnDef<DependencyActivityItem>[] = [
    { header: "Activity", accessorKey: "activity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.activity}</span> },
    { header: "Source", accessorKey: "source", align: "left", renderCell: (row) => <span className="text-slate-600">{row.source}</span> },
    { header: "Target", accessorKey: "target", align: "left", renderCell: (row) => <span className="text-slate-600">{row.target}</span> },
    { header: "Type", accessorKey: "type", align: "center", renderCell: (row) => <span className="text-slate-500 font-medium text-[10px]">{row.type}</span> },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <span className={`font-semibold ${row.status === 'Completed' ? 'text-emerald-700' : 'text-amber-600'}`}>{row.status}</span> },
    { header: "User", accessorKey: "user", align: "center", renderCell: (row) => <span className="text-slate-600">{row.user}</span> },
    { header: "Time", accessorKey: "time", align: "right", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Dependencies &amp; Compatibility</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {DEPENDENCY_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {DEPENDENCY_DATA.headerInfo.description}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("View Change Impact")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Change Impact
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Map")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download size={11} /> Export Map
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Versions")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Compare Versions
          </button>
          <button
            type="button"
            onClick={() => handleAction("Service Mesh")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Service Mesh
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Compatibility Validation")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Run Compatibility Validation
          </button>
          <button
            type="button"
            onClick={() => handleAction("More Actions")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            More Actions <ChevronDown size={11} />
          </button>
        </div>
      </div>

      {/* 2. Filter / Context Bar & Engine Status Cards */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs flex-1">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Tenant</span>
            <select 
              value={selectedTenant} 
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer"
            >
              <option value="SL Beauty">SL Beauty</option>
              <option value="Beauty Hub">Beauty Hub</option>
              <option value="Glow Retail">Glow Retail</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Business Unit</span>
            <select 
              value={selectedBU} 
              onChange={(e) => setSelectedBU(e.target.value)}
              className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer"
            >
              <option value="Beauty Manufacturing">Beauty Manufacturing</option>
              <option value="Retail Operations">Retail Operations</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span>
            <select 
              value={selectedEnv} 
              onChange={(e) => setSelectedEnv(e.target.value)}
              className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer"
            >
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Sector</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option value="All">All Sectors</option>
              <option value="Beauty & Personal Care">Beauty &amp; Personal Care</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Version Scope</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option value="All Versions">All Versions</option>
              <option value="Current Release">Current Release</option>
            </select>
          </div>
        </div>

        {/* Dependency Engine Status Cards */}
        <div className="flex items-center gap-3 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Dependency Engine</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> {DEPENDENCY_DATA.engineStatus.dependencyEngine}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Compatibility Engine</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> {DEPENDENCY_DATA.engineStatus.compatibilityEngine}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8.5px] font-bold text-slate-400 uppercase block">Last Updated</span>
            <span className="text-[10px] font-semibold text-slate-700">{DEPENDENCY_DATA.engineStatus.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 3. Primary KPI Row (10 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
            {DEPENDENCY_DATA.primaryKpis.map((kpi, idx) => (
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

          {/* 4. Secondary KPI Row (7 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2 min-w-0">
            {DEPENDENCY_DATA.secondaryKpis.map((kpi, idx) => (
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

          {/* 5. Horizontal Tab Navigation Bar (12 Tabs) */}
          <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-1 text-xs whitespace-nowrap min-w-max">
              {DEPENDENCY_DATA.tabs.map((tab) => (
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

          {/* 6. MAIN SECTION 1: Ecosystem Dependency Map & Selected Detail Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Dependency Graph Topology Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-800">Ecosystem Dependency Map</h4>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9.5px] font-semibold rounded">Live Topology</span>
                  </div>
                  
                  {/* Graph Toolbar Controls */}
                  <div className="flex items-center gap-1 text-slate-500">
                    <button onClick={() => handleAction("Graph Layout")} className="p-1 hover:bg-slate-100 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"><Sliders size={11} /> Layout</button>
                    <button onClick={() => handleAction("Graph Fit")} className="p-1 hover:bg-slate-100 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"><Maximize2 size={11} /> Fit</button>
                    <button onClick={() => handleAction("Zoom Out")} className="p-1 hover:bg-slate-100 rounded cursor-pointer"><ZoomOut size={11} /></button>
                    <span className="text-[10px] font-bold text-slate-700 px-1">100%</span>
                    <button onClick={() => handleAction("Zoom In")} className="p-1 hover:bg-slate-100 rounded cursor-pointer"><ZoomIn size={11} /></button>
                  </div>
                </div>

                {/* Interactive Dependency Nodes Rendering */}
                <div className="grid grid-cols-4 gap-2 text-center text-[9.5px] py-2 relative min-h-[240px]">
                  
                  {/* Column 1: Source Modules */}
                  <div className="space-y-3">
                    <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">Source Modules</span>
                    {DEPENDENCY_DATA.dependencyMapNodes.sourceModules.map((node, idx) => (
                      <div key={idx} className="p-2 bg-emerald-50/80 border border-emerald-300 text-emerald-900 rounded font-bold shadow-2xs">
                        {node}
                      </div>
                    ))}
                  </div>

                  {/* Column 2: Capabilities */}
                  <div className="space-y-1.5">
                    <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">Capabilities</span>
                    {DEPENDENCY_DATA.dependencyMapNodes.capabilities.map((node, idx) => (
                      <div key={idx} className={`p-1.5 border rounded font-semibold text-[9px] shadow-2xs ${node.tone === 'warning' ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-blue-50/80 border-blue-200 text-blue-900'}`}>
                        {node.name}
                      </div>
                    ))}
                  </div>

                  {/* Column 3: Shared Services */}
                  <div className="space-y-2">
                    <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">Shared Services</span>
                    {DEPENDENCY_DATA.dependencyMapNodes.sharedServices.map((node, idx) => (
                      <div key={idx} className="p-1.5 bg-slate-50 border border-slate-200 text-slate-800 rounded font-medium text-[8.5px] shadow-2xs">
                        {node}
                      </div>
                    ))}
                  </div>

                  {/* Column 4: External Services */}
                  <div className="space-y-2">
                    <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">External Services</span>
                    {DEPENDENCY_DATA.dependencyMapNodes.externalServices.map((node, idx) => (
                      <div key={idx} className="p-1.5 bg-purple-50/80 border border-purple-200 text-purple-900 rounded font-semibold text-[8.5px] shadow-2xs">
                        {node}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dependency Legend */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[9.5px]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700"><span className="w-3 h-0.5 bg-emerald-500 rounded"></span> Required (Healthy)</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-600"><span className="w-3 h-0.5 bg-amber-500 rounded"></span> Warning / Conditional</span>
                  <span className="flex items-center gap-1 font-semibold text-rose-600"><span className="w-3 h-0.5 bg-rose-500 rounded"></span> Blocked / Incompatible</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-500"><span className="w-3 h-0.5 bg-slate-400 rounded"></span> Shared Dependencies</span>
                </div>
              </div>
            </div>

            {/* Selected Dependency Detail Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Selected Dependency Detail</h4>
                <div className="p-2 bg-slate-50 border border-slate-100 rounded mb-3 text-[10.5px]">
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">From &rarr; To</span>
                  <span className="font-bold text-slate-900 block">{DEPENDENCY_DATA.selectedDependencyDetail.from}</span>
                  <span className="text-slate-500 block">&rarr; {DEPENDENCY_DATA.selectedDependencyDetail.to}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600"><span>Type</span><span className="font-semibold text-slate-900">{DEPENDENCY_DATA.selectedDependencyDetail.type}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Relationship</span><span className="font-bold text-emerald-700">{DEPENDENCY_DATA.selectedDependencyDetail.relationship}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Direction</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.selectedDependencyDetail.direction}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Criticality</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.selectedDependencyDetail.criticality}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Version</span><span className="font-mono text-slate-800">{DEPENDENCY_DATA.selectedDependencyDetail.version}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Environment</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.selectedDependencyDetail.environment}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Status</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.selectedDependencyDetail.status}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Compatibility</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.selectedDependencyDetail.compatibility}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Last Validated</span><span className="text-[10px] text-slate-400">{DEPENDENCY_DATA.selectedDependencyDetail.lastValidated}</span></div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAction("View Dependency Details")}
                className="mt-3 w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-burgundy text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                View Dependency Details
              </button>
            </div>

          </div>

          {/* 7. MAIN SECTION 2: Dependency Registry DataTable */}
          <AnalyticsPanel number="" title="Dependency Registry">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-100">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAction("Apply Filters")} className="px-2.5 py-1 bg-burgundy hover:bg-burgundy-dark text-white font-semibold rounded text-[10.5px] cursor-pointer">Apply Filters</button>
                  <button onClick={() => handleAction("Clear All")} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer">Clear All</button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAction("Save View")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Save size={10} /> Save View</button>
                  <button onClick={() => handleAction("Refresh")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><RefreshCw size={10} /> Refresh</button>
                  <button onClick={() => handleAction("Export")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Download size={10} /> Export</button>
                </div>
              </div>
              <AnalyticsTable data={DEPENDENCY_DATA.registry} columns={registryCols} itemsPerPage={8} />
            </div>
          </AnalyticsPanel>

          {/* 8. MAIN SECTION 3: Summary Matrix Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
            
            {/* Module Dependency Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Module Dependency Summary</h4>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between text-slate-600"><span>Total Modules</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.summaryMatrix.moduleDependency.totalModules}</span></div>
                <div className="flex justify-between text-slate-600"><span>With Dependencies</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.summaryMatrix.moduleDependency.withDependencies}</span></div>
                <div className="flex justify-between text-slate-600"><span>Without Dependencies</span><span className="font-semibold text-slate-700">{DEPENDENCY_DATA.summaryMatrix.moduleDependency.withoutDependencies}</span></div>
                <div className="flex justify-between text-slate-600"><span>Critical Modules</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.summaryMatrix.moduleDependency.criticalModules}</span></div>
                <div className="flex justify-between text-slate-600"><span>High Risk Modules</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.summaryMatrix.moduleDependency.highRiskModules}</span></div>
              </div>
            </div>

            {/* Capability Dependency Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Capability Dependency Summary</h4>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between text-slate-600"><span>Total Capabilities</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.summaryMatrix.capabilityDependency.totalCapabilities}</span></div>
                <div className="flex justify-between text-slate-600"><span>Required</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.summaryMatrix.capabilityDependency.required}</span></div>
                <div className="flex justify-between text-slate-600"><span>Optional</span><span className="font-semibold text-slate-700">{DEPENDENCY_DATA.summaryMatrix.capabilityDependency.optional}</span></div>
                <div className="flex justify-between text-slate-600"><span>Conditional</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.summaryMatrix.capabilityDependency.conditional}</span></div>
                <div className="flex justify-between text-slate-600"><span>Incompatible</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.summaryMatrix.capabilityDependency.incompatible}</span></div>
              </div>
            </div>

            {/* Sector Pack Dependency Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Sector Pack Dependency Summary</h4>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between text-slate-600"><span>Total Sector Packs</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.summaryMatrix.sectorPackDependency.totalSectorPacks}</span></div>
                <div className="flex justify-between text-slate-600"><span>Fully Compatible</span><span className="font-bold text-emerald-700">{DEPENDENCY_DATA.summaryMatrix.sectorPackDependency.fullyCompatible}</span></div>
                <div className="flex justify-between text-slate-600"><span>Partially Compatible</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.summaryMatrix.sectorPackDependency.partiallyCompatible}</span></div>
                <div className="flex justify-between text-slate-600"><span>Incompatible</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.summaryMatrix.sectorPackDependency.incompatible}</span></div>
                <div className="flex justify-between text-slate-600"><span>Not Used</span><span className="font-semibold text-slate-500">{DEPENDENCY_DATA.summaryMatrix.sectorPackDependency.notUsed}</span></div>
              </div>
            </div>

            {/* Shared Services Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Shared Services Portfolio</h4>
              <div className="space-y-1 text-[10px]">
                {DEPENDENCY_DATA.summaryMatrix.sharedServicesPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-medium">{item.status}</span>
                    <span className="font-semibold text-slate-800">{item.services} <span className="text-[9px] text-slate-400">({item.health})</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Services Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">External Services Portfolio</h4>
              <div className="space-y-1 text-[10px]">
                {DEPENDENCY_DATA.summaryMatrix.externalServicesPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span className="font-medium">{item.status}</span>
                    <span className="font-semibold text-slate-800">{item.services} <span className="text-[9px] text-slate-400">({item.health})</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Version Compatibility Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Version Compatibility Matrix</h4>
              <table className="w-full text-[9px] text-center">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="p-0.5">From/To</th>
                    {DEPENDENCY_DATA.summaryMatrix.versionCompatibilityMatrix.columns.map((c, i) => (
                      <th key={i} className="p-0.5">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEPENDENCY_DATA.summaryMatrix.versionCompatibilityMatrix.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-0.5 font-semibold text-slate-700">{row.from}</td>
                      {row.values.map((v, cIdx) => (
                        <td key={cIdx} className="p-0.5 font-bold text-slate-800">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Version Conflicts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Version Conflicts</h4>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between text-slate-600"><span>Major Conflicts</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.summaryMatrix.versionConflicts.majorConflicts}</span></div>
                <div className="flex justify-between text-slate-600"><span>Minor Conflicts</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.summaryMatrix.versionConflicts.minorConflicts}</span></div>
                <div className="flex justify-between text-slate-600"><span>Deprecated Versions</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.summaryMatrix.versionConflicts.deprecatedVersions}</span></div>
                <div className="flex justify-between text-slate-600"><span>Pending Migrations</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.summaryMatrix.versionConflicts.pendingMigrations}</span></div>
                <div className="flex justify-between text-slate-600"><span>Pending Resolutions</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.summaryMatrix.versionConflicts.pendingResolutions}</span></div>
              </div>
            </div>

          </div>

          {/* 9. MAIN SECTION 4: Secondary Analysis Cards (8 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            
            {/* Upgrade Readiness */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Upgrade Readiness</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span className="text-emerald-700 font-semibold">Ready</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.upgradeReadiness.ready} ({DEPENDENCY_DATA.secondaryAnalysis.upgradeReadiness.readyPct})</span></div>
                <div className="flex justify-between"><span className="text-amber-600 font-semibold">Needs Upgrade</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.upgradeReadiness.needsUpgrade} ({DEPENDENCY_DATA.secondaryAnalysis.upgradeReadiness.needsUpgradePct})</span></div>
                <div className="flex justify-between"><span className="text-rose-600 font-semibold">Blocked</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.secondaryAnalysis.upgradeReadiness.blocked} ({DEPENDENCY_DATA.secondaryAnalysis.upgradeReadiness.blockedPct})</span></div>
              </div>
            </div>

            {/* Circular Dependencies */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Circular Dependencies</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>Total Detected</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.circularDependencies.totalDetected}</span></div>
                <div className="flex justify-between"><span>Critical</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.secondaryAnalysis.circularDependencies.critical}</span></div>
                <div className="flex justify-between"><span>Resolved</span><span className="font-semibold text-emerald-700">{DEPENDENCY_DATA.secondaryAnalysis.circularDependencies.resolved}</span></div>
              </div>
            </div>

            {/* Orphaned Services */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Orphaned Services</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>Total Orphaned</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.orphanedServices.totalOrphaned}</span></div>
                <div className="flex justify-between"><span>High Impact</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.secondaryAnalysis.orphanedServices.highImpact}</span></div>
                <div className="flex justify-between"><span>Medium Impact</span><span className="font-semibold text-slate-700">{DEPENDENCY_DATA.secondaryAnalysis.orphanedServices.mediumImpact}</span></div>
              </div>
            </div>

            {/* Blocking Dependencies */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Blocking Dependencies</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>Total Blocking</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.secondaryAnalysis.blockingDependencies.totalBlocking}</span></div>
                <div className="flex justify-between"><span>By External Service</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.secondaryAnalysis.blockingDependencies.byExternalService}</span></div>
                <div className="flex justify-between"><span>By Module</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.secondaryAnalysis.blockingDependencies.byModule}</span></div>
              </div>
            </div>

            {/* Impact & Change Analysis */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Impact &amp; Change Analysis</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>Changes Pending</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.impactChangeAnalysis.changesPending}</span></div>
                <div className="flex justify-between"><span>High Impact</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.secondaryAnalysis.impactChangeAnalysis.highImpact}</span></div>
                <div className="flex justify-between"><span>Medium Impact</span><span className="font-semibold text-amber-600">{DEPENDENCY_DATA.secondaryAnalysis.impactChangeAnalysis.mediumImpact}</span></div>
              </div>
            </div>

            {/* Release Impact Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Release Impact Summary</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>Next Release</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.releaseImpactSummary.nextReleaseImpacted}</span></div>
                <div className="flex justify-between"><span>Modules Impacted</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.secondaryAnalysis.releaseImpactSummary.modulesImpacted}</span></div>
                <div className="flex justify-between"><span>Capabilities</span><span className="font-semibold text-slate-800">{DEPENDENCY_DATA.secondaryAnalysis.releaseImpactSummary.capabilitiesImpacted}</span></div>
              </div>
            </div>

            {/* Environment Drift */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Environment Drift</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>Total Drift Items</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.environmentDrift.totalDriftItems}</span></div>
                <div className="flex justify-between"><span>Critical Drift</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.secondaryAnalysis.environmentDrift.criticalDrift}</span></div>
                <div className="flex justify-between"><span>Warning Drift</span><span className="font-semibold text-amber-600">{DEPENDENCY_DATA.secondaryAnalysis.environmentDrift.warningDrift}</span></div>
              </div>
            </div>

            {/* Dependency Health Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-center">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Dependency Health Matrix</span>
              <div className="flex items-center justify-around my-1">
                <div className="text-center">
                  <span className="text-[8.5px] text-slate-400 block uppercase">Score</span>
                  <span className="text-base font-extrabold text-emerald-700">{DEPENDENCY_DATA.secondaryAnalysis.dependencyHealthMatrix.score}%</span>
                </div>
                <div className="text-center">
                  <span className="text-[8.5px] text-slate-400 block uppercase">Healthy</span>
                  <span className="text-sm font-bold text-slate-900">{DEPENDENCY_DATA.secondaryAnalysis.dependencyHealthMatrix.healthy}</span>
                </div>
              </div>
            </div>

          </div>

          {/* 10. MAIN SECTION 5: Bottom Governance & Activity Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Ownership & Accountability */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Ownership &amp; Accountability</h4>
                <AnalyticsTable data={DEPENDENCY_DATA.ownership} columns={ownershipCols} itemsPerPage={5} />
              </div>
            </div>

            {/* Governance Gates & Exception Center */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Governance Gates</h4>
                <div className="grid grid-cols-5 gap-1 text-center py-2 bg-slate-50 rounded border border-slate-100 mb-3">
                  {DEPENDENCY_DATA.governanceGates.map((gate, idx) => (
                    <div key={idx}>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block truncate">{gate.gate}</span>
                      <CheckCircle size={14} className="text-emerald-600 mx-auto my-1" />
                      <span className="text-[9.5px] font-bold text-emerald-700 block">{gate.status}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-800">Exception Center</h4>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">{DEPENDENCY_DATA.exceptionCenter.totalExceptions} Total</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">Active</span>
                      <span className="font-extrabold text-amber-600">{DEPENDENCY_DATA.exceptionCenter.active}</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">Acknowledged</span>
                      <span className="font-bold text-slate-800">{DEPENDENCY_DATA.exceptionCenter.acknowledged}</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">Resolved</span>
                      <span className="font-bold text-emerald-700">{DEPENDENCY_DATA.exceptionCenter.resolved}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Dependency Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Dependency Activity</h4>
                <AnalyticsTable data={DEPENDENCY_DATA.recentActivity} columns={activityCols} itemsPerPage={5} />
              </div>
            </div>

          </div>

        </div>

        {/* 11. RIGHT-SIDE CONTEXTUAL SUMMARY & FINAL ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Dependency Health Score */}
          <AnalyticsPanel number="" title="A. Dependency Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={DEPENDENCY_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {DEPENDENCY_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5">Overall Health &bull; Updated {DEPENDENCY_DATA.rightPanel.lastUpdated}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Dependency Summary */}
          <AnalyticsPanel number="" title="B. Dependency Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Registered</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.rightPanel.dependencySummary.registered}</span></div>
              <div className="flex justify-between text-slate-600"><span>Critical</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.rightPanel.dependencySummary.critical}</span></div>
              <div className="flex justify-between text-slate-600"><span>Warning</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.rightPanel.dependencySummary.warning}</span></div>
              <div className="flex justify-between text-slate-600"><span>Blocked</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.rightPanel.dependencySummary.blocked}</span></div>
              <div className="flex justify-between text-slate-600"><span>Healthy</span><span className="font-bold text-emerald-700">{DEPENDENCY_DATA.rightPanel.dependencySummary.healthy}</span></div>
              <div className="flex justify-between text-slate-600"><span>Pending Reviews</span><span className="font-bold text-slate-800">{DEPENDENCY_DATA.rightPanel.dependencySummary.pendingReviews}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Compatibility Summary */}
          <AnalyticsPanel number="" title="C. Compatibility Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Fully Compatible</span><span className="font-bold text-emerald-700">{DEPENDENCY_DATA.rightPanel.compatibilitySummary.fullyCompatible}</span></div>
              <div className="flex justify-between text-slate-600"><span>Partially Compatible</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.rightPanel.compatibilitySummary.partiallyCompatible}</span></div>
              <div className="flex justify-between text-slate-600"><span>Incompatible</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.rightPanel.compatibilitySummary.incompatible}</span></div>
              <div className="flex justify-between text-slate-600"><span>Unknown</span><span className="font-semibold text-slate-500">{DEPENDENCY_DATA.rightPanel.compatibilitySummary.unknown}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Impact Summary */}
          <AnalyticsPanel number="" title="D. Impact Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Production Blocks</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.rightPanel.impactSummary.productionBlocks}</span></div>
              <div className="flex justify-between text-slate-600"><span>High Impact</span><span className="font-bold text-rose-600">{DEPENDENCY_DATA.rightPanel.impactSummary.highImpact}</span></div>
              <div className="flex justify-between text-slate-600"><span>Medium Impact</span><span className="font-bold text-amber-600">{DEPENDENCY_DATA.rightPanel.impactSummary.mediumImpact}</span></div>
              <div className="flex justify-between text-slate-600"><span>Low Impact</span><span className="font-semibold text-slate-700">{DEPENDENCY_DATA.rightPanel.impactSummary.lowImpact}</span></div>
              <div className="flex justify-between text-slate-600"><span>Release Impacted</span><span className="font-bold text-slate-900">{DEPENDENCY_DATA.rightPanel.impactSummary.releaseImpacted}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="E. Quick Queues">
            <div className="space-y-1.5 text-xs">
              {DEPENDENCY_DATA.rightPanel.quickQueues.map((item, idx) => (
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
              <h4 className="text-xs font-bold text-white">Recommended Next Action</h4>
              <button className="text-white/60 hover:text-white"><XCircle size={14} /></button>
            </div>
            <ul className="text-[10.5px] text-rose-100 space-y-1 mb-3 leading-tight">
              {DEPENDENCY_DATA.rightPanel.recommendedNextAction.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
            <button
              onClick={() => handleAction("View Action Plan")}
              className="w-full py-1 bg-white hover:bg-slate-100 text-rose-950 text-xs font-extrabold rounded transition-colors cursor-pointer text-center"
            >
              View Action Plan
            </button>
          </div>

          {/* G. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="G. Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Run Compatibility Validation")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Run Compatibility Validation
              </button>
              <button
                onClick={() => handleAction("Resolve Version Conflicts")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Resolve Version Conflicts
              </button>
              <button
                onClick={() => handleAction("Review Upgrade Readiness")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Upgrade Readiness
              </button>
              <button
                onClick={() => handleAction("Review Blocking Dependencies")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Blocking Dependencies
              </button>
              <button
                onClick={() => handleAction("Review Exceptions")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Exceptions
              </button>
              <button
                onClick={() => handleAction("Generate Change Impact")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Generate Change Impact
              </button>
              <button
                onClick={() => handleAction("Export Dependency Map")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Dependency Map
              </button>
              <button
                onClick={() => handleAction("Open Dependency Audit")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Open Dependency Audit
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
