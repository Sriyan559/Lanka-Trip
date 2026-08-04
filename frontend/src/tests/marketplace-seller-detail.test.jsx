import {fireEvent,render,screen,waitFor} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import {SellerPerformanceDetailView} from "@/components/admin/marketplace/sellers/detail/SellerPerformanceDetailView";
import {fetchMarketplaceSellerDetail} from "@/services/api/marketplaceSellerDetailService";

const replace=vi.fn();
vi.mock("next/navigation",()=>({useRouter:()=>({replace}),useSearchParams:()=>new URLSearchParams()}));

describe("Seller Performance Detail",()=>{
  it("loads seller-specific detail data",async()=>{
    const data=await fetchMarketplaceSellerDetail("SELL-2026-000142");
    expect(data.name).toBe("Ceylon Beauty Distributors");
    expect(data.source).toBe("frontend-fixture");
    expect(data.dimensions).toHaveLength(8);
  });

  it("renders the score, summary panels and intervention rail",async()=>{
    render(<SellerPerformanceDetailView sellerId="SELL-2026-000142"/>);
    expect(await screen.findByRole("heading",{name:"Ceylon Beauty Distributors"})).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:"Seller Performance Score"})).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:"Marketplace Summary"})).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:"Intervention Panel"})).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:"Financial Reliability"})).toBeInTheDocument();
  });

  it("requires an audit note for interventions",async()=>{
    render(<SellerPerformanceDetailView sellerId="SELL-2026-000142"/>);
    fireEvent.click((await screen.findAllByRole("button",{name:"Place Under Review"}))[0]);
    fireEvent.click(screen.getByRole("button",{name:"Confirm"}));
    expect(screen.getByRole("alert")).toHaveTextContent("audit note is required");
  });

  it("records local intervention state without claiming persistence",async()=>{
    render(<SellerPerformanceDetailView sellerId="SELL-2026-000142"/>);
    fireEvent.click(await screen.findByRole("button",{name:"Maintain Active Status"}));
    fireEvent.change(screen.getByPlaceholderText("Enter decision context"),{target:{value:"Reviewed performance and risk."}});
    fireEvent.click(screen.getByRole("button",{name:"Confirm"}));
    await waitFor(()=>expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("returns a not-found service error for an unknown seller",async()=>{
    await expect(fetchMarketplaceSellerDetail("SELL-UNKNOWN")).rejects.toThrow("SELLER_NOT_FOUND");
  });
});
