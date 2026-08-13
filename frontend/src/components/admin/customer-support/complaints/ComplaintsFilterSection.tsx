"use client";

import React from "react";
import { Search, RotateCcw, Bookmark, RefreshCw, Filter, Calendar } from "lucide-react";

interface ComplaintsFilterSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedChip: string;
  onChipChange: (chip: string) => void;
  onClearAll?: () => void;
  onRefresh?: () => void;
}

export function ComplaintsFilterSection({
  searchQuery,
  onSearchChange,
  selectedChip,
  onChipChange,
  onClearAll,
  onRefresh,
}: ComplaintsFilterSectionProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* 1. Search + Top Filter Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search complaints by reference, customer, order, supplier, issue, or keyword..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-2xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onClearAll}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} className="text-slate-500" />
            <span>Clear All</span>
          </button>

          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors">
            <Bookmark size={13} className="text-slate-500" />
            <span>Save View</span>
          </button>

          <button
            onClick={onRefresh}
            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw size={13} className="text-slate-500" />
            <span>Refresh</span>
          </button>

          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors">
            <Filter size={13} className="text-slate-500" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* 2. Advanced 15 Selects Grid (2 Rows) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-9 gap-2 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200">
        {/* Row 1 */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Complaint Status</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Escalated</option>
            <option>Executive Review</option>
            <option>In Progress</option>
            <option>Waiting Customer</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Severity</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Escalation Level</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Support Manager</option>
            <option>Team Lead</option>
            <option>Operations Director</option>
            <option>Executive Director</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Root Cause</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Carrier Assignment Failure</option>
            <option>Payment Gateway Failure</option>
            <option>Product Safety Issue</option>
            <option>Counterfeit Concern</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>VIP Customers</option>
            <option>Repeat Contacts</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Owner</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Anupa Perera</option>
            <option>Dilani Perera</option>
            <option>Nimal Perera</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Customer Operations</option>
            <option>Payments Team</option>
            <option>Product Safety Team</option>
            <option>Returns Support Team</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Related Case</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Linked</option>
            <option>Unlinked</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Business Unit</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Beauty Direct</option>
            <option>Luxe Marketplace</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Recovery Status</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Customer Accepted</option>
            <option>Customer Rejected</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Remedy Status</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Pending Approval</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer Sentiment</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Concerned</option>
            <option>Frustrated</option>
            <option>Neutral</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">SLA Status</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Within SLA</option>
            <option>At Risk</option>
            <option>Breached</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Compliance Trigger</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Safety Incident</option>
            <option>Authenticity Audit</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-2 sm:col-span-2 md:col-span-4">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date Range</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value="Custom Range"
              className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-7 text-xs text-slate-800 cursor-pointer focus:outline-none"
            />
            <Calendar size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 3. Quick Issue / Risk Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar scrollbar-none py-1 text-[11px]">
        {[
          { id: "critical", label: "Critical", count: 12, color: "text-red-700 font-bold" },
          { id: "executive", label: "Executive", count: 6, color: "text-purple-700 font-bold" },
          { id: "sla-at-risk", label: "SLA At Risk", count: 17, color: "text-red-600 font-semibold" },
          { id: "sla-breach", label: "SLA Breach", count: 9, color: "text-red-800 font-bold" },
          { id: "negative-sentiment", label: "Negative Sentiment", count: 46, color: "text-rose-700 font-semibold" },
          { id: "reopened", label: "Reopened", count: 14, color: "text-blue-700 font-semibold" },
          { id: "repeat-failure", label: "Repeat Failure", count: 28, color: "text-slate-800 font-semibold" },
          { id: "recovery-pending", label: "Recovery Pending", count: 19, color: "text-amber-700 font-semibold" },
          { id: "compensation-pending", label: "Compensation Pending", count: 11, color: "text-amber-700 font-semibold" },
          { id: "supplier-failure", label: "Supplier Failure", count: 24, color: "text-slate-800 font-semibold" },
          { id: "delivery-failure", label: "Delivery Failure", count: 39, color: "text-slate-800 font-semibold" },
          { id: "payment-failure", label: "Payment Failure", count: 21, color: "text-slate-800 font-semibold" },
          { id: "product-safety", label: "Product Safety", count: 4, color: "text-red-700 font-bold" },
          { id: "authenticity", label: "Authenticity", count: 7, color: "text-red-700 font-bold" },
          { id: "refund-dispute", label: "Refund Dispute", count: 16, color: "text-amber-700 font-semibold" },
          { id: "customer-rejected-remedy", label: "Customer Rejected Remedy", count: 9, color: "text-red-800 font-bold" },
        ].map((chip) => {
          const isSelected = selectedChip === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onChipChange(chip.id)}
              className={`px-2 py-0.5 rounded border whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-[#800020] text-white border-[#800020] font-bold"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span className={isSelected ? "text-white" : chip.color}>{chip.label}</span>
              <span className={`ml-1 font-bold ${isSelected ? "text-red-100" : "text-slate-900"}`}>{chip.count}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Complaint Health Filter Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 font-medium">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
            Healthy <span className="ml-1 font-bold">96</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
            Needs Attention <span className="ml-1 font-bold">38</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">
            Critical <span className="ml-1 font-extrabold">12</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-semibold border border-orange-200">
            SLA Risk <span className="ml-1 font-bold">17</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
            Executive Review <span className="ml-1 font-extrabold">6</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
            Recovery Approval <span className="ml-1 font-bold">18</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
            Customer Rejected <span className="ml-1 font-extrabold">9</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-900 font-bold border border-orange-300">
            Reopened <span className="ml-1 font-extrabold">14</span>
          </span>
        </div>
      </div>
    </div>
  );
}
