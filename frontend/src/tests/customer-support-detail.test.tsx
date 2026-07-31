import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CustomerSupportCaseDetailPage from '@/app/admin/customer-support/cases/[caseId]/page';
import {
  changePriority,
  fetchCaseDetail,
} from '@/services/api/customerSupportDetailService';

const navigation = vi.hoisted(() => ({
  params: { caseId: '8241' },
  searchParams: new URLSearchParams(),
  replace: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useParams: () => navigation.params,
  usePathname: () => `/admin/customer-support/cases/${navigation.params.caseId}`,
  useRouter: () => ({
    replace: navigation.replace,
    push: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => navigation.searchParams,
}));

describe('Screen 17 customer support case detail', () => {
  beforeEach(() => {
    navigation.params.caseId = '8241';
    navigation.searchParams.delete('tab');
    navigation.searchParams.delete('returnTo');
    navigation.replace.mockClear();
  });

  it('renders the existing case in the full 12-tab workspace', async () => {
    render(<CustomerSupportCaseDetailPage />);

    expect((await screen.findAllByText('Order has not been dispatched'))[0]).toBeInTheDocument();
    expect(screen.getAllByText('CS-2026-008241')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(12);
    expect(screen.getByRole('tab', { name: /Case Overview/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('rejects unknown case identifiers instead of fabricating a record', async () => {
    await expect(fetchCaseDetail('does-not-exist')).rejects.toThrow(
      'Support case not found.',
    );
  });

  it('persists controlled priority changes in the detail service cache', async () => {
    await changePriority('8241', 'Urgent', 'SLA risk');
    const updated = await fetchCaseDetail('8241');

    expect(updated.caseInfo.priority).toBe('Urgent');
    expect(updated.auditEvents[0].eventType).toBe('Priority Changed');
  });

  it('falls back to the support queue for unsafe return targets', async () => {
    navigation.searchParams.set('returnTo', '//malicious.example/support');
    render(<CustomerSupportCaseDetailPage />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Support Operations' })).toHaveAttribute(
        'href',
        '/admin/customer-support/cases',
      );
    });
  });
});
