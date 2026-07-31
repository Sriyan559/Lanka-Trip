<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use RuntimeException;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        $username = mb_strtolower(trim((string) env('SUPER_ADMIN_USERNAME')));
        $password = (string) env('SUPER_ADMIN_PASSWORD');
        $email = mb_strtolower(trim((string) env('SUPER_ADMIN_EMAIL')));

        if ($username === '' || $password === '') {
            throw new RuntimeException(
                'SUPER_ADMIN_USERNAME and SUPER_ADMIN_PASSWORD must be configured before seeding.',
            );
        }

        if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new RuntimeException('SUPER_ADMIN_EMAIL must be a valid email address when configured.');
        }

        DB::transaction(function () use ($username, $password, $email): void {
            $user = User::query()->where('username', $username)->lockForUpdate()->first();

            if (! $user) {
                $user = User::query()->create([
                    'name' => 'Super Admin',
                    'username' => $username,
                    'email' => $email !== '' ? $email : $this->internalEmailFor($username),
                    'password' => Hash::make($password),
                    'role' => 'super_admin',
                    'status' => 'active',
                    'email_verified_at' => now(),
                ]);
            } else {
                if (
                    $email !== ''
                    && User::query()
                        ->where('email', $email)
                        ->whereKeyNot($user->getKey())
                        ->exists()
                ) {
                    throw new RuntimeException('SUPER_ADMIN_EMAIL is already assigned to another account.');
                }

                $user->forceFill([
                    ...($email !== '' ? ['email' => $email] : []),
                    'role' => 'super_admin',
                    'status' => 'active',
                    'email_verified_at' => $user->email_verified_at ?? now(),
                ])->save();
            }

            if ($user->getAttribute('account_status') !== null) {
                $user->forceFill(['account_status' => 'active'])->save();
            }

            $roleId = DB::table('roles')->where('name', 'super_admin')->value('id');

            if (! $roleId) {
                $roleId = DB::table('roles')->insertGetId([
                    'uuid' => (string) Str::uuid(),
                    'name' => 'super_admin',
                    'display_name' => 'Super Administrator',
                    'description' => 'Highest-privilege platform administration access.',
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::table('role_user')->where('user_id', $user->id)->delete();
            DB::table('role_user')->insert([
                'role_id' => $roleId,
                'user_id' => $user->id,
                'assigned_at' => now(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }

    private function internalEmailFor(string $username): string
    {
        return 'super-admin+'.substr(hash('sha256', $username), 0, 20).'@invalid.local';
    }
}
