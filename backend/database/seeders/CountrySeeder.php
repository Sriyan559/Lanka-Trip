<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['iso2' => 'LK', 'iso3' => 'LKA', 'name' => 'Sri Lanka', 'phone_code' => '+94'],
            ['iso2' => 'IN', 'iso3' => 'IND', 'name' => 'India', 'phone_code' => '+91'],
            ['iso2' => 'US', 'iso3' => 'USA', 'name' => 'United States', 'phone_code' => '+1'],
            ['iso2' => 'GB', 'iso3' => 'GBR', 'name' => 'United Kingdom', 'phone_code' => '+44'],
            ['iso2' => 'AU', 'iso3' => 'AUS', 'name' => 'Australia', 'phone_code' => '+61'],
            ['iso2' => 'CA', 'iso3' => 'CAN', 'name' => 'Canada', 'phone_code' => '+1'],
            ['iso2' => 'AE', 'iso3' => 'ARE', 'name' => 'United Arab Emirates', 'phone_code' => '+971'],
            ['iso2' => 'SG', 'iso3' => 'SGP', 'name' => 'Singapore', 'phone_code' => '+65'],
            ['iso2' => 'DE', 'iso3' => 'DEU', 'name' => 'Germany', 'phone_code' => '+49'],
            ['iso2' => 'JP', 'iso3' => 'JPN', 'name' => 'Japan', 'phone_code' => '+81'],
        ];

        foreach ($countries as $country) {
            $existing = DB::table('countries')->where('iso2', $country['iso2'])->first();

            if ($existing) {
                DB::table('countries')->where('id', $existing->id)->update([
                    ...$country,
                    'status' => 'active',
                    'updated_at' => now(),
                ]);

                continue;
            }

            DB::table('countries')->insert([
                ...$country,
                'uuid' => (string) Str::uuid(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
