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
                'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 10,
            ],
            [
                'name' => 'Cinnamon',
                'slug' => 'cinnamon',
                'description' => 'True Ceylon cinnamon and value-added cinnamon products for export.',
                'image' => 'https://images.unsplash.com/photo-1606914469633-bd39206ea739?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 20,
            ],
            [
                'name' => 'Coconut Oil',
                'slug' => 'coconut-oil',
                'description' => 'Virgin, organic, and refined coconut oils produced in Sri Lanka.',
                'image' => 'https://images.unsplash.com/photo-1581375383689-4f8f974d6b82?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 30,
            ],
            [
                'name' => 'Batik Fabric',
                'slug' => 'batik-fabric',
                'description' => 'Traditional and contemporary Sri Lankan batik textiles.',
                'image' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 40,
            ],
            [
                'name' => 'Rubber Gloves',
                'slug' => 'rubber-gloves',
                'description' => 'Industrial, household, and medical rubber gloves manufactured for export.',
                'image' => 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 50,
            ],
            [
                'name' => 'Ayurvedic Oil',
                'slug' => 'ayurvedic-oil',
                'description' => 'Herbal wellness and traditional Ayurvedic oils made in Sri Lanka.',
                'image' => 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 60,
            ],
            [
                'name' => 'Gem Stones',
                'slug' => 'gem-stones',
                'description' => 'Natural coloured gemstones responsibly sourced from Sri Lanka.',
                'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 70,
            ],
            [
                'name' => 'Apparel & Textiles',
                'slug' => 'apparel-textiles',
                'description' => 'Sri Lankan apparel, fabric rolls, and textile manufacturing services.',
                'image' => 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 80,
            ],
            [
                'name' => 'Spices & Condiments',
                'slug' => 'spices-condiments',
                'description' => 'Export-ready spice blends, pepper, cloves, cardamom, and condiments.',
                'image' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 90,
            ],
            [
                'name' => 'Handicrafts & Gifts',
                'slug' => 'handicrafts-gifts',
                'description' => 'Handmade crafts, decorative items, corporate gifts, and artisan products.',
                'image' => 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 100,
            ],
            [
                'name' => 'Electronics & IT',
                'slug' => 'electronics-it',
                'description' => 'Electronics assembly, IT services, software, and digital export solutions.',
                'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 110,
            ],
            [
                'name' => 'Industrial Machinery',
                'slug' => 'industrial-machinery',
                'description' => 'Processing, packing, workshop, and light industrial machinery for trade buyers.',
                'image' => 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 120,
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
                'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
                'parent_id' => $gemStones->id,
                'sort_order' => 10,
                'status' => 'active',
            ],
        );
    }
}
