"use client";

import React from "react";
import { LogisticsExceptionRecord } from "@/types/logistics/exceptionsReconciliation";
import { StatusBadge } from "../shared/StatusBadge";

interface ExceptionPortfolioTableProps {
  records: LogisticsExceptionRecord[];
  selectedRecordId: string;
  onSelectRecord: (record: LogisticsExceptionRecord) => void;
}

export function ExceptionPortfolioTable({
  records,
  selectedRecordId,
  onSelectRecord,
}: ExceptionPortfolioTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Logistics Exceptions, Claims, Cost &amp; Reconciliation Portfolio ({records.length})
        </h3>
        <span className="text-[10.5px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono">
          Showing 1 - {records.length} of {records.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200 text-[10px]">
            <tr>
              <th className="p-1.5">Reference ID</th>
              <th className="p-1.5">Record Type</th>
              <th className="p-1.5">Exception Type</th>
              <th className="p-1.5">Severity</th>
              <th className="p-1.5">Claim Ref</th>
              <th className="p-1.5">Claim Type</th>
              <th className="p-1.5">Order / Fulfilment</th>
              <th className="p-1.5">Carrier</th>
              <th className="p-1.5">Warehouse</th>
              <th className="p-1.5">Supplier / Seller</th>
              <th className="p-1.5">Customer</th>
              <th className="p-1.5">Cost Type</th>
              <th className="p-1.5 text-right">Expected</th>
              <th className="p-1.5 text-right">Actual</th>
              <th className="p-1.5 text-right">Variance</th>
              <th className="p-1.5 text-right">Claim Value</th>
              <th className="p-1.5 text-right">Recovery Exp.</th>
              <th className="p-1.5 text-right">Recovered</th>
              <th className="p-1.5">Liability</th>
              <th className="p-1.5">Match State</th>
              <th className="p-1.5">Reconciliation</th>
              <th className="p-1.5">Evidence</th>
              <th className="p-1.5">Investigation</th>
              <th className="p-1.5">Approval</th>
              <th className="p-1.5">Recovery</th>
              <th className="p-1.5">Hold</th>
              <th className="p-1.5">SLA</th>
              <th className="p-1.5">Owner</th>
              <th className="p-1.5">Created Date</th>
              <th className="p-1.5">Updated Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((rec) => {
              const isSelected = rec.id === selectedRecordId || rec.referenceId === selectedRecordId;
              return (
                <tr
                  key={rec.id}
                  onClick={() => onSelectRecord(rec)}
                  className={`hover:bg-rose-50/50 cursor-pointer transition-colors ${
                    isSelected ? "bg-rose-50/80 font-medium" : ""
                  }`}
                >
                  <td className="p-1.5 font-mono font-bold text-rose-700">{rec.referenceId}</td>
                  <td className="p-1.5 font-semibold text-gray-800">{rec.recordType}</td>
                  <td className="p-1.5 font-bold text-gray-900">{rec.exceptionType}</td>
                  <td className="p-1.5">
                    <StatusBadge
                      status={rec.severity}
                      variant={rec.severity === "Critical" ? "error" : rec.severity === "High" ? "warning" : "default"}
                      size="sm"
                    />
                  </td>
                  <td className="p-1.5 font-mono text-gray-800">{rec.claimRef}</td>
                  <td className="p-1.5 text-gray-800">{rec.claimType}</td>
                  <td className="p-1.5 font-mono text-gray-800">{rec.orderRef}</td>
                  <td className="p-1.5 font-bold text-gray-900">{rec.carrier}</td>
                  <td className="p-1.5 text-gray-800">{rec.warehouse}</td>
                  <td className="p-1.5 text-gray-900">{rec.supplierName}</td>
                  <td className="p-1.5 font-bold text-gray-900">{rec.customerName}</td>
                  <td className="p-1.5 text-gray-800">{rec.costType}</td>
                  <td className="p-1.5 text-right font-mono">LKR {rec.expectedAmount.toLocaleString()}</td>
                  <td className="p-1.5 text-right font-mono">LKR {rec.actualAmount.toLocaleString()}</td>
                  <td className="p-1.5 text-right font-mono font-bold text-rose-700">
                    LKR {rec.varianceAmount.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono font-bold">LKR {rec.claimValue.toLocaleString()}</td>
                  <td className="p-1.5 text-right font-mono">LKR {rec.recoveryExpected.toLocaleString()}</td>
                  <td className="p-1.5 text-right font-mono text-emerald-700 font-bold">
                    LKR {rec.recoveryRecovered.toLocaleString()}
                  </td>
                  <td className="p-1.5 font-semibold text-gray-800">{rec.liabilityParty}</td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.matchStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.reconciliationStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.evidenceStatus} variant="success" size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.investigationStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.approvalStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.recoveryStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.holdStatus} size="sm" />
                  </td>
                  <td className="p-1.5">
                    <StatusBadge status={rec.slaStatus} size="sm" />
                  </td>
                  <td className="p-1.5 font-bold text-gray-900">{rec.owner}</td>
                  <td className="p-1.5 text-gray-600">{rec.createdDate}</td>
                  <td className="p-1.5 text-gray-600">{rec.updatedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
