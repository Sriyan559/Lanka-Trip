"use client";

import React, { useState } from "react";
import { CustomerRecord } from "@/types/customer";
import { ArrowUpDown, MoreVertical, ShieldAlert, CheckCircle2, Clock } from "lucide-react";

interface CustomerDirectoryTableProps {
  records: CustomerRecord[];
  selectedCustomerId: string;
  onSelectCustomer: (customer: CustomerRecord) => void;
  selectedRowIds: string[];
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  showToast: (msg: string) => void;
}

export function CustomerDirectoryTable({
  records,
  selectedCustomerId,
  onSelectCustomer,
  selectedRowIds,
  onToggleSelectRow,
  onToggleSelectAll,
  showToast,
}: CustomerDirectoryTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const isAllSelected = records.length > 0 && selectedRowIds.length === records.length;

  const formatLKR = (val: number) => {
    return `LKR ${val.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white border border-line rounded-lg shadow-2xs flex flex-col w-full overflow-hidden">
      {/* Scrollable Table Container */}
      <div className="overflow-x-auto scrollbar-thin max-h-[560px] overflow-y-auto">
        <table className="w-full text-left border-collapse text-[11px] min-w-[2100px]">
          {/* Sticky Table Header */}
          <thead className="sticky top-0 bg-slate-50 border-b border-line z-20 text-[10.5px] font-bold text-slate-700 uppercase tracking-wider">
            <tr>
              <th className="p-2.5 w-10 min-w-[40px] text-center bg-slate-50 sticky left-0 z-30 shadow-xs border-r border-line/40">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300 text-[#671021] focus:ring-[#671021] cursor-pointer"
                />
              </th>
              <th className="px-3 py-2.5 font-bold min-w-[170px] sticky left-[40px] bg-slate-50 z-30 shadow-xs border-r border-line/40">
                <div className="flex items-center gap-1 cursor-pointer hover:text-ink">
                  <span>Customer</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="px-2.5 py-2.5 font-bold min-w-[110px]">Customer ID</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[90px]">Type</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[160px]">Email</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[125px]">Phone</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[140px]">Country / Region</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[110px]">Channel</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[125px]">Verification</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[115px]">Completeness</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[105px]">Segment</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[95px]">Loyalty</th>
              <th className="px-2.5 py-2.5 font-bold text-right min-w-[85px]">Orders</th>
              <th className="px-2.5 py-2.5 font-bold text-right min-w-[130px]">LTV (LKR)</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[105px]">Last Order</th>
              <th className="px-2.5 py-2.5 font-bold text-center min-w-[65px]">Returns</th>
              <th className="px-2.5 py-2.5 font-bold text-center min-w-[65px]">Cases</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[95px]">Consent</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[80px]">Risk</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[95px]">Restriction</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[100px]">Duplicate Risk</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[120px]">Owner</th>
              <th className="px-2.5 py-2.5 font-bold min-w-[135px]">Last Activity</th>
              <th className="px-2 py-2.5 text-center min-w-[55px] sticky right-0 bg-slate-50 z-30 shadow-xs border-l border-line/40">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-line text-slate-700 bg-white">
            {records.map((c) => {
              const isRowSelected = selectedCustomerId === c.id;
              const isChecked = selectedRowIds.includes(c.id);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCustomer(c)}
                  className={`transition-colors cursor-pointer text-[11px] ${
                    isRowSelected
                      ? "bg-amber-50/70 hover:bg-amber-50"
                      : isChecked
                      ? "bg-slate-50/80 hover:bg-slate-100/80"
                      : "hover:bg-slate-50/60"
                  }`}
                >
                  {/* Checkbox */}
                  <td
                    className="p-2.5 w-10 min-w-[40px] text-center sticky left-0 bg-white z-10 border-r border-line/40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleSelectRow(c.id)}
                      className="rounded border-slate-300 text-[#671021] focus:ring-[#671021] cursor-pointer"
                    />
                  </td>

                  {/* Customer Name + Avatar */}
                  <td className="px-3 py-2 min-w-[170px] sticky left-[40px] bg-white z-10 shadow-xs border-r border-line/40">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#671021] text-white flex items-center justify-center font-bold text-[9.5px] flex-shrink-0">
                        {c.avatarInitials}
                      </div>
                      <span className="font-bold text-[#671021] truncate max-w-[125px]" title={c.name}>
                        {c.name}
                      </span>
                    </div>
                  </td>

                  {/* Customer ID */}
                  <td className="px-2.5 py-2 min-w-[110px] font-mono text-slate-500 font-semibold">{c.id}</td>

                  {/* Type */}
                  <td className="px-2.5 py-2 min-w-[90px]">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                      {c.customerType}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-2.5 py-2 min-w-[160px] text-slate-600 font-mono text-[10.5px] truncate max-w-[150px]" title={c.email}>
                    {c.email}
                  </td>

                  {/* Phone */}
                  <td className="px-2.5 py-2 min-w-[125px] text-slate-600 font-mono text-[10.5px] whitespace-nowrap">{c.phone}</td>

                  {/* Region */}
                  <td className="px-2.5 py-2 min-w-[140px] text-slate-600 truncate max-w-[140px]" title={c.region}>
                    {c.region}
                  </td>

                  {/* Channel */}
                  <td className="px-2.5 py-2 min-w-[110px] text-slate-600">{c.preferredChannel}</td>

                  {/* Verification Status */}
                  <td className="px-2.5 py-2 min-w-[125px]">
                    {c.verificationStatus === "Verified" && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                    {c.verificationStatus === "Verification Pending" && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                    {c.verificationStatus === "Unverified" && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <span>Unverified</span>
                      </span>
                    )}
                    {(c.verificationStatus as string) === "Restricted" && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Restricted</span>
                      </span>
                    )}
                  </td>

                  {/* Profile Completeness */}
                  <td className="px-2.5 py-2 min-w-[115px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden flex-1">
                        <div
                          className={`h-full rounded-full ${
                            c.profileCompleteness >= 80
                              ? "bg-emerald-500"
                              : c.profileCompleteness >= 50
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${c.profileCompleteness}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-[10px] text-slate-700">{c.profileCompleteness}%</span>
                    </div>
                  </td>

                  {/* Lifecycle Segment */}
                  <td className="px-2.5 py-2 min-w-[105px] font-semibold text-slate-800">{c.lifecycleSegment}</td>

                  {/* Loyalty Tier */}
                  <td className="px-2.5 py-2 min-w-[95px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        c.loyaltyTier === "Platinum"
                          ? "bg-purple-100 text-purple-800 border border-purple-200"
                          : c.loyaltyTier === "Gold"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : c.loyaltyTier === "Silver"
                          ? "bg-slate-200 text-slate-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {c.loyaltyTier}
                    </span>
                  </td>

                  {/* Orders */}
                  <td className="px-2.5 py-2 min-w-[85px] text-right font-mono font-bold text-slate-800">{c.totalOrders}</td>

                  {/* Lifetime Value */}
                  <td className="px-2.5 py-2 min-w-[130px] text-right font-mono font-bold text-slate-800">
                    {formatLKR(c.lifetimeValue)}
                  </td>

                  {/* Last Order */}
                  <td className="px-2.5 py-2 min-w-[105px] text-slate-600 font-mono text-[10px] whitespace-nowrap">
                    {c.lastOrderDate}
                  </td>

                  {/* Returns */}
                  <td className="px-2.5 py-2 min-w-[65px] text-center font-mono text-slate-700">{c.returnsCount}</td>

                  {/* Open Cases */}
                  <td className="px-2.5 py-2 min-w-[65px] text-center">
                    <span
                      className={`font-mono font-bold ${
                        c.openCasesCount > 0 ? "text-rose-600" : "text-slate-400"
                      }`}
                    >
                      {c.openCasesCount}
                    </span>
                  </td>

                  {/* Consent Status */}
                  <td className="px-2.5 py-2 min-w-[95px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        c.consentStatus === "Consented"
                          ? "bg-emerald-50 text-emerald-700"
                          : c.consentStatus === "Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {c.consentStatus}
                    </span>
                  </td>

                  {/* Risk Level */}
                  <td className="px-2.5 py-2 min-w-[80px]">
                    <span
                      className={`font-bold ${
                        c.riskLevel === "High"
                          ? "text-rose-600"
                          : c.riskLevel === "Medium"
                          ? "text-amber-600"
                          : "text-slate-600"
                      }`}
                    >
                      {c.riskLevel}
                    </span>
                  </td>

                  {/* Restriction Status */}
                  <td className="px-2.5 py-2 min-w-[95px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        c.restrictionStatus === "Restricted"
                          ? "bg-rose-100 text-rose-800"
                          : "text-slate-500"
                      }`}
                    >
                      {c.restrictionStatus}
                    </span>
                  </td>

                  {/* Duplicate Risk */}
                  <td className="px-2.5 py-2 min-w-[100px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        c.duplicateRisk === "High"
                          ? "bg-rose-100 text-rose-800"
                          : c.duplicateRisk === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "text-slate-500"
                      }`}
                    >
                      {c.duplicateRisk || "Low"}
                    </span>
                  </td>

                  {/* Owner */}
                  <td className="px-2.5 py-2 min-w-[120px] text-slate-600 whitespace-nowrap">{c.owner}</td>

                  {/* Last Activity */}
                  <td className="px-2.5 py-2 min-w-[135px] text-slate-500 font-mono text-[10px] whitespace-nowrap">
                    {c.lastActivity}
                  </td>

                  {/* Row Actions Menu */}
                  <td
                    className="px-2 py-2 min-w-[55px] text-center sticky right-0 bg-white z-10 shadow-xs border-l border-line/40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === c.id ? null : c.id)}
                        className="p-1 rounded text-slate-400 hover:text-ink hover:bg-slate-100"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {activeMenuId === c.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-white border border-line rounded-lg shadow-lg py-1 z-40 text-[11.5px]">
                          <button
                            onClick={() => {
                              onSelectCustomer(c);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700"
                          >
                            View Preview
                          </button>
                          <button
                            onClick={() => {
                              showToast(`Navigating to profile for ${c.name}...`);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700"
                          >
                            Full Profile Details
                          </button>
                          <button
                            onClick={() => {
                              showToast(`Sending email to ${c.email}...`);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700"
                          >
                            Send Email
                          </button>
                          <div className="border-t border-line my-1" />
                          <button
                            onClick={() => {
                              showToast(`Verification requested for ${c.name}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-amber-600"
                          >
                            Request Verification
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer outside table horizontal scroll container */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-slate-600 rounded-b-lg">
        <div>
          Showing <span className="font-bold text-ink">1 to {records.length}</span> of 186,420 customers
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select className="h-7 px-1.5 bg-white border border-line rounded text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-[#671021]">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="h-7 px-2.5 rounded bg-white border border-line text-slate-600 hover:bg-slate-100 disabled:opacity-50">
              Prev
            </button>
            <button className="h-7 px-2.5 rounded bg-[#671021] text-white font-bold">1</button>
            <button className="h-7 px-2.5 rounded bg-white border border-line text-slate-600 hover:bg-slate-100">2</button>
            <button className="h-7 px-2.5 rounded bg-white border border-line text-slate-600 hover:bg-slate-100">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="h-7 px-2.5 rounded bg-white border border-line text-slate-600 hover:bg-slate-100">7,456</button>
            <button className="h-7 px-2.5 rounded bg-white border border-line text-slate-600 hover:bg-slate-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
