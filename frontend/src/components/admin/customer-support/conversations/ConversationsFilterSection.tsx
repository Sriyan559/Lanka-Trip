"use client";

import React from "react";
import {
  Search,
  RotateCcw,
  Bookmark,
  RefreshCw,
  Filter,
  Calendar,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  Instagram,
  Facebook,
  PhoneCall,
  Truck,
  RotateCcw as ReturnIcon,
} from "lucide-react";

interface ConversationsFilterSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedChannelChip: string;
  onChannelChipChange: (chip: string) => void;
  onClearAll?: () => void;
  onRefresh?: () => void;
}

export function ConversationsFilterSection({
  searchQuery,
  onSearchChange,
  selectedChannelChip,
  onChannelChipChange,
  onClearAll,
  onRefresh,
}: ConversationsFilterSectionProps) {
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
            placeholder="Search conversations by customer, case, order, message, channel..."
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

      {/* 2. Advanced 13 Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200">
        {/* Row 1 */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Conversation Status</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Waiting for Agent</option>
            <option>Waiting for Customer</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Channel</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>In-App Chat</option>
            <option>WhatsApp</option>
            <option>Email</option>
            <option>Web</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>SMS</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Agent</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Aneesh Perera</option>
            <option>Dinusha Perera</option>
            <option>Unassigned</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Customer Operations</option>
            <option>Logistics Escalations</option>
            <option>VIP Support</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Linked Case</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Linked</option>
            <option>Unlinked</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer Source</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Mobile App</option>
            <option>Storefront Web</option>
            <option>Social Connect</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Priority</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Normal</option>
            <option>Low</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sentiment</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Concerned</option>
            <option>Neutral</option>
            <option>Positive</option>
            <option>Frustrated</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">SLA Status</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Within Target</option>
            <option>At Risk</option>
            <option>Breached</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Escalation</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>Escalated</option>
            <option>Non-Escalated</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Last Activity</label>
          <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none">
            <option>All</option>
            <option>&lt; 15 mins</option>
            <option>&lt; 1 hour</option>
            <option>&lt; 24 hours</option>
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

        <div className="flex flex-col gap-1 col-span-2 sm:col-span-2 md:col-span-2">
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

      {/* 3. Quick Channel Filter Chips Row */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar scrollbar-none py-1">
        {[
          { id: "all", label: "All", count: 126, icon: null },
          { id: "whatsapp", label: "WhatsApp", count: 24, icon: Smartphone },
          { id: "email", label: "Email", count: 26, icon: Mail },
          { id: "web", label: "Web", count: 19, icon: Globe },
          { id: "instagram", label: "Instagram", count: 17, icon: Instagram },
          { id: "facebook", label: "Facebook", count: 13, icon: Facebook },
          { id: "in-app-chat", label: "In-App Chat", count: 12, icon: MessageSquare },
          { id: "sms", label: "SMS", count: 9, icon: Smartphone },
          { id: "delivery", label: "Delivery", count: 12, icon: Truck },
          { id: "returns", label: "Returns", count: 9, icon: ReturnIcon },
          { id: "call", label: "Call", count: 18, icon: PhoneCall },
        ].map((chip) => {
          const isSelected = selectedChannelChip === chip.id;
          const IconComponent = chip.icon;
          return (
            <button
              key={chip.id}
              onClick={() => onChannelChipChange(chip.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                isSelected
                  ? "bg-[#800020] text-white border-[#800020]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {IconComponent && <IconComponent size={12} className={isSelected ? "text-white" : "text-slate-400"} />}
              <span>{chip.label}</span>
              <span className={`text-[11px] ${isSelected ? "text-red-100" : "text-slate-400"}`}>
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Inbox Readiness & Health Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-md p-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-800 flex items-center gap-1.5">
          Inbox Readiness &amp; Health
        </span>

        <div className="flex flex-wrap items-center gap-2 font-medium">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
            Healthy <span className="ml-1 font-bold">512</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
            Needs Attention <span className="ml-1 font-bold">84</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-semibold border border-red-200">
            Unread Priority <span className="ml-1 font-bold">28</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-semibold border border-orange-200">
            SLA Risk <span className="ml-1 font-bold">21</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
            Escalation Required <span className="ml-1 font-extrabold">10</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold border border-blue-200">
            Repeat Contact <span className="ml-1 font-bold">34</span>
          </span>
        </div>
      </div>
    </div>
  );
}
