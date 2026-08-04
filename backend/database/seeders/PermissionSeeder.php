<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            ['name' => 'users.view', 'display_name' => 'View users', 'group' => 'users'],
            ['name' => 'users.create', 'display_name' => 'Create users', 'group' => 'users'],
            ['name' => 'users.update', 'display_name' => 'Update users', 'group' => 'users'],
            ['name' => 'users.delete', 'display_name' => 'Delete users', 'group' => 'users'],
            ['name' => 'roles.manage', 'display_name' => 'Manage roles', 'group' => 'access'],
            ['name' => 'permissions.manage', 'display_name' => 'Manage permissions', 'group' => 'access'],
            ['name' => 'suppliers.view', 'display_name' => 'View suppliers', 'group' => 'suppliers'],
            ['name' => 'suppliers.verify', 'display_name' => 'Verify suppliers', 'group' => 'suppliers'],
            ['name' => 'suppliers.manage', 'display_name' => 'Manage suppliers', 'group' => 'suppliers'],
            ['name' => 'products.view', 'display_name' => 'View products', 'group' => 'products'],
            ['name' => 'products.manage', 'display_name' => 'Manage products', 'group' => 'products'],
            ['name' => 'categories.manage', 'display_name' => 'Manage categories', 'group' => 'catalog'],
            ['name' => 'rfqs.view', 'display_name' => 'View RFQs', 'group' => 'trade'],
            ['name' => 'rfqs.manage', 'display_name' => 'Manage RFQs', 'group' => 'trade'],
            ['name' => 'quotations.view', 'display_name' => 'View quotations', 'group' => 'trade'],
            ['name' => 'quotations.manage', 'display_name' => 'Manage quotations', 'group' => 'trade'],
            ['name' => 'orders.view', 'display_name' => 'View orders', 'group' => 'orders'],
            ['name' => 'orders.manage', 'display_name' => 'Manage orders', 'group' => 'orders'],
            ['name' => 'messages.view', 'display_name' => 'View messages', 'group' => 'communications'],
            ['name' => 'notifications.manage', 'display_name' => 'Manage notifications', 'group' => 'communications'],
            ['name' => 'reviews.manage', 'display_name' => 'Manage reviews', 'group' => 'moderation'],
            ['name' => 'uploads.manage', 'display_name' => 'Manage uploads', 'group' => 'media'],
            ['name' => 'reports.view', 'display_name' => 'View reports', 'group' => 'analytics'],
            ['name' => 'admin.dashboard.view', 'display_name' => 'View admin dashboard', 'group' => 'admin'],
            ['name' => 'payouts.view', 'display_name' => 'View payouts', 'group' => 'payouts'],
            ['name' => 'payouts.approve', 'display_name' => 'Approve payouts', 'group' => 'payouts'],
            ['name' => 'payouts.process', 'display_name' => 'Process payouts', 'group' => 'payouts'],
            ['name' => 'support.cases.view', 'display_name' => 'View support cases', 'group' => 'support'],
            ['name' => 'support.cases.assign', 'display_name' => 'Assign support cases', 'group' => 'support'],
            ['name' => 'support.cases.reply', 'display_name' => 'Reply to support cases', 'group' => 'support'],
            ['name' => 'support.cases.resolve', 'display_name' => 'Resolve support cases', 'group' => 'support'],
            ['name' => 'returns.view', 'display_name' => 'View returns', 'group' => 'returns'],
            ['name' => 'returns.review', 'display_name' => 'Review returns', 'group' => 'returns'],
            ['name' => 'returns.approve', 'display_name' => 'Approve returns', 'group' => 'returns'],
            ['name' => 'ecosystem.modules.view', 'display_name' => 'View ecosystem modules', 'group' => 'ecosystem'],
            ['name' => 'ecosystem.modules.configure', 'display_name' => 'Configure ecosystem modules', 'group' => 'ecosystem'],
            ['name' => 'brand.authorizations.view', 'display_name' => 'View brand authorizations', 'group' => 'brands'],
            ['name' => 'brand.authorizations.decide', 'display_name' => 'Decide brand authorizations', 'group' => 'brands'],
            ['name' => 'logistics.view', 'display_name' => 'View logistics', 'group' => 'logistics'],
            ['name' => 'logistics.update', 'display_name' => 'Update logistics', 'group' => 'logistics'],
            ['name' => 'analytics.view', 'display_name' => 'View analytics', 'group' => 'analytics'],
            ['name' => 'analytics.export', 'display_name' => 'Export analytics', 'group' => 'analytics'],
        ];

        foreach ($permissions as $permission) {
            $existing = DB::table('permissions')->where('name', $permission['name'])->first();
            $payload = [
                ...$permission,
                'description' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('permissions')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('permissions')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }

        $this->assignPermissionsToRoles();
    }

    private function assignPermissionsToRoles(): void
    {
        $roles = DB::table('roles')->pluck('id', 'name');
        $permissions = DB::table('permissions')->pluck('id', 'name');

        $rolePermissions = [
            'admin' => $permissions->keys()->all(),
            'super_admin' => $permissions->keys()->all(),
            'staff' => [
                'users.view',
                'suppliers.view',
                'suppliers.verify',
                'products.view',
                'categories.manage',
                'rfqs.view',
                'quotations.view',
                'orders.view',
                'messages.view',
                'notifications.manage',
                'reviews.manage',
                'uploads.manage',
                'reports.view',
            ],
            'buyer' => [
                'suppliers.view',
                'products.view',
                'rfqs.manage',
                'quotations.view',
                'orders.view',
                'messages.view',
            ],
            'supplier' => [
                'products.manage',
                'rfqs.view',
                'quotations.manage',
                'orders.view',
                'messages.view',
                'uploads.manage',
            ],
        ];

        foreach ($rolePermissions as $roleName => $permissionNames) {
            $roleId = $roles[$roleName] ?? null;

            if (! $roleId) {
                continue;
            }

            foreach ($permissionNames as $permissionName) {
                $permissionId = $permissions[$permissionName] ?? null;

                if (! $permissionId) {
                    continue;
                }

                DB::table('permission_role')->updateOrInsert(
                    [
                        'role_id' => $roleId,
                        'permission_id' => $permissionId,
                    ],
                    [
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                );
            }
        }
    }
}
