'use client';

import React from 'react';
import { LowCsatCaseItem } from '@/types/satisfactionQa';

interface SatisfactionDriversRowProps {
  lowCsatCases: LowCsatCaseItem[];
  onOpenCase?: (caseId: string) => void;
}

export function SatisfactionDriversRow({ lowCsatCases, onOpenCase }: SatisfactionDriversRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.20fr)_minmax(0,1.40fr)_minmax(0,1.80fr)_minmax(0,1.20fr)_minmax(0,1.20fr)] gap-2 text-xs items-start">
      {/* Section H: Customer Satisfaction Analysis */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">H. Customer Satisfaction Analysis</h4>
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded border border-slate-100 mb-2">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-emerald-500" strokeWidth="5" strokeDasharray="81, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500" strokeWidth="5" strokeDasharray="12, 100" strokeDashoffset="-81" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-rose-500" strokeWidth="5" strokeDasharray="7, 100" strokeDashoffset="-93" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </div>
            <div className="space-y-1 text-[9px]">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Positive <strong className="text-slate-900 ml-auto">81% (310)</strong></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Neutral <strong className="text-slate-900 ml-auto">12% (46)</strong></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Negative <strong className="text-slate-900 ml-auto">7% (28)</strong></div>
            </div>
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-slate-500 font-medium">Response Rate</span>
          <span className="font-bold text-slate-900">34% <span className="text-slate-400 font-normal">(384 Total)</span></span>
        </div>
      </div>

      {/* Section I: CSAT Driver Analysis */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">I. CSAT Driver Analysis</h4>
          <div className="grid grid-cols-2 gap-2 text-[9px]">
            <div>
              <span className="font-bold text-emerald-700 block mb-1">Top Positive Drivers</span>
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-slate-600">Agent Empathy</span><strong className="text-emerald-600">89%</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Issue Resolution</span><strong className="text-emerald-600">86%</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Clear Communication</span><strong className="text-emerald-600">82%</strong></div>
              </div>
            </div>

            <div>
              <span className="font-bold text-rose-700 block mb-1">Top Negative Drivers</span>
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-slate-600">Wait Time</span><strong className="text-rose-600">38%</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Policy Clarity</span><strong className="text-rose-600">29%</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Follow Up</span><strong className="text-rose-600">21%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section J: Low-CSAT Case Queue */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">J. Low-CSAT Case Queue</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Case</th>
                  <th className="py-1 px-1">Customer</th>
                  <th className="py-1 px-1">Team</th>
                  <th className="py-1 px-1">Issue</th>
                  <th className="py-1 px-1 text-center">CSAT</th>
                  <th className="py-1 px-1 text-center">Repeat</th>
                  <th className="py-1 px-1">Recovery</th>
                  <th className="py-1 px-1">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {lowCsatCases.map((lc, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td
                      onClick={() => onOpenCase && onOpenCase(lc.caseId)}
                      className="py-1 px-1 font-mono font-bold text-blue-600 hover:underline cursor-pointer whitespace-nowrap"
                    >
                      {lc.caseId}
                    </td>
                    <td className="py-1 px-1 text-slate-800 whitespace-nowrap">{lc.customerName}</td>
                    <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{lc.teamName}</td>
                    <td className="py-1 px-1 text-slate-700 whitespace-normal break-words">{lc.issue}</td>
                    <td className="py-1 px-1 text-center font-bold text-rose-600">{lc.csat}/5</td>
                    <td className="py-1 px-1 text-center font-semibold text-slate-600">{lc.repeatContact ? 'Yes' : 'No'}</td>
                    <td className="py-1 px-1">
                      <span className={`px-1 py-0.1 rounded font-bold text-[8px] ${lc.recoveryProgress === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                        {lc.recoveryProgress}
                      </span>
                    </td>
                    <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{lc.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100">
          <button type="button" className="text-[9px] text-blue-600 font-semibold hover:underline">
            View all 38 low-CSAT cases &gt;
          </button>
        </div>
      </div>

      {/* Section K: Customer Effort (CES) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">K. Customer Effort (CES)</h4>
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded border border-slate-100 mb-2">
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-emerald-500" strokeWidth="5" strokeDasharray="52, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500" strokeWidth="5" strokeDasharray="16, 100" strokeDashoffset="-52" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-rose-500" strokeWidth="5" strokeDasharray="32, 100" strokeDashoffset="-68" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-medium">CES Score</span>
              <strong className="text-slate-900 text-xs font-extrabold">4.3 <span className="text-[9px] font-normal text-slate-500">/ 5</span></strong>
              <span className="text-[8px] text-emerald-600 font-bold block">▲ 0.1 in 30 days</span>
            </div>
          </div>

          <div className="space-y-0.5 text-[8px]">
            <span className="font-bold text-slate-600 block">Top Pain Points</span>
            <div className="flex justify-between"><span>Policy Complexity</span><strong className="text-slate-900">41%</strong></div>
            <div className="flex justify-between"><span>Multiple Steps</span><strong className="text-slate-900">31%</strong></div>
            <div className="flex justify-between"><span>Long Wait</span><strong className="text-slate-900">27%</strong></div>
          </div>
        </div>
      </div>

      {/* Section L: FCR & Repeat Contact */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">L. FCR &amp; Repeat Contact</h4>
          <div className="grid grid-cols-2 gap-1 text-[9px] mb-2 bg-slate-50 p-1.5 rounded border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">FCR Score</span>
              <strong className="text-slate-900 text-xs font-extrabold">81%</strong>
              <span className="text-[8px] text-emerald-600 font-bold block">▲ 2.3%</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Repeat Contact</span>
              <strong className="text-slate-900 text-xs font-extrabold">7%</strong>
              <span className="text-[8px] text-rose-600 font-bold block">▲ 0.8%</span>
            </div>
          </div>

          <div className="space-y-0.5 text-[8px]">
            <span className="font-bold text-slate-600 block">Top Repeat Drivers</span>
            <div className="flex justify-between"><span>Unresolved Resolution</span><strong className="text-slate-900">42%</strong></div>
            <div className="flex justify-between"><span>Policy Not Followed</span><strong className="text-slate-900">28%</strong></div>
            <div className="flex justify-between"><span>Follow-up Needed</span><strong className="text-slate-900">23%</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
