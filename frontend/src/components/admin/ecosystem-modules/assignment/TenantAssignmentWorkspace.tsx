/* replaced by database-backed shared assignment workspace */

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Search,
  Filter,
  Download,
  Calendar,
  ShieldAlert,
  GitCompare,
  Plus,
  ChevronDown,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  Lock,
  FileCheck,
  Globe,
  Activity,
  ArrowRight,
  Check,
  Package,
  Play,
  Anchor,
  User,
  Clock,
  ShieldCheck,
  Users,
  Building2,
  Box,
  Share2,
  Ban,
  Shield,
  FileWarning,
  AlertCircle
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import {
  TENANT_ASSIGNMENT_DATA,
  TenantAssignmentItem,
  ConflictRow,
  ChangeRequestRow,
  AssignmentActivityRow,
} from "@/data/ecosystem-modules/tenantAssignmentData";

export function TenantAssignmentWorkspace() {
  const router = useRouter();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContext, setSelectedContext] = useState("All");
  const [selectedModuleType, setSelectedModuleType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedState, setSelectedState] = useState("All States");

  // Actions handler
  const handleAction = (title: string) => {
    toast.success(`${title} action triggered`);
  };

  const handleViewModule = (moduleKey: string) => {
    router.push(`/admin/ecosystem-modules/modules/${moduleKey}`);
  };

  const handleCreateAssignment = () => {
    router.push("/admin/ecosystem-modules/capabilities");
  };

  // Filter matrix data
  const filteredMatrix = useMemo(() => {
    return TENANT_ASSIGNMENT_DATA.matrix.filter((item) => {
      if (selectedContext !== "All" && item.assignmentSource !== selectedContext) return false;
      if (selectedModuleType !== "All Types" && item.moduleType !== selectedModuleType) return false;
      if (selectedCategory !== "All Categories" && item.category !== selectedCategory) return false;
      if (selectedSource !== "All Sources" && item.assignmentSource !== selectedSource) return false;
      if (selectedState !== "All States" && item.assignmentState !== selectedState) return false;

      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesCode = item.moduleCode.toLowerCase().includes(query);
        const matchesName = item.moduleName.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesCode || matchesName || matchesCategory;
      }
      return true;
    });
  }, [selectedContext, selectedModuleType, selectedCategory, selectedSource, selectedState, searchTerm]);

  // Helper for KPI Icons matching Image 1
  const renderKpiIcon = (icon: string) => {
    switch (icon) {
      case "package":
        return <Package size={16} className="text-blue-600" />;
      case "check-circle":
        return <CheckCircle2 size={16} className="text-emerald-600" />;
      case "play":
        return <Play size={16} className="text-emerald-600" />;
      case "anchor":
        return <Anchor size={16} className="text-purple-600" />;
      case "user":
        return <User size={16} className="text-blue-600" />;
      case "clock":
        return <Clock size={16} className="text-amber-600" />;
      case "lock":
        return <Lock size={16} className="text-rose-600" />;
      case "shield-check":
        return <ShieldCheck size={16} className="text-emerald-600" />;
      case "alert-triangle":
        return <AlertTriangle size={16} className="text-amber-600" />;
      default:
        return <Box size={16} className="text-slate-600" />;
    }
  };

  // Matrix Table Columns (18 Columns matching screenshot)
  const matrixCols: ColumnDef<TenantAssignmentItem>[] = [
    {
      header: "Module Code",
      accessorKey: "moduleCode",
      align: "left",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleViewModule(row.moduleKey)}
          className="font-bold text-burgundy text-xs hover:underline cursor-pointer flex items-center gap-1"
        >
          {row.moduleCode}
        </button>
      ),
    },
    {
      header: "Module Name",
      accessorKey: "moduleName",
      align: "left",
      renderCell: (row) => <span className="font-extrabold text-slate-900 text-xs">{row.moduleName}</span>,
    },
    {
      header: "Module Type",
      accessorKey: "moduleType",
      align: "center",
      renderCell: (row) => (
        <span
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.moduleType === "Core Module"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : row.moduleType === "Value-Added Module"
              ? "bg-purple-50 text-purple-700 border border-purple-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {row.moduleType}
        </span>
      ),
    },
    { header: "Category", accessorKey: "category", align: "left" },
    {
      header: "Lifecycle",
      accessorKey: "lifecycle",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.lifecycle === "Live" ? "success" : row.lifecycle === "Beta" ? "info" : "warning"}
          label={row.lifecycle}
        />
      ),
    },
    { header: "Assignment Source", accessorKey: "assignmentSource", align: "left" },
    { header: "Inherited From", accessorKey: "inheritedFrom", align: "left" },
    {
      header: "Assignment State",
      accessorKey: "assignmentState",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={
            row.assignmentState === "Assigned"
              ? "success"
              : row.assignmentState === "Inherited"
              ? "info"
              : row.assignmentState === "Temporary"
              ? "warning"
              : "danger"
          }
          label={row.assignmentState}
        />
      ),
    },
    {
      header: "Inherited Scope",
      accessorKey: "inheritedScope",
      align: "center",
      renderCell: () => <Check size={14} className="text-emerald-600 mx-auto" />,
    },
    {
      header: "Security Posture",
      accessorKey: "securityPosture",
      align: "center",
      renderCell: () => <Check size={14} className="text-emerald-600 mx-auto" />,
    },
    {
      header: "Compliance Status",
      accessorKey: "complianceStatus",
      align: "center",
      renderCell: () => <Check size={14} className="text-emerald-600 mx-auto" />,
    },
    {
      header: "Dependency Coverage",
      accessorKey: "dependencyCoverage",
      align: "center",
      renderCell: (row) => (
        <span className="flex items-center justify-center gap-1">
          <span className={`w-2 h-2 rounded-full ${row.dependencyCoverage === "Covered" ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span className="text-[11px] font-medium">{row.dependencyCoverage}</span>
        </span>
      ),
    },
    {
      header: "Production Eligibility",
      accessorKey: "productionEligibility",
      align: "center",
      renderCell: (row) => (
        <span className="flex items-center justify-center gap-1">
          <span className={`w-2 h-2 rounded-full ${row.productionEligibility === "Eligible" ? "bg-emerald-500" : "bg-rose-500"}`} />
          <span className="text-[11px] font-medium">{row.productionEligibility}</span>
        </span>
      ),
    },
    {
      header: "Environment State",
      accessorKey: "environmentState",
      align: "center",
      renderCell: (row) => (
        <span className="flex items-center justify-center gap-1">
          <span className={`w-2 h-2 rounded-full ${row.environmentState === "Production" ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span className="text-[11px] font-medium">{row.environmentState}</span>
        </span>
      ),
    },
    {
      header: "Data Sensitivity",
      accessorKey: "dataSensitivity",
      align: "center",
      renderCell: (row) => (
        <span className="flex items-center justify-center gap-1">
          <span className={`w-2 h-2 rounded-full ${row.dataSensitivity === "High" ? "bg-rose-500" : row.dataSensitivity === "Medium" ? "bg-amber-500" : "bg-emerald-500"}`} />
          <span className="text-[11px] font-bold">{row.dataSensitivity}</span>
        </span>
      ),
    },
    {
      header: "Restrictions",
      accessorKey: "restrictions",
      align: "center",
      renderCell: (row) => (
        <span className={`text-[11px] ${row.restrictions !== "-" ? "text-amber-700 font-bold" : "text-slate-400"}`}>
          {row.restrictions}
        </span>
      ),
    },
    {
      header: "Assignments",
      accessorKey: "assignmentsCount",
      align: "center",
      renderCell: (row) => <span className="font-semibold text-slate-800">{row.assignmentsCount}</span>,
    },
    {
      header: "Actions",
      accessorKey: "id",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleViewModule(row.moduleKey)}
          className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-burgundy text-[10.5px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible Title MUST NOT contain "EM04" */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Enterprise Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Assignments</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Tenant &amp; Ecosystem Module Assignment
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage tenant module assignments, inheritance, production eligibility across tenant and ecosystem scopes.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("Compare Assignments")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <GitCompare size={12} /> Compare Assignments
          </button>
          <button
            type="button"
            onClick={handleCreateAssignment}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create Module Assignment
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Assignment Matrix")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download size={12} /> Export Assignment Matrix
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

      {/* 2. Context Selector Strip (14 Context Selectors - Matching Image 1) */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 xl:grid-cols-14 gap-2 text-xs divide-x divide-slate-100 overflow-x-auto">
          {TENANT_ASSIGNMENT_DATA.contextSelectors.map((cs, idx) => (
            <div key={cs.id} className={`min-w-0 ${idx > 0 ? "pl-2" : ""}`}>
              <span className="text-[9px] font-bold text-slate-400 uppercase block truncate mb-0.5">{cs.label}</span>
              {cs.options ? (
                <div className="flex items-center gap-1">
                  <select
                    value={cs.value}
                    onChange={(e) => handleAction(`Change ${cs.label} to ${e.target.value}`)}
                    className="w-full text-[10.5px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer truncate"
                  >
                    {cs.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {cs.hasBadge && <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />}
                  <span
                    className={`text-[10.5px] font-bold truncate block ${
                      cs.tone === "success" ? "text-emerald-700" : "text-slate-800"
                    }`}
                  >
                    {cs.value}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Top Assignment KPI Grid (9 KPI Cards - Matching Image 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-9 gap-2 min-w-0">
        {TENANT_ASSIGNMENT_DATA.primaryKpis.map((kpi) => (
          <div
            key={kpi.id}
            onClick={() => handleAction(`KPI ${kpi.label}`)}
            className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-center gap-3 cursor-pointer min-w-0"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              {renderKpiIcon(kpi.icon)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight truncate block">
                {kpi.label}
              </span>
              <span className="text-lg font-black text-slate-900 leading-tight">
                {kpi.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Row 1 Dashboard Cards (4 Cards - Matching Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 min-w-0">
        {/* Card 1: Assignment Sources Donut */}
        <AnalyticsPanel number="" title="Assignment Sources">
          <PieChart
            data={TENANT_ASSIGNMENT_DATA.assignmentSourcesData}
            centerText="13"
            centerSubtext="Total"
            innerRadius="56%"
            outerRadius="82%"
            height={150}
          />
        </AnalyticsPanel>

        {/* Card 2: Assignment Status Summary */}
        <AnalyticsPanel number="" title="Assignment Status Summary">
          <div className="grid grid-cols-5 gap-1.5 py-4 text-center">
            {TENANT_ASSIGNMENT_DATA.assignmentStatusSummary.map((item) => (
              <div key={item.status} className={`p-2 rounded border ${item.bg} flex flex-col justify-center`}>
                <span className="text-[9px] font-bold uppercase block truncate">{item.status}</span>
                <span className="text-lg font-black mt-0.5">{item.count}</span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>

        {/* Card 3: Inheritance Topology */}
        <AnalyticsPanel number="" title="Inheritance Topology">
          <div className="flex items-center justify-between gap-1 py-4 px-1 overflow-x-auto">
            {TENANT_ASSIGNMENT_DATA.inheritanceTopology.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div className="flex flex-col items-center text-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-burgundy/10 text-burgundy font-bold text-xs flex items-center justify-center border border-burgundy/20 mb-1">
                    {node.count}
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">{node.label}</span>
                  <span className="text-[8.5px] font-medium text-slate-400">{node.sublabel}</span>
                </div>
                {idx < TENANT_ASSIGNMENT_DATA.inheritanceTopology.length - 1 && (
                  <ArrowRight size={12} className="text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </AnalyticsPanel>

        {/* Card 4: Inheritance Conflicts */}
        <AnalyticsPanel number="" title="Inheritance Conflicts">
          <div className="space-y-1.5 py-2 text-xs">
            <div className="grid grid-cols-4 text-[9px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-1">
              <span>Module</span>
              <span>Parent</span>
              <span>Conflict</span>
              <span className="text-right">Severity</span>
            </div>
            {TENANT_ASSIGNMENT_DATA.inheritanceConflicts.map((c, idx) => (
              <div key={idx} className="grid grid-cols-4 text-[10.5px] items-center border-b border-slate-50 py-1 last:border-0">
                <span className="font-bold text-slate-800 truncate">{c.module}</span>
                <span className="text-slate-500 truncate">{c.parentAssignment}</span>
                <span className="text-slate-600 truncate">{c.conflictType}</span>
                <span className={`text-right font-extrabold ${c.severity === "High" ? "text-rose-600" : "text-amber-600"}`}>
                  {c.severity}
                </span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>
      </div>

      {/* 5. Row 2 Dashboard Cards (7 Cards Row - Matching Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 min-w-0">
        {/* Card 1: Production Eligibility Summary */}
        <AnalyticsPanel number="" title="Production Eligibility">
          <PieChart
            data={TENANT_ASSIGNMENT_DATA.productionEligibilitySummary}
            centerText="10"
            centerSubtext="Eligible"
            innerRadius="56%"
            outerRadius="82%"
            height={140}
          />
        </AnalyticsPanel>

        {/* Card 2: Governance Gates */}
        <AnalyticsPanel number="" title="Governance Gates">
          <div className="space-y-1.5 py-1 text-xs">
            {TENANT_ASSIGNMENT_DATA.governanceGates.map((gate, idx) => (
              <div key={idx} className="flex justify-between items-center text-[10.5px] border-b border-slate-50 pb-1 last:border-0">
                <span className="text-slate-700 truncate">{gate.label}</span>
                <span className="font-bold text-emerald-700 flex items-center gap-0.5">
                  <Check size={11} /> {gate.status}
                </span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>

        {/* Card 3: Core Module Coverage */}
        <AnalyticsPanel number="" title="Core Module Coverage">
          <div className="flex flex-col items-center text-center py-1">
            <span className="text-xl font-black text-emerald-700">7 / 7</span>
            <span className="text-[9.5px] font-bold text-slate-500">Core Modules Assigned</span>
            <div className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 rounded py-0.5 text-xs font-black my-1">
              100%
            </div>
            <div className="space-y-0.5 text-[9px] text-slate-600 text-left w-full pt-1">
              {TENANT_ASSIGNMENT_DATA.coreModuleCoverage.modules.map((m, i) => (
                <div key={i} className="truncate">• {m}</div>
              ))}
            </div>
          </div>
        </AnalyticsPanel>

        {/* Card 4: Optional Module Portfolio */}
        <AnalyticsPanel number="" title="Optional Module Portfolio">
          <div className="space-y-1 py-1 text-xs max-h-36 overflow-y-auto">
            {TENANT_ASSIGNMENT_DATA.optionalModulePortfolio.map((mod, idx) => (
              <div key={idx} className="flex justify-between items-center text-[10px] border-b border-slate-50 pb-0.5 last:border-0">
                <span className="text-slate-700 truncate">{mod.name}</span>
                <span className={`font-bold ${mod.tone === "success" ? "text-emerald-700" : mod.tone === "warning" ? "text-amber-600" : "text-slate-400"}`}>
                  {mod.state}
                </span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>

        {/* Card 5: Sector Pack Mapping */}
        <AnalyticsPanel number="" title="Sector Pack Mapping">
          <div className="space-y-1 py-1 text-xs">
            <span className="font-extrabold text-slate-900 block text-[11px]">{TENANT_ASSIGNMENT_DATA.sectorPackMapping.packName}</span>
            <span className="text-[9.5px] font-bold text-emerald-700 block">{TENANT_ASSIGNMENT_DATA.sectorPackMapping.inheritedRatio}</span>
            <div className="space-y-0.5 pt-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Inherited</span>
              {TENANT_ASSIGNMENT_DATA.sectorPackMapping.inherited.map((inh, idx) => (
                <span key={idx} className="text-[10px] font-medium text-slate-700 block truncate">• {inh}</span>
              ))}
            </div>
          </div>
        </AnalyticsPanel>

        {/* Card 6: Country Constraints */}
        <AnalyticsPanel number="" title="Country Constraints">
          <div className="space-y-1 py-1 text-xs">
            <div className="grid grid-cols-3 text-[9px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-0.5">
              <span>Country</span>
              <span className="text-center">Allowed</span>
              <span className="text-right">Restr</span>
            </div>
            {TENANT_ASSIGNMENT_DATA.countryConstraints.map((cc, idx) => (
              <div key={idx} className="grid grid-cols-3 text-[10px] items-center py-0.5 border-b border-slate-50 last:border-0">
                <span className="font-semibold text-slate-800 truncate">{cc.country}</span>
                <span className="text-center font-bold text-emerald-700">{cc.allowed}</span>
                <span className="text-right font-bold text-slate-500">{cc.restricted}</span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>

        {/* Card 7: Environment Enablement Matrix */}
        <AnalyticsPanel number="" title="Environment Enablement">
          <div className="space-y-1.5 py-1 text-xs">
            {TENANT_ASSIGNMENT_DATA.environmentEnablementMatrix.map((env, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[10px]">
                  <span className="font-semibold text-slate-700 truncate">{env.environment}</span>
                  <span className="font-bold text-slate-900">{env.enabled} ({env.progress}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${env.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </AnalyticsPanel>
      </div>

      {/* 6. Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-xs space-y-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-2 flex-1">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Assignment Context</label>
              <select
                value={selectedContext}
                onChange={(e) => setSelectedContext(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                {TENANT_ASSIGNMENT_DATA.filters.context.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Module Type</label>
              <select
                value={selectedModuleType}
                onChange={(e) => setSelectedModuleType(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                {TENANT_ASSIGNMENT_DATA.filters.moduleType.map((mt) => (
                  <option key={mt} value={mt}>{mt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                {TENANT_ASSIGNMENT_DATA.filters.category.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Assignment Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                {TENANT_ASSIGNMENT_DATA.filters.assignmentSource.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Inherited From</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                {TENANT_ASSIGNMENT_DATA.filters.inheritedFrom.map((par) => (
                  <option key={par} value={par}>{par}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Assignment State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                {TENANT_ASSIGNMENT_DATA.filters.assignmentState.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Production Eligibility</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                {TENANT_ASSIGNMENT_DATA.filters.productionEligibility.map((pe) => (
                  <option key={pe} value={pe}>{pe}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Environment</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                {TENANT_ASSIGNMENT_DATA.filters.environment.map((env) => (
                  <option key={env} value={env}>{env}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                {TENANT_ASSIGNMENT_DATA.filters.status.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
            <button
              type="button"
              onClick={() => handleAction("Apply Filters")}
              className="px-3 py-1.5 bg-burgundy text-white text-xs font-semibold rounded hover:bg-burgundy-dark transition-colors cursor-pointer"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedContext("All");
                setSelectedModuleType("All Types");
                setSelectedCategory("All Categories");
                setSelectedSource("All Sources");
                setSelectedState("All States");
                setSearchTerm("");
                toast.success("Filters reset");
              }}
              className="text-burgundy text-xs font-bold hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* 7. Main Table & Right Panel Layout */}
      <div className="flex flex-col xl:flex-row gap-4 min-w-0">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Card 1: Tenant & Module Assignment Matrix */}
          <AnalyticsPanel number="" title="Tenant & Module Assignment Matrix">
            <AnalyticsTable columns={matrixCols} data={filteredMatrix} />
          </AnalyticsPanel>

          {/* Card 2: Lower Summary Cards Grid (2 Rows for Spacious Alignment & No Overlap) */}
          <div className="space-y-3">
            {/* Top Row of Lower Cards (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Assignment Holds */}
              <AnalyticsPanel number="" title="Assignment Holds">
                <div className="space-y-2 py-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <ShieldAlert size={14} className="text-rose-600" /> Security Holds
                    </span>
                    <span className="font-extrabold text-rose-600">1</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-rose-600" /> Compliance Holds
                    </span>
                    <span className="font-extrabold text-rose-600">1</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 size={14} className="text-emerald-600" /> Legal Holds
                    </span>
                    <span className="font-extrabold text-slate-400">0</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 size={14} className="text-emerald-600" /> Data Holds
                    </span>
                    <span className="font-extrabold text-slate-400">0</span>
                  </div>
                </div>
              </AnalyticsPanel>

              {/* 2. Dependency Constraints */}
              <AnalyticsPanel number="" title="Dependency Constraints">
                <div className="space-y-2 py-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Ban size={14} className="text-rose-600" /> Blocked
                    </span>
                    <span className="font-extrabold text-rose-600">1</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-amber-600" /> At Risk
                    </span>
                    <span className="font-extrabold text-amber-600">2</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-amber-500" /> Warning
                    </span>
                    <span className="font-extrabold text-amber-500">1</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 size={14} className="text-emerald-600" /> Healthy
                    </span>
                    <span className="font-extrabold text-emerald-700">9</span>
                  </div>
                </div>
              </AnalyticsPanel>

              {/* 3. Assignment Exception Center */}
              <AnalyticsPanel number="" title="Assignment Exception Center">
                <div className="space-y-2 py-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertCircle size={14} className="text-rose-600" /> Scope Violations
                    </span>
                    <span className="font-extrabold text-rose-600">1</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-blue-600" /> Eligibility Exceptions
                    </span>
                    <span className="font-extrabold text-blue-600">1</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-purple-600" /> Dependency Exceptions
                    </span>
                    <span className="font-extrabold text-purple-600">2</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <AlertTriangle size={14} className="text-slate-400" /> Configuration Exceptions
                    </span>
                    <span className="font-extrabold text-slate-400">0</span>
                  </div>
                </div>
              </AnalyticsPanel>
            </div>

            {/* Bottom Row of Lower Cards (3 Detailed Cards with Spacious Width & Zero Text Overlap) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 4. Assignment Health Matrix (5 Columns with spacious ~350px container width) */}
              <AnalyticsPanel number="" title="Assignment Health Matrix">
                <div className="grid grid-cols-5 gap-1 py-1 text-center items-center divide-x divide-slate-100 min-w-0">
                  {/* Column 1: Health Score */}
                  <div className="flex flex-col items-center pr-1 min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block truncate w-full">Health Score</span>
                    <div className="w-11 h-11 rounded-full border-4 border-emerald-600 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10.5px] font-black text-slate-900 leading-none">96%</span>
                      <span className="text-[6.5px] font-bold text-emerald-600 uppercase">Excellent</span>
                    </div>
                  </div>

                  {/* Column 2: Security Posture */}
                  <div className="flex flex-col items-center px-1 min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block truncate w-full">Security Posture</span>
                    <CheckCircle2 size={16} className="text-emerald-600 mb-0.5 shrink-0" />
                    <span className="text-[10.5px] font-bold text-slate-800 truncate w-full">Compliant</span>
                    <span className="text-[9.5px] font-extrabold text-emerald-600">100%</span>
                  </div>

                  {/* Column 3: Compliance Status */}
                  <div className="flex flex-col items-center px-1 min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block truncate w-full">Compliance Status</span>
                    <CheckCircle2 size={16} className="text-emerald-600 mb-0.5 shrink-0" />
                    <span className="text-[10.5px] font-bold text-slate-800 truncate w-full">Compliant</span>
                    <span className="text-[9.5px] font-extrabold text-emerald-600">100%</span>
                  </div>

                  {/* Column 4: Data Quality */}
                  <div className="flex flex-col items-center px-1 min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block truncate w-full">Data Quality</span>
                    <CheckCircle2 size={16} className="text-emerald-600 mb-0.5 shrink-0" />
                    <span className="text-[10.5px] font-bold text-slate-800 truncate w-full">High</span>
                    <span className="text-[9.5px] font-extrabold text-emerald-600">98%</span>
                  </div>

                  {/* Column 5: Tenant Readiness */}
                  <div className="flex flex-col items-center pl-1 min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block truncate w-full">Tenant Readiness</span>
                    <CheckCircle2 size={16} className="text-emerald-600 mb-0.5 shrink-0" />
                    <span className="text-[10.5px] font-bold text-slate-800 truncate w-full">Ready</span>
                    <span className="text-[9.5px] font-extrabold text-emerald-600">95%</span>
                  </div>
                </div>
              </AnalyticsPanel>

              {/* 5. Pending Assignment Changes */}
              <AnalyticsPanel number="" title="Pending Assignment Changes">
                <div className="space-y-1 py-1 text-xs">
                  <div className="grid grid-cols-5 text-[9px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-1">
                    <span>Change Type</span>
                    <span className="text-center">Modules</span>
                    <span>Requested By</span>
                    <span>Requested On</span>
                    <span className="text-right">Status</span>
                  </div>
                  {TENANT_ASSIGNMENT_DATA.pendingAssignmentChanges.map((ch, idx) => (
                    <div key={idx} className="grid grid-cols-5 text-[10px] items-center border-b border-slate-50 py-1 last:border-0">
                      <span className="font-semibold text-slate-800 truncate">{ch.changeType}</span>
                      <span className="text-center font-bold text-slate-700">{ch.moduleCount}</span>
                      <span className="text-slate-600 truncate">{ch.requestedBy}</span>
                      <span className="text-slate-500 text-[9px] truncate">{ch.requestedOn}</span>
                      <span className="text-right">
                        <span className="px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded text-[9px] font-bold">
                          {ch.status}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </AnalyticsPanel>

              {/* 6. Recent Assignment Activity */}
              <AnalyticsPanel number="" title="Recent Assignment Activity">
                <div className="space-y-1 py-1 text-xs">
                  <div className="grid grid-cols-4 text-[9px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-1">
                    <span>Activity</span>
                    <span>Module</span>
                    <span>User</span>
                    <span className="text-right">Time</span>
                  </div>
                  {TENANT_ASSIGNMENT_DATA.recentActivity.map((act, idx) => (
                    <div key={idx} className="grid grid-cols-4 text-[10px] items-center border-b border-slate-50 py-0.5 last:border-0">
                      <span className="font-semibold text-slate-800 truncate">{act.activity}</span>
                      <span className="text-slate-700 font-medium truncate">{act.module}</span>
                      <span className="text-slate-500 truncate">{act.user}</span>
                      <span className="text-right text-[9px] text-slate-400">{act.time}</span>
                    </div>
                  ))}
                </div>
              </AnalyticsPanel>
            </div>
          </div>
        </div>

        {/* Right Sidebar Section (3 Cols) */}
        <div className="w-full xl:w-72 shrink-0 space-y-4">
          {/* Panel 1: Assignment Health Score */}
          <AnalyticsPanel number="" title="Assignment Health">
            <div className="space-y-3 py-1 flex flex-col items-center justify-center text-center">
              <CircularScore score={Number(TENANT_ASSIGNMENT_DATA.assignmentHealthKpi.score)} maxScore={100} size={110} />
              <span className="text-xs font-bold text-emerald-700 mt-1">{TENANT_ASSIGNMENT_DATA.assignmentHealthKpi.label}</span>
              <p className="text-[10px] text-slate-500 leading-tight">
                {TENANT_ASSIGNMENT_DATA.assignmentHealthKpi.subtext}
              </p>
            </div>
          </AnalyticsPanel>

          {/* Panel 2: Tenant Alignment Summary */}
          <AnalyticsPanel number="" title="Tenant Alignment Summary">
            <div className="space-y-1.5 py-1 text-xs">
              {TENANT_ASSIGNMENT_DATA.tenantAlignmentSummary.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 border-b border-slate-50 pb-0.5">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className="font-bold text-slate-800">{item.count}</span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* Panel 3: Governance Summary */}
          <AnalyticsPanel number="" title="Governance Summary">
            <div className="space-y-1.5 py-1 text-xs">
              {TENANT_ASSIGNMENT_DATA.governanceSummary.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 border-b border-slate-50 pb-0.5">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className="font-bold text-emerald-700">{item.count}</span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* Panel 4: Production Eligibility Summary */}
          <AnalyticsPanel number="" title="Production Eligibility">
            <div className="space-y-1.5 py-1 text-xs">
              {TENANT_ASSIGNMENT_DATA.productionEligibilityRight.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 border-b border-slate-50 pb-0.5">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className="font-bold text-slate-800">{item.count}</span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* Panel 5: Actions */}
          <AnalyticsPanel number="" title="Actions">
            <div className="flex flex-col gap-1.5">
              {TENANT_ASSIGNMENT_DATA.finalActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => action.route ? router.push(action.route) : handleAction(action.label)}
                  className={`w-full py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer text-center ${
                    action.primary
                      ? "bg-burgundy hover:bg-burgundy-dark text-white shadow-xs"
                      : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </AnalyticsPanel>
        </div>
      </div>
    </AnalyticsShell>
  );
}
