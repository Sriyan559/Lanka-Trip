"use client";

import React, { useState } from "react";
import { FilterBar, FilterOption } from "../shared/FilterBar";

interface ReturnDetailFilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void;
  onRefresh?: () => void;
}

export function ReturnDetailFilterBar({
  onFilterChange,
  onRefresh,
}: ReturnDetailFilterBarProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    status: "All",
    collectionStatus: "All",
    reverseShipment: "All",
    receiptStatus: "All",
    inspectionStatus: "All",
    disposition: "All",
    refundDependency: "All",
    holdStatus: "All",
    exceptionType: "All",
    slaStatus: "All",
    customer: "All",
    supplier: "All",
    orderReference: "All",
    productSku: "All",
    warehouse: "All",
    collectionDate: "Last 30 Days",
    receiptDate: "All",
    owner: "All",
  });

  const handleSingleChange = (key: string, val: string) => {
    const updated = { ...filterValues, [key]: val };
    setFilterValues(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleClearAll = () => {
    const reset: Record<string, string> = {
      status: "All",
      collectionStatus: "All",
      reverseShipment: "All",
      receiptStatus: "All",
      inspectionStatus: "All",
      disposition: "All",
      refundDependency: "All",
      holdStatus: "All",
      exceptionType: "All",
      slaStatus: "All",
      customer: "All",
      supplier: "All",
      orderReference: "All",
      productSku: "All",
      warehouse: "All",
      collectionDate: "Last 30 Days",
      receiptDate: "All",
      owner: "All",
    };
    setFilterValues(reset);
    if (onFilterChange) onFilterChange(reset);
  };

  const filters: FilterOption[] = [
    {
      id: "status",
      label: "Status",
      options: ["All", "In Transit", "Collected", "Pending WH", "Closed", "On Hold"],
      value: filterValues.status,
      onChange: (v) => handleSingleChange("status", v),
    },
    {
      id: "collectionStatus",
      label: "Collection Status",
      options: ["All", "Collected", "Scheduled", "Failed", "Pending"],
      value: filterValues.collectionStatus,
      onChange: (v) => handleSingleChange("collectionStatus", v),
    },
    {
      id: "reverseShipment",
      label: "Reverse Shipment",
      options: ["All", "In Transit", "Awaiting Receipt", "Delivered"],
      value: filterValues.reverseShipment,
      onChange: (v) => handleSingleChange("reverseShipment", v),
    },
    {
      id: "receiptStatus",
      label: "Receipt Status",
      options: ["All", "Awaiting Receipt", "Confirmed", "Pending"],
      value: filterValues.receiptStatus,
      onChange: (v) => handleSingleChange("receiptStatus", v),
    },
    {
      id: "inspectionStatus",
      label: "Inspection Status",
      options: ["All", "Inspection Pending", "In Progress", "Passed", "Failed"],
      value: filterValues.inspectionStatus,
      onChange: (v) => handleSingleChange("inspectionStatus", v),
    },
    {
      id: "disposition",
      label: "Disposition",
      options: ["All", "Pending", "Restock", "Quarantine", "Supplier Return", "Dispose"],
      value: filterValues.disposition,
      onChange: (v) => handleSingleChange("disposition", v),
    },
    {
      id: "refundDependency",
      label: "Refund Dependency",
      options: ["All", "Blocked", "Pending", "Cleared"],
      value: filterValues.refundDependency,
      onChange: (v) => handleSingleChange("refundDependency", v),
    },
    {
      id: "holdStatus",
      label: "Hold Status",
      options: ["All", "No Hold", "On Hold", "Hold Released"],
      value: filterValues.holdStatus,
      onChange: (v) => handleSingleChange("holdStatus", v),
    },
    {
      id: "exceptionType",
      label: "Exception Type",
      options: ["All", "None", "Collection Failed", "Carrier Delay", "Damaged"],
      value: filterValues.exceptionType,
      onChange: (v) => handleSingleChange("exceptionType", v),
    },
    {
      id: "slaStatus",
      label: "SLA Status",
      options: ["All", "At Risk", "On Track", "Breached"],
      value: filterValues.slaStatus,
      onChange: (v) => handleSingleChange("slaStatus", v),
    },
    {
      id: "customer",
      label: "Customer",
      options: ["All", "Amaya Perera", "Tharushi Silva", "Kavindu Fernando"],
      value: filterValues.customer,
      onChange: (v) => handleSingleChange("customer", v),
    },
    {
      id: "supplier",
      label: "Supplier / Seller",
      options: ["All", "Nature Cosmetics", "Glow Beauty Labs", "Pure Silk SL"],
      value: filterValues.supplier,
      onChange: (v) => handleSingleChange("supplier", v),
    },
    {
      id: "orderReference",
      label: "Order Reference",
      options: ["All", "ORD-9928-XA", "ORD-9870-YB", "ORD-9702-BB"],
      value: filterValues.orderReference,
      onChange: (v) => handleSingleChange("orderReference", v),
    },
    {
      id: "productSku",
      label: "Product / SKU",
      options: ["All", "BT-SER-030", "BT-CRE-050", "BT-VIT-030"],
      value: filterValues.productSku,
      onChange: (v) => handleSingleChange("productSku", v),
    },
    {
      id: "warehouse",
      label: "Warehouse",
      options: ["All", "Colombo WH-001", "Kandy Central WH", "Galle Hub"],
      value: filterValues.warehouse,
      onChange: (v) => handleSingleChange("warehouse", v),
    },
    {
      id: "collectionDate",
      label: "Collection Date",
      options: ["Last 30 Days", "Today", "Last 7 Days", "This Month", "Custom"],
      value: filterValues.collectionDate,
      onChange: (v) => handleSingleChange("collectionDate", v),
    },
    {
      id: "receiptDate",
      label: "Receipt Date",
      options: ["All", "Today", "Last 7 Days", "Last 30 Days"],
      value: filterValues.receiptDate,
      onChange: (v) => handleSingleChange("receiptDate", v),
    },
    {
      id: "owner",
      label: "Owner",
      options: ["All", "Nuwan K.", "Elena Vance", "Hiran W."],
      value: filterValues.owner,
      onChange: (v) => handleSingleChange("owner", v),
    },
  ];

  return (
    <FilterBar
      filters={filters}
      onClearAll={handleClearAll}
      onSaveView={() => alert("Filter view saved successfully.")}
      onRefresh={onRefresh}
    />
  );
}
