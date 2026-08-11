"use client";

import React from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { ShipmentPackage } from "@/types/logistics/shipment";
import { Eye } from "lucide-react";

interface PackageTableProps {
  packages: ShipmentPackage[];
}

export function PackageTable({ packages }: PackageTableProps) {
  const packageColumns: Column<ShipmentPackage>[] = [
    {
      header: "Package Ref",
      accessorKey: "packageRef",
      sortable: true,
      cell: (row) => <span className="font-mono font-bold text-gray-900">{row.packageRef}</span>,
    },
    { header: "Package Type", accessorKey: "packageType", sortable: true },
    { header: "Fulfilment", accessorKey: "fulfilmentRef", sortable: true },
    { header: "Item Count", accessorKey: "itemCount", sortable: true, align: "center" },
    { header: "Weight", accessorKey: "weight", sortable: true },
    { header: "Dimensions (cm)", accessorKey: "dimensions" },
    { header: "Declared Value", accessorKey: "declaredValue", sortable: true },
    {
      header: "Label Status",
      accessorKey: "labelStatus",
      cell: (row) => <StatusBadge status={row.labelStatus} variant="success" size="sm" />,
    },
    {
      header: "Barcode",
      accessorKey: "barcode",
      cell: (row) => <span className="font-mono text-gray-600">{row.barcode}</span>,
    },
    {
      header: "Seal Status",
      accessorKey: "sealStatus",
      cell: (row) => <StatusBadge status={row.sealStatus} variant="success" size="sm" />,
    },
    {
      header: "Fragile",
      accessorKey: "fragile",
      cell: (row) => (row.fragile ? "Yes" : "No"),
      align: "center",
    },
    {
      header: "Temp Ctrl",
      accessorKey: "tempCtrl",
      cell: (row) => (row.tempCtrl ? "Yes" : "No"),
      align: "center",
    },
    { header: "Special Handling", accessorKey: "specialHandling" },
    {
      header: "Package Status",
      accessorKey: "packageStatus",
      cell: (row) => <StatusBadge status={row.packageStatus} variant="success" size="sm" />,
    },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => alert(`View details for package ${row.packageRef}`)}
            className="p-1 rounded bg-gray-50 border border-gray-200 text-gray-600 hover:text-rose-700 hover:border-rose-300 transition-colors"
            title="View Package Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => alert(`Options for package ${row.packageRef}`)}
            className="p-1 rounded bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors text-[10px] font-bold px-1.5"
            title="Package Options"
          >
            •••
          </button>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          1. Packages ({packages.length})
        </h3>
        <span className="text-[11px] text-gray-500 font-medium">
          Total Weight: 1.40 kg | Total Value: LKR 3,100
        </span>
      </div>

      <DataTable columns={packageColumns} data={packages} emptyMessage="No package records found for this shipment." />
    </div>
  );
}
