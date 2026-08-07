'use client';

import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onSearch?: (query: string) => void;
}

const REFUND_STATUS_OPTIONS = [
  'All Statuses',
  'Pending Review',
  'Pending Approval',
  'Approved',
  'Processing',
  'Completed',
  'Rejected',
  'Failed',
  'Partially Refunded',
  'Escalated',
];

const ELIGIBILITY_OPTIONS = ['All Eligibility', 'Eligible', 'Under Review', 'Not Eligible'];
const AMOUNT_OPTIONS = ['All Amounts', '< LKR 1,000', 'LKR 1,000 - 5,000', 'LKR 5,000 - 10,000', '> LKR 10,000'];
const PROCESSING_OPTIONS = ['All Processing', 'Processing', 'Completed', 'Failed', 'Pending'];
const COMP_TYPE_OPTIONS = ['All Compensation', 'None', 'Compensation Payment', 'Shipping Compensation', 'Store Credit'];
const PAYMENT_METHOD_OPTIONS = ['All Methods', 'VISA', 'MasterCard', 'AMEX', 'mCash', 'EzCash', 'Bank Transfer'];
const GATEWAY_OPTIONS = ['All Gateways', 'Stripe', 'PayHere', 'mCash', 'EzCash', 'Manual Bank'];

export function RefundSearchFilterBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedEligibility, setSelectedEligibility] = useState('All Eligibility');
  const [selectedAmount, setSelectedAmount] = useState('All Amounts');
  const [selectedProcessing, setSelectedProcessing] = useState('All Processing');
  const [selectedCompType, setSelectedCompType] = useState('All Compensation');
  const [selectedMethod, setSelectedMethod] = useState('All Methods');
  const [selectedGateway, setSelectedGateway] = useState('All Gateways');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleClearAll = () => {
    setQuery('');
    setSelectedStatus('All Statuses');
    setSelectedEligibility('All Eligibility');
    setSelectedAmount('All Amounts');
    setSelectedProcessing('All Processing');
    setSelectedCompType('All Compensation');
    setSelectedMethod('All Methods');
    setSelectedGateway('All Gateways');
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
            placeholder="Search by refund ID, order ID, customer, reason..."
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
          {/* Refund Status */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-gray-500 font-medium text-[10px] uppercase">Refund Status</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {REFUND_STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Eligibility */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-gray-500 font-medium text-[10px] uppercase">Eligibility</span>
            <select
              value={selectedEligibility}
              onChange={(e) => setSelectedEligibility(e.target.value)}
              className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {ELIGIBILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <span className="text-gray-500 font-medium text-[10px] uppercase">Amount (LKR)</span>
            <select
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {AMOUNT_OPTIONS.map((opt) => (
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
            onClick={() => toast.success('Refreshing portfolio data...')}
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
            <label className="text-[10px] font-bold text-gray-500 uppercase">Processing Status</label>
            <select
              value={selectedProcessing}
              onChange={(e) => setSelectedProcessing(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {PROCESSING_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Compensation Type</label>
            <select
              value={selectedCompType}
              onChange={(e) => setSelectedCompType(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {COMP_TYPE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Payment Method</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {PAYMENT_METHOD_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase">Gateway</label>
            <select
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
              className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold"
            >
              {GATEWAY_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
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
            <label className="text-[10px] font-bold text-gray-500 uppercase">Region / Branch</label>
            <select className="w-full mt-0.5 p-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-semibold">
              <option>All Regions</option>
              <option>Colombo HQ</option>
              <option>Kandy Hub</option>
              <option>Galle Office</option>
              <option>Jaffna Office</option>
              <option>Kurunegala Hub</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
