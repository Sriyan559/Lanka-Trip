"use client";

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
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import {
  MODULE_REGISTRY_DATA,
  ModuleRegistryItem,
  KpiItem,
  MatrixRow,
  OwnerSummaryItem,
  ActivityItem,
  ExceptionItem,
} from "@/data/ecosystem-modules/moduleRegistryData";

export function ModuleRegistryWorkspace() {
  const router = useRouter();

  // State
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>(MODULE_REGISTRY_DATA.filterChips);

  // Connection Status items for ReadinessStrip
  const connectionItems = useMemo(
    () => [
      { label: "REGISTRY API", value: "v2.1 Connected", status: "connected" },
      { label: "SECURITY ENGINE", value: "Active", status: "success" },
      { label: "COMPLIANCE CONTROL", value: "Verified", status: "success" },
      { label: "DEPENDENCY MAP", value: "Synced", status: "success" },
      { label: "ENVIRONMENT SCOPE", value: "Production" },
      { label: "TRUSTED REGION", value: "Global / Multi-Region" },
    ],
    []
  );

  // Filter Modules
  const filteredModules = useMemo(() => {
    return MODULE_REGISTRY_DATA.modules.filter((mod) => {
      // Tab Filter
      if (activeTab === "core" && mod.moduleType !== "Core") return false;
      if (activeTab === "optional" && mod.moduleType !== "Optional") return false;
      if (activeTab === "planned" && mod.lifecycle !== "Planned") return false;
      if (activeTab === "release-candidates" && mod.releaseStatus !== "Release Candidate") return false;
      if (activeTab === "production-enabled" && mod.countriesEnabled < 1) return false;
      if (activeTab === "needs-attention" && mod.securityStatus !== "Approved" && mod.complianceStatus !== "Approved") return false;
      if (activeTab === "high-risk" && mod.dependencyStatus === "High Risk") return false;

      // Category Dropdown
      if (selectedCategory !== "all" && mod.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;

      // Status Dropdown
      if (selectedStatus !== "all" && mod.releaseStatus.toLowerCase() !== selectedStatus.toLowerCase()) return false;

      // Search Query
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesCode = mod.moduleCode.toLowerCase().includes(query);
        const matchesName = mod.moduleName.toLowerCase().includes(query);
        const matchesOwner = mod.scheduledOwner.toLowerCase().includes(query);
        const matchesCategory = mod.category.toLowerCase().includes(query);
        return matchesCode || matchesName || matchesOwner || matchesCategory;
      }

      return true;
    });
  }, [activeTab, searchTerm, selectedCategory, selectedStatus]);

  // Actions handlers
  const handleAction = (title: string) => {
    toast.success(`${title} action triggered`);
  };

  const handleRemoveChip = (chipToRemove: string) => {
    setActiveFilters((prev) => prev.filter((c) => c !== chipToRemove));
    toast.success(`Removed filter: ${chipToRemove}`);
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedRisk("all");
    toast.success("Cleared all filters");
  };

  const handleViewModule = (moduleKey: string) => {
    router.push(`/admin/ecosystem-modules/modules/${moduleKey}`);
  };

  // Table Columns (22 Columns matching screenshot)
  const registryCols: ColumnDef<ModuleRegistryItem>[] = [
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
            row.moduleType === "Core" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-purple-50 text-purple-700 border border-purple-200"
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
          status={row.lifecycle === "Operational" ? "success" : row.lifecycle === "Release Candidate" ? "warning" : "info"}
          label={row.lifecycle}
        />
      ),
    },
    { header: "Lifecycle Stage", accessorKey: "lifecycleStage", align: "left" },
    {
      header: "Operational Status",
      accessorKey: "operationalStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.operationalStatus === "Operational" ? "success" : row.operationalStatus === "Review Pending" ? "warning" : "info"}
          label={row.operationalStatus}
        />
      ),
    },
    {
      header: "Current Version",
      accessorKey: "currentVersion",
      align: "center",
      renderCell: (row) => <span className="font-mono text-[11px] font-semibold text-slate-700">{row.currentVersion}</span>,
    },
    {
      header: "Target Version",
      accessorKey: "targetVersion",
      align: "center",
      renderCell: (row) => <span className="font-mono text-[11px] font-semibold text-slate-500">{row.targetVersion}</span>,
    },
    {
      header: "Release Status",
      accessorKey: "releaseStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={
            row.releaseStatus === "Released" || row.releaseStatus === "Approved"
              ? "success"
              : row.releaseStatus === "Release Candidate" || row.releaseStatus === "Scheduled"
              ? "warning"
              : "info"
          }
          label={row.releaseStatus}
        />
      ),
    },
    {
      header: "Security Status",
      accessorKey: "securityStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.securityStatus === "Approved" ? "success" : row.securityStatus === "Review Pending" ? "warning" : "neutral"}
          label={row.securityStatus}
        />
      ),
    },
    {
      header: "Compliance Status",
      accessorKey: "complianceStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={
            row.complianceStatus === "Approved"
              ? "success"
              : row.complianceStatus === "Conditionally Approved" || row.complianceStatus === "Review Pending"
              ? "warning"
              : "neutral"
          }
          label={row.complianceStatus}
        />
      ),
    },
    {
      header: "Integration Status",
      accessorKey: "integrationStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.integrationStatus === "Approved" ? "success" : row.integrationStatus === "Review Pending" ? "warning" : "neutral"}
          label={row.integrationStatus}
        />
      ),
    },
    {
      header: "Dependency Status",
      accessorKey: "dependencyStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.dependencyStatus === "Approved" ? "success" : row.dependencyStatus === "Review Pending" ? "warning" : "neutral"}
          label={row.dependencyStatus}
        />
      ),
    },
    {
      header: "Countries Enabled",
      accessorKey: "countriesEnabled",
      align: "center",
      renderCell: (row) => <span className="font-extrabold text-slate-800">{row.countriesEnabled}</span>,
    },
    {
      header: "Adoption",
      accessorKey: "adoption",
      align: "right",
      renderCell: (row) => <span className="font-bold text-emerald-700">{row.adoption}%</span>,
    },
    {
      header: "Availability",
      accessorKey: "availability",
      align: "right",
      renderCell: (row) => <span className="font-medium text-slate-700">{row.availability}%</span>,
    },
    { header: "Region Coverage", accessorKey: "regionCoverage", align: "left" },
    { header: "Last Release", accessorKey: "lastRelease", align: "left" },
    { header: "Scheduled Owner", accessorKey: "scheduledOwner", align: "left" },
    { header: "Last Review", accessorKey: "lastReview", align: "left" },
    {
      header: "Actions",
      accessorKey: "id",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleViewModule(row.moduleKey)}
          className="px-2 py-1 bg-burgundy hover:bg-burgundy-dark text-white text-[10.5px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap"
        >
          View Module
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible Title MUST NOT contain "EM02" */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Enterprise Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Registry</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Module Registry &amp; Catalogue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized registry of all ecosystem modules, their metadata, dependencies, integrations, security, compliance and status across the ecosystem.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("Compare Modules")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <GitCompare size={12} /> Compare Modules
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Registry Risks")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShieldAlert size={12} /> Review Registry Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Register Module")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Register Module
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Registry")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            title="Export Registry"
          >
            <Download size={12} /> Export Registry
          </button>
          <button
            type="button"
            onClick={() => handleAction("View Release Calendar")}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            title="View Release Calendar"
          >
            <Calendar size={12} /> View Release Calendar
          </button>
        </div>
      </div>

      {/* 2. Top System / Source Connectivity Row */}
      <ReadinessStrip items={connectionItems} />

      {/* 3. Registry KPI Grid (9 KPI Cards + 1 Gauge Card) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-10 gap-2 min-w-0">
        {MODULE_REGISTRY_DATA.primaryKpis.map((kpi) => (
          <div
            key={kpi.id}
            onClick={() => handleAction(`KPI ${kpi.label}`)}
            className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer min-w-0 overflow-hidden"
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight truncate block mb-1">
              {kpi.label}
            </span>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 leading-none whitespace-nowrap">
                {kpi.value}
              </span>
            </div>
            <span className="text-[9.5px] font-medium text-slate-400 truncate block border-t border-slate-100 pt-1 mt-1">
              {kpi.subtext}
            </span>
          </div>
        ))}

        {/* Card 10: Registry Health Circular Score */}
        <div className="an02-overall-health-card bg-white p-2 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-[9.5px] font-bold text-slate-800 uppercase tracking-tight">
            Registry Health
          </span>
          <div className="my-0.5">
            <CircularScore score={MODULE_REGISTRY_DATA.registryHealthKpi.score} maxScore={100} size={54} strokeWidth={5} />
          </div>
          <span className="text-[10.5px] font-bold text-emerald-700">
            {MODULE_REGISTRY_DATA.registryHealthKpi.label}
          </span>
          <span className="text-[8.5px] font-medium text-slate-500">
            {MODULE_REGISTRY_DATA.registryHealthKpi.subtext}
          </span>
        </div>
      </div>

      {/* 4. Secondary Compact KPI Summary Row (8 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-8 gap-2 min-w-0">
        {MODULE_REGISTRY_DATA.secondaryKpis.map((skpi) => (
          <div
            key={skpi.id}
            className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between min-w-0 overflow-hidden"
          >
            <div className="min-w-0 flex-1 pr-1">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase block truncate">{skpi.label}</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 whitespace-nowrap">{skpi.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Module Navigation Tabs */}
      <TabNavigation
        tabs={MODULE_REGISTRY_DATA.tabs.map((t) => (t.count !== undefined ? `${t.label} (${t.count})` : t.label))}
        activeTab={activeTab}
        onSelectTab={(tabLabel) => {
          const tabObj = MODULE_REGISTRY_DATA.tabs.find(
            (t) => (t.count !== undefined ? `${t.label} (${t.count})` : t.label) === tabLabel
          );
          if (tabObj) setActiveTab(tabObj.id);
        }}
      />

      {/* 6. Search & Filter Area */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Search + Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-2 flex-1">
            <div className="col-span-2">
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Search Registry</label>
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search modules, owners, tags..."
                  className="w-full text-[11px] pl-7 pr-2 py-1.5 border border-slate-200 rounded bg-slate-50 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:border-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Module</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                <option value="all">All Modules</option>
                <option value="customer">Customer</option>
                <option value="marketplace">Marketplace</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Release Candidate</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="released">Released</option>
                <option value="release candidate">Release Candidate</option>
                <option value="scheduled">Scheduled</option>
                <option value="planned">Planned</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Needs Review</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Statuses</option>
                <option>Review Pending</option>
                <option>Not Assessed</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Risk</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Levels</option>
                <option>High Risk</option>
                <option>Low Risk</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Compliance</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Categories</option>
                <option>Approved</option>
                <option>Pending</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Countries</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Countries</option>
                <option>Sri Lanka</option>
                <option>Singapore</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Adoption</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All</option>
                <option>&gt; 80%</option>
                <option>&lt; 50%</option>
              </select>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
            <button
              type="button"
              onClick={() => handleAction("Toggle Filters")}
              className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Filter size={11} /> Filters
            </button>
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="text-burgundy text-xs font-bold hover:underline cursor-pointer ml-1"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Removable Quick Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Quick Filters:</span>
            {activeFilters.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200"
              >
                <span>{chip}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChip(chip)}
                  className="text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 7. Main 12-Column Dashboard Body */}
      <div className="flex flex-col xl:flex-row gap-4 min-w-0">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Card 1: Module Registry Table */}
          <AnalyticsPanel number="" title="Module Registry">
            <AnalyticsTable columns={registryCols} data={filteredModules} />
          </AnalyticsPanel>

          {/* Card 2: Visual Analytics Section (7 Charts Row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-3">
            {/* Donut 1: Classification */}
            <AnalyticsPanel number="" title="Classification">
              <PieChart
                data={MODULE_REGISTRY_DATA.classificationData}
                centerText="16"
                centerSubtext="Total"
                innerRadius="56%"
                outerRadius="82%"
                height={150}
              />
            </AnalyticsPanel>

            {/* Donut 2: Lifecycle Distribution */}
            <AnalyticsPanel number="" title="Lifecycle Distribution">
              <PieChart
                data={MODULE_REGISTRY_DATA.lifecycleData}
                centerText="16"
                centerSubtext="Total"
                innerRadius="56%"
                outerRadius="82%"
                height={150}
              />
            </AnalyticsPanel>

            {/* Progress 3: Release Readiness */}
            <AnalyticsPanel number="" title="Release Readiness">
              <div className="space-y-2 py-1 text-xs">
                {MODULE_REGISTRY_DATA.releaseReadinessData.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[10.5px]">
                      <span className="font-medium text-slate-700 truncate">{item.name}</span>
                      <span className="font-extrabold text-slate-900">{item.value} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Progress 4: Dependency Health */}
            <AnalyticsPanel number="" title="Dependency Health">
              <div className="space-y-2 py-1 text-xs">
                {MODULE_REGISTRY_DATA.dependencyHealthData.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[10.5px]">
                      <span className="font-medium text-slate-700 truncate">{item.name}</span>
                      <span className="font-extrabold text-slate-900">{item.value} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Progress 5: Integration Registry Summary */}
            <AnalyticsPanel number="" title="Integration Registry Summary">
              <div className="space-y-2 py-1 text-xs">
                {MODULE_REGISTRY_DATA.integrationSummaryData.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[10.5px]">
                      <span className="font-medium text-slate-700 truncate">{item.name}</span>
                      <span className="font-extrabold text-slate-900">{item.value} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Progress 6: Countries & Compliance */}
            <AnalyticsPanel number="" title="Countries &amp; Compliance">
              <div className="space-y-2 py-1 text-xs">
                {MODULE_REGISTRY_DATA.countriesComplianceData.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[10.5px]">
                      <span className="font-medium text-slate-700 truncate">{item.name}</span>
                      <span className="font-extrabold text-slate-900">{item.value} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Bar 7: Adoption by Module */}
            <AnalyticsPanel number="" title="Adoption by Module">
              <HorizontalBarChart data={MODULE_REGISTRY_DATA.adoptionByModuleData} height={150} />
            </AnalyticsPanel>
          </div>

          {/* Card 3: Lower Dashboard Grid (6 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Panel 1: Module Health Matrix */}
            <AnalyticsPanel number="" title="Module Health Matrix">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="grid grid-cols-8 text-[9px] font-bold text-slate-400 uppercase text-center border-b border-slate-100 pb-1">
                  <span className="text-left col-span-2">Code</span>
                  <span>Cfg</span>
                  <span>Int</span>
                  <span>Dep</span>
                  <span>Sec</span>
                  <span>Cmp</span>
                  <span>Adp</span>
                </div>
                {MODULE_REGISTRY_DATA.healthMatrix.map((row) => (
                  <div key={row.code} className="grid grid-cols-8 text-[10.5px] items-center text-center py-0.5 border-b border-slate-50 last:border-0">
                    <span className="font-bold text-slate-800 text-left col-span-2 truncate">{row.code}</span>
                    <span className={`w-2 h-2 rounded-full mx-auto ${row.config === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span className={`w-2 h-2 rounded-full mx-auto ${row.integr === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span className={`w-2 h-2 rounded-full mx-auto ${row.deps === "success" ? "bg-emerald-500" : row.deps === "neutral" ? "bg-slate-300" : "bg-amber-500"}`} />
                    <span className={`w-2 h-2 rounded-full mx-auto ${row.sec === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span className={`w-2 h-2 rounded-full mx-auto ${row.compl === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span className={`w-2 h-2 rounded-full mx-auto ${row.adopt === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Panel 2: Ownership & Accountability */}
            <AnalyticsPanel number="" title="Ownership &amp; Accountability">
              <div className="space-y-2 py-1 text-xs">
                {MODULE_REGISTRY_DATA.ownershipList.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-100 pb-1 last:border-0">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="font-extrabold text-burgundy">{item.modulesCount} modules</span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAction("View ownership directory")}
                  className="text-[10px] font-bold text-burgundy hover:underline block pt-1"
                >
                  View ownership directory &rarr;
                </button>
              </div>
            </AnalyticsPanel>

            {/* Panel 3: Dependency Risks */}
            <AnalyticsPanel number="" title="Dependency Risks">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">High Risk</span>
                  <span className="font-extrabold text-rose-600">{MODULE_REGISTRY_DATA.dependencyRisks.high}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Medium Risk</span>
                  <span className="font-extrabold text-amber-600">{MODULE_REGISTRY_DATA.dependencyRisks.medium}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Low Risk</span>
                  <span className="font-extrabold text-emerald-600">{MODULE_REGISTRY_DATA.dependencyRisks.low}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">None</span>
                  <span className="font-extrabold text-slate-700">{MODULE_REGISTRY_DATA.dependencyRisks.none}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAction("View dependency risks")}
                  className="text-[10px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
                >
                  View dependency risks &rarr;
                </button>
              </div>
            </AnalyticsPanel>

            {/* Panel 4: Security & Compliance Overview */}
            <AnalyticsPanel number="" title="Security &amp; Compliance">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Security Approved</span>
                  <span className="font-extrabold text-emerald-700">{MODULE_REGISTRY_DATA.securityComplianceOverview.securityApproved}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Security Review Pending</span>
                  <span className="font-extrabold text-amber-600">{MODULE_REGISTRY_DATA.securityComplianceOverview.securityReviewPending}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Compliance Approved</span>
                  <span className="font-extrabold text-emerald-700">{MODULE_REGISTRY_DATA.securityComplianceOverview.complianceApproved}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Compliance Pending</span>
                  <span className="font-extrabold text-amber-600">{MODULE_REGISTRY_DATA.securityComplianceOverview.complianceReviewPending}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAction("View compliance dashboard")}
                  className="text-[10px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
                >
                  View compliance dashboard &rarr;
                </button>
              </div>
            </AnalyticsPanel>

            {/* Panel 5: Registry Exception Center */}
            <AnalyticsPanel number="" title="Registry Exception Center">
              <div className="space-y-1.5 py-1 text-xs">
                {MODULE_REGISTRY_DATA.exceptionsList.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10.5px]">
                    <span className="text-slate-600 truncate">{item.type}</span>
                    <span className={`font-extrabold ${item.tone === "danger" ? "text-rose-600" : "text-amber-600"}`}>
                      {item.count}
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAction("View exceptions")}
                  className="text-[10px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
                >
                  View exceptions &rarr;
                </button>
              </div>
            </AnalyticsPanel>

            {/* Panel 6: Recent Registry Activity */}
            <AnalyticsPanel number="" title="Recent Registry Activity">
              <div className="space-y-2 py-1 text-xs">
                {MODULE_REGISTRY_DATA.recentActivity.map((act) => (
                  <div key={act.id} className="space-y-0.5 text-[10.5px]">
                    <div className="font-semibold text-slate-800 truncate">{act.title}</div>
                    <div className="flex justify-between text-[9.5px] text-slate-400">
                      <span>{act.by}</span>
                      <span>{act.when}</span>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAction("View all activity")}
                  className="text-[10px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
                >
                  View all activity &rarr;
                </button>
              </div>
            </AnalyticsPanel>
          </div>
        </div>

        {/* Right Sidebar Section (3 Cols) */}
        <div className="w-full xl:w-72 shrink-0 space-y-4">
          {/* Panel 1: Portfolio Health */}
          <AnalyticsPanel number="" title="Portfolio Health">
            <div className="space-y-3 py-1">
              <div className="flex flex-col items-center justify-center text-center">
                <CircularScore score={91} maxScore={100} size={70} strokeWidth={6} />
                <span className="text-xs font-bold text-emerald-700 mt-1">Excellent Score</span>
              </div>
              <div className="space-y-2 text-xs border-t border-slate-100 pt-2">
                {MODULE_REGISTRY_DATA.portfolioHealthMetrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium text-slate-600 truncate">{m.label}</span>
                      <span className="font-bold text-slate-900">{m.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.tone === "success" ? "bg-emerald-500" : "bg-amber-500"}`}
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleAction("View portfolio health")}
                className="text-[11px] font-bold text-burgundy hover:underline block pt-1"
              >
                View portfolio health &rarr;
              </button>
            </div>
          </AnalyticsPanel>

          {/* Panel 2: Portfolio Summary */}
          <AnalyticsPanel number="" title="Portfolio Summary">
            <div className="space-y-1.5 py-1 text-xs">
              {MODULE_REGISTRY_DATA.portfolioSummary.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-100 pb-1 last:border-0">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-extrabold text-slate-900">{item.count}</span>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAction("View module inventory")}
                className="text-[11px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
              >
                View module inventory &rarr;
              </button>
            </div>
          </AnalyticsPanel>

          {/* Panel 3: Release Summary */}
          <AnalyticsPanel number="" title="Release Summary">
            <div className="space-y-1.5 py-1 text-xs">
              {MODULE_REGISTRY_DATA.releaseSummary.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-100 pb-1 last:border-0">
                  <span className="text-slate-600">{item.label}</span>
                  <span
                    className={`font-extrabold ${
                      item.tone === "danger"
                        ? "text-rose-600"
                        : item.tone === "warning"
                        ? "text-amber-600"
                        : item.tone === "success"
                        ? "text-emerald-700"
                        : "text-slate-900"
                    }`}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAction("View release summary")}
                className="text-[11px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
              >
                View release summary &rarr;
              </button>
            </div>
          </AnalyticsPanel>

          {/* Panel 4: Governance Summary */}
          <AnalyticsPanel number="" title="Governance Summary">
            <div className="space-y-1.5 py-1 text-xs">
              {MODULE_REGISTRY_DATA.governanceSummary.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-100 pb-1 last:border-0">
                  <span className="text-slate-600 truncate">{item.label}</span>
                  <span className={`font-extrabold ${item.tone === "danger" ? "text-rose-600" : "text-amber-600"}`}>
                    {item.count}
                  </span>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAction("View governance dashboard")}
                className="text-[11px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
              >
                View governance dashboard &rarr;
              </button>
            </div>
          </AnalyticsPanel>

          {/* Panel 5: Priority Queues */}
          <AnalyticsPanel number="" title="Priority Queues">
            <div className="space-y-1.5 py-1 text-xs">
              {MODULE_REGISTRY_DATA.priorityQueues.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-100 pb-1 last:border-0">
                  <span className="text-slate-600 truncate">{item.label}</span>
                  <span className={`font-extrabold ${item.tone === "danger" ? "text-rose-600" : "text-amber-600"}`}>
                    {item.count}
                  </span>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAction("View all queues")}
                className="text-[11px] font-bold text-burgundy hover:underline block pt-1 border-t border-slate-100"
              >
                View all queues &rarr;
              </button>
            </div>
          </AnalyticsPanel>

          {/* Panel 6: Final Actions */}
          <AnalyticsPanel number="" title="Final Actions">
            <div className="grid grid-cols-2 gap-2 text-xs py-1">
              {MODULE_REGISTRY_DATA.finalActions.map((act, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAction(act.label)}
                  className={`p-2 rounded text-[10.5px] font-semibold text-center border transition-all cursor-pointer ${
                    act.primary
                      ? "bg-burgundy text-white border-burgundy hover:bg-burgundy-dark"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </AnalyticsPanel>
        </div>
      </div>
    </AnalyticsShell>
  );
}
