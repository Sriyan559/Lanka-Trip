"use client";

import React from "react";
import { MOCK_ISSUE_STATUS_SUMMARY } from "@/data/catalogueQuality.mock";
import { MoreVertical } from "lucide-react";

interface IssueStatusSummaryProps {
  onStatusClick?: (status: string) => void;
}

export function IssueStatusSummary({ onStatusClick }: IssueStatusSummaryProps) {
  const totalCount = MOCK_ISSUE_STATUS_SUMMARY.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
          Issue Status Summary
        </h3>
        <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
          <MoreVertical size={14} />
        </button>
      </div>

      <div className="space-y-2.5 flex-1 flex flex-col justify-center">
        {MOCK_ISSUE_STATUS_SUMMARY.map((item) => (
          <div
            key={item.status}
            onClick={() => onStatusClick && onStatusClick(item.status)}
            className="flex items-center justify-between gap-3 text-[11px] cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
          >
            <span className="font-semibold text-slate-700 w-24 truncate">{item.status}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.pct}%`, backgroundColor: item.color }}
              />
            </div>
            <span className="font-bold text-slate-800 font-mono w-10 text-right">{item.count}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-line flex justify-between items-center text-[11px] font-bold text-slate-800">
        <span>Total</span>
        <span className="font-mono text-[12px]">{totalCount.toLocaleString()}</span>
      </div>
    </div>
  );
}
