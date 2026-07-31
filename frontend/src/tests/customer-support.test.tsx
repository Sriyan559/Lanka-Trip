import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import CustomerSupportCasesPage from '@/app/admin/customer-support/cases/page';
import { SupportCaseTable } from '@/components/admin/customer-support/SupportCaseTable';
import { SupportOperationsHealth } from '@/components/admin/customer-support/SupportOperationsHealth';
import { PriorityAlerts } from '@/components/admin/customer-support/PriorityAlerts';
import { AgentWorkload } from '@/components/admin/customer-support/AgentWorkload';
import { QuickQueue } from '@/components/admin/customer-support/QuickQueue';
import { SentimentCaseMix } from '@/components/admin/customer-support/SentimentCaseMix';

import {
  fetchSupportCases,
  fetchSupportMetrics,
  createSupportCase,
  bulkAssignSupportCases,
  sendBulkResponse,
  exportSupportReportCSV,
} from '@/services/api/customerSupportService';
import {
  mockSupportCases,
  mockOperationsHealth,
  mockPriorityAlerts,
  mockAgentWorkload,
  mockQuickQueue,
  mockSentimentDistribution,
  mockCaseMixCategories,
} from '@/mocks/admin/customerSupport.mock';

vi.mock('next/navigation', () => {
  const dummyParams = new URLSearchParams();
  return {
    useSearchParams: () => dummyParams,
    useRouter: () => ({
      replace: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => '/admin/customer-support/cases',
    useParams: () => ({ caseId: '8241' }),
  };
});

describe('Customer Support Service & Adapters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches support cases with default parameters', async () => {
    const result = await fetchSupportCases();
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(0);
  });

  it('filters support cases by search query', async () => {
    const result = await fetchSupportCases({ search: 'Elena Rodriguez' });
    expect(result.data.every((c) => c.customerName.includes('Elena Rodriguez'))).toBe(true);
  });

  it('filters support cases by priority', async () => {
    const result = await fetchSupportCases({ priority: 'critical' });
    expect(result.data.every((c) => c.priority.toLowerCase() === 'critical')).toBe(true);
  });

  it('creates a new support case successfully', async () => {
    const res = await createSupportCase({
      customerName: 'Test Customer',
      caseCategory: 'Delivery Issue',
      issueType: 'Shipment Delayed',
      channel: 'Email',
      subject: 'Urgent inquiry about shipment delay',
      description: 'Package has not arrived after 5 business days.',
      priority: 'High',
    });
    expect(res.success).toBe(true);
    expect(res.caseReference).toContain('CS-2026-');
  });

  it('assigns cases in bulk', async () => {
    const res = await bulkAssignSupportCases({
      caseIds: ['8241', '8238'],
      assignedAgentName: 'Amaya Perera',
    });
    expect(res.success).toBe(true);
    expect(res.count).toBe(2);
  });

  it('sends bulk responses to selected cases', async () => {
    const res = await sendBulkResponse({
      caseIds: ['8241'],
      message: 'Status update sent to customer.',
    });
    expect(res.success).toBe(true);
  });

  it('generates CSV export data without error', () => {
    const csv = exportSupportReportCSV(mockSupportCases);
    expect(csv).toContain('Case Reference,DB Case ID,Priority');
    expect(csv).toContain('CS-2026-008241');
  });
});

describe('Screen 16: Customer Support Operations Dashboard Component & UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Customer Support Operations page header, title and description', async () => {
    render(<CustomerSupportCasesPage />);

    expect(screen.getByText('Customer Support Operations')).toBeInTheDocument();
    expect(
      screen.getByText(/Monitor customer inquiries, order complaints/i)
    ).toBeInTheDocument();
  });

  it('renders action toolbar buttons (Review Priority Cases, Create Support Case, Assign Cases, Send Bulk Response, Export Support Report)', async () => {
    render(<CustomerSupportCasesPage />);

    expect(screen.getByText('Review Priority Cases')).toBeInTheDocument();
    expect(screen.getByText('Create Support Case')).toBeInTheDocument();
    expect(screen.getByText('Assign Cases')).toBeInTheDocument();
    expect(screen.getByText('Send Bulk Response')).toBeInTheDocument();
    expect(screen.getByText('Export Support Report')).toBeInTheDocument();
  });

  it('renders 14 KPI summary cards with calculated values', async () => {
    render(<CustomerSupportCasesPage />);

    expect(screen.getByText('Total Open Cases')).toBeInTheDocument();
    expect(screen.getByText('1,286')).toBeInTheDocument();
    expect(screen.getByText('New Cases Today')).toBeInTheDocument();
    expect(screen.getAllByText('Unassigned Cases').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SLA At Risk').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SLA Breaches').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Safety Complaints').length).toBeGreaterThan(0);
  });

  it('renders quick filter chips with counts', async () => {
    render(<CustomerSupportCasesPage />);

    expect(screen.getAllByText('Unassigned').length).toBeGreaterThan(0);
    expect(screen.getByText('New Today')).toBeInTheDocument();
    expect(screen.getAllByText('Safety Complaint').length).toBeGreaterThan(0);
  });

  it('renders 25-column table with Open Case buttons linking to Screen 17 with internal DB ID', () => {
    render(
      <SupportCaseTable
        cases={mockSupportCases}
        total={mockSupportCases.length}
        page={1}
        pageSize={25}
        totalPages={1}
        selectedIds={[]}
        onSelectRow={vi.fn()}
        onSelectAllRows={vi.fn()}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByText('CS-2026-008241')).toBeInTheDocument();
    expect(screen.getByText('Elena Rodriguez')).toBeInTheDocument();

    const openCaseLinks = screen.getAllByText('Open Case');
    expect(openCaseLinks.length).toBeGreaterThan(0);
  });

  it('renders right-side operational intelligence panel (Operations Health, Priority Alerts, Agent Workload, Quick Queue, Sentiment)', () => {
    render(
      <div>
        <SupportOperationsHealth health={mockOperationsHealth} />
        <PriorityAlerts alerts={mockPriorityAlerts} />
        <AgentWorkload agents={mockAgentWorkload} />
        <QuickQueue items={mockQuickQueue} />
        <SentimentCaseMix sentiment={mockSentimentDistribution} caseMix={mockCaseMixCategories} />
      </div>
    );

    expect(screen.getByText('Support Operations Health')).toBeInTheDocument();
    expect(screen.getByText('Priority Alerts')).toBeInTheDocument();
    expect(screen.getByText('Agent Workload')).toBeInTheDocument();
    expect(screen.getByText('Quick Queue')).toBeInTheDocument();
    expect(screen.getByText('Customer Sentiment & Case Mix')).toBeInTheDocument();
  });

  it('opens Create Support Case modal when button is clicked', async () => {
    render(<CustomerSupportCasesPage />);

    const createBtn = screen.getByText('Create Support Case');
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(screen.getByText('Customer Name *')).toBeInTheDocument();
    });
  });
});

