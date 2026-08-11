"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MediaAsset 
} from "@/types/mediaManagement";
import { 
  Globe, 
  Smartphone, 
  Store, 
  ShoppingBag, 
  Share2, 
  MoreVertical, 
  Copy, 
  Check, 
  Play, 
  FileText, 
  Eye, 
  Edit3, 
  ShieldCheck, 
  RotateCcw, 
  Archive,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface TableProps {
  assets: MediaAsset[];
  totalCount: number;
  totalPages: number;
  canManage: boolean;
  selectedAssetId: string;
  onSelectAsset: (id: string) => void;
  selectedRowIds: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAllOnPage: (checked: boolean) => void;
  sortColumn: keyof MediaAsset;
  sortDirection: "asc" | "desc";
  onSort: (column: keyof MediaAsset) => void;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onPreview: (asset: MediaAsset) => void;
  onEdit: (asset: MediaAsset) => void;
  onApprove: (id: string) => void;
  onRevoke: (id: string) => void;
  onArchive: (id: string) => void;
  showToast: (text: string) => void;
}

export function MediaAssetTable({
  assets,
  totalCount,
  totalPages,
  canManage,
  selectedAssetId,
  onSelectAsset,
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
  onPreview,
  onEdit,
  onApprove,
  onRevoke,
  onArchive,
  showToast,
}: TableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const isAllPageSelected = assets.length > 0 && assets.every((a) => selectedRowIds.includes(a.id));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId && tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    showToast(`Copied ${id} to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white border border-line rounded-lg shadow-sm mb-5 overflow-hidden flex flex-col" ref={tableRef}>
      {/* Table Title Bar */}
      <div className="px-4 py-3 border-b border-line flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-ink tracking-tight">
            Media Assets <span className="text-muted font-normal">({totalCount.toLocaleString()})</span>
          </h2>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto scrollbar-thin max-w-full">
        <table className="w-full text-left border-collapse table-fixed min-w-[1880px] text-[11px]">
          {/* Explicit Column Width Strategy */}
          <colgroup>
            <col style={{ width: "40px" }} />
            <col style={{ width: "90px" }} />
            <col style={{ width: "125px" }} />
            <col style={{ width: "110px" }} />
            <col style={{ width: "95px" }} />
            <col style={{ width: "180px" }} />
            <col style={{ width: "75px" }} />
            <col style={{ width: "70px" }} />
            <col style={{ width: "125px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "130px" }} />
            <col style={{ width: "70px" }} />
            <col style={{ width: "95px" }} />
            <col style={{ width: "110px" }} />
            <col style={{ width: "105px" }} />
            <col style={{ width: "95px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "125px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "60px" }} />
          </colgroup>
          <thead>
            <tr className="border-b border-line bg-slate-100/90 text-[10px] font-bold text-muted uppercase tracking-wider sticky top-0 z-10">
              <th className="py-2.5 px-3 text-center align-middle">
                <input
                  type="checkbox"
                  checked={isAllPageSelected}
                  onChange={(e) => onSelectAllOnPage(e.target.checked)}
                  className="rounded border-line text-[#671021] focus:ring-[#671021]"
                />
              </th>
              <th className="py-2.5 px-3 align-middle text-center">Preview</th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("id")}>
                Asset ID {sortColumn === "id" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("type")}>
                Asset Type {sortColumn === "type" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle">Linked Entity</th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("productName")}>
                Product / Brand {sortColumn === "productName" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle">Variant</th>
              <th className="py-2.5 px-3 align-middle">Format</th>
              <th className="py-2.5 px-3 align-middle">Res / Duration</th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("fileSizeBytes")}>
                File Size {sortColumn === "fileSizeBytes" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle text-center">Channel Compat</th>
              <th className="py-2.5 px-3 align-middle text-center">Alt Text</th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("qualityScore")}>
                Quality {sortColumn === "qualityScore" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("approvalStatus")}>
                Approval {sortColumn === "approvalStatus" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle">Usage Rights</th>
              <th className="py-2.5 px-3 align-middle">Duplicate Risk</th>
              <th className="py-2.5 px-3 align-middle">Risk Level</th>
              <th className="py-2.5 px-3 align-middle cursor-pointer hover:text-ink" onClick={() => onSort("updatedAt")}>
                Updated At {sortColumn === "updatedAt" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="py-2.5 px-3 align-middle">Owner</th>
              <th className="py-2.5 px-3 align-middle text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={20} className="py-12 text-center text-muted font-medium">
                  No media assets match the current filters.
                </td>
              </tr>
            ) : (
              assets.map((asset) => {
                const isSelected = selectedAssetId === asset.id;
                const isChecked = selectedRowIds.includes(asset.id);

                return (
                  <tr
                    key={asset.id}
                    onClick={() => onSelectAsset(asset.id)}
                    className={`border-b border-line hover:bg-slate-50 transition-colors cursor-pointer ${
                      isSelected ? "bg-rose-50/40" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-2 px-3 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onSelectRow(asset.id, e.target.checked)}
                        className="rounded border-line text-[#671021] focus:ring-[#671021]"
                      />
                    </td>

                    {/* Preview Thumbnail */}
                    <td className="py-2 px-3 align-middle">
                      <div className="w-10 h-10 rounded border border-line bg-slate-100 overflow-hidden relative flex items-center justify-center mx-auto">
                        {asset.category === "image" && (
                          <img
                            src={asset.thumbnailUrl || ""}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {asset.category === "video" && (
                          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white relative">
                            <img src={asset.thumbnailUrl || ""} alt={asset.name} className="w-full h-full object-cover opacity-60" />
                            <Play size={14} className="absolute fill-white text-white" />
                          </div>
                        )}
                        {asset.category === "document" && (
                          <FileText size={18} className="text-slate-500" />
                        )}
                      </div>
                    </td>

                    {/* Asset ID */}
                    <td className="py-2 px-3 align-middle font-mono font-bold text-ink truncate">
                      <div className="flex items-center gap-1">
                        <span className="truncate">{asset.id}</span>
                        <button
                          onClick={(e) => handleCopyId(asset.id, e)}
                          className="text-slate-400 hover:text-ink transition-colors p-0.5 flex-shrink-0"
                          title="Copy ID"
                        >
                          {copiedId === asset.id ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                        </button>
                      </div>
                    </td>

                    {/* Asset Type */}
                    <td className="py-2 px-3 align-middle font-semibold text-slate-700 truncate" title={asset.type}>
                      {asset.type}
                    </td>

                    {/* Linked Entity */}
                    <td className="py-2 px-3 align-middle">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium inline-block truncate max-w-full">
                        {asset.linkedEntityType}
                      </span>
                    </td>

                    {/* Product / Brand */}
                    <td className="py-2 px-3 align-middle">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-ink hover:text-[#671021] truncate" title={asset.productName}>
                          {asset.productName}
                        </span>
                        <span className="text-[10px] text-muted truncate" title={asset.brandName}>
                          {asset.brandName}
                        </span>
                      </div>
                    </td>

                    {/* Variant */}
                    <td className="py-2 px-3 align-middle text-muted font-medium truncate">
                      {asset.variant || "—"}
                    </td>

                    {/* Format */}
                    <td className="py-2 px-3 align-middle font-mono text-slate-600 font-bold">
                      {asset.format}
                    </td>

                    {/* Resolution */}
                    <td className="py-2 px-3 align-middle font-mono text-muted truncate">
                      {asset.resolution}
                    </td>

                    {/* File Size */}
                    <td className="py-2 px-3 align-middle font-mono text-slate-700 font-semibold">
                      {asset.fileSizeFormatted}
                    </td>

                    {/* Channel Compatibility Icons */}
                    <td className="py-2 px-3 align-middle text-center">
                      <div className="flex items-center justify-center gap-1.5 text-slate-400">
                        {asset.channelCompatibility ? <>
                          <span title="Web"><Globe size={13} className={asset.channelCompatibility.web ? "text-emerald-600" : "opacity-30"} /></span>
                          <span title="Mobile"><Smartphone size={13} className={asset.channelCompatibility.mobile ? "text-emerald-600" : "opacity-30"} /></span>
                          <span title="B2B"><Store size={13} className={asset.channelCompatibility.b2b ? "text-emerald-600" : "opacity-30"} /></span>
                          <span title="Partner"><ShoppingBag size={13} className={asset.channelCompatibility.partner ? "text-emerald-600" : "opacity-30"} /></span>
                          <span title="Social"><Share2 size={13} className={asset.channelCompatibility.social ? "text-emerald-600" : "opacity-30"} /></span>
                        </> : <span className="text-[9px] text-muted">N/A</span>}
                      </div>
                    </td>

                    {/* Alt Text */}
                    <td className="py-2 px-3 align-middle text-center font-semibold">
                      {asset.altTextStatus === "Yes" && (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Yes</span>
                      )}
                      {asset.altTextStatus === "No" && (
                        <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">No</span>
                      )}
                      {asset.altTextStatus === "Needs Review" && (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">Review</span>
                      )}
                    </td>

                    {/* Quality Status Score */}
                    <td className="py-2 px-3 align-middle font-bold">
                      <span className={
                        (asset.qualityScore ?? 0) >= 90
                          ? "text-emerald-600 font-mono"
                          : (asset.qualityScore ?? 0) >= 75
                          ? "text-amber-600 font-mono"
                          : "text-rose-600 font-mono"
                      }>
                        {asset.qualityScore == null ? "N/A" : `${asset.qualityScore}/100`}
                      </span>
                    </td>

                    {/* Approval Status */}
                    <td className="py-2 px-3 align-middle">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block truncate ${
                        asset.approvalStatus === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : asset.approvalStatus === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : asset.approvalStatus === "Needs Review"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {asset.approvalStatus}
                      </span>
                    </td>

                    {/* Usage Rights */}
                    <td className="py-2 px-3 align-middle truncate">
                      <span className={`font-semibold ${
                        asset.usageRightsStatus.includes("Expiring")
                          ? "text-rose-600 font-bold"
                          : "text-slate-600"
                      }`} title={asset.usageRightsStatus}>
                        {asset.usageRightsStatus}
                      </span>
                    </td>

                    {/* Duplicate Risk */}
                    <td className="py-2 px-3 align-middle font-semibold">
                      <span className={
                        asset.duplicateRisk === "High"
                          ? "text-rose-600 font-bold"
                          : asset.duplicateRisk === "Medium"
                          ? "text-amber-600"
                          : "text-slate-600"
                      }>
                        {asset.duplicateRisk}
                      </span>
                    </td>

                    {/* Risk Level */}
                    <td className="py-2 px-3 align-middle font-semibold">
                      <span className={
                        asset.riskLevel === "High" || asset.riskLevel === "Critical"
                          ? "text-rose-600 font-bold"
                          : asset.riskLevel === "Medium"
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }>
                        {asset.riskLevel}
                      </span>
                    </td>

                    {/* Updated At */}
                    <td className="py-2 px-3 align-middle text-muted truncate">
                      {asset.updatedAt}
                    </td>

                    {/* Owner */}
                    <td className="py-2 px-3 align-middle font-semibold text-slate-700 truncate" title={asset.ownerName}>
                      {asset.ownerName}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-2 px-3 align-middle text-center relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setOpenMenuId(openMenuId === asset.id ? null : asset.id)}
                        className="p-1 text-slate-400 hover:text-ink hover:bg-slate-100 rounded transition-colors"
                      >
                        <MoreVertical size={15} />
                      </button>

                      {openMenuId === asset.id && (
                        <div className="absolute right-2 top-8 w-44 bg-white rounded-md border border-line shadow-xl z-50 py-1 text-left text-[11px] font-medium text-ink">
                          <button
                            onClick={() => { setOpenMenuId(null); onPreview(asset); }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye size={13} className="text-slate-500" /> Preview Asset
                          </button>
                          <button
                            disabled={!canManage}
                            onClick={() => { setOpenMenuId(null); onEdit(asset); }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Edit3 size={13} className="text-slate-500" /> Edit Metadata
                          </button>
                          <button
                            disabled={!canManage}
                            onClick={() => { setOpenMenuId(null); onApprove(asset.id); }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-emerald-700 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <ShieldCheck size={13} /> Approve Asset
                          </button>
                          <button
                            disabled={!canManage}
                            onClick={() => { setOpenMenuId(null); onRevoke(asset.id); }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <RotateCcw size={13} /> Revoke Approval
                          </button>
                          <div className="border-t border-line my-1" />
                          <button
                            disabled={!canManage}
                            onClick={() => { setOpenMenuId(null); onArchive(asset.id); }}
                            className="w-full px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Archive size={13} /> Archive Asset
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-line bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <div className="text-muted">
          Showing <span className="font-bold text-ink">{assets.length ? (currentPage - 1) * rowsPerPage + 1 : 0}</span> to{" "}
          <span className="font-bold text-ink">{Math.min(currentPage * rowsPerPage, totalCount)}</span> of{" "}
          <span className="font-bold text-ink">{totalCount.toLocaleString()}</span> assets
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-line bg-white hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from(new Set([1, Math.max(1, currentPage - 1), currentPage, Math.min(totalPages, currentPage + 1), totalPages])).sort((a,b)=>a-b).map((pageNumber, index, pages) => <React.Fragment key={pageNumber}>{index > 0 && pageNumber - pages[index - 1] > 1 && <span className="text-muted font-bold px-1">...</span>}<button onClick={() => onPageChange(pageNumber)} className={`min-w-7 h-7 px-1 rounded text-[11px] font-bold ${currentPage === pageNumber ? "bg-[#671021] text-white" : "bg-white border border-line text-ink"}`}>{pageNumber}</button></React.Fragment>)}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded border border-line bg-white hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="h-7 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink"
            >
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
