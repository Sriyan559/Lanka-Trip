"use client";

import React, { useState, useEffect } from "react";
import {
  MARKETING_BUDGETS_MOCK_DATA,
  BudgetRecord,
} from "@/data/marketingBudgets.mock";

import { BudgetHeader } from "@/components/admin/marketing/budgets/BudgetHeader";
import { BudgetContextStrip } from "@/components/admin/marketing/budgets/BudgetContextStrip";
import { BudgetKpiStrip } from "@/components/admin/marketing/budgets/BudgetKpiStrip";
import { BudgetTabs } from "@/components/admin/marketing/budgets/BudgetTabs";
import {
  BudgetFilterBar,
  BudgetFilterState,
  INITIAL_BUDGET_FILTERS,
} from "@/components/admin/marketing/budgets/BudgetFilterBar";
import { BudgetReadinessStrip } from "@/components/admin/marketing/budgets/BudgetReadinessStrip";
import { BudgetPortfolioTable } from "@/components/admin/marketing/budgets/BudgetPortfolioTable";
import { BudgetPagination } from "@/components/admin/marketing/budgets/BudgetPagination";
import { SelectedBudgetWorkspace } from "@/components/admin/marketing/budgets/selected/SelectedBudgetWorkspace";
import { BudgetOperationsRail } from "@/components/admin/marketing/budgets/rail/BudgetOperationsRail";

export default function MarketingBudgetsPage() {
  const [data, setData] = useState(MARKETING_BUDGETS_MOCK_DATA);
  const [activeTab, setActiveTab] = useState("budgets");
  const [filters, setFilters] = useState<BudgetFilterState>(INITIAL_BUDGET_FILTERS);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string>("BUD-2026-0001");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // API Fetch with fallback to mock data
  useEffect(() => {
    let isMounted = true;
    async function fetchBudgetsFromApi() {
      try {
        const res = await fetch("/api/admin/marketing/budgets");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && Array.isArray(json.data)) {
            setData((prev) => ({
              ...prev,
              budgets: json.data,
            }));
          }
        }
      } catch (err) {
        console.warn("Marketing Budgets API not available, using default data structure.", err);
      }
    }
    fetchBudgetsFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        context: {
          ...prev.context,
          lastSynced: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        },
      }));
      setLoading(false);
    }, 300);
  };

  const handleFilterChange = (key: keyof BudgetFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_BUDGET_FILTERS);
    setCurrentPage(1);
  };

  // Filter budgets based on search and selected options
  const filteredBudgets = data.budgets.filter((bgt) => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        bgt.budgetName.toLowerCase().includes(q) ||
        bgt.budgetId.toLowerCase().includes(q) ||
        bgt.owner.toLowerCase().includes(q) ||
        bgt.brand.toLowerCase().includes(q) ||
        bgt.businessUnit.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.status !== "All" && bgt.status !== filters.status) return false;
    if (filters.type !== "All" && bgt.budgetType !== filters.type) return false;
    if (filters.businessUnit !== "All" && bgt.businessUnit !== filters.businessUnit) return false;
    if (filters.brand !== "All" && bgt.brand !== filters.brand) return false;
    if (filters.owner !== "All" && bgt.owner !== filters.owner) return false;
    if (filters.approvalState !== "All" && bgt.approval !== filters.approvalState) return false;
    if (filters.spendHealth !== "All" && bgt.spendHealth !== filters.spendHealth) return false;
    if (filters.period !== "All" && bgt.period !== filters.period) return false;

    return true;
  });

  // Pagination calculations
  const totalItems = filteredBudgets.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedBudgets = filteredBudgets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const selectedBudget =
    data.selectedBudgetDetails[selectedBudgetId] ||
    (filteredBudgets.length > 0
      ? data.selectedBudgetDetails[filteredBudgets[0].id] || null
      : null);

  const handleToggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllCheckboxes = () => {
    if (selectedCheckboxes.length === paginatedBudgets.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(paginatedBudgets.map((b) => b.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <BudgetHeader onCreateBudget={() => {}} />

          {/* 2. CONTEXT STRIP */}
          <BudgetContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. KPI STRIP (8 CARDS) */}
          <BudgetKpiStrip kpis={data.kpis} />

          {/* 4. NAVIGATION TABS (10 TABS) */}
          <BudgetTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <BudgetFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS OVERVIEW */}
          <BudgetReadinessStrip
            counters={data.readiness}
            onClearAll={handleClearFilters}
            onRefresh={handleRefresh}
            onApplyFilters={() => {}}
          />

          {/* Inline Error State */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={handleRefresh}
                className="font-bold underline text-rose-800 hover:text-rose-900 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Skeleton Loading State */}
          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-20 bg-gray-100 rounded w-full" />
              <div className="h-40 bg-gray-100 rounded w-full" />
            </div>
          ) : (
            <>
              {/* 7. MARKETING BUDGET PORTFOLIO TABLE */}
              <BudgetPortfolioTable
                budgets={paginatedBudgets}
                selectedId={selectedBudgetId}
                onSelectBudget={(bgt) => setSelectedBudgetId(bgt.id)}
                selectedCheckboxes={selectedCheckboxes}
                onToggleCheckbox={handleToggleCheckbox}
                onToggleAllCheckboxes={handleToggleAllCheckboxes}
              />

              {/* 8. PAGINATION */}
              <BudgetPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />

              {/* 9. SELECTED BUDGET WORKSPACE (20 CARDS) */}
              <SelectedBudgetWorkspace details={selectedBudget} />
            </>
          )}
        </main>

        {/* 10. RIGHT OPERATIONAL RAIL */}
        <BudgetOperationsRail railData={data.rail} onCreateBudget={() => {}} />
      </div>
    </div>
  );
}
