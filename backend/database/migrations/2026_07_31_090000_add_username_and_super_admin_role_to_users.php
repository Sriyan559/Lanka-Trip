<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const ROLES = ['admin', 'super_admin', 'buyer', 'supplier'];

    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('name');
        });

        $this->changeRoleConstraint(self::ROLES);
    }

    public function down(): void
    {
        DB::table('users')
            ->where('role', 'super_admin')
            ->update(['role' => 'admin']);

        $this->changeRoleConstraint(['admin', 'buyer', 'supplier']);

        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['username']);
            $table->dropColumn('username');
        });
    }

    /**
     * Keep the existing role column architecture while safely expanding its
     * database-level allowed values on every supported database driver.
     *
     * @param  list<string>  $roles
     */
    private function changeRoleConstraint(array $roles): void
    {
        $driver = DB::connection()->getDriverName();

        if ($driver === 'pgsql') {
            $quotedRoles = implode(', ', array_map(
                fn (string $role): string => DB::connection()->getPdo()->quote($role),
                $roles,
            ));

            DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check');
            DB::statement("ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ({$quotedRoles}))");

            return;
        }

        if ($driver === 'mysql') {
            $quotedRoles = implode(', ', array_map(
                fn (string $role): string => DB::connection()->getPdo()->quote($role),
                $roles,
            ));

            DB::statement("ALTER TABLE users MODIFY role ENUM({$quotedRoles}) NOT NULL DEFAULT 'buyer'");

            return;
        }

        Schema::table('users', function (Blueprint $table) use ($roles) {
            $table->enum('role', $roles)->default('buyer')->change();
        });
    }
};
