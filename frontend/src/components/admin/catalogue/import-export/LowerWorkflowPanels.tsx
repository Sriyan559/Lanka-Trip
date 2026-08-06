"use client";

import React from "react";
import {
  MOCK_FIELD_MAPPINGS,
  MOCK_VALIDATION_ISSUES,
  MOCK_DUPLICATE_CONFLICTS,
} from "@/data/importExport.mock";
import { DuplicateConflictItem } from "@/types/importExport";

interface LowerWorkflowPanelsProps {
  onOpenCompareDuplicate: (conflict?: DuplicateConflictItem) => void;
  onOpenMappingDrawer: () => void;
  onOpenValidationDrawer: () => void;
  onOpenChangePreviewDrawer: () => void;
  showToast: (msg: string) => void;
}

export function LowerWorkflowPanels({
  onOpenCompareDuplicate,
  onOpenMappingDrawer,
  onOpenValidationDrawer,
  onOpenChangePreviewDrawer,
  showToast,
}: LowerWorkflowPanelsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mb-6">
      {/* 1. Field Mapping & Transformation Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full text-[11px] min-w-0">
        <div>
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            Field Mapping & Transformation Summary
          </h4>

          {/* Top Metrics Strip */}
          <div className="grid grid-cols-4 gap-1 text-[9.5px] pb-2 mb-2 border-b border-line">
            <div>
              <span className="text-slate-400 block font-medium">Matched Fields</span>
              <span className="font-bold text-slate-800 font-mono text-[11px]">1,842</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Unmapped Fields</span>
              <span className="font-bold text-amber-600 font-mono text-[11px]">128</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Transformed Fields</span>
              <span className="font-bold text-sky-600 font-mono text-[11px]">312</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Schema Compliance</span>
              <span className="font-bold text-emerald-600 font-mono text-[11px]">92%</span>
            </div>
          </div>

          {/* Mapping Preview Table */}
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mapping Preview</span>
          <div className="space-y-1">
            {MOCK_FIELD_MAPPINGS.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 border-b border-slate-100 text-[10px]"
              >
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="font-mono text-slate-600 truncate">{item.sourceField}</span>
                  <span className="text-slate-300">→</span>
                  <span className="font-semibold text-ink truncate">{item.targetField}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-1">
                  <span className="text-slate-400 font-medium text-[9px] truncate max-w-[80px]">
                    {item.transformation}
                  </span>
                  {item.status === "Matched" && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[8.5px]">
                      Matched
                    </span>
                  )}
                  {item.status === "Transformed" && (
                    <span className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-bold text-[8.5px]">
                      Transformed
                    </span>
                  )}
                  {item.status === "Unmapped" && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[8.5px]">
                      Unmapped
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenMappingDrawer}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
        >
          View full mapping &rarr;
        </button>
      </div>

      {/* 2. Validation Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full text-[11px] min-w-0">
        <div>
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            Validation Summary
          </h4>

          {/* Top Metrics Strip */}
          <div className="grid grid-cols-4 gap-1 text-[9.5px] pb-2 mb-2 border-b border-line">
            <div>
              <span className="text-slate-400 block font-medium">Blocking Errors</span>
              <span className="font-bold text-rose-600 font-mono text-[11px]">12</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Warnings</span>
              <span className="font-bold text-amber-600 font-mono text-[11px]">34</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Passed Checks</span>
              <span className="font-bold text-emerald-600 font-mono text-[11px]">1,980</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Rejected Records</span>
              <span className="font-bold text-rose-600 font-mono text-[11px]">56</span>
            </div>
          </div>

          {/* Validation Issues */}
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Top Validation Issues</span>
          <div className="space-y-1">
            {MOCK_VALIDATION_ISSUES.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between py-1 border-b border-slate-100 text-[10px]"
              >
                <span className="font-semibold text-slate-700 truncate">{issue.issueType}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-bold font-mono text-rose-600">{issue.count}</span>
                  <button
                    onClick={onOpenValidationDrawer}
                    className="text-[#671021] font-bold hover:underline text-[9.5px]"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenValidationDrawer}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
        >
          View validation report &rarr;
        </button>
      </div>

      {/* 3. Duplicate Conflict Review */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full text-[11px] min-w-0">
        <div>
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            Duplicate Conflict Review
          </h4>

          {/* Top Metrics Strip */}
          <div className="grid grid-cols-2 gap-2 text-[9.5px] pb-2 mb-2 border-b border-line">
            <div>
              <span className="text-slate-400 block font-medium">Conflicts Detected</span>
              <span className="font-bold text-slate-800 font-mono text-[11px]">56</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Auto-Merged</span>
              <span className="font-bold text-emerald-600 font-mono text-[11px]">12</span>
            </div>
          </div>

          {/* Potential Duplicates */}
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Potential Duplicates</span>
          <div className="space-y-1">
            {MOCK_DUPLICATE_CONFLICTS.map((dup) => (
              <div
                key={dup.id}
                className="flex items-center justify-between py-1 border-b border-slate-100 text-[9.5px]"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="font-bold font-mono text-ink text-[9px]">{dup.sku}</span>
                  <span className="text-slate-500 truncate text-[8.5px]">
                    Exist: {dup.existingRecord} | Inc: {dup.incomingRecord}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCompareDuplicate(dup)}
                  className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-bold hover:bg-rose-100 text-[8.5px] flex-shrink-0"
                >
                  {dup.suggestedAction}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onOpenCompareDuplicate()}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
        >
          View all 56 conflicts &rarr;
        </button>
      </div>

      {/* 4. Change Preview Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full text-[11px] min-w-0">
        <div>
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            Change Preview Summary
          </h4>

          {/* Top Metrics Strip */}
          <div className="grid grid-cols-4 gap-1 text-[9.5px] pb-2 mb-2 border-b border-line">
            <div>
              <span className="text-slate-400 block font-medium">Inserted</span>
              <span className="font-bold text-emerald-600 font-mono text-[11px]">320</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Updated</span>
              <span className="font-bold text-amber-600 font-mono text-[11px]">1,024</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Deactivated</span>
              <span className="font-bold text-rose-600 font-mono text-[11px]">24</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Skipped</span>
              <span className="font-bold text-slate-600 font-mono text-[11px]">56</span>
            </div>
          </div>

          {/* Impact Breakdown */}
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Impact Breakdown</span>
          <div className="space-y-1.5 text-[10px]">
            {[
              { label: "Products", count: "1,120", val: 85, color: "bg-emerald-500" },
              { label: "Categories", count: "96", val: 35, color: "bg-emerald-500" },
              { label: "Brands", count: "32", val: 20, color: "bg-emerald-500" },
              { label: "Media", count: "200", val: 50, color: "bg-emerald-500" },
              { label: "Attributes", count: "164", val: 40, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-[9.5px] mb-0.5">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="font-bold font-mono text-ink">{item.count}</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenChangePreviewDrawer}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
        >
          View detailed change preview &rarr;
        </button>
      </div>
    </div>
  );
}
