<?php

namespace Database\Seeders;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            [
                'user' => [
                    'name' => 'Lanka Tea Exports',
                    'email' => 'tea@ecomlanka.lk',
                    'company_name' => 'Lanka Tea Exports (Pvt) Ltd.',
                ],
                'supplier' => [
                    'company_name' => 'Lanka Tea Exports (Pvt) Ltd.',
                    'slug' => 'lanka-tea-exports',
                    'logo' => 'https://placehold.co/240x240/e8f5e9/155e2c?text=LTE',
                    'cover_image' => 'https://placehold.co/1200x320/155e2c/ffffff?text=Lanka+Tea+Exports',
                    'description' => 'Exporter of premium Ceylon black tea, green tea, and private-label tea products.',
                    'city' => 'Colombo',
                    'address' => 'No. 24, Export Processing Zone, Colombo 14, Sri Lanka',
                    'phone' => '+94 11 234 5678',
                    'email' => 'sales@lankatea-exports.lk',
                    'website' => 'https://lankatea-exports.lk',
                    'business_type' => 'Manufacturer / Exporter',
                    'is_featured' => true,
                    'rating' => 4.90,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ceylon Spice Gardens',
                    'email' => 'spices@ecomlanka.lk',
                    'company_name' => 'Ceylon Spice Gardens',
                ],
                'supplier' => [
                    'company_name' => 'Ceylon Spice Gardens',
                    'slug' => 'ceylon-spice-gardens',
                    'logo' => 'https://placehold.co/240x240/fbe9e7/bf360c?text=CSG',
                    'cover_image' => 'https://placehold.co/1200x320/7c2d12/ffffff?text=Ceylon+Spice+Gardens',
                    'description' => 'Verified exporter of true Ceylon cinnamon and value-added spice products.',
                    'city' => 'Galle',
                    'address' => 'Export Road, Galle, Sri Lanka',
                    'phone' => '+94 91 222 3344',
                    'email' => 'exports@ceylonspicegardens.lk',
                    'website' => 'https://ceylonspicegardens.lk',
                    'business_type' => 'Grower / Exporter',
                    'is_featured' => true,
                    'rating' => 4.80,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ceylon Gems and Jewels',
                    'email' => 'gems@ecomlanka.lk',
                    'company_name' => 'Ceylon Gems & Jewels Co.',
                ],
                'supplier' => [
                    'company_name' => 'Ceylon Gems & Jewels Co.',
                    'slug' => 'ceylon-gems-jewels',
                    'logo' => 'https://placehold.co/240x240/e8eaf6/1a237e?text=CGJ',
                    'cover_image' => 'https://placehold.co/1200x320/1e3a8a/ffffff?text=Ceylon+Gems',
                    'description' => 'Sri Lankan supplier of responsibly sourced and certified natural gemstones.',
                    'city' => 'Ratnapura',
                    'address' => 'Gem Street, Ratnapura, Sri Lanka',
                    'phone' => '+94 45 223 3445',
                    'email' => 'sales@ceylongems.lk',
                    'website' => 'https://ceylongems.lk',
                    'business_type' => 'Miner / Exporter',
                    'is_featured' => true,
                    'rating' => 4.95,
                ],
            ],
            [
                'user' => [
                    'name' => 'Coco Lanka Naturals',
                    'email' => 'coconut@ecomlanka.lk',
                    'company_name' => 'Coco Lanka Naturals',
                ],
                'supplier' => [
                    'company_name' => 'Coco Lanka Naturals',
                    'slug' => 'coco-lanka-naturals',
                    'logo' => 'https://placehold.co/240x240/fff9c4/f57f17?text=CLN',
                    'cover_image' => 'https://placehold.co/1200x320/854d0e/ffffff?text=Coco+Lanka+Naturals',
                    'description' => 'Producer and exporter of virgin coconut oil and natural wellness oils.',
                    'city' => 'Kurunegala',
                    'address' => 'Coconut Estate Road, Kurunegala, Sri Lanka',
                    'phone' => '+94 37 223 4455',
                    'email' => 'exports@cocolanka.lk',
                    'website' => 'https://cocolanka.lk',
                    'business_type' => 'Manufacturer / Exporter',
                    'is_featured' => false,
                    'rating' => 4.70,
                ],
            ],
            [
                'user' => [
                    'name' => 'Lanka Craft and Rubber',
                    'email' => 'crafts@ecomlanka.lk',
                    'company_name' => 'Lanka Craft & Rubber Industries',
                ],
                'supplier' => [
                    'company_name' => 'Lanka Craft & Rubber Industries',
                    'slug' => 'lanka-craft-rubber',
                    'logo' => 'https://placehold.co/240x240/f3e5f5/4a148c?text=LCR',
                    'cover_image' => 'https://placehold.co/1200x320/581c87/ffffff?text=Lanka+Craft+and+Rubber',
                    'description' => 'Sri Lankan manufacturer of handmade batik textiles and natural rubber products.',
                    'city' => 'Colombo',
                    'address' => 'Industrial Estate, Colombo, Sri Lanka',
                    'phone' => '+94 11 277 8899',
                    'email' => 'trade@lankacraftrubber.lk',
                    'website' => 'https://lankacraftrubber.lk',
                    'business_type' => 'Manufacturer',
                    'is_featured' => false,
                    'rating' => 4.60,
                ],
            ],
        ];

        foreach ($suppliers as $attributes) {
            $user = User::updateOrCreate(
                ['email' => $attributes['user']['email']],
                [
                    ...$attributes['user'],
                    'password' => 'Password123!',
                    'role' => 'supplier',
                    'country' => 'Sri Lanka',
                    'status' => 'active',
                ],
            );

            Supplier::updateOrCreate(
                ['slug' => $attributes['supplier']['slug']],
                [
                    ...$attributes['supplier'],
                    'user_id' => $user->id,
                    'country' => 'Sri Lanka',
                    'verification_status' => 'verified',
                    'status' => 'active',
                ],
            );
        }
    }
}
