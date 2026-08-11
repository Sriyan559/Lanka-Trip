"use client";

import React from "react";
import { DetailCard } from "../shared/DetailCard";
import { StatusBadge } from "../shared/StatusBadge";
import { ShipmentDetail } from "@/types/logistics/shipment";

interface ShipmentOverviewCardsProps {
  shipment: ShipmentDetail;
}

export function ShipmentOverviewCards({ shipment }: ShipmentOverviewCardsProps) {
  // A. Shipment Identity Fields
  const identityFields = [
    { label: "Shipment Reference", value: shipment.shipmentRef },
    { label: "Tracking Reference", value: shipment.trackingRef },
    { label: "Shipment Type", value: shipment.shipmentType },
    {
      label: "Shipment State",
      value: <StatusBadge status={shipment.shipmentState} variant="success" />,
    },
    {
      label: "Delivery State",
      value: <StatusBadge status={shipment.deliveryState} variant="info" />,
    },
    { label: "Priority", value: shipment.priority },
    { label: "Owner", value: shipment.owner },
    { label: "Created", value: shipment.created },
    { label: "Updated", value: shipment.updated },
    { label: "Record Version", value: shipment.recordVersion },
  ];

  // B. Fulfilment & Order Linkage Fields
  const fulfilmentFields = [
    { label: "Fulfilment Reference", value: shipment.fulfilmentRef },
    { label: "Order Reference", value: shipment.orderRef },
    { label: "Customer", value: shipment.customerName },
    { label: "Supplier", value: shipment.supplierName },
    { label: "Sales Channel", value: shipment.salesChannel },
    { label: "Order Value", value: shipment.orderValue },
    {
      label: "Payment Status",
      value: <StatusBadge status={shipment.paymentStatus} variant="success" />,
    },
  ];

  // C. Origin & Destination Fields
  const locationFields = [
    { label: "Origin Warehouse", value: shipment.originWarehouse },
    { label: "Facility", value: shipment.facility },
    { label: "District", value: shipment.originDistrict },
    { label: "Dispatch Dock", value: shipment.dispatchDock },
    { label: "Destination Region", value: shipment.destinationRegion },
    { label: "District", value: shipment.destinationDistrict },
    { label: "City", value: shipment.destinationCity },
    { label: "Delivery Zone", value: shipment.deliveryZone },
    {
      label: "Address Validation",
      value: <StatusBadge status={shipment.addressValidation} variant="success" />,
    },
  ];

  // D. Carrier & Service Fields
  const carrierFields = [
    { label: "Carrier", value: shipment.carrierName },
    { label: "Courier", value: shipment.courierName },
    { label: "Carrier Reference", value: shipment.carrierRef },
    { label: "Shipping Service", value: shipment.shippingService },
    { label: "Service Level", value: shipment.serviceLevel },
    { label: "Pickup Window", value: shipment.pickupWindow },
    { label: "Transit Target", value: shipment.transitTarget },
    { label: "Promised Delivery", value: shipment.promisedDelivery },
    { label: "Carrier SLA Score", value: `${shipment.carrierSlaScore}%` },
  ];

  return (
    <div className="space-y-2 mb-3">
      <div className="flex items-center justify-between border-b border-gray-200 pb-1">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Shipment Overview & Identity
        </h2>
        <span className="hidden">Shipment Overview</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <DetailCard title="Shipment Identity" fields={identityFields} />
        <DetailCard title="Fulfilment & Order Linkage" fields={fulfilmentFields} />
        <DetailCard title="Origin & Destination" fields={locationFields} />
        <DetailCard title="Carrier & Service" fields={carrierFields} />

        {/* E. Status Snapshot Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <div className="border-b border-gray-100 pb-2 mb-2">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
              Status Snapshot
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-start py-1">
            {shipment.statusBadges.map((badge, idx) => (
              <StatusBadge key={idx} status={badge} size="sm" />
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-500 font-medium space-y-1">
            <div className="flex justify-between">
              <span>Security Rule Context:</span>
              <span className="font-bold text-emerald-700">Trusted Server</span>
            </div>
            <div className="flex justify-between">
              <span>Tracking Normalization:</span>
              <span className="font-bold text-gray-800">Standardized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
