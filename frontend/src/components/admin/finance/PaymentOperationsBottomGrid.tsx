'use client';

import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  CreditCard,
  Lock,
  RotateCcw,
  FileText,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function PaymentOperationsBottomGrid() {
  const renderSparkline = (values: number[], color = '#10b981') => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const points = values
      .map((val, idx) => {
        const x = (idx / (values.length - 1)) * 50;
        const y = 14 - ((val - min) / range) * 12;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg className="w-12 h-4 overflow-visible">
        <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 16 Operation Mini Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-2.5">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">1. Payment Lifecycle Workflow</div>
          <div className="flex items-center gap-1.5 my-1 text-[11px]">
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
            <span className="font-bold text-gray-900">Authorize</span>
            <span className="ml-auto text-[10px] font-bold text-emerald-700">100%</span>
          </div>
          <div className="text-[10px] text-gray-500">Capture, Settle, Reconcile 100%</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">2. Payment Authorization Operations</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-sm font-extrabold text-gray-900">312.7K</span>
            {renderSparkline([300, 305, 308, 310, 312.7], '#10b981')}
          </div>
          <div className="text-[10px] text-emerald-700 font-bold">Auth Success 98.2% ▲</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">3. Payment Capture Operations</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-sm font-extrabold text-gray-900">298.5K</span>
            {renderSparkline([280, 288, 292, 295, 298.5], '#8b5cf6')}
          </div>
          <div className="text-[10px] text-purple-700 font-bold">Capture Success 96.8% ▲</div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">4. Failed &amp; Declined Operations</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-sm font-extrabold text-red-700">4,720</span>
            {renderSparkline([6, 5.5, 5.1, 4.9, 4.72], '#ef4444')}
          </div>
          <div className="text-[10px] text-red-600 font-bold">Failure Rate 1.48% ▼</div>
        </div>

        {/* Card 5 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">5. Payment Retry Management</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-sm font-extrabold text-gray-900">842</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">3.0% Rate</span>
          </div>
          <div className="text-[10px] text-gray-500">Retry Eligible Queue</div>
        </div>

        {/* Card 6 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">6. Payment Method Performance</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-gray-900">Top: Card</span>
            <span className="text-[10px] font-bold text-emerald-700">96.4%</span>
          </div>
          <div className="text-[10px] text-gray-500">Visa / Mastercard / Amex</div>
        </div>

        {/* Card 7 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">7. Payment Gateway Performance</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-gray-900">Visa Gateway</span>
            <span className="text-[10px] font-bold text-emerald-700">95.2%</span>
          </div>
          <div className="text-[10px] text-gray-500">95.2% Overall Reliability</div>
        </div>

        {/* Card 8 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">8. Duplicate Payment Detection</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-sm font-extrabold text-amber-700">84</span>
            {renderSparkline([95, 92, 88, 86, 84], '#f59e0b')}
          </div>
          <div className="text-[10px] text-amber-800 font-bold">Candidates Flagged ▼</div>
        </div>

        {/* Card 9 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">9. Risk, Auth &amp; Fraud Signals</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-gray-900">8,342 Risk</span>
            <span className="text-[10px] font-bold text-emerald-700">93.1% 3DS</span>
          </div>
          <div className="text-[10px] text-gray-500">126 Fraud Alerts</div>
        </div>

        {/* Card 10 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">10. Payment Reversals &amp; Voids</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-orange-700">126 Reversed</span>
            <span className="text-xs font-bold text-gray-600">98 Voided</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-bold">▼ 2.0% Reversals</div>
        </div>

        {/* Card 11 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">11. Payment Holds &amp; Release</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-amber-700">42 Active</span>
            <span className="text-[10px] font-bold text-emerald-700">18 Released</span>
          </div>
          <div className="text-[10px] text-amber-800 font-bold">▲ 4.8% Active Holds</div>
        </div>

        {/* Card 12 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">12. Disputes &amp; Chargebacks</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-red-700">86 Disputes</span>
            <span className="text-[10px] font-bold text-emerald-700">61.6% Win</span>
          </div>
          <div className="text-[10px] text-gray-500">32 Chargebacks</div>
        </div>

        {/* Card 13 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">13. Payment Settlement Linkage</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-emerald-700">96.1%</span>
            <span className="text-[10px] font-bold text-gray-900 font-mono">286.1M LKR</span>
          </div>
          <div className="text-[10px] text-gray-500">Settlement Coverage</div>
        </div>

        {/* Card 14 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">14. Payment Reconciliation</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-emerald-700">89.4%</span>
            <span className="text-[10px] font-bold text-gray-700">9,126 Matched</span>
          </div>
          <div className="text-[10px] text-gray-500">186 Mismatches</div>
        </div>

        {/* Card 15 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="text-[10px] font-bold text-gray-500 truncate">15. Payment Exception Queue</div>
          <div className="flex items-center justify-between my-1">
            <span className="text-xs font-bold text-red-700">186 Open</span>
            <span className="text-[10px] font-bold text-gray-600">3.8 days</span>
          </div>
          <div className="text-[10px] text-gray-500">Average Queue Age</div>
        </div>

        {/* Card 16 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 truncate">16. Recent Activity</span>
            <button
              onClick={() => toast('Recent Activity log expanded')}
              className="text-[9px] text-[#8f002b] font-bold hover:underline"
            >
              View all
            </button>
          </div>
          <div className="flex flex-col gap-0.5 my-0.5 text-[9px]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-gray-700">PAY-2025-082942</span>
              <span className="text-emerald-700 font-bold">Success</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-gray-700">PAY-2025-082941</span>
              <span className="text-amber-700 font-bold">Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-gray-700">PAY-2025-082940</span>
              <span className="text-red-700 font-bold">Failed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Compact Health Strip */}
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-[11px] text-gray-600 flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Retry Eligible:</span>
            <span className="font-bold text-gray-900">842</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Duplicate Protection:</span>
            <span className="font-bold text-emerald-700">6,352 protected</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Gateway Success:</span>
            <span className="font-bold text-emerald-700">95.2%</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Settlement Coverage:</span>
            <span className="font-bold text-emerald-700">96.1%</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Exception Ageing:</span>
            <span className="font-bold text-amber-700">3.8 days</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Audit Readiness:</span>
            <span className="font-bold text-emerald-700">90.1%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-400 ml-auto">
          <span>Data as of May 26, 2025 10:15 AM</span>
          <button
            onClick={() => toast.success('Payment network state updated!')}
            className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900"
            title="Refresh Network Data"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
