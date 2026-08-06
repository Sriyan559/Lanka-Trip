"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface QuickQueue {
  label: string;
  count: number | string;
  icon: LucideIcon;
  color?: string;
  href?: string;
}

export interface SharedQuickQueuesProps {
  title: string;
  queues: QuickQueue[];
  viewAllText?: string;
  viewAllHref?: string;
}

export function SharedQuickQueues({ title, queues, viewAllText = "View all queues", viewAllHref }: SharedQuickQueuesProps) {
  return (
    <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
         <h3 className="text-[13px] font-bold text-ink">{title}</h3>
      </div>
      
      <div className="flex flex-col gap-1">
         {queues.map((q, i) => {
           const Icon = q.icon;
           if (q.href) {
             return (
               <Link key={i} href={q.href} className="w-full flex items-center justify-between py-2 text-[12px] text-muted hover:text-ink hover:bg-slate-50 rounded px-2 -mx-2 transition-colors">
                 <div className="flex items-center gap-2">
                   <Icon size={14} className={q.color || "text-slate-400"} />
                   <span>{q.label}</span>
                 </div>
                 <span className="font-bold text-ink">{q.count}</span>
               </Link>
             );
           }
           return (
             <button key={i} className="w-full flex items-center justify-between py-2 text-[12px] text-muted hover:text-ink hover:bg-slate-50 rounded px-2 -mx-2 transition-colors">
               <div className="flex items-center gap-2">
                 <Icon size={14} className={q.color || "text-slate-400"} />
                 <span>{q.label}</span>
               </div>
               <span className="font-bold text-ink">{q.count}</span>
             </button>
           );
         })}
      </div>
      
      {viewAllText && (
        viewAllHref ? (
          <Link href={viewAllHref} className="text-[11px] font-bold text-[#741d35] hover:underline w-full text-center mt-2 block">
            {viewAllText} &rarr;
          </Link>
        ) : (
          <button className="text-[11px] font-bold text-[#741d35] hover:underline w-full text-center mt-2">
            {viewAllText} &rarr;
          </button>
        )
      )}
    </div>
  );
}
