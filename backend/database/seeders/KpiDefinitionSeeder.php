<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class KpiDefinitionSeeder extends Seeder
{
    public function run(): void
    {
        $kpis = [
            ['name' => 'Gross Merchandise Value', 'metric_key' => 'gmv', 'kpi_type' => 'revenue', 'unit' => 'amount'],
            ['name' => 'RFQ Conversion Rate', 'metric_key' => 'rfq_conversion_rate', 'kpi_type' => 'conversion', 'unit' => 'percent'],
            ['name' => 'Quotation Acceptance Rate', 'metric_key' => 'quotation_acceptance_rate', 'kpi_type' => 'conversion', 'unit' => 'percent'],
            ['name' => 'Product View Count', 'metric_key' => 'product_views', 'kpi_type' => 'engagement', 'unit' => 'count'],
            ['name' => 'Supplier Response Time', 'metric_key' => 'supplier_response_time', 'kpi_type' => 'operations', 'unit' => 'hours'],
            ['name' => 'Search Click Through Rate', 'metric_key' => 'search_ctr', 'kpi_type' => 'search', 'unit' => 'percent'],
        ];

        foreach ($kpis as $kpi) {
            $slug = Str::slug($kpi['name']);
            $existing = DB::table('kpi_definitions')->where('metric_key', $kpi['metric_key'])->first();
            $payload = [
                ...$kpi,
                'slug' => $slug,
                'calculation_rules' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('kpi_definitions')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('kpi_definitions')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
