import React from "react";
import { Shipment } from "@/types/logistics";
import { AlertTriangle, FileText, Map, Phone, X, RefreshCcw, Truck, CheckSquare, Briefcase } from "lucide-react";

interface ShipmentDetailSidebarProps {
  shipment: Shipment;
}

export function ShipmentDetailSidebar({ shipment }: ShipmentDetailSidebarProps) {
  
  const circumference = 2 * Math.PI * 36; // r=36
  const strokeDashoffset = circumference - (shipment.riskScore / 100) * circumference;

  return (
    <div className="w-full xl:w-[340px] flex flex-col gap-6 flex-shrink-0">
      
      {/* SHIPMENT HEALTH */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">Shipment Health</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-[88px] h-[88px] flex-shrink-0 flex items-center justify-center">
            <svg className="transform -rotate-90 w-[88px] h-[88px]">
              <circle cx="44" cy="44" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
              <circle 
                cx="44" cy="44" r="36" 
                stroke="currentColor" strokeWidth="6" fill="transparent" 
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" 
                className={shipment.riskScore >= 90 ? "text-success" : shipment.riskScore >= 70 ? "text-warning" : "text-danger"} 
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-[26px] font-bold text-ink leading-none">{shipment.riskScore}</span>
              <span className="text-[10px] font-bold text-muted">/100</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">Risk Score</span>
              <span className={`font-bold ${shipment.riskScore >= 90 ? "text-success" : shipment.riskScore >= 70 ? "text-warning" : "text-danger"}`}>
                {shipment.riskScore}/100 {shipment.riskLevel}
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">SLA Status</span>
              <span className="font-bold text-success">{shipment.slaStatus}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">Package Readiness</span>
              <span className="font-bold text-ink">{shipment.packageReadiness}%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">Carrier Confidence</span>
              <span className="font-bold text-ink">{shipment.carrierConfidence}%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">Tracking Completeness</span>
              <span className="font-bold text-ink">{shipment.trackingCompleteness}%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">Delivery Confidence</span>
              <span className="font-bold text-ink">{shipment.deliveryConfidence}%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted">COD Exposure</span>
              <span className="font-bold text-ink">LKR {shipment.codExposure.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* OPERATIONAL ATTENTION */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">Operational Attention</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] font-medium text-ink mb-2 leading-tight">Driver not assigned</div>
              <button className="px-3 py-1 bg-white border border-line rounded text-[11px] font-semibold text-ink hover:bg-canvas transition-colors">Contact Carrier</button>
            </div>
          </div>
          <div className="h-[1px] bg-line w-full" />
          <div className="flex items-start gap-3">
            <FileText size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] font-medium text-ink mb-2 leading-tight">Tracking active but awaiting first physical scan</div>
              <button className="px-3 py-1 bg-white border border-line rounded text-[11px] font-semibold text-ink hover:bg-canvas transition-colors">View Tracking</button>
            </div>
          </div>
          <div className="h-[1px] bg-line w-full" />
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] font-medium text-ink mb-2 leading-tight">Customer delivery reminder not yet sent</div>
              <button className="px-3 py-1 bg-white border border-line rounded text-[11px] font-semibold text-ink hover:bg-canvas transition-colors">Send Reminder</button>
            </div>
          </div>
        </div>
      </div>

      {/* CARRIER & ROUTE SUMMARY */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">Carrier & Route Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">Carrier</span>
            <span className="text-[12px] font-medium text-ink text-right">{shipment.carrier.name}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">Service</span>
            <span className="text-[12px] font-medium text-ink text-right">{shipment.carrier.service}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">Pickup Window</span>
            <span className="text-[12px] font-medium text-ink text-right">{shipment.carrier.pickupWindow}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">Estimated Transit</span>
            <span className="text-[12px] font-medium text-ink text-right">{shipment.carrier.estimatedTransit}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">Route</span>
            <span className="text-[12px] font-medium text-ink text-right">{shipment.carrier.route}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">Distance</span>
            <span className="text-[12px] font-medium text-ink text-right">{shipment.carrier.distance}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] text-muted whitespace-nowrap">On-Time Probability</span>
            <span className="text-[12px] font-bold text-success text-right">{shipment.carrier.onTimeProbability}%</span>
          </div>
        </div>
      </div>

      {/* NEXT RECOMMENDED ACTION */}
      <div className="bg-[#1f1111] rounded-xl shadow-lg p-5 text-white border border-[#3d2222]">
        <div className="flex items-center gap-2 mb-3">
          <CheckSquare size={16} className="text-white" />
          <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Next Recommended Action</h3>
        </div>
        <div className="text-[14px] font-semibold mb-4 leading-snug">
          Confirm pickup handover after driver and vehicle details are received.
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Recommended Owner</div>
            <div className="text-[12px] font-medium">{shipment.assignedOfficer}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Due</div>
            <div className="text-[12px] font-medium">Before {shipment.pickupDate}</div>
          </div>
        </div>
        <div className="text-[11px] text-gray-400 border-t border-[#3d2222] pt-3 italic">
          Operational decision support — final action requires an authorized officer.
        </div>
      </div>

      {/* FINAL SHIPMENT ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">Final Shipment Actions</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button className="col-span-2 py-2.5 bg-white border border-line rounded-lg text-[12px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <CheckSquare size={14} /> Confirm Pickup Handover
          </button>
          
          <button className="py-2.5 bg-white border border-line rounded-lg text-[12px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <RefreshCcw size={14} /> Reschedule Pickup
          </button>
          <button className="py-2.5 bg-white border border-line rounded-lg text-[12px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <Truck size={14} /> Change Carrier
          </button>
          
          <button className="col-span-2 py-2.5 bg-white border border-line rounded-lg text-[12px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <Phone size={14} /> Contact Customer
          </button>
          <button className="col-span-2 py-2.5 bg-white border border-line rounded-lg text-[12px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <Briefcase size={14} /> Contact Supplier
          </button>
          <button className="col-span-2 py-2.5 bg-white border border-line rounded-lg text-[12px] font-semibold text-ink flex items-center justify-center gap-2 hover:bg-canvas transition-colors">
            <Phone size={14} /> Contact Carrier
          </button>
          
          <button className="col-span-2 py-2.5 bg-white border border-danger text-danger rounded-lg text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
            <AlertTriangle size={14} /> Report Exception
          </button>
          <button className="col-span-2 py-2.5 bg-white border border-danger text-danger rounded-lg text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
            <X size={14} /> Cancel Shipment
          </button>
        </div>
        <div className="text-[10px] text-muted text-center italic">
          All carrier assignment, pickup, handover, delivery, exception, cancellation, financial adjustment and override actions require a reason and are recorded in the audit history.
        </div>
      </div>
      
    </div>
  );
}
