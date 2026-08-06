"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import {
  CatalogueBrand,
  BrandFilterState,
  DuplicateBrandPair,
  UnauthorizedBrandIncident,
  PriorityAuthorizationItem,
} from "@/types/brandManagement";
import { MOCK_CATALOGUE_BRANDS, MOCK_BRAND_KPIS } from "@/data/brands.mock";

import { BrandHeader } from "./components/BrandHeader";
import { BrandBusinessContext } from "./components/BrandBusinessContext";
import { BrandKpiGrid } from "./components/BrandKpiGrid";
import { BrandStatusTabs } from "./components/BrandStatusTabs";
import { BrandFilters } from "./components/BrandFilters";
import { BrandTable } from "./components/BrandTable";
import { BrandIntelligenceSidebar } from "./components/BrandIntelligenceSidebar";
import { BrandLowerDashboards } from "./components/BrandLowerDashboards";

import { BrandFormDrawer } from "./modals/BrandFormDrawer";
import { BrandAuthorizationDrawer } from "./modals/BrandAuthorizationDrawer";
import { ImportBrandsModal } from "./modals/ImportBrandsModal";
import { DuplicateBrandComparisonModal } from "./modals/DuplicateBrandComparisonModal";
import { SaveBrandViewModal } from "./modals/SaveBrandViewModal";
import { MoreBrandFiltersDrawer } from "./modals/MoreBrandFiltersDrawer";

export const BrandManagementView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Primary Data State
  const [brands, setBrands] = useState<CatalogueBrand[]>(MOCK_CATALOGUE_BRANDS);
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<CatalogueBrand | null>(MOCK_CATALOGUE_BRANDS[0] || null);
  const [activeKpiId, setActiveKpiId] = useState<string | null>(null);

  // Filters State
  const [filters, setFilters] = useState<BrandFilterState>({
    searchQuery: searchParams.get("search") || "",
    statusTab: searchParams.get("tab") || "All Brands",
    verificationStatus: searchParams.get("verification") || "All",
    authorizationStatus: searchParams.get("authorization") || "All",
    brandOwner: searchParams.get("owner") || "All",
    supplier: searchParams.get("supplier") || "All",
    country: searchParams.get("country") || "All",
    channelEligibility: searchParams.get("channel") || "All",
    riskLevel: searchParams.get("risk") || "All",
    updatedDate: "",
  });

  const [lastSynced, setLastSynced] = useState("04 Aug 2026, 12:57 AM");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal & Drawer States
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState<CatalogueBrand | null>(null);

  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authDrawerBrand, setAuthDrawerBrand] = useState<CatalogueBrand | null>(null);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicatePair, setDuplicatePair] = useState<DuplicateBrandPair | null>(null);

  const [isSaveViewModalOpen, setIsSaveViewModalOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set("search", filters.searchQuery);
    if (filters.statusTab && filters.statusTab !== "All Brands") params.set("tab", filters.statusTab);
    if (filters.verificationStatus !== "All") params.set("verification", filters.verificationStatus);
    if (filters.authorizationStatus !== "All") params.set("authorization", filters.authorizationStatus);
    if (filters.brandOwner !== "All") params.set("owner", filters.brandOwner);
    if (filters.supplier !== "All") params.set("supplier", filters.supplier);
    if (filters.country !== "All") params.set("country", filters.country);

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetUrl, { scroll: false });
  }, [filters, pathname, router]);

  // Filter Computation
  const filteredBrands = useMemo(() => {
    return brands.filter((b) => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = b.brandName.toLowerCase().includes(q);
        const matchId = b.brandId.toLowerCase().includes(q);
        const matchOwner = b.legalOwner.toLowerCase().includes(q);
        const matchSupplier = b.primarySupplier.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchOwner && !matchSupplier) return false;
      }

      // Status Tab
      if (filters.statusTab !== "All Brands") {
        const tab = filters.statusTab.toLowerCase();
        if (tab === "active" && b.verificationStatus !== "Verified") return false;
        if (tab === "verified" && b.verificationStatus !== "Verified") return false;
        if (tab === "pending" && b.verificationStatus !== "Pending") return false;
        if (tab === "conditional" && b.authorizationStatus !== "Conditional") return false;
        if (tab === "expiring" && b.authorizationStatus !== "Expiring Soon") return false;
        if (tab === "unauthorized" && b.riskLevel !== "High") return false;
        if (tab === "archived" && b.verificationStatus !== "Unverified") return false;
      }

      // Verification
      if (filters.verificationStatus !== "All" && b.verificationStatus !== filters.verificationStatus) {
        return false;
      }

      // Authorization
      if (filters.authorizationStatus !== "All" && b.authorizationStatus !== filters.authorizationStatus) {
        return false;
      }

      // Owner
      if (filters.brandOwner !== "All" && b.brandOwner !== filters.brandOwner) {
        return false;
      }

      // Supplier
      if (filters.supplier !== "All" && b.primarySupplier !== filters.supplier) {
        return false;
      }

      // Country
      if (filters.country !== "All" && b.country !== filters.country) {
        return false;
      }

      // Channel
      if (filters.channelEligibility !== "All" && b.channelEligibility !== filters.channelEligibility) {
        return false;
      }

      // Risk
      if (filters.riskLevel !== "All" && b.riskLevel !== filters.riskLevel) {
        return false;
      }

      return true;
    });
  }, [brands, filters]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: brands.length,
      active: brands.filter((b) => b.verificationStatus === "Verified").length,
      verified: brands.filter((b) => b.verificationStatus === "Verified").length,
      pending: brands.filter((b) => b.verificationStatus === "Pending").length,
      conditional: brands.filter((b) => b.authorizationStatus === "Conditional").length,
      expiring: brands.filter((b) => b.authorizationStatus === "Expiring Soon").length,
      unauthorized: brands.filter((b) => b.riskLevel === "High").length,
      archived: brands.filter((b) => b.verificationStatus === "Unverified").length,
    };
  }, [brands]);

  // Event Handlers
  const handleFilterChange = (key: keyof BrandFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      searchQuery: "",
      statusTab: "All Brands",
      verificationStatus: "All",
      authorizationStatus: "All",
      brandOwner: "All",
      supplier: "All",
      country: "All",
      channelEligibility: "All",
      riskLevel: "All",
      updatedDate: "",
    });
    setActiveKpiId(null);
    setSelectedBrandIds([]);
    toast.success("Filters cleared.");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastSynced(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      toast.success("Refreshed Brand Management dataset.");
    }, 600);
  };

  const handleKpiClick = (kpiId: string) => {
    setActiveKpiId(kpiId === activeKpiId ? null : kpiId);
    if (kpiId === "kpi-2") setFilters((prev) => ({ ...prev, statusTab: "Active" }));
    else if (kpiId === "kpi-3") setFilters((prev) => ({ ...prev, statusTab: "Verified" }));
    else if (kpiId === "kpi-4") setFilters((prev) => ({ ...prev, statusTab: "Pending" }));
    else if (kpiId === "kpi-5") setFilters((prev) => ({ ...prev, statusTab: "Conditional" }));
    else if (kpiId === "kpi-6") setFilters((prev) => ({ ...prev, statusTab: "Expiring" }));
    else if (kpiId === "kpi-7") setFilters((prev) => ({ ...prev, authorizationStatus: "Expired" }));
    else if (kpiId === "kpi-8") setFilters((prev) => ({ ...prev, statusTab: "Unauthorized Use" }));
    else if (kpiId === "kpi-10") setFilters((prev) => ({ ...prev, riskLevel: "High" }));
    else setFilters((prev) => ({ ...prev, statusTab: "All Brands" }));
  };

  // Table selection
  const handleToggleSelectRow = (id: string) => {
    setSelectedBrandIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (filteredBrands.every((b) => selectedBrandIds.includes(b.id))) {
      setSelectedBrandIds([]);
    } else {
      setSelectedBrandIds(filteredBrands.map((b) => b.id));
    }
  };

  // Export Brand Report CSV
  const handleExport = () => {
    const targetBrands = selectedBrandIds.length > 0
      ? brands.filter((b) => selectedBrandIds.includes(b.id))
      : filteredBrands;

    const headers = ["Brand Name", "Brand ID", "Legal Owner", "Primary Supplier", "Country", "Verification", "Authorization", "Active Products"];
    const rows = targetBrands.map((b) => [
      `"${b.brandName}"`,
      `"${b.brandId}"`,
      `"${b.legalOwner}"`,
      `"${b.primarySupplier}"`,
      `"${b.country}"`,
      `"${b.verificationStatus}"`,
      `"${b.authorizationStatus}"`,
      b.activeProductsCount,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `brand_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${targetBrands.length} brand records to CSV!`);
  };

  // Drawer / Modal actions
  const handleSaveBrand = (brandData: Partial<CatalogueBrand>) => {
    if (brandToEdit) {
      setBrands((prev) =>
        prev.map((b) => (b.id === brandToEdit.id ? { ...b, ...brandData } as CatalogueBrand : b))
      );
    } else {
      const newBrand: CatalogueBrand = {
        id: `brd-${Date.now()}`,
        brandName: brandData.brandName || "New Brand",
        brandId: brandData.brandId || `BRD-24-${Math.floor(1000 + Math.random() * 9000)}`,
        initials: brandData.initials || "NB",
        legalOwner: brandData.legalOwner || "Legal Owner Inc.",
        manufacturer: brandData.manufacturer || "Manufacturer Inc.",
        primarySupplier: brandData.primarySupplier || "Luxe Distribution Pte Ltd",
        country: brandData.country || "USA",
        activeProductsCount: 0,
        categoriesCount: 1,
        verificationStatus: brandData.verificationStatus || "Verified",
        authorizationStatus: brandData.authorizationStatus || "Valid",
        territory: brandData.territory || "Global",
        channelEligibility: brandData.channelEligibility || "5 / 5",
        eligibleChannelsCount: 5,
        totalChannelsCount: 5,
        complianceStatus: brandData.complianceStatus || "Compliant",
        catalogueReadinessPercent: 85,
        duplicateRisk: "Low",
        riskLevel: brandData.riskLevel || "Low",
        brandOwner: brandData.brandOwner || "Elena Vance",
        updatedAt: "Just now",
      };
      setBrands((prev) => [newBrand, ...prev]);
    }
  };

  const handleArchiveBrand = (brand: CatalogueBrand) => {
    setBrands((prev) => prev.filter((b) => b.id !== brand.id));
    toast.success(`Archived brand "${brand.brandName}".`);
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50/50 pb-12 min-w-0">
      {/* 1. Page Header */}
      <BrandHeader
        onExport={handleExport}
        onImport={() => setIsImportModalOpen(true)}
        onBulkActions={() => toast.success(`Executing bulk action on ${selectedBrandIds.length} items.`)}
        onCreateBrand={() => {
          setBrandToEdit(null);
          setIsCreateDrawerOpen(true);
        }}
        selectedCount={selectedBrandIds.length}
      />

      {/* 2. Business Context Strip */}
      <BrandBusinessContext
        lastSynced={lastSynced}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Workspace Body */}
      <div className="p-4 sm:p-6 flex flex-col gap-5 min-w-0">
        {/* 3. 12 KPI Cards Grid */}
        <BrandKpiGrid
          kpis={MOCK_BRAND_KPIS}
          activeKpiId={activeKpiId}
          onKpiClick={handleKpiClick}
        />

        {/* 4. Horizontal Status Tabs */}
        <BrandStatusTabs
          activeTab={filters.statusTab}
          onTabChange={(tab) => setFilters((prev) => ({ ...prev, statusTab: tab }))}
          counts={tabCounts}
        />

        {/* 5. 2-Row Filter Bar */}
        <BrandFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
          onOpenSaveView={() => setIsSaveViewModalOpen(true)}
          onRefresh={handleRefresh}
        />

        {/* 6. Main Content Area + Right 280px Intelligence Rail Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4 items-start min-w-0">
          {/* Left Content Area */}
          <div className="min-w-0 flex flex-col gap-6">
            {/* Brand Table */}
            <BrandTable
              brands={filteredBrands}
              selectedBrandIds={selectedBrandIds}
              selectedBrand={selectedBrand}
              onSelectBrand={(b) => setSelectedBrand(b)}
              onToggleSelectRow={handleToggleSelectRow}
              onToggleSelectAll={handleToggleSelectAll}
              onEditBrand={(b) => {
                setBrandToEdit(b);
                setIsCreateDrawerOpen(true);
              }}
              onManageAuthorization={(b) => {
                setAuthDrawerBrand(b);
                setIsAuthDrawerOpen(true);
              }}
              onViewProducts={(b) => {
                router.push(`/admin/catalogue/products?brand=${encodeURIComponent(b.brandName)}`);
              }}
              onArchiveBrand={handleArchiveBrand}
            />

            {/* Lower Summary Panels Grid */}
            <BrandLowerDashboards
              onCompareDuplicate={(pair) => {
                setDuplicatePair(pair);
                setIsDuplicateModalOpen(true);
              }}
              onMergeDuplicate={(pair) => {
                toast.success(`Merged ${pair.brandB} into ${pair.brandA}`);
              }}
              onIgnoreDuplicate={(pair) => {
                toast.success(`Ignored duplicate candidate pair.`);
              }}
              onSelectIncident={(inc) => {
                toast.success(`Viewing incident ${inc.incidentId} for ${inc.brandName}`);
              }}
              onSelectAuthorization={(auth) => {
                const found = brands.find((b) => b.brandName === auth.brandName);
                if (found) {
                  setAuthDrawerBrand(found);
                  setIsAuthDrawerOpen(true);
                }
              }}
            />
          </div>

          {/* Far-Right Brand Intelligence Sidebar (280px Sticky) */}
          <div className="w-full xl:w-[280px] xl:shrink-0 sticky xl:top-4 flex flex-col gap-4">
            <BrandIntelligenceSidebar
              onSelectQueue={(queueKey) => {
                if (queueKey === "pending") setFilters((prev) => ({ ...prev, statusTab: "Pending" }));
                else if (queueKey === "conditional") setFilters((prev) => ({ ...prev, statusTab: "Conditional" }));
                else if (queueKey === "expiring") setFilters((prev) => ({ ...prev, statusTab: "Expiring" }));
                else if (queueKey === "unauthorized") setFilters((prev) => ({ ...prev, statusTab: "Unauthorized Use" }));
                else toast.success(`Filtering by ${queueKey}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <BrandFormDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        brandToEdit={brandToEdit}
        onSave={handleSaveBrand}
        existingBrands={brands}
      />

      <BrandAuthorizationDrawer
        isOpen={isAuthDrawerOpen}
        onClose={() => setIsAuthDrawerOpen(false)}
        brand={authDrawerBrand}
      />

      <ImportBrandsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={(count) => {
          handleRefresh();
        }}
      />

      <DuplicateBrandComparisonModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        pair={duplicatePair}
        onMerge={(pair) => {
          toast.success(`Merged ${pair.brandB} into ${pair.brandA}`);
        }}
        onIgnore={(pair) => {
          toast.success("Ignored match.");
        }}
      />

      <SaveBrandViewModal
        isOpen={isSaveViewModalOpen}
        onClose={() => setIsSaveViewModalOpen(false)}
      />

      <MoreBrandFiltersDrawer
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={() => {
          // Additional filter logic if needed
        }}
      />
    </div>
  );
};
