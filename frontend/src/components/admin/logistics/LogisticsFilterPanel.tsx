"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Filter, Bookmark, RefreshCw, Download, Plus, X } from "lucide-react";

interface LogisticsFilterPanelProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onRefresh?: () => void;
  onCreateClick?: () => void;
}

export function LogisticsFilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  onRefresh,
  onCreateClick,
}: LogisticsFilterPanelProps) {
  const [showAllFilters, setShowAllFilters] = useState(false);

  const primaryFilterKeys = [
    { label: "Operation Type", key: "op_type" },
    { label: "Fulfilment Status", key: "fulfilment_status" },
    { label: "Allocation Status", key: "allocation_status" },
    { label: "Picking Status", key: "picking_status" },
    { label: "Packing Status", key: "packing_status" },
    { label: "Dispatch Status", key: "dispatch_status" },
    { label: "Shipment Status", key: "status" },
    { label: "Delivery Status", key: "delivery_status" },
    { label: "Return Status", key: "return_status" },
    { label: "Exception Status", key: "exception_status" },
    { label: "Claim Status", key: "claim_status" },
    { label: "Reconciliation Status", key: "reconciliation_status" },
  ];

  const secondaryFilterKeys = [
    { label: "SLA Status", key: "sla_status" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Fulfilment Centre", key: "fulfilment_centre" },
    { label: "Carrier", key: "carrier" },
    { label: "Courier", key: "courier" },
    { label: "Delivery Service", key: "delivery_service" },
    { label: "Delivery Zone", key: "delivery_zone" },
    { label: "Service Level", key: "service_level" },
    { label: "Order Type", key: "order_type" },
    { label: "Customer Type", key: "customer_type" },
    { label: "Supplier", key: "supplier" },
    { label: "Seller", key: "seller" },
    { label: "Product Category", key: "category" },
    { label: "Brand", key: "brand" },
    { label: "Sales Channel", key: "channel" },
    { label: "Business Unit", key: "bu" },
    { label: "Region", key: "region" },
    { label: "District", key: "district" },
    { label: "City", key: "city" },
    { label: "Fulfilment Owner", key: "fulfilment_owner" },
    { label: "Logistics Owner", key: "logistics_owner" },
    { label: "Exception Owner", key: "exception_owner" },
  ];

  const quickFilterChips = [
    { label: "Allocation Pending (84)", color: "bg-amber-50 text-amber-800 border-amber-200" },
    { label: "Picking (126)", color: "bg-purple-50 text-purple-800 border-purple-200" },
    { label: "Packing (96)", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { label: "Dispatched (142)", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    { label: "In Transit (286)", color: "bg-sky-50 text-sky-800 border-sky-200" },
    { label: "Out for Delivery (118)", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { label: "Exceptions (42)", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { label: "SLA Breaches (12)", color: "bg-rose-100 text-rose-900 border-rose-300 font-bold" },
    { label: "Returns Pending (38)", color: "bg-purple-50 text-purple-800 border-purple-200" },
    { label: "Reconciliation Required (16)", color: "bg-amber-50 text-amber-800 border-amber-200" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-4">
      {/* SEARCH AND ACTION BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search by ref, order, customer, supplier, shipment ID, tracking number..."
            className="w-full pl-9 pr-4 py-2 bg-canvas border border-line rounded-lg text-xs font-medium focus:outline-none focus:border-primary-900 transition-colors"
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Saved current search view configuration!")}
            className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Bookmark size={13} className="text-muted" />
            <span>Save View</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Filter size={13} className="text-muted" />
            <span>{showAllFilters ? "Fewer Filters" : "More Filters"}</span>
          </button>

          <button
            type="button"
            onClick={onClearFilters}
            className="px-3 py-1.5 bg-white border border-line text-muted hover:text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <X size={13} />
            <span>Clear All</span>
          </button>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Refresh</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => alert("Exporting filtered operational data...")}
            className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download size={13} />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={onCreateClick || (() => alert("Opening Create Operation Dialog"))}
            className="px-3.5 py-1.5 bg-primary-900 text-white text-xs font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* FILTER DROPDOWN GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
        {primaryFilterKeys.map((item) => (
          <div key={item.key} className="relative">
            <select
              value={filters[item.key] || "all"}
              onChange={(e) => onFilterChange({ [item.key]: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-line rounded-lg text-[11px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-6 truncate"
            >
              <option value="all">{item.label}: All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="exception">Exception</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        ))}

        {showAllFilters &&
          secondaryFilterKeys.map((item) => (
            <div key={item.key} className="relative">
              <select
                value={filters[item.key] || "all"}
                onChange={(e) => onFilterChange({ [item.key]: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-line rounded-lg text-[11px] font-medium text-ink focus:outline-none focus:border-primary-900 cursor-pointer appearance-none pr-6 truncate"
              >
                <option value="all">{item.label}: All</option>
                <option value="option1">Select {item.label}</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          ))}
      </div>

      {/* QUICK CHIPS */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-line">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted mr-1">Quick Filters:</span>
        {quickFilterChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => onFilterChange({ quick: chip.label })}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-transform hover:scale-105 cursor-pointer ${chip.color}`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
