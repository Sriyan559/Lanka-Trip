"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, GitCommit, Search, Filter, Save, 
  Download, DownloadCloud, AlertTriangle, Play, FileText, Check, ShieldAlert, 
  Zap, Globe, Package, Link as LinkIcon, Settings, Grid, Users, Layers, 
  ArrowRight, ShieldCheck, CheckSquare, XCircle, AlertCircle, TrendingUp, 
  Activity, ArrowLeft, Info, Eye, Shield, Lock, FileCode, ExternalLink
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { BEAUTY_WELLNESS_DATA, ModuleIncludedItem, CapabilityBundleItem, CapabilityConfigItem, RequiredOptionalRuleItem, InheritanceConflictItem, ModuleCompatibilityItem, DependencyValidationItem, CountryApplicabilityItem, CountryRestrictionItem, TenantUsageItem } from "@/data/ecosystem-modules/beautyWellnessData";

// Sparkline SVG Helper
const MiniSparkline = ({ data, color = "#10b981" }: { data: number[]; color?: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 18;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

export function BeautyWellnessWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Pack Overview");

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const handleBack = () => {
    router.push("/admin/ecosystem-modules/sector-packs");
  };

  // Columns Configuration for DataTables
  const modulesCols: ColumnDef<ModuleIncludedItem>[] = [
    { header: "Module ID", accessorKey: "id", align: "left", renderCell: (row) => <span className="font-mono text-[10px] text-slate-500">{row.id}</span> },
    { header: "Module Name", accessorKey: "name", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.name}</span> },
    { header: "Type", accessorKey: "type", align: "center", renderCell: (row) => <span className="text-slate-600 font-medium">{row.type}</span> },
    { header: "Requirement", accessorKey: "requirement", align: "center", renderCell: (row) => <span className={`font-semibold ${row.requirement === 'Required' ? 'text-emerald-700' : 'text-slate-500'}`}>{row.requirement}</span> },
    { header: "Min Version", accessorKey: "minVersion", align: "center" },
    { header: "Max Version", accessorKey: "maxVersion", align: "center" },
    { header: "Current Version", accessorKey: "currentVersion", align: "center" },
    { header: "Target Version", accessorKey: "targetVersion", align: "center" },
    { header: "Compatibility", accessorKey: "compatibility", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.compatibility}</span> },
    { header: "Security", accessorKey: "security", align: "center", renderCell: (row) => <span className="text-emerald-600 font-semibold">{row.security}</span> },
    { header: "Compliance", accessorKey: "compliance", align: "center", renderCell: (row) => <span className="text-emerald-600 font-semibold">{row.compliance}</span> },
    { header: "Dual-Channel", accessorKey: "dualChannelReady", align: "center", renderCell: (row) => <span className="text-emerald-600 font-bold">{row.dualChannelReady ? "Yes" : "No"}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const bundlesCols: ColumnDef<CapabilityBundleItem>[] = [
    { header: "Bundle Code", accessorKey: "code", align: "left", renderCell: (row) => <span className="font-mono text-[10px] text-slate-500">{row.code}</span> },
    { header: "Bundle Name", accessorKey: "name", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.name}</span> },
    { header: "Capabilities", accessorKey: "capabilitiesCount", align: "center" },
    { header: "Required", accessorKey: "requiredCount", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.requiredCount}</span> },
    { header: "Optional", accessorKey: "optionalCount", align: "center", renderCell: (row) => <span className="text-slate-500">{row.optionalCount}</span> },
    { header: "Parent Modules", accessorKey: "parentModules", align: "center" },
    { header: "Override Policy", accessorKey: "overridePolicy", align: "center", renderCell: (row) => <span className="text-slate-600 font-medium">{row.overridePolicy}</span> },
    { header: "Health", accessorKey: "health", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.health}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const capabilityCols: ColumnDef<CapabilityConfigItem>[] = [
    { header: "Reference", accessorKey: "reference", align: "left", renderCell: (row) => <span className="font-mono text-[10px] text-slate-500">{row.reference}</span> },
    { header: "Capability Name", accessorKey: "name", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.name}</span> },
    { header: "Parent Module", accessorKey: "parentModule", align: "left", renderCell: (row) => <span className="text-slate-600">{row.parentModule}</span> },
    { header: "Bundle", accessorKey: "bundle", align: "left", renderCell: (row) => <span className="text-slate-600">{row.bundle}</span> },
    { header: "Requirement", accessorKey: "requirement", align: "center", renderCell: (row) => <span className={`font-semibold ${row.requirement === 'Required' ? 'text-emerald-700' : 'text-slate-500'}`}>{row.requirement}</span> },
    { header: "Default State", accessorKey: "defaultState", align: "center" },
    { header: "Tenant Override", accessorKey: "tenantOverride", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Channel Override", accessorKey: "channelOverride", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Pack Required", accessorKey: "packRequired", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.packRequired ? "Yes" : "No"}</span> },
    { header: "Feature Flag", accessorKey: "featureFlag", align: "center" },
    { header: "Country", accessorKey: "country", align: "center" },
    { header: "Dependencies", accessorKey: "dependencyCount", align: "center" },
    { header: "Risk", accessorKey: "risk", align: "center", renderCell: (row) => <span className={row.risk === 'High' ? 'text-rose-600 font-bold' : row.risk === 'Medium' ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'}>{row.risk}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const conflictsCols: ColumnDef<InheritanceConflictItem>[] = [
    { header: "Component", accessorKey: "component", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.component}</span> },
    { header: "Parent Rule", accessorKey: "parentRule", align: "center" },
    { header: "This Pack Rule", accessorKey: "thisPackRule", align: "center" },
    { header: "Conflict", accessorKey: "conflict", align: "center", renderCell: (row) => <span className="font-bold text-rose-600">{row.conflict}</span> },
    { header: "Severity", accessorKey: "severity", align: "center", renderCell: (row) => <span className={row.severity === 'High' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{row.severity}</span> },
    { header: "Blocking", accessorKey: "blocking", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.blocking ? "Yes" : "No"}</span> },
    { header: "Owner", accessorKey: "owner", align: "center" },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px]">{row.status}</span> },
  ];

  const moduleCompatCols: ColumnDef<ModuleCompatibilityItem>[] = [
    { header: "Module", accessorKey: "module", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.module}</span> },
    { header: "Min Version", accessorKey: "minVersion", align: "center" },
    { header: "Current Version", accessorKey: "currentVersion", align: "center" },
    { header: "Target Version", accessorKey: "targetVersion", align: "center" },
    { header: "Compatibility", accessorKey: "compatibility", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.compatibility}</span> },
    { header: "Breaking Change", accessorKey: "breakingChange", align: "center", renderCell: (row) => <span className="text-slate-500">{row.breakingChange ? "Yes" : "No"}</span> },
    { header: "Upgrade Required", accessorKey: "upgradeRequired", align: "center", renderCell: (row) => <span className={row.upgradeRequired ? 'text-amber-600 font-bold' : 'text-slate-500'}>{row.upgradeRequired ? "Yes" : "No"}</span> },
    { header: "Tenant Impact", accessorKey: "tenantImpact", align: "center" },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const dependencyCols: ColumnDef<DependencyValidationItem>[] = [
    { header: "Component", accessorKey: "component", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.component}</span> },
    { header: "Dependency Type", accessorKey: "dependencyType", align: "center" },
    { header: "Required By", accessorKey: "requiredBy", align: "left" },
    { header: "Required Version", accessorKey: "requiredVersion", align: "center" },
    { header: "Available Version", accessorKey: "availableVersion", align: "center" },
    { header: "Req/Opt", accessorKey: "reqOpt", align: "center" },
    { header: "Blocking", accessorKey: "blocking", align: "center", renderCell: (row) => <span className="text-slate-500">{row.blocking ? "Yes" : "No"}</span> },
    { header: "Health", accessorKey: "health", align: "center", renderCell: (row) => <span className="text-emerald-600 font-bold">{row.health}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <span className="text-emerald-600 font-bold">{row.status}</span> },
  ];

  const countryCols: ColumnDef<CountryApplicabilityItem>[] = [
    { header: "Country", accessorKey: "country", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.country}</span> },
    { header: "Enabled", accessorKey: "enabled", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Legal Ready", accessorKey: "legalReady", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Compliance Ready", accessorKey: "complianceReady", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Localization Ready", accessorKey: "localizationReady", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Currency Ready", accessorKey: "currencyReady", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Data Residency Ready", accessorKey: "dataResidencyReady", align: "center", renderCell: (row) => <Check size={12} className="text-emerald-600 inline" /> },
    { header: "Module Coverage", accessorKey: "moduleCoverage", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.moduleCoverage}</span> },
    { header: "Capability Coverage", accessorKey: "capabilityCoverage", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.capabilityCoverage}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${row.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{row.status}</span> },
  ];

  const restrictionsCols: ColumnDef<CountryRestrictionItem>[] = [
    { header: "Country", accessorKey: "country", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.country}</span> },
    { header: "Module / Capability", accessorKey: "moduleCapability", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.moduleCapability}</span> },
    { header: "Restriction Type", accessorKey: "restrictionType", align: "center", renderCell: (row) => <span className="text-rose-600 font-bold">{row.restrictionType}</span> },
    { header: "Default Pack Data", accessorKey: "defaultPackData", align: "center" },
    { header: "Country State", accessorKey: "countryState", align: "center" },
    { header: "Reason", accessorKey: "reason", align: "left" },
    { header: "Effective Date", accessorKey: "effectiveDate", align: "center" },
    { header: "Owner", accessorKey: "owner", align: "center" },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const tenantCols: ColumnDef<TenantUsageItem>[] = [
    { header: "Tenant", accessorKey: "tenant", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.tenant}</span> },
    { header: "Ecosystem", accessorKey: "ecosystem", align: "left" },
    { header: "Pack Version", accessorKey: "packVersion", align: "center" },
    { header: "Assigned Modules", accessorKey: "assignedModules", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.assignedModules}</span> },
    { header: "Enabled Capabilities", accessorKey: "enabledCapabilities", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.enabledCapabilities}</span> },
    { header: "Overrides", accessorKey: "overrides", align: "center" },
    { header: "Restrictions", accessorKey: "restrictions", align: "center" },
    { header: "Adoption", accessorKey: "adoption", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.adoption}</span> },
    { header: "Health", accessorKey: "health", align: "center", renderCell: (row) => <span className="text-emerald-600 font-semibold">{row.health}</span> },
    { header: "Readiness", accessorKey: "readiness", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.readiness}</span> },
    { header: "Last Evaluated", accessorKey: "lastEvaluated", align: "right", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.lastEvaluated}</span> },
    { header: "Status", accessorKey: "status", align: "right", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header & Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <button 
            type="button" 
            onClick={handleBack}
            className="flex items-center gap-1 text-xs text-burgundy font-semibold hover:underline mb-1 cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Sector Packs
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {BEAUTY_WELLNESS_DATA.headerInfo.visibleTitle}
            </h1>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded">
              {BEAUTY_WELLNESS_DATA.headerInfo.version}
            </span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> {BEAUTY_WELLNESS_DATA.headerInfo.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            {BEAUTY_WELLNESS_DATA.headerInfo.description}
          </p>
        </div>

        {/* Top-Right Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("Create New Version")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create New Version
          </button>
          <button
            type="button"
            onClick={() => handleAction("Validate Compatibility")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Validate Compatibility
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
            onClick={() => handleAction("Review Release Readiness")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Release Readiness
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Pack Definition")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download size={11} /> Export Pack Definition
          </button>
        </div>
      </div>

      {/* 2. Pack Information Header Grid */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-15 gap-2 text-xs divide-x divide-slate-100">
          {BEAUTY_WELLNESS_DATA.metadataGrid.map((item, idx) => (
            <div key={idx} className={`px-2 min-w-0 ${idx === 0 ? 'pl-0' : ''}`}>
              <span className="text-[9px] font-bold text-slate-400 uppercase block truncate">{item.label}</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[11px] font-extrabold text-slate-800 truncate block">{item.value}</span>
                {item.badge && (
                  <span className="px-1 py-0.2 bg-emerald-100 text-emerald-800 text-[8.5px] font-bold rounded">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.subtext && <span className="text-[8.5px] text-slate-400 block">{item.subtext}</span>}
              {item.progress && (
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Status Summary Row (12 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-2 min-w-0">
        {BEAUTY_WELLNESS_DATA.statusSummary.map((card, idx) => (
          <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200/90 shadow-xs flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${card.tone === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <CheckCircle size={14} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-slate-400 uppercase block truncate">{card.label}</span>
              <span className="text-[11px] font-extrabold text-slate-800 truncate block leading-tight">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Primary KPI Cards Row (10 Cards with Mini Sparklines) */}
      <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 min-w-0">
        {BEAUTY_WELLNESS_DATA.primaryKpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight block truncate mb-1">{kpi.label}</span>
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-base font-black text-slate-900 leading-none">{kpi.value}</span>
                <MiniSparkline data={kpi.sparkline} />
              </div>
            </div>
            <span className="text-[9px] font-semibold text-emerald-700 block border-t border-slate-100 pt-1 mt-1 truncate">{kpi.status}</span>
          </div>
        ))}
      </div>

      {/* 5. Secondary KPI Cards Row (8 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2 min-w-0">
        {BEAUTY_WELLNESS_DATA.secondaryKpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col justify-between text-center items-center">
            <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight block truncate mb-1">{kpi.label}</span>
            <span className={`text-base font-extrabold leading-none ${kpi.tone === 'success' ? 'text-emerald-700' : kpi.tone === 'warning' ? 'text-amber-600' : 'text-slate-800'}`}>{kpi.value}</span>
            <span className="text-[9px] font-medium text-slate-400 block border-t border-slate-100 pt-1 mt-1 truncate w-full">{kpi.status}</span>
          </div>
        ))}
      </div>

      {/* 6. Horizontal Tab Navigation Bar (16 Tabs) */}
      <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1 text-xs whitespace-nowrap min-w-max">
          {BEAUTY_WELLNESS_DATA.tabs.map((tab) => (
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

      {/* 7. Released Version Read-Only Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-amber-600 shrink-0" />
          <div className="text-xs text-amber-900">
            <span className="font-extrabold uppercase mr-1">Released Version — Read Only</span>
            <span>Released versions cannot be edited in place. Create a new draft version to change composition, capability requirements, dependency constraints or country applicability.</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleAction("Create New Version from Banner")}
          className="px-3 py-1 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shrink-0 shadow-xs transition-colors cursor-pointer"
        >
          Create New Version
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">

          {/* 8. MAIN DASHBOARD CONTENT GRID */}

          {/* 8.1 Pack Composition Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">1. Pack Composition Overview</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Parent Pack</span>
                    <span className="font-semibold text-slate-900">{BEAUTY_WELLNESS_DATA.compositionOverview.parentPack}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Modules Included</span>
                    <span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.compositionOverview.modulesIncluded}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Capability Bundles</span>
                    <span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.compositionOverview.capabilityBundles}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Required Capabilities</span>
                    <span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.compositionOverview.requiredCapabilities}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Optional Capabilities</span>
                    <span className="font-semibold text-slate-700">{BEAUTY_WELLNESS_DATA.compositionOverview.optionalCapabilities}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Required Dependencies</span>
                    <span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.compositionOverview.requiredDependencies}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Countries Supported</span>
                    <span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.compositionOverview.countriesSupported}</span>
                  </div>
                </div>
              </div>

              {/* Composition Visual Diagram */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col items-center gap-1 text-[9.5px]">
                <div className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold">General Retail Core</div>
                <div className="h-1.5 w-px bg-slate-300"></div>
                <div className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold border border-purple-200">Beauty &amp; Wellness <span className="text-[8px]">v2.5.1</span></div>
                <div className="h-1.5 w-px bg-slate-300"></div>
                <div className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">Modules / Bundles / Capabilities</div>
              </div>
            </div>

            {/* 8.2 Modules Included (16) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">2. Modules Included ({BEAUTY_WELLNESS_DATA.modulesIncluded.length})</h4>
                  <button onClick={() => handleAction("View all modules")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all modules <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.modulesIncluded} columns={modulesCols} itemsPerPage={5} />
              </div>
            </div>
          </div>

          {/* 8.3 Capability Bundles (5) & 8.4 Capability Configuration (Sample) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Capability Bundles */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">3. Capability Bundles ({BEAUTY_WELLNESS_DATA.capabilityBundles.length})</h4>
                  <button onClick={() => handleAction("View all bundles")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all bundles <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.capabilityBundles} columns={bundlesCols} itemsPerPage={5} />
              </div>
            </div>

            {/* Capability Configuration */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">4. Capability Configuration (Sample)</h4>
                  <button onClick={() => handleAction("View all capabilities")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all capabilities <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.capabilityConfiguration} columns={capabilityCols} itemsPerPage={5} />
              </div>
            </div>
          </div>

          {/* 8.5 Required / Optional Rules Matrix */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-3">5. Required / Optional Rules Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200 text-[11px]">
                      <th className="pb-2 font-semibold"></th>
                      <th className="pb-2 font-semibold text-center">Required</th>
                      <th className="pb-2 font-semibold text-center">Optional</th>
                      <th className="pb-2 font-semibold text-center">
                        Tenant Override
                        <span className="block text-[10px] text-emerald-600 font-bold">Allowed</span>
                      </th>
                      <th className="pb-2 font-semibold text-center">
                        BU Override
                        <span className="block text-[10px] text-emerald-600 font-bold">Allowed</span>
                      </th>
                      <th className="pb-2 font-semibold text-center">
                        Channel Override
                        <span className="block text-[10px] text-emerald-600 font-bold">Allowed</span>
                      </th>
                      <th className="pb-2 font-semibold text-center">Can Restrict</th>
                      <th className="pb-2 font-semibold text-center">Can Promote Opt -&gt; Req</th>
                      <th className="pb-2 font-semibold text-center">Prod Required</th>
                      <th className="pb-2 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {BEAUTY_WELLNESS_DATA.requiredOptionalRules.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 font-semibold text-slate-800">{row.bundle}</td>
                        <td className="py-2.5 text-center">
                          {row.required ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.optional ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.tenantOverrideAllowed ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.buOverrideAllowed ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.channelOverrideAllowed ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.canRestrict ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.canPromote ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-center">
                          {row.prodRequired ? <Check size={16} className="text-emerald-600 font-bold inline" /> : <span className="text-rose-600 font-bold text-sm">X</span>}
                        </td>
                        <td className="py-2.5 text-right font-bold text-emerald-600 italic">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          {/* 8.6 Inheritance Topology */}
          {/* Inheritance Topology & Delta & Conflicts */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">6. Inheritance Topology</h4>
                {/* Topology Tree Flow */}
                <div className="flex items-center justify-between gap-1 text-[9.5px] bg-slate-50 p-2 rounded border border-slate-100 text-center font-semibold mb-3">
                  <div className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 shadow-2xs">General Retail Core</div>
                  <ArrowRight size={10} className="text-slate-400" />
                  <div className="px-2 py-1 bg-purple-50 border border-purple-200 rounded text-purple-900 shadow-2xs">Enterprise-wide</div>
                  <ArrowRight size={10} className="text-slate-400" />
                  <div className="px-2 py-1 bg-blue-50 border border-blue-200 rounded text-blue-900 shadow-2xs">Tenant Specific Extension (Optional)</div>
                  <ArrowRight size={10} className="text-slate-400" />
                  <div className="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 shadow-2xs">Tenant / Ecosystem</div>
                  <ArrowRight size={10} className="text-slate-400" />
                  <div className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-slate-700 shadow-2xs">Business Unit / Channel</div>
                </div>

                {/* 6a. Inheritance Delta Metrics */}
                <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">6a. Changes from Parent / Inheritance Delta</span>
                <div className="grid grid-cols-6 gap-1 text-center py-1 bg-slate-50/50 rounded mb-3 border border-slate-100">
                  <div><span className="text-[8.5px] text-slate-400 block uppercase">Added Modules</span><span className="font-bold text-slate-800 text-xs">{BEAUTY_WELLNESS_DATA.inheritanceDelta.addedModules}</span></div>
                  <div><span className="text-[8.5px] text-slate-400 block uppercase">Added Capabilities</span><span className="font-bold text-slate-800 text-xs">{BEAUTY_WELLNESS_DATA.inheritanceDelta.addedCapabilities}</span></div>
                  <div><span className="text-[8.5px] text-slate-400 block uppercase">Requirement Changes</span><span className="font-bold text-slate-800 text-xs">{BEAUTY_WELLNESS_DATA.inheritanceDelta.requirementChanges}</span></div>
                  <div><span className="text-[8.5px] text-slate-400 block uppercase">Restricted Defaults</span><span className="font-bold text-slate-800 text-xs">{BEAUTY_WELLNESS_DATA.inheritanceDelta.restrictedDefaults}</span></div>
                  <div><span className="text-[8.5px] text-slate-400 block uppercase">Country Constraints</span><span className="font-bold text-slate-800 text-xs">{BEAUTY_WELLNESS_DATA.inheritanceDelta.countryConstraints}</span></div>
                  <div><span className="text-[8.5px] text-slate-400 block uppercase">Override Policy</span><span className="font-bold text-slate-800 text-xs">{BEAUTY_WELLNESS_DATA.inheritanceDelta.overridePolicy}</span></div>
                </div>

                {/* 7. Inheritance Conflicts */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase block">7. Inheritance Conflicts ({BEAUTY_WELLNESS_DATA.inheritanceConflicts.length})</span>
                  <button onClick={() => handleAction("View all conflicts")} className="text-[9.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all conflicts <ArrowRight size={9} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.inheritanceConflicts} columns={conflictsCols} itemsPerPage={2} />
              </div>
            </div>
          </div>

          {/* 8.7 Module Compatibility & 8.8 Dependency Validation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Module Compatibility (Summary) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">8. Module Compatibility (Summary)</h4>
                  <button onClick={() => handleAction("View all modules")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all modules <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.moduleCompatibilitySummary} columns={moduleCompatCols} itemsPerPage={3} />
              </div>
            </div>

            {/* Dependency Validation (Summary) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">9. Dependency Validation (Summary)</h4>
                  <button onClick={() => handleAction("View Dependency Map")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View Dependency Map (EM08) <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.dependencyValidationSummary} columns={dependencyCols} itemsPerPage={4} />
              </div>
            </div>
          </div>

          {/* 8.9 Country Applicability & 8.10 Country Restrictions & 8.11 Tenant Usage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Country Applicability */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">10. Country Applicability ({BEAUTY_WELLNESS_DATA.countryApplicability.length})</h4>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.countryApplicability} columns={countryCols} itemsPerPage={6} />
              </div>
            </div>

            {/* Country Restrictions */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">11. Country Restrictions ({BEAUTY_WELLNESS_DATA.countryRestrictions.length})</h4>
                  <button onClick={() => handleAction("View all restrictions")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all restrictions <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.countryRestrictions} columns={restrictionsCols} itemsPerPage={2} />
              </div>
            </div>

            {/* Tenant Usage (Top Ten) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs md:col-span-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">12. Tenant Usage (Top Ten)</h4>
                  <button onClick={() => handleAction("View all tenants")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View all tenants <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={BEAUTY_WELLNESS_DATA.tenantUsage} columns={tenantCols} itemsPerPage={5} />
              </div>
            </div>
          </div>

        </div>

        {/* 9. RIGHT-SIDE CONTEXTUAL SUMMARY & CONTROLLED ACTIONS PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Pack Health Score */}
          <AnalyticsPanel number="" title="A. Pack Health Score">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={BEAUTY_WELLNESS_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {BEAUTY_WELLNESS_DATA.rightPanel.healthLabel}
              </div>
            </div>
          </AnalyticsPanel>

          {/* B. Pack Summary */}
          <AnalyticsPanel number="" title="B. Pack Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Current Version</span><span className="font-semibold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.currentVersion}</span></div>
              <div className="flex justify-between text-slate-600"><span>Target Version</span><span className="font-semibold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.targetVersion}</span></div>
              <div className="flex justify-between text-slate-600"><span>Modules</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.modules}</span></div>
              <div className="flex justify-between text-slate-600"><span>Capability Bundles</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.capabilityBundles}</span></div>
              <div className="flex justify-between text-slate-600"><span>Required Capabilities</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.requiredCapabilities}</span></div>
              <div className="flex justify-between text-slate-600"><span>Optional Capabilities</span><span className="font-semibold text-slate-700">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.optionalCapabilities}</span></div>
              <div className="flex justify-between text-slate-600"><span>Dependencies</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.dependencies}</span></div>
              <div className="flex justify-between text-slate-600"><span>Countries Supported</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.packSummary.countriesSupported}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Release Summary */}
          <AnalyticsPanel number="" title="C. Release Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Release Readiness</span><span className="font-bold text-emerald-700">{BEAUTY_WELLNESS_DATA.rightPanel.releaseSummary.releaseReadiness}</span></div>
              <div className="flex justify-between text-slate-600"><span>Target Release</span><span className="font-semibold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.releaseSummary.targetRelease}</span></div>
              <div className="flex justify-between text-slate-600"><span>Pending Approvals</span><span className="font-bold text-amber-600">{BEAUTY_WELLNESS_DATA.rightPanel.releaseSummary.pendingApprovals}</span></div>
              <div className="flex justify-between text-slate-600"><span>Compatibility Risks</span><span className="font-bold text-amber-600">{BEAUTY_WELLNESS_DATA.rightPanel.releaseSummary.compatibilityRisks}</span></div>
              <div className="flex justify-between text-slate-600"><span>Breaking Changes</span><span className="font-semibold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.releaseSummary.breakingChanges}</span></div>
              <div className="flex justify-between text-slate-600"><span>Migration Required</span><span className="font-bold text-emerald-700">{BEAUTY_WELLNESS_DATA.rightPanel.releaseSummary.migrationRequired}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Tenant Impact */}
          <AnalyticsPanel number="" title="D. Tenant Impact">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Active Tenants</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.tenantImpact.activeTenants}</span></div>
              <div className="flex justify-between text-slate-600"><span>Affected by v2.6</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.tenantImpact.affectedByTarget}</span></div>
              <div className="flex justify-between text-slate-600"><span>Active Overrides</span><span className="font-bold text-slate-900">{BEAUTY_WELLNESS_DATA.rightPanel.tenantImpact.activeOverrides}</span></div>
              <div className="flex justify-between text-slate-600"><span>Expiring Overrides</span><span className="font-bold text-amber-600">{BEAUTY_WELLNESS_DATA.rightPanel.tenantImpact.expiringOverrides}</span></div>
              <div className="flex justify-between text-slate-600"><span>Tenants Requiring Review</span><span className="font-bold text-amber-600">{BEAUTY_WELLNESS_DATA.rightPanel.tenantImpact.tenantsRequiringReview}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="E. Quick Queues">
            <div className="space-y-1.5 text-xs">
              {BEAUTY_WELLNESS_DATA.rightPanel.quickQueues.map((item, idx) => (
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

          {/* F. Recommended Next Action Card */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-lg p-3 shadow-xs">
            <h4 className="text-xs font-bold text-emerald-900 mb-1">F. Recommended Next Action</h4>
            <p className="text-[11px] text-emerald-800 leading-snug mb-2">
              {BEAUTY_WELLNESS_DATA.rightPanel.recommendedNextAction.description}
            </p>
            <div className="flex items-center justify-between text-[10px] text-emerald-700 border-t border-emerald-200/60 pt-1.5 mb-2">
              <span>Owner: <strong className="font-bold">{BEAUTY_WELLNESS_DATA.rightPanel.recommendedNextAction.owner}</strong></span>
              <span>Due: <strong className="font-bold">{BEAUTY_WELLNESS_DATA.rightPanel.recommendedNextAction.dueDate}</strong></span>
            </div>
            <button
              onClick={() => handleAction("View Action Plan")}
              className="w-full py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition-colors cursor-pointer text-center"
            >
              View Action Plan
            </button>
          </div>

          {/* G. Controlled Actions */}
          <AnalyticsPanel number="" title="G. Controlled Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Review Release Readiness")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Review Release Readiness
              </button>
              <button
                onClick={() => handleAction("Create New Version")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Create New Version
              </button>
              <button
                onClick={() => handleAction("Validate Compatibility")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Validate Compatibility
              </button>
              <button
                onClick={() => handleAction("Review Dependencies")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Dependencies
              </button>
              <button
                onClick={() => handleAction("Review Country Readiness")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Country Readiness
              </button>
              <button
                onClick={() => handleAction("Review Tenant Impact")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Tenant Impact
              </button>
              <button
                onClick={() => handleAction("Review Overrides")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review Overrides
              </button>
              <button
                onClick={() => handleAction("Compare Versions")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Compare Versions
              </button>
              <button
                onClick={() => handleAction("View Audit History")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                View Audit History
              </button>
              <button
                onClick={() => handleAction("Export Pack Definition")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Pack Definition
              </button>
              <button
                onClick={() => handleAction("Request Deprecation")}
                className="w-full py-1 bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Request Deprecation
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
