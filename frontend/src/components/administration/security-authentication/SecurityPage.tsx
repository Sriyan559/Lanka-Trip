'use client';

import React, { useState, useEffect } from 'react';
import { fetchSecurityData, createSecurityPolicy, registerAuthProvider, reviewHighRiskSessions } from '@/lib/administration/security-authentication/security-authentication.api';
import { SecurityFullData, AuthenticationPolicyRecord } from '@/lib/administration/security-authentication/security-authentication.types';
import { SECURITY_TABS } from '@/lib/administration/security-authentication/security-authentication.constants';

import { SecurityHeader } from './SecurityHeader';
import { SecurityContextBar } from './SecurityContextBar';
import { SecurityKpiGrid } from './SecurityKpiGrid';
import { SecurityFilterBar } from './SecurityFilterBar';
import { SecurityRightRail } from './SecurityRightRail';
import { SecurityTabContent } from './tabs/SecurityTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function SecurityPage() {
  const [data, setData] = useState<SecurityFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const [selectedPolicyItem, setSelectedPolicyItem] = useState<AuthenticationPolicyRecord | null>(null);

  // Modal Dialogs
  const [isCreatePolicyOpen, setIsCreatePolicyOpen] = useState(false);
  const [isRegisterProviderOpen, setIsRegisterProviderOpen] = useState(false);
  const [isReviewHighRiskOpen, setIsReviewHighRiskOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchSecurityData();
      setData(result);
      if (result.policies && result.policies.length > 0) {
        setSelectedPolicyItem(result.policies[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCreatePolicy = async () => {
    await createSecurityPolicy('New Security Policy', 'Access');
    setIsCreatePolicyOpen(false);
    alert('Security policy created.');
  };

  const handleRegisterProvider = async () => {
    await registerAuthProvider('New Provider', 'SAML 2.0');
    setIsRegisterProviderOpen(false);
    alert('Authentication provider registered.');
  };

  const handleReviewHighRiskSessions = async () => {
    await reviewHighRiskSessions();
    setIsReviewHighRiskOpen(false);
    alert('High-risk sessions review initiated.');
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
        <SecurityHeader
          onCreatePolicy={() => setIsCreatePolicyOpen(true)}
          onRegisterProvider={() => setIsRegisterProviderOpen(true)}
          onReviewHighRiskSessions={() => setIsReviewHighRiskOpen(true)}
          onReviewAuthRisks={() => setIsReviewHighRiskOpen(true)}
          onExportRegistry={() => alert('Exporting security registry...')}
        />

        <SecurityContextBar context={data.context} />

        <SecurityKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <SecurityFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {SECURITY_TABS.map((tab) => (
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
              <SecurityTabContent
                activeTab={activeTab}
                data={data}
                selectedPolicyItem={selectedPolicyItem!}
                onSelectPolicyItem={setSelectedPolicyItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Rail Panel */}
          <div className="w-full lg:w-72 shrink-0">
            <SecurityRightRail
              onNavigateTab={setActiveTab}
              onActionClick={(action) => {
                if (action === 'create_policy') setIsCreatePolicyOpen(true);
                else if (action === 'register_provider') setIsRegisterProviderOpen(true);
                else if (action === 'review_high_risk_sessions') setIsReviewHighRiskOpen(true);
                else alert(`Action triggered: ${action}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isCreatePolicyOpen}
        title="Create Security Policy"
        description="Draft a new enterprise authentication and session policy. This will require security administration approval before enforcement."
        confirmLabel="Create Policy"
        cancelLabel="Cancel"
        onConfirm={handleCreatePolicy}
        onCancel={() => setIsCreatePolicyOpen(false)}
      />

      <ConfirmDialog
        isOpen={isRegisterProviderOpen}
        title="Register Authentication Provider"
        description="Register a new SAML/OAuth identity provider for SSO authentication across the enterprise."
        confirmLabel="Register Provider"
        cancelLabel="Cancel"
        onConfirm={handleRegisterProvider}
        onCancel={() => setIsRegisterProviderOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReviewHighRiskOpen}
        title="Review High-Risk Sessions"
        description="Initiate an automated session audit and revoke anomalous sessions across active user channels."
        confirmLabel="Review & Revoke"
        cancelLabel="Cancel"
        onConfirm={handleReviewHighRiskSessions}
        onCancel={() => setIsReviewHighRiskOpen(false)}
      />
    </div>
  );
}
export default SecurityPage;
