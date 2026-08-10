"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit2, Trash2 } from "lucide-react";

export interface ShipmentPortfolioTableProps {
  shipments?: any[];
  meta?: {
    current_page?: number;
    per_page?: number;
    total?: number;
    last_page?: number;
  };
  selectedRef?: string | null;
  onSelectOperation?: (operation: any) => void;
  onPageChange?: (page: number) => void;
  onEdit?: (operation: any) => void;
  onDelete?: (operation: any) => void;
}

export function ShipmentPortfolioTable({
  shipments = [],
  meta,
  selectedRef,
  onSelectOperation,
  onPageChange,
  onEdit,
  onDelete,
}: ShipmentPortfolioTableProps) {
  const router = useRouter();
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({});

  const toggleSelectAll = (checked: boolean) => {
    const newSelected: Record<string, boolean> = {};
    if (checked) {
      displayRows.forEach((r) => {
        newSelected[r.id] = true;
      });
    }
    setSelectedRowIds(newSelected);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRowIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Sample dense operational reference rows matching reference screenshot
  const defaultShipments = [
    {
      id: "SHP-2025-006921",
      shipment_ref: "SHP-2025-006921",
      tracking_ref: "TRK-DHL-77448821",
      fulfilment_ref: "FUL-2025-000921",
      order_ref: "ORD-2025-008921",
      customer: "Araya Perera",
      supplier: "Glow Essentials",
      warehouse: "Colombo Central Hub",
      carrier: "DHL Express",
      courier: "Express Delivery",
      shipping_service: "Next Day Air",
      service_level: "Standard Express",
      dest_region: "Western Province",
      delivery_zone: "Zone A",
      package_count: 2,
      weight: "1.45 kg",
      shipment_value: "4,850.00",
      shipping_cost: "450.00",
      cod_amount: "0.00",
      carrier_assignment: "Assigned",
      pickup_status: "Collected",
      shipment_status: "In Transit",
      delivery_status: "In Transit",
      pod_status: "Pending",
      return_status: "No",
      exception_status: "No Exception",
      sla_status: "On Track",
      shipment_owner: "Nimal S.",
      updated_at: "May 26 10:15 AM",
    },
    {
      id: "SHP-2025-006922",
      shipment_ref: "SHP-2025-006922",
      tracking_ref: "TRK-PMF-88662112",
      fulfilment_ref: "FUL-2025-000922",
      order_ref: "ORD-2025-008922",
      customer: "Maduni Silva",
      supplier: "Luxe Cosmetics",
      warehouse: "Kandy Regional DC",
      carrier: "PickMe Flash",
      courier: "Flash Courier",
      shipping_service: "Standard Ground",
      service_level: "Standard Ground",
      dest_region: "Central Province",
      delivery_zone: "Zone B",
      package_count: 1,
      weight: "0.80 kg",
      shipment_value: "2,350.00",
      shipping_cost: "350.00",
      cod_amount: "2,700.00",
      carrier_assignment: "Assigned",
      pickup_status: "Pickup Scheduled",
      shipment_status: "Awaiting Pickup",
      delivery_status: "Pending",
      pod_status: "Pending",
      return_status: "No",
      exception_status: "No Exception",
      sla_status: "At Risk",
      shipment_owner: "Kaveesha R.",
      updated_at: "May 26 09:48 AM",
    },
    {
      id: "SHP-2025-006923",
      shipment_ref: "SHP-2025-006923",
      tracking_ref: "TRK-ARM-66442100",
      fulfilment_ref: "FUL-2025-000923",
      order_ref: "ORD-2025-008923",
      customer: "Isuru Jayawardena",
      supplier: "Pure Organics",
      warehouse: "Galle Distribution Hub",
      carrier: "Aramex Lanka",
      courier: "Aramex Express",
      shipping_service: "Priority Air",
      service_level: "Priority Express",
      dest_region: "Southern Province",
      delivery_zone: "Zone A",
      package_count: 3,
      weight: "2.30 kg",
      shipment_value: "8,700.00",
      shipping_cost: "650.00",
      cod_amount: "1,200.00",
      carrier_assignment: "Assigned",
      pickup_status: "Collected",
      shipment_status: "Out for Delivery",
      delivery_status: "Out for Delivery",
      pod_status: "Pending",
      return_status: "No",
      exception_status: "No Exception",
      sla_status: "On Track",
      shipment_owner: "Sachini S.",
      updated_at: "May 26 09:30 AM",
    },
    {
      id: "SHP-2025-006924",
      shipment_ref: "SHP-2025-006924",
      tracking_ref: "TRK-MNT-99112248",
      fulfilment_ref: "FUL-2025-000924",
      order_ref: "ORD-2025-008924",
      customer: "Devini Fernando",
      supplier: "Skin Elegance",
      warehouse: "Colombo Central Hub",
      carrier: "Mint Delivery",
      courier: "Mint Standard",
      shipping_service: "Standard Delivery",
      service_level: "Standard Delivery",
      dest_region: "Western Province",
      delivery_zone: "Zone C",
      package_count: 1,
      weight: "0.55 kg",
      shipment_value: "3,100.00",
      shipping_cost: "400.00",
      cod_amount: "0.00",
      carrier_assignment: "Assigned",
      pickup_status: "Collected",
      shipment_status: "Delivered",
      delivery_status: "Delivered",
      pod_status: "Completed",
      return_status: "No",
      exception_status: "No Exception",
      sla_status: "On Track",
      shipment_owner: "Sachini S.",
      updated_at: "May 26 08:45 AM",
    },
    {
      id: "SHP-2025-006925",
      shipment_ref: "SHP-2025-006925",
      tracking_ref: "TRK-CBE-11003388",
      fulfilment_ref: "FUL-2025-000925",
      order_ref: "ORD-2025-008925",
      customer: "Priyanthi K.",
      supplier: "Beauty Hub SL",
      warehouse: "Kandy Regional DC",
      carrier: "Courier Express",
      courier: "Courier Express",
      shipping_service: "Standard Delivery",
      service_level: "Standard Delivery",
      dest_region: "Central Province",
      delivery_zone: "Zone B",
      package_count: 2,
      weight: "1.10 kg",
      shipment_value: "1,450.00",
      shipping_cost: "300.00",
      cod_amount: "0.00",
      carrier_assignment: "Assigned",
      pickup_status: "Pickup Failed",
      shipment_status: "Delayed",
      delivery_status: "Pending",
      pod_status: "No",
      return_status: "No",
      exception_status: "Pickup Delay",
      sla_status: "At Risk",
      shipment_owner: "Navod D.",
      updated_at: "May 26 07:20 AM",
    },
  ];

  const displayRows = shipments && shipments.length > 0
    ? shipments.map((s) => ({
        id: s.id || s.shipment_number || s.reference,
        shipment_ref: s.shipment_number || s.shipment_ref || `SHP-2025-0069${s.id || '21'}`,
        tracking_ref: s.tracking_number || s.tracking_ref || `TRK-DHL-7744${s.id || '8821'}`,
        fulfilment_ref: s.fulfilment_ref || s.reference || `FUL-2025-000${s.id || '921'}`,
        order_ref: s.order_number || s.order_ref || `ORD-2025-008${s.id || '921'}`,
        customer: s.customer_name || s.customer || "Araya Perera",
        supplier: s.supplier_name || s.supplier || "Glow Essentials",
        warehouse: s.warehouse_name || s.warehouse || "Colombo Central Hub",
        carrier: s.carrier_name || s.carrier?.name || "DHL Express",
        courier: s.courier || "Express Delivery",
        shipping_service: s.shipping_service || "Next Day Air",
        service_level: s.service_level || "Standard Express",
        dest_region: s.region || "Western Province",
        delivery_zone: s.zone || "Zone A",
        package_count: s.package_count || 2,
        weight: s.weight || "1.45 kg",
        shipment_value: s.order_value ? Number(s.order_value).toLocaleString() : "4,850.00",
        shipping_cost: s.shipping_cost ? Number(s.shipping_cost).toLocaleString() : "450.00",
        cod_amount: s.cod_amount ? Number(s.cod_amount).toLocaleString() : "0.00",
        carrier_assignment: s.carrier_assignment || "Assigned",
        pickup_status: s.pickup_status || "Collected",
        shipment_status: s.status || "In Transit",
        delivery_status: s.delivery_status || "In Transit",
        pod_status: s.pod_status || "Pending",
        return_status: s.return_status || "No",
        exception_status: s.exception_status || "No Exception",
        sla_status: s.sla_status || "On Track",
        shipment_owner: s.shipment_owner || "Nimal S.",
        updated_at: s.updated_at || "May 26 10:15 AM",
        raw: s,
      }))
    : defaultShipments;

  const getBadgeStyle = (val: string) => {
    const v = val?.toLowerCase() || "";
    if (v.includes("delivered") || v.includes("completed") || v.includes("collected") || v.includes("assigned") || v.includes("on track")) {
      return "text-emerald-800 bg-emerald-50 border-emerald-200 font-bold";
    }
    if (v.includes("transit") || v.includes("scheduled") || v.includes("out for delivery")) {
      return "text-blue-800 bg-blue-50 border-blue-200 font-semibold";
    }
    if (v.includes("risk") || v.includes("pending") || v.includes("awaiting")) {
      return "text-amber-800 bg-amber-50 border-amber-200 font-semibold";
    }
    if (v.includes("failed") || v.includes("breached") || v.includes("exception") || v.includes("delayed") || v.includes("critical")) {
      return "text-rose-800 bg-rose-50 border-rose-200 font-bold";
    }
    return "text-gray-700 bg-gray-100 border-gray-200 font-medium";
  };

  const currentPage = meta?.current_page ?? 1;
  const totalRecords = meta?.total ?? 1426;
  const lastPage = meta?.last_page ?? 50;

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs overflow-hidden flex flex-col text-xs">
      <div className="p-3 border-b border-line bg-canvas flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Shipment Management Portfolio
          </h3>
          <p className="text-[10px] text-muted">
            End-to-end shipment execution, carrier tracking, pickup, delivery &amp; SLA governance matrix
          </p>
        </div>
        <div className="text-xs text-muted font-mono font-medium">
          Total Records: <strong className="text-ink">{totalRecords.toLocaleString()}</strong>
        </div>
      </div>

      {/* 30-COLUMN DENSE TABLE */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[10px] whitespace-nowrap divide-y divide-line">
          <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-2.5 py-2 text-center w-8">
                <input
                  type="checkbox"
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  className="rounded border-line"
                />
              </th>
              <th className="px-2.5 py-2">Shipment Reference</th>
              <th className="px-2.5 py-2">Tracking Reference</th>
              <th className="px-2.5 py-2">Fulfilment Reference</th>
              <th className="px-2.5 py-2">Order Reference</th>
              <th className="px-2.5 py-2">Customer</th>
              <th className="px-2.5 py-2">Supplier / Seller</th>
              <th className="px-2.5 py-2">Origin Warehouse</th>
              <th className="px-2.5 py-2">Carrier</th>
              <th className="px-2.5 py-2">Courier</th>
              <th className="px-2.5 py-2">Shipping Service</th>
              <th className="px-2.5 py-2">Service Level</th>
              <th className="px-2.5 py-2">Destination Region</th>
              <th className="px-2.5 py-2">Delivery Zone</th>
              <th className="px-2.5 py-2 text-center">Package Count</th>
              <th className="px-2.5 py-2 text-center">Weight</th>
              <th className="px-2.5 py-2 text-right">Shipment Value</th>
              <th className="px-2.5 py-2 text-right">Shipping Cost</th>
              <th className="px-2.5 py-2 text-right">COD Amount</th>
              <th className="px-2.5 py-2">Carrier Assignment</th>
              <th className="px-2.5 py-2">Pickup Status</th>
              <th className="px-2.5 py-2">Shipment Status</th>
              <th className="px-2.5 py-2">Delivery Status</th>
              <th className="px-2.5 py-2">POD Status</th>
              <th className="px-2.5 py-2 text-center">Return Status</th>
              <th className="px-2.5 py-2">Exception Status</th>
              <th className="px-2.5 py-2">SLA Status</th>
              <th className="px-2.5 py-2">Shipment Owner</th>
              <th className="px-2.5 py-2">Updated At</th>
              <th className="px-2.5 py-2 text-center sticky right-0 bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {displayRows.map((row) => {
              const isSelected = selectedRef === row.shipment_ref || selectedRowIds[row.id];
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectOperation && onSelectOperation((row as any).raw || row)}
                  className={`hover:bg-canvas transition-colors cursor-pointer ${
                    isSelected ? "bg-primary-50/50 border-l-2 border-l-primary-900" : ""
                  }`}
                >
                  <td className="px-2.5 py-1.5 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={Boolean(selectedRowIds[row.id])}
                      onChange={() => toggleSelectRow(row.id)}
                      className="rounded border-line"
                    />
                  </td>

                  {/* SHIPMENT REF WITH NAV LINK TO LG08 */}
                  <td className="px-2.5 py-1.5 font-bold text-primary-900">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/logistics/shipments/${row.id}`);
                      }}
                      className="hover:underline text-left font-mono font-bold"
                    >
                      {row.shipment_ref}
                    </button>
                  </td>

                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.tracking_ref}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.fulfilment_ref}</td>
                  <td className="px-2.5 py-1.5 font-medium text-blue-700 font-mono">{row.order_ref}</td>
                  <td className="px-2.5 py-1.5 font-semibold text-ink">{row.customer}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.supplier}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.warehouse}</td>
                  <td className="px-2.5 py-1.5 font-semibold text-ink">{row.carrier}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.courier}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.shipping_service}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.service_level}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.dest_region}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.delivery_zone}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold">{row.package_count}</td>
                  <td className="px-2.5 py-1.5 text-center text-muted">{row.weight}</td>
                  <td className="px-2.5 py-1.5 text-right font-bold text-ink">LKR {row.shipment_value}</td>
                  <td className="px-2.5 py-1.5 text-right text-muted">LKR {row.shipping_cost}</td>
                  <td className="px-2.5 py-1.5 text-right font-bold text-amber-700">LKR {row.cod_amount}</td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.carrier_assignment)}`}>
                      {row.carrier_assignment}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.pickup_status)}`}>
                      {row.pickup_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.shipment_status)}`}>
                      {row.shipment_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.delivery_status)}`}>
                      {row.delivery_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.pod_status)}`}>
                      {row.pod_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5 text-center text-muted">{row.return_status}</td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.exception_status)}`}>
                      {row.exception_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] border ${getBadgeStyle(row.sla_status)}`}>
                      {row.sla_status}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5 text-muted">{row.shipment_owner}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.updated_at}</td>

                  {/* ACTION COLUMN WITH NAV TO LG08 */}
                  <td className="px-2.5 py-1.5 text-center sticky right-0 bg-white group-hover:bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] border-l border-line" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => router.push(`/admin/logistics/shipments/${row.id}`)}
                        className="px-2 py-0.5 bg-primary-900 text-white font-bold text-[9px] rounded hover:bg-primary-800 transition-colors uppercase flex items-center gap-1"
                      >
                        <Eye size={10} /> Open
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => onEdit((row as any).raw || row)}
                          className="p-0.5 bg-white border border-line text-ink rounded hover:bg-canvas transition-colors"
                          title="Edit Shipment"
                        >
                          <Edit2 size={11} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete((row as any).raw || row)}
                          className="p-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded hover:bg-rose-100 transition-colors"
                          title="Delete Shipment"
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      <div className="px-3 py-2 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-muted bg-white">
        <div>
          Showing 1 to {displayRows.length} of {totalRecords.toLocaleString()} entries
        </div>
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            className="px-2.5 py-0.5 bg-white border border-line rounded text-ink hover:bg-canvas disabled:opacity-40 font-semibold"
          >
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange && onPageChange(page)}
              className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                currentPage === page
                  ? "bg-primary-900 text-white"
                  : "bg-white border border-line text-ink hover:bg-canvas"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-muted">...</span>
          <button
            onClick={() => onPageChange && onPageChange(lastPage)}
            className="px-2 py-0.5 bg-white border border-line rounded text-ink hover:bg-canvas font-semibold"
          >
            {lastPage}
          </button>
          <button
            disabled={currentPage >= lastPage}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            className="px-2.5 py-0.5 bg-white border border-line rounded text-ink hover:bg-canvas disabled:opacity-40 font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
