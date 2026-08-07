'use client';

import React from 'react';
import { MOCK_STATUS_SUMMARY } from '@/data/mockFinanceData';

export function FinancialStatusSummaryPanel() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between h-full">
      <div className="pb-2 border-b border-gray-100 mb-1 flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-900">Financial Status Summary</h3>
      </div>

      <div className="overflow-x-auto my-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-1.5 font-bold">Status</th>
              <th className="pb-1.5 text-right font-bold">Count</th>
              <th className="pb-1.5 text-right font-bold">Amount (LKR)</th>
              <th className="pb-1.5 text-right font-bold w-24">Distribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_STATUS_SUMMARY.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50">
                <td className="py-1.5 font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                  <span>{row.status}</span>
                </td>
                <td className="py-1.5 text-right font-semibold text-gray-700">{(row.count ?? 0).toLocaleString()}</td>
                <td className="py-1.5 text-right font-bold text-gray-900">{row.amount}</td>
                <td className="py-1.5 text-right">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden inline-flex">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.percentage}%`, backgroundColor: row.color }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
