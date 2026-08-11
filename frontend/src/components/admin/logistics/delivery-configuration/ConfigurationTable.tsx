"use client";

import React, { useState } from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { ConfigurationRecord } from "@/types/logistics/deliveryConfiguration";
import { Eye, Edit2, Copy, Search, SlidersHorizontal } from "lucide-react";

interface ConfigurationTableProps {
  configurations: ConfigurationRecord[];
  selectedConfigId?: string;
  onSelectConfig: (config: ConfigurationRecord) => void;
  onEditConfig?: (config: ConfigurationRecord) => void;
  onDuplicateConfig?: (config: ConfigurationRecord) => void;
  loading?: boolean;
}

export function ConfigurationTable({
  configurations,
  selectedConfigId,
  onSelectConfig,
  onEditConfig,
  onDuplicateConfig,
  loading = false,
}: ConfigurationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = React.useMemo(() => {
    return configurations.filter((c) => {
      const q = searchTerm.toLowerCase();
      return (
        c.configName.toLowerCase().includes(q) ||
        c.configRef.toLowerCase().includes(q) ||
        c.zoneName.toLowerCase().includes(q) ||
        c.carrier.toLowerCase().includes(q)
      );
    });
  }, [configurations, searchTerm]);

  const columns: Column<ConfigurationRecord>[] = [
    {
      header: "Config Ref",
      accessorKey: "configRef",
      sortable: true,
      cell: (row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectConfig(row);
          }}
          className="font-mono font-bold text-rose-700 hover:underline"
        >
          {row.configRef}
        </button>
      ),
    },
    {
      header: "Configuration Name",
      accessorKey: "configName",
      sortable: true,
      cell: (row) => <span className="font-bold text-gray-900">{row.configName}</span>,
    },
    { header: "Rule Type", accessorKey: "ruleType", sortable: true },
    { header: "Zone Name", accessorKey: "zoneName", sortable: true },
    { header: "Region", accessorKey: "region" },
    { header: "Province", accessorKey: "province" },
    { header: "District", accessorKey: "district" },
    { header: "City / Area", accessorKey: "cityArea" },
    { header: "Business Unit", accessorKey: "businessUnit" },
    { header: "Channel", accessorKey: "channel" },
    { header: "Carrier", accessorKey: "carrier", sortable: true },
    { header: "Service", accessorKey: "service" },
    { header: "Service Level", accessorKey: "serviceLevel" },
    { header: "Weight Band", accessorKey: "weightBand" },
    {
      header: "Coverage Status",
      accessorKey: "coverageStatus",
      cell: (row) => <StatusBadge status={row.coverageStatus} size="sm" />,
    },
    {
      header: "Same-Day",
      cell: (row) => (row.sameDay ? "Yes" : "No"),
      align: "center",
    },
    {
      header: "Next-Day",
      cell: (row) => (row.nextDay ? "Yes" : "No"),
      align: "center",
    },
    {
      header: "COD",
      cell: (row) => (row.cod ? "Yes" : "No"),
      align: "center",
    },
    {
      header: "RTO",
      cell: (row) => (row.rto ? "Yes" : "No"),
      align: "center",
    },
    {
      header: "Special Handling",
      cell: (row) => (row.specialHandling ? "Yes" : "No"),
      align: "center",
    },
    { header: "Rate Type", accessorKey: "rateType" },
    {
      header: "Base Rate",
      cell: (row) => `LKR ${row.baseRate}`,
      align: "right",
      sortable: true,
    },
    {
      header: "Surcharge",
      cell: (row) => `LKR ${row.surcharge}`,
      align: "right",
    },
    {
      header: "Free Ship Threshold",
      cell: (row) => `LKR ${row.freeShipThreshold.toLocaleString()}`,
      align: "right",
    },
    {
      header: "Capacity Limit",
      cell: (row) => row.capacityLimit.toLocaleString(),
      align: "right",
    },
    {
      header: "Capacity Used",
      cell: (row) => `${row.capacityUsed.toLocaleString()} (${Math.round((row.capacityUsed / row.capacityLimit) * 100)}%)`,
      align: "right",
    },
    { header: "Cut-Off", accessorKey: "cutoffTime" },
    { header: "Promised SLA", accessorKey: "promisedSLA" },
    { header: "Effective From", accessorKey: "effectiveFrom" },
    { header: "Effective To", accessorKey: "effectiveTo" },
    { header: "Version", accessorKey: "version" },
    {
      header: "Approval Status",
      cell: (row) => <StatusBadge status={row.approvalStatus} variant="success" size="sm" />,
    },
    {
      header: "Activation Status",
      cell: (row) => <StatusBadge status={row.activationStatus} size="sm" />,
    },
    {
      header: "Conflict Status",
      cell: (row) => <StatusBadge status={row.conflictStatus} size="sm" />,
    },
    {
      header: "Exception Status",
      cell: (row) => <StatusBadge status={row.exceptionStatus} size="sm" />,
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectConfig(row);
            }}
            className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
            title="View Configuration"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {onEditConfig && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditConfig(row);
              }}
              className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
              title="Edit Configuration"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDuplicateConfig && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateConfig(row);
              }}
              className="p-1 text-gray-600 hover:text-rose-700 rounded hover:bg-gray-100"
              title="Duplicate Configuration"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2.5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Delivery Zones, Rates, Capacity &amp; SLA Portfolio ({filtered.length})
          </h3>
          <p className="text-[10.5px] text-gray-500 font-normal">
            Master delivery rules matrix, rate tiers, capacity allocations, cut-off times &amp; SLA promises
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search config name, ref..."
              className="text-xs pl-8 pr-3 py-1 border border-gray-200 rounded-md w-56 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
          <button
            type="button"
            onClick={() => alert("Full configuration matrix view opened.")}
            className="text-[10.5px] font-bold text-rose-700 hover:underline whitespace-nowrap"
          >
            View Full Configuration &rarr;
          </button>
        </div>
      </div>

      {/* Main Reusable DataTable */}
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyMessage="No delivery configurations match current filter criteria."
      />
    </div>
  );
}
