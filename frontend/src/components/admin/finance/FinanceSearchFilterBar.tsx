'use client';

import React, { useState } from 'react';
import { Search, RotateCcw, Bookmark, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onSearchChange?: (term: string) => void;
}

export function FinanceSearchFilterBar({ onSearchChange }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearchChange) onSearchChange(val);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearchChange) onSearchChange('');
    toast.success('All finance filters cleared');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col gap-2">
      {/* Search Input Bar */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search finance operations (ref, order, customer, supplier, seller, invoice, txn id...)"
          className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8f002b] focus:bg-white transition-all font-medium"
        />
      </div>

      {/* Filter Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-1.5 text-[11px]">
        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Financial Domain</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="revenue">Revenue</option>
            <option value="payment">Payment</option>
            <option value="refund">Refund</option>
            <option value="payable">Payable</option>
            <option value="commission">Commission</option>
            <option value="settlement">Settlement</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Transaction Type</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="sale">Sale</option>
            <option value="return">Return</option>
            <option value="payout">Payout</option>
            <option value="fee">Fee</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Transaction Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Payment Method</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
            <option value="bank">Bank Transfer</option>
            <option value="cod">COD</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Gateway</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="koko">Koko Pay</option>
            <option value="mintpay">Mintpay</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Revenue Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="recognized">Recognized</option>
            <option value="deferred">Deferred</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Refund Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="none">None</option>
            <option value="requested">Requested</option>
            <option value="processed">Processed</option>
            <option value="hold">Hold</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Receivable Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="receivable">Receivable</option>
            <option value="collected">Collected</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Payable Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="payable">Payable</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Commission Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="earned">Earned</option>
            <option value="deducted">Deducted</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Settlement Status</label>
          <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
            <option value="all">All</option>
            <option value="settled">Settled</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Filter Row 2 & Action Buttons */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 flex-1 text-[11px]">
          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Reconciliation Status</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="reconciled">Reconciled</option>
              <option value="unreconciled">Unreconciled</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Exception Type</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Approval Status</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="in_review">In Review</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Invoice Status</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="issued">Issued</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Tax Status</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="calculated">Calculated</option>
              <option value="filed">Filed</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Currency</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="lkr">LKR</option>
              <option value="usd">USD</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Risk Level</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Business Unit</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="b2c">B2C</option>
              <option value="b2b">B2B</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Sales Channel</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="all">All</option>
              <option value="web">Web</option>
              <option value="app">App</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Region</label>
            <select className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none focus:border-[#8f002b]">
              <option value="sl">Sri Lanka</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-[10px] text-gray-500 font-medium mb-0.5 truncate">Date Range</label>
            <input
              type="text"
              readOnly
              value="May 20, 2025 - May 26, 2025"
              className="w-full bg-white border border-gray-200 rounded px-1.5 py-1 text-gray-800 focus:outline-none text-[10px] font-semibold truncate cursor-pointer"
            />
          </div>
        </div>

        {/* Clear All / Save View / Refresh */}
        <div className="flex items-center gap-1.5 shrink-0 self-end">
          <button
            onClick={handleClear}
            className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded shadow-sm flex items-center gap-1"
          >
            <RotateCcw size={11} />
            <span>Clear All</span>
          </button>

          <button
            onClick={() => toast.success('Current view saved to preferences')}
            className="px-2.5 py-1 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded shadow flex items-center gap-1"
          >
            <Bookmark size={11} />
            <span>Save View</span>
          </button>

          <button
            onClick={() => toast.success('Table view updated')}
            className="p-1 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded shadow-sm"
            title="Refresh Table"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
