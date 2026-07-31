import React from "react";
import { Package, Truck, AlertCircle, Building2 } from "lucide-react";
import { LogisticsMetrics } from "@/types/logistics";

interface LogisticsMetricsRowProps {
  metrics: LogisticsMetrics;
}

export function LogisticsMetricsRow({ metrics }: LogisticsMetricsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl border border-line shadow-sm hover-lift">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary-100 text-primary-900 p-3 rounded-lg">
            <Package size={20} />
          </div>
        </div>
        <div>
          <span className="text-muted text-sm font-medium">Active Shipments</span>
          <h3 className="text-3xl font-bold text-ink mt-1">{metrics.activeShipments}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-line shadow-sm hover-lift">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-green-100 text-success p-3 rounded-lg">
            <Truck size={20} />
          </div>
        </div>
        <div>
          <span className="text-muted text-sm font-medium">Delivered Today</span>
          <h3 className="text-3xl font-bold text-ink mt-1">{metrics.deliveredToday}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-line shadow-sm hover-lift">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-red-100 text-danger p-3 rounded-lg">
            <AlertCircle size={20} />
          </div>
        </div>
        <div>
          <span className="text-muted text-sm font-medium">Exceptions / Delays</span>
          <h3 className="text-3xl font-bold text-danger mt-1">{metrics.exceptions}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-line shadow-sm hover-lift">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-yellow-100 text-warning p-3 rounded-lg">
            <Building2 size={20} />
          </div>
        </div>
        <div>
          <span className="text-muted text-sm font-medium">Active Partners</span>
          <h3 className="text-3xl font-bold text-ink mt-1">{metrics.activePartners}</h3>
        </div>
      </div>
    </div>
  );
}
