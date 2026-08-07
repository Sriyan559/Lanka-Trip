import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import PolicyViolationCaseDetailPage from "@/app/admin/marketplace/policy-violations/[caseId]/page";
import ManualOrderCreationPage from "@/app/admin/marketplace/orders/create/page";
import CancellationManagementPage from "@/app/admin/marketplace/orders/cancellations/page";
import MarketplaceConfigurationPage from "@/app/admin/marketplace/settings/page";
import SalesChannelManagementPage from "@/app/admin/marketplace/channels/page";
import {ADMIN_NAVIGATION} from "@/constants/adminNavigation";
import {fetchEnterpriseWorkspace,recordEnterprisePreviewAction} from "@/services/api/marketplaceEnterpriseWorkspacesService";

vi.mock("recharts",()=>({ResponsiveContainer:({children})=><div data-testid="chart">{children}</div>,LineChart:({children})=><div>{children}</div>,ComposedChart:({children})=><div>{children}</div>,PieChart:({children})=><div>{children}</div>,Pie:({children})=><div>{children}</div>,Cell:()=>null,CartesianGrid:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,Legend:()=>null,Line:()=>null,Bar:()=>null}));

describe("M15–M19 Marketplace enterprise workspaces",()=>{
  it("loads explicit fixtures and records non-persisted audit events",async()=>{for(const name of ["policyCase","manualOrder","cancellations","configuration","channels"]){const data=await fetchEnterpriseWorkspace(name,name==="policyCase"?"POL-2026-00418":undefined);expect(data.source).toBe("frontend-fixture")}const event=await recordEnterprisePreviewAction("channels","Review",["CHN-1"],"QA");expect(event.source).toBe("local-preview");expect(event.persisted).toBe(false)});

  it("registers every requested Marketplace route",()=>{const children=ADMIN_NAVIGATION.find(x=>x.id==="marketplace").children;expect(children.map(x=>x.href)).toEqual(expect.arrayContaining(["/admin/marketplace/policy-violations","/admin/marketplace/orders","/admin/marketplace/orders/create","/admin/marketplace/orders/cancellations","/admin/marketplace/settings","/admin/marketplace/channels"]))});

  it("renders the dynamic policy case and enforcement workflow",async()=>{render(<PolicyViolationCaseDetailPage params={{caseId:"POL-2026-00418"}}/>);expect(await screen.findByRole("heading",{name:"Possible Counterfeit Product"})).toBeInTheDocument();expect(screen.getByText("Case Risk & Recommendation")).toBeInTheDocument();expect(screen.getByRole("heading",{name:"Enforcement Actions"})).toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:"Issue Enforcement Decision"}));expect(screen.getByRole("dialog",{name:"Issue Enforcement Decision"})).toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:"Cancel"}))});

  it("renders manual order creation and validates payment before submission",async()=>{render(<ManualOrderCreationPage/>);expect(await screen.findByRole("heading",{name:"Manual Order Creation"})).toBeInTheDocument();expect(screen.getByRole("heading",{name:/Add Marketplace Items/})).toBeInTheDocument();expect(screen.getByRole("heading",{name:/Order Validation/})).toBeInTheDocument();const submits=screen.getAllByRole("button",{name:"Submit for Approval"});fireEvent.click(submits[0]);expect(screen.queryByRole("dialog",{name:/Submit Manual Order/})).not.toBeInTheDocument()});

  it("filters and selects cancellation requests",async()=>{render(<CancellationManagementPage/>);expect(await screen.findByRole("heading",{name:"M17 — Order Cancellation Management"})).toBeInTheDocument();fireEvent.change(screen.getByLabelText("Search cancellation requests"),{target:{value:"Nimasha"}});expect(screen.getByRole("checkbox",{name:"Select CAN-2026-003842"})).toBeInTheDocument();expect(screen.queryByRole("checkbox",{name:"Select CAN-2026-003814"})).not.toBeInTheDocument();fireEvent.click(screen.getByRole("checkbox",{name:"Select CAN-2026-003842"}));expect(screen.getByRole("button",{name:"Approve"})).toBeInTheDocument()});

  it("renders configuration sections and opens a dedicated editor",async()=>{render(<MarketplaceConfigurationPage/>);expect(await screen.findByRole("heading",{name:"Marketplace Configuration"})).toBeInTheDocument();expect(screen.getByText("Marketplace Configuration Health")).toBeInTheDocument();fireEvent.click(screen.getByRole("tab",{name:"Pricing"}));expect(screen.getByRole("heading",{name:"Pricing Configuration"})).toBeInTheDocument();fireEvent.change(screen.getByDisplayValue("Production configuration for Pricing."),{target:{value:"Updated by QA"}})});

  it("renders channel analytics, filters records, and opens create workflow",async()=>{render(<SalesChannelManagementPage/>);expect(await screen.findByRole("heading",{name:"M19 — Sales Channel Management"})).toBeInTheDocument();expect(screen.getByRole("heading",{name:"Channel Revenue & Order Trend"})).toBeInTheDocument();fireEvent.change(screen.getByLabelText("Search sales channels"),{target:{value:"Mobile App"}});expect(screen.getByRole("checkbox",{name:"Select Mobile App"})).toBeInTheDocument();expect(screen.queryByRole("checkbox",{name:"Select Online Marketplace"})).not.toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:/Create Sales Channel/}));expect(screen.getByRole("dialog",{name:"Create Sales Channel"})).toBeInTheDocument()});
});
