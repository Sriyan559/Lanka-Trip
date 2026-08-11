import React, { useState } from 'react';
import { Eye, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import type { RecallIncident } from './recallSafetyMock';

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_CLS: Record<string, string> = {
  'Active Recall':            'bg-red-100 text-red-800 border border-red-200',
  'Safety Advisory':          'bg-blue-100 text-blue-800 border border-blue-200',
  'Quarantine':               'bg-purple-100 text-purple-800 border border-purple-200',
  'Investigating':            'bg-amber-100 text-amber-800 border border-amber-200',
  'Recovering':               'bg-teal-100 text-teal-800 border border-teal-200',
  'Resolved':                 'bg-green-100 text-green-800 border border-green-200',
  'Closed':                   'bg-gray-100 text-gray-600 border border-gray-200',
  'Pending':                  'bg-yellow-100 text-yellow-800 border border-yellow-200',
  'Notified':                 'bg-sky-100 text-sky-800 border border-sky-200',
};

function StatusPill({ label }: { label: string }) {
  const cls = STATUS_CLS[label] ?? 'bg-gray-100 text-gray-600 border border-gray-200';
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${cls}`}>
      {label}
    </span>
  );
}

// ── Recall class badge ────────────────────────────────────────────────────────
const CLASS_CLS: Record<string, string> = {
  'Class I':                'bg-red-100 text-red-800 border border-red-300',
  'Class II':               'bg-orange-100 text-orange-800 border border-orange-300',
  'Class III':              'bg-amber-100 text-amber-800 border border-amber-300',
  'Safety Advisory':        'bg-blue-100 text-blue-800 border border-blue-300',
  'Market Withdrawal':      'bg-sky-100 text-sky-800 border border-sky-300',
  'Batch-Level Quarantine': 'bg-purple-100 text-purple-800 border border-purple-300',
};

function ClassBadge({ cls }: { cls: string }) {
  const style = CLASS_CLS[cls] ?? 'bg-gray-100 text-gray-600 border border-gray-200';
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${style}`}>
      {cls}
    </span>
  );
}

// ── SLA pill ──────────────────────────────────────────────────────────────────
function SlaPill({ sla, breached }: { sla: string; breached?: boolean }) {
  const cls = breached
    ? 'bg-red-50 text-red-700 font-bold'
    : 'bg-green-50 text-green-700 font-semibold';
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${cls}`}>{sla}</span>
  );
}

// ── Recovery rate bar ─────────────────────────────────────────────────────────
function RecoveryBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#dc2626';
  return (
    <div className="flex items-center gap-1.5 min-w-[60px]">
      <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold flex-shrink-0" style={{ color }}>{pct}%</span>
    </div>
  );
}

// ── Table columns ─────────────────────────────────────────────────────────────
const COLUMNS = [
  { key: 'id',                   label: 'Case / Recall ID',       width: 'w-[130px]' },
  { key: 'type',                 label: 'Type',                   width: 'w-[110px]' },
  { key: 'recallClass',          label: 'Recall Class',           width: 'w-[120px]' },
  { key: 'detectionSource',      label: 'Detection Source',       width: 'w-[110px]' },
  { key: 'product',              label: 'Product / SKU',          width: 'w-[160px]' },
  { key: 'supplier',             label: 'Supplier',               width: 'w-[120px]' },
  { key: 'brand',                label: 'Brand',                  width: 'w-[100px]' },
  { key: 'affectedBatches',      label: 'Affected Batches',       width: 'w-[80px]' },
  { key: 'inventoryUnits',       label: 'Inventory Units',        width: 'w-[80px]' },
  { key: 'ordersAffected',       label: 'Orders Affected',        width: 'w-[80px]' },
  { key: 'customersAffected',    label: 'Customers Affected',     width: 'w-[80px]' },
  { key: 'notificationStatus',   label: 'Notification Status',    width: 'w-[100px]' },
  { key: 'supplierResponse',     label: 'Supplier Response',      width: 'w-[100px]' },
  { key: 'customerNotification', label: 'Customer Notification',  width: 'w-[100px]' },
  { key: 'regulatoryStatus',     label: 'Regulatory Status',      width: 'w-[100px]' },
  { key: 'recoveryRate',         label: 'Recovery Rate',          width: 'w-[90px]' },
  { key: 'incidentOwner',        label: 'Incident Owner',         width: 'w-[110px]' },
  { key: 'dueDate',              label: 'Due Date',               width: 'w-[90px]' },
  { key: 'sla',                  label: 'SLA',                    width: 'w-[70px]' },
  { key: 'status',               label: 'Status',                 width: 'w-[110px]' },
  { key: 'actions',              label: 'Actions',                width: 'w-[70px]' },
];

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({
  page, pageSize, total, totalPages,
  onPageChange, onPageSizeChange,
}: {
  page: number; pageSize: number; total: number; totalPages: number;
  onPageChange: (p: number) => void; onPageSizeChange: (s: number) => void;
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, total);

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-gray-500">
          Showing <b className="text-gray-800">{from}</b> to{' '}
          <b className="text-gray-800">{to}</b> of{' '}
          <b className="text-gray-800">{total}</b> entries
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700"
        >
          {[10, 25, 50, 100].map((s) => <option key={s} value={s}>{s} / page</option>)}
        </select>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}
          className="p-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, idx) =>
          p === '...'
            ? <span key={`el-${idx}`} className="px-2 text-[11px] text-gray-400">...</span>
            : <button key={p} onClick={() => onPageChange(p as number)}
                className={`min-w-[26px] h-6 rounded text-[11px] font-semibold transition-colors ${p === page ? 'bg-[#7a0023] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {p}
              </button>
        )}
        <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}
          className="p-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Main table component ──────────────────────────────────────────────────────
interface IncidentPortfolioTableProps {
  data?: RecallIncident[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (p: number) => void;
  onPageSizeChange?: (s: number) => void;
  loading?: boolean;
}

export function IncidentPortfolioTable({
  data = [],
  total = 0,
  page = 1,
  pageSize = 25,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: IncidentPortfolioTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Recall &amp; Safety Incident Portfolio
        </h3>
        <span className="text-[11px] text-gray-400">{total.toLocaleString()} records</span>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: '2400px' }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {COLUMNS.map((col) => (
                <th key={col.key}
                  className={`px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${col.width}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-[#7a0023] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-gray-400">Loading incidents...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-14 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-gray-400">No recall or safety incidents found</span>
                    <span className="text-[11px] text-gray-300">Incidents will appear here once data is available from the API.</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <a href="#" className="text-[11px] font-bold text-[#7a0023] hover:underline whitespace-nowrap">{row.id}</a>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-700">{row.type}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <ClassBadge cls={row.recallClass} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600">{row.detectionSource}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium text-gray-800 truncate max-w-[150px]">{row.product}</span>
                      <span className="text-[10px] font-mono text-gray-400">{row.sku}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600 truncate block max-w-[110px]">{row.supplier}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600">{row.brand}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100 text-right">
                    <span className="text-[11px] font-semibold text-gray-900">{row.affectedBatches}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100 text-right">
                    <span className="text-[11px] font-semibold text-gray-900">{row.inventoryUnits.toLocaleString()}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100 text-right">
                    <span className="text-[11px] font-semibold text-gray-900">{row.ordersAffected}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100 text-right">
                    <span className="text-[11px] font-semibold text-gray-900">{row.customersAffected}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusPill label={row.notificationStatus} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusPill label={row.supplierResponse} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusPill label={row.customerNotification} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusPill label={row.regulatoryStatus} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <RecoveryBar pct={row.recoveryRate} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600 whitespace-nowrap">{row.incidentOwner}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <span className="text-[11px] text-gray-600 whitespace-nowrap">{row.dueDate}</span>
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <SlaPill sla={row.sla} breached={row.slaBreached} />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-100">
                    <StatusPill label={row.status} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button aria-label="View incident" className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-[#7a0023] transition-colors">
                        <Eye size={13} />
                      </button>
                      <div className="relative">
                        <button
                          aria-label="More actions"
                          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                          onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                        >
                          <MoreHorizontal size={13} />
                        </button>
                        {openMenu === row.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[140px]">
                            {['View Details', 'Edit', 'Escalate', 'Quarantine', 'Close'].map((action) => (
                              <button key={action}
                                onClick={() => setOpenMenu(null)}
                                className="block w-full text-left px-3 py-1.5 text-[11px] text-gray-700 hover:bg-gray-50">
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
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
