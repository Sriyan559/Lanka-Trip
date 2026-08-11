"use client";

import React from "react";
import { LogisticsOperationRecord } from "@/types/logistics/reportsImportExportAudit";
import { StatusBadge } from "../shared/StatusBadge";

interface ReportPortfolioTableProps {
  records: LogisticsOperationRecord[];
  selectedRecordId: string;
  onSelectRecord: (record: LogisticsOperationRecord) => void;
}

export function ReportPortfolioTable({
  records,
  selectedRecordId,
  onSelectRecord,
}: ReportPortfolioTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Logistics Reports, Import, Export &amp; Audit Portfolio ({records.length})
        </h3>
        <span className="text-[10.5px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono">
          Showing 1 - {records.length} of {records.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200 text-[10px]">
            <tr>
              <th className="p-1.5">Operation Reference</th>
              <th className="p-1.5">Operation Type</th>
              <th className="p-1.5">Logistics Domain</th>
              <th className="p-1.5">Report / Template / File</th>
              <th className="p-1.5">Source System</th>
              <th className="p-1.5">Destination</th>
              <th className="p-1.5">Business Unit</th>
              <th className="p-1.5">Sales Channel</th>
              <th className="p-1.5">Region</th>
              <th className="p-1.5">Operational Period</th>
              <th className="p-1.5">File Type</th>
              <th className="p-1.5">File Size</th>
              <th className="p-1.5 text-right">Total Records</th>
              <th className="p-1.5 text-right">Processed</th>
              <th className="p-1.5 text-right">Successful</th>
              <th className="p-1.5 text-right">Rejected</th>
              <th className="p-1.5 text-right">Duplicates</th>
              <th className="p-1.5 text-right">Quarantined</th>
              <th className="p-1.5">Validation</th>
              <th className="p-1.5">Approval</th>
              <th className="p-1.5">Processing</th>
              <th className="p-1.5">Delivery</th>
              <th className="p-1.5">Reconciliation</th>
              <th className="p-1.5">Export Channel</th>
              <th className="p-1.5">Encryption</th>
              <th className="p-1.5">Retention</th>
              <th className="p-1.5">Legal Hold</th>
              <th className="p-1.5">Job Owner</th>
              <th className="p-1.5">Reviewer</th>
              <th className="p-1.5">Approver</th>
              <th className="p-1.5">Created At</th>
              <th className="p-1.5">Completed At</th>
              <th className="p-1.5">Updated At</th>
              <th className="p-1.5">SLA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((rec) => {
              const isSelected = rec.id === selectedRecordId || rec.operationRef === selectedRecordId;
              return (
                <tr
                  key={rec.id}
                  onClick={() => onSelectRecord(rec)}
                  className={`hover:bg-rose-50/50 cursor-pointer transition-colors ${
                    isSelected ? "bg-rose-50/80 font-medium" : ""
                  }`}
                >
                  <td className="p-1.5 font-mono font-bold text-rose-700">{rec.operationRef}</td>
                  <td className="p-1.5 font-semibold text-gray-800">{rec.operationType}</td>
                  <td className="p-1.5 font-bold text-gray-900">{rec.logisticsDomain}</td>
                  <td className="p-1.5 font-mono text-gray-900">{rec.reportOrTemplateName}</td>
                  <td className="p-1.5 text-gray-800">{rec.sourceSystem}</td>
                  <td className="p-1.5 text-gray-800">{rec.destination}</td>
                  <td className="p-1.5 text-gray-700">{rec.businessUnit}</td>
                  <td className="p-1.5 text-gray-700">{rec.salesChannel}</td>
                  <td className="p-1.5 text-gray-700">{rec.region}</td>
                  <td className="p-1.5 text-gray-700">{rec.operationalPeriod}</td>
                  <td className="p-1.5 font-mono font-semibold">{rec.fileType}</td>
                  <td className="p-1.5 font-mono text-gray-700">{rec.fileSize}</td>
                  <td className="p-1.5 text-right font-mono font-bold">{rec.totalRecords.toLocaleString()}</td>
                  <td className="p-1.5 text-right font-mono">{rec.processedRecords.toLocaleString()}</td>
                  <td className="p-1.5 text-right font-mono text-emerald-700 font-bold">
                    {rec.successfulRecords.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono text-rose-700 font-bold">
                    {rec.rejectedRecords.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono text-amber-700">
                    {rec.duplicateRecords.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono text-rose-600 font-bold">
                    {rec.quarantinedRecords}
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.validationStatus} variant="success" size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.approvalStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.processingStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.deliveryStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.reconciliationStatus} size="sm" />
                  </td>
                  <td className="p-1.5 font-medium text-gray-800">{rec.exportChannel}</td>
                  <td className="p-1.5 font-mono text-gray-700">{rec.encryption}</td>
                  <td className="p-1.5 text-gray-700">{rec.retention}</td>
                  <td className="p-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        rec.legalHold === "Yes"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {rec.legalHold}
                    </span>
                  </td>
                  <td className="p-1.5 font-bold text-gray-900">{rec.jobOwner}</td>
                  <td className="p-1.5 text-gray-800">{rec.reviewer}</td>
                  <td className="p-1.5 text-gray-800">{rec.approver}</td>
                  <td className="p-1.5 text-gray-600">{rec.createdAt}</td>
                  <td className="p-1.5 text-gray-600">{rec.completedAt}</td>
                  <td className="p-1.5 text-gray-600">{rec.updatedAt}</td>
                  <td className="p-1.5 font-semibold text-emerald-700">{rec.sla}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
