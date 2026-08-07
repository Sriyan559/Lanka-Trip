export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  status?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export interface SupplierSummary {
  id: string;
  name: string;
  type: string;
  country: string;
  bu: string;
  activeBrands: number;
  activeProducts: number;
  verificationStatus: string;
  compliance: string;
  authorizationCoverage: string;
  contractStatus: string;
  catalogueReadiness: string;
  channelEligibility: string;
  regionCoverage: string;
  performanceScore: string;
  riskLevel: string;
  owner: string;
  updatedAt: string;
}

// Mock API for Brands & Suppliers module
export const brandsSuppliersApi = {
  getCommandCenterKPIs: async (): Promise<KPIMetric[]> => {
    return [
      { id: '1', label: 'Total Suppliers', value: 842, trend: '+2.1%', trendDirection: 'up', status: 'neutral' },
      { id: '2', label: 'Active Suppliers', value: 768, trend: '+4.6%', trendDirection: 'up', status: 'success' },
      { id: '3', label: 'Verified Suppliers', value: 612, trend: '+3.2%', trendDirection: 'up', status: 'success' },
      { id: '4', label: 'Pending Verification', value: 128, trend: '+5.7%', trendDirection: 'up', status: 'warning' },
      { id: '5', label: 'New Applications', value: 42, trend: '+7.7%', trendDirection: 'up', status: 'info' },
      { id: '6', label: 'Information Requested', value: 31, trend: '+9.1%', trendDirection: 'up', status: 'info' },
      { id: '7', label: 'High-Risk Suppliers', value: 12, trend: '+8.1%', trendDirection: 'up', status: 'danger' },
      { id: '8', label: 'Restricted Suppliers', value: 16, trend: '+3.4%', trendDirection: 'up', status: 'danger' },
      { id: '9', label: 'Suspended Suppliers', value: 9, trend: '0.0%', trendDirection: 'neutral', status: 'neutral' },
      { id: '10', label: 'Missing Primary Contracts', value: 26, trend: '+4.0%', trendDirection: 'up', status: 'warning' },
      { id: '11', label: 'Expiring Documents', value: 18, trend: '+12.5%', trendDirection: 'down', status: 'warning' },
      { id: '12', label: 'Archived Suppliers', value: 24, trend: '+7.2%', trendDirection: 'up', status: 'neutral' },
    ];
  },
  
  getSupplierComposition: async () => {
    return [
      { name: 'Brand Owners', value: 248, percentage: '29.5%', color: '#2563eb' },
      { name: 'Distributors', value: 214, percentage: '25.4%', color: '#f59e0b' },
      { name: 'Importers', value: 138, percentage: '16.4%', color: '#10b981' },
      { name: 'Wholesalers', value: 112, percentage: '13.3%', color: '#6366f1' },
      { name: 'Labs', value: 72, percentage: '8.6%', color: '#0ea5e9' },
      { name: 'Service Partners', value: 58, percentage: '6.9%', color: '#8b5cf6' },
    ];
  },

  getRecentActivity: async () => {
    return [
      { id: '1', date: '04 Aug 2026, 11:35 AM', activity: 'Supplier application submitted', entityType: 'Supplier', entityName: 'Velvet Botanics', reference: 'SUP-2026-004582', user: 'Elena Vance', status: 'New', details: 'New supplier application received' },
      { id: '2', date: '04 Aug 2026, 10:30 AM', activity: 'Brand authorization approved', entityType: 'Authorization', entityName: 'L\'Oréal', reference: 'AUTH-2026-00821', user: 'Marco Lee', status: 'Approved', details: 'Brand authorization approved' },
      { id: '3', date: '04 Aug 2026, 09:50 AM', activity: 'KYC documents uploaded', entityType: 'Supplier', entityName: 'Cosmax Labs Korea', reference: 'SUP-2026-004571', user: 'Priya Nair', status: 'Updated', details: 'KYC and tax documents uploaded' },
      { id: '4', date: '04 Aug 2026, 09:15 AM', activity: 'Contract renewal reminder sent', entityType: 'Contract', entityName: 'Boutique Retailers Inc.', reference: 'CON-2025-00654', user: 'System', status: 'Info', details: 'Renewal reminder sent (30 days)' },
      { id: '5', date: '04 Aug 2026, 08:42 AM', activity: 'SLA breach recorded', entityType: 'Verification', entityName: 'Glow Global Exports', reference: 'VER-2026-00321', user: 'System', status: 'Alert', details: 'Verification SLA breached' },
    ];
  }
};
