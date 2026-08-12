<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SupplierPayablesApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authentication_and_admin_access_are_enforced(): void
    {
        $this->getJson('/api/admin/finance/supplier-payables/overview')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role'=>'buyer']));
        $this->getJson('/api/admin/finance/supplier-payables/overview')->assertForbidden();
    }

    public function test_empty_database_returns_complete_real_zero_state(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin']));
        $this->getJson('/api/admin/finance/supplier-payables/overview?currency=LKR')
            ->assertOk()->assertJsonPath('data.source','database')->assertJsonCount(12,'data.kpis')
            ->assertJsonPath('data.typeDistribution.totalCount',0)->assertJsonPath('data.alerts',[])
            ->assertJsonPath('data.health.status','unknown')->assertJsonPath('data.capabilities.invoiceMatching',false);
        $this->getJson('/api/admin/finance/supplier-payables?currency=LKR')->assertOk()
            ->assertJsonPath('data.meta.total',0)->assertJsonPath('data.items',[]);
    }

    public function test_real_settlement_drives_overview_portfolio_detail_search_and_pagination(): void
    {
        $admin=User::factory()->create(['role'=>'super_admin']); Sanctum::actingAs($admin); $supplier=Supplier::factory()->create(['company_name'=>'Real Beauty Supplier']);
        DB::table('supplier_settlements')->insert(['uuid'=>(string)Str::uuid(),'settlement_number'=>'SET-REAL-001','supplier_id'=>$supplier->id,'currency'=>'LKR','gross_amount'=>'1200.00','commission_amount'=>'100.00','refund_adjustment'=>'50.00','other_adjustments'=>'0.00','net_amount'=>'1050.00','status'=>'pending','period_start'=>now()->subDay()->toDateString(),'period_end'=>now()->toDateString(),'created_by'=>$admin->id,'created_at'=>now(),'updated_at'=>now()]);
        $this->getJson('/api/admin/finance/supplier-payables/overview?currency=LKR')->assertOk()->assertJsonPath('data.financialSummary.net','1050')
            ->assertJsonPath('data.typeDistribution.totalCount',1);
        $this->getJson('/api/admin/finance/supplier-payables?currency=LKR&search=Real%20Beauty&perPage=10')->assertOk()
            ->assertJsonPath('data.meta.total',1)->assertJsonPath('data.items.0.reference','SET-REAL-001')->assertJsonPath('data.items.0.netPayable','1050');
        $this->getJson('/api/admin/finance/supplier-payables/SET-REAL-001?currency=LKR')->assertOk()
            ->assertJsonPath('data.calculation.authoritativeSource','supplier_settlements')->assertJsonPath('data.availability.purchaseOrder',false);
    }

    public function test_query_filters_are_validated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin']));
        $this->getJson('/api/admin/finance/supplier-payables?perPage=13')->assertUnprocessable();
        $this->getJson('/api/admin/finance/supplier-payables?dateFrom=2026-08-12&dateTo=2026-08-01')->assertUnprocessable();
    }
}
