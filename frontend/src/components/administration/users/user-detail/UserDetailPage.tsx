'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { UserDetailFullData } from '@/lib/administration/users/user-detail.types';
import { fetchUserDetailByRef } from '@/lib/administration/users/user-detail.api';
import { AD03_METADATA } from '@/lib/administration/users/user-detail.constants';
import { UserDetailHeader } from './UserDetailHeader';
import { ServiceStatusStrip } from './ServiceStatusStrip';
import { UserMetricCards } from './UserMetricCards';
import { UserDetailTabs } from './UserDetailTabs';
import { UserOverviewTab } from './UserOverviewTab';
import { UserHealthAccessRail } from './UserHealthAccessRail';
import { UserDetailTabContent } from './tabs/UserDetailTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';
import toast from 'react-hot-toast';

interface UserDetailPageProps {
  userRef: string;
}

export function UserDetailPage({ userRef }: UserDetailPageProps) {
  const [data, setData] = useState<UserDetailFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Confirmation dialog state
  const [activeModal, setActiveModal] = useState<{
    type: string;
    title: string;
    description: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning' | 'primary';
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchUserDetailByRef(userRef)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load user detail:', err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [userRef]);

  const handleActionClick = (actionKey: string) => {
    switch (actionKey) {
      case 'review_user_access':
        setActiveModal({
          type: 'review_access',
          title: 'Review User Access Certification',
          description: `Initiate formal access certification review for ${data?.profile.name} (${userRef}) across all assigned scopes and permissions.`,
          confirmLabel: 'Certify Access',
          variant: 'primary',
        });
        break;
      case 'request_access_change':
        setActiveModal({
          type: 'access_change',
          title: 'Request Access Profile Modification',
          description: `Submit an access elevation or role adjustment request for ${data?.profile.name}. This change requires secondary authorization through AD11 workflow governance.`,
          confirmLabel: 'Submit Access Request',
          variant: 'primary',
        });
        break;
      case 'review_temporary_access':
        setActiveModal({
          type: 'temp_access',
          title: 'Review Temporary Access Window',
          description: `Confirm validity for active temporary grant '${data?.temporaryGrants[0]?.grantAccess}' scheduled to expire on ${data?.temporaryGrants[0]?.ends}.`,
          confirmLabel: 'Extend / Reauthorize',
          variant: 'warning',
        });
        break;
      case 'revoke_user_access':
        setActiveModal({
          type: 'revoke_access',
          title: 'Revoke User Access & Suspend Account',
          description: `Are you sure you want to revoke all active platform access and suspend account credentials for ${data?.profile.name}? This will immediately terminate all active sessions and log an audit event in AD14.`,
          confirmLabel: 'Revoke Access & Suspend',
          variant: 'danger',
        });
        break;
      case 'revoke_sessions':
        setActiveModal({
          type: 'revoke_sessions',
          title: 'Terminate All Active User Sessions',
          description: `Force termination of all 3 active sessions across desktop and mobile clients for ${data?.profile.name}. The user will be required to re-authenticate with MFA.`,
          confirmLabel: 'Terminate All Sessions',
          variant: 'danger',
        });
        break;
      case 'export_user_audit':
        toast.success(`Exporting compliance audit archive for ${data?.profile.name} (${userRef})...`);
        break;
      case 'request_recertification':
        toast.success('Access recertification request submitted to platform governance.');
        break;
      case 'request_temp_access':
        setActiveTab('temporary-access');
        break;
      case 'restrict_scope':
        setActiveTab('restrictions');
        break;
      default:
        console.log('Action triggered:', actionKey);
    }
  };

  const handleConfirmModal = async () => {
    if (!activeModal) return;
    setModalLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setModalLoading(false);

    if (activeModal.type === 'revoke_access') {
      toast.success('User access revoked and account suspended. Emitted audit event to AD14.');
    } else if (activeModal.type === 'revoke_sessions') {
      toast.success('All active sessions terminated successfully.');
    } else {
      toast.success('Governed action completed successfully.');
    }
    setActiveModal(null);
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/40 p-4">
        <div className="flex items-center justify-center py-24 text-gray-500 gap-2">
          <div className="w-5 h-5 border-2 border-[#741d35] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading user detail & security posture...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        {/* 1. Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <nav className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
            <Link href="/admin/administration" className="hover:text-gray-900 transition-colors">
              Administration
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link href="/admin/administration/users" className="hover:text-gray-900 transition-colors">
              Users & Identity
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-bold">{data.profile.name}</span>
          </nav>

          <Link
            href="/admin/administration/users"
            className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Users & Identity</span>
          </Link>
        </div>

        {/* 2. Screen Heading */}
        <div className="mb-3">
          <h1 className="text-base font-bold text-gray-900 leading-tight">
            User Detail, Access & Activity
          </h1>
        </div>

        {/* 3. User Detail Header Hero */}
        <UserDetailHeader
          profile={data.profile}
          healthBreakdown={data.healthBreakdown}
          onReviewAccess={() => handleActionClick('review_user_access')}
          onRequestAccessChange={() => handleActionClick('request_access_change')}
          onReviewAuth={() => setActiveTab('authentication')}
          onReviewMemberships={() => setActiveTab('memberships')}
          onExportAudit={() => handleActionClick('export_user_audit')}
        />

        {/* 4. Service Status Strip */}
        <ServiceStatusStrip />

        {/* 5. 20 Reusable Metric Cards in 2 rows */}
        <UserMetricCards />

        {/* 6. Tabs Navigation Bar */}
        <UserDetailTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* 7. Main Flex Layout: Content Area (left) + Health/Access Rail (right) */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' ? (
              <UserOverviewTab data={data} />
            ) : (
              <UserDetailTabContent activeTab={activeTab} data={data} />
            )}
          </div>

          {/* Right Rail */}
          <div className="w-full lg:w-72 shrink-0">
            <UserHealthAccessRail
              profile={data.profile}
              onNavigateTab={setActiveTab}
              onActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>

      {/* Governed Confirmation Dialog */}
      {activeModal && (
        <ConfirmDialog
          isOpen={true}
          title={activeModal.title}
          description={activeModal.description}
          confirmLabel={activeModal.confirmLabel}
          variant={activeModal.variant}
          isLoading={modalLoading}
          onConfirm={handleConfirmModal}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
