'use client';

import React from 'react';
import { Filter, RefreshCw, Bookmark, SlidersHorizontal, Calendar } from 'lucide-react';
import { SlaRoutingFilterParams } from '@/types/slaRouting';

interface PolicyFiltersProps {
  filters: SlaRoutingFilterParams;
  onFilterChange: (key: keyof SlaRoutingFilterParams, value: string) => void;
  onClearAll: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
  onMoreFilters?: () => void;
}

export function PolicyFilters({
  filters,
  onFilterChange,
  onClearAll,
  onSaveView,
  onRefresh,
  onMoreFilters,
}: PolicyFiltersProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-2 text-xs">
      {/* Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Policy Status</label>
          <select
            value={filters.status || 'All'}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Policy Type</label>
          <select
            value={filters.type || 'All'}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="SLA">SLA</option>
            <option value="Routing">Routing</option>
            <option value="Escalation">Escalation</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Business Unit</label>
          <select
            value={filters.businessUnit || 'All'}
            onChange={(e) => onFilterChange('businessUnit', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Retail">Retail</option>
            <option value="Marketplace">Marketplace</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Support Category</label>
          <select
            value={filters.category || 'All'}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Order & Delivery">Order &amp; Delivery</option>
            <option value="Safety & Compliance">Safety &amp; Compliance</option>
            <option value="General Support">General Support</option>
            <option value="Returns & Refunds">Returns &amp; Refunds</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Channel</label>
          <select
            value={filters.channel || 'All'}
            onChange={(e) => onFilterChange('channel', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="In-App Chat">In-App Chat</option>
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Queue</label>
          <select
            value={filters.queue || 'All'}
            onChange={(e) => onFilterChange('queue', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Order & Delivery Queue">Order &amp; Delivery</option>
            <option value="Safety Queue">Safety Queue</option>
            <option value="Returns Queue">Returns Queue</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Priority</label>
          <select
            value={filters.priority || 'All'}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Customer Tier</label>
          <select
            value={filters.customerTier || 'All'}
            onChange={(e) => onFilterChange('customerTier', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="VIP Customer">VIP Customer</option>
            <option value="Standard">Standard</option>
            <option value="New Buyer">New Buyer</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Region</label>
          <select
            value={filters.region || 'All'}
            onChange={(e) => onFilterChange('region', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Global">Global</option>
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Effective State</label>
            <select
              value={filters.effectiveState || 'All'}
              onChange={(e) => onFilterChange('effectiveState', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-xs"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Approval State</label>
            <select
              value={filters.approvalState || 'All'}
              onChange={(e) => onFilterChange('approvalState', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-xs"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Conflict State</label>
            <select
              value={filters.conflictState || 'All'}
              onChange={(e) => onFilterChange('conflictState', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-xs"
            >
              <option value="All">All</option>
              <option value="None">None</option>
              <option value="Conflict">Conflict</option>
            </select>
          </div>

          <div className="w-40">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Date Range</label>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-xs">
              <Calendar size={13} className="text-slate-400 shrink-0" />
              <span>Jul 1 – Jul 22, 2026</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
          <button
            type="button"
            onClick={onClearAll}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={onSaveView}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
          >
            <Bookmark size={12} className="text-slate-500" />
            Save View
          </button>

          <button
            type="button"
            onClick={onRefresh}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
          >
            <RefreshCw size={12} className="text-slate-500" />
            Refresh
          </button>

          <button
            type="button"
            onClick={onMoreFilters}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
          >
            <SlidersHorizontal size={12} className="text-slate-500" />
            More Filters
          </button>
        </div>
      </div>
    </div>
  );
}
