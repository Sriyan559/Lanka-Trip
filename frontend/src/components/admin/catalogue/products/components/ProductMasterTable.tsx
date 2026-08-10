"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { ProductMasterRow } from "@/types/productMaster";

interface ProductMasterTableProps {
  products: ProductMasterRow[];
  selectedIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAllPage: (checked: boolean) => void;
  onSelectAllMatching: () => void;
  onClearSelection: () => void;
  totalMatching: number;
  onOpenProduct: (product: ProductMasterRow) => void;
  onActionClick: (product: ProductMasterRow, action: string) => void;
  page: number;
  pageSize: number;
  lastPage: number;
  sort: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChange: (sort: string) => void;
}

export const ProductMasterTable: React.FC<ProductMasterTableProps> = ({
  products,
  selectedIds,
  onSelectRow,
  onSelectAllPage,
  onSelectAllMatching,
  onClearSelection,
  totalMatching,
  onOpenProduct,
  onActionClick,
  page,
  pageSize,
  lastPage,
  sort,
  onPageChange,
  onPageSizeChange,
  onSortChange,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false);

  // Column visibility state
  const [visibleCols, setVisibleCols] = useState({
    publicId: true,
    dbProductId: true,
    sku: true,
    barcode: true,
    brand: true,
    supplier: true,
    category: true,
    variants: true,
    completeness: true,
    brandAuth: true,
    compliance: true,
    mediaReady: true,
    inventoryLink: true,
    pubReady: true,
    channelAvail: true,
    dupRisk: true,
    riskLevel: true,
    approvalStatus: true,
    productStatus: true,
    updatedAt: true,
    owner: true,
  });

  const allPageSelected = products.length > 0 && products.every((p) => selectedIds.includes(p.id));

  const toggleColumn = (key: keyof typeof visibleCols) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-2xs flex flex-col">
      {/* Top Table Control Bar */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900">
            Product Masters <span className="text-gray-500 font-medium">({totalMatching.toLocaleString()})</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Columns Visibility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsColumnsMenuOpen((prev) => !prev)}
              className="h-8 px-3 rounded border border-gray-300 bg-white font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
            >
              <Columns size={13} className="text-gray-500" />
              <span>Columns</span>
              <ChevronDown size={13} />
            </button>

            {isColumnsMenuOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded shadow-lg p-2.5 z-30 text-[11.5px] max-h-64 overflow-y-auto">
                <div className="font-bold text-gray-800 mb-2 border-b pb-1">Toggle Columns</div>
                {Object.keys(visibleCols).map((colKey) => (
                  <label key={colKey} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 px-1 rounded">
                    <input
                      type="checkbox"
                      checked={visibleCols[colKey as keyof typeof visibleCols]}
                      onChange={() => toggleColumn(colKey as keyof typeof visibleCols)}
                      className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                    />
                    <span className="capitalize text-gray-700">{colKey.replace(/([A-Z])/g, " $1")}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-8 rounded border border-gray-300 px-2 text-xs font-semibold text-gray-700 bg-white focus:outline-none"
            >
              <option value="updatedAt-desc">Updated At (Newest)</option>
              <option value="name-asc">Product Name (A-Z)</option>
              <option value="completeness-desc">Completeness (Highest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[11.5px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px] whitespace-nowrap">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={(e) => onSelectAllPage(e.target.checked)}
                  className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                />
              </th>
              <th className="py-2.5 px-3">Product</th>
              {visibleCols.publicId && <th className="py-2.5 px-3">Public ID</th>}
              {visibleCols.dbProductId && <th className="py-2.5 px-3">DB Product ID</th>}
              {visibleCols.sku && <th className="py-2.5 px-3">SKU</th>}
              {visibleCols.barcode && <th className="py-2.5 px-3">Barcode</th>}
              {visibleCols.brand && <th className="py-2.5 px-3">Brand</th>}
              {visibleCols.supplier && <th className="py-2.5 px-3">Supplier</th>}
              {visibleCols.category && <th className="py-2.5 px-3">Category</th>}
              {visibleCols.variants && <th className="py-2.5 px-3 text-center">Variants</th>}
              {visibleCols.completeness && <th className="py-2.5 px-3">Data Compl.</th>}
              {visibleCols.brandAuth && <th className="py-2.5 px-3">Brand Auth.</th>}
              {visibleCols.compliance && <th className="py-2.5 px-3">Compliance</th>}
              {visibleCols.mediaReady && <th className="py-2.5 px-3">Media Ready</th>}
              {visibleCols.inventoryLink && <th className="py-2.5 px-3">Inventory Link</th>}
              {visibleCols.pubReady && <th className="py-2.5 px-3">Pub. Ready</th>}
              {visibleCols.channelAvail && <th className="py-2.5 px-3">Channel Avail.</th>}
              {visibleCols.dupRisk && <th className="py-2.5 px-3">Dup. Risk</th>}
              {visibleCols.riskLevel && <th className="py-2.5 px-3">Risk Level</th>}
              {visibleCols.approvalStatus && <th className="py-2.5 px-3">Approval Status</th>}
              {visibleCols.productStatus && <th className="py-2.5 px-3">Product Status</th>}
              {visibleCols.updatedAt && <th className="py-2.5 px-3">Updated At</th>}
              {visibleCols.owner && <th className="py-2.5 px-3">Owner / Reviewer</th>}
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-50/80 transition-colors ${isSelected ? "bg-amber-50/40" : ""}`}
                >
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectRow(p.id)}
                      className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                    />
                  </td>

                  {/* Product Thumbnail & Name */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5 min-w-[180px]">
                      <img
                        src={p.thumbnail}
                        alt={p.productName}
                        className="w-8 h-8 rounded border border-gray-200 object-cover shrink-0"
                      />
                      <div>
                        <div className="font-bold text-gray-900 leading-tight">{p.productName}</div>
                        <div className="text-[10.5px] text-gray-400 mt-0.5">{p.variantInfo}</div>
                      </div>
                    </div>
                  </td>

                  {visibleCols.publicId && (
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-600 whitespace-nowrap">{p.publicId}</td>
                  )}
                  {visibleCols.dbProductId && (
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">{p.dbProductId}</td>
                  )}
                  {visibleCols.sku && (
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-800 font-semibold whitespace-nowrap">{p.sku}</td>
                  )}
                  {visibleCols.barcode && (
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">{p.barcode}</td>
                  )}
                  {visibleCols.brand && (
                    <td className="py-3 px-3 font-medium text-gray-800 whitespace-nowrap">{p.brand}</td>
                  )}
                  {visibleCols.supplier && (
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap text-[11px]">{p.supplier}</td>
                  )}
                  {visibleCols.category && (
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                      <span>{p.category}</span>
                      <span className="text-gray-400 text-[10px]"> &gt; {p.subcategory}</span>
                    </td>
                  )}
                  {visibleCols.variants && (
                    <td className="py-3 px-3 text-center font-bold text-gray-800">{p.variantCount}</td>
                  )}

                  {/* Completeness Bar */}
                  {visibleCols.completeness && (
                    <td className="py-3 px-3 whitespace-nowrap min-w-[90px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              p.completenessPercent >= 90
                                ? "bg-emerald-500"
                                : p.completenessPercent >= 70
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${p.completenessPercent}%` }}
                          />
                        </div>
                        <span className="font-bold text-gray-800 text-[11px]">{p.completenessPercent}%</span>
                      </div>
                    </td>
                  )}

                  {/* Brand Auth Status */}
                  {visibleCols.brandAuth && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.brandAuthStatus === "Valid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.brandAuthStatus === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {p.brandAuthStatus}
                      </span>
                    </td>
                  )}

                  {/* Compliance */}
                  {visibleCols.compliance && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.complianceStatus === "Compliant"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {p.complianceStatus}
                      </span>
                    </td>
                  )}

                  {/* Media Ready */}
                  {visibleCols.mediaReady && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.mediaStatus === "Link"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {p.mediaStatus}
                      </span>
                    </td>
                  )}

                  {/* Inventory Link */}
                  {visibleCols.inventoryLink && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.inventoryLinkStatus === "Linked"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {p.inventoryLinkStatus}
                      </span>
                    </td>
                  )}

                  {/* Pub Ready */}
                  {visibleCols.pubReady && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.publicationReadyStatus === "Ready"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {p.publicationReadyStatus}
                      </span>
                    </td>
                  )}

                  {/* Channel Avail */}
                  {visibleCols.channelAvail && (
                    <td className="py-3 px-3 text-gray-700 font-bold text-center whitespace-nowrap">{p.channelAvailability}</td>
                  )}

                  {/* Dup Risk */}
                  {visibleCols.dupRisk && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.duplicateRisk === "Low"
                            ? "bg-gray-100 text-gray-700"
                            : p.duplicateRisk === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {p.duplicateRisk}
                      </span>
                    </td>
                  )}

                  {/* Risk Level */}
                  {visibleCols.riskLevel && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.riskLevel === "Low"
                            ? "bg-emerald-50 text-emerald-700"
                            : p.riskLevel === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {p.riskLevel}
                      </span>
                    </td>
                  )}

                  {/* Approval Status */}
                  {visibleCols.approvalStatus && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.approvalStatus === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.approvalStatus === "Pending Approval"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.approvalStatus}
                      </span>
                    </td>
                  )}

                  {/* Product Status */}
                  {visibleCols.productStatus && (
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.productStatus === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.productStatus === "Draft"
                            ? "bg-gray-100 text-gray-700 border border-gray-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {p.productStatus}
                      </span>
                    </td>
                  )}

                  {visibleCols.updatedAt && (
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap text-[11px]">{p.updatedAt}</td>
                  )}

                  {visibleCols.owner && (
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap font-medium">{p.reviewer}</td>
                  )}

                  {/* Row Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 relative">
                      <button
                        onClick={() => onOpenProduct(p)}
                        className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-[10.5px] font-semibold transition-colors flex items-center gap-1"
                      >
                        <span>Open Product</span>
                      </button>

                      <button
                        onClick={() => setActiveMenuId((prev) => (prev === p.id ? null : p.id))}
                        className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {activeMenuId === p.id && (
                        <div className="absolute right-0 top-8 w-44 bg-white border border-gray-200 rounded shadow-lg py-1 z-30 text-left text-[11.5px]">
                          <button
                            onClick={() => {
                              onActionClick(p, "edit");
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 text-gray-700 font-medium"
                          >
                            Edit Product
                          </button>
                          <button
                            onClick={() => {
                              onActionClick(p, "view-approval");
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 text-gray-700 font-medium"
                          >
                            View Approval
                          </button>
                          <button
                            onClick={() => {
                              onActionClick(p, "view-inventory");
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 text-gray-700 font-medium"
                          >
                            View Inventory
                          </button>
                          <button
                            onClick={() => {
                              onActionClick(p, "duplicate");
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 text-gray-700 font-medium"
                          >
                            Duplicate Product
                          </button>
                          <button
                            onClick={() => {
                              onActionClick(p, "archive");
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-rose-50 text-rose-600 font-medium border-t border-gray-100"
                          >
                            Archive Product
                          </button>
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

      {/* Selection Footer & Pagination */}
      <div className="p-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs bg-gray-50/50">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700">
            {selectedIds.length} of {totalMatching.toLocaleString()} selected
          </span>
          {selectedIds.length > 0 && (
            <>
              <button
                onClick={onSelectAllMatching}
                className="text-[#741d35] font-bold hover:underline"
              >
                Select Page ({products.length.toLocaleString()})
              </button>
              <button onClick={onClearSelection} className="text-gray-500 font-medium hover:underline">
                Clear Selection
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 text-[11px]">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7 rounded border border-gray-300 px-1.5 text-xs text-gray-700 bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(Math.max(1, page - 1))}
              className="p-1 rounded border border-gray-300 text-gray-600 disabled:opacity-40 hover:bg-white"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 py-0.5 rounded bg-[#741d35] text-white font-bold text-[11px]">{page}</span>
            <span className="px-1 text-gray-500">of</span>
            <span className="px-1 text-gray-600 font-semibold">{lastPage}</span>
            <button
              disabled={page >= lastPage}
              onClick={() => onPageChange(Math.min(lastPage, page + 1))}
              className="p-1 rounded border border-gray-300 text-gray-600 hover:bg-white"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
