'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  fetchQaEvaluations,
  fetchTeamQuality,
  fetchScorecardCategories,
  fetchCriticalDefects,
  fetchLowCsatCases,
  fetchQualityDefects,
  fetchServiceInitiatives,
  fetchScorecardVersions,
} from '@/services/api/satisfactionQaService';
import {
  QaEvaluationItem,
  TeamQualityItem,
  ScorecardCategoryItem,
  CriticalDefectItem,
  LowCsatCaseItem,
  QualityDefectItem,
  ServiceInitiativeItem,
  ScorecardVersionItem,
  SatisfactionQaFilterParams,
} from '@/types/satisfactionQa';

import { SatisfactionQaHeader } from '@/components/admin/customer-support/satisfaction-qa/SatisfactionQaHeader';
import { QaContextBar } from '@/components/admin/customer-support/satisfaction-qa/QaContextBar';
import { QaKpiCards } from '@/components/admin/customer-support/satisfaction-qa/QaKpiCards';
import { ServiceExcellenceTabs } from '@/components/admin/customer-support/satisfaction-qa/ServiceExcellenceTabs';
import { QaFiltersWorkspace } from '@/components/admin/customer-support/satisfaction-qa/QaFiltersWorkspace';
import { QaReadinessStrip } from '@/components/admin/customer-support/satisfaction-qa/QaReadinessStrip';
import { PerformanceSectionRow } from '@/components/admin/customer-support/satisfaction-qa/PerformanceSectionRow';
import { EvaluationsScorecardRow } from '@/components/admin/customer-support/satisfaction-qa/EvaluationsScorecardRow';
import { SatisfactionDriversRow } from '@/components/admin/customer-support/satisfaction-qa/SatisfactionDriversRow';
import { DefectsGovernanceRow } from '@/components/admin/customer-support/satisfaction-qa/DefectsGovernanceRow';
import { RightOperationsRail } from '@/components/admin/customer-support/satisfaction-qa/RightOperationsRail';
import {
  CreateEvaluationModal,
  RunCalibrationModal,
  CreateCoachingActionModal,
  CreateKnowledgeGapModal,
} from '@/components/admin/customer-support/satisfaction-qa/SatisfactionQaModals';

export default function SatisfactionQaPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [evaluations, setEvaluations] = useState<QaEvaluationItem[]>([]);
  const [teams, setTeams] = useState<TeamQualityItem[]>([]);
  const [categories, setCategories] = useState<ScorecardCategoryItem[]>([]);
  const [defects, setDefects] = useState<CriticalDefectItem[]>([]);
  const [lowCsatCases, setLowCsatCases] = useState<LowCsatCaseItem[]>([]);
  const [qualityDefects, setQualityDefects] = useState<QualityDefectItem[]>([]);
  const [initiatives, setInitiatives] = useState<ServiceInitiativeItem[]>([]);
  const [versions, setVersions] = useState<ScorecardVersionItem[]>([]);

  const [selectedTeamId, setSelectedTeamId] = useState<string>('1');
  const [selectedEvalId, setSelectedEvalId] = useState<string>('1');

  // Filter state
  const [filters, setFilters] = useState<SatisfactionQaFilterParams>({
    team: 'All',
    agent: 'All',
    queue: 'All',
    channel: 'All',
    category: 'All',
    qaStatus: 'All',
    severity: 'All',
    csatBand: 'All',
    effort: 'All',
    readinessFilter: 'All',
  });

  // Modal controls
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isCalibrationModalOpen, setIsCalibrationModalOpen] = useState(false);
  const [isCoachingModalOpen, setIsCoachingModalOpen] = useState(false);
  const [isKnowledgeGapModalOpen, setIsKnowledgeGapModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const evData = await fetchQaEvaluations(filters);
      setEvaluations(evData);

      const tData = await fetchTeamQuality();
      setTeams(tData);

      const cData = await fetchScorecardCategories();
      setCategories(cData);

      const dData = await fetchCriticalDefects();
      setDefects(dData);

      const lcData = await fetchLowCsatCases();
      setLowCsatCases(lcData);

      const qdData = await fetchQualityDefects();
      setQualityDefects(qdData);

      const iData = await fetchServiceInitiatives();
      setInitiatives(iData);

      const vData = await fetchScorecardVersions();
      setVersions(vData);
    }
    loadData();
  }, [filters]);

  const handleFilterChange = (key: keyof SatisfactionQaFilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      team: 'All',
      agent: 'All',
      queue: 'All',
      channel: 'All',
      category: 'All',
      qaStatus: 'All',
      severity: 'All',
      csatBand: 'All',
      effort: 'All',
      readinessFilter: 'All',
    });
    toast.success('Filters reset to default view.');
  };

  return (
    <div className="space-y-2.5 p-2 sm:p-3 w-full max-w-[1920px] mx-auto pb-16 font-sans text-slate-900 leading-normal">
      {/* 1. Page Header */}
      <SatisfactionQaHeader
        onReviewLowCsat={() => toast('Reviewing 38 Low-CSAT cases...')}
        onReviewExceptions={() => toast('Reviewing QA exceptions...')}
        onRunCalibration={() => setIsCalibrationModalOpen(true)}
        onCreateEvaluation={() => setIsEvaluationModalOpen(true)}
        onMoreActions={() => toast('Opening QA management actions...')}
      />

      {/* 2. QA Context Bar */}
      <QaContextBar />

      {/* 3. KPI Row */}
      <QaKpiCards />

      {/* 4. Main Navigation Tabs */}
      <ServiceExcellenceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filters Workspace */}
      <QaFiltersWorkspace
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onSaveView={() => toast.success('Current QA filter saved!')}
        onRefresh={() => toast.success('Satisfaction & QA data refreshed.')}
      />

      {/* 6. Readiness / Status Strip */}
      <QaReadinessStrip
        activeReadinessFilter={filters.readinessFilter}
        onSelectReadinessFilter={(rf) => handleFilterChange('readinessFilter', rf)}
      />

      {/* Main split layout: Left main workspace + Right operations rail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_250px] gap-2.5 items-start w-full">
        {/* Left main content column */}
        <div className="space-y-2.5 min-w-0">
          {/* 7. Performance Section Row (Sections A, B, C) */}
          <PerformanceSectionRow
            teams={teams}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
          />

          {/* 8. Evaluations & Scorecard Row (Sections D, E, F, G) */}
          <EvaluationsScorecardRow
            evaluations={evaluations}
            selectedEvalId={selectedEvalId}
            onSelectEval={setSelectedEvalId}
            categories={categories}
            defects={defects}
            onOpenCase={(cId) => toast(`Opening case ${cId} in CS03 Case Detail`)}
            onOpenConversation={() => toast('Opening conversation in CS05 Omnichannel')}
            onInviteEvidence={() => toast('Opening evidence invitation modal...')}
          />

          {/* 9. Satisfaction & Drivers Row (Sections H, I, J, K, L) */}
          <SatisfactionDriversRow
            lowCsatCases={lowCsatCases}
            onOpenCase={(cId) => toast(`Opening Low-CSAT case ${cId} in CS03 Case Detail`)}
          />

          {/* 10. Defects & Governance Row (Sections M through X) */}
          <DefectsGovernanceRow
            defects={qualityDefects}
            initiatives={initiatives}
            versions={versions}
            onCreateCoachingAction={() => setIsCoachingModalOpen(true)}
            onCreateKnowledgeGap={() => setIsKnowledgeGapModalOpen(true)}
          />
        </div>

        {/* Right Operations Rail Column */}
        <div className="shrink-0 w-full">
          <RightOperationsRail
            onCreateEvaluation={() => setIsEvaluationModalOpen(true)}
            onReviewLowCsat={() => toast('Reviewing 38 Low-CSAT cases...')}
            onReviewExceptions={() => toast('Reviewing QA exceptions...')}
            onReviewCriticalDefects={() => toast('Reviewing 7 critical defects...')}
            onRunCalibration={() => setIsCalibrationModalOpen(true)}
            onReviewAppeals={() => toast('Reviewing 8 QA appeals...')}
            onReviewCorrectiveActions={() => toast('Reviewing 12 corrective actions...')}
            onOpenAudit={() => toast('Opening Satisfaction & QA Audit log...')}
          />
        </div>
      </div>

      {/* Interactive Action Modals */}
      <CreateEvaluationModal isOpen={isEvaluationModalOpen} onClose={() => setIsEvaluationModalOpen(false)} />
      <RunCalibrationModal isOpen={isCalibrationModalOpen} onClose={() => setIsCalibrationModalOpen(false)} />
      <CreateCoachingActionModal isOpen={isCoachingModalOpen} onClose={() => setIsCoachingModalOpen(false)} />
      <CreateKnowledgeGapModal isOpen={isKnowledgeGapModalOpen} onClose={() => setIsKnowledgeGapModalOpen(false)} />
    </div>
  );
}
