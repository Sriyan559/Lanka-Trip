import {render,screen} from '@testing-library/react';
import {describe,expect,it,vi} from 'vitest';
import {CategoryLowerDashboards} from './CategoryLowerDashboards';
import type {CategoryManagementData} from '@/types/categoryManagement';

const data={summary:{uncategorizedProducts:3,duplicateCandidates:2,orphanCategories:0,attributeCoverage:87},analytics:{hierarchyIntegrity:100,maxDepth:4,leafCategories:8,averageProductsPerCategory:2.5,productCoverage:[{level:1,categoriesCount:2,activeProductsCount:5,avgPerCategory:2.5}],duplicatePairs:[{id:'1-2',categoryA:'Serum',categoryB:'Serum',similarityPercent:100,risk:'High',productsCount:4,sourceId:'1',targetId:'2'}],activities:[]}} as unknown as CategoryManagementData;

describe('CategoryLowerDashboards',()=>{
 it('renders database aggregates and explicit unsupported-domain states',()=>{render(<CategoryLowerDashboards data={data} onMergeDuplicate={vi.fn()}/>);expect(screen.getAllByText('87%').length).toBeGreaterThan(0);expect(screen.getByText('3')).toBeInTheDocument();expect(screen.getAllByText('Unavailable').length).toBeGreaterThan(0);expect(screen.getByText('Serum / Serum')).toBeInTheDocument();});
});
