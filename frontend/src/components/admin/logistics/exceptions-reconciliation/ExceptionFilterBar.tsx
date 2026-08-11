"use client";

import React, { useState } from "react";
import { FilterBar, FilterOption } from "../shared/FilterBar";
import { SlidersHorizontal } from "lucide-react";

interface ExceptionFilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void;
  onRefresh?: () => void;
}

export function ExceptionFilterBar({
  onFilterChange,
  onRefresh,
}: ExceptionFilterBarProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    exceptionType: "All",
    severity: "All",
    exceptionStatus: "All",
    claimType: "All",
    claimStatus: "All",
    liabilityParty: "All",
    reconciliationState: "All",
    matchState: "All",
    recoveryState: "All",
    holdStatus: "All",
    slaStatus: "All",
    region: "All",
    owner: "All",
    shipment: "All",
    fulfilment: "All",
    carrier: "All",
    supplier: "All",
    createdDate: "Last 30 Days",
  });

  const handleSingleChange = (key: string, val: string) => {
    const updated = { ...filterValues, [key]: val };
    setFilterValues(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleClearAll = () => {
    const reset: Record<string, string> = {
      exceptionType: "All",
      severity: "All",
      exceptionStatus: "All",
      claimType: "All",
      claimStatus: "All",
      liabilityParty: "All",
      reconciliationState: "All",
      matchState: "All",
      recoveryState: "All",
      holdStatus: "All",
      slaStatus: "All",
      region: "All",
      owner: "All",
      shipment: "All",
      fulfilment: "All",
      carrier: "All",
      supplier: "All",
      createdDate: "Last 30 Days",
    };
    setFilterValues(reset);
    if (onFilterChange) onFilterChange(reset);
  };

  const filters: FilterOption[] = [
    {
      id: "exceptionType",
      label: "Exception Type",
      options: ["All", "Carrier Charge Variance", "Lost Shipment", "Weight Discrepancy", "COD Variance", "Reverse Logistics"],
      value: filterValues.exceptionType,
      onChange: (v) => handleSingleChange("exceptionType", v),
    },
    {
      id: "severity",
      label: "Severity",
      options: ["All", "Critical", "High", "Medium", "Low"],
      value: filterValues.severity,
      onChange: (v) => handleSingleChange("severity", v),
    },
    {
      id: "exceptionStatus",
      label: "Exception Status",
      options: ["All", "Open", "Under Investigation", "Resolved", "Closed"],
      value: filterValues.exceptionStatus,
      onChange: (v) => handleSingleChange("exceptionStatus", v),
    },
    {
      id: "claimType",
      label: "Claim Type",
      options: ["All", "Carrier Claim", "Supplier Claim", "Customer Claim", "Internal Liability"],
      value: filterValues.claimType,
      onChange: (v) => handleSingleChange("claimType", v),
    },
    {
      id: "claimStatus",
      label: "Claim Status",
      options: ["All", "Pending Approval", "Approved", "Submitted", "Rejected"],
      value: filterValues.claimStatus,
      onChange: (v) => handleSingleChange("claimStatus", v),
    },
    {
      id: "liabilityParty",
      label: "Liability Party",
      options: ["All", "Carrier", "Supplier", "Warehouse", "Internal Ops", "Customer"],
      value: filterValues.liabilityParty,
      onChange: (v) => handleSingleChange("liabilityParty", v),
    },
    {
      id: "reconciliationState",
      label: "Reconciliation State",
      options: ["All", "Reconciled", "Unreconciled", "Pending Verification", "Under Investigation"],
      value: filterValues.reconciliationState,
      onChange: (v) => handleSingleChange("reconciliationState", v),
    },
    {
      id: "matchState",
      label: "Match State",
      options: ["All", "Matched", "Partial", "Unmatched", "Missing External Record"],
      value: filterValues.matchState,
      onChange: (v) => handleSingleChange("matchState", v),
    },
    {
      id: "recoveryState",
      label: "Recovery State",
      options: ["All", "Pending", "Initiated", "Confirmed", "Recovered", "Waived"],
      value: filterValues.recoveryState,
      onChange: (v) => handleSingleChange("recoveryState", v),
    },
    {
      id: "holdStatus",
      label: "Hold Status",
      options: ["All", "Active Hold", "No Hold", "Hold Released"],
      value: filterValues.holdStatus,
      onChange: (v) => handleSingleChange("holdStatus", v),
    },
    {
      id: "slaStatus",
      label: "SLA Status",
      options: ["All", "On Track", "At Risk", "Breached"],
      value: filterValues.slaStatus,
      onChange: (v) => handleSingleChange("slaStatus", v),
    },
    {
      id: "region",
      label: "Region",
      options: ["All", "Sri Lanka - Western", "Central", "Southern", "Northern"],
      value: filterValues.region,
      onChange: (v) => handleSingleChange("region", v),
    },
    {
      id: "owner",
      label: "Owner",
      options: ["All", "Nuwan K.", "Elena Vance", "Hiran W."],
      value: filterValues.owner,
      onChange: (v) => handleSingleChange("owner", v),
    },
    {
      id: "shipment",
      label: "Shipment",
      options: ["All", "SHP-LK-00192", "SHP-LK-00177", "SHP-LK-00140"],
      value: filterValues.shipment,
      onChange: (v) => handleSingleChange("shipment", v),
    },
    {
      id: "fulfilment",
      label: "Fulfilment",
      options: ["All", "FOL-2025-000921", "FOL-2025-000915", "FOL-2025-000882"],
      value: filterValues.fulfilment,
      onChange: (v) => handleSingleChange("fulfilment", v),
    },
    {
      id: "carrier",
      label: "Carrier",
      options: ["All", "DX Express", "Dartair", "PromptX", "Kavraya"],
      value: filterValues.carrier,
      onChange: (v) => handleSingleChange("carrier", v),
    },
    {
      id: "supplier",
      label: "Supplier",
      options: ["All", "Nature Cosmetics", "Glow Beauty Labs", "Pure Silk SL"],
      value: filterValues.supplier,
      onChange: (v) => handleSingleChange("supplier", v),
    },
    {
      id: "createdDate",
      label: "Created Date",
      options: ["Last 30 Days", "Today", "Last 7 Days", "This Month"],
      value: filterValues.createdDate,
      onChange: (v) => handleSingleChange("createdDate", v),
    },
  ];

  return (
    <div className="space-y-1">
      <FilterBar
        filters={filters}
        onClearAll={handleClearAll}
        onSaveView={() => alert("Exceptions filter view saved.")}
        onRefresh={onRefresh}
      />
    </div>
  );
}
