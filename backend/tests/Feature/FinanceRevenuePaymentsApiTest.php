<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FinanceRevenuePaymentsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_finance_pages_require_admin_access(): void
    {
        $this->getJson('/api/admin/finance/revenue-receivables')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role'=>'buyer']));
        $this->getJson('/api/admin/finance/payments')->assertForbidden();
    }

    public function test_revenue_and_payment_pages_return_database_backed_totals_and_rows(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin']));
        $currencyId=DB::table('currencies')->insertGetId(['uuid'=>(string)Str::uuid(),'code'=>'LKR','name'=>'Sri Lankan Rupee','symbol'=>'Rs','decimal_places'=>2,'status'=>'active','created_at'=>now(),'updated_at'=>now()]);
        $buyer=User::factory()->create(['name'=>'Live Finance Buyer']); $supplier=Supplier::factory()->create();
        $order=Order::create(['order_number'=>'ORD-LIVE-001','buyer_id'=>$buyer->id,'supplier_id'=>$supplier->id,'total_amount'=>'1200.00','subtotal'=>'1000.00','tax_amount'=>'200.00','discount_amount'=>'100.00','currency'=>'LKR','status'=>'completed','payment_status'=>'partial','fulfillment_status'=>'completed','approval_status'=>'approved']);
        $invoiceId=DB::table('invoices')->insertGetId(['uuid'=>(string)Str::uuid(),'order_id'=>$order->id,'supplier_id'=>$supplier->id,'currency_id'=>$currencyId,'invoice_number'=>'INV-LIVE-001','invoice_date'=>today(),'due_date'=>today()->subDays(10),'subtotal'=>1000,'tax_amount'=>200,'shipping_amount'=>0,'discount_amount'=>100,'total_amount'=>1100,'amount_paid'=>400,'balance_due'=>700,'payment_status'=>'partial','status'=>'sent','created_at'=>now(),'updated_at'=>now()]);
        $method=PaymentMethod::create(['uuid'=>(string)Str::uuid(),'name'=>'Live Card','slug'=>'live-card','method_type'=>'card','status'=>'active']);
        Payment::create(['uuid'=>(string)Str::uuid(),'order_id'=>$order->id,'invoice_id'=>$invoiceId,'payer_user_id'=>$buyer->id,'payment_method_id'=>$method->id,'currency_id'=>$currencyId,'payment_number'=>'PAY-LIVE-001','amount'=>400,'fee_amount'=>10,'status'=>'completed','payment_status'=>'paid','authorized_at'=>now(),'paid_at'=>now()]);

        $this->getJson('/api/admin/finance/revenue-receivables?currency=LKR')->assertOk()
            ->assertJsonPath('data.source','database')->assertJsonPath('data.totals.gmv',1200)
            ->assertJsonPath('data.totals.outstanding',700)->assertJsonPath('data.rows.0.invoiceRef','INV-LIVE-001')
            ->assertJsonPath('data.rows.0.customerAccount','Live Finance Buyer')->assertJsonPath('data.capabilities.revenueRecognition',false);
        $this->getJson('/api/admin/finance/payments?currency=LKR')->assertOk()
            ->assertJsonPath('data.source','database')->assertJsonPath('data.totals.attempts',1)
            ->assertJsonPath('data.totals.captured',400)->assertJsonPath('data.rows.0.ref','PAY-LIVE-001')
            ->assertJsonPath('data.rows.0.paymentMethod','Live Card')->assertJsonPath('data.capabilities.reconciliation',false);
    }

    public function test_empty_states_are_real_and_filters_are_validated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin']));
        $this->getJson('/api/admin/finance/payments')->assertOk()->assertJsonPath('data.rows',[])->assertJsonPath('data.totals.attempts',0);
        $this->getJson('/api/admin/finance/revenue-receivables?perPage=13')->assertUnprocessable();
    }
}
