import React from "react";
import { AlertTriangle, Clock, Truck, ShieldAlert, AlertCircle, Info, MoveRight } from "lucide-react";

export interface LogisticsSidebarsProps {
  operationsHealth?: {
    dispatch_sla_percentage?: number | null;
    delivery_success_rate?: number | null;
    averageDispatchTime?: string;
    onTimePickupRate?: number;
    onTimeDeliveryRate?: number;
    activeSlaBreaches?: number;
    carrierAssignmentBacklog?: number;
    deliveryExceptionBacklog?: number;
    unassignedHighRiskShipments?: number;
  };
  priorityAlerts?: any[];
  quickQueue?: any;
  carrierPerformance?: any[];
  codFinancials?: any;
}

export function LogisticsSidebars({
  operationsHealth,
  priorityAlerts = [],
  quickQueue = {},
  carrierPerformance = [],
}: LogisticsSidebarsProps) {
  const health = operationsHealth || {};

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
            <span className="text-muted flex items-center gap-2"><Clock size={14}/> Dispatch SLA Rate</span>
            <span className="font-semibold text-emerald-600">
              {health.dispatch_sla_percentage !== null && health.dispatch_sla_percentage !== undefined
                ? `${health.dispatch_sla_percentage}%`
                : "Not Assessed"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><Truck size={14}/> Delivery Success Rate</span>
            <span className="font-semibold text-emerald-600">
              {health.delivery_success_rate !== null && health.delivery_success_rate !== undefined
                ? `${health.delivery_success_rate}%`
                : "Not Assessed"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><AlertCircle size={14}/> Active SLA Breaches</span>
            <span className="font-bold text-rose-600">{health.activeSlaBreaches ?? 0}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><AlertCircle size={14}/> Carrier Assignment Backlog</span>
            <span className="font-bold text-amber-600">{quickQueue?.unassigned_carrier ?? 0}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><AlertCircle size={14}/> Delivery Exception Backlog</span>
            <span className="font-bold text-rose-600">{quickQueue?.delivery_failed ?? 0}</span>
          </div>
        </div>
      </div>

      {/* PRIORITY ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={14} className="text-rose-600" /> Priority Alerts
          </h3>
        </div>
        <div className="space-y-3">
          {priorityAlerts.length === 0 ? (
            <div className="text-[12px] text-muted py-2">No priority alerts present.</div>
          ) : (
            priorityAlerts.map((alert: any, idx: number) => (
              <div key={alert.id || idx} className="flex justify-between items-center border-l-[3px] pl-3 py-1 text-sm border-rose-600">
                <div>
                  <div className="font-semibold text-rose-600 text-[13px]">{alert.status?.replace("_", " ") || "Alert"}</div>
                  <div className="text-muted text-[11px]">{alert.shipment_number || alert.order_number || `Shipment #${alert.id}`}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* QUICK QUEUE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
            <MoveRight size={14} className="text-ink" /> Quick Queue
          </h3>
        </div>
        <div className="space-y-2 text-[12px]">
          <div className="flex justify-between items-center p-2 rounded bg-canvas">
            <span className="text-muted">Unassigned Carrier</span>
            <span className="font-bold text-ink">{quickQueue?.unassigned_carrier ?? 0}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-canvas">
            <span className="text-muted">Pending Dispatch</span>
            <span className="font-bold text-ink">{quickQueue?.pending_dispatch ?? 0}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-canvas">
            <span className="text-muted">Delivery Failed</span>
            <span className="font-bold text-rose-600">{quickQueue?.delivery_failed ?? 0}</span>
          </div>
        </div>
      </div>

      {/* CARRIER PERFORMANCE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">Carrier Distribution</h3>
        </div>
        <div className="space-y-3">
          {carrierPerformance.length === 0 ? (
            <div className="text-[12px] text-muted py-2">No carrier data available.</div>
          ) : (
            carrierPerformance.map((carrier: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-muted">{carrier.carrier || carrier.name || "Carrier"}</span>
                <span className="font-semibold text-ink">{carrier.count} shipments ({carrier.percentage}%)</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
