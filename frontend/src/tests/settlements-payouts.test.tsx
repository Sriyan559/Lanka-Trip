import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SettlementsPayoutsPage from '@/app/admin/finance/settlements-payouts/page';

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

describe('FN09 — Settlements & Payouts Page', () => {
  it('renders the header title and key section headings', () => {
    render(<SettlementsPayoutsPage />);
    expect(screen.getAllByText('Settlements & Payouts')[0]).toBeInTheDocument();
    expect(screen.getByText('Settlement & Payout Trend (Last 30 Days)')).toBeInTheDocument();
    expect(screen.getByText('Beneficiary Type Distribution')).toBeInTheDocument();
    expect(screen.getByText('Settlement & Payout Status Summary')).toBeInTheDocument();
  });

  it('renders KPI cards and portfolio table', () => {
    render(<SettlementsPayoutsPage />);
    expect(screen.getByText('Total Settlement Liability')).toBeInTheDocument();
    expect(screen.getByText('Settlement Batches Open')).toBeInTheDocument();
    expect(screen.getByText('Settlements & Payouts Portfolio')).toBeInTheDocument();
  });

  it('renders the right sidebar health scorecard and quick queues', () => {
    render(<SettlementsPayoutsPage />);
    expect(screen.getByText('Settlement Operations Health')).toBeInTheDocument();
    expect(screen.getByText('Quick Queues')).toBeInTheDocument();
  });
});
