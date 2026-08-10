export {getAdminRecord,listAdminData,submitAdminAction} from "./adminDataSource";
import { apiClient, downloadApiFile } from './apiClient';
import type { InventoryOperationsData, InventoryQuery } from '@/types/inventoryOperations';

type Envelope<T>={success:boolean;data:T};
const qs=(params:InventoryQuery)=>{const search=new URLSearchParams();Object.entries(params).forEach(([key,value])=>value!==undefined&&value!==''&&value!=='ALL'&&search.set(key,String(value)));return search.size?`?${search}`:'';};
export async function getInventoryOperations(params:InventoryQuery,signal?:AbortSignal){return (await apiClient<Envelope<InventoryOperationsData>>(`/admin/catalogue/inventory${qs(params)}`,{signal})).data;}
export function exportInventoryOperations(params:InventoryQuery){return downloadApiFile(`/admin/catalogue/inventory/export${qs(params)}`,'inventory-operations.csv');}
