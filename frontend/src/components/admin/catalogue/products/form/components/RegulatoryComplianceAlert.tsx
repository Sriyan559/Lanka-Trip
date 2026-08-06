"use client";

import React from "react";
import { AlertTriangle, Upload } from "lucide-react";

interface RegulatoryComplianceAlertProps {
  message?: string;
  onUploadEvidence: () => void;
}

export const RegulatoryComplianceAlert: React.FC<RegulatoryComplianceAlertProps> = ({
  message = "Safety evidence is required for 15% Vitamin C concentration. Upload clinical safety assessment certificates to proceed.",
  onUploadEvidence,
}) => {
  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs text-xs mb-5 animate-in fade-in duration-150">
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle size={16} />
        </div>
        <div>
          <h4 className="font-bold text-rose-900 text-xs">Regulatory Compliance Block</h4>
          <p className="text-[11.5px] text-rose-800 font-medium mt-0.5">{message}</p>
        </div>
      </div>

      <button
        onClick={onUploadEvidence}
        className="h-8 px-3 rounded bg-white border border-rose-300 text-[11.5px] font-bold text-rose-800 hover:bg-rose-100/70 flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
      >
        <Upload size={13} />
        <span>Upload Safety Evidence</span>
      </button>
    </div>
  );
};
