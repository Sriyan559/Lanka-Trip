"use client";

import React from "react";
import { DetailCard } from "../shared/DetailCard";
import { StatusBadge } from "../shared/StatusBadge";
import { ReturnCase } from "@/types/logistics/reverseLogistics";

interface ReturnDetailCardsGridProps {
  returnCase: ReturnCase;
}

export function ReturnDetailCardsGrid({ returnCase }: ReturnDetailCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-3">
      {/* SECTION 1: Return Identity */}
      <DetailCard title="1. Return Identity">
        <div className="text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Return Reference:</span>
            <span className="font-mono font-bold text-rose-700">{returnCase.returnRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Return Type:</span>
            <span className="font-bold text-gray-900">{returnCase.returnType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Return State:</span>
            <StatusBadge status={returnCase.shipmentStatus} size="sm" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Return Reason:</span>
            <span className="font-semibold text-gray-900">{returnCase.returnReason}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Priority:</span>
            <span className="font-semibold text-gray-800">{returnCase.priority || "Standard"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Owner:</span>
            <span className="font-bold text-gray-900">{returnCase.returnOwner}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Created:</span>
            <span className="text-gray-800">May 24, 2025 09:40 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approved:</span>
            <span className="text-gray-800">May 24, 2025 11:20 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Updated:</span>
            <span className="text-gray-800">{returnCase.updatedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Record Version:</span>
            <span className="font-mono font-bold text-gray-900">v2.6</span>
          </div>
        </div>
      </DetailCard>

      {/* SECTION 2: Eligibility & Approval */}
      <DetailCard title="2. Eligibility & Approval">
        <div className="text-[11px] space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Eligibility Status:</span>
            <StatusBadge status={returnCase.returnEligibility} variant="success" size="sm" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Policy Reference:</span>
            <span className="font-mono text-gray-900">{returnCase.policyRef || "RTN-BEAUTY-STD-004"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Return Window:</span>
            <span className="font-semibold text-gray-900">{returnCase.returnWindow || "14 days"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Days Since Delivery:</span>
            <span className="font-bold text-gray-900">{returnCase.daysSinceDelivery || 3}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Approval Status:</span>
            <StatusBadge status={returnCase.returnApproval} variant="success" size="sm" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approved By:</span>
            <span className="font-bold text-gray-900">{returnCase.approvedBy || "Elena Vance"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approval Expiry:</span>
            <span className="text-gray-800">{returnCase.approvalExpiry || "May 31, 2025"}</span>
          </div>
        </div>
      </DetailCard>

      {/* SECTION 3: Order / Fulfilment / Shipment */}
      <DetailCard title="3. Order / Fulfilment / Shipment">
        <div className="text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Reference:</span>
            <span className="font-mono font-bold text-gray-900">{returnCase.orderRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Fulfilment Reference:</span>
            <span className="font-mono text-gray-900">{returnCase.fulfilmentRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Original Shipment:</span>
            <span className="font-mono text-gray-900">{returnCase.originalShipment}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Original Tracking:</span>
            <span className="font-mono text-gray-900">{returnCase.originalTracking || "DX-992-11A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Order Value:</span>
            <span className="font-mono font-bold text-gray-900">LKR {(returnCase.orderValue || 31100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Payment Status:</span>
            <StatusBadge status={returnCase.paymentStatus || "Paid"} variant="success" size="sm" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Date:</span>
            <span className="text-gray-800">{returnCase.deliveryDate || "May 23, 2025"}</span>
          </div>
        </div>
      </DetailCard>

      {/* SECTION 4: Customer */}
      <DetailCard title="4. Customer">
        <div className="text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Customer:</span>
            <span className="font-bold text-gray-900">{returnCase.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Customer ID:</span>
            <span className="font-mono text-gray-900">{returnCase.customerId || "CUST-100231"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Segment:</span>
            <span className="font-semibold text-gray-900">{returnCase.customerSegment || "Premium Retail"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Contact State:</span>
            <StatusBadge status={returnCase.contactState || "Reachable"} variant="success" size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Collection Address:</span>
            <StatusBadge status="Verified" variant="success" size="sm" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Restrictions:</span>
            <span className="text-gray-800">None</span>
          </div>
        </div>
      </DetailCard>

      {/* SECTION 5: Product / Supplier */}
      <DetailCard title="5. Product / Supplier">
        <div className="text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Product:</span>
            <span className="font-bold text-gray-900">{returnCase.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">SKU:</span>
            <span className="font-mono text-gray-900">{returnCase.productSku}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Brand:</span>
            <span className="font-semibold text-gray-900">{returnCase.brand || "Nature Cosmetics"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Variant:</span>
            <span className="text-gray-800">{returnCase.variant || "Original"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Supplier / Seller:</span>
            <span className="font-bold text-gray-900">{returnCase.supplierName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Ordered Qty:</span>
            <span className="font-bold text-gray-900">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Returned Qty:</span>
            <span className="font-bold text-rose-700">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Unit Value:</span>
            <span className="font-mono font-bold text-gray-900">LKR {(returnCase.unitValue || 4800).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Batch / Lot:</span>
            <span className="font-mono text-gray-900">{returnCase.batchLot || "BAT-2305-A2"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expiry:</span>
            <span className="text-gray-800">{returnCase.expiryDate || "Jan 2027"}</span>
          </div>
        </div>
      </DetailCard>
    </div>
  );
}
