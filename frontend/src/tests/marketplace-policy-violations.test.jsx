import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import MarketplacePolicyViolationsPage from "@/app/admin/marketplace/policy-violations/page";
import {ADMIN_NAVIGATION} from "@/constants/adminNavigation";
import {fetchMarketplacePolicyViolations,recordPolicyViolationPreviewAction} from "@/services/api/marketplacePolicyViolationsService";

vi.mock("next/navigation",()=>({useRouter:()=>({push:vi.fn()})}));
vi.mock("recharts",()=>({ResponsiveContainer:({children})=><div data-testid="chart">{children}</div>,LineChart:({children})=><div>{children}</div>,CartesianGrid:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,Legend:()=>null,Line:()=>null,PieChart:({children})=><div>{children}</div>,Pie:({children})=><div>{children}</div>,Cell:()=>null}));

describe("Marketplace Policy Violations",()=>{
  it("loads the explicit frontend fixture and local audit event",async()=>{const data=await fetchMarketplacePolicyViolations();expect(data.source).toBe("frontend-fixture");expect(data.kpis).toHaveLength(12);expect(data.cases).toHaveLength(4);const event=await recordPolicyViolationPreviewAction("Review",[data.cases[0].id],"QA");expect(event.source).toBe("local-preview");expect(event.persisted).toBe(false)});

  it("registers a prefix-active Marketplace navigation item",()=>{const marketplace=ADMIN_NAVIGATION.find(item=>item.id==="marketplace");const item=marketplace.children.find(child=>child.id==="policy-violations");expect(item.href).toBe("/admin/marketplace/policy-violations")});

  it("renders the complete dashboard and operational rail",async()=>{render(<MarketplacePolicyViolationsPage/>);expect(await screen.findByRole("heading",{name:"M14 — Marketplace Policy Violations"})).toBeInTheDocument();for(const heading of ["Policy Violation Trend","Violation Category Distribution","Policy Source Distribution","Policy Health Scorecard","Marketplace Policy Violation Cases","Open & Overdue Cases","Violation Category Summary","Evidence Status","Enforcement Actions","Repeat-Offender Analysis","Active Appeals","Marketplace Policy Health","Priority Policy Alerts","Violation Status Summary","Investigation SLA Summary","Enforcement Impact (This Month)","Quick Queues"]){expect(screen.getByRole("heading",{name:new RegExp(heading.replace(/[()]/g,"\\$&"))})).toBeInTheDocument()}});

  it("filters cases and status tabs",async()=>{render(<MarketplacePolicyViolationsPage/>);await screen.findByRole("checkbox",{name:"Select POL-2026-00421"});fireEvent.change(screen.getByLabelText("Search policy cases"),{target:{value:"counterfeit"}});expect(screen.getByRole("checkbox",{name:"Select POL-2026-00418"})).toBeInTheDocument();expect(screen.queryByRole("checkbox",{name:"Select POL-2026-00421"})).not.toBeInTheDocument();fireEvent.change(screen.getByLabelText("Search policy cases"),{target:{value:""}});fireEvent.click(screen.getByRole("tab",{name:"Overdue"}));expect(screen.getByRole("checkbox",{name:"Select POL-2026-00418"})).toBeInTheDocument()});

  it("supports selection, comparison, columns, and create validation",async()=>{render(<MarketplacePolicyViolationsPage/>);const first=await screen.findByRole("checkbox",{name:"Select POL-2026-00421"});const second=screen.getByRole("checkbox",{name:"Select POL-2026-00418"});const compare=screen.getByRole("button",{name:/Compare Cases/});expect(compare).toBeDisabled();fireEvent.click(first);fireEvent.click(second);expect(compare).toBeEnabled();fireEvent.click(screen.getByRole("button",{name:/Columns/}));expect(screen.getByRole("dialog",{name:"Column Visibility"})).toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:"Cancel"}));fireEvent.click(screen.getByRole("button",{name:/Create Policy Case/}));expect(screen.getByRole("dialog",{name:"Create Policy Case"})).toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:"Confirm"}));expect(screen.getByRole("dialog",{name:"Create Policy Case"})).toBeInTheDocument()});
});
