"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function CampaignAutosaveBar() {
  return (
    <div className="flex items-center gap-2 text-xs font-sans text-emerald-700 bg-emerald-50/60 px-3 py-1 rounded-lg border border-emerald-100/80">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      <span className="font-bold text-[11px]">Autosave enabled</span>
      <span className="text-gray-300">|</span>
      <span className="text-[11px] font-medium text-gray-600">All changes saved automatically</span>
    </div>
  );
}
