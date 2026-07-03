<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaxRuleSeeder extends Seeder
{
    public function run(): void
    {
        $countryIds = DB::table('countries')->pluck('id', 'iso2');
        $rules = [
            ['country' => 'LK', 'tax_type' => 'vat', 'name' => 'Sri Lanka VAT', 'rate' => 18.0000],
            ['country' => 'LK', 'tax_type' => 'export', 'name' => 'Sri Lanka Export Tax', 'rate' => 0.0000],
        ];

        foreach ($rules as $rule) {
            $countryId = $countryIds[$rule['country']] ?? null;
            $existing = DB::table('tax_rules')
                ->where('country_id', $countryId)
                ->where('tax_type', $rule['tax_type'])
                ->where('name', $rule['name'])
                ->first();

            $payload = [
                'country_id' => $countryId,
                'tax_type' => $rule['tax_type'],
                'name' => $rule['name'],
                'rate' => $rule['rate'],
                'effective_from' => null,
                'effective_until' => null,
                'rules' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('tax_rules')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('tax_rules')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
