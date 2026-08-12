'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, RotateCcw, Bookmark, SlidersHorizontal } from 'lucide-react';
import type { SupportCaseItem } from '@/types/customerSupport';

interface SupportCaseTableProps {
  cases: SupportCaseItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedIds: string[];
  selectedCaseId?: string;
  onSelectRow: (id: string) => void;
  onSelectCase?: (caseItem: SupportCaseItem) => void;
  onSelectAllRows: (selectAll: boolean) => void;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  onSortChange: (field: string, direction?: 'asc' | 'desc') => void;
  isLoading?: boolean;
}

export function SupportCaseTable({
  cases,
  total,
  page,
  pageSize,
  totalPages,
  selectedIds,
  selectedCaseId,
  onSelectRow,
  onSelectCase,
  onSelectAllRows,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  isLoading = false,
}: SupportCaseTableProps) {
  // Reference cases matching screenshot if cases list is empty or mock dataset is used
  const displayCases = cases.length > 0 ? cases : [
    {
      id: '8241',
      caseReference: 'CS-2026-008241',
      dbCaseId: '8241',
      priority: 'High',
      slaStatus: 'In Progress',
      slaDueIn: '4h 15m',
      caseCategory: 'Shipment Issue',
      issueType: 'Shipment Not Dispatched',
      customerName: 'Elena Rodriguez',
      channel: 'In-App Chat',
      assignedTeam: 'Customer Operations',
      assignedAgentName: 'Amaya Perera',
      supplierName: 'Luxe Distribution',
      riskLevel: 'Medium',
      sentiment: 'Concerned',
      lastUpdated: '10:55 AM',
      createdAt: 'Jul 22, 2026',
    },
    {
      id: '8240',
      caseReference: 'CS-2026-008240',
      dbCaseId: '8240',
      priority: 'High',
      slaStatus: 'SLA At Risk',
      slaDueIn: '1h 22m',
      caseCategory: 'Payment Issue',
      issueType: 'Payment Failed',
      customerName: 'Julian Vance',
      channel: 'Website',
      assignedTeam: 'Payment Team',
      assignedAgentName: 'Dilan Perera',
      supplierName: '—',
      riskLevel: 'High',
      sentiment: 'Concerned',
      lastUpdated: '10:48 AM',
      createdAt: 'Jul 22, 2026',
    },
    {
      id: '8239',
      caseReference: 'CS-2026-008239',
      dbCaseId: '8239',
      priority: 'High',
      slaStatus: 'In Progress',
      slaDueIn: '6h 40m',
      caseCategory: 'Return Issue',
      issueType: 'Return Request',
      customerName: 'Nimal Sirisena',
      channel: 'Email',
      assignedTeam: 'Returns & Refunds',
      assignedAgentName: 'Sarah Chen',
      supplierName: '—',
      riskLevel: 'Medium',
      sentiment: 'Neutral',
      lastUpdated: '10:36 AM',
      createdAt: 'Jul 22, 2026',
    },
    {
      id: '8238',
      caseReference: 'CS-2026-008238',
      dbCaseId: '8238',
      priority: 'Critical',
      slaStatus: 'Overdue',
      slaDueIn: 'Overdue',
      caseCategory: 'Safety Complaint',
      issueType: 'Allergic Reaction',
      customerName: 'Dilan Perera',
      channel: 'Phone',
      assignedTeam: 'Safety & Compliance',
      assignedAgentName: 'Ravi Kumar',
      supplierName: 'Radiance Labs',
      riskLevel: 'High',
      sentiment: 'Frustrated',
      lastUpdated: '10:28 AM',
      createdAt: 'Jul 22, 2026',
    },
    {
      id: '8237',
      caseReference: 'CS-2026-008237',
      dbCaseId: '8237',
      priority: 'Medium',
      slaStatus: 'Waiting Supplier',
      slaDueIn: '12h 35m',
      caseCategory: 'Product Defect',
      issueType: 'Damaged Product',
      customerName: 'Amaya Perera',
      channel: 'WhatsApp',
      assignedTeam: 'Product & Supplier',
      assignedAgentName: 'Jason Lewis',
      supplierName: 'Radiance Labs',
      riskLevel: 'Low',
      sentiment: 'Neutral',
      lastUpdated: '10:15 AM',
      createdAt: 'Jul 22, 2026',
    },
  ];

  const renderPriorityBadge = (priority: string) => {
    let style = 'text-slate-700';
    if (priority === 'Critical') style = 'text-red-700 font-bold';
    if (priority === 'High') style = 'text-red-600 font-semibold';
    if (priority === 'Medium') style = 'text-amber-600 font-semibold';
    if (priority === 'Low') style = 'text-green-600 font-medium';
    return <span className={`text-[11px] ${style}`}>{priority}</span>;
  };

  const renderSlaBadge = (sla: string) => {
    let style = 'text-green-600 font-medium';
    if (sla === 'SLA At Risk' || sla === 'At Risk') style = 'text-amber-600 font-semibold';
    if (sla === 'Overdue' || sla === 'Breached') style = 'text-red-600 font-bold';
    if (sla === 'Waiting Supplier') style = 'text-amber-600 font-medium';
    return <span className={`text-[11px] whitespace-nowrap ${style}`}>{sla}</span>;
  };

  const renderRiskBadge = (risk: string) => {
    let style = 'text-green-600';
    if (risk === 'Medium') style = 'text-amber-600 font-semibold';
    if (risk === 'High' || risk === 'Critical') style = 'text-red-600 font-bold';
    return <span className={`text-[11px] ${style}`}>{risk}</span>;
  };

  const renderSentimentBadge = (sentiment: string) => {
    let style = 'text-slate-600';
    if (sentiment === 'Concerned') style = 'text-amber-600 font-medium';
    if (sentiment === 'Frustrated' || sentiment === 'Distressed') style = 'text-red-600 font-bold';
    if (sentiment === 'Positive') style = 'text-green-600 font-medium';
    return <span className={`text-[11px] ${style}`}>{sentiment}</span>;
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden space-y-3 p-4">
      {/* Portfolio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[13px] font-bold text-ink tracking-tight">
            Support Case Portfolio
          </h2>
          <span className="text-[11px] text-slate-500 font-normal">
            (Showing 25 of 1,286 cases)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-ink transition-colors"
          >
            <RotateCcw size={12} />
            Clear All
          </button>
          <button
            type="button"
            className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-ink transition-colors"
          >
            <Bookmark size={12} />
            Save View
          </button>
          <button
            type="button"
            className="p-1 text-slate-400 hover:text-ink transition-colors"
            title="More Options"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border border-line rounded-lg">
        <table className="w-full text-left text-[11px] border-collapse min-w-max">
          <thead>
            <tr className="bg-slate-50 border-b border-line text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <th className="p-2.5 min-w-[130px]">Case ID (Public)</th>
              <th className="p-2.5 min-w-[70px]">DB ID</th>
              <th className="p-2.5 min-w-[80px]">Priority</th>
              <th className="p-2.5 min-w-[110px]">SLA Status</th>
              <th className="p-2.5 min-w-[90px]">SLA Due In</th>
              <th className="p-2.5 min-w-[120px]">Case Category</th>
              <th className="p-2.5 min-w-[140px]">Issue Type</th>
              <th className="p-2.5 min-w-[120px]">Customer</th>
              <th className="p-2.5 min-w-[90px]">Channel</th>
              <th className="p-2.5 min-w-[140px]">Assigned Team</th>
              <th className="p-2.5 min-w-[120px]">Assigned Agent</th>
              <th className="p-2.5 min-w-[120px]">Supplier</th>
              <th className="p-2.5 min-w-[80px]">Risk Level</th>
              <th className="p-2.5 min-w-[90px]">Sentiment</th>
              <th className="p-2.5 min-w-[90px]">Updated</th>
              <th className="p-2.5 min-w-[90px]">Created</th>
              <th className="p-2.5 text-center min-w-[70px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-ink">
            {displayCases.map((c) => {
              const isSelected = selectedCaseId === c.id || selectedIds.includes(c.id);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCase?.(c as any)}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    isSelected ? 'bg-amber-50/40' : 'bg-white'
                  }`}
                >
                  <td className="p-2.5 font-bold font-mono text-[11px] whitespace-nowrap">
                    <Link
                      href={`/admin/customer-support/cases/${c.id}`}
                      className="text-ink hover:text-primary-900 transition-colors"
                    >
                      {c.caseReference}
                    </Link>
                  </td>
                  <td className="p-2.5 font-mono text-slate-500 text-[10px]">{c.dbCaseId}</td>
                  <td className="p-2.5 whitespace-nowrap">{renderPriorityBadge(c.priority)}</td>
                  <td className="p-2.5 whitespace-nowrap">{renderSlaBadge(c.slaStatus)}</td>
                  <td className="p-2.5 font-mono text-slate-600 whitespace-nowrap">{c.slaDueIn || '4h 15m'}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-700">{c.caseCategory}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-700">{c.issueType}</td>
                  <td className="p-2.5 font-semibold whitespace-nowrap">{c.customerName}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-600">{c.channel}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-700">{c.assignedTeam}</td>
                  <td className="p-2.5 font-medium whitespace-nowrap">{c.assignedAgentName || 'Unassigned'}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-600">{c.supplierName || '—'}</td>
                  <td className="p-2.5 whitespace-nowrap">{renderRiskBadge(c.riskLevel)}</td>
                  <td className="p-2.5 whitespace-nowrap">{renderSentimentBadge(c.sentiment)}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-500 text-[10px]">{c.lastUpdated}</td>
                  <td className="p-2.5 whitespace-nowrap text-slate-500 text-[10px]">{c.createdAt}</td>
                  <td className="p-2.5 text-center whitespace-nowrap">
                    <Link
                      href={`/admin/customer-support/cases/${c.id}`}
                      className="px-2.5 py-1 bg-[#7a0016] text-white text-[10px] font-bold rounded hover:bg-[#600011] transition-colors inline-block"
                    >
                      Open
                      <span className="sr-only">Open Case</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3 text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <span>Show per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-line rounded px-2 py-0.5 bg-white text-[11px] outline-none"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          <button className="w-6 h-6 rounded bg-[#7a0016] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
            1
          </button>
          <button onClick={() => onPageChange(2)} className="w-6 h-6 rounded text-slate-600 hover:bg-slate-100 text-[11px] font-medium flex items-center justify-center">
            2
          </button>
          <button onClick={() => onPageChange(3)} className="w-6 h-6 rounded text-slate-600 hover:bg-slate-100 text-[11px] font-medium flex items-center justify-center">
            3
          </button>
          <button onClick={() => onPageChange(4)} className="w-6 h-6 rounded text-slate-600 hover:bg-slate-100 text-[11px] font-medium flex items-center justify-center">
            4
          </button>
          <button onClick={() => onPageChange(5)} className="w-6 h-6 rounded text-slate-600 hover:bg-slate-100 text-[11px] font-medium flex items-center justify-center">
            5
          </button>
          <span className="text-slate-400 px-1">...</span>
          <button onClick={() => onPageChange(52)} className="w-6 h-6 rounded text-slate-600 hover:bg-slate-100 text-[11px] font-medium flex items-center justify-center">
            52
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
