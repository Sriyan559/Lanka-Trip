"use client";

import { useState, useMemo, useCallback } from "react";
import { 
  MediaAsset, 
  MediaFilterState, 
  MediaDuplicateCandidate 
} from "@/types/mediaManagement";
import { MOCK_MEDIA_ASSETS, MOCK_DUPLICATE_CANDIDATES } from "@/data/mediaAssets.mock";
import { filterMediaAssets } from "@/utils/mediaFilters";
import { exportMediaReportCSV } from "@/utils/exportMediaReport";

export function useMediaManagement() {
  const [assets, setAssets] = useState<MediaAsset[]>(MOCK_MEDIA_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("MED-2026-818421");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  
  // Sync Timestamp
  const [lastSynced, setLastSynced] = useState<string>("04 Aug 2026, 12:57 AM");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filters state
  const [filters, setFilters] = useState<MediaFilterState>({
    search: "",
    assetType: "All Types",
    approvalStatus: "All Statuses",
    linkedEntity: "All Entities",
    brand: "All Brands",
    supplier: "All Suppliers",
    productSku: "All Products",
    qualityStatus: "All",
    rightsStatus: "All",
    channelCompatibility: "All",
    resolutionQuality: "All",
    dateRange: "",
    quickChips: [],
    activeTab: "All Assets",
  });

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [sortColumn, setSortColumn] = useState<keyof MediaAsset>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Modals & Drawers
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRightsDrawerOpen, setIsRightsDrawerOpen] = useState(false);
  const [isLinkDrawerOpen, setIsLinkDrawerOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSaveViewOpen, setIsSaveViewOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Selected Target Objects for Modals/Drawers
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null);
  const [previewingAsset, setPreviewingAsset] = useState<MediaAsset | null>(null);
  const [comparingCandidate, setComparingCandidate] = useState<MediaDuplicateCandidate | null>(null);

  // Toast System
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);

  const showToast = useCallback((text: string, type: "success" | "info" | "warning" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return filterMediaAssets(assets, filters);
  }, [assets, filters]);

  // Sorted Assets
  const sortedAssets = useMemo(() => {
    return [...filteredAssets].sort((a, b) => {
      const valA = a[sortColumn] ?? "";
      const valB = b[sortColumn] ?? "";
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredAssets, sortColumn, sortDirection]);

  // Paginated Assets
  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedAssets.slice(start, start + rowsPerPage);
  }, [sortedAssets, currentPage, rowsPerPage]);

  // Currently Selected Preview Asset
  const selectedPreviewAsset = useMemo(() => {
    return assets.find((a) => a.id === selectedAssetId) || assets[0] || null;
  }, [assets, selectedAssetId]);

  // Actions
  const handleSort = (column: keyof MediaAsset) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSelectAllOnPage = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedAssets.map((a) => a.id);
      setSelectedRowIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedAssets.map((a) => a.id));
      setSelectedRowIds((prev) => prev.filter((id) => !pageIds.has(id)));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRowIds((prev) => [...prev, id]);
    } else {
      setSelectedRowIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      assetType: "All Types",
      approvalStatus: "All Statuses",
      linkedEntity: "All Entities",
      brand: "All Brands",
      supplier: "All Suppliers",
      productSku: "All Products",
      qualityStatus: "All",
      rightsStatus: "All",
      channelCompatibility: "All",
      resolutionQuality: "All",
      dateRange: "",
      quickChips: [],
      activeTab: "All Assets",
    });
    setCurrentPage(1);
    showToast("Filters reset to default.");
  };

  const handleToggleQuickChip = (chip: string) => {
    setFilters((prev) => {
      const exists = prev.quickChips.includes(chip);
      const updated = exists
        ? prev.quickChips.filter((c) => c !== chip)
        : [...prev.quickChips, chip];
      return { ...prev, quickChips: updated };
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + ", " + now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastSynced(formatted);
      setIsRefreshing(false);
      showToast("Media Catalogue data refreshed successfully.");
    }, 600);
  };

  const handleExportCSV = () => {
    const exportTargets = selectedRowIds.length > 0
      ? assets.filter((a) => selectedRowIds.includes(a.id))
      : filteredAssets;
    exportMediaReportCSV(exportTargets);
    showToast(`Exported ${exportTargets.length} media asset records to CSV.`);
  };

  const handleApproveAsset = (id: string) => {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, approvalStatus: "Approved" as const } : a
      )
    );
    showToast(`Asset ${id} approved successfully.`);
  };

  const handleRevokeApproval = (id: string) => {
    if (confirm(`Are you sure you want to revoke approval for ${id}?`)) {
      setAssets((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, approvalStatus: "Needs Review" as const } : a
        )
      );
      showToast(`Approval revoked for asset ${id}.`, "warning");
    }
  };

  const handleArchiveAsset = (id: string) => {
    if (confirm(`Archive asset ${id}? It will be moved to archived assets.`)) {
      setAssets((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, isArchived: true, approvalStatus: "Draft" as const } : a
        )
      );
      showToast(`Asset ${id} archived successfully.`, "info");
    }
  };

  const handleCompareDuplicate = (candidate: MediaDuplicateCandidate) => {
    setComparingCandidate(candidate);
    setIsCompareOpen(true);
  };

  return {
    assets,
    setAssets,
    selectedAssetId,
    setSelectedAssetId,
    selectedRowIds,
    setSelectedRowIds,
    filters,
    setFilters,
    filteredAssets,
    sortedAssets,
    paginatedAssets,
    selectedPreviewAsset,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    sortColumn,
    sortDirection,
    handleSort,
    handleSelectAllOnPage,
    handleSelectRow,
    handleClearFilters,
    handleToggleQuickChip,
    handleRefresh,
    handleExportCSV,
    handleApproveAsset,
    handleRevokeApproval,
    handleArchiveAsset,
    handleCompareDuplicate,
    lastSynced,
    isRefreshing,
    toastMessage,
    showToast,

    // Modals
    isUploadOpen,
    setIsUploadOpen,
    isImportOpen,
    setIsImportOpen,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isPreviewOpen,
    setIsPreviewOpen,
    isRightsDrawerOpen,
    setIsRightsDrawerOpen,
    isLinkDrawerOpen,
    setIsLinkDrawerOpen,
    isCompareOpen,
    setIsCompareOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,

    // Target Objects
    editingAsset,
    setEditingAsset,
    previewingAsset,
    setPreviewingAsset,
    comparingCandidate,
    setComparingCandidate,
  };
}
