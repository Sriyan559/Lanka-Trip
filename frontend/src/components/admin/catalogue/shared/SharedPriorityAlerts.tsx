"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface PriorityAlert {
  id: string | number;
  text: string;
  subtext?: string;
  level: "High" | "Medium" | "Low";
  icon: LucideIcon;
  count?: number | string;
  href?: string;
}

export interface SharedPriorityAlertsProps {
  title: string;
  alerts: PriorityAlert[];
  viewAllText?: string;
  viewAllHref?: string;
  layout?: "block" | "list";
}

export function SharedPriorityAlerts({ title, alerts, viewAllText = "View all", viewAllHref, layout = "block" }: SharedPriorityAlertsProps) {
  const getColors = (level: string) => {
    switch (level) {
      case "High": return { icon: "text-red-500", text: "text-red-700", bg: "bg-red-50", border: "border-red-100", hover: "hover:border-red-200" };
      case "Medium": return { icon: "text-orange-500", text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-100", hover: "hover:border-orange-200" };
      case "Low": return { icon: "text-green-500", text: "text-green-700", bg: "bg-green-50", border: "border-green-100", hover: "hover:border-green-200" };
      default: return { icon: "text-slate-500", text: "text-ink", bg: "bg-slate-50", border: "border-slate-100", hover: "hover:border-slate-200" };
    }
  };

  const highCount = alerts.filter(a => a.level === "High").length;

  return (
    <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
         <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
           {title} 
           {layout === "block" && highCount > 0 && <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{highCount}</span>}
         </h3>
         {viewAllHref ? (
           <Link href={viewAllHref} className="text-[11px] font-semibold text-[#8b2c45] hover:underline">{viewAllText}</Link>
         ) : (
           <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline">{viewAllText}</button>
         )}
      </div>
      
      <div className={`flex flex-col ${layout === 'block' ? 'gap-2.5' : 'gap-3'}`}>
         {alerts.map(alert => {
           const colors = getColors(alert.level);
           const Icon = alert.icon;
           
           if (layout === "list") {
             if (alert.href) {
               return (
                 <Link key={alert.id} href={alert.href} className="flex items-start gap-3 w-full hover:bg-slate-50 py-1 rounded px-1 -mx-1 transition-colors">
                    <Icon size={14} className={`${colors.icon} mt-0.5`} />
                    <div className="flex-1 text-[12px] text-ink">{alert.text}</div>
                    {alert.count && <span className="text-[11px] font-bold text-ink mr-2">{alert.count}</span>}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${colors.bg} ${colors.text}`}>{alert.level}</span>
                 </Link>
               );
             }
             return (
               <div key={alert.id} className="flex items-start gap-3">
                  <Icon size={14} className={`${colors.icon} mt-0.5`} />
                  <div className="flex-1 text-[12px] text-ink">{alert.text}</div>
                  {alert.count && <span className="text-[11px] font-bold text-ink mr-2">{alert.count}</span>}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${colors.bg} ${colors.text}`}>{alert.level}</span>
               </div>
             );
           }
           
           if (alert.href) {
             return (
               <Link key={alert.id} href={alert.href} className={`flex items-start gap-2.5 p-2.5 ${colors.bg} border ${colors.border} rounded-lg ${colors.hover} transition-colors cursor-pointer block`}>
                  <div className="flex w-full items-start gap-2.5">
                    <Icon size={14} className={`${colors.icon} mt-0.5`} />
                    <div className="flex flex-col flex-1">
                       <span className={`text-[12px] font-bold ${colors.text}`}>{alert.text}</span>
                       {alert.subtext && <span className={`text-[10px] font-medium ${colors.icon}`}>{alert.subtext}</span>}
                    </div>
                    {!alert.subtext && <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold bg-white border ${colors.border} ${colors.text}`}>{alert.level}</span>}
                  </div>
               </Link>
             );
           }
           
           return (
             <div key={alert.id} className={`flex items-start gap-2.5 p-2.5 ${colors.bg} border ${colors.border} rounded-lg ${colors.hover} transition-colors cursor-pointer`}>
                <Icon size={14} className={`${colors.icon} mt-0.5`} />
                <div className="flex flex-col flex-1">
                   <span className={`text-[12px] font-bold ${colors.text}`}>{alert.text}</span>
                   {alert.subtext && <span className={`text-[10px] font-medium ${colors.icon}`}>{alert.subtext}</span>}
                </div>
                {!alert.subtext && <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold bg-white border ${colors.border} ${colors.text}`}>{alert.level}</span>}
             </div>
           );
         })}
      </div>
    </div>
  );
}
