<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AdminAdministrationSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            [
                'name' => 'Elena Vance',
                'email' => 'elena.vance@slbeauty.com',
                'username' => 'elena.vance',
                'role' => 'super_admin',
                'company_name' => 'SL Beauty Enterprise HQ',
                'status' => 'active',
                'last_login_at' => now()->subMinutes(12),
            ],
            [
                'name' => 'Anuradha Perera',
                'email' => 'anuradha@slbeauty.com',
                'username' => 'anuradha.perera',
                'role' => 'admin',
                'company_name' => 'Operations BU',
                'status' => 'active',
                'last_login_at' => now()->subMinutes(45),
            ],
            [
                'name' => 'Nimal Perera',
                'email' => 'nimal.perera@slbeauty.com',
                'username' => 'nimal.perera',
                'role' => 'admin',
                'company_name' => 'Security & Compliance BU',
                'status' => 'active',
                'last_login_at' => now()->subHours(2),
            ],
            [
                'name' => 'Arun Silva',
                'email' => 'arun.silva@slbeauty.com',
                'username' => 'arun.silva',
                'role' => 'admin',
                'company_name' => 'Finance & Settlement BU',
                'status' => 'active',
                'last_login_at' => now()->subHours(4),
            ],
            [
                'name' => 'Priya Kumar',
                'email' => 'priya.kumar@slbeauty.com',
                'username' => 'priya.kumar',
                'role' => 'admin',
                'company_name' => 'Customer Care & Logistics BU',
                'status' => 'active',
                'last_login_at' => now()->subHours(6),
            ],
            [
                'name' => 'Security Operations Team',
                'email' => 'security.team@slbeauty.com',
                'username' => 'security.ops',
                'role' => 'admin',
                'company_name' => 'Infra & SecOps',
                'status' => 'active',
                'last_login_at' => now()->subHours(8),
            ],
            [
                'name' => 'Kasun Wickramasinghe',
                'email' => 'kasun.w@slbeauty.com',
                'username' => 'kasun.w',
                'role' => 'buyer',
                'company_name' => 'Colombo Retail Partner',
                'status' => 'active',
                'last_login_at' => now()->subDays(1),
            ],
            [
                'name' => 'Dilini Fernando',
                'email' => 'dilini.f@slbeauty.com',
                'username' => 'dilini.f',
                'role' => 'buyer',
                'company_name' => 'Kandy Beauty Hub',
                'status' => 'active',
                'last_login_at' => now()->subDays(2),
            ],
            [
                'name' => 'Sanjaya Jayawardena',
                'email' => 'sanjaya.j@slbeauty.com',
                'username' => 'sanjaya.j',
                'role' => 'supplier',
                'company_name' => 'Ceylon Herbal Cosmetics',
                'status' => 'active',
                'last_login_at' => now()->subDays(1),
            ],
            [
                'name' => 'Locked Test User',
                'email' => 'locked.user@slbeauty.com',
                'username' => 'locked.user',
                'role' => 'buyer',
                'company_name' => 'Test Organization',
                'status' => 'locked',
                'last_login_at' => now()->subDays(14),
            ],
        ];

        foreach ($admins as $adminData) {
            $user = User::updateOrCreate(
                ['email' => $adminData['email']],
                [
                    'name' => $adminData['name'],
                    'username' => $adminData['username'],
                    'password' => Hash::make('Admin@SLBeauty2026!'),
                    'role' => $adminData['role'],
                    'company_name' => $adminData['company_name'],
                    'status' => $adminData['status'],
                    'country' => 'LKA',
                    'email_verified_at' => now(),
                    'last_login_at' => $adminData['last_login_at'],
                ]
            );

            // MFA Method
            if (Schema::hasTable('user_mfa_methods')) {
                DB::table('user_mfa_methods')->updateOrInsert(
                    ['user_id' => $user->id, 'method_type' => 'totp'],
                    [
                        'uuid' => (string) Str::uuid(),
                        'identifier' => 'Authenticator App',
                        'status' => 'active',
                        'verified_at' => now()->subDays(30),
                        'last_used_at' => now()->subHours(1),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }

            // Security Profile
            if (Schema::hasTable('user_security_profiles')) {
                DB::table('user_security_profiles')->updateOrInsert(
                    ['user_id' => $user->id],
                    [
                        'uuid' => (string) Str::uuid(),
                        'security_level' => in_array($user->role, ['super_admin', 'admin']) ? 'elevated' : 'standard',
                        'password_reset_required' => false,
                        'last_security_review_at' => now(),
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }
    }
}
