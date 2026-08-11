"use client";

import React from "react";
import { Search } from "lucide-react";

export interface ChannelFilterState {
  search: string;
  status: string;
  type: string;
  provider: string;
  businessUnit: string;
  market: string;
  senderStatus: string;
  deliveryHealth: string;
  consentEligibility: string;
  providerSync: string;
  lastActivity: string;
}

export const INITIAL_CHANNEL_FILTERS: ChannelFilterState = {
  search: "",
  status: "All",
  type: "All",
  provider: "All",
  businessUnit: "All",
  market: "All",
  senderStatus: "All",
  deliveryHealth: "All",
  consentEligibility: "All",
  providerSync: "All",
  lastActivity: "All",
};

interface ChannelFilterBarProps {
  filters: ChannelFilterState;
  onFilterChange: (key: keyof ChannelFilterState, value: string) => void;
}

export function ChannelFilterBar({
  filters,
  onFilterChange,
}: ChannelFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col gap-2">
      {/* Top Search Row + Filter Selects Grid */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search channels, providers, senders..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Channel Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Channel Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Degraded">Degraded</option>
              <option value="Disconnected">Disconnected</option>
            </select>
          </div>

          {/* Channel Type */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Channel Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="Push">Push</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Web-Push">Web Push</option>
            </select>
          </div>

          {/* Provider */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Provider</label>
            <select
              value={filters.provider}
              onChange={(e) => onFilterChange("provider", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Marketing Cloud">Marketing Cloud</option>
              <option value="Twilio">Twilio</option>
              <option value="Firebase Cloud">Firebase Cloud</option>
              <option value="Meta BSP">Meta BSP</option>
              <option value="OneSignal">OneSignal</option>
              <option value="Infobip">Infobip</option>
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
              <option value="Beauty Enterprise">Beauty Enterprise</option>
              <option value="App & Loyalty">App & Loyalty</option>
              <option value="Customer Engagement">Customer Engagement</option>
              <option value="Loyalty & Retention">Loyalty & Retention</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          {/* Market */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Market</label>
            <select
              value={filters.market}
              onChange={(e) => onFilterChange("market", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Sri Lanka">Sri Lanka</option>
            </select>
          </div>

          {/* Sender Status */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Sender Status</label>
            <select
              value={filters.senderStatus}
              onChange={(e) => onFilterChange("senderStatus", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Issue">Issue</option>
            </select>
          </div>

          {/* Delivery Health */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Delivery Health</label>
            <select
              value={filters.deliveryHealth}
              onChange={(e) => onFilterChange("deliveryHealth", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Consent Eligibility */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Consent Eligibility</label>
            <select
              value={filters.consentEligibility}
              onChange={(e) => onFilterChange("consentEligibility", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Explicit">Explicit</option>
              <option value="Implicit">Implicit</option>
            </select>
          </div>

          {/* Provider Sync */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Provider Sync</label>
            <select
              value={filters.providerSync}
              onChange={(e) => onFilterChange("providerSync", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
            </select>
          </div>

          {/* Last Activity */}
          <div className="flex flex-col">
            <label className="text-[10px] font-medium text-gray-400 px-1">Last Activity</label>
            <select
              value={filters.lastActivity}
              onChange={(e) => onFilterChange("lastActivity", e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#800020]"
            >
              <option value="All">All</option>
              <option value="Recent">Recent (&lt; 5m)</option>
              <option value="Active">Active (&lt; 1h)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
