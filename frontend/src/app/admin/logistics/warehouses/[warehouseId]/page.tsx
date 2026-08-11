"use client";

import React, { Suspense, useState } from "react";
import { useParams } from "next/navigation";

// LG05 Warehouse Detail Components
import { FacilityDetailHeader } from "@/components/admin/logistics/warehouse/detail/FacilityDetailHeader";
import { FacilityStaleWarning, FacilityActionBar } from "@/components/admin/logistics/warehouse/detail/FacilityStaleWarning";
import { FacilityContextStrip } from "@/components/admin/logistics/warehouse/detail/FacilityContextStrip";
import { FacilityIdentityHero } from "@/components/admin/logistics/warehouse/detail/FacilityIdentityHero";
import { FacilityDetailKpis } from "@/components/admin/logistics/warehouse/detail/FacilityDetailKpis";
import { FacilityDetailTabs } from "@/components/admin/logistics/warehouse/detail/FacilityDetailTabs";
import { FacilityOverviewWorkspace } from "@/components/admin/logistics/warehouse/detail/FacilityOverviewWorkspace";
import { FacilityLifecycleTimeline } from "@/components/admin/logistics/warehouse/detail/FacilityLifecycleTimeline";
import { FacilityAnalyticsRow } from "@/components/admin/logistics/warehouse/detail/FacilityAnalyticsRow";
import { FacilityOperationsSummaryGrid } from "@/components/admin/logistics/warehouse/detail/FacilityOperationsSummaryGrid";
import { FacilityBottomPanels } from "@/components/admin/logistics/warehouse/detail/FacilityBottomPanels";
import { FacilityIntelligenceSidebar } from "@/components/admin/logistics/warehouse/detail/FacilityIntelligenceSidebar";

function WarehouseDetailContent() {
  const params = useParams();
  const rawId = params?.warehouseId;
  const facilityId = Array.isArray(rawId) ? rawId[0] : rawId || "WH-CMB-01";

  const [activeTab, setActiveTab] = useState("Overview");
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. BREADCRUMB, HEADING & TOP ACTION TOOLBAR */}
          <FacilityDetailHeader facilityId={facilityId} />

          {/* 2. STALE RECORD WARNING BANNER */}
          <FacilityStaleWarning onRefresh={() => showToast("Refreshed facility record.")} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 3. FACILITY ACTION TOOLBAR */}
          <FacilityActionBar />

          {/* 4. BUSINESS CONTEXT & SERVICE HEALTH STRIP */}
          <FacilityContextStrip />

          {/* 5. FACILITY IDENTITY HERO PANEL */}
          <FacilityIdentityHero facilityId={facilityId} />

          {/* 6. PRIMARY FACILITY KPIS & SECONDARY ACCURACY STRIP */}
          <FacilityDetailKpis />

          {/* 7. DETAIL NAVIGATION TABS (24 TABS) */}
          <FacilityDetailTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 8. OVERVIEW WORKSPACE (IDENTITY, LINKED RECORDS, LIFECYCLE DATES) */}
          <FacilityOverviewWorkspace facilityId={facilityId} />

          {/* 9. FACILITY LIFECYCLE WORKFLOW TIMELINE */}
          <FacilityLifecycleTimeline />

          {/* 10. MAIN ANALYTICS (TREND, DONUT, SCORECARD, AREA TABLE, INVENTORY LOCATIONS) */}
          <FacilityAnalyticsRow />

          {/* 11. OPERATIONS SUMMARY GRID (8 CARDS) */}
          <FacilityOperationsSummaryGrid />

          {/* 12. BOTTOM OPERATIONAL PANELS */}
          <FacilityBottomPanels />
        </main>

        {/* 13. DEDICATED RIGHT-SIDE FACILITY INTELLIGENCE SIDEBAR */}
        <FacilityIntelligenceSidebar facilityId={facilityId} />
      </div>
    </div>
  );
}

export default function WarehouseDetailPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Warehouse / Fulfilment Centre Detail...</div>}>
      <WarehouseDetailContent />
    </Suspense>
  );
}
