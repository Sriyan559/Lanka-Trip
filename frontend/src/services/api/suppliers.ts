import { SupplierSummary } from './brandsSuppliers';

export interface SupplierDetail extends SupplierSummary {
  legalCompany: string;
  registrationNo: string;
  taxNumber: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  onboardingDate: string;
  recordVersion: string;
  lastUpdated: string;
  updatedBy: string;
  verificationReviewer: string;
}

export const suppliersApi = {
  getSuppliers: async (): Promise<SupplierSummary[]> => {
    return [
      {
        id: 'SUP-1002',
        name: 'LVMH Beauty Mfg.',
        type: 'Manufacturer',
        country: 'France',
        bu: 'F&S',
        activeBrands: 24,
        activeProducts: 186,
        verificationStatus: 'Verified',
        compliance: 'Compliant',
        authorizationCoverage: '92%',
        contractStatus: 'Active',
        catalogueReadiness: 'Complete',
        channelEligibility: 'All',
        regionCoverage: 'Global',
        performanceScore: '92/100',
        riskLevel: 'Low',
        owner: 'Elena Vance',
        updatedAt: '04 Aug 2026 11:35 AM'
      },
      {
        id: 'SUP-2845',
        name: 'Estée Lauder Dist. APAC',
        type: 'Distributor',
        country: 'USA',
        bu: 'MUP',
        activeBrands: 18,
        activeProducts: 142,
        verificationStatus: 'Verified',
        compliance: 'Compliant',
        authorizationCoverage: '88%',
        contractStatus: 'Active',
        catalogueReadiness: 'Complete',
        channelEligibility: 'All',
        regionCoverage: 'APAC',
        performanceScore: '88/100',
        riskLevel: 'Low',
        owner: 'Marco Lee',
        updatedAt: '04 Aug 2026 10:30 AM'
      },
      {
        id: 'SUP-2109',
        name: 'Cosmax Labs Korea',
        type: 'Contract Mfg.',
        country: 'South Korea',
        bu: 'R&D',
        activeBrands: 12,
        activeProducts: 96,
        verificationStatus: 'Verified',
        compliance: 'Compliant',
        authorizationCoverage: '85%',
        contractStatus: 'Active',
        catalogueReadiness: 'Complete',
        channelEligibility: 'All',
        regionCoverage: 'Asia',
        performanceScore: '86/100',
        riskLevel: 'Low',
        owner: 'Priya Nair',
        updatedAt: '04 Aug 2026 09:50 AM'
      },
      {
        id: 'SUP-3042',
        name: 'Boutique Retailers Inc.',
        type: 'Wholesaler',
        country: 'USA',
        bu: 'RT',
        activeBrands: 35,
        activeProducts: 312,
        verificationStatus: 'Suspended',
        compliance: 'Non-Compliant',
        authorizationCoverage: '45%',
        contractStatus: 'Restricted',
        catalogueReadiness: 'Partial',
        channelEligibility: 'Retail',
        regionCoverage: 'NA',
        performanceScore: '58/100',
        riskLevel: 'High',
        owner: 'David Kim',
        updatedAt: '03 Aug 2026 04:22 PM'
      },
      {
        id: 'SUP-3305',
        name: 'Glow Global Exports',
        type: 'Exporter',
        country: 'India',
        bu: 'MUP',
        activeBrands: 16,
        activeProducts: 128,
        verificationStatus: 'Pending',
        compliance: 'Needs Review',
        authorizationCoverage: '60%',
        contractStatus: 'Active',
        catalogueReadiness: 'Partial',
        channelEligibility: 'Global',
        regionCoverage: 'MENA',
        performanceScore: '72/100',
        riskLevel: 'Medium',
        owner: 'Aisha Rahman',
        updatedAt: '03 Aug 2026 02:10 PM'
      }
    ];
  },

  getSupplierById: async (id: string): Promise<SupplierDetail | null> => {
    // Return a mocked full supplier
    return {
      id: id,
      name: 'Luxe Distribution Pvt Ltd',
      legalCompany: 'Luxe Distribution (Pvt) Ltd',
      type: 'Distributor',
      registrationNo: 'PV 123456',
      taxNumber: '114-254-789-000',
      primaryContact: {
        name: 'Priya Nair',
        email: 'priya.nair@luxedistribution.lk',
        phone: '+94 11 234 5678'
      },
      country: 'Sri Lanka',
      bu: 'Consumer Beauty',
      activeBrands: 12,
      activeProducts: 428,
      verificationStatus: 'Verified',
      compliance: 'Compliant',
      authorizationCoverage: '92%',
      contractStatus: 'Active',
      catalogueReadiness: 'Ready',
      channelEligibility: 'All',
      regionCoverage: 'South Asia',
      performanceScore: '98.5%',
      riskLevel: 'Low',
      owner: 'Elena Vance',
      verificationReviewer: 'Marco Lee',
      recordVersion: 'v3.2',
      updatedAt: '04 Aug 2026, 12:57 AM',
      lastUpdated: '04 Aug 2026, 12:57 AM',
      updatedBy: 'Elena Vance',
      onboardingDate: '15 Mar 2024'
    };
  }
};
