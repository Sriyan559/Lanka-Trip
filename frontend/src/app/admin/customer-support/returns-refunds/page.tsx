"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ReturnsRefundHeader } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundHeader";
import { ReturnsRefundContextBar } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundContextBar";
import { ReturnsRefundKpis } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundKpis";
import { ReturnsRefundTabs, ReturnsTabId } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundTabs";
import { ReturnsRefundFilters } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundFilters";
import { ReturnsRefundPortfolioTable } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundPortfolioTable";
import { SelectedReturnRefundCaseWorkspace } from "@/components/admin/customer-support/returns-refunds/SelectedReturnRefundCaseWorkspace";
import { ReturnsRefundOperationsRail } from "@/components/admin/customer-support/returns-refunds/ReturnsRefundOperationsRail";

import {
  MOCK_RETURN_REFUND_CASES,
  MOCK_SELECTED_RETURN_CASE_DETAILS,
  MOCK_OPERATIONS_RAIL_DATA,
} from "@/components/admin/customer-support/returns-refunds/mockData";
import { ReturnRefundCase } from "@/components/admin/customer-support/returns-refunds/types";

export default function ReturnsRefundPage() {
  const [cases, setCases] = useState<ReturnRefundCase[]>(MOCK_RETURN_REFUND_CASES);
  const [selectedCase, setSelectedCase] = useState<ReturnRefundCase>(MOCK_RETURN_REFUND_CASES[0]);
  const [activeTab, setActiveTab] = useState<ReturnsTabId>("active-cases");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState("return-requested");

  // Header Actions
  const handleReviewCritical = () => {
    setActiveTab("escalated");
    toast.success("Filtered to critical return cases");
  };

  const handleReviewRefundExceptions = () => {
    setActiveTab("refund-exceptions");
    toast.success("Filtered to refund exceptions");
  };

  const handleReviewDisputes = () => {
    setActiveTab("disputes");
    toast.success("Filtered to active customer disputes");
  };

  const handleMoreActions = () => {
    toast.success("More actions dropdown toggled");
  };

  // Filter cases list
  const filteredCases = cases.filter((c) => {
    if (activeTab === "return-requests" && c.issueType !== "Return Request") return false;
    if (activeTab === "inspection" && c.inspectionStatus === "—") return false;
    if (activeTab === "refund-pending" && c.refundStatus !== "Refund Pending") return false;
    if (activeTab === "refund-exceptions" && c.refundStatus !== "Refund Failed") return false;
    if (activeTab === "disputes" && c.disputeStatus !== "Dispute Open") return false;
    if (activeTab === "sla-risk" && c.slaStatus !== "At Risk") return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchCustomer = c.customerName.toLowerCase().includes(q);
      const matchOrder = c.relatedOrderId.toLowerCase().includes(q);
      const matchReturn = c.returnRef.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchOrder && !matchReturn) return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col p-4 bg-slate-50/50 min-h-screen">
      {/* 1. Page Header */}
      <ReturnsRefundHeader
        onReviewCritical={handleReviewCritical}
        onReviewRefundExceptions={handleReviewRefundExceptions}
        onReviewDisputes={handleReviewDisputes}
        onMoreActions={handleMoreActions}
      />

      {/* 2. Tenant / Source / Policy Context Bar */}
      <ReturnsRefundContextBar />

      {/* 3. Top KPI Summary Cards */}
      <ReturnsRefundKpis />

      {/* 4. Horizontal Workspace Tabs */}
      <ReturnsRefundTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filters (Toolbar Search, 18 Selects, 18 Quick Chips, Readiness Strip) */}
      <ReturnsRefundFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChip={selectedChip}
        onChipChange={setSelectedChip}
        onClearAll={() => {
          setSearchQuery("");
          setSelectedChip("");
          toast.success("Filters cleared");
        }}
        onRefresh={() => toast.success("Returns & refund cases refreshed")}
        onSaveView={() => toast.success("Current view saved")}
        onMoreFilters={() => toast.success("More filters panel opened")}
      />

      {/* 6. Main 2-Column Desktop Area (Main Workspace ~83% | Operations Rail ~17%) */}
      <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
        {/* Main Content Workspace (~83% width) */}
        <div className="w-full xl:w-[83%] flex flex-col">
          {/* Portfolio Table */}
          <ReturnsRefundPortfolioTable
            cases={filteredCases}
            selectedId={selectedCase.id}
            onSelect={setSelectedCase}
          />

          {/* Selected Return / Refund Case Workspace */}
          <SelectedReturnRefundCaseWorkspace details={MOCK_SELECTED_RETURN_CASE_DETAILS} />
        </div>

        {/* Right Operations Summary Rail (~17% width) */}
        <div className="w-full xl:w-[17%] shrink-0">
          <ReturnsRefundOperationsRail data={MOCK_OPERATIONS_RAIL_DATA} />
        </div>
      </div>
    </div>
  );
}
