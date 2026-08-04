import React from "react";
import { Search, SlidersHorizontal, ChevronDown, Filter } from "lucide-react";

interface LogisticsFilterPanelProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}

export function LogisticsFilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
}: LogisticsFilterPanelProps) {
  
  const dropdownFilters = [
    { label: "Shipment Status", key: "status" },
    { label: "Delivery Status", key: "deliveryStatus" },
    { label: "Pickup Status", key: "pickupStatus" },
    { label: "Package Status", key: "packageStatus" },
    { label: "Shipment Type", key: "type" },
    { label: "Carrier", key: "carrier" },
    { label: "Supplier", key: "supplier" },
    { label: "Customer", key: "customer" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Destination Region", key: "destination" },
    { label: "Risk Level", key: "risk" },
    { label: "SLA Status", key: "sla" },
  ];

  const dateFilters = [
    { label: "Assigned Officer", key: "officer", type: "text" },
    { label: "Created Date", key: "createdDate", type: "date" },
    { label: "Pickup Date", key: "pickupDate", type: "date" },
    { label: "Expected Delivery Date", key: "expectedDelivery", type: "date" },
  ];

  const quickFilters = [
    { label: "Pending Carrier (36)", color: "bg-gray-100 text-muted" },
    { label: "In Transit (486)", color: "bg-gray-100 text-muted" },
    { label: "Pickup Today (84)", color: "bg-gray-100 text-muted" },
    { label: "Exceptions (23)", color: "bg-red-50 text-danger border border-red-100" },
    { label: "COD Pending (1.84M)", color: "bg-yellow-50 text-warning border border-yellow-100" },
    { label: "SLA Breach (9)", color: "bg-red-50 text-danger border border-red-100" },
    { label: "Delivery Delay (58)", color: "bg-yellow-50 text-warning border border-yellow-100" },
    { label: "Returns (18)", color: "bg-purple-50 text-purple-600 border border-purple-100" },
    { label: "Out for Delivery (96)", color: "bg-gray-100 text-muted" },
    { label: "High Risk", color: "bg-red-50 text-danger border border-red-100" },
    { label: "Package Not Ready (31)", color: "bg-yellow-50 text-warning border border-yellow-100" },
    { label: "Missing Tracking (27)", color: "bg-gray-100 text-muted" },
    { label: "Customer Complaint (15)", color: "bg-purple-50 text-purple-600 border border-purple-100" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-4">
      {/* SEARCH ROW */}
      <div className="relative w-full max-w-4xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          placeholder="Search shipment ID, order ID, customer, supplier, tracking number, package or batch..."
          className="w-full pl-10 pr-4 py-2 bg-canvas border border-line rounded-lg text-sm focus:outline-none focus:border-primary-900 transition-colors"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>

      {/* DROPDOWN GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {dropdownFilters.map(filter => (
          <div key={filter.key} className="relative cursor-pointer">
            <div className="w-full px-3 py-2 bg-white border border-line rounded-lg text-[13px] flex items-center justify-between hover:border-slate-300 transition-colors group">
              <span className="text-muted group-hover:text-ink transition-colors">{filter.label}</span>
              <ChevronDown size={14} className="text-muted" />
            </div>
          </div>
        ))}
        {dateFilters.map(filter => (
          <div key={filter.key} className="relative cursor-pointer">
            <div className="w-full px-3 py-2 bg-white border border-line rounded-lg text-[13px] flex items-center justify-between hover:border-slate-300 transition-colors group">
              <span className="text-muted group-hover:text-ink transition-colors">{filter.label}</span>
              {filter.type === 'date' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ) : (
                <ChevronDown size={14} className="text-muted" />
              )}
            </div>
          </div>
        ))}
        <div className="relative cursor-pointer flex items-center justify-end">
          <button className="text-[13px] font-medium text-ink hover:text-primary-900 transition-colors flex items-center gap-1">
            <Filter size={14} /> More Filters
          </button>
        </div>
      </div>

      {/* QUICK CHIPS */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-line">
        {quickFilters.map((chip, i) => (
          <button key={i} className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-transform hover:scale-105 active:scale-95 cursor-pointer ${chip.color}`}>
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
