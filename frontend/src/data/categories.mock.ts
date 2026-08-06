import {
  CategoryItem,
  HierarchyNode,
  CategoryKpiItem,
  CategoryStatusTab,
  AttributeCoverageItem,
  ProductCoverageLevelItem,
  ChannelEligibilityRow,
  DuplicateCategoryPair,
  UncategorizedQueueSummary,
  CategoryActivityItem,
  CategoryComplianceRuleItem,
  GovernanceAuditItem,
} from '../types/categoryManagement';

export const CATEGORY_KPIS: CategoryKpiItem[] = [
  { id: 'kpi-1', label: 'Total Categories', value: 148, changeText: '▲ 2.4%', isPositive: true, filterKey: 'all' },
  { id: 'kpi-2', label: 'Active Categories', value: 132, changeText: '▲ 3.1%', isPositive: true, filterKey: 'active' },
  { id: 'kpi-3', label: 'Departments', value: 8, changeText: '— 0%', isPositive: true, filterKey: 'all' },
  { id: 'kpi-4', label: 'Subcategories', value: 96, changeText: '▲ 1.8%', isPositive: true, filterKey: 'all' },
  { id: 'kpi-5', label: 'Empty Categories', value: 8, changeText: '▼ 11.1%', isPositive: false, filterKey: 'empty' },
  { id: 'kpi-6', label: 'Uncategorized Products', value: 22, changeText: '▼ 8.3%', isPositive: false, filterKey: 'uncategorized' },
  { id: 'kpi-7', label: 'Review Required', value: 14, changeText: '▼ 6.7%', isPositive: false, filterKey: 'review' },
  { id: 'kpi-8', label: 'Missing Attributes', value: 18, changeText: '▲ 5.9%', isPositive: false, filterKey: 'missing' },
  { id: 'kpi-9', label: 'Duplicate Risks', value: 6, changeText: '▼ 14.3%', isPositive: false, filterKey: 'duplicates' },
  { id: 'kpi-10', label: 'Channel Conflicts', value: 9, changeText: '▲ 12.5%', isPositive: false, filterKey: 'conflicts' },
  { id: 'kpi-11', label: 'Compliance Gaps', value: 12, changeText: '▼ 7.7%', isPositive: false, filterKey: 'compliance' },
  { id: 'kpi-12', label: 'Archived', value: 16, changeText: '▲ 2.1%', isPositive: true, filterKey: 'archived' },
];

export const CATEGORY_STATUS_TABS: CategoryStatusTab[] = [
  { id: 'all', label: 'All Categories', count: 148 },
  { id: 'active', label: 'Active', count: 132 },
  { id: 'draft', label: 'Draft', count: 8 },
  { id: 'review', label: 'Review Required', count: 14 },
  { id: 'missing', label: 'Missing Attributes', count: 18 },
  { id: 'duplicates', label: 'Duplicates', count: 6 },
  { id: 'uncategorized', label: 'Uncategorized', count: 22 },
  { id: 'archived', label: 'Archived', count: 16 },
];

export const MOCK_HIERARCHY_TREE: HierarchyNode[] = [
  {
    id: 'node-beauty',
    name: 'Beauty',
    productCount: 12450,
    level: 1,
    isExpanded: true,
    children: [
      {
        id: 'node-skincare',
        name: 'Skincare',
        productCount: 3200,
        level: 2,
        isExpanded: true,
        children: [
          {
            id: 'node-facecare',
            name: 'Face Care',
            productCount: 1400,
            level: 3,
            isExpanded: true,
            children: [
              { id: 'node-faceserum', name: 'Face Serum', productCount: 846, level: 4 },
              { id: 'node-moisturizer', name: 'Moisturizer', productCount: 554, level: 4 },
              { id: 'node-cleanser', name: 'Cleanser', productCount: 320, level: 4 },
              { id: 'node-toner', name: 'Toner', productCount: 210, level: 4 },
            ],
          },
          { id: 'node-bodycare', name: 'Body Care', productCount: 1800, level: 3 },
        ],
      },
      { id: 'node-makeup', name: 'Makeup', productCount: 5100, level: 2 },
      { id: 'node-haircare', name: 'Haircare', productCount: 2150, level: 2 },
    ],
  },
];

export const MOCK_CATEGORIES_TABLE: CategoryItem[] = [
  {
    id: 'cat-1',
    categoryName: 'Face Serum',
    categoryId: 'CAT-SKN-0014',
    hierarchyPath: 'Beauty > Skincare > Face Care > Face Serum',
    level: 4,
    parentCategory: 'Face Care',
    activeProductsCount: 846,
    childCategoriesCount: 0,
    requiredAttributesCount: 12,
    attributeCoveragePercent: 92,
    channelEligibilityText: '5/5',
    seoReadinessPercent: 85,
    complianceStatus: 'Configured',
    status: 'Active',
    riskLevel: 'Low',
    owner: 'Elena Vance',
    updatedDate: '04 Aug 2026, 12:57 AM',
    slug: 'face-serum',
    description: 'High potency facial serums and essences targeted for skin brightness, hydration, and repair.',
  },
  {
    id: 'cat-2',
    categoryName: 'Moisturizer',
    categoryId: 'CAT-SKN-0015',
    hierarchyPath: 'Beauty > Skincare > Face Care > Moisturizer',
    level: 4,
    parentCategory: 'Face Care',
    activeProductsCount: 554,
    childCategoriesCount: 0,
    requiredAttributesCount: 14,
    attributeCoveragePercent: 86,
    channelEligibilityText: '5/5',
    seoReadinessPercent: 78,
    complianceStatus: 'Configured',
    status: 'Active',
    riskLevel: 'Medium',
    owner: 'Marcus Lee',
    updatedDate: '03 Aug 2026, 04:20 PM',
    slug: 'moisturizer',
    description: 'Hydrating lotions, creams, and gels for daily facial barrier maintenance.',
  },
  {
    id: 'cat-3',
    categoryName: 'Cleanser',
    categoryId: 'CAT-SKN-0016',
    hierarchyPath: 'Beauty > Skincare > Face Care > Cleanser',
    level: 4,
    parentCategory: 'Face Care',
    activeProductsCount: 320,
    childCategoriesCount: 0,
    requiredAttributesCount: 10,
    attributeCoveragePercent: 75,
    channelEligibilityText: '5/5',
    seoReadinessPercent: 72,
    complianceStatus: 'Partial',
    status: 'Active',
    riskLevel: 'Medium',
    owner: 'Priya Kapoor',
    updatedDate: '02 Aug 2026, 11:10 AM',
    slug: 'cleanser',
    description: 'Foam, gel, and oil face washes formulated for deep pore purification.',
  },
  {
    id: 'cat-4',
    categoryName: 'Toner',
    categoryId: 'CAT-SKN-0017',
    hierarchyPath: 'Beauty > Skincare > Face Care > Toner',
    level: 4,
    parentCategory: 'Face Care',
    activeProductsCount: 210,
    childCategoriesCount: 0,
    requiredAttributesCount: 10,
    attributeCoveragePercent: 60,
    channelEligibilityText: '4/5',
    seoReadinessPercent: 66,
    complianceStatus: 'Partial',
    status: 'Active',
    riskLevel: 'High',
    owner: 'Elena Vance',
    updatedDate: '01 Aug 2026, 09:30 AM',
    slug: 'toner',
    description: 'Exfoliating and soothing botanical facial toners and balancing waters.',
  },
];

export const MOCK_ATTRIBUTE_COVERAGE: AttributeCoverageItem[] = [
  { categoryName: 'Face Serum', coveragePercent: 92, statusText: 'Excellent' },
  { categoryName: 'Moisturizer', coveragePercent: 86, statusText: 'Good' },
  { categoryName: 'Cleanser', coveragePercent: 75, statusText: 'Good' },
  { categoryName: 'Toner', coveragePercent: 60, statusText: 'Needs Work' },
  { categoryName: 'Body Care', coveragePercent: 80, statusText: 'Good' },
];

export const MOCK_PRODUCT_COVERAGE_LEVELS: ProductCoverageLevelItem[] = [
  { level: 1, categoriesCount: 8, activeProductsCount: 12450, avgPerCategory: 1556 },
  { level: 2, categoriesCount: 32, activeProductsCount: 8140, avgPerCategory: 254 },
  { level: 3, categoriesCount: 96, activeProductsCount: 4860, avgPerCategory: 51 },
  { level: 4, categoriesCount: 210, activeProductsCount: 2340, avgPerCategory: 11 },
  { level: 5, categoriesCount: 84, activeProductsCount: 1120, avgPerCategory: 13 },
];

export const MOCK_CHANNEL_ELIGIBILITY_MATRIX: ChannelEligibilityRow[] = [
  { channel: 'Online Marketplace', eligibleCount: 132, partialCount: 8, notEligibleCount: 8 },
  { channel: 'Mobile App', eligibleCount: 128, partialCount: 6, notEligibleCount: 14 },
  { channel: 'B2B Wholesale', eligibleCount: 120, partialCount: 10, notEligibleCount: 18 },
  { channel: 'Partner Storefront', eligibleCount: 110, partialCount: 12, notEligibleCount: 26 },
  { channel: 'Social Commerce', eligibleCount: 98, partialCount: 16, notEligibleCount: 34 },
];

export const MOCK_DUPLICATE_CANDIDATES: DuplicateCategoryPair[] = [
  { id: 'dup-1', categoryA: 'Facial Serum', categoryB: 'Face Serum', similarityPercent: 95, risk: 'High', productsCount: 846 },
  { id: 'dup-2', categoryA: 'Moisturizing Cream', categoryB: 'Moisturizer', similarityPercent: 90, risk: 'Low', productsCount: 554 },
  { id: 'dup-3', categoryA: 'Cleansing Foam', categoryB: 'Cleanser', similarityPercent: 86, risk: 'Low', productsCount: 320 },
];

export const MOCK_UNCATEGORIZED_SUMMARY: UncategorizedQueueSummary = {
  uncategorizedProducts: 22,
  misclassifiedProducts: 14,
  needsReassignment: 8,
};

export const MOCK_RECENT_CATEGORY_ACTIVITIES: CategoryActivityItem[] = [
  { id: 'act-1', action: 'Category Updated', categoryName: 'Face Serum', user: 'Elena Vance', dateTime: '04 Aug 2026, 12:45 AM', result: 'Approved' },
  { id: 'act-2', action: 'Attributes Updated', categoryName: 'Moisturizer', user: 'Marcus Lee', dateTime: '03 Aug 2026, 04:20 PM', result: 'Approved' },
  { id: 'act-3', action: 'Category Created', categoryName: 'Toner', user: 'Priya Kapoor', dateTime: '02 Aug 2026, 11:10 AM', result: 'Approved' },
];

export const MOCK_COMPLIANCE_RULES: CategoryComplianceRuleItem[] = [
  { id: 'rule-1', ruleName: 'Vitamin C Disclosure Rule', affectedCategoriesCount: 48, severity: 'High', status: 'Active', complianceRatePercent: 92 },
  { id: 'rule-2', ruleName: 'Ingredient Safety Rule', affectedCategoriesCount: 120, severity: 'High', status: 'Active', complianceRatePercent: 88 },
  { id: 'rule-3', ruleName: 'Channel Mapping Rule', affectedCategoriesCount: 96, severity: 'Medium', status: 'Active', complianceRatePercent: 90 },
  { id: 'rule-4', ruleName: 'SEO Metadata Rule', affectedCategoriesCount: 84, severity: 'Medium', status: 'Active', complianceRatePercent: 85 },
  { id: 'rule-5', ruleName: 'Attribute Completeness Rule', affectedCategoriesCount: 132, severity: 'High', status: 'Active', complianceRatePercent: 86 },
];

export const MOCK_AUDIT_EVENTS: GovernanceAuditItem[] = [
  { id: 'aud-1', event: 'Category Approval', categoryName: 'Face Serum', reviewer: 'Elena Vance', dateTime: '04 Aug 2026, 10:30 AM', result: 'Approved' },
  { id: 'aud-2', event: 'Attribute Change Approval', categoryName: 'Moisturizer', reviewer: 'Marcus Lee', dateTime: '03 Aug 2026, 04:20 PM', result: 'Approved' },
  { id: 'aud-3', event: 'Bulk Mapping Approval', categoryName: 'Body Care', reviewer: 'Priya Kapoor', dateTime: '03 Aug 2026, 11:10 AM', result: 'Approved' },
  { id: 'aud-4', event: 'Compliance Review', categoryName: 'Cleanser', reviewer: 'Elena Vance', dateTime: '02 Aug 2026, 03:45 PM', result: 'Passed' },
];
