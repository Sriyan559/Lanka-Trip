"use client";

import React from "react";
import { AlertTriangle, ChevronRight, CheckCircle2, ShieldCheck, ListOrdered, ArrowUpRight } from "lucide-react";

interface TaxonomyIntelligenceSidebarProps {
  onSelectQueue: (queueKey: string) => void;
}

export const TaxonomyIntelligenceSidebar: React.FC<TaxonomyIntelligenceSidebarProps> = ({
  onSelectQueue,
}) => {
  return (
    <div className="flex flex-col gap-3.5 text-xs">
      {/* Taxonomy Health Score Card */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-[#741d35]" /> Taxonomy Health
          </h3>
        </div>

        <div className="flex items-center gap-4 my-1">
          <div className="relative w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center shrink-0">
            <span className="text-lg font-black text-gray-900">90</span>
            <span className="text-[10px] text-gray-400 absolute bottom-1">/100</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 w-max">
              Healthy
            </span>
            <p className="text-[11px] text-gray-500 leading-tight">
              Taxonomy structure and attribute rules are well maintained.
            </p>
          </div>
        </div>

        <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1 mt-2">
          <span>View full health dashboard</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Priority Alerts */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900">Priority Alerts</h3>
          <button className="text-[10.5px] font-bold text-[#741d35] hover:underline">View all &gt;</button>
        </div>

        <div className="flex flex-col gap-2">
          <div
            onClick={() => onSelectQueue("uncategorized")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-100 hover:border-gray-300 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={13} className="text-rose-500" />
              <span className="font-semibold text-gray-800 text-[11px]">22 Uncategorized Products</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
              High
            </span>
          </div>

          <div
            onClick={() => onSelectQueue("duplicates")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-100 hover:border-gray-300 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={13} className="text-amber-500" />
              <span className="font-semibold text-gray-800 text-[11px]">6 Duplicate Candidates</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
              Medium
            </span>
          </div>

          <div
            onClick={() => onSelectQueue("conflicts")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-100 hover:border-gray-300 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={13} className="text-amber-500" />
              <span className="font-semibold text-gray-800 text-[11px]">9 Channel Conflicts</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
              Medium
            </span>
          </div>

          <div
            onClick={() => onSelectQueue("compliance")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-100 hover:border-gray-300 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={13} className="text-rose-500" />
              <span className="font-semibold text-gray-800 text-[11px]">12 Compliance Gaps</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
              High
            </span>
          </div>
        </div>
      </div>

      {/* Hierarchy Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <h3 className="font-bold text-gray-900 mb-2">Hierarchy Summary</h3>
        <div className="flex flex-col gap-1.5 text-[11.5px] text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Max Depth</span>
            <span className="font-bold text-gray-900">5 Levels</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Avg Products/Category</span>
            <span className="font-bold text-gray-900">245</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Leaf Categories</span>
            <span className="font-bold text-gray-900">84</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Review Required</span>
            <span className="font-bold text-rose-600">14</span>
          </div>
        </div>
      </div>

      {/* Governance Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <h3 className="font-bold text-gray-900 mb-2">Governance Summary</h3>
        <div className="flex flex-col gap-1.5 text-[11.5px] text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Reviewed Today</span>
            <span className="font-bold text-emerald-700">18</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Draft Changes</span>
            <span className="font-bold text-gray-900">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pending Approvals</span>
            <span className="font-bold text-amber-700">312</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Locked Categories</span>
            <span className="font-bold text-gray-900">6</span>
          </div>
        </div>
      </div>

      {/* Quick Queues */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900">Quick Queues</h3>
          <button className="text-[10.5px] font-bold text-[#741d35] hover:underline">View all queues &gt;</button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div
            onClick={() => onSelectQueue("uncategorized")}
            className="p-2 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Uncategorized</span>
            <span className="font-bold text-gray-900">22</span>
          </div>
          <div
            onClick={() => onSelectQueue("duplicates")}
            className="p-2 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Duplicate Review</span>
            <span className="font-bold text-gray-900">6</span>
          </div>
          <div
            onClick={() => onSelectQueue("missing")}
            className="p-2 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Attribute Gaps</span>
            <span className="font-bold text-gray-900">18</span>
          </div>
          <div
            onClick={() => onSelectQueue("compliance")}
            className="p-2 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Compliance Review</span>
            <span className="font-bold text-gray-900">12</span>
          </div>
          <div
            onClick={() => onSelectQueue("conflicts")}
            className="p-2 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Channel Mapping</span>
            <span className="font-bold text-gray-900">9</span>
          </div>
          <div
            onClick={() => onSelectQueue("draft")}
            className="p-2 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Draft Categories</span>
            <span className="font-bold text-gray-900">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};
