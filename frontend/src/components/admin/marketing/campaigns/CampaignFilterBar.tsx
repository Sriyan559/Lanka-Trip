"use client";

import React from "react";
import { Filter, Calendar } from "lucide-react";

export interface CampaignFilterState {
  status: string;
  type: string;
  channel: string;
  audience: string;
  businessUnit: string;
  brand: string;
  owner: string;
  approvalStatus: string;
  budgetStatus: string;
  governance: string;
  dateRange: string;
}

interface CampaignFilterBarProps {
  filters: CampaignFilterState;
  onFilterChange: (key: keyof CampaignFilterState, val: string) => void;
}

export function CampaignFilterBar({
  filters,
  onFilterChange,
}: CampaignFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
      <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-1.5 w-full text-[11px] font-semibold text-gray-700">
        {/* Filters Label */}
        <div className="flex items-center gap-1 text-gray-400 shrink-0 mr-0.5 text-[9px] font-bold uppercase tracking-wider">
          <Filter className="w-3 h-3 text-gray-400" />
          <span>FILTERS:</span>
        </div>

        {/* 1. Campaign Status */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            CAMPAIGN STATUS
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Awaiting Approval">Awaiting Approval</option>
            <option value="Draft">Draft</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* 2. Campaign Type */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            CAMPAIGN TYPE
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Acquisition">Acquisition</option>
            <option value="Retention">Retention</option>
            <option value="Re-engagement">Re-engagement</option>
            <option value="Product Launch">Product Launch</option>
          </select>
        </div>

        {/* 3. Channel */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            CHANNEL
          </label>
          <select
            value={filters.channel}
            onChange={(e) => onFilterChange("channel", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
            <option value="Paid Social">Paid Social</option>
            <option value="Web">Web</option>
          </select>
        </div>

        {/* 4. Audience */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            AUDIENCE
          </label>
          <select
            value={filters.audience}
            onChange={(e) => onFilterChange("audience", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Repeat Enthusiasts">Repeat Enthusiasts</option>
            <option value="Premium Skincare Buyers">Premium Skincare Buyers</option>
            <option value="New Customers">New Customers</option>
            <option value="VIP Loyalty">VIP Loyalty</option>
          </select>
        </div>

        {/* 5. Business Unit */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            BUSINESS UNIT
          </label>
          <select
            value={filters.businessUnit}
            onChange={(e) => onFilterChange("businessUnit", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Beauty Retail">Beauty Retail</option>
            <option value="Loyalty">Loyalty</option>
          </select>
        </div>

        {/* 6. Brand */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            BRAND
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange("brand", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="SL Beauty Core">SL Beauty Core</option>
            <option value="Skincare Pro">Skincare Pro</option>
          </select>
        </div>

        {/* 7. Owner */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            OWNER
          </label>
          <select
            value={filters.owner}
            onChange={(e) => onFilterChange("owner", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Marketing Team">Marketing Team</option>
            <option value="CRM Marketing">CRM Marketing</option>
            <option value="Performance Marketing">Performance Marketing</option>
            <option value="Brand Marketing">Brand Marketing</option>
          </select>
        </div>

        {/* 8. Approval Status */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            APPROVAL STATUS
          </label>
          <select
            value={filters.approvalStatus}
            onChange={(e) => onFilterChange("approvalStatus", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Not Submitted">Not Submitted</option>
          </select>
        </div>

        {/* 9. Budget Status */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            BUDGET STATUS
          </label>
          <select
            value={filters.budgetStatus}
            onChange={(e) => onFilterChange("budgetStatus", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Healthy">Healthy</option>
            <option value="Near Limit">Near Limit</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>

        {/* 10. Governance */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight truncate">
            GOVERNANCE
          </label>
          <select
            value={filters.governance}
            onChange={(e) => onFilterChange("governance", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Clear">Clear</option>
            <option value="Consent Clear">Consent Clear</option>
            <option value="Review Required">Review Required</option>
            <option value="Frequency Check">Frequency Check</option>
          </select>
        </div>

        {/* 11. Date Range */}
        <div className="flex flex-col shrink-0 min-w-0 flex-1 xl:flex-initial">
          <label className="text-[8.5px] text-gray-400 font-bold uppercase tracking-tight flex items-center gap-0.5 truncate">
            <Calendar className="w-2.5 h-2.5" />
            <span>DATE RANGE</span>
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange("dateRange", e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-800 focus:outline-none focus:border-[#800020] h-[26px] cursor-pointer"
          >
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Quarter">This Quarter</option>
            <option value="Year to Date">Year to Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}

