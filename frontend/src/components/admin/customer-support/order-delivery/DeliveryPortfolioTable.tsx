"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MoreHorizontal, ChevronLeft, ChevronRight, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { DeliverySupportCase } from "./types";

interface DeliveryPortfolioTableProps {
  cases: DeliverySupportCase[];
  selectedId: string;
  onSelect: (c: DeliverySupportCase) => void;
}

export function DeliveryPortfolioTable({
  cases,
  selectedId,
  onSelect,
}: DeliveryPortfolioTableProps) {
  const getDeliveryStatusBadge = (status: string) => {
    switch (status) {
      case "Delayed":
        return "text-red-700 font-bold bg-red-50 border-red-200";
      case "Attempted Delivery":
        return "text-rose-700 font-bold bg-rose-50 border-rose-200";
      case "In Transit":
        return "text-blue-700 font-semibold bg-blue-50 border-blue-200";
      case "Label Created":
        return "text-slate-600 font-medium bg-slate-100 border-slate-200";
      default:
        return "text-slate-700 font-medium bg-slate-50 border-slate-200";
    }
  };

  const getSlaBadge = (sla: string) => {
    switch (sla) {
      case "Breached":
        return "text-red-900 bg-red-100 font-extrabold border-red-300";
      case "At Risk":
        return "text-rose-800 bg-rose-50 font-bold border-rose-200";
      default:
        return "text-emerald-700 bg-emerald-50 font-semibold border-emerald-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight">Order &amp; Delivery Support Portfolio</h3>
        <span className="text-[11px] text-slate-500 font-medium">346 total active cases</span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-100/80 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-3">Case Reference</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Issue Type</th>
              <th className="py-2 px-3">Order Source</th>
              <th className="py-2 px-3">Order Status</th>
              <th className="py-2 px-3">Fulfilment Status</th>
              <th className="py-2 px-3">Shipment Status</th>
              <th className="py-2 px-3">Shipment Source</th>
              <th className="py-2 px-3">Carrier</th>
              <th className="py-2 px-3">Delivery Status</th>
              <th className="py-2 px-3 text-center">Risk</th>
              <th className="py-2 px-3 text-center">SLA</th>
              <th className="py-2 px-3">Delivery</th>
              <th className="py-2 px-3">Assigned Agent</th>
              <th className="py-2 px-3">Assigned Team</th>
              <th className="py-2 px-3">Last Updated</th>
              <th className="py-2 px-3">Est. Resolution</th>
              <th className="py-2 px-3">Age</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={19} className="py-8 text-center text-xs text-slate-400 font-medium">
                  No delivery support cases found
                </td>
              </tr>
            ) : (
              cases.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-rose-50/70 border-l-4 border-l-[#800020] font-medium text-slate-900"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {/* Case Reference (Navigates to CS03) */}
                    <td className="py-2 px-3">
                      <Link
                        href={`/admin/customer-support/cases/${item.id}`}
                        className="font-mono text-blue-600 hover:underline font-bold inline-flex items-center gap-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{item.id}</span>
                        <ArrowUpRight size={10} />
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{item.customerName}</span>
                        {item.isVip && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 py-0.2 rounded border border-amber-300">
                            VIP
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Issue Type */}
                    <td className="py-2 px-3 font-semibold text-slate-800">{item.issueType}</td>

                    {/* Order Source */}
                    <td className="py-2 px-3 text-slate-600 font-mono text-[11px]">{item.orderSource}</td>

                    {/* Order Status */}
                    <td className="py-2 px-3 text-slate-800">{item.orderStatus}</td>

                    {/* Fulfilment Status */}
                    <td className="py-2 px-3">
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                        {item.fulfilmentStatus}
                      </span>
                    </td>

                    {/* Shipment Status */}
                    <td className="py-2 px-3 text-slate-700">{item.shipmentStatus}</td>

                    {/* Shipment Source */}
                    <td className="py-2 px-3">
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                        {item.shipmentSource}
                      </span>
                    </td>

                    {/* Carrier */}
                    <td className="py-2 px-3 font-medium text-blue-600">{item.carrier}</td>

                    {/* Delivery Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getDeliveryStatusBadge(item.deliveryStatus)}`}>
                        {item.deliveryStatus}
                      </span>
                    </td>

                    {/* Risk Icon */}
                    <td className="py-2 px-3 text-center">
                      {item.risk === "High" ? (
                        <AlertTriangle size={13} className="text-amber-500 mx-auto" />
                      ) : (
                        <CheckCircle size={13} className="text-emerald-500 mx-auto" />
                      )}
                    </td>

                    {/* SLA Icon */}
                    <td className="py-2 px-3 text-center">
                      {item.slaStatus === "At Risk" ? (
                        <Clock size={13} className="text-red-500 mx-auto" />
                      ) : (
                        <CheckCircle size={13} className="text-emerald-500 mx-auto" />
                      )}
                    </td>

                    {/* Delivery SLA State */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getSlaBadge(item.deliverySlaState)}`}>
                        {item.deliverySlaState}
                      </span>
                    </td>

                    {/* Assigned Agent */}
                    <td className="py-2 px-3 font-medium text-slate-800">{item.assignedAgent}</td>

                    {/* Assigned Team */}
                    <td className="py-2 px-3 text-slate-600">{item.assignedTeam}</td>

                    {/* Last Updated */}
                    <td className="py-2 px-3 text-slate-500">{item.lastUpdated}</td>

                    {/* Est. Resolution */}
                    <td className="py-2 px-3 font-mono text-slate-700 text-[11px]">{item.estimatedResolution}</td>

                    {/* Age */}
                    <td className="py-2 px-3 font-semibold text-slate-800">{item.age}</td>

                    {/* Actions */}
                    <td className="py-2 px-3 text-center">
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-2.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>Showing 1 to {cases.length} of 346 cases</div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>Rows per page</span>
            <select className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] text-slate-700">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-50">
              <ChevronLeft size={13} />
            </button>
            <span className="px-2 py-0.5 rounded bg-[#800020] text-white font-bold text-[10px]">1</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">2</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">3</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">4</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">5</span>
            <span className="text-slate-400 text-[10px]">...</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">8</span>
            <button className="p-1 rounded hover:bg-slate-200 text-slate-600">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
