"use client";

import React from "react";
import { QuickAccessItemData } from "@/data/analytics/executivePerformanceData";
import { ExternalLink } from "lucide-react";

interface ActionListProps {
  items: QuickAccessItemData[];
  onItemClick?: (item: QuickAccessItemData) => void;
  className?: string;
}

export function ActionList({ items = [], onItemClick, className = "" }: ActionListProps) {
  return (
    <div className={`space-y-2 text-xs ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/80 hover:bg-slate-100/60 transition-colors"
        >
          <span className="font-bold text-slate-800 text-[11px] leading-tight max-w-[130px]">{item.title}</span>
          <button
            type="button"
            onClick={() => onItemClick?.(item)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-burgundy hover:underline cursor-pointer shrink-0"
          >
            <span>{item.actionText}</span>
            <ExternalLink size={11} />
          </button>
        </div>
      ))}
    </div>
  );
}
