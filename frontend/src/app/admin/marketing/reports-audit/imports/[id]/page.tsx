"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MARKETING_REPORTS_AUDIT_MOCK_DATA } from "@/data/marketingReportsAudit.mock";

import { ReportsAuditContextStrip } from "@/components/admin/marketing/reports-audit/ReportsAuditContextStrip";
import { ImportValidationCard } from "@/components/admin/marketing/reports-audit/selected/ImportValidationCard";
import { DataMappingTable } from "@/components/admin/marketing/reports-audit/selected/DataMappingTable";
import { ChangePreviewTable } from "@/components/admin/marketing/reports-audit/selected/ChangePreviewTable";
import { ImportSafetyControls } from "@/components/admin/marketing/reports-audit/selected/ImportSafetyControls";
import { ReportingOperationsRail } from "@/components/admin/marketing/reports-audit/rail/ReportingOperationsRail";
import { ArrowLeft, Upload } from "lucide-react";

export default function ImportJobDetailPage() {
  const params = useParams();
  const importId = params?.id as string;
  const [data] = useState(MARKETING_REPORTS_AUDIT_MOCK_DATA);

  const selectedReport = data.selectedReport;
  const importJob = selectedReport.importJobs.find((j) => j.importId === importId) || selectedReport.importJobs[0];

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
                  <span className="font-mono text-gray-700">{importId || "IMP-000243"}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                  <Upload className="w-5 h-5 text-rose-600" />
                  <span>Marketing Import Job — {importJob.type}</span>
                </h1>
              </div>
            </div>
          </div>

          <ReportsAuditContextStrip context={data.context} />

          <ImportValidationCard validation={selectedReport.importValidation} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <DataMappingTable mappings={selectedReport.dataMappings} />
            <ChangePreviewTable changePreviews={selectedReport.changePreview} />
            <ImportSafetyControls safetyControls={selectedReport.importSafetyControls} />
          </div>
        </main>

        <ReportingOperationsRail railData={data.rail} />
      </div>
    </div>
  );
}
