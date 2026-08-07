export interface ProductApprovalSummary {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  brand: string;
  supplier: string;
  category: string;
  completeness: number;
  brandAuthorization: 'Valid' | 'Pending' | 'Missing';
  complianceState: 'Valid' | 'Pending' | 'High Risk' | 'Medium Risk';
  riskLevel: 'Low' | 'Medium' | 'High';
  submittedDate: string;
  sla: string;
  slaStatus: 'Within SLA' | 'Breached';
  assignedReviewer: string;
  stage: 'Initial Review' | 'Brand Authorization' | 'Compliance Review' | 'Information Requested' | 'Final Decision';
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Information Requested' | 'Approved' | 'Rejected' | 'Published';
}

export const productApprovalsApi = {
  getApprovalKPIs: async () => {
    return [
      { id: '1', label: 'Pending Approval', value: 312, trend: '+8.2%', trendDirection: 'up', status: 'neutral' },
      { id: '2', label: 'Initial Review', value: 126, trend: '+4.1%', trendDirection: 'up', status: 'warning' },
      { id: '3', label: 'Brand Auth Review', value: 48, trend: '+2.1%', trendDirection: 'up', status: 'warning' },
      { id: '4', label: 'Compliance Review', value: 36, trend: '-1.4%', trendDirection: 'down', status: 'warning' },
      { id: '5', label: 'Info Requested', value: 42, trend: '+12.4%', trendDirection: 'up', status: 'info' },
      { id: '6', label: 'Final Decision', value: 28, trend: '+3.2%', trendDirection: 'up', status: 'warning' },
      { id: '7', label: 'SLA At Risk', value: 14, trend: '+2.4%', trendDirection: 'up', status: 'danger' },
      { id: '8', label: 'SLA Breached', value: 9, trend: '-1.1%', trendDirection: 'down', status: 'danger' },
      { id: '9', label: 'Approved Today', value: 24, trend: '+5.6%', trendDirection: 'up', status: 'success' },
      { id: '10', label: 'Rejected Today', value: 3, trend: '-2.1%', trendDirection: 'down', status: 'danger' },
    ];
  },
  
  getApprovals: async (): Promise<ProductApprovalSummary[]> => {
    return [
      {
        id: 'AUTH-2023-0892',
        productId: 'PROD-1029',
        productName: 'Radiance Vitamin C Serum',
        sku: 'RVC-SER-30ML',
        brand: 'Estée Lauder',
        supplier: 'Luxe Distribution Pvt Ltd',
        category: 'Skincare',
        completeness: 85,
        brandAuthorization: 'Valid',
        complianceState: 'Pending',
        riskLevel: 'High',
        submittedDate: '24 Oct 2024',
        sla: '3 days',
        slaStatus: 'Within SLA',
        assignedReviewer: 'Elena Vance',
        stage: 'Initial Review',
        status: 'Under Review'
      },
      {
        id: 'AUTH-2023-0911',
        productId: 'PROD-1030',
        productName: 'Tokyo Brightening Essence',
        sku: 'TOK-BRT-100ML',
        brand: 'Shiseido',
        supplier: 'Glow Global Exports',
        category: 'Skincare',
        completeness: 70,
        brandAuthorization: 'Pending',
        complianceState: 'Pending',
        riskLevel: 'Medium',
        submittedDate: '22 Oct 2024',
        sla: '2 days',
        slaStatus: 'Within SLA',
        assignedReviewer: 'Marcus Lee',
        stage: 'Brand Authorization',
        status: 'Under Review'
      },
      {
        id: 'AUTH-2023-0785',
        productId: 'PROD-1031',
        productName: 'Luxe Silk Lipstick Ruby Red',
        sku: 'LUX-LIPS-R001',
        brand: 'Chanel Beauty',
        supplier: 'Vertex Logistics Hub',
        category: 'Makeup',
        completeness: 92,
        brandAuthorization: 'Valid',
        complianceState: 'Valid',
        riskLevel: 'Low',
        submittedDate: '23 Oct 2024',
        sla: '5 days',
        slaStatus: 'Within SLA',
        assignedReviewer: 'Priya Kapoor',
        stage: 'Compliance Review',
        status: 'Under Review'
      },
      {
        id: 'AUTH-2023-0944',
        productId: 'PROD-1032',
        productName: 'Hydrating Night Cream 50ml',
        sku: 'HYD-NC-50ML',
        brand: 'Clinique',
        supplier: 'Pure Glow Distributors',
        category: 'Skincare',
        completeness: 65,
        brandAuthorization: 'Valid',
        complianceState: 'Medium Risk',
        riskLevel: 'Medium',
        submittedDate: '21 Oct 2024',
        sla: 'Overdue by 1 day',
        slaStatus: 'Breached',
        assignedReviewer: 'Elena Vance',
        stage: 'Information Requested',
        status: 'Information Requested'
      },
      {
        id: 'AUTH-2023-0822',
        productId: 'PROD-1033',
        productName: 'Matte Finish Foundation SPF15',
        sku: 'MAT-FND-SPF15',
        brand: 'MAC Cosmetics',
        supplier: 'Cosmetic Solutions Inc.',
        category: 'Makeup',
        completeness: 98,
        brandAuthorization: 'Valid',
        complianceState: 'Valid',
        riskLevel: 'Low',
        submittedDate: '25 Oct 2024',
        sla: '7 days',
        slaStatus: 'Within SLA',
        assignedReviewer: 'Unassigned',
        stage: 'Initial Review',
        status: 'Submitted'
      }
    ];
  },

  getApprovalById: async (id: string) => {
    return {
      id: id,
      productId: 'PROD-1029',
      productName: 'Radiance Vitamin C Serum',
      sku: 'RVC-SER-30ML',
      barcode: '8901234567895',
      brand: 'Estée Lauder',
      supplier: 'Luxe Distribution Pvt Ltd',
      category: 'Skincare > Face Serum',
      productType: 'Finished Cosmetic Product',
      primaryVariant: '30 ml',
      countryOfOrigin: 'USA',
      stage: 'Compliance Review',
      status: 'Under Review',
      submittedDate: '24 Oct 2024, 10:25 AM',
      submittedBy: 'Priya Kapoor',
      reviewer: 'Elena Vance',
      slaRemaining: '18h 45m',
      riskLevel: 'High',
      recordVersion: 'v2',
      metrics: {
        identity: 100,
        classification: 94,
        brandVerification: 96,
        complianceReadiness: 72,
        variantReadiness: 100,
        mediaReadiness: 80,
        inventoryLinkage: 100,
        publicationReadiness: 68,
        duplicateRisk: 'Low',
        openIssues: 3,
      }
    };
  }
};
