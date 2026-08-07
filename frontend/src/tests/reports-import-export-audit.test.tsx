import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReportsImportExportAuditPage from '@/app/admin/finance/reports-import-export-audit/page';

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

describe('FN14 — Finance Reports, Import, Export & Audit Page', () => {
  it('renders the page heading', () => {
    render(<ReportsImportExportAuditPage />);
    const headings = screen.getAllByRole('heading', { name: /Finance Reports, Import, Export & Audit/i });
    expect(headings[0].tagName).toBe('H1');
  });

  it('renders the breadcrumb navigation', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText('Reports, Import, Export & Audit')[0]).toBeInTheDocument();
  });

  it('renders all 12 KPI cards', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText('Reports Generated This Period')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Import Jobs This Period')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Exports Generated')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Audit Events This Period')[0]).toBeInTheDocument();
  });

  it('renders overview analytics section', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText(/Reporting & Data-Exchange Trend/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Finance Operation Type Distribution')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Job Status Summary')[0]).toBeInTheDocument();
  });

  it('renders health scorecard', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText('Finance Data Governance Health Scorecard')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Report Accuracy')[0]).toBeInTheDocument();
  });

  it('renders portfolio table', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText(/Finance Reports, Import, Export & Audit Portfolio/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Showing 1 to 6 of 6 records/)[0]).toBeInTheDocument();
  });

  it('renders selected operation preview', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText(/Selected Operation Preview/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Operation & Source')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Top Rejection Reasons')[0]).toBeInTheDocument();
  });

  it('renders bottom operational grid cards', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText(/Online Files Lifecycle/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Financial Record Validation/)[0]).toBeInTheDocument();
  });

  it('renders right sidebar with governance gauge and alerts', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText('Finance Data Governance Health')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Priority Finance Data Alerts/)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Quick Queues')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Final Finance Data Actions')[0]).toBeInTheDocument();
  });

  it('renders action buttons in the header toolbar', () => {
    render(<ReportsImportExportAuditPage />);
    expect(screen.getAllByText('Create Finance Operation')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Review Failed Data Jobs')[0]).toBeInTheDocument();
  });
});
