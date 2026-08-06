import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SellerPerformanceDetailView } from "@/components/admin/marketplace/sellers/detail/SellerPerformanceDetailView";
import { fetchMarketplaceSellerDetail } from "@/services/api/marketplaceSellerDetailService";

vi.mock("@/services/api/marketplaceSellerDetailService",()=>({fetchMarketplaceSellerDetail:vi.fn()}));
const fixture={source:"database",generatedAt:"2026-08-06T10:00:00Z",context:{currency:"LKR",currencies:["LKR"]},permissions:{canView:true,canExport:true,canManage:true},seller:{id:"7",sellerCode:"SELL-00000007",name:"Database Seller",businessType:"Manufacturer",activeListings:3,orders:1,gmv:{amount:1000,currency:"LKR"},averageOrderValue:{amount:1000,currency:"LKR"},fulfilmentRate:100,cancellationRate:0,returnRate:0,rating:4.5,riskLevel:"low",verificationStatus:"verified",status:"active",lastActivityAt:"2026-08-06T10:00:00Z"},profile:{description:"Real supplier",country:"Sri Lanka",city:"Colombo",email:"seller@example.com",phone:null,website:null,complianceStatus:"approved"},unavailable:{performanceScore:"No approved composite performance formula exists.",sla:"No approved seller SLA source exists.",assignedManager:"No supplier-manager assignment exists."}};
describe("Seller Performance Detail",()=>{
  beforeEach(()=>vi.mocked(fetchMarketplaceSellerDetail).mockResolvedValue(fixture));
  it("renders database seller details and metric definitions",async()=>{render(<SellerPerformanceDetailView sellerId="7"/>);expect(await screen.findByRole("heading",{name:"Database Seller"})).toBeInTheDocument();expect(screen.getAllByText("SELL-00000007")).toHaveLength(2);expect(screen.getByRole("heading",{name:"Seller profile"})).toBeInTheDocument();expect(screen.getByText(/No approved composite performance formula/)).toBeInTheDocument();expect(fetchMarketplaceSellerDetail).toHaveBeenCalledWith("7",{},expect.any(AbortSignal));});
});
