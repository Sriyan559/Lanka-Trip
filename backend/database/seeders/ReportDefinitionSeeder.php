<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReportDefinitionSeeder extends Seeder
{
    public function run(): void
    {
        $reports = [
            ['name' => 'Marketplace Performance Report', 'report_type' => 'marketplace_performance'],
            ['name' => 'Supplier Performance Report', 'report_type' => 'supplier_performance'],
            ['name' => 'Product Analytics Report', 'report_type' => 'product_analytics'],
            ['name' => 'RFQ Conversion Report', 'report_type' => 'rfq_conversion'],
            ['name' => 'Order Revenue Report', 'report_type' => 'order_revenue'],
            ['name' => 'Search Insights Report', 'report_type' => 'search_insights'],
        ];

        foreach ($reports as $report) {
            $slug = Str::slug($report['name']);
            $existing = DB::table('report_definitions')->where('slug', $slug)->first();
            $payload = [
                ...$report,
                'slug' => $slug,
                'parameters_schema' => null,
                'default_filters' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('report_definitions')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('report_definitions')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
