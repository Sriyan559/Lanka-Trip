import { apiClient, downloadApiFile } from './apiClient';
import type { CategoryManagementData } from '@/types/categoryManagement';

type Envelope<T> = { success: true; data: T };
const qs = (params: Record<string, unknown> = {}) => { const q = new URLSearchParams(); Object.entries(params).forEach(([k,v]) => { if (v !== undefined && v !== null && v !== '' && v !== 'all') q.set(k,String(v)); }); const s=q.toString(); return s?`?${s}`:''; };
export const getCategoryManagement = async (params: Record<string, unknown>, signal?: AbortSignal) => (await apiClient<Envelope<CategoryManagementData>>(`/admin/catalogue/categories${qs(params)}`,{signal})).data;
export const getCategory = async (id:string) => (await apiClient<Envelope<import('@/types/categoryManagement').CategoryItem>>(`/admin/catalogue/categories/${id}`)).data;
export const createCategory = (payload: unknown) => apiClient('/admin/catalogue/categories',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
export const updateCategory = (id:string,payload:unknown) => apiClient(`/admin/catalogue/categories/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
export const moveCategory = (id:string,parent_id:string|null) => apiClient(`/admin/catalogue/categories/${id}/move`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({parent_id:parent_id?Number(parent_id):null})});
export const mergeCategory = (id:string,target_id:string) => apiClient(`/admin/catalogue/categories/${id}/merge`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({target_id:Number(target_id)})});
export const importCategoryMapping = (file:File) => { const body=new FormData();body.append('file',file);return apiClient<Envelope<{updated:number}>>('/admin/catalogue/categories/mapping-import',{method:'POST',body}); };
export const exportCategories = (params:Record<string,unknown>) => downloadApiFile(`/admin/catalogue/categories/export${qs(params)}`,'category-management.csv');
