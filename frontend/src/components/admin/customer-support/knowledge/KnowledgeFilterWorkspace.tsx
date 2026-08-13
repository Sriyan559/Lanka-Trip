'use client';

import React from 'react';
import { Search, RefreshCw, Bookmark, SlidersHorizontal, Calendar } from 'lucide-react';
import { KnowledgeFilterParams } from '@/types/knowledge';

interface KnowledgeFilterWorkspaceProps {
  filters: KnowledgeFilterParams;
  onFilterChange: (key: keyof KnowledgeFilterParams, value: string) => void;
  onClearAll: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
  onMoreFilters?: () => void;
}

export function KnowledgeFilterWorkspace({
  filters,
  onFilterChange,
  onClearAll,
  onSaveView,
  onRefresh,
  onMoreFilters,
}: KnowledgeFilterWorkspaceProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-2 text-xs">
      {/* Primary Search Input */}
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Search articles, topics, cases, or use cases..."
          className="w-full pl-8 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-slate-300"
        />
        <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 bg-slate-100 px-1 py-0.5 rounded border border-slate-200">
          ⌘K
        </span>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Audience</label>
          <select
            value={filters.audience || 'All'}
            onChange={(e) => onFilterChange('audience', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Agents">Agents</option>
            <option value="Customers">Customers</option>
            <option value="Internal Only">Internal Only</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Content Type</label>
          <select
            value={filters.contentType || 'All'}
            onChange={(e) => onFilterChange('contentType', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Article">Article</option>
            <option value="Policy">Policy</option>
            <option value="Playbook">Playbook</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Support Language</label>
          <select
            value={filters.language || 'All'}
            onChange={(e) => onFilterChange('language', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Relevance</label>
          <select
            value={filters.relevance || '>= 80%'}
            onChange={(e) => onFilterChange('relevance', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value=">= 80%">&gt;= 80%</option>
            <option value=">= 90%">&gt;= 90%</option>
            <option value="All">All</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Author</label>
          <select
            value={filters.author || 'All'}
            onChange={(e) => onFilterChange('author', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="J. Patel">J. Patel</option>
            <option value="M. Thompson">M. Thompson</option>
            <option value="A. Chen">A. Chen</option>
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
            <option value="Phone">Phone</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Product / Division</label>
          <select
            value={filters.productDivision || 'All'}
            onChange={(e) => onFilterChange('productDivision', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Skincare">Skincare</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Date Range</label>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium text-[11px]">
            <Calendar size={12} className="text-slate-400 shrink-0" />
            <span>Past 90 days</span>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Confidence Score</label>
            <select
              value={filters.confidenceScore || 'All'}
              onChange={(e) => onFilterChange('confidenceScore', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-[11px]"
            >
              <option value="All">All</option>
              <option value="High">High (&gt;90%)</option>
              <option value="Medium">Medium</option>
            </select>
          </div>

          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Policy Link</label>
            <select
              value={filters.policyLink || 'All'}
              onChange={(e) => onFilterChange('policyLink', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-[11px]"
            >
              <option value="All">All</option>
              <option value="Linked">Linked</option>
              <option value="No Policy">No Policy</option>
            </select>
          </div>

          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Approval Status</label>
            <select
              value={filters.approvalStatus || 'All'}
              onChange={(e) => onFilterChange('approvalStatus', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-[11px]"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="w-32">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Agent Safe</label>
            <select
              value={filters.agentSafe || 'All'}
              onChange={(e) => onFilterChange('agentSafe', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-[11px]"
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-36">
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Content Classification</label>
            <select
              value={filters.contentClassification || 'All'}
              onChange={(e) => onFilterChange('contentClassification', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white focus:outline-none text-[11px]"
            >
              <option value="All">All</option>
              <option value="Customer Safe">Customer Safe</option>
              <option value="Agent Safe">Agent Safe</option>
              <option value="Internal Only">Internal Only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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
