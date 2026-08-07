'use client';

import React, { useState } from 'react';
import { Search, Filter, X, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onSearch?: (query: string) => void;
}

const TYPE_OPTIONS = ['All Types', 'Supplier Invoice', 'Credit Note Offset', 'Logistics Charge', 'Promotional Contribution', 'Penalty', 'Rebate'];
const STATUS_OPTIONS = ['All Statuses', 'Due Soon', 'Overdue', 'Scheduled', 'On Hold', 'Disputed', 'Paid', 'Reconciled'];
const MATCH_OPTIONS = ['All Match States', 'Fully Matched', 'Partial Match', 'Unmatched'];
const APPROVAL_OPTIONS = ['All Approvals', 'Approved', 'Pending Approval', 'Pending Review', 'Rejected'];
const SCHEDULE_OPTIONS = ['All Schedules', 'Scheduled', 'Pending', 'Unscheduled'];
const TIER_OPTIONS = ['All Tiers', 'Gold', 'Platinum', 'Silver', 'Bronze'];

export function PayableSearchFilterBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedMatch, setSelectedMatch] = useState('All Match States');
  const [selectedApproval, setSelectedApproval] = useState('All Approvals');
  const [selectedSchedule, setSelectedSchedule] = useState('All Schedules');
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleClearAll = () => {
    setQuery('');
    setSelectedType('All Types');
    setSelectedStatus('All Statuses');
    setSelectedMatch('All Match States');
    setSelectedApproval('All Approvals');
    setSelectedSchedule('All Schedules');
    setSelectedTier('All Tiers');
    if (onSearch) onSearch('');
    toast.success('All filters reset');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col gap-2.5 shadow-sm">
      {/* Top Search + Main Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search by payable ref, supplier, invoice, PO..."
            className="w-full pl-9 pr-8 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8f002b] focus:border-[#8f002b] transition-all"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                if (onSearch) onSearch('');
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Payable Type */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-gray-500 font-medium text-[10px] uppercase">Payable Type</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Payable Status */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-gray-500 font-medium text-[10px] uppercase">Status</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Match Status */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-gray-500 font-medium text-[10px] uppercase">Match Status</span>
            <select
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {MATCH_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Action buttons */}
          <button
            onClick={() => setShowMoreFilters((p) => !p)}
            className="px-2.5 py-1 bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
          >
            <Filter size={12} />
            <span>{showMoreFilters ? 'Fewer Filters' : '... More Filters'}</span>
          </button>

          <button
            onClick={handleClearAll}
            className="px-2 py-1 bg-white border border-gray-300 text-gray-500 hover:text-gray-800 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
          >
            Clear All
          </button>

          <button
            onClick={() => toast.success('Current view saved!')}
            className="px-3 py-1 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1 transition-colors shadow-sm"
          >
            <Save size={12} />
            <span>Save View</span>
          </button>

          <button
            onClick={() => toast.success('Refreshing payables portfolio...')}
            className="p-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Refresh Portfolio"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Expanded Filter Matrix */}
      {showMoreFilters && (
        <div className="pt-2 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Approval Status</label>
            <select
              value={selectedApproval}
              onChange={(e) => setSelectedApproval(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {APPROVAL_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Payment Schedule</label>
            <select
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {SCHEDULE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Supplier Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {TIER_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Hold Status</label>
            <select className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold">
              <option>All Holds</option>
              <option>No Hold</option>
              <option>Active Hold</option>
              <option>Released</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Reconciliation Status</label>
            <select className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold">
              <option>All Reconciliation</option>
              <option>Reconciled</option>
              <option>Pending</option>
              <option>Exception</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Business Unit</label>
            <select className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold">
              <option>All Business Units</option>
              <option>Beauty</option>
              <option>Wellness</option>
              <option>Logistics</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
