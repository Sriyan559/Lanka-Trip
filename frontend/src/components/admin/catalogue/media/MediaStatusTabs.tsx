"use client";
import React from "react";
import type { MediaTab } from "@/types/mediaManagement";
export function MediaStatusTabs({activeTab,onTabChange,tabs}:{activeTab:string;onTabChange:(tab:string)=>void;tabs:MediaTab[]}){return <div className="mb-4 overflow-x-auto rounded-t-lg border-b border-line bg-white px-2 pt-1"><div className="flex min-w-max gap-1">{tabs.map(tab=><button key={tab.label} onClick={()=>onTabChange(tab.label)} className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-[12px] font-bold ${activeTab===tab.label?"border-[#671021] text-[#671021]":"border-transparent text-slate-500"}`}>{tab.label}<span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px]">{tab.count==null?"N/A":tab.count.toLocaleString()}</span></button>)}</div></div>}
