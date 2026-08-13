'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export function LowerAnalyticsGovernanceRow() {
  const auditLogs = [
    { date: 'Jul 11, 2025', action: 'Reviewed', actor: 'Jane Patel', details: 'Reviewed content & sources' },
    { date: 'Jul 9, 2025', action: 'Updated', actor: 'Jane Patel', details: 'Updated ETA language' },
    { date: 'Jun 29, 2025', action: 'Approved', actor: 'M. Thompson', details: 'Approved v3.2' },
  ];

  const versionHistory = [
    { version: '3.2 (Current)', date: 'Jul 11, 2025', author: 'Jane Patel' },
    { version: '3.1', date: 'Jun 29, 2025', author: 'Jane Patel' },
    { version: '3.0', date: 'Jun 12, 2025', author: 'Jane Patel' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.80fr)_minmax(0,1.30fr)_minmax(0,1.30fr)_minmax(0,1.50fr)_minmax(0,1.30fr)] gap-2 text-xs items-start">
      {/* 1. Performance & Usage (Last 30 Days) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Performance &amp; Usage (Last 30 Days)</h4>

          <div className="grid grid-cols-4 gap-1 text-[10px] mb-2 pb-1.5 border-b border-slate-100">
            <div>
              <span className="text-slate-400 block">Views</span>
              <span className="font-bold text-slate-900 text-xs">1,248</span>
              <span className="text-emerald-600 font-semibold block text-[8px]">+12% vs prev 30d</span>
            </div>
            <div>
              <span className="text-slate-400 block">Applies in Cases</span>
              <span className="font-bold text-slate-900 text-xs">842</span>
              <span className="text-emerald-600 font-semibold block text-[8px]">+8% vs prev 30d</span>
            </div>
            <div>
              <span className="text-slate-400 block">Helpful Rate</span>
              <span className="font-bold text-emerald-600 text-xs">94%</span>
              <span className="text-emerald-600 font-semibold block text-[8px]">+2 pts vs prev 30d</span>
            </div>
            <div>
              <span className="text-slate-400 block">Avg. Handle Time</span>
              <span className="font-bold text-slate-900 text-xs">-2.1m</span>
              <span className="text-emerald-600 font-semibold block text-[8px]">-5% vs prev 30d</span>
            </div>
          </div>

          {/* Top Channels Bars */}
          <div className="space-y-1 text-[9px]">
            <span className="font-bold text-slate-500 block">Top Channels</span>
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">Chat</span>
              <div className="flex-1 bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '50%' }} />
              </div>
              <span className="w-6 text-right font-bold text-slate-700">50%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">Email</span>
              <div className="flex-1 bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: '40%' }} />
              </div>
              <span className="w-6 text-right font-bold text-slate-700">40%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">Phone</span>
              <div className="flex-1 bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '32%' }} />
              </div>
              <span className="w-6 text-right font-bold text-slate-700">32%</span>
            </div>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View Full Analytics &gt;
          </button>
        </div>
      </div>

      {/* 2. Knowledge Governance */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Knowledge Governance</h4>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Approval Status</span>
              <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded font-bold text-[9px]">Approved</span>
            </div>
            <div className="flex justify-between"><span className="text-slate-400">Approver</span> <strong className="text-slate-800">M. Thompson</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Approved On</span> <span className="text-slate-700">Jul 11, 2025</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Version</span> <span className="font-mono font-bold text-slate-900">3.2</span></div>
            <div className="pt-1 border-t border-slate-100">
              <span className="text-slate-400 block font-medium">Change Summary</span>
              <p className="text-slate-700 leading-tight block whitespace-normal break-words">
                Updated carrier delay language and ETA examples.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View Governance History &gt;
          </button>
        </div>
      </div>

      {/* 3. Content Quality & Health */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Content Quality &amp; Health</h4>
          <div className="space-y-1 text-[10px] mb-2">
            <div className="flex justify-between"><span className="text-slate-500">Relevance</span> <strong className="text-emerald-600">98%</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Accuracy</span> <strong className="text-emerald-600">96%</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Completeness</span> <strong className="text-emerald-600">95%</strong></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Confidence</span>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={9} className="fill-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
              <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray="96, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[9px] font-extrabold text-slate-900">96</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-900 block">Knowledge Health</span>
              <span className="text-[9px] text-slate-400">96/100</span>
            </div>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            Improve This Article &gt;
          </button>
        </div>
      </div>

      {/* 4. Audit Trail (Last 90 Days) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Audit Trail (Last 90 Days)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Date</th>
                  <th className="py-1 px-1">Action</th>
                  <th className="py-1 px-1">Actor</th>
                  <th className="py-1 px-1">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {auditLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{log.date}</td>
                    <td className="py-1 px-1 font-semibold text-slate-800">{log.action}</td>
                    <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{log.actor}</td>
                    <td className="py-1 px-1 text-slate-600 whitespace-normal break-words">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View Full Audit Log &gt;
          </button>
        </div>
      </div>

      {/* 5. Article Version History */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Article Version History</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Version</th>
                  <th className="py-1 px-1">Date</th>
                  <th className="py-1 px-1">Author</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {versionHistory.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-mono font-bold text-slate-900">{v.version}</td>
                    <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{v.date}</td>
                    <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{v.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View All Versions &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
