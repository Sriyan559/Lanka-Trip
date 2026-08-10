"use client";
import React,{useState} from "react";
import {X,Upload,Download,CheckCircle2} from "lucide-react";
import toast from "react-hot-toast";

export function ImportCategoryMappingModal({isOpen,onClose,onImport}:{isOpen:boolean;onClose:()=>void;onImport:(file:File)=>Promise<number>}){
 const [file,setFile]=useState<File|null>(null);const [busy,setBusy]=useState(false);if(!isOpen)return null;
 const apply=async()=>{if(!file)return;setBusy(true);try{const n=await onImport(file);toast.success(`${n} product mappings updated.`);onClose();}catch(e){toast.error(e instanceof Error?e.message:"Import failed.");}finally{setBusy(false)}};
 const template=()=>{const b=new Blob(["product_id,category_id\n"],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="category_mapping_template.csv";a.click();URL.revokeObjectURL(u)};
 return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
  <div className="px-4 py-3 border-b flex items-center justify-between bg-gray-50"><h2 className="text-sm font-bold flex gap-2"><Upload size={15} className="text-[#741d35]"/>Import Category Mapping</h2><button onClick={onClose}><X size={16}/></button></div>
  <div className="p-4 space-y-4 text-xs"><label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50/50 cursor-pointer"><Upload size={24} className="mx-auto text-gray-400 mb-2"/><p className="font-semibold">Select a CSV mapping file</p><p className="text-gray-400 mt-1">Required columns: product_id, category_id. Maximum 10 MB.</p><input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0]||null)} className="mt-3 mx-auto block"/></label>
  {file&&<div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 flex gap-2"><CheckCircle2 size={14}/><span>{file.name} is ready for atomic server validation.</span></div>}<button onClick={template} className="font-bold text-[#741d35] flex gap-1"><Download size={13}/>Download CSV template</button></div>
  <div className="px-4 py-3 border-t bg-gray-50 flex justify-end gap-2 text-xs"><button onClick={onClose} className="h-8 px-3 border rounded">Cancel</button><button disabled={!file||busy} onClick={apply} className="h-8 px-4 rounded bg-[#741d35] text-white font-bold disabled:opacity-50">{busy?"Validating…":"Apply Mapping Import"}</button></div>
 </div></div>;
}
