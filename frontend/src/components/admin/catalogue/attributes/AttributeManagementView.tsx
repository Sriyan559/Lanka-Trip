"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import {
  CatalogueAttribute,
  AttributeGroupItem,
  AttributeFilterState,
  DuplicateAttributePair,
  VariantGenerationRule,
} from "@/types/attributeManagement";
import {
  MOCK_ATTRIBUTES,
  MOCK_ATTRIBUTE_GROUPS,
  MOCK_ATTRIBUTE_KPIS,
  MOCK_VARIANT_RULES,
} from "@/data/attributes.mock";

import { AttributeHeader } from "./components/AttributeHeader";
import { AttributeBusinessContext } from "./components/AttributeBusinessContext";
import { AttributeKpiGrid } from "./components/AttributeKpiGrid";
import { AttributeStatusTabs } from "./components/AttributeStatusTabs";
import { AttributeFilters } from "./components/AttributeFilters";
import { AttributeGroupPanel } from "./components/AttributeGroupPanel";
import { AttributeTable } from "./components/AttributeTable";
import { SelectedAttributePreview } from "./components/SelectedAttributePreview";
import { AttributeIntelligenceSidebar } from "./components/AttributeIntelligenceSidebar";
import { AttributeLowerDashboards } from "./components/AttributeLowerDashboards";

import { AttributeFormDrawer } from "./modals/AttributeFormDrawer";
import { VariantRuleDrawer } from "./modals/VariantRuleDrawer";
import { AllowedValuesDrawer } from "./modals/AllowedValuesDrawer";
import { ImportAttributesModal } from "./modals/ImportAttributesModal";
import { DuplicateAttributeComparisonModal } from "./modals/DuplicateAttributeComparisonModal";
import { SaveAttributeViewModal } from "./modals/SaveAttributeViewModal";
import { MoreAttributeFiltersDrawer } from "./modals/MoreAttributeFiltersDrawer";

export const AttributeManagementView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Primary Data State
  const [attributes, setAttributes] = useState<CatalogueAttribute[]>(MOCK_ATTRIBUTES);
  const [groups] = useState<AttributeGroupItem[]>(MOCK_ATTRIBUTE_GROUPS);
  const [selectedGroupName, setSelectedGroupName] = useState<string>("All Groups");
  const [selectedAttributeIds, setSelectedAttributeIds] = useState<string[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState<CatalogueAttribute | null>(MOCK_ATTRIBUTES[0] || null);
  const [activeKpiId, setActiveKpiId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters State
  const [filters, setFilters] = useState<AttributeFilterState>({
    searchQuery: searchParams.get("search") || "",
    statusTab: searchParams.get("tab") || "All Attributes",
    group: searchParams.get("group") || "All Groups",
    category: searchParams.get("category") || "All Categories",
    status: searchParams.get("status") || "All Statuses",
    dataType: searchParams.get("type") || "All Types",
    requiredStatus: searchParams.get("required") || "All",
    variantGenerating: searchParams.get("variant") || "All",
    channelEligibility: searchParams.get("channel") || "All Channels",
    riskLevel: searchParams.get("risk") || "All",
    owner: searchParams.get("owner") || "All Owners",
    updatedDate: "",
  });

  const [lastSynced, setLastSynced] = useState("04 Aug 2026, 12:57 AM");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal & Drawer States
  const [isCreateAttributeOpen, setIsCreateAttributeOpen] = useState(false);
  const [attributeToEdit, setAttributeToEdit] = useState<CatalogueAttribute | null>(null);
  const [isVariantRuleOpen, setIsVariantRuleOpen] = useState(false);
  const [ruleToEdit, setRuleToEdit] = useState<VariantGenerationRule | null>(null);
  const [isAllowedValuesOpen, setIsAllowedValuesOpen] = useState(false);
  const [allowedValuesAttribute, setAllowedValuesAttribute] = useState<CatalogueAttribute | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicatePair, setDuplicatePair] = useState<DuplicateAttributePair | null>(null);
  const [isSaveViewModalOpen, setIsSaveViewModalOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set("search", filters.searchQuery);
    if (filters.statusTab && filters.statusTab !== "All Attributes") params.set("tab", filters.statusTab);
    if (filters.dataType !== "All Types") params.set("type", filters.dataType);
    if (filters.requiredStatus !== "All") params.set("required", filters.requiredStatus);
    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetUrl, { scroll: false });
  }, [filters, pathname, router]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedGroupName]);

  // Filter Computation
  const filteredAttributes = useMemo(() => {
    return attributes.filter((a) => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !a.attributeName.toLowerCase().includes(q) &&
          !a.attributeId.toLowerCase().includes(q) &&
          !a.groupName.toLowerCase().includes(q) &&
          !a.owner.toLowerCase().includes(q)
        )
          return false;
      }
      if (selectedGroupName && selectedGroupName !== "All Groups") {
        if (a.groupName.toLowerCase() !== selectedGroupName.toLowerCase()) return false;
      }
      if (filters.group !== "All Groups" && a.groupName.toLowerCase() !== filters.group.toLowerCase()) return false;
      if (filters.statusTab !== "All Attributes") {
        const tab = filters.statusTab.toLowerCase();
        if (tab === "active" && !a.isRequired) return false;
        if (tab === "required" && !a.isRequired) return false;
        if (tab === "variant attributes" && !a.isVariantGenerating) return false;
        if (tab === "data quality issues" && a.issuesCount === 0) return false;
        if (tab === "duplicates" && a.riskLevel !== "Medium") return false;
        if (tab === "invalid combinations" && a.issuesCount < 3) return false;
      }
      if (filters.dataType !== "All Types" && a.dataType !== filters.dataType) return false;
      if (filters.requiredStatus === "Required" && !a.isRequired) return false;
      if (filters.requiredStatus === "Optional" && a.isRequired) return false;
      if (filters.variantGenerating === "Yes" && !a.isVariantGenerating) return false;
      if (filters.variantGenerating === "No" && a.isVariantGenerating) return false;
      if (filters.riskLevel !== "All" && a.riskLevel !== filters.riskLevel) return false;
      if (filters.owner !== "All Owners" && a.owner !== filters.owner) return false;
      return true;
    });
  }, [attributes, selectedGroupName, filters]);

  // Paginated slice
  const totalFiltered = filteredAttributes.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const paginatedAttributes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAttributes.slice(start, start + pageSize);
  }, [filteredAttributes, currentPage, pageSize]);

  // Tab counts
  const tabCounts = useMemo(() => ({
    all: attributes.length,
    active: attributes.filter((a) => a.isRequired).length,
    required: attributes.filter((a) => a.isRequired).length,
    variant: attributes.filter((a) => a.isVariantGenerating).length,
    dataQuality: attributes.filter((a) => a.issuesCount > 0).length,
    duplicates: attributes.filter((a) => a.riskLevel === "Medium").length,
    invalidCombos: attributes.filter((a) => a.issuesCount >= 3).length,
  }), [attributes]);

  // Event Handlers
  const handleFilterChange = (key: keyof AttributeFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      searchQuery: "",
      statusTab: "All Attributes",
      group: "All Groups",
      category: "All Categories",
      status: "All Statuses",
      dataType: "All Types",
      requiredStatus: "All",
      variantGenerating: "All",
      channelEligibility: "All Channels",
      riskLevel: "All",
      owner: "All Owners",
      updatedDate: "",
    });
    setSelectedGroupName("All Groups");
    setActiveKpiId(null);
    setSelectedAttributeIds([]);
    toast.success("Filters cleared.");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastSynced(
        now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
          ", " +
          now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      toast.success("Refreshed Attribute Management dataset.");
    }, 600);
  };

  const handleKpiClick = (kpiId: string) => {
    setActiveKpiId(kpiId === activeKpiId ? null : kpiId);
    if (kpiId === "kpi-2") setFilters((prev) => ({ ...prev, statusTab: "Active" }));
    else if (kpiId === "kpi-4") setFilters((prev) => ({ ...prev, statusTab: "Variant Attributes" }));
    else if (kpiId === "kpi-5") setFilters((prev) => ({ ...prev, requiredStatus: "Required" }));
    else if (kpiId === "kpi-6") setFilters((prev) => ({ ...prev, statusTab: "Data Quality Issues" }));
    else if (kpiId === "kpi-7") setFilters((prev) => ({ ...prev, statusTab: "Invalid Combinations" }));
    else setFilters((prev) => ({ ...prev, statusTab: "All Attributes" }));
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedAttributeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (paginatedAttributes.every((a) => selectedAttributeIds.includes(a.id))) {
      setSelectedAttributeIds([]);
    } else {
      setSelectedAttributeIds(paginatedAttributes.map((a) => a.id));
    }
  };

  const handleExport = () => {
    const targetAttrs =
      selectedAttributeIds.length > 0
        ? attributes.filter((a) => selectedAttributeIds.includes(a.id))
        : filteredAttributes;
    const headers = ["Attribute Name", "Attribute ID", "Group", "Data Type", "Input Type", "Required", "Variant Generating", "Completeness", "Owner"];
    const rows = targetAttrs.map((a) => [
      `"${a.attributeName}"`,
      `"${a.attributeId}"`,
      `"${a.groupName}"`,
      `"${a.dataType}"`,
      `"${a.inputType}"`,
      a.isRequired ? "Yes" : "No",
      a.isVariantGenerating ? "Yes" : "No",
      `${a.completenessPercent}%`,
      `"${a.owner}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `attribute_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${targetAttrs.length} attribute records to CSV!`);
  };

  const handleSaveAttribute = (attrData: Partial<CatalogueAttribute>) => {
    if (attributeToEdit) {
      setAttributes((prev) =>
        prev.map((a) =>
          a.id === attributeToEdit.id ? ({ ...a, ...attrData } as CatalogueAttribute) : a
        )
      );
    } else {
      const newAttr: CatalogueAttribute = {
        id: `attr-${Date.now()}`,
        attributeName: attrData.attributeName || "New Attribute",
        attributeId: attrData.attributeId || `ATTR-0${Math.floor(200 + Math.random() * 800)}`,
        groupName: attrData.groupName || "Variants & Attributes",
        dataType: attrData.dataType || "Text",
        inputType: attrData.inputType || "Dropdown",
        isRequired: attrData.isRequired ?? true,
        isVariantGenerating: attrData.isVariantGenerating ?? true,
        categoryCoveragePercent: 85,
        productUsageCount: 0,
        allowedValueCount: 10,
        variantCount: 10,
        validationRuleId: "VR-200",
        inheritance: "None",
        channelEligibilityText: "5 / 5",
        eligibleChannelsCount: 5,
        totalChannelsCount: 5,
        completenessPercent: 90,
        issuesCount: 0,
        riskLevel: "Low",
        owner: attrData.owner || "Elena Vance",
        updatedAt: "Just now",
        definition: attrData.definition,
      };
      setAttributes((prev) => [newAttr, ...prev]);
    }
  };

  const handleArchiveAttribute = (attr: CatalogueAttribute) => {
    setAttributes((prev) => prev.filter((a) => a.id !== attr.id));
    toast.success(`Archived attribute "${attr.attributeName}".`);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50/50 pb-12 min-w-0">
      {/* 1. Page Header */}
      <AttributeHeader
        onExport={handleExport}
        onImport={() => setIsImportModalOpen(true)}
        onBulkActions={() => toast.success(`Executing bulk action on ${selectedAttributeIds.length} items.`)}
        onCreateAttribute={() => {
          setAttributeToEdit(null);
          setIsCreateAttributeOpen(true);
        }}
        onCreateVariantRule={() => {
          setRuleToEdit(null);
          setIsVariantRuleOpen(true);
        }}
        selectedCount={selectedAttributeIds.length}
      />

      {/* 2. Business Context Strip */}
      <AttributeBusinessContext
        lastSynced={lastSynced}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Body — Two zones: ~82% workspace + ~18% sticky right rail */}
      <div className="flex flex-col xl:flex-row gap-4 p-4 sm:p-5 items-start min-w-0">

        {/* LEFT+CENTER: Main Workspace (82%) */}
        <div className="flex flex-col gap-4 min-w-0 flex-1">

          {/* 3. KPI Grid */}
          <AttributeKpiGrid
            kpis={MOCK_ATTRIBUTE_KPIS}
            activeKpiId={activeKpiId}
            onKpiClick={handleKpiClick}
          />

          {/* 4. Status Tabs */}
          <AttributeStatusTabs
            activeTab={filters.statusTab}
            onTabChange={(tab) => setFilters((prev) => ({ ...prev, statusTab: tab }))}
            counts={tabCounts}
          />

          {/* 5. Filter Bar */}
          <AttributeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
            onOpenSaveView={() => setIsSaveViewModalOpen(true)}
            onRefresh={handleRefresh}
          />

          {/* 6. Three-column workspace: Groups | Table | Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(160px,200px)_1fr_minmax(220px,280px)] gap-3 items-start min-w-0">

            {/* Left: Attribute Groups */}
            <div className="min-w-0">
              <AttributeGroupPanel
                groups={groups}
                selectedGroupName={selectedGroupName}
                onSelectGroup={(grpName) => setSelectedGroupName(grpName)}
              />
            </div>

            {/* Centre: Attributes Table */}
            <div className="min-w-0 overflow-hidden">
              <AttributeTable
                attributes={paginatedAttributes}
                totalCount={1842}
                filteredCount={totalFiltered}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
                selectedAttributeIds={selectedAttributeIds}
                selectedAttribute={selectedAttribute}
                onSelectAttribute={(a) => setSelectedAttribute(a)}
                onToggleSelectRow={handleToggleSelectRow}
                onToggleSelectAll={handleToggleSelectAll}
                onEditAttribute={(a) => {
                  setAttributeToEdit(a);
                  setIsCreateAttributeOpen(true);
                }}
                onManageAllowedValues={(a) => {
                  setAllowedValuesAttribute(a);
                  setIsAllowedValuesOpen(true);
                }}
                onArchiveAttribute={handleArchiveAttribute}
              />
            </div>

            {/* Right: Selected Attribute Preview */}
            <div className="min-w-0">
              <SelectedAttributePreview
                attribute={selectedAttribute}
                onEditAttribute={(a) => {
                  setAttributeToEdit(a);
                  setIsCreateAttributeOpen(true);
                }}
                onManageAllowedValues={(a) => {
                  setAllowedValuesAttribute(a);
                  setIsAllowedValuesOpen(true);
                }}
              />
            </div>
          </div>

          {/* 7. Lower Summary Dashboards */}
          <AttributeLowerDashboards
            onCompareDuplicate={(pair) => {
              setDuplicatePair(pair);
              setIsDuplicateModalOpen(true);
            }}
            onMergeDuplicate={(pair) => toast.success(`Merged duplicate into ${pair.attributeName}`)}
            onIgnoreDuplicate={() => toast.success("Ignored duplicate candidate match.")}
            onEditVariantRule={(rule) => {
              setRuleToEdit(rule);
              setIsVariantRuleOpen(true);
            }}
          />
        </div>

        {/* RIGHT: Intelligence Sidebar (18%, sticky) */}
        <div className="w-full xl:w-[280px] xl:shrink-0 xl:sticky xl:top-4 flex flex-col gap-3">
          <AttributeIntelligenceSidebar
            onSelectQueue={(queueKey) => {
              if (queueKey === "missing") setFilters((prev) => ({ ...prev, statusTab: "Data Quality Issues" }));
              else if (queueKey === "invalid") setFilters((prev) => ({ ...prev, statusTab: "Invalid Combinations" }));
              else if (queueKey === "skus") setFilters((prev) => ({ ...prev, statusTab: "Duplicates" }));
              else toast.success(`Filtering by ${queueKey}`);
            }}
          />
        </div>
      </div>

      {/* Modals & Drawers */}
      <AttributeFormDrawer
        isOpen={isCreateAttributeOpen}
        onClose={() => setIsCreateAttributeOpen(false)}
        attributeToEdit={attributeToEdit}
        onSave={handleSaveAttribute}
        existingAttributes={attributes}
      />

      <VariantRuleDrawer
        isOpen={isVariantRuleOpen}
        onClose={() => setIsVariantRuleOpen(false)}
        ruleToEdit={ruleToEdit}
        onSaveRule={() => toast.success("Saved variant rule!")}
      />

      <AllowedValuesDrawer
        isOpen={isAllowedValuesOpen}
        onClose={() => setIsAllowedValuesOpen(false)}
        attribute={allowedValuesAttribute}
      />

      <ImportAttributesModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={() => handleRefresh()}
      />

      <DuplicateAttributeComparisonModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        pair={duplicatePair}
        onMerge={(pair) => toast.success(`Merged duplicate into ${pair.attributeName}`)}
        onIgnore={() => toast.success("Ignored match.")}
      />

      <SaveAttributeViewModal
        isOpen={isSaveViewModalOpen}
        onClose={() => setIsSaveViewModalOpen(false)}
      />

      <MoreAttributeFiltersDrawer
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={() => {}}
      />
    </div>
  );
};
