import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import MarketplaceCommissionsPage from "@/app/admin/marketplace/commissions/page";
import {fetchMarketplaceCommissions} from "@/services/api/marketplaceCommissionsService";
import {ADMIN_NAVIGATION} from "@/constants/adminNavigation";

const push=vi.fn();
vi.mock("next/navigation",()=>({useRouter:()=>({push})}));
vi.mock("recharts",()=>({ResponsiveContainer:({children})=><div data-testid="chart">{children}</div>,ComposedChart:({children})=><div>{children}</div>,CartesianGrid:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,Legend:()=>null,Bar:()=>null,Line:()=>null,PieChart:({children})=><div>{children}</div>,Pie:({children})=><div>{children}</div>,Cell:()=>null}));

describe("Marketplace Commission Management",()=>{
  it("loads the explicit frontend fixture",async()=>{const data=await fetchMarketplaceCommissions();expect(data.source).toBe("frontend-fixture");expect(data.kpis).toHaveLength(12);expect(data.rules).toHaveLength(4)});
  it("renders the commission workspace and operational rail",async()=>{render(<MarketplaceCommissionsPage/>);expect(await screen.findByRole("heading",{name:"Marketplace Commission Management"})).toBeInTheDocument();expect(screen.getByText("Active Commission Rules")).toBeInTheDocument();expect(screen.getByRole("heading",{name:"Pending Commission Approvals"})).toBeInTheDocument();expect(screen.getByRole("heading",{name:"Commission Health"})).toBeInTheDocument();expect(screen.getByText("Standard Beauty Marketplace Commission")).toBeInTheDocument()});
  it("filters commission rules by status",async()=>{render(<MarketplaceCommissionsPage/>);await screen.findByText("Standard Beauty Marketplace Commission");fireEvent.click(screen.getByRole("tab",{name:/Pending Approval/}));expect(screen.getAllByText("Tokyo Beauty Ceylon Exception Rate").length).toBeGreaterThan(0);expect(screen.queryByText("Standard Beauty Marketplace Commission")).not.toBeInTheDocument()});
  it("enables bulk actions after row selection",async()=>{render(<MarketplaceCommissionsPage/>);const bulk=await screen.findByRole("button",{name:/Bulk Actions/});expect(bulk).toBeDisabled();fireEvent.click(screen.getByRole("checkbox",{name:"Select Standard Beauty Marketplace Commission"}));expect(bulk).toBeEnabled();fireEvent.click(bulk);expect(screen.getByRole("dialog",{name:"Bulk Actions"})).toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:"Confirm"}));expect(screen.getByRole("alert")).toHaveTextContent("audit reason is required")});
  it("registers a real nested Commissions route",()=>{const marketplace=ADMIN_NAVIGATION.find(item=>item.id==="marketplace");expect(marketplace.children.find(item=>item.id==="commissions").href).toBe("/admin/marketplace/commissions")});
  it("opens the create workspace and selected edit route",async()=>{render(<MarketplaceCommissionsPage/>);fireEvent.click(await screen.findByRole("button",{name:/Create Commission Rule/}));expect(push).toHaveBeenCalledWith("/admin/marketplace/commissions/create");fireEvent.click(screen.getByRole("button",{name:"Actions for Tokyo Beauty Ceylon Exception Rate"}));fireEvent.click(screen.getByRole("button",{name:"Edit Rule"}));expect(push).toHaveBeenCalledWith("/admin/marketplace/commissions/COM-2026-00063/edit")});
});
