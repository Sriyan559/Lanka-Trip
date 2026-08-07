'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { FN10FullDetailRecord } from '@/data/mockSettlementDetailData';

interface Props {
  record: FN10FullDetailRecord;
}

export function SettlementDetailCalculationTable({ record }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* 1. Settlement Calculation Summary Table (2-col wide) */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
          Settlement Calculation Summary
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-700 uppercase tracking-wider">
                <th className="p-1.5 text-center w-6">#</th>
                <th className="p-1.5">Description</th>
                <th className="p-1.5">Treatment</th>
                <th className="p-1.5">Source Record</th>
                <th className="p-1.5 text-right">Expected (LKR)</th>
                <th className="p-1.5 text-right">Actual (LKR)</th>
                <th className="p-1.5 text-right">Approved (LKR)</th>
                <th className="p-1.5 text-right">Variance (LKR)</th>
                <th className="p-1.5 text-center">Included in Total Deductions</th>
                <th className="p-1.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {record.calculationLines.map((line) => (
                <tr key={line.lineNo} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-1.5 text-center font-mono text-gray-400">{line.lineNo}</td>
                  <td className="p-1.5 font-medium text-gray-800">{line.description}</td>
                  <td className="p-1.5 font-semibold text-gray-600">{line.treatment}</td>
                  <td className="p-1.5 font-mono text-blue-600 font-semibold">{line.sourceRecord}</td>
                  <td className="p-1.5 text-right font-mono text-gray-700">
                    {line.expectedAmount < 0 ? `(${Math.abs(line.expectedAmount).toLocaleString()})` : line.expectedAmount.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono text-gray-700">
                    {line.actualAmount < 0 ? `(${Math.abs(line.actualAmount).toLocaleString()})` : line.actualAmount.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono font-bold text-gray-900">
                    {line.approvedAmount < 0 ? `(${Math.abs(line.approvedAmount).toLocaleString()})` : line.approvedAmount.toLocaleString()}
                  </td>
                  <td className="p-1.5 text-right font-mono text-gray-500">{line.variance}</td>
                  <td className="p-1.5 text-center font-semibold text-gray-600">{line.includedInDeductions ? 'Yes' : 'No'}</td>
                  <td className="p-1.5 text-center">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {line.status}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Highlighted Net Settlement row */}
              <tr className="bg-rose-50/60 font-bold border-t-2 border-rose-200">
                <td className="p-2" colSpan={4}>Net Settlement</td>
                <td className="p-2 text-right font-mono text-[#8f002b]">2,286,000</td>
                <td className="p-2 text-right font-mono text-[#8f002b]">2,286,000</td>
                <td className="p-2 text-right font-mono text-[#8f002b] text-xs font-black">2,286,000</td>
                <td className="p-2 text-right font-mono text-gray-700">0</td>
                <td className="p-2"></td>
                <td className="p-2 text-center">
                  <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                    Validated
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[9px] text-gray-500 font-mono italic mt-1">
          Formula: Gross − Total Deductions − Withholding Tax − Reserve + Credits &amp; Adjustments = Net Settlement (Net Settlement: LKR 2,286,000)
        </p>
      </div>

      {/* 2. Right Column: Reconciliation + Provider Events */}
      <div className="flex flex-col gap-3">
        {/* Reconciliation Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
            Reconciliation Summary
          </p>
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-700 uppercase">
                <th className="p-1">Type</th>
                <th className="p-1 text-center">Status</th>
                <th className="p-1 text-right">Match Rate</th>
                <th className="p-1 text-right">Variance</th>
                <th className="p-1">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {record.reconciliationRows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-1 font-medium text-gray-800">{r.type}</td>
                  <td className="p-1 text-center">
                    <span className={`px-1 rounded text-[8px] font-bold ${
                      r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-1 text-right font-mono font-bold">{r.matchRate}</td>
                  <td className="p-1 text-right font-mono">{r.variance}</td>
                  <td className="p-1 text-gray-500 text-[9px] truncate max-w-[80px]">{r.notes}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200 font-bold bg-gray-50">
                <td className="p-1 text-red-600">Total Variance</td>
                <td colSpan={2}></td>
                <td className="p-1 text-right font-mono text-red-600">0</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Provider Events (Empty state) */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 flex-1 min-h-[140px] justify-between">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
            Provider Events (This Settlement)
          </p>

          <div className="flex flex-col items-center justify-center my-auto py-4 text-center text-gray-400">
            <FileText size={24} className="mb-1 text-gray-300" />
            <p className="text-xs font-semibold text-gray-600">No provider events yet.</p>
            <p className="text-[10px] text-gray-400">Events will appear once payout is submitted.</p>
          </div>

          <div className="text-right border-t border-gray-100 pt-1">
            <button className="text-[10px] text-blue-600 font-semibold hover:underline">View Audit Trail</button>
          </div>
        </div>
      </div>
    </div>
  );
}
