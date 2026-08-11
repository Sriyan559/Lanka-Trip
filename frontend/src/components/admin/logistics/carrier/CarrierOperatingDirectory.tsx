"use client";

import React, { useState } from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { ActionButton } from "../shared/ActionButton";
import { Carrier } from "@/types/logistics/carrier";
import { Eye, Edit2, Search, SlidersHorizontal, Truck } from "lucide-react";

interface CarrierOperatingDirectoryProps {
  carriers: Carrier[];
  selectedCarrierId?: string;
  onSelectCarrier: (carrier: Carrier) => void;
  onEditCarrier?: (carrier: Carrier) => void;
  onViewCarrierDetail?: (carrierId: string) => void;
  loading?: boolean;
}

export function CarrierOperatingDirectory({
  carriers,
  selectedCarrierId,
  onSelectCarrier,
  onEditCarrier,
  onViewCarrierDetail,
  loading = false,
}: CarrierOperatingDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredCarriers = React.useMemo(() => {
    return carriers.filter((c) => {
      const matchSearch =
        c.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.carrierRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.operator.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === "all" || c.operationalStatus.toLowerCase() === statusFilter.toLowerCase();
      const matchType =
        typeFilter === "all" || c.carrierType.toLowerCase() === typeFilter.toLowerCase();
      return matchSearch && matchStatus && matchType;
    });
  }, [carriers, searchTerm, statusFilter, typeFilter]);

  const carrierColumns: Column<Carrier>[] = [
    {
      header: "Carrier Reference",
      accessorKey: "carrierRef",
      sortable: true,
      cell: (row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectCarrier(row);
          }}
          className="font-mono font-bold text-rose-700 hover:underline"
        >
          {row.carrierRef}
        </button>
      ),
    },
    {
      header: "Carrier / Partner Name",
      accessorKey: "carrierName",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          <Truck className="w-3.5 h-3.5 text-rose-700" />
          <span>{row.carrierName}</span>
        </div>
      ),
    },
    { header: "Carrier Type", accessorKey: "carrierType", sortable: true },
    { header: "Operator", accessorKey: "operator", sortable: true },
    {
      header: "Approval Status",
      accessorKey: "approvalStatus",
      cell: (row) => <StatusBadge status={row.approvalStatus} variant="success" size="sm" />,
    },
    {
      header: "Operational Status",
      accessorKey: "operationalStatus",
      cell: (row) => <StatusBadge status={row.operationalStatus} size="sm" />,
    },
    { header: "Region Coverage", accessorKey: "regionCoverageText" },
    {
      header: "Daily Capacity",
      cell: (row) => row.capacity.dailyCapacity.toLocaleString(),
      sortable: true,
      align: "right",
    },
    {
      header: "Assigned Shipments",
      cell: (row) => row.performance.assignedShipments.toLocaleString(),
      sortable: true,
      align: "right",
    },
    {
      header: "On-Time Pickup %",
      cell: (row) => `${row.performance.onTimePickupPercentage}%`,
      align: "right",
    },
    {
      header: "On-Time Delivery %",
      cell: (row) => `${row.performance.onTimeDeliveryPercentage}%`,
      align: "right",
    },
    {
      header: "First-Attempt Delivery %",
      cell: (row) => `${row.performance.firstAttemptDeliveryPercentage}%`,
      align: "right",
    },
    {
      header: "Tracking Completeness %",
      cell: (row) => `${row.performance.trackingCompletenessPercentage}%`,
      align: "right",
    },
    {
      header: "POD Completeness %",
      cell: (row) => `${row.performance.podCompletenessPercentage}%`,
      align: "right",
    },
    {
      header: "Failed Delivery %",
      cell: (row) => `${row.performance.failedDeliveryPercentage}%`,
      align: "right",
    },
    {
      header: "Damage Rate %",
      cell: (row) => `${row.performance.damageRatePercentage}%`,
      align: "right",
    },
    {
      header: "Claims Open",
      cell: (row) => row.performance.openClaimsCount,
      align: "center",
    },
    {
      header: "Claims Rate",
      cell: (row) => `${row.performance.claimsRatePercentage}%`,
      align: "right",
    },
    {
      header: "COD Exceptions",
      cell: (row) => row.performance.codExceptionsCount,
      align: "center",
    },
    {
      header: "SLA Status",
      cell: (row) => <StatusBadge status={row.performance.slaStatus} size="sm" />,
    },
    { header: "Updated At", accessorKey: "updatedAt" },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectCarrier(row);
              if (onViewCarrierDetail) onViewCarrierDetail(row.id);
            }}
            className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
            title="Select / View Carrier"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {onEditCarrier && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditCarrier(row);
              }}
              className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
              title="Edit Carrier"
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
      {/* Table Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Carrier Operating Directory ({filteredCarriers.length} Records)
          </h3>
          <p className="text-[10.5px] text-gray-500 font-normal">
            Master carrier portfolio, SLA performance ratings, coverage &amp; claims governance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search carrier name, ref..."
              className="text-xs pl-8 pr-3 py-1 border border-gray-200 rounded-md w-48 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Operational Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-1 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="limited service">Limited Service</option>
            <option value="pending review">Pending Review</option>
            <option value="suspended">Suspended</option>
            <option value="on hold">On Hold</option>
          </select>

          {/* Carrier Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs p-1 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none"
          >
            <option value="all">Type: All</option>
            <option value="national courier">National Courier</option>
            <option value="regional courier">Regional Courier</option>
            <option value="same-day partner">Same-Day Partner</option>
            <option value="3pl">3PL</option>
            <option value="internal fleet">Internal Fleet</option>
          </select>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={carrierColumns}
        data={filteredCarriers}
        loading={loading}
        emptyMessage="No carrier records match the current filters."
      />
    </div>
  );
}
