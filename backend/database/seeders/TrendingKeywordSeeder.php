<?php

namespace Database\Seeders;

use App\Models\TrendingKeyword;
use Illuminate\Database\Seeder;

class TrendingKeywordSeeder extends Seeder
{
    public function run(): void
    {
        $keywords = [
            'Ceylon Tea',
            'Blue Sapphire',
            'Cinnamon',
            'Coconut Oil',
            'Batik Fabric',
            'Rubber Gloves',
            'Ayurvedic Oil',
            'Gem Stones',
            'Apparel Fabric',
            'Mixed Spices',
            'Handmade Gifts',
            'Export Software',
            'Filling Machine',
        ];

        foreach ($keywords as $index => $keyword) {
            TrendingKeyword::updateOrCreate(
                ['keyword' => $keyword],
                [
                    'sort_order' => ($index + 1) * 10,
                    'status' => 'active',
                ],
            );
        }
    }
}
