<?php

namespace Database\Seeders;

use App\Models\FooterAppBadge;
use Illuminate\Database\Seeder;

class FooterAppBadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            [
                'platform' => 'google_play',
                'label' => 'Get it on Google Play',
                'image_path' => '/images/app-badges/google-play-badge.png',
                'image_alt' => 'Get the SL Beauty app on Google Play',
                'store_url' => env('GOOGLE_PLAY_APP_URL'),
                'enabled' => true,
                'sort_order' => 1,
            ],
            [
                'platform' => 'app_store',
                'label' => 'Download on the App Store',
                'image_path' => '/images/app-badges/app-store-badge.svg',
                'image_alt' => 'Download the SL Beauty app on the App Store',
                'store_url' => env('APP_STORE_APP_URL'),
                'enabled' => true,
                'sort_order' => 2,
            ],
        ];

        foreach ($badges as $badge) {
            FooterAppBadge::query()->updateOrCreate(
                ['platform' => $badge['platform']],
                $badge,
            );
        }
    }
}
