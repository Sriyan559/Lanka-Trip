import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SupplierVerificationManagementPage from '@/app/admin/verification-compliance/supplier-verification/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

global.fetch = vi.fn().mockImplementation((url: string) => {
  if (url.includes('/admin/verification-compliance/supplier-verification/dashboard')) {
    return Promise.resolve({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({
        kpis: [
          { index: 1, title: 'Total Verification Applications', value: '0' },
          { index: 2, title: 'Verified Suppliers', value: '0' },
          { index: 3, title: 'Pending Initial Triage', value: '0' },
          { index: 4, title: 'Under Legal Review', value: '0' },
          { index: 5, title: 'KYC Checks Pending', value: '0' },
          { index: 6, title: 'Commercial Review Pending', value: '0' },
          { index: 7, title: 'Approved This Month', value: '0' },
          { index: 8, title: 'Rejected Applications', value: '0' },
          { index: 9, title: 'Conditional Approvals', value: '0' },
          { index: 10, title: 'Revalidation Queue', value: '0' },
          { index: 11, title: 'Restricted Suppliers', value: '0' },
          { index: 12, title: 'Verification SLA Breaches', value: '0' },
        ],
        trend: [
          { date: 'May 01', Rejected: 0, Submitted: 0, 'Under Review': 0, Verified: 0 }
        ],
        donut: [
          { name: 'Verified', value: 0 },
          { name: 'Pending Triage', value: 0 }
        ],
        health: { score: null, status: 'Not Assessed' },
        alerts: { high_risk: 0, missing_kyc: 0, sla_breach: 0 },
        queues: { pending_triage: 0, kyc_checks: 0, legal_review: 0 },
        applications: {
          data: [],
          current_page: 1,
          per_page: 15,
          total: 0,
          last_page: 1
        },
        lastSynced: '12 Aug 2026, 12:00 PM'
      }),
    });
  }

  return Promise.resolve({
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: () => Promise.resolve({}),
  });
});

describe('Supplier Verification Integration & Zero-Data Resilience', () => {
  it('renders Supplier Verification & Eligibility dashboard with zero/empty database resilience', async () => {
    render(<SupplierVerificationManagementPage />);

    expect(screen.getAllByText('Supplier Verification & Eligibility')[0]).toBeInTheDocument();
    expect(screen.getByText('Supplier Verification Applications (0)')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Total Verification Applications')).toBeInTheDocument();
      expect(screen.getByText('Verified Suppliers')).toBeInTheDocument();
      expect(screen.getByText('No supplier verification applications found in database.')).toBeInTheDocument();
    });
  });
});
