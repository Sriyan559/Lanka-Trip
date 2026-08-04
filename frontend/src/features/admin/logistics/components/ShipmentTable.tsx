import React from "react";
import { Shipment } from "@/types/logistics";
import { useRouter } from "next/navigation";

interface ShipmentTableProps {
  shipments: Shipment[];
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pickup Scheduled":
      case "Scheduled":
      case "In Transit":
      case "Picked Up":
        return "text-blue-600 bg-blue-50";
      case "Delivered":
        return "text-success bg-green-50";
      case "Delivery Failed":
      case "Exception":
        return "text-danger bg-red-50";
      case "Pending Carrier Assignment":
      case "Not Dispatched":
      case "Not Scheduled":
        return "text-warning bg-yellow-50";
      default:
        return "text-muted bg-gray-100";
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "Pickup Scheduled":
      case "In Transit": return "border-l-blue-500";
      case "Delivery Failed": return "border-l-danger";
      case "Pending Carrier Assignment": return "border-l-warning";
      default: return "border-l-gray-300";
    }
  };

  const getSlaColor = (sla: string) => {
    if (sla === "Within Target") return "text-success";
    if (sla === "Breached") return "text-danger";
    if (sla === "6 Hours Remaining") return "text-blue-600";
    if (sla === "12 Hours Remaining") return "text-warning";
    return "text-muted";
  };

  const getRiskColor = (risk: string) => {
    if (risk === "Low") return "text-success";
    if (risk === "Medium") return "text-warning";
    if (risk === "High") return "text-danger";
    return "text-muted";
  };

  const getPackageStatusColor = (status: string) => {
    if (status === "Ready for Handover") return "text-success";
    if (status === "Sealed") return "text-blue-600";
    return "text-muted";
  };

  const getCodStatusColor = (status: string) => {
    if (status === "Pending Collection") return "text-warning";
    if (status === "Not Applicable") return "text-muted";
    return "text-ink";
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden">
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left text-[11px] whitespace-nowrap">
          <thead className="bg-canvas border-b border-line text-muted">
            <tr>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center min-w-[80px]">Shipment<br/>Reference</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Database<br/>Shipment ID</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Shipment<br/>Type</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Order or Return<br/>Reference</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Customer</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Supplier<br/>Fulfilment</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Supplier</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Packages</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Items</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Origin</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Destination</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Logistics<br/>Partner</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Tracking<br/>Number</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Shipment<br/>Status</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Pickup Status</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Delivery Status</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Package Status<br/>Handling Requirement</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">COD Status</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Risk<br/>Level</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">SLA Status</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Assigned<br/>Officer</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Pickup Date</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center">Expected<br/>Delivery</th>
              <th className="px-3 py-3 font-semibold uppercase tracking-wider text-center sticky right-0 bg-canvas z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50 transition-colors group">
                <td className={`px-3 py-3 text-center border-l-4 ${getBorderColor(shipment.status)}`}>
                  <div className="font-bold text-ink whitespace-pre-wrap leading-tight">
                    {shipment.reference.replace("-", "-\n")}
                  </div>
                </td>
                <td className="px-3 py-3 text-center font-medium text-ink">{shipment.databaseId}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-muted">{shipment.shipmentType.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center font-medium text-ink whitespace-pre-wrap leading-tight">{shipment.orderReference.replace("-", "-\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-ink">{shipment.customer.name.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-ink">{shipment.supplier.fulfilmentRef.replace("-", "-\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-ink">{shipment.supplier.name.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center font-medium">{shipment.packages}</td>
                <td className="px-3 py-3 text-center font-medium">{shipment.itemsCount}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-muted">{shipment.origin.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-muted">{shipment.destination.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight font-medium text-ink">{shipment.carrier.name.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center font-medium text-ink">{shipment.trackingNumber}</td>
                
                <td className="px-3 py-3 text-center">
                  <span className={`inline-block whitespace-pre-wrap leading-tight px-2 py-1 rounded font-bold text-[10px] ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace(" ", "\n")}
                  </span>
                </td>
                <td className="px-3 py-3 text-center font-semibold text-success whitespace-pre-wrap leading-tight">
                  {shipment.pickupStatus === "Not Scheduled" ? <span className="text-muted font-normal">Not<br/>Scheduled</span> : shipment.pickupStatus.replace(" ", "\n")}
                </td>
                <td className="px-3 py-3 text-center font-semibold whitespace-pre-wrap leading-tight">
                  {shipment.deliveryStatus === "Not Dispatched" ? <span className="text-muted font-normal">Not<br/>Dispatched</span> : 
                   shipment.deliveryStatus === "Delivery Failed" ? <span className="text-danger">Failed Attempt<br/><span className="text-[9px] font-normal text-muted">Exception:<br/>Customer unavailable</span></span> :
                   <span className="text-blue-600">{shipment.deliveryStatus}</span>}
                </td>
                <td className="px-3 py-3 text-center font-semibold whitespace-pre-wrap leading-tight">
                  <span className={getPackageStatusColor(shipment.packageStatus)}>{shipment.packageStatus.replace(" ", "\n")}</span>
                  {shipment.packageStatus === "Leak-Proof Packaging Required" && <div className="text-[9px] font-normal text-muted mt-1">Leak-Proof Packaging<br/>Required</div>}
                </td>
                <td className="px-3 py-3 text-center font-semibold whitespace-pre-wrap leading-tight">
                  <span className={getCodStatusColor(shipment.codStatus)}>{shipment.codStatus.replace(" ", "\n")}</span>
                </td>
                <td className="px-3 py-3 text-center font-bold">
                  <span className={getRiskColor(shipment.riskLevel)}>{shipment.riskLevel}</span>
                </td>
                <td className="px-3 py-3 text-center font-semibold whitespace-pre-wrap leading-tight">
                  <span className={getSlaColor(shipment.slaStatus)}>{shipment.slaStatus.replace(" ", "\n")}</span>
                </td>
                
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-ink font-medium">{shipment.assignedOfficer.replace(" ", "\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-muted">{shipment.pickupDate === "-" ? "-" : shipment.pickupDate.replace("—", "\n")}</td>
                <td className="px-3 py-3 text-center whitespace-pre-wrap leading-tight text-muted">{shipment.expectedDelivery.replace(", ", "\n")}</td>
                
                <td className="px-3 py-3 text-center sticky right-0 bg-white group-hover:bg-gray-50 z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] border-l border-line">
                  <button 
                    onClick={() => router.push(`/admin/logistics/shipments/${shipment.reference}`)}
                    className="bg-primary-900 text-white font-bold text-[10px] px-2 py-1.5 rounded hover:bg-primary-700 transition-colors uppercase whitespace-pre-wrap leading-tight"
                  >
                    Open<br/>Shipment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-line flex items-center justify-between text-[13px] text-muted bg-white">
        <div>Showing 1 to {shipments.length} of {shipments.length} shipments</div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-line bg-white hover:bg-canvas text-ink transition-colors">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary-900 text-white font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-line bg-white hover:bg-canvas text-ink transition-colors">&gt;</button>
          <select className="ml-4 pl-3 pr-8 py-1.5 bg-white border border-line rounded text-ink focus:outline-none appearance-none">
            <option>10 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
