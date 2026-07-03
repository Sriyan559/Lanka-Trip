<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = DB::table('roles')->pluck('id', 'name');
        $users = DB::table('users')->select(['id', 'role'])->get();

        foreach ($users as $user) {
            $roleId = $roles[$user->role] ?? null;

            if (! $roleId) {
                continue;
            }

            DB::table('role_user')->updateOrInsert(
                [
                    'role_id' => $roleId,
                    'user_id' => $user->id,
                ],
                [
                    'assigned_at' => now(),
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }
}
