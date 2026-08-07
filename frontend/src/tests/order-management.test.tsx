import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OrderManagementPage from "@/app/admin/marketplace/orders/page";

vi.mock("next/navigation",()=>({useRouter:()=>({push:vi.fn()}),useSearchParams:()=>new URLSearchParams()}));
vi.mock("@/services/api/orderService",()=>({
  exportOrdersCsv:vi.fn(async()=>undefined),
  fetchMarketplaceOrders:vi.fn(async()=>({context:{currency:"LKR",dateFrom:"2026-08-01",dateTo:"2026-08-07",timezone:"Asia/Colombo"},availableCurrencies:["LKR"],
    kpis:["Total Today","Pending Payment","Payment Failed","In Production","Awaiting Supplier","Ready for Dispatch","In Transit","Delivered Today","Cancelled","Returns in Progress","SLA Breaches","High-Risk Orders"].map((label,index)=>({id:String(index),label,available:index<4||index===7||index===8,value:index===0?1:0,reason:index<4?undefined:"domain_not_present"})),
    orders:{available:true,items:[{id:"41",orderReference:"ORD-REAL-041",databaseOrderId:"41",customer:{id:"8",name:"Database Buyer"},supplier:{id:"5",name:"Database Supplier"},itemsCount:2,suppliersCount:1,splitOrder:false,total:{amount:"1250.50",currency:"LKR"},paymentMethod:"Bank Transfer",paymentStatus:"failed",orderStatus:"confirmed",fulfilmentStatus:"pending",delivery:null,createdAt:"2026-08-07T08:00:00Z",updatedAt:"2026-08-07T09:00:00Z",availability:{assignment:false,risk:false,sla:false,batchAllocation:false,multiSupplierSplit:false}}]},
    filters:{orderStatuses:["confirmed"],paymentStatuses:["failed"],fulfilmentStatuses:["pending"],deliveryStatuses:[],paymentMethods:[{slug:"bank-transfer",name:"Bank Transfer"}],suppliers:[{id:5,name:"Database Supplier"}]},health:{available:false,reason:"formula_not_defined"},alerts:[],paymentSummary:{available:true,currency:"LKR",paidToday:"0.00",pendingPayments:"0.00",failedPayments:"1250.50",codPending:"0.00",refundsPending:"0.00"},quickQueue:[],capabilities:{},permissions:{canView:true,canExport:true,canAssign:false,canCreateManualOrder:false},meta:{page:1,perPage:10,total:1,totalPages:1,from:1,to:1,generatedAt:"2026-08-07T10:00:00Z",dataAsOf:"2026-08-07T10:00:00Z",refreshIntervalSeconds:60}}))
}));

describe("Marketplace Order Management",()=>{
  it("renders API-backed orders and explicit unavailable capabilities",async()=>{render(<OrderManagementPage/>);expect(screen.getByRole("heading",{name:"Order Management"})).toBeInTheDocument();expect(await screen.findByText("ORD-REAL-041")).toBeInTheDocument();expect(screen.getByText("Database Buyer")).toBeInTheDocument();expect(screen.getByRole("button",{name:/Assign Orders/})).toBeDisabled();expect(screen.getAllByText("N/A").length).toBeGreaterThan(0)});
  it("renders reconciled payment totals",async()=>{render(<OrderManagementPage/>);await waitFor(()=>expect(screen.getAllByText("LKR 1,250.50").length).toBeGreaterThan(0))});
});
