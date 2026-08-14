"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import type { AdvancedFilterState, ProductMasterRow } from "@/types/productMaster";
import { useProductMasterManagement } from "@/hooks/useProductMasterManagement";
import { bulkProductMasters, exportProductMasters, saveProductMasterView } from "@/services/api/productMasterManagement";
import { ProductMasterHeader } from "./components/ProductMasterHeader";
import { ProductMasterKpiGrid } from "./components/ProductMasterKpiGrid";
import { ProductStatusTabs } from "./components/ProductStatusTabs";
import { ProductAdvancedFilters } from "./components/ProductAdvancedFilters";
import { ProductQuickFilters } from "./components/ProductQuickFilters";
import { ProductHealthScorecard } from "./components/ProductHealthScorecard";
import { ProductMasterTable } from "./components/ProductMasterTable";
import { ImportProductsModal } from "./components/ImportProductsModal";
import { SaveProductViewModal } from "./components/SaveProductViewModal";
import { MoreProductFiltersDrawer } from "./components/MoreProductFiltersDrawer";

const EMPTY_FILTERS: AdvancedFilterState = {search:"",productStatus:"All",approvalStatus:"All",publicationStatus:"All",complianceStatus:"All",riskLevel:"All",brand:"All",supplier:"All",category:"All",subcategory:"All",productType:"All",businessUnit:"All",variantReadiness:"All",mediaReadiness:"All",inventoryLinkage:"All",duplicateRisk:"All",brandAuthorization:"All",batchEligibility:"All",channelEligibility:"All",countryOfOrigin:"All",createdDate:"",updatedDate:"",assignedReviewer:"All",dataCompleteness:"All"};
const UNSUPPORTED = new Set(["brand","businessUnit","inventoryLinkage","batchEligibility","channelEligibility","assignedReviewer","riskLevel","productType","brandAuthorization","duplicateRisk","countryOfOrigin","dataCompleteness"]);

export function ProductMasterManagementView() {
  const router=useRouter();const searchParams=useSearchParams();const initialCategory=searchParams?.get("categoryId");const [activeTab,setActiveTab]=useState("all");const [activeKpiFilter,setActiveKpiFilter]=useState<string|null>(null);const [activeChips,setActiveChips]=useState<string[]>([]);const [filters,setFilters]=useState<AdvancedFilterState>(()=>({...EMPTY_FILTERS,category:initialCategory||"All"}));const [selectedIds,setSelectedIds]=useState<string[]>([]);const [page,setPage]=useState(1);const [pageSize,setPageSize]=useState(25);const [sort,setSort]=useState("updatedAt-desc");

  const [isImportModalOpen,setIsImportModalOpen]=useState(false);const [isSaveViewModalOpen,setIsSaveViewModalOpen]=useState(false);const [isMoreFiltersOpen,setIsMoreFiltersOpen]=useState(false);
  const query=useMemo(()=>({...filters,tab:activeTab,page,pageSize,sort}),[filters,activeTab,page,pageSize,sort]);
  const {data,loading,refreshing,error,refresh}=useProductMasterManagement(query);

  const changeFilters=(updated:Partial<AdvancedFilterState>)=>{const unsupported=Object.keys(updated).find(key=>UNSUPPORTED.has(key)&&updated[key as keyof AdvancedFilterState]!=="All"&&updated[key as keyof AdvancedFilterState]!=="");if(unsupported){toast.error(data?.capabilities.unsupportedFields[unsupported]??"This filter is unavailable in the current schema.");return;}setPage(1);setFilters(prev=>({...prev,...updated}));};
  const clearFilters=()=>{setFilters(EMPTY_FILTERS);setActiveTab("all");setActiveKpiFilter(null);setActiveChips([]);setPage(1);};
  const toggleChip=(id:string)=>{const chip=data?.quickFilters.find(item=>item.id===id);if(!chip)return;setActiveChips(prev=>prev.includes(id)?prev.filter(x=>x!==id):[id]);setActiveTab(activeChips.includes(id)?"all":chip.filterKey);setPage(1);};
  const kpiClick=(key:string)=>{if(["all","active","draft","pending","incomplete","published","archived","blocked"].includes(key)){setActiveTab(key);setPage(1);setActiveKpiFilter(prev=>prev===key?null:key);}else toast.error(data?.capabilities.unsupportedFields[key]??"This KPI has no list filter in the current schema.");};
  const runBulk=async(action:string)=>{if(!selectedIds.length)return;if(action==="export-selected"){await exportProductMasters(query,selectedIds);return;}if(!data?.capabilities.supportedBulkActions.includes(action)){toast.error("This action is unavailable because its domain is not modeled.");return;}try{await bulkProductMasters(action,selectedIds,action==="change-status"?"active":undefined);toast.success("Bulk action completed.");setSelectedIds([]);await refresh();}catch(cause){toast.error(cause instanceof Error?cause.message:"Bulk action failed.");}};
  const rowAction=async(product:ProductMasterRow,action:string)=>{if(action==="edit"){router.push(`/admin/catalogue/products/${product.id}/edit`);return;}if(action==="archive"){setSelectedIds([product.id]);try{await bulkProductMasters("archive",[product.id]);toast.success("Product archived.");setSelectedIds([]);await refresh();}catch(cause){toast.error(cause instanceof Error?cause.message:"Archive failed.");}return;}toast.error("This action is unavailable because the required backend domain is not modeled.");};

  return <div className="w-full flex flex-col min-h-screen bg-[#f8fafc]">
    <ProductMasterHeader onExport={()=>void exportProductMasters(query,selectedIds).catch(e=>toast.error(e.message))} onImportClick={()=>setIsImportModalOpen(true)} selectedCount={selectedIds.length} onBulkAction={action=>void runBulk(action)} onCreateClick={()=>router.push("/admin/catalogue/products/create")}/>
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1920px] mx-auto w-full">
      {error&&<div role="alert" className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">{error.message} <button className="font-bold underline" onClick={()=>void refresh()}>Retry</button></div>}
      {loading&&!data&&<div className="rounded border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">Loading product masters…</div>}
      {data&&<>
        <ProductMasterKpiGrid kpis={data.kpis} activeFilter={activeKpiFilter} onKpiClick={kpiClick}/>
        <ProductStatusTabs tabs={data.tabs} activeTab={activeTab} onSelectTab={tab=>{setActiveTab(tab);setPage(1);setSelectedIds([]);}}/>
        <ProductAdvancedFilters filters={filters} filterOptions={data.filterOptions} onChange={changeFilters} onClearAll={clearFilters} onSaveView={()=>setIsSaveViewModalOpen(true)} onRefresh={()=>void refresh()} onMoreFilters={()=>setIsMoreFiltersOpen(true)} isRefreshing={refreshing}/>
        <ProductQuickFilters chips={data.quickFilters} activeChips={activeChips} onToggleChip={toggleChip} onClearAll={()=>{setActiveChips([]);setActiveTab("all");}}/>
        <ProductHealthScorecard metrics={data.health}/>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="flex flex-col gap-6 min-w-0">
            <ProductMasterTable products={data.products} selectedIds={selectedIds} onSelectRow={id=>setSelectedIds(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id])} onSelectAllPage={checked=>setSelectedIds(checked?data.products.map(p=>p.id):[])} onSelectAllMatching={()=>{setSelectedIds(data.products.map(p=>p.id));toast("Selected the current server page. Cross-page mutation is intentionally not implicit.");}} onClearSelection={()=>setSelectedIds([])} totalMatching={data.pagination.total} onOpenProduct={p=>router.push(`/admin/catalogue/products/${p.id}`)} onActionClick={(p,a)=>void rowAction(p,a)} page={data.pagination.page} pageSize={data.pagination.pageSize} lastPage={data.pagination.lastPage} sort={sort} onPageChange={value=>{setPage(value);setSelectedIds([]);}} onPageSizeChange={value=>{setPageSize(value);setPage(1);setSelectedIds([]);}} onSortChange={value=>{setSort(value);setPage(1);}}/>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[['Product Data Quality',['Identity Completeness','Classification Quality','Compliance Readiness']],['Variant & Attribute Readiness',['Variant Readiness']],['Product Media Readiness',['Media Readiness']],['Approval Status Summary',[]]].map(([title,names])=><div key={title as string} className="rounded border border-gray-200 bg-white p-4"><h2 className="text-xs font-bold text-gray-900">{title}</h2>{title==='Approval Status Summary'?<div className="mt-3 space-y-2">{data.tabs.filter(tab=>['draft','pending','approved','blocked'].includes(tab.id)).map(tab=><div key={tab.id} className="flex justify-between text-xs"><span className="text-gray-600">{tab.label}</span><span className="font-bold">{tab.count.toLocaleString()}</span></div>)}</div>:<div className="mt-3 space-y-2">{data.health.filter(metric=>(names as string[]).includes(metric.label)).map(metric=><div key={metric.label} className="flex justify-between text-xs"><span className="text-gray-600">{metric.label}</span><span className="font-bold">{metric.percentage}%</span></div>)}</div>}</div>)}
              {['Inventory & Batch Linkage','Publication Readiness by Channel','Duplicate Product Risk','Recent Product Master Activity'].map(title=><div key={title} className="rounded border border-gray-200 bg-white p-4"><h2 className="text-xs font-bold text-gray-900">{title}</h2><p className="mt-3 text-xs text-gray-500">Unavailable: no authoritative {title.toLowerCase()} domain is linked to product masters.</p></div>)}
            </section>
          </div>
          <aside className="sticky top-4 rounded border border-gray-200 bg-white p-5"><h2 className="text-sm font-bold text-gray-900">Product Master Intelligence</h2><div className="mt-4 space-y-2">{data.tabs.slice(1,7).map(tab=><button key={tab.id} onClick={()=>{setActiveTab(tab.id);setPage(1);}} className="w-full flex justify-between rounded border border-gray-100 px-3 py-2 text-xs hover:bg-gray-50"><span>{tab.label}</span><span className="font-bold">{tab.count.toLocaleString()}</span></button>)}</div><p className="mt-4 border-t pt-3 text-xs text-gray-500">Risk, reviewer, channel, and SLA intelligence is unavailable in the current schema.</p><p className="mt-3 text-[11px] text-gray-400">Updated {new Date(data.generatedAt).toLocaleString()} via 30-second polling.</p></aside>
        </div>
      </>}
    </div>
    <ImportProductsModal isOpen={isImportModalOpen} onClose={()=>setIsImportModalOpen(false)} onImported={()=>void refresh()}/>
    <SaveProductViewModal isOpen={isSaveViewModalOpen} onClose={()=>setIsSaveViewModalOpen(false)} onSave={async(name,description,isDefault)=>{await saveProductMasterView({name,description,isDefault,filters,quickFilters:activeChips,activeTab,sort});}}/>
    <MoreProductFiltersDrawer isOpen={isMoreFiltersOpen} onClose={()=>setIsMoreFiltersOpen(false)}/>
  </div>;
}
