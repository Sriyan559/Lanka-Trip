import React from 'react';
import { Metadata } from 'next';
import SecurityPage from '@/components/administration/security-authentication/SecurityPage';

export const metadata: Metadata = {
  title: 'Security, Authentication & Session Control | SL Beauty Administration',
  description: 'Govern authentication providers, MFA, login protection, session security, step-up controls, and security risk.',
};

export default function SecurityAuthenticationRoute() {
  return <SecurityPage />;
}
