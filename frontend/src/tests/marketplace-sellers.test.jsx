import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MarketplaceSellersPage from "@/app/admin/marketplace/sellers/page";
import { fetchMarketplaceSellers, exportMarketplaceSellers } from "@/services/api/marketplaceSellersService";

const replace=vi.fn(); let search=new URLSearchParams();
vi.mock("next/navigation",()=>({useRouter:()=>({replace}),useSearchParams:()=>search}));
vi.mock("@/services/api/marketplaceSellersService",()=>({fetchMarketplaceSellers:vi.fn(),exportMarketplaceSellers:vi.fn()}));
vi.mock("recharts",()=>({ResponsiveContainer:({children})=><div>{children}</div>,LineChart:({children})=><div>{children}</div>,Line:()=>null,CartesianGrid:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,Legend:()=>null,PieChart:({children})=><div>{children}</div>,Pie:({children})=><div>{children}</div>,Cell:()=>null}));

const fixture={source:"database",generatedAt:"2026-08-06T10:00:00Z",context:{currency:"LKR",currencies:["LKR"],dateFrom:"2026-07-08",dateTo:"2026-08-06"},permissions:{canView:true,canExport:true,canManage:true},metrics:[{id:"active",label:"Active Marketplace Sellers",availability:"available",value:1,definition:"real"},{id:"gmv",label:"Total Seller GMV",availability:"available",value:1000,unit:"LKR",definition:"real"},{id:"sla",label:"Seller SLA Breaches",availability:"unavailable",reason:"No approved seller SLA policy or breach source exists."}],trend:[{date:"2026-08-06",gmv:1000,orders:1,fulfilmentRate:100,cancellationRate:0,returnRate:0}],riskDistribution:[{level:"low",value:1,percentage:100},{level:"medium",value:0,percentage:0},{level:"high",value:0,percentage:0},{level:"critical",value:0,percentage:0}],items:[{id:"7",sellerCode:"SELL-00000007",name:"Database Seller",businessType:"Manufacturer",activeListings:3,orders:1,gmv:{amount:1000,currency:"LKR"},averageOrderValue:{amount:1000,currency:"LKR"},fulfilmentRate:100,cancellationRate:0,returnRate:0,rating:4.5,verificationStatus:"verified",riskLevel:"low",status:"active",lastActivityAt:"2026-08-06T10:00:00Z"}],alerts:[],unavailable:[{id:"health-score",label:"Marketplace Seller Health",reason:"No approved composite health formula exists."}],meta:{page:1,perPage:25,total:1,lastPage:1,refreshIntervalSeconds:30}};

describe("Seller Marketplace Performance",()=>{
  beforeEach(()=>{search=new URLSearchParams();replace.mockClear();vi.mocked(fetchMarketplaceSellers).mockResolvedValue(fixture);vi.mocked(exportMarketplaceSellers).mockResolvedValue();});
  it("renders database API metrics, sellers, and honest unavailable states",async()=>{render(<MarketplaceSellersPage/>);expect(await screen.findByText("Database Seller")).toBeInTheDocument();expect(screen.getByText("SELL-00000007")).toBeInTheDocument();expect(screen.getByText("Seller SLA Breaches")).toBeInTheDocument();expect(screen.getByText(/No approved composite health formula/)).toBeInTheDocument();});
  it("persists status filters in the URL",async()=>{render(<MarketplaceSellersPage/>);fireEvent.click(await screen.findByRole("tab",{name:"Active"}));expect(replace).toHaveBeenCalledWith("/admin/marketplace/sellers?status=active&page=1",{scroll:false});});
  it("exports with active server filters",async()=>{search=new URLSearchParams("status=active&currency=LKR");render(<MarketplaceSellersPage/>);fireEvent.click(await screen.findByRole("button",{name:/Export Performance Report/}));await waitFor(()=>expect(exportMarketplaceSellers).toHaveBeenCalledWith(expect.objectContaining({status:"active",currency:"LKR"})));});
});
