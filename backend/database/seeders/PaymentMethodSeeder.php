<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            [
                'name' => 'Bank Transfer',
                'provider' => 'manual',
                'method_type' => 'bank_transfer',
                'description' => 'Manual bank transfer with payment proof review.',
                'requires_manual_review' => true,
            ],
            [
                'name' => 'Letter of Credit',
                'provider' => 'manual',
                'method_type' => 'trade_finance',
                'description' => 'Letter of credit for larger international trade orders.',
                'requires_manual_review' => true,
            ],
            [
                'name' => 'Escrow Payment',
                'provider' => 'escrow',
                'method_type' => 'escrow',
                'description' => 'Escrow-backed payment workflow for buyer and supplier protection.',
                'requires_manual_review' => false,
            ],
            [
                'name' => 'Card Payment',
                'provider' => 'payment_gateway',
                'method_type' => 'card',
                'description' => 'Online card payment through a configured payment gateway.',
                'requires_manual_review' => false,
            ],
        ];

        foreach ($methods as $method) {
            $slug = Str::slug($method['name']);
            $existing = DB::table('payment_methods')->where('slug', $slug)->first();
            $payload = [
                ...$method,
                'slug' => $slug,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('payment_methods')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('payment_methods')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
