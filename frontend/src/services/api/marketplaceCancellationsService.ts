import { apiClient, downloadApiFile } from "@/services/api/apiClient";

export type Availability = { available: boolean; reason?: string };
export type CancellationMetric = Availability & { id: string; label: string; value: number | string | null; definition?: string; unit?: string | null };
export type CancellationLedgerItem = {
  id: string; cancellationReference: null; orderId: string; orderReference: string;
  customer: { id: string; name: string }; seller: { id: string; name: string } | null;
  orderTotal: { amount: string; currency: string }; paymentStatus: string; paymentMethod: string | null;
  fulfilmentStatus: string; delivery: { status: string; carrier: string | null } | null;
  refund: { count: number; amount: string; status: string | null }; status: "cancelled"; recordedAt: string; timestampSource: string;
  requestType: Availability; reason: Availability; source: Availability; sellerLiability: Availability; risk: Availability; sla: Availability;
};
export type CancellationFilters = Record<string, string | number | undefined>;
export type MarketplaceCancellationsData = {
  availability: Availability & { mode: string }; context: { tenant: string; ecosystem: string; currency: string | null; dateFrom: string; dateTo: string; timezone: string };
  availableCurrencies: string[]; kpis: CancellationMetric[]; trend: Availability & { items: Array<{date:string;cancelled:number}> };
  reasons: Availability & { items: unknown[] }; health: Availability; scorecard: Availability & { items: unknown[] };
  items: CancellationLedgerItem[]; filters: { paymentStatuses:string[]; fulfilmentStatuses:string[]; deliveryStatuses:string[]; refundStatuses:string[]; sellers:Array<{id:number;name:string}>; customers:Array<{id:number;name:string}> };
  alerts: Array<{id:string;type:string;orderId:string;orderReference:string;refundReference:string;createdAt:string}>;
  statusSummary:Array<{status:string;count:number}>; refundImpact:Availability & {currency?:string;items:Array<{status:string;count:number;amount:string}>};
  inventoryRelease:Availability; shipmentIntervention:Availability; sellerLiability:Availability; risk:Availability; communication:Availability; sla:Availability; eligibility:Availability;
  quickQueues:Array<{id:string;label:string;count:number;filter:Record<string,string>}>; capabilities:Record<string,boolean>;
  permissions:{canView:boolean;canExport:boolean;canMutate:boolean}; meta:{page:number;perPage:number;total:number;totalPages:number;from:number|null;to:number|null;generatedAt:string;dataAsOf:string;refreshIntervalSeconds:number};
};

const query = (filters: CancellationFilters = {}) => { const params=new URLSearchParams(); Object.entries(filters).forEach(([key,value])=>{if(value!==undefined&&value!==""&&value!=="all")params.set(key,String(value))}); const value=params.toString(); return value?`?${value}`:"" };
export async function fetchMarketplaceCancellations(filters:CancellationFilters={},signal?:AbortSignal):Promise<MarketplaceCancellationsData>{const response=await apiClient<{success:true;data:MarketplaceCancellationsData}>(`/admin/marketplace/orders/cancellations${query(filters)}`,{signal});return response.data}
export async function exportMarketplaceCancellations(filters:CancellationFilters={},signal?:AbortSignal):Promise<void>{await downloadApiFile(`/admin/marketplace/orders/cancellations/export${query(filters)}`,"marketplace-cancellations.csv",signal)}
