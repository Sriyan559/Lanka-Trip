"use client";

import React from "react";
import { ReportRecipient } from "@/data/marketingReportsAudit.mock";
import { CheckCircle2 } from "lucide-react";

interface ReportDeliveryCardProps {
  recipients: ReportRecipient[];
}

export function ReportDeliveryCard({ recipients }: ReportDeliveryCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>5. Delivery</span>
          <span className="text-[10px] text-gray-400 font-normal">Recipients ({recipients.length})</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {recipients.map((rec) => (
            <div key={rec.id} className="flex justify-between items-center text-[11px] pb-1 border-b border-gray-50 last:border-0">
              <div>
                <span className="font-semibold text-gray-800 block">{rec.name}</span>
                <span className="text-[10px] text-gray-400 font-medium">{rec.roleDomain}</span>
              </div>
              <span className="flex items-center gap-1 font-bold text-emerald-700 text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                {rec.deliveryStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
