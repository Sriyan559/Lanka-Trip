'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  User,
} from 'lucide-react';
import type { SupportCaseItem, SupportPriority, SupportCaseStatus, CustomerSentiment, CaseRiskLevel, SlaStatus } from '@/types/customerSupport';

interface SupportCaseTableProps {
  cases: SupportCaseItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAllRows: (selectAll: boolean) => void;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  onSortChange: (field: string, direction?: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  currentQueueUrl?: string;
  isLoading?: boolean;
}

export function SupportCaseTable({
  cases,
  total,
  page,
  pageSize,
  totalPages,
  selectedIds,
  onSelectRow,
  onSelectAllRows,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  currentQueueUrl = '/admin/customer-support/cases',
  isLoading = false,
}: SupportCaseTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (openDropdownId && !target.closest('.action-dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  const allSelected = cases.length > 0 && cases.every((c) => selectedIds.includes(c.id));
  const someSelected = cases.some((c) => selectedIds.includes(c.id)) && !allSelected;

  const renderPriorityBadge = (priority: SupportPriority) => {
    const map: Record<SupportPriority, string> = {
      Low: 'text-slate-500',
      Normal: 'text-slate-700',
      High: 'text-amber-600',
      Urgent: 'text-orange-600 font-bold',
      Critical: 'text-red-600 font-bold',
    };
    const color = map[priority] || map.Normal;
    return <span className={`text-[12px] font-semibold ${color}`}>{priority}</span>;
  };

  const renderStatusBadge = (status: SupportCaseStatus) => {
    const map: Record<string, string> = {
      Open: 'text-blue-600',
      'In Progress': 'text-sky-600',
      'Waiting for Customer': 'text-purple-600',
      'Waiting for Supplier': 'text-amber-600',
      'Waiting for Logistics': 'text-teal-600',
      'Waiting for Finance': 'text-orange-600',
      Escalated: 'text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded',
      Resolved: 'text-green-600',
      Closed: 'text-slate-500',
      Reopened: 'text-rose-600',
    };
    const color = map[status] || map.Open;
    return <span className={`text-[12px] font-medium whitespace-nowrap ${color}`}>{status}</span>;
  };

  const renderSentimentBadge = (sentiment: CustomerSentiment) => {
    const map: Record<CustomerSentiment, string> = {
      Positive: 'text-green-600',
      Neutral: 'text-slate-500',
      Concerned: 'text-amber-600',
      Frustrated: 'text-orange-600',
      Distressed: 'text-red-600 font-bold',
    };
    const color = map[sentiment] || map.Neutral;
    return <span className={`text-[12px] font-medium ${color}`}>{sentiment}</span>;
  };

  const renderRiskBadge = (risk: CaseRiskLevel) => {
    const map: Record<CaseRiskLevel, string> = {
      Low: 'text-green-600',
      Medium: 'text-amber-600',
      High: 'text-red-500 font-bold',
      Critical: 'text-red-700 font-bold',
    };
    const color = map[risk] || map.Low;
    return <span className={`text-[12px] ${color}`}>{risk}</span>;
  };

  const renderSlaBadge = (sla: SlaStatus) => {
    const map: Record<string, string> = {
      'Within Target': 'text-green-600',
      '4 Hours Remaining': 'text-amber-600 font-bold',
      'At Risk': 'text-orange-600 font-bold',
      Breached: 'text-red-600 font-bold',
      Completed: 'text-green-600',
    };
    const color = map[sla] || map['Within Target'];
    return <span className={`text-[12px] whitespace-nowrap ${color}`}>{sla}</span>;
  };

  const startRow = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endRow = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col border border-line rounded-lg bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px] border-collapse min-w-max">
          <thead>
            <tr className="bg-slate-50 border-b border-line text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-3 w-10 sticky left-0 bg-slate-50 z-20 border-r border-line text-center shadow-[1px_0_0_0_#e5e7eb]">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAllRows(e.target.checked)}
                  className="rounded border-slate-300 text-primary-900 focus:ring-primary-900 cursor-pointer"
                />
              </th>
              <th
                onClick={() => onSortChange('caseReference')}
                className="p-3 cursor-pointer hover:bg-slate-100 sticky left-10 bg-slate-50 z-20 border-r border-line shadow-[1px_0_0_0_#e5e7eb] min-w-[130px]"
              >
                <div className="flex items-center justify-between">
                  <span>Case Reference</span>
                  <ArrowUpDown size={12} className="text-slate-400" />
                </div>
              </th>
              <th className="p-3 min-w-[80px]">DB Case ID</th>
              <th onClick={() => onSortChange('priority')} className="p-3 cursor-pointer hover:bg-slate-100 min-w-[90px]">
                <div className="flex items-center gap-1">
                  <span>Priority</span>
                  <ArrowUpDown size={12} className="text-slate-400" />
                </div>
              </th>
              <th onClick={() => onSortChange('caseStatus')} className="p-3 cursor-pointer hover:bg-slate-100 min-w-[150px]">
                <div className="flex items-center gap-1">
                  <span>Case Status</span>
                  <ArrowUpDown size={12} className="text-slate-400" />
                </div>
              </th>
              <th className="p-3 min-w-[130px]">Customer</th>
              <th className="p-3 min-w-[130px]">Customer ID</th>
              <th className="p-3 min-w-[130px]">Case Category</th>
              <th className="p-3 min-w-[160px]">Issue Type</th>
              <th className="p-3 min-w-[100px]">Channel</th>
              <th className="p-3 min-w-[200px]">Subject</th>
              <th className="p-3 min-w-[130px]">Related Order</th>
              <th className="p-3 min-w-[130px]">Related Return</th>
              <th className="p-3 min-w-[130px]">Related Shipment</th>
              <th className="p-3 min-w-[160px]">Related Product</th>
              <th className="p-3 min-w-[150px]">Supplier</th>
              <th className="p-3 min-w-[100px]">Sentiment</th>
              <th className="p-3 min-w-[90px]">Risk Level</th>
              <th className="p-3 min-w-[130px]">SLA Status</th>
              <th className="p-3 min-w-[130px]">First Response Due</th>
              <th className="p-3 min-w-[130px]">Resolution Due</th>
              <th className="p-3 min-w-[140px]">Assigned Team/Agent</th>
              <th className="p-3 min-w-[200px]">Last Customer Message</th>
              <th className="p-3 min-w-[120px]">Last Updated</th>
              <th className="p-3 sticky right-0 bg-slate-50 z-20 border-l border-line text-center min-w-[110px] shadow-[-1px_0_0_0_#e5e7eb]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-ink">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse bg-white">
                  <td colSpan={25} className="p-4 text-center text-slate-400">Loading cases...</td>
                </tr>
              ))
            ) : cases.length === 0 ? (
              <tr className="bg-white">
                <td colSpan={25} className="p-10 text-center text-slate-500">
                  <div className="max-w-md mx-auto py-6">
                    <User className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700">No support cases found</p>
                  </div>
                </td>
              </tr>
            ) : (
              cases.map((c) => {
                const isSelected = selectedIds.includes(c.id);
                const detailUrl = `/admin/customer-support/cases/${c.id}?returnTo=${encodeURIComponent(currentQueueUrl)}`;

                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50 transition-colors bg-white ${
                      isSelected ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="p-3 sticky left-0 bg-white z-10 border-r border-line text-center group-hover:bg-slate-50 shadow-[1px_0_0_0_#e5e7eb]">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow(c.id)}
                        className="rounded border-slate-300 text-primary-900 focus:ring-primary-900 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 font-bold text-[12px] sticky left-10 bg-white z-10 border-r border-line group-hover:bg-slate-50 whitespace-nowrap shadow-[1px_0_0_0_#e5e7eb]">
                      <Link href={detailUrl} className="text-ink hover:text-primary-900 transition-colors">
                        {c.caseReference}
                      </Link>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">{c.dbCaseId}</td>
                    <td className="p-3 whitespace-nowrap">{renderPriorityBadge(c.priority)}</td>
                    <td className="p-3 whitespace-nowrap">{renderStatusBadge(c.caseStatus)}</td>
                    <td className="p-3 font-semibold whitespace-nowrap">{c.customerName}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">{c.customerId}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">{c.caseCategory}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">{c.issueType}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">{c.channel}</td>
                    <td className="p-3 max-w-[200px] truncate text-slate-700" title={c.subject}>{c.subject}</td>
                    
                    <td className="p-3 whitespace-nowrap text-[12px] font-medium text-ink">
                      {c.relatedOrderReference ? c.relatedOrderReference : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="p-3 whitespace-nowrap text-[12px] font-medium text-ink">
                      {c.relatedReturnReference ? c.relatedReturnReference : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="p-3 whitespace-nowrap text-[12px] font-medium text-ink">
                      {c.relatedShipmentReference ? c.relatedShipmentReference : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="p-3 max-w-[160px] truncate text-slate-700" title={c.relatedProductName}>
                      {c.relatedProductName || <span className="text-slate-300">-</span>}
                    </td>
                    <td className="p-3 max-w-[150px] truncate text-slate-700" title={c.supplierName}>
                      {c.supplierName || <span className="text-slate-300">-</span>}
                    </td>
                    
                    <td className="p-3 whitespace-nowrap">{renderSentimentBadge(c.sentiment)}</td>
                    <td className="p-3 whitespace-nowrap">{renderRiskBadge(c.riskLevel)}</td>
                    <td className="p-3 whitespace-nowrap">{renderSlaBadge(c.slaStatus)}</td>
                    
                    <td className="p-3 whitespace-nowrap text-slate-600">{c.firstResponseDue}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">{c.resolutionDue}</td>
                    
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-semibold">{c.assignedAgentName || 'Unassigned'}</span>
                        {c.assignedTeam && <span className="text-[10px] text-slate-500">{c.assignedTeam}</span>}
                      </div>
                    </td>
                    
                    <td className="p-3 max-w-[200px] truncate text-slate-600" title={c.lastCustomerMessage}>
                      &quot;{c.lastCustomerMessage}&quot;
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-500">{c.lastUpdated}</td>
                    
                    <td className="p-3 sticky right-0 bg-white z-10 border-l border-line text-center group-hover:bg-slate-50 shadow-[-1px_0_0_0_#e5e7eb] flex items-center justify-center gap-1 action-dropdown-container">
                      <Link
                        href={detailUrl}
                        className="bg-primary-900 text-white text-[11px] font-bold px-3 py-1.5 rounded hover:bg-primary-800 transition-colors whitespace-nowrap shadow-sm"
                      >
                        Open Case
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border-t border-line gap-4">
        <div className="text-[13px] text-slate-600">
          Showing <strong className="text-ink">{startRow}</strong> to <strong className="text-ink">{endRow}</strong> of{' '}
          <strong className="text-ink">{total > 0 ? (total === 1286 ? '1,286' : total.toLocaleString()) : '0'}</strong> cases
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <span>Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-line rounded px-2 py-1 bg-white outline-none focus:border-primary-900"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              const pNum = idx + 1;
              const isCurrent = pNum === page;
              return (
                <button
                  key={pNum}
                  onClick={() => onPageChange(pNum)}
                  className={`w-7 h-7 rounded text-[13px] font-medium flex items-center justify-center transition-colors ${
                    isCurrent ? 'bg-primary-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="text-slate-400 px-1">...</span>
                <button
                  onClick={() => onPageChange(totalPages)}
                  className={`w-7 h-7 rounded text-[13px] font-medium flex items-center justify-center transition-colors ${
                    page === totalPages ? 'bg-primary-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
