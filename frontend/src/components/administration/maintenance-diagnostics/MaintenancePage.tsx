'use client';

import React, { useState, useEffect } from 'react';
import { fetchMaintenanceData, createMaintenanceTask, runHealthChecks, reviewFailedJobs, clearRetryQueue } from '@/lib/administration/maintenance-diagnostics/maintenance.api';
import { MaintenanceDiagnosticsFullData, SystemJobRecord } from '@/lib/administration/maintenance-diagnostics/maintenance.types';
import { MAINTENANCE_TABS } from '@/lib/administration/maintenance-diagnostics/maintenance.constants';

import { MaintenanceHeader } from './MaintenanceHeader';
import { MaintenanceContextBar } from './MaintenanceContextBar';
import { MaintenanceKpiGrid } from './MaintenanceKpiGrid';
import { MaintenanceFilterBar } from './MaintenanceFilterBar';
import { MaintenanceRightRail } from './MaintenanceRightRail';
import { MaintenanceTabContent } from './tabs/MaintenanceTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function MaintenancePage() {
  const [data, setData] = useState<MaintenanceDiagnosticsFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [selectedJobItem, setSelectedJobItem] = useState<SystemJobRecord | null>(null);

  // Dialog States
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isRunHealthChecksOpen, setIsRunHealthChecksOpen] = useState(false);
  const [isReviewFailedJobsOpen, setIsReviewFailedJobsOpen] = useState(false);
  const [isClearRetryQueueOpen, setIsClearRetryQueueOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchMaintenanceData();
      setData(result);
      if (result.systemJobs && result.systemJobs.length > 0) {
        setSelectedJobItem(result.systemJobs[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCreateTask = async () => {
    await createMaintenanceTask('New Task', 'Performance');
    setIsCreateTaskOpen(false);
    alert('Maintenance task created successfully.');
  };

  const handleRunHealthChecks = async () => {
    await runHealthChecks();
    setIsRunHealthChecksOpen(false);
    alert('Health checks initiated.');
  };

  const handleReviewFailedJobs = async () => {
    await reviewFailedJobs();
    setIsReviewFailedJobsOpen(false);
    alert('Failed job review initiated.');
  };

  const handleClearRetryQueue = async () => {
    await clearRetryQueue();
    setIsClearRetryQueueOpen(false);
    alert('Retry queue cleared.');
  };

  const handleActionClick = (action: string) => {
    if (action === 'run_health_checks') setIsRunHealthChecksOpen(true);
    else if (action === 'restart_failed_jobs') setIsReviewFailedJobsOpen(true);
    else if (action === 'clear_retry_queue') setIsClearRetryQueueOpen(true);
    else if (action === 'review_readiness') setActiveTab('maintenance');
    else alert(`Action triggered: ${action}`);
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50/50">
        <div className="w-8 h-8 border-4 border-[#741d35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <MaintenanceHeader
          onCreateTask={() => setIsCreateTaskOpen(true)}
          onRunHealthChecks={() => setIsRunHealthChecksOpen(true)}
          onReviewFailedJobs={() => setIsReviewFailedJobsOpen(true)}
          onReviewQueueBacklog={() => setActiveTab('queues')}
          onExportRegistry={() => alert('Exporting operations registry...')}
        />

        <MaintenanceContextBar context={data.context} />

        <MaintenanceKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <MaintenanceFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {MAINTENANCE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 text-[11px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#741d35] text-[#741d35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border-b border-x border-gray-200 rounded-b p-3 shadow-2xs min-w-0">
              <MaintenanceTabContent
                activeTab={activeTab}
                data={data}
                selectedJobItem={selectedJobItem!}
                onSelectJobItem={setSelectedJobItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Rail Panel */}
          <div className="w-full lg:w-72 shrink-0">
            <MaintenanceRightRail
              onNavigateTab={setActiveTab}
              onActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isCreateTaskOpen}
        title="Create Maintenance Task"
        description="Define a new system maintenance task including service scope, maintenance type, pre-checks, and scheduling window."
        confirmLabel="Create Task"
        cancelLabel="Cancel"
        onConfirm={handleCreateTask}
        onCancel={() => setIsCreateTaskOpen(false)}
      />

      <ConfirmDialog
        isOpen={isRunHealthChecksOpen}
        title="Run Health Checks"
        description="Initiate a full platform health check across all registered services, databases, workers, and dependencies."
        confirmLabel="Run Health Checks"
        cancelLabel="Cancel"
        onConfirm={handleRunHealthChecks}
        onCancel={() => setIsRunHealthChecksOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReviewFailedJobsOpen}
        title="Review Failed Jobs"
        description="Audit all failed jobs from the last 24 hours and initiate targeted retry or escalation workflows."
        confirmLabel="Review Failed Jobs"
        cancelLabel="Cancel"
        onConfirm={handleReviewFailedJobs}
        onCancel={() => setIsReviewFailedJobsOpen(false)}
      />

      <ConfirmDialog
        isOpen={isClearRetryQueueOpen}
        title="Clear Retry Queue"
        description="Clear all pending retry jobs from the queue. Dead-letter jobs will be moved to the dead-letter registry."
        confirmLabel="Clear Retry Queue"
        cancelLabel="Cancel"
        onConfirm={handleClearRetryQueue}
        onCancel={() => setIsClearRetryQueueOpen(false)}
      />
    </div>
  );
}
export default MaintenancePage;
