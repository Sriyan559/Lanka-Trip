"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Bookmark, X, SlidersHorizontal, EyeOff, Eye } from "lucide-react";

interface WarehouseAdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onRefresh?: () => void;
  recordCount?: number;
}

export function WarehouseAdvancedFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: WarehouseAdvancedFiltersProps) {
  const [showFilters, setShowFilters] = useState(true);

  const filterSelects = [
    { label: "Facility Type", key: "type" },
    { label: "Facility Status", key: "status" },
    { label: "Capacity Status", key: "capacity" },
    { label: "Operational Status", key: "operational" },
    { label: "Region", key: "region" },
    { label: "Province", key: "province" },
    { label: "District", key: "district" },
    { label: "City", key: "city" },
    { label: "Business Unit", key: "bu" },
    { label: "Sales Channel", key: "channel" },
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
              placeholder="Search facility name, reference, operator, city..."
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
            <span>Clear</span>
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

          <button
            type="button"
            onClick={() => alert("Opening 30+ Advanced Filters...")}
            className="px-2 py-1 bg-canvas border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
            <SlidersHorizontal size={12} />
            <span>More Filters (+30)</span>
          </button>
        </div>
      </div>

      {/* FILTER DROPDOWN GRID */}
      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-1.5 pt-1.5 border-t border-line">
          {filterSelects.map((f) => (
            <div key={f.key} className="relative">
              <select
                value={filters[f.key] || "all"}
                onChange={(e) => onFilterChange({ [f.key]: e.target.value })}
                className="w-full px-1.5 py-1 bg-white border border-line rounded-md text-[10px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-4 truncate"
              >
                <option value="all">{f.label}: All</option>
                <option value="active">Active</option>
                <option value="warehouse">Warehouse</option>
                <option value="fc">Fulfilment Centre</option>
                <option value="high">High Capacity</option>
                <option value="critical">Critical</option>
              </select>
              <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
