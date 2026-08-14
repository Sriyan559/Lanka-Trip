import React from 'react';
import { Metadata } from 'next';
import SystemConfigurationPage from '@/components/administration/system-configuration/SystemConfigurationPage';

export const metadata: Metadata = {
  title: 'System Configuration & Global Settings | SL Beauty Administration',
  description: 'Enterprise system configuration, registry, overrides, and change control for SL Beauty.',
};

export default function SystemConfigurationRoute() {
  return <SystemConfigurationPage />;
}
