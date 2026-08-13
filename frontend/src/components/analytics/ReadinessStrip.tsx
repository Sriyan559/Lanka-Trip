"use client";

import React from "react";
import { StatusBadge } from "./StatusBadge";

export interface ContextItem {
  label: string;
  value: string;
  status?: string;
}

interface ReadinessStripProps {
  items: ContextItem[];
  className?: string;
}

export function ReadinessStrip({ items = [], className = "" }: ReadinessStripProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={`an02-context-strip bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 overflow-x-auto min-w-0 flex items-center gap-4 text-xs whitespace-nowrap scrollbar-thin ${className}`}
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5 border-r border-slate-200/80 pr-4 last:border-0 last:pr-0">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            {item.label}:
          </span>
          {item.status === "connected" ? (
            <StatusBadge status="connected" label="Connected" />
          ) : item.status === "success" ? (
            <span className="font-bold text-emerald-700">{item.value}</span>
          ) : (
            <span className="font-semibold text-slate-800">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
