import React from "react";
import { Shipment } from "@/types/logistics";
import { TrendingUp } from "lucide-react";

interface ShipmentStepperProps {
  shipment: Shipment;
}

export function ShipmentStepper({ shipment }: ShipmentStepperProps) {
  
  const tabs = [
    "Shipment Overview", "Shipment Items", "Packages & Handling", 
    "Carrier Assignment", "Pickup & Handover", "Tracking Timeline", 
    "Delivery & Proof", "Exceptions & Claims", "COD & Financials", 
    "Communications", "Operational Issues", "Audit History"
  ];

  const milestones = [
    { number: 1, label: "Shipment Created", status: "Completed" },
    { number: 2, label: "Items Allocated", status: "Completed" },
    { number: 3, label: "Package Created", status: "Completed" },
    { number: 4, label: "Package Sealed", status: "Completed" },
    { number: 5, label: "Carrier Assigned", status: "Completed" },
    { number: 6, label: "Pickup Scheduled", status: "Current" },
    { number: 7, label: "Picked Up", status: "Not Started" },
    { number: 8, label: "Origin Hub Scan", status: "Not Started" },
    { number: 9, label: "In Transit", status: "Not Started" },
    { number: 10, label: "Destination Hub Scan", status: "Not Started" },
    { number: 11, label: "Out for Delivery", status: "Not Started" },
    { number: 12, label: "Delivered", status: "Not Started" },
    { number: 13, label: "Closed", status: "Not Started" },
  ];

  const getMilestoneStyle = (status: string) => {
    if (status === "Completed") return { bg: "bg-success", text: "text-white", labelColor: "text-ink", subColor: "text-success", border: "border-success" };
    if (status === "Current") return { bg: "bg-primary-900", text: "text-white", labelColor: "text-ink", subColor: "text-primary-900", border: "border-primary-900" };
    return { bg: "bg-canvas", text: "text-muted", labelColor: "text-muted", subColor: "text-muted", border: "border-line" };
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm mb-6">
      
      {/* TABS */}
      <div className="flex overflow-x-auto border-b border-line px-2 scrollbar-none">
        {tabs.map((tab, idx) => (
          <button 
            key={idx}
            className={`whitespace-nowrap px-4 py-3 text-[12px] font-semibold transition-colors border-b-2 ${
              idx === 0 ? "border-primary-900 text-primary-900" : "border-transparent text-muted hover:text-ink hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        
        {/* COMPLETION BARS */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex-1 w-full max-w-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Fulfilment Completion</span>
              <span className="text-2xl font-bold text-ink">{shipment.fulfilmentCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-canvas rounded-full overflow-hidden">
              <div className="h-full bg-primary-900 rounded-full" style={{ width: `${shipment.fulfilmentCompletion}%` }} />
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Delivery Confidence</span>
              <span className="text-2xl font-bold text-ink">{shipment.deliveryConfidence}%</span>
            </div>
            <div className="w-full h-2 bg-canvas rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: `${shipment.deliveryConfidence}%` }} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end pb-1 text-success font-bold text-[15px]">
            <TrendingUp size={20} /> Very High
          </div>
        </div>

        {/* METRICS ROW INSIDE STEPPER */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-line mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Current Milestone</span>
            <span className="text-[13px] font-bold text-primary-900">{shipment.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Package Readiness</span>
            <span className="text-[13px] font-bold text-success">{shipment.packageReadiness}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Tracking Availability</span>
            <span className="text-[13px] font-bold text-success">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Delivery Risk</span>
            <span className="text-[13px] font-bold text-success">{shipment.riskLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Special Handling</span>
            <span className="text-[13px] font-medium text-ink">Keep upright</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Temperature Requirement</span>
            <span className="text-[13px] font-medium text-ink">Standard ambient</span>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="relative flex justify-between overflow-x-auto pb-4 scrollbar-none">
          <div className="absolute top-[15px] left-0 right-0 h-0.5 bg-line z-0" />
          {milestones.map((milestone, idx) => {
            const style = getMilestoneStyle(milestone.status);
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center flex-1 min-w-[80px]">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-bold mb-3 border-2 ${style.border} ${style.bg} ${style.text} transition-colors`}>
                  {milestone.number}
                </div>
                <div className={`text-[11px] font-bold text-center leading-tight mb-1 ${style.labelColor}`}>
                  {milestone.label.replace(" ", "\n")}
                </div>
                <div className={`text-[10px] font-semibold text-center ${style.subColor}`}>
                  {milestone.status}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
