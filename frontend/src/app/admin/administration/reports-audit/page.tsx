import React from 'react';
import { Metadata } from 'next';
import ReportsAuditPage from '@/components/administration/reports-audit/ReportsAuditPage';

export const metadata: Metadata = {
  title: 'Administration Reports, Audit, Export & Change History | SL Beauty Administration',
  description: 'Review immutable administration audit records, change history, before/after comparison, governance evidence, scheduled reports, exports, high-risk actions and audit-integrity posture across the Administration domain.',
};

export default function ReportsAuditRoute() {
  return <ReportsAuditPage />;
}
