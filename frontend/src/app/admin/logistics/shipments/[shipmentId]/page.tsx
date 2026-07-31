"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShipmentDetailViewModel } from "@/types/admin";
import { fetchShipmentDetail } from "@/services/api/logisticsService";
import { ShipmentDetailHeader } from "@/components/admin/logistics/ShipmentDetailHeader";
import { ShipmentLifecycle } from "@/components/admin/logistics/ShipmentLifecycle";
import { TrackingTimeline } from "@/components/admin/logistics/TrackingTimeline";
import { CarrierPanel } from "@/components/admin/logistics/CarrierPanel";
import { ShipmentDecisionPanel } from "@/components/admin/logistics/ShipmentDecisionPanel";
import toast from "react-hot-toast";
import "../../logistics.css";

const DETAIL_TABS = [
  "Overview", "Tracking", "Items", "Packages", 
  "Documents", "Exceptions", "Settlements", "Audits",
  "Communications", "Related Entities", "Performance", "History"
];

export default function ShipmentDetailPage() {
  const params = useParams();
  const shipmentId = params.shipmentId as string;
  
  const [data, setData] = useState<ShipmentDetailViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const detail = await fetchShipmentDetail(shipmentId);
        setData(detail);
      } catch {
        setError("Failed to load shipment detail");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [shipmentId]);

  const handleSuccess = (msg: string) => {
    toast.success(msg);
  };
  const handleError = (msg: string) => {
    toast.error(msg);
  };

  if (loading) {
    return (
      <div className="shipment-detail-page">
        <div className="p-8 text-center text-slate-500">Loading shipment {shipmentId}...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="shipment-detail-page">
        <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">
          {error || "Shipment not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="shipment-detail-page relative">
      <ShipmentDetailHeader 
        publicReference={data.shipment.publicReference}
        dbShipmentId={data.shipment.dbShipmentId || shipmentId}
      />

      <ShipmentLifecycle stages={data.lifecycle} />

      <div className="detail-workspace-grid">
        {/* Main Column */}
        <div className="detail-main-col">
          <div className="tabs-container">
            <div className="tabs-header">
              {DETAIL_TABS.map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="tab-content-area">
              {activeTab === "Overview" && (
                <div className="text-slate-600">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Shipment Overview</h3>
                  <p className="mb-2"><strong>Destination:</strong> {data.shipment.destination}</p>
                  <p className="mb-2"><strong>Customer:</strong> {data.shipment.customerName}</p>
                  <p className="mb-2"><strong>Flags:</strong> {data.shipment.flags?.join(", ") || "None"}</p>
                  <p>Additional shipment attributes will appear when the logistics API is connected.</p>
                </div>
              )}
              {activeTab === "Tracking" && (
                <div className="text-slate-600">
                  <p>Map-based tracking will appear when carrier telemetry is connected.</p>
                </div>
              )}
              {activeTab !== "Overview" && activeTab !== "Tracking" && (
                <div className="text-slate-500 italic">
                  No {activeTab.toLowerCase()} records are available for this mock shipment.
                </div>
              )}
            </div>
          </div>
          
          <TrackingTimeline events={data.tracking} />
        </div>

        {/* Side Column */}
        <div className="detail-side-col">
          <ShipmentDecisionPanel 
            shipmentId={shipmentId}
            capabilities={data.capabilities}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <CarrierPanel 
            related={data.related} 
            metrics={data.metrics} 
          />
        </div>
      </div>
    </div>
  );
}
