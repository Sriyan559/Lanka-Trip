'use client';

import React, { useState, useEffect } from 'react';
import { fetchCommunicationsData, createNotificationTemplate, registerProvider, createNotificationRule, reviewDeliveryFailures } from '@/lib/administration/communications/communications.api';
import { CommunicationsFullData, NotificationRuleRecord, NotificationTemplateRecord } from '@/lib/administration/communications/communications.types';
import { COMMUNICATIONS_TABS } from '@/lib/administration/communications/communications.constants';

import { CommunicationsHeader } from './CommunicationsHeader';
import { CommunicationsContextBar } from './CommunicationsContextBar';
import { CommunicationsKpiGrid } from './CommunicationsKpiGrid';
import { CommunicationsFilterBar } from './CommunicationsFilterBar';
import { CommunicationsRightRail } from './CommunicationsRightRail';
import { CommunicationsTabContent } from './tabs/CommunicationsTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function CommunicationsPage() {
  const [data, setData] = useState<CommunicationsFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const [selectedRuleItem, setSelectedRuleItem] = useState<NotificationRuleRecord | null>(null);
  const [selectedTemplateItem, setSelectedTemplateItem] = useState<NotificationTemplateRecord | null>(null);

  // Dialog States
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isRegisterProviderOpen, setIsRegisterProviderOpen] = useState(false);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [isReviewFailuresOpen, setIsReviewFailuresOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchCommunicationsData();
      setData(result);
      if (result.rules && result.rules.length > 0) {
        const defaultRule = result.rules.find(r => r.eventKey.includes('payment')) || result.rules[0];
        setSelectedRuleItem(defaultRule);
      }
      if (result.templates && result.templates.length > 0) {
        const defaultTemplate = result.templates.find(t => t.ref.includes('PAY')) || result.templates[0];
        setSelectedTemplateItem(defaultTemplate);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCreateTemplate = async () => {
    await createNotificationTemplate('New Template', 'Email');
    setIsCreateTemplateOpen(false);
    alert('Notification template created.');
  };

  const handleRegisterProvider = async () => {
    await registerProvider('New Provider', 'SMS');
    setIsRegisterProviderOpen(false);
    alert('Provider registered.');
  };

  const handleCreateRule = async () => {
    await createNotificationRule('order.created');
    setIsCreateRuleOpen(false);
    alert('Notification rule created.');
  };

  const handleReviewFailures = async () => {
    await reviewDeliveryFailures();
    setIsReviewFailuresOpen(false);
    alert('Delivery failures review initiated.');
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
        <CommunicationsHeader
          onCreateTemplate={() => setIsCreateTemplateOpen(true)}
          onRegisterProvider={() => setIsRegisterProviderOpen(true)}
          onCreateRule={() => setIsCreateRuleOpen(true)}
          onReviewFailures={() => setIsReviewFailuresOpen(true)}
          onExportRegistry={() => alert('Exporting communications registry...')}
        />

        <CommunicationsContextBar context={data.context} />

        <CommunicationsKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <CommunicationsFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {COMMUNICATIONS_TABS.map((tab) => (
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
              <CommunicationsTabContent
                activeTab={activeTab}
                data={data}
                selectedRuleItem={selectedRuleItem!}
                onSelectRuleItem={setSelectedRuleItem}
                selectedTemplateItem={selectedTemplateItem!}
                onSelectTemplateItem={setSelectedTemplateItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Rail Intelligence Area */}
          <div className="w-full lg:w-72 shrink-0">
            <CommunicationsRightRail
              onNavigateTab={setActiveTab}
              onActionClick={(action) => {
                if (action === 'create_template') setIsCreateTemplateOpen(true);
                else if (action === 'register_provider') setIsRegisterProviderOpen(true);
                else if (action === 'create_rule') setIsCreateRuleOpen(true);
                else if (action === 'review_failures' || action === 'review_provider_health') setIsReviewFailuresOpen(true);
                else alert(`Action triggered: ${action}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isCreateTemplateOpen}
        title="Create Notification Template"
        description="Draft a new notification template. This template will require owner approval and variable validation before activation."
        confirmLabel="Create Template"
        cancelLabel="Cancel"
        onConfirm={handleCreateTemplate}
        onCancel={() => setIsCreateTemplateOpen(false)}
      />

      <ConfirmDialog
        isOpen={isRegisterProviderOpen}
        title="Register Provider"
        description="Register a new external communication provider. This requires security verification and latency testing."
        confirmLabel="Register Provider"
        cancelLabel="Cancel"
        onConfirm={handleRegisterProvider}
        onCancel={() => setIsRegisterProviderOpen(false)}
      />

      <ConfirmDialog
        isOpen={isCreateRuleOpen}
        title="Create Notification Rule"
        description="Map an event key to primary/fallback communication channels and notification templates."
        confirmLabel="Create Rule"
        cancelLabel="Cancel"
        onConfirm={handleCreateRule}
        onCancel={() => setIsCreateRuleOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReviewFailuresOpen}
        title="Review Delivery Failures"
        description="Initiate an automated diagnostic scan across all degraded provider routes and retry queues."
        confirmLabel="Initiate Diagnostics"
        cancelLabel="Cancel"
        onConfirm={handleReviewFailures}
        onCancel={() => setIsReviewFailuresOpen(false)}
      />
    </div>
  );
}
export default CommunicationsPage;
