"use client";

import React from "react";
import { ExportPrivacyControlsData } from "@/data/marketingReportsAudit.mock";

interface ExportPrivacyControlsProps {
  controls: ExportPrivacyControlsData;
}

export function ExportPrivacyControls({ controls }: ExportPrivacyControlsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          9. Export Privacy & Delivery Controls
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Privacy Class</span>
            <span className="font-bold text-gray-900">{controls.privacyClass}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Encryption</span>
            <span className="font-mono text-gray-700">{controls.encryption}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Delivery</span>
            <span className="font-semibold text-gray-800">{controls.delivery}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Download Limit</span>
            <span className="font-semibold text-gray-800">{controls.downloadLimit}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Audit Logging</span>
            <span className="font-bold text-emerald-700">{controls.auditLogging}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Temporary Storage</span>
            <span className="font-mono text-gray-700">{controls.temporaryStorage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
