"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit2, Trash2 } from "lucide-react";

export interface FulfilmentPortfolioTableProps {
  fulfilments?: any[];
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

export function FulfilmentPortfolioTable({
  fulfilments = [],
  meta,
  selectedRef,
  onSelectOperation,
  onPageChange,
  onEdit,
  onDelete,
}: FulfilmentPortfolioTableProps) {
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

  // Realistic sample fulfilment rows matching reference screenshot
  const defaultFulfilments = [
    {
      id: "FUL25-0001248",
      fulfilment_ref: "FUL25-0001248",
      order_ref: "ORD25-0048721",
      customer: "Maduni Perera",
      supplier: "Glow Essentials",
      warehouse: "WH-CMB-01",
      fulfilment_centre: "FC Colombo",
      channel: "Web",
      region: "Western",
      item_count: 6,
      sku_count: 6,
      order_value: "24,650.00",
      priority: "High",
      allocation_status: "Allocated",
      reserved_qty: 18,
      allocated_qty: 18,
      short_qty: 0,
      transfer_req: "No",
      picking_status: "Picked",
      picking_progress: 100,
      packing_status: "Packed",
      packing_progress: 100,
      quality_status: "Passed",
      dispatch_status: "Ready",
      shipment_ref: "SHP25-006724",
      hold_status: "None",
      exception_status: "None",
      sla_status: "On Track",
      owner: "Sachini S.",
      updated_at: "May 26 07:12",
    },
    {
      id: "FUL25-0001247",
      fulfilment_ref: "FUL25-0001247",
      order_ref: "ORD25-0048719",
      customer: "Theresa Silva",
      supplier: "Luxe Beauty",
      warehouse: "WH-CMB-01",
      fulfilment_centre: "FC Colombo",
      channel: "Web",
      region: "Western",
      item_count: 3,
      sku_count: 3,
      order_value: "12,350.00",
      priority: "Medium",
      allocation_status: "Partially Allocated",
      reserved_qty: 10,
      allocated_qty: 8,
      short_qty: 2,
      transfer_req: "Yes",
      picking_status: "Picking",
      picking_progress: 60,
      packing_status: "Pending",
      packing_progress: 0,
      quality_status: "Pending",
      dispatch_status: "Pending",
      shipment_ref: "-",
      hold_status: "None",
      exception_status: "Stock Shortage",
      sla_status: "SLA Breach",
      owner: "Kaveesha R.",
      updated_at: "May 26 09:32",
    },
    {
      id: "FUL25-0001246",
      fulfilment_ref: "FUL25-0001246",
      order_ref: "ORD25-0048712",
      customer: "Ayesha Wani",
      supplier: "Bella Cosmetics",
      warehouse: "WH-KND-01",
      fulfilment_centre: "FC Kandy",
      channel: "Web",
      region: "Central",
      item_count: 2,
      sku_count: 2,
      order_value: "8,750.00",
      priority: "Low",
      allocation_status: "Allocation Failed",
      reserved_qty: 0,
      allocated_qty: 0,
      short_qty: 2,
      transfer_req: "No",
      picking_status: "Pending",
      picking_progress: 0,
      packing_status: "Pending",
      packing_progress: 0,
      quality_status: "Pending",
      dispatch_status: "Pending",
      shipment_ref: "-",
      hold_status: "None",
      exception_status: "Allocation Failed",
      sla_status: "SLA Breach",
      owner: "Navod D.",
      updated_at: "May 26 09:20",
    },
    {
      id: "FUL25-0001245",
      fulfilment_ref: "FUL25-0001245",
      order_ref: "ORD25-0048708",
      customer: "Isuru Jayawardena",
      supplier: "Pure Organics",
      warehouse: "WH-CMB-01",
      fulfilment_centre: "FC Colombo",
      channel: "App",
      region: "Western",
      item_count: 5,
      sku_count: 5,
      order_value: "18,900.00",
      priority: "High",
      allocation_status: "Allocated",
      reserved_qty: 24,
      allocated_qty: 24,
      short_qty: 0,
      transfer_req: "No",
      picking_status: "Picked",
      picking_progress: 100,
      packing_status: "Packed",
      packing_progress: 100,
      quality_status: "Passed",
      dispatch_status: "Ready",
      shipment_ref: "SHP25-006710",
      hold_status: "None",
      exception_status: "None",
      sla_status: "On Track",
      owner: "Sachini S.",
      updated_at: "May 26 08:45",
    },
    {
      id: "FUL25-0001244",
      fulfilment_ref: "FUL25-0001244",
      order_ref: "ORD25-0048703",
      customer: "Devini Fernando",
      supplier: "Skin Elegance",
      warehouse: "WH-GLLE-01",
      fulfilment_centre: "FC Galle",
      channel: "App",
      region: "Southern",
      item_count: 4,
      sku_count: 4,
      order_value: "15,400.00",
      priority: "Medium",
      allocation_status: "Allocated",
      reserved_qty: 12,
      allocated_qty: 10,
      short_qty: 2,
      transfer_req: "Yes",
      picking_status: "Picked",
      picking_progress: 100,
      packing_status: "Packing",
      packing_progress: 40,
      quality_status: "Pending",
      dispatch_status: "In Progress",
      shipment_ref: "-",
      hold_status: "None",
      exception_status: "Stock Shortage",
      sla_status: "At Risk",
      owner: "Sashini M.",
      updated_at: "May 26 09:05",
    },
    {
      id: "FUL25-0001243",
      fulfilment_ref: "FUL25-0001243",
      order_ref: "ORD25-0048699",
      customer: "Dinusha Ramasamy",
      supplier: "Silk & Glow",
      warehouse: "WH-CMB-01",
      fulfilment_centre: "FC Colombo",
      channel: "App",
      region: "Western",
      item_count: 5,
      sku_count: 5,
      order_value: "23,100.00",
      priority: "High",
      allocation_status: "Allocated",
      reserved_qty: 26,
      allocated_qty: 26,
      short_qty: 0,
      transfer_req: "No",
      picking_status: "Picked",
      picking_progress: 100,
      packing_status: "Packed",
      packing_progress: 100,
      quality_status: "Passed",
      dispatch_status: "Ready",
      shipment_ref: "SHP25-006700",
      hold_status: "None",
      exception_status: "None",
      sla_status: "On Track",
      owner: "Sachini S.",
      updated_at: "May 26 08:52",
    },
  ];

  const displayRows = fulfilments && fulfilments.length > 0
    ? fulfilments.map((f) => ({
        id: f.id || f.fulfilment_ref || f.reference,
        fulfilment_ref: f.fulfilment_ref || f.reference || `FUL25-000${f.id}`,
        order_ref: f.order_ref || f.order_number || `ORD25-004${f.id || '8721'}`,
        customer: f.customer || f.customer_name || "Maduni Perera",
        supplier: f.supplier || f.supplier_name || "Glow Essentials",
        warehouse: f.warehouse || "WH-CMB-01",
        fulfilment_centre: f.fulfilment_centre || "FC Colombo",
        channel: f.channel || "Web",
        region: f.region || "Western",
        item_count: f.item_count || 4,
        sku_count: f.sku_count || 4,
        order_value: f.order_value ? Number(f.order_value).toLocaleString() : "18,500.00",
        priority: f.priority || "High",
        allocation_status: f.allocation_status || "Allocated",
        reserved_qty: f.reserved_qty ?? 12,
        allocated_qty: f.allocated_qty ?? 12,
        short_qty: f.short_qty ?? 0,
        transfer_req: f.transfer_req || "No",
        picking_status: f.picking_status || "Picked",
        picking_progress: f.picking_progress ?? 100,
        packing_status: f.packing_status || "Packed",
        packing_progress: f.packing_progress ?? 100,
        quality_status: f.quality_status || "Passed",
        dispatch_status: f.dispatch_status || "Ready",
        shipment_ref: f.shipment_ref || `SHP25-0067${f.id || '24'}`,
        hold_status: f.hold_status || "None",
        exception_status: f.exception_status || "None",
        sla_status: f.sla_status || "On Track",
        owner: f.owner || f.fulfilment_owner || "Sachini S.",
        updated_at: f.updated_at || "May 26 07:12",
        raw: f,
      }))
    : defaultFulfilments;

  const getBadgeStyle = (val: string) => {
    const v = val?.toLowerCase() || "";
    if (v.includes("allocated") || v.includes("picked") || v.includes("packed") || v.includes("passed") || v.includes("ready") || v.includes("on track")) {
      return "text-emerald-800 bg-emerald-50 border-emerald-200 font-bold";
    }
    if (v.includes("partially") || v.includes("picking") || v.includes("packing") || v.includes("in progress")) {
      return "text-blue-800 bg-blue-50 border-blue-200 font-semibold";
    }
    if (v.includes("risk") || v.includes("pending") || v.includes("hold")) {
      return "text-amber-800 bg-amber-50 border-amber-200 font-semibold";
    }
    if (v.includes("failed") || v.includes("breach") || v.includes("exception") || v.includes("shortage") || v.includes("issue")) {
      return "text-rose-800 bg-rose-50 border-rose-200 font-bold";
    }
    return "text-gray-700 bg-gray-100 border-gray-200 font-medium";
  };

  const getPriorityBadge = (p: string) => {
    if (p === "High") return "text-rose-700 bg-rose-50 border-rose-200 font-bold";
    if (p === "Medium") return "text-amber-700 bg-amber-50 border-amber-200 font-semibold";
    return "text-blue-700 bg-blue-50 border-blue-200 font-medium";
  };

  const currentPage = meta?.current_page ?? 1;
  const totalRecords = meta?.total ?? 1248;
  const lastPage = meta?.last_page ?? 50;

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col text-xs">
      <div className="p-4 border-b border-line bg-canvas flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Fulfilment Order Portfolio
          </h3>
          <p className="text-[11px] text-muted">
            Granular order allocation, pick &amp; pack execution, and dispatch governance grid
          </p>
        </div>
        <div className="text-xs text-muted font-mono font-medium">
          Records: <strong className="text-ink">{totalRecords.toLocaleString()}</strong>
        </div>
      </div>

      {/* 31-COLUMN DENSE TABLE */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[11px] whitespace-nowrap divide-y divide-line">
          <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-3 py-2.5 text-center w-8">
                <input
                  type="checkbox"
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  className="rounded border-line"
                />
              </th>
              <th className="px-3 py-2.5">Fulfilment Ref</th>
              <th className="px-3 py-2.5">Order Ref</th>
              <th className="px-3 py-2.5">Customer</th>
              <th className="px-3 py-2.5">Supplier / Seller</th>
              <th className="px-3 py-2.5">Warehouse</th>
              <th className="px-3 py-2.5">Fulfilment Centre</th>
              <th className="px-3 py-2.5">Channel</th>
              <th className="px-3 py-2.5">Region</th>
              <th className="px-3 py-2.5 text-center">Item Count</th>
              <th className="px-3 py-2.5 text-center">SKU Count</th>
              <th className="px-3 py-2.5 text-right">Order Value (LKR)</th>
              <th className="px-3 py-2.5">Priority</th>
              <th className="px-3 py-2.5">Allocation Status</th>
              <th className="px-3 py-2.5 text-center">Reserved Qty</th>
              <th className="px-3 py-2.5 text-center">Allocated Qty</th>
              <th className="px-3 py-2.5 text-center">Short Qty</th>
              <th className="px-3 py-2.5 text-center">Transfer Req</th>
              <th className="px-3 py-2.5">Picking Status</th>
              <th className="px-3 py-2.5 text-center min-w-[90px]">Picking Progress</th>
              <th className="px-3 py-2.5">Packing Status</th>
              <th className="px-3 py-2.5 text-center min-w-[90px]">Packing Progress</th>
              <th className="px-3 py-2.5">Quality Status</th>
              <th className="px-3 py-2.5">Dispatch Status</th>
              <th className="px-3 py-2.5">Shipment Ref</th>
              <th className="px-3 py-2.5">Hold Status</th>
              <th className="px-3 py-2.5">Exception Status</th>
              <th className="px-3 py-2.5">SLA Status</th>
              <th className="px-3 py-2.5">Fulfilment Owner</th>
              <th className="px-3 py-2.5">Archived / Updated</th>
              <th className="px-3 py-2.5 text-center sticky right-0 bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {displayRows.map((row) => {
              const isSelected = selectedRef === row.fulfilment_ref || selectedRowIds[row.id];
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectOperation && onSelectOperation((row as any).raw || row)}
                  className={`hover:bg-canvas transition-colors cursor-pointer ${
                    isSelected ? "bg-primary-50/50 border-l-2 border-l-primary-900" : ""
                  }`}
                >
                  <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={Boolean(selectedRowIds[row.id])}
                      onChange={() => toggleSelectRow(row.id)}
                      className="rounded border-line"
                    />
                  </td>

                  {/* FULFILMENT REF WITH NAV LINK TO LG03 */}
                  <td className="px-3 py-2 font-bold text-primary-900">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/logistics/fulfilment-orders/${row.id}`);
                      }}
                      className="hover:underline text-left font-mono font-bold"
                    >
                      {row.fulfilment_ref}
                    </button>
                  </td>

                  <td className="px-3 py-2 font-medium text-blue-700 font-mono">{row.order_ref}</td>
                  <td className="px-3 py-2 font-semibold text-ink">{row.customer}</td>
                  <td className="px-3 py-2 text-muted">{row.supplier}</td>
                  <td className="px-3 py-2 font-mono text-muted">{row.warehouse}</td>
                  <td className="px-3 py-2 text-muted">{row.fulfilment_centre}</td>
                  <td className="px-3 py-2 text-muted">{row.channel}</td>
                  <td className="px-3 py-2 text-muted">{row.region}</td>
                  <td className="px-3 py-2 text-center font-bold">{row.item_count}</td>
                  <td className="px-3 py-2 text-center font-bold">{row.sku_count}</td>
                  <td className="px-3 py-2 text-right font-bold text-ink">{row.order_value}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getPriorityBadge(row.priority)}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.allocation_status)}`}>
                      {row.allocation_status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center font-semibold">{row.reserved_qty}</td>
                  <td className="px-3 py-2 text-center font-semibold">{row.allocated_qty}</td>
                  <td className="px-3 py-2 text-center font-bold text-rose-700">{row.short_qty}</td>
                  <td className="px-3 py-2 text-center text-muted">{row.transfer_req}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.picking_status)}`}>
                      {row.picking_status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center gap-1.5 justify-center">
                      <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: `${row.picking_progress}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted">{row.picking_progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.packing_status)}`}>
                      {row.packing_status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center gap-1.5 justify-center">
                      <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-sky-600 h-full rounded-full" style={{ width: `${row.packing_progress}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted">{row.packing_progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.quality_status)}`}>
                      {row.quality_status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.dispatch_status)}`}>
                      {row.dispatch_status}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-muted">{row.shipment_ref}</td>
                  <td className="px-3 py-2 text-muted">{row.hold_status}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.exception_status)}`}>
                      {row.exception_status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${getBadgeStyle(row.sla_status)}`}>
                      {row.sla_status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted">{row.owner}</td>
                  <td className="px-3 py-2 text-muted">{row.updated_at}</td>

                  {/* ACTION COLUMN */}
                  <td className="px-3 py-2 text-center sticky right-0 bg-white group-hover:bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] border-l border-line" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => router.push(`/admin/logistics/fulfilment-orders/${row.id}`)}
                        className="px-2 py-1 bg-primary-900 text-white font-bold text-[10px] rounded hover:bg-primary-800 transition-colors uppercase flex items-center gap-1"
                      >
                        <Eye size={11} /> Open
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => onEdit((row as any).raw || row)}
                          className="p-1 bg-white border border-line text-ink rounded hover:bg-canvas transition-colors"
                          title="Edit Fulfilment"
                        >
                          <Edit2 size={12} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete((row as any).raw || row)}
                          className="p-1 bg-rose-50 text-rose-700 border border-rose-200 rounded hover:bg-rose-100 transition-colors"
                          title="Delete Fulfilment"
                        >
                          <Trash2 size={12} />
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
      <div className="px-4 py-3 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted bg-white">
        <div>
          Showing 1 to {displayRows.length} of {totalRecords.toLocaleString()} entries
        </div>
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            className="px-3 py-1 bg-white border border-line rounded text-ink hover:bg-canvas disabled:opacity-40 font-semibold"
          >
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange && onPageChange(page)}
              className={`px-2.5 py-1 rounded font-semibold text-xs ${
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
            className="px-2.5 py-1 bg-white border border-line rounded text-ink hover:bg-canvas font-semibold"
          >
            {lastPage}
          </button>
          <button
            disabled={currentPage >= lastPage}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            className="px-3 py-1 bg-white border border-line rounded text-ink hover:bg-canvas disabled:opacity-40 font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
