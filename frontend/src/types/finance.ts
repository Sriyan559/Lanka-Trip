export type KpiStatus = 'positive' | 'warning' | 'negative' | 'neutral';

export interface FinanceKpi {
  id: string;
  num: number;
  iconName: string;
  title: string;
  subLabel: string;
  value: string;
  delta: string;
  isPositive: boolean;
  status: KpiStatus;
  hasWarningIcon?: boolean;
  sparkline: number[];
}

export interface FinanceContext {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  salesChannel: string;
  region: string;
  baseCurrency: string;
  scope: string;
  accountingPeriod: string;
  dateRange: string;
  liveData: boolean;
  dataCompleteness: number;
  lastSynced: string;
  periodState: 'Open' | 'Closed' | 'Locked';
  accessNotice: string;
}

export interface FinanceStatusItem {
  id: string;
  status: string;
  count?: number;
  amount: string;
  color: string;
  percentage: number;
}

export interface FinanceHealthScore {
  label: string;
  score: number;
}

export interface FinanceAlertItem {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  message: string;
}

export interface FinancePortfolioRow {
  ref: string;
  domain: string;
  type: string;
  relatedOrder: string;
  party: string;
  partyType?: string;
  bu: string;
  channel: string;
  currency: string;
  grossAmount: number;
  tax: number;
  fees: number;
  commission: number;
  refund: number;
  netAmount: number;
  paymentStatus: 'Paid' | 'Captured' | 'Unpaid' | 'Pending' | 'Failed';
  recvPayStatus: 'Receivable' | 'Payable' | 'Settled' | 'Hold';
  settlementStatus: 'Settled' | 'Scheduled' | 'Pending' | 'On Hold';
  reconciliationStatus: 'Reconciled' | 'Not Reconciled' | 'Pending';
  exceptionStatus: '—' | 'Exception' | 'Refund Hold' | 'Review Required';
  approvalStatus: 'Approved' | 'In Review' | 'Pending' | 'Rejected';
  owner: string;
  txnDate: string;
  dueDate: string;
  updatedAt: string;
  sla: number;
}

export interface FinanceRecordDetail {
  ref: string;
  status: string;
  relatedOrder: string;
  customerSeller: string;
  domainType: string;
  txnDate: string;
  grossAmount: string;
  tax: string;
  fees: string;
  commission: string;
  netAmount: string;
  paymentGateway: string;
  paymentStatus: string;
  receivableState: string;
  settlementBatch: string;
  settlementStatus: string;
  settlementDate: string;
  reconciliationState: string;
  reconciledOn: string;
  exceptionState: string;
  approvalStatus: string;
  owner: string;
  reviewer: string;
  approver: string;
  sla: string;
  recordVersion: string;
  updatedAt: string;
}

export interface FinanceMiniMetric {
  label: string;
  value: string;
  delta?: string;
  isPositive?: boolean;
}

export interface FinanceDomainSummary {
  id: string;
  title: string;
  metrics: FinanceMiniMetric[];
  sparkBars?: number[];
  recentLog?: { text: string; time: string }[];
}

/* ── FN02 Specific Interfaces ── */

export interface RevenuePortfolioRow {
  ref: string;
  relatedOrder: string;
  invoiceRef: string;
  customerAccount: string;
  accountType: string;
  bu: string;
  channel: string;
  currency: string;
  gmv: number;
  grossSales: number;
  discounts: number;
  tax: number;
  fees: number;
  refunds: number;
  netSales: number;
  recognizedRevenue: number;
  deferredRevenue: number;
  receivableAmount: number;
  collectedAmount: number;
  outstandingAmount: number;
  revenueStatus: 'Recognized' | 'Deferred' | 'Pending';
  receivableStatus: 'Current' | 'Due Soon' | 'Overdue' | 'Partially Paid' | 'Disputed';
  ageingBucket: '0-7' | '8-30' | '31-60' | '61-90' | '90+';
  dueDate: string;
  collectionStatus: 'Collected' | 'Partially Paid' | 'Pending' | 'Overdue';
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Not Reconciled';
  exceptionStatus: 'None' | 'Warning' | 'High' | 'Critical';
  approvalStatus: 'Approved' | 'Pending' | 'In Review';
  owner: string;
  operator: string;
}

export interface RevenueRecordDetail {
  ref: string;
  status: string;
  customerAccount: string;
  accountType: string;
  recognizedRevenue: string;
  deferredRevenue: string;
  outstandingReceivable: string;
  invoiceStatus: string;
  invoiceStatusDetail: string;
  dueDate: string;
  collectionOwner: string;
  reconciliationState: string;
  approvalState: string;
}

export interface RevenueActivityItem {
  id: string;
  time: string;
  title: string;
  ref?: string;
  amount?: string;
  user?: string;
  type: 'payment' | 'invoice' | 'plan' | 'adjustment';
}

/* ── FN03 Specific Interfaces ── */

export interface PaymentPortfolioRow {
  id: string;
  ref: string;
  relatedOrder: string;
  invoiceRef: string;
  customer: string;
  customerId: string;
  currency: string;
  grossAmount: number;
  capturedAmount: number;
  paymentMethod: string;
  gateway: string;
  authStatus: 'Authorized' | 'Pending' | 'Failed' | 'N/A';
  captureStatus: 'Captured' | 'Pending' | 'Partially Captured' | 'Failed' | 'N/A';
  paymentResponse: 'Success' | 'Approved (100)' | 'Pending' | 'Declined' | 'Failed' | 'Pending / Capture' | 'Partially Captured';
  riskLevel: 'Low' | 'Medium' | 'High';
  duplicateStatus: 'No' | 'Yes' | 'Candidate';
  hold: 'No' | 'Active' | 'Released';
  settlementStatus: 'Settled' | 'Pending' | 'Unsettled';
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Mismatched' | 'Unreconciled';
  sla: 'On Track' | 'At Risk' | 'Breached';
  txnDate: string;
  settlementDate: string;
  owner: string;
  reviewer: string;
}

export interface PaymentRecordDetail extends PaymentPortfolioRow {
  providerRef: string;
  authCode: string;
  threeDS: '3DS Authenticated' | 'Not Required' | 'Failed';
  billingMatch: 'Match' | 'Mismatch' | 'Unverified';
  fraudReason?: string;
  failureReason?: string;
  refundLinkage: string;
  disputeLinkage: string;
  approvalStatus: string;
  recordVersion: string;
  updatedAt: string;
}

/* ── FN05 Refunds & Compensation Interfaces ── */

export interface RefundPortfolioRow {
  id: string;
  orderId: string;
  customerName: string;
  customerId: string;
  reasonCode: string;
  paymentMethod: string;
  productSeller: string;
  refundType: 'Full Refund' | 'Partial Refund' | 'Store Credit' | 'Compensation Payment' | 'Shipping Compensation';
  refundAmount: number;
  compensationAmount: number;
  eligibility: 'Eligible' | 'Under Review' | 'Not Eligible';
  approval: 'Approved' | 'Pending Approval' | 'Pending Review' | 'Rejected';
  processing: 'Completed' | 'Processing' | 'Failed';
  settlementMethod: string;
  gateway: string;
  locationRegion: string;
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Exception';
  dateRequested: string;
  sla: string;
  csat?: number;
}

export interface RefundRecordDetail extends RefundPortfolioRow {
  contactEmail: string;
  contactPhone: string;
  transactionId: string;
  authCode: string;
  capturedOn: string;
  refundReason: string;
  processedBy: string;
  processedOn: string;
  settlementBatch: string;
  reconciledOn: string;
  customerNotified: string;
  notificationChannel: string;
  slaStatus: string;
  resolutionTime: string;
}

/* ── FN06 Supplier Payables Interfaces ── */

export interface SupplierPayableRow {
  id: string;
  payableType: string;
  supplierName: string;
  supplierId: string;
  supplierTier: 'Gold' | 'Platinum' | 'Silver' | 'Bronze';
  invoiceRef: string;
  poRef: string;
  grRef: string;
  businessUnit: string;
  channel: string;
  currency: string;
  grossAmount: number;
  discounts: number;
  credits: number;
  returnsDeduction: number;
  commissionOffset: number;
  marketplaceFees: number;
  taxAmount: number;
  withholdingTax: number;
  netPayable: number;
  paidAmount: number;
  outstandingAmount: number;
  matchStatus: 'Fully Matched' | 'Partial Match' | 'Unmatched';
  approvalStatus: 'Approved' | 'Pending Approval' | 'Pending Review' | 'Rejected';
  dueStatus: 'Due Soon' | 'Past Due' | 'Overdue' | 'Current';
  dueDate: string;
  paymentSchedule: 'Scheduled' | 'Pending' | 'Unscheduled';
  payoutStatus: 'Scheduled' | 'Paid' | 'Processing' | 'On Hold';
  hold: 'No' | 'Active' | 'Released';
  dispute: 'No' | 'Active' | 'Resolved';
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Exception';
  exceptionReason?: string;
  owner: string;
}

export interface SupplierPayableDetail extends SupplierPayableRow {
  riskLevel: string;
  paymentTerms: string;
  preferredCurrency: string;
  invoiceDate: string;
  poDate: string;
  grDate: string;
  receiptStatus: string;
  approvedBy: string;
  approvedOn: string;
  paymentBatch: string;
  scheduledDate: string;
  lastReconciled: string;
  reconciledBy: string;
}


