import React from "react";
import { OperationsHealth, PriorityAlert, QuickQueueItem, CarrierPerformance, CODFinancials } from "@/types/logistics";
import { AlertTriangle, Clock, Truck, ShieldAlert, AlertCircle, PackageX, ExternalLink, Info, MoveRight } from "lucide-react";

interface LogisticsSidebarsProps {
  operationsHealth: OperationsHealth;
  priorityAlerts: PriorityAlert[];
  quickQueue: QuickQueueItem[];
  carrierPerformance: CarrierPerformance[];
  codFinancials: CODFinancials;
}

export function LogisticsSidebars({
  operationsHealth,
  priorityAlerts,
  quickQueue,
  carrierPerformance,
  codFinancials
}: LogisticsSidebarsProps) {
  
  const formatCurrency = (val: number) => `LKR ${(val / 1000000).toFixed(2)}M`;
  const formatCurrencyExact = (val: number) => `LKR ${val.toLocaleString()}`;

  return (
    <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
      
      {/* OPERATIONS HEALTH */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">Operations Health</h3>
          <Info size={14} className="text-muted" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><Clock size={14}/> Average Dispatch Time</span>
            <span className="font-semibold text-success">{operationsHealth.averageDispatchTime}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><Truck size={14}/> On-Time Pickup Rate</span>
            <span className="font-semibold text-success">{operationsHealth.onTimePickupRate}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><Truck size={14}/> On-Time Delivery Rate</span>
            <span className="font-semibold text-success">{operationsHealth.onTimeDeliveryRate}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><AlertCircle size={14}/> Active SLA Breaches</span>
            <span className="font-bold text-danger">{operationsHealth.activeSlaBreaches}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><AlertCircle size={14}/> Carrier Assignment Backlog</span>
            <span className="font-bold text-warning">{operationsHealth.carrierAssignmentBacklog}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><AlertCircle size={14}/> Delivery Exception Backlog</span>
            <span className="font-bold text-danger">{operationsHealth.deliveryExceptionBacklog}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><ShieldAlert size={14}/> Unassigned High-Risk Shipments</span>
            <span className="font-bold text-danger">{operationsHealth.unassignedHighRiskShipments}</span>
          </div>
        </div>
      </div>

      {/* PRIORITY ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={14} className="text-danger" /> Priority Alerts
          </h3>
        </div>
        <div className="space-y-3">
          {priorityAlerts.map(alert => (
            <div key={alert.id} className="flex justify-between items-center border-l-[3px] pl-3 py-1 text-sm border-danger">
              <div>
                <div className="font-semibold text-danger text-[13px]">{alert.type}</div>
                <div className="text-muted text-[11px]">{alert.shipmentRef}</div>
              </div>
              <button className="text-[11px] font-medium text-ink hover:text-primary-900 flex items-center gap-1 transition-colors">
                Open Shipment <MoveRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK QUEUE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
            <MoveRight size={14} className="text-ink" /> Quick Queue
          </h3>
        </div>
        <div className="space-y-2">
          {quickQueue.map(item => (
            <div key={item.id} className="flex justify-between items-center text-[12px] group hover:bg-canvas p-1 -mx-1 rounded transition-colors cursor-pointer">
              <span className="text-muted truncate max-w-[150px]">{item.title}</span>
              <span className="font-medium text-ink flex items-center gap-1 group-hover:text-primary-900 transition-colors">
                {item.shipmentRef} <MoveRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CARRIER PERFORMANCE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
            <Truck size={14} className="text-ink" /> Carrier Performance
          </h3>
        </div>
        <div className="overflow-x-auto -mx-5 px-5 scrollbar-none">
          <table className="w-full text-left text-[11px] whitespace-nowrap">
            <thead>
              <tr className="text-muted border-b border-line">
                <th className="font-semibold pb-2 pr-4 bg-transparent px-0 border-0 normal-case tracking-normal">Carrier Partner</th>
                <th className="font-semibold pb-2 pr-4 bg-transparent px-0 border-0 normal-case tracking-normal">On-Time</th>
                <th className="font-semibold pb-2 pr-4 bg-transparent px-0 border-0 normal-case tracking-normal text-right">Active Shipments</th>
                <th className="font-semibold pb-2 bg-transparent px-0 border-0 normal-case tracking-normal text-right">Exceptions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {carrierPerformance.map(cp => (
                <tr key={cp.carrier} className="hover:bg-canvas transition-colors">
                  <td className="py-2 pr-4 text-ink font-medium px-0 border-0">{cp.carrier}</td>
                  <td className="py-2 pr-4 text-ink px-0 border-0">{cp.onTime}%</td>
                  <td className="py-2 pr-4 text-ink text-right px-0 border-0">{cp.activeShipments}</td>
                  <td className="py-2 text-ink text-right px-0 border-0">{cp.exceptions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COD & LOGISTICS FINANCIALS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
            <ExternalLink size={14} className="text-ink" /> COD & Logistics Financials
          </h3>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-muted">COD Awaiting Collection</span>
            <span className="font-medium text-ink">{formatCurrency(codFinancials.awaitingCollection)}</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-muted">COD Collected</span>
            <span className="font-medium text-ink">{formatCurrency(codFinancials.collected)}</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-muted">COD Remittance Pending</span>
            <span className="font-medium text-ink">{formatCurrency(codFinancials.remittancePending)}</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-muted">COD Variance</span>
            <span className="font-bold text-danger">{formatCurrencyExact(codFinancials.variance)}</span>
          </div>
          <div className="flex justify-between items-center text-[12px] pt-2 border-t border-line">
            <span className="text-muted">Carrier Charges Today</span>
            <span className="font-medium text-ink">{formatCurrencyExact(codFinancials.carrierChargesToday)}</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-muted">Delivery Liability Exposure</span>
            <span className="font-medium text-ink">{formatCurrencyExact(codFinancials.deliveryLiabilityExposure)}</span>
          </div>
        </div>
        <button className="w-full py-2 bg-primary-900 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
          View COD Reconciliation <ExternalLink size={14} />
        </button>
      </div>

    </div>
  );
}
