// ─────────────────────────────────────────────────────────────────────────────
// Recall & Safety Incident Command Center — Typed Mock Data
// All values match the VC11 reference screenshot specification.
// Replace with live API data when backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

// ── KPI ──────────────────────────────────────────────────────────────────────
export interface RecallKpi {
  id: number;
  label: string;
  value: string | number;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  status: 'critical' | 'warning' | 'success' | 'info' | 'neutral';
  iconName: string;
}

export const RECALL_KPIS: RecallKpi[] = [
  { id: 1,  label: 'Active Safety Incidents',       value: 18,      trend: '12%',  trendDirection: 'down', status: 'warning',  iconName: 'ShieldAlert' },
  { id: 2,  label: 'Active Recall Cases',            value: 4,       trend: '33%',  trendDirection: 'up',   status: 'critical', iconName: 'RefreshCw' },
  { id: 3,  label: 'Critical Incidents',             value: 3,       trend: '50%',  trendDirection: 'up',   status: 'critical', iconName: 'AlertTriangle' },
  { id: 4,  label: 'Products Under Recall',          value: 29,      trend: '16%',  trendDirection: 'up',   status: 'critical', iconName: 'Package' },
  { id: 5,  label: 'Quarantined Batches',            value: 14,      trend: '27%',  trendDirection: 'up',   status: 'warning',  iconName: 'Flask' },
  { id: 6,  label: 'Quarantined Inventory Units',    value: '3,480', trend: '21%',  trendDirection: 'up',   status: 'warning',  iconName: 'Box' },
  { id: 7,  label: 'Orders Affected',                value: 428,     trend: '18%',  trendDirection: 'up',   status: 'warning',  iconName: 'ShoppingCart' },
  { id: 8,  label: 'Customers Affected',             value: 106,     trend: '14%',  trendDirection: 'up',   status: 'warning',  iconName: 'Users' },
  { id: 9,  label: 'Suppliers Awaiting Response',    value: 6,       trend: '20%',  trendDirection: 'up',   status: 'warning',  iconName: 'Truck' },
  { id: 10, label: 'Customer Notifications Pending', value: 42,      trend: '24%',  trendDirection: 'up',   status: 'warning',  iconName: 'Bell' },
  { id: 11, label: 'Recovery Rate',                  value: '68%',   trend: '9%',   trendDirection: 'up',   status: 'success',  iconName: 'RotateCcw' },
  { id: 12, label: 'Recall SLA Breaches',            value: 9,       trend: '29%',  trendDirection: 'up',   status: 'critical', iconName: 'Clock' },
];

// ── Trend chart data (30-day window, 5 series) ───────────────────────────────
export interface TrendPoint {
  date: string;
  openIncidents: number;
  activeRecalls: number;
  quarantinedBatches: number;
  resolvedCases: number;
  slaBreaches: number;
}

export const TREND_DATA: TrendPoint[] = [
  { date: 'Jul 6',  openIncidents: 14, activeRecalls: 2, quarantinedBatches: 8,  resolvedCases: 3,  slaBreaches: 4 },
  { date: 'Jul 13', openIncidents: 16, activeRecalls: 3, quarantinedBatches: 10, resolvedCases: 5,  slaBreaches: 5 },
  { date: 'Jul 20', openIncidents: 15, activeRecalls: 3, quarantinedBatches: 11, resolvedCases: 7,  slaBreaches: 6 },
  { date: 'Jul 27', openIncidents: 17, activeRecalls: 4, quarantinedBatches: 13, resolvedCases: 8,  slaBreaches: 8 },
  { date: 'Aug 3',  openIncidents: 18, activeRecalls: 4, quarantinedBatches: 14, resolvedCases: 9,  slaBreaches: 9 },
];

// ── Incident type donut ───────────────────────────────────────────────────────
export interface DonutCategory {
  name: string;
  value: number;
  color: string;
}

export const INCIDENT_TYPE_DEFAULTS: DonutCategory[] = [
  { name: 'Adverse Reaction', value: 42, color: '#dc2626' },
  { name: 'Contamination',    value: 38, color: '#f97316' },
  { name: 'Packaging Failure',value: 28, color: '#f59e0b' },
  { name: 'Labelling Error',  value: 18, color: '#8b5cf6' },
  { name: 'Foreign Matter',   value: 16, color: '#2563eb' },
  { name: 'Other',            value: 14, color: '#9ca3af' },
];

// ── Status summary ────────────────────────────────────────────────────────────
export interface StatusRow {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export const STATUS_DEFAULTS: StatusRow[] = [
  { label: 'New',               count: 18, percentage: 11.5, color: '#2563eb' },
  { label: 'Under Review',      count: 24, percentage: 15.4, color: '#8b5cf6' },
  { label: 'Quarantine',        count: 14, percentage: 9.0,  color: '#7c3aed' },
  { label: 'Investigating',     count: 22, percentage: 14.1, color: '#f59e0b' },
  { label: 'Customer Notified', count: 28, percentage: 17.9, color: '#f97316' },
  { label: 'Regulatory Filed',  count: 16, percentage: 10.3, color: '#0891b2' },
  { label: 'Recovering',        count: 12, percentage: 7.7,  color: '#16a34a' },
  { label: 'Resolved',          count: 14, percentage: 9.0,  color: '#059669' },
  { label: 'Closed',            count: 8,  percentage: 5.1,  color: '#6b7280' },
];

// ── Readiness scorecard ───────────────────────────────────────────────────────
export interface ReadinessMetric {
  label: string;
  key: string;
  value: number;
}

export const READINESS_METRICS: ReadinessMetric[] = [
  { label: 'Detection Readiness',    key: 'detection',     value: 84 },
  { label: 'Classification Quality', key: 'classification',value: 79 },
  { label: 'Traceability Coverage',  key: 'traceability',  value: 99 },
  { label: 'Inventory Containment',  key: 'containment',   value: 86 },
  { label: 'Customer Notification',  key: 'notification',  value: 72 },
  { label: 'Regulatory Readiness',   key: 'regulatory',    value: 81 },
  { label: 'Recovery Readiness',     key: 'recovery',      value: 68 },
  { label: 'Supplier Response',      key: 'supplier',      value: 77 },
  { label: 'Closure Readiness',      key: 'closure',       value: 74 },
  { label: 'Audit Readiness',        key: 'audit',         value: 88 },
];

// ── Incident portfolio table ──────────────────────────────────────────────────
export interface RecallIncident {
  id: string;
  type: string;
  recallClass: string;
  detectionSource: string;
  product: string;
  sku: string;
  supplier: string;
  brand: string;
  affectedBatches: number;
  inventoryUnits: number;
  ordersAffected: number;
  customersAffected: number;
  notificationStatus: string;
  supplierResponse: string;
  customerNotification: string;
  regulatoryStatus: string;
  recoveryRate: number;
  incidentOwner: string;
  dueDate: string;
  sla: string;
  slaBreached: boolean;
  status: string;
}

export const INCIDENT_MOCK_ROWS: RecallIncident[] = [
  {
    id: 'RCL-2025-00691',
    type: 'Adverse Reaction',
    recallClass: 'Class I',
    detectionSource: 'Customer Complaint',
    product: 'Luxe Radiance Serum 30ml',
    sku: 'LRS-30-001',
    supplier: 'Glow Formulations Ltd',
    brand: 'Luxe Beauty',
    affectedBatches: 3,
    inventoryUnits: 840,
    ordersAffected: 112,
    customersAffected: 28,
    notificationStatus: 'Notified',
    supplierResponse: 'Responded',
    customerNotification: 'Notified',
    regulatoryStatus: 'Filed',
    recoveryRate: 62,
    incidentOwner: 'A. Perera',
    dueDate: 'Aug 08, 2025',
    sla: '-2d',
    slaBreached: true,
    status: 'Active Recall',
  },
  {
    id: 'RCL-2025-00677',
    type: 'Contamination',
    recallClass: 'Class I',
    detectionSource: 'Lab Test',
    product: 'Pure Mineral Foundation SPF25',
    sku: 'PMF-SPF-002',
    supplier: 'CeraMin Cosmetics',
    brand: 'Pure Mineral',
    affectedBatches: 2,
    inventoryUnits: 1200,
    ordersAffected: 89,
    customersAffected: 32,
    notificationStatus: 'In Progress',
    supplierResponse: 'Pending',
    customerNotification: 'In Progress',
    regulatoryStatus: 'In Progress',
    recoveryRate: 41,
    incidentOwner: 'S. Fernando',
    dueDate: 'Aug 10, 2025',
    sla: '-1d',
    slaBreached: true,
    status: 'Active Recall',
  },
  {
    id: 'RCL-2025-00654',
    type: 'Packaging Failure',
    recallClass: 'Class II',
    detectionSource: 'QC Inspection',
    product: 'Hydra Boost Moisturiser 50ml',
    sku: 'HBM-50-003',
    supplier: 'VitaSkin Suppliers',
    brand: 'Hydra Boost',
    affectedBatches: 5,
    inventoryUnits: 620,
    ordersAffected: 74,
    customersAffected: 18,
    notificationStatus: 'Pending',
    supplierResponse: 'Responded',
    customerNotification: 'Pending',
    regulatoryStatus: 'Not Filed',
    recoveryRate: 78,
    incidentOwner: 'R. Silva',
    dueDate: 'Aug 14, 2025',
    sla: '+1d',
    slaBreached: false,
    status: 'Quarantine',
  },
  {
    id: 'RCL-2025-00648',
    type: 'Labelling Error',
    recallClass: 'Class III',
    detectionSource: 'Internal Audit',
    product: 'Vitamin C Brightening Toner',
    sku: 'VCT-100-004',
    supplier: 'BrightDerm Labs',
    brand: 'VitaBright',
    affectedBatches: 1,
    inventoryUnits: 340,
    ordersAffected: 42,
    customersAffected: 11,
    notificationStatus: 'Notified',
    supplierResponse: 'Responded',
    customerNotification: 'Notified',
    regulatoryStatus: 'Not Required',
    recoveryRate: 91,
    incidentOwner: 'K. Jayawardena',
    dueDate: 'Aug 18, 2025',
    sla: '+2d',
    slaBreached: false,
    status: 'Recovering',
  },
  {
    id: 'INC-2025-00839',
    type: 'Foreign Matter',
    recallClass: 'Safety Advisory',
    detectionSource: 'Social Media',
    product: 'Rose Gold Face Mask Sheet',
    sku: 'RGF-MASK-005',
    supplier: 'NaturalGlow SL',
    brand: 'Rose Gold Skin',
    affectedBatches: 2,
    inventoryUnits: 280,
    ordersAffected: 67,
    customersAffected: 9,
    notificationStatus: 'In Progress',
    supplierResponse: 'Overdue',
    customerNotification: 'In Progress',
    regulatoryStatus: 'Due Soon',
    recoveryRate: 33,
    incidentOwner: 'D. Madushan',
    dueDate: 'Aug 11, 2025',
    sla: '-1d',
    slaBreached: true,
    status: 'Investigating',
  },
  {
    id: 'INC-2025-00812',
    type: 'Adverse Reaction',
    recallClass: 'Batch-Level Quarantine',
    detectionSource: 'Customer Complaint',
    product: 'Collagen Repair Night Cream',
    sku: 'CRN-75-006',
    supplier: 'DermaLux International',
    brand: 'CollagenX',
    affectedBatches: 1,
    inventoryUnits: 200,
    ordersAffected: 44,
    customersAffected: 8,
    notificationStatus: 'Pending',
    supplierResponse: 'Pending',
    customerNotification: 'Not Sent',
    regulatoryStatus: 'Not Filed',
    recoveryRate: 15,
    incidentOwner: 'M. Bandara',
    dueDate: 'Aug 15, 2025',
    sla: '+3d',
    slaBreached: false,
    status: 'Under Review',
  },
];

// ── Operational panels ────────────────────────────────────────────────────────
export interface OpRow {
  label: string;
  cols: (string | number)[];
}

export interface OperationalPanel {
  id: string;
  title: string;
  headers: string[];
  rows: OpRow[];
  viewAllLabel?: string;
}

export const OPERATIONAL_PANELS: OperationalPanel[] = [
  {
    id: 'signal-detection',
    title: '01 Safety Signal & Incident Detection',
    headers: ['Source', 'Signals', 'New (24h)'],
    rows: [
      { label: 'Customer Complaints', cols: [34, 8] },
      { label: 'Lab Test Results',    cols: [12, 3] },
      { label: 'QC Inspections',      cols: [19, 2] },
      { label: 'Social Media',        cols: [7,  1] },
      { label: 'Supplier Reports',    cols: [9,  1] },
    ],
  },
  {
    id: 'assessment-classification',
    title: '02 Recall Assessment & Classification',
    headers: ['Class', 'Cases', '%', 'SLA Breaches'],
    rows: [
      { label: 'Class I',           cols: [6,  '33.3%', 3] },
      { label: 'Class II',          cols: [5,  '27.8%', 1] },
      { label: 'Class III',         cols: [4,  '22.2%', 0] },
      { label: 'Safety Advisory',   cols: [2,  '11.1%', 0] },
      { label: 'Market Withdrawal', cols: [1,  '5.6%',  0] },
    ],
  },
  {
    id: 'traceability',
    title: '03 Product & Batch Traceability',
    headers: ['Level', 'Products', '% Coverage'],
    rows: [
      { label: 'Batch-Level',    cols: [29, '100%'] },
      { label: 'SKU-Level',      cols: [29, '100%'] },
      { label: 'Product-Level',  cols: [27, '93.1%'] },
      { label: 'Supplier-Level', cols: [24, '82.8%'] },
    ],
  },
  {
    id: 'containment',
    title: '04 Inventory Containment & Quarantine',
    headers: ['Location', 'Batches', 'Units', '%'],
    rows: [
      { label: 'Quarantined',     cols: [8,  1820, '52.3%'] },
      { label: 'Hold at DC',      cols: [3,  940,  '27.0%'] },
      { label: 'Hold at Store',   cols: [2,  520,  '14.9%'] },
      { label: 'In Transit Hold', cols: [1,  200,  '5.7%']  },
    ],
  },
  {
    id: 'order-traceability',
    title: '05 Order & Customer Traceability',
    headers: ['Stage', 'Orders', 'Customers', '%'],
    rows: [
      { label: 'Orders Identified', cols: [428, 106, '100%'] },
      { label: 'Orders Shipped',    cols: [312, 81,  '72.9%'] },
      { label: 'Orders Delivered',  cols: [267, 68,  '62.4%'] },
      { label: 'Returns Initiated', cols: [89,  24,  '20.8%'] },
    ],
  },
  {
    id: 'supplier-response',
    title: '06 Supplier & Brand Response',
    headers: ['Status', 'Suppliers', '%'],
    rows: [
      { label: 'Responded',        cols: [14, '63.6%'] },
      { label: 'Pending Response', cols: [5,  '22.7%'] },
      { label: 'Overdue',          cols: [2,  '9.1%']  },
      { label: 'Escalated',        cols: [1,  '4.5%']  },
    ],
  },
  {
    id: 'customer-notification',
    title: '07 Customer Notification Operations',
    headers: ['Status', 'Customers', '%'],
    rows: [
      { label: 'Notified',        cols: [47, '44.3%'] },
      { label: 'Pending',         cols: [38, '35.8%'] },
      { label: 'In Progress',     cols: [14, '13.2%'] },
      { label: 'Failed Delivery', cols: [7,  '6.6%']  },
    ],
  },
  {
    id: 'regulatory-reporting',
    title: '08 Regulatory Reporting',
    headers: ['Status', 'Cases', '%'],
    rows: [
      { label: 'Filed',           cols: [6,  '33.3%'] },
      { label: 'In Progress',     cols: [4,  '22.2%'] },
      { label: 'Due Soon (<3d)',  cols: [3,  '16.7%'] },
      { label: 'Not Filed',       cols: [5,  '27.8%'] },
    ],
  },
  {
    id: 'recovery-returns',
    title: '09 Recovery, Returns & Refunds',
    headers: ['Stage', 'Orders', 'Refunds (LKR)', '%'],
    rows: [
      { label: 'Returns Received', cols: [89,  '223,600', '20.8%'] },
      { label: 'Refunds Approved', cols: [64,  '162,400', '15.0%'] },
      { label: 'Refunds Paid',     cols: [51,  '128,900', '11.9%'] },
    ],
  },
  {
    id: 'capa',
    title: '10 Corrective & Preventive Actions',
    headers: ['Status', 'Actions', 'On Track', '%'],
    rows: [
      { label: 'Planned',     cols: [8,  8,  '100%'] },
      { label: 'In Progress', cols: [12, 9,  '75.0%'] },
      { label: 'Overdue',     cols: [3,  0,  '0%']   },
      { label: 'Closed',      cols: [7,  7,  '100%'] },
    ],
  },
  {
    id: 'revalidation',
    title: '11 Revalidation & Recall Closure',
    headers: ['Stage', 'Cases', '%'],
    rows: [
      { label: 'Revalidation Pending',     cols: [4,  '22.2%'] },
      { label: 'Revalidation In Progress', cols: [3,  '16.7%'] },
      { label: 'Revalidation Approved',    cols: [5,  '27.8%'] },
      { label: 'Closed',                   cols: [6,  '33.3%'] },
    ],
  },
  {
    id: 'recent-activity',
    title: '12 Recent Recall & Safety Incident Activity',
    headers: ['Activity', 'Case', 'Time', 'User'],
    rows: [
      { label: 'Recall assessment pending',       cols: ['RCL-2025-00691', '2h ago', 'A. Perera'] },
      { label: 'Class I recall confirmed',        cols: ['RCL-2025-00677', '4h ago', 'S. Fernando'] },
      { label: 'Customer notifications sent',     cols: ['RCL-2025-00648', '6h ago', 'R. Silva'] },
      { label: 'Supplier response overdue',       cols: ['INC-2025-00839', '8h ago', 'D. Madushan'] },
      { label: 'Regulatory filing due in 2 days', cols: ['RCL-2025-00654', '1d ago', 'K. Jayawardena'] },
      { label: 'Quarantine review scheduled',     cols: ['INC-2025-00812', '1d ago', 'M. Bandara'] },
    ],
    viewAllLabel: 'View All Activity',
  },
];

// ── Classification reference ──────────────────────────────────────────────────
export interface ClassificationRef {
  label: string;
  description: string;
  bg: string;
  text: string;
  border: string;
}

export const CLASSIFICATION_REFS: ClassificationRef[] = [
  { label: 'Class I',               description: 'Risk of serious adverse health consequences', bg: 'bg-red-50',    text: 'text-red-800',    border: 'border-red-200' },
  { label: 'Class II',              description: 'Temporary or medically reversible consequences', bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
  { label: 'Class III',             description: 'Unlikely to cause adverse health consequences', bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-200' },
  { label: 'Market Withdrawal',     description: 'From market, not consumer',                    bg: 'bg-blue-50',   text: 'text-blue-800',   border: 'border-blue-200' },
  { label: 'Safety Advisory',       description: 'Informational guidance',                       bg: 'bg-sky-50',    text: 'text-sky-800',    border: 'border-sky-200' },
  { label: 'Batch-Level Quarantine',description: 'Specific batches quarantined',                bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
  { label: 'Product-Level Recall',  description: 'All units recalled',                          bg: 'bg-rose-50',   text: 'text-rose-800',   border: 'border-rose-200' },
  { label: 'Supplier-Level Review', description: 'Supplier scope investigation',                 bg: 'bg-slate-50',  text: 'text-slate-800',  border: 'border-slate-200' },
];

// ── Lifecycle steps ───────────────────────────────────────────────────────────
export interface LifecycleStep {
  number: number;
  label: string;
}

export const LIFECYCLE_STEPS: LifecycleStep[] = [
  { number: 1,  label: 'Signal Detected' },
  { number: 2,  label: 'Case Created' },
  { number: 3,  label: 'Initial Triage' },
  { number: 4,  label: 'Risk Assessment' },
  { number: 5,  label: 'Classification' },
  { number: 6,  label: 'Quarantine Applied' },
  { number: 7,  label: 'Customer Notification' },
  { number: 8,  label: 'Regulatory Filing' },
  { number: 9,  label: 'Recovery Active' },
  { number: 10, label: 'CAPA / Corrective Action' },
  { number: 11, label: 'Revalidation' },
  { number: 12, label: 'Supplier Sign-off' },
  { number: 13, label: 'Closed' },
  { number: 14, label: 'Audit Complete' },
];

// ── Intelligence rail alerts ──────────────────────────────────────────────────
export interface RecallAlert {
  id: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  time: string;
}

export const RECALL_ALERTS_DEFAULT: RecallAlert[] = [
  { id: 'a1', message: 'Certain formulation investigation trending',  severity: 'critical', time: '2h ago' },
  { id: 'a2', message: 'Supplier SLA risk — 8% failing',             severity: 'high',     time: '4h ago' },
  { id: 'a3', message: 'Pending response for key batch',              severity: 'high',     time: '6h ago' },
  { id: 'a4', message: 'Packaging integrity issue detected',          severity: 'high',     time: '7h ago' },
  { id: 'a5', message: 'Foreign matter detected in QC',               severity: 'critical', time: '8h ago' },
  { id: 'a6', message: 'Customer communications pending',             severity: 'medium',   time: '12h ago' },
  { id: 'a7', message: 'Regulatory submission due this quarter',      severity: 'medium',   time: '1d ago' },
  { id: 'a8', message: 'Potential supplier risk identified',          severity: 'medium',   time: '2d ago' },
];

// ── Intelligence signal bars ──────────────────────────────────────────────────
export interface SignalBar {
  label: string;
  value: number;
  color: string;
}

export const SIGNAL_BARS: SignalBar[] = [
  { label: 'Supplier Response',    value: 74, color: '#2563eb' },
  { label: 'Expired / Near Expiry',value: 62, color: '#f59e0b' },
  { label: 'Packaging Integrity',  value: 81, color: '#7c3aed' },
  { label: 'Consumer Reported',    value: 55, color: '#dc2626' },
  { label: 'Regulatory Readiness', value: 88, color: '#0891b2' },
  { label: 'Compliance Trends',    value: 79, color: '#16a34a' },
];

// ── Intelligence system summary ───────────────────────────────────────────────
export const SYSTEM_SUMMARY = {
  open_cases: 22,
  orders_pending: 139,
  quarantine_pending: 14,
  regulatory: 9,
  active_suppliers: 22,
  quarantined: '3,480',
  avg_closure: '6.2d',
  avg_response: '1.4d',
};

// ── Failure metrics ───────────────────────────────────────────────────────────
export const FAILURE_METRICS = {
  cases_failed: 3,
  customer_response: 7,
  regulatory_escalations: 2,
  overdue_quarantines: 4,
};
