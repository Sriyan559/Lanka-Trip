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
                'image' => 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80',
                'link' => '/products',
                'sort_order' => 10,
            ],
            [
                'title' => 'Verified Suppliers from Sri Lanka',
                'subtitle' => 'Discover trusted manufacturers and exporters ready for global trade.',
                'image' => 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
                'link' => '/suppliers',
                'sort_order' => 20,
            ],
            [
                'title' => 'Post RFQs and Compare Quotations',
                'subtitle' => 'Send buying requirements and receive supplier quotations in one place.',
                'image' => 'https://placehold.co/1600x600/e0f2fe/075985?text=Post+RFQs+and+Compare+Quotations',
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
