'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import type { SupportCaseItem } from '@/types/customerSupport';

interface SelectedCaseRoutingProps {
  selectedCase: SupportCaseItem | null;
  onNavigateToCase?: (caseId: string) => void;
}

export function SelectedCaseRouting({ selectedCase, onNavigateToCase }: SelectedCaseRoutingProps) {
  const router = useRouter();

  // Selected Case Values (with reference fallback matching CS02 screenshot if no row is selected)
  const caseRef = selectedCase?.caseReference || 'CS-2026-008241';
  const dbId = selectedCase?.dbCaseId || '8241';
  const status = selectedCase?.caseStatus || 'In Progress';
  const customer = selectedCase?.customerName || 'Elena Rodriguez';
  const channel = selectedCase?.channel || 'In-App Chat';
  const sentiment = selectedCase?.sentiment || 'Concerned';
  const priority = selectedCase?.priority || 'High';
  const caseId = selectedCase?.id || '8241';

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden p-5 space-y-5">
      {/* Title */}
      <h2 className="text-[13px] font-bold text-ink tracking-tight">
        Selected Case — Queue Routing & Assignment
      </h2>

      {/* Selected Case Header Context Bar */}
      <div className="bg-canvas border border-line rounded-lg p-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[12px]">
        <div className="flex items-center gap-3 font-bold text-ink">
          <Link
            href={`/admin/customer-support/cases/${caseId}`}
            className="hover:text-primary-900 transition-colors"
          >
            {caseRef}
          </Link>
          <span className="text-[11px] font-mono text-slate-400 font-normal">
            DB ID: {dbId}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
          <div>
            Current Status: <strong className="text-sky-700">{status}</strong>
          </div>
          <div>
            Dependency: <strong className="text-amber-700">Supplier</strong>
          </div>
          <div>
            Dependency State: <strong className="text-amber-600">Waiting</strong>
          </div>
          <div>
            Customer: <strong className="text-ink">{customer}</strong>
          </div>
          <div>
            Channel: <strong className="text-ink">{channel}</strong>
          </div>
          <div>
            Sentiment: <strong className="text-amber-600">{sentiment}</strong>
          </div>
          <div>
            Priority: <strong className="text-amber-600">{priority}</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/admin/customer-support/cases/${caseId}`)}
          className="text-slate-400 hover:text-ink p-1 rounded hover:bg-slate-200 transition-colors"
          title="Case Options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* TOP ROW OF MINI-PANELS (1 to 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* PANEL 1: Queue Summary */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Queue Summary
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-600">
                <span>All Open Cases</span>
                <strong className="text-ink">1,286</strong>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
                <div className="bg-primary-900 h-full rounded-full" style={{ width: '85%' }} />
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>My Team Queue</span>
                <strong className="text-ink">312</strong>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
                <div className="bg-sky-600 h-full rounded-full" style={{ width: '60%' }} />
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Unassigned Queue</span>
                <strong className="text-ink">46</strong>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '30%' }} />
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Waiting Customer</span>
                <strong className="text-ink">128</strong>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-1">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Waiting Supplier</span>
                <strong className="text-ink">74</strong>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Escalated Queue</span>
                <strong className="text-ink">17</strong>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: Recommended Assignment */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Recommended Assignment
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-line pb-1">
                    <th className="font-semibold">Team</th>
                    <th className="font-semibold text-right">Workload</th>
                    <th className="font-semibold text-right">SLA Health</th>
                    <th className="font-semibold text-right">Match</th>
                    <th className="font-semibold text-right">Avail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-1 font-medium text-ink">Customer Operations</td>
                    <td className="text-right">78%</td>
                    <td className="text-right">92%</td>
                    <td className="text-right">95%</td>
                    <td className="text-right font-bold text-green-600">Available</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-ink">Payment Team</td>
                    <td className="text-right">64%</td>
                    <td className="text-right">96%</td>
                    <td className="text-right">92%</td>
                    <td className="text-right font-bold text-green-600">Available</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-ink">Returns & Refunds</td>
                    <td className="text-right">71%</td>
                    <td className="text-right">94%</td>
                    <td className="text-right">87%</td>
                    <td className="text-right font-bold text-green-600">Available</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-ink">Product & Supplier</td>
                    <td className="text-right">82%</td>
                    <td className="text-right">89%</td>
                    <td className="text-right">81%</td>
                    <td className="text-right font-bold text-amber-600">Busy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-left">
            View More Recommendations
          </button>
        </div>

        {/* PANEL 3: Team Queue Health */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Team Queue Health
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Customer Operations</span>
                <span className="flex items-center gap-1 text-green-600 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Payment Team</span>
                <span className="flex items-center gap-1 text-green-600 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Returns & Refunds</span>
                <span className="flex items-center gap-1 text-green-600 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Product & Supplier</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Moderate
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Safety & Compliance</span>
                <span className="flex items-center gap-1 text-green-600 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Healthy
                </span>
              </div>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-left">
            View Team Dashboards
          </button>
        </div>

        {/* PANEL 4: Routing Rules Reference */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Routing Rules Reference
            </h3>
            <ul className="space-y-1 text-[10px] text-slate-600">
              <li className="flex items-center gap-1">
                <span className="text-slate-400">•</span> Shipment Issue <span className="text-slate-400">→</span> Logistics Team
              </li>
              <li className="flex items-center gap-1">
                <span className="text-slate-400">•</span> Payment Issue <span className="text-slate-400">→</span> Payment Team
              </li>
              <li className="flex items-center gap-1">
                <span className="text-slate-400">•</span> Return Issue <span className="text-slate-400">→</span> Returns & Refunds
              </li>
              <li className="flex items-center gap-1">
                <span className="text-slate-400">•</span> Product Defect <span className="text-slate-400">→</span> Product & Supplier
              </li>
              <li className="flex items-center gap-1">
                <span className="text-slate-400">•</span> Safety Complaint <span className="text-slate-400">→</span> Safety & Compliance
              </li>
              <li className="flex items-center gap-1">
                <span className="text-slate-400">•</span> High Priority / SLA At Risk <span className="text-slate-400">→</span> Fast Track Team
              </li>
            </ul>
          </div>
          <Link
            href="/admin/customer-support/sla-routing"
            className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 block text-right"
          >
            Open Routing Rules
          </Link>
        </div>

        {/* PANEL 5: SLA Priority Queue */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              5. SLA Priority Queue
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-600">
                <span>5. SLA Priority Queue</span>
                <strong className="text-ink">29</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>6. Unassigned Queue</span>
                <strong className="text-ink">46</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>7. External Dependency Queue</span>
                <strong className="text-ink">74</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>8. Escalation Queue</span>
                <strong className="text-ink">17</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>9. Repeat / Reopened Cases</span>
                <strong className="text-ink">68</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER ROW OF MINI-PANELS / MINI-TABLES (6 to 10) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* PANEL 6: Unassigned Cases (46) */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                6. Unassigned Cases <span className="text-slate-400 font-normal">(46)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-line pb-1">
                    <th className="font-semibold">Case ID</th>
                    <th className="font-semibold">Priority</th>
                    <th className="font-semibold">Age</th>
                    <th className="font-semibold">Issue Type</th>
                    <th className="font-semibold text-right">SLA Due In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007998</td>
                    <td className="text-red-600 font-bold">High</td>
                    <td>1h 22m</td>
                    <td>Payment Issue</td>
                    <td className="text-right text-red-600 font-semibold">1h 30m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007996</td>
                    <td className="text-amber-600 font-semibold">Medium</td>
                    <td>2h 22m</td>
                    <td>Return Issue</td>
                    <td className="text-right">2h 10m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007995</td>
                    <td className="text-green-600 font-medium">Low</td>
                    <td>3h 12m</td>
                    <td>Shipment Issue</td>
                    <td className="text-right">6h 45m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007991</td>
                    <td className="text-amber-600 font-semibold">Medium</td>
                    <td>5h 45m</td>
                    <td>Product Defect</td>
                    <td className="text-right">12h 20m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007990</td>
                    <td className="text-red-600 font-bold">High</td>
                    <td>5h 20m</td>
                    <td>Payment Issue</td>
                    <td className="text-right text-red-600 font-semibold">1h 15m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-center">
            View All
          </button>
        </div>

        {/* PANEL 7: External Dependency Queue (74) */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                7. External Dependency Queue <span className="text-slate-400 font-normal">(74)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-line pb-1">
                    <th className="font-semibold">Case ID</th>
                    <th className="font-semibold">Supplier</th>
                    <th className="font-semibold">Age</th>
                    <th className="font-semibold">Dependency</th>
                    <th className="font-semibold text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007984</td>
                    <td className="truncate max-w-[70px]">Radiance Labs</td>
                    <td>1h 20m</td>
                    <td>Shipment Status</td>
                    <td className="text-right font-medium text-amber-600">Waiting</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007985</td>
                    <td className="truncate max-w-[70px]">Luxe Distribution</td>
                    <td>3h 40m</td>
                    <td>Return Approval</td>
                    <td className="text-right font-medium text-amber-600">Waiting</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007992</td>
                    <td className="truncate max-w-[70px]">Beauty Packaging</td>
                    <td>6h 10m</td>
                    <td>Replacement Dispatch</td>
                    <td className="text-right font-medium text-amber-600">Waiting</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007993</td>
                    <td className="truncate max-w-[70px]">Radiance Labs</td>
                    <td>8h 12m</td>
                    <td>Lab Test Result</td>
                    <td className="text-right font-medium text-amber-600">Waiting</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007994</td>
                    <td className="truncate max-w-[70px]">Glam Logistics</td>
                    <td>10h 45m</td>
                    <td>Shipment Update</td>
                    <td className="text-right font-medium text-amber-600">Waiting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-center">
            View All
          </button>
        </div>

        {/* PANEL 8: Escalation Queue (17) */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                8. Escalation Queue <span className="text-slate-400 font-normal">(17)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-line pb-1">
                    <th className="font-semibold">Case ID</th>
                    <th className="font-semibold">Escalation Level</th>
                    <th className="font-semibold">Age</th>
                    <th className="font-semibold">Reason</th>
                    <th className="font-semibold text-right">SLA Due In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007998</td>
                    <td>Level 2</td>
                    <td>2h 15m</td>
                    <td className="font-medium text-red-600">SLA Breach</td>
                    <td className="text-right text-red-600 font-semibold">1h 45m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007997</td>
                    <td>Level 3</td>
                    <td>3h 10m</td>
                    <td className="font-medium text-red-600">Safety Complaint</td>
                    <td className="text-right">2h 30m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007995</td>
                    <td>Level 2</td>
                    <td>5h 45m</td>
                    <td className="font-medium text-purple-600">Executive Escalation</td>
                    <td className="text-right text-red-600 font-bold">25m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007990</td>
                    <td>Level 1</td>
                    <td>7h 20m</td>
                    <td className="font-medium text-red-600">Customer Threat</td>
                    <td className="text-right">1h 10m</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007987</td>
                    <td>Level 2</td>
                    <td>9h 20m</td>
                    <td className="font-medium text-amber-600">Payment Failure</td>
                    <td className="text-right">3h 40m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-center">
            View All
          </button>
        </div>

        {/* PANEL 9: Repeat / Reopened Cases (68) */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                9. Repeat / Reopened Cases <span className="text-slate-400 font-normal">(68)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-line pb-1">
                    <th className="font-semibold">Case ID</th>
                    <th className="font-semibold">Original Case ID</th>
                    <th className="font-semibold">Reopened By</th>
                    <th className="font-semibold">Age</th>
                    <th className="font-semibold text-right">Reopen Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-008019</td>
                    <td className="font-mono text-slate-500">CS-2026-007050</td>
                    <td>Elena Rodriguez</td>
                    <td>1h 10m</td>
                    <td className="text-right font-bold text-ink">2</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-008018</td>
                    <td className="font-mono text-slate-500">CS-2026-007062</td>
                    <td>Julian Vance</td>
                    <td>2h 30m</td>
                    <td className="text-right font-bold text-red-600">3</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-008017</td>
                    <td className="font-mono text-slate-500">CS-2026-007075</td>
                    <td>Nimal Sirisena</td>
                    <td>3h 40m</td>
                    <td className="text-right font-bold text-ink">2</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-008012</td>
                    <td className="font-mono text-slate-500">CS-2026-007088</td>
                    <td>Dilan Perera</td>
                    <td>5h 15m</td>
                    <td className="text-right font-bold text-ink">2</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-008007</td>
                    <td className="font-mono text-slate-500">CS-2026-007099</td>
                    <td>Amaya Perera</td>
                    <td>6h 30m</td>
                    <td className="text-right font-bold text-ink">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-center">
            View All
          </button>
        </div>

        {/* PANEL 10: Duplicate / Merge Review (23) */}
        <div className="border border-line rounded-lg p-3 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                10. Duplicate / Merge Review <span className="text-slate-400 font-normal">(23)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-line pb-1">
                    <th className="font-semibold">Case ID</th>
                    <th className="font-semibold">Potential Match</th>
                    <th className="font-semibold">Similarity</th>
                    <th className="font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007990</td>
                    <td className="font-mono text-slate-500">CS-2026-007989</td>
                    <td className="font-bold text-green-700">96%</td>
                    <td className="text-right">
                      <button type="button" className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[9px] font-semibold rounded text-slate-700">
                        Review
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007992</td>
                    <td className="font-mono text-slate-500">CS-2026-007991</td>
                    <td className="font-bold text-green-700">92%</td>
                    <td className="text-right">
                      <button type="button" className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[9px] font-semibold rounded text-slate-700">
                        Review
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007994</td>
                    <td className="font-mono text-slate-500">CS-2026-007993</td>
                    <td className="font-bold text-green-700">90%</td>
                    <td className="text-right">
                      <button type="button" className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[9px] font-semibold rounded text-slate-700">
                        Review
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007996</td>
                    <td className="font-mono text-slate-500">CS-2026-007995</td>
                    <td className="font-bold text-green-700">88%</td>
                    <td className="text-right">
                      <button type="button" className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[9px] font-semibold rounded text-slate-700">
                        Review
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-semibold text-ink">CS-2026-007998</td>
                    <td className="font-mono text-slate-500">CS-2026-007997</td>
                    <td className="font-bold text-green-700">85%</td>
                    <td className="text-right">
                      <button type="button" className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[9px] font-semibold rounded text-slate-700">
                        Review
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-2 text-center">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
