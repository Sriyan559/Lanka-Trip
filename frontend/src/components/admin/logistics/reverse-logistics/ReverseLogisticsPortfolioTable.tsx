"use client";

import React, { useState } from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { ReturnCase } from "@/types/logistics/reverseLogistics";
import { Eye, Edit2, RotateCcw, Search } from "lucide-react";

interface ReverseLogisticsPortfolioTableProps {
  returns: ReturnCase[];
  selectedReturnId?: string;
  onSelectReturn: (returnCase: ReturnCase) => void;
  onEditReturn?: (returnCase: ReturnCase) => void;
  loading?: boolean;
}

export function ReverseLogisticsPortfolioTable({
  returns,
  selectedReturnId,
  onSelectReturn,
  onEditReturn,
  loading = false,
}: ReverseLogisticsPortfolioTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = React.useMemo(() => {
    return returns.filter((r) => {
      const q = searchTerm.toLowerCase();
      return (
        r.returnRef.toLowerCase().includes(q) ||
        r.orderRef.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.productSku.toLowerCase().includes(q)
      );
    });
  }, [returns, searchTerm]);

  const columns: Column<ReturnCase>[] = [
    {
      header: "Return Reference",
      accessorKey: "returnRef",
      sortable: true,
      cell: (row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectReturn(row);
          }}
          className="font-mono font-bold text-rose-700 hover:underline"
        >
          {row.returnRef}
        </button>
      ),
    },
    { header: "Return Type", accessorKey: "returnType", sortable: true },
    { header: "Order Reference", accessorKey: "orderRef", sortable: true },
    { header: "Fulfilment Reference", accessorKey: "fulfilmentRef" },
    { header: "Original Shipment", accessorKey: "originalShipment" },
    {
      header: "Customer",
      accessorKey: "customerName",
      sortable: true,
      cell: (row) => <span className="font-bold text-gray-900">{row.customerName}</span>,
    },
    { header: "Supplier / Seller", accessorKey: "supplierName" },
    { header: "Product / SKU", accessorKey: "productSku" },
    { header: "Qty", accessorKey: "quantity", align: "center" },
    {
      header: "Return Value (LKR)",
      cell: (row) => `LKR ${row.returnValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      align: "right",
      sortable: true,
    },
    { header: "Return Reason", accessorKey: "returnReason" },
    {
      header: "Return Eligibility",
      cell: (row) => <StatusBadge status={row.returnEligibility} variant="success" size="sm" />,
    },
    {
      header: "Return Approval",
      cell: (row) => <StatusBadge status={row.returnApproval} variant="success" size="sm" />,
    },
    { header: "Collection Method", accessorKey: "collectionMethod" },
    { header: "Carrier", accessorKey: "carrier" },
    {
      header: "Collection Status",
      cell: (row) => <StatusBadge status={row.collectionStatus} size="sm" />,
    },
    { header: "Collection Scheduled", accessorKey: "collectionScheduledDate" },
    { header: "Reverse Shipment", accessorKey: "reverseShipmentRef" },
    {
      header: "Shipment Status",
      cell: (row) => <StatusBadge status={row.shipmentStatus} size="sm" />,
    },
    {
      header: "SLA Status",
      cell: (row) => <StatusBadge status={row.slaStatus} size="sm" />,
    },
    { header: "Return Owner", accessorKey: "returnOwner" },
    { header: "Due Date", accessorKey: "dueDate" },
    { header: "Updated At", accessorKey: "updatedAt" },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectReturn(row);
            }}
            className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
            title="View Return Detail"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {onEditReturn && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditReturn(row);
              }}
              className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
              title="Edit Return"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2.5">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Returns, Collections &amp; Reverse Logistics Portfolio ({filtered.length})
          </h3>
          <p className="text-[10.5px] text-gray-500 font-normal">
            Master return case ledger, reverse shipments, inspection outcomes &amp; disposition tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search return ref, order ref..."
              className="text-xs pl-8 pr-3 py-1 border border-gray-200 rounded-md w-56 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyMessage="No reverse logistics cases match the current filter criteria."
      />
    </div>
  );
}
