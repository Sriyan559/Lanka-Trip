import {render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import {SellerPerformanceDetailView} from "@/components/admin/marketplace/sellers/detail/SellerPerformanceDetailView";

const unavailable={available:false,value:null,reason:"not_defined"};
const data={seller:{id:"1",sellerCode:"SELL-00000001",name:"Database Seller",type:"Brand Owner",country:"Sri Lanka",status:"active",verificationStatus:"verified",riskLevel:"low",activeListings:4,orders:2,gmv:{available:true,value:500,currency:"USD"},aov:{available:true,value:250,currency:"USD"},fulfilmentRate:unavailable,cancellationRate:{available:true,value:0},returnRate:unavailable,rating:{available:true,value:4.5},slaBreaches:unavailable,policyFindings:unavailable,lastActivityAt:"2026-08-07T10:00:00Z"},health:{...unavailable,reason:"health_formula_not_defined"},scorecard:{...unavailable,reason:"scorecard_formula_not_defined"},sla:{...unavailable,reason:"sla_policy_not_defined"},permissions:{canView:true,canManage:false,canExport:true},meta:{dataAsOf:"2026-08-07T10:00:00Z",refreshIntervalSeconds:30}};
vi.mock("@/services/api/marketplaceSellerDetailService",()=>({fetchMarketplaceSellerDetail:vi.fn(async()=>data)}));

describe("Seller Performance Detail",()=>{
  it("renders the database API record and honest unsupported states",async()=>{render(<SellerPerformanceDetailView sellerId="1"/>);expect(await screen.findByRole("heading",{name:"Database Seller"})).toBeInTheDocument();expect(screen.getAllByText("SELL-00000001")).toHaveLength(2);expect(screen.getByText(/\$.*500/)).toBeInTheDocument();expect(screen.getAllByText(/Not available/).length).toBeGreaterThan(0)});
  it("keeps unsupported mutations disabled",async()=>{render(<SellerPerformanceDetailView sellerId="1"/>);expect(await screen.findByRole("button",{name:"Suspend Seller"})).toBeDisabled();expect(screen.getByRole("button",{name:"Reactivate Seller"})).toBeDisabled()});
});
