'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PolicyExceptionItem, ConflictItem } from '@/types/slaRouting';

interface DetailRow3Props {
  exceptions: PolicyExceptionItem[];
  conflicts: ConflictItem[];
}

export function DetailRow3({ exceptions, conflicts }: DetailRow3Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.00fr)_minmax(0,1.40fr)_minmax(0,1.15fr)_minmax(0,1.25fr)_minmax(0,1.45fr)_minmax(0,1.60fr)] gap-2 text-xs items-start">
      {/* 11. Service Policy Matrix */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">11. Service Policy Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Policy</th>
                  <th className="py-1 px-1 text-center">High Priority</th>
                  <th className="py-1 px-1 text-center">Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-normal">Complete Handling</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-normal">Customer Updates</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-normal">VIP Express</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-1 px-1 text-center text-slate-300">—</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-normal">Supplier Escalation</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-1 px-1 text-center text-slate-300">—</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-normal">Refund Compliance</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-normal">Case Closure</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-bold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 12. Policy Exceptions */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">12. Policy Exceptions</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1 whitespace-nowrap">Exception ID</th>
                  <th className="py-1 px-1">Reason</th>
                  <th className="py-1 px-1 whitespace-nowrap">Approved By</th>
                  <th className="py-1 px-1">From</th>
                  <th className="py-1 px-1">To</th>
                  <th className="py-1 px-1">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {exceptions.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-mono font-bold text-slate-900 whitespace-nowrap">{ex.id}</td>
                    <td className="py-1 px-1 text-slate-700 whitespace-nowrap">{ex.reason}</td>
                    <td className="py-1 px-1 text-slate-600 whitespace-nowrap">{ex.approvedBy}</td>
                    <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{ex.from}</td>
                    <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{ex.to}</td>
                    <td className="py-1 px-1 whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.2 rounded font-semibold text-[9px] ${
                          ex.status === 'Approved'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {ex.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 13. Conflict Detection */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">13. Conflict Detection</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Conflict</th>
                  <th className="py-1 px-1">Severity</th>
                  <th className="py-1 px-1">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {conflicts.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-medium text-slate-800 leading-tight whitespace-normal break-words">{c.conflict}</td>
                    <td className="py-1 px-1">
                      <span
                        className={`px-1 py-0.2 rounded font-bold text-[9px] ${
                          c.severity === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-1 px-1 text-blue-600 font-medium hover:underline cursor-pointer whitespace-nowrap">
                      {c.resolution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 14. Coverage Analysis */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">14. Coverage Analysis</h4>
          <div className="space-y-1 text-[10px]">
            <div>
              <div className="flex justify-between text-slate-600 mb-0.5">
                <span>Core Categories</span>
                <span className="font-bold text-slate-900">98% <span className="text-slate-400 font-normal">(2 unmapped)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5">
                <span>Priorities</span>
                <span className="font-bold text-slate-900">98% <span className="text-slate-400 font-normal">(2)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5">
                <span>Channels</span>
                <span className="font-bold text-slate-900">95% <span className="text-slate-400 font-normal">(3)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5">
                <span>Specialist Escalations</span>
                <span className="font-bold text-slate-900">90% <span className="text-slate-400 font-normal">(2)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5">
                <span>Unmapped Scenarios</span>
                <span className="font-bold text-slate-900">90% <span className="text-slate-400 font-normal">(5)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 15. Routing Simulation (FIXED: CLEAR TWO-COLUMN LABEL/VALUE LAYOUT MATCHING IMAGE 3) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">15. Routing Simulation</h4>
          <div className="space-y-1 text-[10px]">
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-1">
              <span className="text-slate-500">SLA Policy:</span>
              <strong className="text-slate-900 font-semibold whitespace-normal break-words">High Priority Delivery</strong>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-1">
              <span className="text-slate-500">Queue:</span>
              <strong className="text-slate-900 font-semibold whitespace-normal break-words">Order &amp; Delivery</strong>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-1">
              <span className="text-slate-500">First Response:</span>
              <strong className="text-slate-900 font-bold">15m</strong>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-1">
              <span className="text-slate-500">Resolution:</span>
              <strong className="text-slate-900 font-bold">6h</strong>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-1">
              <span className="text-slate-500">Escalation Rule:</span>
              <strong className="text-[#881337] font-bold whitespace-normal break-words">75% to Team Lead</strong>
            </div>
          </div>
        </div>
        <div className="pt-1.5 mt-1.5 border-t border-slate-100">
          <span className="inline-flex items-center gap-1 w-full px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200 text-[10px] justify-start">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            Simulation Passed
          </span>
        </div>
      </div>

      {/* 15. Evaluation / Analysis */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">15. Evaluation / Analysis</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Impact Area</th>
                  <th className="py-1 px-1">First Response</th>
                  <th className="py-1 px-1">Update Interval</th>
                  <th className="py-1 px-1">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Queue Capacity</td>
                  <td className="py-1 px-1 text-emerald-700 font-bold">15m</td>
                  <td className="py-1 px-1 text-slate-700">15m</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+2%</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Workload</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+7%</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+6%</td>
                  <td className="py-1 px-1 text-slate-300">—</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Compliance</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+8%</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+7%</td>
                  <td className="py-1 px-1 text-amber-700 font-medium">Fair</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Escalation Risk</td>
                  <td className="py-1 px-1 text-emerald-700 font-bold">Low</td>
                  <td className="py-1 px-1 text-amber-700 font-bold">Medium</td>
                  <td className="py-1 px-1 text-rose-600 font-bold">-5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
