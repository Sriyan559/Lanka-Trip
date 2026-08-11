"use client";

import React, { useState } from "react";
import { Info, X, Edit3 } from "lucide-react";

export function ActiveCampaignRevisionBanner({
  liveVersion = "v6",
  draftVersion = "v7",
}: {
  liveVersion?: string;
  draftVersion?: string;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sky-50 border border-sky-200/90 rounded-xl p-3 shadow-2xs font-sans text-xs flex items-center justify-between gap-3 text-sky-950">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Info className="w-3.5 h-3.5" />
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap font-bold">
            <span className="text-sky-900">You are editing an active campaign.</span>
            <span className="text-sky-300 font-normal">|</span>
            <span className="text-sky-900">
              Current Live Version: <span className="font-mono text-sky-700">{liveVersion}</span>
            </span>
            <span className="text-sky-300 font-normal">|</span>
            <span className="text-sky-900 flex items-center gap-1">
              Draft Revision: <span className="font-mono text-sky-700">{draftVersion}</span>
              <Edit3 className="w-3 h-3 text-sky-600" />
            </span>
          </div>

          <p className="text-[11px] text-sky-800 font-medium">
            All changes are in this draft revision and will remain unpublished until validation, approval and publication are complete.
          </p>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="p-1 text-sky-500 hover:text-sky-900 hover:bg-sky-100 rounded-lg transition-colors shrink-0"
        title="Dismiss revision alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
