<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Source Authentic Sri Lankan Exports',
                'subtitle' => 'Connect with verified Ceylon tea, spices, gems, coconut, apparel, and rubber suppliers.',
                'image' => 'https://placehold.co/1440x480/155e2c/ffffff?text=Sri+Lankan+Exports',
                'link' => '/products',
                'sort_order' => 10,
            ],
            [
                'title' => 'Verified Suppliers from Sri Lanka',
                'subtitle' => 'Discover trusted manufacturers and exporters ready for global trade.',
                'image' => 'https://placehold.co/1440x480/1e3a8a/ffffff?text=Verified+Suppliers',
                'link' => '/suppliers',
                'sort_order' => 20,
            ],
            [
                'title' => 'Post RFQs and Compare Quotations',
                'subtitle' => 'Send buying requirements and receive supplier quotations in one place.',
                'image' => 'https://placehold.co/1440x480/854d0e/ffffff?text=RFQ+Marketplace',
                'link' => '/rfq',
                'sort_order' => 30,
            ],
        ];

        foreach ($banners as $attributes) {
            Banner::updateOrCreate(
                ['title' => $attributes['title']],
                [...$attributes, 'status' => 'active'],
            );
        }
    }
}
