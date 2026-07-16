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
                    'logo' => 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
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
                    'logo' => 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
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
                    'logo' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
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
                    'logo' => 'https://images.unsplash.com/photo-1625128621059-e6859d5434a4?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
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
                    'logo' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
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
            [
                'user' => [
                    'name' => 'Elysian Hair Studio',
                    'email' => 'elysian@ecomlanka.lk',
                    'company_name' => 'Elysian Hair & Color Studio',
                ],
                'supplier' => [
                    'company_name' => 'Elysian Hair & Color Studio',
                    'slug' => 'elysian-hair-color-studio',
                    'logo' => 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1605497746444-05dac3e5b4a0?auto=format&fit=crop&w=1200&q=80',
                    'description' => 'Specialising in modern balayage, botanical conditioning, custom cuts, and vibrant fashion shades.',
                    'city' => 'Colombo',
                    'address' => 'Colombo 07, Sri Lanka',
                    'phone' => '+94 11 999 1111',
                    'email' => 'contact@elysianhair.lk',
                    'website' => 'https://elysianhair.lk',
                    'business_type' => 'Salon / Service Provider',
                    'is_featured' => true,
                    'rating' => 4.90,
                ],
            ],
            [
                'user' => [
                    'name' => 'Aura Aesthetic Clinic',
                    'email' => 'aura@ecomlanka.lk',
                    'company_name' => 'Aura Advanced Aesthetic Clinic',
                ],
                'supplier' => [
                    'company_name' => 'Aura Advanced Aesthetic Clinic',
                    'slug' => 'aura-advanced-aesthetic-clinic',
                    'logo' => 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
                    'description' => 'Laser treatments, dermabrasion, anti-aging therapies, and custom medical-grade facials.',
                    'city' => 'Kandy',
                    'address' => 'Kandy Central, Sri Lanka',
                    'phone' => '+94 81 222 3333',
                    'email' => 'info@auraclinic.lk',
                    'website' => 'https://auraclinic.lk',
                    'business_type' => 'Clinic / Skincare Partner',
                    'is_featured' => true,
                    'rating' => 4.80,
                ],
            ],
            [
                'user' => [
                    'name' => 'Glamour Bridal Lounge',
                    'email' => 'glamour@ecomlanka.lk',
                    'company_name' => 'Glamour Bridal & Nail Lounge',
                ],
                'supplier' => [
                    'company_name' => 'Glamour Bridal & Nail Lounge',
                    'slug' => 'glamour-bridal-nail-lounge',
                    'logo' => 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=1200&q=80',
                    'description' => 'Stunning wedding makeup styling, airbrush foundation, premium gel extensions, and nail art.',
                    'city' => 'Colombo',
                    'address' => 'Negombo Road, Sri Lanka',
                    'phone' => '+94 11 444 5555',
                    'email' => 'hello@glamourlounge.lk',
                    'website' => 'https://glamourlounge.lk',
                    'business_type' => 'Bridal & Nail Studio',
                    'is_featured' => true,
                    'rating' => 5.00,
                ],
            ],
            [
                'user' => [
                    'name' => 'Lumina Cosmetics Academy',
                    'email' => 'lumina@ecomlanka.lk',
                    'company_name' => 'Lumina Academy of Cosmetics',
                ],
                'supplier' => [
                    'company_name' => 'Lumina Academy of Cosmetics',
                    'slug' => 'lumina-academy-cosmetics',
                    'logo' => 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
                    'description' => 'Comprehensive training in color theory, face sculpting, HD bridal makeups, and airbrushing.',
                    'city' => 'Colombo',
                    'address' => 'Colombo 03, Sri Lanka',
                    'phone' => '+94 11 333 4444',
                    'email' => 'study@luminacademy.lk',
                    'website' => 'https://luminacademy.lk',
                    'business_type' => 'Training Academy',
                    'is_featured' => true,
                    'rating' => 4.90,
                ],
            ],
            [
                'user' => [
                    'name' => 'Vogue Hair Institute',
                    'email' => 'vogue@ecomlanka.lk',
                    'company_name' => 'Vogue Hair Institute',
                ],
                'supplier' => [
                    'company_name' => 'Vogue Hair Institute',
                    'slug' => 'vogue-hair-institute',
                    'logo' => 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=80',
                    'description' => 'Master precision scissor cuts, blow-dry chemistry, salon styling, and modern color techniques.',
                    'city' => 'Colombo',
                    'address' => 'Colombo, Sri Lanka',
                    'phone' => '+94 11 555 6666',
                    'email' => 'admissions@voguehair.lk',
                    'website' => 'https://voguehair.lk',
                    'business_type' => 'Hair Academy',
                    'is_featured' => true,
                    'rating' => 4.80,
                ],
            ],
            [
                'user' => [
                    'name' => 'Dermal Science Association',
                    'email' => 'dermal@ecomlanka.lk',
                    'company_name' => 'Dermal Science Association',
                ],
                'supplier' => [
                    'company_name' => 'Dermal Science Association',
                    'slug' => 'dermal-science-association',
                    'logo' => 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=240&q=80',
                    'cover_image' => 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
                    'description' => 'Understand skin structures, custom serum blending, laser safety, and modern facial device protocols.',
                    'city' => 'Colombo',
                    'address' => 'Colombo, Sri Lanka',
                    'phone' => '+94 11 777 8888',
                    'email' => 'contact@dermalscience.lk',
                    'website' => 'https://dermalscience.lk',
                    'business_type' => 'Aesthetic Education',
                    'is_featured' => true,
                    'rating' => 5.00,
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
