'use client';

import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onSearch?: (q: string) => void;
}

const REVENUE_STATUS_OPTIONS = ['All', 'Recognized', 'Deferred', 'Pending'];
const RECEIVABLE_STATUS_OPTIONS = ['All', 'Current', 'Due Soon', 'Overdue', 'Partially Paid', 'Disputed'];
const AGEING_OPTIONS = ['All', '0-7 Days', '8-30 Days', '31-60 Days', '61-90 Days', '90+ Days'];
const COLLECTION_OPTIONS = ['All', 'Collected', 'Partially Paid', 'Pending', 'Overdue'];
const CHANNEL_OPTIONS = ['All Channels', 'App', 'Web', 'B2B Platform'];
const BU_OPTIONS = ['All BUs', 'Professional Services', 'Retail Channel', 'Wellness', 'Hair Services', 'Nail Services', 'Skin Services', 'Multi-Service'];
const EXCEPTION_OPTIONS = ['All', 'None', 'Warning', 'High', 'Critical'];
const APPROVAL_OPTIONS = ['All', 'Approved', 'Pending', 'In Review'];

function FilterDropdown({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold border rounded-lg transition-colors ${
          value !== options[0]
            ? 'border-[#8f002b] text-[#8f002b] bg-[#fdf2f5]'
            : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
        }`}
      >
        <span>{label}: {value}</span>
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 ${opt === value ? 'font-bold text-[#8f002b]' : 'text-gray-700'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RevenueSearchFilterBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [revenueStatus, setRevenueStatus] = useState('All');
  const [receivableStatus, setReceivableStatus] = useState('All');
  const [ageing, setAgeing] = useState('All');
  const [collection, setCollection] = useState('All');
  const [channel, setChannel] = useState('All Channels');
  const [bu, setBu] = useState('All BUs');
  const [exception, setException] = useState('All');
  const [approval, setApproval] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFiltersCount = [revenueStatus, receivableStatus, ageing, collection, channel, bu, exception, approval].filter(
    (v, i) => v !== ['All', 'All', 'All', 'All', 'All Channels', 'All BUs', 'All', 'All'][i]
  ).length;

  function handleClearAll() {
    setQuery('');
    setRevenueStatus('All');
    setReceivableStatus('All');
    setAgeing('All');
    setCollection('All');
    setChannel('All Channels');
    setBu('All BUs');
    setException('All');
    setApproval('All');
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col gap-2">
      {/* Primary Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[160px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
            placeholder="Search by ref, invoice, account, order..."
            className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-[11px] focus:outline-none focus:border-[#8f002b] focus:ring-1 focus:ring-[#8f002b]/20"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X size={11} />
            </button>
          )}
        </div>

        {/* Primary Filters */}
        <FilterDropdown label="Revenue" options={REVENUE_STATUS_OPTIONS} value={revenueStatus} onChange={setRevenueStatus} />
        <FilterDropdown label="Receivable" options={RECEIVABLE_STATUS_OPTIONS} value={receivableStatus} onChange={setReceivableStatus} />
        <FilterDropdown label="Ageing" options={AGEING_OPTIONS} value={ageing} onChange={setAgeing} />
        <FilterDropdown label="Collection" options={COLLECTION_OPTIONS} value={collection} onChange={setCollection} />

        {/* Advanced Toggle */}
        <button
          onClick={() => setShowAdvanced((p) => !p)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold border rounded-lg transition-colors ${
            showAdvanced || activeFiltersCount > 0
              ? 'border-[#8f002b] text-[#8f002b] bg-[#fdf2f5]'
              : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
          }`}
        >
          <Filter size={12} />
          <span>More Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-[#8f002b] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">{activeFiltersCount}</span>
          )}
        </button>

        {/* Clear All */}
        {(query || activeFiltersCount > 0) && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={11} />
            Clear all
          </button>
        )}

        {/* Apply Filter */}
        <button
          onClick={() => toast.success('Filters applied')}
          className="px-3 py-1.5 bg-[#8f002b] text-white text-[11px] font-bold rounded-lg hover:bg-[#741d35] transition-colors ml-auto"
        >
          Apply Filters
        </button>
      </div>

      {/* Advanced Filters Row */}
      {showAdvanced && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          <FilterDropdown label="Channel" options={CHANNEL_OPTIONS} value={channel} onChange={setChannel} />
          <FilterDropdown label="Business Unit" options={BU_OPTIONS} value={bu} onChange={setBu} />
          <FilterDropdown label="Exception" options={EXCEPTION_OPTIONS} value={exception} onChange={setException} />
          <FilterDropdown label="Approval" options={APPROVAL_OPTIONS} value={approval} onChange={setApproval} />

          {/* Date Range */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-500 font-medium">Due:</span>
            <input type="date" className="px-2 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#8f002b]" />
            <span className="text-[11px] text-gray-400">to</span>
            <input type="date" className="px-2 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#8f002b]" />
          </div>

          {/* Amount Range */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-500 font-medium">Amount:</span>
            <input type="number" placeholder="Min LKR" className="w-24 px-2 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#8f002b]" />
            <span className="text-[11px] text-gray-400">–</span>
            <input type="number" placeholder="Max LKR" className="w-24 px-2 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#8f002b]" />
          </div>
        </div>
      )}
    </div>
  );
}
