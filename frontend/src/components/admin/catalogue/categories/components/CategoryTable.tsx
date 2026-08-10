"use client";

import React, { useState } from "react";
import { Copy, MoreHorizontal, Eye, Edit3, Sliders, ExternalLink, Plus, Move, GitMerge, Archive, Check } from "lucide-react";
import toast from "react-hot-toast";
import { CategoryItem } from "@/types/categoryManagement";

interface CategoryTableProps {
  categories: CategoryItem[];
  selectedCategoryIds: string[];
  selectedCategory: CategoryItem | null;
  onSelectCategory: (cat: CategoryItem) => void;
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onEditCategory: (cat: CategoryItem) => void;
  onManageAttributes: (cat: CategoryItem) => void;
  onViewProducts: (cat: CategoryItem) => void;
  onAddChild: (cat: CategoryItem) => void;
  onMoveCategory: (cat: CategoryItem) => void;
  onMergeCategory: (cat: CategoryItem) => void;
  onArchiveCategory: (cat: CategoryItem) => void;
  pagination?: { currentPage: number; lastPage: number; total: number; pageSize: number };
  onPageChange?: (page: number) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  selectedCategoryIds,
  selectedCategory,
  onSelectCategory,
  onToggleSelectRow,
  onToggleSelectAll,
  onEditCategory,
  onManageAttributes,
  onViewProducts,
  onAddChild,
  onMoveCategory,
  onMergeCategory,
  onArchiveCategory,
  pagination,
  onPageChange,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAllSelected = categories.length > 0 && categories.every((c) => selectedCategoryIds.includes(c.id));

  const handleCopyId = (idText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    toast.success(`Copied ${idText} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 flex flex-col justify-between shadow-2xs h-full min-w-0">
      <div>
        {/* Table Title Bar */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Categories</h3>
            <p className="text-[11px] text-gray-500">Authoritative taxonomy records matching the current filters</p>
          </div>
          <span className="text-[11px] font-semibold text-gray-500">
            {categories.length} records found
          </span>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto overscroll-x-contain scrollbar-gutter-stable border border-gray-200 rounded max-h-[500px]">
          <table className="w-full text-left border-collapse text-[11.5px] min-w-[1000px]">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600 font-bold uppercase text-[10px] tracking-wider h-10">
                <th className="py-2 px-3 w-8 text-center align-middle">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                    className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                  />
                </th>
                <th className="py-2 px-3 align-middle">Category</th>
                <th className="py-2 px-3 align-middle">Category ID</th>
                <th className="py-2 px-3 align-middle">Hierarchy Path</th>
                <th className="py-2 px-3 text-center align-middle">Level</th>
                <th className="py-2 px-3 align-middle">Parent Category</th>
                <th className="py-2 px-3 text-right align-middle">Active Products</th>
                <th className="py-2 px-3 text-center align-middle">Child Categories</th>
                <th className="py-2 px-3 text-center align-middle">Reg. Attr.</th>
                <th className="py-2 px-3 align-middle">Attr. Coverage</th>
                <th className="py-2 px-3 text-center align-middle">Channel Eligibility</th>
                <th className="py-2 px-3 align-middle">SEO Readiness</th>
                <th className="py-2 px-3 align-middle">Compliance</th>
                <th className="py-2 px-3 align-middle">Status</th>
                <th className="py-2 px-3 text-center align-middle">Risk Level</th>
                <th className="py-2 px-3 text-center align-middle">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {categories.map((cat) => {
                const isSelectedRow = selectedCategory?.id === cat.id;
                const isChecked = selectedCategoryIds.includes(cat.id);

                return (
                  <tr
                    key={cat.id}
                    onClick={() => onSelectCategory(cat)}
                    className={`h-11 hover:bg-gray-50/80 cursor-pointer transition-colors ${
                      isSelectedRow ? "bg-[#f5ebed]/50 font-medium" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-2 px-3 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSelectRow(cat.id)}
                        className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                      />
                    </td>

                    {/* Category Name */}
                    <td className="py-2 px-3 font-bold text-gray-900 hover:text-[#741d35] align-middle whitespace-nowrap">
                      {cat.categoryName}
                    </td>

                    {/* Category ID */}
                    <td className="py-2 px-3 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[10.5px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                          {cat.categoryId}
                        </span>
                        <button
                          onClick={(e) => handleCopyId(cat.categoryId, e)}
                          title="Copy ID"
                          className="text-gray-400 hover:text-gray-700 p-0.5"
                        >
                          {copiedId === cat.categoryId ? (
                            <Check size={11} className="text-emerald-600" />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Path */}
                    <td className="py-2 px-3 text-gray-500 max-w-[180px] truncate align-middle" title={cat.hierarchyPath}>
                      {cat.hierarchyPath}
                    </td>

                    {/* Level */}
                    <td className="py-2 px-3 text-center font-semibold text-gray-800 align-middle">{cat.level}</td>

                    {/* Parent Category */}
                    <td className="py-2 px-3 font-semibold text-gray-700 align-middle whitespace-nowrap">{cat.parentCategory}</td>

                    {/* Active Products */}
                    <td className="py-2 px-3 text-right font-mono font-semibold text-gray-800 align-middle">
                      {cat.activeProductsCount.toLocaleString()}
                    </td>

                    {/* Child Categories */}
                    <td className="py-2 px-3 text-center font-semibold text-gray-600 align-middle">
                      {cat.childCategoriesCount}
                    </td>

                    {/* Reg Attr */}
                    <td className="py-2 px-3 text-center font-semibold text-gray-700 align-middle">
                      {cat.requiredAttributesCount}
                    </td>

                    {/* Attr Coverage */}
                    <td className="py-2 px-3 min-w-[110px] align-middle">
                      <div className="flex items-center gap-1.5">
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              (cat.attributeCoveragePercent ?? 0) >= 85
                                ? "bg-emerald-500"
                                : (cat.attributeCoveragePercent ?? 0) >= 70
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${cat.attributeCoveragePercent ?? 0}%` }}
                          />
                        </div>
                        <span className="font-bold text-[10.5px] shrink-0 w-8 text-right">
                          {cat.attributeCoveragePercent === null ? "N/A" : `${cat.attributeCoveragePercent}%`}
                        </span>
                      </div>
                    </td>

                    {/* Channel Eligibility */}
                    <td className="py-2 px-3 text-center font-semibold text-gray-700 align-middle whitespace-nowrap">
                      {cat.channelEligibilityText}
                    </td>

                    {/* SEO Readiness */}
                    <td className="py-2 px-3 min-w-[100px] align-middle">
                      <div className="flex items-center gap-1.5">
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-sky-500 h-full rounded-full"
                            style={{ width: `${cat.seoReadinessPercent ?? 0}%` }}
                          />
                        </div>
                        <span className="font-semibold text-[10.5px] shrink-0 w-8 text-right">
                          {cat.seoReadinessPercent === null ? "N/A" : `${cat.seoReadinessPercent}%`}
                        </span>
                      </div>
                    </td>

                    {/* Compliance */}
                    <td className="py-2 px-3 align-middle">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          cat.complianceStatus === "Configured"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {cat.complianceStatus}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-2 px-3 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                        {cat.status}
                      </span>
                    </td>

                    {/* Risk Level */}
                    <td className="py-2 px-3 text-center align-middle">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          cat.riskLevel === "Low"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : cat.riskLevel === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {cat.riskLevel}
                      </span>
                    </td>

                    {/* Actions dropdown */}
                    <td className="py-2 px-3 text-center align-middle relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === cat.id ? null : cat.id)}
                        className="p-1 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <MoreHorizontal size={14} />
                      </button>

                      {activeMenuId === cat.id && (
                        <div className="absolute right-3 top-8 z-30 w-44 bg-white rounded border border-gray-200 shadow-lg py-1 text-left text-xs">
                          <button
                            onClick={() => {
                              onSelectCategory(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Eye size={13} /> View Category
                          </button>
                          <button
                            onClick={() => {
                              onEditCategory(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Edit3 size={13} /> Edit Category
                          </button>
                          <button
                            onClick={() => {
                              onManageAttributes(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Sliders size={13} /> Manage Attributes
                          </button>
                          <button
                            onClick={() => {
                              onViewProducts(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <ExternalLink size={13} /> View Products
                          </button>
                          <button
                            onClick={() => {
                              onAddChild(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Plus size={13} /> Add Child
                          </button>
                          <button
                            onClick={() => {
                              onMoveCategory(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Move size={13} /> Move Category
                          </button>
                          <button
                            onClick={() => {
                              onMergeCategory(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <GitMerge size={13} /> Merge Category
                          </button>
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={() => {
                              onArchiveCategory(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                          >
                            <Archive size={13} /> Archive Category
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-gray-200 text-xs text-gray-500">
        <div>
          Showing {categories.length ? ((pagination?.currentPage ?? 1)-1)*(pagination?.pageSize ?? categories.length)+1 : 0} to {Math.min((pagination?.currentPage ?? 1)*(pagination?.pageSize ?? categories.length),pagination?.total ?? categories.length)} of {pagination?.total ?? categories.length} categories
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button disabled={!pagination || pagination.currentPage <= 1} onClick={()=>onPageChange?.((pagination?.currentPage ?? 1)-1)} className="w-7 h-7 rounded border border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center">
              &lt;
            </button>
            <button className="w-7 h-7 rounded bg-[#741d35] text-white font-bold flex items-center justify-center">
              {pagination?.currentPage ?? 1}
            </button>
            <button disabled={!pagination || pagination.currentPage >= pagination.lastPage} onClick={()=>onPageChange?.((pagination?.currentPage ?? 1)+1)} className="w-7 h-7 rounded border border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center">
              &gt;
            </button>
          </div>
          <span className="h-7 px-2 flex items-center rounded border border-gray-300 text-xs font-semibold text-gray-700">{pagination?.pageSize ?? categories.length} / page</span>
        </div>
      </div>
    </div>
  );
};
