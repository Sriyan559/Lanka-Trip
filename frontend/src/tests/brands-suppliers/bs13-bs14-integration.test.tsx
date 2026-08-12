import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SupplierUsersAccessPage from '@/app/admin/brands-suppliers/users-access/page';
import SupplierImportExportAuditPage from '@/app/admin/brands-suppliers/import-export-audit/page';

vi.mock('@/lib/api/brandsSuppliers', () => ({
    brandsSuppliersApi: {
        getUsersAccessDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Total Supplier Users', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Users' },
                { index: 2, title: 'Active Users', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'UserCheck' },
                { index: 3, title: 'Pending Invitations', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 4, title: 'Suspended Users', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 5, title: 'Privileged Users', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 6, title: 'MFA Enforced', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 7, title: 'MFA Missing', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 8, title: 'Dormant Accounts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 9, title: 'Access Reviews Due', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 10, title: 'Excessive Access Risks', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 11, title: 'Service Principals', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'ShieldCheck' },
                { index: 12, title: 'Expired Access Assignments', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
            ],
            trend: [],
            donut: [],
            health: { score: null, status: 'Not Assessed' },
            users: { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 },
            lastSynced: 'Just now',
        }),
        getImportExportAuditDashboard: vi.fn().mockResolvedValue({
            kpis: [
                { index: 1, title: 'Imports This Month', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Layers' },
                { index: 2, title: 'Successful Imports', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'CheckCircle2' },
                { index: 3, title: 'Partial Imports', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 4, title: 'Failed Imports', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 5, title: 'Records Processed', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Layers' },
                { index: 6, title: 'Records Rejected', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 7, title: 'Mapping Issues', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertTriangle' },
                { index: 8, title: 'Duplicate Conflicts', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 9, title: 'Exports Generated', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Layers' },
                { index: 10, title: 'Scheduled Exports', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
                { index: 11, title: 'Export Failures', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'AlertCircle' },
                { index: 12, title: 'Pending Review Jobs', value: '0', delta: { value: '0%', trend: 'neutral' }, icon: 'Clock' },
            ],
            trend: [],
            donut: [],
            health: { score: null, status: 'Not Assessed' },
            jobs: { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 },
            lastSynced: 'Just now',
        }),
    },
}));

describe('BS13 & BS14 Full Integration Tests', () => {
    it('BS13: renders Supplier Users, Roles & Access page with zero/empty database resilience', async () => {
        render(<SupplierUsersAccessPage />);
        expect(screen.getAllByText(/Supplier Users, Roles & Access/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Total Supplier Users/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/No supplier users found for the selected filters./i)[0]).toBeInTheDocument();
    });

    it('BS14: renders Supplier Import, Export & Audit page with zero/empty database resilience', async () => {
        render(<SupplierImportExportAuditPage />);
        expect(screen.getAllByText(/Supplier Import, Export & Audit/i)[0]).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByText(/Imports This Month/i)[0]).toBeInTheDocument();
        });
        expect(screen.getAllByText(/Active Import Workflow Stages/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/No supplier data jobs found for the selected filters./i)[0]).toBeInTheDocument();
    });
});
