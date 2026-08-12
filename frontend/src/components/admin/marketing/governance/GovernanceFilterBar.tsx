"use client";

import React from "react";
import { Search } from "lucide-react";

export interface GovernanceFilterState {
  search: string;
  governanceStatus: string;
  policyType: string;
  businessUnit: string;
  campaign: string;
  channel: string;
  owner: string;
  approvalState: string;
  severity: string;
  sourceSystem: string;
  dateRange: string;
}

export const INITIAL_GOVERNANCE_FILTERS: GovernanceFilterState = {
  search: "",
  governanceStatus: "All",
  policyType: "All",
  businessUnit: "All",
  campaign: "All",
  channel: "All",
  owner: "All",
  approvalState: "All",
  severity: "All",
  sourceSystem: "All",
  dateRange: "Last 30 Days",
};

interface GovernanceFilterBarProps {
  filters: GovernanceFilterState;
  onFilterChange: (key: keyof GovernanceFilterState, value: string) => void;
}

export function GovernanceFilterBar({
  filters,
  onFilterChange,
}: GovernanceFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search policy, campaign, approval, rule, exception, owner..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Governance Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Governance Status</label>
            <select
              value={filters.governanceStatus}
              onChange={(e) => onFilterChange("governanceStatus", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Clear">Clear</option>
              <option value="Warning">Warning</option>
              <option value="Review Required">Review Required</option>
              <option value="Blocked">Blocked</option>
              <option value="Approval Pending">Approval Pending</option>
            </select>
          </div>

          {/* Policy Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Policy Type</label>
            <select
              value={filters.policyType}
              onChange={(e) => onFilterChange("policyType", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Campaign Governance">Campaign Governance</option>
              <option value="Content Governance">Content Governance</option>
              <option value="Journey Governance">Journey Governance</option>
              <option value="Paid Media Governance">Paid Media Governance</option>
              <option value="Channel Governance">Channel Governance</option>
            </select>
          </div>

          {/* Business Unit */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Business Unit</label>
            <select
              value={filters.businessUnit}
              onChange={(e) => onFilterChange("businessUnit", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="All Business Units">All Business Units</option>
              <option value="MKT07">MKT07</option>
              <option value="Beauty Enterprise">Beauty Enterprise</option>
              <option value="App & Loyalty">App & Loyalty</option>
            </select>
          </div>

          {/* Campaign */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Campaign</label>
            <select
              value={filters.campaign}
              onChange={(e) => onFilterChange("campaign", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Summer Beauty Festival">Summer Beauty Festival</option>
              <option value="VIP Loyalty Reactivation">VIP Loyalty Reactivation</option>
              <option value="Premium Skincare Email Journey">Premium Skincare</option>
              <option value="Acquisition Meta Campaign">Acquisition Meta</option>
            </select>
          </div>

          {/* Channel */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Channel</label>
            <select
              value={filters.channel}
              onChange={(e) => onFilterChange("channel", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="Push">Push</option>
              <option value="Paid Social">Paid Social</option>
              <option value="Web / App">Web / App</option>
            </select>
          </div>

          {/* Owner */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Owner</label>
            <select
              value={filters.owner}
              onChange={(e) => onFilterChange("owner", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Marketing Governance">Marketing Governance</option>
              <option value="Content Manager">Content Manager</option>
              <option value="Media Manager">Media Manager</option>
            </select>
          </div>

          {/* Approval State */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Approval State</label>
            <select
              value={filters.approvalState}
              onChange={(e) => onFilterChange("approvalState", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Rejected">Rejected</option>
              <option value="Not Required">Not Required</option>
            </select>
          </div>

          {/* Severity */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Severity</label>
            <select
              value={filters.severity}
              onChange={(e) => onFilterChange("severity", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Source System */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Source System</label>
            <select
              value={filters.sourceSystem}
              onChange={(e) => onFilterChange("sourceSystem", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Domain">Customer Domain</option>
              <option value="MK0702">MK0702</option>
              <option value="MK10 / MK12">MK10 / MK12</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange("dateRange", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="FY2026">FY2026</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
