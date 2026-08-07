'use client';

import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Plus, RefreshCw, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_CHIPS = [
  'Assigned to Me',
  'Failed',
  'Pending Capture',
  'High Risk',
  'Duplicate Candidate',
  'Hold Active',
  'Reconciliation Pending',
];

const FILTER_DROPDOWNS = [
  { label: 'Transaction Type', options: ['All Types', 'Payment', 'Authorization', 'Capture', 'Refund', 'Reversal'] },
  { label: 'Payment Status', options: ['All Statuses', 'Success', 'Pending', 'Failed', 'Declined', 'Reversed', 'Voided'] },
  { label: 'Authorization Status', options: ['All Auth Statuses', 'Authorized', 'Pending Auth', 'Declined', 'Expired'] },
  { label: 'Capture Status', options: ['All Capture Statuses', 'Captured', 'Pending Capture', 'Partially Captured', 'Failed'] },
  { label: 'Failure Status', options: ['All Failure Statuses', 'None', 'Insuff. Funds', 'Do Not Honor', 'Gateway Timeout', '3DS Failed'] },
  { label: 'Reversal Status', options: ['All', 'None', 'Reversed', 'Pending Reversal'] },
  { label: 'Void Status', options: ['All', 'None', 'Voided'] },
  { label: 'Retry Eligibility', options: ['All', 'Eligible', 'Ineligible', 'Retried'] },
  { label: 'Card Network', options: ['All Networks', 'Visa', 'Mastercard', 'Amex', 'Discover', 'JCB'] },
  { label: '3DS Status', options: ['All 3DS', '3DS Authenticated', 'Not Required', 'Failed'] },
  { label: 'Billing Match', options: ['All', 'Match', 'Mismatch', 'Unverified'] },
  { label: 'Currency', options: ['All Currencies', 'LKR', 'USD', 'EUR', 'GBP'] },
  { label: 'Amount Band', options: ['All Amounts', '< LKR 5,000', '5,000 - 20,000', '> 20,000'] },
  { label: 'Fraud Signal', options: ['All Signals', 'Low Risk', 'Medium Risk', 'High Risk / Flagged'] },
  { label: 'Duplicate Hold Status', options: ['All', 'No Duplicate', 'Duplicate Candidate', 'Confirmed Duplicate'] },
  { label: 'Settlement Status', options: ['All Settlement', 'Settled', 'Pending Settlement', 'Unsettled'] },
  { label: 'Reconciliation Status', options: ['All Recon', 'Reconciled', 'Pending Recon', 'Mismatched', 'Unreconciled'] },
  { label: 'Dispute Status', options: ['All Disputes', 'No Dispute', 'Dispute Open', 'Resolved'] },
  { label: 'Chargeback Status', options: ['All Chargebacks', 'None', 'Open Chargeback', 'Won', 'Lost'] },
  { label: 'Exception Status', options: ['All Exceptions', 'None', 'Warning', 'High Exception', 'Critical Exception'] },
  { label: 'Approval Status', options: ['All Approval', 'Approved', 'Pending', 'In Review', 'Rejected'] },
  { label: 'Customer Type', options: ['All Customers', 'Retail', 'Enterprise', 'SME', 'VIP'] },
  { label: 'Customer Segment', options: ['All Segments', 'Salon Cluster', 'Spa', 'Individual', 'Direct'] },
  { label: 'Refund Status', options: ['All Refund', 'No Refund', 'Partial Refund', 'Full Refund'] },
  { label: 'Finance Owner', options: ['All Owners', 'J. Perera', 'D. Fernando', 'A. Wickramasinghe', 'K. Silva'] },
  { label: 'Reviewer', options: ['All Reviewers', 'M. de Silva', 'T. Jayasuriya'] },
  { label: 'Approver', options: ['All Approvers', 'S. Ranasinghe', 'N. Cooray'] },
  { label: 'Business Unit', options: ['All BUs', 'Professional Services', 'Retail Channel', 'Wellness', 'Hair Services'] },
  { label: 'Sales Channel', options: ['All Channels', 'App', 'Web', 'B2B Platform'] },
  { label: 'Region', options: ['All Regions', 'Western', 'Central', 'Southern'] },
  { label: 'Country', options: ['All Countries', 'Sri Lanka', 'Maldives'] },
  { label: 'Capture Date', options: ['All Dates', 'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days'] },
  { label: 'Settlement Date', options: ['All Dates', 'Today', 'This Week', 'This Month'] },
  { label: 'Updated Date', options: ['All Dates', 'Today', 'This Week'] },
  { label: 'SLA Status', options: ['All SLA', 'On Track', 'At Risk', 'Breached'] },
];

export function PaymentFilterBar({ onSearch }: { onSearch?: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [chips, setChips] = useState<string[]>(INITIAL_CHIPS);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleRemoveChip = (chipToRemove: string) => {
    setChips(chips.filter((c) => c !== chipToRemove));
    toast('Filter removed', { icon: 'ℹ️' });
  };

  const handleAddFilter = () => {
    const newFilter = prompt('Enter new filter chip label (e.g. VIP Customers):');
    if (newFilter && newFilter.trim()) {
      setChips([...chips, newFilter.trim()]);
      toast.success(`Filter "${newFilter.trim()}" added`);
    }
  };

  const handleClearAll = () => {
    setChips([]);
    setSearchTerm('');
    setFilterValues({});
    toast('All filters cleared');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col gap-2.5 text-xs">
      {/* 1. Removable Active Filter Chips Row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-bold text-gray-500 mr-1">Active Filters:</span>
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8f002b]/10 text-[#8f002b] border border-[#8f002b]/20"
          >
            <span>{chip}</span>
            <button
              onClick={() => handleRemoveChip(chip)}
              className="hover:text-red-700 p-0.5 rounded-full hover:bg-[#8f002b]/20 transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}

        <button
          onClick={handleAddFilter}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-200"
        >
          <Plus size={10} />
          <span>Add Filter</span>
        </button>

        {chips.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[10px] font-semibold text-gray-500 hover:text-gray-800 ml-auto underline"
          >
            Clear Chips
          </button>
        )}
      </div>

      {/* 2. Main Search & Primary Action Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search transaction, payment, order, customer, gateway, invoice or reference..."
            className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#8f002b] focus:ring-1 focus:ring-[#8f002b]/20"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                onSearch?.('');
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMoreFilters((p) => !p)}
            className={`px-3 py-1.5 border rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              showMoreFilters
                ? 'bg-[#8f002b] text-white border-[#8f002b]'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter size={12} />
            <span>More Filters</span>
            <ChevronDown size={11} className={`${showMoreFilters ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={handleClearAll}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
          >
            Clear All
          </button>

          <button
            onClick={() => toast.success('Current view saved to preferences')}
            className="px-3 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-colors"
          >
            <Save size={12} />
            <span>Save View</span>
          </button>

          <button
            onClick={() => toast.success('Filter grid refreshed')}
            className="p-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Refresh Filters"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* 3. Advanced Payment Filters Grid Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 pt-2 border-t border-gray-100">
        {FILTER_DROPDOWNS.slice(0, showMoreFilters ? FILTER_DROPDOWNS.length : 16).map((f) => (
          <div key={f.label} className="flex flex-col gap-0.5">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-tight truncate">
              {f.label}
            </label>
            <select
              value={filterValues[f.label] || f.options[0]}
              onChange={(e) => setFilterValues({ ...filterValues, [f.label]: e.target.value })}
              className="w-full border border-gray-200 rounded px-1.5 py-1 text-[11px] font-medium text-gray-700 bg-white focus:outline-none focus:border-[#8f002b] truncate"
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
