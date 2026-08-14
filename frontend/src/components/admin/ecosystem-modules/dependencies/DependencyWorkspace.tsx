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
import { DependencyNetworkGraph } from "./DependencyNetworkGraph";
import { SelectedDependencyDetail } from "./SelectedDependencyDetail";
import { DependencyRegistry } from "./DependencyRegistry";
import { DEPENDENCY_MAP_DATA } from "@/data/ecosystem-modules/dependencyMapData";

export function DependencyWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dependency Overview");
  const [selectedTenant, setSelectedTenant] = useState(DEPENDENCY_DATA.contextFilters.tenant);
  const [selectedBU, setSelectedBU] = useState(DEPENDENCY_DATA.contextFilters.businessUnit);
  const [selectedEnv, setSelectedEnv] = useState(DEPENDENCY_DATA.contextFilters.environment);

  const [selectedDependency, setSelectedDependency] = useState({
    from: "Pricing Engine (Capability)",
    to: "Payment Gateway (External)",
    type: "External Service Dependency",
    relationship: "Required" as any,
    direction: "Outbound",

    criticality: "High" as any,
    version: "2.1.3 → 2.1.5",
    environment: "Production",
    status: "Warning" as any,

    compatibility: "Partial",
    lastValidated: "May 14, 2026, 10:15 AM",
  });
  const [selectedRegistryRowId, setSelectedRegistryRowId] = useState<string | undefined>("dep-002");
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>("pe");

  const handleClearAll = () => {
    setSelectedRegistryRowId(undefined);
    setSelectedNodeId(undefined);
    setSelectedDependency({
      from: "All Modules",
      to: "All Services",
      type: "Ecosystem Topology",
      relationship: "Required" as any,
      direction: "Bidirectional",
      criticality: "Low" as any,
      version: "All Versions",
      environment: "Production",
      status: "Compatible" as any,
      compatibility: "100%",
      lastValidated: "May 14, 2026, 10:15 AM",
    });
  };

  const handleRegistryRowClick = (row: any) => {
    setSelectedRegistryRowId(row.id);
    setSelectedDependency({
      from: `${row.fromModule} (${row.fromType})`,
      to: `${row.toModuleService} (${row.toType})`,
      type: row.toType === 'External' ? 'External Service Dependency' : row.toType === 'Shared' ? 'Shared Service Dependency' : 'Module Dependency',
      relationship: row.status === 'Required' ? 'Required' : 'Optional',
      direction: 'Outbound',
      criticality: row.criticality,
      version: row.version,
      environment: 'Production',
      status: row.status,
      compatibility: String(row.compatibility),
      lastValidated: row.lastValidated,
    });
    
    // Find matching node ID by label
    const match = DEPENDENCY_MAP_DATA.capabilities.find(c => c.label === row.fromModule) ||
                  DEPENDENCY_MAP_DATA.sourceModules.find(m => m.label === row.fromModule) ||
                  DEPENDENCY_MAP_DATA.sharedServices.find(s => s.label === row.toModuleService) ||
                  DEPENDENCY_MAP_DATA.externalServices.find(e => e.label === row.toModuleService);
    if (match) {
      setSelectedNodeId(match.id);
    }
  };

  const handleNodeClick = (node: any) => {
    setSelectedNodeId(node.id);
    
    // Find a registry row where fromModule matches the node label or toModuleService matches the node label
    const match = DEPENDENCY_DATA.registry.find(r => r.fromModule === node.label || r.toModuleService === node.label);
    if (match) {
      setSelectedRegistryRowId(match.id);
      setSelectedDependency({
        from: `${match.fromModule} (${match.fromType})`,
        to: `${match.toModuleService} (${match.toType})`,
        type: match.toType === 'External' ? 'External Service Dependency' : match.toType === 'Shared' ? 'Shared Service Dependency' : 'Module Dependency',
        relationship: match.status === 'Required' ? 'Required' : 'Optional',
        direction: 'Outbound',
        criticality: match.criticality,
        version: match.version,
        environment: 'Production',
        status: match.status,
        compatibility: String(match.compatibility),
        lastValidated: match.lastValidated,
      });
    } else {
      setSelectedRegistryRowId(undefined);
      setSelectedDependency({
        from: `${node.label} (${node.type})`,
        to: "N/A",
        type: node.type === 'external' ? 'External Service' : node.type === 'shared' ? 'Shared Service' : 'Ecosystem Module',
        relationship: 'Required',
        direction: 'Inbound / Outbound',
        criticality: 'Medium',
        version: 'v1.0.0',
        environment: 'Production',
        status: node.status === 'warning' ? 'Warning' : 'Compatible',
        compatibility: '100%',
        lastValidated: 'May 14, 2026, 10:15 AM',
      });
    }
  };

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
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Environment</span>
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
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Environment Type</span>
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

          {/* 6. MAIN SECTION 1: Two-Column Layout (Ecosystem Map + Sidebar, Registry) */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-4 items-start">

            {/* LEFT AREA: Ecosystem Map stacked above Registry */}
            <div className="flex flex-col gap-4">
              {/* Ecosystem Dependency Map */}
              <div className="min-h-[380px]">
                <DependencyNetworkGraph
                  sourceModules={DEPENDENCY_MAP_DATA.sourceModules}
                  capabilities={DEPENDENCY_MAP_DATA.capabilities}
                  sharedServices={DEPENDENCY_MAP_DATA.sharedServices}
                  externalServices={DEPENDENCY_MAP_DATA.externalServices}
                  onNodeClick={handleNodeClick}
                  selectedNodeId={selectedNodeId}
                />
              </div>

              {/* Dependency Registry Table (below map) */}
              <DependencyRegistry
                data={DEPENDENCY_DATA.registry}
                onApplyFilters={() => handleAction("Apply Filters")}
                onClearAll={handleClearAll}
                onSaveView={() => handleAction("Save View")}
                onRefresh={() => handleAction("Refresh")}
                onExport={() => handleAction("Export")}
                onRowClick={handleRegistryRowClick}
                selectedRowId={selectedRegistryRowId}
              />
            </div>

            {/* RIGHT SIDEBAR: Dependency Health Panel */}
            <div className="flex flex-col h-full">
              <SelectedDependencyDetail
                from={selectedDependency.from}
                to={selectedDependency.to}
                type={selectedDependency.type}
                relationship={selectedDependency.relationship}
                direction={selectedDependency.direction}
                criticality={selectedDependency.criticality}
                version={selectedDependency.version}
                environment={selectedDependency.environment}
                status={selectedDependency.status}
                compatibility={selectedDependency.compatibility}
                lastValidated="May 14, 2026"
                onViewDetails={() => handleAction("View Dependency Details")}
              />
            </div>
          </div>

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
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Upgrade Readiness</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">Ready</span>
                  <span className="font-semibold text-slate-800">
                    12 <span className="text-emerald-600 font-bold ml-2">57%</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Needs Upgrade</span>
                  <span className="font-semibold text-slate-800">
                    7 <span className="text-slate-400 font-medium ml-2">33%</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-bold">Blocked</span>
                  <span className="font-semibold text-slate-800">
                    2 <span className="text-slate-400 font-medium ml-2">10%</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Dependencies */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Circular Dependencies</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Detected</span>
                  <span className="font-bold text-slate-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Critical</span>
                  <span className="font-bold text-rose-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Resolved</span>
                  <span className="font-bold text-emerald-700">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Pending</span>
                  <span className="font-bold text-amber-600">1</span>
                </div>
              </div>
            </div>

            {/* Orphaned Services */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Orphaned Services</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Orphaned</span>
                  <span className="font-bold text-slate-900">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">High Impact</span>
                  <span className="font-bold text-rose-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Medium Impact</span>
                  <span className="font-bold text-amber-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Low Impact</span>
                  <span className="font-bold text-emerald-700">1</span>
                </div>
              </div>
            </div>

            {/* Blocking Dependencies */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Blocking Dependencies</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Blocking</span>
                  <span className="font-bold text-rose-600">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">By External Service</span>
                  <span className="font-bold text-slate-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">By Module</span>
                  <span className="font-bold text-slate-900">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">By Version</span>
                  <span className="font-bold text-slate-900">1</span>
                </div>
              </div>
            </div>

            {/* Impact & Change Analysis */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Impact &amp; Change Analysis</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Changes Pending</span>
                  <span className="font-bold text-slate-900">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">High Impact</span>
                  <span className="font-bold text-rose-600">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Medium Impact</span>
                  <span className="font-bold text-amber-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Low Impact</span>
                  <span className="font-bold text-emerald-700">4</span>
                </div>
              </div>
            </div>

            {/* Release Impact Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Release Impact Summary</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Next Release Impacted</span>
                  <span className="font-bold text-slate-900">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Modules Impacted</span>
                  <span className="font-bold text-slate-900">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Capabilities Impacted</span>
                  <span className="font-bold text-slate-900">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Services Impacted</span>
                  <span className="font-bold text-slate-900">9</span>
                </div>
              </div>
            </div>

            {/* Environment Drift */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Environment Drift</h4>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Drift Items</span>
                  <span className="font-bold text-slate-900">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Critical Drift</span>
                  <span className="font-bold text-rose-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Warning Drift</span>
                  <span className="font-bold text-amber-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Info Drift</span>
                  <span className="font-bold text-blue-600">1</span>
                </div>
              </div>
            </div>

            {/* Dependency Health Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2">Dependency Health Matrix</h4>
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1 text-[10px] flex-1">
                  <div className="text-[9px] font-semibold text-slate-400 mb-1">Overall Health</div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold">Healthy</span>
                    <span className="font-bold text-slate-800">162</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-600 font-bold">Warning</span>
                    <span className="font-bold text-slate-800">16</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-bold">Critical</span>
                    <span className="font-bold text-slate-800">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rose-600 font-bold">Blocked</span>
                    <span className="font-bold text-slate-800">6</span>
                  </div>
                </div>

                <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center self-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-600"
                      strokeWidth="3.5"
                      strokeDasharray="94, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-800">
                    94%
                  </div>
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
                <AnalyticsTable data={DEPENDENCY_DATA.ownership} columns={ownershipCols} />

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

      </div>
    </AnalyticsShell>
  );
}
