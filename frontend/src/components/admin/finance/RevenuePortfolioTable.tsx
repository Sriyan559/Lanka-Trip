'use client';

import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Eye,
  ExternalLink,
  MoreHorizontal,
} from 'lucide-react';
import { RevenuePortfolioRow } from '@/types/finance';
import { revenueView, useRevenueReceivables } from '@/contexts/FinanceRevenuePaymentsContext';

/* ─── Status badge helpers ─── */
function RevStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Recognized: 'bg-emerald-100 text-emerald-800',
    Deferred: 'bg-purple-100 text-purple-800',
    Pending: 'bg-gray-100 text-gray-700',
    Current: 'bg-emerald-100 text-emerald-800',
    'Due Soon': 'bg-yellow-100 text-yellow-800',
    Overdue: 'bg-red-100 text-red-700 font-bold',
    'Partially Paid': 'bg-amber-100 text-amber-800',
    Disputed: 'bg-red-200 text-red-900 font-bold',
    Collected: 'bg-emerald-100 text-emerald-800',
    Reconciled: 'bg-emerald-100 text-emerald-800',
    'Not Reconciled': 'bg-red-100 text-red-700',
    'In Review': 'bg-blue-100 text-blue-700',
    Approved: 'bg-emerald-100 text-emerald-800',
    None: 'bg-gray-100 text-gray-500',
    Warning: 'bg-yellow-100 text-yellow-700',
    High: 'bg-orange-100 text-orange-700 font-bold',
    Critical: 'bg-red-100 text-red-700 font-bold',
  };
  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

/* ─── Ageing indicator ─── */
function AgeingBadge({ bucket }: { bucket: string }) {
  const colorMap: Record<string, string> = {
    '0-7': 'bg-emerald-100 text-emerald-700',
    '8-30': 'bg-blue-100 text-blue-700',
    '31-60': 'bg-amber-100 text-amber-700',
    '61-90': 'bg-orange-100 text-orange-700',
    '90+': 'bg-red-100 text-red-700 font-bold',
  };
  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${colorMap[bucket] ?? 'bg-gray-100 text-gray-500'}`}>
      {bucket}d
    </span>
  );
}

function fmt(n: number) {
  return 'LKR ' + (n / 1000).toFixed(1) + 'K';
}

const COL_HEADERS = [
  { key: 'ref', label: 'Ref / Invoice', sortable: true },
  { key: 'customerAccount', label: 'Customer Account', sortable: true },
  { key: 'bu', label: 'BU / Channel', sortable: true },
  { key: 'gmv', label: 'GMV', sortable: true },
  { key: 'grossSales', label: 'Gross Sales', sortable: true },
  { key: 'discounts', label: 'Disc / Tax', sortable: false },
  { key: 'netSales', label: 'Net Sales', sortable: true },
  { key: 'recognizedRevenue', label: 'Recognized', sortable: true },
  { key: 'deferredRevenue', label: 'Deferred', sortable: true },
  { key: 'outstandingAmount', label: 'Outstanding', sortable: true },
  { key: 'ageingBucket', label: 'Ageing', sortable: false },
  { key: 'revenueStatus', label: 'Rev Status', sortable: false },
  { key: 'receivableStatus', label: 'Recv Status', sortable: false },
  { key: 'collectionStatus', label: 'Collection', sortable: false },
  { key: 'reconciliationStatus', label: 'Recon', sortable: false },
  { key: 'exceptionStatus', label: 'Exception', sortable: false },
  { key: 'approvalStatus', label: 'Approval', sortable: false },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'owner', label: 'Owner', sortable: false },
  { key: '_actions', label: 'Actions', sortable: false },
];

interface Props {
  selectedRef?: string;
  onSelectRecord: (row: RevenuePortfolioRow) => void;
}

export function RevenuePortfolioTable({ selectedRef, onSelectRecord }: Props) {
  const { data } = useRevenueReceivables();
  const portfolio = revenueView(data).rows;
  const [sortKey, setSortKey] = useState('ref');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const sorted = [...portfolio].sort((a, b) => {
    const aVal = a[sortKey as keyof RevenuePortfolioRow];
    const bVal = b[sortKey as keyof RevenuePortfolioRow];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSort(key: string) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  function SortIcon({ k }: { k: string }) {
    if (sortKey !== k) return <ArrowUpDown size={11} className="text-gray-300 ml-0.5" />;
    return sortDir === 'asc'
      ? <ChevronUp size={11} className="text-[#8f002b] ml-0.5" />
      : <ChevronDown size={11} className="text-[#8f002b] ml-0.5" />;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Table header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">Revenue &amp; Receivables Portfolio</span>
          <span className="bg-[#8f002b] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{data?.meta.total ?? portfolio.length}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-2 py-0.5 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-40">‹</button>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-2 py-0.5 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-40">›</button>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-gray-700" style={{ minWidth: 1800 }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-5 px-2 py-2">
                <input type="checkbox" className="rounded border-gray-300 w-3 h-3" />
              </th>
              <th className="px-1.5 py-2 text-[10px] text-gray-400 text-left font-bold w-5">#</th>
              {COL_HEADERS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-2 py-2 text-left text-[10px] font-bold text-gray-600 whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}`}
                >
                  <span className="flex items-center gap-0.5">
                    {col.label}
                    {col.sortable && <SortIcon k={col.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((row, idx) => {
              const isSelected = row.ref === selectedRef;
              return (
                <tr
                  key={row.ref}
                  onClick={() => onSelectRecord(row)}
                  className={`cursor-pointer transition-colors ${isSelected ? 'bg-[#fdf2f5] border-l-2 border-l-[#8f002b]' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-2 py-1.5">
                    <input type="checkbox" className="rounded border-gray-300 w-3 h-3" onClick={(e) => e.stopPropagation()} />
                  </td>
                  <td className="px-1.5 py-1.5 text-[10px] text-gray-400 font-medium">
                    {(page - 1) * PER_PAGE + idx + 1}
                  </td>
                  {/* Ref / Invoice */}
                  <td className="px-2 py-1.5 font-mono text-[10px] whitespace-nowrap">
                    <div className={`font-bold ${isSelected ? 'text-[#8f002b]' : 'text-gray-800'}`}>{row.ref}</div>
                    <div className="text-gray-400">{row.invoiceRef}</div>
                  </td>
                  {/* Customer */}
                  <td className="px-2 py-1.5 whitespace-nowrap max-w-[140px]">
                    <div className="font-semibold text-gray-800 truncate">{row.customerAccount}</div>
                    <div className="text-[10px] text-gray-400">{row.accountType}</div>
                  </td>
                  {/* BU / Channel */}
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    <div className="text-gray-700">{row.bu}</div>
                    <div className="text-[10px] text-gray-400">{row.channel}</div>
                  </td>
                  {/* GMV */}
                  <td className="px-2 py-1.5 font-mono text-right whitespace-nowrap font-semibold text-gray-800">
                    {fmt(row.gmv)}
                  </td>
                  {/* Gross Sales */}
                  <td className="px-2 py-1.5 font-mono text-right whitespace-nowrap text-gray-700">
                    {fmt(row.grossSales)}
                  </td>
                  {/* Disc / Tax */}
                  <td className="px-2 py-1.5 text-right whitespace-nowrap">
                    <div className="text-red-600">-{fmt(row.discounts)}</div>
                    <div className="text-gray-500 text-[10px]">tax {fmt(row.tax)}</div>
                  </td>
                  {/* Net Sales */}
                  <td className="px-2 py-1.5 font-mono text-right whitespace-nowrap font-bold text-gray-900">
                    {fmt(row.netSales)}
                  </td>
                  {/* Recognized */}
                  <td className="px-2 py-1.5 font-mono text-right whitespace-nowrap text-emerald-700 font-semibold">
                    {row.recognizedRevenue > 0 ? fmt(row.recognizedRevenue) : '—'}
                  </td>
                  {/* Deferred */}
                  <td className="px-2 py-1.5 font-mono text-right whitespace-nowrap text-purple-700 font-semibold">
                    {row.deferredRevenue > 0 ? fmt(row.deferredRevenue) : '—'}
                  </td>
                  {/* Outstanding */}
                  <td className={`px-2 py-1.5 font-mono text-right whitespace-nowrap font-bold ${row.outstandingAmount > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                    {row.outstandingAmount > 0 ? fmt(row.outstandingAmount) : '—'}
                  </td>
                  {/* Ageing */}
                  <td className="px-2 py-1.5"><AgeingBadge bucket={row.ageingBucket} /></td>
                  {/* Revenue Status */}
                  <td className="px-2 py-1.5"><RevStatusBadge status={row.revenueStatus} /></td>
                  {/* Receivable Status */}
                  <td className="px-2 py-1.5"><RevStatusBadge status={row.receivableStatus} /></td>
                  {/* Collection */}
                  <td className="px-2 py-1.5"><RevStatusBadge status={row.collectionStatus} /></td>
                  {/* Recon */}
                  <td className="px-2 py-1.5"><RevStatusBadge status={row.reconciliationStatus} /></td>
                  {/* Exception */}
                  <td className="px-2 py-1.5"><RevStatusBadge status={row.exceptionStatus} /></td>
                  {/* Approval */}
                  <td className="px-2 py-1.5"><RevStatusBadge status={row.approvalStatus} /></td>
                  {/* Due Date */}
                  <td className="px-2 py-1.5 whitespace-nowrap text-[10px] text-gray-600">{row.dueDate}</td>
                  {/* Owner */}
                  <td className="px-2 py-1.5 whitespace-nowrap text-[10px] text-gray-600">{row.owner}</td>
                  {/* Actions */}
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectRecord(row)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-800"
                        title="View details"
                      >
                        <Eye size={11} />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-800"
                        title="Open in new tab"
                      >
                        <ExternalLink size={11} />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-800"
                        title="More options"
                      >
                        <MoreHorizontal size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-gray-100 bg-gray-50">
        <span className="text-[10px] text-gray-500">
          Showing {portfolio.length ? (page - 1) * PER_PAGE + 1 : 0}–{Math.min(page * PER_PAGE, portfolio.length)} of {data?.meta.total ?? portfolio.length} revenue records
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-5 h-5 text-[10px] rounded ${p === page ? 'bg-[#8f002b] text-white font-bold' : 'border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
