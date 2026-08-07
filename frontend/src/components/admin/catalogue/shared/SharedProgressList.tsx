"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export interface ProgressItem {
  label: string;
  pct: number;
  color: string;
  value?: string | number;
}

export interface SharedProgressListProps {
  title?: string;
  items: ProgressItem[];
  layout?: "horizontal" | "vertical"; // horizontal = Label on left, vertical = Label above
  footerText?: string;
  onFooterClick?: () => void;
  hasCardWrapper?: boolean;
}

export function SharedProgressList({ title, items, layout = "horizontal", footerText, onFooterClick, hasCardWrapper = true }: SharedProgressListProps) {
  const content = (
    <>
      {title && <h3 className="text-[13px] font-bold text-ink mb-4">{title}</h3>}
      <div className="flex flex-col gap-3 flex-1">
         {items.map((item, i) => (
           layout === "horizontal" ? (
             <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-muted w-24 truncate">{item.label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-[11px] font-bold text-ink w-12 text-right">{item.value || `${item.pct}%`}</span>
             </div>
           ) : (
             <div key={i} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold">
                   <span className="text-muted flex items-center gap-1.5">
                     {item.color && <div className={`w-2 h-2 rounded-full ${item.color}`}></div>}
                     {item.label}
                   </span>
                   <span className="text-ink">{item.value || item.pct} <span className="text-muted font-normal ml-1">({item.pct}%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
             </div>
           )
         ))}
      </div>
      {footerText && (
        <div className="mt-4 pt-3 border-t border-line">
          <button onClick={onFooterClick} className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">
            {footerText} <ChevronRight size={12} />
          </button>
        </div>
      )}
    </>
  );

  if (!hasCardWrapper) {
    return <div className="flex flex-col flex-1">{content}</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col">
      {content}
    </div>
  );
}

