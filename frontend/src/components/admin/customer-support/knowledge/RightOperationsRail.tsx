'use client';

import React from 'react';
import {
  RotateCw,
  Plus,
  TrendingUp,
  FileCheck,
  FileWarning,
  Shield,
  Layers,
  Download,
} from 'lucide-react';

interface RightOperationsRailProps {
  onCreateArticle?: () => void;
  onCreatePlaybook?: () => void;
  onRunAudit?: () => void;
  onReviewGaps?: () => void;
  onReviewConflicts?: () => void;
  onBulkUpdate?: () => void;
  onExportReport?: () => void;
}

export function RightOperationsRail({
  onCreateArticle,
  onCreatePlaybook,
  onRunAudit,
  onReviewGaps,
  onReviewConflicts,
  onBulkUpdate,
  onExportReport,
}: RightOperationsRailProps) {
  return (
    <div className="w-full space-y-2.5 text-xs">
      {/* 1. Knowledge & Assistance Health */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 text-xs">Knowledge &amp; Assistance Health</h4>
          <RotateCw size={12} className="text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* Circular Gauge */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="95, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">95</span>
              <span className="text-[9px] text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-emerald-600 text-xs block">Excellent</span>
            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
              +3 vs last week
            </span>
            <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp size={10} /> Trend
            </span>
          </div>
        </div>
      </div>

      {/* 2. Coverage Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Coverage Summary</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Published
          </span>
          <span className="font-bold text-slate-900">842</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Needs Review
          </span>
          <span className="font-bold text-slate-900">41</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Low Confidence
          </span>
          <span className="font-bold text-rose-600">18</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Gaps
          </span>
          <span className="font-bold text-rose-600">27</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Policy Conflicts
          </span>
          <span className="font-bold text-purple-600">9</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Missing Sources
          </span>
          <span className="font-bold text-blue-600">7</span>
        </div>
      </div>

      {/* 3. Content Health */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Content Health</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
          </span>
          <span className="font-bold text-slate-900">713 <span className="text-emerald-600 font-semibold text-[10px]">85%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Needs Review
          </span>
          <span className="font-bold text-slate-900">41 <span className="text-amber-600 font-semibold text-[10px]">5%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Low Confidence
          </span>
          <span className="font-bold text-rose-600">18 <span className="text-rose-600 font-semibold text-[10px]">2%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Gaps
          </span>
          <span className="font-bold text-rose-600">27 <span className="text-rose-600 font-semibold text-[10px]">3%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Conflicts
          </span>
          <span className="font-bold text-purple-600">9 <span className="text-purple-600 font-semibold text-[10px]">1%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Missing Sources
          </span>
          <span className="font-bold text-blue-600">7 <span className="text-blue-600 font-semibold text-[10px]">1%</span></span>
        </div>
      </div>

      {/* 4. By Audience */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">By Audience</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Agents
          </span>
          <span className="font-bold text-slate-900">642 <span className="text-emerald-600 font-semibold text-[10px]">76%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Customers (Self Service)
          </span>
          <span className="font-bold text-slate-900">142 <span className="text-blue-600 font-semibold text-[10px]">17%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Internal Only
          </span>
          <span className="font-bold text-slate-900">46 <span className="text-amber-600 font-semibold text-[10px]">5%</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Restricted
          </span>
          <span className="font-bold text-slate-900">12 <span className="text-purple-600 font-semibold text-[10px]">2%</span></span>
        </div>
      </div>

      {/* 5. Top Use Cases */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Top Use Cases</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Delivery &amp; Logistics</span>
          <span className="font-bold text-slate-900">214</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Returns &amp; Refunds</span>
          <span className="font-bold text-slate-900">168</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Payments</span>
          <span className="font-bold text-slate-900">132</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Account Management</span>
          <span className="font-bold text-slate-900">98</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Product Info</span>
          <span className="font-bold text-slate-900">78</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Orders</span>
          <span className="font-bold text-slate-900">64</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Other</span>
          <span className="font-bold text-slate-900">88</span>
        </div>
      </div>

      {/* 6. Final Actions (7 Dark Crimson Buttons) */}
      <div className="space-y-1.5 pt-1">
        <button
          type="button"
          onClick={onCreateArticle}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create Knowledge Article</span>
        </button>

        <button
          type="button"
          onClick={onCreatePlaybook}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create Resolution Playbook</span>
        </button>

        <button
          type="button"
          onClick={onRunAudit}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><FileCheck size={13} /> Run Knowledge Audit</span>
        </button>

        <button
          type="button"
          onClick={onReviewGaps}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><FileWarning size={13} /> Review Knowledge Gaps</span>
        </button>

        <button
          type="button"
          onClick={onReviewConflicts}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Shield size={13} /> Review Policy Conflicts</span>
        </button>

        <button
          type="button"
          onClick={onBulkUpdate}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Layers size={13} /> Bulk Content Update</span>
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Download size={13} /> Export Knowledge Report</span>
        </button>
      </div>
    </div>
  );
}
