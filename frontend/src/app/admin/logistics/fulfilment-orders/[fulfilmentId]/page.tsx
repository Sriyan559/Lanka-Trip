"use client";

import React, { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Modular LG03 Fulfilment Order Detail Components
import { StaleRecordWarning } from "@/components/admin/logistics/fulfilment/detail/StaleRecordWarning";
import { FulfilmentDetailHeader } from "@/components/admin/logistics/fulfilment/detail/FulfilmentDetailHeader";
import { FulfilmentDetailContextBar } from "@/components/admin/logistics/fulfilment/detail/FulfilmentDetailContextBar";
import { FulfilmentRecordActionBar } from "@/components/admin/logistics/fulfilment/detail/FulfilmentRecordActionBar";
import { FulfilmentDetailKpis } from "@/components/admin/logistics/fulfilment/detail/FulfilmentDetailKpis";
import { FulfilmentIdentitySection } from "@/components/admin/logistics/fulfilment/detail/FulfilmentIdentitySection";
import { FulfilmentDetailLifecycle } from "@/components/admin/logistics/fulfilment/detail/FulfilmentDetailLifecycle";
import { FulfilmentDetailTabs } from "@/components/admin/logistics/fulfilment/detail/FulfilmentDetailTabs";
import { FulfilmentItemLinesTable } from "@/components/admin/logistics/fulfilment/detail/FulfilmentItemLinesTable";
import { QualityChecksPanel } from "@/components/admin/logistics/fulfilment/detail/QualityChecksPanel";
import { FulfilmentMiddleWorkspaces } from "@/components/admin/logistics/fulfilment/detail/FulfilmentMiddleWorkspaces";
import { FulfilmentBottomPanels } from "@/components/admin/logistics/fulfilment/detail/FulfilmentBottomPanels";
import { FulfilmentRecordHealthSidebar } from "@/components/admin/logistics/fulfilment/detail/FulfilmentRecordHealthSidebar";

function FulfilmentDetailContent() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.fulfilmentId;
  const fulfilmentId = Array.isArray(rawId) ? rawId[0] : rawId || "FUL-2026-0008921";

  const [activeTab, setActiveTab] = useState("Overview");
  const [notification, setNotification] = useState<string | null>(null);
  const [isPackingComplete, setIsPackingComplete] = useState(false);
  const [isQualityPassed, setIsQualityPassed] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAction = (actionName: string) => {
    if (actionName === "Complete Packing") {
      setIsPackingComplete(true);
      showToast("Packing completed for fulfilment order!");
    } else if (actionName === "Submit Quality Review") {
      setIsQualityPassed(true);
      showToast("Quality review submitted!");
    } else {
      showToast(`Action "${actionName}" executed.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. STALE / CONCURRENT UPDATE WARNING BANNER */}
          <StaleRecordWarning onRefresh={() => showToast("Record data refreshed from server.")} />

          {/* 2. BREADCRUMB, HEADING & HEADER ACTIONS */}
          <FulfilmentDetailHeader fulfilmentId={fulfilmentId} />

          {/* 3. BUSINESS CONTEXT & SERVICE/RECORD HEALTH STRIP */}
          <FulfilmentDetailContextBar onRefresh={() => showToast("Refreshed service health.")} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 4. PRIMARY RECORD ACTION BAR */}
          <FulfilmentRecordActionBar
            isPackingComplete={isPackingComplete}
            isQualityPassed={isQualityPassed}
            onAction={handleAction}
          />

          {/* 5. DETAIL KPI ROW (12 CARDS) */}
          <FulfilmentDetailKpis />

          {/* 6. FULFILMENT IDENTITY SECTION (6 BOXES) */}
          <FulfilmentIdentitySection fulfilmentId={fulfilmentId} />

          {/* 7. CUSTOMER FULFILMENT / LOGISTICS LIFECYCLE (16 STAGES) */}
          <FulfilmentDetailLifecycle />

          {/* 8. DETAIL NAVIGATION TABS (17 TABS) */}
          <FulfilmentDetailTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 9. MAIN DATA PANELS GRID: ITEM LINES TABLE & QUALITY CHECKS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            <div className="lg:col-span-2 xl:col-span-3">
              <FulfilmentItemLinesTable />
            </div>
            <div>
              <QualityChecksPanel />
            </div>
          </div>

          {/* 10. SECONDARY WORKSPACES: ALLOCATION, PICKING, PACKING */}
          <FulfilmentMiddleWorkspaces />

          {/* 11. BOTTOM OPERATIONAL PANELS (7 SECTIONS IN 1 ROW) */}
          <FulfilmentBottomPanels />
        </main>

        {/* 12. DEDICATED RIGHT-SIDE FULFILMENT RECORD HEALTH SIDEBAR */}
        <FulfilmentRecordHealthSidebar
          fulfilmentId={fulfilmentId}
          onRefresh={() => showToast("Refreshed record health.")}
        />
      </div>
    </div>
  );
}

export default function FulfilmentDetailPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Fulfilment Order Detail...</div>}>
      <FulfilmentDetailContent />
    </Suspense>
  );
}
