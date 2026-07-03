<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ShipmentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            ['name' => 'Ocean Freight FCL', 'method_type' => 'ocean', 'description' => 'Full container load ocean freight for export shipments.'],
            ['name' => 'Ocean Freight LCL', 'method_type' => 'ocean', 'description' => 'Less than container load consolidation for smaller export shipments.'],
            ['name' => 'Air Freight', 'method_type' => 'air', 'description' => 'Airport-to-airport or door-to-door air freight.'],
            ['name' => 'Courier Express', 'method_type' => 'courier', 'description' => 'Express courier for documents, samples, and small parcels.'],
            ['name' => 'Multimodal Freight', 'method_type' => 'multimodal', 'description' => 'Combined freight movement using multiple transport modes.'],
        ];

        foreach ($methods as $method) {
            $slug = Str::slug($method['name']);
            $existing = DB::table('shipment_methods')->where('slug', $slug)->first();
            $payload = [
                ...$method,
                'slug' => $slug,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('shipment_methods')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('shipment_methods')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
