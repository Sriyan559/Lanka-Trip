export type FinanceFilters = {
  dateFrom: string; dateTo: string; currency: string; search: string; domain: string; status: string;
  sort: string; direction: 'asc' | 'desc'; page: number; perPage: number;
};
export type FinanceKpiData = {id:string;label:string;description:string;icon:string;available:boolean;value:number;currency:string|null;comparison:number|null;sparkline:number[];reason:string|null};
export type FinanceOperation = {recordKey:string;reference:string;domain:string;type:string;relatedReference:string;party:string;currency:string;grossAmount:number;taxAmount:number;feeAmount:number;commissionAmount:number;refundAmount:number;netAmount:number;status:string;approvalStatus:string;transactionDate:string;updatedAt:string};
export type FinanceDashboard = {
  source:'database'; context:{tenant:string;ecosystem:string;businessUnit:string;salesChannel:string;region:string;currency:string;currencies:string[];dateFrom:string;dateTo:string;timezone:string;tenantScopeAvailable:boolean};
  kpis:FinanceKpiData[]; trend:{currency:string;items:Array<{period:string;gmv:number;revenue:number;collections:number;refunds:number;failed:number}>};
  paymentMethods:{currency:string;total:number;items:Array<{method:string;count:number;amount:number;percentage:number}>};
  statusSummary:{currency:string;total:number;items:Array<{status:string;count:number;amount:number;percentage:number}>};
  health:{available:boolean;score:number|null;reason:string;items:Array<{label:string;score:number}>};
  alerts:Array<{id:string;severity:'Critical'|'High'|'Medium'|'Low'|'Info';message:string;href:string}>;
  queues:{exceptions:number;approvals:number;receivables:number;payables:number;settlements:number};
  summaries:Array<{id:string;title:string;available:boolean;reason?:string;metrics:Array<{label:string;value:string|number}>}>;
  activity:Array<{id:string;eventType:string;entity:string;entityId:string;actor:string|null;timestamp:string;description:string;status:string}>;
  capabilities:Record<string,boolean>; permissions:{canView:boolean;canExport:boolean;canCreateJournal:boolean;canMutate:boolean};
  meta:{generatedAt:string;dataAsOf:string;refreshIntervalSeconds:number};
};
export type FinanceOperationsResponse = {items:FinanceOperation[];meta:{page:number;perPage:number;total:number;lastPage:number};permissions:{canView:boolean;canExport:boolean}};
export type FinanceOperationDetail = {record:FinanceOperation;relationships:Record<string,string|null>;activity:unknown[];audit:unknown[];capabilities:Record<string,boolean>;permissions:{canView:boolean;canMutate:boolean}};
