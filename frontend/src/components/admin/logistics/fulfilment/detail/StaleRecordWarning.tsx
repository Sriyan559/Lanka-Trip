"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface StaleRecordWarningProps {
  onRefresh?: () => void;
}

export function StaleRecordWarning({ onRefresh }: StaleRecordWarningProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between shadow-sm animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <AlertTriangle size={15} className="text-amber-600 flex-shrink-0" />
        <span className="font-medium">
          This fulfilment order was updated by another administrator. Please refresh the data before approval or taking any action.
        </span>
      </div>

      <button
        type="button"
        onClick={onRefresh || (() => window.location.reload())}
        className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 hover:underline text-[11px] flex-shrink-0"
      >
        <RefreshCw size={13} />
        <span>Refresh</span>
      </button>
    </div>
  );
}
