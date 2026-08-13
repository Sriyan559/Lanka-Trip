"use client";

import React, { useState } from "react";
import { Edit2, Eye, Trash2 } from "lucide-react";

export interface LogisticsOperationsTableProps {
  shipments?: Record<string, any>[];
  meta?: { current_page?: number; per_page?: number; total?: number; last_page?: number };
  selectedRef?: string | null;
  onSelectOperation?: (operation: any) => void;
  onPageChange?: (page: number) => void;
  onEdit?: (operation: any) => void;
  onDelete?: (operation: any) => void;
}

export function LogisticsOperationsTable({ shipments = [], meta = {}, selectedRef, onSelectOperation, onPageChange, onEdit, onDelete }: LogisticsOperationsTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const page = meta.current_page ?? 1;
  const lastPage = meta.last_page ?? 1;
  const rows: Record<string, any>[] = shipments.map(s => ({
    ...s,
    key: String(s.id ?? s.uuid),
    fulfilment_ref: s.fulfilment_ref ?? "—",
    order_ref: s.order_number ?? "—",
    shipment_ref: s.shipment_number ?? "—",
    customer: s.customer_name ?? "—",
    supplier: s.supplier_name ?? "—",
    warehouse: s.warehouse_name ?? "—",
    fulfilment_centre: s.fulfilment_centre_name ?? "—",
    carrier: s.carrier_name ?? "Unassigned",
    courier: s.courier_name ?? "Unassigned",
  }));
  const columns = ["Fulfilment Ref", "Order Ref", "Shipment Ref", "Customer", "Supplier / Seller", "Warehouse", "Fulfilment Centre", "Carrier", "Courier", "Status", "Estimated Delivery", "Last Update"];
  const fields = ["fulfilment_ref", "order_ref", "shipment_ref", "customer", "supplier", "warehouse", "fulfilment_centre", "carrier", "courier", "status", "estimated_delivery_date", "updated_at"];
  return <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden">
    <div className="p-4 border-b border-line bg-canvas flex justify-between"><div><h3 className="text-xs font-bold uppercase">Logistics &amp; Fulfilment Operations</h3><p className="text-[11px] text-muted">Database-backed operational records</p></div><div className="text-xs">Total Records: <strong>{Number(meta.total ?? 0).toLocaleString()}</strong></div></div>
    <div className="overflow-x-auto"><table className="w-full text-left text-[11px] whitespace-nowrap"><thead className="bg-canvas text-muted uppercase"><tr><th className="p-3"><input aria-label="Select all" type="checkbox" onChange={e => setSelected(Object.fromEntries(e.target.checked ? rows.map(r => [r.key, true]) : []))}/></th>{columns.map(c => <th className="p-3" key={c}>{c}</th>)}<th className="p-3">Actions</th></tr></thead>
    <tbody>{rows.length === 0 ? <tr><td colSpan={14} className="p-10 text-center text-muted">No logistics operations found for the selected filters.</td></tr> : rows.map(r => <tr key={r.key} className={`border-t border-line ${selectedRef === r.fulfilment_ref ? "bg-blue-50" : ""}`}><td className="p-3"><input aria-label={`Select ${r.shipment_ref}`} type="checkbox" checked={!!selected[r.key]} onChange={() => setSelected(v => ({...v,[r.key]:!v[r.key]}))}/></td>{fields.map(f => <td className="p-3" key={f}>{r[f] == null || r[f] === "" ? "—" : String(r[f])}</td>)}<td className="p-3"><div className="flex gap-1"><button title="Open" onClick={() => onSelectOperation?.(r)}><Eye size={13}/></button><button title="Edit" onClick={() => onEdit?.(r)}><Edit2 size={13}/></button><button title="Delete" onClick={() => onDelete?.(r)}><Trash2 size={13}/></button></div></td></tr>)}</tbody></table></div>
    <div className="p-3 border-t border-line flex justify-between text-xs"><span>Page {page} of {lastPage}</span><div className="flex gap-2"><button disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>Previous</button><button disabled={page >= lastPage} onClick={() => onPageChange?.(page + 1)}>Next</button></div></div>
  </div>;
}
