import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BrandManagementData } from "@/types/brandManagement";
import { BrandManagementView } from "./BrandManagementView";
import { getBrandManagement } from "@/services/api/brandManagement";

vi.mock("@/services/api/brandManagement", () => ({
  getBrandManagement: vi.fn(), createBrand: vi.fn(), updateBrand: vi.fn(), archiveBrand: vi.fn(),
  importBrands: vi.fn(), exportBrands: vi.fn(), getBrandAuthorizations: vi.fn(), decideBrandAuthorization: vi.fn(),
}));

const response: BrandManagementData = {
  kpis: [
    { id:"kpi-1",label:"Total Brands",value:1,trend:null,filterKey:"all" },
    { id:"kpi-4",label:"Pending Verification",value:null,trend:null,filterKey:"unsupported" },
  ],
  tabs: [{id:"all",label:"All Brands",count:1},{id:"active",label:"Active",count:1},{id:"verified",label:"Verified",count:1},{id:"pending",label:"Pending",count:null},{id:"conditional",label:"Conditional",count:null},{id:"expiring",label:"Expiring",count:null},{id:"unauthorized",label:"Unauthorized Use",count:null},{id:"archived",label:"Archived",count:0}],
  brands:{data:[{id:"1",brandName:"Database Beauty",brandId:"uuid-1",slug:"database-beauty",initials:"DB",logoPath:null,description:null,website:null,countryId:null,country:"Unavailable",status:"Active",verificationStatus:"Verified",authorizationStatus:"Not Authorized",authorizationCount:0,territory:"Unavailable",authorizationStartDate:null,authorizationExpiryDate:null,legalOwner:"Unavailable",manufacturer:"Unavailable",primarySupplier:"Unavailable",activeProductsCount:null,categoriesCount:null,channelEligibility:"Unavailable",eligibleChannelsCount:null,totalChannelsCount:null,complianceStatus:"Unavailable",catalogueReadinessPercent:null,duplicateRisk:"Unavailable",riskLevel:"Unavailable",brandOwner:"Unavailable",createdBy:null,updatedAt:"2026-08-10T00:00:00Z",archivedAt:null}],currentPage:1,pageSize:25,total:1,lastPage:1},
  options:{countries:[],suppliers:[],authorizationStatuses:[]}, analytics:{health:{verificationCoverage:100,authorizationReadiness:0,supplierMapping:0,logoCoverage:0},readiness:{ready:0,partial:1,notReady:0},authorizationSummary:{},supplierRelationships:[],duplicates:[],activities:[]},
  capabilities:{canManage:true,canExport:true,canImport:true,canReviewAuthorizations:true,tenantScope:false,pendingVerification:false,conditionalAuthorization:false,expiryWarningWindow:false,ownership:false,products:false,categories:false,channels:false,compliance:false,unauthorizedUse:false,savedViews:false,merge:false,reason:"No authoritative schema."},lastSyncedAt:"2026-08-10T00:00:00Z",
};

describe("BrandManagementView", () => {
  beforeEach(() => { vi.clearAllMocks(); vi.mocked(getBrandManagement).mockResolvedValue(response); });
  it("renders authoritative KPIs, rows, unavailable values and pagination", async () => {
    render(<BrandManagementView/>);
    expect(screen.getByText(/Loading authoritative brand data/)).toBeInTheDocument();
    expect(await screen.findByText("Database Beauty")).toBeInTheDocument();
    expect(screen.getByText("Total Brands")).toBeInTheDocument();
    expect(screen.getAllByText("Unavailable").length).toBeGreaterThan(0);
    expect(screen.getByText("Showing 1 to 1 of 1")).toBeInTheDocument();
  });
  it("sends search to the API instead of filtering the loaded page", async () => {
    render(<BrandManagementView/>); await screen.findByText("Database Beauty");
    fireEvent.change(screen.getByLabelText("Search brands"),{target:{value:"supplier query"}});
    await waitFor(()=>expect(vi.mocked(getBrandManagement)).toHaveBeenLastCalledWith(expect.objectContaining({search:"supplier query"})),{timeout:2000});
  });
  it("shows a retryable API error instead of mock fallback content", async () => {
    vi.mocked(getBrandManagement).mockRejectedValueOnce(new Error("Service unavailable"));
    render(<BrandManagementView/>);
    expect(await screen.findByText("Brand management could not load.")).toBeInTheDocument();
    expect(screen.getByText("Service unavailable")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Retry"));
    expect(await screen.findByText("Database Beauty")).toBeInTheDocument();
  });
});
