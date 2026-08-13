'use client';

import React from 'react';
import { Calendar, RefreshCw, Bookmark } from 'lucide-react';
import { TeamsFilterParams } from '@/types/teamsPerformance';

interface WorkforceFiltersProps {
  filters: TeamsFilterParams;
  onFilterChange: (key: keyof TeamsFilterParams, value: string) => void;
  onClearAll: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
}

export function WorkforceFilters({
  filters,
  onFilterChange,
  onClearAll,
  onSaveView,
  onRefresh,
}: WorkforceFiltersProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-2 text-xs">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[repeat(11,minmax(0,1fr))] gap-2">
        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">GW Brand</label>
          <select
            value={filters.brand || 'All'}
            onChange={(e) => onFilterChange('brand', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="SL Beauty">SL Beauty</option>
            <option value="GlowRx">GlowRx</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Support Division</label>
          <select
            value={filters.division || 'All'}
            onChange={(e) => onFilterChange('division', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Customer Ops">Customer Ops</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Region</label>
          <select
            value={filters.region || 'All'}
            onChange={(e) => onFilterChange('region', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="APAC">APAC</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Agent Type</label>
          <select
            value={filters.agentType || 'All'}
            onChange={(e) => onFilterChange('agentType', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Internal">Internal</option>
            <option value="Partner">Partner</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Site</label>
          <select
            value={filters.site || 'All'}
            onChange={(e) => onFilterChange('site', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Colombo HQ">Colombo HQ</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Date Range</label>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium text-[10px]">
            <Calendar size={11} className="text-slate-400 shrink-0" />
            <span className="truncate">May 12 – May 18, 2025</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Shift</label>
          <select
            value={filters.shift || 'All'}
            onChange={(e) => onFilterChange('shift', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Channel</label>
          <select
            value={filters.channel || 'All'}
            onChange={(e) => onFilterChange('channel', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="In-App Chat">In-App Chat</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Case Priority</label>
          <select
            value={filters.priority || 'All'}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="High">High Priority</option>
            <option value="Standard">Standard</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Skill Reference</label>
          <select
            value={filters.skillRef || 'All'}
            onChange={(e) => onFilterChange('skillRef', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Order Tracking">Order Tracking</option>
            <option value="Returns">Returns</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Skill Performance</label>
          <select
            value={filters.skillPerf || 'All'}
            onChange={(e) => onFilterChange('skillPerf', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Expert">Expert</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={onClearAll}
          className="px-2 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 text-[10px]"
        >
          Clear All
        </button>
        <button
          type="button"
          onClick={onSaveView}
          className="px-2 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
        >
          <Bookmark size={10} className="text-slate-500" />
          Save View
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className="px-2 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
        >
          <RefreshCw size={10} className="text-slate-500" />
          Refresh
        </button>
      </div>
    </div>
  );
}
