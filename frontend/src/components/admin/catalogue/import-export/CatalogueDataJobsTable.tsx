"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Eye,
  FileText,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { CatalogueDataJob } from "@/types/importExport";

interface CatalogueDataJobsTableProps {
  jobs: CatalogueDataJob[];
  totalCount: number;
  selectedJobId: string;
  onSelectJob: (id: string) => void;
  selectedRowIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAllOnPage: () => void;
  sortColumn: keyof CatalogueDataJob;
  sortDirection: "asc" | "desc";
  onSort: (col: keyof CatalogueDataJob) => void;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onOpenReview: (job: CatalogueDataJob) => void;
  onDownloadReport: (job: CatalogueDataJob) => void;
  onRetryJob: (job: CatalogueDataJob) => void;
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export function CatalogueDataJobsTable({
  jobs,
  totalCount,
  selectedJobId,
  onSelectJob,
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
  onOpenReview,
  onDownloadReport,
  onRetryJob,
  showToast,
}: CatalogueDataJobsTableProps) {
  const [activeMenuJobId, setActiveMenuJobId] = useState<string | null>(null);

  const getValidationBadge = (status: string) => {
    switch (status) {
      case "Validating":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">Validating</span>;
      case "Passed":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Passed</span>;
      case "Warnings":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Warnings</span>;
      case "Failed":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Failed</span>;
      default:
        return <span className="text-slate-400">--</span>;
    }
  };

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
      case "Approved":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Approved</span>;
      case "Rejected":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Rejected</span>;
      default:
        return <span className="text-slate-400">--</span>;
    }
  };

  const getExecutionBadge = (status: string) => {
    switch (status) {
      case "Queued":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Queued</span>;
      case "Running":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">Running</span>;
      case "Reconciled":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Reconciled</span>;
      case "Delivered":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Delivered</span>;
      case "Scheduled":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Scheduled</span>;
      case "Failed":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Failed</span>;
      default:
        return <span className="text-slate-400">--</span>;
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case "In Progress":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">In Progress</span>;
      case "Success":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Success</span>;
      case "Failed":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Failed</span>;
      case "Pending":
        return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
      default:
        return <span className="text-slate-400">--</span>;
    }
  };

  const isAllOnPageSelected =
    jobs.length > 0 && jobs.every((j) => selectedRowIds.includes(j.id));

  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  return (
    <div className="bg-white border border-line rounded-lg shadow-sm mb-6">
      <div className="p-3.5 border-b border-line flex items-center justify-between">
        <h3 className="text-[13px] font-bold text-ink uppercase tracking-wider font-mono">
          Catalogue Data Jobs
        </h3>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[11px] border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 text-muted font-bold uppercase text-[9.5px] border-b border-line">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllOnPageSelected}
                  onChange={onSelectAllOnPage}
                  className="rounded border-slate-300 text-[#671021] focus:ring-0"
                />
              </th>
              <th className="py-2.5 px-2.5 cursor-pointer hover:text-ink" onClick={() => onSort("id")}>
                Job ID {sortColumn === "id" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="py-2.5 px-2.5">Operation Type</th>
              <th className="py-2.5 px-2.5">File / Template</th>
              <th className="py-2.5 px-2.5">Source</th>
              <th className="py-2.5 px-2.5">Scope</th>
              <th className="py-2.5 px-2.5">Submitted By</th>
              <th className="py-2.5 px-2.5 text-right">Records</th>
              <th className="py-2.5 px-2.5">Mapping</th>
              <th className="py-2.5 px-2.5">Validation</th>
              <th className="py-2.5 px-2.5 text-right">Duplicates</th>
              <th className="py-2.5 px-2.5">Approval</th>
              <th className="py-2.5 px-2.5">Execution</th>
              <th className="py-2.5 px-2.5">Outcome</th>
              <th className="py-2.5 px-2.5">Updated At</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {jobs.length === 0 && <tr><td colSpan={16} className="py-12 text-center text-muted">No import/export jobs match the selected filters.</td></tr>}
            {jobs.map((job) => {
              const isSelected = selectedRowIds.includes(job.id);
              const isActive = selectedJobId === job.id;

              return (
                <tr
                  key={job.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    isActive ? "bg-red-50/40" : ""
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectRow(job.id)}
                      className="rounded border-slate-300 text-[#671021] focus:ring-0"
                    />
                  </td>
                  <td className="py-2.5 px-2.5 font-bold font-mono text-[#671021]">
                    <button
                      onClick={() => onSelectJob(job.id)}
                      className="hover:underline text-left block"
                    >
                      {job.publicId || job.id}
                    </button>
                  </td>
                  <td className="py-2.5 px-2.5 font-semibold text-slate-700">
                    <span className="flex items-center gap-1">
                      {job.operationType === "Import" ? (
                        <Download size={12} className="text-sky-600" />
                      ) : (
                        <Upload size={12} className="text-emerald-600" />
                      )}
                      {job.operationType}
                    </span>
                  </td>
                  <td className="py-2.5 px-2.5 font-semibold text-slate-800" title={job.fileName}>
                    {job.fileName}
                  </td>
                  <td className="py-2.5 px-2.5 text-slate-600 font-medium">{job.source}</td>
                  <td className="py-2.5 px-2.5 text-slate-600 font-medium">{job.scope}</td>
                  <td className="py-2.5 px-2.5 text-slate-700 font-semibold">{job.submittedBy}</td>
                  <td className="py-2.5 px-2.5 text-right font-mono font-bold text-slate-800">
                    {job.recordsFormatted}
                  </td>

                  {/* Mapping Progress */}
                  <td className="py-2.5 px-2.5">
                    {(job.mappingPercentage ?? 0) > 0 ? (
                      <div className="flex items-center gap-1.5 w-20">
                        <span className="font-bold text-[10px] font-mono text-slate-700 w-7">
                          {job.mappingPercentage ?? 0}%
                        </span>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              (job.mappingPercentage ?? 0) >= 95 ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${job.mappingPercentage ?? 0}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400">--</span>
                    )}
                  </td>

                  <td className="py-2.5 px-2.5">{getValidationBadge(job.validationStatus)}</td>

                  <td className="py-2.5 px-2.5 text-right font-mono font-bold">
                    {job.duplicatesCount > 0 ? (
                      <span className="text-amber-600">{job.duplicatesCount}</span>
                    ) : job.operationType === "Export" ? (
                      <span className="text-slate-400">--</span>
                    ) : (
                      <span className="text-slate-600">0</span>
                    )}
                  </td>

                  <td className="py-2.5 px-2.5">{getApprovalBadge(job.approvalStatus)}</td>
                  <td className="py-2.5 px-2.5">{getExecutionBadge(job.executionStatus)}</td>
                  <td className="py-2.5 px-2.5">{getOutcomeBadge(job.outcome)}</td>
                  <td className="py-2.5 px-2.5 text-slate-500 font-medium">{job.updatedAt}</td>

                  {/* Action Column */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 relative">
                      {job.canRetry ? (
                        <button
                          onClick={() => onRetryJob(job)}
                          className="px-2 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 font-bold hover:bg-rose-100 text-[10px]"
                        >
                          Retry Job
                        </button>
                      ) : job.canDownload ? (
                        <button
                          onClick={() => onDownloadReport(job)}
                          className="px-2 py-1 rounded bg-slate-50 border border-line text-slate-700 font-bold hover:bg-slate-100 text-[10px]"
                        >
                          Download File
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onSelectJob(job.id);
                            onOpenReview(job);
                          }}
                          className="px-2.5 py-1 rounded bg-[#671021]/10 border border-[#671021]/30 text-[#671021] font-bold hover:bg-[#671021]/20 text-[10px]"
                        >
                          Open Review
                        </button>
                      )}

                      {/* 3-dot Menu Button */}
                      <button
                        onClick={() =>
                          setActiveMenuJobId((prev) => (prev === job.id ? null : job.id))
                        }
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-ink"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {activeMenuJobId === job.id && (
                        <div className="absolute right-0 top-8 w-44 bg-white rounded-lg shadow-xl border border-line py-1 z-40 text-left animate-in fade-in duration-150">
                          <button
                            onClick={() => {
                              onSelectJob(job.id);
                              onOpenReview(job);
                              setActiveMenuJobId(null);
                            }}
                            className="w-full px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye size={12} /> View Job Detail
                          </button>
                          <button
                            onClick={() => {
                              onDownloadReport(job);
                              setActiveMenuJobId(null);
                            }}
                            className="w-full px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <FileText size={12} /> Download Report
                          </button>
                          {job.canRetry && (
                            <button
                              onClick={() => {
                                onRetryJob(job);
                                setActiveMenuJobId(null);
                              }}
                              className="w-full px-3 py-1.5 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                            >
                              <RotateCcw size={12} /> Retry Execution
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Bar */}
      <div className="p-3 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted">
        <div>
          Showing {jobs.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount} jobs
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="h-7 px-2 rounded border border-line bg-white text-[11px] font-bold text-ink focus:outline-none"
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded border border-line hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 font-bold text-ink">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1 rounded border border-line hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
