"use client";

import React from "react";
import { Eye } from "lucide-react";

export interface AllocationPortfolioTableProps {
  allocations?: any[];
  selectedRef?: string | null;
  onSelectAllocation?: (allocation: any) => void;
}

export function AllocationPortfolioTable({
  allocations = [],
  selectedRef,
  onSelectAllocation,
}: AllocationPortfolioTableProps) {
  const defaultAllocations = [
    {
      id: "ALLOC-2025-008921",
      ref: "ALLOC-2025-008921",
      fulfilment_ref: "FUL-2025-008921",
      order_ref: "ORD-2025-0108921",
      product: "Ceylon Glow Serum",
      sku: "SKU-CGS-001",
      supplier: "BeautyGlow Labs",
      customer: "Kandy Store",
      bu: "All BU",
      channel: "Exim",
      dest_wh: "Kandy DC",
      ordered_qty: 120,
      avail_qty: 150,
      reserved_qty: 120,
      allocated_qty: 120,
      short_qty: 0,
      strategy: "RFID",
      source_wh: "Colombo DC",
      source_loc: "A-01-01",
      batch: "BAT-0163",
      expiry: "16 Dec 2024",
      res_ref: "RES-2025-007621",
      res_expiry: "15 Jun 25",
      alloc_status: "Fully Allocated",
      res_status: "Active",
      transfer_req: "No",
      transfer_ref: "—",
      transfer_status: "—",
      backorder: "No",
      sub_status: "—",
      hold_status: "No",
      exception_status: "No",
      owner: "Elena Vance",
      updated_at: "27 May 25 09:16 AM",
    },
    {
      id: "ALLOC-2025-008922",
      ref: "ALLOC-2025-008922",
      fulfilment_ref: "FUL-2025-008922",
      order_ref: "ORD-2025-0108922",
      product: "Lotus Night Cream",
      sku: "SKU-LNC-008",
      supplier: "Lotus Care Products",
      customer: "Galle Store",
      bu: "All BU",
      channel: "Wholesale",
      dest_wh: "Galle Hub",
      ordered_qty: 250,
      avail_qty: 210,
      reserved_qty: 150,
      allocated_qty: 150,
      short_qty: 100,
      strategy: "Demand Priority",
      source_wh: "Galle Hub",
      source_loc: "B-02-04",
      batch: "BAT-0191",
      expiry: "11 Jul 25",
      res_ref: "RES-2025-007622",
      res_expiry: "27 Jun 25",
      alloc_status: "Partially Allocated",
      res_status: "Active",
      transfer_req: "Yes",
      transfer_ref: "TR-2025-004492",
      transfer_status: "Pending",
      backorder: "Yes",
      sub_status: "Damage",
      hold_status: "No",
      exception_status: "No",
      owner: "Pasindu Perera",
      updated_at: "27 May 25 09:12 AM",
    },
    {
      id: "ALLOC-2025-008923",
      ref: "ALLOC-2025-008923",
      fulfilment_ref: "FUL-2025-008923",
      order_ref: "ORD-2025-0108923",
      product: "Jasmine Hair Oil",
      sku: "SKU-JHO-012",
      supplier: "Ceylon Herbal",
      customer: "Jaffna Retail",
      bu: "All BU",
      channel: "Retail",
      dest_wh: "Jaffna WH",
      ordered_qty: 50,
      avail_qty: 120,
      reserved_qty: 50,
      allocated_qty: 50,
      short_qty: 0,
      strategy: "RFID",
      source_wh: "Jaffna WH",
      source_loc: "J-01-02",
      batch: "BAT-0105",
      expiry: "08 May 25",
      res_ref: "RES-2025-007623",
      res_expiry: "20 Jun 25",
      alloc_status: "Fully Allocated",
      res_status: "Active",
      transfer_req: "No",
      transfer_ref: "—",
      transfer_status: "—",
      backorder: "No",
      sub_status: "Active",
      hold_status: "No",
      exception_status: "No",
      owner: "Tharindu Fernando",
      updated_at: "27 May 25 09:08 AM",
    },
    {
      id: "ALLOC-2025-008924",
      ref: "ALLOC-2025-008924",
      fulfilment_ref: "FUL-2025-008924",
      order_ref: "ORD-2025-0108924",
      product: "Rose Face Mist",
      sku: "SKU-RFM-005",
      supplier: "Rosette Beauty",
      customer: "Colombo Mall",
      bu: "All BU",
      channel: "B2C",
      dest_wh: "Colombo Central",
      ordered_qty: 200,
      avail_qty: 180,
      reserved_qty: 100,
      allocated_qty: 0,
      short_qty: 200,
      strategy: "Best Available",
      source_wh: "Colombo Central",
      source_loc: "C-02-07",
      batch: "BAT-0224",
      expiry: "12 May 25",
      res_ref: "RES-2025-007624",
      res_expiry: "20 Jun 25",
      alloc_status: "Allocation Failed",
      res_status: "Failed",
      transfer_req: "Yes",
      transfer_ref: "TR-2025-004498",
      transfer_status: "In Transit",
      backorder: "Yes",
      sub_status: "Shortage",
      hold_status: "No",
      exception_status: "Stock Shortage",
      owner: "Nimali Silva",
      updated_at: "26 May 25 18:45 PM",
    },
    {
      id: "ALLOC-2025-008925",
      ref: "ALLOC-2025-008925",
      fulfilment_ref: "FUL-2025-008925",
      order_ref: "ORD-2025-0108925",
      product: "Herbal Shampoo",
      sku: "SKU-HSH-003",
      supplier: "NatureCare SriLanka",
      customer: "Negombo Retail",
      bu: "All BU",
      channel: "B2C",
      dest_wh: "Negombo Hub",
      ordered_qty: 90,
      avail_qty: 76,
      reserved_qty: 40,
      allocated_qty: 40,
      short_qty: 50,
      strategy: "RFID",
      source_wh: "Negombo Hub",
      source_loc: "N-01-03",
      batch: "BAT-0111",
      expiry: "23 Jul 25",
      res_ref: "RES-2025-007625",
      res_expiry: "22 Jun 25",
      alloc_status: "Partially Allocated",
      res_status: "Expiring Soon",
      transfer_req: "Yes",
      transfer_ref: "TR-2025-004502",
      transfer_status: "In Transit",
      backorder: "No",
      sub_status: "Active",
      hold_status: "No",
      exception_status: "No",
      owner: "Elena Vance",
      updated_at: "26 May 25 16:30 PM",
    },
  ];

  const displayRows = allocations && allocations.length > 0 ? allocations : defaultAllocations;

  const getAllocBadge = (status: string) => {
    if (status === "Fully Allocated") return "text-emerald-800 bg-emerald-50 border-emerald-200 font-bold";
    if (status === "Partially Allocated") return "text-amber-800 bg-amber-50 border-amber-200 font-bold";
    if (status === "Allocation Failed") return "text-rose-800 bg-rose-50 border-rose-200 font-bold";
    return "text-blue-800 bg-blue-50 border-blue-200 font-semibold";
  };

  const getResBadge = (status: string) => {
    if (status === "Active") return "text-emerald-800 bg-emerald-50 border-emerald-200";
    if (status === "Expiring Soon") return "text-amber-800 bg-amber-50 border-amber-200 font-bold";
    if (status === "Failed") return "text-rose-800 bg-rose-50 border-rose-200 font-bold";
    return "text-gray-700 bg-canvas border-line";
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col text-[10px]">
      <div className="p-2.5 border-b border-line bg-canvas flex items-center justify-between">
        <div>
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider">
            Inventory Allocation, Reservation &amp; Transfer Portfolio ({displayRows.length})
          </h3>
          <p className="text-[9px] text-muted">
            Network-wide stock allocation requests, reservation lifecycle &amp; inter-facility transfer tracking grid
          </p>
        </div>
        <div className="text-[10px] text-muted font-mono font-medium">
          Total Demands: <strong className="text-ink">1,248 Total</strong>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[10px] whitespace-nowrap divide-y divide-line">
          <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider text-[8.5px]">
            <tr>
              <th className="px-2.5 py-1.5">Allocation Reference</th>
              <th className="px-2.5 py-1.5">Fulfilment Ref</th>
              <th className="px-2.5 py-1.5">Order Ref</th>
              <th className="px-2.5 py-1.5">Product</th>
              <th className="px-2.5 py-1.5">SKU</th>
              <th className="px-2.5 py-1.5">Supplier / Seller</th>
              <th className="px-2.5 py-1.5">Customer</th>
              <th className="px-2.5 py-1.5">Business Unit</th>
              <th className="px-2.5 py-1.5">Sales Channel</th>
              <th className="px-2.5 py-1.5">Destination WH</th>
              <th className="px-2.5 py-1.5 text-center">Ordered Qty</th>
              <th className="px-2.5 py-1.5 text-center">Available Qty</th>
              <th className="px-2.5 py-1.5 text-center">Reserved Qty</th>
              <th className="px-2.5 py-1.5 text-center">Allocated Qty</th>
              <th className="px-2.5 py-1.5 text-center">Short Qty</th>
              <th className="px-2.5 py-1.5">Strategy</th>
              <th className="px-2.5 py-1.5">Source WH</th>
              <th className="px-2.5 py-1.5">Source Loc</th>
              <th className="px-2.5 py-1.5">Batch / Lot</th>
              <th className="px-2.5 py-1.5">Expiry</th>
              <th className="px-2.5 py-1.5">Reservation Ref</th>
              <th className="px-2.5 py-1.5">Reservation Expiry</th>
              <th className="px-2.5 py-1.5 text-center">Allocation Status</th>
              <th className="px-2.5 py-1.5 text-center">Reservation Status</th>
              <th className="px-2.5 py-1.5 text-center">Transfer Req</th>
              <th className="px-2.5 py-1.5">Transfer Ref</th>
              <th className="px-2.5 py-1.5 text-center">Transfer Status</th>
              <th className="px-2.5 py-1.5 text-center">Backorder</th>
              <th className="px-2.5 py-1.5 text-center">Sub Status</th>
              <th className="px-2.5 py-1.5 text-center">Hold Status</th>
              <th className="px-2.5 py-1.5 text-center">Exception Status</th>
              <th className="px-2.5 py-1.5">Allocation Owner</th>
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
                  onClick={() => onSelectAllocation && onSelectAllocation(row)}
                  className={`hover:bg-canvas transition-colors cursor-pointer ${
                    isSelected ? "bg-primary-50/50 border-l-2 border-l-primary-900" : ""
                  }`}
                >
                  <td className="px-2.5 py-1.5 font-bold font-mono text-primary-900">{row.ref}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.fulfilment_ref}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.order_ref}</td>
                  <td className="px-2.5 py-1.5 font-bold text-ink">{row.product}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.sku}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.supplier}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.customer}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.bu}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.channel}</td>
                  <td className="px-2.5 py-1.5 text-ink font-medium">{row.dest_wh}</td>

                  <td className="px-2.5 py-1.5 text-center font-bold text-ink">{row.ordered_qty}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-emerald-700">{row.avail_qty}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-blue-700">{row.reserved_qty}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-purple-700">{row.allocated_qty}</td>
                  <td className="px-2.5 py-1.5 text-center font-bold text-rose-700">{row.short_qty}</td>

                  <td className="px-2.5 py-1.5 text-muted">{row.strategy}</td>
                  <td className="px-2.5 py-1.5 font-medium text-ink">{row.source_wh}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.source_loc}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.batch}</td>
                  <td className="px-2.5 py-1.5 text-muted text-[9px]">{row.expiry}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.res_ref}</td>
                  <td className="px-2.5 py-1.5 text-muted text-[9px]">{row.res_expiry}</td>

                  <td className="px-2.5 py-1.5 text-center">
                    <span className={`px-1.5 py-0.2 rounded text-[8.5px] border ${getAllocBadge(row.alloc_status)}`}>
                      {row.alloc_status}
                    </span>
                  </td>

                  <td className="px-2.5 py-1.5 text-center">
                    <span className={`px-1.5 py-0.2 rounded text-[8.5px] border ${getResBadge(row.res_status)}`}>
                      {row.res_status}
                    </span>
                  </td>

                  <td className="px-2.5 py-1.5 text-center font-semibold">{row.transfer_req}</td>
                  <td className="px-2.5 py-1.5 font-mono text-muted">{row.transfer_ref}</td>
                  <td className="px-2.5 py-1.5 text-center">
                    {row.transfer_status !== "—" ? (
                      <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-blue-800 bg-blue-50 border border-blue-200">
                        {row.transfer_status}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>

                  <td className="px-2.5 py-1.5 text-center text-muted">{row.backorder}</td>
                  <td className="px-2.5 py-1.5 text-center text-muted">{row.sub_status}</td>
                  <td className="px-2.5 py-1.5 text-center text-muted">{row.hold_status}</td>
                  <td className="px-2.5 py-1.5 text-center text-muted">{row.exception_status}</td>
                  <td className="px-2.5 py-1.5 text-muted">{row.owner}</td>
                  <td className="px-2.5 py-1.5 text-muted text-[8.5px]">{row.updated_at}</td>

                  {/* ACTION COLUMN */}
                  <td className="px-2.5 py-1.5 text-center sticky right-0 bg-white group-hover:bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] border-l border-line" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectAllocation && onSelectAllocation(row)}
                      className="px-1.5 py-0.5 bg-primary-900 text-white font-bold text-[8.5px] rounded hover:bg-primary-800 transition-colors uppercase flex items-center gap-0.5 mx-auto"
                    >
                      <Eye size={10} /> Inspect
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
