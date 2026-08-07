import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MarketplaceCommissionsFeesPage from '@/app/admin/finance/commissions-fees/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ComposedChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => null,
  Cell: () => null,
}));

describe('FN08 — Marketplace Commissions & Fees Page', () => {
  it('renders the header title and key section headings', () => {
    render(<MarketplaceCommissionsFeesPage />);
    expect(screen.getAllByText('Marketplace Commissions & Fees')[0]).toBeInTheDocument();
    expect(screen.getByText('Commission, Fee & Reversal Trend (Last 30 Days)')).toBeInTheDocument();
    expect(screen.getByText('Commission & Fee Type Distribution')).toBeInTheDocument();
    expect(screen.getByText('Commission Status Summary')).toBeInTheDocument();
  });

  it('renders KPI cards and portfolio table', () => {
    render(<MarketplaceCommissionsFeesPage />);
    expect(screen.getByText('Gross Commission Base')).toBeInTheDocument();
    expect(screen.getByText('Total Commission Earned')).toBeInTheDocument();
    expect(screen.getByText('Marketplace Commissions Portfolio')).toBeInTheDocument();
  });

  it('renders the right sidebar health scorecard and quick queues', () => {
    render(<MarketplaceCommissionsFeesPage />);
    expect(screen.getByText('A. Commission Operations Health')).toBeInTheDocument();
    expect(screen.getByText('I. Quick Queues')).toBeInTheDocument();
  });
});
