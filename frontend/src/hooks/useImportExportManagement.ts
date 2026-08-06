"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CatalogueDataJob,
  FilterState,
  DuplicateConflictItem,
} from "@/types/importExport";
import { MOCK_DATA_JOBS, MOCK_DUPLICATE_CONFLICTS } from "@/data/importExport.mock";
import { exportDataOperationsReport } from "@/utils/exportDataOperationsReport";

export function useImportExportManagement() {
  const [jobs, setJobs] = useState<CatalogueDataJob[]>(MOCK_DATA_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>("IMP-8902");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(7);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    activeTab: "All Jobs",
    jobType: "All",
    source: "All",
    businessUnit: "All",
    template: "All",
    approvalStatus: "All",
    validationStatus: "All",
    dateRange: "Last 30 Days",
    owner: "All",
  });

  // Modals and Drawers
  const [isNewImportOpen, setIsNewImportOpen] = useState(false);
  const [isScheduleExportOpen, setIsScheduleExportOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [isSaveViewOpen, setIsSaveViewOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [isMappingDrawerOpen, setIsMappingDrawerOpen] = useState(false);
  const [isValidationDrawerOpen, setIsValidationDrawerOpen] = useState(false);
  const [isChangePreviewDrawerOpen, setIsChangePreviewDrawerOpen] = useState(false);

  const [comparingConflict, setComparingConflict] = useState<DuplicateConflictItem | null>(null);

  // Sorting State
  const [sortColumn, setSortColumn] = useState<keyof CatalogueDataJob>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Toast Banner State
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);
  const [lastSynced, setLastSynced] = useState("04 Aug 2026, 12:57 AM");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = useCallback((text: string, type: "success" | "info" | "warning" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    showToast("Refreshing Catalogue Data Operations status...", "info");
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSynced(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + ", " + new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }));
      showToast("Data Operations workspace updated successfully.");
    }, 600);
  }, [showToast]);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Tab filter
      if (filters.activeTab === "Imports" && job.operationType !== "Import") return false;
      if (filters.activeTab === "Exports" && job.operationType !== "Export") return false;
      if (filters.activeTab === "Pending Review" && job.approvalStatus !== "Pending") return false;
      if (filters.activeTab === "Scheduled" && job.executionStatus !== "Scheduled") return false;
      if (filters.activeTab === "Failed" && job.outcome !== "Failed") return false;
      if (filters.activeTab === "Completed" && job.outcome !== "Success") return false;

      // Dropdown Filters
      if (filters.jobType !== "All" && job.operationType !== filters.jobType) return false;
      if (filters.source !== "All" && job.source !== filters.source) return false;
      if (filters.approvalStatus !== "All" && job.approvalStatus !== filters.approvalStatus) return false;
      if (filters.validationStatus !== "All" && job.validationStatus !== filters.validationStatus) return false;

      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesId = job.id.toLowerCase().includes(q);
        const matchesFile = job.fileName.toLowerCase().includes(q);
        const matchesSource = job.source.toLowerCase().includes(q);
        const matchesUser = job.submittedBy.toLowerCase().includes(q);
        if (!matchesId && !matchesFile && !matchesSource && !matchesUser) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const valA = a[sortColumn] ?? "";
      const valB = b[sortColumn] ?? "";
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredJobs, sortColumn, sortDirection]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedJobs.slice(start, start + rowsPerPage);
  }, [sortedJobs, currentPage, rowsPerPage]);

  const selectedJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || jobs[0];
  }, [jobs, selectedJobId]);

  // Handlers
  const handleSort = (col: keyof CatalogueDataJob) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRowIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAllOnPage = () => {
    const pageIds = paginatedJobs.map((j) => j.id);
    const allSelected = pageIds.every((id) => selectedRowIds.includes(id));
    if (allSelected) {
      setSelectedRowIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRowIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      activeTab: "All Jobs",
      jobType: "All",
      source: "All",
      businessUnit: "All",
      template: "All",
      approvalStatus: "All",
      validationStatus: "All",
      dateRange: "Last 30 Days",
      owner: "All",
    });
    showToast("Cleared all active filters.");
  };

  const handleExportCSV = () => {
    exportDataOperationsReport(filteredJobs);
    showToast(`Exported report for ${filteredJobs.length} catalogue data jobs.`);
  };

  const handleOpenCompareDuplicate = (conflict?: DuplicateConflictItem) => {
    setComparingConflict(conflict || MOCK_DUPLICATE_CONFLICTS[0]);
    setIsDuplicateModalOpen(true);
  };

  return {
    jobs,
    setJobs,
    selectedJobId,
    setSelectedJobId,
    selectedJob,
    selectedRowIds,
    setSelectedRowIds,
    activeWorkflowStage,
    setActiveWorkflowStage,

    filters,
    setFilters,
    filteredJobs,
    paginatedJobs,

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
    isNewImportOpen,
    setIsNewImportOpen,
    isScheduleExportOpen,
    setIsScheduleExportOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isDuplicateModalOpen,
    setIsDuplicateModalOpen,
    isJobDetailOpen,
    setIsJobDetailOpen,
    isMappingDrawerOpen,
    setIsMappingDrawerOpen,
    isValidationDrawerOpen,
    setIsValidationDrawerOpen,
    isChangePreviewDrawerOpen,
    setIsChangePreviewDrawerOpen,

    comparingConflict,
    handleOpenCompareDuplicate,
  };
}
