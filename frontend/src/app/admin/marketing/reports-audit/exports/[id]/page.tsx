"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MARKETING_REPORTS_AUDIT_MOCK_DATA } from "@/data/marketingReportsAudit.mock";

import { ReportsAuditContextStrip } from "@/components/admin/marketing/reports-audit/ReportsAuditContextStrip";
import { ExportPrivacyControls } from "@/components/admin/marketing/reports-audit/selected/ExportPrivacyControls";
import { ReportingOperationsRail } from "@/components/admin/marketing/reports-audit/rail/ReportingOperationsRail";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";

export default function ExportJobDetailPage() {
  const params = useParams();
  const exportId = params?.id as string;
  const [data] = useState(MARKETING_REPORTS_AUDIT_MOCK_DATA);

  const selectedReport = data.selectedReport;
  const exportJob = selectedReport.exportJobs.find((j) => j.exportId === exportId) || selectedReport.exportJobs[0];

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
                  <span className="font-mono text-gray-700">{exportId || "EXP-001236"}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span>Marketing Export Job — {exportJob.type}</span>
                </h1>
              </div>
            </div>
          </div>

          <ReportsAuditContextStrip context={data.context} />

          {/* Export Job Detail Card */}
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs space-y-3 text-xs">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2">Export Job Metadata</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Export ID</span>
                <span className="font-mono font-bold text-gray-900">{exportJob.exportId}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Domain</span>
                <span className="font-bold text-gray-800">{exportJob.domain}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Format</span>
                <span className="font-mono font-bold text-gray-800">{exportJob.format}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Status</span>
                <span className="font-bold text-emerald-700">{exportJob.status}</span>
              </div>
            </div>
          </div>

          <ExportPrivacyControls controls={selectedReport.exportPrivacyControls} />
        </main>

        <ReportingOperationsRail railData={data.rail} />
      </div>
    </div>
  );
}
