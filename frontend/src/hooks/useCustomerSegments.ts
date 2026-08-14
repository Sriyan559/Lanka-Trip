"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { customerApi } from "@/lib/api/customers";
import {
  CustomerSegment,
  SegmentMetric,
  SegmentHealthMetric,
  PriorityAlertItem,
  SelectedSegmentDetails,
  SegmentOperationsMetrics,
  SegmentMembershipSummary,
  SegmentConflictSummary,
  SegmentRecalculationSummary,
  SegmentQuickQueues,
} from "@/types/customer-segments";

export function useCustomerSegments(showToast: (msg: string, type?: "success" | "info" | "warning" | "danger") => void) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Loading & Refresh state
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");
  const [selectedType, setSelectedType] = useState(searchParams?.get("type") || "All");
  const [selectedStatus, setSelectedStatus] = useState(searchParams?.get("status") || "All");
  const [selectedMembership, setSelectedMembership] = useState(searchParams?.get("membership") || "All");
  const [selectedConsent, setSelectedConsent] = useState(searchParams?.get("consent") || "All");
  const [selectedRisk, setSelectedRisk] = useState(searchParams?.get("risk") || "All");
  const [selectedOwner, setSelectedOwner] = useState(searchParams?.get("owner") || "All");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState(searchParams?.get("quick") || "");
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview");


  // Selection & Pagination
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const selectedSegmentIdRef = useRef<string | null>(null);
  selectedSegmentIdRef.current = selectedSegmentId;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  // Dashboard Data from API
  const [portfolio, setPortfolio] = useState<CustomerSegment[]>([]);
  const [kpis, setKpis] = useState<SegmentMetric[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<SelectedSegmentDetails | null>(null);
  const [priorityAlerts, setPriorityAlerts] = useState<PriorityAlertItem[]>([]);
  const [typeDistribution, setTypeDistribution] = useState<{ name: string; value: number }[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<{ name: string; value: number }[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<SegmentHealthMetric[]>([]);
  const [operationsMetrics, setOperationsMetrics] = useState<SegmentOperationsMetrics | null>(null);
  const [membershipSummary, setMembershipSummary] = useState<SegmentMembershipSummary | null>(null);
  const [conflictSummary, setConflictSummary] = useState<SegmentConflictSummary | null>(null);
  const [recalculationSummary, setRecalculationSummary] = useState<SegmentRecalculationSummary | null>(null);
  const [quickQueues, setQuickQueues] = useState<SegmentQuickQueues | null>(null);
  const [segmentationHealth, setSegmentationHealth] = useState<number | null>(null);

  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    perPage: 25,
    lastPage: 1,
  });

  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  // Fetch Data Function
  const fetchSegments = useCallback(async () => {
    try {
      const params: Record<string, any> = {
        q: searchQuery,
        type: selectedType,
        status: selectedStatus,
        membership: selectedMembership,
        consent: selectedConsent,
        risk: selectedRisk,
        owner: selectedOwner,
        page,
        perPage,
      };

      if (selectedSegmentIdRef.current) {
        params.selectedId = selectedSegmentIdRef.current;
      }

      const res = await customerApi.getSegments(params);

      setPortfolio(res.segments || []);
      setKpis(res.kpis || []);
      setPagination(res.pagination || { total: 0, currentPage: 1, perPage: 25, lastPage: 1 });
      setSelectedDetails(res.selectedSegmentDetails || null);
      setPriorityAlerts(res.priorityAlerts || []);
      setTypeDistribution(res.typeDistribution || []);
      setStatusDistribution(res.statusDistribution || []);
      setHealthMetrics(res.healthMetrics || []);

      if (res.operationsMetrics) setOperationsMetrics(res.operationsMetrics);
      if (res.membershipSummary) setMembershipSummary(res.membershipSummary);
      if (res.conflictSummary) setConflictSummary(res.conflictSummary);
      if (res.recalculationSummary) setRecalculationSummary(res.recalculationSummary);
      if (res.quickQueues) setQuickQueues(res.quickQueues);
      setSegmentationHealth(res.segmentationHealth ?? null);

      if (!selectedSegmentIdRef.current && res.segments && res.segments.length > 0) {
        setSelectedSegmentId(res.segments[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch customer segments:", err);
      showToastRef.current("Failed to load customer segments from server.", "warning");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [
    searchQuery,
    selectedType,
    selectedStatus,
    selectedMembership,
    selectedConsent,
    selectedRisk,
    selectedOwner,
    page,
    perPage,
  ]);

  useEffect(() => {
    fetchSegments();
  }, [fetchSegments]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing segment records...", "info");
    fetchSegments();
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedStatus("All");
    setSelectedMembership("All");
    setSelectedConsent("All");
    setSelectedRisk("All");
    setSelectedOwner("All");
    setSelectedQuickFilter("");
    setPage(1);
    showToast("Reset all segment filters.", "info");
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedRowIds.length === portfolio.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(portfolio.map((s) => s.id));
    }
  };

  const handleCreateSegment = async (data: Record<string, any>) => {
    try {
      await customerApi.createSegment(data);
      showToast("Segment created successfully!", "success");
      fetchSegments();
    } catch (err) {
      console.error(err);
      showToast("Failed to create segment.", "danger");
    }
  };

  const handleRecalculate = async (id: string) => {
    try {
      await customerApi.recalculateSegment(id);
      showToast(`Recalculated segment ${id}`, "success");
      fetchSegments();
    } catch (err) {
      console.error(err);
      showToast("Failed to recalculate segment.", "danger");
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await customerApi.approveSegment(id);
      showToast(`Approved segment ${id}`, "success");
      fetchSegments();
    } catch (err) {
      console.error(err);
      showToast("Failed to approve segment.", "danger");
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedRowIds.length === 0) {
      showToast("Select at least one segment to perform bulk action.", "warning");
      return;
    }
    try {
      await customerApi.bulkActionSegments(action, selectedRowIds);
      showToast(`Executed ${action} on ${selectedRowIds.length} segments.`, "success");
      setSelectedRowIds([]);
      fetchSegments();
    } catch (err) {
      console.error(err);
      showToast("Bulk action failed.", "danger");
    }
  };

  const exportSegmentReportCSV = () => {
    if (portfolio.length === 0) {
      showToast("No segment data to export.", "warning");
      return;
    }
    const headers = ["ID", "Code", "Name", "Type", "Membership", "Status", "Customer Count", "Avg LTV", "Owner"];
    const rows = portfolio.map((s) => [
      s.id,
      s.code,
      `"${s.name}"`,
      s.type,
      s.membershipType,
      s.status,
      s.customerCount,
      s.avgLtvFormatted,
      `"${s.owner}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Customer_Segments_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported segment report to CSV.", "success");
  };

  const selectedSegment = useMemo(() => {
    if (selectedDetails?.segment) return selectedDetails.segment;
    return portfolio.find((s) => s.id === selectedSegmentId) || portfolio[0] || null;
  }, [selectedDetails, portfolio, selectedSegmentId]);

  return {
    isLoading,
    isRefreshing,
    portfolio,
    kpis,
    selectedSegment,
    selectedSegmentId,
    setSelectedSegmentId,
    selectedDetails,
    priorityAlerts,
    typeDistribution,
    statusDistribution,
    healthMetrics,
    operationsMetrics,
    membershipSummary,
    conflictSummary,
    recalculationSummary,
    quickQueues,
    segmentationHealth,
    pagination,
    page,
    setPage,
    perPage,
    setPerPage,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    selectedMembership,
    setSelectedMembership,
    selectedConsent,
    setSelectedConsent,
    selectedRisk,
    setSelectedRisk,
    selectedOwner,
    setSelectedOwner,
    selectedQuickFilter,
    setSelectedQuickFilter,
    activeTab,
    setActiveTab,
    selectedRowIds,
    handleToggleSelectRow,
    handleToggleSelectAll,
    handleRefresh,
    handleClearAll,
    handleCreateSegment,
    handleRecalculate,
    handleApprove,
    handleBulkAction,
    exportSegmentReportCSV,
  };
}
