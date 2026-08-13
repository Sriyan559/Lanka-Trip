"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, GitCommit, Search, Filter, Save, 
  Download, DownloadCloud, AlertTriangle, Play, FileText, Check, ShieldAlert, 
  Zap, Globe, Package, Link as LinkIcon, Settings, Grid, Users, Layers, 
  ArrowRight, ShieldCheck, CheckSquare, XCircle, AlertCircle, TrendingUp,
  Box, FileCheck, Network, User, Building, Languages, Ticket
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { SECTOR_PACK_DATA, SectorPackItem } from "@/data/ecosystem-modules/sectorPackData";

export function SectorPackWorkspace() {
  const router = useRouter();

  const handleCreateSectorPack = () => {
    console.log("Create Sector Pack");
  };

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const handleViewPack = (packKey: string) => {
    router.push(`/admin/ecosystem-modules/sector-packs/${packKey}`);
  };

  const renderKpiIcon = (icon: string) => {
    switch (icon) {
      case "box":
        return <Box size={16} className="text-blue-600" />;
      case "shield-check":
        return <ShieldCheck size={16} className="text-emerald-600" />;
      case "package":
        return <Package size={16} className="text-amber-600" />;
      case "file-text":
        return <FileText size={16} className="text-blue-600" />;
      case "file-check":
        return <FileCheck size={16} className="text-blue-600" />;
      case "link":
        return <LinkIcon size={16} className="text-amber-600" />;
      case "alert-triangle":
        return <AlertTriangle size={16} className="text-amber-600" />;
      case "trending-up":
        return <TrendingUp size={16} className="text-emerald-600" />;
      case "user":
        return <User size={16} className="text-blue-600" />;
      case "users":
        return <Users size={16} className="text-purple-600" />;
      case "globe":
        return <Globe size={16} className="text-blue-600" />;
      case "building":
        return <Building size={16} className="text-blue-600" />;
      case "clock":
        return <Clock size={16} className="text-blue-600" />;
      default:
        return <Box size={16} className="text-slate-600" />;
    }
  };

  const registryCols: ColumnDef<SectorPackItem>[] = [
    {
      header: "Sector Pack",
      accessorKey: "sectorPack",
      align: "left",
      renderCell: (row) => <span className="font-semibold text-slate-800">{row.sectorPack}</span>,
    },
    {
      header: "Industry",
      accessorKey: "industry",
      align: "left",
      renderCell: (row) => <span className="text-slate-600">{row.industry}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Version",
      accessorKey: "version",
      align: "center",
      renderCell: (row) => <span className="text-slate-600 font-medium">{row.version}</span>,
    },
    {
      header: "Target Version",
      accessorKey: "targetVersion",
      align: "center",
      renderCell: (row) => <span className="text-slate-600 font-medium">{row.targetVersion}</span>,
    },
    {
      header: "Modules",
      accessorKey: "modules",
      align: "center",
    },
    {
      header: "Capability Bundles",
      accessorKey: "capabilityBundles",
      align: "center",
    },
    {
      header: "Tenant Overrides",
      accessorKey: "tenantOverrides",
      align: "center",
    },
    {
      header: "Compatibility Score",
      accessorKey: "compatibilityScore",
      align: "center",
      renderCell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-emerald-700">{row.compatibilityScore}</span>
          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: row.compatibilityScore }} />
          </div>
        </div>
      ),
    },
    {
      header: "Release Readiness",
      accessorKey: "releaseReadiness",
      align: "center",
      renderCell: (row) => (
        <span className="font-semibold text-slate-700">{row.releaseReadiness}</span>
      ),
    },
    {
      header: "Risks",
      accessorKey: "risks",
      align: "center",
      renderCell: (row) => (
        <span className={row.risks > 0 ? "font-bold text-rose-600" : "text-slate-500"}>{row.risks}</span>
      ),
    },
    {
      header: "Exceptions",
      accessorKey: "exceptions",
      align: "center",
      renderCell: (row) => (
        <span className={row.exceptions > 0 ? "font-bold text-amber-600" : "text-slate-500"}>{row.exceptions}</span>
      ),
    },
    {
      header: "Tenants",
      accessorKey: "tenants",
      align: "center",
    },
    {
      header: "Countries",
      accessorKey: "countries",
      align: "center",
    },
    {
      header: "Updated On",
      accessorKey: "updatedOn",
      align: "right",
      renderCell: (row) => <span className="text-slate-500 whitespace-nowrap">{row.updatedOn}</span>,
    },
    {
      header: "Updated By",
      accessorKey: "updatedBy",
      align: "right",
      renderCell: (row) => <span className="text-slate-500 whitespace-nowrap">{row.updatedBy}</span>,
    },
    {
      header: "Actions",
      accessorKey: "id",
      align: "right",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleViewPack(row.id)}
          className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-burgundy text-[10.5px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Title MUST NOT contain internal screen ID */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Sector Packs &amp; Capability Bundles</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Sector Packs &amp; Capability Bundles
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {SECTOR_PACK_DATA.headerInfo.description}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCreateSectorPack}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create Sector Pack
          </button>
          <button
            type="button"
            onClick={() => handleAction("Create Capability Bundle")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create Capability Bundle
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Sector Packs")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Compare Sector Packs
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Pack Risks")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Review Pack Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Pack Catalogue")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            Export Pack Catalogue
          </button>
          <button
            type="button"
            onClick={() => handleAction("View Compatibility Map")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Compatibility Map
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

      {/* 2. Release / Version Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 tracking-wide uppercase mb-3">Release / Version Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Current Version</span>
            <span className="font-semibold text-slate-800">{SECTOR_PACK_DATA.releaseSummary.currentVersion}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Released On</span>
            <span className="font-semibold text-slate-800">{SECTOR_PACK_DATA.releaseSummary.releasedOn}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Released By</span>
            <span className="font-semibold text-slate-800">{SECTOR_PACK_DATA.releaseSummary.releasedBy}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Target Version</span>
            <span className="font-semibold text-slate-800">{SECTOR_PACK_DATA.releaseSummary.targetVersion}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Target Release</span>
            <span className="font-semibold text-slate-800">{SECTOR_PACK_DATA.releaseSummary.targetRelease}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Status</span>
            <span className="inline-block mt-0.5 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-sm uppercase tracking-wider">{SECTOR_PACK_DATA.releaseSummary.status}</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Flex-based container to eliminate sidebar overlap */}
      <div className="flex flex-col xl:flex-row gap-4 min-w-0">
        {/* Left Primary Column */}
        <div className="flex-1 min-w-0 space-y-4">
          
          {/* 3. Top Assignment KPI Grid (9 KPI Cards - Matching Image 1) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-9 gap-2 min-w-0">
            {SECTOR_PACK_DATA.primaryKpis.map((kpi) => (
              <div
                key={kpi.id}
                onClick={() => handleAction(`KPI ${kpi.label}`)}
                className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2.5 cursor-pointer min-w-0 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {renderKpiIcon(kpi.icon)}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight truncate block mb-0.5">
                    {kpi.label}
                  </span>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-base font-black text-slate-900 leading-tight">
                      {kpi.value}
                    </span>
                    {kpi.hasProgressBar && (
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                        <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Bottom Assignment KPI Grid (9 KPI Cards - Matching Image 1) */}
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-9 gap-2 min-w-0">
            {SECTOR_PACK_DATA.secondaryKpis.map((kpi) => (
              <div
                key={kpi.id}
                onClick={() => handleAction(`KPI ${kpi.label}`)}
                className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2.5 cursor-pointer min-w-0 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {renderKpiIcon(kpi.icon)}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight truncate block mb-0.5">
                    {kpi.label}
                  </span>
                  <span className="text-base font-black text-slate-900 leading-tight">
                    {kpi.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 5. Sector Pack Registry Table */}
          <AnalyticsPanel number="" title="Sector Pack Registry">
            <AnalyticsTable
              data={SECTOR_PACK_DATA.registry}
              columns={registryCols}
              itemsPerPage={10}
            />
          </AnalyticsPanel>

          {/* 6. ROW 1: Modules Included | Capability Bundles | Required vs Optional Matrix | Pack Inheritance Topology | Inheritance Conflicts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* 6.1 Modules Included */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Modules Included</h4>
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-full">16</span>
                </div>
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                      <th className="pb-1 font-semibold">Module Category</th>
                      <th className="pb-1 font-semibold text-center">Modules</th>
                      <th className="pb-1 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.modulesIncluded.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-1 text-slate-700 font-medium">{item.category}</td>
                        <td className="py-1 text-center font-bold text-slate-800">{item.modules}</td>
                        <td className="py-1 text-right font-bold text-emerald-600">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => handleAction("View all modules")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View all modules <ArrowRight size={10} />
              </button>
            </div>

            {/* 6.2 Capability Bundles */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Capability Bundles</h4>
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-full">5</span>
                </div>
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                      <th className="pb-1 font-semibold">Capability Bundle</th>
                      <th className="pb-1 font-semibold text-center">Modules</th>
                      <th className="pb-1 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.capabilityBundles.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-1 text-slate-700 font-medium">{item.bundle}</td>
                        <td className="py-1 text-center font-bold text-slate-800">{item.modules}</td>
                        <td className="py-1 text-right font-bold text-emerald-600">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => handleAction("View all bundles")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View all bundles <ArrowRight size={10} />
              </button>
            </div>

            {/* 6.3 Required vs Optional Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Required vs Optional Matrix</h4>
                  <div className="flex items-center gap-2 text-[9px]">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Req</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Opt</span>
                  </div>
                </div>
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                      <th className="pb-1 font-semibold">Bundle</th>
                      <th className="pb-1 font-semibold text-center">Req</th>
                      <th className="pb-1 font-semibold text-center">Opt</th>
                      <th className="pb-1 font-semibold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.requiredOptionalMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-1 text-slate-700 font-medium truncate max-w-[90px]">{item.bundle}</td>
                        <td className="py-1 text-center font-bold text-slate-800">{item.req}</td>
                        <td className="py-1 text-center font-semibold text-slate-500">{item.opt}</td>
                        <td className="py-1 text-right font-extrabold text-slate-900">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6.4 Pack Inheritance Topology */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Pack Inheritance Topology</h4>
                
                {/* Topology Tree Diagram */}
                <div className="flex flex-col items-center gap-1 text-[9.5px] font-semibold py-1">
                  <div className="px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-900 rounded-md text-center shadow-xs">
                    <span className="block font-bold">SL Beauty Core Pack</span>
                    <span className="text-[8.5px] text-purple-600 block">V2.5.1</span>
                  </div>
                  <div className="h-2 w-px bg-slate-300"></div>
                  
                  <div className="grid grid-cols-3 gap-1.5 w-full text-center">
                    <div className="px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-800 rounded">SPC-010</div>
                    <div className="px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-800 rounded">SPC-020</div>
                    <div className="px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-800 rounded">SPC-030</div>
                  </div>
                  <div className="h-2 w-px bg-slate-300"></div>

                  <div className="grid grid-cols-4 gap-1 w-full text-center text-[8.5px]">
                    <div className="px-1 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded">SPC-040</div>
                    <div className="px-1 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded">SPC-050</div>
                    <div className="px-1 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded">SPC-060</div>
                    <div className="px-1 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded">SPC-070</div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleAction("View topology")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View topology <ArrowRight size={10} />
              </button>
            </div>

            {/* 6.5 Inheritance Conflicts */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Inheritance Conflicts</h4>
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-full">2</span>
                </div>
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                      <th className="pb-1 font-semibold">Conflict Type</th>
                      <th className="pb-1 font-semibold text-center">Instances</th>
                      <th className="pb-1 font-semibold text-right">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.inheritanceConflicts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-1.5 text-slate-700 font-medium">{item.conflictType}</td>
                        <td className="py-1.5 text-center font-bold text-slate-800">{item.instances}</td>
                        <td className="py-1.5 text-right font-bold">
                          <span className={item.severity === "High" ? "text-rose-600" : "text-amber-600"}>
                            {item.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => handleAction("View all conflicts")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View all conflicts <ArrowRight size={10} />
              </button>
            </div>

          </div>

          {/* 7. ROW 2: Compatibility Matrix | Module Version Compatibility | Dependency Validation | Country Applicability | Tenant Usage | Pack Adoption */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            
            {/* 7.1 Sector Pack Compatibility Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Sector Pack Compatibility Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-[9px] text-center">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-1 text-left">Pack</th>
                      {SECTOR_PACK_DATA.compatibilityMatrix.columns.map((c, i) => (
                        <th key={i} className="p-1">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.compatibilityMatrix.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="p-1 font-bold text-slate-700 text-left whitespace-nowrap">{row.pack}</td>
                        {row.values.map((v, cIdx) => {
                          const num = parseInt(v);
                          let colorClass = "text-emerald-700 font-medium";
                          if (num < 85) colorClass = "text-rose-600 font-bold";
                          else if (num < 92) colorClass = "text-amber-600 font-bold";
                          return (
                            <td key={cIdx} className={`p-1 ${colorClass}`}>
                              {v}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7.2 Module Version Compatibility */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Module Version Compatibility</h4>
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 text-[9px] uppercase">
                    <th className="pb-1 font-semibold">Module Category</th>
                    <th className="pb-1 font-semibold text-center">Current</th>
                    <th className="pb-1 font-semibold text-center">Target</th>
                    <th className="pb-1 font-semibold text-right">Compatibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {SECTOR_PACK_DATA.moduleVersionCompatibility.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-1 text-slate-700 font-medium truncate max-w-[90px]">{item.category}</td>
                      <td className="py-1 text-center text-slate-500 font-medium">{item.current}</td>
                      <td className="py-1 text-center text-slate-500 font-medium">{item.target}</td>
                      <td className="py-1 text-right font-bold text-emerald-700">{item.compatibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 7.3 Dependency Validation */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Dependency Validation</h4>
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                      <th className="pb-1 font-semibold">Check Type</th>
                      <th className="pb-1 font-semibold text-center">Status</th>
                      <th className="pb-1 font-semibold text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.dependencyValidation.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-1 text-slate-700 font-medium">{item.checkType}</td>
                        <td className="py-1 text-center">
                          <Check size={12} className="text-emerald-600 inline" />
                        </td>
                        <td className="py-1 text-right font-bold text-emerald-600">{item.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => handleAction("View all validations")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View all validations <ArrowRight size={10} />
              </button>
            </div>

            {/* 7.4 Country Applicability */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Country Applicability</h4>
                <table className="w-full text-left text-[10.5px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                      <th className="pb-1 font-semibold">Country</th>
                      <th className="pb-1 font-semibold text-center">Supported</th>
                      <th className="pb-1 font-semibold text-center">Overrides</th>
                      <th className="pb-1 font-semibold text-right">Applicability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SECTOR_PACK_DATA.countryApplicability.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-1 text-slate-700 font-medium">{item.country}</td>
                        <td className="py-1 text-center"><Check size={12} className="text-emerald-600 inline" /></td>
                        <td className="py-1 text-center font-semibold text-slate-700">{item.overrides}</td>
                        <td className={`py-1 text-right font-bold ${parseInt(item.applicability) < 95 ? "text-rose-600" : "text-emerald-600"}`}>
                          {item.applicability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => handleAction("View all countries")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View all countries <ArrowRight size={10} />
              </button>
            </div>

            {/* 7.5 Tenant Usage */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">Tenant Usage</h4>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Total Tenants</span>
                    <span className="text-sm font-extrabold text-slate-900">{SECTOR_PACK_DATA.tenantUsage.totalTenants}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Active Tenants</span>
                    <span className="text-xs font-bold text-slate-800">{SECTOR_PACK_DATA.tenantUsage.activeTenants} <span className="text-emerald-600 font-semibold">({SECTOR_PACK_DATA.tenantUsage.activePercentage})</span></span>
                  </div>
                </div>

                <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">By Adoption Stage</span>
                {/* Multi-segment progress bar */}
                <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100 flex mb-2">
                  {SECTOR_PACK_DATA.tenantUsage.adoptionStages.map((stage, idx) => (
                    <div key={idx} className={`h-full ${stage.color}`} style={{ width: stage.percentage }} />
                  ))}
                </div>

                <div className="space-y-1 text-[9.5px]">
                  {SECTOR_PACK_DATA.tenantUsage.adoptionStages.map((stage, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${stage.color}`}></span>
                        <span>{stage.name}</span>
                      </div>
                      <span className="font-semibold text-slate-800">{stage.count} ({stage.percentage})</span>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => handleAction("View tenant usage")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View tenant usage <ArrowRight size={10} />
              </button>
            </div>

            {/* 7.6 Pack Adoption */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">Pack Adoption</h4>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Adoption Rate</span>
                    <span className="text-sm font-extrabold text-emerald-700">{SECTOR_PACK_DATA.packAdoption.adoptionRate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Tenants Using Packs</span>
                    <span className="text-xs font-bold text-slate-800">{SECTOR_PACK_DATA.packAdoption.tenantsUsingPacks}</span>
                  </div>
                </div>

                <span className="text-[9.5px] font-bold text-slate-500 uppercase block mb-1">Adoption by Sector</span>
                <div className="space-y-1 text-[9.5px]">
                  {SECTOR_PACK_DATA.packAdoption.bySector.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-1 text-slate-600">
                      <span className="truncate max-w-[95px]">{item.sector}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.percentage }} />
                        </div>
                        <span className="font-bold text-slate-800 w-6 text-right">{item.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => handleAction("View analytics")} 
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
              >
                View analytics <ArrowRight size={10} />
              </button>
            </div>

          </div>

          {/* 8. ROW 3: Split into 2 Spacious Sub-Rows (3 Cards + 2 Cards) to eliminate text overflow */}
          <div className="space-y-3">
            {/* Sub-row 3a: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 8.1 Pack Health Matrix */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Pack Health Matrix</h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <CheckSquare size={14} className="text-blue-600" />
                      <span>Version Compliance</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{SECTOR_PACK_DATA.packHealthMatrix.versionCompliance}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <ShieldCheck size={14} className="text-amber-500" />
                      <span>Configuration Health</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{SECTOR_PACK_DATA.packHealthMatrix.configurationHealth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-rose-500" />
                      <span>Risk Posture</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{SECTOR_PACK_DATA.packHealthMatrix.riskPosture}</span>
                  </div>
                </div>
              </div>

              {/* 8.2 Release Readiness */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-center flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2 text-left">Release Readiness</h4>
                  <div className="flex items-center justify-around my-1">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Readiness Score</span>
                      <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-extrabold text-xs text-emerald-700 my-1">
                        {SECTOR_PACK_DATA.releaseReadiness.score}%
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Blockers</span>
                      <span className="text-lg font-extrabold text-slate-900 my-1">{SECTOR_PACK_DATA.releaseReadiness.blockers}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Warnings</span>
                      <span className="text-lg font-extrabold text-amber-600 my-1">{SECTOR_PACK_DATA.releaseReadiness.warnings}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Approvals</span>
                      <span className="text-base font-extrabold text-slate-900 my-1">{SECTOR_PACK_DATA.releaseReadiness.approvals}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 flex flex-col items-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Go / No-Go</span>
                  <span className="px-3 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded uppercase tracking-wider mt-0.5">
                    {SECTOR_PACK_DATA.releaseReadiness.goNoGo}
                  </span>
                </div>
              </div>

              {/* 8.3 Change Impact Analysis */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Change Impact Analysis <span className="text-[10px] text-slate-400 font-normal">(Target: {SECTOR_PACK_DATA.changeImpactAnalysis.targetVersion})</span></h4>
                <div className="grid grid-cols-5 gap-1 text-center py-2">
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-slate-400 block">Impacted Tenants</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">{SECTOR_PACK_DATA.changeImpactAnalysis.impactedTenants}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-slate-400 block">Impacted Modules</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">{SECTOR_PACK_DATA.changeImpactAnalysis.impactedModules}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-slate-400 block">New Modules</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">{SECTOR_PACK_DATA.changeImpactAnalysis.newModules}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-slate-400 block">Deprecated Modules</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">{SECTOR_PACK_DATA.changeImpactAnalysis.deprecatedModules}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-slate-400 block">Data Changes</span>
                    <span className="text-base font-extrabold text-slate-900 mt-1 block">{SECTOR_PACK_DATA.changeImpactAnalysis.dataChanges}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-row 3b: 2 Spacious Cards for Exception Center & Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 8.4 Exception Center */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Exception Center</h4>
                <div className="flex items-center justify-around py-1">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Open Exceptions</span>
                    <span className="text-lg font-extrabold text-slate-900 my-1">{SECTOR_PACK_DATA.exceptionCenter.openExceptions}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Critical</span>
                    <span className="w-6 h-6 rounded-full bg-rose-100 border border-rose-300 text-rose-700 font-extrabold text-xs flex items-center justify-center my-1">
                      {SECTOR_PACK_DATA.exceptionCenter.critical}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400">High</span>
                    <span className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 text-amber-700 font-extrabold text-xs flex items-center justify-center my-1">
                      {SECTOR_PACK_DATA.exceptionCenter.high}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Medium</span>
                    <span className="w-6 h-6 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-800 font-extrabold text-xs flex items-center justify-center my-1">
                      {SECTOR_PACK_DATA.exceptionCenter.medium}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Low</span>
                    <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 font-extrabold text-xs flex items-center justify-center my-1">
                      {SECTOR_PACK_DATA.exceptionCenter.low}
                    </span>
                  </div>
                </div>
              </div>

              {/* 8.5 Recent Activity (Spacious width prevents text truncation and sidebar overlap) */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Activity</h4>
                  <table className="w-full text-left text-[10.5px]">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100 text-[9.5px] uppercase">
                        <th className="pb-1 font-semibold">Activity</th>
                        <th className="pb-1 font-semibold text-center">Entity</th>
                        <th className="pb-1 font-semibold text-center">User</th>
                        <th className="pb-1 font-semibold text-right">When</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {SECTOR_PACK_DATA.recentActivity.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-1 text-slate-700 font-medium truncate">{item.activity}</td>
                          <td className="py-1 text-center font-bold text-slate-800">{item.entity}</td>
                          <td className="py-1 text-center text-slate-600">{item.user}</td>
                          <td className="py-1 text-right text-slate-400 whitespace-nowrap text-[9.5px]">{item.when}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button 
                  onClick={() => handleAction("View all activity")} 
                  className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-burgundy flex items-center gap-1 justify-center w-full pt-1 border-t border-slate-100 cursor-pointer"
                >
                  View all activity <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 9. Right Sidebar (Spacious 288px width) */}
        <div className="w-full xl:w-72 shrink-0 flex flex-col gap-4">
          
          {/* Pack Health Score (Matching Image 2) */}
          <AnalyticsPanel number="" title="Pack Health Score">
            <div className="space-y-2 py-1 flex flex-col items-center justify-center text-center">
              <CircularScore
                score={SECTOR_PACK_DATA.healthScore.value}
                maxScore={SECTOR_PACK_DATA.healthScore.max}
                size={100}
                strokeWidth={8}
                primaryColor="#047857"
                backgroundColor="#e2e8f0"
              />
              <span className="text-xs font-extrabold text-emerald-700 mt-1">
                {SECTOR_PACK_DATA.healthScore.label}
              </span>
            </div>
          </AnalyticsPanel>

          {/* Sector Pack Summary */}
          <AnalyticsPanel number="" title="Sector Pack Summary">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Total Sector Packs</div>
                <span className="font-semibold text-slate-900">8</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Active</div>
                <span className="font-semibold text-slate-900">5</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> In Review</div>
                <span className="font-semibold text-slate-900">1</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Draft</div>
                <span className="font-semibold text-slate-900">2</span>
              </div>
            </div>
          </AnalyticsPanel>
          
          {/* Composition Summary */}
          <AnalyticsPanel number="" title="Composition Summary">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Total Modules</div>
                <span className="font-semibold text-slate-900">62</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Capability Bundles</div>
                <span className="font-semibold text-slate-900">5</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Tenant Overrides</div>
                <span className="font-semibold text-slate-900">1,124</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Dependencies</div>
                <span className="font-semibold text-slate-900">24</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Countries Supported</div>
                <span className="font-semibold text-slate-900">6</span>
              </div>
            </div>
          </AnalyticsPanel>

          {/* Tenant Usage Summary */}
          <AnalyticsPanel number="" title="Tenant Usage">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Total Tenants</span>
                <span className="font-bold text-slate-900">512</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Active Tenants</span>
                <span className="font-bold text-slate-900">486</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Adoption Rate</span>
                <span className="font-bold text-emerald-700">95%</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Top Sector</span>
                <span className="font-semibold text-slate-800">Beauty & Personal Care</span>
              </div>
            </div>
          </AnalyticsPanel>

          {/* Governance Summary */}
          <AnalyticsPanel number="" title="Governance Summary">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Release Readiness</span>
                <span className="font-bold text-emerald-700">96%</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Pending Approvals</span>
                <span className="font-bold text-amber-600">1</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Open Risks</span>
                <span className="font-bold text-rose-600">2</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Open Exceptions</span>
                <span className="font-bold text-amber-600">3</span>
              </div>
            </div>
          </AnalyticsPanel>

          {/* Quick Queues */}
          <AnalyticsPanel number="" title="Quick Queues">
            <div className="space-y-2 text-xs">
              {SECTOR_PACK_DATA.quickQueues.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${item.badgeColor}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* Final Actions */}
          <AnalyticsPanel number="" title="Final Actions">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCreateSectorPack}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Create Sector Pack
              </button>
              <button
                onClick={() => handleAction("Create Capability Bundle")}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Create Capability Bundle
              </button>
              <button
                onClick={() => handleAction("Review Pack Risks")}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Review Pack Risks
              </button>
              <button
                onClick={() => handleAction("Manage Tenant Overrides")}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Manage Tenant Overrides
              </button>
              <button
                onClick={() => handleAction("Compare Sector Packs")}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Compare Sector Packs
              </button>
              <button
                onClick={() => handleAction("Export Pack Catalogue")}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Export Pack Catalogue
              </button>
              <button
                onClick={() => handleAction("View Compatibility Map")}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                View Compatibility Map
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
