import React from "react";
import { useRouter } from "next/navigation";

export interface ShipmentTableProps {
  shipments: any[];
  meta?: {
    current_page?: number;
    per_page?: number;
    total?: number;
    last_page?: number;
  };
  onPageChange?: (page: number) => void;
  onEdit?: (shipment: any) => void;
  onDelete?: (shipment: any) => void;
}

export function ShipmentTable({ shipments = [], meta, onPageChange, onEdit, onDelete }: ShipmentTableProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "in_transit":
      case "booked":
      case "out_for_delivery":
        return "text-blue-600 bg-blue-50";
      case "delivered":
        return "text-emerald-700 bg-emerald-50";
      case "failed":
      case "delayed":
        return "text-rose-700 bg-rose-50";
      case "pending":
        return "text-amber-700 bg-amber-50";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const currentPage = meta?.current_page ?? 1;
  const totalRecords = meta?.total ?? shipments.length;
  const lastPage = meta?.last_page ?? 1;

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden">
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left text-[11px] whitespace-nowrap">
          <thead className="bg-canvas border-b border-line text-muted">
            <tr>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center min-w-[80px]">Shipment Reference</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Order Reference</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Logistics Partner</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Tracking Number</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Shipment Status</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Shipped Date</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Expected Delivery</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center sticky right-0 bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shipments.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-muted">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-medium">No shipments found matching the selected criteria.</span>
                    <span className="text-[11px] text-muted">Check your search parameters or filter selections.</span>
                  </div>
                </td>
              </tr>
            ) : (
              shipments.map((shipment) => {
                const ref = shipment.shipment_number || shipment.reference || `SHP-${shipment.id}`;
                const orderRef = shipment.order_number || shipment.orderReference || `ORD-${shipment.order_id || 'N/A'}`;
                const carrier = shipment.carrier_name || shipment.carrier?.name || 'Unassigned';
                const tracking = shipment.tracking_number || shipment.trackingNumber || 'N/A';
                const status = shipment.status || 'pending';
                const shippedDate = shipment.shipped_at || shipment.pickupDate || 'Pending';
                const estDelivery = shipment.estimated_delivery_date || shipment.expectedDelivery || 'N/A';

                return (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-3 py-3 text-center font-bold text-ink">{ref}</td>
                    <td className="px-3 py-3 text-center font-medium text-ink">{orderRef}</td>
                    <td className="px-3 py-3 text-center font-medium text-ink">{carrier}</td>
                    <td className="px-3 py-3 text-center font-medium text-ink">{tracking}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded font-bold text-[10px] uppercase ${getStatusColor(status)}`}>
                        {status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center text-muted">{shippedDate}</td>
                    <td className="px-3 py-3 text-center text-muted">{estDelivery}</td>
                    <td className="px-3 py-3 text-center sticky right-0 bg-white group-hover:bg-gray-50 z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] border-l border-line">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => router.push(`/admin/logistics/shipments/${shipment.id || ref}`)}
                          className="bg-primary-900 text-white font-bold text-[10px] px-2.5 py-1.5 rounded hover:bg-primary-700 transition-colors uppercase"
                        >
                          Open
                        </button>
                        {onEdit && (
                          <button 
                            onClick={() => onEdit(shipment)}
                            className="bg-white border border-line text-ink font-bold text-[10px] px-2.5 py-1.5 rounded hover:bg-canvas transition-colors uppercase"
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => onDelete(shipment)}
                            className="bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px] px-2.5 py-1.5 rounded hover:bg-rose-100 transition-colors uppercase"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-line flex items-center justify-between text-[13px] text-muted bg-white">
        <div>Showing Page {currentPage} of {lastPage} ({totalRecords} total shipments)</div>
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage <= 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            className="w-8 h-8 flex items-center justify-center rounded border border-line bg-white hover:bg-canvas text-ink disabled:opacity-40 transition-colors"
          >
            &lt;
          </button>
          <span className="px-3 py-1 bg-primary-900 text-white text-xs font-semibold rounded">{currentPage}</span>
          <button 
            disabled={currentPage >= lastPage}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            className="w-8 h-8 flex items-center justify-center rounded border border-line bg-white hover:bg-canvas text-ink disabled:opacity-40 transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
