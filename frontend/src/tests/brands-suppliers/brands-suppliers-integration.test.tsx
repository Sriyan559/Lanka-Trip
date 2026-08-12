import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import BrandsSuppliersCommandCenter from '@/app/admin/brands-suppliers/page';
import SupplierManagementPage from '@/app/admin/brands-suppliers/suppliers/page';

vi.mock('@/lib/api/brandsSuppliers', () => ({
    brandsSuppliersApi: {
        getSuppliersDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Total Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Users' },
                { index: 2, title: 'Active Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'UserCheck' },
                { index: 3, title: 'Verified Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 4, title: 'Pending Verification', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Hourglass' },
                { index: 5, title: 'New Applications', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FilePlus' },
                { index: 6, title: 'Information Requested', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 7, title: 'High-Risk Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 8, title: 'Restricted Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'PauseCircle' },
                { index: 9, title: 'Suspended Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'PauseCircle' },
                { index: 10, title: 'Missing Primary Contracts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'FileText' },
                { index: 11, title: 'Expiring Documents', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 12, title: 'Archived Suppliers', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Users' },
            ],
            trend: [],
            composition: [],
            statusSummary: [],
            masterOverview: { totalRegistered: 0, activeVerified: 0, activeCountries: 0, avgOnboardingTime: 'N/A' },
            relationshipMatrix: { totalBrands: 0, authorizedResellers: 0, exclusiveRights: 0, pendingLegalAudit: 0 },
            catalogueCoverage: { totalSkusSupplied: 0, categoriesCovered: 0, coverageGapSkus: 0, readinessScore: '0%' },
            contractsSummary: { activeContracts: 0, renewalsDue: 0, expiredContracts: 0, avgTenure: 'N/A' },
            quickQueues: { myReviews: 0, pendingVerification: 0, highRiskCases: 0, expiringAuthorizations: 0, contractRenewals: 0, catalogueGaps: 0 },
            health: { score: null, status: 'Not Assessed' },
            suppliers: { data: [], meta: { current_page: 1, per_page: 15, total: 0, last_page: 1 } },
            lastSynced: 'Just now',
        }),
    },
}));

describe('BS01 + BS02 Brands & Suppliers Full Integration Tests', () => {
    it('BS01: renders Brands & Suppliers Command Center with zero/empty database resilience', async () => {
        render(<BrandsSuppliersCommandCenter />);
        expect(screen.getAllByText(/Brands & Suppliers Command Center/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Total Suppliers/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/Supplier Master Overview/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Relationship Matrix/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Catalogue Coverage/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Contracts & Agreements/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Brands & Suppliers Health/i)[0]).toBeInTheDocument();
    });

    it('BS02: renders Supplier Management with zero/empty database resilience', async () => {
        render(<SupplierManagementPage />);
        expect(screen.getAllByText(/Supplier Management/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Total Suppliers/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/Supplier Name \/ Legal Entity/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/No supplier records found for the selected filters./i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/No supplier selected/i)[0]).toBeInTheDocument();
    });
});
