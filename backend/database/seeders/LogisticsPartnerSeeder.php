<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LogisticsPartnerSeeder extends Seeder
{
    public function run(): void
    {
        $countryIds = DB::table('countries')->pluck('id', 'iso2');
        $currencyIds = DB::table('currencies')->pluck('id', 'code');
        $shipmentMethods = DB::table('shipment_methods')->pluck('id', 'slug');

        $partners = [
            [
                'name' => 'Ceylon Global Logistics',
                'partner_type' => 'freight_forwarder',
                'email' => 'operations@ceylongloballogistics.lk',
                'phone' => '+94 11 240 1000',
                'country' => 'LK',
                'currency' => 'LKR',
                'services' => ['ocean-freight-fcl', 'ocean-freight-lcl', 'air-freight'],
            ],
            [
                'name' => 'Lanka Express Cargo',
                'partner_type' => 'courier',
                'email' => 'exports@lankaexpresscargo.lk',
                'phone' => '+94 11 250 2000',
                'country' => 'LK',
                'currency' => 'LKR',
                'services' => ['courier-express', 'air-freight'],
            ],
        ];

        foreach ($partners as $partner) {
            $slug = Str::slug($partner['name']);
            $existing = DB::table('logistics_partners')->where('slug', $slug)->first();
            $payload = [
                'country_id' => $countryIds[$partner['country']] ?? null,
                'currency_id' => $currencyIds[$partner['currency']] ?? null,
                'name' => $partner['name'],
                'slug' => $slug,
                'partner_type' => $partner['partner_type'],
                'email' => $partner['email'],
                'phone' => $partner['phone'],
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('logistics_partners')->where('id', $existing->id)->update($payload);
                $partnerId = $existing->id;
            } else {
                $partnerId = DB::table('logistics_partners')->insertGetId([
                    ...$payload,
                    'uuid' => (string) Str::uuid(),
                    'created_at' => now(),
                ]);
            }

            foreach ($partner['services'] as $serviceSlug) {
                $methodId = $shipmentMethods[$serviceSlug] ?? null;

                if (! $methodId) {
                    continue;
                }

                DB::table('logistics_partner_services')->updateOrInsert(
                    [
                        'logistics_partner_id' => $partnerId,
                        'shipment_method_id' => $methodId,
                        'service_name' => Str::headline($serviceSlug),
                    ],
                    [
                        'uuid' => (string) Str::uuid(),
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                );
            }
        }
    }
}
