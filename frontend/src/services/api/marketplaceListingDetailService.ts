import { mockMarketplaceListings } from "@/mocks/admin/marketplaceListings.mock";
import type { LocalAuditEvent, MarketplaceListingDetail } from "@/types/marketplaceListingDetail";

const stages: MarketplaceListingDetail["stages"] = [...["Submitted","Filtering","Initial Review","Content AI","Guideline Fit","Pricing Audit"].map(label=>({label,state:"complete" as const})),
  {label:"Policy & Risk",state:"active" as const},{label:"Final Decision",state:"pending" as const},{label:"Published",state:"pending" as const},
];

const comparison: MarketplaceListingDetail["comparison"] = [
  {attribute:"Product Title",listing:"Radiance Vitamin C Serum — 30 ml",master:"Radiance Vitamin C Serum (30ml)",status:"Match",detail:"Exact match"},
  {attribute:"Brand Authority",listing:"SL Beauty Professional",master:"SL Beauty Professional",status:"Match",detail:"Exact match"},
  {attribute:"Key Ingredients",listing:"10% Vit C, Hyaluronic Acid, Rosehip",master:"15% Vit C, Hyaluronic Acid, Vitamin E",status:"Minor Difference",detail:"Ingredient variance"},
  {attribute:"Pack Variant",listing:"30 ml Glass Bottle",master:"30 ml Glass Bottle",status:"Match",detail:"Exact match"},
  {attribute:"Claims (Brightening)",listing:"Brightens skin & reduces dark spots",master:"Visibly brightens skin and reduces dark spots",status:"Minor Difference",detail:"Wording variation"},
  {attribute:"Certifications",listing:"Cruelty Free, Paraben Free",master:"Cruelty Free",status:"Requires Review",detail:"Extra claim not in master"},
  {attribute:"Images",listing:"7 images",master:"7 images",status:"Match",detail:"Count & order match"},
  {attribute:"Documents",listing:"CoA, MSDS",master:"CoA",status:"Missing",detail:"MSDS missing"},
  {attribute:"Price",listing:"LKR 12,450",master:"LKR 12,800 – 12,900",status:"Match",detail:"Within safe range"},
  {attribute:"Inventory",listing:"2,460 units",master:"2,500 – 3,000 units",status:"Minor Difference",detail:"Below preferred minimum"},
];

/** No listing-detail endpoint exists yet; this adapter deliberately exposes its fixture source. */
export async function fetchMarketplaceListingDetail(listingId: string, signal?: AbortSignal): Promise<MarketplaceListingDetail> {
  if (signal?.aborted) throw new DOMException("Request aborted", "AbortError");
  const row = mockMarketplaceListings.listings.find(item=>item.id===listingId);
  if (!row) throw new Error("LISTING_NOT_FOUND");
  return {
    source:"frontend-fixture", id:row.id, title:row.name.includes("Serum")?`${row.name} — 30 ml`:row.name,
    seller:row.seller, marketplace:"Beauty Marketplace", brand:row.brand, country:"Sri Lanka", region:"Sri Lanka", category:"LCR",
    lastUpdated:row.updated, status:row.status, price:row.price, stock:row.stock, description:`${row.descriptor}. Curated marketplace listing supplied by ${row.seller}.`,
    score:82, completion:78, reviewer:"Sarah Johnson", reviewSla:"24h 0m", elapsed:"4h 16m", dueDate:"04 Aug 2026, 2:04 PM",
    productMaster:"PM-VITC-30ML", sku:"77387-SL-B", ean:"4796123456787", stages, comparison,
    findings:[
      {title:"Permission required",detail:'Clinical claim for "brightens skin in 48 hours" lacks verifiable third-party lab documentation per SL Beauty verification.',severity:"High Risk"},
      {title:"Price variance warning",detail:"Listing price is LKR 350 higher than the standard regional MSRP. Review for margin control.",severity:"Medium Risk"},
      {title:"Duplicate check",detail:`Low risk. This is the only active listing for SKU ${row.id} in Sri Lanka region.`,severity:"Low Risk"},
    ],
  };
}

export async function recordLocalListingAudit(listingId:string, action:string, note=""): Promise<LocalAuditEvent> {
  await Promise.resolve();
  return {id:`local-${Date.now()}`,action,note,at:new Date().toISOString(),actor:"Current admin"};
}
