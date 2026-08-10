"use client";

import React, { useState } from "react";
import {
  Copy, MoreHorizontal, Eye, Edit3, Sliders,
  Check, Layers, AlertTriangle, Archive,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { CatalogueAttribute } from "@/types/attributeManagement";

interface AttributeTableProps {
  attributes: CatalogueAttribute[];
  totalCount: number;
  filteredCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  selectedAttributeIds: string[];
  selectedAttribute: CatalogueAttribute | null;
  onSelectAttribute: (attr: CatalogueAttribute) => void;
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onEditAttribute: (attr: CatalogueAttribute) => void;
  onManageAllowedValues: (attr: CatalogueAttribute) => void;
  onArchiveAttribute: (attr: CatalogueAttribute) => void;
}

export const AttributeTable: React.FC<AttributeTableProps> = ({
  attributes,
  totalCount,
  filteredCount,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  selectedAttributeIds,
  selectedAttribute,
  onSelectAttribute,
  onToggleSelectRow,
  onToggleSelectAll,
  onEditAttribute,
  onManageAllowedValues,
  onArchiveAttribute,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAllSelected =
    attributes.length > 0 && attributes.every((a) => selectedAttributeIds.includes(a.id));

  const handleCopyId = (idText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    toast.success(`Copied ${idText} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, filteredCount);

  // Build page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-2xs flex flex-col min-w-0">
      {/* Table Header */}
      <div className="flex items-center justify-between px-3.5 pt-3 pb-2.5 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Attributes{" "}
            <span className="text-gray-400 font-normal text-xs">({totalCount.toLocaleString()})</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {selectedAttributeIds.length > 0 && (
            <span className="text-[11px] font-semibold text-[#741d35]">
              {selectedAttributeIds.length} selected
            </span>
          )}
          <AlertTriangle size={13} className="text-gray-300" />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto overscroll-x-contain border-b border-gray-100 max-h-[420px]">
        <table className="w-full text-left border-collapse text-[11px] min-w-[1100px]">
          <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-500 font-bold uppercase text-[9px] tracking-wider h-9">
              <th className="py-2 px-2 w-7 text-center align-middle">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35] w-3.5 h-3.5"
                />
              </th>
              <th className="py-2 px-2 w-5 text-center align-middle">#</th>
              <th className="py-2 px-2 align-middle min-w-[100px]">Attribute Name</th>
              <th className="py-2 px-2 align-middle whitespace-nowrap">Attr. ID</th>
              <th className="py-2 px-2 align-middle whitespace-nowrap">Group</th>
              <th className="py-2 px-2 align-middle">Data Type</th>
              <th className="py-2 px-2 align-middle">Input</th>
              <th className="py-2 px-2 text-center align-middle">Req.</th>
              <th className="py-2 px-2 text-center align-middle">Var.</th>
              <th className="py-2 px-2 text-right align-middle">Cat.%</th>
              <th className="py-2 px-2 text-right align-middle">Prod.</th>
              <th className="py-2 px-2 text-center align-middle">Val.</th>
              <th className="py-2 px-2 align-middle">VR</th>
              <th className="py-2 px-2 text-center align-middle">Ch.</th>
              <th className="py-2 px-2 text-right align-middle">Comp.</th>
              <th className="py-2 px-2 text-center align-middle">Issues</th>
              <th className="py-2 px-2 text-center align-middle">Risk</th>
              <th className="py-2 px-2 align-middle">Owner</th>
              <th className="py-2 px-2 text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {attributes.length === 0 ? (
              <tr>
                <td colSpan={19} className="py-8 text-center text-xs text-gray-400">
                  <Layers size={24} className="mx-auto mb-2 text-gray-200" />
                  No attributes match the current filters.
                </td>
              </tr>
            ) : (
              attributes.map((attr, idx) => {
                const isSelectedRow = selectedAttribute?.id === attr.id;
                const isChecked = selectedAttributeIds.includes(attr.id);
                const rowNum = (currentPage - 1) * pageSize + idx + 1;

                return (
                  <tr
                    key={attr.id}
                    onClick={() => onSelectAttribute(attr)}
                    className={`h-9 cursor-pointer transition-colors hover:bg-gray-50 ${
                      isSelectedRow ? "bg-[#f5ebed]/40" : ""
                    }`}
                  >
                    <td className="py-1.5 px-2 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSelectRow(attr.id)}
                        className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35] w-3.5 h-3.5"
                      />
                    </td>

                    <td className="py-1.5 px-2 text-center font-mono text-gray-400 text-[10px] align-middle">
                      {rowNum}
                    </td>

                    <td className="py-1.5 px-2 font-semibold text-gray-900 hover:text-[#741d35] align-middle whitespace-nowrap">
                      {attr.attributeName}
                    </td>

                    <td className="py-1.5 px-2 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[9.5px] text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200">
                          {attr.attributeId}
                        </span>
                        <button
                          onClick={(e) => handleCopyId(attr.attributeId, e)}
                          title="Copy ID"
                          className="text-gray-300 hover:text-gray-600 p-0.5"
                        >
                          {copiedId === attr.attributeId ? (
                            <Check size={10} className="text-emerald-600" />
                          ) : (
                            <Copy size={10} />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-1.5 px-2 text-gray-500 max-w-[90px] truncate align-middle text-[10.5px]" title={attr.groupName}>
                      {attr.groupName}
                    </td>

                    <td className="py-1.5 px-2 text-gray-700 font-medium align-middle whitespace-nowrap">
                      {attr.dataType}
                    </td>

                    <td className="py-1.5 px-2 text-gray-500 align-middle whitespace-nowrap">
                      {attr.inputType}
                    </td>

                    <td className="py-1.5 px-2 text-center align-middle">
                      {attr.isRequired ? (
                        <Check size={12} className="text-emerald-600 mx-auto" />
                      ) : (
                        <span className="text-gray-200">—</span>
                      )}
                    </td>

                    <td className="py-1.5 px-2 text-center align-middle">
                      {attr.isVariantGenerating ? (
                        <Check size={12} className="text-emerald-600 mx-auto" />
                      ) : (
                        <span className="text-gray-200">—</span>
                      )}
                    </td>

                    <td className="py-1.5 px-2 text-right font-mono font-semibold text-gray-800 align-middle">
                      {attr.categoryCoveragePercent}%
                    </td>

                    <td className="py-1.5 px-2 text-right font-mono text-gray-700 align-middle">
                      {attr.productUsageCount.toLocaleString()}
                    </td>

                    <td className="py-1.5 px-2 text-center font-mono text-gray-600 align-middle">
                      {attr.allowedValueCount > 0 ? attr.allowedValueCount : "—"}
                    </td>

                    <td className="py-1.5 px-2 font-mono text-[10px] text-gray-500 align-middle whitespace-nowrap">
                      {attr.validationRuleId}
                    </td>

                    <td className="py-1.5 px-2 text-center font-semibold text-gray-800 align-middle whitespace-nowrap">
                      {attr.channelEligibilityText}
                    </td>

                    <td className="py-1.5 px-2 text-right font-mono font-bold text-gray-900 align-middle">
                      {attr.completenessPercent}%
                    </td>

                    <td className="py-1.5 px-2 text-center align-middle">
                      <span className={`font-bold font-mono ${attr.issuesCount > 0 ? "text-rose-600" : "text-gray-300"}`}>
                        {attr.issuesCount}
                      </span>
                    </td>

                    <td className="py-1.5 px-2 text-center align-middle">
                      <span
                        className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          attr.riskLevel === "Low"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : attr.riskLevel === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {attr.riskLevel}
                      </span>
                    </td>

                    <td className="py-1.5 px-2 text-gray-600 font-medium align-middle whitespace-nowrap text-[10.5px]">
                      {attr.owner.split(" ")[0]}
                    </td>

                    <td className="py-1.5 px-2 text-center align-middle relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === attr.id ? null : attr.id)}
                        className="p-1 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <MoreHorizontal size={13} />
                      </button>

                      {activeMenuId === attr.id && (
                        <div className="absolute right-3 top-8 z-30 w-48 bg-white rounded border border-gray-200 shadow-lg py-1 text-left text-xs">
                          <button
                            onClick={() => { onSelectAttribute(attr); setActiveMenuId(null); }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                          >
                            <Eye size={12} /> View Attribute
                          </button>
                          <button
                            onClick={() => { onEditAttribute(attr); setActiveMenuId(null); }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                          >
                            <Edit3 size={12} /> Edit Attribute
                          </button>
                          <button
                            onClick={() => { onManageAllowedValues(attr); setActiveMenuId(null); }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                          >
                            <Sliders size={12} /> Manage Allowed Values
                          </button>
                          <div className="px-3 py-1.5 text-[10px] text-gray-400">Validation-rule details are unavailable.</div>
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={() => { onArchiveAttribute(attr); setActiveMenuId(null); }}
                            className="w-full px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600"
                          >
                            <Archive size={12} /> Archive Attribute
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2.5 text-[11px] text-gray-500">
        <span>
          Showing <strong className="text-gray-700">{startRow}</strong> to{" "}
          <strong className="text-gray-700">{endRow}</strong> of{" "}
          <strong className="text-gray-700">{totalCount.toLocaleString()}</strong> attributes
        </span>

        <div className="flex items-center gap-1.5">
          {/* First */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-6 h-6 rounded border border-gray-200 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center"
            aria-label="First page"
          >
            <ChevronsLeft size={11} />
          </button>
          {/* Prev */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-6 h-6 rounded border border-gray-200 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center"
            aria-label="Previous page"
          >
            <ChevronLeft size={11} />
          </button>

          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-0.5 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`w-6 h-6 rounded border text-[10px] font-bold flex items-center justify-center transition-colors ${
                  currentPage === p
                    ? "bg-[#741d35] text-white border-[#741d35]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
                aria-current={currentPage === p ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-6 h-6 rounded border border-gray-200 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center"
            aria-label="Next page"
          >
            <ChevronRight size={11} />
          </button>
          {/* Last */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-6 h-6 rounded border border-gray-200 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center"
            aria-label="Last page"
          >
            <ChevronsRight size={11} />
          </button>

          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-6 px-1.5 rounded border border-gray-300 text-[10px] font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#741d35] ml-1"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};
