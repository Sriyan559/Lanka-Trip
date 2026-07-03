# Database Module Summary

This document summarizes the completed backend database modules for the Made in Sri Lanka B2B marketplace.

## PostgreSQL Setup

Migration files:

- Existing Laravel and project migrations run on PostgreSQL using `DB_CONNECTION=pgsql`.

Main tables added:

- Core Laravel tables: `users`, `cache`, `jobs`, `personal_access_tokens`.
- Initial marketplace tables: `categories`, `suppliers`, `products`, `rfqs`, `quotations`, `orders`, `messages`, `notifications`, `uploads`, reviews, and activity logs.

Seeders added:

- `UserSeeder`, `CategorySeeder`, `SupplierSeeder`, `ProductSeeder`, `BannerSeeder`, `TrendingKeywordSeeder`.

Purpose:

- Establish the PostgreSQL-backed Laravel database foundation and initial marketplace demo data.

## Enterprise Foundation

Migration files:

- `2026_06_24_030000_create_enterprise_foundation_tables.php`

Main tables added:

- `roles`, `permissions`, `role_user`, `permission_role`
- `countries`, `currencies`, `languages`
- `buyer_profiles`, `staff_profiles`, `company_profiles`

Seeders added:

- `RoleSeeder`, `PermissionSeeder`, `CountrySeeder`, `CurrencySeeder`, `LanguageSeeder`, `UserRoleSeeder`

Purpose:

- Add access control, localization lookup data, buyer/staff/company profile foundations, and reusable enterprise identity structures.

## Product Catalogue

Migration files:

- `2026_06_24_040000_add_b2b_catalogue_fields_to_products_table.php`
- `2026_06_24_041000_create_enterprise_product_catalogue_tables.php`

Main tables added:

- `product_videos`, `product_documents`, `product_variants`, `product_variant_options`
- `attribute_groups`, `product_attributes`, `category_attributes`, `product_attribute_values`
- `product_certifications`, `product_price_tiers`, `product_packaging_options`, `product_shipping_options`
- `product_tags`, `product_tag_mappings`, `product_related_products`
- `product_approval_histories`, `product_view_stats`

Seeders added:

- `AttributeGroupSeeder`, `CategoryAttributeSeeder`, `ProductTagSeeder`

Purpose:

- Support B2B catalogue fields, product variants, attributes, pricing tiers, packaging, shipping, certifications, tagging, approvals, and view analytics.

## RFQ And Quotation

Migration files:

- `2026_06_24_050000_add_b2b_fields_to_rfqs_and_quotations_tables.php`
- `2026_06_24_051000_create_enterprise_rfq_quotation_tables.php`

Main tables added:

- `rfq_attachments`, `rfq_invited_suppliers`, `rfq_supplier_matches`
- `quotation_attachments`, `quotation_negotiations`, `quotation_negotiation_messages`, `quotation_negotiation_attachments`
- `rfq_status_histories`, `quotation_status_histories`
- `rfq_view_logs`, `rfq_response_summaries`

Seeders added:

- No dedicated RFQ workflow seeders were required.

Purpose:

- Add enterprise RFQ matching, supplier invitation, attachments, negotiation, status history, and response summary support.

## Order, Payment, And Invoice

Migration files:

- `2026_06_24_060000_add_b2b_fields_to_orders_and_order_items_tables.php`
- `2026_06_24_061000_create_enterprise_order_payment_invoice_tables.php`

Main tables added:

- `invoices`, `invoice_items`
- `payment_methods`, `payments`, `payment_transactions`, `payment_refunds`
- `order_status_histories`, `order_documents`, `order_notes`, `order_approvals`
- `order_shipments`, `order_shipment_items`
- `order_disputes`, `order_dispute_messages`, `order_dispute_attachments`
- `order_audit_logs`

Seeders added:

- `PaymentMethodSeeder`

Purpose:

- Support enterprise order lifecycle, invoice generation, payment tracking, refunds, approvals, disputes, documents, and audit trails.

## Logistics, Shipment, And Trade Documents

Migration files:

- `2026_06_24_070000_create_enterprise_logistics_trade_tables.php`
- `2026_06_24_071000_add_logistics_fields_to_orders_table.php`

Main tables added:

- `logistics_partners`, `logistics_partner_services`, `shipment_methods`
- `shipments`, `shipment_items`, `shipment_tracking_events`, `shipment_documents`
- `trade_documents`, `trade_document_types`, `order_trade_documents`
- `customs_declarations`, `customs_declaration_items`
- `export_compliance_checks`, `export_compliance_check_items`
- `ports`, `incoterms`, `delivery_addresses`
- `shipment_status_histories`, `logistics_quotes`, `logistics_quote_items`

Seeders added:

- `ShipmentMethodSeeder`, `TradeDocumentTypeSeeder`, `IncotermSeeder`, `PortSeeder`, `LogisticsPartnerSeeder`

Purpose:

- Add shipment management, tracking, customs declarations, export compliance, logistics quotes, ports, incoterms, and trade document workflows.

## Messaging, Notification, And Audit

Migration files:

- `2026_06_24_080000_add_enterprise_fields_to_communication_tables.php`
- `2026_06_24_081000_create_enterprise_messaging_notification_audit_tables.php`

Main tables added:

- `conversation_participants`, `message_attachments`, `message_read_receipts`, `message_reactions`, `message_status_histories`
- `notification_templates`, `notification_channels`, `notification_preferences`, `notification_delivery_logs`, `push_device_tokens`
- `audit_logs`, `audit_log_changes`, `system_event_logs`, `user_activity_sessions`, `security_event_logs`
- `moderation_cases`, `moderation_case_messages`, `moderation_case_attachments`
- `communication_blocklists`, `communication_reports`

Seeders added:

- `NotificationChannelSeeder`, `NotificationTemplateSeeder`

Purpose:

- Support enterprise conversations, notifications, audit logging, security events, moderation, reports, read receipts, and delivery tracking.

## Search, Analytics, And Reporting

Migration files:

- `2026_06_24_090000_add_enterprise_fields_to_trending_keywords_table.php`
- `2026_06_24_091000_create_enterprise_search_analytics_reporting_tables.php`

Main tables added:

- `search_queries`, `search_result_clicks`, `search_filters_used`, `saved_searches`, `search_synonyms`, `search_index_logs`
- `marketplace_analytics_daily`, `supplier_analytics_daily`, `product_analytics_daily`, `category_analytics_daily`
- `buyer_analytics_daily`, `rfq_analytics_daily`, `order_analytics_daily`
- `conversion_funnels`, `conversion_funnel_events`
- `dashboard_widgets`, `dashboard_widget_settings`
- `report_definitions`, `report_runs`, `report_exports`
- `kpi_definitions`, `kpi_snapshots`
- `traffic_sources`, `page_view_events`, `user_behavior_events`

Seeders added:

- `SearchSynonymSeeder`, `DashboardWidgetSeeder`, `KpiDefinitionSeeder`, `ReportDefinitionSeeder`

Purpose:

- Add search telemetry, click tracking, analytics snapshots, KPI reporting, dashboard configuration, report exports, traffic sources, and behavior events.

## Localization, Settings, And Platform Configuration

Migration files:

- `2026_06_24_100000_add_enterprise_fields_to_localization_tables.php`
- `2026_06_24_101000_create_enterprise_localization_settings_tables.php`

Main tables added:

- `system_settings`, `setting_groups`, `feature_flags`, `feature_flag_rules`, `platform_configurations`
- `localized_strings`, `translation_keys`, `translation_values`
- `content_pages`, `content_page_translations`
- `menu_groups`, `menu_items`, `menu_item_translations`
- `email_templates`, `email_template_translations`
- `sms_templates`, `sms_template_translations`
- `terms_versions`, `privacy_policy_versions`, `consent_records`
- `country_regions`, `cities`, `currency_exchange_rates`, `tax_rules`, `platform_maintenance_windows`

Seeders added:

- `SettingGroupSeeder`, `SystemSettingSeeder`, `FeatureFlagSeeder`, `PlatformConfigurationSeeder`, `ContentPageSeeder`, `TranslationKeySeeder`, `TaxRuleSeeder`

Purpose:

- Add localized content, configurable platform settings, feature flags, CMS pages, menus, templates, policy versions, consents, regions, cities, tax rules, and exchange rates.

## Security, Verification, And Compliance

Migration files:

- `2026_06_24_110000_add_security_fields_to_users_suppliers_company_profiles.php`
- `2026_06_24_111000_create_enterprise_security_verification_compliance_tables.php`

Main tables added:

- `user_security_profiles`, `user_login_attempts`, `user_password_histories`
- `user_mfa_methods`, `user_mfa_recovery_codes`, `user_trusted_devices`
- `user_api_keys`, `user_access_grants`
- `role_assignment_histories`, `permission_assignment_histories`
- `verification_requests`, `verification_request_documents`
- `supplier_verification_checks`, `company_verification_checks`
- `kyc_profiles`, `kyc_documents`
- `compliance_rules`, `compliance_rule_checks`, `compliance_case_files`, `compliance_case_notes`
- `risk_profiles`, `risk_events`, `policy_acceptances`, `data_retention_policies`, `data_deletion_requests`

Seeders added:

- `ComplianceRuleSeeder`, `DataRetentionPolicySeeder`, `RiskProfileSeeder`

Purpose:

- Add account security, MFA, trusted devices, API keys, access grants, verification workflows, KYC, compliance cases, risk scoring, policy acceptance, and data lifecycle support.

## Wishlist, Review, Trust, And Supplier Storefront

Migration files:

- `2026_06_24_120000_create_enterprise_wishlist_review_trust_storefront_tables.php`
- `2026_06_24_121000_add_enterprise_fields_to_wishlist_review_supplier_tables.php`

Main tables added:

- `wishlist_folders`, `wishlist_items`
- `product_review_images`, `product_review_replies`, `product_review_votes`
- `supplier_review_replies`, `supplier_review_votes`, `review_moderation_logs`
- `trust_score_rules`, `trust_score_snapshots`
- `supplier_trust_scores`, `company_trust_scores`, `buyer_trust_scores`
- `supplier_storefronts`, `supplier_storefront_sections`, `supplier_storefront_section_items`
- `supplier_showcase_products`, `supplier_showcase_videos`, `supplier_company_highlights`
- `supplier_factory_tours`, `supplier_export_markets`, `supplier_quality_controls`
- `supplier_business_licenses`, `supplier_awards`, `buyer_engagement_events`

Seeders added:

- `TrustScoreRuleSeeder`, `SupplierStorefrontSeeder`

Purpose:

- Support enterprise wishlists, review media/replies/votes/moderation, trust scoring, supplier storefront pages, showcase products, factory tours, export markets, quality controls, licenses, awards, and buyer engagement tracking.
