"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ComplaintsPageHeader } from "@/components/admin/customer-support/complaints/ComplaintsPageHeader";
import { ComplaintsContextBar } from "@/components/admin/customer-support/complaints/ComplaintsContextBar";
import { ComplaintsKpiCards } from "@/components/admin/customer-support/complaints/ComplaintsKpiCards";
import { ComplaintsTabs, ComplaintTabId } from "@/components/admin/customer-support/complaints/ComplaintsTabs";
import { ComplaintsFilterSection } from "@/components/admin/customer-support/complaints/ComplaintsFilterSection";
import { ComplaintPortfolioTable } from "@/components/admin/customer-support/complaints/ComplaintPortfolioTable";
import { SelectedComplaintWorkspace } from "@/components/admin/customer-support/complaints/SelectedComplaintWorkspace";
import { ComplaintOperationsRail } from "@/components/admin/customer-support/complaints/ComplaintOperationsRail";

import {
  MOCK_COMPLAINTS,
  MOCK_COMPLAINT_DETAILS,
  MOCK_OPERATIONS_RAIL_DATA,
} from "@/components/admin/customer-support/complaints/mockData";
import { ComplaintItem } from "@/components/admin/customer-support/complaints/types";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<ComplaintItem[]>(MOCK_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem>(MOCK_COMPLAINTS[0]);
  const [activeTab, setActiveTab] = useState<ComplaintTabId>("complaints");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState("critical");

  // Header Actions
  const handleReviewCritical = () => {
    setActiveTab("critical");
    toast.success("Filtered to critical complaints");
  };

  const handleCreateComplaint = () => {
    toast.success("Create complaint workflow opened");
  };

  const handleApproveRemedies = () => {
    setActiveTab("remedy-approvals");
    toast.success("Filtered to pending remedy approvals");
  };

  const handleMoreActions = () => {
    toast.success("More actions dropdown toggled");
  };

  // Filter complaints list
  const filteredComplaints = complaints.filter((c) => {
    if (activeTab === "critical" && c.severity !== "Critical") return false;
    if (activeTab === "escalations" && c.status !== "Escalated") return false;
    if (activeTab === "executive-review" && c.status !== "Executive Review") return false;
    if (activeTab === "reopened" && c.status !== "Reopened") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.rootCause.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col p-4 bg-slate-50/50 min-h-screen">
      {/* 1. Page Header */}
      <ComplaintsPageHeader
        onReviewCritical={handleReviewCritical}
        onCreateComplaint={handleCreateComplaint}
        onApproveRemedies={handleApproveRemedies}
        onMoreActions={handleMoreActions}
      />

      {/* 2. Tenant / Policy / Connectivity Context Bar */}
      <ComplaintsContextBar />

      {/* 3. Top KPI Summary Cards */}
      <ComplaintsKpiCards />

      {/* 4. Horizontal Workspace Tabs */}
      <ComplaintsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filter Section (Search, 15 Selects, 16 Quick Chips, Health Strip) */}
      <ComplaintsFilterSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChip={selectedChip}
        onChipChange={setSelectedChip}
        onClearAll={() => {
          setSearchQuery("");
          setSelectedChip("");
          setActiveTab("complaints");
          toast.success("Filters reset");
        }}
        onRefresh={() => {
          toast.success("Complaints portfolio refreshed");
        }}
      />

      {/* 6. Main 2-Column Desktop Area (Main Content ~81% | Operations Rail ~19%) */}
      <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
        {/* Main Content Workspace (~81% width) */}
        <div className="w-full xl:w-[81%] flex flex-col">
          {/* Complaint Portfolio Table */}
          <ComplaintPortfolioTable
            complaints={filteredComplaints}
            selectedId={selectedComplaint.id}
            onSelect={setSelectedComplaint}
          />

          {/* Selected Complaint Operational Workspace */}
          <SelectedComplaintWorkspace
            details={MOCK_COMPLAINT_DETAILS}
            onOpenDetail={() => {
              toast.success(`Opening detailed record for ${selectedComplaint.id}`);
            }}
          />
        </div>

        {/* Right Operations Summary Rail (~19% width) */}
        <div className="w-full xl:w-[19%] shrink-0">
          <ComplaintOperationsRail data={MOCK_OPERATIONS_RAIL_DATA} />
        </div>
      </div>
    </div>
  );
}
