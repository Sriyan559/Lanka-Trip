'use client';

import React from 'react';
import { FinanceKpiCard } from './FinanceKpiCard';
import { useOptionalFinanceCommandCenter } from '@/contexts/FinanceCommandCenterContext';
import type {FinanceKpi} from '@/types/finance';

export function FinanceKpiGrid({kpis}:{kpis?:FinanceKpi[]}) {
  const finance=useOptionalFinanceCommandCenter(); const dashboard=finance?.dashboard,loading=finance?.loading;
  if(loading&&!dashboard)return <div className="grid grid-cols-2 xl:grid-cols-6 gap-2.5">{Array.from({length:12},(_,i)=><div key={i} className="h-24 bg-white border rounded-lg animate-pulse"/>)}</div>;
  const items = dashboard?.kpis ?? (kpis??[]).map(k=>({id:k.id,label:k.title,description:k.subLabel,icon:k.iconName,available:true,value:Number(String(k.value).replace(/[^0-9.-]/g,''))||0,currency:k.value.includes('LKR')?'LKR':null,comparison:Number(k.delta.replace('%',''))||null,sparkline:k.sparkline,reason:null}));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5">
      {items.map((kpi) => (
        <FinanceKpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
