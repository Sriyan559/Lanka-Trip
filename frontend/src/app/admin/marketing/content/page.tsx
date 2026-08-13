"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { ContentLibraryItem } from "@/data/marketingContent.mock";
import { marketingOperationsService } from "@/services/marketingOperationsService";

import { ContentHeader } from "@/components/admin/marketing/content/ContentHeader";
import { ContentContextStrip, ContentKpiStrip } from "@/components/admin/marketing/content/ContentContextStrip";
import { ContentTabs } from "@/components/admin/marketing/content/ContentTabs";
import { ContentToolbar, ContentStatusStrip } from "@/components/admin/marketing/content/ContentToolbar";
import { ContentLibraryTable } from "@/components/admin/marketing/content/ContentLibraryTable";
import { SelectedContentSummary } from "@/components/admin/marketing/content/SelectedContentSummary";
import { ContentPreviewPanel, ContentDetailsPanel } from "@/components/admin/marketing/content/ContentPreviewPanel";
import {
  ContentVariantsPanel,
  ContentChannelReadinessPanel,
  ContentUsagePlacementPanel,
} from "@/components/admin/marketing/content/ContentVariantsPanel";
import {
  ContentLinkedCampaignsPanel,
  ContentLinkedJourneysPanel,
} from "@/components/admin/marketing/content/ContentLinkedCampaignsPanel";
import { ContentApprovalPanel, ContentRightsPanel } from "@/components/admin/marketing/content/ContentApprovalPanel";
import { ContentGovernancePanel, ContentExceptionsPanel } from "@/components/admin/marketing/content/ContentGovernancePanel";
import { ContentPerformancePanel, ContentVersionHistoryPanel } from "@/components/admin/marketing/content/ContentPerformancePanel";
import {
  ContentUsageImpactPanel,
  ContentRecentActivityPanel,
  ContentAuditPanel,
} from "@/components/admin/marketing/content/ContentUsageImpactPanel";
import { ContentRightRail } from "@/components/admin/marketing/content/ContentRightRail";

export default function MarketingContentPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Library");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ContentLibraryItem | null>(null);
  const [error,setError]=useState('');
  const handleCreate=async()=>{const name=window.prompt('Content name');if(!name)return;try{await marketingOperationsService.create('content',{name,type:'image'});await handleRefresh();}catch(e:any){setError(e?.message??'Unable to create content.');}};

  const handleRefresh=useCallback(async()=>{try{const next=await marketingOperationsService.content({search:searchFilter});setData(next);setSelectedRecord(current=>next.library.find((x:ContentLibraryItem)=>x.id===current?.id)??next.library[0]??null);setError('');}catch(e:any){setError(e?.message??'Unable to load content.');}},[searchFilter]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);
  if(!data)return <div className="min-h-screen bg-[#faf8f8] p-4 text-sm text-gray-600">{error||'Loading content…'}</div>;

  const filteredLibrary = data.library.filter((item: ContentLibraryItem) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.contentId.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.owner.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-3.5 text-gray-900 font-sans">
      {/* 2-Column Root Grid: Main Workspace + Right Operational Rail */}
      <div className="w-full flex flex-col lg:flex-row gap-3 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 flex flex-col gap-2 w-full">
          {/* 1. PAGE HEADER */}
          <ContentHeader onAddContent={handleCreate} />

          {/* 2. CONTENT CONTEXT STRIP */}
          <ContentContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. TOP KPI STRIP */}
          <ContentKpiStrip kpis={data.kpis} />

          {/* 4. WORKSPACE TABS */}
          <ContentTabs activeTab={activeTab} onTabChange={(t) => setActiveTab(t)} />

          {/* 5. SEARCH & FILTER TOOLBAR */}
          <ContentToolbar
            onSearchChange={(q) => setSearchFilter(q)}
            onResetFilters={() => setSearchFilter("")}
            onApplyFilters={handleRefresh}
          />

          {/* 6. STATUS / READINESS STRIP */}
          <ContentStatusStrip statusCounters={data.statusCounters} />

          {/* 7. CONTENT LIBRARY TABLE */}
          <ContentLibraryTable
            items={filteredLibrary}
            selectedContentId={selectedRecord?.contentId ?? ""}
            onSelectContent={(rec) => {setSelectedRecord(rec);void marketingOperationsService.contentDetail(rec.id).then(selectedContent=>setData((current:any)=>current?{...current,selectedContent}:current)).catch(()=>setError('Unable to load the selected content.'));}}
          />

          {/* 8. SELECTED CONTENT SUMMARY HEADER */}
          <SelectedContentSummary
            contentName={selectedRecord?.name ?? "No content selected"}
            contentId={selectedRecord?.contentId ?? "—"}
            status={selectedRecord?.status ?? "Draft"}
            approvalStatus={selectedRecord?.approvalStatus ?? "Not Submitted"}
            rightsState={selectedRecord?.rightsState ?? "Rights Valid"}
          />

          {/* 9. SELECTED CONTENT WORKSPACE — ROW 1 (PREVIEW, DETAILS, VARIANTS, READINESS, USAGE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1.5fr)] gap-2 items-stretch w-full min-w-0">
            <ContentPreviewPanel
              previewUrl={selectedRecord?.previewUrl ?? ""}
              title={selectedRecord?.name ?? "No content selected"}
            />
            <ContentDetailsPanel details={data.selectedContent.details} />
            <ContentVariantsPanel variants={data.selectedContent.variants} />
            <ContentChannelReadinessPanel
              channelReadiness={data.selectedContent.channelReadiness}
              overallPct={data.selectedContent.overallReadinessPct}
            />
            <ContentUsagePlacementPanel
              placements={data.selectedContent.usagePlacements}
            />
          </div>

          {/* 10. SELECTED CONTENT WORKSPACE — ROW 2 (LINKED CAMPAIGNS/JOURNEYS, APPROVAL, RIGHTS, GOVERNANCE, EXCEPTIONS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-2 items-stretch w-full min-w-0">
            <ContentLinkedCampaignsPanel
              campaigns={data.selectedContent.linkedCampaigns}
            />
            <ContentLinkedJourneysPanel
              journeys={data.selectedContent.linkedJourneys}
            />
            <ContentApprovalPanel
              steps={data.selectedContent.approvalFlow.steps}
              approvedBy={data.selectedContent.approvalFlow.approvedBy}
              approvedOn={data.selectedContent.approvalFlow.approvedOn}
              pendingQueue={data.selectedContent.approvalFlow.pendingQueue}
            />
            <ContentRightsPanel rights={data.selectedContent.rights} />
            <ContentGovernancePanel
              checks={data.selectedContent.governanceChecks}
              healthScore={data.selectedContent.governanceHealthScore}
            />
            <ContentExceptionsPanel
              exceptions={data.selectedContent.exceptions}
            />
          </div>

          {/* 11. SELECTED CONTENT WORKSPACE — ROW 3 (PERFORMANCE, VERSION HISTORY, USAGE IMPACT, ACTIVITY, AUDIT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 items-stretch w-full min-w-0">
            <ContentPerformancePanel
              performance={data.selectedContent.performance}
            />
            <ContentVersionHistoryPanel
              history={data.selectedContent.versionHistory}
            />
            <ContentUsageImpactPanel />
            <ContentRecentActivityPanel
              activity={data.selectedContent.recentActivity}
            />
            <ContentAuditPanel audit={data.selectedContent.audit} />
          </div>
        </main>

        {/* RIGHT OPERATIONAL RAIL (Attached beside main workspace on lg+) */}
        <aside className="w-full lg:w-[240px] shrink-0">
          <ContentRightRail data={data.rightRail} />
        </aside>
      </div>
    </div>
  );
}
