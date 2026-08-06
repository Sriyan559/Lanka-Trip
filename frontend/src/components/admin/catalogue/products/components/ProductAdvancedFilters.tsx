"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, RefreshCw, Bookmark, Plus } from "lucide-react";
import { AdvancedFilterState } from "@/types/productMaster";

interface ProductAdvancedFiltersProps {
  filters: AdvancedFilterState;
  onChange: (updated: Partial<AdvancedFilterState>) => void;
  onClearAll: () => void;
  onSaveView: () => void;
  onRefresh: () => void;
  onMoreFilters: () => void;
  isRefreshing?: boolean;
}

export const ProductAdvancedFilters: React.FC<ProductAdvancedFiltersProps> = ({
  filters,
  onChange,
  onClearAll,
  onSaveView,
  onRefresh,
  onMoreFilters,
  isRefreshing = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
      <div
        className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-gray-100 mb-3"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 text-gray-500 ${isExpanded ? "rotate-180" : ""}`}
          />
          <span>Advanced Filters</span>
        </div>
        <span className="text-[11px] text-gray-500">
          {isExpanded ? "Click to collapse" : "Click to expand filter panel"}
        </span>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-3 text-xs">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name, SKU, barcode, or ID..."
                value={filters.search}
                onChange={(e) => onChange({ search: e.target.value })}
                className="w-full h-8 pl-8 pr-2.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
              />
            </div>

            <select
              value={filters.productStatus}
              onChange={(e) => onChange({ productStatus: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#741d35]"
            >
              <option value="All">Product Status: All</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Archived">Archived</option>
            </select>

            <select
              value={filters.approvalStatus}
              onChange={(e) => onChange({ approvalStatus: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#741d35]"
            >
              <option value="All">Approval Status: All</option>
              <option value="Approved">Approved</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Draft">Draft</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={filters.publicationStatus}
              onChange={(e) => onChange({ publicationStatus: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#741d35]"
            >
              <option value="All">Publication Status: All</option>
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
              <option value="Blocked">Blocked</option>
            </select>

            <select
              value={filters.complianceStatus}
              onChange={(e) => onChange({ complianceStatus: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#741d35]"
            >
              <option value="All">Compliance Status: All</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={filters.riskLevel}
              onChange={(e) => onChange({ riskLevel: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#741d35]"
            >
              <option value="All">Risk Level: All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <select
              value={filters.brand}
              onChange={(e) => onChange({ brand: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Brand: All Brands</option>
              <option value="Estée Lauder">Estée Lauder</option>
              <option value="Shiseido">Shiseido</option>
              <option value="Chanel Beauty">Chanel Beauty</option>
              <option value="Botanica Pure">Botanica Pure</option>
            </select>

            <select
              value={filters.supplier}
              onChange={(e) => onChange({ supplier: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Supplier: All Suppliers</option>
              <option value="Luxe Dist.">Luxe Dist.</option>
              <option value="Glow Global Exports">Glow Global Exports</option>
              <option value="Vertex Logistics Hub">Vertex Logistics Hub</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Category: All Categories</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Haircare">Haircare</option>
              <option value="Fragrance">Fragrance</option>
            </select>

            <select
              value={filters.subcategory}
              onChange={(e) => onChange({ subcategory: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Subcategory: All Subcategories</option>
              <option value="Serums">Serums</option>
              <option value="Essences">Essences</option>
              <option value="Lipstick">Lipstick</option>
              <option value="Cleansers">Cleansers</option>
              <option value="Foundation">Foundation</option>
            </select>

            <select
              value={filters.productType}
              onChange={(e) => onChange({ productType: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Product Type: All Types</option>
              <option value="Standard">Standard Product</option>
              <option value="Bundle">Product Bundle</option>
              <option value="Sample">Sample / GWP</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <select
              value={filters.businessUnit}
              onChange={(e) => onChange({ businessUnit: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Business Unit: All Units</option>
              <option value="SL Beauty Enterprise">SL Beauty Enterprise</option>
              <option value="Colombo Main Hub">Colombo Main Hub</option>
              <option value="Kandy Regional">Kandy Regional</option>
            </select>

            <select
              value={filters.variantReadiness}
              onChange={(e) => onChange({ variantReadiness: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Variant Readiness: All</option>
              <option value="Ready">Fully Ready</option>
              <option value="Partial">Partial Attributes</option>
              <option value="Single">Single Item (No Variants)</option>
            </select>

            <select
              value={filters.mediaReadiness}
              onChange={(e) => onChange({ mediaReadiness: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Media Readiness: All</option>
              <option value="Complete">Complete (1:1 Square)</option>
              <option value="Missing">Missing Mandatory Assets</option>
              <option value="LowRes">Low Resolution</option>
            </select>

            <select
              value={filters.inventoryLinkage}
              onChange={(e) => onChange({ inventoryLinkage: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Inventory Linkage: All</option>
              <option value="Linked">Linked</option>
              <option value="Unlinked">Unlinked</option>
            </select>

            <select
              value={filters.duplicateRisk}
              onChange={(e) => onChange({ duplicateRisk: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Duplicate Risk: All</option>
              <option value="High">High Confidence Candidate</option>
              <option value="Medium">Medium Confidence</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <select
              value={filters.brandAuthorization}
              onChange={(e) => onChange({ brandAuthorization: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Brand Auth: All</option>
              <option value="Valid">Valid Authorization</option>
              <option value="Pending">Pending Review</option>
              <option value="Expired">Expired</option>
            </select>

            <select
              value={filters.batchEligibility}
              onChange={(e) => onChange({ batchEligibility: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Batch Eligibility: All</option>
              <option value="Eligible">Eligible</option>
              <option value="NearExpiry">Near Expiry</option>
              <option value="Quarantined">Quarantined</option>
            </select>

            <select
              value={filters.channelEligibility}
              onChange={(e) => onChange({ channelEligibility: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Channel Eligibility: All</option>
              <option value="Omnichannel">Omnichannel (6/6)</option>
              <option value="Restricted">Restricted</option>
            </select>

            <select
              value={filters.countryOfOrigin}
              onChange={(e) => onChange({ countryOfOrigin: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="All">Country of Origin: All</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="USA">USA</option>
              <option value="Sri Lanka">Sri Lanka</option>
            </select>

            <input
              type="text"
              placeholder="Created Date range..."
              value={filters.createdDate}
              onChange={(e) => onChange({ createdDate: e.target.value })}
              className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
            />
          </div>

          {/* Row 5 */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Updated Date range..."
                value={filters.updatedDate}
                onChange={(e) => onChange({ updatedDate: e.target.value })}
                className="h-8 w-36 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
              />

              <select
                value={filters.assignedReviewer}
                onChange={(e) => onChange({ assignedReviewer: e.target.value })}
                className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
              >
                <option value="All">Assigned Reviewer: All</option>
                <option value="Elena Vance">Elena Vance</option>
                <option value="Marcus Lee">Marcus Lee</option>
                <option value="Priya Kapoor">Priya Kapoor</option>
              </select>

              <select
                value={filters.dataCompleteness}
                onChange={(e) => onChange({ dataCompleteness: e.target.value })}
                className="h-8 rounded border border-gray-300 px-2.5 text-xs text-gray-700 focus:outline-none"
              >
                <option value="All">Completeness: All</option>
                <option value="High">High (≥ 90%)</option>
                <option value="Medium">Medium (70–89%)</option>
                <option value="Low">Low (&lt; 70%)</option>
              </select>

              <button
                onClick={onMoreFilters}
                className="h-8 px-3 rounded border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Plus size={13} />
                <span>More Filters</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClearAll}
                className="h-8 px-3 rounded border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Clear All
              </button>
              <button
                onClick={onSaveView}
                className="h-8 px-3 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Bookmark size={13} />
                <span>Save View</span>
              </button>
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="h-8 px-4 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />
                <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
