"use client";

import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  PRODUCT_KPIS,
  INITIAL_QUICK_FILTERS,
  MOCK_PRODUCT_MASTERS,
} from "@/data/productMasters.mock";
import { AdvancedFilterState, ProductMasterRow } from "@/types/productMaster";
import { ProductMasterHeader } from "./components/ProductMasterHeader";
import { ProductMasterKpiGrid } from "./components/ProductMasterKpiGrid";
import { ProductStatusTabs } from "./components/ProductStatusTabs";
import { ProductAdvancedFilters } from "./components/ProductAdvancedFilters";
import { ProductQuickFilters } from "./components/ProductQuickFilters";
import { ProductHealthScorecard } from "./components/ProductHealthScorecard";
import { ProductMasterTable } from "./components/ProductMasterTable";
import { ProductMasterIntelligence } from "./components/ProductMasterIntelligence";
import { LowerSummaryDashboards } from "./components/LowerSummaryDashboards";
import { ImportProductsModal } from "./components/ImportProductsModal";
import { SaveProductViewModal } from "./components/SaveProductViewModal";
import { MoreProductFiltersDrawer } from "./components/MoreProductFiltersDrawer";
import { useRouter } from "next/navigation";

export function ProductMasterManagementView() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("all");
  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  const [activeChips, setActiveChips] = useState<string[]>([
    "qf-1",
    "qf-2",
    "qf-3",
    "qf-4",
    "qf-5",
    "qf-6",
    "qf-7",
    "qf-8",
  ]);

  const [filters, setFilters] = useState<AdvancedFilterState>({
    search: "",
    productStatus: "All",
    approvalStatus: "All",
    publicationStatus: "All",
    complianceStatus: "All",
    riskLevel: "All",
    brand: "All",
    supplier: "All",
    category: "All",
    subcategory: "All",
    productType: "All",
    businessUnit: "All",
    variantReadiness: "All",
    mediaReadiness: "All",
    inventoryLinkage: "All",
    duplicateRisk: "All",
    brandAuthorization: "All",
    batchEligibility: "All",
    channelEligibility: "All",
    countryOfOrigin: "All",
    createdDate: "",
    updatedDate: "",
    assignedReviewer: "All",
    dataCompleteness: "All",
  });

  const [selectedIds, setSelectedIds] = useState<string[]>(["pm-1"]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals & Drawers
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSaveViewModalOpen, setIsSaveViewModalOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Export CSV handler
  const handleExportCSV = () => {
    const recordsToExport =
      selectedIds.length > 0
        ? MOCK_PRODUCT_MASTERS.filter((p) => selectedIds.includes(p.id))
        : MOCK_PRODUCT_MASTERS;

    const csvRows = [
      ["Public ID", "DB Product ID", "Name", "SKU", "Barcode", "Brand", "Category", "Status"].join(","),
      ...recordsToExport.map((p) =>
        [
          p.publicId,
          p.dbProductId,
          `"${p.productName}"`,
          p.sku,
          p.barcode,
          `"${p.brand}"`,
          `"${p.category}"`,
          p.productStatus,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `product_masters_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Exported ${recordsToExport.length} product masters to CSV.`);
  };

  const handleFilterChange = (updated: Partial<AdvancedFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      search: "",
      productStatus: "All",
      approvalStatus: "All",
      publicationStatus: "All",
      complianceStatus: "All",
      riskLevel: "All",
      brand: "All",
      supplier: "All",
      category: "All",
      subcategory: "All",
      productType: "All",
      businessUnit: "All",
      variantReadiness: "All",
      mediaReadiness: "All",
      inventoryLinkage: "All",
      duplicateRisk: "All",
      brandAuthorization: "All",
      batchEligibility: "All",
      channelEligibility: "All",
      countryOfOrigin: "All",
      createdDate: "",
      updatedDate: "",
      assignedReviewer: "All",
      dataCompleteness: "All",
    });
    setActiveTab("all");
    setActiveKpiFilter(null);
    setActiveChips([]);
    toast.success("Cleared all active filters.");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Product Master dataset refreshed.");
    }, 600);
  };

  const handleToggleChip = (chipId: string) => {
    setActiveChips((prev) =>
      prev.includes(chipId) ? prev.filter((id) => id !== chipId) : [...prev, chipId]
    );
  };

  const handleKpiClick = (filterKey: string) => {
    setActiveKpiFilter((prev) => (prev === filterKey ? null : filterKey));
    toast(`Filtering by KPI: ${filterKey}`, { icon: "🔍" });
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAllPage = (checked: boolean) => {
    if (checked) {
      setSelectedIds(MOCK_PRODUCT_MASTERS.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectAllMatching = () => {
    setSelectedIds(MOCK_PRODUCT_MASTERS.map((p) => p.id));
    toast.success("Selected all 12,840 product master records.");
  };

  const handleOpenProduct = (product: ProductMasterRow) => {
    toast.success(`Opening master record for ${product.productName}`);
    router.push(`/admin/catalogue/products/${product.id}`);
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    toast.success(`Executed bulk action "${action}" on ${selectedIds.length} products.`);
  };

  const handleRowActionClick = (product: ProductMasterRow, action: string) => {
    toast.success(`Executed action "${action}" for ${product.productName}`);
  };

  // Filtered dataset logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCT_MASTERS.filter((p) => {
      // Tab filter
      if (activeTab === "active" && p.productStatus !== "Active") return false;
      if (activeTab === "draft" && p.productStatus !== "Draft") return false;
      if (activeTab === "pending" && p.approvalStatus !== "Pending Approval") return false;

      // Text Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const match =
          p.productName.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.barcode.includes(query) ||
          p.publicId.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Brand filter
      if (filters.brand !== "All" && p.brand !== filters.brand) return false;

      return true;
    });
  }, [activeTab, filters]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8fafc]">
      {/* 1. Page Header */}
      <ProductMasterHeader
        onExport={handleExportCSV}
        onImportClick={() => setIsImportModalOpen(true)}
        selectedCount={selectedIds.length}
        onBulkAction={handleBulkAction}
        onCreateClick={() => {
          toast.success("Opening Product Master Creator");
          router.push("/admin/catalogue/products/create");
        }}
      />

      {/* Main Container */}
      <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1920px] mx-auto w-full">
        {/* 2. Primary 12 KPI Cards */}
        <ProductMasterKpiGrid
          kpis={PRODUCT_KPIS}
          activeFilter={activeKpiFilter}
          onKpiClick={handleKpiClick}
        />

        {/* 3. Horizontal Status Tabs */}
        <ProductStatusTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* 4. Advanced Filters Panel */}
        <ProductAdvancedFilters
          filters={filters}
          onChange={handleFilterChange}
          onClearAll={handleClearAllFilters}
          onSaveView={() => setIsSaveViewModalOpen(true)}
          onRefresh={handleRefresh}
          onMoreFilters={() => setIsMoreFiltersOpen(true)}
          isRefreshing={isRefreshing}
        />

        {/* 5. Quick Filter Chips */}
        <ProductQuickFilters
          chips={INITIAL_QUICK_FILTERS}
          activeChips={activeChips}
          onToggleChip={handleToggleChip}
          onClearAll={() => setActiveChips([])}
        />

        {/* 6. Product Master Health Scorecard */}
        <ProductHealthScorecard />

        {/* 2-Column Layout: Left Main Workspace & Right Intelligence Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Main Left Column */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* 7. Product Masters Table */}
            <ProductMasterTable
              products={filteredProducts}
              selectedIds={selectedIds}
              onSelectRow={handleSelectRow}
              onSelectAllPage={handleSelectAllPage}
              onSelectAllMatching={handleSelectAllMatching}
              onClearSelection={() => setSelectedIds([])}
              totalMatching={12840}
              onOpenProduct={handleOpenProduct}
              onActionClick={handleRowActionClick}
            />

            {/* 8. Lower Summary Dashboards */}
            <LowerSummaryDashboards />
          </div>

          {/* Right Product Master Intelligence Sidebar */}
          <div className="sticky top-4">
            <ProductMasterIntelligence
              onQueueClick={(qLabel) => toast(`Filtering by queue: ${qLabel}`, { icon: "🔍" })}
              onAlertClick={(aName) => toast(`Viewing alert: ${aName}`, { icon: "🚨" })}
            />
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <ImportProductsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <SaveProductViewModal
        isOpen={isSaveViewModalOpen}
        onClose={() => setIsSaveViewModalOpen(false)}
      />

      <MoreProductFiltersDrawer
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
      />
    </div>
  );
}
