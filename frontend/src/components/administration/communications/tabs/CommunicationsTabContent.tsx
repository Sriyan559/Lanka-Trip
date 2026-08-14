'use client';

import React from 'react';
import { CommunicationsFullData, NotificationRuleRecord, NotificationTemplateRecord } from '@/lib/administration/communications/communications.types';
import { CommunicationsOverviewTab } from './CommunicationsOverviewTab';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';

interface CommunicationsTabContentProps {
  activeTab: string;
  data: CommunicationsFullData;
  selectedRuleItem: NotificationRuleRecord;
  onSelectRuleItem: (item: NotificationRuleRecord) => void;
  selectedTemplateItem: NotificationTemplateRecord;
  onSelectTemplateItem: (item: NotificationTemplateRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function CommunicationsTabContent({
  activeTab,
  data,
  selectedRuleItem,
  onSelectRuleItem,
  selectedTemplateItem,
  onSelectTemplateItem,
  onNavigateTab,
}: CommunicationsTabContentProps) {
  const {
    rules,
    templates,
    providers,
    senderIdentities,
    failedDeliveries,
    retryQueue,
    deadLetterQueue,
    exceptions,
    charts,
  } = data;

  switch (activeTab) {
    case 'overview':
      return (
        <CommunicationsOverviewTab
          data={data}
          selectedRuleItem={selectedRuleItem}
          onSelectRuleItem={onSelectRuleItem}
          selectedTemplateItem={selectedTemplateItem}
          onSelectTemplateItem={onSelectTemplateItem}
          onNavigateTab={onNavigateTab}
        />
      );

    case 'rules':
      return (
        <SectionCard title="Notification Rules">
          <DataTable
            columns={[
              { key: 'ruleRef', header: 'Rule Ref', cell: (r) => <span className="font-mono text-gray-500">{r.ruleRef}</span> },
              { key: 'eventKey', header: 'Event Key', cell: (r) => <span className="font-bold text-gray-900">{r.eventKey}</span> },
              { key: 'recipientType', header: 'Recipient Type' },
              { key: 'primaryChannel', header: 'Primary Channel' },
              { key: 'templateRef', header: 'Template', cell: (r) => <span className="font-mono">{r.templateRef}</span> },
              { key: 'primaryProvider', header: 'Primary Provider' },
              { key: 'owner', header: 'Owner' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'criticality', header: 'Criticality', cell: (r) => <StatusBadge status={r.criticality} size="xs" /> },
              { key: 'priority', header: 'Priority', cell: (r) => <span className="font-bold text-gray-800">{r.priority}</span> },
            ]}
            data={rules}
            density="compact"
          />
        </SectionCard>
      );

    case 'templates':
    case 'localized-variants':
      return (
        <SectionCard title="Notification Templates">
          <DataTable
            columns={[
              { key: 'templateName', header: 'Template Name', cell: (r) => <span className="font-bold text-gray-900">{r.templateName}</span> },
              { key: 'ref', header: 'Ref', cell: (r) => <span className="font-mono text-gray-500">{r.ref}</span> },
              { key: 'channel', header: 'Channel' },
              { key: 'domain', header: 'Domain' },
              { key: 'sourceLocale', header: 'Source Locale', cell: (r) => <span className="font-mono">{r.sourceLocale}</span> },
              { key: 'variants', header: 'Variants', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.variants}</span> },
              { key: 'variables', header: 'Variables', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.variables}</span> },
              { key: 'owner', header: 'Owner' },
              { key: 'lastUpdated', header: 'Last Updated', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastUpdated}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={templates}
            density="compact"
          />
        </SectionCard>
      );

    case 'providers':
      return (
        <SectionCard title="Communications Provider Registry">
          <DataTable
            columns={[
              { key: 'provider', header: 'Provider', cell: (r) => <span className="font-bold text-gray-900">{r.provider}</span> },
              { key: 'channel', header: 'Channel' },
              { key: 'environment', header: 'Environment' },
              { key: 'availability', header: 'Availability', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.availability}</span> },
              { key: 'latency', header: 'Latency', align: 'right' },
              { key: 'errorRate', header: 'Error Rate', align: 'right' },
              { key: 'health', header: 'Health', cell: (r) => <StatusBadge status={r.health} size="xs" /> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={providers}
            density="compact"
          />
        </SectionCard>
      );

    case 'sender-identities':
      return (
        <SectionCard title="Sender Identities">
          <DataTable
            columns={[
              { key: 'channel', header: 'Channel' },
              { key: 'identity', header: 'Identity', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.identity}</span> },
              { key: 'domain', header: 'Domain' },
              { key: 'purpose', header: 'Purpose' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'expiresOn', header: 'Expires On', cell: (r) => <span className="text-[9px] text-gray-500">{r.expiresOn}</span> },
              { key: 'owner', header: 'Owner' },
            ]}
            data={senderIdentities}
            density="compact"
          />
        </SectionCard>
      );

    case 'failures-retries':
    case 'delivery-health':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Failed Deliveries — Last 24 Hours">
            <DataTable
              columns={[
                { key: 'failureReason', header: 'Failure Reason', cell: (r) => <span className="font-bold text-gray-900">{r.failureReason}</span> },
                { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-rose-700">{r.count.toLocaleString()}</span> },
                { key: 'percentage', header: 'Percentage', align: 'right' },
              ]}
              data={failedDeliveries}
              density="compact"
            />
          </SectionCard>

          <SectionCard title="Retry Queue — Next Attempts">
            <DataTable
              columns={[
                { key: 'window', header: 'Attempt Window', cell: (r) => <span className="font-semibold">{r.window}</span> },
                { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-amber-700">{r.count}</span> },
                { key: 'percentage', header: 'Percentage', align: 'right' },
              ]}
              data={retryQueue}
              density="compact"
            />
          </SectionCard>
        </div>
      );

    default:
      return (
        <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 text-sm shadow-2xs">
          The <span className="font-bold text-gray-700">{activeTab}</span> tab is under construction.
        </div>
      );
  }
}
export default CommunicationsTabContent;
