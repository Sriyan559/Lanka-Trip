export type Availability = 'available' | 'partial' | 'unavailable';
export type Metric = { value: number | null; availability: Availability; definition?: string; reason?: string };
export interface InventoryRowData { id:string; dbId:string; publicRef:string; name:string; variant:string; brand:string; supplier:string; category:string; sku:string; barcode:string; batchNumber:string; location:string; onHandStock:number; availableStock:number; reservedStock:number|null; quarantinedStock:number|null; mfgDate:string|null; expDate:string|null; shelfLife:string|null; shelfLifeStatus:'Healthy'|'Critical'|'Normal'|'Unavailable'; batchStatus:'Active'|'Near Expiry'|'Quarantined'|'Expired'|'Unavailable'; recallStatus:'None'|'Active Recall'|'Safety Review Open'|'Unavailable'; riskScore:'Low'|'High'|'Critical'|'Unavailable'; imageUrl:string; productId:string; updatedAt:string; }
export interface InventoryOperationsData {
  context: null | { id:string; publicRef:string; name:string; brand:string; supplier:string };
  kpis: { totalActiveStock:Metric; availableStock:Metric; reservedStock:Metric; lowStockProducts:Metric; outOfStockProducts:Metric; nearExpiryUnits:Metric; expiredUnits:Metric; quarantinedStock:Metric; recalledProducts:Metric };
  rows: InventoryRowData[];
  pagination:{page:number;pageSize:number;total:number;lastPage:number};
  options:{suppliers:Array<{id:number;name:string}>;categories:Array<{id:number;name:string}>;variants:Array<{id:number;name:string;sku:string|null}>;brands:Array<{id:number;name:string}>;locations:Array<{id:number;name:string}>};
  expiryExposure:{availability:Availability;currency:string|null;buckets:Array<{key:string;label:string;days:number;units:number;valueAtRisk:number}>;totalValueAtRisk:number|null;reason?:string};
  alerts:Array<{key:string;label:string;count:number|null;availability:Availability;reason?:string}>;
  recallStatus:{availability:Availability;metrics:Array<{label:string;value:number}>;reason?:string};
  quickQueue:Array<{key:string;label:string;value:string}>;
  inventoryHealth:{availability:Availability;lowStockProducts:number;outOfStockProducts:number;accuracyPercent:number|null;unresolvedAdjustments:number|null};
  capabilities:{export:boolean;viewMovements:boolean;manageLocations:boolean;createBatch:boolean;recordAdjustment:boolean;startRecall:boolean;supportedQuickFilters:string[];blockers:Record<string,string>};
  permissions:{canView:boolean;canManage:boolean;canExport:boolean};generatedAt:string;
}
export interface InventoryQuery { page?:number;pageSize?:number;search?:string;productId?:string;supplierId?:string;categoryId?:string;variantId?:string;quickFilter?:string;sort?:string }
