"use client";

import React, { useState } from "react";
import { Copy, MoreHorizontal, Eye, Edit3, ExternalLink, ShieldCheck, Truck, Tv, AlertTriangle, UserPlus, History, Archive, Check } from "lucide-react";
import toast from "react-hot-toast";
import { CatalogueBrand } from "@/types/brandManagement";

interface BrandTableProps {
  brands: CatalogueBrand[];
  selectedBrandIds: string[];
  selectedBrand: CatalogueBrand | null;
  onSelectBrand: (brand: CatalogueBrand) => void;
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onEditBrand: (brand: CatalogueBrand) => void;
  onManageAuthorization: (brand: CatalogueBrand) => void;
  onViewProducts: (brand: CatalogueBrand) => void;
  onArchiveBrand: (brand: CatalogueBrand) => void;
}

export const BrandTable: React.FC<BrandTableProps> = ({
  brands,
  selectedBrandIds,
  selectedBrand,
  onSelectBrand,
  onToggleSelectRow,
  onToggleSelectAll,
  onEditBrand,
  onManageAuthorization,
  onViewProducts,
  onArchiveBrand,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAllSelected = brands.length > 0 && brands.every((b) => selectedBrandIds.includes(b.id));

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
            <h3 className="text-sm font-bold text-gray-900">Brand Masters</h3>
            <p className="text-[11px] text-gray-500">Showing active brand masters and governance records</p>
          </div>
          <span className="text-[11px] font-semibold text-gray-500">
            {brands.length} records found
          </span>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto overscroll-x-contain scrollbar-gutter-stable border border-gray-200 rounded max-h-[520px]">
          <table className="w-full text-left border-collapse text-[11.5px] min-w-[1200px]">
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
                <th className="py-2 px-3 align-middle">Brand / Logo</th>
                <th className="py-2 px-3 align-middle">Brand ID</th>
                <th className="py-2 px-3 align-middle">Legal Owner / Manufacturer</th>
                <th className="py-2 px-3 align-middle">Primary Supplier</th>
                <th className="py-2 px-3 align-middle">Country</th>
                <th className="py-2 px-3 text-right align-middle">Active Products</th>
                <th className="py-2 px-3 text-center align-middle">Categories</th>
                <th className="py-2 px-3 text-center align-middle">Verification</th>
                <th className="py-2 px-3 text-center align-middle">Authorization</th>
                <th className="py-2 px-3 align-middle">Territory</th>
                <th className="py-2 px-3 text-center align-middle">Channel Eligibility</th>
                <th className="py-2 px-3 text-center align-middle">Compliance</th>
                <th className="py-2 px-3 align-middle">Catalogue Readiness</th>
                <th className="py-2 px-3 text-center align-middle">Duplicate Risk</th>
                <th className="py-2 px-3 text-center align-middle">Risk Level</th>
                <th className="py-2 px-3 align-middle">Brand Owner</th>
                <th className="py-2 px-3 align-middle">Updated At</th>
                <th className="py-2 px-3 text-center align-middle">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {brands.map((b) => {
                const isSelectedRow = selectedBrand?.id === b.id;
                const isChecked = selectedBrandIds.includes(b.id);

                return (
                  <tr
                    key={b.id}
                    onClick={() => onSelectBrand(b)}
                    className={`h-11 hover:bg-gray-50/80 cursor-pointer transition-colors ${
                      isSelectedRow ? "bg-[#f5ebed]/50 font-medium" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-2 px-3 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSelectRow(b.id)}
                        className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                      />
                    </td>

                    {/* Brand / Logo */}
                    <td className="py-2 px-3 font-bold text-gray-900 hover:text-[#741d35] align-middle whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[9px] font-extrabold text-[#741d35] shrink-0">
                          {b.initials}
                        </div>
                        <span>{b.brandName}</span>
                      </div>
                    </td>

                    {/* Brand ID */}
                    <td className="py-2 px-3 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[10.5px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                          {b.brandId}
                        </span>
                        <button
                          onClick={(e) => handleCopyId(b.brandId, e)}
                          title="Copy ID"
                          className="text-gray-400 hover:text-gray-700 p-0.5"
                        >
                          {copiedId === b.brandId ? (
                            <Check size={11} className="text-emerald-600" />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Legal Owner */}
                    <td className="py-2 px-3 text-gray-600 max-w-[170px] truncate align-middle" title={b.legalOwner}>
                      {b.legalOwner}
                    </td>

                    {/* Primary Supplier */}
                    <td className="py-2 px-3 text-gray-600 max-w-[170px] truncate align-middle" title={b.primarySupplier}>
                      {b.primarySupplier}
                    </td>

                    {/* Country */}
                    <td className="py-2 px-3 text-gray-700 align-middle whitespace-nowrap">{b.country}</td>

                    {/* Active Products */}
                    <td className="py-2 px-3 text-right font-mono font-semibold text-gray-900 align-middle">
                      {b.activeProductsCount.toLocaleString()}
                    </td>

                    {/* Categories */}
                    <td className="py-2 px-3 text-center font-semibold text-gray-700 align-middle">
                      {b.categoriesCount}
                    </td>

                    {/* Verification */}
                    <td className="py-2 px-3 text-center align-middle">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.verificationStatus === "Verified"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.verificationStatus === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {b.verificationStatus}
                      </span>
                    </td>

                    {/* Authorization */}
                    <td className="py-2 px-3 text-center align-middle whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.authorizationStatus === "Valid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.authorizationStatus === "Expiring Soon" || b.authorizationStatus === "Conditional"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {b.authorizationStatus}
                      </span>
                    </td>

                    {/* Territory */}
                    <td className="py-2 px-3 text-gray-600 align-middle whitespace-nowrap">{b.territory}</td>

                    {/* Channel Eligibility */}
                    <td className="py-2 px-3 text-center align-middle whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 font-semibold text-gray-800">
                        <span>{b.channelEligibility}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                    </td>

                    {/* Compliance */}
                    <td className="py-2 px-3 text-center align-middle">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          b.complianceStatus === "Compliant"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {b.complianceStatus}
                      </span>
                    </td>

                    {/* Catalogue Readiness */}
                    <td className="py-2 px-3 min-w-[110px] align-middle">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[10.5px] shrink-0 w-8 text-right font-mono">
                          {b.catalogueReadinessPercent}%
                        </span>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              b.catalogueReadinessPercent >= 85
                                ? "bg-emerald-500"
                                : b.catalogueReadinessPercent >= 70
                                ? "bg-sky-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${b.catalogueReadinessPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Duplicate Risk */}
                    <td className="py-2 px-3 text-center align-middle whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            b.duplicateRisk === "Low"
                              ? "bg-emerald-500"
                              : b.duplicateRisk === "Medium"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                        />
                        <span className="font-semibold text-gray-800 text-[10.5px]">{b.duplicateRisk}</span>
                      </div>
                    </td>

                    {/* Risk Level */}
                    <td className="py-2 px-3 text-center align-middle">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          b.riskLevel === "Low"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.riskLevel === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {b.riskLevel}
                      </span>
                    </td>

                    {/* Brand Owner */}
                    <td className="py-2 px-3 align-middle whitespace-nowrap font-medium text-gray-800">
                      {b.brandOwner}
                    </td>

                    {/* Updated At */}
                    <td className="py-2 px-3 text-gray-500 text-[10.5px] align-middle whitespace-nowrap font-mono">
                      {b.updatedAt}
                    </td>

                    {/* Actions dropdown */}
                    <td className="py-2 px-3 text-center align-middle relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === b.id ? null : b.id)}
                        className="p-1 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <MoreHorizontal size={14} />
                      </button>

                      {activeMenuId === b.id && (
                        <div className="absolute right-3 top-8 z-30 w-48 bg-white rounded border border-gray-200 shadow-lg py-1 text-left text-xs">
                          <button
                            onClick={() => {
                              onSelectBrand(b);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Eye size={13} /> View Brand Details
                          </button>
                          <button
                            onClick={() => {
                              onEditBrand(b);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Edit3 size={13} /> Edit Brand
                          </button>
                          <button
                            onClick={() => {
                              onViewProducts(b);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <ExternalLink size={13} /> View Products
                          </button>
                          <button
                            onClick={() => {
                              onManageAuthorization(b);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <ShieldCheck size={13} /> Manage Authorization
                          </button>
                          <button
                            onClick={() => {
                              toast.success(`Manage Suppliers for ${b.brandName}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Truck size={13} /> Manage Suppliers
                          </button>
                          <button
                            onClick={() => {
                              toast.success(`Configure Channels for ${b.brandName}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <Tv size={13} /> Configure Channels
                          </button>
                          <button
                            onClick={() => {
                              toast.success(`Compliance check for ${b.brandName}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <AlertTriangle size={13} /> View Compliance
                          </button>
                          <button
                            onClick={() => {
                              toast.success(`Assign Owner for ${b.brandName}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <UserPlus size={13} /> Assign Brand Owner
                          </button>
                          <button
                            onClick={() => {
                              toast.success(`View Audit History for ${b.brandName}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium"
                          >
                            <History size={13} /> View Audit History
                          </button>
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={() => {
                              onArchiveBrand(b);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                          >
                            <Archive size={13} /> Archive Brand
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
          Showing 1 to {brands.length} of 486 records
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button disabled className="w-7 h-7 rounded border border-gray-200 text-gray-300 cursor-not-allowed flex items-center justify-center">
              &lt;
            </button>
            <button className="w-7 h-7 rounded bg-[#741d35] text-white font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center">
              2
            </button>
            <button className="w-7 h-7 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center">
              3
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-7 h-7 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center">
              81
            </button>
            <button className="w-7 h-7 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center">
              &gt;
            </button>
          </div>
          <select className="h-7 px-2 rounded border border-gray-300 text-xs font-semibold text-gray-700 focus:outline-none">
            <option>25 / page</option>
            <option>50 / page</option>
            <option>100 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};
