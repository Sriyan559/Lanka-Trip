"use client";

import React from "react";
import { CustomerDetailRecord } from "@/types/customer-detail";
import { ShieldCheck, UserCheck, ShoppingBag, DollarSign, Award, RotateCcw, MessageSquare, MapPin, Lock, ShieldAlert, HeartPulse, CheckCircle2 } from "lucide-react";

interface CustomerDetailKpisProps {
  profile: CustomerDetailRecord;
}

export function CustomerDetailKpis({ profile }: CustomerDetailKpisProps) {
  const kpis = [
    {
      id: "profile-completeness",
      label: "Profile Completeness",
      value: `${profile.profileCompleteness}%`,
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "verification-readiness",
      label: "Verification Readiness",
      value: `${profile.verificationReadiness}%`,
      icon: ShieldCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "total-orders",
      label: "Total Orders",
      value: profile.totalOrders.toString(),
      icon: ShoppingBag,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "lifetime-value",
      label: "Lifetime Value",
      value: `LKR ${(profile.lifetimeValue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
    {
      id: "avg-order-value",
      label: "Average Order Value",
      value: `LKR ${(profile.avgOrderValue / 1000).toFixed(1)}K`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "loyalty-points",
      label: "Loyalty Points",
      value: profile.loyaltyPoints.toLocaleString(),
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "return-rate",
      label: "Return Rate",
      value: `${profile.returnRate}%`,
      icon: RotateCcw,
      color: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      id: "open-cases",
      label: "Open Cases",
      value: profile.openCasesCount.toString(),
      icon: MessageSquare,
      color: profile.openCasesCount > 0 ? "text-amber-700" : "text-emerald-600",
      bgColor: profile.openCasesCount > 0 ? "bg-amber-50" : "bg-emerald-50",
    },
    {
      id: "active-addresses",
      label: "Active Addresses",
      value: profile.activeAddressesCount.toString(),
      icon: MapPin,
      color: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      id: "consent-coverage",
      label: "Consent Coverage",
      value: `${profile.consentCoverage}%`,
      icon: Lock,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "risk-score",
      label: "Risk Score",
      value: `${profile.riskScore} / ${profile.riskLevel}`,
      icon: ShieldAlert,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
    {
      id: "customer-health",
      label: "Customer Health",
      value: `${profile.customerHealthScore} / 100`,
      icon: HeartPulse,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
      {kpis.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="bg-white border border-line rounded-lg p-3 shadow-2xs flex items-center gap-2.5"
          >
            <div className={`w-8 h-8 rounded-lg ${kpi.bgColor} flex items-center justify-center flex-shrink-0`}>
              <IconComponent className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9.5px] font-semibold text-slate-400 truncate block">
                {kpi.label}
              </span>
              <span className="text-[14px] font-black text-ink font-mono tracking-tight truncate">
                {kpi.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
