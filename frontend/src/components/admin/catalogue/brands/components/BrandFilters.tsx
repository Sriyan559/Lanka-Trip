"use client";
import React from "react";
import { Bookmark, RefreshCw, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type { BrandFilterState, NamedOption } from "@/types/brandManagement";

interface Props { filters: BrandFilterState; countries: NamedOption[]; suppliers: NamedOption[]; authorizationStatuses: string[]; isRefreshing: boolean; onFilterChange:(key:keyof BrandFilterState,value:string)=>void; onClearAll:()=>void; onOpenMoreFilters:()=>void; onOpenSaveView:()=>void; onRefresh:()=>void; }
const selectClass="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] disabled:text-gray-400";
export const BrandFilters=({filters,countries,suppliers,authorizationStatuses,isRefreshing,onFilterChange,onClearAll,onOpenMoreFilters,onOpenSaveView,onRefresh}:Props)=> <div className="bg-white rounded border border-gray-200 p-3.5 flex flex-col gap-3 shadow-2xs">
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5">
  <div className="relative"><Search size={14} className="absolute left-2.5 top-2.5 text-gray-400"/><input aria-label="Search brands" value={filters.searchQuery} onChange={e=>onFilterChange("searchQuery",e.target.value)} placeholder="Search brand, UUID, supplier..." className="w-full pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs"/></div>
  <select aria-label="Verification status" value={filters.verificationStatus} onChange={e=>onFilterChange("verificationStatus",e.target.value)} className={selectClass}><option value="All">Verification Status (All)</option><option value="Verified">Verified</option><option value="Unverified">Unverified</option></select>
  <select aria-label="Authorization status" value={filters.authorizationStatus} onChange={e=>onFilterChange("authorizationStatus",e.target.value)} className={selectClass}><option value="All">Authorization Status (All)</option>{authorizationStatuses.map(x=><option key={x} value={x}>{x.replaceAll("_"," ")}</option>)}</select>
  <select aria-label="Brand owner" disabled value="All" className={selectClass} title="No authoritative brand owner field"><option>Brand Owner (Unavailable)</option></select>
  <select aria-label="Supplier" value={filters.supplier} onChange={e=>onFilterChange("supplier",e.target.value)} className={selectClass}><option value="All">Supplier (All)</option>{suppliers.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
  <select aria-label="Country" value={filters.country} onChange={e=>onFilterChange("country",e.target.value)} className={selectClass}><option value="All">Country (All)</option>{countries.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
 </div>
 <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-gray-100"><div className="flex flex-wrap items-center gap-2.5 flex-1">
  <select disabled className={selectClass} title="No channel eligibility schema"><option>Channel Eligibility (Unavailable)</option></select><select disabled className={selectClass} title="No brand risk schema"><option>Risk Level (Unavailable)</option></select>
  <input aria-label="Updated from date" type="date" value={filters.updatedDate} onChange={e=>onFilterChange("updatedDate",e.target.value)} className={selectClass}/>
  <button onClick={onOpenMoreFilters} className="h-8 px-3 rounded bg-white border border-gray-300 text-xs font-semibold text-gray-700 flex items-center gap-1.5"><SlidersHorizontal size={13}/>More Filters</button>
 </div><div className="flex items-center gap-2"><button onClick={onClearAll} className="h-8 px-3 text-xs font-bold text-gray-500 flex items-center gap-1"><RotateCcw size={12}/>Clear All</button><button onClick={onOpenSaveView} className="h-8 px-3 rounded border border-gray-300 text-xs font-semibold flex items-center gap-1.5"><Bookmark size={13}/>Save View</button><button onClick={onRefresh} disabled={isRefreshing} className="h-8 px-3.5 rounded bg-[#741d35] text-white text-xs font-bold flex items-center gap-1.5"><RefreshCw size={13} className={isRefreshing?"animate-spin":""}/>Refresh</button></div></div>
</div>;
