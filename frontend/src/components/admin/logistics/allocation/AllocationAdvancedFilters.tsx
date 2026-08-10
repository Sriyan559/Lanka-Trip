"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Bookmark, X, SlidersHorizontal, EyeOff, Eye, RefreshCw } from "lucide-react";

interface AllocationAdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onRefresh?: () => void;
}

export function AllocationAdvancedFilters({
  filters,
  onFilterChange,
  onClearFilters,
  onRefresh,
}: AllocationAdvancedFiltersProps) {
  const [showFilters, setShowFilters] = useState(true);

  const filterSelects = [
    { label: "Allocation Status", key: "allocation_status" },
    { label: "Reservation Status", key: "reservation_status" },
    { label: "Transfer Status", key: "transfer_status" },
    { label: "Shortage Status", key: "shortage_status" },
    { label: "Backorder Status", key: "backorder_status" },
    { label: "Substitution Status", key: "substitution_status" },
    { label: "Hold Status", key: "hold_status" },
    { label: "Exception Status", key: "exception_status" },
    { label: "SLA Status", key: "sla_status" },
    { label: "Product", key: "product" },
    { label: "SKU", key: "sku" },
    { label: "Brand", key: "brand" },
    { label: "Product Category", key: "category" },
    { label: "Supplier", key: "supplier" },
    { label: "Customer", key: "customer" },
    { label: "Fulfilment Order", key: "order" },
    { label: "Sales Channel", key: "channel" },
    { label: "Business Unit", key: "bu" },
    { label: "Region", key: "region" },
    { label: "Destination WH", key: "dest_wh" },
    { label: "Source WH", key: "source_wh" },
    { label: "Facility Type", key: "facility_type" },
    { label: "Allocation Strategy", key: "strategy" },
    { label: "Batch Status", key: "batch_status" },
    { label: "Expiry Risk", key: "expiry_risk" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-2.5 space-y-2 text-[10px]">
      {/* HEADER & SEARCH ROW */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-2 py-1 bg-canvas border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
            {showFilters ? <EyeOff size={12} /> : <Eye size={12} />}
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" size={12} />
            <input
              type="text"
              placeholder="Search allocation ref, order, product, SKU, customer, warehouse..."
              className="w-full pl-7 pr-3 py-1 bg-canvas border border-line rounded-md text-[10px] focus:outline-none focus:border-primary-900 transition-colors"
              value={filters.search || ""}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={onClearFilters}
            className="px-2 py-1 bg-white border border-line text-muted hover:text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <X size={12} />
            <span>Clear All</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Saved filter view preset!")}
            className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <Bookmark size={12} className="text-muted" />
            <span>Save View</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Applied Filters!")}
            className="px-2.5 py-1 bg-primary-900 text-white text-[10px] font-bold rounded-md hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1"
          >
            <span>Apply Filters</span>
          </button>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-1 bg-canvas border border-line text-muted hover:text-ink rounded-md transition-colors"
              title="Refresh filter data"
            >
              <RefreshCw size={12} />
            </button>
          )}
        </div>
      </div>

      {/* FILTER DROPDOWN GRID */}
      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-10 gap-1.5 pt-1.5 border-t border-line">
          {filterSelects.map((f) => (
            <div key={f.key} className="relative">
              <select
                value={filters[f.key] || "all"}
                onChange={(e) => onFilterChange({ [f.key]: e.target.value })}
                className="w-full px-1.5 py-1 bg-white border border-line rounded-md text-[10px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-4 truncate"
              >
                <option value="all">{f.label}: All</option>
                <option value="allocated">Fully Allocated</option>
                <option value="partial">Partially Allocated</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="expiring">Expiring Soon</option>
              </select>
              <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
