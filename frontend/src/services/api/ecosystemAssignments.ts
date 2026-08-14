import { api, API_BASE, withQuery } from '@/lib/api/client';
export type AssignmentKind='assignments'|'capabilities';
export type AssignmentRow={id:number;uuid:string;tenant_id:number;tenant_name:string;business_unit_id:number|null;business_unit_name:string|null;channel_id:number|null;channel_name:string|null;module_id:number;module_key:string;module_name:string;category:string|null;module_type:string|null;capability_id?:number;capability_key?:string;capability_name?:string;environment:string;assignment_type:string;status:string;governance_status:string;risk_level:string;production_eligible:boolean|null;eligibility_reasons:string[]|null;updated_at:string};
export type Distribution={key:string|null;count:number};
export type AssignmentDashboard={summary:Record<string,number>;coverage:Distribution[];statuses:Distribution[];governance:Distribution[];risks:Distribution[];productionEligibility:{eligible:number;notEligible:number;notEvaluated:number};health:{score:number|null;status:string;reason:string};conflicts:unknown[];activity:Array<{id:number;action:string;entity_id:number;actor:string|null;created_at:string}>;permissions:{canCreate:boolean;canUpdate:boolean;canRevoke:boolean;canExport:boolean};generatedAt:string;source:string};
export type References={tenants:Array<{id:number;name:string}>;businessUnits:Array<{id:number;tenantId:number;name:string}>;channels:Array<{id:number;businessUnitId:number;name:string}>;modules:Array<{id:number;name:string;key:string}>;capabilities:Array<{id:number;moduleId:number;name:string}>;environments:string[]};
export async function fetchAssignmentReferences():Promise<References>{const r=await api.get('/admin/ecosystem/assignment-references') as {references:References};return r.references;}
export async function fetchAssignmentDashboard(kind:AssignmentKind,params:Record<string,unknown>={}):Promise<AssignmentDashboard>{const r=await api.get(`/admin/ecosystem/${kind}/dashboard`,{params}) as {dashboard:AssignmentDashboard};return r.dashboard;}
export async function fetchAssignments(kind:AssignmentKind,params:Record<string,unknown>={}){const r=await api.get(`/admin/ecosystem/${kind}`,{params}) as {assignments:{data:AssignmentRow[];current_page:number;last_page:number;per_page:number;total:number}};return r.assignments;}
export async function createAssignment(kind:AssignmentKind,payload:Record<string,unknown>){return api.post(`/admin/ecosystem/${kind}`,payload);}
export async function updateAssignment(kind:AssignmentKind,id:number,payload:Record<string,unknown>){return api.patch(`/admin/ecosystem/${kind}/${id}`,payload);}
export async function revokeAssignment(kind:AssignmentKind,id:number){return api.delete(`/admin/ecosystem/${kind}/${id}`);}
export async function exportAssignments(kind:AssignmentKind,params:Record<string,unknown>={}){
 const cookieName=process.env.NEXT_PUBLIC_AUTH_COOKIE||'_el_tok';
 const token=typeof document==='undefined'?undefined:document.cookie.split('; ').find(item=>item.startsWith(`${cookieName}=`))?.split('=').slice(1).join('=');
 const response=await fetch(`${API_BASE}${withQuery(`/admin/ecosystem/${kind}/export`,params)}`,{credentials:'include',headers:{Accept:'text/csv',...(token?{Authorization:`Bearer ${token}`}:{})}});
 if(!response.ok)throw new Error(`Export failed with status ${response.status}`);
 return response.blob();
}
