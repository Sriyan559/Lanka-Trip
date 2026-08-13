'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  fetchSupportTeams,
  fetchAgentTiers,
  fetchAgentSkills,
  fetchShifts,
  fetchWorkforceForecast,
  fetchQueueForecast,
  fetchWorkforceAlerts,
  fetchAssignmentHistory,
} from '@/services/api/teamsPerformanceService';
import {
  SupportTeamItem,
  AgentTierSummary,
  AgentSkillItem,
  ShiftCoverageItem,
  WorkforceForecastItem,
  QueueForecastItem,
  WorkforceAlertItem,
  AssignmentHistoryItem,
  TeamsFilterParams,
} from '@/types/teamsPerformance';

import { TeamsPerformanceHeader } from '@/components/admin/customer-support/teams-performance/TeamsPerformanceHeader';
import { WorkforceContextBar } from '@/components/admin/customer-support/teams-performance/WorkforceContextBar';
import { WorkforceKpiCards } from '@/components/admin/customer-support/teams-performance/WorkforceKpiCards';
import { TeamsPerformanceTabs } from '@/components/admin/customer-support/teams-performance/TeamsPerformanceTabs';
import { WorkforceFilters } from '@/components/admin/customer-support/teams-performance/WorkforceFilters';
import { WorkforceStatusChips } from '@/components/admin/customer-support/teams-performance/WorkforceStatusChips';
import { SupportTeamPortfolioTable } from '@/components/admin/customer-support/teams-performance/SupportTeamPortfolioTable';
import { SelectedTeamSummaryCard } from '@/components/admin/customer-support/teams-performance/SelectedTeamSummaryCard';
import { AgentPortfolioTable } from '@/components/admin/customer-support/teams-performance/AgentPortfolioTable';
import { SelectedAgentHeader } from '@/components/admin/customer-support/teams-performance/SelectedAgentHeader';
import { AgentDetailWorkspace } from '@/components/admin/customer-support/teams-performance/AgentDetailWorkspace';
import { LowerForecastingExceptionsRow } from '@/components/admin/customer-support/teams-performance/LowerForecastingExceptionsRow';
import { RightOperationsRail } from '@/components/admin/customer-support/teams-performance/RightOperationsRail';
import {
  ConfigureTeamModal,
  RebalanceModal,
  StaffingGapsModal,
} from '@/components/admin/customer-support/teams-performance/TeamsPerformanceModals';

export default function TeamsPerformancePage() {
  const [activeTab, setActiveTab] = useState('teams-overview');
  const [teams, setTeams] = useState<SupportTeamItem[]>([]);
  const [tiers, setTiers] = useState<AgentTierSummary[]>([]);
  const [skills, setSkills] = useState<AgentSkillItem[]>([]);
  const [shifts, setShifts] = useState<ShiftCoverageItem[]>([]);
  const [forecasts, setForecasts] = useState<WorkforceForecastItem[]>([]);
  const [queueForecasts, setQueueForecasts] = useState<QueueForecastItem[]>([]);
  const [alerts, setAlerts] = useState<WorkforceAlertItem[]>([]);
  const [history, setHistory] = useState<AssignmentHistoryItem[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('1');

  // Filter state
  const [filters, setFilters] = useState<TeamsFilterParams>({
    brand: 'All',
    division: 'All',
    region: 'All',
    agentType: 'All',
    site: 'All',
    shift: 'All',
    channel: 'All',
    priority: 'All',
    skillRef: 'All',
    skillPerf: 'All',
    statusFilter: 'All',
  });

  // Modal controls
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [isRebalanceModalOpen, setIsRebalanceModalOpen] = useState(false);
  const [isStaffingGapsModalOpen, setIsStaffingGapsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const tData = await fetchSupportTeams(filters);
      setTeams(tData);

      const trData = await fetchAgentTiers();
      setTiers(trData);

      const skData = await fetchAgentSkills();
      setSkills(skData);

      const shData = await fetchShifts();
      setShifts(shData);

      const fData = await fetchWorkforceForecast();
      setForecasts(fData);

      const qfData = await fetchQueueForecast();
      setQueueForecasts(qfData);

      const aData = await fetchWorkforceAlerts();
      setAlerts(aData);

      const hData = await fetchAssignmentHistory();
      setHistory(hData);
    }
    loadData();
  }, [filters]);

  const handleFilterChange = (key: keyof TeamsFilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      brand: 'All',
      division: 'All',
      region: 'All',
      agentType: 'All',
      site: 'All',
      shift: 'All',
      channel: 'All',
      priority: 'All',
      skillRef: 'All',
      skillPerf: 'All',
      statusFilter: 'All',
    });
    toast.success('Filters reset to default view.');
  };

  const selectedTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];

  return (
    <div className="space-y-2.5 p-2 sm:p-3 w-full max-w-[1920px] mx-auto pb-16 font-sans text-slate-900 leading-normal">
      {/* 1. Page Header */}
      <TeamsPerformanceHeader
        onCreateTeam={() => setIsConfigureModalOpen(true)}
        onRebalanceWorkloads={() => setIsRebalanceModalOpen(true)}
        onReviewStaffingGaps={() => setIsStaffingGapsModalOpen(true)}
        onMoreActions={() => toast('Opening workforce management actions...')}
      />

      {/* 2. Workforce Context Bar */}
      <WorkforceContextBar />

      {/* 3. KPI Row */}
      <WorkforceKpiCards />

      {/* 4. Main Navigation Tabs */}
      <TeamsPerformanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filters Workspace */}
      <WorkforceFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onSaveView={() => toast.success('Current Teams filter saved!')}
        onRefresh={() => toast.success('Workforce data refreshed.')}
      />

      {/* 6. Status Chips */}
      <WorkforceStatusChips
        activeStatusFilter={filters.statusFilter}
        onSelectStatusFilter={(st) => handleFilterChange('statusFilter', st)}
      />

      {/* Main split layout: Left main workspace + Right operations rail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_250px] gap-2.5 items-start w-full">
        {/* Left main content column */}
        <div className="space-y-2.5 min-w-0">
          {/* 7. Support Team Portfolio Table */}
          <SupportTeamPortfolioTable
            teams={teams}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
          />

          {/* 8. Selected Team Summary Card & Agent Portfolio */}
          {selectedTeam && (
            <>
              <SelectedTeamSummaryCard team={selectedTeam} />
              <AgentPortfolioTable tiers={tiers} teamName={selectedTeam.name} />
            </>
          )}

          {/* 9. Selected Agent Header & Detail Workspace */}
          <SelectedAgentHeader
            agentName="Amaya Perera"
            role="Senior Agent"
            activeCases={14}
            weightedLoad={20.4}
            stdCapacity={18.0}
            utilisation={76}
          />
          <AgentDetailWorkspace skills={skills} shifts={shifts} />

          {/* 10. Lower Forecasting, Exceptions & History Row */}
          <LowerForecastingExceptionsRow
            forecasts={forecasts}
            queueForecasts={queueForecasts}
            alerts={alerts}
            history={history}
          />
        </div>

        {/* Right Operations Rail Column */}
        <div className="shrink-0 w-full">
          <RightOperationsRail
            onRebalanceWorkloads={() => setIsRebalanceModalOpen(true)}
            onReviewOverloaded={() => toast('Reviewing 6 overloaded agents...')}
            onReviewQueueCapacity={() => toast('Reviewing queue capacity...')}
            onReviewStaffingGaps={() => setIsStaffingGapsModalOpen(true)}
            onSkillGapRecs={() => toast('Generating skill gap recommendations...')}
            onReviewCoachingQueue={() => toast('Opening coaching queue...')}
            onRunForecast={() => toast('Running capacity forecast model...')}
            onOpenAudit={() => toast('Opening workforce audit log...')}
          />
        </div>
      </div>

      {/* Interactive Action Modals */}
      <ConfigureTeamModal isOpen={isConfigureModalOpen} onClose={() => setIsConfigureModalOpen(false)} />
      <RebalanceModal isOpen={isRebalanceModalOpen} onClose={() => setIsRebalanceModalOpen(false)} />
      <StaffingGapsModal isOpen={isStaffingGapsModalOpen} onClose={() => setIsStaffingGapsModalOpen(false)} />
    </div>
  );
}
