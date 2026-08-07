<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ReturnCase;
use App\Models\ReturnItem;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReturnCaseSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::firstOrCreate(
            ['email' => 'elena.rodriguez@example.com'],
            ['name' => 'Elena Rodriguez', 'role' => 'buyer', 'password' => bcrypt('password')]
        );

        $customer2 = User::firstOrCreate(
            ['email' => 'kanishka.m@example.com'],
            ['name' => 'Kanishka M.', 'role' => 'buyer', 'password' => bcrypt('password')]
        );

        $customer3 = User::firstOrCreate(
            ['email' => 'nimali.sirisena@example.com'],
            ['name' => 'Nimali Sirisena', 'role' => 'buyer', 'password' => bcrypt('password')]
        );

        $supplierUser1 = User::firstOrCreate(
            ['email' => 'supplier@luxedist.com'],
            ['name' => 'Luxe Distribution', 'role' => 'supplier', 'password' => bcrypt('password')]
        );
        $supplier = Supplier::firstOrCreate(
            ['company_name' => 'Luxe Distribution'],
            ['user_id' => $supplierUser1->id, 'slug' => 'luxe-distribution', 'email' => 'supplier@luxedist.com', 'country' => 'LK', 'status' => 'active']
        );

        $supplierUser2 = User::firstOrCreate(
            ['email' => 'admin@ceyloncosmetics.lk'],
            ['name' => 'Ceylon Cosmetics Ltd', 'role' => 'supplier', 'password' => bcrypt('password')]
        );
        $supplier2 = Supplier::firstOrCreate(
            ['company_name' => 'Ceylon Cosmetics Ltd'],
            ['user_id' => $supplierUser2->id, 'slug' => 'ceylon-cosmetics-ltd', 'email' => 'admin@ceyloncosmetics.lk', 'country' => 'LK', 'status' => 'active']
        );

        $order1 = Order::firstOrCreate(
            ['order_number' => 'ORD-2026-009021'],
            [
                'buyer_id' => $customer->id,
                'supplier_id' => $supplier->id,
                'total_amount' => '9000.00',
                'currency' => 'LKR',
                'status' => 'completed',
                'payment_status' => 'paid',
                'fulfillment_status' => 'fulfilled',
            ]
        );

        $order2 = Order::firstOrCreate(
            ['order_number' => 'ORD-2026-008712'],
            [
                'buyer_id' => $customer2->id,
                'supplier_id' => $supplier2->id,
                'total_amount' => '6500.00',
                'currency' => 'LKR',
                'status' => 'completed',
                'payment_status' => 'paid',
                'fulfillment_status' => 'fulfilled',
            ]
        );

        $order3 = Order::firstOrCreate(
            ['order_number' => 'ORD-2026-007420'],
            [
                'buyer_id' => $customer3->id,
                'supplier_id' => $supplier->id,
                'total_amount' => '12000.00',
                'currency' => 'LKR',
                'status' => 'completed',
                'payment_status' => 'paid',
                'fulfillment_status' => 'fulfilled',
            ]
        );

        $item1 = OrderItem::firstOrCreate(
            ['order_id' => $order1->id],
            [
                'product_name' => 'Radiance Vitamin C Serum',
                'quantity' => 2,
                'unit_price' => '4500.00',
                'amount' => '9000.00',
            ]
        );

        $item2 = OrderItem::firstOrCreate(
            ['order_id' => $order2->id],
            [
                'product_name' => 'Gold infused Cream - 50g',
                'quantity' => 1,
                'unit_price' => '6500.00',
                'amount' => '6500.00',
            ]
        );

        $item3 = OrderItem::firstOrCreate(
            ['order_id' => $order3->id],
            [
                'product_name' => 'Hydrating Night Serum - 30ml',
                'quantity' => 3,
                'unit_price' => '4000.00',
                'amount' => '12000.00',
            ]
        );

        $returnCases = [
            [
                'uuid' => (string) Str::uuid(),
                'return_number' => 'RET-2026-045091',
                'order_id' => $order1->id,
                'customer_id' => $customer->id,
                'supplier_id' => $supplier->id,
                'status' => 'evidence_required',
                'reason_code' => 'Defective Product',
                'reason' => 'Seal broken and leaking',
                'metadata' => [
                    'return_type' => 'Product Return',
                    'risk_level' => 'High',
                    'customer_name' => 'Elena Rodriguez',
                    'customer_email' => 'elena.rodriguez@example.com',
                    'product_name' => 'Radiance Vitamin C Serum',
                    'product_sku' => 'SKU-SER-001',
                    'supplier_name' => 'Luxe Distribution',
                    'assigned_officer' => 'Elena Vance',
                ],
                'item' => $item1,
            ],
            [
                'uuid' => (string) Str::uuid(),
                'return_number' => 'RET-2026-045088',
                'order_id' => $order2->id,
                'customer_id' => $customer2->id,
                'supplier_id' => $supplier2->id,
                'status' => 'requested',
                'reason_code' => 'Exchange Request',
                'reason' => 'Wrong shade received',
                'metadata' => [
                    'return_type' => 'Exchange Request',
                    'risk_level' => 'Normal',
                    'customer_name' => 'Kanishka M.',
                    'customer_email' => 'kanishka.m@example.com',
                    'product_name' => 'Matte Velvet Lipstick - Ruby Red',
                    'product_sku' => 'SKU-LIP-002',
                    'supplier_name' => 'Ceylon Cosmetics Ltd',
                    'assigned_officer' => 'Unassigned',
                ],
                'item' => $item2,
            ],
            [
                'uuid' => (string) Str::uuid(),
                'return_number' => 'RET-2026-045075',
                'order_id' => $order3->id,
                'customer_id' => $customer3->id,
                'supplier_id' => $supplier->id,
                'status' => 'under_review',
                'reason_code' => 'safety_complaint',
                'reason' => 'Severe skin redness and allergic reaction reported',
                'metadata' => [
                    'return_type' => 'Safety Complaint',
                    'risk_level' => 'High',
                    'customer_name' => 'Nimali Sirisena',
                    'customer_email' => 'nimali.sirisena@example.com',
                    'product_name' => 'Gold infused Cream - 50g',
                    'product_sku' => 'SKU-GLD-050',
                    'supplier_name' => 'Luxe Distribution',
                    'assigned_officer' => 'Unassigned',
                    'escalated' => true,
                ],
                'item' => $item3,
            ],
            [
                'uuid' => (string) Str::uuid(),
                'return_number' => 'RET-2026-045068',
                'order_id' => $order1->id,
                'customer_id' => $customer->id,
                'supplier_id' => $supplier->id,
                'status' => 'inspection_pending',
                'reason_code' => 'authenticity_complaint',
                'reason' => 'Suspected counterfeit product seal',
                'metadata' => [
                    'return_type' => 'Authenticity Complaint',
                    'risk_level' => 'High',
                    'customer_name' => 'Farid Aslam',
                    'customer_email' => 'farid.a@example.com',
                    'product_name' => 'Hydrating Night Serum - 50g',
                    'product_sku' => 'SKU-HYD-050',
                    'supplier_name' => 'Aura Cosmetics Ltd',
                    'assigned_officer' => 'Unassigned',
                ],
                'item' => $item1,
            ],
            [
                'uuid' => (string) Str::uuid(),
                'return_number' => 'RET-2026-045062',
                'order_id' => $order2->id,
                'customer_id' => $customer2->id,
                'supplier_id' => $supplier2->id,
                'status' => 'approved',
                'reason_code' => 'Delivery Damage',
                'reason' => 'Outer box crushed and broken bottle inside',
                'metadata' => [
                    'return_type' => 'Delivery Damage',
                    'risk_level' => 'Normal',
                    'customer_name' => 'Amina Ali',
                    'customer_email' => 'amina.a@example.com',
                    'product_name' => 'Gentle Facial Cleanser - 150ml',
                    'product_sku' => 'SKU-CLN-150',
                    'supplier_name' => 'Perera Imports Co.',
                    'assigned_officer' => 'Elena Vance',
                ],
                'item' => $item2,
            ],
            [
                'uuid' => (string) Str::uuid(),
                'return_number' => 'RET-2026-045055',
                'order_id' => $order3->id,
                'customer_id' => $customer3->id,
                'supplier_id' => $supplier->id,
                'status' => 'refund_pending',
                'reason_code' => 'Product Defect',
                'reason' => 'Pump mechanism broken on arrival',
                'metadata' => [
                    'return_type' => 'Product Defect',
                    'risk_level' => 'Normal',
                    'customer_name' => 'Tariq Jayasinghe',
                    'customer_email' => 'tariq.j@example.com',
                    'product_name' => 'Kevlar Repair Serum - 10ml',
                    'product_sku' => 'SKU-KEV-010',
                    'supplier_name' => 'Serendib Premium Beauty',
                    'assigned_officer' => 'Elena Vance',
                ],
                'item' => $item3,
            ],
        ];

        foreach ($returnCases as $rc) {
            $case = ReturnCase::updateOrCreate(
                ['return_number' => $rc['return_number']],
                [
                    'uuid' => $rc['uuid'],
                    'order_id' => $rc['order_id'],
                    'customer_id' => $rc['customer_id'],
                    'supplier_id' => $rc['supplier_id'],
                    'status' => $rc['status'],
                    'reason_code' => $rc['reason_code'],
                    'reason' => $rc['reason'],
                    'metadata' => $rc['metadata'],
                ]
            );

            ReturnItem::updateOrCreate(
                ['return_case_id' => $case->id, 'order_item_id' => $rc['item']->id],
                [
                    'quantity' => 1,
                    'condition' => 'Unopened / Damaged',
                    'inspection_status' => $rc['status'] === 'inspection_pending' ? 'pending' : 'passed',
                    'approved_refund_amount' => 4500.00,
                ]
            );

            DB::table('return_status_history')->insertOrIgnore([
                'return_case_id' => $case->id,
                'actor_id' => $rc['customer_id'],
                'from_status' => null,
                'to_status' => $rc['status'],
                'notes' => 'Return request seeded for live admin data',
                'created_at' => now(),
            ]);

            DB::table('support_cases')->updateOrInsert(
                ['case_number' => 'SUP-CASE-' . $case->id],
                [
                    'uuid' => (string) Str::uuid(),
                    'customer_id' => $rc['customer_id'],
                    'subject' => "Return Request: {$rc['return_number']}",
                    'description' => $rc['reason'],
                    'channel' => 'web',
                    'category' => 'returns',
                    'priority' => $rc['metadata']['risk_level'] === 'High' ? 'high' : 'normal',
                    'status' => 'open',
                    'related_return_id' => $case->id,
                    'related_order_id' => $rc['order_id'],
                    'sla_status' => $rc['metadata']['risk_level'] === 'High' ? 'breached' : 'within_target',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
