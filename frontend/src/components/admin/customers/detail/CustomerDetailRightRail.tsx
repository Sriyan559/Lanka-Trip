"use client";

import React from "react";
import { CustomerDetailFullData } from "@/types/customer-detail";
import { ShieldCheck, AlertCircle, Edit, MessageSquare, History, Lock, ShieldAlert } from "lucide-react";

interface CustomerDetailRightRailProps {
  data: CustomerDetailFullData;
  showToast: (msg: string) => void;
}

export function CustomerDetailRightRail({ data, showToast }: CustomerDetailRightRailProps) {
  const { profile, consentPrivacy, riskRestrictions, loyalty, supportComms, purchaseBehaviour, returnsDisputes } = data;

  const handleAction = (name: string) => {
    showToast(`Executed: ${name}`);
  };

  const healthMetrics = [
    { label: "Data Quality", val: 98 },
    { label: "Profile Health", val: 92 },
    { label: "Engagement", val: 88 },
    { label: "Service Quality", val: 94 },
    { label: "Risk Control", val: 87 },
  ];

  return (
    <div className="flex flex-col gap-3.5 text-[11px] w-full">
      {/* A. Customer Operations Health */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            A. Customer Operations Health
          </h4>
        </div>

        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100 mb-2.5">
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#059669"
                strokeWidth="4"
                strokeDasharray="113"
                strokeDashoffset="10"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">{profile.customerHealthScore}</span>
          </div>

          <div className="flex flex-col text-[10px]">
            <span className="font-bold text-slate-800 text-[11.5px]">{profile.customerHealthScore} / 100</span>
            <span className="text-slate-500 font-medium">Customer Operations Health Score</span>
          </div>
        </div>

        <div className="space-y-1 text-[9.5px]">
          {healthMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">{m.label}</span>
              <span className="font-mono font-bold text-slate-800">{m.val}%</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleAction("View Full Scorecard")}
          className="mt-2 pt-1.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block w-full cursor-pointer"
        >
          View Full Scorecard &rarr;
        </button>
      </div>

      {/* B. Current Customer State */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          B. Current Customer State
        </h4>
        <div className="flex flex-wrap gap-1.5 text-[9.5px] font-bold">
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200">
            Verified
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
            Gold Member
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Low Risk
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            No Restrictions
          </span>
        </div>
      </div>

      {/* C. Priority Customer Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          C. Priority Customer Alerts
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="p-1.5 bg-amber-50/70 border border-amber-200/60 rounded text-amber-900 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span>Verification renewal due in 148 days</span>
          </div>
          <div className="p-1.5 bg-amber-50/70 border border-amber-200/60 rounded text-amber-900 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span>Dormancy warning in 28 days</span>
          </div>
          <div className="p-1.5 bg-blue-50/70 border border-blue-200/60 rounded text-blue-900 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>1 privacy request pending (Portability)</span>
          </div>
          <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-700 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
            <span>High return count (4 in 12 months)</span>
          </div>
          <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-700 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
            <span>Profile update recommended</span>
          </div>
          <div className="p-1.5 bg-amber-50/70 border border-amber-200/60 rounded text-amber-900 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span>2 open support cases</span>
          </div>
        </div>
      </div>

      {/* D. Order & Value Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          D. Order & Value Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Total Orders</span>
            <span className="font-bold text-slate-800 font-mono">{purchaseBehaviour.totalOrders}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Spend (LKR)</span>
            <span className="font-bold text-slate-800 font-mono">245,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Average Order Value</span>
            <span className="font-bold text-slate-800 font-mono">LKR 10,208</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Repeat Purchase Rate</span>
            <span className="font-bold text-slate-800 font-mono">{purchaseBehaviour.repeatPurchaseRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Customer Since</span>
            <span className="font-mono text-slate-700">Oct 13, 2021</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Preferred Channel</span>
            <span className="font-bold text-slate-800">{profile.preferredChannel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Engagement Score</span>
            <span className="font-bold text-emerald-600 font-mono">88 / 100 (High)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Relationship Health</span>
            <span className="font-bold text-emerald-600 font-mono">91 / 100 (Excellent)</span>
          </div>
        </div>
      </div>

      {/* E. Loyalty Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          E. Loyalty Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Tier</span>
            <span className="font-bold text-amber-700">{loyalty.tier}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Points Balance</span>
            <span className="font-bold text-slate-800 font-mono">{loyalty.pointsBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Points Expiring (90 days)</span>
            <span className="font-mono text-slate-700">{loyalty.pointsExpiring90Days.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Next Tier Threshold</span>
            <span className="font-mono text-slate-700">{loyalty.nextTierPoints.toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      {/* F. Service & Dispute Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          F. Service & Dispute Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Open Cases</span>
            <span className="font-bold text-amber-700 font-mono">{supportComms.openCases}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Avg Response Time</span>
            <span className="font-mono text-slate-700">{supportComms.avgResponseTimeHours} hrs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Open Returns</span>
            <span className="font-bold text-slate-800 font-mono">{returnsDisputes.openReturns}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Active Disputes</span>
            <span className="font-bold text-slate-800 font-mono">{returnsDisputes.activeDisputes}</span>
          </div>
        </div>
      </div>

      {/* G. Privacy & Consent Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          G. Privacy & Consent Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Consented</span>
            <span className="font-bold text-emerald-600 font-mono">4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Pending</span>
            <span className="font-mono text-slate-700">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Revoked</span>
            <span className="font-mono text-slate-700">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Open Privacy Requests</span>
            <span className="font-bold text-blue-600 font-mono">{consentPrivacy.privacyRequests.portability}</span>
          </div>
        </div>
      </div>

      {/* H. Risk & Restrictions Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          H. Risk & Restrictions Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Risk Score</span>
            <span className="font-bold text-emerald-600 font-mono">{riskRestrictions.overallRiskScore} / Low</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Fraud Risk</span>
            <span className="font-bold text-emerald-600">{riskRestrictions.chargebackRisk}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Restriction State</span>
            <span className="font-bold text-slate-800">{riskRestrictions.activeRestrictions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Restrictions</span>
            <span className="font-mono text-slate-700">0</span>
          </div>
        </div>
      </div>

      {/* I. Final Customer Actions */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-1">
          I. Final Customer Actions
        </h4>
        <button
          onClick={() => handleAction("Edit Customer")}
          className="w-full py-1.5 bg-[#671021] text-white rounded text-[11px] font-bold hover:bg-[#520d1a] transition-colors cursor-pointer text-center"
        >
          Edit Customer
        </button>
        <button
          onClick={() => handleAction("Start Verification Review")}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
        >
          Start Verification Review
        </button>
        <button
          onClick={() => handleAction("Open Support Case")}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
        >
          Open Support Case
        </button>
        <button
          onClick={() => handleAction("Review Privacy Requests")}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
        >
          Review Privacy Requests
        </button>
        <button
          onClick={() => handleAction("View Customer Timeline")}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
        >
          View Customer Timeline
        </button>
      </div>
    </div>
  );
}
