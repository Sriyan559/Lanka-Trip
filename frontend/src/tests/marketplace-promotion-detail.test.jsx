import {fireEvent,render,screen,waitFor} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import PromotionDetailApprovalView from "@/components/admin/marketplace/promotions/detail/PromotionDetailApprovalView";
import {fetchMarketplacePromotionDetail} from "@/services/api/marketplacePromotionDetailService";

const replace=vi.fn();
vi.mock("next/navigation",()=>({useRouter:()=>({replace}),useSearchParams:()=>new URLSearchParams()}));

describe("Promotion Detail & Approval",()=>{
  it("loads promotion-specific data from the selected ID",async()=>{const data=await fetchMarketplacePromotionDetail("PROM-2026-00119");expect(data.id).toBe("PROM-2026-00119");expect(data.name).toBe("Tokyo Beauty Flash Weekend");expect(data.identity.discount).toBe("20% OFF");expect(data.source).toBe("frontend-fixture")});

  it("renders the approval workspace, overview summaries, and decision rail",async()=>{render(<PromotionDetailApprovalView promotionId="PROM-2026-00119"/>);expect(await screen.findByRole("heading",{name:/Tokyo Beauty Flash Weekend/})).toBeInTheDocument();for(const heading of ["Promotion Approval Score","Campaign Summary","Promotion Rules Summary","Eligibility Summary","Budget & Funding Summary","Seller Participation Summary","Conflict Summary","Customer Experience Preview","Approval Status","Promotion Health","Blocking & Warning Issues","Financial Summary","Recommendation","Decision Actions"]){expect(screen.getByRole("heading",{name:heading})).toBeInTheDocument()}expect(screen.getByText(/conflicts that must be resolved/)).toBeInTheDocument()});

  it("preserves keyboard-accessible tabs in the URL query",async()=>{render(<PromotionDetailApprovalView promotionId="PROM-2026-00119"/>);fireEvent.click(await screen.findByRole("tab",{name:/Conflict Review/}));expect(replace).toHaveBeenCalledWith("/admin/marketplace/promotions/PROM-2026-00119?tab=conflict-review",{scroll:false})});

  it("requires an audit rationale for approval decisions",async()=>{render(<PromotionDetailApprovalView promotionId="PROM-2026-00119"/>);fireEvent.click((await screen.findAllByRole("button",{name:"Approve Promotion"}))[0]);fireEvent.click(screen.getByRole("button",{name:"Confirm"}));expect(screen.getByRole("alert")).toHaveTextContent("audit note is required")});

  it("records a local conditional approval without claiming persistence",async()=>{render(<PromotionDetailApprovalView promotionId="PROM-2026-00119"/>);fireEvent.click((await screen.findAllByRole("button",{name:"Approve with Conditions"}))[0]);fireEvent.change(screen.getByPlaceholderText("Enter approval rationale and conditions"),{target:{value:"Resolve commission overlap before activation."}});fireEvent.click(screen.getByRole("button",{name:"Confirm"}));await waitFor(()=>expect(screen.queryByRole("dialog")).not.toBeInTheDocument());expect(screen.getByText("Conditionally Approved")).toBeInTheDocument()});

  it("opens the safe customer experience preview",async()=>{render(<PromotionDetailApprovalView promotionId="PROM-2026-00119"/>);fireEvent.click((await screen.findAllByRole("button",{name:/Preview Customer Experience/}))[0]);expect(screen.getByRole("dialog",{name:"Preview Customer Experience"})).toBeInTheDocument();expect(screen.getAllByText("20% OFF").length).toBeGreaterThan(0)});

  it("returns a not-found service error for an unknown promotion",async()=>{await expect(fetchMarketplacePromotionDetail("PROM-UNKNOWN")).rejects.toThrow("PROMOTION_NOT_FOUND")});
});
