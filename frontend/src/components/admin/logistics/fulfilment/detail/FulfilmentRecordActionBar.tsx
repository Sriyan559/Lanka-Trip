"use client";

import React from "react";
import { CheckSquare, ShieldCheck, PauseCircle, ShieldAlert, Send, Truck } from "lucide-react";

interface FulfilmentRecordActionBarProps {
  isPackingComplete?: boolean;
  isQualityPassed?: boolean;
  onAction?: (actionName: string) => void;
}

export function FulfilmentRecordActionBar({
  isPackingComplete = false,
  isQualityPassed = false,
  onAction,
}: FulfilmentRecordActionBarProps) {
  const isDispatchReady = isPackingComplete && isQualityPassed;

  return (
    <div className="bg-white rounded-xl border border-line p-3 shadow-sm flex flex-wrap items-center gap-2.5 text-xs">
      <button
        type="button"
        onClick={() => onAction ? onAction("Complete Packing") : alert("Executing Complete Packing...")}
        className="px-3.5 py-2 bg-[#701a27] text-white font-bold rounded-lg hover:bg-[#581c26] transition-colors shadow-sm flex items-center gap-1.5"
      >
        <CheckSquare size={15} />
        <span>Complete Packing</span>
      </button>

      <button
        type="button"
        onClick={() => onAction ? onAction("Submit Quality Review") : alert("Submitting Quality Review...")}
        className="px-3.5 py-2 bg-[#701a27] text-white font-bold rounded-lg hover:bg-[#581c26] transition-colors shadow-sm flex items-center gap-1.5"
      >
        <ShieldCheck size={15} />
        <span>Submit Quality Review</span>
      </button>

      <button
        type="button"
        onClick={() => onAction ? onAction("Place Fulfilment Hold") : alert("Placing Fulfilment Hold...")}
        className="px-3.5 py-2 bg-[#5c131d] text-white font-bold rounded-lg hover:bg-[#4a0f17] transition-colors shadow-sm flex items-center gap-1.5"
      >
        <PauseCircle size={15} />
        <span>Place Fulfilment Hold</span>
      </button>

      <button
        type="button"
        onClick={() => onAction ? onAction("Escalate Exception") : alert("Escalating Exception...")}
        className="px-3.5 py-2 bg-[#5c131d] text-white font-bold rounded-lg hover:bg-[#4a0f17] transition-colors shadow-sm flex items-center gap-1.5"
      >
        <ShieldAlert size={15} />
        <span>Escalate Exception</span>
      </button>

      <button
        type="button"
        disabled={!isDispatchReady}
        onClick={() => onAction ? onAction("Mark Ready for Dispatch") : alert("Marked Ready for Dispatch")}
        className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
          isDispatchReady
            ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm"
            : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
        }`}
      >
        <Send size={15} />
        <span>Mark Ready for Dispatch</span>
      </button>

      <button
        type="button"
        disabled={!isDispatchReady}
        onClick={() => onAction ? onAction("Create Shipment") : alert("Creating Shipment...")}
        className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
          isDispatchReady
            ? "bg-blue-700 text-white hover:bg-blue-800 shadow-sm"
            : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
        }`}
      >
        <Truck size={15} />
        <span>Create Shipment</span>
      </button>
    </div>
  );
}
