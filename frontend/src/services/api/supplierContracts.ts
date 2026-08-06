import { KPIMetric } from './brandsSuppliers';

export const supplierContractsApi = {
  getContractsKPIs: async (): Promise<KPIMetric[]> => {
    return [
      { id: '1', label: 'Total Contracts', value: 842, trend: '+2.1%', trendDirection: 'up', status: 'neutral' },
      { id: '2', label: 'Active Contracts', value: 612, trend: '+4.4%', trendDirection: 'up', status: 'success' },
      { id: '3', label: 'Draft Contracts', value: 54, trend: '+3.2%', trendDirection: 'up', status: 'neutral' },
      { id: '4', label: 'Pending Approval', value: 28, trend: '+5.7%', trendDirection: 'up', status: 'warning' },
      { id: '5', label: 'Awaiting Signature', value: 22, trend: '+7.7%', trendDirection: 'up', status: 'warning' },
      { id: '6', label: 'Renewals Due (30 Days)', value: 26, trend: '+4.0%', trendDirection: 'up', status: 'danger' },
      { id: '7', label: 'Renewals Overdue', value: 9, trend: '+1.8%', trendDirection: 'down', status: 'danger' },
      { id: '8', label: 'Expired Contracts', value: 31, trend: '+6.6%', trendDirection: 'up', status: 'danger' },
      { id: '9', label: 'Missing Primary Contracts', value: 24, trend: '+2.7%', trendDirection: 'down', status: 'warning' },
      { id: '10', label: 'Contract Compliance Issues', value: 18, trend: '+3.1%', trendDirection: 'up', status: 'danger' },
      { id: '11', label: 'SLA Breaches', value: 12, trend: '+9.1%', trendDirection: 'down', status: 'danger' },
      { id: '12', label: 'Terminated / Suspended', value: 14, trend: '+0.7%', trendDirection: 'neutral', status: 'neutral' },
    ];
  },

  getContracts: async () => {
    return [
      { id: 'CON-2026-0091', supplier: 'Luxe Distribution Pvt Ltd', type: 'Master Supply', status: 'Active', renewalStatus: 'Due in 45 Days', signatureStatus: 'Signed', compliance: 'Compliant' },
      { id: 'CON-2026-0031', supplier: 'Tokyo Beauty Distribution Agreement', type: 'Distribution', status: 'Active', renewalStatus: 'Due in 132 Days', signatureStatus: 'Awaiting Signature', compliance: 'Compliant' },
      { id: 'CON-2026-0042', supplier: 'Pure Glow Import Contract', type: 'Importer', status: 'Active', renewalStatus: 'Due in 21 Days', signatureStatus: 'Signed', compliance: 'Medium Risk' },
      { id: 'CON-2026-0019', supplier: 'Velvet Botanics Channel Supply MSA', type: 'Master Supply', status: 'Active', renewalStatus: 'Due in 60 Days', signatureStatus: 'Partially Signed', compliance: 'Compliant' },
      { id: 'CON-2026-0012', supplier: 'Shirodo Regional Reseller Agreement', type: 'Reseller', status: 'Active', renewalStatus: 'Due in 27 Days', signatureStatus: 'Signed', compliance: 'High Risk' },
      { id: 'CON-2026-0307', supplier: 'Brand Authorization Support Contract', type: 'Services', status: 'Expired', renewalStatus: 'Overdue (31 days)', signatureStatus: 'Awaiting Signature', compliance: 'Caution' }
    ];
  }
};
