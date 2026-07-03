<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            CountrySeeder::class,
            CurrencySeeder::class,
            LanguageSeeder::class,
            UserSeeder::class,
            UserRoleSeeder::class,
            CategorySeeder::class,
            SupplierSeeder::class,
            UserRoleSeeder::class,
            ProductSeeder::class,
            ProductImageSeeder::class,
            BannerSeeder::class,
            TrendingKeywordSeeder::class,
        ]);
    }
}
