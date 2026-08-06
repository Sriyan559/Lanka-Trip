"use client";

import React from "react";
import { MediaAsset } from "@/types/mediaManagement";
import { SelectedMediaPreviewCard } from "./SelectedMediaPreviewCard";
import { MOCK_CATALOGUE_HEALTH, MOCK_PRIORITY_ALERTS } from "@/data/mediaAssets.mock";
import { AlertCircle, Image, Video, FileText, View, HardDrive } from "lucide-react";

interface SidebarProps {
  selectedAsset: MediaAsset | null;
  onOpenDetail: (asset: MediaAsset) => void;
  onReplace: (asset: MediaAsset) => void;
  onRevoke: (id: string) => void;
  onFilterClick: (type: string, value: string) => void;
}

export function MediaIntelligenceSidebar({
  selectedAsset,
  onOpenDetail,
  onReplace,
  onRevoke,
  onFilterClick,
}: SidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 1. Media Catalogue Health Panel */}
      <div className="bg-white border border-line rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold text-ink uppercase tracking-wider">
            Media Catalogue Health
          </h3>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {MOCK_CATALOGUE_HEALTH.status}
          </span>
        </div>

        {/* Circular Health Meter */}
        <div className="flex items-center gap-4 mb-4 pb-3 border-b border-line">
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray="89, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-ink leading-none">{MOCK_CATALOGUE_HEALTH.score}</span>
              <span className="text-[9px] text-muted font-bold">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[11px] flex-1">
            {MOCK_CATALOGUE_HEALTH.metrics.slice(0, 4).map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-slate-500">{m.label}</span>
                <span className="font-bold text-ink">{m.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining Metrics */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] mb-3">
          {MOCK_CATALOGUE_HEALTH.metrics.slice(4).map((m) => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px]">{m.label}</span>
              <span className="font-bold text-ink">{m.percentage}%</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onFilterClick("tab", "Quality Issues")}
          className="w-full text-center text-[11px] font-bold text-[#671021] hover:underline pt-2 border-t border-line"
        >
          View full health dashboard &rarr;
        </button>
      </div>

      {/* 2. Priority Media Alerts */}
      <div className="bg-white border border-line rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle size={14} className="text-rose-600" /> Priority Media Alerts
          </h3>
          <button onClick={() => onFilterClick("tab", "Quality Issues")} className="text-[10px] font-bold text-rose-600 hover:underline">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-2 text-[11px]">
          {MOCK_PRIORITY_ALERTS.map((alt) => (
            <div
              key={alt.id}
              onClick={() => onFilterClick("chip", alt.label)}
              className="p-2 rounded border border-line hover:border-slate-300 hover:bg-slate-50 flex items-center justify-between gap-2 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="font-semibold text-slate-700">{alt.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-ink">{alt.count}</span>
                <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                  alt.severity === "High" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {alt.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Asset Status Summary & Asset Type Summary Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Status Summary */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[11px]">
          <h4 className="text-[10px] font-extrabold text-ink uppercase tracking-wider mb-2">Status Summary</h4>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex justify-between"><span className="text-emerald-600 font-bold">Active</span><span className="font-bold">46,910</span></div>
            <div className="flex justify-between"><span className="text-amber-600 font-bold">Pending</span><span className="font-bold">286</span></div>
            <div className="flex justify-between"><span className="text-emerald-600 font-bold">Approved</span><span className="font-bold">42,884</span></div>
            <div className="flex justify-between"><span className="text-rose-600 font-bold">Rejected</span><span className="font-bold">124</span></div>
            <div className="flex justify-between"><span className="text-slate-500 font-bold">Archived</span><span className="font-bold">1,128</span></div>
          </div>
        </div>

        {/* Type Summary */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[11px]">
          <h4 className="text-[10px] font-extrabold text-ink uppercase tracking-wider mb-2">Type Summary</h4>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex justify-between items-center"><span className="flex items-center gap-1 text-slate-600"><Image size={11} /> Images</span><span className="font-bold">40,126</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-1 text-slate-600"><Video size={11} /> Videos</span><span className="font-bold">4,832</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-1 text-slate-600"><FileText size={11} /> Docs</span><span className="font-bold">2,974</span></div>
            <div className="flex justify-between items-center"><span className="flex items-center gap-1 text-slate-600"><View size={11} /> 360°</span><span className="font-bold">688</span></div>
          </div>
        </div>
      </div>

      {/* 4. Quality Risk & Storage Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px] flex flex-col gap-3">
        <div>
          <h4 className="text-[10px] font-extrabold text-ink uppercase tracking-wider mb-1.5">Quality Risk Summary</h4>
          <div className="flex flex-col gap-1.5 text-[10px]">
            <div>
              <div className="flex justify-between mb-0.5"><span className="text-emerald-700 font-bold">Low Risk</span><span className="font-mono font-bold">45,812 (94%)</span></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[94%]" /></div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5"><span className="text-amber-700 font-bold">Medium Risk</span><span className="font-mono font-bold">2,126 (4%)</span></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[4%]" /></div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5"><span className="text-rose-700 font-bold">High Risk</span><span className="font-mono font-bold">682 (2%)</span></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[2%]" /></div>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-2.5">
          <h4 className="text-[10px] font-extrabold text-ink uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <HardDrive size={12} className="text-slate-500" /> Storage Summary
          </h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
            <div><span className="text-muted">Total Storage:</span> <span className="font-bold text-ink">2.3 TB</span></div>
            <div><span className="text-muted">Monthly Growth:</span> <span className="font-bold text-emerald-600">+182 GB</span></div>
            <div><span className="text-muted">CDN Synced:</span> <span className="font-bold text-emerald-600">96%</span></div>
            <div><span className="text-muted">Transform Queue:</span> <span className="font-bold text-amber-600">24</span></div>
          </div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10px] font-extrabold text-ink uppercase tracking-wider">Quick Queues</h4>
          <button onClick={() => onFilterClick("tab", "Pending Approval")} className="text-[10px] font-bold text-[#671021] hover:underline">
            View all queues &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <button onClick={() => onFilterClick("tab", "Pending Approval")} className="p-2 rounded border border-line bg-amber-50/50 hover:bg-amber-100/50 text-left font-bold text-amber-900">
            Pending Approval (286)
          </button>
          <button onClick={() => onFilterClick("chip", "Missing Mandatory")} className="p-2 rounded border border-line bg-rose-50/50 hover:bg-rose-100/50 text-left font-bold text-rose-900">
            Missing Mandatory (124)
          </button>
          <button onClick={() => onFilterClick("tab", "Duplicates")} className="p-2 rounded border border-line bg-rose-50/50 hover:bg-rose-100/50 text-left font-bold text-rose-900">
            Duplicate Review (38)
          </button>
          <button onClick={() => onFilterClick("tab", "Usage Rights")} className="p-2 rounded border border-line bg-amber-50/50 hover:bg-amber-100/50 text-left font-bold text-amber-900">
            Rights Expiring (17)
          </button>
        </div>
      </div>

      {/* 6. Selected Asset Preview Card */}
      <SelectedMediaPreviewCard
        asset={selectedAsset}
        onOpenDetail={onOpenDetail}
        onReplace={onReplace}
        onRevoke={onRevoke}
      />
    </div>
  );
}
