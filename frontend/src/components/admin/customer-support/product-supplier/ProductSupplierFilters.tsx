"use client";

import React from "react";
import { Search, XCircle, Bookmark, RefreshCw, Filter, Calendar } from "lucide-react";

interface ProductSupplierFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedChip: string;
  onChipChange: (chip: string) => void;
  onClearAll?: () => void;
  onRefresh?: () => void;
  onSaveView?: () => void;
  onMoreFilters?: () => void;
}

export function ProductSupplierFilters({
  searchQuery,
  onSearchChange,
  selectedChip,
  onChipChange,
  onClearAll,
  onRefresh,
  onSaveView,
  onMoreFilters,
}: ProductSupplierFiltersProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* 1. Search Toolbar & Select Grid */}
      <div className="flex flex-col gap-2 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200">
        {/* Search Bar & Right Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="relative w-full sm:w-96">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by case reference, customer, product, SKU, batch, supplier..."
              className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#800020]"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClearAll}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <XCircle size={13} className="text-slate-500" />
              <span>Clear All</span>
            </button>

            <button
              onClick={onSaveView}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Bookmark size={13} className="text-slate-500" />
              <span>Save View</span>
            </button>

            <button
              onClick={onRefresh}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={13} className="text-slate-500" />
              <span>Refresh</span>
            </button>

            <button
              onClick={onMoreFilters}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Filter size={13} className="text-slate-500" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Row 1 Selects (8 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Case Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Under Review</option>
              <option>In Progress</option>
              <option>Waiting Supplier</option>
              <option>Queued</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Issue Type</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Authenticity</option>
              <option>Product Quality</option>
              <option>Damaged</option>
              <option>Usage / Ingredient</option>
              <option>Packaging</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Product</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Radiance Vitamin C Serum</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Brand</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Radiance</option>
              <option>GlowGlow</option>
              <option>Silk Touch</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Supplier</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Lane Distribution</option>
              <option>Glow Distribution</option>
              <option>BeautyPlus Global</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Product Category</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Serums &amp; Treatments</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Authenticity Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Under Verification</option>
              <option>Verified</option>
              <option>Suspected</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Safety Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Clear</option>
              <option>Under Review</option>
              <option>Warning</option>
            </select>
          </div>
        </div>

        {/* Row 2 Selects (9 items including Date Range) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-9 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Priority</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">SLA Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>At Risk</option>
              <option>On Track</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>VIP Only</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Agent</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Elena Vance</option>
              <option>M. Silva</option>
              <option>Sara O.</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Auth Team</option>
              <option>Quality Team</option>
              <option>Customer Care</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer Sentiment</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Negative</option>
              <option>Concerned</option>
              <option>Neutral</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Risk Level</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Business Unit</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date Range</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value="Last 7 Days"
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-6 text-[11px] text-slate-800 cursor-pointer focus:outline-none truncate"
              />
              <Calendar size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Readiness / Status Chips (8 Chips) */}
      <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
          Healthy <span className="ml-1 font-bold">118</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
          Needs Attention <span className="ml-1 font-bold">42</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">
          Product Quality Risk <span className="ml-1 font-extrabold">24</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold border border-blue-200">
          Supplier Dependency <span className="ml-1 font-bold">22</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold border border-purple-300">
          Authenticity Review <span className="ml-1 font-extrabold">17</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
          Counterfeit Concern <span className="ml-1 font-extrabold">7</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-bold border border-rose-300">
          Safety Review <span className="ml-1 font-extrabold">9</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
          SLA Risk <span className="ml-1 font-extrabold">18</span>
        </span>
      </div>
    </div>
  );
}
