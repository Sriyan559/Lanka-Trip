<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TradeDocumentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Commercial Invoice', 'code' => 'commercial_invoice', 'is_required_for_export' => true],
            ['name' => 'Packing List', 'code' => 'packing_list', 'is_required_for_export' => true],
            ['name' => 'Certificate of Origin', 'code' => 'certificate_of_origin', 'is_required_for_export' => true],
            ['name' => 'Bill of Lading', 'code' => 'bill_of_lading', 'is_required_for_export' => true],
            ['name' => 'Air Waybill', 'code' => 'air_waybill', 'is_required_for_export' => false],
            ['name' => 'Export License', 'code' => 'export_license', 'is_required_for_export' => false],
            ['name' => 'Insurance Certificate', 'code' => 'insurance_certificate', 'is_required_for_export' => false],
            ['name' => 'Inspection Certificate', 'code' => 'inspection_certificate', 'is_required_for_export' => false],
        ];

        foreach ($types as $type) {
            $slug = Str::slug($type['name']);
            $existing = DB::table('trade_document_types')->where('slug', $slug)->first();
            $payload = [
                ...$type,
                'slug' => $slug,
                'description' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('trade_document_types')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('trade_document_types')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
