"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogisticsShipment } from "@/types/admin";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

interface ShipmentTableProps {
  shipments: LogisticsShipment[];
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  if (shipments.length === 0) {
    return <div className="p-8 text-center text-slate-500 bg-white rounded-lg border border-slate-200">No shipments match the current filters.</div>;
  }

  return (
    <div className="table-container-horizontal-scroll">
      <table className="enterprise-table-rich">
        <thead>
          <tr>
            <th className="sticky-col-left">Shipment</th>
            <th>Pickup</th>
            <th>Delivery</th>
            <th>Package</th>
            <th>COD</th>
            <th>Risk</th>
            <th>SLA</th>
            <th className="sticky-col-right text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className={shipment.isPriority ? "row-priority" : ""}>
              <td className="sticky-col-left">
                <div className="cell-primary">
                  {shipment.publicReference}
                  {shipment.flags?.map((flag: string) => (
                    <span key={flag} className="badge neutral small">{flag}</span>
                  ))}
                </div>
                <div className="cell-secondary">
                  Order: {shipment.orderReference} • {shipment.customerName}
                </div>
              </td>
              <td>
                <span className={`status-badge-rich ${
                  shipment.pickupStatus === 'Completed' ? 'success' : 
                  shipment.pickupStatus === 'Failed' ? 'danger' : 'neutral'
                }`}>
                  {shipment.pickupStatus}
                </span>
              </td>
              <td>
                <div className="cell-primary">{shipment.carrier}</div>
                <div className="cell-secondary mb-1">{shipment.destination}</div>
                <span className={`status-badge-rich ${
                  shipment.deliveryStatus === 'Completed' ? 'success' : 
                  shipment.deliveryStatus === 'Delayed' ? 'danger' : 
                  shipment.deliveryStatus === 'In Progress' ? 'warning' : 'neutral'
                }`}>
                  {shipment.deliveryStatus}
                </span>
              </td>
              <td>
                <span className={`status-badge-rich ${shipment.packageStatus === 'Damaged' ? 'danger' : 'neutral'}`}>
                  {shipment.packageStatus}
                </span>
              </td>
              <td>
                {shipment.codStatus === 'N/A' ? (
                  <span className="text-slate-400 text-sm">N/A</span>
                ) : (
                  <span className={`status-badge-rich ${shipment.codStatus === 'Collected' ? 'success' : 'warning'}`}>
                    {shipment.codStatus}
                  </span>
                )}
              </td>
              <td>
                <span className={`status-badge-rich ${
                  shipment.riskLevel === 'High' ? 'danger' : 
                  shipment.riskLevel === 'Medium' ? 'warning' : 'success'
                }`}>
                  {shipment.riskLevel}
                </span>
              </td>
              <td>
                <span className={`status-badge-rich ${
                  shipment.slaStatus === 'Breached' ? 'danger' : 
                  shipment.slaStatus === 'At Risk' ? 'warning' : 'success'
                }`}>
                  {shipment.slaStatus}
                </span>
              </td>
              <td className="sticky-col-right text-right">
                <div className="actions-cell justify-end relative-container">
                  <Link 
                    href={`/admin/logistics/shipments/${shipment.publicReference}`} 
                    className="button small primary"
                  >
                    Open Shipment
                  </Link>
                  <button 
                    type="button"
                    className="button small icon-only" 
                    onClick={() => toggleDropdown(shipment.id)}
                    aria-label={`More actions for ${shipment.publicReference}`}
                    aria-expanded={openDropdownId === shipment.id}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  
                  {openDropdownId === shipment.id && (
                    <div className="dropdown-menu-rich">
                      <Link
                        className="dropdown-item"
                        href={`/admin/marketplace/orders/${encodeURIComponent(shipment.orderReference)}`}
                      >
                        View Order <ExternalLink size={12} className="inline ml-1"/>
                      </Link>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => toast("Carrier portal access will be enabled with the logistics API.")}
                      >
                        Carrier Portal <ExternalLink size={12} className="inline ml-1"/>
                      </button>
                      <div className="dropdown-divider"></div>
                      <Link
                        className="dropdown-item danger"
                        href={`/admin/logistics/shipments/${encodeURIComponent(shipment.publicReference)}?action=exception`}
                      >
                        Report Issue
                      </Link>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
