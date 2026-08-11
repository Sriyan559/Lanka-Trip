<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Techromz Admin',
                'username' => 'admin@techromz.lk',
                'email' => 'admin@techromz.lk',
                'password' => 'Techromz@2026',
                'role' => 'admin',
                'phone' => '+94 11 200 0000',
                'company_name' => 'Techromz',
                'country' => 'Sri Lanka',
                'status' => 'active',
            ],
            [
                'name' => 'EcomLanka Admin',
                'email' => 'admin@ecomlanka.lk',
                'password' => 'Password123!',
                'role' => 'admin',
                'phone' => '+94 11 200 0001',
                'company_name' => 'EcomLanka',
                'country' => 'Sri Lanka',
                'status' => 'active',
            ],
            [
                'name' => 'Sample Buyer',
                'email' => 'buyer@ecomlanka.lk',
                'password' => 'Password123!',
                'role' => 'buyer',
                'phone' => '+94 77 200 0002',
                'company_name' => 'Global Sourcing Ltd.',
                'country' => 'Sri Lanka',
                'status' => 'active',
            ],
            [
                'name' => 'Sample Supplier',
                'email' => 'supplier@ecomlanka.lk',
                'password' => 'Password123!',
                'role' => 'supplier',
                'phone' => '+94 77 200 0003',
                'company_name' => 'Lanka Export Supplies',
                'country' => 'Sri Lanka',
                'status' => 'active',
            ],
        ];

        foreach ($users as $attributes) {
            User::updateOrCreate(
                ['email' => $attributes['email']],
                $attributes,
            );
        }
    }
}
