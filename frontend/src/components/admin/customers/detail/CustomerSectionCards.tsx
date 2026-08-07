"use client";

import React from "react";
import { CustomerDetailFullData } from "@/types/customer-detail";
import { CheckCircle2, AlertCircle, ExternalLink, MapPin, Mail, Phone, ShieldCheck, ShoppingBag, RotateCcw, Award, Lock, ShieldAlert, MessageSquare, Link as LinkIcon, FileText } from "lucide-react";

interface CardProps {
  data: CustomerDetailFullData;
  showToast: (msg: string) => void;
}

/* 1. Customer Health Scorecard */
export function CustomerDetailHealthScorecard({ data }: { data: CustomerDetailFullData }) {
  const { healthScores } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Customer Health Scorecard
      </h3>
      <div className="space-y-2 text-[10px]">
        {healthScores.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-0.5">
              <span className="text-slate-600 font-medium">{item.label}</span>
              <span className="font-mono font-bold text-slate-800">{item.value}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.value >= 85 ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Customer Lifecycle Timeline */
export function CustomerLifecycleTimeline({ data }: { data: CustomerDetailFullData }) {
  const { lifecycleMilestones } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Customer Lifecycle Timeline
      </h3>
      <div className="flex items-center justify-between relative py-2 overflow-x-auto scrollbar-thin">
        <div className="absolute top-[18px] left-4 right-4 h-0.5 bg-slate-200 z-0" />
        {lifecycleMilestones.map((ms, idx) => (
          <div key={ms.label} className="relative z-10 flex flex-col items-center text-center min-w-[70px]">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                ms.status === "completed"
                  ? "bg-emerald-500 text-white"
                  : ms.status === "current"
                  ? "bg-amber-500 text-white ring-4 ring-amber-100"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {idx + 1}
            </div>
            <span className="text-[9.5px] font-bold text-slate-800 mt-1.5 leading-tight">{ms.label}</span>
            <span className="text-[8.5px] text-slate-400 font-mono mt-0.5">{ms.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3. Customer Relationship Summary */
export function CustomerRelationshipSummary({ data }: { data: CustomerDetailFullData }) {
  const { profile, purchaseBehaviour } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Customer Relationship Summary
      </h3>
      <div className="space-y-1.5 text-[10px]">
        <div className="flex justify-between">
          <span className="text-slate-500">Total Orders</span>
          <span className="font-bold text-slate-800 font-mono">{profile.totalOrders}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Total Spend (LKR)</span>
          <span className="font-bold text-slate-800 font-mono">LKR 245K</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Average Number</span>
          <span className="font-bold text-slate-800 font-mono">LKR 10.2K</span>
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
          <span className="font-bold text-emerald-600 font-mono">88 / 100 <span className="text-[9px] bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">High</span></span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Relationship Health</span>
          <span className="font-bold text-emerald-600 font-mono">91 / 100 <span className="text-[9px] bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">Excellent</span></span>
        </div>
      </div>
    </div>
  );
}

/* 4. Customer Profile Card */
export function CustomerProfileCard({ data }: CardProps) {
  const { profile } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Customer Profile
      </h3>
      <div className="space-y-1.5 text-[10px]">
        <div className="flex justify-between">
          <span className="text-slate-500">Full Name</span>
          <span className="font-bold text-slate-800">{profile.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Date of Birth</span>
          <span className="font-mono text-slate-700">{profile.dob}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Gender</span>
          <span className="font-semibold text-slate-800">{profile.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Preferred Language</span>
          <span className="font-semibold text-slate-800">{profile.preferredLanguage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Email</span>
          <span className="font-mono text-[#671021] font-semibold truncate max-w-[150px]">{profile.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Phone</span>
          <span className="font-mono text-slate-700">{profile.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">National ID / Passport</span>
          <span className="font-mono text-slate-700">{profile.nationalId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Account Source</span>
          <span className="font-semibold text-slate-800">{profile.accountSource}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Profile Owner</span>
          <span className="font-bold text-slate-800">{profile.owner}</span>
        </div>
      </div>
    </div>
  );
}

/* 5. Addresses & Contacts */
export function CustomerAddressesCard({ data, showToast }: CardProps) {
  const { addresses } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Addresses & Contacts
          </h3>
          <button
            onClick={() => showToast("Opening All Customer Addresses...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-2 text-[10px]">
          {addresses.map((item) => (
            <div key={item.type} className="p-1.5 bg-slate-50 rounded border border-slate-100">
              <span className="font-bold text-slate-800 block text-[9.5px] mb-0.5">{item.type}</span>
              <span className="text-slate-600 block leading-tight">{item.address}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 6. Customer Segments */
export function CustomerSegmentsCard({ data }: CardProps) {
  const { segments } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Customer Segments
      </h3>
      <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
        {segments.map((seg) => (
          <span key={seg} className="px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
            ● {seg}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 7. Identity & Verification */
export function CustomerIdentityCard({ data }: CardProps) {
  const { identity } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Identity & Verification
      </h3>
      <div className="space-y-1.5 text-[10px]">
        <div className="flex justify-between">
          <span className="text-slate-500">KYC Status</span>
          <span className="font-bold text-emerald-600">{identity.kycStatus}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Document Type</span>
          <span className="font-semibold text-slate-800">{identity.documentType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Document Number</span>
          <span className="font-mono text-slate-700">{identity.documentNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Verified On</span>
          <span className="font-mono text-slate-700">{identity.verifiedOn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Expiry Date</span>
          <span className="font-mono text-slate-700">{identity.expiryDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Verification Source</span>
          <span className="font-semibold text-slate-800">{identity.verificationSource}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Address Match</span>
          <span className="font-bold text-emerald-600">{identity.addressMatch}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Risk Notes</span>
          <span className="text-slate-700 font-medium">{identity.riskNotes}</span>
        </div>
      </div>
    </div>
  );
}

/* 8. Orders & Purchase Behaviour */
export function CustomerOrdersCard({ data, showToast }: CardProps) {
  const { purchaseBehaviour } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Orders & Purchase Behaviour
          </h3>
          <button
            onClick={() => showToast("Opening All Orders...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View All Orders
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-[9.5px] mb-2.5">
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Total Orders</span>
            <span className="font-bold font-mono text-slate-800">{purchaseBehaviour.totalOrders}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Completed</span>
            <span className="font-bold font-mono text-emerald-700">{purchaseBehaviour.completed}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Cancelled</span>
            <span className="font-bold font-mono text-slate-700">{purchaseBehaviour.cancelled}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Failed Payments</span>
            <span className="font-bold font-mono text-slate-700">{purchaseBehaviour.failedPayments}</span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase border-b border-line">
              <tr>
                <th className="py-1 px-1.5">Order ID</th>
                <th className="py-1 px-1.5">Date</th>
                <th className="py-1 px-1.5 text-right">Amount</th>
                <th className="py-1 px-1.5">Status</th>
                <th className="py-1 px-1.5">Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/40 font-mono">
              {purchaseBehaviour.recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="py-1 px-1.5 text-[#671021] font-bold">{o.id}</td>
                  <td className="py-1 px-1.5 text-slate-600">{o.date}</td>
                  <td className="py-1 px-1.5 text-right text-slate-800">LKR {o.amount.toLocaleString()}</td>
                  <td className="py-1 px-1.5 text-emerald-600 font-bold">{o.status}</td>
                  <td className="py-1 px-1.5 text-slate-600 font-sans">{o.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 9. Returns, Refunds & Disputes */
export function CustomerReturnsCard({ data, showToast }: CardProps) {
  const { returnsDisputes } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Returns, Refunds & Disputes
          </h3>
          <button
            onClick={() => showToast("Opening All Returns...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View All Returns
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-[9.5px] mb-2.5">
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Open Returns</span>
            <span className="font-bold font-mono text-slate-800">{returnsDisputes.openReturns}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Completed</span>
            <span className="font-bold font-mono text-slate-800">{returnsDisputes.completedReturns}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Pending Refund</span>
            <span className="font-bold font-mono text-slate-800">{returnsDisputes.refundsPending}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Disputes</span>
            <span className="font-bold font-mono text-slate-800">{returnsDisputes.activeDisputes}</span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase border-b border-line">
              <tr>
                <th className="py-1 px-1.5">Return ID</th>
                <th className="py-1 px-1.5">Reason</th>
                <th className="py-1 px-1.5">Status</th>
                <th className="py-1 px-1.5 text-right">Amount</th>
                <th className="py-1 px-1.5">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/40 font-mono">
              {returnsDisputes.recentReturns.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-1 px-1.5 text-[#671021] font-bold">{r.id}</td>
                  <td className="py-1 px-1.5 text-slate-600 font-sans">{r.reason}</td>
                  <td className="py-1 px-1.5 text-emerald-600 font-bold">{r.status}</td>
                  <td className="py-1 px-1.5 text-right text-slate-800">LKR {r.amount.toLocaleString()}</td>
                  <td className="py-1 px-1.5 text-slate-600 font-sans">{r.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 10. Loyalty, Rewards & Membership */
export function CustomerLoyaltyCard({ data, showToast }: CardProps) {
  const { loyalty } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Loyalty, Rewards & Membership
          </h3>
          <button
            onClick={() => showToast("Opening Loyalty History...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View All Loyalty History
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-[9.5px] mb-2.5">
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Tier</span>
            <span className="font-bold text-amber-700">{loyalty.tier}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Balance</span>
            <span className="font-bold font-mono text-slate-800">{loyalty.pointsBalance.toLocaleString()}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Earned YTD</span>
            <span className="font-bold font-mono text-emerald-700">{loyalty.pointsEarnedYtd.toLocaleString()}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Redeemed YTD</span>
            <span className="font-bold font-mono text-purple-700">{loyalty.pointsRedeemedYtd.toLocaleString()}</span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase border-b border-line">
              <tr>
                <th className="py-1 px-1.5">Date</th>
                <th className="py-1 px-1.5">Type</th>
                <th className="py-1 px-1.5">Description</th>
                <th className="py-1 px-1.5 text-right">Points</th>
                <th className="py-1 px-1.5">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/40 font-mono">
              {loyalty.recentTransactions.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-1 px-1.5 text-slate-600">{t.date}</td>
                  <td className="py-1 px-1.5 font-bold text-slate-700">{t.type}</td>
                  <td className="py-1 px-1.5 text-slate-600 font-sans">{t.description}</td>
                  <td className={`py-1 px-1.5 text-right font-bold ${t.points > 0 ? "text-emerald-600" : "text-purple-600"}`}>
                    {t.points > 0 ? `+${t.points}` : t.points}
                  </td>
                  <td className="py-1 px-1.5 text-slate-500">{t.expiryDate || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 11. Consent & Privacy */
export function CustomerConsentPrivacyCard({ data, showToast }: CardProps) {
  const { consentPrivacy } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Consent & Privacy
          </h3>
          <button
            onClick={() => showToast("Opening Privacy Center...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View Privacy Center
          </button>
        </div>

        <div className="space-y-1.5 text-[10px] mb-3">
          <div className="flex justify-between">
            <span className="text-slate-500">Email Consent</span>
            <span className="font-bold text-emerald-600">● Consented</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">SMS Consent</span>
            <span className="font-bold text-emerald-600">● Consented</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Push Consent</span>
            <span className="font-bold text-emerald-600">● Consented</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Personalisation Consent</span>
            <span className="font-bold text-emerald-600">● Consented</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Data Processing Basis</span>
            <span className="font-semibold text-slate-800">{consentPrivacy.dataProcessingBasis}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Consent Source</span>
            <span className="font-semibold text-slate-800">{consentPrivacy.consentSource}</span>
          </div>
        </div>

        <div className="border-t border-line pt-2 text-[9.5px]">
          <span className="text-slate-400 font-mono uppercase block mb-1">Privacy Requests</span>
          <div className="grid grid-cols-4 gap-1 text-center font-mono">
            <div className="p-1 bg-slate-50 rounded">
              <span className="text-slate-400 block text-[8.5px]">Access</span>
              <span className="font-bold text-slate-800">0</span>
            </div>
            <div className="p-1 bg-slate-50 rounded">
              <span className="text-slate-400 block text-[8.5px]">Correction</span>
              <span className="font-bold text-slate-800">0</span>
            </div>
            <div className="p-1 bg-slate-50 rounded">
              <span className="text-slate-400 block text-[8.5px]">Deletion</span>
              <span className="font-bold text-slate-800">0</span>
            </div>
            <div className="p-1 bg-slate-50 rounded">
              <span className="text-slate-400 block text-[8.5px]">Portability</span>
              <span className="font-bold text-blue-600">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 12. Customer Risk & Restrictions */
export function CustomerRiskRestrictionsCard({ data, showToast }: CardProps) {
  const { riskRestrictions } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Customer Risk & Restrictions
          </h3>
          <button
            onClick={() => showToast("Opening Risk Assessment...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View Risk Assessment
          </button>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Overall Risk Score</span>
            <span className="font-bold text-emerald-600 font-mono">{riskRestrictions.overallRiskScore} / Low</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Chargeback Risk</span>
            <span className="font-bold text-emerald-600">{riskRestrictions.chargebackRisk}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Excessive Return Risk</span>
            <span className="font-bold text-emerald-600">{riskRestrictions.excessiveReturnRisk}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Duplicate Account Risk</span>
            <span className="font-bold text-emerald-600">{riskRestrictions.duplicateAccountRisk}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Active Restrictions</span>
            <span className="font-bold text-slate-800">{riskRestrictions.activeRestrictions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Risk Owner</span>
            <span className="font-bold text-slate-800">{riskRestrictions.riskOwner}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 13. Support & Communications */
export function CustomerSupportCard({ data, showToast }: CardProps) {
  const { supportComms } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Support & Communications
          </h3>
          <button
            onClick={() => showToast("Opening All Support Cases...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View All Cases
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-[9.5px] mb-2.5">
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Open Cases</span>
            <span className="font-bold font-mono text-amber-700">{supportComms.openCases}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Resolved (30D)</span>
            <span className="font-bold font-mono text-slate-800">{supportComms.resolvedCases30d}</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">Avg Response</span>
            <span className="font-bold font-mono text-slate-800">{supportComms.avgResponseTimeHours}h</span>
          </div>
          <div className="p-1 bg-slate-50 rounded text-center">
            <span className="text-slate-400 block">CSAT (30D)</span>
            <span className="font-bold font-mono text-emerald-700">{supportComms.csat30d} / 5</span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase border-b border-line">
              <tr>
                <th className="py-1 px-1.5">Case ID</th>
                <th className="py-1 px-1.5">Subject</th>
                <th className="py-1 px-1.5">Channel</th>
                <th className="py-1 px-1.5">Status</th>
                <th className="py-1 px-1.5">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/40 font-mono">
              {supportComms.recentInteractions.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-1 px-1.5 text-[#671021] font-bold">{c.id}</td>
                  <td className="py-1 px-1.5 text-slate-600 font-sans">{c.subject}</td>
                  <td className="py-1 px-1.5 text-slate-600 font-sans">{c.channel}</td>
                  <td className="py-1 px-1.5 text-amber-600 font-bold">{c.status}</td>
                  <td className="py-1 px-1.5 text-slate-500">{c.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 14. Related Records */
export function CustomerRelatedRecordsCard({ data, showToast }: CardProps) {
  const { relatedRecords } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
          Related Records
        </h3>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Household Account</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700">{relatedRecords.householdAccount}</span>
              <button onClick={() => showToast("View Household Account")} className="text-[9px] font-bold text-[#671021] hover:underline">View</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Loyalty Card</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700">{relatedRecords.loyaltyCard}</span>
              <button onClick={() => showToast("View Loyalty Card")} className="text-[9px] font-bold text-[#671021] hover:underline">View</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Marketplace Profile</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700 truncate max-w-[120px]">{relatedRecords.marketplaceProfile}</span>
              <button onClick={() => showToast("View Marketplace Profile")} className="text-[9px] font-bold text-[#671021] hover:underline">View</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Support Case IDs</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700">{relatedRecords.supportCaseSummary}</span>
              <button onClick={() => showToast("View Support Cases")} className="text-[9px] font-bold text-[#671021] hover:underline">View</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Last Order</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700">{relatedRecords.lastOrder}</span>
              <button onClick={() => showToast("View Last Order")} className="text-[9px] font-bold text-[#671021] hover:underline">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 15. Customer Record Quality */
export function CustomerRecordQualityCard({ data, showToast }: CardProps) {
  const { recordQuality } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Customer Record Quality
          </h3>
          <button
            onClick={() => showToast("Opening Data Quality Details...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View Data Quality Details
          </button>
        </div>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Duplicate Risk</span>
            <span className="font-bold text-emerald-600">{recordQuality.duplicateRisk}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Missing Fields</span>
            <span className="font-bold text-slate-800 font-mono">{recordQuality.missingFields}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Data Freshness</span>
            <span className="font-semibold text-slate-800">{recordQuality.dataFreshness}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Data Accuracy Score</span>
            <span className="font-bold text-emerald-600 font-mono">{recordQuality.dataAccuracyScore}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Audit Completeness</span>
            <span className="font-bold text-emerald-600 font-mono">{recordQuality.auditCompleteness}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 16. Recent Customer Activity Table */
export function CustomerRecentActivityTable({ data }: { data: CustomerDetailFullData }) {
  const { recentActivities } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs w-full overflow-hidden">
      <h3 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Recent Customer Activity
      </h3>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[11px] min-w-[700px]">
          <thead className="bg-slate-50 text-slate-500 font-mono text-[9.5px] uppercase border-b border-line">
            <tr>
              <th className="py-2 px-3 min-w-[150px]">Date & Time</th>
              <th className="py-2 px-3 min-w-[200px]">Activity</th>
              <th className="py-2 px-3 min-w-[120px]">Channel</th>
              <th className="py-2 px-3 min-w-[130px]">Performed By / System</th>
              <th className="py-2 px-3 text-right min-w-[90px]">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/40 text-slate-700 bg-white">
            {recentActivities.map((act) => (
              <tr key={act.id} className="hover:bg-slate-50">
                <td className="py-2 px-3 font-mono text-slate-500 text-[10px] whitespace-nowrap">{act.dateTime}</td>
                <td className="py-2 px-3 font-bold text-slate-800">{act.activity}</td>
                <td className="py-2 px-3 text-slate-600">{act.channel}</td>
                <td className="py-2 px-3 text-slate-600">{act.performedBy}</td>
                <td className="py-2 px-3 text-right font-mono font-bold text-emerald-600">{act.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
