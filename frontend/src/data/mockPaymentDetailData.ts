import { PaymentRecordDetail, FinanceAlertItem } from '@/types/finance';

/* ─────────────────────────────────────────────
   FN04 Payment Transaction Detail — Mock Data
   (Replaces live API until backend is integrated)
───────────────────────────────────────────── */

export interface PaymentLifecycleEvent {
  id: string;
  stage: string;
  time: string | null;
  status: 'completed' | 'current' | 'pending';
}

export interface PaymentCalculationRow {
  item: string;
  expected: string;
  actual: string;
  variance: string;
  highlight?: boolean;
}

export interface AuthorizationEvent {
  event: string;
  time: string;
  status: 'Success' | 'Pending' | 'Failed';
  details: string;
}

export interface PaymentTransactionDetailVM {
  id: string;
  paymentRef: string;
  gatewayTxnId: string;
  authCode: string;
  customer: string;
  customerId: string;
  relatedOrder: string;
  invoice: string;
  paymentMethod: string;
  gateway: string;
  maskedCard: string;
  // Amounts
  requestedAmount: number;
  authorizedAmount: number;
  capturedAmount: number;
  refundedAmount: number;
  reversedAmount: number;
  gatewayFee: number;
  netCollected: number;
  // Statuses
  paymentStatus: string;
  authorizationState: string;
  captureState: string;
  settlementState: string;
  reconciliationState: string;
  riskLevel: string;
  sla: string;
  // Dates
  txnDate: string;
  updatedAt: string;
  recordVersion: string;
  // Auth Detail
  authorizationId: string;
  threeDS: string;
  billingMatch: string;
  cvvResult: string;
  authRequestedTime: string;
  authRespondedTime: string;
  authExpiry: string;
  retryCount: number;
  authRiskState: string;
  authEvents: AuthorizationEvent[];
  // Capture Detail
  captureId: string;
  captureType: string;
  requestedCaptureAmount: number;
  remainingAuthorization: number;
  captureRequestedTime: string;
  captureCompletedTime: string;
  captureGatewayResponse: string;
  settlementEligibility: string;
  duplicateProtection: string;
  idempotencyRef: string;
  // Payment Method
  methodType: string;
  network: string;
  tokenStatus: string;
  cardExpiry: string;
  billingCountry: string;
  riskCount: number;
  priorSuccessFailures: string;
  refundCompatibility: string;
  methodRiskClassification: string;
  // Gateway
  merchantAlias: string;
  gatewayRequestTime: string;
  gatewayResponseTime: string;
  processingTime: string;
  gatewayResponse: string;
  rawResponseCode: string;
  retrySupport: boolean;
  voidSupport: boolean;
  reversalSupport: boolean;
  settlementBatchSupport: boolean;
  reconciliationSource: string;
  gatewayHealthStatus: string;
  // Risk & Auth
  paymentRiskScore: number;
  riskScoreLabel: string;
  deviceRisk: string;
  accountRisk: string;
  fraudSignals: string;
  duplicateCheck: string;
  sharedMethodSignal: string;
  threeDSStatus: string;
  velocityCheck: string;
  geoConsistency: string;
  customerRestriction: string;
  manualReviewStatus: string;
  // Action eligibility
  canCapture: boolean;
  canRetry: boolean;
  canVoid: boolean;
  canReverse: boolean;
  canHold: boolean;
  canReleaseHold: boolean;
  canRefund: boolean;
  canReconcile: boolean;
  owner: string;
  reviewer: string;
}

/* ─── Lifecycle Events ─── */
export const FN04_LIFECYCLE: PaymentLifecycleEvent[] = [
  { id: 'l1', stage: 'Payment Initiated', time: 'May 26 09:58 AM', status: 'completed' },
  { id: 'l2', stage: 'Method Validated', time: 'May 26 09:59 AM', status: 'completed' },
  { id: 'l3', stage: 'Authentication', time: 'May 26 09:59 AM', status: 'completed' },
  { id: 'l4', stage: 'Auth Requested', time: 'May 26 09:59 AM', status: 'completed' },
  { id: 'l5', stage: 'Authorized', time: 'May 26 09:59 AM', status: 'completed' },
  { id: 'l6', stage: 'Capture Requested', time: 'May 26 10:01 AM', status: 'completed' },
  { id: 'l7', stage: 'Captured', time: 'May 26 10:02 AM', status: 'completed' },
  { id: 'l8', stage: 'Order Confirmed', time: 'May 26 10:02 AM', status: 'completed' },
  { id: 'l9', stage: 'Settlement Prepared', time: 'May 26 10:05 AM', status: 'completed' },
  { id: 'l10', stage: 'Reconciled', time: 'May 26 10:08 AM', status: 'current' },
  { id: 'l11', stage: 'Financial Confirmed', time: null, status: 'pending' },
  { id: 'l12', stage: 'Completed', time: null, status: 'pending' },
  { id: 'l13', stage: 'Refunded/Reversed', time: null, status: 'pending' },
  { id: 'l14', stage: 'Closed', time: null, status: 'pending' },
  { id: 'l15', stage: 'Archived', time: null, status: 'pending' },
];

/* ─── Calculation Rows ─── */
export const FN04_CALCULATION: PaymentCalculationRow[] = [
  { item: 'Order Gross Amount', expected: '428.10M', actual: '428.10M', variance: '0.00' },
  { item: 'Discounts', expected: '-12.80M', actual: '-12.80M', variance: '0.00' },
  { item: 'Tax (18%)', expected: '63.66M', actual: '63.66M', variance: '0.00' },
  { item: 'Shipping', expected: '12.00M', actual: '12.00M', variance: '0.00' },
  { item: 'Marketplace Fees', expected: '-12.86M', actual: '-12.86M', variance: '0.00' },
  { item: 'Customer Payable', expected: '490.10M', actual: '490.10M', variance: '0.00' },
  { item: 'Authorized Amount', expected: '428.10M', actual: '428.10M', variance: '0.00' },
  { item: 'Captured Amount', expected: '368.40M', actual: '368.40M', variance: '0.00' },
  { item: 'Gateway Fee', expected: '-6.21M', actual: '-6.21M', variance: '0.00' },
  { item: 'Refunds', expected: '0.00', actual: '0.00', variance: '0.00' },
  { item: 'Reversals', expected: '0.00', actual: '0.00', variance: '0.00' },
  { item: 'Net Collected', expected: '362.19M', actual: '362.19M', variance: '0.00', highlight: true },
];

/* ─── Amount Trend Chart Data ─── */
export const FN04_AMOUNT_TREND = [
  { date: 'Apr 27', requested: 380, captured: 320, failed: 8 },
  { date: 'May 2', requested: 395, captured: 335, failed: 6 },
  { date: 'May 7', requested: 402, captured: 345, failed: 5 },
  { date: 'May 12', requested: 412, captured: 352, failed: 4 },
  { date: 'May 17', requested: 418, captured: 358, failed: 3 },
  { date: 'May 22', requested: 424, captured: 363, failed: 3 },
  { date: 'May 26', requested: 428, captured: 368, failed: 2 },
];

/* ─── Method Distribution ─── */
export const FN04_METHOD_DISTRIBUTION = [
  { name: 'Card', value: 266.5, percentage: 72.4, color: '#2563eb' },
  { name: 'Mobile', value: 50.1, percentage: 13.6, color: '#7c3aed' },
  { name: 'Bank Transfer', value: 33.9, percentage: 9.2, color: '#16a34a' },
  { name: 'Wallet', value: 11.4, percentage: 3.1, color: '#d97706' },
  { name: 'Other', value: 6.5, percentage: 1.7, color: '#64748b' },
];

/* ─── Status Summary ─── */
export const FN04_STATUS_SUMMARY = [
  { status: 'Success', count: 1246, pct: 76.5, color: '#16a34a' },
  { status: 'Pending Capture', count: 342, pct: 21.0, color: '#d97706' },
  { status: 'Pending Auth', count: 86, pct: 5.3, color: '#f59e0b' },
  { status: 'Failed', count: 38, pct: 2.3, color: '#dc2626' },
  { status: 'Voided', count: 18, pct: 1.1, color: '#64748b' },
  { status: 'Reversed', count: 8, pct: 0.5, color: '#ea580c' },
];

/* ─── Priority Alerts ─── */
export const FN04_ALERTS: FinanceAlertItem[] = [
  { id: 'a1', severity: 'Critical', message: '126 critical exceptions require review' },
  { id: 'a2', severity: 'High', message: '4 payment reconciliation exceptions' },
  { id: 'a3', severity: 'High', message: '3 capture amount variance' },
  { id: 'a4', severity: 'Medium', message: '2 payments pending > 7 days' },
  { id: 'a5', severity: 'Medium', message: '1 high risk authentication review' },
  { id: 'a6', severity: 'Low', message: '2 reconciliation mismatches' },
  { id: 'a7', severity: 'Info', message: '1 SLA breach detected' },
  { id: 'a8', severity: 'Info', message: '1 gateway settlement delay' },
];

/* ─── Intelligence Health Scorecard ─── */
export const FN04_INTELLIGENCE_SCORES = [
  { label: 'Authorization Success', score: 94 },
  { label: 'Capture Success', score: 92 },
  { label: 'Gateway Stability', score: 97 },
  { label: 'Duplicate Control', score: 92 },
  { label: 'Payment Risk Control', score: 91 },
  { label: 'Reconciliation Health', score: 89 },
  { label: 'Payment SLA Compliance', score: 96 },
  { label: 'Audit Completeness', score: 94 },
];

/* ─── Transaction KPIs ─── */
export const FN04_KPIS = [
  { id: 'req_amt', num: 1, iconName: 'DollarSign', title: 'Requested Amount (LKR)', subLabel: 'Total Requested', value: '428.10M', delta: '12.4%', isPositive: true, status: 'positive' as const, sparkline: [380, 392, 402, 412, 418, 424, 428.1] },
  { id: 'auth_amt', num: 2, iconName: 'ShieldCheck', title: 'Authorized Amount (LKR)', subLabel: 'Auth Amount', value: '428.10M', delta: '9.3%', isPositive: true, status: 'positive' as const, sparkline: [380, 392, 402, 412, 418, 424, 428.1] },
  { id: 'cap_amt', num: 3, iconName: 'CheckCircle', title: 'Captured Amount (LKR)', subLabel: 'Captured', value: '368.40M', delta: '8.1%', isPositive: true, status: 'positive' as const, sparkline: [320, 330, 340, 350, 358, 363, 368.4] },
  { id: 'success_rate', num: 4, iconName: 'Percent', title: 'Success Rate', subLabel: 'Payment Success', value: '96.2%', delta: '2.1 pp', isPositive: true, status: 'positive' as const, sparkline: [92, 93, 94, 94.5, 95.5, 96, 96.2] },
  { id: 'failed', num: 5, iconName: 'AlertTriangle', title: 'Failed Payments', subLabel: 'Failures', value: '4', delta: '18.1%', isPositive: true, status: 'positive' as const, sparkline: [8, 7, 6, 5, 4.5, 4, 4] },
  { id: 'holds', num: 6, iconName: 'Lock', title: 'Payment Holds', subLabel: 'Active Holds', value: '3', delta: '7.4%', isPositive: true, status: 'neutral' as const, sparkline: [5, 5, 4, 4, 3, 3, 3] },
  { id: 'unrecon', num: 7, iconName: 'FileQuestion', title: 'Unreconciled Payments', subLabel: 'Pending Recon', value: '3', delta: '4.3%', isPositive: true, status: 'warning' as const, sparkline: [6, 5, 5, 4, 4, 3, 3] },
  { id: 'sla', num: 8, iconName: 'Activity', title: 'Payment SLA Breaches', subLabel: 'Breaches', value: '0', delta: '0%', isPositive: true, status: 'positive' as const, sparkline: [2, 1, 1, 0, 0, 0, 0] },
];

/* ─── Resolved record keyed by ID (mock data layer) ─── */
const RECORD_BASE: PaymentTransactionDetailVM = {
  id: 'PAY-2025-082942',
  paymentRef: 'PAY-2025-082942',
  gatewayTxnId: 'ch_3Nabc123456YZEfya',
  authCode: 'auth_3Nabc123456YZEfya',
  customer: 'Amaya Perera',
  customerId: 'CUST-100231',
  relatedOrder: 'ORD-2025-50812',
  invoice: 'INV-2025-044821',
  paymentMethod: 'Visa •••• 4242',
  gateway: 'Stripe Asia',
  maskedCard: '•••• 4242',
  requestedAmount: 428.10,
  authorizedAmount: 428.10,
  capturedAmount: 368.40,
  refundedAmount: 0.00,
  reversedAmount: 0.00,
  gatewayFee: 6.21,
  netCollected: 362.19,
  paymentStatus: 'Success',
  authorizationState: 'Authorized',
  captureState: 'Captured',
  settlementState: 'Settlement Pending',
  reconciliationState: 'Partially Reconciled',
  riskLevel: 'Low Risk',
  sla: '99.6%',
  txnDate: 'May 26, 2025 09:58 AM',
  updatedAt: 'May 26, 2025 10:12 AM',
  recordVersion: 'v3.2',
  authorizationId: 'auth_3Nabc123456YZEfya',
  threeDS: '3DS2 - Challenge Passed',
  billingMatch: 'Full Match',
  cvvResult: 'Match',
  authRequestedTime: 'May 26, 2025 09:59 AM',
  authRespondedTime: 'May 26, 2025 09:59 AM',
  authExpiry: 'May 26, 2025 11:59 PM',
  retryCount: 0,
  authRiskState: 'Low Risk',
  authEvents: [
    { event: 'Auth Requested', time: '09:59 AM', status: 'Success', details: 'Amount 428.10M' },
    { event: '3DS Challenge', time: '09:59 AM', status: 'Success', details: 'Liability Shifted' },
    { event: 'Auth Response', time: '09:59 AM', status: 'Success', details: 'Code 00' },
  ],
  captureId: 'cap_3Nabc456789ZEFyb',
  captureType: 'Full Capture',
  requestedCaptureAmount: 368.40,
  remainingAuthorization: 59.70,
  captureRequestedTime: 'May 26, 2025 10:01 AM',
  captureCompletedTime: 'May 26, 2025 10:02 AM',
  captureGatewayResponse: 'Success',
  settlementEligibility: 'Eligible',
  duplicateProtection: 'Passed',
  idempotencyRef: 'idem_3Nabc456789ZEFyb',
  methodType: 'Card',
  network: 'Visa',
  tokenStatus: 'Active (Stripe)',
  cardExpiry: '12 / 2028',
  billingCountry: 'LK',
  riskCount: 3,
  priorSuccessFailures: '5 / 0',
  refundCompatibility: 'Yes',
  methodRiskClassification: 'Low Risk',
  merchantAlias: 'SL Beauty',
  gatewayRequestTime: 'May 26, 2025 09:59 AM',
  gatewayResponseTime: 'May 26, 2025 09:59 AM',
  processingTime: '1.2 sec',
  gatewayResponse: 'Approved',
  rawResponseCode: '00',
  retrySupport: true,
  voidSupport: true,
  reversalSupport: true,
  settlementBatchSupport: true,
  reconciliationSource: 'Stripe Payouts',
  gatewayHealthStatus: 'Stable',
  paymentRiskScore: 12,
  riskScoreLabel: 'Low',
  deviceRisk: 'Low',
  accountRisk: 'Low',
  fraudSignals: 'None',
  duplicateCheck: 'Passed',
  sharedMethodSignal: 'None',
  threeDSStatus: 'Completed',
  velocityCheck: 'Passed',
  geoConsistency: 'Consistent',
  customerRestriction: 'None',
  manualReviewStatus: 'Not Required',
  canCapture: false,
  canRetry: false,
  canVoid: false,
  canReverse: true,
  canHold: false,
  canReleaseHold: false,
  canRefund: true,
  canReconcile: true,
  owner: 'J. Perera',
  reviewer: 'M. de Silva',
};

/** Resolve transaction detail by ID (mock layer — replace with API call later). */
export function resolvePaymentTransaction(id: string): PaymentTransactionDetailVM | null {
  // For demo: return the base record with the requested ID.
  // In production this would be an API call.
  if (!id || !id.startsWith('PAY-')) return null;
  return { ...RECORD_BASE, id, paymentRef: id };
}

export { RECORD_BASE as FN04_RECORD_BASE };
