"use client";

import React, { useState } from "react";
import { X, Search, Command, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const QuickQueryDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState(""); const router = useRouter();
  if (!isOpen) return null;
  const run = () => { if (!query.trim()) return; router.push(`/admin/catalogue/product-approvals?search=${encodeURIComponent(query.trim())}`); onClose(); };
  return <div className="fixed inset-0 z-50 flex justify-end bg-black/40"><div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between">
    <div><div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded bg-[#f5ebed] text-[#741d35] flex items-center justify-center"><Command size={16}/></div><h3 className="text-base font-bold text-gray-900">Quick Query Console</h3></div><button aria-label="Close" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700"><X size={18}/></button></div>
    <div className="relative mb-4"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input autoFocus value={query} onChange={(e)=>setQuery(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter')run();}} placeholder="Search product name or submission ID..." className="w-full h-10 pl-9 pr-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"/></div>
    <button onClick={run} disabled={!query.trim()} className="w-full p-2.5 rounded bg-[#741d35] disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-2">Search approval records <ArrowRight size={14}/></button></div>
    <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400"><span>Press Enter to search</span><button onClick={onClose} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold">Close</button></div>
  </div></div>;
};
