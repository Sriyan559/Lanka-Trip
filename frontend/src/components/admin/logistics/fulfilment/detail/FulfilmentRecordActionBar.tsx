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
    <div className="bg-white rounded-xl border border-line p-2 sm:p-2.5 shadow-xs flex flex-wrap items-center gap-2 text-[10px]">
      <button
        type="button"
        onClick={() => onAction ? onAction("Complete Packing") : alert("Executing Complete Packing...")}
        className="px-2.5 py-1 bg-primary-900 text-white font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1.5"
      >
        <CheckSquare size={13} />
        <span>Complete Packing</span>
      </button>

      <button
        type="button"
        onClick={() => onAction ? onAction("Submit Quality Review") : alert("Submitting Quality Review...")}
        className="px-2.5 py-1 bg-primary-900 text-white font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1.5"
      >
        <ShieldCheck size={13} />
        <span>Submit Quality Review</span>
      </button>

      <button
        type="button"
        onClick={() => onAction ? onAction("Place Fulfilment Hold") : alert("Placing Fulfilment Hold...")}
        className="px-2.5 py-1 bg-primary-900 text-white font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1.5"
      >
        <PauseCircle size={13} />
        <span>Place Fulfilment Hold</span>
      </button>

      <button
        type="button"
        onClick={() => onAction ? onAction("Escalate Exception") : alert("Escalating Exception...")}
        className="px-2.5 py-1 bg-primary-900 text-white font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1.5"
      >
        <ShieldAlert size={13} />
        <span>Escalate Exception</span>
      </button>

      <button
        type="button"
        disabled={!isDispatchReady}
        onClick={() => onAction ? onAction("Mark Ready for Dispatch") : alert("Marked Ready for Dispatch")}
        className={`px-2.5 py-1 font-bold rounded-md transition-colors flex items-center gap-1.5 ${
          isDispatchReady
            ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs"
            : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
        }`}
      >
        <Send size={13} />
        <span>Mark Ready for Dispatch</span>
      </button>

      <button
        type="button"
        disabled={!isDispatchReady}
        onClick={() => onAction ? onAction("Create Shipment") : alert("Creating Shipment...")}
        className={`px-2.5 py-1 font-bold rounded-md transition-colors flex items-center gap-1.5 ${
          isDispatchReady
            ? "bg-blue-700 text-white hover:bg-blue-800 shadow-xs"
            : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
        }`}
      >
        <Truck size={13} />
        <span>Create Shipment</span>
      </button>
    </div>
  );
}
