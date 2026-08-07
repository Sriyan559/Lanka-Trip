import {render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import MarketplacePromotionsPage from "@/app/admin/marketplace/promotions/page";
import {ADMIN_NAVIGATION} from "@/constants/adminNavigation";

vi.mock("next/navigation",()=>({useSearchParams:()=>new URLSearchParams()}));
const unavailable=reason=>({available:false,value:null,reason,items:[]});
const data={availability:{available:false,reason:"promotion_domain_not_present"},filters:{dateFrom:"2026-07-09",dateTo:"2026-08-07",timezone:"Asia/Colombo"},kpis:[{id:"active",label:"Active Promotions",...unavailable("promotion_domain_not_present")}],trend:unavailable("promotion_order_attribution_not_present"),typeDistribution:unavailable("promotion_types_not_defined"),health:unavailable("promotion_health_formula_not_defined"),scorecard:unavailable("promotion_scorecard_formula_not_defined"),approvals:unavailable("promotion_approval_domain_not_present"),conflicts:unavailable("promotion_conflict_domain_not_present"),budget:unavailable("promotion_budget_domain_not_present"),participation:unavailable("promotion_participation_domain_not_present"),eligibility:unavailable("promotion_eligibility_domain_not_present"),timeline:unavailable("promotion_timeline_domain_not_present"),policyChecklist:unavailable("promotion_policy_rules_not_present"),alerts:[],statusSummary:unavailable("promotion_domain_not_present"),sla:unavailable("promotion_approval_sla_not_defined"),financial:unavailable("promotion_financial_attribution_not_present"),quickQueues:[],items:[],permissions:{canView:true,canCreate:false,canApprove:false,canExport:false},meta:{page:1,perPage:25,total:0,totalPages:1,from:null,to:null,dataAsOf:"2026-08-07T10:00:00Z",refreshIntervalSeconds:60}};
vi.mock("@/hooks/admin/useMarketplacePromotions",()=>({useMarketplacePromotions:()=>({data,loading:false,refreshing:false,error:null,stale:false,refresh:vi.fn()})}));

describe("Marketplace Promotions & Deals",()=>{
  it("renders the secured unavailable state without fixture values",()=>{render(<MarketplacePromotionsPage/>);expect(screen.getByRole("heading",{name:"Marketplace Promotions & Deals"})).toBeInTheDocument();expect(screen.getByText("Promotion engine configuration required")).toBeInTheDocument();expect(screen.getByText("Active Promotions")).toBeInTheDocument();expect(screen.queryByText("SL Beauty August Glow Sale")).not.toBeInTheDocument()});
  it("disables unsupported create and export actions",()=>{render(<MarketplacePromotionsPage/>);expect(screen.getByRole("button",{name:/Create Promotion/})).toBeDisabled();expect(screen.getByRole("button",{name:/Export Promotion Report/})).toBeDisabled()});
  it("keeps Promotions registered in Marketplace navigation",()=>{const marketplace=ADMIN_NAVIGATION.find(item=>item.id==="marketplace");expect(marketplace.children.find(item=>item.id==="promotions").href).toBe("/admin/marketplace/promotions")});
});
