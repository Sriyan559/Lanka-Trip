"use client";

import React from "react";
import { Search, XCircle, Bookmark, RefreshCw, Filter, Calendar } from "lucide-react";

interface ReturnsRefundFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedChip: string;
  onChipChange: (chip: string) => void;
  onClearAll?: () => void;
  onRefresh?: () => void;
  onSaveView?: () => void;
  onMoreFilters?: () => void;
}

export function ReturnsRefundFilters({
  searchQuery,
  onSearchChange,
  selectedChip,
  onChipChange,
  onClearAll,
  onRefresh,
  onSaveView,
  onMoreFilters,
}: ReturnsRefundFiltersProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* 1. Main Search Toolbar & Select Grid Wrapper */}
      <div className="flex flex-col gap-2 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200">
        {/* Search Bar & Right Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="relative w-full sm:w-96">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cases by reference, order, customer, return, refund, dispute, or supplier..."
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
              <option>Refund Pending</option>
              <option>Pickup Open</option>
              <option>Inspection</option>
              <option>Refund Failed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Issue Type</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Refund Delay</option>
              <option>Return Request</option>
              <option>Inspection Issue</option>
              <option>Customer Dispute</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Return Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Completed</option>
              <option>Requested</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Refund Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Refund Pending</option>
              <option>Refund Approved</option>
              <option>Refund Failed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Dispute Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Dispute Open</option>
              <option>No Dispute</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Eligibility Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Eligible</option>
              <option>Under Review</option>
              <option>Not Eligible</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Return Reason</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Refund Delay</option>
              <option>Defective Product</option>
              <option>Wrong Item</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Priority</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* Row 2 Selects (10 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
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
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Supplier</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>GlowLine</option>
              <option>BeautyHub</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Product</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Agent</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Sarah K.</option>
              <option>Nimal R.</option>
              <option>Chandana D.</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Returns Team A</option>
              <option>Returns Team B</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer Sentiment</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Concerned</option>
              <option>Neutral</option>
              <option>Satisfied</option>
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
                value="Apr 25, 2026 – May 2, 2026"
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-6 text-[11px] text-slate-800 cursor-pointer focus:outline-none truncate"
              />
              <Calendar size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Filters (18 Chips) */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar scrollbar-none text-xs">
        <span className="font-bold text-slate-800 whitespace-nowrap">Quick Filters</span>
        <div className="flex items-center gap-1.5">
          {[
            { id: "return-requested", label: "Return Requested", count: 74 },
            { id: "pickup-delayed", label: "Pickup Delayed", count: 28 },
            { id: "inspection-pending", label: "Inspection Pending", count: 36 },
            { id: "refund-pending", label: "Refund Pending", count: 52 },
            { id: "refund-failed", label: "Refund Failed", count: 8 },
            { id: "refund-rejected", label: "Refund Rejected", count: 10 },
            { id: "partial-refund", label: "Partial Refund", count: 14 },
            { id: "exchange-request", label: "Exchange Request", count: 31 },
            { id: "return-rejected", label: "Return Rejected", count: 16 },
            { id: "customer-dispute", label: "Customer Dispute", count: 21 },
            { id: "waiting-logistics", label: "Waiting Logistics", count: 32 },
            { id: "waiting-finance", label: "Waiting Finance", count: 27 },
            { id: "waiting-supplier", label: "Waiting Supplier", count: 18 },
            { id: "sla-at-risk", label: "SLA At Risk", count: 24 },
            { id: "sla-breach", label: "SLA Breach", count: 9 },
            { id: "repeat-contact", label: "Repeat Contact", count: 42 },
            { id: "negative-sentiment", label: "Negative Sentiment", count: 38 },
            { id: "escalated", label: "Escalated", count: 13 },
          ].map((chip) => {
            const isSelected = selectedChip === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => onChipChange(chip.id)}
                className={`px-2.5 py-0.5 rounded border whitespace-nowrap transition-all text-xs font-semibold ${
                  isSelected
                    ? "bg-[#800020] text-white border-[#800020]"
                    : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span>{chip.label}</span>
                <span className={`ml-1.5 font-bold ${isSelected ? "text-red-100" : "text-slate-900"}`}>{chip.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Readiness Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Readiness</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-medium">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
            Healthy <span className="ml-1 font-bold">156</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
            Needs Attention <span className="ml-1 font-bold">58</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">
            Pickup Risk <span className="ml-1 font-extrabold">28</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold border border-purple-200">
            Inspection Delay <span className="ml-1 font-bold">36</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
            Refund Risk <span className="ml-1 font-extrabold">52</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold border border-purple-300">
            Dispute Review <span className="ml-1 font-extrabold">21</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
            Eligibility Warning <span className="ml-1 font-bold">17</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
            SLA Risk <span className="ml-1 font-extrabold">24</span>
          </span>
        </div>
      </div>
    </div>
  );
}
