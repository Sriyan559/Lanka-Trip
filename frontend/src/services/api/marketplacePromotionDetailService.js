import {apiClient} from "@/services/api/apiClient";
export async function fetchMarketplacePromotionDetail(promotionId,signal){const response=await apiClient(`/admin/marketplace/promotions/${encodeURIComponent(promotionId)}`,{signal});if(!response?.data)throw new Error("Promotion details are unavailable.");return response.data}
