'use client';

import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onSearch?: (query: string) => void;
}

const COMMISSION_FILTERS = [
  'Record Type',
  'Commission Type',
  'Fee Type',
  'Calculation Status',
  'Approval Status',
  'Adjustment Status',
  'Reversal Status',
  'Waiver Status',
  'Exemption Status',
  'Hold Status',
  'Dispute Status',
  'Seller',
  'Supplier Tier',
  'Settlement Status',
  'Reconciliation Status',
  'Exception Status',
  'Rule Status',
  'Rule Version',
  'Effective Date',
  'Currency',
  'Amount Band',
  'Rate Band',
  'Supplier',
  'Seller Tier',
  'Product Category',
  'Brand',
  'Product',
  'Invoice',
  'Refund',
  'Return',
  'Settlement',
  'Finance Owner',
  'Reviewer',
  'Approver',
  'Business Unit',
  'Sales Channel',
  'Region',
  'Country',
  'Order Date',
  'Calculation Date',
  'Approval Date',
  'Settlement Date',
  'Updated Date',
  'SLA Status',
];

export function CommissionSearchFilterBar({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    'Calculation Status': 'All',
    'Approval Status': 'All',
    'Settlement Status': 'All',
  });
  const [showAllFilters, setShowAllFilters] = useState(false);

  const handleFilterChange = (filterName: string, val: string) => {
    setActiveFilters((prev) => ({ ...prev, [filterName]: val }));
    toast(`Filter applied: ${filterName} = ${val}`);
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setSearchQuery('');
    if (onSearch) onSearch('');
    toast('All commission filters cleared.');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2.5">
      {/* Top Search Input & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search by commission reference, order ID, seller, supplier, rule..."
            className="w-full pl-9 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:border-[#8f002b] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                if (onSearch) onSearch('');
              }}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          <button
            onClick={() => setShowAllFilters((p) => !p)}
            className="px-2.5 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
          >
            <Filter size={12} />
            <span>{showAllFilters ? 'Less Filters' : '+ More Filters'}</span>
            <ChevronDown size={11} className={`${showAllFilters ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={handleClearAll}
            className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-colors"
          >
            <X size={12} />
            <span>Clear All</span>
          </button>

          <button
            onClick={() => toast.success('Commission filter view saved!')}
            className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-colors"
          >
            <Save size={12} />
            <span>Save View</span>
          </button>

          <button
            onClick={() => toast('Refreshing commission portfolio data...')}
            className="p-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm transition-colors"
            title="Refresh list"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-9 gap-1.5 text-[10px]">
        {(showAllFilters ? COMMISSION_FILTERS : COMMISSION_FILTERS.slice(0, 18)).map((fName) => (
          <div key={fName} className="flex flex-col gap-0.5 min-w-0">
            <label className="text-gray-500 font-semibold truncate leading-tight">{fName}</label>
            <select
              value={activeFilters[fName] || 'All'}
              onChange={(e) => handleFilterChange(fName, e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded px-1.5 py-1 text-[10px] text-gray-800 font-medium focus:bg-white focus:border-[#8f002b] focus:outline-none truncate"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Exception">Exception</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
