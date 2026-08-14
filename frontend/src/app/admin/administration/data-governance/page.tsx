import React from 'react';
import { Metadata } from 'next';
import DataGovernancePage from '@/components/administration/data-governance/DataGovernancePage';

export const metadata: Metadata = {
  title: 'Data Governance, Retention, Privacy & Administrative Data Controls | SL Beauty Administration',
  description: 'Govern enterprise data domains, ownership, classification, retention, privacy, and residency.',
};

export default function DataGovernanceRoute() {
  return <DataGovernancePage />;
}
