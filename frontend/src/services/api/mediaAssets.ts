import { apiClient, downloadApiFile } from "./apiClient";
import type { MediaAsset, MediaDashboardData, MediaQuery } from "@/types/mediaManagement";
import { API_BASE, getAuthToken } from "@/lib/api";
type Envelope<T> = { success: true; data: T };
const qs = (params: Record<string, unknown>) => { const query = new URLSearchParams(); Object.entries(params).forEach(([key,value]) => { if (value !== undefined && value !== null && value !== "") query.set(key,String(value)); }); return query.size ? `?${query}` : ""; };
export const getMediaDashboard = async (query: MediaQuery, signal?: AbortSignal) => (await apiClient<Envelope<MediaDashboardData>>(`/admin/catalogue/media${qs(query as unknown as Record<string,unknown>)}`, { signal })).data;
export const uploadMedia = async (payload: FormData, onProgress?: (loaded:number,total:number)=>void) => {
  if (!onProgress) return (await apiClient<Envelope<MediaAsset>>("/admin/catalogue/media", { method:"POST", body:payload })).data;
  return new Promise<MediaAsset>((resolve,reject) => { const request=new XMLHttpRequest(); request.open("POST", `${API_BASE}/admin/catalogue/media`); request.withCredentials=true;request.setRequestHeader("Accept","application/json");const token=getAuthToken();if(token)request.setRequestHeader("Authorization",`Bearer ${token}`); request.upload.onprogress=event => { if(event.lengthComputable) onProgress(event.loaded,event.total); }; request.onload=()=>{try{const body=JSON.parse(request.responseText);if(request.status>=200&&request.status<300)resolve(body.data);else reject(new Error(body.message||"Upload failed."));}catch{reject(new Error("Upload failed."));}};request.onerror=()=>reject(new Error("Upload failed."));request.send(payload); });
};
export const updateMedia = async (id:string,payload:Record<string,unknown>) => (await apiClient<Envelope<MediaAsset>>(`/admin/catalogue/media/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})).data;
export const bulkMedia = (ids:string[],action:"approve"|"archive"|"restore") => apiClient("/admin/catalogue/media/bulk",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ids:ids.map(Number),action})});
export const importMediaManifest = async(file:File)=>{const body=new FormData();body.append("file",file);return(await apiClient<Envelope<{created:number;linked:number;updated:number;skipped:number;failed:number;warnings:string[]}>>("/admin/catalogue/media/import",{method:"POST",body})).data;};
export const exportMedia = (query:MediaQuery)=>downloadApiFile(`/admin/catalogue/media/export${qs(query as unknown as Record<string,unknown>)}`,"media-assets.csv");
