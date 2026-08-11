import { api, withQuery } from '@/lib/api/client';

export type FinancePageFilters={dateFrom:string;dateTo:string;currency:string;search:string;status:string;page:number;perPage:number};
export async function fetchRevenueReceivables(filters:FinancePageFilters,signal?:AbortSignal){const response=await api.get(withQuery('/admin/finance/revenue-receivables',filters),{signal});return response.data;}
export async function fetchPaymentsManagement(filters:FinancePageFilters,signal?:AbortSignal){const response=await api.get(withQuery('/admin/finance/payments',filters),{signal});return response.data;}
