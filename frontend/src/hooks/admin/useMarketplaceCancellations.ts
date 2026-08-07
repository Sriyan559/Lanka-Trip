"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMarketplaceCancellations, type CancellationFilters, type MarketplaceCancellationsData } from "@/services/api/marketplaceCancellationsService";

export function useMarketplaceCancellations(filters:CancellationFilters){
  const [data,setData]=useState<MarketplaceCancellationsData|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const [stale,setStale]=useState(false); const controller=useRef<AbortController|null>(null); const busy=useRef(false); const key=JSON.stringify(filters);
  const load=useCallback(async(background=false)=>{if(busy.current)return;busy.current=true;controller.current?.abort();const next=new AbortController();controller.current=next;if(!background)setLoading(true);try{const result=await fetchMarketplaceCancellations(filters,next.signal);setData(result);setError("");setStale(false)}catch(reason){if((reason as Error).name!=="AbortError"){setError((reason as Error).message||"Unable to load cancellations.");setStale(true)}}finally{busy.current=false;if(!background)setLoading(false)}},[key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(()=>{void load();const interval=window.setInterval(()=>{if(document.visibilityState==="visible")void load(true)},60_000);const visible=()=>{if(document.visibilityState==="visible")void load(true)};document.addEventListener("visibilitychange",visible);return()=>{controller.current?.abort();window.clearInterval(interval);document.removeEventListener("visibilitychange",visible)}},[load]);
  return {data,loading,error,stale,reload:()=>load(false)};
}
