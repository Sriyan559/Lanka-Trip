import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PaymentsTransactionManagementPage from '@/app/admin/finance/payments/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/finance/payments',
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ id: 'PAY-2025-082942' }),
}));

describe('Payments & Transaction Management (FN03)', () => {
  it('renders heading, context, KPI cards, and portfolio workspace', () => {
    render(<PaymentsTransactionManagementPage />);

    // Page Title
    expect(screen.getByRole('heading', { level: 1, name: /Payments & Transaction Management/i })).toBeInTheDocument();

    // Table Header
    expect(screen.getByText('Payments & Transaction Portfolio')).toBeInTheDocument();

    // Key KPIs
    expect(screen.getByText('Payment Attempts')).toBeInTheDocument();
    expect(screen.getByText('318,420')).toBeInTheDocument();
    expect(screen.getByText('Authorized Payments')).toBeInTheDocument();
  });
});
