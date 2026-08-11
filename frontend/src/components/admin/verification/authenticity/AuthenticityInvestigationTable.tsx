import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal } from 'lucide-react';

// ── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  'New':               'bg-blue-50 text-blue-700 border border-blue-200',
  'Under Investigation':'bg-purple-50 text-purple-700 border border-purple-200',
  'Awaiting Evidence': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Suspected':         'bg-orange-50 text-orange-700 border border-orange-200',
  'Confirmed':         'bg-red-100 text-red-700 border border-red-200',
  'Restricted':        'bg-red-50 text-red-700 border border-red-200',
  'Revalidation':      'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'Resolved':          'bg-green-50 text-green-700 border border-green-200',
  'Closed':            'bg-gray-100 text-gray-600 border border-gray-200',
};

export function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600 border border-gray-200';
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${cls}`}>
      {status}
    </span>
  );
}

// ── Risk Badge ───────────────────────────────────────────────────────────────
const RISK_STYLES: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800 border border-red-300',
  High:     'bg-orange-100 text-orange-800 border border-orange-300',
  Medium:   'bg-yellow-100 text-yellow-800 border border-yellow-300',
  Low:      'bg-green-100 text-green-700 border border-green-300',
};

export function RiskBadge({ level }: { level: string }) {
  const cls = RISK_STYLES[level] ?? 'bg-gray-100 text-gray-600 border border-gray-200';
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${cls}`}>
      {level}
    </span>
  );
}

// ── Generic Pill ─────────────────────────────────────────────────────────────
function Pill({ value, variant = 'gray' }: { value: string | number; variant?: 'gray' | 'green' | 'red' | 'amber' }) {
  const styles = {
    gray:  'bg-gray-100 text-gray-600',
    green: 'bg-green-50 text-green-700',
    red:   'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
  };
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap ${styles[variant]}`}>
      {value}
    </span>
  );
}

// ── SLA Indicator ────────────────────────────────────────────────────────────
export function SlaIndicator({ percentage, breached = false }: { percentage: number; breached?: boolean }) {
  const pct = Math.min(100, Math.max(0, percentage));
  const color = breached ? '#dc2626' : pct > 80 ? '#f59e0b' : '#16a34a';
  return (
    <div className="flex items-center gap-1.5 min-w-[60px]">
      <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold flex-shrink-0" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

// ── Pagination ───────────────────────────────────────────────────────────────
interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
}

function Pagination({ page, pageSize, total, totalPages, onPageChange, onPageSizeChange }: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-gray-500">
          Showing <span className="font-semibold text-gray-800">{from}</span> to{' '}
          <span className="font-semibold text-gray-800">{to}</span> of{' '}
          <span className="font-semibold text-gray-800">{total}</span> entries
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700"
        >
          {[10, 25, 50, 100].map((s) => (
            <option key={s} value={s}>{s} / page</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>

        {getPageNumbers().map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-[11px] text-gray-400">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`min-w-[26px] h-6 rounded text-[11px] font-semibold transition-colors ${
                p === page
                  ? 'bg-[#7a0023] text-white'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Table Column Definitions ─────────────────────────────────────────────────
const COLUMNS = [
  { key: 'id',                  label: 'Investigation ID',    width: 'w-[120px]' },
  { key: 'type',                label: 'Investigation Type',  width: 'w-[130px]' },
  { key: 'detection_source',    label: 'Detection Source',    width: 'w-[120px]' },
  { key: 'product',             label: 'Product',             width: 'w-[150px]' },
  { key: 'supplier',            label: 'Supplier',            width: 'w-[120px]' },
  { key: 'brand',               label: 'Brand',               width: 'w-[100px]' },
  { key: 'brand_auth',          label: 'Brand Authorization', width: 'w-[80px]' },
  { key: 'product_identity',    label: 'Product Identity',    width: 'w-[80px]' },
  { key: 'packaging_match',     label: 'Packaging Match',     width: 'w-[80px]' },
  { key: 'gtin',                label: 'Barcode / GTIN',      width: 'w-[100px]' },
  { key: 'serial_batch',        label: 'Serial / Batch',      width: 'w-[100px]' },
  { key: 'evidence_status',     label: 'Evidence Status',     width: 'w-[100px]' },
  { key: 'publication_status',  label: 'Publication Status',  width: 'w-[100px]' },
  { key: 'restriction_status',  label: 'Restriction Status',  width: 'w-[100px]' },
  { key: 'risk_level',          label: 'Risk Level',          width: 'w-[80px]' },
  { key: 'severity',            label: 'Severity',            width: 'w-[80px]' },
  { key: 'investigator',        label: 'Investigator',        width: 'w-[110px]' },
  { key: 'due_date',            label: 'Due Date',            width: 'w-[90px]' },
  { key: 'sla',                 label: 'SLA',                 width: 'w-[80px]' },
  { key: 'status',              label: 'Current Status',      width: 'w-[110px]' },
  { key: 'updated_at',          label: 'Updated At',          width: 'w-[100px]' },
  { key: 'action',              label: 'Action',              width: 'w-[80px]' },
];

interface Investigation {
  id: string;
  type?: string;
  detection_source?: string;
  product?: string;
  supplier?: string;
  brand?: string;
  brand_auth?: string;
  product_identity?: number;
  packaging_match?: number;
  gtin?: string;
  serial_batch?: string;
  evidence_status?: string;
  publication_status?: string;
  restriction_status?: string;
  risk_level?: string;
  severity?: string;
  investigator?: string;
  due_date?: string;
  sla?: number;
  sla_breached?: boolean;
  status?: string;
  updated_at?: string;
}

interface AuthenticityInvestigationTableProps {
  data?: Investigation[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (p: number) => void;
  onPageSizeChange?: (s: number) => void;
  loading?: boolean;
}

export function AuthenticityInvestigationTable({
  data = [],
  total = 0,
  page = 1,
  pageSize = 25,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: AuthenticityInvestigationTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pctVariant = (v?: number) => {
    if (v == null) return 'gray';
    if (v >= 90) return 'green';
    if (v >= 60) return 'amber';
    return 'red';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {/* Table header label */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Authenticity Investigation Portfolio
        </h3>
        <span className="text-[11px] text-gray-400">{total.toLocaleString()} records</span>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: '2600px' }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${col.width}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-[#7a0023] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-gray-400">Loading investigations...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-gray-400">No investigations found</span>
                    <span className="text-[11px] text-gray-300">Investigations will appear here once data is available.</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  {/* ID */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <a href={`#inv-${row.id}`} className="text-[11px] font-bold text-[#7a0023] underline-offset-2 hover:underline whitespace-nowrap">
                      {row.id}
                    </a>
                  </td>
                  {/* Investigation Type */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-700 whitespace-nowrap">{row.type ?? '—'}</span>
                  </td>
                  {/* Detection Source */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <Pill value={row.detection_source ?? '—'} />
                  </td>
                  {/* Product */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-800 font-medium truncate block max-w-[140px]">{row.product ?? '—'}</span>
                  </td>
                  {/* Supplier */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600 truncate block max-w-[110px]">{row.supplier ?? '—'}</span>
                  </td>
                  {/* Brand */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600">{row.brand ?? '—'}</span>
                  </td>
                  {/* Brand Auth */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusBadge status={row.brand_auth ?? '—'} />
                  </td>
                  {/* Product Identity */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <Pill value={row.product_identity != null ? `${row.product_identity}%` : '—'} variant={pctVariant(row.product_identity)} />
                  </td>
                  {/* Packaging Match */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <Pill value={row.packaging_match != null ? `${row.packaging_match}%` : '—'} variant={pctVariant(row.packaging_match)} />
                  </td>
                  {/* GTIN */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[10px] font-mono text-gray-600">{row.gtin ?? '—'}</span>
                  </td>
                  {/* Serial/Batch */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[10px] font-mono text-gray-600">{row.serial_batch ?? '—'}</span>
                  </td>
                  {/* Evidence Status */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusBadge status={row.evidence_status ?? '—'} />
                  </td>
                  {/* Publication Status */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusBadge status={row.publication_status ?? '—'} />
                  </td>
                  {/* Restriction Status */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusBadge status={row.restriction_status ?? '—'} />
                  </td>
                  {/* Risk Level */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <RiskBadge level={row.risk_level ?? '—'} />
                  </td>
                  {/* Severity */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <RiskBadge level={row.severity ?? '—'} />
                  </td>
                  {/* Investigator */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600 whitespace-nowrap">{row.investigator ?? '—'}</span>
                  </td>
                  {/* Due Date */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600 whitespace-nowrap">{row.due_date ?? '—'}</span>
                  </td>
                  {/* SLA */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <SlaIndicator percentage={row.sla ?? 0} breached={row.sla_breached} />
                  </td>
                  {/* Current Status */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusBadge status={row.status ?? 'New'} />
                  </td>
                  {/* Updated At */}
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{row.updated_at ?? '—'}</span>
                  </td>
                  {/* Action */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-[#7a0023] transition-colors" title="View">
                        <Eye size={13} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors" title="More">
                        <MoreHorizontal size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        onPageChange={onPageChange ?? (() => {})}
        onPageSizeChange={onPageSizeChange ?? (() => {})}
      />
    </div>
  );
}
