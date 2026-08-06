"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { CATEGORY_KPIS, CATEGORY_STATUS_TABS, MOCK_HIERARCHY_TREE, MOCK_CATEGORIES_TABLE } from "@/data/categories.mock";
import { CategoryItem, HierarchyNode, CategoryFilterState, DuplicateCategoryPair } from "@/types/categoryManagement";

import { CategoryHeader } from "./components/CategoryHeader";
import { CategoryBusinessContext } from "./components/CategoryBusinessContext";
import { CategoryKpiGrid } from "./components/CategoryKpiGrid";
import { CategoryStatusTabs } from "./components/CategoryStatusTabs";
import { CategoryFilters } from "./components/CategoryFilters";
import { CategoryHierarchyTree } from "./components/CategoryHierarchyTree";
import { CategoryTable } from "./components/CategoryTable";
import { SelectedCategoryOverview } from "./components/SelectedCategoryOverview";
import { TaxonomyIntelligenceSidebar } from "./components/TaxonomyIntelligenceSidebar";
import { CategoryLowerDashboards } from "./components/CategoryLowerDashboards";

import { CategoryFormDrawer } from "./modals/CategoryFormDrawer";
import { ImportCategoryMappingModal } from "./modals/ImportCategoryMappingModal";
import { MoveCategoryModal } from "./modals/MoveCategoryModal";
import { MergeCategoryModal } from "./modals/MergeCategoryModal";
import { DuplicateCategoryModal } from "./modals/DuplicateCategoryModal";
import { SaveCategoryViewModal } from "./modals/SaveCategoryViewModal";
import { MoreCategoryFiltersDrawer } from "./modals/MoreCategoryFiltersDrawer";

export function CategoryManagementView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [categories, setCategories] = useState<CategoryItem[]>(MOCK_CATEGORIES_TABLE);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(MOCK_CATEGORIES_TABLE[0]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-faceserum");
  const [activeTabId, setActiveTabId] = useState<string>(searchParams.get("tab") || "all");
  const [lastSyncedTime, setLastSyncedTime] = useState("04 Aug 2026, 12:57 AM");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<CategoryFilterState>({
    searchQuery: "",
    department: "all",
    parentCategory: "all",
    categoryLevel: "all",
    status: "all",
    requiredAttributes: "all",
    channelEligibility: "all",
    complianceStatus: "all",
    owner: "all",
    updatedDate: "all",
  });

  // Modal / Drawer States
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [drawerData, setDrawerData] = useState<CategoryItem | null>(null);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [moveCategoryTarget, setMoveCategoryTarget] = useState<CategoryItem | null>(null);

  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [mergeCategoryTarget, setMergeCategoryTarget] = useState<CategoryItem | null>(null);

  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicatePair, setDuplicatePair] = useState<DuplicateCategoryPair | null>(null);

  const [isSaveViewModalOpen, setIsSaveViewModalOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Filter Logic
  const handleFilterChange = (field: keyof CategoryFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      searchQuery: "",
      department: "all",
      parentCategory: "all",
      categoryLevel: "all",
      status: "all",
      requiredAttributes: "all",
      channelEligibility: "all",
      complianceStatus: "all",
      owner: "all",
      updatedDate: "all",
    });
    setActiveTabId("all");
    setSelectedCategoryIds([]);
    toast.success("Filters cleared.");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastSyncedTime(now.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }));
      setIsRefreshing(false);
      toast.success("Category dataset & health synced successfully.");
    }, 600);
  };

  // Tab change
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (tabId === "active") setFilters((prev) => ({ ...prev, status: "Active" }));
    else if (tabId === "draft") setFilters((prev) => ({ ...prev, status: "Draft" }));
    else if (tabId === "review") setFilters((prev) => ({ ...prev, status: "Review Required" }));
    else if (tabId === "archived") setFilters((prev) => ({ ...prev, status: "Archived" }));
    else setFilters((prev) => ({ ...prev, status: "all" }));
  };

  // KPI Select
  const handleKpiSelect = (filterKey: string) => {
    if (filterKey === "active") handleTabChange("active");
    else if (filterKey === "review") handleTabChange("review");
    else if (filterKey === "archived") handleTabChange("archived");
    else if (filterKey === "duplicates") handleTabChange("duplicates");
    else if (filterKey === "uncategorized") handleTabChange("uncategorized");
    else handleTabChange("all");
  };

  // Export Report CSV
  const handleExportReport = () => {
    const csvContent =
      "Category ID,Category Name,Hierarchy Path,Level,Parent,Products,Attributes,Coverage,Status\n" +
      categories
        .map(
          (c) =>
            `"${c.categoryId}","${c.categoryName}","${c.hierarchyPath}",${c.level},"${c.parentCategory}",${c.activeProductsCount},${c.requiredAttributesCount},${c.attributeCoveragePercent}%,"${c.status}"`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Category_Management_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Category report exported successfully (CSV).");
  };

  // Table selection
  const handleToggleSelectRow = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedCategoryIds.length === categories.length) {
      setSelectedCategoryIds([]);
    } else {
      setSelectedCategoryIds(categories.map((c) => c.id));
    }
  };

  // Category Actions
  const handleOpenCreateDrawer = (parentCat?: CategoryItem) => {
    setDrawerMode("create");
    setDrawerData(parentCat || null);
    setIsCategoryDrawerOpen(true);
  };

  const handleOpenEditDrawer = (cat: CategoryItem) => {
    setDrawerMode("edit");
    setDrawerData(cat);
    setIsCategoryDrawerOpen(true);
  };

  const handleSaveCategoryDrawer = (data: Partial<CategoryItem>) => {
    if (drawerMode === "create") {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        categoryName: data.categoryName || "New Category",
        categoryId: data.categoryId || `CAT-SKN-${Math.floor(Math.random() * 900 + 100)}`,
        hierarchyPath: `Beauty > Skincare > ${data.parentCategory} > ${data.categoryName}`,
        level: data.level || 4,
        parentCategory: data.parentCategory || "Face Care",
        activeProductsCount: 0,
        childCategoriesCount: 0,
        requiredAttributesCount: data.requiredAttributesCount || 10,
        attributeCoveragePercent: 100,
        channelEligibilityText: "5/5",
        seoReadinessPercent: 100,
        complianceStatus: "Configured",
        status: (data.status as any) || "Active",
        riskLevel: "Low",
        owner: data.owner || "Elena Vance",
        updatedDate: "Just now",
        slug: data.slug || "new-category",
        description: data.description || "",
      };
      setCategories((prev) => [newCat, ...prev]);
      setSelectedCategory(newCat);
    } else if (drawerMode === "edit" && drawerData) {
      setCategories((prev) =>
        prev.map((c) => (c.id === drawerData.id ? ({ ...c, ...data } as CategoryItem) : c))
      );
      if (selectedCategory?.id === drawerData.id) {
        setSelectedCategory((prev) => (prev ? ({ ...prev, ...data } as CategoryItem) : null));
      }
    }
  };

  const handleViewProducts = (cat: CategoryItem) => {
    router.push(`/admin/catalogue/products?category=${encodeURIComponent(cat.categoryName)}`);
  };

  const handleManageAttributes = (cat: CategoryItem) => {
    toast.success(`Opening attribute schema manager for ${cat.categoryName}...`);
  };

  const handleArchiveCategory = (cat: CategoryItem) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, status: "Archived" } : c))
    );
    toast.success(`Category ${cat.categoryName} archived.`);
  };

  // Filtered dataset
  const filteredCategories = categories.filter((c) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        c.categoryName.toLowerCase().includes(q) ||
        c.categoryId.toLowerCase().includes(q) ||
        c.hierarchyPath.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.status !== "all" && c.status !== filters.status) return false;
    if (filters.parentCategory !== "all" && c.parentCategory !== filters.parentCategory) return false;
    if (filters.categoryLevel !== "all" && c.level.toString() !== filters.categoryLevel) return false;
    if (filters.complianceStatus !== "all" && c.complianceStatus !== filters.complianceStatus) return false;
    if (filters.owner !== "all" && c.owner !== filters.owner) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8fafc] p-4 sm:p-6 pb-24">
      {/* Header */}
      <CategoryHeader
        selectedCount={selectedCategoryIds.length}
        onExportReport={handleExportReport}
        onImportMapping={() => setIsImportModalOpen(true)}
        onBulkActions={() => toast.success(`Bulk action triggered for ${selectedCategoryIds.length} categories.`)}
        onCreateCategory={() => handleOpenCreateDrawer()}
      />

      {/* Business Context Strip */}
      <CategoryBusinessContext
        lastSyncedTime={lastSyncedTime}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 12 KPI Cards */}
      <CategoryKpiGrid kpis={CATEGORY_KPIS} onSelectKpi={handleKpiSelect} />

      {/* Status Tabs */}
      <CategoryStatusTabs
        tabs={CATEGORY_STATUS_TABS}
        activeTabId={activeTabId}
        onSelectTab={handleTabChange}
      />

      {/* 2-Row Filters */}
      <CategoryFilters
        filters={filters}
        onChange={handleFilterChange}
        onClearAll={handleClearAll}
        onMoreFilters={() => setIsMoreFiltersOpen(true)}
        onSaveView={() => setIsSaveViewModalOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Workspace Layout (Left Content Area + Right 280px Rail) */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4 items-start min-w-0">
        {/* Main Content Area */}
        <div className="min-w-0 flex flex-col gap-6">
          {/* 3-Column Workspace Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-w-0">
            {/* Left Tree: 3 cols */}
            <div className="lg:col-span-3 min-w-0">
              <CategoryHierarchyTree
                tree={MOCK_HIERARCHY_TREE}
                selectedNodeId={selectedNodeId}
                onSelectNode={(node) => {
                  setSelectedNodeId(node.id);
                  const found = categories.find((c) => c.categoryName.toLowerCase() === node.name.toLowerCase());
                  if (found) setSelectedCategory(found);
                }}
                onAddChild={(parentNode) => {
                  const target = parentNode
                    ? categories.find((c) => c.categoryName === parentNode.name)
                    : selectedCategory;
                  handleOpenCreateDrawer(target || undefined);
                }}
                onMoveNode={() => {
                  setMoveCategoryTarget(selectedCategory);
                  setIsMoveModalOpen(true);
                }}
                onMergeNode={() => {
                  setMergeCategoryTarget(selectedCategory);
                  setIsMergeModalOpen(true);
                }}
              />
            </div>

            {/* Center Table: 6 cols */}
            <div className="lg:col-span-6 min-w-0">
              <CategoryTable
                categories={filteredCategories}
                selectedCategoryIds={selectedCategoryIds}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onToggleSelectRow={handleToggleSelectRow}
                onToggleSelectAll={handleToggleSelectAll}
                onEditCategory={handleOpenEditDrawer}
                onManageAttributes={handleManageAttributes}
                onViewProducts={handleViewProducts}
                onAddChild={(cat) => handleOpenCreateDrawer(cat)}
                onMoveCategory={(cat) => {
                  setMoveCategoryTarget(cat);
                  setIsMoveModalOpen(true);
                }}
                onMergeCategory={(cat) => {
                  setMergeCategoryTarget(cat);
                  setIsMergeModalOpen(true);
                }}
                onArchiveCategory={handleArchiveCategory}
              />
            </div>

            {/* Right Selected Category Overview: 3 cols */}
            <div className="lg:col-span-3 min-w-0">
              <SelectedCategoryOverview
                category={selectedCategory}
                onEditCategory={handleOpenEditDrawer}
                onManageAttributes={handleManageAttributes}
                onViewProducts={handleViewProducts}
              />
            </div>
          </div>

          {/* Lower Dashboards Grid */}
          <CategoryLowerDashboards
            onCompareDuplicate={(pair) => {
              setDuplicatePair(pair);
              setIsDuplicateModalOpen(true);
            }}
            onMergeDuplicate={(pair) => {
              toast.success(`Merged ${pair.categoryA} into ${pair.categoryB}`);
            }}
            onIgnoreDuplicate={(pair) => {
              toast.success(`Ignored candidate duplicate pair.`);
            }}
          />
        </div>

        {/* Far Right Taxonomy Intelligence & Governance Rail: 280px */}
        <div className="w-full xl:w-[280px] xl:shrink-0 sticky xl:top-4 flex flex-col gap-4">
          <TaxonomyIntelligenceSidebar onSelectQueue={handleKpiSelect} />
        </div>
      </div>

      {/* Modals and Drawers */}
      <CategoryFormDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
        initialData={drawerData}
        mode={drawerMode}
        onSave={handleSaveCategoryDrawer}
      />

      <ImportCategoryMappingModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <MoveCategoryModal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        category={moveCategoryTarget}
        onConfirmMove={(cat, newParent) => {
          setCategories((prev) =>
            prev.map((c) => (c.id === cat.id ? { ...c, parentCategory: newParent } : c))
          );
        }}
      />

      <MergeCategoryModal
        isOpen={isMergeModalOpen}
        onClose={() => setIsMergeModalOpen(false)}
        sourceCategory={mergeCategoryTarget}
        onConfirmMerge={(source, targetName) => {
          setCategories((prev) => prev.filter((c) => c.id !== source.id));
        }}
      />

      <DuplicateCategoryModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        pair={duplicatePair}
        onMerge={(pair) => {
          toast.success(`Merged candidate duplicate pair ${pair.categoryA} -> ${pair.categoryB}`);
        }}
        onIgnore={(pair) => {
          toast.success(`Ignored candidate duplicate pair.`);
        }}
      />

      <SaveCategoryViewModal
        isOpen={isSaveViewModalOpen}
        onClose={() => setIsSaveViewModalOpen(false)}
      />

      <MoreCategoryFiltersDrawer
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={() => toast.success("Advanced category filters applied.")}
      />
    </div>
  );
}
