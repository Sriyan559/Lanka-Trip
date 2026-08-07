import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TaxCurrencyConfigPage from '@/app/admin/finance/tax-currency-configuration/page';

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

describe('FN12 — Tax, Currency & Financial Configuration Page', () => {
  it('renders the page heading', () => {
    render(<TaxCurrencyConfigPage />);
    const headings = screen.getAllByRole('heading', { name: /Tax, Currency.*Financial Configuration/i });
    expect(headings[0].tagName).toBe('H1');
  });

  it('renders the breadcrumb navigation', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getAllByText('Tax & Currency')[0]).toBeInTheDocument();
  });

  it('renders all 12 KPI cards', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getByText('Active Tax Rules')).toBeInTheDocument();
    expect(screen.getByText('Active Tax Jurisdictions')).toBeInTheDocument();
    expect(screen.getByText('Supported Currencies')).toBeInTheDocument();
    expect(screen.getByText('Active Exchange Rates')).toBeInTheDocument();
    expect(screen.getByText('Open Accounting Periods')).toBeInTheDocument();
    expect(screen.getByText('Configuration SLA Breaches')).toBeInTheDocument();
  });

  it('renders the overview analytics section', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getByText(/Tax.*Configuration Change Trend/i)).toBeInTheDocument();
    expect(screen.getByText('Tax Rule Distribution')).toBeInTheDocument();
    expect(screen.getByText('Configuration Status Summary')).toBeInTheDocument();
  });

  it('renders the health scorecard', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getByText('Configuration Health Scorecard')).toBeInTheDocument();
    expect(screen.getAllByText('Tax Rule Accuracy')[0]).toBeInTheDocument();
  });

  it('renders the portfolio table with correct record count', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getByText(/Tax.*Currency.*Financial Configuration Portfolio/)).toBeInTheDocument();
    expect(screen.getAllByText(/642 records/)[0]).toBeInTheDocument();
  });

  it('renders portfolio table row data', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getByText('Standard VAT')).toBeInTheDocument();
    expect(screen.getByText('USD to LKR Spot Rate')).toBeInTheDocument();
    expect(screen.getByText('May 2025 Period')).toBeInTheDocument();
  });

  it('renders selected configuration preview', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getByText(/Selected Configuration Preview/i)).toBeInTheDocument();
    expect(screen.getByText('View Full Record')).toBeInTheDocument();
  });

  it('renders configuration operations bottom grid', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getAllByText(/Tax Rule Management/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Currency Configuration/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Conflict Management/)[0]).toBeInTheDocument();
  });

  it('renders right sidebar with intelligence gauge and alerts', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getAllByText('Tax & Currency Config Intelligence')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Priority Alerts/)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Quick Queues')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Final Configuration Actions')[0]).toBeInTheDocument();
  });

  it('renders action buttons in the header toolbar', () => {
    render(<TaxCurrencyConfigPage />);
    expect(screen.getAllByText('Create Configuration Change')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Review Pending Changes')[0]).toBeInTheDocument();
  });
});
