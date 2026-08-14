import React from 'react';
import { Metadata } from 'next';
import WorkflowPage from '@/components/administration/workflows/WorkflowPage';

export const metadata: Metadata = {
  title: 'Workflows, Approvals & Administrative Process Control | SL Beauty Administration',
  description: 'Govern enterprise workflows, approval chaining, routing rules, SLAs, escalations, and controlled decision execution.',
};

export default function WorkflowsRoute() {
  return <WorkflowPage />;
}
