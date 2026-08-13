"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, MoreVertical, Eye, ShieldCheck, UserX, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface VerificationPortfolioTableProps {
  verifications: any[];
  totalCount: number;
  selectedVerificationId: string | null;
  onSelectVerification: (id: string) => void;
  selectedRowIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAllOnPage: () => void;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  showToast: (msg: string, type?: "success" | "info" | "warning" | "error") => void;
  onActionClick: (action: "verify" | "reject" | "evidence", id: string) => void;
}

export function VerificationPortfolioTable({
  verifications,
  totalCount,
  selectedVerificationId,
  onSelectVerification,
  selectedRowIds,
  onSelectRow,
  onSelectAllOnPage,
  sortColumn,
  sortDirection,
  onSort,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  showToast,
  onActionClick
}: VerificationPortfolioTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelectedOnPage = verifications.length > 0 && verifications.every((v) => selectedRowIds.includes(v.id.toString()));
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const renderSortHeader = (label: string, columnKey: string) => {
    const isSorted = sortColumn === columnKey;
    return (
      <th
        onClick={() => onSort(columnKey)}
        className="px-2.5 py-2 text-left text-[10px] font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          {isSorted ? (
            sortDirection === "asc" ? (
              <ChevronUp size={12} className="text-[#671021]" />
            ) : (
              <ChevronDown size={12} className="text-[#671021]" />
            )
          ) : (
            <ChevronDown size={10} className="text-slate-300" />
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="bg-white border border-line rounded-b-lg shadow-sm flex flex-col justify-between overflow-hidden">
      <div className="px-4 py-2 border-b border-line bg-slate-50/50 flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
          Verification Portfolio <span className="text-slate-400 font-normal font-sans">(Showing 1 to {verifications.length} of {totalCount})</span>
        </h3>
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-50 border-b border-line">
              <th className="px-3 py-2 w-8 text-center">
                <input
                  type="checkbox"
                  checked={allSelectedOnPage}
                  onChange={onSelectAllOnPage}
                  className="rounded border-slate-300 text-[#671021] focus:ring-[#671021]"
                />
              </th>
              {renderSortHeader("Verification ID", "id")}
              {renderSortHeader("Customer", "user_id")}
              {renderSortHeader("Verif. Type", "verification_type")}
              {renderSortHeader("Level", "verification_level")}
              {renderSortHeader("Email Status", "email_status")}
              {renderSortHeader("Phone Status", "phone_status")}
              {renderSortHeader("Identity Doc", "document_type")}
              {renderSortHeader("Doc Status", "document_status")}
              {renderSortHeader("Authenticity", "authenticity_status")}
              {renderSortHeader("Address Status", "address_status")}
              {renderSortHeader("Evidence", "evidence_completeness")}
              {renderSortHeader("Duplicate Risk", "duplicate_risk_level")}
              {renderSortHeader("Current Stage", "current_stage")}
              {renderSortHeader("Reviewer", "reviewer_id")}
              {renderSortHeader("SLA", "sla_percentage")}
              {renderSortHeader("Decision Status", "verification_status")}
              <th className="px-2.5 py-2 text-right text-[10px] font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-sans">
            {verifications.length === 0 ? (
              <tr>
                <td colSpan={18} className="py-12 text-center text-slate-400 font-mono text-[12px]">
                  —
                </td>
              </tr>
            ) : (
              verifications.map((v) => {
                const idStr = v.id.toString();
                const isSelectedRow = selectedVerificationId === idStr;
                const isChecked = selectedRowIds.includes(idStr);

                return (
                  <tr
                    key={v.id}
                    onClick={() => onSelectVerification(idStr)}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${isSelectedRow ? "bg-red-50/20" : ""}`}
                  >
                    <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onSelectRow(idStr)}
                        className="rounded border-slate-300 text-[#671021] focus:ring-[#671021]"
                      />
                    </td>
                    <td className="px-2.5 py-2 font-mono font-semibold text-slate-700 whitespace-nowrap">VERIF-{v.id.toString().padStart(6, '0')}</td>
                    <td className="px-2.5 py-2 font-bold text-ink whitespace-nowrap">
                      {v.user?.name || '—'}
                    </td>
                    <td className="px-2.5 py-2 text-slate-600 whitespace-nowrap">{v.verification_type || '—'}</td>
                    <td className="px-2.5 py-2 text-slate-600 whitespace-nowrap">{v.verification_level || '—'}</td>
                    
                    <td className="px-2.5 py-2 whitespace-nowrap">
                      {v.user?.email_verified_at ? <span className="text-emerald-600 font-bold">Verified</span> : <span className="text-amber-600">Pending</span>}
                    </td>
                    <td className="px-2.5 py-2 whitespace-nowrap">{v.phone_status || '—'}</td>
                    <td className="px-2.5 py-2 whitespace-nowrap">{v.document_type || '—'}</td>
                    
                    <td className="px-2.5 py-2 whitespace-nowrap">
                      {v.document_status === 'expired' ? <span className="text-rose-600">Expired</span> : (v.document_status || '—')}
                    </td>
                    <td className="px-2.5 py-2 whitespace-nowrap">{v.authenticity_status || '—'}</td>
                    <td className="px-2.5 py-2 whitespace-nowrap">{v.address_status || '—'}</td>
                    
                    <td className="px-2.5 py-2 font-mono whitespace-nowrap">
                      {v.evidence_completeness !== null ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-800 text-[10px]">{v.evidence_completeness}%</span>
                          <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${v.evidence_completeness > 80 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${v.evidence_completeness}%` }} />
                          </div>
                        </div>
                      ) : '—'}
                    </td>
                    
                    <td className="px-2.5 py-2 whitespace-nowrap">{v.duplicate_risk_level || '—'}</td>
                    <td className="px-2.5 py-2 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[9.5px] border border-slate-200">
                        {v.current_stage || '—'}
                      </span>
                    </td>
                    
                    <td className="px-2.5 py-2 whitespace-nowrap text-slate-700">{v.reviewer?.name || '—'}</td>
                    
                    <td className="px-2.5 py-2 whitespace-nowrap">
                      {v.sla_percentage !== null ? `${v.sla_percentage}%` : '—'}
                    </td>
                    
                    <td className="px-2.5 py-2 whitespace-nowrap">
                      {v.verification_status === "verified" && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">Verified</span>}
                      {v.verification_status === "pending" && <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[9.5px] border border-amber-200">Pending</span>}
                      {v.verification_status === "rejected" && <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[9.5px] border border-rose-200">Rejected</span>}
                      {v.verification_status === "under-review" && <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold text-[9.5px] border border-sky-200">Under Review</span>}
                      {(!["verified", "pending", "rejected", "under-review"].includes(v.verification_status)) && <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[9.5px] border border-slate-200">{v.verification_status || '—'}</span>}
                    </td>

                    <td className="px-2.5 py-2 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === idStr ? null : idStr)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-500"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {activeMenuId === idStr && (
                          <div className="absolute right-0 mt-1 w-44 bg-white rounded-md shadow-xl border border-line py-1 z-30 text-[11px] font-medium text-ink text-left">
                            <button
                              onClick={() => { onActionClick("verify", idStr); setActiveMenuId(null); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-emerald-600 font-bold"
                            >
                              <ShieldCheck size={13} /> Verify Identity
                            </button>
                            <button
                              onClick={() => { onActionClick("evidence", idStr); setActiveMenuId(null); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                            >
                              <CheckCircle2 size={13} /> Request Evidence
                            </button>
                            <button
                              onClick={() => { onActionClick("reject", idStr); setActiveMenuId(null); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-700 flex items-center gap-2 font-bold border-t border-line"
                            >
                              <UserX size={13} /> Reject Verification
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-line bg-slate-50 flex items-center justify-between text-[11px]">
        <div className="text-slate-500">
          Showing 1 to {verifications.length} of {totalCount} verifications
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-line bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 py-0.5 rounded bg-[#671021] text-white font-bold text-[10px]">
              {currentPage}
            </span>
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-line bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="h-7 px-2 border border-line rounded bg-white text-[11px] font-semibold text-slate-700"
          >
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
