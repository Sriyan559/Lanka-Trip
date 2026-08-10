"use client";

import React from "react";
import { UserCheck, Clock, AlertCircle, ImageDown, Copy, Link2Off, CalendarX, EyeOff, RotateCcw } from "lucide-react";

interface QuickFiltersProps {
  activeChips: string[];
  onToggleChip: (chip: string) => void;
}

export function MediaQuickFilters({ activeChips, onToggleChip }: QuickFiltersProps) {
  const chips = [
    { label: "Assigned to Me", icon: UserCheck, available: false },
    { label: "Pending Approval", icon: Clock, available: true },
    { label: "Missing Mandatory", icon: AlertCircle, available: true },
    { label: "Low Resolution", icon: ImageDown, available: true },
    { label: "Duplicate Risk", icon: Copy, available: true },
    { label: "Unlinked", icon: Link2Off, available: true },
    { label: "Rights Expiring", icon: CalendarX, available: true },
    { label: "Missing Alt Text", icon: EyeOff, available: true },
    { label: "Recall Media", icon: RotateCcw, available: false },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip) => {
        const Icon = chip.icon;
        const isActive = activeChips.includes(chip.label);
        return (
          <button
            key={chip.label}
            disabled={!chip.available}
            title={!chip.available ? "Unavailable — no authoritative assignment or recall-media schema is installed." : undefined}
            onClick={() => onToggleChip(chip.label)}
            className={`h-7 px-3 rounded-full text-[11px] font-bold border flex items-center gap-1.5 transition-all ${
              isActive
                ? "bg-[#671021] text-white border-[#671021] shadow-sm"
                : chip.available ? "bg-rose-50/60 text-[#671021] border-rose-200/70 hover:bg-rose-100/80" : "cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200"
            }`}
          >
            <Icon size={12} />
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
}
