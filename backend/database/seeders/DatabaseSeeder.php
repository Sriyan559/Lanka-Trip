<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            CountrySeeder::class,
            CurrencySeeder::class,
            LanguageSeeder::class,
            PaymentMethodSeeder::class,
            IncotermSeeder::class,
            PortSeeder::class,
            ShipmentMethodSeeder::class,
            TradeDocumentTypeSeeder::class,
            LogisticsPartnerSeeder::class,
            NotificationChannelSeeder::class,
            NotificationTemplateSeeder::class,
            SearchSynonymSeeder::class,
            DashboardWidgetSeeder::class,
            KpiDefinitionSeeder::class,
            ReportDefinitionSeeder::class,
            SettingGroupSeeder::class,
            SystemSettingSeeder::class,
            FeatureFlagSeeder::class,
            PlatformConfigurationSeeder::class,
            ContentPageSeeder::class,
            TranslationKeySeeder::class,
            TaxRuleSeeder::class,
            ComplianceRuleSeeder::class,
            DataRetentionPolicySeeder::class,
            RiskProfileSeeder::class,
            TrustScoreRuleSeeder::class,
            UserSeeder::class,
            UserRoleSeeder::class,
            CategorySeeder::class,
            AttributeGroupSeeder::class,
            CategoryAttributeSeeder::class,
            SupplierSeeder::class,
            UserRoleSeeder::class,
            ProductSeeder::class,
            DemoMarketplaceSeeder::class,
            UserRoleSeeder::class,
            SupplierStorefrontSeeder::class,
            ProductTagSeeder::class,
            ProductImageSeeder::class,
            BannerSeeder::class,
            TrendingKeywordSeeder::class,
        ]);
    }
}
