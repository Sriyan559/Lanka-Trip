import {render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import PromotionDetailApprovalView from "@/components/admin/marketplace/promotions/detail/PromotionDetailApprovalView";
vi.mock("@/services/api/marketplacePromotionDetailService",()=>({fetchMarketplacePromotionDetail:vi.fn(async()=>{const error=new Error("Not found");error.status=404;throw error})}));
describe("Promotion detail",()=>{it("shows the real API not-found capability state",async()=>{render(<PromotionDetailApprovalView promotionId="1"/>);expect(await screen.findByRole("heading",{name:"Promotion detail unavailable"})).toBeInTheDocument();expect(screen.getByText(/promotion domain has not been implemented/i)).toBeInTheDocument()})});
