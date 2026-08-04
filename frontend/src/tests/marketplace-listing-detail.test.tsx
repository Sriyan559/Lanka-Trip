import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ListingDetailView } from "@/components/admin/marketplace/listings/detail/ListingDetailView";
import { fetchMarketplaceListingDetail } from "@/services/api/marketplaceListingDetailService";

const replace=vi.fn();
vi.mock("next/navigation",()=>({useRouter:()=>({replace}),useSearchParams:()=>new URLSearchParams()}));

describe("Listing Detail & Moderation",()=>{
  it("loads listing-specific fixture data",async()=>{
    const detail=await fetchMarketplaceListingDetail("LST-0012456");
    expect(detail.id).toBe("LST-0012456");
    expect(detail.source).toBe("frontend-fixture");
    expect(detail.stages).toHaveLength(9);
  });

  it("renders the moderation overview and review rail",async()=>{
    render(<ListingDetailView listingId="LST-0012456"/>);
    expect(await screen.findByRole("heading",{name:"Radiance Vitamin C Serum — 30 ml"})).toBeInTheDocument();
    expect(screen.getByText("Catalogue Alignment Comparison")).toBeInTheDocument();
    expect(screen.getByText("Policy & Risk Findings")).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:"Review Status"})).toBeInTheDocument();
  });

  it("validates the seller update workflow",async()=>{
    render(<ListingDetailView listingId="LST-0012456"/>);
    fireEvent.click(await screen.findByRole("button",{name:"Request Seller Update"}));
    fireEvent.click(screen.getByRole("button",{name:"Send Request"}));
    expect(screen.getByRole("alert")).toHaveTextContent("Complete all required seller update fields");
  });

  it("requires policy review confirmation before keeping live",async()=>{
    render(<ListingDetailView listingId="LST-0012456"/>);
    fireEvent.click(await screen.findByRole("button",{name:/Keep Live/}));
    fireEvent.click(screen.getByRole("button",{name:"Confirm"}));
    expect(screen.getByRole("alert")).toHaveTextContent("policy and risk findings");
    fireEvent.click(screen.getByRole("checkbox",{name:/confirm policy and risk/i}));
    fireEvent.click(screen.getByRole("button",{name:"Confirm"}));
    await waitFor(()=>expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
