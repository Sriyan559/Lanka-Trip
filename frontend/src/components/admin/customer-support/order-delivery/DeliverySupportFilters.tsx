"use client";

import React from "react";
import { Mail, Bookmark, RefreshCw, AlertCircle, Calendar } from "lucide-react";

interface DeliverySupportFiltersProps {
  selectedChip: string;
  onChipChange: (chip: string) => void;
  onUnread?: () => void;
  onRefresh?: () => void;
  onSaveView?: () => void;
  onViewAlerts?: () => void;
}

export function DeliverySupportFilters({
  selectedChip,
  onChipChange,
  onUnread,
  onRefresh,
  onSaveView,
  onViewAlerts,
}: DeliverySupportFiltersProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* 1. Advanced 14 Selects Grid (2 Rows) + Right Top Actions */}
      <div className="flex flex-col gap-2 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-10 gap-2 items-end">
          {/* Row 1 Selects */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Case Source</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>WEB PORTAL</option>
              <option>MOBILE APP</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Delivery Issue Type</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Dispatch Delay</option>
              <option>Shipment Delay</option>
              <option>Failed Delivery</option>
              <option>Tracking Issue</option>
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

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">SLA Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>At Risk</option>
              <option>On Track</option>
              <option>Breached</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Order Source</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>SLB WEBSITE</option>
              <option>SLB MOBILE APP</option>
              <option>MARKETPLACE</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Fulfilment Source</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Connected</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Top Right Action Buttons spanning remaining cols */}
          <div className="col-span-2 sm:col-span-3 md:col-span-6 xl:col-span-4 flex items-center justify-end gap-2">
            <button
              onClick={onUnread}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Mail size={13} className="text-slate-500" />
              <span>Unread</span>
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
              onClick={onViewAlerts}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <AlertCircle size={13} className="text-slate-500" />
              <span>View Alerts</span>
            </button>
          </div>
        </div>

        {/* Row 2 Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Carrier</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>FedEx</option>
              <option>UPS</option>
              <option>DHL</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Supplier</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Lane Distribution</option>
              <option>Glow Essentials</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Agent</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Amelia Rivera</option>
              <option>Jordan Blake</option>
              <option>Taylor Morgan</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Delivery Support</option>
              <option>Logistics Ops</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer Segment</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>VIP</option>
              <option>Gold Loyalty</option>
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
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Shipment Status</label>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
              <option>All</option>
              <option>Connected</option>
              <option>In Transit</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Delivery Status</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value="Last 7 Days"
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-7 text-xs text-slate-800 cursor-pointer focus:outline-none"
              />
              <Calendar size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Filters */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar scrollbar-none text-xs">
        <span className="font-bold text-slate-800 whitespace-nowrap">Quick Filters</span>
        <div className="flex items-center gap-1.5">
          {[
            { id: "requires-reply", label: "Requires Your Reply", count: 14 },
            { id: "sla-at-risk", label: "SLA At Risk", count: 29 },
            { id: "high-priority", label: "High Priority", count: 18 },
            { id: "older-48h", label: "Older Than 48h", count: 37 },
            { id: "unassigned", label: "Unassigned", count: 5 },
            { id: "vip", label: "VIP", count: 9 },
            { id: "waiting-logistics", label: "Waiting Logistics", count: 56 },
            { id: "sla-breached", label: "SLA Breached", count: 12 },
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

      {/* 3. Delivery Support Portfolio Summary Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Delivery Support Portfolio Summary</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-medium">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
            Healthy <span className="ml-1 font-bold">196</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
            Awaiting Dispatch <span className="ml-1 font-bold">24</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">
            Shipment Delay <span className="ml-1 font-extrabold">26</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold border border-purple-200">
            Dispatch Delay <span className="ml-1 font-bold">22</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold border border-blue-200">
            Tracking Issues <span className="ml-1 font-bold">31</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
            Delivery Failure <span className="ml-1 font-extrabold">27</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-semibold border border-orange-200">
            Supplier Dependency <span className="ml-1 font-bold">24</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
            SLA At Risk <span className="ml-1 font-extrabold">29</span>
          </span>
        </div>
      </div>
    </div>
  );
}
