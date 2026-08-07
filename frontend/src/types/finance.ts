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
