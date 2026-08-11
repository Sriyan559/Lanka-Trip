import React from 'react';
import { Tabs } from '@/components/admin/shared/Tabs';
import type { Tab } from '@/components/admin/shared/Tabs';

const AUTHENTICITY_TABS: Tab[] = [
  { id: 'overview',           label: 'Overview' },
  { id: 'all',                label: 'All Investigations' },
  { id: 'new',                label: 'New' },
  { id: 'under_investigation',label: 'Under Investigation' },
  { id: 'awaiting_evidence',  label: 'Awaiting Evidence' },
  { id: 'suspected',          label: 'Suspected Counterfeit' },
  { id: 'confirmed',          label: 'Confirmed Counterfeit' },
  { id: 'unauthorized_brand', label: 'Unauthorized Brand Use' },
  { id: 'packaging',          label: 'Packaging Conflicts' },
  { id: 'identifier',         label: 'Identifier Conflicts' },
  { id: 'duplicate',          label: 'Duplicate Listings' },
  { id: 'restricted',         label: 'Restricted' },
  { id: 'revalidation',       label: 'Revalidation' },
  { id: 'resolved',           label: 'Resolved' },
  { id: 'audit_history',      label: 'Audit History' },
];

interface AuthenticityTabsProps {
  activeTab: string;
  onChange: (id: string) => void;
  counts?: Record<string, number>;
}

export function AuthenticityTabs({ activeTab, onChange, counts = {} }: AuthenticityTabsProps) {
  const tabs = AUTHENTICITY_TABS.map((t) => ({
    ...t,
    count: counts[t.id] !== undefined ? counts[t.id] : undefined,
  }));

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={onChange} />;
}
