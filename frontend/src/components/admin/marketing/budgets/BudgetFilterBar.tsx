"use client";

import React from "react";
import { Search } from "lucide-react";

export interface BudgetFilterState {
  search: string;
  status: string;
  type: string;
  businessUnit: string;
  brand: string;
  campaign: string;
  channel: string;
  owner: string;
  approvalState: string;
  spendHealth: string;
  forecastStatus: string;
  period: string;
}

export const INITIAL_BUDGET_FILTERS: BudgetFilterState = {
  search: "",
  status: "All",
  type: "All",
  businessUnit: "All",
  brand: "All",
  campaign: "All",
  channel: "All",
  owner: "All",
  approvalState: "All",
  spendHealth: "All",
  forecastStatus: "All",
  period: "FY2026",
};

interface BudgetFilterBarProps {
  filters: BudgetFilterState;
  onFilterChange: (key: keyof BudgetFilterState, value: string) => void;
}

export function BudgetFilterBar({
  filters,
  onFilterChange,
}: BudgetFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search budgets by name, ID, owner, campaign..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Budget Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Budget Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Budget Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Budget Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Annual">Annual</option>
              <option value="Campaign">Campaign</option>
              <option value="Monthly">Monthly</option>
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
              <option value="Beauty Enterprise">Beauty Enterprise</option>
              <option value="App & Loyalty">App & Loyalty</option>
            </select>
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => onFilterChange("brand", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="All Brands">All Brands</option>
              <option value="SL Beauty">SL Beauty</option>
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
              <option value="Premium Skincare Re-Engagement">Premium Skincare</option>
              <option value="Haircare Launch">Haircare Launch</option>
              <option value="Loyalty Program Push">Loyalty Program Push</option>
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
              <option value="Paid Media">Paid Media</option>
              <option value="CRM / Messaging">CRM / Messaging</option>
              <option value="Content & Creative">Content & Creative</option>
              <option value="Web & App">Web & App</option>
              <option value="Partnerships / Events">Partnerships / Events</option>
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
              <option value="Amaya Perera">Amaya Perera</option>
              <option value="Kavindi Silva">Kavindi Silva</option>
              <option value="Hasini Fernando">Hasini Fernando</option>
              <option value="Dilini Jayawardene">Dilini Jayawardene</option>
              <option value="Sachini de Silva">Sachini de Silva</option>
              <option value="Nirosha Bandara">Nirosha Bandara</option>
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
              <option value="Awaiting Approval">Awaiting Approval</option>
            </select>
          </div>

          {/* Spend Health */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Spend Health</label>
            <select
              value={filters.spendHealth}
              onChange={(e) => onFilterChange("spendHealth", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Overspend Risk">Overspend Risk</option>
              <option value="Underspend Risk">Underspend Risk</option>
            </select>
          </div>

          {/* Forecast Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Forecast Status</label>
            <select
              value={filters.forecastStatus}
              onChange={(e) => onFilterChange("forecastStatus", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Over Forecast">Over Forecast</option>
            </select>
          </div>

          {/* Period */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Period</label>
            <select
              value={filters.period}
              onChange={(e) => onFilterChange("period", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="FY2026">FY2026</option>
              <option value="FY2025">FY2025</option>
              <option value="Jul-Aug 2026">Jul-Aug 2026</option>
              <option value="Aug 2026">Aug 2026</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
