import { apiClient } from './apiClient';

export interface GovernanceRecord { id:string; reference:string; operationType:string; domain:string; title:string; status:string; processedRecords:number; rejectedRecords:number; totalRecords:number; initiatedBy:string; createdAt:string; updatedAt:string; details?:unknown; errorSummary?:string|null }
export interface GovernanceAudit { id:string|number; log_name?:string; description:string; event?:string; actor?:string; created_at:string }
export interface GovernanceData { source:'database'; available?:boolean; reason?:string; capabilities:{dataJobs:boolean;audit:boolean;reconciliation:boolean}; context:{tenant:string;tenantScopeAvailable:boolean}; kpis:{label:string;value:string}[]; records:GovernanceRecord[]; audit:GovernanceAudit[]; meta:{page:number;perPage:number;total:number;lastPage:number;updatedAt:string;refreshIntervalSeconds:number} }
type Envelope<T>={success:boolean;data:T};
export interface GovernanceQuery { search?:string; domain?:string; job_type?:string; status?:string; sort?:string; direction?:'asc'|'desc'; page?:number; per_page?:number }
const qs=(q:GovernanceQuery)=>{const p=new URLSearchParams();Object.entries(q).forEach(([k,v])=>{if(v!==undefined&&v!=='')p.set(k,String(v));});return p.toString()?`?${p}`:''};
export const getReconciliation=async(signal?:AbortSignal)=>(await apiClient<Envelope<GovernanceData>>('/admin/finance/reconciliation-controls',{signal})).data;
export const getFinanceOperations=async(q:GovernanceQuery,signal?:AbortSignal)=>(await apiClient<Envelope<GovernanceData>>(`/admin/finance/reports-import-export-audit${qs(q)}`,{signal})).data;
export const getFinanceOperation=async(id:string,signal?:AbortSignal)=>(await apiClient<Envelope<GovernanceRecord>>(`/admin/finance/reports-import-export-audit/${encodeURIComponent(id)}`,{signal})).data;
