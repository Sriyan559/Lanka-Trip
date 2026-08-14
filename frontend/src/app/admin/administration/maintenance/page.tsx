import React from 'react';
import { Metadata } from 'next';
import MaintenancePage from '@/components/administration/maintenance-diagnostics/MaintenancePage';

export const metadata: Metadata = {
  title: 'Maintenance, Diagnostics, System Jobs & Operational Administration | SL Beauty Administration',
  description: 'Operational oversight of system jobs, queues, workers, services, health checks, maintenance windows, and diagnostics across the SL Beauty platform.',
};

export default function MaintenanceDiagnosticsRoute() {
  return <MaintenancePage />;
}
