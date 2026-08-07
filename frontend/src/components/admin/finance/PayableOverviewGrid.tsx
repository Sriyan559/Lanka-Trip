'use client';

import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FN07TrendPoint,
  FN07DonutSegment,
  FN07StatusSummaryRow,
  FN07CalculationRow,
  FN07MatchingSummary,
  FN07ApprovalDetails,
} from '@/data/mockSupplierPayableDetailData';

/* ─── Card wrapper ─── */
function ChartCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2 ${className}`}>
      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-1.5">
        {title}
      </p>
      {children}
    </div>
  );
}

/* ─── Props ─── */
interface Props {
  trendData: FN07TrendPoint[];
  donutData: FN07DonutSegment[];
  statusSummaryRows: FN07StatusSummaryRow[];
  calculationRows: FN07CalculationRow[];
  matchingSummary: FN07MatchingSummary;
  approvalDetails: FN07ApprovalDetails;
}

/* ─── Custom Tooltip ─── */
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-gray-200 rounded shadow-lg p-2 text-[10px] font-medium">
      <p className="font-bold text-gray-800 mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-mono font-bold">{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export function PayableOverviewGrid({
  trendData,
  donutData,
  statusSummaryRows,
  calculationRows,
  matchingSummary,
  approvalDetails,
}: Props) {
  const totalDonut = donutData.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Trend | Donut | Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* 2. Payment & Amount Trend */}
        <ChartCard title="2. Payment & Amount Trend (Last 90 Days)">
          <ResponsiveContainer width="100%" height={130}>
            <ComposedChart data={trendData} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 8 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 8 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 8 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 8 }} />
              <Bar yAxisId="left" dataKey="grossLiability" name="Gross Liability (LKR)" fill="#8f002b" opacity={0.85} radius={[2, 2, 0, 0]} barSize={10} />
              <Bar yAxisId="left" dataKey="netPayable" name="Net Payable (LKR)" fill="#16a34a" opacity={0.85} radius={[2, 2, 0, 0]} barSize={10} />
              <Line yAxisId="right" type="monotone" dataKey="invoices" name="Invoices (Qty)" stroke="#94a3b8" strokeWidth={1.5} dot={{ r: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Payable Type / Composition */}
        <ChartCard title="3. Payable Type / Composition">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <PieChart width={100} height={100}>
                <Pie
                  data={donutData}
                  cx={48}
                  cy={48}
                  innerRadius={30}
                  outerRadius={46}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="flex flex-col gap-1 text-[9px] flex-1 min-w-0">
              {donutData.map((seg) => (
                <div key={seg.name} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-gray-600 truncate flex-1">{seg.code}</span>
                  <span className="font-mono font-bold text-gray-900 shrink-0">
                    {(seg.amount / 1000).toFixed(0)}K
                  </span>
                  <span className="text-gray-400 shrink-0">{seg.percentage}%</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-1 mt-0.5 flex justify-between">
                <span className="text-gray-500 font-bold">Total</span>
                <span className="font-mono font-bold text-gray-900">
                  LKR {(totalDonut / 1_000_000).toFixed(3)}M
                </span>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* 4. Payable Status Summary */}
        <ChartCard title="4. Payable Status Summary">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-gray-500 font-semibold pb-1 pr-1">Status</th>
                <th className="text-right text-gray-500 font-semibold pb-1 pr-1">Amount (LKR)</th>
                <th className="text-right text-gray-500 font-semibold pb-1 pr-1">%</th>
                <th className="text-right text-gray-500 font-semibold pb-1">Count</th>
              </tr>
            </thead>
            <tbody>
              {statusSummaryRows.map((row) => (
                <tr key={row.status} className="border-b border-gray-50">
                  <td className="py-1 pr-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                    <span className="font-medium text-gray-700">{row.status}</span>
                  </td>
                  <td className="py-1 pr-1 text-right font-mono font-semibold">
                    {row.amount.toLocaleString()}
                  </td>
                  <td className="py-1 pr-1 text-right font-mono text-gray-600">
                    {row.pctOfTotal.toFixed(2)}%
                  </td>
                  <td className="py-1 text-right font-mono font-bold">{row.count}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-300 bg-gray-50">
                <td className="py-1 font-bold text-gray-900">Total</td>
                <td className="py-1 text-right font-mono font-bold">
                  {statusSummaryRows.reduce((s, r) => s + r.amount, 0).toLocaleString()}
                </td>
                <td className="py-1 text-right font-mono font-bold">100.00%</td>
                <td className="py-1 text-right font-mono font-bold">
                  {statusSummaryRows.reduce((s, r) => s + r.count, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </ChartCard>
      </div>

      {/* Row 2: Calculation | Matching | Approval */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* 5. Detailed Calculation Summary */}
        <ChartCard title="5. Detailed Calculation Summary">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-gray-500 font-semibold pb-1 pr-1 w-5">#</th>
                <th className="text-left text-gray-500 font-semibold pb-1 pr-1">Description</th>
                <th className="text-right text-gray-500 font-semibold pb-1 pr-1">Amount (LKR)</th>
                <th className="text-left text-gray-500 font-semibold pb-1">Notes</th>
              </tr>
            </thead>
            <tbody>
              {calculationRows.map((row) => (
                <tr
                  key={row.lineNo}
                  className={[
                    'border-b border-gray-50',
                    row.isHighlighted ? 'bg-emerald-50 border-emerald-200' : '',
                    row.isSubtotal ? 'bg-gray-50 font-bold' : '',
                    row.isInfoOnly ? 'text-blue-700' : '',
                  ].join(' ')}
                >
                  <td className="py-0.5 pr-1 text-gray-400 font-mono">{row.lineNo}</td>
                  <td className={`py-0.5 pr-1 ${row.isHighlighted ? 'font-bold text-emerald-800' : row.isSubtotal ? 'font-bold text-gray-800' : 'text-gray-700'}`}>
                    {row.description}
                  </td>
                  <td
                    className={`py-0.5 pr-1 text-right font-mono font-semibold ${
                      row.isHighlighted
                        ? 'text-emerald-700 font-extrabold text-xs'
                        : row.amount < 0
                        ? 'text-red-600'
                        : row.isInfoOnly
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {row.amount < 0
                      ? `(${Math.abs(row.amount).toLocaleString()})`
                      : row.amount.toLocaleString()}
                  </td>
                  <td className="py-0.5 text-gray-400 text-[9px] truncate max-w-[80px]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ChartCard>

        {/* 6. Matching Summary */}
        <ChartCard title="6. Matching Summary">
          <div className="flex flex-col gap-1.5 text-[10px]">
            {[
              { label: 'Matching Method', value: matchingSummary.matchingMethod },
              { label: `Precisely Matched`, value: `${matchingSummary.preciselyMatched.count} — ${matchingSummary.preciselyMatched.pct}%`, color: '#16a34a' },
              { label: `Partially Matched`, value: `${matchingSummary.partiallyMatched.count} — ${matchingSummary.partiallyMatched.pct}%`, color: '#f59e0b' },
              { label: `Manually Posted`, value: `${matchingSummary.manuallyPosted.count} — ${matchingSummary.manuallyPosted.pct}%`, color: '#2563eb' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center border-b border-gray-50 pb-1">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold font-mono" style={color ? { color } : {}}>
                  {value}
                </span>
              </div>
            ))}

            {/* Matching quality bar */}
            <div className="flex items-center gap-2 py-1 border-b border-gray-100">
              <span className="text-gray-500 shrink-0">Matching Quality</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${matchingSummary.matchingQuality}%` }}
                />
              </div>
              <span className="font-bold text-emerald-700 font-mono shrink-0">
                {matchingSummary.matchingQuality}%
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-50 pb-1">
              <span className="text-gray-500">Variance (Payable)</span>
              <span className="font-semibold font-mono text-red-600">
                LKR {matchingSummary.variance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Reconciliation Status</span>
              <span
                className={`font-bold ${
                  matchingSummary.reconciliationStatus === 'Not Complete' ? 'text-red-600' : 'text-emerald-700'
                }`}
              >
                {matchingSummary.reconciliationStatus}
              </span>
            </div>
          </div>
        </ChartCard>

        {/* 7. Approval Details */}
        <ChartCard title="7. Approval Details">
          <div className="flex flex-col gap-1 text-[10px]">
            {[
              { label: 'Submitted By', value: approvalDetails.submittedBy },
              { label: 'Approval Routing', value: approvalDetails.approvalRouting },
              { label: 'Approved', value: approvalDetails.approved },
              { label: 'Approver Next', value: approvalDetails.nextApprover },
              { label: 'Approval Due', value: approvalDetails.approvalDue },
              { label: 'Approval Pending', value: approvalDetails.approvalPending },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b border-gray-50 pb-0.5">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-900 font-mono">{value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-500">Approval Status</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  approvalDetails.approvalStatus === 'Approved'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {approvalDetails.approvalStatus}
              </span>
            </div>

            {/* Approval progress bar */}
            <div className="mt-2">
              <div className="flex justify-between text-[9px] text-gray-500 mb-1">
                <span>Approval Progress</span>
                <span className="font-mono font-bold">
                  {approvalDetails.approvedCount}/{approvalDetails.totalApprovers} ={' '}
                  {Math.round((approvalDetails.approvedCount / approvalDetails.totalApprovers) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8f002b] rounded-full transition-all"
                  style={{
                    width: `${(approvalDetails.approvedCount / approvalDetails.totalApprovers) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
