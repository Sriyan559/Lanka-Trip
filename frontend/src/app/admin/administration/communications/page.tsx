import React from 'react';
import { Metadata } from 'next';
import CommunicationsPage from '@/components/administration/communications/CommunicationsPage';

export const metadata: Metadata = {
  title: 'Communications, Notifications & Template Management | SL Beauty Administration',
  description: 'Govern system notifications, delivery channels, providers, templates, and routing for SL Beauty.',
};

export default function CommunicationsRoute() {
  return <CommunicationsPage />;
}
