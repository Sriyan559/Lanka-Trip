import React from "react";
import { Shipment } from "@/types/logistics";
import { ArrowLeft, CheckCircle2, Printer, Download, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface ShipmentDetailHeaderProps {
  shipment: Shipment;
}

export function ShipmentDetailHeader({ shipment }: ShipmentDetailHeaderProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pickup Scheduled":
      case "Scheduled":
      case "In Transit":
      case "Picked Up":
        return "text-blue-600 bg-blue-50";
      case "Delivered":
        return "text-success bg-green-50";
      case "Delivery Failed":
      case "Exception":
        return "text-danger bg-red-50";
      case "Pending Carrier Assignment":
      case "Not Dispatched":
      case "Not Scheduled":
        return "text-warning bg-yellow-50";
      case "Ready for Handover":
      case "Within Target":
        return "text-success bg-green-50";
      case "Low":
        return "text-success bg-green-50";
      default:
        return "text-muted bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-6 mb-6">
      <button 
        onClick={() => router.push("/admin/logistics")}
        className="flex items-center gap-2 text-[13px] font-medium text-muted hover:text-ink transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Logistics & Fulfilment Operations
      </button>

      <div className="flex items-center gap-2 text-xs text-muted font-medium mb-3">
        <span>Logistics</span> <span className="text-gray-300">/</span> <span>Shipment Operations</span> <span className="text-gray-300">/</span> <span className="text-ink">{shipment.reference}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-line">
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Public Shipment Reference</div>
          <h1 className="text-2xl font-bold text-ink">{shipment.reference}</h1>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Database Shipment ID</div>
          <div className="text-lg font-bold text-ink">{shipment.databaseId}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Shipment Type</div>
          <div className="text-lg font-bold text-ink">{shipment.shipmentType}</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-white text-[13px] font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-sm">
            <CheckCircle2 size={16} /> Confirm Pickup Handover
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm">
            <Printer size={16} /> Print Label
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm">
            <Download size={16} /> Export Data
          </button>
          <button className="p-2 bg-white border border-line text-ink rounded-lg hover:bg-canvas transition-colors shadow-sm">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Original Order</div>
          <div className="font-bold text-ink text-sm">{shipment.orderReference}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Database Order ID</div>
          <div className="font-bold text-ink text-sm">9021</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Customer</div>
          <div className="font-bold text-ink text-sm">{shipment.customer.name}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Customer ID</div>
          <div className="font-bold text-ink text-sm">{shipment.customer.id}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Carrier</div>
          <div className="font-bold text-ink text-sm">{shipment.carrier.name}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Tracking Number</div>
          <div className="font-bold text-ink text-sm">{shipment.trackingNumber}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Origin</div>
          <div className="font-bold text-ink text-sm">{shipment.origin}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Destination</div>
          <div className="font-bold text-ink text-sm">{shipment.destination}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Created</div>
          <div className="font-bold text-ink text-sm">{shipment.createdAt}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Pickup Date</div>
          <div className="font-bold text-ink text-sm">{shipment.pickupDate}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Supplier Fulfilment</div>
          <div className="font-bold text-ink text-sm">{shipment.supplier.fulfilmentRef}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Supplier</div>
          <div className="font-bold text-ink text-sm">{shipment.supplier.name}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Packages</div>
          <div className="font-bold text-ink text-sm">{shipment.packages}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Items</div>
          <div className="font-bold text-ink text-sm">{shipment.itemsCount}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Expected Delivery</div>
          <div className="font-bold text-ink text-sm">{shipment.expectedDelivery}</div>
          <div className="text-[11px] font-bold text-muted uppercase tracking-wider mt-3 mb-1">Assigned Officer</div>
          <div className="font-bold text-ink text-sm">{shipment.assignedOfficer}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-line">
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Shipment Status</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.status)}`}>{shipment.status}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Pickup Status</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.pickupStatus)}`}>{shipment.pickupStatus}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Delivery Status</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.deliveryStatus)}`}>{shipment.deliveryStatus}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Package Status</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.packageStatus)}`}>{shipment.packageStatus}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">COD Status</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.codStatus)}`}>{shipment.codStatus}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Risk Level</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.riskLevel)}`}>{shipment.riskLevel}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">SLA Status</div>
          <span className={`px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.slaStatus)}`}>{shipment.slaStatus}</span>
        </div>
      </div>
    </div>
  );
}
