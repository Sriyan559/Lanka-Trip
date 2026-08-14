'use client';

import React from 'react';
import { CommunicationsFullData, NotificationRuleRecord, NotificationTemplateRecord } from '@/lib/administration/communications/communications.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { SelectedRulePanel } from '../SelectedRulePanel';
import { SelectedTemplatePanel } from '../SelectedTemplatePanel';
import { ChevronRight } from 'lucide-react';

interface CommunicationsOverviewTabProps {
  data: CommunicationsFullData;
  selectedRuleItem: NotificationRuleRecord;
  onSelectRuleItem: (item: NotificationRuleRecord) => void;
  selectedTemplateItem: NotificationTemplateRecord;
  onSelectTemplateItem: (item: NotificationTemplateRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function CommunicationsOverviewTab({
  data,
  selectedRuleItem,
  onSelectRuleItem,
  selectedTemplateItem,
  onSelectTemplateItem,
  onNavigateTab,
}: CommunicationsOverviewTabProps) {
  const {
    rules,
    selectedRule,
    eventMappings,
    templates,
    selectedTemplate,
    templateVariables,
    localizedVariants,
    localizationCoverage,
    templateGaps,
    fallbackTargets,
    providers,
    senderIdentities,
    identityExpiries,
    failedDeliveries,
    retryQueue,
    deliveryFailures,
    retryQueueByProvider,
    governanceGates,
    channelReadiness,
    recentActivity,
    deadLetterQueue,
    deliveryWindows,
    exceptions,
    charts,
  } = data;

  const ruleColumns: ColumnDef<NotificationRuleRecord>[] = [
    { key: 'ruleRef', header: 'Rule Ref', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.ruleRef}</span> },
    {
      key: 'eventKey',
      header: 'Event Key',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectRuleItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.eventKey}
        </button>
      ),
    },
    { key: 'recipientType', header: 'Recipient Type' },
    { key: 'primaryChannel', header: 'Primary Channel' },
    { key: 'secondaryChannel', header: 'Secondary Channel', cell: (r) => <span className="text-gray-600">{r.secondaryChannel || '—'}</span> },
    { key: 'templateRef', header: 'Template', cell: (r) => <span className="font-mono text-gray-700">{r.templateRef}</span> },
    { key: 'primaryProvider', header: 'Primary Provider' },
    { key: 'fallbackProvider', header: 'Secondary / Fallback Provider', cell: (r) => <span className="text-gray-600">{r.fallbackProvider || '—'}</span> },
    { key: 'owner', header: 'Owner' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
    { key: 'criticality', header: 'Criticality', cell: (r) => <StatusBadge status={r.criticality} size="xs" /> },
    { key: 'priority', header: 'Priority', cell: (r) => <span className="font-bold text-gray-800">{r.priority}</span> },
  ];

  const templateColumns: ColumnDef<NotificationTemplateRecord>[] = [
    {
      key: 'templateName',
      header: 'Template Name',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectTemplateItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.templateName}
        </button>
      ),
    },
    { key: 'ref', header: 'Ref', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.ref}</span> },
    { key: 'channel', header: 'Channel' },
    { key: 'domain', header: 'Domain' },
    { key: 'sourceLocale', header: 'Source Locale', cell: (r) => <span className="font-mono">{r.sourceLocale}</span> },
    { key: 'variants', header: 'Variants', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.variants}</span> },
    { key: 'variables', header: 'Variables', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.variables}</span> },
    { key: 'owner', header: 'Owner' },
    { key: 'lastUpdated', header: 'Last Updated', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastUpdated}</span> },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Notification Rule Registry, Selected Rule, Event Mapping */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6 min-w-0">
          <SectionCard
            title="Notification Rule Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('rules')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all rules</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={ruleColumns} data={rules} density="compact" />
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SelectedRulePanel
            rule={selectedRule}
            onEditRule={() => alert('Edit Rule')}
            onViewTemplate={() => onNavigateTab('templates')}
            onViewRouting={() => onNavigateTab('routing')}
          />
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Event Notification Mapping">
            <DataTable
              columns={[
                { key: 'eventKey', header: 'Event Key', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.eventKey}</span> },
                { key: 'recipient', header: 'Recipient' },
                { key: 'channel', header: 'Channel' },
                { key: 'templateRef', header: 'Template', cell: (r) => <span className="font-mono text-gray-700">{r.templateRef}</span> },
                { key: 'primaryProvider', header: 'Primary Provider' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={eventMappings}
              density="compact"
            />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Template Registry, Selected Template, Template Variables, Localized Variants */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 min-w-0">
          <SectionCard
            title="Template Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('templates')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all templates</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={templateColumns} data={templates} density="compact" />
          </SectionCard>
        </div>

        <div className="lg:col-span-2 min-w-0">
          <SelectedTemplatePanel
            template={selectedTemplate}
            onViewVariants={() => onNavigateTab('localized-variants')}
            onViewHistory={() => onNavigateTab('activity')}
          />
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Template Variables">
            <DataTable
              columns={[
                { key: 'variable', header: 'Variable', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.variable}</span> },
                { key: 'type', header: 'Type' },
                { key: 'required', header: 'Required', align: 'center' },
                { key: 'sourceDomain', header: 'Source Domain' },
                { key: 'fallback', header: 'Fallback' },
                { key: 'piiClass', header: 'PII Class' },
                { key: 'validation', header: 'Validation' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={templateVariables}
              density="compact"
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Localized Variants">
            <DataTable
              columns={[
                { key: 'locale', header: 'Locale', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.locale}</span> },
                { key: 'variantStatus', header: 'Variant Status', cell: (r) => <StatusBadge status={r.variantStatus} size="xs" /> },
                { key: 'readiness', header: 'Readiness', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.readiness}%</span> },
                { key: 'translationReview', header: 'Translation Review', cell: (r) => <span className="font-semibold text-gray-800">{r.translationReview}</span> },
                { key: 'fallback', header: 'Fallback', cell: (r) => <span className="font-mono">{r.fallback}</span> },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={localizedVariants}
              density="compact"
            />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: Localization Coverage, Template Gaps, Fallback Targets, Fallback Status Donut */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 min-w-0">
          <SectionCard title="Template Localization Coverage">
            <DataTable
              columns={[
                { key: 'locale', header: 'Locale', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.locale}</span> },
                { key: 'enabledStatus', header: 'Enabled', align: 'center' },
                { key: 'readyStatus', header: 'Ready', align: 'center' },
                { key: 'variablesValid', header: 'Variables Valid', align: 'center' },
                { key: 'readinessIndex', header: 'Readiness Index', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.readinessIndex}%</span> },
                { key: 'fallbackLocale', header: 'Fallback', cell: (r) => <span className="font-mono">{r.fallbackLocale}</span> },
                { key: 'provider', header: 'Provider' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={localizationCoverage}
              density="compact"
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Template Gaps">
            <DataTable
              columns={[
                { key: 'gapType', header: 'Gap Type', cell: (r) => <span className="font-bold text-gray-900">{r.gapType}</span> },
                { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.count}</span> },
                { key: 'locale', header: 'Locale', cell: (r) => <span className="font-mono text-[9px]">{r.locale}</span> },
                { key: 'fallback', header: 'Fallback', cell: (r) => <span className="font-mono text-[9px]">{r.fallback}</span> },
                { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={templateGaps}
              density="compact"
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Fallback Targets">
            <DataTable
              columns={[
                { key: 'channel', header: 'Channel', cell: (r) => <span className="font-bold text-gray-900">{r.channel}</span> },
                { key: 'primaryProvider', header: 'Primary Provider' },
                { key: 'fallbackProvider', header: 'Secondary / Fallback Provider' },
              ]}
              data={fallbackTargets}
              density="compact"
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-2 min-w-0">
          <SectionCard title="Fallback Status">
            <div className="flex flex-col items-center justify-center p-2">
              <ReusableDonutChart
                data={charts.fallbackStatus}
                totalValue="54%"
                totalLabel="Resolved"
                height={150}
              />
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Communications Provider Registry, Sender Identities, Sender Identity Status, Identity Expiry */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 min-w-0">
          <SectionCard title="Communications Provider Registry">
            <DataTable
              columns={[
                { key: 'provider', header: 'Provider', cell: (r) => <span className="font-bold text-gray-900">{r.provider}</span> },
                { key: 'channel', header: 'Channel' },
                { key: 'environment', header: 'Env' },
                { key: 'availability', header: 'Availability', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.availability}</span> },
                { key: 'latency', header: 'Latency', align: 'right' },
                { key: 'errorRate', header: 'Error Rate', align: 'right', cell: (r) => <span className="text-gray-700">{r.errorRate}</span> },
                { key: 'health', header: 'Health', cell: (r) => <StatusBadge status={r.health} size="xs" /> },
                { key: 'primary', header: 'Primary', align: 'center' },
                { key: 'fallback', header: 'Fallback', align: 'center' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={providers}
              density="compact"
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Sender Identities">
            <DataTable
              columns={[
                { key: 'channel', header: 'Channel', cell: (r) => <span className="font-semibold text-gray-800">{r.channel}</span> },
                { key: 'identity', header: 'Identity', cell: (r) => <span className="font-mono font-bold text-gray-900 truncate block max-w-[90px]" title={r.identity}>{r.identity}</span> },
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
        </div>

        <div className="lg:col-span-2 min-w-0">
          <SectionCard title="Sender Identity Status">
            <div className="flex flex-col items-center justify-center p-2">
              <ReusableDonutChart
                data={charts.senderIdentityStatus}
                totalValue="24"
                totalLabel="Total"
                height={150}
              />
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Identity Expiry — Next 30 Days">
            <DataTable
              columns={[
                { key: 'identity', header: 'Identity', cell: (r) => <span className="font-mono font-bold text-gray-900 truncate block max-w-[100px]" title={r.identity}>{r.identity}</span> },
                { key: 'channel', header: 'Channel' },
                { key: 'expiresOn', header: 'Expires On', cell: (r) => <span className="text-[9px] text-gray-500">{r.expiresOn}</span> },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={identityExpiries}
              density="compact"
            />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 5: Delivery Health, Failed Deliveries, Retry Queue, Delivery Failures, Retry Queue by Provider, Critical Notifications */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {/* Delivery Health (24H) */}
        <SectionCard title="Delivery Health — Last 24 Hours">
          <div className="grid grid-cols-5 gap-1 text-center py-2">
            <div><span className="text-[9px] text-gray-400 block uppercase">Delivered</span><span className="text-base font-extrabold text-gray-900">186K</span></div>
            <div><span className="text-[9px] text-gray-400 block uppercase">Success</span><span className="text-base font-extrabold text-emerald-700">98.7%</span></div>
            <div><span className="text-[9px] text-gray-400 block uppercase">Failed</span><span className="text-base font-extrabold text-rose-700">1,842</span></div>
            <div><span className="text-[9px] text-gray-400 block uppercase">In Retry Queue</span><span className="text-base font-extrabold text-amber-700">742</span></div>
            <div><span className="text-[9px] text-gray-400 block uppercase">Demand</span><span className="text-base font-extrabold text-gray-900">183.6K</span></div>
          </div>
        </SectionCard>

        {/* Failed Deliveries (24H) */}
        <SectionCard title="Failed Deliveries — Last 24 Hours">
          <DataTable
            columns={[
              { key: 'failureReason', header: 'Top Reasons', cell: (r) => <span className="font-bold text-gray-900">{r.failureReason}</span> },
              { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-rose-700">{r.count.toLocaleString()}</span> },
              { key: 'percentage', header: '%', align: 'right', cell: (r) => <span className="text-gray-500 font-semibold">{r.percentage}</span> },
            ]}
            data={failedDeliveries}
            density="compact"
          />
        </SectionCard>

        {/* Retry Queue — Next Attempts */}
        <SectionCard title="Retry Queue — Next Attempts">
          <DataTable
            columns={[
              { key: 'window', header: 'Next Attempt Window', cell: (r) => <span className="font-semibold text-gray-800">{r.window}</span> },
              { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-amber-700">{r.count}</span> },
              { key: 'percentage', header: '%', align: 'right', cell: (r) => <span className="text-gray-500 font-semibold">{r.percentage}</span> },
            ]}
            data={retryQueue}
            density="compact"
          />
        </SectionCard>

        {/* Delivery Failures (24H) */}
        <SectionCard title="Delivery Failures — Last 24 Hours">
          <DataTable
            columns={[
              { key: 'provider', header: 'Provider', cell: (r) => <span className="font-bold text-gray-900">{r.provider}</span> },
              { key: 'failedCount', header: 'Failed', align: 'right', cell: (r) => <span className="font-bold text-rose-700">{r.failedCount}</span> },
              { key: 'errorRate', header: 'Error Rate', align: 'right' },
              { key: 'topCause', header: 'Top Cause' },
            ]}
            data={deliveryFailures}
            density="compact"
          />
        </SectionCard>

        {/* Retry Queue by Provider */}
        <SectionCard title="Retry Queue by Provider">
          <DataTable
            columns={[
              { key: 'provider', header: 'Provider', cell: (r) => <span className="font-bold text-gray-900">{r.provider}</span> },
              { key: 'queueCount', header: 'Provider Queue', align: 'right', cell: (r) => <span className="font-bold text-amber-700">{r.queueCount}</span> },
              { key: 'oldestAge', header: 'Oldest', align: 'right' },
            ]}
            data={retryQueueByProvider}
            density="compact"
          />
        </SectionCard>

        {/* Fallback Activations */}
        <SectionCard title="Fallback Activations — 24H">
          <div className="flex items-center justify-between p-3 text-center">
            <div><span className="text-[9px] text-gray-400 uppercase font-bold block">Total</span><span className="text-base font-extrabold text-gray-900">512</span></div>
            <div><span className="text-[9px] text-gray-400 uppercase font-bold block">Success Rate</span><span className="text-base font-extrabold text-emerald-700">94.3%</span></div>
          </div>
        </SectionCard>

        {/* Critical Notifications */}
        <SectionCard title="Critical Notifications">
          <div className="flex items-center justify-between p-3 text-center">
            <div><span className="text-[9px] text-gray-400 uppercase font-bold block">Open</span><span className="text-base font-extrabold text-rose-700">48</span></div>
            <div><span className="text-[9px] text-gray-400 uppercase font-bold block">High Risk</span><span className="text-base font-extrabold text-rose-700">14</span></div>
          </div>
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 6: Risk Portfolio, Governance Gates, Readiness, Template Activity Line, Provider Health Line */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Communications Risk Portfolio */}
        <SectionCard title="Communications Risk Portfolio">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.riskPortfolio}
              totalValue="24"
              totalLabel="Total"
              height={140}
            />
          </div>
        </SectionCard>

        {/* Governance Gates */}
        <SectionCard title="Communications Governance Gates">
          <DataTable
            columns={[
              { key: 'gate', header: 'Gate', cell: (r) => <span className="font-bold text-gray-900">{r.gate}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'lastEvaluated', header: 'Last Evaluated', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.lastEvaluated}</span> },
            ]}
            data={governanceGates}
            density="compact"
          />
        </SectionCard>

        {/* Communications Readiness */}
        <SectionCard title="Communications Readiness">
          <DataTable
            columns={[
              { key: 'channel', header: 'Channel', cell: (r) => <span className="font-bold text-gray-900">{r.channel}</span> },
              { key: 'templates', header: 'Templates', align: 'center', cell: (r) => <span className="font-semibold">{r.templates}%</span> },
              { key: 'providers', header: 'Providers', align: 'center', cell: (r) => <span className="font-semibold">{r.providers}%</span> },
              { key: 'routing', header: 'Routing', align: 'center', cell: (r) => <span className="font-semibold">{r.routing}%</span> },
              { key: 'localization', header: 'Localization', align: 'center', cell: (r) => <span className="font-semibold">{r.localization}%</span> },
              { key: 'readinessScore', header: 'Readiness', align: 'center', cell: (r) => <span className="font-extrabold text-emerald-700">{r.readinessScore}%</span> },
            ]}
            data={channelReadiness}
            density="compact"
          />
        </SectionCard>

        {/* Template Activity — Last 30 Days Line Chart */}
        <SectionCard title="Template Activity — Last 30 Days">
          <ResponsiveLineChart
            data={charts.templateActivity}
            xAxisKey="label"
            series={[
              { key: 'Created', label: 'Created', color: '#3b82f6' },
              { key: 'Updated', label: 'Updated', color: '#10b981' },
              { key: 'Retired', label: 'Retired', color: '#f59e0b' },
            ]}
            height={140}
          />
        </SectionCard>

        {/* Provider Health — Last 30 Days Line Chart */}
        <SectionCard title="Provider Health — Last 30 Days">
          <ResponsiveLineChart
            data={charts.providerHealth}
            xAxisKey="label"
            series={[
              { key: 'Email', label: 'Email', color: '#3b82f6' },
              { key: 'SMS', label: 'SMS', color: '#10b981' },
              { key: 'Push', label: 'Push', color: '#8b5cf6' },
            ]}
            height={140}
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 7: Recent Communication Activity, Dead-Letter Queue, Quiet Hours, Exceptions */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <SectionCard title="Recent Communication Activity">
          <DataTable
            columns={[
              { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.dateTime}</span> },
              { key: 'action', header: 'Action', cell: (r) => <span className="font-semibold text-gray-800">{r.action}</span> },
              { key: 'templateRef', header: 'Template', cell: (r) => <span className="font-mono text-gray-900 truncate block max-w-[80px]" title={r.templateRef}>{r.templateRef}</span> },
              { key: 'recipient', header: 'Recipient' },
              { key: 'changedBy', header: 'Changed By' },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Dead-Letter Queue">
          <DataTable
            columns={[
              { key: 'dlqId', header: 'DLQ ID', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.dlqId}</span> },
              { key: 'event', header: 'Event' },
              { key: 'channel', header: 'Channel' },
              { key: 'failureReason', header: 'Failure Reason' },
              { key: 'age', header: 'Age' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={deadLetterQueue}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Notification Delivery Windows (Quiet Hours)">
          <DataTable
            columns={[
              { key: 'channel', header: 'Channel', cell: (r) => <span className="font-bold text-gray-900">{r.channel}</span> },
              { key: 'quietHours', header: 'Quiet Hours (Local)', cell: (r) => <span className="font-mono text-gray-800">{r.quietHours}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={deliveryWindows}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Communication Exceptions">
          <DataTable
            columns={[
              { key: 'type', header: 'Exception Type', cell: (r) => <span className="font-bold text-gray-900">{r.type}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.count}</span> },
              { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={exceptions}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default CommunicationsOverviewTab;
