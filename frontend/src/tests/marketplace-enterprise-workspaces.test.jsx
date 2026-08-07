import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import PolicyViolationCaseDetailPage from "@/app/admin/marketplace/policy-violations/[caseId]/page";
import ManualOrderCreationPage from "@/app/admin/marketplace/orders/create/page";
import MarketplaceConfigurationPage from "@/app/admin/marketplace/settings/page";
import SalesChannelManagementPage from "@/app/admin/marketplace/channels/page";
import {ADMIN_NAVIGATION} from "@/constants/adminNavigation";
import {fetchEnterpriseWorkspace,recordEnterprisePreviewAction} from "@/services/api/marketplaceEnterpriseWorkspacesService";

vi.mock("@/services/api/orderService",()=>({fetchManualOrderCapabilities:vi.fn(async()=>({available:false,reason:"manual_order_workflow_not_present",missingCapabilities:["manual_order_drafts","inventory_reservations"],supportedCreationPath:"accepted_quotation_only"}))}));

vi.mock("@/services/api/marketplacePolicyViolationsService",()=>({fetchMarketplacePolicyViolation:vi.fn(async()=>({case:{id:"41",caseCode:"POL-DB-041",category:"counterfeit_claim",status:"open",complianceStatus:"pending",severity:"high",policy:{name:"Authenticity Rule",key:"AUTH-1"},source:{type:"Supplier",id:"9"},assignedReviewer:{name:"Database Reviewer"},noteCount:2,createdAt:"2026-08-07T08:00:00Z",updatedAt:"2026-08-07T09:00:00Z"},evidence:{available:false,reason:"policy_evidence_domain_not_present"},enforcement:{available:false,reason:"enforcement_domain_not_present"},appeal:{available:false,reason:"appeal_domain_not_present"},permissions:{canView:true,canUpdate:false,canExport:true},meta:{dataAsOf:"2026-08-07T10:00:00Z",refreshIntervalSeconds:60}}))}));

vi.mock("recharts",()=>({ResponsiveContainer:({children})=><div data-testid="chart">{children}</div>,LineChart:({children})=><div>{children}</div>,ComposedChart:({children})=><div>{children}</div>,PieChart:({children})=><div>{children}</div>,Pie:({children})=><div>{children}</div>,Cell:()=>null,CartesianGrid:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,Legend:()=>null,Line:()=>null,Bar:()=>null}));

describe("M15–M19 Marketplace enterprise workspaces",()=>{
  it("loads the remaining explicit fixtures and records non-persisted audit events",async()=>{for(const name of ["configuration","channels"]){const data=await fetchEnterpriseWorkspace(name);expect(data.source).toBe("frontend-fixture")}const event=await recordEnterprisePreviewAction("channels","Review",["CHN-1"],"QA");expect(event.source).toBe("local-preview");expect(event.persisted).toBe(false)});

  it("registers every requested Marketplace route",()=>{const children=ADMIN_NAVIGATION.find(x=>x.id==="marketplace").children;expect(children.map(x=>x.href)).toEqual(expect.arrayContaining(["/admin/marketplace/policy-violations","/admin/marketplace/orders","/admin/marketplace/orders/create","/admin/marketplace/orders/cancellations","/admin/marketplace/settings","/admin/marketplace/channels"]))});

  it("renders the database-backed policy case as read-only",async()=>{render(<PolicyViolationCaseDetailPage params={{caseId:"41"}}/>);expect(await screen.findByRole("heading",{name:"Counterfeit Claim"})).toBeInTheDocument();expect(screen.getAllByText("POL-DB-041").length).toBeGreaterThan(0);expect(screen.getByRole("heading",{name:"Enforcement"})).toBeInTheDocument();expect(screen.getByRole("button",{name:"More Actions"})).toBeDisabled()});

  it("renders manual order creation as server-verified unavailable",async()=>{render(<ManualOrderCreationPage/>);expect(await screen.findByRole("heading",{name:"Manual Order Creation"})).toBeInTheDocument();expect(screen.getByText(/Manual order creation is not available/)).toBeInTheDocument();expect(screen.getAllByRole("button",{name:"Submit for Approval"})[0]).toBeDisabled()});

  it("renders configuration sections and opens a dedicated editor",async()=>{render(<MarketplaceConfigurationPage/>);expect(await screen.findByRole("heading",{name:"Marketplace Configuration"})).toBeInTheDocument();expect(screen.getByText("Marketplace Configuration Health")).toBeInTheDocument();fireEvent.click(screen.getByRole("tab",{name:"Pricing"}));expect(screen.getByRole("heading",{name:"Pricing Configuration"})).toBeInTheDocument();fireEvent.change(screen.getByDisplayValue("Production configuration for Pricing."),{target:{value:"Updated by QA"}})});

  it("renders channel analytics, filters records, and opens create workflow",async()=>{render(<SalesChannelManagementPage/>);expect(await screen.findByRole("heading",{name:"Sales Channel Management"})).toBeInTheDocument();expect(screen.getByRole("heading",{name:"Channel Revenue & Order Trend"})).toBeInTheDocument();fireEvent.change(screen.getByLabelText("Search sales channels"),{target:{value:"Mobile App"}});expect(screen.getByRole("checkbox",{name:"Select Mobile App"})).toBeInTheDocument();expect(screen.queryByRole("checkbox",{name:"Select Online Marketplace"})).not.toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:/Create Sales Channel/}));expect(screen.getByRole("dialog",{name:"Create Sales Channel"})).toBeInTheDocument()});
});
