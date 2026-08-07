'use client';

import React, { useState } from 'react';
import { RefreshCw, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { FinanceContext } from '@/types/finance';
import { MOCK_FINANCE_CONTEXT } from '@/data/mockFinanceData';

interface Props {
  context?: FinanceContext;
}

export function FinanceContextBar({ context: contextProp }: Props) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const context = contextProp ?? MOCK_FINANCE_CONTEXT;

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.loading('Refreshing finance network state...', { id: 'ref-toast' });
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Finance network data synchronized!', { id: 'ref-toast' });
    }, 800);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm text-xs font-medium text-gray-700 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
      {/* Context Key-Value Pairs */}
      <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Tenant</span>
          <span className="font-bold text-gray-900">{context.tenant}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Ecosystem</span>
          <span className="font-bold text-gray-900">{context.ecosystem}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Business Unit</span>
          <span className="font-bold text-gray-900">{context.businessUnit}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Sales Channels</span>
          <span className="font-bold text-gray-900">{context.salesChannel}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Region</span>
          <span className="font-bold text-gray-900">{context.region}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Base Currency</span>
          <span className="font-bold text-gray-900">{context.baseCurrency}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Finance Scope</span>
          <span className="font-bold text-gray-900">{context.scope}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Accounting Period</span>
          <span className="font-bold text-gray-900">{context.accountingPeriod}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Date Range</span>
          <span className="font-bold text-gray-900">{context.dateRange}</span>
        </div>
      </div>

      {/* Status Indicators & Sync State */}
      <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-400 font-normal">Live Data</span>
          <span className="font-bold text-emerald-700">enabled</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Data Completeness</span>
          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden inline-flex">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${context.dataCompleteness}%` }} />
          </div>
          <span className="font-bold text-gray-900">{context.dataCompleteness}%</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Last Synced</span>
          <span className="font-semibold text-gray-800">{context.lastSynced}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 font-normal">Financial Period State</span>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] px-2 py-0.5 rounded-full font-bold">
            {context.periodState}
          </span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <Lock size={11} className="text-gray-400" />
            {context.accessNotice}
          </span>
          <button
            onClick={handleRefresh}
            title="Refresh network context"
            className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-900"
          >
            <RefreshCw size={13} className={`${isRefreshing ? 'animate-spin text-[#8f002b]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
