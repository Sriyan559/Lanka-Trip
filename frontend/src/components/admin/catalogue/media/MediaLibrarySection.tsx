"use client";

import React from "react";
import { ChevronDown, MoreVertical, Edit2, Image as ImageIcon, Video, Droplets, Download, Link2 } from "lucide-react";
import { SharedDataTable } from "../shared/SharedDataTable";

export function MediaLibrarySection() {
  const tabs = [
    { label: "All Assets", count: null, active: true },
    { label: "Primary Images", count: "124K", active: false },
    { label: "Variant Swatches", count: "82K", active: false },
    { label: "Videos", count: "4K", active: false },
    { label: "Missing Links", count: "14", active: false },
  ];

  const tableData = [
    { file: "hydrating-cream-hero.jpg", type: "Primary", icon: ImageIcon, tColor: "text-[#0284c7] bg-sky-50", res: "2000x2000", size: "1.4 MB", linked: "PF-4822", date: "Oct 12, 2024", status: "CDN Synced", sColor: "text-[#059669]" },
    { file: "matte-lipstick-red.jpg", type: "Swatch", icon: Droplets, tColor: "text-[#741d35] bg-rose-50", res: "500x500", size: "240 KB", linked: "PF-9182", date: "Oct 11, 2024", status: "CDN Synced", sColor: "text-[#059669]" },
    { file: "vitamin-c-serum-demo.mp4", type: "Video", icon: Video, tColor: "text-[#ea580c] bg-orange-50", res: "1920x1080", size: "14.2 MB", linked: "PF-2241", date: "Oct 11, 2024", status: "CDN Synced", sColor: "text-[#059669]" },
    { file: "night-repair-cream-alt.jpg", type: "Alt Image", icon: ImageIcon, tColor: "text-slate-600 bg-slate-100", res: "800x800", size: "890 KB", linked: "Unlinked", date: "Oct 10, 2024", status: "Warning: Low Res", sColor: "text-[#dc2626]", warning: true },
    { file: "foundation-shade-03.jpg", type: "Swatch", icon: Droplets, tColor: "text-[#741d35] bg-rose-50", res: "1000x1000", size: "410 KB", linked: "PF-7731", date: "Oct 10, 2024", status: "Syncing...", sColor: "text-[#ea580c]" },
    { file: "summer-campaign-banner.jpg", type: "Promo", icon: ImageIcon, tColor: "text-purple-700 bg-purple-50", res: "2400x800", size: "2.1 MB", linked: "Global", date: "Oct 09, 2024", status: "CDN Synced", sColor: "text-[#059669]" },
  ];

  return (
    <div className="mb-6">
      <SharedDataTable 
        tabs={tabs}
        searchPlaceholder="Search filenames, SKUs, or tags..."
        filters={["Asset Type", "Resolution", "Brand", "Sync Status"]}
        itemCountLabel="284,912 assets"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-slate-50/50">
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted w-12">Preview</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Filename</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Asset Type</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Resolution</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Size</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Linked To</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Status</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => {
              const Icon = row.icon;
              return (
              <tr key={i} className={`border-b border-line hover:bg-slate-50 transition-colors ${row.warning ? 'bg-red-50/30' : ''}`}>
                <td className="py-2 px-3 w-8"><input type="checkbox" className="rounded border-line" /></td>
                <td className="py-2 px-3">
                   <div className="w-10 h-10 rounded border border-line bg-slate-100 flex items-center justify-center overflow-hidden">
                      <Icon size={16} className="text-slate-400" />
                   </div>
                </td>
                <td className="py-2 px-3">
                   <div className="flex flex-col">
                     <span className="text-[11px] font-bold text-ink">{row.file}</span>
                     <span className="text-[9px] text-muted">{row.date}</span>
                   </div>
                </td>
                <td className="py-2 px-3">
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5 w-max ${row.tColor}`}>
                      <Icon size={10} /> {row.type}
                   </span>
                </td>
                <td className="py-2 px-3 text-[10px] font-mono text-muted">{row.res}</td>
                <td className="py-2 px-3 text-[10px] font-mono text-muted">{row.size}</td>
                <td className="py-2 px-3">
                   {row.linked === "Unlinked" ? (
                      <span className="text-[10px] font-bold text-[#dc2626] bg-red-50 px-2 py-0.5 rounded border border-red-200">Unlinked</span>
                   ) : (
                      <span className="text-[10px] font-bold text-[#0284c7] hover:underline cursor-pointer flex items-center gap-1"><Link2 size={10} /> {row.linked}</span>
                   )}
                </td>
                <td className="py-2 px-3">
                   <span className={`text-[10px] font-bold flex items-center gap-1.5 ${row.sColor}`}>
                     <div className={`w-1.5 h-1.5 rounded-full bg-current`}></div>
                     {row.status}
                   </span>
                </td>
                <td className="py-2 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                     <button className="p-1 text-muted hover:text-[#0284c7] hover:bg-slate-100 rounded transition-colors"><Download size={14} /></button>
                     <button className="p-1 text-muted hover:text-[#741d35] hover:bg-slate-100 rounded transition-colors"><Edit2 size={14} /></button>
                     <button className="p-1 text-muted hover:bg-slate-100 rounded transition-colors"><MoreVertical size={14} /></button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </SharedDataTable>
    </div>
  );
}
