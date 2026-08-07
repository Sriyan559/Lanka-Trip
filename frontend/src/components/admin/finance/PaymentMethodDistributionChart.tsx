'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_PAYMENT_METHODS } from '@/data/mockFinanceData';

export function PaymentMethodDistributionChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col justify-between h-full">
      <div className="pb-2 border-b border-gray-100 mb-1">
        <h3 className="text-xs font-bold text-gray-900">Payment Method Distribution</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 my-auto">
        {/* Donut Chart with Center Label */}
        <div className="relative w-36 h-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_PAYMENT_METHODS}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={56}
                paddingAngle={2}
                dataKey="value"
              >
                {MOCK_PAYMENT_METHODS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => [`LKR ${val}M`, 'Amount']}
                contentStyle={{ fontSize: '11px', borderRadius: '6px' }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] text-gray-500 font-medium uppercase leading-tight">LKR</span>
            <span className="text-sm font-black text-gray-900 leading-tight">428.1M</span>
            <span className="text-[9px] text-gray-500 font-semibold leading-tight mt-0.5">Payments</span>
          </div>
        </div>

        {/* Legend Table */}
        <div className="flex-1 w-full text-xs">
          <table className="w-full text-left border-collapse">
            <tbody>
              {MOCK_PAYMENT_METHODS.map((item) => (
                <tr key={item.name} className="border-b border-gray-50 last:border-0">
                  <td className="py-1 flex items-center gap-1.5 font-medium text-gray-700">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </td>
                  <td className="py-1 text-right font-bold text-gray-900">{item.pct}%</td>
                  <td className="py-1 text-right font-semibold text-gray-500">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
