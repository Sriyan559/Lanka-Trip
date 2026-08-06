"use client";

import React from "react";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MediaStatusTabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { label: "All Assets", count: null },
    { label: "Images", count: null },
    { label: "Videos", count: null },
    { label: "Documents", count: null },
    { label: "Pending Approval", count: "286", color: "bg-amber-100 text-amber-800" },
    { label: "Quality Issues", count: "214", color: "bg-rose-100 text-rose-800" },
    { label: "Duplicates", count: "38", color: "bg-rose-100 text-rose-800" },
    { label: "Usage Rights", count: "17", color: "bg-rose-100 text-rose-800" },
    { label: "Archived", count: "1,128", color: "bg-slate-200 text-slate-700" },
  ];

  return (
    <div className="border-b border-line mb-4 overflow-x-auto scrollbar-none bg-white rounded-t-lg px-2 pt-1">
      <div className="flex items-center gap-1 min-w-max">
        {tabs.map((t) => {
          const isActive = activeTab === t.label;
          return (
            <button
              key={t.label}
              onClick={() => onTabChange(t.label)}
              className={`px-3.5 py-2.5 text-[12px] font-bold border-b-2 flex items-center gap-2 transition-colors ${
                isActive
                  ? "border-[#671021] text-[#671021]"
                  : "border-transparent text-slate-500 hover:text-ink hover:border-slate-300"
              }`}
            >
              <span>{t.label}</span>
              {t.count && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    t.color || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
