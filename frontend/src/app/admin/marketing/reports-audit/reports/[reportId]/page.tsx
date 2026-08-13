"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getMarketingReportDetail, getMarketingReports } from "@/services/marketingReportsService";

import { ReportsAuditContextStrip } from "@/components/admin/marketing/reports-audit/ReportsAuditContextStrip";
import { SelectedReportWorkspace } from "@/components/admin/marketing/reports-audit/selected/SelectedReportWorkspace";
import { ReportingOperationsRail } from "@/components/admin/marketing/reports-audit/rail/ReportingOperationsRail";
import { ArrowLeft, FileText, Download } from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params?.reportId as string;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;
    let active = true;
    Promise.all([getMarketingReports({ per_page: 1 }), getMarketingReportDetail(reportId)])
      .then(([overview, selectedReport]) => {
        if (active) setData({ ...overview, selectedReport });
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "Unable to load marketing report.");
      });
    return () => { active = false; };
  }, [reportId]);

  if (!data) {
    return <div className="min-h-screen bg-[#faf8f8] p-4 text-sm text-gray-600">{error ?? "Loading marketing report…"}</div>;
  }

  const selectedReport = data.selectedReport;

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* Top Detail Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/marketing/reports-audit"
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                title="Back to Reports & Audit"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Link href="/admin/marketing/reports-audit" className="hover:text-[#800020]">
                    Reports & Audit
                  </Link>
                  <span>/</span>
                  <span className="font-mono text-gray-700">{reportId || selectedReport.reportId}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                  <FileText className="w-5 h-5 text-[#800020]" />
                  <span>{selectedReport.reportName}</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled
                title="Report generation is not configured for this definition"
                className="px-3 py-1.5 text-xs font-bold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020] rounded-lg transition-colors cursor-pointer"
              >
                Re-generate Report
              </button>
              <button
                disabled
                title="No generated report artifact is available"
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report Artifact</span>
              </button>
            </div>
          </div>

          {/* CONTEXT STRIP */}
          <ReportsAuditContextStrip context={data.context} />

          {/* SELECTED REPORT WORKSPACE */}
          <SelectedReportWorkspace report={selectedReport} />
        </main>

        {/* RIGHT OPERATIONAL RAIL */}
        <ReportingOperationsRail railData={data.rail} />
      </div>
    </div>
  );
}
