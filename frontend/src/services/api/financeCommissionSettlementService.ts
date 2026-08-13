import{api,withQuery}from'@/lib/api/client';
export interface OpsFilters{dateFrom:string;dateTo:string;currency:string;search:string;status:string;page:number;perPage:number;sort:string;direction:'asc'|'desc'}
const q=(f:OpsFilters)=>({dateFrom:f.dateFrom,dateTo:f.dateTo,currency:f.currency,search:f.search||undefined,status:f.status||undefined,page:f.page,perPage:f.perPage,sort:f.sort,direction:f.direction});
export async function fetchCommissions(f:OpsFilters,signal?:AbortSignal){return(await api.get(withQuery('/admin/marketplace/commissions',q(f)),{signal})).data;}
export async function fetchSettlements(f:OpsFilters,signal?:AbortSignal){const sortMap:Record<string,string>={period:'dueDate',commission:'netAmount',net:'netAmount',gross:'grossAmount'};return(await api.get(withQuery('/admin/finance/supplier-payables', {...q(f),sort:sortMap[f.sort]??f.sort}),{signal})).data;}
export async function fetchSettlementsOverview(f:OpsFilters,signal?:AbortSignal){return(await api.get(withQuery('/admin/finance/supplier-payables/overview',q(f)),{signal})).data;}
export async function fetchSettlementDetail(id:string,signal?:AbortSignal){return(await api.get(`/admin/finance/supplier-payables/${encodeURIComponent(id)}`,{signal})).data;}
