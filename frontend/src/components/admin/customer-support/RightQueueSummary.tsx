'use client';

import React from 'react';

export function RightQueueSummary() {
  const queues = [
    { name: 'All Open Cases', open: '1,286', inProgress: '312', waiting: '238', escalated: '17' },
    { name: 'New Cases Today', open: '84', inProgress: '84', waiting: '0', escalated: '0' },
    { name: 'My Team Queue', open: '312', inProgress: '210', waiting: '82', escalated: '8' },
    { name: 'Escalated Queue', open: '17', inProgress: '15', waiting: '1', escalated: '17' },
    { name: 'Unassigned Queue', open: '46', inProgress: '0', waiting: '46', escalated: '8' },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          Queue Summary
        </h3>
        <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left">
          <thead>
            <tr className="text-slate-400 border-b border-line pb-1 text-[10px]">
              <th className="font-semibold pb-1">Queue Name</th>
              <th className="font-semibold text-right pb-1">Open Cases</th>
              <th className="font-semibold text-right pb-1">In Progress</th>
              <th className="font-semibold text-right pb-1">Waiting</th>
              <th className="font-semibold text-right pb-1">Escalated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {queues.map((q) => (
              <tr key={q.name}>
                <td className="py-1 font-medium text-ink whitespace-nowrap">{q.name}</td>
                <td className="text-right font-bold text-ink">{q.open}</td>
                <td className="text-right">{q.inProgress}</td>
                <td className="text-right">{q.waiting}</td>
                <td className="text-right text-red-600 font-bold">{q.escalated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
