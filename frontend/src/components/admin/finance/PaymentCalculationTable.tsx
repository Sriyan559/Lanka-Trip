'use client';

import React from 'react';
import { PaymentCalculationRow } from '@/data/mockPaymentDetailData';

interface Props {
  rows: PaymentCalculationRow[];
}

export function PaymentCalculationTable({ rows }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-2">
        Payment Amount Calculation &amp; Variance Analysis
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {['Payment Item', 'Expected (LKR M)', 'Actual (LKR M)', 'Variance'].map((h) => (
                <th
                  key={h}
                  className="text-left py-2 font-bold text-gray-600 uppercase tracking-wide text-[10px] pr-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={[
                  'border-b border-gray-100 last:border-0 transition-colors',
                  row.highlight ? 'bg-red-50/40 font-extrabold' : 'hover:bg-gray-50',
                ].join(' ')}
              >
                <td className={`py-1.5 pr-4 ${row.highlight ? 'text-[#8f002b] font-extrabold' : 'text-gray-800 font-semibold'}`}>
                  {row.item}
                </td>
                <td className="py-1.5 pr-4 font-mono text-gray-700">{row.expected}</td>
                <td className="py-1.5 pr-4 font-mono text-gray-700">{row.actual}</td>
                <td className="py-1.5">
                  <span
                    className={[
                      'inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border',
                      row.variance === '0.00'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200',
                    ].join(' ')}
                  >
                    {row.variance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
