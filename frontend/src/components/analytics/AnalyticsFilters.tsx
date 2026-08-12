"use client";

import React, { useState } from "react";
import { RotateCcw, Filter } from "lucide-react";

export interface FilterState {
  timePeriod: string;
  comparison: string;
  viewBy: string;
  region: string;
  salesChannel: string;
  businessUnit: string;
  brand: string;
  category: string;
  customerSegment: string;
  sellerType: string;
  promotionType: string;
  source: string;
}

export const DEFAULT_EXECUTIVE_FILTERS: FilterState = {
  timePeriod: "Last 30 Days",
  comparison: "Previous 30 Days",
  viewBy: "Business Unit",
  region: "All Regions",
  salesChannel: "All Channels",
  businessUnit: "All",
  brand: "All Brands",
  category: "All Categories",
  customerSegment: "All Segments",
  sellerType: "All",
  promotionType: "All",
  source: "Last 30 Days",
};

interface AnalyticsFiltersProps {
  onApplyFilters?: (filters: FilterState) => void;
  onClearAll?: () => void;
  className?: string;
}

export function AnalyticsFilters({ onApplyFilters, onClearAll, className = "" }: AnalyticsFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_EXECUTIVE_FILTERS);

  const handleChange = (key: keyof FilterState, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleApply = () => {
    if (onApplyFilters) onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters(DEFAULT_EXECUTIVE_FILTERS);
    if (onClearAll) onClearAll();
  };

  return (
    <div className={`an02-filter-bar bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs ${className}`}>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Time Period */}
        <div className="flex flex-col gap-0.5 min-w-[100px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Time Period</label>
          <select
            value={filters.timePeriod}
            onChange={(e) => handleChange("timePeriod", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Quarter to Date</option>
            <option>Year to Date</option>
          </select>
        </div>

        {/* Comparison */}
        <div className="flex flex-col gap-0.5 min-w-[110px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Comparison</label>
          <select
            value={filters.comparison}
            onChange={(e) => handleChange("comparison", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>Previous 30 Days</option>
            <option>Prior Year Period</option>
            <option>Budget Target</option>
          </select>
        </div>

        {/* View By */}
        <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">View By</label>
          <select
            value={filters.viewBy}
            onChange={(e) => handleChange("viewBy", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>Business Unit</option>
            <option>Region</option>
            <option>Channel</option>
            <option>Category</option>
          </select>
        </div>

        {/* Region */}
        <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Region</label>
          <select
            value={filters.region}
            onChange={(e) => handleChange("region", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All Regions</option>
            <option>Western Province</option>
            <option>Central</option>
            <option>Southern</option>
          </select>
        </div>

        {/* Sales Channel */}
        <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Sales Channel</label>
          <select
            value={filters.salesChannel}
            onChange={(e) => handleChange("salesChannel", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All Channels</option>
            <option>Direct Web</option>
            <option>Mobile App</option>
            <option>Marketplace</option>
          </select>
        </div>

        {/* Business Unit */}
        <div className="flex flex-col gap-0.5 min-w-[70px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Business Unit</label>
          <select
            value={filters.businessUnit}
            onChange={(e) => handleChange("businessUnit", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All</option>
            <option>SL Beauty Core</option>
            <option>Enterprise Marketplace</option>
          </select>
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All Brands</option>
            <option>L&apos;Oreal</option>
            <option>CeraVe</option>
            <option>Maybelline</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All Categories</option>
            <option>Skincare</option>
            <option>Haircare</option>
            <option>Cosmetics</option>
          </select>
        </div>

        {/* Customer Segment */}
        <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Customer Segment</label>
          <select
            value={filters.customerSegment}
            onChange={(e) => handleChange("customerSegment", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All Segments</option>
            <option>VIP Loyalty</option>
            <option>Repeat Buyers</option>
            <option>First Time</option>
          </select>
        </div>

        {/* Seller Type */}
        <div className="flex flex-col gap-0.5 min-w-[65px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Seller Type</label>
          <select
            value={filters.sellerType}
            onChange={(e) => handleChange("sellerType", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All</option>
            <option>1P Direct</option>
            <option>3P Merchant</option>
          </select>
        </div>

        {/* Promotion Type */}
        <div className="flex flex-col gap-0.5 min-w-[75px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Promotion Type</label>
          <select
            value={filters.promotionType}
            onChange={(e) => handleChange("promotionType", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>All</option>
            <option>Flash Sale</option>
            <option>Bundle</option>
          </select>
        </div>

        {/* Source */}
        <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Source</label>
          <select
            value={filters.source}
            onChange={(e) => handleChange("source", e.target.value)}
            className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800 outline-none focus:border-burgundy"
          >
            <option>Last 30 Days</option>
            <option>Realtime API</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 self-end ml-auto pt-1 sm:pt-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <RotateCcw size={11} /> Clear All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-3 py-1 text-xs font-bold text-white bg-burgundy hover:bg-burgundy-dark rounded shadow-xs transition-colors flex items-center gap-1"
          >
            <Filter size={11} /> Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
