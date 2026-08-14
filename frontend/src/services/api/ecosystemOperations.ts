import { api } from '@/lib/api/client';

export interface ReleaseRow { id:number; code:string; component:string; module_key:string; category:string; source_version:string|null; target_version:string; target_environment:string; status:string; approval_status:string; readiness_status:string; risk_level:string; owner:string|null; scheduled_at:string|null; lock_version:number; }
export interface Page<T> { data:T[]; current_page:number; last_page:number; per_page:number; total:number; }
export interface ReleaseDashboard { context:Record<string,string|null>; summary:Record<string,number>; health:{score:number|null;status:string;reason:string}; environmentMatrix:Array<{moduleId:number;component:string;versions:Record<string,string>;lastDeployedAt:string|null}>; environmentDrift:Array<{component:string;sourceEnvironment:string;targetEnvironment:string;differenceType:string;sourceValue:string;targetValue:string;severity:string}>; environments:Array<{environment:string;components:number;last_deployed_at:string|null}>; calendar:ReleaseRow[]; readiness:Array<{status:string;count:number}>; governance:Array<{check_type:string;status:string;count:number}>; promotionQueue:ReleaseRow[]; migration:{status:string;message:string}; activity:Array<{id:number;code:string|null;component:string|null;action:string;actor:string|null;created_at:string}>; recommendation:{action:string|null;releaseId:number|null;reason:string}; permissions:Record<string,boolean>; }
export interface HealthModule { id:number;module_key:string;name:string;category:string;health_status:string;latest_status:string|null;response_time_ms:number|null;checked_at:string|null;transactions:number|null;active_users:number|null;primary_owner:string|null;technical_owner:string|null;environment:string|null; }
export interface HealthDashboard { context:{monitoringStatus:string;telemetrySource:string;usageSource:string;lastEvaluated:string|null};summary:Record<string,number|null>;healthStatus:string;operationalSummary:Record<string,number>;adoptionSummary:Record<string,number>;environmentHealth:Array<{environment:string;checks:number;lastCheckedAt:string;status:string}>;incidents:Array<Record<string,unknown>>;activity:Array<Record<string,unknown>>;permissions:Record<string,boolean>;generatedAt:string; }

export const releasesApi={
  dashboard:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/releases/dashboard',{params}) as Promise<{dashboard:ReleaseDashboard}>,
  list:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/releases',{params}) as Promise<{releases:Page<ReleaseRow>}>,
  references:()=>api.get('/admin/ecosystem/releases/references') as Promise<{references:{modules:Array<{id:number;name:string;current_version:string|null}>;environments:string[]} }>,
  create:(data:Record<string,unknown>)=>api.post('/admin/ecosystem/releases',data), detail:(id:number)=>api.get(`/admin/ecosystem/releases/${id}`),
  transition:(id:number,action:string,data:Record<string,unknown>={})=>api.post(`/admin/ecosystem/releases/${id}/${action}`,data),
  export:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/releases/export',{params}),
};
export const healthAdoptionApi={
  dashboard:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/health-adoption/dashboard',{params}) as Promise<{dashboard:HealthDashboard}>,
  modules:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/health-adoption/modules',{params}) as Promise<{modules:Page<HealthModule>}>,
  trends:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/health-adoption/trends',{params}),
  export:(params:Record<string,unknown>={})=>api.get('/admin/ecosystem/health-adoption/export',{params}),
};
