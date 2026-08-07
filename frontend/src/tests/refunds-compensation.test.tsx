import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RefundsCompensationPage from '@/app/admin/finance/refunds-compensation/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/admin/finance/refunds-compensation',
}));

describe('FN05 — Refunds & Customer Compensation Page', () => {
  it('renders the header title and key section headings', () => {
    render(<RefundsCompensationPage />);
    expect(screen.getAllByText('Refunds & Customer Compensation')[0]).toBeInTheDocument();
    expect(screen.getByText('Refund & Compensation Trend (Last 30 Days)')).toBeInTheDocument();
    expect(screen.getByText('Refund Type Distribution')).toBeInTheDocument();
    expect(screen.getByText('Refund Status Summary')).toBeInTheDocument();
  });

  it('renders KPI cards and portfolio table', () => {
    render(<RefundsCompensationPage />);
    expect(screen.getByText('Refund Requests')).toBeInTheDocument();
    expect(screen.getAllByText('Total Refund Value')[0]).toBeInTheDocument();
    expect(screen.getByText('Refunds & Customer Compensation Portfolio')).toBeInTheDocument();
  });

  it('renders the right sidebar health scorecard and quick queues', () => {
    render(<RefundsCompensationPage />);
    expect(screen.getByText('Refund Operations Health')).toBeInTheDocument();
    expect(screen.getByText('Priority Refund Alerts (8)')).toBeInTheDocument();
    expect(screen.getByText('Final Refund Actions')).toBeInTheDocument();
  });
});
