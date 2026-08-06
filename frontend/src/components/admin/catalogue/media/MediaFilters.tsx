"use client";

import React from "react";
import { Search, Filter, BookmarkPlus, RefreshCw, Calendar } from "lucide-react";
import { MediaFilterState } from "@/types/mediaManagement";

interface FiltersProps {
  filters: MediaFilterState;
  onChange: (updated: Partial<MediaFilterState>) => void;
  onClearAll: () => void;
  onOpenSaveView: () => void;
  onOpenMoreFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function MediaFilters({
  filters,
  onChange,
  onClearAll,
  onOpenSaveView,
  onOpenMoreFilters,
  onRefresh,
  isRefreshing,
}: FiltersProps) {
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 mb-3 flex flex-col gap-3 shadow-sm">
      {/* First Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID, product, SKU..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full h-8 pl-8 pr-2.5 bg-slate-50 border border-line rounded text-[11px] text-ink focus:outline-none focus:border-[#671021] focus:bg-white transition-colors"
          />
        </div>

        {/* Asset Type */}
        <div>
          <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Asset Type</label>
          <select
            value={filters.assetType}
            onChange={(e) => onChange({ assetType: e.target.value })}
            className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
          >
            <option value="All Types">All Types</option>
            <option value="Product Image — Hero">Product Image — Hero</option>
            <option value="Packaging Image — Back">Packaging Image — Back</option>
            <option value="Packaging Image — Ingredients">Packaging Image — Ingredients</option>
            <option value="Document — Certificate">Document — Certificate</option>
            <option value="Campaign Image — Banner">Campaign Image — Banner</option>
            <option value="Product Demo — Video">Product Demo — Video</option>
            <option value="Lifestyle Image — Model">Lifestyle Image — Model</option>
          </select>
        </div>

        {/* Approval Status */}
        <div>
          <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Approval Status</label>
          <select
            value={filters.approvalStatus}
            onChange={(e) => onChange({ approvalStatus: e.target.value })}
            className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Linked Entity */}
        <div>
          <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Linked Entity</label>
          <select
            value={filters.linkedEntity}
            onChange={(e) => onChange({ linkedEntity: e.target.value })}
            className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
          >
            <option value="All Entities">All Entities</option>
            <option value="Product">Product</option>
            <option value="Brand">Brand</option>
            <option value="Campaign">Campaign</option>
            <option value="Compliance">Compliance</option>
            <option value="Unlinked">Unlinked</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => onChange({ brand: e.target.value })}
            className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
          >
            <option value="All Brands">All Brands</option>
            <option value="Estée Lauder">Estée Lauder</option>
            <option value="Shiseido">Shiseido</option>
            <option value="Chanel">Chanel</option>
            <option value="Luxe Botanic">Luxe Botanic</option>
            <option value="SL Beauty">SL Beauty</option>
            <option value="La Roche-Posay">La Roche-Posay</option>
          </select>
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Supplier</label>
          <select
            value={filters.supplier}
            onChange={(e) => onChange({ supplier: e.target.value })}
            className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
          >
            <option value="All Suppliers">All Suppliers</option>
            <option value="CosmeTech Ltd">CosmeTech Ltd</option>
            <option value="Apex Beauty Dist">Apex Beauty Dist</option>
            <option value="Global Luxe Corp">Global Luxe Corp</option>
          </select>
        </div>

        {/* Product / SKU */}
        <div>
          <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Product / SKU</label>
          <select
            value={filters.productSku}
            onChange={(e) => onChange({ productSku: e.target.value })}
            className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
          >
            <option value="All Products">All Products</option>
            <option value="Radiance Vitamin C Serum">Radiance Vitamin C Serum</option>
            <option value="Tokyo Brightening Essence">Tokyo Brightening Essence</option>
            <option value="Luxe Silk Lipstick">Luxe Silk Lipstick</option>
            <option value="EU Safety Certificate">EU Safety Certificate</option>
            <option value="Summer Glow Campaign">Summer Glow Campaign</option>
            <option value="Pure Glow Cleanser">Pure Glow Cleanser</option>
          </select>
        </div>
      </div>

      {/* Second Filter Row */}
      <div className="flex flex-wrap items-end justify-between gap-2.5 pt-1 border-t border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 flex-1">
          {/* Quality Status */}
          <div>
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Quality Status</label>
            <select
              value={filters.qualityStatus}
              onChange={(e) => onChange({ qualityStatus: e.target.value })}
              className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
            >
              <option value="All">All</option>
              <option value="High Quality">High Quality (&ge;90)</option>
              <option value="Needs Improvement">Needs Improvement (75-89)</option>
              <option value="Low Quality">Low Quality (&lt;75)</option>
            </select>
          </div>

          {/* Rights Status */}
          <div>
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Rights Status</label>
            <select
              value={filters.rightsStatus}
              onChange={(e) => onChange({ rightsStatus: e.target.value })}
              className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
            >
              <option value="All">All</option>
              <option value="Valid">Valid</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Missing License">Missing License</option>
            </select>
          </div>

          {/* Channel Compatibility */}
          <div>
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Channel Compatibility</label>
            <select
              value={filters.channelCompatibility}
              onChange={(e) => onChange({ channelCompatibility: e.target.value })}
              className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
            >
              <option value="All">All</option>
              <option value="Marketplace Ready">Marketplace Ready</option>
              <option value="Mobile Ready">Mobile Ready</option>
              <option value="B2B Ready">B2B Ready</option>
            </select>
          </div>

          {/* Resolution Quality */}
          <div>
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Resolution Quality</label>
            <select
              value={filters.resolutionQuality}
              onChange={(e) => onChange({ resolutionQuality: e.target.value })}
              className="w-full h-8 px-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
            >
              <option value="All">All</option>
              <option value="High Res 4K+">High Res (2400px+)</option>
              <option value="Full HD 1080p">Full HD (1080p)</option>
              <option value="Low Res <800px">Low Res (&lt;800px)</option>
            </select>
          </div>

          {/* Updated Date */}
          <div className="relative">
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-0.5">Updated Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select date range"
                value={filters.dateRange}
                onChange={(e) => onChange({ dateRange: e.target.value })}
                className="w-full h-8 pl-7 pr-2 bg-white border border-line rounded text-[11px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
              />
              <Calendar size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMoreFilters}
            className="h-8 px-3 rounded border border-line bg-white text-[11px] font-bold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Filter size={13} />
            <span>More Filters</span>
          </button>

          <button
            onClick={onClearAll}
            className="h-8 px-3 text-[11px] font-bold text-rose-600 hover:underline"
          >
            Clear All
          </button>

          <button
            onClick={onOpenSaveView}
            className="h-8 px-3 rounded border border-line bg-white text-[11px] font-bold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <BookmarkPlus size={13} />
            <span>Save View</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-8 px-3.5 rounded bg-[#671021] text-white text-[11px] font-bold hover:bg-[#520c1a] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
