'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getProductMasters, type ProductMasterQuery } from '@/services/api/productMasterManagement';
import type { ProductMasterManagementData } from '@/types/productMaster';

export function useProductMasterManagement(query: ProductMasterQuery) {
  const [data,setData]=useState<ProductMasterManagementData|null>(null);const [loading,setLoading]=useState(true);const [refreshing,setRefreshing]=useState(false);const [error,setError]=useState<Error|null>(null);const request=useRef(0);
  const key=JSON.stringify(query);
  const refresh=useCallback(async(background=false)=>{const id=++request.current;background?setRefreshing(true):setLoading(true);try{const result=await getProductMasters(query);if(id===request.current){setData(result);setError(null);}}catch(cause){if(id===request.current)setError(cause instanceof Error?cause:new Error('Unable to load product masters.'));}finally{if(id===request.current){setLoading(false);setRefreshing(false);}}},[key]);
  useEffect(()=>{void refresh(false);},[refresh]);
  useEffect(()=>{const timer=window.setInterval(()=>void refresh(true),30_000);const focus=()=>void refresh(true);window.addEventListener('focus',focus);return()=>{window.clearInterval(timer);window.removeEventListener('focus',focus);};},[refresh]);
  return {data,loading,refreshing,error,refresh:()=>refresh(true)};
}
