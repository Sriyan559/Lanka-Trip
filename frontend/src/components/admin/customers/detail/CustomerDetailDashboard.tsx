"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { CustomerConcurrencyNotice } from "./CustomerConcurrencyNotice";
import { CustomerContextStrip } from "../CustomerContextStrip";
import { CustomerProfileHero } from "./CustomerProfileHero";
import { CustomerDetailTabs } from "./CustomerDetailTabs";
import { CustomerDetailKpis } from "./CustomerDetailKpis";
import { CustomerDetailRightRail } from "./CustomerDetailRightRail";
import {
  CustomerDetailHealthScorecard,
  CustomerLifecycleTimeline,
  CustomerRelationshipSummary,
  CustomerProfileCard,
  CustomerAddressesCard,
  CustomerSegmentsCard,
  CustomerIdentityCard,
  CustomerOrdersCard,
  CustomerReturnsCard,
  CustomerLoyaltyCard,
  CustomerConsentPrivacyCard,
  CustomerRiskRestrictionsCard,
  CustomerSupportCard,
  CustomerRelatedRecordsCard,
  CustomerRecordQualityCard,
  CustomerRecentActivityTable,
} from "./CustomerSectionCards";
import { CustomerLifecycleJourney } from "../CustomerLifecycleJourney";
import { customerApi } from "@/lib/api/customers";
import { CustomerDetailFullData } from "@/types/customer-detail";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface CustomerDetailDashboardProps {
  customerId: string;
}

export function CustomerDetailDashboard({ customerId }: CustomerDetailDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<CustomerDetailFullData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await customerApi.getCustomerDetail(customerId);
      setData(res);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [customerId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    showToast("Refreshing customer detail data...");
    await loadData();
    setIsRefreshing(false);
    showToast("Customer detail data updated.");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="h-10 bg-slate-200 rounded w-full" />
        <div className="h-40 bg-slate-200 rounded w-full" />
        <div className="h-12 bg-slate-200 rounded w-full" />
        <div className="grid grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-slate-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-lg font-bold text-ink mb-1">Failed to load customer record</h2>
        <p className="text-sm text-slate-500 mb-4">An unexpected error occurred while fetching details for {customerId}.</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-[#671021] text-white font-bold text-xs rounded shadow-2xs hover:bg-[#520d1a]"
        >
          Retry
        </button>
      </div>
    );
  }

  // Customer Not Found state
  if (!data || !data.profile) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-3" />
        <h2 className="text-lg font-bold text-ink mb-1">Customer Not Found</h2>
        <p className="text-sm text-slate-500 font-mono mb-4">Requested ID: {customerId}</p>
        <Link
          href="/admin/customers/directory"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#671021] text-white font-bold text-xs rounded shadow-2xs hover:bg-[#520d1a]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customer Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 p-3.5 sm:p-5 max-w-[1920px] mx-auto min-w-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <CustomerDetailHeader customerId={customerId} showToast={showToast} />

      {/* Concurrency Notice Banner */}
      <CustomerConcurrencyNotice
        updatedBy={data.profile.concurrencyNotice?.updatedBy}
        updatedAgo={data.profile.concurrencyNotice?.updatedAgo}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Context Strip */}
      <CustomerContextStrip onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* Customer Profile Hero Card */}
      <CustomerProfileHero profile={data.profile} />

      {/* Detail Tabs */}
      <CustomerDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 12 KPI Metrics Grid */}
      <CustomerDetailKpis profile={data.profile} />

      {/* Main 2-Column Dashboard Grid (Left ~75% + Right ~25% Summary Rail) */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Left Column (Main Content - 3 cols span on XL) */}
        <div className="xl:col-span-3 space-y-4 min-w-0">
          {/* Row 1: Health Scorecard, Lifecycle Timeline, Relationship Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <CustomerDetailHealthScorecard data={data} />
            <CustomerLifecycleTimeline data={data} />
            <CustomerRelationshipSummary data={data} />
          </div>

          {/* Row 2: Customer Profile, Addresses & Contacts, Customer Segments, Identity & Verification */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <CustomerProfileCard data={data} showToast={showToast} />
            <CustomerAddressesCard data={data} showToast={showToast} />
            <CustomerSegmentsCard data={data} showToast={showToast} />
            <CustomerIdentityCard data={data} showToast={showToast} />
          </div>

          {/* Row 3: Orders & Purchase Behaviour, Returns, Refunds & Disputes, Loyalty, Rewards & Membership */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <CustomerOrdersCard data={data} showToast={showToast} />
            <CustomerReturnsCard data={data} showToast={showToast} />
            <CustomerLoyaltyCard data={data} showToast={showToast} />
          </div>

          {/* Row 4: Consent & Privacy, Customer Risk & Restrictions, Support & Communications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <CustomerConsentPrivacyCard data={data} showToast={showToast} />
            <CustomerRiskRestrictionsCard data={data} showToast={showToast} />
            <CustomerSupportCard data={data} showToast={showToast} />
          </div>

          {/* Row 5: Related Records, Customer Record Quality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <CustomerRelatedRecordsCard data={data} showToast={showToast} />
            <CustomerRecordQualityCard data={data} showToast={showToast} />
          </div>

          {/* Row 6: Recent Customer Activity Table */}
          <CustomerRecentActivityTable data={data} />

          {/* Row 7: Customer Lifecycle Journey (14 nodes) */}
          <CustomerLifecycleJourney nodes={data.lifecycleNodes} />
        </div>

        {/* Right Summary Rail Column (1 col span on XL) */}
        <div className="xl:col-span-1 min-w-0">
          <CustomerDetailRightRail data={data} showToast={showToast} />
        </div>
      </div>
    </div>
  );
}
