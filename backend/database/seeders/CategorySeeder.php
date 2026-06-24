<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Ceylon Tea',
                'slug' => 'ceylon-tea',
                'description' => 'World-renowned Sri Lankan tea sourced from the island’s leading growing regions.',
                'image' => 'https://placehold.co/640x480/e8f5e9/155e2c?text=Ceylon+Tea',
                'sort_order' => 10,
            ],
            [
                'name' => 'Cinnamon',
                'slug' => 'cinnamon',
                'description' => 'True Ceylon cinnamon and value-added cinnamon products for export.',
                'image' => 'https://placehold.co/640x480/fbe9e7/bf360c?text=Cinnamon',
                'sort_order' => 20,
            ],
            [
                'name' => 'Coconut Oil',
                'slug' => 'coconut-oil',
                'description' => 'Virgin, organic, and refined coconut oils produced in Sri Lanka.',
                'image' => 'https://placehold.co/640x480/fff9c4/f57f17?text=Coconut+Oil',
                'sort_order' => 30,
            ],
            [
                'name' => 'Batik Fabric',
                'slug' => 'batik-fabric',
                'description' => 'Traditional and contemporary Sri Lankan batik textiles.',
                'image' => 'https://placehold.co/640x480/fce4ec/880e4f?text=Batik+Fabric',
                'sort_order' => 40,
            ],
            [
                'name' => 'Rubber Gloves',
                'slug' => 'rubber-gloves',
                'description' => 'Industrial, household, and medical rubber gloves manufactured for export.',
                'image' => 'https://placehold.co/640x480/f3e5f5/4a148c?text=Rubber+Gloves',
                'sort_order' => 50,
            ],
            [
                'name' => 'Ayurvedic Oil',
                'slug' => 'ayurvedic-oil',
                'description' => 'Herbal wellness and traditional Ayurvedic oils made in Sri Lanka.',
                'image' => 'https://placehold.co/640x480/e8f5e9/2e7d32?text=Ayurvedic+Oil',
                'sort_order' => 60,
            ],
            [
                'name' => 'Gem Stones',
                'slug' => 'gem-stones',
                'description' => 'Natural coloured gemstones responsibly sourced from Sri Lanka.',
                'image' => 'https://placehold.co/640x480/e8eaf6/1a237e?text=Gem+Stones',
                'sort_order' => 70,
            ],
        ];

        foreach ($categories as $attributes) {
            Category::updateOrCreate(
                ['slug' => $attributes['slug']],
                [...$attributes, 'parent_id' => null, 'status' => 'active'],
            );
        }

        $gemStones = Category::where('slug', 'gem-stones')->firstOrFail();

        Category::updateOrCreate(
            ['slug' => 'blue-sapphire'],
            [
                'name' => 'Blue Sapphire',
                'description' => 'Natural Ceylon blue sapphires, including certified cut and polished stones.',
                'image' => 'https://placehold.co/640x480/e8eaf6/1a237e?text=Blue+Sapphire',
                'parent_id' => $gemStones->id,
                'sort_order' => 10,
                'status' => 'active',
            ],
        );
    }
}
