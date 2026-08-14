import {api} from '@/lib/api/client';
export type PackRow={id:number;slug:string;code:string;name:string;sector:string|null;industry:string|null;status:string;risk_level:string;owner:string|null;updated_at:string;version:string|null;version_status:string|null;module_count:number;bundle_count:number;tenant_count:number;exception_count:number};
export type PackDashboard={summary:Record<string,number>;release:null|{slug:string;name:string;version:string;released_at:string;released_by:number|null};health:{score:number|null;status:string;reason:string};statuses:Array<{key:string;count:number}>;risks:Array<{key:string;count:number}>;exceptions:Array<{key:string;count:number}>;activity:Array<{id:number;action:string;actor:string|null;created_at:string}>;permissions:{canCreate:boolean;canVersion:boolean;canRelease:boolean;canExport:boolean};generatedAt:string;source:string};
export async function getPackDashboard(){const r=await api.get('/admin/ecosystem/sector-packs/dashboard') as {dashboard:PackDashboard};return r.dashboard}
export async function getSectorPacks(params:Record<string,unknown>={}){const r=await api.get('/admin/ecosystem/sector-packs',{params}) as {packs:{data:PackRow[];current_page:number;last_page:number;total:number}};return r.packs}
export async function getSectorPack(slug:string){const r=await api.get(`/admin/ecosystem/sector-packs/${slug}`) as {pack:any};return r.pack}
export async function createSectorPack(data:Record<string,unknown>){return api.post('/admin/ecosystem/sector-packs',data)}
export async function createPackVersion(slug:string,version:string){return api.post(`/admin/ecosystem/sector-packs/${slug}/versions`,{version})}
export async function releasePack(slug:string){return api.post(`/admin/ecosystem/sector-packs/${slug}/release`,{})}
export async function exportPack(slug?:string){return api.get(`/admin/ecosystem/sector-packs${slug?`/${slug}`:''}/export`)}
