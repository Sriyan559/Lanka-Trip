<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DemoMarketplaceSeeder extends Seeder
{
    private const DEMO_PASSWORD = 'DemoPassword123!';

    public function run(): void
    {
        $this->seedDemoUsers();
        $this->assignRoles();
        $this->seedDemoSupplier();
        $this->seedBuyerProfiles();
        $this->seedCompanyProfiles();
        $this->seedSupplierShowcaseData();
        $this->seedMaldivesProducts();
        $this->seedCommercialWorkflow();
        $this->seedWishlistAndCart();
    }

    private function seedDemoUsers(): void
    {
        $users = [
            [
                'name' => 'Aisha Rasheed',
                'email' => 'buyer.maldives@madeinsl.demo',
                'role' => 'buyer',
                'phone' => '+960 777 1044',
                'company_name' => 'Atoll Resorts Procurement Pvt Ltd',
                'country' => 'Maldives',
            ],
            [
                'name' => 'Nimal Perera',
                'email' => 'supplier.demo@madeinsl.demo',
                'role' => 'supplier',
                'phone' => '+94 77 410 2200',
                'company_name' => 'Serendib Resort Supplies (Pvt) Ltd',
                'country' => 'Sri Lanka',
            ],
            [
                'name' => 'Demo Admin',
                'email' => 'admin.demo@madeinsl.demo',
                'role' => 'admin',
                'phone' => '+94 11 410 0001',
                'company_name' => 'Made in Sri Lanka Marketplace',
                'country' => 'Sri Lanka',
            ],
        ];

        foreach ($users as $user) {
            $model = User::updateOrCreate(
                ['email' => $user['email']],
                [
                    ...$user,
                    'password' => self::DEMO_PASSWORD,
                    'status' => 'active',
                ],
            );

            DB::table('users')->where('id', $model->id)->update([
                'uuid' => DB::table('users')->where('id', $model->id)->value('uuid') ?: (string) Str::uuid(),
                'account_status' => 'active',
                'security_status' => 'clear',
                'mfa_enabled' => false,
                'risk_score' => 8.00,
                'updated_at' => now(),
            ]);
        }
    }

    private function assignRoles(): void
    {
        $roles = DB::table('roles')->pluck('id', 'name');
        $users = DB::table('users')->select(['id', 'role'])->get();

        foreach ($users as $user) {
            $roleId = $roles[$user->role] ?? null;

            if (! $roleId) {
                continue;
            }

            DB::table('role_user')->updateOrInsert(
                ['role_id' => $roleId, 'user_id' => $user->id],
                [
                    'assigned_at' => now(),
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }

    private function seedDemoSupplier(): void
    {
        $user = User::where('email', 'supplier.demo@madeinsl.demo')->firstOrFail();

        Supplier::updateOrCreate(
            ['slug' => 'serendib-resort-supplies'],
            [
                'user_id' => $user->id,
                'company_name' => 'Serendib Resort Supplies (Pvt) Ltd',
                'logo' => 'https://placehold.co/240x240/e8f5e9/155e2c?text=SRS',
                'cover_image' => 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=80',
                'description' => 'Verified Sri Lankan exporter supplying Maldives resorts with Ceylon tea, coconut wellness products, cinnamon, handmade amenities, and eco packaging.',
                'country' => 'Sri Lanka',
                'city' => 'Colombo',
                'address' => 'Export Facilitation Centre, Colombo 03, Sri Lanka',
                'phone' => '+94 77 410 2200',
                'email' => 'exports@serendibresortsupplies.lk',
                'website' => 'https://serendibresortsupplies.lk',
                'business_type' => 'Manufacturer / Exporter / Resort Supplier',
                'established_year' => 2016,
                'employee_count' => 85,
                'factory_size' => '32,000 sq ft',
                'annual_revenue' => 1850000,
                'export_percentage' => 92,
                'main_markets' => ['Maldives', 'United Arab Emirates', 'Seychelles', 'Singapore'],
                'verification_status' => 'verified',
                'is_featured' => true,
                'rating' => 4.90,
                'reviews_count' => 38,
                'status' => 'active',
            ],
        );

        DB::table('suppliers')
            ->where('slug', 'serendib-resort-supplies')
            ->update([
                'storefront_slug' => 'serendib-resort-supplies',
                'storefront_status' => 'published',
                'trust_score' => 91.50,
                'trust_level' => 'verified',
                'profile_completion_score' => 96.00,
                'response_rate' => 94.00,
                'average_response_time_hours' => 6.50,
                'review_count' => 38,
                'average_rating' => 4.90,
                'compliance_status' => 'approved',
                'risk_score' => 6.00,
                'verified_at' => now()->subMonths(8),
                'metadata' => json_encode(['demo_focus' => 'Maldives resort procurement']),
                'updated_at' => now(),
            ]);
    }

    private function seedBuyerProfiles(): void
    {
        $countryId = DB::table('countries')->where('iso2', 'MV')->value('id')
            ?: DB::table('countries')->where('iso2', 'LK')->value('id');
        $currencyId = DB::table('currencies')->where('code', 'USD')->value('id');
        $languageId = DB::table('languages')->where('code', 'en')->value('id');
        $buyers = [
            [
                'email' => 'buyer.maldives@madeinsl.demo',
                'company_name' => 'Atoll Resorts Procurement Pvt Ltd',
                'job_title' => 'Group Procurement Manager',
                'phone' => '+960 777 1044',
                'website' => 'https://atollresorts.example',
                'address' => 'Majeedhee Magu, Male',
                'city' => 'Male',
                'state' => 'Kaafu Atoll',
                'postal_code' => '20026',
                'sourcing_interests' => ['Ceylon tea', 'coconut amenities', 'cinnamon', 'eco packaging', 'resort textiles'],
            ],
            [
                'email' => 'buyer@ecomlanka.lk',
                'company_name' => 'Global Sourcing Ltd.',
                'job_title' => 'Sourcing Lead',
                'phone' => '+94 77 200 0002',
                'website' => 'https://globalsourcing.example',
                'address' => 'World Trade Center, Colombo',
                'city' => 'Colombo',
                'state' => 'Western Province',
                'postal_code' => '00100',
                'sourcing_interests' => ['Tea', 'spices', 'rubber', 'textiles'],
            ],
        ];

        foreach ($buyers as $buyer) {
            $userId = DB::table('users')->where('email', $buyer['email'])->value('id');

            if (! $userId) {
                continue;
            }

            DB::table('buyer_profiles')->updateOrInsert(
                ['user_id' => $userId],
                [
                    'uuid' => DB::table('buyer_profiles')->where('user_id', $userId)->value('uuid') ?: (string) Str::uuid(),
                    'country_id' => $countryId,
                    'preferred_currency_id' => $currencyId,
                    'preferred_language_id' => $languageId,
                    'company_name' => $buyer['company_name'],
                    'job_title' => $buyer['job_title'],
                    'phone' => $buyer['phone'],
                    'website' => $buyer['website'],
                    'address' => $buyer['address'],
                    'city' => $buyer['city'],
                    'state' => $buyer['state'],
                    'postal_code' => $buyer['postal_code'],
                    'sourcing_interests' => json_encode($buyer['sourcing_interests']),
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }

    private function seedCompanyProfiles(): void
    {
        $countryId = DB::table('countries')->where('iso2', 'LK')->value('id');
        $currencyId = DB::table('currencies')->where('code', 'USD')->value('id');
        $languageId = DB::table('languages')->where('code', 'en')->value('id');

        Supplier::query()->each(function (Supplier $supplier) use ($countryId, $currencyId, $languageId): void {
            DB::table('company_profiles')->updateOrInsert(
                ['supplier_id' => $supplier->id],
                [
                    'uuid' => DB::table('company_profiles')->where('supplier_id', $supplier->id)->value('uuid') ?: (string) Str::uuid(),
                    'owner_user_id' => $supplier->user_id,
                    'country_id' => $countryId,
                    'currency_id' => $currencyId,
                    'language_id' => $languageId,
                    'legal_name' => $supplier->company_name,
                    'trading_name' => $supplier->company_name,
                    'slug' => $supplier->slug,
                    'registration_number' => 'DEMO-'.$supplier->id.'-LK',
                    'tax_identifier' => 'TIN-DEMO-'.$supplier->id,
                    'business_type' => $supplier->business_type,
                    'industry' => 'Export Manufacturing',
                    'website' => $supplier->website,
                    'email' => $supplier->email,
                    'phone' => $supplier->phone,
                    'address_line_1' => $supplier->address,
                    'city' => $supplier->city,
                    'state' => 'Sri Lanka',
                    'postal_code' => '00100',
                    'established_year' => $supplier->established_year ?: 2014,
                    'employee_count' => $supplier->employee_count ?: 60,
                    'status' => 'active',
                    'verification_status' => 'verified',
                    'compliance_status' => 'approved',
                    'risk_score' => 5.00,
                    'verified_at' => now()->subMonths(9),
                    'metadata' => json_encode(['demo_profile' => true]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        });
    }

    private function seedSupplierShowcaseData(): void
    {
        $supplier = Supplier::where('slug', 'serendib-resort-supplies')->firstOrFail();

        foreach (['ISO 22000 Food Safety', 'HACCP Export Handling', 'Sri Lanka Export Development Board Registered'] as $index => $name) {
            DB::table('supplier_certificates')->updateOrInsert(
                ['supplier_id' => $supplier->id, 'certificate_name' => $name],
                [
                    'certificate_number' => 'SRS-CERT-'.($index + 1),
                    'issuing_authority' => $index === 2 ? 'Sri Lanka EDB' : 'Bureau Veritas',
                    'issue_date' => now()->subYears(2)->toDateString(),
                    'expiry_date' => now()->addYears(2)->toDateString(),
                    'file_url' => 'https://placehold.co/900x1200/f0fdf4/155e2c?text='.rawurlencode($name),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }

        foreach (['Maldives resort procurement specialist', 'FOB Colombo and air freight sampling', 'Private label packing available'] as $strength) {
            DB::table('supplier_strengths')->updateOrInsert(
                ['supplier_id' => $supplier->id, 'strength_name' => $strength],
                ['created_at' => now(), 'updated_at' => now()],
            );
        }

        DB::table('production_capacities')->updateOrInsert(
            ['supplier_id' => $supplier->id],
            [
                'monthly_output' => '120,000',
                'output_unit' => 'mixed resort amenity units',
                'production_lines' => 6,
                'lead_time' => '10-21 days depending on product mix',
                'factory_size' => '32,000 sq ft',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('supplier_videos')->updateOrInsert(
            ['supplier_id' => $supplier->id, 'title' => 'Resort export packing walkthrough'],
            [
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    private function seedMaldivesProducts(): void
    {
        $packagingCategoryId = DB::table('categories')->updateOrInsert(
            ['slug' => 'eco-packaging'],
            [
                'name' => 'Eco Packaging',
                'description' => 'Export-ready kraft, paper, and sustainable packaging for hospitality and retail buyers.',
                'image' => 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80',
                'parent_id' => null,
                'sort_order' => 130,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
        $packagingCategoryId = DB::table('categories')->where('slug', 'eco-packaging')->value('id');
        $supplierId = DB::table('suppliers')->where('slug', 'serendib-resort-supplies')->value('id');

        $products = [
            [
                'category_id' => DB::table('categories')->where('slug', 'ceylon-tea')->value('id'),
                'name' => 'Maldives Resort Ceylon Tea Amenity Pack',
                'slug' => 'maldives-resort-ceylon-tea-amenity-pack',
                'short_description' => 'Private-label Ceylon tea sachets for hotel rooms, villas, and guest welcome packs.',
                'description' => 'A resort-ready Ceylon tea amenity pack with black tea, green tea, and cinnamon tea sachets. Custom artwork, halal-friendly packing, and mixed carton shipping available for Maldives resorts.',
                'price' => 0.18,
                'moq' => 5000,
                'unit' => 'Sachet',
                'supply_ability' => '1,000,000 sachets per month',
                'lead_time' => '14-18 days',
                'port' => 'FOB Colombo / Air freight to Male',
                'packaging_details' => 'Individually wrapped sachets, 500 sachets per inner carton, custom resort label optional.',
                'featured_image' => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'category_id' => DB::table('categories')->where('slug', 'coconut-oil')->value('id'),
                'name' => 'Coconut Spa Amenity Oil for Resorts',
                'slug' => 'coconut-spa-amenity-oil-resorts',
                'short_description' => 'Cold-pressed coconut oil in spa and guest-room amenity bottles.',
                'description' => 'Sri Lankan virgin coconut oil bottled for spa treatments, guest villas, and wellness welcome packs. Available in 30 ml, 50 ml, 100 ml, and bulk refill packs.',
                'price' => 1.45,
                'moq' => 1000,
                'unit' => 'Bottle',
                'supply_ability' => '80,000 bottles per month',
                'lead_time' => '21 days',
                'port' => 'FOB Colombo',
                'packaging_details' => 'Glass or PET bottles, shrink wrapped inner packs, export cartons with batch labels.',
                'featured_image' => 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'category_id' => $packagingCategoryId,
                'name' => 'Eco Kraft Tea and Spice Gift Boxes',
                'slug' => 'eco-kraft-tea-spice-gift-boxes',
                'short_description' => 'Sustainable kraft boxes for resort gift shops and welcome hampers.',
                'description' => 'Premium kraft packaging for tea, cinnamon, coconut products, and resort retail shelves. Custom sleeves, inserts, and low-MOQ resort branding are available.',
                'price' => 0.62,
                'moq' => 1000,
                'unit' => 'Box',
                'supply_ability' => '150,000 boxes per month',
                'lead_time' => '18-24 days',
                'port' => 'FOB Colombo',
                'packaging_details' => 'Flat-packed kraft boxes in moisture-protected export cartons.',
                'featured_image' => 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80',
            ],
        ];

        foreach ($products as $product) {
            $existing = Product::withTrashed()->where('slug', $product['slug'])->first();
            $record = Product::updateOrCreate(
                ['slug' => $product['slug']],
                [
                    ...$product,
                    'supplier_id' => $supplierId,
                    'status' => 'active',
                    'is_featured' => true,
                    'views_count' => 18500,
                    'average_rating' => 4.90,
                    'reviews_count' => 12,
                ],
            );

            if ($existing?->trashed()) {
                $record->restore();
            }

            DB::table('products')->where('id', $record->id)->update([
                'uuid' => DB::table('products')->where('id', $record->id)->value('uuid') ?: (string) Str::uuid(),
                'sku' => 'SRS-'.strtoupper(str_replace('-', '', substr($record->slug, 0, 8))).'-DEMO',
                'fob_price_min' => $product['price'],
                'fob_price_max' => round($product['price'] * 1.18, 2),
                'moq_unit' => $product['unit'],
                'lead_time_days' => 18,
                'approval_status' => 'approved',
                'published_at' => now()->subDays(12),
                'updated_at' => now(),
            ]);

            DB::table('product_images')->updateOrInsert(
                ['product_id' => $record->id, 'sort_order' => 0],
                ['image' => $product['featured_image'], 'created_at' => now(), 'updated_at' => now()],
            );
        }
    }

    private function seedCommercialWorkflow(): void
    {
        $buyer = User::where('email', 'buyer.maldives@madeinsl.demo')->firstOrFail();
        $buyerProfileId = DB::table('buyer_profiles')->where('user_id', $buyer->id)->value('id');
        $supplier = Supplier::where('slug', 'serendib-resort-supplies')->firstOrFail();
        $product = Product::where('slug', 'maldives-resort-ceylon-tea-amenity-pack')->firstOrFail();
        $categoryId = $product->category_id;
        $currencyId = DB::table('currencies')->where('code', 'USD')->value('id');
        $countryId = DB::table('countries')->where('iso2', 'MV')->value('id');

        DB::table('rfqs')->updateOrInsert(
            ['rfq_number' => 'RFQ-2026-MV-0001'],
            [
                'uuid' => DB::table('rfqs')->where('rfq_number', 'RFQ-2026-MV-0001')->value('uuid') ?: (string) Str::uuid(),
                'user_id' => $buyer->id,
                'buyer_profile_id' => $buyerProfileId,
                'category_id' => $categoryId,
                'title' => 'Ceylon tea amenity packs for Maldives resort group',
                'description' => 'Looking for private-label Ceylon tea sachets for 6 resort properties in Maldives. Need mixed tea options, humidity-safe packing, and FOB Colombo pricing.',
                'quantity' => 25000,
                'unit' => 'Sachet',
                'target_price' => 0.22,
                'currency_id' => $currencyId,
                'destination_country' => 'Maldives',
                'delivery_country_id' => $countryId,
                'delivery_port' => 'Male',
                'expected_delivery_date' => now()->addWeeks(6)->toDateString(),
                'required_date' => now()->addWeeks(6)->toDateString(),
                'expires_at' => now()->addWeeks(2),
                'visibility' => 'public',
                'priority' => 'high',
                'status' => 'open',
                'published_at' => now()->subDays(3),
                'created_at' => now()->subDays(3),
                'updated_at' => now(),
            ],
        );

        $rfqId = DB::table('rfqs')->where('rfq_number', 'RFQ-2026-MV-0001')->value('id');
        DB::table('rfq_items')->updateOrInsert(
            ['rfq_id' => $rfqId, 'product_name' => 'Private-label Ceylon tea sachets'],
            [
                'product_id' => $product->id,
                'quantity' => 25000,
                'unit' => 'Sachet',
                'specifications' => 'Black tea, green tea, cinnamon tea; resort logo printed wrapper; humidity-safe cartons.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('quotations')->updateOrInsert(
            ['quotation_number' => 'QT-2026-SRS-0001'],
            [
                'uuid' => DB::table('quotations')->where('quotation_number', 'QT-2026-SRS-0001')->value('uuid') ?: (string) Str::uuid(),
                'rfq_id' => $rfqId,
                'supplier_id' => $supplier->id,
                'buyer_profile_id' => $buyerProfileId,
                'currency_id' => $currencyId,
                'subtotal' => 4500,
                'tax_amount' => 0,
                'shipping_amount' => 350,
                'total_amount' => 4850,
                'currency' => 'USD',
                'lead_time' => '18 days',
                'lead_time_days' => 18,
                'payment_terms' => '30% advance, 70% before shipment',
                'shipping_terms' => 'FOB Colombo; air freight quote available to Male',
                'delivery_terms' => 'FOB Colombo',
                'validity_date' => now()->addDays(21)->toDateString(),
                'remarks' => 'Includes private-label artwork setup and humidity-safe resort cartons.',
                'status' => 'accepted',
                'submitted_at' => now()->subDays(2),
                'accepted_at' => now()->subDay(),
                'created_at' => now()->subDays(2),
                'updated_at' => now(),
            ],
        );

        $quotationId = DB::table('quotations')->where('quotation_number', 'QT-2026-SRS-0001')->value('id');
        $rfqItemId = DB::table('rfq_items')->where('rfq_id', $rfqId)->value('id');
        DB::table('quotation_items')->updateOrInsert(
            ['quotation_id' => $quotationId, 'product_name' => 'Private-label Ceylon tea sachets'],
            [
                'rfq_item_id' => $rfqItemId,
                'quantity' => 25000,
                'unit_price' => 0.18,
                'amount' => 4500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('orders')->updateOrInsert(
            ['order_number' => 'ORD-2026-MV-0001'],
            [
                'uuid' => DB::table('orders')->where('order_number', 'ORD-2026-MV-0001')->value('uuid') ?: (string) Str::uuid(),
                'buyer_id' => $buyer->id,
                'buyer_profile_id' => $buyerProfileId,
                'supplier_id' => $supplier->id,
                'quotation_id' => $quotationId,
                'rfq_id' => $rfqId,
                'currency_id' => $currencyId,
                'subtotal' => 4500,
                'tax_amount' => 0,
                'shipping_amount' => 350,
                'discount_amount' => 0,
                'total_amount' => 4850,
                'currency' => 'USD',
                'payment_terms' => '30% advance, 70% before shipment',
                'shipping_terms' => 'FOB Colombo',
                'payment_status' => 'partial',
                'fulfillment_status' => 'confirmed',
                'approval_status' => 'approved',
                'order_source' => 'quotation',
                'incoterm' => 'FOB',
                'delivery_terms' => 'FOB Colombo, onward freight to Male arranged separately',
                'expected_delivery_date' => now()->addWeeks(5)->toDateString(),
                'confirmed_at' => now()->subDay(),
                'status' => 'confirmed',
                'created_at' => now()->subDay(),
                'updated_at' => now(),
            ],
        );

        $orderId = DB::table('orders')->where('order_number', 'ORD-2026-MV-0001')->value('id');
        $quotationItemId = DB::table('quotation_items')->where('quotation_id', $quotationId)->value('id');
        DB::table('order_items')->updateOrInsert(
            ['order_id' => $orderId, 'product_name' => 'Private-label Ceylon tea sachets'],
            [
                'uuid' => DB::table('order_items')->where('order_id', $orderId)->where('product_name', 'Private-label Ceylon tea sachets')->value('uuid') ?: (string) Str::uuid(),
                'product_id' => $product->id,
                'quotation_item_id' => $quotationItemId,
                'sku' => DB::table('products')->where('id', $product->id)->value('sku'),
                'quantity' => 25000,
                'unit' => 'Sachet',
                'unit_price' => 0.18,
                'tax_amount' => 0,
                'discount_amount' => 0,
                'amount' => 4500,
                'total_amount' => 4500,
                'specifications' => json_encode(['wrapper' => 'private label', 'destination' => 'Maldives']),
                'metadata' => json_encode(['demo_order' => true]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        $this->seedConversation($buyer, $supplier, $rfqId, $quotationId);
    }

    private function seedConversation(User $buyer, Supplier $supplier, int $rfqId, int $quotationId): void
    {
        DB::table('conversations')->updateOrInsert(
            ['buyer_id' => $buyer->id, 'supplier_id' => $supplier->id, 'rfq_id' => $rfqId],
            [
                'uuid' => DB::table('conversations')->where('buyer_id', $buyer->id)->where('supplier_id', $supplier->id)->where('rfq_id', $rfqId)->value('uuid') ?: (string) Str::uuid(),
                'conversation_number' => 'CONV-2026-MV-0001',
                'conversation_type' => 'rfq',
                'related_type' => 'rfq',
                'related_id' => $rfqId,
                'buyer_profile_id' => DB::table('buyer_profiles')->where('user_id', $buyer->id)->value('id'),
                'quotation_id' => $quotationId,
                'last_message_at' => now()->subHours(2),
                'status' => 'active',
                'created_at' => now()->subDays(2),
                'updated_at' => now(),
            ],
        );

        $conversationId = DB::table('conversations')
            ->where('buyer_id', $buyer->id)
            ->where('supplier_id', $supplier->id)
            ->where('rfq_id', $rfqId)
            ->value('id');

        $messages = [
            [$buyer->id, $supplier->user_id, 'Hi Nimal, we are sourcing private-label Ceylon tea sachets for our Maldives resort rooms. Can you quote FOB Colombo?'],
            [$supplier->user_id, $buyer->id, 'Yes, we can supply mixed black, green, and cinnamon tea sachets with resort branding. I have submitted quotation QT-2026-SRS-0001.'],
            [$buyer->id, $supplier->user_id, 'Thanks. Please include humidity-safe cartons and option for air freight samples to Male.'],
        ];

        foreach ($messages as $index => [$senderId, $receiverId, $message]) {
            DB::table('messages')->updateOrInsert(
                ['conversation_id' => $conversationId, 'message' => $message],
                [
                    'uuid' => DB::table('messages')->where('conversation_id', $conversationId)->where('message', $message)->value('uuid') ?: (string) Str::uuid(),
                    'sender_id' => $senderId,
                    'receiver_id' => $receiverId,
                    'sender_type' => 'user',
                    'message_type' => 'text',
                    'body' => $message,
                    'metadata' => json_encode(['demo_message' => true]),
                    'is_read' => $index < 2,
                    'created_at' => now()->subHours(4 - $index),
                    'updated_at' => now(),
                ],
            );
        }

        $lastMessageId = DB::table('messages')
            ->where('conversation_id', $conversationId)
            ->orderByDesc('created_at')
            ->value('id');

        DB::table('conversations')->where('id', $conversationId)->update([
            'last_message_id' => $lastMessageId,
            'updated_at' => now(),
        ]);
    }

    private function seedWishlistAndCart(): void
    {
        $buyer = User::where('email', 'buyer.maldives@madeinsl.demo')->firstOrFail();
        $buyerProfileId = DB::table('buyer_profiles')->where('user_id', $buyer->id)->value('id');
        $productIds = Product::query()
            ->whereIn('slug', [
                'maldives-resort-ceylon-tea-amenity-pack',
                'coconut-spa-amenity-oil-resorts',
                'eco-kraft-tea-spice-gift-boxes',
            ])
            ->pluck('id');

        DB::table('wishlist_folders')->updateOrInsert(
            ['user_id' => $buyer->id, 'name' => 'Maldives resort demo shortlist'],
            [
                'uuid' => DB::table('wishlist_folders')->where('user_id', $buyer->id)->where('name', 'Maldives resort demo shortlist')->value('uuid') ?: (string) Str::uuid(),
                'buyer_profile_id' => $buyerProfileId,
                'slug' => 'maldives-resort-demo-shortlist',
                'description' => 'Products shortlisted for the Maldives client demo.',
                'sort_order' => 10,
                'status' => 'active',
                'metadata' => json_encode(['demo_folder' => true]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        $folderId = DB::table('wishlist_folders')->where('user_id', $buyer->id)->where('name', 'Maldives resort demo shortlist')->value('id');

        foreach ($productIds as $productId) {
            $supplierId = DB::table('products')->where('id', $productId)->value('supplier_id');
            DB::table('wishlists')->updateOrInsert(
                ['user_id' => $buyer->id, 'product_id' => $productId],
                [
                    'uuid' => DB::table('wishlists')->where('user_id', $buyer->id)->where('product_id', $productId)->value('uuid') ?: (string) Str::uuid(),
                    'buyer_profile_id' => $buyerProfileId,
                    'wishlist_folder_id' => $folderId,
                    'supplier_id' => $supplierId,
                    'notes' => 'Shortlisted for Maldives resort procurement demo.',
                    'priority' => 'high',
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );

            DB::table('wishlist_items')->updateOrInsert(
                ['user_id' => $buyer->id, 'product_id' => $productId],
                [
                    'uuid' => DB::table('wishlist_items')->where('user_id', $buyer->id)->where('product_id', $productId)->value('uuid') ?: (string) Str::uuid(),
                    'wishlist_folder_id' => $folderId,
                    'buyer_profile_id' => $buyerProfileId,
                    'supplier_id' => $supplierId,
                    'notes' => 'Shortlisted for demo.',
                    'priority' => 'high',
                    'status' => 'active',
                    'metadata' => json_encode(['demo_item' => true]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }
}
