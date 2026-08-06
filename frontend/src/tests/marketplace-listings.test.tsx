import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MarketplaceListingsPage from "@/app/admin/marketplace/listings/page";
import { fetchMarketplaceListings, exportMarketplaceListings } from "@/services/api/marketplaceListingsService";
import type { MarketplaceListingsData } from "@/types/marketplaceListings";

const replace = vi.fn(); let search = new URLSearchParams();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }), usePathname: () => "/admin/marketplace/listings", useSearchParams: () => search }));
vi.mock("@/services/api/marketplaceListingsService", () => ({ fetchMarketplaceListings: vi.fn(), exportMarketplaceListings: vi.fn() }));
const fixture: MarketplaceListingsData = { items: [{ id:"12",listingCode:"LST-0000012",name:"Database Serum",descriptor:"Real product",thumbnailUrl:null,seller:{id:"3",name:"Database Seller"},product:{id:"12",name:"Database Serum"},brand:null,category:{id:"2",name:"Skin Care"},businessUnit:null,channel:null,sellingPrice:{amount:4900,currency:"LKR"},stock:8,sales30Days:4,conversionRate30Days:null,verificationStatus:null,policyStatus:"approved",riskLevel:"low",listingStatus:"live",updatedAt:"2026-08-06T10:00:00+05:30",permissions:{view:true,edit:true,suspend:true} }], metrics:[{id:"all",label:"Total Listings",availability:"available",value:1},{id:"live",label:"Live Listings",availability:"available",value:1},{id:"price-exceptions",label:"Price Exceptions",availability:"unavailable",value:null,reason:"listing_price_policy_not_defined"}],health:{availability:"unavailable",reason:"approved_listing_health_formula_not_defined",score:null,components:[]},alerts:[],sla:{availability:"unavailable",reason:"listing_sla_policy_not_defined",items:[]},filters:{currency:"LKR"},permissions:{can_create:false,can_update:true,can_export:true,can_bulk_action:false},meta:{page:1,perPage:25,total:1,totalPages:1,from:1,to:1,generatedAt:"2026-08-06T10:00:00+05:30",dataAsOf:"2026-08-06T10:00:00+05:30",refreshIntervalSeconds:30} };

describe("Marketplace Listings Management", () => {
  beforeEach(() => { search = new URLSearchParams(); vi.mocked(fetchMarketplaceListings).mockResolvedValue(fixture); vi.mocked(exportMarketplaceListings).mockResolvedValue(); });
  it("renders database API rows and honest unavailable capabilities", async () => { render(<MarketplaceListingsPage/>); expect((await screen.findAllByText("Database Serum")).length).toBeGreaterThan(0); expect(screen.getByText("Database Seller")).toBeInTheDocument(); expect(screen.getAllByText("Not available").length).toBeGreaterThan(0); expect(screen.getByText(/no approved listing-health formula/i)).toBeInTheDocument(); });
  it("persists status filters in the URL", async () => { render(<MarketplaceListingsPage/>); fireEvent.click(await screen.findByRole("tab", { name:/Live/ })); expect(replace).toHaveBeenCalledWith("/admin/marketplace/listings?status=live", { scroll:false }); });
  it("exports with active server filters", async () => { search = new URLSearchParams("status=live"); render(<MarketplaceListingsPage/>); fireEvent.click(await screen.findByRole("button", { name:/Export Listings/ })); await waitFor(() => expect(exportMarketplaceListings).toHaveBeenCalledWith(expect.objectContaining({ status:"live" }))); });
});
