import React from 'react';
import { Tabs } from '@/components/admin/shared/Tabs';
import type { Tab } from '@/components/admin/shared/Tabs';

const RECALL_TABS: Tab[] = [
  { id: 'overview',               label: 'Overview' },
  { id: 'active_incidents',        label: 'Active Incidents' },
  { id: 'active_recalls',          label: 'Active Recalls' },
  { id: 'quarantined',             label: 'Quarantined' },
  { id: 'customer_notifications',  label: 'Customer Notifications' },
  { id: 'regulatory_reporting',    label: 'Regulatory Reporting' },
  { id: 'recovery_returns',        label: 'Recovery & Returns' },
  { id: 'audit_trail',             label: 'Audit Trail' },
];

interface RecallTabsProps {
  activeTab: string;
  onChange: (id: string) => void;
  counts?: Record<string, number>;
}

export function RecallTabs({ activeTab, onChange, counts = {} }: RecallTabsProps) {
  const tabs = RECALL_TABS.map((t) => ({
    ...t,
    count: counts[t.id] !== undefined ? counts[t.id] : undefined,
  }));
  return <Tabs tabs={tabs} activeTab={activeTab} onChange={onChange} />;
}
