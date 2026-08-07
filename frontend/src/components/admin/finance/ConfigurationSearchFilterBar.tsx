'use client';

import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onSearch?: (query: string) => void;
}

const CONFIG_FILTERS = [
  'Configuration Domain',
  'Configuration Type',
  'Configuration Status',
  'Approval Status',
  'Effective Status',
  'Conflict Status',
  'Exception Status',
  'Tax Jurisdiction',
  'Tax Type',
  'Party Type',
  'Tax Profile',
  'Product Category',
  'Brand',
  'Product',
  'Invoice Type',
  'Sales Channel',
  'Business Unit',
  'Region',
  'Country',
  'Currency',
  'Exchange Rate Provider',
  'Rate Status',
  'Override Status',
  'Rounding Mode',
  'Accounting Period',
  'Period Status',
  'Effective From',
  'Effective To',
  'Updated Date',
  'Configuration Owner',
  'Reviewer',
  'Approver',
  'SLA Status',
];

export function ConfigurationSearchFilterBar({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    'Configuration Domain': 'All',
    'Configuration Status': 'All',
    'Approval Status': 'All',
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
    toast('All configuration filters cleared.');
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
            placeholder="Search by config reference, domain, rule name, jurisdiction, FX pair..."
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
            onClick={() => toast.success('Configuration filter view saved!')}
            className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-colors"
          >
            <Save size={12} />
            <span>Save View</span>
          </button>

          <button
            onClick={() => toast('Refreshing configuration portfolio data...')}
            className="p-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm transition-colors"
            title="Refresh list"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-9 gap-1.5 text-[10px]">
        {(showAllFilters ? CONFIG_FILTERS : CONFIG_FILTERS.slice(0, 18)).map((fName) => (
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
              <option value="Draft">Draft</option>
              <option value="Conflicting">Conflicting</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
