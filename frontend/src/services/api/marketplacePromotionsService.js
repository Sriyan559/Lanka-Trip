import {apiClient} from "@/services/api/apiClient";

const queryString=filters=>{const params=new URLSearchParams();Object.entries(filters||{}).forEach(([key,value])=>{if(value!==undefined&&value!==null&&value!=="")params.set(key,String(value))});return params.size?`?${params}`:""};
export async function fetchMarketplacePromotions(filters={},signal){const response=await apiClient(`/admin/marketplace/promotions${queryString(filters)}`,{signal});if(!response?.data)throw new Error("The marketplace promotions response is missing data.");return response.data}
