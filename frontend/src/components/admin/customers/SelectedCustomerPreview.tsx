"use client";

import React, { useState } from "react";
import { CustomerRecord } from "@/types/customer";
import { ShieldCheck, Mail, Phone, MapPin, Smartphone, User, CheckCircle2, AlertTriangle } from "lucide-react";

interface SelectedCustomerPreviewProps {
  customer: CustomerRecord | null;
  showToast: (msg: string) => void;
}

export function SelectedCustomerPreview({
  customer,
  showToast,
}: SelectedCustomerPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!customer) return null;

  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px] flex flex-col justify-between h-full min-w-0">
      <div>
        {/* Title */}
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Selected Customer Preview
        </h4>

        {/* Customer Avatar & Header Card */}
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-lg mb-3">
          <div className="w-10 h-10 rounded-full bg-[#671021] text-white flex items-center justify-center text-[13px] font-black flex-shrink-0">
            {customer.avatarInitials}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-bold text-ink text-[12.5px] truncate">{customer.name}</span>
            <span className="text-[10px] text-slate-500 font-mono">Customer ID: {customer.id}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold text-[8.5px] border border-emerald-200">
                {customer.lifecycleSegment}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold text-[8.5px] border border-amber-200">
                {customer.loyaltyTier} Member
              </span>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-b border-line text-[10px] font-bold mb-3 pb-1">
          {["Overview", "Profile", "Verification", "Orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1 px-1.5 transition-colors ${
                activeTab === tab ? "text-[#671021] border-b-2 border-[#671021]" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Quick Summaries Grid */}
        <div className="grid grid-cols-2 gap-2 text-[9.5px] mb-3">
          <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-400 block font-medium">Returns & Disputes</span>
            <span className="font-bold text-slate-800 font-mono">{customer.returnsCount} returns</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-400 block font-medium">Loyalty & Rewards</span>
            <span className="font-bold text-purple-700 font-mono">{customer.loyaltyTier} Tier</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-400 block font-medium">Consent & Privacy</span>
            <span className="font-bold text-emerald-600 font-mono">{customer.consentStatus}</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-400 block font-medium">Risk & Restrictions</span>
            <span className="font-bold text-slate-800 font-mono">{customer.riskLevel} Risk</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-400 block font-medium">Support & Comms</span>
            <span className="font-bold text-slate-800 font-mono">{customer.openCasesCount} open cases</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-400 block font-medium">Activity</span>
            <span className="font-bold text-slate-800 font-mono">{customer.totalOrders} orders</span>
          </div>
        </div>

        {/* Contact Info List */}
        <div className="space-y-1.5 text-[10px] border-t border-line pt-2.5">
          <div className="flex items-center gap-2 text-slate-700">
            <Mail size={12} className="text-slate-400" />
            <span className="font-mono text-[10px] truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Phone size={12} className="text-slate-400" />
            <span className="font-mono text-[10px]">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin size={12} className="text-slate-400" />
            <span className="truncate">{customer.region}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Smartphone size={12} className="text-slate-400" />
            <span>{customer.preferredChannel}</span>
          </div>
        </div>

        {/* Detailed Attribute List */}
        <div className="space-y-1.5 text-[10px] border-t border-line pt-2.5 mt-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Verification Status</span>
            <span className="font-bold text-emerald-600">{customer.verificationStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Consent Status</span>
            <span className="font-bold text-emerald-600">{customer.consentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Risk Level</span>
            <span className="font-bold text-emerald-600">{customer.riskLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Restriction Status</span>
            <span className="font-bold text-slate-800">{customer.restrictionStatus}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-100 text-[9.5px]">
            <span className="text-slate-400">Last Activity</span>
            <span className="font-mono text-slate-600">{customer.lastActivity}</span>
          </div>
          <div className="flex justify-between text-[9.5px]">
            <span className="text-slate-400">Updated At</span>
            <span className="font-mono text-slate-600">{customer.updatedAt}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => showToast(`Opening audit history for customer ${customer.id}`)}
        className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block w-full"
      >
        Audit History &rarr;
      </button>
    </div>
  );
}
