"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { ShipmentFilterParams } from "@/types/admin";
import { useDebounce } from "@/hooks/useDebounce";

interface ShipmentFiltersProps {
  filters: ShipmentFilterParams;
  onChange: (filters: ShipmentFilterParams) => void;
}

export function ShipmentFilters({ filters, onChange }: ShipmentFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onChange({ ...filters, search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, filters, onChange]);

  const handleChange = (key: keyof ShipmentFilterParams, value: any) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const handleClear = () => {
    onChange({
      page: 1,
      pageSize: filters.pageSize,
      search: "",
      shipmentStatus: "all",
      pickupStatus: "all",
      deliveryStatus: "all",
      packageStatus: "all",
      codStatus: "all",
      riskLevel: "all",
      slaStatus: "all",
      carrier: "all",
    });
    setSearchTerm("");
  };

  const hasActiveFilters = 
    searchTerm !== "" || 
    filters.shipmentStatus !== "all" ||
    filters.pickupStatus !== "all" ||
    filters.deliveryStatus !== "all" ||
    filters.packageStatus !== "all" ||
    filters.codStatus !== "all" ||
    filters.riskLevel !== "all" ||
    filters.slaStatus !== "all" ||
    filters.carrier !== "all";

  return (
    <div className="logistics-workspace-main filter-panel-rich">
      <div className="filter-top-row">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search by Shipment ID, Order, or Customer..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={handleClear}>
            <X size={14} /> Clear Filters
          </button>
        )}
      </div>

      <div className="filter-controls-grid">
        <div className="filter-group">
          <label>Shipment Status</label>
          <select value={filters.shipmentStatus || "all"} onChange={(e) => handleChange("shipmentStatus", e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Pickup Status</label>
          <select value={filters.pickupStatus || "all"} onChange={(e) => handleChange("pickupStatus", e.target.value)}>
            <option value="all">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Delivery Status</label>
          <select value={filters.deliveryStatus || "all"} onChange={(e) => handleChange("deliveryStatus", e.target.value)}>
            <option value="all">All</option>
            <option value="Not Dispatched">Not Dispatched</option>
            <option value="In Progress">In Progress</option>
            <option value="Delayed">Delayed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Carrier</label>
          <select value={filters.carrier || "all"} onChange={(e) => handleChange("carrier", e.target.value)}>
            <option value="all">All Carriers</option>
            <option value="ExpressLogistics">ExpressLogistics</option>
            <option value="CityCouriers">CityCouriers</option>
            <option value="NationWide">NationWide</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Risk Level</label>
          <select value={filters.riskLevel || "all"} onChange={(e) => handleChange("riskLevel", e.target.value)}>
            <option value="all">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-group">
          <label>SLA Status</label>
          <select value={filters.slaStatus || "all"} onChange={(e) => handleChange("slaStatus", e.target.value)}>
            <option value="all">All</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Breached">Breached</option>
          </select>
        </div>
      </div>
    </div>
  );
}

