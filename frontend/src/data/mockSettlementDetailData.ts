import {
  FinanceContext,
  FinanceKpi,
  FN10SettlementCalculationLine,
  FN10SettlementReconRow,
  FN10ProviderEvent,
} from '@/types/finance';

/* ─────────────────────────────────────────────
   FN10 Settlement / Payout Detail — Mock Data
───────────────────────────────────────────── */

export interface FN10FullDetailRecord {
  settlementId: string;
  orderLinkId: string;
  beneficiaryType: string;
  beneficiaryTier: string;
  beneficiaryName: string;
  version: string;
  bankTransferRef: string;
  approvalStatus: 'Pending Approval' | 'Approved' | 'Rejected';
  payoutStatus: 'Payout Not Scheduled' | 'Scheduled' | 'Processing' | 'Completed' | 'Failed';
  reconciliationStatus: 'Not Reconciled' | 'Reconciled' | 'Exception';
  holdStatus: 'No Active Hold' | 'On Hold';
  disputeStatus: 'Not Disputed' | 'Disputed';
  daysInOpen: number;
  lastUpdated: string;
  updatedBy: string;
  createdOn: string;
  createdBy: string;
  recordVersion: string;

  /* KPI values */
  grossEarnings: number;
  totalDeductions: number;
  taxAmount: number;
  withholdingTax: number;
  reserveBalance: number;
  creditsAdjustments: number;
  netSettlement: number;
  paidAmount: number;
  outstandingAmount: number;
  validationScore: number;
  approvalProgress: { count: number; total: number; pct: number };
  slaProgress: { pct: number; isPositive: boolean };

  /* Lifecycle stages (16 stages) */
  lifecycleStages: { id: string; name: string; date: string; status: 'completed' | 'current' | 'pending' | 'not-started' }[];

  /* Trend data */
  trendData: { date: string; netSettlement: number; topSources: number; holdAmount: number }[];

  /* Donut data */
  donutData: { name: string; amount: number; percentage: number; color: string }[];

  /* Status summary */
  statusSummary: { label: string; count: number; color: string }[];

  /* Holding summary */
  holdingSummary: { totalHoldsCount: number; items: { label: string; count: number; pct: number }[]; totalValue: string };

  /* Payment Schedule */
  paymentSchedule: { scheduledValue: string; scheduledPayouts: number; payoutCycle: string; nextPayout: string; lastPayout: string; estPayoutAmount: string };

  /* Lifecycle Scores */
  lifecycleScores: { label: string; pct: number }[];

  /* Calculation table lines */
  calculationLines: FN10SettlementCalculationLine[];

  /* Reconciliation rows */
  reconciliationRows: FN10SettlementReconRow[];

  /* Provider events */
  providerEvents: FN10ProviderEvent[];

  /* Right rail health */
  railHealthScore: number;
  railHealthMetrics: { label: string; pct: number }[];
  railAlerts: { id: string; severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'; message: string }[];
  railQuickSummary: { totalSettlements: string; totalPayouts: string; overduePayouts: number; dueThisWeek: number; onTrackWorkflows: string; onTrackVerification: string };
}

export const SETTL_2025_005621: FN10FullDetailRecord = {
  settlementId: 'SETL-2025-005621',
  orderLinkId: 'CJ-88144',
  beneficiaryType: 'Supplier',
  beneficiaryTier: 'Tier 2',
  beneficiaryName: 'Glow Naturals Pvt Ltd',
  version: 'v1.0',
  bankTransferRef: 'Bank Transfer',
  approvalStatus: 'Pending Approval',
  payoutStatus: 'Payout Not Scheduled',
  reconciliationStatus: 'Not Reconciled',
  holdStatus: 'No Active Hold',
  disputeStatus: 'Not Disputed',
  daysInOpen: 0,
  lastUpdated: 'May 26, 2025 10:15 AM',
  updatedBy: 'Elena Vance',
  createdOn: 'May 26, 2025 09:05 AM',
  createdBy: 'David Silva',
  recordVersion: 'v1.0',

  grossEarnings: 2800000,
  totalDeductions: 455000,
  taxAmount: 262000,
  withholdingTax: 84000,
  reserveBalance: 50000,
  creditsAdjustments: 75000,
  netSettlement: 2286000,
  paidAmount: 0,
  outstandingAmount: 2286000,
  validationScore: 96,
  approvalProgress: { count: 2, total: 3, pct: 67 },
  slaProgress: { pct: 91, isPositive: true },

  lifecycleStages: [
    { id: '1', name: '1. Invoice Received', date: 'May 20 09:20 AM', status: 'completed' },
    { id: '2', name: '2. Basic Validation', date: 'May 20 09:32 AM', status: 'completed' },
    { id: '3', name: '3. Matching', date: 'May 20 09:45 AM', status: 'completed' },
    { id: '4', name: '4. Calculation Prepared', date: 'May 20 10:05 AM', status: 'completed' },
    { id: '5', name: '5. Compliance Check', date: 'May 20 10:12 AM', status: 'completed' },
    { id: '6', name: '6. Review', date: 'May 20 10:30 AM', status: 'completed' },
    { id: '7', name: '7. Manager Review', date: 'May 21 10:15 AM', status: 'current' },
    { id: '8', name: '8. Final Approval', date: 'Pending', status: 'pending' },
    { id: '9', name: '9. Payment Scheduled', date: 'Pending', status: 'pending' },
    { id: '10', name: '10. Payout Submitted', date: 'Pending', status: 'pending' },
    { id: '11', name: '11. Provider Accepted', date: 'Pending', status: 'pending' },
    { id: '12', name: '12. Processing', date: 'Pending', status: 'pending' },
    { id: '13', name: '13. Payment Confirmed', date: 'Pending', status: 'pending' },
    { id: '14', name: '14. Reconciled', date: 'Pending', status: 'pending' },
    { id: '15', name: '15. Closed', date: 'Pending', status: 'pending' },
    { id: '16', name: '16. Archived', date: 'Pending', status: 'pending' },
  ],

  trendData: [
    { date: 'Apr 27', netSettlement: 2.10, topSources: 2.50, holdAmount: 0.12 },
    { date: 'May 4', netSettlement: 2.18, topSources: 2.58, holdAmount: 0.14 },
    { date: 'May 11', netSettlement: 2.22, topSources: 2.65, holdAmount: 0.15 },
    { date: 'May 18', netSettlement: 2.25, topSources: 2.72, holdAmount: 0.15 },
    { date: 'May 25', netSettlement: 2.286, topSources: 2.80, holdAmount: 0.16 },
  ],

  donutData: [
    { name: 'Supplier', amount: 1.188, percentage: 52.1, color: '#2563eb' },
    { name: 'Service Provider', amount: 0.452, percentage: 19.8, color: '#8b5cf6' },
    { name: 'Logistics Partner', amount: 0.265, percentage: 11.6, color: '#ea580c' },
    { name: 'Platform Fee', amount: 0.198, percentage: 8.7, color: '#16a34a' },
    { name: 'Misc.', amount: 0.183, percentage: 7.8, color: '#64748b' },
  ],

  statusSummary: [
    { label: 'Pending Approval', count: 214, color: '#f59e0b' },
    { label: 'Approved', count: 168, color: '#16a34a' },
    { label: 'Scheduled', count: 64, color: '#2563eb' },
    { label: 'In Execution', count: 42, color: '#8b5cf6' },
    { label: 'Paid', count: 12, color: '#059669' },
    { label: 'Failed', count: 3, color: '#dc2626' },
  ],

  holdingSummary: {
    totalHoldsCount: 136,
    items: [
      { label: 'Settlement Holds', count: 62, pct: 10 },
      { label: 'Tax Holds', count: 34, pct: 5 },
      { label: 'Validation Holds', count: 24, pct: 4 },
      { label: 'Misc. Holds', count: 16, pct: 2 },
    ],
    totalValue: 'LKR 1.66M',
  },

  paymentSchedule: {
    scheduledValue: 'LKR 2.28M',
    scheduledPayouts: 0,
    payoutCycle: '—',
    nextPayout: '—',
    lastPayout: '—',
    estPayoutAmount: '—',
  },

  lifecycleScores: [
    { label: 'Data Quality', pct: 96 },
    { label: 'Balance Check', pct: 90 },
    { label: 'Beneficiary KYC', pct: 97 },
    { label: 'Rule Engine', pct: 99 },
    { label: 'Risk & Watchlist', pct: 95 },
    { label: 'SLA Adherence', pct: 99 },
  ],

  calculationLines: [
    { lineNo: 1, description: 'Gross Beneficiary Earnings', treatment: 'Additive', sourceRecord: 'ORD-68331', expectedAmount: 2800000, actualAmount: 2800000, approvedAmount: 2800000, variance: 0, includedInDeductions: false, status: 'Validated' },
    { lineNo: 2, description: 'Marketplace Commission', treatment: 'Deductive', sourceRecord: 'COM-66421', expectedAmount: -280000, actualAmount: -280000, approvedAmount: -280000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 3, description: 'Platform Fee', treatment: 'Deductive', sourceRecord: 'COM-66421', expectedAmount: -80000, actualAmount: -80000, approvedAmount: -80000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 4, description: 'Payment Processing Fee', treatment: 'Deductive', sourceRecord: 'PAY-33921', expectedAmount: -45000, actualAmount: -45000, approvedAmount: -45000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 5, description: 'Fulfilment Fee', treatment: 'Deductive', sourceRecord: 'FUL-22711', expectedAmount: -30000, actualAmount: -30000, approvedAmount: -30000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 6, description: 'Tax (Included in Deductions)', treatment: 'Informational', sourceRecord: 'TAX-55201', expectedAmount: -262000, actualAmount: -262000, approvedAmount: -262000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 7, description: 'Withholding Tax', treatment: 'Informational', sourceRecord: 'WHT-77642', expectedAmount: -84000, actualAmount: -84000, approvedAmount: -84000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 8, description: 'Reserve Deduction', treatment: 'Reserve', sourceRecord: 'RES-30155', expectedAmount: -50000, actualAmount: -50000, approvedAmount: -50000, variance: 0, includedInDeductions: true, status: 'Validated' },
    { lineNo: 9, description: 'Credits & Adjustments', treatment: 'Credit', sourceRecord: 'CRD-99011', expectedAmount: 75000, actualAmount: 75000, approvedAmount: 75000, variance: 0, includedInDeductions: false, status: 'Validated' },
  ],

  reconciliationRows: [
    { type: 'Source Link Reconciliation', status: 'Completed', matchRate: '98%', variance: 0, notes: 'All sources matched' },
    { type: 'Reserve Reconciliation', status: 'Completed', matchRate: '100%', variance: 0, notes: 'Reserve amounts match' },
    { type: 'Payout Reconciliation', status: 'Not Started', matchRate: '—', variance: 0, notes: 'Awaiting payout' },
    { type: 'Bank Reconciliation', status: 'Not Started', matchRate: '—', variance: 0, notes: 'Awaiting bank feed' },
    { type: 'Final Settlement Reconciliation', status: 'Not Started', matchRate: '—', variance: 0, notes: 'Requires payout completion' },
  ],

  providerEvents: [],

  railHealthScore: 91,
  railHealthMetrics: [
    { label: 'Calculation Accuracy', pct: 97 },
    { label: 'Beneficiary KYC', pct: 96 },
    { label: 'Bank Account Health', pct: 95 },
    { label: 'Payments Scheduled', pct: 91 },
    { label: 'Payout Success Rate', pct: 93 },
    { label: 'Hold Compliance', pct: 90 },
    { label: 'Cash Availability', pct: 90 },
    { label: 'Risk & Watchlist', pct: 95 },
    { label: 'Audit Readiness', pct: 97 },
    { label: 'SLA Compliance', pct: 98 },
  ],
  railAlerts: [
    { id: 'al1', severity: 'Critical', message: '2.28M pending approval' },
    { id: 'al2', severity: 'High', message: 'Reserve balance below limit' },
    { id: 'al3', severity: 'High', message: 'Reconciliation not complete' },
    { id: 'al4', severity: 'Medium', message: '16 SLA breaches detected' },
    { id: 'al5', severity: 'Medium', message: 'Beneficiary KYC expiring in 5 days' },
    { id: 'al6', severity: 'Low', message: 'Settlement window closing in 24 hrs' },
    { id: 'al7', severity: 'Info', message: 'Batch validation pending for 24 hrs' },
  ],
  railQuickSummary: {
    totalSettlements: '1,246',
    totalPayouts: '12.24M',
    overduePayouts: 3,
    dueThisWeek: 2,
    onTrackWorkflows: '92%',
    onTrackVerification: '96%',
  },
};

export const settlementDetailsById: Record<string, FN10FullDetailRecord> = {
  'SETTL-2025-005621': SETTL_2025_005621,
  'SETL-2025-0058721': { ...SETTL_2025_005621, settlementId: 'SETL-2025-0058721', approvalStatus: 'Approved', payoutStatus: 'Completed' },
  'SETL-2025-0058720': { ...SETTL_2025_005621, settlementId: 'SETL-2025-0058720', approvalStatus: 'Approved', payoutStatus: 'Scheduled' },
  'SETL-2025-0058719': { ...SETTL_2025_005621, settlementId: 'SETL-2025-0058719', approvalStatus: 'Approved', payoutStatus: 'Processing' },
  'SETL-2025-0058718': { ...SETTL_2025_005621, settlementId: 'SETL-2025-0058718', approvalStatus: 'Pending Approval', payoutStatus: 'Failed' },
  'SETL-2025-0058717': { ...SETTL_2025_005621, settlementId: 'SETL-2025-0058717', approvalStatus: 'Approved', payoutStatus: 'Completed' },
};
