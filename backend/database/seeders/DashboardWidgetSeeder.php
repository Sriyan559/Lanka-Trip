<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DashboardWidgetSeeder extends Seeder
{
    public function run(): void
    {
        $widgets = [
            ['name' => 'Marketplace Overview', 'widget_type' => 'metric_grid', 'audience' => 'admin', 'sort_order' => 10],
            ['name' => 'Supplier Performance', 'widget_type' => 'chart', 'audience' => 'supplier', 'sort_order' => 20],
            ['name' => 'Buyer RFQ Activity', 'widget_type' => 'chart', 'audience' => 'buyer', 'sort_order' => 30],
            ['name' => 'Product Views', 'widget_type' => 'trend', 'audience' => 'supplier', 'sort_order' => 40],
            ['name' => 'Order Conversion Funnel', 'widget_type' => 'funnel', 'audience' => 'admin', 'sort_order' => 50],
            ['name' => 'Revenue Snapshot', 'widget_type' => 'metric', 'audience' => 'admin', 'sort_order' => 60],
        ];

        foreach ($widgets as $widget) {
            $slug = Str::slug($widget['name']);
            $existing = DB::table('dashboard_widgets')->where('slug', $slug)->first();
            $payload = [
                ...$widget,
                'slug' => $slug,
                'default_config' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('dashboard_widgets')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('dashboard_widgets')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
