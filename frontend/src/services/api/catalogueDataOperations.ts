import { apiClient, downloadApiFile } from "./apiClient";
import type { CatalogueDataJob, DataOperationsDashboard, DataOperationsQuery } from "@/types/importExport";

type Envelope<T> = { success:true; data:T };
const queryString=(query:Record<string,unknown>)=>{const params=new URLSearchParams();Object.entries(query).forEach(([key,value])=>{if(value!==undefined&&value!==null&&value!=="")params.set(key,String(value));});return params.size?`?${params}`:"";};
export const getCatalogueDataOperations=async(query:DataOperationsQuery,signal?:AbortSignal)=>(await apiClient<Envelope<DataOperationsDashboard>>(`/admin/catalogue/import-export${queryString(query as unknown as Record<string,unknown>)}`,{signal})).data;
export const createCatalogueImport=async(file:File,dataType:string)=>{const body=new FormData();body.append("file",file);body.append("data_type",dataType);return(await apiClient<Envelope<CatalogueDataJob>>("/admin/catalogue/import-export/imports",{method:"POST",headers:{"Idempotency-Key":`${dataType}-${file.name}-${file.size}-${file.lastModified}`},body})).data;};
export const createCatalogueExport=async(dataType="products")=>(await apiClient<Envelope<CatalogueDataJob>>("/admin/catalogue/import-export/exports",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data_type:dataType})})).data;
export const retryCatalogueJob=(id:string)=>apiClient(`/admin/catalogue/import-export/jobs/${id}/retry`,{method:"POST"});
export const cancelCatalogueJob=(id:string)=>apiClient(`/admin/catalogue/import-export/jobs/${id}/cancel`,{method:"POST"});
export const bulkCatalogueJobs=(ids:string[],action:"retry"|"cancel")=>apiClient("/admin/catalogue/import-export/bulk",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ids,action})});
export const scheduleCatalogueExport=(payload:{name:string;data_type:string;frequency:string;timezone:string;format:"csv"})=>apiClient("/admin/catalogue/import-export/schedules",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
export const downloadCatalogueJob=(id:string,name:string)=>downloadApiFile(`/admin/catalogue/import-export/jobs/${id}/download`,name);
export const exportOperationsReport=(query:DataOperationsQuery)=>downloadApiFile(`/admin/catalogue/import-export/report${queryString(query as unknown as Record<string,unknown>)}`,"catalogue-data-operations.csv");
