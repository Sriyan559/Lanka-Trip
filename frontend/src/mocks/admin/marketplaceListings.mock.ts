import type { ListingMetric, MarketplaceListingsData } from "@/types/marketplaceListings";

export const mockMarketplaceListings: MarketplaceListingsData = {
  source: "frontend-fixture", lastUpdated: "03 Aug 2026, 1:25 PM", total: 12450,
  metrics: [
    ["all","Total Listings",12450,"neutral"],["live","Live Listings",10836,"success"],["pending-review","Pending Review",312,"warning"],
    ["draft","Draft",428,"info"],["rejected","Rejected",126,"danger"],["suspended","Suspended",84,"warning"],
    ["out-of-stock","Out of Stock",406,"neutral"],["low-stock","Low Stock",318,"warning"],["exceptions","Price Exceptions",46,"purple"],
    ["violations","Policy Violations",29,"danger"],["duplicate","Duplicate Risk",18,"purple"],["high-risk","High-Risk Listings",14,"danger"],
  ].map(([id,label,value,tone])=>({id:id as string,label:label as string,value:value as number,tone:tone as ListingMetric["tone"]})),
  listings: [
    {id:"LST-0012456",name:"Radiance Vitamin C Serum",descriptor:"Brightening & Glow",seller:"Glow Essentials SL",product:"Vitamin C Serum 30ml",brand:"Glow Rituals",businessUnit:"LKR Beauty",channel:"Web",price:"LKR 4,900",stock:128,sales:"1,248",conversion:"3.2%",verification:"Verified",policy:"Compliant",risk:"Low",status:"Live",updated:"03 Aug 2026, 12:50 PM",reviewer:"RS"},
    {id:"LST-0012433",name:"Snail Repair Intensive Cream",descriptor:"Regeneration Care",seller:"Urban Beauty Co.",product:"Face Cream 50ml",brand:"Urban Beauty",businessUnit:"LKR Beauty",channel:"Mobile App",price:"LKR 3,850",stock:42,sales:"842",conversion:"2.4%",verification:"Verified",policy:"Compliant",risk:"Medium",status:"Pending Review",updated:"03 Aug 2026, 11:15 AM",reviewer:"KM"},
    {id:"LST-0012411",name:"Tokyo Essence Lip Tint",descriptor:"Petal Pink",seller:"ExpertHub Direct",product:"Lip Tint 4.5ml",brand:"Tokyo Bright",businessUnit:"LKR Beauty",channel:"Web",price:"LKR 1,200",stock:0,sales:"324",conversion:"1.1%",verification:"Flagged",policy:"Violation",risk:"High",status:"Rejected",updated:"02 Aug 2026, 4:20 PM",reviewer:"DP"},
    {id:"LST-0012390",name:"Velvet Algae Hair Oil Treatment",descriptor:"Nourish & Strength",seller:"Aura Organics",product:"Hair Oil 100ml",brand:"Aura Organics",businessUnit:"LKR Beauty",channel:"Partner",price:"LKR 2,350",stock:16,sales:"718",conversion:"2.0%",verification:"Verified",policy:"Compliant",risk:"Low",status:"Live",updated:"02 Aug 2026, 1:05 PM",reviewer:"RS"},
  ],
  alerts: [
    {title:"Price mismatches",detail:"72 listings detected",action:"Review Pricing",tone:"danger",filter:"exceptions"},
    {title:"Duplicate risks detected",detail:"18 potential duplicates",action:"Open Queue",tone:"warning",filter:"duplicate"},
    {title:"Authenticity review",detail:"25 listings pending review",action:"Review Claims",tone:"neutral",filter:"authenticity"},
    {title:"Policy violations",detail:"29 listings require attention",action:"Review Content",tone:"danger",filter:"violations"},
    {title:"Out of stock",detail:"406 listings impacted",action:"Review Inventory",tone:"info",filter:"out-of-stock"},
    {title:"Seller update required",detail:"32 sellers need attention",action:"Review Seller",tone:"purple",filter:"seller-update"},
  ],
  queues: [
    {label:"Pending Publication",count:124,filter:"pending-review",tone:"info"},{label:"Duplicate Risks",count:18,filter:"duplicate",tone:"purple"},
    {label:"Price Exceptions",count:46,filter:"exceptions",tone:"warning"},{label:"Authenticity Review",count:25,filter:"authenticity",tone:"neutral"},
    {label:"Policy Violations",count:29,filter:"violations",tone:"danger"},{label:"Seller Update Required",count:32,filter:"seller-update",tone:"purple"},
  ],
};
