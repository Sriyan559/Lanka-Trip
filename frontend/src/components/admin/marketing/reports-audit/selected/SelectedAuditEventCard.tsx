"use client";

import React from "react";
import Link from "next/link";
import { SelectedAuditEventData } from "@/data/marketingReportsAudit.mock";

interface SelectedAuditEventCardProps {
  auditEvent: SelectedAuditEventData;
}

export function SelectedAuditEventCard({ auditEvent }: SelectedAuditEventCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>18. Selected Audit Event</span>
          <span className="font-mono text-[10px] text-gray-400">{auditEvent.eventId}</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Timestamp</span>
            <span className="font-mono text-[10px] text-gray-700">{auditEvent.timestamp}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">User</span>
            <span className="font-bold text-gray-900">{auditEvent.user}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Action</span>
            <span className="font-bold text-gray-900">{auditEvent.action}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Action Type</span>
            <span className="text-gray-700 font-semibold">{auditEvent.actionType}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Record Type</span>
            <span className="text-gray-700">{auditEvent.recordType}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Record ID</span>
            <span className="font-mono text-[10px] text-gray-700 font-bold">{auditEvent.recordId}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Business Impact</span>
            <span className="font-semibold text-amber-700">{auditEvent.businessImpact}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Outcome</span>
            <span className="font-bold text-emerald-700">{auditEvent.outcome}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href={`/admin/marketing/reports-audit/audit/${auditEvent.eventId}`}
          className="w-full py-1 text-center block text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Evidence Details
        </Link>
      </div>
    </div>
  );
}
