import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SupplierCatalogueCoveragePage from '@/app/admin/brands-suppliers/catalogue-coverage/page';
import SupplierPerformancePage from '@/app/admin/brands-suppliers/performance/page';
import SupplierRiskCompliancePage from '@/app/admin/brands-suppliers/risk-compliance/page';

vi.mock('@/lib/api/brandsSuppliers', () => ({
    brandsSuppliersApi: {
        getCatalogueCoverageDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Total Supplier Products', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Package' },
                { index: 2, title: 'Active Products', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'CheckCircle2' },
                { index: 3, title: 'Pending Approval', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 4, title: 'Draft Products', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FileText' },
                { index: 5, title: 'Incomplete Products', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 6, title: 'Missing Authorization', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Layers' },
                { index: 7, title: 'Missing Inventory', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Package' },
                { index: 8, title: 'Missing Mandatory Media', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 9, title: 'Publication-Ready', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'CheckCircle2' },
                { index: 10, title: 'Publication Blocked', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 11, title: 'Duplicate Product Risks', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 12, title: 'Catalogue SLA Breaches', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
            ],
            trend: [],
            donut: [],
            health: { score: null, status: 'Not Assessed' },
            products: { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 },
            lastSynced: 'Just now',
        }),
        getPerformanceDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Average Supplier Score', value: '0.0 / 5.0', delta: { value: '0%', trend: 'neutral' }, icon: 'Award' },
                { index: 2, title: 'Suppliers Meeting SLA', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'CheckCircle2' },
                { index: 3, title: 'Suppliers At Risk', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 4, title: 'Suppliers Breaching SLA', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 5, title: 'Avg Confirmation Rate', value: '0%', delta: { value: '0%', trend: 'neutral' }, icon: 'CheckCircle2' },
                { index: 6, title: 'Avg Fulfilment Rate', value: '0%', delta: { value: '0%', trend: 'neutral' }, icon: 'Award' },
                { index: 7, title: 'On-Time Dispatch', value: '0%', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 8, title: 'Cancellation Rate', value: '0%', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 9, title: 'Return Rate', value: '0%', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 10, title: 'Open Improvement Plans', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 11, title: 'Performance Escalations', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 12, title: 'Service Credits at Risk', value: 'LKR 0', delta: { value: '0%', trend: 'neutral' }, icon: 'Award' },
            ],
            trend: [],
            donut: [],
            health: { score: null, status: 'Not Assessed' },
            suppliers: { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 },
            lastSynced: 'Just now',
        }),
        getRiskComplianceDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Overall Supplier Risk Score', value: '—', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 2, title: 'Low-Risk Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 3, title: 'Medium-Risk Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 4, title: 'High-Risk Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 5, title: 'Critical-Risk Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 6, title: 'Open Compliance Cases', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 7, title: 'Compliance SLA Breaches', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 8, title: 'Expiring Documents', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 9, title: 'Authorization Risks', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 10, title: 'Contract Compliance Issues', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 11, title: 'Restricted Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 12, title: 'Suspended Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
            ],
            trend: [],
            donut: [],
            health: { score: null, status: 'Not Assessed' },
            suppliers: { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 },
            lastSynced: 'Just now',
        }),
    },
}));

describe('BS10, BS11 & BS12 Full Integration Tests', () => {
    it('BS10: renders Supplier Product & Catalogue Coverage page with zero/empty database resilience', async () => {
        render(<SupplierCatalogueCoveragePage />);
        expect(screen.getAllByText(/Supplier Product & Catalogue Coverage/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Total Supplier Products/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/No supplier products found for the selected filters./i)[0]).toBeInTheDocument();
    });

    it('BS11: renders Supplier Performance & SLA page with zero/empty database resilience', async () => {
        render(<SupplierPerformancePage />);
        expect(screen.getAllByText(/Supplier Performance & SLA/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Average Supplier Score/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/No supplier performance records found for the selected filters./i)[0]).toBeInTheDocument();
    });

    it('BS12: renders Supplier Risk & Compliance page with zero/empty database resilience', async () => {
        render(<SupplierRiskCompliancePage />);
        expect(screen.getAllByText(/Supplier Risk & Compliance/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Overall Supplier Risk Score/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/No supplier risk records found for the selected filters./i)[0]).toBeInTheDocument();
    });
});
