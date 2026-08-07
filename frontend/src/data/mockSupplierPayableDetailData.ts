/**
 * FN07 — Supplier Payable Detail
 * Typed view-model data keyed by payableId.
 * This is mock/demo data — NOT live production data.
 */

/* ─── Types ──────────────────────────────────────── */

export interface FN07PayableIdentity {
  supplierId: string;
  supplierName: string;
  supplierType: string;
  supplierGroup: string;
  currency: string;
  riskStatus: 'Low' | 'Medium' | 'High';
  complianceStatus: 'Valid' | 'Invalid' | 'Under Review';
  createdBy: string;
  createdOn: string;
}

export interface FN07LinkedRecord {
  poRef: string;
  grRef: string;
  grReturn: string;
  settlementBatch: string;
  payableRef: string;
  supplierStatement: 'Linked' | 'Not Linked';
}

export interface FN07AmountSummary {
  grossLiability: number;
  totalDeductions: number;
  taxAmount: number;
  credits: number;
  netPayable: number;
  reconciliationStatus: string;
}

export interface FN07StatusSnapshot {
  approvalStatus: string;
  daysUntilDue: number;
  hold: string;
  paymentSchedule: string;
  reconciliation: string;
}

export interface FN07LifecycleDates {
  invoiceDate: string;
  postingDate: string;
  dueDate: string;
  cashDiscountDate: string;
  paymentTerms: string;
  discountAmount: number;
  discountPct: number;
}

export interface FN07LifecycleStage {
  id: string;
  stage: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
}

export interface FN07TrendPoint {
  date: string;
  grossLiability: number;
  netPayable: number;
  invoices: number;
}

export interface FN07DonutSegment {
  name: string;
  code: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface FN07StatusSummaryRow {
  status: string;
  amount: number;
  pctOfTotal: number;
  count: number;
  color: string;
}

export interface FN07CalculationRow {
  lineNo: string;
  description: string;
  amount: number;
  notes: string;
  isTotal?: boolean;
  isSubtotal?: boolean;
  isHighlighted?: boolean;
  isInfoOnly?: boolean;
}

export interface FN07MatchingSummary {
  matchingMethod: string;
  preciselyMatched: { count: number; pct: number };
  partiallyMatched: { count: number; pct: number };
  manuallyPosted: { count: number; pct: number };
  matchingQuality: number;
  variance: number;
  reconciliationStatus: string;
}

export interface FN07ApprovalDetails {
  submittedBy: string;
  approvalRouting: string;
  approved: string;
  approvedCount: number;
  totalApprovers: number;
  nextApprover: string;
  approvalDue: string;
  approvalPending: string;
  approvalStatus: string;
}

export interface FN07PaymentSchedule {
  paymentMethod: string;
  preferredBank: string;
  scheduledDate: string;
  scheduledAmount: number;
  status: string;
  adviceStatus: string;
}

export interface FN07Settlement {
  settlementType: string;
  paymentStatus: string;
  payoutAmount: string;
  bankTransferId: string;
  adviceStatus: string;
  maskedAccount: string;
}

export interface FN07ReconciliationSummaryRow {
  description: string;
  amount: number | null;
  status?: string;
}

export interface FN07ActivityEvent {
  dateTime: string;
  activity: string;
  performedBy: string;
  source: string;
}

export interface FN07AuditSummary {
  totalUpdates: number;
  userUpdates: number;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
  dataQualityChecks: 'Passed' | 'Failed' | 'Pending';
  attachmentsLinked: number;
}

export interface FN07QuickQueue {
  label: string;
  count: number;
  color: string;
}

export interface FN07RightRailAlert {
  id: string;
  severity: 'High' | 'Medium' | 'Low' | 'Info';
  message: string;
}

export interface FN07RightRailHealthMetric {
  label: string;
  pct: number;
}

export interface FN07DetailRecord {
  payableId: string;
  /* Top-level meta */
  payableType: string;
  approvalStatus: 'Pending Approval' | 'Pending Review' | 'Approved' | 'Rejected';
  approvalStep: number;
  approvalStepsTotal: number;
  isOnHold: boolean;
  isPaymentScheduled: boolean;
  isReconciled: boolean;
  netPayable: number;
  grossLiability: number;
  /* Sub-sections */
  identity: FN07PayableIdentity;
  linkedRecords: FN07LinkedRecord;
  amountSummary: FN07AmountSummary;
  statusSnapshot: FN07StatusSnapshot;
  lifecycleDates: FN07LifecycleDates;
  lifecycleStages: FN07LifecycleStage[];
  trendData: FN07TrendPoint[];
  donutData: FN07DonutSegment[];
  statusSummaryRows: FN07StatusSummaryRow[];
  calculationRows: FN07CalculationRow[];
  matchingSummary: FN07MatchingSummary;
  approvalDetails: FN07ApprovalDetails;
  paymentSchedule: FN07PaymentSchedule;
  settlement: FN07Settlement;
  reconciliationRows: FN07ReconciliationSummaryRow[];
  activityLog: FN07ActivityEvent[];
  auditSummary: FN07AuditSummary;
  quickQueues: FN07QuickQueue[];
  /* Right rail */
  railHealthScore: number;
  railHealthMetrics: FN07RightRailHealthMetric[];
  railAlerts: FN07RightRailAlert[];
  railQuickSummary: { label: string; value: string }[];
}

/* ─── Keyed Detail Records ────────────────────────── */

const PAY_2025_008426: FN07DetailRecord = {
  payableId: 'PAY-2025-008426',
  payableType: 'Supplier Invoice',
  approvalStatus: 'Pending Approval',
  approvalStep: 2,
  approvalStepsTotal: 3,
  isOnHold: false,
  isPaymentScheduled: false,
  isReconciled: false,
  netPayable: 2286000,
  grossLiability: 2800000,

  identity: {
    supplierId: 'SUP-2025-000368',
    supplierName: 'Glow Luxe Pvt Ltd',
    supplierType: 'Supplier',
    supplierGroup: 'Beauty Products',
    currency: 'LKR',
    riskStatus: 'Medium',
    complianceStatus: 'Valid',
    createdBy: 'David Silva',
    createdOn: 'May 20, 2025 09:15 AM',
  },

  linkedRecords: {
    poRef: 'PO-2025-0792',
    grRef: 'GR-2025-0792',
    grReturn: '—',
    settlementBatch: 'STB-2025-0493',
    payableRef: 'PP-2025-0476',
    supplierStatement: 'Linked',
  },

  amountSummary: {
    grossLiability: 2800000,
    totalDeductions: 454000,
    taxAmount: 262000,
    credits: 60000,
    netPayable: 2286000,
    reconciliationStatus: 'Not Complete',
  },

  statusSnapshot: {
    approvalStatus: 'Pending Approval',
    daysUntilDue: 5,
    hold: 'No Active Hold',
    paymentSchedule: 'Payment Not Scheduled',
    reconciliation: 'Not Reconciled',
  },

  lifecycleDates: {
    invoiceDate: 'May 20, 2025',
    postingDate: 'May 20, 2025',
    dueDate: 'May 31, 2025',
    cashDiscountDate: 'May 29, 2025',
    paymentTerms: 'Net 5 Days',
    discountAmount: 56000,
    discountPct: 2.0,
  },

  lifecycleStages: [
    { id: 'ls1', stage: 'Initiated', date: 'May 20', status: 'completed' },
    { id: 'ls2', stage: 'Eligibility Check', date: 'May 20', status: 'completed' },
    { id: 'ls3', stage: 'Supplier Validation', date: 'May 20', status: 'completed' },
    { id: 'ls4', stage: 'Data Verification', date: 'May 20', status: 'completed' },
    { id: 'ls5', stage: 'Approval Routing', date: 'May 20', status: 'completed' },
    { id: 'ls6', stage: 'Calculation', date: 'May 20', status: 'completed' },
    { id: 'ls7', stage: 'Pending Approval', date: 'May 21', status: 'current' },
    { id: 'ls8', stage: 'Approval Completed', date: '—', status: 'pending' },
    { id: 'ls9', stage: 'Payment Scheduled', date: '—', status: 'pending' },
    { id: 'ls10', stage: 'Payment Executed', date: '—', status: 'pending' },
    { id: 'ls11', stage: 'Closed', date: '—', status: 'pending' },
    { id: 'ls12', stage: 'Archived', date: '—', status: 'pending' },
  ],

  trendData: [
    { date: 'Apr 27', grossLiability: 2.4, netPayable: 1.98, invoices: 12 },
    { date: 'May 4', grossLiability: 2.55, netPayable: 2.08, invoices: 14 },
    { date: 'May 11', grossLiability: 2.62, netPayable: 2.14, invoices: 15 },
    { date: 'May 18', grossLiability: 2.72, netPayable: 2.22, invoices: 16 },
    { date: 'May 25', grossLiability: 2.80, netPayable: 2.286, invoices: 18 },
  ],

  donutData: [
    { name: 'Purchase (PO)', code: 'PO', amount: 1824000, percentage: 65.1, color: '#2563eb' },
    { name: 'Supplier (SR)', code: 'SR', amount: 672000, percentage: 24.0, color: '#0ea5e9' },
    { name: 'Return (CR)', code: 'CR', amount: 144000, percentage: 5.1, color: '#f59e0b' },
    { name: 'Debit Note (DN)', code: 'DN', amount: 100000, percentage: 3.6, color: '#8b5cf6' },
    { name: 'Other (Adj.)', code: 'Adj', amount: 60000, percentage: 2.1, color: '#64748b' },
  ],

  statusSummaryRows: [
    { status: 'Matched', amount: 2436000, pctOfTotal: 87.0, count: 14, color: '#16a34a' },
    { status: 'Partially Matched', amount: 252000, pctOfTotal: 9.0, count: 2, color: '#f59e0b' },
    { status: 'Pending Match', amount: 112000, pctOfTotal: 4.0, count: 2, color: '#dc2626' },
  ],

  calculationRows: [
    { lineNo: '1', description: 'Gross Liability', amount: 2800000, notes: 'From invoices (AP)' },
    { lineNo: '2', description: 'Less Purchase Discounts', amount: -150000, notes: 'Early-pay / agreed discounts' },
    { lineNo: '3', description: 'Less Returns & Allowances', amount: -200000, notes: 'Returns / allowances' },
    { lineNo: '4', description: 'Less Withholding Tax (Incl.)', amount: -84000, notes: 'Included in total deductions' },
    { lineNo: '5', description: 'Less Other Deductions', amount: -20000, notes: 'Other deductions' },
    { lineNo: 'A', description: 'Total Deductions', amount: -454000, notes: 'Sum of lines 2 to 5', isSubtotal: true },
    { lineNo: 'B', description: 'Tax Amount (Informational)', amount: 262000, notes: 'For reference only / not deducted', isInfoOnly: true },
    { lineNo: '6', description: 'Less Credits', amount: -60000, notes: 'Credits / adjustments' },
    { lineNo: 'NP', description: 'Net Payable (1 − A − 6)', amount: 2286000, notes: 'Gross − Deductions − Credits', isHighlighted: true },
  ],

  matchingSummary: {
    matchingMethod: '#',
    preciselyMatched: { count: 13, pct: 72 },
    partiallyMatched: { count: 3, pct: 17 },
    manuallyPosted: { count: 2, pct: 11 },
    matchingQuality: 87.0,
    variance: 364000,
    reconciliationStatus: 'Not Complete',
  },

  approvalDetails: {
    submittedBy: 'David Silva',
    approvalRouting: '3 Levels',
    approved: '2 / 3',
    approvedCount: 2,
    totalApprovers: 3,
    nextApprover: 'Finance Manager',
    approvalDue: 'May 21, 2025',
    approvalPending: '—',
    approvalStatus: 'Pending Approval',
  },

  paymentSchedule: {
    paymentMethod: 'Bank / Transfer',
    preferredBank: 'Commercial Bank',
    scheduledDate: 'May 31, 2025',
    scheduledAmount: 2286000,
    status: 'Not Scheduled',
    adviceStatus: 'Not Scheduled',
  },

  settlement: {
    settlementType: 'Bank Transfer',
    paymentStatus: 'Not Started',
    payoutAmount: '—',
    bankTransferId: '—',
    adviceStatus: 'Not Scheduled',
    maskedAccount: '•••• 4582',
  },

  reconciliationRows: [
    { description: 'Invoice Total', amount: 2800000 },
    { description: 'Matched Amount', amount: 2436000 },
    { description: 'Unmatched Amount', amount: 364000 },
    { description: 'Difference', amount: 364000, status: 'Open' },
    { description: 'Last Reconciled On', amount: null, status: 'May 20, 2025 09:15 AM' },
  ],

  activityLog: [
    { dateTime: 'May 20, 2025 09:15 AM', activity: 'Payable created', performedBy: 'David Silva', source: 'System' },
    { dateTime: 'May 20, 2025 09:32 AM', activity: 'Supplier validated', performedBy: 'System', source: 'System' },
    { dateTime: 'May 20, 2025 10:02 AM', activity: 'Calculation completed', performedBy: 'System', source: 'System' },
    { dateTime: 'May 20, 2025 10:18 AM', activity: 'Approver assigned', performedBy: 'System', source: 'System' },
    { dateTime: 'May 20, 2025 10:30 AM', activity: 'Pending approval', performedBy: 'David Silva', source: 'System' },
  ],

  auditSummary: {
    totalUpdates: 18,
    userUpdates: 6,
    lastUpdatedBy: 'Elena Vance',
    lastUpdatedOn: 'May 20, 2025 10:18 AM',
    dataQualityChecks: 'Passed',
    attachmentsLinked: 4,
  },

  quickQueues: [
    { label: 'Pending Review', count: 2, color: '#f59e0b' },
    { label: 'Pending Approval', count: 1, color: '#8f002b' },
    { label: 'Invoice Exceptions', count: 2, color: '#dc2626' },
    { label: 'Payment Ready', count: 1, color: '#16a34a' },
    { label: 'Disputes', count: 2, color: '#b91c1c' },
  ],

  railHealthScore: 91,
  railHealthMetrics: [
    { label: 'Liability Amount Validated', pct: 96 },
    { label: 'Vendor Risk Acceptable', pct: 88 },
    { label: 'Payment Terms Compliant', pct: 95 },
    { label: 'Tax Compliance Accurate', pct: 92 },
    { label: 'Complete Documentation', pct: 90 },
    { label: 'Supplier Onboarding Verified', pct: 85 },
  ],
  railAlerts: [
    { id: 'ra1', severity: 'High', message: 'Deduction limits detected' },
    { id: 'ra2', severity: 'High', message: 'Reconciliation incomplete' },
    { id: 'ra3', severity: 'Medium', message: 'Invoice match variance' },
    { id: 'ra4', severity: 'Low', message: 'Supplier statement overdue' },
  ],
  railQuickSummary: [
    { label: 'Total Payables', value: 'LKR 15.62M' },
    { label: 'Net Payable (This Payable)', value: 'LKR 2.286M' },
    { label: 'Over Due (This Payable)', value: 'LKR 0' },
    { label: 'Pending Summary', value: 'LKR 4.14M' },
    { label: 'Approved Summary', value: 'LKR 9.32M' },
    { label: 'Tax (Informational)', value: 'LKR 3.21M' },
  ],
};

/* A second payable record for variety */
const PAY_2025_004826: FN07DetailRecord = {
  ...PAY_2025_008426,
  payableId: 'PAY-2025-004826',
  approvalStatus: 'Approved',
  approvalStep: 3,
  approvalStepsTotal: 3,
  isOnHold: false,
  isPaymentScheduled: true,
  isReconciled: true,
  identity: {
    ...PAY_2025_008426.identity,
    supplierName: 'Glow Labs Pvt Ltd',
    supplierId: 'SUP-000125',
  },
  linkedRecords: {
    poRef: 'PO-2025-12566',
    grRef: 'GR-2025-11745',
    grReturn: '—',
    settlementBatch: 'BATCH-2025-006',
    payableRef: 'PP-2025-0412',
    supplierStatement: 'Linked',
  },
  statusSnapshot: {
    approvalStatus: 'Approved',
    daysUntilDue: 2,
    hold: 'No Active Hold',
    paymentSchedule: 'Scheduled',
    reconciliation: 'Reconciled',
  },
  lifecycleStages: PAY_2025_008426.lifecycleStages.map((s, i) =>
    i < 10 ? { ...s, status: 'completed' as const } : s
  ),
  approvalDetails: {
    ...PAY_2025_008426.approvalDetails,
    approved: '3 / 3',
    approvedCount: 3,
    nextApprover: '—',
    approvalStatus: 'Approved',
  },
  paymentSchedule: {
    ...PAY_2025_008426.paymentSchedule,
    status: 'Scheduled',
    adviceStatus: 'Scheduled',
  },
};

export const supplierPayablesById: Record<string, FN07DetailRecord> = {
  'PAY-2025-008426': PAY_2025_008426,
  'PAY-2025-004826': PAY_2025_004826,
  'PAY-2025-004825': { ...PAY_2025_008426, payableId: 'PAY-2025-004825' },
  'PAY-2025-004824': { ...PAY_2025_004826, payableId: 'PAY-2025-004824' },
  'PAY-2025-004823': { ...PAY_2025_008426, payableId: 'PAY-2025-004823' },
  'PAY-2025-004822': { ...PAY_2025_004826, payableId: 'PAY-2025-004822' },
  'PAY-2025-004821': { ...PAY_2025_004826, payableId: 'PAY-2025-004821' },
};
