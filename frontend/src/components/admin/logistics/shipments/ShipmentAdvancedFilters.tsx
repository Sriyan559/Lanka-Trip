"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Filter, Bookmark, RefreshCw, Download, Plus, X } from "lucide-react";

interface ShipmentAdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onRefresh?: () => void;
  onCreateClick?: () => void;
  recordCount?: number;
}

export function ShipmentAdvancedFilters({
  filters,
  onFilterChange,
  onClearFilters,
  onRefresh,
  onCreateClick,
  recordCount = 1426,
}: ShipmentAdvancedFiltersProps) {
  const [showAllFilters, setShowAllFilters] = useState(false);

  const primaryFilterKeys = [
    { label: "Shipment Status", key: "status" },
    { label: "Pickup Status", key: "pickup_status" },
    { label: "Transit Status", key: "transit_status" },
    { label: "Delivery Status", key: "delivery_status" },
    { label: "POD Status", key: "pod_status" },
    { label: "Return Status", key: "return_status" },
    { label: "Hold Status", key: "hold_status" },
    { label: "Exception Status", key: "exception_status" },
    { label: "Reconciliation Status", key: "reconciliation_status" },
    { label: "SLA Status", key: "sla_status" },
  ];

  const secondaryFilterKeys = [
    { label: "Carrier", key: "carrier" },
    { label: "Courier", key: "courier" },
    { label: "Shipping Service", key: "shipping_service" },
    { label: "Service Level", key: "service_level" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Fulfilment Centre", key: "fulfilment_centre" },
    { label: "Origin Region", key: "origin_region" },
    { label: "Destination Region", key: "dest_region" },
    { label: "District", key: "district" },
    { label: "City", key: "city" },
    { label: "Delivery Zone", key: "delivery_zone" },
    { label: "Customer", key: "customer" },
    { label: "Supplier / Seller", key: "supplier" },
    { label: "Fulfilment Order", key: "fulfilment_order" },
    { label: "Marketplace Order", key: "market_order" },
    { label: "Business Unit", key: "bu" },
    { label: "Sales Channel", key: "channel" },
    { label: "Payment Method", key: "payment_method" },
    { label: "COD Status", key: "cod_status" },
    { label: "Package Count Band", key: "pkg_band" },
    { label: "Weight Band", key: "weight_band" },
    { label: "Shipment Value Band", key: "value_band" },
    { label: "Shipping Cost Band", key: "cost_band" },
    { label: "Shipment Owner", key: "shipment_owner" },
    { label: "Exception Owner", key: "exception_owner" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 sm:p-3 space-y-2 text-[10px]">
      {/* SEARCH AND ACTION BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" size={12} />
          <input
            type="text"
            placeholder="Search by ref, tracking number, order, customer, carrier..."
            className="w-full pl-7 pr-3 py-1 bg-canvas border border-line rounded-md text-[9.5px] font-medium focus:outline-none focus:border-primary-900 transition-colors"
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => alert("Saved current search view configuration!")}
            className="px-2 py-1 bg-white border border-line text-ink text-[9.5px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1"
          >
            <Bookmark size={11} className="text-muted" />
            <span>Save View</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="px-2 py-1 bg-white border border-line text-ink text-[9.5px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1"
          >
            <Filter size={11} className="text-muted" />
            <span>{showAllFilters ? "Hide Filters" : "More Filters"}</span>
          </button>

          <button
            type="button"
            onClick={onClearFilters}
            className="px-2 py-1 bg-white border border-line text-muted hover:text-ink text-[9.5px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1"
          >
            <X size={11} />
            <span>Clear All</span>
          </button>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="px-2 py-1 bg-white border border-line text-ink text-[9.5px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1"
            >
              <RefreshCw size={11} />
              <span>Refresh</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => alert("Exporting filtered operational data...")}
            className="px-2 py-1 bg-white border border-line text-ink text-[9.5px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1"
          >
            <Download size={11} />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={onCreateClick || (() => alert("Opening Create Shipment Dialog"))}
            className="px-2.5 py-1 bg-primary-900 text-white text-[9.5px] font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1"
          >
            <Plus size={12} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* FILTER DROPDOWN GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1.5">
        {primaryFilterKeys.map((item) => (
          <div key={item.key} className="relative">
            <select
              value={filters[item.key] || "all"}
              onChange={(e) => onFilterChange({ [item.key]: e.target.value })}
              className="w-full px-2 py-1 bg-white border border-line rounded-md text-[9px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-5 truncate"
            >
              <option value="all">{item.label}: All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="exception">Exception</option>
            </select>
            <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        ))}

        {showAllFilters &&
          secondaryFilterKeys.map((item) => (
            <div key={item.key} className="relative">
              <select
                value={filters[item.key] || "all"}
                onChange={(e) => onFilterChange({ [item.key]: e.target.value })}
                className="w-full px-2 py-1 bg-white border border-line rounded-md text-[9px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-5 truncate"
              >
                <option value="all">{item.label}: All</option>
                <option value="option1">Select {item.label}</option>
              </select>
              <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          ))}
      </div>
    </div>
  );
}
