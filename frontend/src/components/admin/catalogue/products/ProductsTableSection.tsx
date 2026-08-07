"use client";

import React, { useState } from "react";
import { Filter, Search, Download, Settings, RefreshCw, X, ChevronDown, ChevronRight, MoreVertical, Columns, ArrowDownAZ, LayoutTemplate } from "lucide-react";
import Link from "next/link";

const FilterSelect = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-semibold text-muted">{label}</label>
    <div className="relative">
      <select className="w-full h-8 pl-3 pr-8 rounded border border-line text-[11px] font-medium text-ink bg-white focus:outline-none focus:border-[#741d35] appearance-none cursor-pointer hover:bg-slate-50 transition-colors">
        <option>{placeholder}</option>
      </select>
      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
    </div>
  </div>
);

export function ProductsTableSection() {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  const tabs = [
    { label: "All Products", count: "12,840", active: true },
    { label: "Active", count: "10,962" },
    { label: "Draft", count: "486" },
    { label: "Pending Approval", count: "312" },
    { label: "Approved", count: "10,150" },
    { label: "Published", count: "9,246" },
    { label: "Incomplete", count: "248" },
    { label: "Blocked", count: "28" },
    { label: "Archived", count: "1,128" },
  ];

  const quickFilters = [
    "Assigned to Me", "Pending Approval", "High Risk", "Missing Information", 
    "Duplicate Warning", "Missing Media", "No Inventory Link", "Publication Blocked"
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center border-b border-line px-5 overflow-x-auto scrollbar-none pt-2">
        {tabs.map(t => (
          <button key={t.label} className={`whitespace-nowrap px-4 py-2.5 text-[12px] font-bold flex items-center gap-2 border-b-[3px] transition-colors ${t.active ? 'border-[#741d35] text-[#741d35]' : 'border-transparent text-muted hover:text-ink'}`}>
            {t.label}
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${t.active ? 'bg-[#741d35]/10 text-[#741d35]' : 'bg-slate-100 text-slate-500'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="p-5 border-b border-line">
        <button 
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="flex items-center gap-1.5 text-[12px] font-bold text-ink mb-4 hover:text-[#741d35] transition-colors"
        >
          {isFiltersExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          Advanced Filters
        </button>

        {isFiltersExpanded && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
              <div className="col-span-2 flex flex-col gap-1">
                 <div className="h-[15px]"></div>
                 <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="text" placeholder="Search by product name, SKU, barcode, or ID..." className="w-full h-8 pl-9 pr-3 rounded border border-line text-[11px] font-medium text-ink focus:outline-none focus:border-[#741d35]" />
                </div>
              </div>
              <FilterSelect label="Product Status" placeholder="All" />
              <FilterSelect label="Approval Status" placeholder="All" />
              <FilterSelect label="Publication Status" placeholder="All" />
              <FilterSelect label="Compliance Status" placeholder="All" />
              <FilterSelect label="Risk Level" placeholder="All" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
              <FilterSelect label="Brand" placeholder="All Brands" />
              <FilterSelect label="Supplier" placeholder="All Suppliers" />
              <FilterSelect label="Category" placeholder="All Categories" />
              <FilterSelect label="Subcategory" placeholder="All Subcategories" />
              <FilterSelect label="Product Type" placeholder="All Types" />
              <FilterSelect label="Business Unit" placeholder="All Units" />
              <FilterSelect label="Variant Readiness" placeholder="All" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
              <FilterSelect label="Media Readiness" placeholder="All" />
              <FilterSelect label="Inventory Linkage" placeholder="All" />
              <FilterSelect label="Duplicate Risk" placeholder="All" />
              <FilterSelect label="Brand Authorization" placeholder="All" />
              <FilterSelect label="Batch Eligibility" placeholder="All" />
              <FilterSelect label="Channel Eligibility" placeholder="All" />
              <FilterSelect label="Country of Origin" placeholder="All" />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                 <FilterSelect label="Updated Date" placeholder="Select date range" />
                 <FilterSelect label="Assigned Reviewer" placeholder="All Reviewers" />
                 <FilterSelect label="Data Completeness" placeholder="Select range" />
                 <button className="h-8 px-3 rounded border border-line text-[11px] font-semibold text-ink flex items-center gap-1.5 hover:bg-slate-50 mt-5">
                   <Filter size={12} /> More Filters
                 </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-8 px-4 rounded text-[#741d35] font-bold text-[11px] hover:bg-red-50 transition-colors">Clear All</button>
                <button className="h-8 px-4 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2">
                  <Download size={12} /> Save View
                </button>
                <button className="h-8 px-4 rounded bg-[#741d35] text-white text-[11px] font-bold flex items-center gap-2 hover:bg-[#5a1629]">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Filters */}
      <div className="px-5 py-3 border-b border-line flex items-center gap-3 overflow-x-auto scrollbar-none bg-white">
        <span className="text-[11px] font-bold text-ink whitespace-nowrap">Quick Filters:</span>
        {quickFilters.map(f => (
          <span key={f} className="flex items-center gap-1.5 bg-red-50 text-[#741d35] border border-red-100 rounded-full px-3 py-1 text-[10px] font-bold whitespace-nowrap cursor-pointer hover:bg-red-100 transition-colors">
            {f} <X size={10} className="hover:text-red-900" />
          </span>
        ))}
        <button className="text-[11px] text-blue-600 font-bold whitespace-nowrap ml-2 hover:underline">Clear All</button>
      </div>

      {/* Health Scorecard Mini */}
      <div className="p-5 border-b border-line bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h4 className="text-[12px] font-bold text-ink">Product Master Health Scorecard</h4>
            <div className="w-3.5 h-3.5 rounded-full border border-muted text-muted flex items-center justify-center text-[8px] font-bold">i</div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">
            View full scorecard <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {[
            { label: "Identity Completeness", score: 98, color: "bg-[#059669]" },
            { label: "Classification Quality", score: 94, color: "bg-[#059669]" },
            { label: "Brand Verification", score: 96, color: "bg-[#059669]" },
            { label: "Compliance Readiness", score: 89, color: "bg-[#059669]" },
            { label: "Variant Readiness", score: 91, color: "bg-[#059669]" },
            { label: "Media Readiness", score: 84, color: "bg-[#d97706]" },
            { label: "Inventory Linkage", score: 90, color: "bg-[#059669]" },
            { label: "Publication Readiness", score: 88, color: "bg-[#059669]" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="text-[10px] font-bold text-ink truncate">{item.label}</div>
              <div className="text-[16px] font-bold text-ink leading-none">{item.score}%</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-white">
        <div className="text-[12px] font-bold text-ink">
          Product Masters <span className="text-muted font-medium">(12,840)</span>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-1.5 text-[11px] font-bold text-ink hover:text-[#741d35]">
             <Columns size={12} /> Columns <ChevronDown size={12} />
           </button>
           <button className="flex items-center gap-1.5 text-[11px] font-bold text-ink hover:text-[#741d35]">
             <ArrowDownAZ size={12} /> Sort By <ChevronDown size={12} />
           </button>
           <button className="flex items-center gap-1.5 text-[11px] font-bold text-ink hover:text-[#741d35]">
             Updated At (Newest) <ChevronDown size={12} />
           </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-white">
              <th className="py-3 px-4 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Product</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Public ID</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">DB Product ID</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">SKU</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Barcode</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Brand</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Supplier</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Category</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Variants</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Data<br/>Compl.</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Brand<br/>Auth.</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Compliance</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Media<br/>Ready</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Inv.<br/>Link</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Pub.<br/>Ready</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Channel<br/>Avail.</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Dup.<br/>Risk</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Risk Level</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Approval Status</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink text-center">Product State</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Updated At</th>
              <th className="py-3 px-2 text-[10px] font-bold text-ink">Owner / Reviewer</th>
              <th className="py-3 px-4 text-[10px] font-bold text-ink"></th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Radiance Vitamin C Serum", size: "30 ml",
                pubId: "PUB-00011234", dbId: "PRD-0091234", sku: "RVC-SER-30ML", barcode: "8901234567895",
                brand: "Estée Lauder", supplier: "Luxe Dist.", cat: "Skincare > Serums",
                variants: 3, dataCompl: "85%", brandAuth: "Valid", comp: "Compliant", media: "80%", inv: "Linked", pub: "Ready", chan: "5/6", dup: "Low",
                risk: "Medium", approval: "Initial Review", state: "Active",
                date: "04 Aug 2026\n12:45 AM", owner: "Elena Vance", type: "Open Product", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80", selected: true
              },
              {
                name: "Tokyo Brightening Essence", size: "100 ml",
                pubId: "PUB-00011235", dbId: "PRD-0091235", sku: "TOK-BRT-100ML", barcode: "8906123456792",
                brand: "Shiseido", supplier: "Glow Global\nExports", cat: "Skincare > Essences",
                variants: 2, dataCompl: "78%", brandAuth: "Pending", comp: "Compliant", media: "70%", inv: "Linked", pub: "At Risk", chan: "4/6", dup: "Medium",
                risk: "High", approval: "Pending Approval", state: "Draft",
                date: "03 Aug 2026\n11:20 PM", owner: "Marcus Lee", type: "Open Product", img: "https://images.unsplash.com/photo-1608248593842-8021c6a256d0?w=100&q=80", selected: false
              },
              {
                name: "Luxe Silk Lipstick Ruby Red", size: "",
                pubId: "PUB-00011236", dbId: "PRD-0091236", sku: "LUX-LIPS-R001", barcode: "8906123456808",
                brand: "Chanel\nBeauty", supplier: "Velvet\nLogistics Hub", cat: "Makeup > Lipstick",
                variants: 12, dataCompl: "92%", brandAuth: "Valid", comp: "Compliant", media: "90%", inv: "Linked", pub: "Ready", chan: "6/6", dup: "Low",
                risk: "Low", approval: "Approved", state: "Active",
                date: "02 Aug 2026\n09:15 PM", owner: "Priya Kapoor", type: "Open Product", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&q=80", selected: false
              }
            ].map((row, i) => (
              <tr key={i} className={`border-b border-line hover:bg-slate-50 transition-colors ${row.selected ? 'bg-red-50/50' : 'bg-white'}`}>
                <td className="py-3 px-4"><input type="checkbox" checked={row.selected} readOnly className="rounded border-line text-[#741d35] focus:ring-[#741d35]" /></td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-md overflow-hidden border border-line flex-shrink-0">
                      <img src={row.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-[140px]">
                      <Link 
                        href={row.dbId === 'PRD-0091235' ? '/admin/catalogue/products/product-uuid-002' : '/admin/catalogue/products/product-uuid-001'} 
                        className="text-[11px] font-bold text-[#741d35] hover:underline cursor-pointer leading-tight"
                      >
                        {row.name}
                      </Link>
                      <span className="text-[10px] text-muted">{row.size}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-[10px] font-medium text-muted">{row.pubId}</td>
                <td className="py-3 px-2 text-[10px] font-medium text-muted">{row.dbId}</td>
                <td className="py-3 px-2 text-[10px] font-bold text-ink">{row.sku}</td>
                <td className="py-3 px-2 text-[10px] font-medium text-muted">{row.barcode}</td>
                <td className="py-3 px-2 text-[10px] font-bold text-ink whitespace-pre-line leading-tight">{row.brand}</td>
                <td className="py-3 px-2 text-[10px] font-medium text-muted whitespace-pre-line leading-tight">{row.supplier}</td>
                <td className="py-3 px-2 text-[10px] font-medium text-muted">{row.cat}</td>
                <td className="py-3 px-2 text-[11px] font-bold text-ink text-center">{row.variants}</td>
                <td className="py-3 px-2 text-[10px] font-bold text-[#059669] text-center">{row.dataCompl}</td>
                <td className="py-3 px-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${row.brandAuth === 'Valid' ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20' : 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20'}`}>{row.brandAuth}</span>
                </td>
                <td className="py-3 px-2 text-center">
                   <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-[#059669]/10 text-[#059669] border border-[#059669]/20">{row.comp}</span>
                </td>
                <td className="py-3 px-2 text-[10px] font-bold text-[#059669] text-center">{row.media}</td>
                <td className="py-3 px-2 text-[10px] font-bold text-[#059669] text-center">{row.inv}</td>
                <td className="py-3 px-2 text-center">
                   <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${row.pub === 'Ready' ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20' : 'bg-red-100 text-red-600 border border-red-200'}`}>{row.pub}</span>
                </td>
                <td className="py-3 px-2 text-[10px] font-bold text-ink text-center">{row.chan}</td>
                <td className="py-3 px-2 text-[10px] font-bold text-center text-[#059669]">{row.dup}</td>
                <td className="py-3 px-2 text-center">
                   <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${row.risk === 'Medium' ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : row.risk === 'High' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20'}`}>{row.risk}</span>
                </td>
                <td className="py-3 px-2 text-[10px] font-bold text-[#0284c7] text-center cursor-pointer hover:underline">{row.approval}</td>
                <td className="py-3 px-2 text-center">
                   <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${row.state === 'Active' ? 'text-[#059669]' : 'text-slate-500'}`}>{row.state}</span>
                </td>
                <td className="py-3 px-2 text-[9px] font-medium text-muted whitespace-pre-line leading-tight">{row.date}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.owner)}&background=random&color=fff&size=40`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-ink">{row.owner}</span>
                       <span className="text-[9px] text-muted flex items-center gap-0.5"><LayoutTemplate size={8}/> {row.type}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1 hover:bg-slate-100 rounded text-muted transition-colors"><MoreVertical size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Pagination */}
      <div className="px-5 py-3 border-t border-line flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
           <span className="text-[11px] text-muted">3 of 12,840 selected</span>
           <button className="text-[11px] font-bold text-[#0284c7] hover:underline">Select All (12,840)</button>
           <button className="text-[11px] font-bold text-muted hover:text-ink">Clear Selection</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted">Rows per page:</span>
            <select className="border border-line rounded px-2 py-1 text-[11px] font-medium text-ink bg-white focus:outline-none">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-muted"><ChevronRight className="rotate-180" size={14} /></button>
             <button className="w-6 h-6 rounded bg-[#741d35] text-white flex items-center justify-center text-[11px] font-bold">1</button>
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-ink text-[11px] font-medium">2</button>
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-ink text-[11px] font-medium">3</button>
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-ink text-[11px] font-medium">4</button>
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-ink text-[11px] font-medium">5</button>
             <span className="w-6 h-6 flex items-center justify-center text-muted text-[11px]">...</span>
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-ink text-[11px] font-medium">514</button>
             <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-muted"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
