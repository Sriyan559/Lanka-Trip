"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

export interface WarehousePortfolioTableProps {
  facilities?: any[];
  selectedRef?: string | null;
  onSelectFacility?: (facility: any) => void;
}

export function WarehousePortfolioTable({
  facilities = [],
  selectedRef,
  onSelectFacility,
}: WarehousePortfolioTableProps) {
  const router = useRouter();

  const defaultFacilities = [
    {
      id: "WH-CMB-01",
      ref: "WH-CMB-01",
      name: "Colombo Central",
      type: "Warehouse",
      operator: "SL Beauty",
      region: "Western",
      city: "Colombo",
      facility_status: "Operational",
      capacity_status: "High",
      total_capacity: "520,000",
      capacity_used: "78%",
      capacity_available: "22%",
      active_skus: "7,842",
      orders_assigned: 312,
      pick_queue: 32,
      pack_queue: 18,
      dispatch_queue: 28,
      overall_sla: "94%",
      holds: "None",
      maintenance: "Good",
      updated_at: "31 May 2026 09:28",
    },
    {
      id: "WH-KDU-01",
      ref: "WH-KDU-01",
      name: "Kadawatha Hub",
      type: "Fulfilment Centre",
      operator: "SL Beauty",
      region: "Western",
      city: "Kadawatha",
      facility_status: "Operational",
      capacity_status: "Critical",
      total_capacity: "310,000",
      capacity_used: "92%",
      capacity_available: "8%",
      active_skus: "5,120",
      orders_assigned: 198,
      pick_queue: 24,
      pack_queue: 16,
      dispatch_queue: 22,
      overall_sla: "88%",
      holds: "None",
      maintenance: "Good",
      updated_at: "31 May 2026 08:55",
    },
    {
      id: "WH-KND-01",
      ref: "WH-KND-01",
      name: "Kandy Regional",
      type: "Warehouse",
      operator: "SL Beauty",
      region: "Central",
      city: "Kandy",
      facility_status: "Operational",
      capacity_status: "High",
      total_capacity: "180,000",
      capacity_used: "74%",
      capacity_available: "26%",
      active_skus: "3,442",
      orders_assigned: 121,
      pick_queue: 16,
      pack_queue: 10,
      dispatch_queue: 14,
      overall_sla: "92%",
      holds: "None",
      maintenance: "Good",
      updated_at: "31 May 2026 08:41",
    },
    {
      id: "FC-GND-01",
      ref: "FC-GND-01",
      name: "Gampaha FC",
      type: "Fulfilment Centre",
      operator: "SL Beauty",
      region: "Western",
      city: "Gampaha",
      facility_status: "Operational",
      capacity_status: "Healthy",
      total_capacity: "160,000",
      capacity_used: "58%",
      capacity_available: "42%",
      active_skus: "2,918",
      orders_assigned: 88,
      pick_queue: 10,
      pack_queue: 8,
      dispatch_queue: 12,
      overall_sla: "95%",
      holds: "None",
      maintenance: "Good",
      updated_at: "31 May 2026 08:35",
    },
    {
      id: "WH-JFN-01",
      ref: "WH-JFN-01",
      name: "Jaffna Warehouse",
      type: "Warehouse",
      operator: "3PL Partner",
      region: "Northern",
      city: "Jaffna",
      facility_status: "Operational",
      capacity_status: "At Risk",
      total_capacity: "120,000",
      capacity_used: "81%",
      capacity_available: "19%",
      active_skus: "1,734",
      orders_assigned: 74,
      pick_queue: 8,
      pack_queue: 6,
      dispatch_queue: 10,
      overall_sla: "87%",
      holds: "None",
      maintenance: "Good",
      updated_at: "31 May 2026 08:20",
    },
  ];

  const displayRows = facilities && facilities.length > 0 ? facilities : defaultFacilities;

  const getCapacityBadge = (status: string) => {
    if (status === "Critical") return "text-rose-800 bg-rose-50 border-rose-200 font-bold";
    if (status === "High" || status === "At Risk") return "text-amber-800 bg-amber-50 border-amber-200 font-semibold";
    return "text-emerald-800 bg-emerald-50 border-emerald-200 font-semibold";
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col text-[10px]">
      <div className="p-2.5 border-b border-line bg-canvas flex items-center justify-between">
        <div>
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider">
            Warehouse &amp; Fulfilment Centre Portfolio ({displayRows.length})
          </h3>
          <p className="text-[9px] text-muted">
            Network-wide physical infrastructure, storage utilization &amp; workload management grid
          </p>
        </div>
        <div className="text-[10px] text-muted font-mono font-medium">
          Facilities: <strong className="text-ink">24 Total</strong>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[10px] whitespace-nowrap divide-y divide-line">
          <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider text-[9px]">
            <tr>
              <th className="px-2.5 py-1.5">Facility Reference</th>
              <th className="px-2.5 py-1.5">Facility Name</th>
              <th className="px-2.5 py-1.5">Facility Type</th>
              <th className="px-2.5 py-1.5">Operator</th>
              <th className="px-2.5 py-1.5">Region</th>
              <th className="px-2.5 py-1.5">City</th>
              <th className="px-2.5 py-1.5">Facility Status</th>
              <th className="px-2.5 py-1.5">Capacity Status</th>
              <th className="px-2.5 py-1.5 text-right">Total Storage Capacity</th>
              <th className="px-2.5 py-1.5 text-center">Capacity Used</th>
              <th className="px-2.5 py-1.5 text-center">Capacity Available</th>
              <th className="px-2.5 py-1.5 text-center">Active SKUs</th>
              <th className="px-2.5 py-1.5 text-center">Fulfilment Orders Assigned</th>
              <th className="px-2.5 py-1.5 text-center">Pick Queue</th>
              <th className="px-2.5 py-1.5 text-center">Pack Queue</th>
              <th className="px-2.5 py-1.5 text-center">Dispatch Queue</th>
              <th className="px-2.5 py-1.5 text-center">Overall SLA</th>
              <th className="px-2.5 py-1.5 text-center">Operational Holds</th>
              <th className="px-2.5 py-1.5 text-center">Maintenance Status</th>
              <th className="px-2.5 py-1.5">Updated At</th>
              <th className="px-2.5 py-1.5 text-center sticky right-0 bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {displayRows.map((row) => {
              const isSelected = selectedRef === row.ref || selectedRef === row.id;
              return (
                <tr
                  key={row.id || row.ref}
                  onClick={() => onSelectFacility && onSelectFacility(row)}
                  className={`hover:bg-canvas transition-colors cursor-pointer ${
                    isSelected ? "bg-primary-50/50 border-l-2 border-l-primary-900" : ""
                  }`}
                >
                  {/* FACILITY REF WITH DRILL-DOWN LINK TO LG05 */}
                  <td className="px-2.5 py-1.5 font-bold text-primary-900">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/logistics/warehouses/${row.id || row.ref}`);
                      }}
                      className="hover:underline text-left font-mono font-bold"
                    >
                      {row.ref}
                    </button>
                  </td>

                  <td className="px-2.5 py-1.5 font-bold text-ink">{row.name}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.type}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.operator}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.region}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.city}</td>
                  <td className="px-2.5 py-1.5">
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                      {row.facility_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span className={`px-1.5 py-0.2 rounded text-[9px] border ${getCapacityBadge(row.capacity_status)}`}>
                      {row.capacity_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5 text-right font-mono font-bold text-ink">{row.total_capacity} cbft</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-amber-700">{row.capacity_used}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-emerald-700">{row.capacity_available}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold">{row.active_skus}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-blue-700">{row.orders_assigned}</td>
                  <td className="px-2.5 py-1.5 text-center font-semibold text-purple-700">{row.pick_queue}</td>
                  <td className="px-2.5 py-1.5 text-center font-semibold text-sky-700">{row.pack_queue}</td>
                  <td className="px-2.5 py-1.5 text-center font-semibold text-indigo-700">{row.dispatch_queue}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-emerald-700">{row.overall_sla}</td>
                  <td className="px-2.5 py-1.5 text-center text-muted">{row.holds}</td>
                  <td className="px-2.5 py-1.5 text-center">
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                      {row.maintenance}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5 text-muted text-[9px]">{row.updated_at}</td>

                  {/* ACTION COLUMN */}
                  <td className="px-2.5 py-1.5 text-center sticky right-0 bg-white group-hover:bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] border-l border-line" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => router.push(`/admin/logistics/warehouses/${row.id || row.ref}`)}
                      className="px-1.5 py-0.5 bg-primary-900 text-white font-bold text-[9px] rounded hover:bg-primary-800 transition-colors uppercase flex items-center gap-0.5 mx-auto"
                    >
                      <Eye size={10} /> Open
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
