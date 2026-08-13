"use client";
import { useCallback, useEffect, useState } from "react";
import { request, withQuery } from "@/lib/api/client";

function useAdminModule(path: string, filters: Record<string, unknown>) {
  const [data,setData]=useState<any>(null); const [loading,setLoading]=useState(true); const [error,setError]=useState<string|null>(null);
  const key=JSON.stringify(filters);
  const refresh=useCallback(async()=>{setError(null);try{const response=await request(withQuery(path,filters));setData(response.data);}catch(e:any){setError(e?.message||"Failed to load data");}finally{setLoading(false);}},[path,key]);
  useEffect(()=>{void refresh();const id=window.setInterval(()=>void refresh(),30000);return()=>window.clearInterval(id);},[refresh]);
  return {data,loading,error,refresh};
}
export const useFulfilmentOrders=(filters:Record<string,unknown>)=>useAdminModule('/admin/logistics/fulfilment-orders',filters);
export const useWarehouses=(filters:Record<string,unknown>)=>useAdminModule('/admin/logistics/warehouses',filters);
export const useInventoryAllocations=(filters:Record<string,unknown>)=>useAdminModule('/admin/logistics/inventory-allocations',filters);
