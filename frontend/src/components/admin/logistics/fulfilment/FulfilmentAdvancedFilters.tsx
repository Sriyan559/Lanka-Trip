"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Filter, Bookmark, RefreshCw, X, SlidersHorizontal } from "lucide-react";

interface FulfilmentAdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onRefresh?: () => void;
  recordCount?: number;
}

export function FulfilmentAdvancedFilters({
  filters,
  onFilterChange,
  onClearFilters,
  onRefresh,
  recordCount = 1248,
}: FulfilmentAdvancedFiltersProps) {
  const [showAll, setShowAll] = useState(false);

  const filterFields = [
    { label: "Fulfilment Status", key: "fulfilment_status" },
    { label: "Allocation Status", key: "allocation_status" },
    { label: "Picking Status", key: "picking_status" },
    { label: "Packing Status", key: "packing_status" },
    { label: "Quality Status", key: "quality_status" },
    { label: "Dispatch Status", key: "dispatch_status" },
    { label: "Hold Status", key: "hold_status" },
    { label: "Exception Status", key: "exception_status" },
    { label: "SLA Status", key: "sla_status" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Fulfilment Centre", key: "fulfilment_centre" },
    { label: "Supplier", key: "supplier" },
    { label: "Seller", key: "seller" },
    { label: "Customer", key: "customer" },
    { label: "Sales Channel", key: "channel" },
    { label: "Business Unit", key: "bu" },
    { label: "Region", key: "region" },
    { label: "Delivery Zone", key: "zone" },
    { label: "Order Type", key: "order_type" },
    { label: "Product Category", key: "category" },
    { label: "Brand", key: "brand" },
    { label: "Warehouse Owner", key: "warehouse_owner" },
    { label: "Inventory Source", key: "inventory_source" },
    { label: "Allocation Strategy", key: "allocation_strategy" },
    { label: "Priority", key: "priority" },
    { label: "Service Level", key: "service_level" },
    { label: "Payment Method", key: "payment_method" },
    { label: "COD Status", key: "cod_status" },
    { label: "Order Value Band", key: "value_band" },
    { label: "Item Count Band", key: "item_count_band" },
    { label: "Date Range", key: "date_range" },
    { label: "Fulfilment Owner", key: "owner" },
  ];

  const visibleFields = showAll ? filterFields : filterFields.slice(0, 18);

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 text-xs">
      {/* HEADER & SEARCH ROW */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="font-bold text-ink text-xs uppercase tracking-wider">
            Advanced Filters
          </span>
          <span className="text-[11px] text-muted bg-canvas border border-line px-2 py-0.5 rounded font-mono font-medium">
            {recordCount.toLocaleString()} records
          </span>

          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
            <input
              type="text"
              placeholder="Search fulfilment ID, order ID, customer, SKU, warehouse..."
              className="w-full pl-8 pr-4 py-1.5 bg-canvas border border-line rounded-lg text-xs focus:outline-none focus:border-primary-900 transition-colors"
              value={filters.search || ""}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onClearFilters}
            className="px-2.5 py-1.5 bg-white border border-line text-muted hover:text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <X size={13} />
            <span>Clear All</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Saved current view filter preset!")}
            className="px-2.5 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <Bookmark size={13} className="text-muted" />
            <span>Save View</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="px-3 py-1.5 bg-primary-900 text-white text-xs font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1"
            >
              <RefreshCw size={13} />
              <span>Refresh</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="px-2.5 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <SlidersHorizontal size={13} />
            <span>{showAll ? "Close / Adjust" : "More Filters"}</span>
          </button>
        </div>
      </div>

      {/* FILTER DROPDOWN GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {visibleFields.map((field) => (
          <div key={field.key} className="relative">
            <select
              value={filters[field.key] || "all"}
              onChange={(e) => onFilterChange({ [field.key]: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-line rounded-lg text-[11px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-6 truncate"
            >
              <option value="all">{field.label}: All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="flagged">Flagged</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
