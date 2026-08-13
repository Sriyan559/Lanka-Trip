'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import type { CaseDetailFullData, CaseTabType, ChecklistItem } from '@/types/customerSupportDetail';
import {
  fetchCaseDetail,
  addCustomerMessage,
  addInternalNote,
  toggleChecklistItem,
  assignCase,
  changePriority,
  escalateCase,
  markCaseResolved,
  closeCase,
} from '@/services/api/customerSupportDetailService';

import { CaseDetailHeader } from '@/components/admin/customer-support/detail/CaseDetailHeader';
import { CaseIdentitySummary } from '@/components/admin/customer-support/detail/CaseIdentitySummary';
import { CaseStatusStrip } from '@/components/admin/customer-support/detail/CaseStatusStrip';
import { CaseTabsBar } from '@/components/admin/customer-support/detail/CaseTabsBar';
import { CaseOverviewTab } from '@/components/admin/customer-support/detail/CaseOverviewTab';
import { ConversationTab } from '@/components/admin/customer-support/detail/ConversationTab';
import { InternalNotesTab } from '@/components/admin/customer-support/detail/InternalNotesTab';
import { AuditHistoryTab } from '@/components/admin/customer-support/detail/AuditHistoryTab';
import {
  CustomerContextTab,
  RelatedRecordsTab,
  AttachmentsTab,
  InvestigationTab,
  SlaEscalationTab,
  ResolutionWorkspaceTab,
  CommunicationsTab,
  OperationalIssuesTab,
} from '@/components/admin/customer-support/detail/GenericDetailTabs';
import { RightWorkspaceRail } from '@/components/admin/customer-support/detail/RightWorkspaceRail';
import {
  AddNoteModal,
  SendUpdateModal,
  AssignAgentModal,
  MarkResolvedModal,
  CloseCaseModal,
} from '@/components/admin/customer-support/detail/CaseDetailModals';
import { sanitizeInternalRedirect } from '@/lib/authRedirect';

import '../../support.css';

function CustomerSupportCaseDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const caseId = String(params?.caseId ?? '');

  // 1. Safe returnTo URL validation
  const returnToUrl = sanitizeInternalRedirect(
    searchParams?.get('returnTo') ?? null,
    '/admin/customer-support/cases',
  );

  // 2. Tab state with URL persistence (?tab=conversation etc.)
  const rawTab = searchParams?.get('tab') as CaseTabType;
  const activeTab: CaseTabType = rawTab || 'overview';

  const handleSelectTab = (tab: CaseTabType) => {
    const current = new URLSearchParams(Array.from(searchParams?.entries() ?? []));
    if (tab === 'overview') {
      current.delete('tab');
    } else {
      current.set('tab', tab);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  // 3. State management
  const [caseDetail, setCaseDetail] = useState<CaseDetailFullData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [modalState, setModalState] = useState<{
    note: boolean;
    update: boolean;
    assign: boolean;
    resolve: boolean;
    close: boolean;
  }>({
    note: false,
    update: false,
    assign: false,
    resolve: false,
    close: false,
  });

  const loadDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCaseDetail(caseId);
      setCaseDetail(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load case details');
      toast.error('Failed to load support case details.');
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  // Mutation handlers
  const handleSendMessage = async (text: string) => {
    try {
      await addCustomerMessage(caseId, text);
      toast.success('Customer update sent successfully.');
      loadDetail();
    } catch (err) {
      toast.error('Failed to send customer message.');
    }
  };

  const handleAddNote = async (text: string, visibility: 'Internal Only' | 'Team Leads Only' = 'Internal Only') => {
    try {
      await addInternalNote(caseId, text, visibility);
      toast.success('Internal note added.');
      loadDetail();
    } catch (err) {
      toast.error('Failed to add internal note.');
    }
  };

  const handleToggleChecklist = async (item: ChecklistItem) => {
    const nextStatus = item.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await toggleChecklistItem(caseId, item.id, nextStatus);
      toast.success(`Task "${item.task}" marked as ${nextStatus}.`);
      loadDetail();
    } catch (err) {
      toast.error('Failed to update task status.');
    }
  };

  const handleAssignAgent = async (agentName: string, team: string, reason: string) => {
    try {
      await assignCase(caseId, agentName, undefined, team, reason);
      toast.success(`Case assigned to ${agentName} (${team}).`);
      loadDetail();
    } catch (err) {
      toast.error('Failed to assign case.');
    }
  };

  const handleEscalate = async () => {
    try {
      await escalateCase(caseId, 'Compliance Lead', 'Logistics Operations', 'Delivery breach SLA at risk');
      toast.success('Case escalated to Logistics Operations.');
      loadDetail();
    } catch (err) {
      toast.error('Failed to escalate case.');
    }
  };

  const handleChangePriority = async () => {
    try {
      await changePriority(caseId, 'Critical', 'Priority updated from the case resolution workspace.');
      toast.success('Priority set to Critical.');
      loadDetail();
    } catch {
      toast.error('Failed to change case priority.');
    }
  };

  const handleResolve = async (cat: string, sum: string, outcome: string) => {
    try {
      await markCaseResolved(caseId, cat, sum, outcome);
      toast.success('Case marked as Resolved.');
      loadDetail();
    } catch (err) {
      toast.error('Failed to resolve case.');
    }
  };

  const handleCloseCaseAction = async (reason: string) => {
    try {
      await closeCase(caseId, reason);
      toast.success('Case closed successfully.');
      loadDetail();
    } catch (err) {
      toast.error('Failed to close case.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1920px] mx-auto pb-10 support-dashboard">
        <div className="p-12 text-center text-slate-500 font-semibold animate-pulse">
          Loading Customer Support Case details...
        </div>
      </div>
    );
  }

  if (error || !caseDetail) {
    return (
      <div className="max-w-[1920px] mx-auto pb-10 support-dashboard">
        <div className="p-12 text-center font-semibold bg-white rounded-xl border border-line mt-6 shadow-sm">
          <p className="text-red-600">{error || 'Support Case Not Found.'}</p>
          <Link className="mt-4 inline-flex text-primary-900 hover:underline" href={returnToUrl}>
            Back to Customer Support Cases
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1920px] mx-auto pb-10 support-dashboard flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col">
        {/* Header with Breadcrumbs & Actions */}
        <CaseDetailHeader
          caseReference={caseDetail.caseInfo.caseReference}
          subject={caseDetail.caseInfo.subject}
          returnToUrl={returnToUrl}
          onOpenAddNote={() => setModalState((prev) => ({ ...prev, note: true }))}
          onOpenSendUpdate={() => setModalState((prev) => ({ ...prev, update: true }))}
          onOpenMoreActions={() => setModalState((prev) => ({ ...prev, assign: true }))}
        />

        {/* Case Identity Summary Card */}
        <CaseIdentitySummary caseInfo={caseDetail.caseInfo} />

        {/* Case Status Strip */}
        <CaseStatusStrip caseInfo={caseDetail.caseInfo} />

        {/* 12 Approved Tabs Navigation */}
        <CaseTabsBar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          counts={{
            messages: caseDetail.messages.length,
            internalNotes: caseDetail.internalNotes.length,
            attachments: caseDetail.attachments.length,
            blockingIssues: caseDetail.blockingIssues.length,
            auditEvents: caseDetail.auditEvents.length,
          }}
        />
      </div>

      {/* Main Grid: Workspace & Right Rail */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-line shadow-sm p-6">
          {/* Active Tab Content Panel */}
          <div id={`panel-${activeTab}`} role="tabpanel">
            {activeTab === 'overview' && (
              <CaseOverviewTab
                data={caseDetail}
                onToggleChecklist={handleToggleChecklist}
              />
            )}
            {activeTab === 'conversation' && (
              <ConversationTab
                messages={caseDetail.messages}
                onSendMessage={handleSendMessage}
              />
            )}
            {activeTab === 'customer-context' && (
              <CustomerContextTab data={caseDetail} />
            )}
            {activeTab === 'related-records' && (
              <RelatedRecordsTab data={caseDetail} />
            )}
            {activeTab === 'evidence' && (
              <AttachmentsTab data={caseDetail} />
            )}
            {activeTab === 'investigation' && (
              <InvestigationTab data={caseDetail} />
            )}
            {activeTab === 'sla-escalation' && (
              <SlaEscalationTab data={caseDetail} />
            )}
            {activeTab === 'resolution' && (
              <ResolutionWorkspaceTab
                data={caseDetail}
                onResolve={() => setModalState((prev) => ({ ...prev, resolve: true }))}
              />
            )}
            {activeTab === 'internal-notes' && (
              <InternalNotesTab
                notes={caseDetail.internalNotes}
                onAddNote={handleAddNote}
              />
            )}
            {activeTab === 'communications' && (
              <CommunicationsTab data={caseDetail} />
            )}
            {activeTab === 'operational-issues' && (
              <OperationalIssuesTab data={caseDetail} />
            )}
            {activeTab === 'audit-history' && (
              <AuditHistoryTab auditEvents={caseDetail.auditEvents} />
            )}
          </div>
        </div>

        {/* Right-Side Column Workspace Rail (320px) */}
        <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
          <RightWorkspaceRail
            data={caseDetail}
            onOpenSendUpdate={() => setModalState((prev) => ({ ...prev, update: true }))}
            onOpenAssign={() => setModalState((prev) => ({ ...prev, assign: true }))}
            onOpenChangePriority={handleChangePriority}
            onOpenEscalate={handleEscalate}
            onOpenMarkResolved={() => setModalState((prev) => ({ ...prev, resolve: true }))}
            onOpenCloseCase={() => setModalState((prev) => ({ ...prev, close: true }))}
          />
        </div>
      </div>

      {/* Interactive Action Modals */}
      <AddNoteModal
        isOpen={modalState.note}
        onClose={() => setModalState((prev) => ({ ...prev, note: false }))}
        onSubmitNote={(text) => handleAddNote(text)}
      />

      <SendUpdateModal
        isOpen={modalState.update}
        onClose={() => setModalState((prev) => ({ ...prev, update: false }))}
        onSubmitUpdate={(msg) => handleSendMessage(msg)}
      />

      <AssignAgentModal
        isOpen={modalState.assign}
        onClose={() => setModalState((prev) => ({ ...prev, assign: false }))}
        onAssign={(agent, team, reason) => handleAssignAgent(agent, team, reason)}
      />

      <MarkResolvedModal
        isOpen={modalState.resolve}
        onClose={() => setModalState((prev) => ({ ...prev, resolve: false }))}
        onResolve={(cat, sum, outcome) => handleResolve(cat, sum, outcome)}
      />

      <CloseCaseModal
        isOpen={modalState.close}
        onClose={() => setModalState((prev) => ({ ...prev, close: false }))}
        onCloseCase={(reason) => handleCloseCaseAction(reason)}
      />
    </div>
  );
}

export default function CustomerSupportCaseDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Case Detail...</div>}>
      <CustomerSupportCaseDetailContent />
    </Suspense>
  );
}
