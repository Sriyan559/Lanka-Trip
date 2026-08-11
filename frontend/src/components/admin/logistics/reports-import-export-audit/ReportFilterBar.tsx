"use client";

import React, { useState } from "react";
import { FilterBar, FilterOption } from "../shared/FilterBar";

interface ReportFilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void;
  onRefresh?: () => void;
}

export function ReportFilterBar({ onFilterChange, onRefresh }: ReportFilterBarProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    operationType: "All",
    logisticsDomain: "All",
    jobStatus: "All",
    reviewStatus: "All",
    approvalStatus: "All",
    encryptionStatus: "All",
    deliveryStatus: "All",
    reconciliationStatus: "All",
    fileType: "All",
    shipment: "All",
    return: "All",
    exception: "All",
    createdBy: "All",
    jobOwner: "All",
    reviewer: "All",
    approver: "All",
    createdDate: "Last 30 Days",
    sla: "All",
  });

  const handleSingleChange = (key: string, val: string) => {
    const updated = { ...filterValues, [key]: val };
    setFilterValues(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleClearAll = () => {
    const reset: Record<string, string> = {
      operationType: "All",
      logisticsDomain: "All",
      jobStatus: "All",
      reviewStatus: "All",
      approvalStatus: "All",
      encryptionStatus: "All",
      deliveryStatus: "All",
      reconciliationStatus: "All",
      fileType: "All",
      shipment: "All",
      return: "All",
      exception: "All",
      createdBy: "All",
      jobOwner: "All",
      reviewer: "All",
      approver: "All",
      createdDate: "Last 30 Days",
      sla: "All",
    };
    setFilterValues(reset);
    if (onFilterChange) onFilterChange(reset);
  };

  const filters: FilterOption[] = [
    {
      id: "operationType",
      label: "Operation Type",
      options: ["All", "Import", "Export", "Report", "Audit", "Reconciliation"],
      value: filterValues.operationType,
      onChange: (v) => handleSingleChange("operationType", v),
    },
    {
      id: "logisticsDomain",
      label: "Logistics Domain",
      options: ["All", "Vendor Imports", "Shipment Exports", "Carrier Performance", "Audit Evidence", "Data Reconciliation"],
      value: filterValues.logisticsDomain,
      onChange: (v) => handleSingleChange("logisticsDomain", v),
    },
    {
      id: "jobStatus",
      label: "Job Status",
      options: ["All", "Running", "Completed", "Pending Review", "Failed", "Quarantined"],
      value: filterValues.jobStatus,
      onChange: (v) => handleSingleChange("jobStatus", v),
    },
    {
      id: "reviewStatus",
      label: "Review Status",
      options: ["All", "Passed", "Pending", "Failed"],
      value: filterValues.reviewStatus,
      onChange: (v) => handleSingleChange("reviewStatus", v),
    },
    {
      id: "approvalStatus",
      label: "Approval Status",
      options: ["All", "Approved", "Pending Approval", "Rejected"],
      value: filterValues.approvalStatus,
      onChange: (v) => handleSingleChange("approvalStatus", v),
    },
    {
      id: "encryptionStatus",
      label: "Encryption",
      options: ["All", "AES-256", "None"],
      value: filterValues.encryptionStatus,
      onChange: (v) => handleSingleChange("encryptionStatus", v),
    },
    {
      id: "deliveryStatus",
      label: "Delivery Status",
      options: ["All", "Delivered", "Pending", "Failed"],
      value: filterValues.deliveryStatus,
      onChange: (v) => handleSingleChange("deliveryStatus", v),
    },
    {
      id: "reconciliationStatus",
      label: "Reconciliation",
      options: ["All", "Reconciled", "Pending", "Unmatched"],
      value: filterValues.reconciliationStatus,
      onChange: (v) => handleSingleChange("reconciliationStatus", v),
    },
    {
      id: "fileType",
      label: "File Type",
      options: ["All", "CSV", "XLSX", "ZIP", "PDF", "JSON"],
      value: filterValues.fileType,
      onChange: (v) => handleSingleChange("fileType", v),
    },
    {
      id: "jobOwner",
      label: "Job Owner",
      options: ["All", "Amal P.", "Elena Vance", "Malith S.", "Dinusha W."],
      value: filterValues.jobOwner,
      onChange: (v) => handleSingleChange("jobOwner", v),
    },
    {
      id: "reviewer",
      label: "Reviewer",
      options: ["All", "Nimala D.", "Hiran W.", "Nuwan K."],
      value: filterValues.reviewer,
      onChange: (v) => handleSingleChange("reviewer", v),
    },
    {
      id: "approver",
      label: "Approver",
      options: ["All", "Tharindu J.", "Elena Vance"],
      value: filterValues.approver,
      onChange: (v) => handleSingleChange("approver", v),
    },
    {
      id: "createdDate",
      label: "Created Date",
      options: ["Last 30 Days", "Today", "Last 7 Days", "This Month"],
      value: filterValues.createdDate,
      onChange: (v) => handleSingleChange("createdDate", v),
    },
    {
      id: "sla",
      label: "SLA Status",
      options: ["All", "On Track", "At Risk", "Breached"],
      value: filterValues.sla,
      onChange: (v) => handleSingleChange("sla", v),
    },
  ];

  return (
    <div className="space-y-1">
      <FilterBar
        filters={filters}
        onClearAll={handleClearAll}
        onSaveView={() => alert("Report filter view saved.")}
        onRefresh={onRefresh}
      />
    </div>
  );
}
