"use client";

import { useState, useMemo, useEffect } from "react";
import {
  CatalogueQualityIssue,
  QualityFilterState,
  DuplicateProductCandidate,
} from "@/types/catalogueQuality";
import {
  MOCK_QUALITY_ISSUES,
  MOCK_DUPLICATE_CANDIDATES,
} from "@/data/catalogueQuality.mock";
import { exportQualityReportCSV } from "@/utils/exportQualityReport";

export function useCatalogueQualityManagement() {
  const [issues, setIssues] = useState<CatalogueQualityIssue[]>(MOCK_QUALITY_ISSUES);
  const [duplicateCandidates, setDuplicateCandidates] = useState<DuplicateProductCandidate[]>(MOCK_DUPLICATE_CANDIDATES);
  const [selectedJobId, setSelectedJobId] = useState<string>("QLT-2026-004821");

  // Selected row checkboxes
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // Filter State
  const [filters, setFilters] = useState<QualityFilterState>({
    searchQuery: "",
    issueType: "All",
    severity: "All",
    status: "All",
    category: "All",
    brand: "All",
    channel: "All",
    owner: "All",
    dataSource: "All",
    updatedDate: "Last 30 Days",
    activeTab: "Overview",
    quickChips: [],
  });

  // Sorting
  const [sortColumn, setSortColumn] = useState<keyof CatalogueQualityIssue>("caseId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // Modals and Drawers
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isRunValidationOpen, setIsRunValidationOpen] = useState<boolean>(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState<boolean>(false);
  const [isSaveViewOpen, setIsSaveViewOpen] = useState<boolean>(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState<boolean>(false);
  const [isEscalationOpen, setIsEscalationOpen] = useState<boolean>(false);
  const [isResolutionOpen, setIsResolutionOpen] = useState<boolean>(false);

  // Selected entities for modals
  const [activeCase, setActiveCase] = useState<CatalogueQualityIssue | null>(MOCK_QUALITY_ISSUES[0]);
  const [comparingCandidate, setComparingCandidate] = useState<DuplicateProductCandidate | null>(MOCK_DUPLICATE_CANDIDATES[0]);

  // Toast System
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);

  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Timestamp & Refresh
  const [lastSynced, setLastSynced] = useState<string>("04 Aug 2026, 12:57 AM");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSynced(
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
          ", " +
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
      setIsRefreshing(false);
      showToast("Refreshed catalogue quality data.");
    }, 600);
  };

  // Synchronize Tab with URL query if window is available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        setFilters((prev) => ({ ...prev, activeTab: tab }));
      }
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setFilters((prev) => ({ ...prev, activeTab: tab }));
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.pushState({}, "", url.toString());
    }
  };

  // Toggle quick chip
  const handleToggleQuickChip = (chip: string) => {
    setFilters((prev) => {
      const exists = prev.quickChips.includes(chip);
      const updated = exists ? prev.quickChips.filter((c) => c !== chip) : [...prev.quickChips, chip];
      return { ...prev, quickChips: updated };
    });
  };

  // Filtered Issues Logic
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Tab matching
      if (filters.activeTab === "Duplicate Products") {
        if (!issue.issueType.toLowerCase().includes("duplicate")) return false;
      } else if (filters.activeTab === "Incomplete Records") {
        if (!issue.issueType.toLowerCase().includes("incomplete") && !issue.issueType.toLowerCase().includes("missing")) return false;
      } else if (filters.activeTab === "Validation Failures") {
        if (!issue.issueType.toLowerCase().includes("conflict") && !issue.issueType.toLowerCase().includes("safety")) return false;
      } else if (filters.activeTab === "Publication Blockers") {
        if (issue.issueType !== "Publication Blocker" && issue.status !== "Escalated") return false;
      }

      // Quick Chips matching
      if (filters.quickChips.includes("Assigned to Me") && issue.owner !== "Elena Vance") return false;
      if (filters.quickChips.includes("Critical") && issue.severity !== "Critical") return false;
      if (filters.quickChips.includes("Duplicate Conflict") && !issue.issueType.toLowerCase().includes("duplicate")) return false;
      if (filters.quickChips.includes("Publication Blocked") && issue.issueType !== "Publication Blocker") return false;
      if (filters.quickChips.includes("SLA Breach") && !issue.isSlaBreached) return false;
      if (filters.quickChips.includes("Compliance Risk") && issue.businessImpact !== "Compliance risk") return false;

      // Dropdown filters
      if (filters.issueType !== "All" && issue.issueType !== filters.issueType) return false;
      if (filters.severity !== "All" && issue.severity !== filters.severity) return false;
      if (filters.status !== "All" && issue.status !== filters.status) return false;
      if (filters.category !== "All" && issue.category !== filters.category) return false;
      if (filters.brand !== "All" && issue.brand !== filters.brand) return false;
      if (filters.channel !== "All" && !issue.channels.includes(filters.channel)) return false;
      if (filters.owner !== "All" && issue.owner !== filters.owner) return false;

      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchCase = issue.caseId.toLowerCase().includes(q);
        const matchType = issue.issueType.toLowerCase().includes(q);
        const matchEntity = issue.entityName.toLowerCase().includes(q);
        const matchSku = issue.sku.toLowerCase().includes(q);
        const matchBrand = issue.brand.toLowerCase().includes(q);
        const matchCategory = issue.category.toLowerCase().includes(q);
        if (!matchCase && !matchType && !matchEntity && !matchSku && !matchBrand && !matchCategory) return false;
      }

      return true;
    });
  }, [issues, filters]);

  // Sorted Issues
  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filteredIssues, sortColumn, sortDirection]);

  // Paginated Issues
  const paginatedIssues = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedIssues.slice(start, start + rowsPerPage);
  }, [sortedIssues, currentPage, rowsPerPage]);

  // Selected Issue Object
  const selectedIssue = useMemo(() => {
    return issues.find((i) => i.caseId === selectedJobId) || issues[0];
  }, [issues, selectedJobId]);

  // Actions
  const handleSort = (col: keyof CatalogueQualityIssue) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedIssues.map((item) => item.id);
      setSelectedRowIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedIssues.map((item) => item.id));
      setSelectedRowIds((prev) => prev.filter((id) => !pageIds.has(id)));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      issueType: "All",
      severity: "All",
      status: "All",
      category: "All",
      brand: "All",
      channel: "All",
      owner: "All",
      dataSource: "All",
      updatedDate: "Last 30 Days",
      activeTab: "Overview",
      quickChips: [],
    });
    setSelectedRowIds([]);
    showToast("Cleared all active filters.");
  };

  const handleExportCSV = () => {
    const exportData = selectedRowIds.length > 0
      ? filteredIssues.filter((i) => selectedRowIds.includes(i.id))
      : filteredIssues;
    exportQualityReportCSV(exportData);
    showToast(`Exported ${exportData.length} quality issue records to CSV.`);
  };

  const handleOpenCaseDetail = (issue: CatalogueQualityIssue) => {
    setActiveCase(issue);
    setIsDetailOpen(true);
  };

  const handleOpenCompareDuplicate = (candidate?: DuplicateProductCandidate) => {
    if (candidate) {
      setComparingCandidate(candidate);
    } else {
      setComparingCandidate(duplicateCandidates[0]);
    }
    setIsDuplicateModalOpen(true);
  };

  return {
    issues,
    setIssues,
    duplicateCandidates,
    setDuplicateCandidates,
    selectedJobId,
    setSelectedJobId,
    selectedIssue,
    selectedRowIds,
    setSelectedRowIds,

    filters,
    setFilters,
    handleTabChange,
    handleToggleQuickChip,

    filteredIssues,
    paginatedIssues,

    sortColumn,
    sortDirection,
    handleSort,
    handleSelectRow,
    handleSelectAllOnPage,
    handleClearFilters,
    handleExportCSV,

    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,

    toastMessage,
    showToast,
    lastSynced,
    isRefreshing,
    handleRefresh,

    // Modals
    isCreateCaseOpen,
    setIsCreateCaseOpen,
    isDetailOpen,
    setIsDetailOpen,
    isRunValidationOpen,
    setIsRunValidationOpen,
    isDuplicateModalOpen,
    setIsDuplicateModalOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,
    isEscalationOpen,
    setIsEscalationOpen,
    isResolutionOpen,
    setIsResolutionOpen,

    activeCase,
    setActiveCase,
    comparingCandidate,
    setComparingCandidate,
    handleOpenCaseDetail,
    handleOpenCompareDuplicate,
  };
}
