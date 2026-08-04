'use client';

import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { SupportCaseFilterParams } from '@/types/customerSupport';

interface MoreFiltersDrawerProps {
  isOpen: boolean;
  filters: SupportCaseFilterParams;
  onClose: () => void;
  onFilterChange: (key: keyof SupportCaseFilterParams, value: string) => void;
  onClearAll: () => void;
}

export function MoreFiltersDrawer({
  isOpen,
  filters,
  onClose,
  onFilterChange,
  onClearAll,
}: MoreFiltersDrawerProps) {
  if (!isOpen) return null;

  const inputClass = "w-full h-[38px] px-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow";
  const labelClass = "block text-[11px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white shadow-2xl w-full max-w-[420px] h-screen max-h-screen flex flex-col transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-line bg-slate-50">
          <h2 className="text-[16px] font-bold text-ink">Advanced Support Filters</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-md p-1 border border-line shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-5">
          <div>
            <label className={labelClass}>Context Type</label>
            <select
              value={filters.context || 'all'}
              onChange={(e) => onFilterChange('context', e.target.value)}
              className={inputClass}
            >
              <option value="all">All Contexts</option>
              <option value="order">Order Context</option>
              <option value="return">Return Context</option>
              <option value="shipment">Shipment Context</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Saved Filter View</label>
            <select
              value={filters.savedView || 'all'}
              onChange={(e) => onFilterChange('savedView', e.target.value)}
              className={inputClass}
            >
              <option value="all">Default View</option>
              <option value="critical-safety">Critical Safety Queue</option>
              <option value="finance-pending">Pending Finance Clearance</option>
              <option value="unassigned-high-priority">Unassigned High Priority</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Order ID Filter</label>
            <input
              type="text"
              value={filters.orderId || ''}
              onChange={(e) => onFilterChange('orderId', e.target.value)}
              placeholder="e.g. 9021"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Return ID Filter</label>
            <input
              type="text"
              value={filters.returnId || ''}
              onChange={(e) => onFilterChange('returnId', e.target.value)}
              placeholder="e.g. 45075"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Shipment ID Filter</label>
            <input
              type="text"
              value={filters.shipmentId || ''}
              onChange={(e) => onFilterChange('shipmentId', e.target.value)}
              placeholder="e.g. 10293"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 border-t border-line bg-slate-50">
          <button type="button" onClick={onClearAll} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-line text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <RotateCcw size={16} />
            <span>Reset Filters</span>
          </button>
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
