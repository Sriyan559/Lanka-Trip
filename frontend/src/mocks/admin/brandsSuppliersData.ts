// Mock data specifically for Brands & Suppliers command center and other screens
export interface PrioritySupplier {
  id: string;
  name: string;
  type: string;
  country: string;
  progress: number;
  sla: string;
  assigned: string;
  status: string;
  risk: 'Low' | 'Medium' | 'High';
}

export interface PriorityAuthorization {
  id: string;
  brand: string;
  supplier: string;
  type: string;
  expiry: string;
  status: string;
  conflict: 'Clear' | 'Warning' | 'Overlap';
}

export const prioritySuppliers: PrioritySupplier[] = [
  { id: 'SUP-2026-001', name: 'Serene Botanics Lanka', type: 'Brand Owner', country: 'Sri Lanka', progress: 85, sla: '2h 15m', assigned: 'Elena Vance', status: 'Under Review', risk: 'Medium' },
  { id: 'SUP-2026-002', name: 'Ceylon Glow Exports', type: 'Distributor', country: 'Sri Lanka', progress: 40, sla: '1d 5h', assigned: 'Marco Lee', status: 'Info Requested', risk: 'High' },
  { id: 'SUP-2026-003', name: 'Velvet Botanics Ltd.', type: 'Brand Owner', country: 'United Kingdom', progress: 100, sla: 'Completed', assigned: 'Elena Vance', status: 'Approved', risk: 'Low' },
  { id: 'SUP-2026-004', name: 'LuxeSkin Wholesale', type: 'Wholesaler', country: 'Singapore', progress: 90, sla: '4h 10m', assigned: 'Priya Nair', status: 'Under Review', risk: 'High' },
  { id: 'SUP-2026-005', name: 'Ceylon Botanicals', type: 'Manufacturer', country: 'Sri Lanka', progress: 20, sla: 'Overdue', assigned: 'Marco Lee', status: 'Rejected', risk: 'High' },
  { id: 'SUP-2026-006', name: 'Tokyo Beauty Co.', type: 'Distributor', country: 'Japan', progress: 75, sla: '12h 30m', assigned: 'Priya Nair', status: 'Under Review', risk: 'Medium' }
];

export const priorityAuthorizations: PriorityAuthorization[] = [
  { id: 'AUTH-2026-041', brand: 'Aurora Skin', supplier: 'Serene Botanics Lanka', type: 'Exclusive', expiry: '2027-06-30', status: 'Pending Review', conflict: 'Clear' },
  { id: 'AUTH-2026-042', brand: 'Lumière Labs', supplier: 'Ceylon Glow Exports', type: 'Distributor', expiry: '2026-09-15', status: 'Escalated', conflict: 'Overlap' },
  { id: 'AUTH-2026-043', brand: 'L\'Oréal Paris', supplier: 'LuxeSkin Wholesale', type: 'Distributor', expiry: '2028-12-31', status: 'Approved', conflict: 'Clear' },
  { id: 'AUTH-2026-044', brand: 'Innisfree', supplier: 'Tokyo Beauty Co.', type: 'Sub-Agent', expiry: '2026-08-30', status: 'Pending Review', conflict: 'Warning' },
  { id: 'AUTH-2026-045', brand: 'CeraVe', supplier: 'Glow Global Exports', type: 'Exclusive', expiry: '2026-10-01', status: 'Awaiting Document', conflict: 'Clear' }
];

export const supplierMasterOverview = [
  { metric: 'Total Suppliers Onboarded', value: '842', trend: '+12 this month' },
  { metric: 'Active Suppliers', value: '768', trend: '91.2% activity rate' },
  { metric: 'Verified Suppliers', value: '612', trend: '72.7% of total' },
  { metric: 'Pending Verification', value: '128', trend: '15.2% of total' },
  { metric: 'Restricted / Suspended', value: '25', trend: '3.0% of total' },
  { metric: 'Average Onboarding Time', value: '4.2 Days', trend: 'Target: < 5 Days' },
];

export const brandSupplierMatrix = [
  { brand: 'Aurora Skin', suppliers: 3, exclusive: 'Serene Botanics Lanka', channels: 'Marketplace, B2B', status: 'Active' },
  { brand: 'Lumière Labs', suppliers: 2, exclusive: 'None', channels: 'Marketplace', status: 'Active' },
  { brand: 'L\'Oréal Paris', suppliers: 5, exclusive: 'LuxeSkin Wholesale', channels: 'All Channels', status: 'Active' },
  { brand: 'Innisfree', suppliers: 2, exclusive: 'Tokyo Beauty Co.', channels: 'Marketplace, Mobile', status: 'Under Review' },
  { brand: 'CeraVe', suppliers: 4, exclusive: 'None', channels: 'B2B', status: 'Active' },
  { brand: 'Cetaphil', suppliers: 3, exclusive: 'None', channels: 'Marketplace', status: 'Suspended' }
];

export const catalogueCoverageStats = [
  { category: 'Skincare', totalProducts: 3412, readyProducts: 3120, readyPercentage: '91.4%', gapsDetected: 14 },
  { category: 'Makeup', totalProducts: 2108, readyProducts: 1850, readyPercentage: '87.7%', gapsDetected: 32 },
  { category: 'Haircare', totalProducts: 1205, readyProducts: 1102, readyPercentage: '91.4%', gapsDetected: 8 },
  { category: 'Fragrance', totalProducts: 842, readyProducts: 780, readyPercentage: '92.6%', gapsDetected: 5 },
  { category: 'Personal Care', totalProducts: 612, readyProducts: 540, readyPercentage: '88.2%', gapsDetected: 19 }
];

export const performanceSLA = [
  { supplier: 'Serene Botanics Lanka', rating: '4.8 / 5.0', slaCompliance: '98.5%', orderFulfilment: '99.1%', status: 'Excellent' },
  { supplier: 'Ceylon Glow Exports', rating: '3.9 / 5.0', slaCompliance: '88.2%', orderFulfilment: '90.5%', status: 'Needs Attention' },
  { supplier: 'Velvet Botanics Ltd.', rating: '4.9 / 5.0', slaCompliance: '99.4%', orderFulfilment: '99.7%', status: 'Excellent' },
  { supplier: 'LuxeSkin Wholesale', rating: '4.2 / 5.0', slaCompliance: '91.8%', orderFulfilment: '93.2%', status: 'Good' },
  { supplier: 'Ceylon Botanicals', rating: '2.5 / 5.0', slaCompliance: '64.5%', orderFulfilment: '70.2%', status: 'Critical' },
  { supplier: 'Tokyo Beauty Co.', rating: '4.5 / 5.0', slaCompliance: '95.2%', orderFulfilment: '96.8%', status: 'Good' }
];

export const riskComplianceStats = [
  { domain: 'Legal & Commercial', issueCount: 8, riskLevel: 'Low', status: 'Stable' },
  { domain: 'Tax & Financial Audit', issueCount: 14, riskLevel: 'Medium', status: 'Audit Scheduled' },
  { domain: 'Product Safety & Licences', issueCount: 3, riskLevel: 'High', status: 'Action Required' },
  { domain: 'Brand Counterfeit Control', issueCount: 0, riskLevel: 'Low', status: 'Secure' },
  { domain: 'Sanctions & AML Check', issueCount: 2, riskLevel: 'High', status: 'Restricted' },
  { domain: 'Data Protection & Privacy', issueCount: 4, riskLevel: 'Medium', status: 'Reviewing' }
];

export const channelRegionEligibility = [
  { region: 'Sri Lanka (All)', marketplace: 'Eligible', mobileApp: 'Eligible', b2b: 'Eligible', retail: 'Eligible' },
  { region: 'India (South)', marketplace: 'Eligible', mobileApp: 'Eligible', b2b: 'Pending Review', retail: 'Restricted' },
  { region: 'Maldives', marketplace: 'Eligible', mobileApp: 'Eligible', b2b: 'Eligible', retail: 'Not Offered' },
  { region: 'Singapore', marketplace: 'Eligible', mobileApp: 'Eligible', b2b: 'Eligible', b2bGov: 'Restricted' }
];

export const verificationSLA = [
  { caseId: 'VER-2026-00321', type: 'New Supplier', targetHours: '24h', elapsedHours: '28h', state: 'SLA Breached', color: 'text-red-600' },
  { caseId: 'VER-2026-00322', type: 'Brand Authorization', targetHours: '48h', elapsedHours: '42h', state: 'Warning (6h left)', color: 'text-orange-600' },
  { caseId: 'VER-2026-00323', type: 'Commercial Review', targetHours: '24h', elapsedHours: '12h', state: 'On Track', color: 'text-green-600' },
  { caseId: 'VER-2026-00324', type: 'KYC Document Verification', targetHours: '12h', elapsedHours: '2h', state: 'On Track', color: 'text-green-600' },
  { caseId: 'VER-2026-00325', type: 'Risk Override Review', targetHours: '72h', elapsedHours: '70h', state: 'Warning (2h left)', color: 'text-orange-600' }
];
