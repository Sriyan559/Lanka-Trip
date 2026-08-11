"use client";

import React from "react";
import { Search } from "lucide-react";

export interface ReportFilterState {
  search: string;
  reportType: string;
  marketingDomain: string;
  status: string;
  businessUnit: string;
  fileFormat: string;
  privacyClassification: string;
  deliveryDestination: string;
  dateRange: string;
}

export const INITIAL_REPORT_FILTERS: ReportFilterState = {
  search: "",
  reportType: "All",
  marketingDomain: "All",
  status: "All",
  businessUnit: "All",
  fileFormat: "All",
  privacyClassification: "All",
  deliveryDestination: "All",
  dateRange: "Last 30 Days",
};

interface ReportFiltersProps {
  filters: ReportFilterState;
  onFilterChange: (key: keyof ReportFilterState, value: string) => void;
  onApplyFilters: () => void;
}

export function ReportFilters({
  filters,
  onFilterChange,
  onApplyFilters,
}: ReportFiltersProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports by name, id, owner, domain..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Report Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Report Type</label>
            <select
              value={filters.reportType}
              onChange={(e) => onFilterChange("reportType", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Executive">Executive</option>
              <option value="Detail">Detail</option>
              <option value="Audit">Audit</option>
            </select>
          </div>

          {/* Marketing Domain */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Marketing Domain</label>
            <select
              value={filters.marketingDomain}
              onChange={(e) => onFilterChange("marketingDomain", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Performance">Performance</option>
              <option value="Campaigns">Campaigns</option>
              <option value="Paid Media">Paid Media</option>
              <option value="Budgets">Budgets</option>
              <option value="Attribution">Attribution</option>
              <option value="Governance">Governance</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Running">Running</option>
              <option value="Pending">Pending</option>
              <option value="Completed with Warnings">Completed with Warnings</option>
              <option value="Failed">Failed</option>
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
            </select>
          </div>

          {/* File Format */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">File Format</label>
            <select
              value={filters.fileFormat}
              onChange={(e) => onFilterChange("fileFormat", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
              <option value="Parquet">Parquet</option>
            </select>
          </div>

          {/* Privacy Classification */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Privacy Classification</label>
            <select
              value={filters.privacyClassification}
              onChange={(e) => onFilterChange("privacyClassification", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Aggregate">Aggregate</option>
              <option value="Restricted">Restricted</option>
              <option value="Confidential">Confidential</option>
            </select>
          </div>

          {/* Delivery Destination */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Delivery Destination</label>
            <select
              value={filters.deliveryDestination}
              onChange={(e) => onFilterChange("deliveryDestination", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Email">Email</option>
              <option value="SFTP">SFTP</option>
              <option value="S3">S3</option>
              <option value="Internal">Internal</option>
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
