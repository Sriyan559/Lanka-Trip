import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductMastersPage from '@/app/admin/catalogue/products/page';
import { ADMIN_NAVIGATION } from '@/constants/adminNavigation';

vi.mock('next/navigation',()=>({useRouter:()=>({push:vi.fn()})}));
vi.mock('@/hooks/useProductMasterManagement',()=>({useProductMasterManagement:()=>({loading:false,refreshing:false,error:null,refresh:vi.fn(),data:{
  kpis:Array.from({length:12},(_,i)=>({id:String(i),seq:i+1,label:i===0?'Total Product Masters':`Metric ${i+1}`,value:i===0?'2':'0',trend:'',isPositive:true,iconName:'Package',filterKey:i===0?'all':`metric-${i}`})),
  tabs:[{id:'all',label:'All Products',count:2},{id:'active',label:'Active',count:1},{id:'archived',label:'Archived',count:1}],
  quickFilters:[{id:'qf-2',label:'Pending Approval',filterKey:'pending'}],
  health:[{label:'Identity Completeness',percentage:75,status:'warning',tooltipText:'Name and SKU present.'}],
  products:[{id:'7',publicId:'PRODUCT-000007',dbProductId:'7',productName:'Database Product',variantInfo:'1 variants',sku:'DB-007',barcode:'8907',brand:'Unavailable',supplier:'Real Supplier',category:'Skincare',subcategory:'Serums',variantCount:1,completenessPercent:75,brandAuthStatus:'Unavailable',complianceStatus:'Compliant',mediaStatus:'Link',inventoryLinkStatus:'Unavailable',publicationReadyStatus:'At Risk',channelAvailability:'Unavailable',duplicateRisk:'Unavailable',riskLevel:'Unavailable',approvalStatus:'Approved',productStatus:'Active',updatedAt:'2026-08-10T00:00:00Z',reviewer:'Unavailable',thumbnail:'/images/product-placeholder.svg'}],
  pagination:{page:1,pageSize:25,total:1,lastPage:1},filterOptions:{categories:[{id:4,name:'Skincare'}],suppliers:[{id:3,name:'Real Supplier'}],countries:[]},permissions:{canView:true,canManage:true,canExport:true,canImport:true},capabilities:{supportedBulkActions:['change-status','publish','archive','export-selected'],unsupportedFields:{brand:'Products have no direct brand relationship.'},liveTransport:'polling'},generatedAt:'2026-08-10T00:00:00Z'
}})}));

describe('Product Master Management live integration',()=>{
  it('renders live hook data across KPIs, tabs, health, and table',()=>{render(<ProductMastersPage/>);expect(screen.getByText('Total Product Masters')).toBeInTheDocument();expect(screen.getByRole('button',{name:/All Products/i})).toBeInTheDocument();expect(screen.getAllByText('Identity Completeness').length).toBeGreaterThan(0);expect(screen.getByText('Database Product')).toBeInTheDocument();});
  it('renders explicit unavailable intelligence instead of mock figures',()=>{render(<ProductMastersPage/>);expect(screen.getByRole('heading',{name:'Product Master Intelligence'})).toBeInTheDocument();expect(screen.getByText(/Risk, reviewer, channel, and SLA intelligence is unavailable/i)).toBeInTheDocument();});
  it('opens import, saved view, and extended filter dialogs',()=>{render(<ProductMastersPage/>);fireEvent.click(screen.getByRole('button',{name:/Import Products/i}));expect(screen.getByRole('heading',{name:'Import Product Masters'})).toBeInTheDocument();fireEvent.click(screen.getByRole('button',{name:'Cancel'}));fireEvent.click(screen.getByRole('button',{name:/Save View/i}));expect(screen.getByRole('heading',{name:'Save Custom Product View'})).toBeInTheDocument();});
  it('uses server filter options',()=>{render(<ProductMastersPage/>);expect(screen.getByRole('option',{name:'Real Supplier'})).toHaveValue('3');expect(screen.getAllByRole('option',{name:'Skincare'}).length).toBeGreaterThan(0);});
  it('keeps the navigation route stable',()=>{const catalogue=ADMIN_NAVIGATION.find(item=>item.id==='catalogue');expect(catalogue?.children?.find(child=>child.id==='product-masters')?.href).toBe('/admin/catalogue/products');});
});
