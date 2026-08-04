import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MarketplaceSellersPage from "@/app/admin/marketplace/sellers/page";
import { fetchMarketplaceSellers } from "@/services/api/marketplaceSellersService";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

const push=vi.fn();
vi.mock("next/navigation",()=>({useRouter:()=>({push})}));

vi.mock("recharts",()=>({
  ResponsiveContainer:({children})=><div data-testid="responsive-chart">{children}</div>,
  LineChart:({children})=><div>{children}</div>,Line:()=>null,CartesianGrid:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,Legend:()=>null,
  PieChart:({children})=><div>{children}</div>,Pie:({children})=><div>{children}</div>,Cell:()=>null,
}));

describe("Seller Marketplace Performance",()=>{
  it("loads the explicit frontend fixture through its service",async()=>{
    const data=await fetchMarketplaceSellers();
    expect(data.source).toBe("frontend-fixture");
    expect(data.kpis).toHaveLength(12);
    expect(data.sellers).toHaveLength(4);
  });

  it("renders KPIs, charts, seller table and operational rail",async()=>{
    render(<MarketplaceSellersPage/>);
    expect(await screen.findByRole("heading",{name:"Seller Marketplace Performance",level:1})).toBeInTheDocument();
    expect(screen.getByText("Active Marketplace Sellers")).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:"Seller Performance Trend"})).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:/Marketplace Seller Health/})).toBeInTheDocument();
    expect(screen.getByText("Ceylon Beauty Distributors")).toBeInTheDocument();
  });

  it("filters seller rows by tab and search",async()=>{
    render(<MarketplaceSellersPage/>);
    await screen.findByText("Ceylon Beauty Distributors");
    fireEvent.click(screen.getByRole("tab",{name:"Under Review"}));
    expect(screen.getByText("Tokyo Beauty Ceylon")).toBeInTheDocument();
    expect(screen.queryByText("Ceylon Beauty Distributors")).not.toBeInTheDocument();
  });

  it("supports row selection and seller comparison",async()=>{
    render(<MarketplaceSellersPage/>);
    fireEvent.click(await screen.findByRole("checkbox",{name:"Select Ceylon Beauty Distributors"}));
    fireEvent.click(screen.getByRole("checkbox",{name:"Select LankaSkin Wholesale"}));
    const compare=screen.getAllByRole("button",{name:/Compare/}).find(button=>!button.textContent.includes("Sellers"));
    expect(compare).toBeEnabled();
    fireEvent.click(compare);
    expect(screen.getByRole("dialog",{name:"Compare Sellers"})).toBeInTheDocument();
  });

  it("registers Sellers beneath the existing Marketplace navigation",()=>{
    const marketplace=ADMIN_NAVIGATION.find(item=>item.id==="marketplace");
    expect(marketplace.children.find(item=>item.id==="sellers").href).toBe("/admin/marketplace/sellers");
    expect(marketplace.children.find(item=>item.id==="commissions")).toBeTruthy();
  });

  it("routes seller links and review actions with the selected seller ID",async()=>{
    render(<MarketplaceSellersPage/>);
    const id=await screen.findByRole("link",{name:"SELL-2026-000142"});
    expect(id).toHaveAttribute("href","/admin/marketplace/sellers/SELL-2026-000142");
    fireEvent.click(screen.getByRole("button",{name:"Actions for Ceylon Beauty Distributors"}));
    fireEvent.click(screen.getByRole("button",{name:"View Performance"}));
    expect(push).toHaveBeenCalledWith("/admin/marketplace/sellers/SELL-2026-000142");
  });
});
