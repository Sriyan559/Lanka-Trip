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

/* ── FN08 Marketplace Commissions & Fees Interfaces ── */

export interface CommissionPortfolioRow {
  id: string;
  recordType: string;
  orderId: string;
  partyName: string;
  partyId: string;
  category: string;
  brand: string;
  businessUnit: string;
  channel: string;
  currency: string;
  grossSale: number;
  commissionBase: number;
  commissionRule: string;
  rulePct: number;
  ratePct: number;
  commissionAmount: number;
  platformFee: number;
  processingFee: number;
  fulfilmentFee: number;
  logisticsFee: number;
  promoContribution: number;
  penalty: number;
  waiverExemption: number;
  approvedAmount: number;
  tax: number;
  reversal: number;
  compensation: number;
  calculationStatus: 'Calculated' | 'Pending Review' | 'Adjusted' | 'Reversed';
  approvalStatus: 'Approved' | 'Pending Approval' | 'Pending Review' | 'Rejected';
  settlementStatus: 'Settlement Pending' | 'Allocated' | 'Pending' | 'On Hold';
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Exception';
  disputeStatus: 'No' | 'Active' | 'Resolved';
  sla: string;
  owner: string;
  calculatedDate: string;
  updatedAt: string;
}

export interface CommissionRecordDetail extends CommissionPortfolioRow {
  productName: string;
  ruleVersion: string;
  effectiveDate: string;
  netCommissionValue: number;
  settlementPendingAmount: number;
  reviewer: string;
  approver: string;
}

/* ── FN09 Settlements & Payouts Interfaces ── */

export interface SettlementPortfolioRow {
  id: string;
  settlementType: string;
  settlementBatch: string;
  beneficiaryName: string;
  beneficiaryType: 'Supplier' | 'Seller' | 'Logistics Partner' | 'Service Provider' | 'Affiliate' | 'Marketplace Partner' | 'Other';
  grossEarnings: number;
  netSettlement: number;
  paidAmount: number;
  outstandingAmount: number;
  currency: string;
  approvalStatus: 'Approved' | 'Pending Approval' | 'Pending Review' | 'Rejected';
  payoutStatus: 'Completed' | 'Scheduled' | 'Processing' | 'Failed' | 'On Hold';
  holdStatus: 'Clear' | 'On Hold' | 'Released';
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Exception';
  sla: 'On Track' | 'At Risk' | 'Breached';
  scheduledDate: string;
  completionDate: string;
  owner: string;
}

export interface SettlementRecordDetail extends SettlementPortfolioRow {
  settlementPeriod: string;
  supplierId?: string;
  businessUnit: string;
  region: string;
  paymentMethod: string;
  paymentProvider: string;
  beneficiaryEmail: string;
  bankName: string;
  accountName: string;
  maskedAccount: string;
  branch: string;
  destinationValidation: string;
  validationDate: string;
  supplierPayablesDeduction: number;
  sellerEarnings: number;
  commissionDeduction: number;
  platformFeeDeduction: number;
  refundDeduction: number;
  returnDeduction: number;
  logisticsCharge: number;
  taxAmount: number;
  withholdingTax: number;
  reserveAmount: number;
  manualAdjustments: number;
  approvalTrail: { step: string; user: string; date: string; status: string }[];
}

/* ── FN10 Settlement / Payout Detail Extra Interfaces ── */

export interface FN10SettlementCalculationLine {
  lineNo: number;
  description: string;
  treatment: 'Additive' | 'Deductive' | 'Informational' | 'Reserve' | 'Credit';
  sourceRecord: string;
  expectedAmount: number;
  actualAmount: number;
  approvedAmount: number;
  variance: number;
  includedInDeductions: boolean;
  status: 'Validated' | 'Pending' | 'Flagged';
}

export interface FN10SettlementReconRow {
  type: string;
  status: 'Completed' | 'Not Started' | 'In Progress' | 'Exception';
  matchRate: string;
  variance: number;
  notes: string;
}

export interface FN10ProviderEvent {
  event: string;
  time: string;
  status: string;
}

/* ── FN11 Invoices, Credit Notes & Debit Notes Interfaces ── */

export interface FinancialDocumentRow {
  id: string;
  documentType: 'Customer Invoice' | 'B2B Invoice' | 'Supplier Invoice' | 'Marketplace Fee Invoice' | 'Credit Note' | 'Debit Note' | 'Proforma Invoice' | 'Consolidated Invoice';
  externalDocNum: string;
  partyName: string;
  partyId: string;
  partyType: 'Customer' | 'Business' | 'Supplier' | 'Seller';
  relatedOrder: string;
  purchaseOrder: string;
  goodsReceipt: string;
  businessUnit: string;
  channel: string;
  currency: string;
  grossAmount: number;
  discount: number;
  tax: number;
  withholding: number;
  credits: number;
  adjustments: number;
  netAmount: number;
  paidAmount: number;
  discountSettlement: number;
  approvalStatus: 'Approved' | 'Pending Approval' | 'Pending Review' | 'Draft';
  invoiceStatus: 'Draft' | 'Issued' | 'Sent' | 'Viewed' | 'Due Soon' | 'Overdue' | 'Paid' | 'Partially Paid' | 'Cancelled';
  deliveryStatus: 'Sent' | 'Delivered' | 'Failed' | 'Pending';
  paymentStatus: 'Paid' | 'Partially Paid' | 'Unpaid' | 'Overdue';
  paymentMatch: 'Matched' | 'Partial Match' | 'Unmatched';
  taxStatus: 'Valid' | 'Exempt' | 'Review Required';
  duplicateStatus: 'No Risk' | 'Low Risk' | 'High Risk';
  matchStatus: 'Matched' | 'Pending' | 'Exception';
  holdStatus: 'No' | 'Active' | 'Released';
  disputeStatus: 'No' | 'Active' | 'Resolved';
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Exception';
  exceptionStatus: 'None' | 'SLA Breach' | 'Tax Exception' | 'Variance';
  owner: string;
  docDate: string;
  dueDate: string;
  sla: string;
}

export interface FinancialDocumentDetail extends FinancialDocumentRow {
  lineItems: { description: string; qty: number; unitPrice: number; total: number }[];
  deliverySentDate: string;
  deliveryViewedDate: string;
  lastPaymentDate: string;
  duplicateConfidencePct: number;
  approvalChain: { step: string; user: string; date: string }[];
}

/* ── FN12 Tax, Currency & Financial Configuration Interfaces ── */

export interface ConfigurationPortfolioRow {
  id: string;
  domain: 'Tax' | 'Currency' | 'FX' | 'Rounding' | 'Accounting Period' | 'Financial Calendar' | 'Exemption' | 'Withholding';
  type: string;
  name: string;
  jurisdictionOrCurrency: string;
  scope: 'Nationwide' | 'Global' | 'Regional';
  businessUnit: string;
  channel: string;
  region: string;
  country: string;
  partyType: string;
  productScope: string;
  rateOrPct: string;
  calculationMethod: string;
  priority: 'High' | 'Medium' | 'Low';
  effectiveFrom: string;
  effectiveTo: string;
  version: string;
  source: 'System' | 'Manual' | 'Reuters API' | 'Central Bank';
  approvalStatus: 'Approved' | 'Pending Approval' | 'Pending Review' | 'Draft';
  activationStatus: 'Active' | 'Current' | 'Open' | 'Scheduled' | 'Expiring';
  conflictStatus: 'None' | 'Conflicting' | 'Potential';
  dependencyHealth: 'Healthy' | 'Warning' | 'Broken';
  exceptionStatus: 'None' | 'Exception' | 'Pending';
  owner: string;
  reviewer: string;
  approver: string;
  updatedAt: string;
  sla: string;
}

export interface ConfigurationRecordDetail extends ConfigurationPortfolioRow {
  provider: string;
  rateType: string;
  freshness: string;
  overrideStatus: string;
  nextReview: string;
  sourceCurrency: string;
  targetCurrency: string;
  numericRate: number;
  precision: number;
  roundingMode: string;
  fallbackSource: string;
  spread: string;
  conversionFee: string;
  expiryPolicy: string;
  linkedInvoicesCount: number;
  linkedPayablesCount: number;
  linkedSettlementsCount: number;
  commissionRunsCount: number;
  taxProfilesCount: number;
  affectedOrdersCount: number;
  affectedInvoicesCount: number;
  affectedPayablesCount: number;
  affectedSettlementsCount: number;
  customerPriceImpact: string;
  revenueImpact: string;
  payoutImpact: string;
  taxImpact: string;
}


