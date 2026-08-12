import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ComplianceRulesCommandCenter from '@/components/admin/verification/rules-policies/ComplianceRulesCommandCenter';
import ComplianceReportsCommandCenter from '@/components/admin/verification/reports/ComplianceReportsCommandCenter';
import ComplianceImportExportAuditCommandCenter from '@/components/admin/verification/import-export-audit/ComplianceImportExportAuditCommandCenter';

vi.mock('@/lib/api/verificationCompliance', () => ({
    verificationComplianceApi: {
        getGovernanceDashboard: vi.fn().mockResolvedValue({
            context: { tenant: 'SL Beauty' },
            kpis: [],
            trend: [],
            ruleDomains: [],
            governanceStatuses: [],
            governanceHealth: [],
            rules: { data: [], meta: { current_page: 1, total: 0 } },
            health: { score: 0, statusText: 'No Data' },
            lastSynced: 'Just now',
        }),
        getReportsDashboard: vi.fn().mockResolvedValue({
            context: { tenant: 'SL Beauty' },
            kpis: [],
            healthTrend: [],
            riskDistribution: [],
            operationalStatus: [],
            health: { score: 0, state: 'No Data' },
            lastSynced: 'Just now',
        }),
        getImportExportAuditDashboard: vi.fn().mockResolvedValue({
            context: { tenant: 'SL Beauty' },
            kpis: [],
            trend: [],
            donut: [],
            jobs: { data: [], meta: { current_page: 1, total: 0 } },
            health: { score: 0, state: 'No Jobs' },
            lastSynced: 'Just now',
        }),
    },
}));

describe('Verification & Compliance Full Integration Tests (VC12, VC13, VC14)', () => {
    it('VC12: renders Compliance Rules & Policies CommandCenter with zero/empty data resilience', async () => {
        render(<ComplianceRulesCommandCenter />);
        expect(screen.getAllByText(/Compliance Rules, Policies, SLA & Escalations/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Total Compliance Rules/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Compliance Rule Portfolio/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Governance Intelligence Health/i)[0]).toBeInTheDocument();
    });

    it('VC13: renders Compliance Reports & Analytics CommandCenter with zero/empty data resilience', async () => {
        render(<ComplianceReportsCommandCenter />);
        expect(screen.getAllByText(/Compliance Reports & Analytics/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Trust Score/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Compliance Domain Performance/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Compliance Analytics Health/i)[0]).toBeInTheDocument();
    });

    it('VC14: renders Compliance Import, Export & Audit CommandCenter with zero/empty data resilience', async () => {
        render(<ComplianceImportExportAuditCommandCenter />);
        expect(screen.getAllByText(/Compliance Data Operations & Audit Log/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Imports This Period/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Compliance Data Job Portfolio/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Compliance Data Operations Health/i)[0]).toBeInTheDocument();
    });
});
