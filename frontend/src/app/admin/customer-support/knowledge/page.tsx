'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  fetchKnowledgeItems,
  fetchLinkedPolicies,
  fetchGroundingSources,
  fetchResponseTemplates,
  fetchKnowledgeGaps,
} from '@/services/api/knowledgeService';
import {
  KnowledgeItem,
  LinkedPolicy,
  GroundingSource,
  ResponseTemplateItem,
  KnowledgeGapItem,
  KnowledgeFilterParams,
} from '@/types/knowledge';

import { KnowledgeHeader } from '@/components/admin/customer-support/knowledge/KnowledgeHeader';
import { KnowledgeSourceContextBar } from '@/components/admin/customer-support/knowledge/KnowledgeSourceContextBar';
import { KnowledgeKpiCards } from '@/components/admin/customer-support/knowledge/KnowledgeKpiCards';
import { KnowledgeGovernanceTabs } from '@/components/admin/customer-support/knowledge/KnowledgeGovernanceTabs';
import { KnowledgeFilterWorkspace } from '@/components/admin/customer-support/knowledge/KnowledgeFilterWorkspace';
import { KnowledgeReadinessStrip } from '@/components/admin/customer-support/knowledge/KnowledgeReadinessStrip';
import { KnowledgeSearchTable } from '@/components/admin/customer-support/knowledge/KnowledgeSearchTable';
import { SelectedKnowledgeHeader } from '@/components/admin/customer-support/knowledge/SelectedKnowledgeHeader';
import { SelectedKnowledgeDetailRow } from '@/components/admin/customer-support/knowledge/SelectedKnowledgeDetailRow';
import { LowerAnalyticsGovernanceRow } from '@/components/admin/customer-support/knowledge/LowerAnalyticsGovernanceRow';
import { RightOperationsRail } from '@/components/admin/customer-support/knowledge/RightOperationsRail';
import {
  CreateArticleModal,
  CreatePlaybookModal,
  ViewBasisModal,
} from '@/components/admin/customer-support/knowledge/KnowledgeModals';

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState('search');
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [policies, setPolicies] = useState<LinkedPolicy[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [templates, setTemplates] = useState<ResponseTemplateItem[]>([]);
  const [gaps, setGaps] = useState<KnowledgeGapItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>('1');

  // Filter state
  const [filters, setFilters] = useState<KnowledgeFilterParams>({
    search: '',
    audience: 'All',
    contentType: 'All',
    language: 'All',
    relevance: '>= 80%',
    author: 'All',
    channel: 'All',
    productDivision: 'All',
    confidenceScore: 'All',
    policyLink: 'All',
    approvalStatus: 'All',
    agentSafe: 'All',
    contentClassification: 'All',
  });

  // Modal controls
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isPlaybookModalOpen, setIsPlaybookModalOpen] = useState(false);
  const [isBasisModalOpen, setIsBasisModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const kData = await fetchKnowledgeItems(filters);
      setItems(kData.data);

      const pData = await fetchLinkedPolicies();
      setPolicies(pData);

      const sData = await fetchGroundingSources();
      setSources(sData);

      const tData = await fetchResponseTemplates();
      setTemplates(tData);

      const gData = await fetchKnowledgeGaps();
      setGaps(gData);
    }
    loadData();
  }, [filters]);

  const handleFilterChange = (key: keyof KnowledgeFilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      search: '',
      audience: 'All',
      contentType: 'All',
      language: 'All',
      relevance: '>= 80%',
      author: 'All',
      channel: 'All',
      productDivision: 'All',
      confidenceScore: 'All',
      policyLink: 'All',
      approvalStatus: 'All',
      agentSafe: 'All',
      contentClassification: 'All',
    });
    toast.success('Filters reset to default view.');
  };

  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  return (
    <div className="space-y-2.5 p-2 sm:p-3 w-full max-w-[1920px] mx-auto pb-16 font-sans text-slate-900 leading-normal">
      {/* 1. Page Header */}
      <KnowledgeHeader
        onSourceKnowledgeAudit={() => toast('Executing Source Knowledge Audit...')}
        onCreateArticle={() => setIsArticleModalOpen(true)}
        onCreatePlaybook={() => setIsPlaybookModalOpen(true)}
        onMoreActions={() => toast('Opening knowledge management actions...')}
      />

      {/* 2. Source / Context Bar */}
      <KnowledgeSourceContextBar />

      {/* 3. KPI Row */}
      <KnowledgeKpiCards />

      {/* 4. Main Navigation Tabs */}
      <KnowledgeGovernanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Search + Filter Workspace */}
      <KnowledgeFilterWorkspace
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onSaveView={() => toast.success('Current Knowledge filter saved!')}
        onRefresh={() => toast.success('Knowledge base refreshed.')}
        onMoreFilters={() => toast('Opening advanced boolean filter panel...')}
      />

      {/* 6. Readiness / Status Strip */}
      <KnowledgeReadinessStrip />

      {/* Main split layout: Left main workspace + Right operations rail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_250px] gap-2.5 items-start w-full">
        {/* Left main content column */}
        <div className="space-y-2.5 min-w-0">
          {/* 7. Knowledge Search Results Table */}
          <KnowledgeSearchTable
            items={items}
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
            onViewItem={(item) => toast(`Viewing ${item.title}`)}
            onEditItem={(item) => toast(`Editing ${item.title}`)}
          />

          {/* 8. Selected Knowledge Item Header & Main Detail Row */}
          {selectedItem && (
            <>
              <SelectedKnowledgeHeader
                item={selectedItem}
                onViewFullArticle={() => toast(`Opening full article ${selectedItem.kbId}`)}
                onEdit={() => toast(`Editing article ${selectedItem.kbId}`)}
                onPreview={() => toast(`Previewing customer view for ${selectedItem.kbId}`)}
                onViewVersionHistory={() => toast(`Opening version history for ${selectedItem.kbId}`)}
              />
              <SelectedKnowledgeDetailRow
                item={selectedItem}
                policies={policies}
                sources={sources}
                templates={templates}
                gaps={gaps}
                onCopyReply={() => toast.success('Suggested reply copied to clipboard! (Explicit human action)')}
                onStartAction={() => toast.success('Recommended action started for linked case.')}
                onViewBasis={() => setIsBasisModalOpen(true)}
                onOpenPlaybook={() => toast('Opening Guided Resolution Playbook window...')}
              />
            </>
          )}

          {/* 9. Lower Analytics & Governance Row */}
          <LowerAnalyticsGovernanceRow />
        </div>

        {/* Right Operations Rail Column */}
        <div className="shrink-0 w-full">
          <RightOperationsRail
            onCreateArticle={() => setIsArticleModalOpen(true)}
            onCreatePlaybook={() => setIsPlaybookModalOpen(true)}
            onRunAudit={() => toast('Knowledge audit initiated...')}
            onReviewGaps={() => toast('Reviewing 27 knowledge gaps...')}
            onReviewConflicts={() => toast('Reviewing 9 policy conflicts...')}
            onBulkUpdate={() => toast('Opening bulk content updater...')}
            onExportReport={() => toast.success('Exporting Knowledge Report CSV...')}
          />
        </div>
      </div>

      {/* Interactive Action Modals */}
      <CreateArticleModal isOpen={isArticleModalOpen} onClose={() => setIsArticleModalOpen(false)} />
      <CreatePlaybookModal isOpen={isPlaybookModalOpen} onClose={() => setIsPlaybookModalOpen(false)} />
      <ViewBasisModal isOpen={isBasisModalOpen} onClose={() => setIsBasisModalOpen(false)} />
    </div>
  );
}
