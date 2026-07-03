<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class IncotermSeeder extends Seeder
{
    public function run(): void
    {
        $incoterms = [
            ['code' => 'EXW', 'name' => 'Ex Works'],
            ['code' => 'FOB', 'name' => 'Free On Board'],
            ['code' => 'CFR', 'name' => 'Cost and Freight'],
            ['code' => 'CIF', 'name' => 'Cost, Insurance and Freight'],
            ['code' => 'DAP', 'name' => 'Delivered at Place'],
            ['code' => 'DDP', 'name' => 'Delivered Duty Paid'],
        ];

        foreach ($incoterms as $incoterm) {
            $existing = DB::table('incoterms')->where('code', $incoterm['code'])->first();
            $payload = [
                ...$incoterm,
                'description' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('incoterms')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('incoterms')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
