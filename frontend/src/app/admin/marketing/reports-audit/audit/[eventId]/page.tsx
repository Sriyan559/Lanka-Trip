"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MARKETING_REPORTS_AUDIT_MOCK_DATA } from "@/data/marketingReportsAudit.mock";

import { ReportsAuditContextStrip } from "@/components/admin/marketing/reports-audit/ReportsAuditContextStrip";
import { SelectedAuditEventCard } from "@/components/admin/marketing/reports-audit/selected/SelectedAuditEventCard";
import { AccessDownloadEvidence } from "@/components/admin/marketing/reports-audit/selected/AccessDownloadEvidence";
import { ReportingOperationsRail } from "@/components/admin/marketing/reports-audit/rail/ReportingOperationsRail";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AuditEventEvidencePage() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [data] = useState(MARKETING_REPORTS_AUDIT_MOCK_DATA);

  const selectedReport = data.selectedReport;

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/marketing/reports-audit"
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Link href="/admin/marketing/reports-audit" className="hover:text-[#800020]">
                    Reports & Audit
                  </Link>
                  <span>/</span>
                  <span className="font-mono text-gray-700">{eventId || "EV-000101"}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span>Audit Event & Download Evidence — {eventId || "EV-000101"}</span>
                </h1>
              </div>
            </div>
          </div>

          <ReportsAuditContextStrip context={data.context} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SelectedAuditEventCard auditEvent={selectedReport.selectedAuditEvent} />
            <AccessDownloadEvidence evidenceList={selectedReport.downloadEvidence} />
          </div>
        </main>

        <ReportingOperationsRail railData={data.rail} />
      </div>
    </div>
  );
}
