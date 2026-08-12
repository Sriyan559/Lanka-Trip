import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SupplierDetailPage from '@/app/admin/brands-suppliers/suppliers/[supplierId]/page';
import SupplierOnboardingPage from '@/app/admin/brands-suppliers/suppliers/create/page';
import SupplierContractsPage from '@/app/admin/brands-suppliers/contracts/page';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        back: vi.fn(),
    }),
}));

vi.mock('@/lib/api/brandsSuppliers', () => ({
    brandsSuppliersApi: {
        getSupplierDetail: vi.fn().mockResolvedValue({
            supplier: {
                id: 'SUP-0001',
                raw_id: 1,
                company_name: 'Test Supplier Ltd',
                legal_name: 'Test Supplier Legal Ltd',
                business_type: 'distributor',
                email: 'test@supplier.com',
                phone: '+94 11 234 5678',
                country: 'Sri Lanka',
                status: 'active',
                verification_status: 'verified',
                risk_level: 'low',
                rating: 4.8,
                created_at: '2026-01-01',
            },
            contracts: [],
            certificates: [],
            brandAuthorizations: [],
            products: [],
            reviews: [],
        }),
        createSupplier: vi.fn().mockResolvedValue({ id: 1, company_name: 'New Supplier' }),
        updateSupplier: vi.fn().mockResolvedValue({ id: 1, company_name: 'Updated Supplier' }),
        getContractsDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Total Contracts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FileText' },
                { index: 2, title: 'Active Contracts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 3, title: 'Draft Contracts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FilePlus' },
                { index: 4, title: 'Pending Approval', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 5, title: 'Awaiting Signature', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FileText' },
                { index: 6, title: 'Renewals Due (30D)', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 7, title: 'Renewals Overdue', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 8, title: 'Expired Contracts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldAlert' },
                { index: 9, title: 'Missing Primary Contracts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FileText' },
                { index: 10, title: 'Compliance Issues', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 11, title: 'SLA Breaches', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 12, title: 'Terminated / Suspended', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldAlert' },
            ],
            trend: [],
            donut: [],
            health: { score: null, status: 'Not Assessed' },
            contracts: { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 },
            lastSynced: 'Just now',
        }),
    },
}));

describe('BS03, BS04 & BS09 Full Integration Tests', () => {
    it('BS03: renders Supplier Detail page with loaded supplier workspace', async () => {
        render(<SupplierDetailPage params={{ supplierId: '1' }} />);
        await waitFor(() => {
            expect(screen.getAllByText(/Test Supplier Ltd/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/SUP-0001/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Edit Supplier/i)[0]).toBeInTheDocument();
    });

    it('BS04: renders Supplier Onboarding / Create page with stepper form', () => {
        render(<SupplierOnboardingPage />);
        expect(screen.getAllByText(/Supplier Onboarding \/ Create/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/1. Company Identity & Details/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Supplier Display Name \*/i)[0]).toBeInTheDocument();
    });

    it('BS09: renders Supplier Contracts & Agreements page with zero/empty database resilience', async () => {
        render(<SupplierContractsPage />);
        expect(screen.getAllByText(/Supplier Contracts & Agreements/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Total Contracts/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/No contract records found for the selected filters./i)[0]).toBeInTheDocument();
    });
});
