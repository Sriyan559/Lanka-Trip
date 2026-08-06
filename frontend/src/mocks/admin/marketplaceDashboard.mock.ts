import type { MarketplaceDashboardData, TrendPoint } from "@/types/marketplaceDashboard";

const daily: TrendPoint[] = [
  ["01 May",31,8,3,1],["02 May",37,9,3,1],["03 May",40,10,3,1],["04 May",43,10,4,1],
  ["05 May",44,11,4,1],["06 May",44,10,4,1],["07 May",43,10,4,1],["08 May",42,10,4,1],
].map(([label,gmv,sales,commission,refunds]) => ({ label:String(label), gmv:Number(gmv), sales:Number(sales), commission:Number(commission), refunds:Number(refunds) }));

export const mockMarketplaceDashboard: MarketplaceDashboardData = {
  lastUpdated: "08 May 2025, 11:24 AM",
  kpis: [
    {id:"gmv",label:"GMV",value:"LKR 45.2M",change:"18.6%",positive:true,trend:[4,5,7,6,8,5,4]},
    {id:"sales",label:"NET SALES",value:"LKR 8.4M",change:"15.8%",positive:true,trend:[2,4,3,5,5,4,5]},
    {id:"orders",label:"TOTAL ORDERS",value:"1,452",change:"12.4%",positive:true,trend:[2,3,4,6,7,8,9]},
    {id:"aov",label:"AOV",value:"LKR 30,459",change:"14.3%",positive:true,trend:[4,4,4,5,5,6,6]},
    {id:"sellers",label:"ACTIVE SELLERS",value:"142",change:"11",positive:true,note:"New joined vs prev. period"},
    {id:"listings",label:"ACTIVE LISTINGS",value:"12,450",change:"198",positive:true,note:"New vs prev. period"},
    {id:"commission",label:"COMMISSIONS",value:"LKR 4.38M",change:"16.1%",positive:true,note:"Platform commission fees"},
    {id:"refunds",label:"REFUNDS",value:"LKR 1.24M",change:"7.3%",positive:false,note:"Processing & return refunds"},
  ],
  trends: { daily, weekly: daily.map((p,i)=>({...p,label:`W${i+1}`,gmv:p.gmv*5})), monthly: daily.slice(0,6).map((p,i)=>({...p,label:["Jan","Feb","Mar","Apr","May","Jun"][i],gmv:p.gmv*20})) },
  composition: {
    category:[{label:"Beauty",value:42,color:"#a0002b"},{label:"Skincare",value:24,color:"#5b001b"},{label:"Cosmetics",value:18,color:"#c79616"},{label:"Tools",value:7,color:"#6b7280"},{label:"Other",value:9,color:"#d1d5db"}],
    seller:[{label:"Ceylon Beauty",value:35,color:"#a0002b"},{label:"LankaSkin",value:28,color:"#5b001b"},{label:"Tropic Beauty",value:22,color:"#c79616"},{label:"Other",value:15,color:"#d1d5db"}],
    channel:[{label:"Web",value:58,color:"#a0002b"},{label:"Mobile",value:31,color:"#5b001b"},{label:"Partner",value:11,color:"#c79616"}],
    business:[{label:"Sri Lanka",value:72,color:"#a0002b"},{label:"Regional",value:28,color:"#c79616"}],
  },
  lifecycle:[
    {label:"Pending",count:42,href:"/admin/marketplace/orders?orderStatus=pending",tone:"neutral"},{label:"Confirmed",count:372,href:"/admin/marketplace/orders?orderStatus=confirmed",tone:"neutral"},{label:"Processing",count:258,href:"/admin/marketplace/orders?orderStatus=processing",tone:"info"},{label:"Awaiting Ship",count:18,href:"/admin/marketplace/orders?fulfilmentStatus=awaiting",tone:"warning"},{label:"In Transit",count:156,href:"/admin/marketplace/orders?deliveryStatus=in-transit",tone:"info"},{label:"Delivered",count:842,href:"/admin/marketplace/orders?deliveryStatus=delivered",tone:"success"},{label:"Cancelled",count:52,href:"/admin/marketplace/orders?orderStatus=cancelled",tone:"neutral"},{label:"Returned",count:36,href:"/admin/marketplace/returns?returnStatus=returned",tone:"warning"},{label:"Refunded",count:7,href:"/admin/marketplace/returns?refundStatus=APPROVED",tone:"danger"},
  ],
  queues:[{label:"New Registrations",count:18},{label:"SLA Alerts",count:24,href:"/admin/marketplace/orders?priority=sla"},{label:"Dispute Approvals",count:15,href:"/admin/marketplace/returns?disputeStatus=OPEN"},{label:"High Risk Orders",count:87,href:"/admin/marketplace/orders?riskLevel=High"},{label:"Return Orders",count:95,href:"/admin/marketplace/returns"},{label:"Payment Verifications",count:12},{label:"Product Flagging",count:19,href:"/admin/catalogue/approvals"},{label:"KYC Pending Review",count:16,href:"/admin/verification/suppliers"}],
  sellers:[
    {rank:1,seller:"Ceylon Beauty",unit:"Personal Care",orders:432,gmv:"LKR 14.2M",fulfilment:"98.6%",cancellation:"1.2%",returnRate:"6.8%",rating:"4.8 ★",risk:"Low",status:"Live"},
    {rank:2,seller:"LankaSkin",unit:"Dermatology",orders:296,gmv:"LKR 9.8M",fulfilment:"96.2%",cancellation:"2.1%",returnRate:"5.1%",rating:"4.7 ★",risk:"Low",status:"Live"},
    {rank:3,seller:"Tropic Beauty",unit:"Premium Cosmetics",orders:214,gmv:"LKR 6.6M",fulfilment:"93.4%",cancellation:"6.4%",returnRate:"9.2%",rating:"3.8 ★",risk:"High",status:"Under Review"},
    {rank:4,seller:"Vivian Botanics",unit:"Organic Beauty",orders:182,gmv:"LKR 4.8M",fulfilment:"96.6%",cancellation:"1.4%",returnRate:"6.0%",rating:"4.6 ★",risk:"Low",status:"Live"},
  ],
  audits:[
    {event:"Seller status updated",reference:"ORD-2025-688916",entity:"Eterna Verve",action:"Status Update",timestamp:"08 May 2025, 10:45 AM",by:"SL Admin",unit:"Sri Lanka (LK)",href:"/admin/marketplace/orders"},
    {event:"Order refund processed",reference:"RET-TC-821361",entity:"Ayuram",action:"Refund Processed",timestamp:"08 May 2025, 10:32 AM",by:"System",unit:"Sri Lanka (LK)",href:"/admin/marketplace/returns"},
    {event:"New seller onboarded",reference:"USR-882-3183",entity:"Complamae Engine",action:"Onboarding",timestamp:"08 May 2025, 10:18 AM",by:"Compliance Engine",unit:"Sri Lanka (LK)"},
    {event:"KYC validation failed",reference:"KYC-VAL-22411",entity:"Care Verification",action:"KYC Validation",timestamp:"08 May 2025, 09:55 AM",by:"Compliance Engine",unit:"Sri Lanka (LK)",href:"/admin/verification/suppliers"},
  ],
  health:[{label:"Order Fulfilment",value:92,display:"92%",tone:"burgundy"},{label:"Seller Performance",value:88,display:"88%",tone:"burgundy"},{label:"Payment Success",value:96,display:"96%",tone:"green"},{label:"Dispute Rate",value:72,display:"7.2%",tone:"amber"},{label:"System Health",value:98,display:"98%",tone:"green"},{label:"Customer Satisfaction",value:87,display:"87%",tone:"burgundy"}],
  alerts:[{title:"Cancellation Mismatch",description:"High cancellation variance detected",time:"11:18 AM",action:"Review",href:"/admin/marketplace/orders?orderStatus=cancelled",severity:"danger"},{title:"High Seller Cancellation",description:"Above threshold cancellation rate detected",time:"10:52 AM",action:"Investigate",severity:"warning"},{title:"SLA Breach Volatility",description:"42 shipments lagging delivery SLA",time:"10:31 AM",action:"Open Queue",href:"/admin/marketplace/orders?priority=sla",severity:"info"},{title:"High Risk Listing Detected",description:"Potential policy violation detected",time:"09:44 AM",action:"View Listings",href:"/admin/catalogue/approvals",severity:"warning"}],
};
