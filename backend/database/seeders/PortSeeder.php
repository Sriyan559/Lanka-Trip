<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PortSeeder extends Seeder
{
    public function run(): void
    {
        $countryIds = DB::table('countries')->pluck('id', 'iso2');
        $ports = [
            ['country' => 'LK', 'code' => 'LKCMB', 'name' => 'Port of Colombo', 'city' => 'Colombo', 'port_type' => 'sea'],
            ['country' => 'LK', 'code' => 'LKHBA', 'name' => 'Hambantota International Port', 'city' => 'Hambantota', 'port_type' => 'sea'],
            ['country' => 'LK', 'code' => 'LKCMB-AIR', 'name' => 'Bandaranaike International Airport', 'city' => 'Katunayake', 'port_type' => 'air'],
            ['country' => 'IN', 'code' => 'INMAA', 'name' => 'Chennai Port', 'city' => 'Chennai', 'port_type' => 'sea'],
            ['country' => 'SG', 'code' => 'SGSIN', 'name' => 'Port of Singapore', 'city' => 'Singapore', 'port_type' => 'sea'],
            ['country' => 'AE', 'code' => 'AEJEA', 'name' => 'Jebel Ali Port', 'city' => 'Dubai', 'port_type' => 'sea'],
        ];

        foreach ($ports as $port) {
            $code = $port['code'];
            $existing = DB::table('ports')->where('code', $code)->first();
            $payload = [
                'country_id' => $countryIds[$port['country']] ?? null,
                'code' => $code,
                'name' => $port['name'],
                'city' => $port['city'],
                'port_type' => $port['port_type'],
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('ports')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('ports')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
