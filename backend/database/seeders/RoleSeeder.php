<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full platform administration access.',
            ],
            [
                'name' => 'super_admin',
                'display_name' => 'Super Administrator',
                'description' => 'Highest-privilege platform administration access.',
            ],
            [
                'name' => 'buyer',
                'display_name' => 'Buyer',
                'description' => 'Buyer account for sourcing products, RFQs, quotations, and orders.',
            ],
            [
                'name' => 'supplier',
                'display_name' => 'Supplier',
                'description' => 'Supplier account for managing company, products, quotations, and orders.',
            ],
            [
                'name' => 'staff',
                'display_name' => 'Staff',
                'description' => 'Internal operational staff account.',
            ],
        ];

        foreach ($roles as $role) {
            $existing = DB::table('roles')->where('name', $role['name'])->first();

            if ($existing) {
                DB::table('roles')
                    ->where('id', $existing->id)
                    ->update([
                        ...$role,
                        'status' => 'active',
                        'updated_at' => now(),
                    ]);

                continue;
            }

            DB::table('roles')->insert([
                ...$role,
                'uuid' => (string) Str::uuid(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
