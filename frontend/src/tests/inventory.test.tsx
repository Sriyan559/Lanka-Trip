import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductInventoryPage from '@/app/admin/catalogue/inventory/page';

vi.mock('@/hooks/useInventoryOperations', () => ({
  useInventoryOperations: () => ({ loading:false, refreshing:false, error:null, refresh:vi.fn(), data:{
    context:null,
    kpis:{totalActiveStock:{value:7,availability:'partial'},availableStock:{value:7,availability:'partial'},reservedStock:{value:null,availability:'unavailable',reason:'No reservations'},lowStockProducts:{value:1,availability:'available'},outOfStockProducts:{value:0,availability:'available'},nearExpiryUnits:{value:null,availability:'unavailable'},expiredUnits:{value:null,availability:'unavailable'},quarantinedStock:{value:null,availability:'unavailable'},recalledProducts:{value:null,availability:'unavailable'}},
    rows:[{id:'1',dbId:'9',publicRef:'PRODUCT-000009',name:'Live Inventory Serum',variant:'30 ml',brand:'Unavailable',supplier:'Authoritative Supplier',category:'Skincare',sku:'LIVE-STOCK-1',barcode:'—',batchNumber:'Unavailable',location:'Unavailable',onHandStock:7,availableStock:7,reservedStock:null,quarantinedStock:null,mfgDate:null,expDate:null,shelfLife:null,shelfLifeStatus:'Unavailable',batchStatus:'Unavailable',recallStatus:'Unavailable',riskScore:'Unavailable',imageUrl:'/images/product-placeholder.svg',productId:'9',updatedAt:'2026-08-10T00:00:00Z'}],
    pagination:{page:1,pageSize:25,total:1,lastPage:1},
    options:{suppliers:[{id:2,name:'Authoritative Supplier'}],categories:[{id:3,name:'Skincare'}],variants:[{id:1,name:'30 ml',sku:'LIVE-STOCK-1'}],brands:[],locations:[]},
    expiryExposure:{availability:'unavailable',currency:null,buckets:[],totalValueAtRisk:null,reason:'No expiry domain'},alerts:[{key:'negative-stock',label:'Negative Stock Detected',count:0,availability:'available'}],recallStatus:{availability:'unavailable',metrics:[],reason:'No recalls'},quickQueue:[],inventoryHealth:{availability:'partial',lowStockProducts:1,outOfStockProducts:0,accuracyPercent:null,unresolvedAdjustments:null},
    capabilities:{export:true,viewMovements:false,manageLocations:false,createBatch:false,recordAdjustment:false,startRecall:false,supportedQuickFilters:['low-stock','out-of-stock','negative-stock'],blockers:{movements:'No ledger',locations:'No locations',batches:'No batches',recalls:'No recalls'}},permissions:{canView:true,canManage:true,canExport:true},generatedAt:'2026-08-10T00:00:00Z'
  }})
}));

describe('Inventory Operations live integration', () => {
  it('renders real variant stock and explicit unavailable domains', async () => {
    render(await ProductInventoryPage({searchParams:Promise.resolve({})}));
    expect(screen.getByText('Live Inventory Serum')).toBeInTheDocument();
    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
    expect(screen.getByText(/no batch expiry or inventory-cost domain exists/i)).toBeInTheDocument();
  });
  it('uses server-provided options and disables unsupported controls', async () => {
    render(await ProductInventoryPage({searchParams:Promise.resolve({})}));
    expect(screen.getByRole('option',{name:'Authoritative Supplier'})).toHaveValue('2');
    expect(screen.getAllByRole('combobox')).toHaveLength(5);
    expect(screen.getByRole('button',{name:/Create Batch/i})).toBeDisabled();
    expect(screen.getByRole('button',{name:'Near Expiry'})).toBeDisabled();
  });
  it('supports quick server filter selection and clear', async () => {
    render(await ProductInventoryPage({searchParams:Promise.resolve({})}));
    const low=screen.getByRole('button',{name:'Low Stock'});fireEvent.click(low);expect(low.className).toContain('quickFilterChipActive');
    fireEvent.click(screen.getByRole('button',{name:'Clear All'}));expect(low.className).not.toContain('quickFilterChipActive');
  });
});
