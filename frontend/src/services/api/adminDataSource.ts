import {authorizations,batches,orders,products,returns,suppliers} from "@/mocks/admin/fixtures";
export const useAdminMocks=process.env.NEXT_PUBLIC_USE_ADMIN_MOCKS!=="false";
const collections={suppliers,authorizations,products,batches,orders,returns};
export type Collection=keyof typeof collections;
export async function listAdminData<K extends Collection>(key:K){if(!useAdminMocks)throw new Error(`Live ${key} service is not configured`);return collections[key]}
export async function getAdminRecord<K extends Collection>(key:K,id:string){const rows=await listAdminData(key);return rows.find(row=>row.id===id)}
export async function submitAdminAction(entity:string,id:string,action:string,reason:string){if(!reason.trim())throw new Error("A reason is required");return{event:{id:crypto.randomUUID(),title:`${action} submitted`,detail:`${entity} ${id}`,createdAt:new Date().toISOString()},status:"accepted"}}
