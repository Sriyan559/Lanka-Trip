import React from "react";
import { Shipment } from "@/types/logistics";
import { ExternalLink, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const ActiveRouteMap = dynamic(
  () => import('./ActiveRouteMap'),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 flex items-center justify-center animate-pulse">Loading map...</div> }
);interface ShipmentContextCardsProps {
  shipment: Shipment;
}

export function ShipmentContextCards({ shipment }: ShipmentContextCardsProps) {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* 1 ORDER & FULFILMENT CONTEXT */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-muted border border-line">1</div>
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">Order & Fulfilment Context</h3>
        </div>
        
        <div className="space-y-3 mb-5">
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Order Reference</span>
            <span className="text-[12px] font-medium text-ink">{shipment.orderReference}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Order Date</span>
            <span className="text-[12px] font-medium text-ink">Jul 21, 2026 — 10:42 AM</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Order Total</span>
            <span className="text-[12px] font-bold text-ink">LKR 12,450.00</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Payment Status</span>
            <span className="text-[12px] font-bold text-success bg-green-50 px-2 py-0.5 rounded w-max">Paid</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Supplier Fulfilment</span>
            <span className="text-[12px] font-medium text-ink">{shipment.supplier.fulfilmentRef}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Supplier</span>
            <span className="text-[12px] font-bold text-ink">{shipment.supplier.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Fulfilment Status</span>
            <span className="text-[12px] font-bold text-success bg-green-50 px-2 py-0.5 rounded w-max">{shipment.supplier.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-[12px] text-muted">Allocated Items</span>
            <span className="text-[12px] font-medium text-ink">2 of 2</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 py-1.5 bg-white border border-line rounded text-[11px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <ExternalLink size={12} /> View Original Order
          </button>
          <button className="flex-1 py-1.5 bg-white border border-line rounded text-[11px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <ExternalLink size={12} /> View Supplier Fulfilment
          </button>
        </div>
        <button className="w-full mt-3 py-1.5 bg-white border border-line rounded text-[11px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
          <ExternalLink size={12} /> View Payment
        </button>
      </div>

      {/* 2 CUSTOMER & DELIVERY CONTEXT */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-muted border border-line">2</div>
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">Customer & Delivery Context</h3>
        </div>
        
        <div className="space-y-3 flex-1">
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Customer</span>
            <span className="text-[12px] font-bold text-ink">{shipment.customer.name}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Customer ID</span>
            <span className="text-[12px] font-medium text-ink">{shipment.customer.id}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Phone</span>
            <span className="text-[12px] font-medium text-ink">{shipment.customer.phone}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Email</span>
            <span className="text-[12px] font-medium text-ink">{shipment.customer.email}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Delivery Address</span>
            <span className="text-[12px] font-medium text-ink leading-relaxed">
              {shipment.customer.address}
            </span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Delivery Instructions</span>
            <span className="text-[12px] font-bold text-ink">{shipment.customer.instructions}</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-[12px] text-muted">Address Type</span>
            <span className="text-[12px] font-bold text-ink">{shipment.customer.addressType}</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-1.5 bg-white border border-line rounded text-[11px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <ExternalLink size={12} /> View Customer
          </button>
          <button className="flex-1 py-1.5 bg-white border border-line rounded text-[11px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            Contact Customer
          </button>
          <button className="flex-1 py-1.5 bg-white border border-line rounded text-[11px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <MapPin size={12} /> View on Map
          </button>
        </div>
      </div>

      {/* 3 CARRIER & ROUTE SUMMARY */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-muted border border-line">3</div>
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">Carrier & Route Summary</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-[12px] text-muted">Carrier</span>
            <span className="text-[12px] font-medium text-ink">{shipment.carrier.name}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-[12px] text-muted">Service</span>
            <span className="text-[12px] font-medium text-ink">{shipment.carrier.service}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-[12px] text-muted">Pickup Window</span>
            <span className="text-[12px] font-medium text-ink">{shipment.carrier.pickupWindow}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-[12px] text-muted">Estimated Transit</span>
            <span className="text-[12px] font-medium text-ink">{shipment.carrier.estimatedTransit}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-[12px] text-muted flex items-start pt-0.5">Route</span>
            <span className="text-[12px] font-bold text-ink leading-relaxed">{shipment.carrier.route.replace(" -> ", "\n↓\n")}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <span className="text-[12px] text-muted">Distance</span>
            <span className="text-[12px] font-medium text-ink">{shipment.carrier.distance}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4 pt-2 border-t border-line">
            <span className="text-[12px] font-bold text-ink">On-Time Probability</span>
            <span className="text-[12px] font-bold text-success">{shipment.carrier.onTimeProbability}%</span>
          </div>
        </div>
      </div>

      {/* 4 ACTIVE ROUTE PREVIEW */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded-full border border-[#741d35] text-[#741d35] flex items-center justify-center text-[11px] font-bold">4</div>
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider">Active Route Preview</h3>
        </div>
        
        <div className="flex-1 rounded-xl shadow-sm overflow-hidden relative min-h-[240px] bg-slate-100 flex items-center justify-center">
          <ActiveRouteMap />
        </div>
      </div>
      
    </div>
  );
}
