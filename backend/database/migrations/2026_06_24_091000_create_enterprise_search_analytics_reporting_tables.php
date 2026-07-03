<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('search_queries')) {
            Schema::create('search_queries', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->string('search_query')->index();
                $table->string('normalized_query')->nullable()->index();
                $table->unsignedInteger('results_count')->default(0);
                $table->jsonb('filters')->nullable();
                $table->jsonb('query_payload')->nullable();
                $table->jsonb('result_snapshot')->nullable();
                $table->string('status', 30)->default('completed')->index();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
                $table->index(['buyer_profile_id', 'created_at'], 'search_queries_buyer_created_index');
                $table->index(['category_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('search_result_clicks')) {
            Schema::create('search_result_clicks', function (Blueprint $table) {
                $table->id();
                $table->foreignId('search_query_id')->constrained('search_queries')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->string('result_type', 50)->index();
                $table->unsignedInteger('position')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['search_query_id', 'created_at'], 'search_clicks_query_created_index');
                $table->index(['user_id', 'created_at']);
                $table->index(['product_id', 'created_at']);
                $table->index(['supplier_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('search_filters_used')) {
            Schema::create('search_filters_used', function (Blueprint $table) {
                $table->id();
                $table->foreignId('search_query_id')->constrained('search_queries')->cascadeOnDelete();
                $table->string('filter_name')->index();
                $table->string('filter_value')->nullable()->index();
                $table->jsonb('filter_payload')->nullable();
                $table->timestamps();

                $table->index(['search_query_id', 'filter_name'], 'search_filters_query_name_index');
            });
        }

        if (! Schema::hasTable('saved_searches')) {
            Schema::create('saved_searches', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->string('name');
                $table->string('search_query')->index();
                $table->jsonb('filters')->nullable();
                $table->boolean('alerts_enabled')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'saved_searches_buyer_status_index');
            });
        }

        if (! Schema::hasTable('search_synonyms')) {
            Schema::create('search_synonyms', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('term')->index();
                $table->string('synonym')->index();
                $table->foreignId('language_id')->nullable()->constrained('languages')->nullOnDelete();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['term', 'synonym', 'language_id']);
            });
        }

        if (! Schema::hasTable('search_index_logs')) {
            Schema::create('search_index_logs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->nullableMorphs('indexable');
                $table->string('operation', 50)->index();
                $table->string('status', 30)->default('pending')->index();
                $table->text('message')->nullable();
                $table->jsonb('payload')->nullable();
                $table->timestamp('processed_at')->nullable();
                $table->timestamps();

                $table->index(['indexable_type', 'indexable_id'], 'search_index_logs_indexable_index');
                $table->index('created_at', 'search_index_logs_created_at_index');
            });
        }

        if (! Schema::hasTable('marketplace_analytics_daily')) {
            Schema::create('marketplace_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->date('analytics_date')->unique();
                $table->unsignedBigInteger('visitors_count')->default(0);
                $table->unsignedBigInteger('searches_count')->default(0);
                $table->unsignedBigInteger('product_views_count')->default(0);
                $table->unsignedBigInteger('rfqs_count')->default(0);
                $table->unsignedBigInteger('orders_count')->default(0);
                $table->decimal('gmv_amount', 16, 2)->default(0);
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->index('created_at', 'marketplace_analytics_created_at_index');
            });
        }

        if (! Schema::hasTable('supplier_analytics_daily')) {
            Schema::create('supplier_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->date('analytics_date');
                $table->unsignedBigInteger('profile_views_count')->default(0);
                $table->unsignedBigInteger('product_views_count')->default(0);
                $table->unsignedBigInteger('rfq_invites_count')->default(0);
                $table->unsignedBigInteger('quotations_count')->default(0);
                $table->unsignedBigInteger('orders_count')->default(0);
                $table->decimal('revenue_amount', 16, 2)->default(0);
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->unique(['supplier_id', 'analytics_date']);
                $table->index(['supplier_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('product_analytics_daily')) {
            Schema::create('product_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->date('analytics_date');
                $table->unsignedBigInteger('views_count')->default(0);
                $table->unsignedBigInteger('clicks_count')->default(0);
                $table->unsignedBigInteger('rfq_count')->default(0);
                $table->unsignedBigInteger('order_count')->default(0);
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->unique(['product_id', 'analytics_date']);
                $table->index(['supplier_id', 'analytics_date'], 'product_analytics_supplier_date_index');
                $table->index(['category_id', 'analytics_date'], 'product_analytics_category_date_index');
            });
        }

        if (! Schema::hasTable('category_analytics_daily')) {
            Schema::create('category_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
                $table->date('analytics_date');
                $table->unsignedBigInteger('views_count')->default(0);
                $table->unsignedBigInteger('searches_count')->default(0);
                $table->unsignedBigInteger('rfq_count')->default(0);
                $table->unsignedBigInteger('order_count')->default(0);
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->unique(['category_id', 'analytics_date']);
            });
        }

        if (! Schema::hasTable('buyer_analytics_daily')) {
            Schema::create('buyer_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->foreignId('buyer_profile_id')->constrained('buyer_profiles')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->date('analytics_date');
                $table->unsignedBigInteger('searches_count')->default(0);
                $table->unsignedBigInteger('rfqs_count')->default(0);
                $table->unsignedBigInteger('quotations_received_count')->default(0);
                $table->unsignedBigInteger('orders_count')->default(0);
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->unique(['buyer_profile_id', 'analytics_date'], 'buyer_analytics_buyer_date_unique');
                $table->index(['user_id', 'analytics_date']);
            });
        }

        if (! Schema::hasTable('rfq_analytics_daily')) {
            Schema::create('rfq_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->date('analytics_date');
                $table->unsignedBigInteger('views_count')->default(0);
                $table->unsignedBigInteger('supplier_matches_count')->default(0);
                $table->unsignedBigInteger('quotation_count')->default(0);
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->unique(['rfq_id', 'analytics_date']);
                $table->index(['buyer_profile_id', 'analytics_date'], 'rfq_analytics_buyer_date_index');
                $table->index(['category_id', 'analytics_date'], 'rfq_analytics_category_date_index');
            });
        }

        if (! Schema::hasTable('order_analytics_daily')) {
            Schema::create('order_analytics_daily', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->date('analytics_date');
                $table->decimal('order_amount', 16, 2)->default(0);
                $table->string('payment_status', 30)->nullable()->index();
                $table->string('fulfillment_status', 30)->nullable()->index();
                $table->jsonb('metrics')->nullable();
                $table->timestamps();

                $table->unique(['order_id', 'analytics_date']);
                $table->index(['supplier_id', 'analytics_date'], 'order_analytics_supplier_date_index');
                $table->index(['buyer_profile_id', 'analytics_date'], 'order_analytics_buyer_date_index');
            });
        }

        if (! Schema::hasTable('conversion_funnels')) {
            Schema::create('conversion_funnels', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('funnel_type', 80)->index();
                $table->jsonb('steps')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('conversion_funnel_events')) {
            Schema::create('conversion_funnel_events', function (Blueprint $table) {
                $table->id();
                $table->foreignId('conversion_funnel_id')->constrained('conversion_funnels')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->string('event_type')->index();
                $table->string('step_key')->nullable()->index();
                $table->nullableMorphs('subject');
                $table->jsonb('event_context')->nullable();
                $table->timestamps();

                $table->index(['conversion_funnel_id', 'created_at'], 'funnel_events_funnel_created_index');
                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('dashboard_widgets')) {
            Schema::create('dashboard_widgets', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('widget_type', 80)->index();
                $table->string('audience', 80)->default('admin')->index();
                $table->jsonb('default_config')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('dashboard_widget_settings')) {
            Schema::create('dashboard_widget_settings', function (Blueprint $table) {
                $table->id();
                $table->foreignId('dashboard_widget_id')->constrained('dashboard_widgets')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
                $table->jsonb('settings')->nullable();
                $table->boolean('is_visible')->default(true)->index();
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();

                $table->unique(['dashboard_widget_id', 'user_id'], 'dashboard_widget_settings_unique');
                $table->index(['user_id', 'is_visible']);
            });
        }

        if (! Schema::hasTable('report_definitions')) {
            Schema::create('report_definitions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('report_type')->index();
                $table->jsonb('parameters_schema')->nullable();
                $table->jsonb('default_filters')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('report_runs')) {
            Schema::create('report_runs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('report_definition_id')->constrained('report_definitions')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('report_type')->index();
                $table->string('status', 30)->default('queued')->index();
                $table->jsonb('parameters')->nullable();
                $table->jsonb('result_summary')->nullable();
                $table->timestamp('started_at')->nullable();
                $table->timestamp('completed_at')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
                $table->index(['report_definition_id', 'status'], 'report_runs_definition_status_index');
            });
        }

        if (! Schema::hasTable('report_exports')) {
            Schema::create('report_exports', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('report_run_id')->constrained('report_runs')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('export_format', 30)->index();
                $table->string('file_path')->nullable();
                $table->string('file_url')->nullable();
                $table->string('status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['report_run_id', 'status']);
                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('kpi_definitions')) {
            Schema::create('kpi_definitions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('metric_key')->unique();
                $table->string('kpi_type', 80)->index();
                $table->string('unit', 50)->nullable();
                $table->jsonb('calculation_rules')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('kpi_snapshots')) {
            Schema::create('kpi_snapshots', function (Blueprint $table) {
                $table->id();
                $table->foreignId('kpi_definition_id')->constrained('kpi_definitions')->cascadeOnDelete();
                $table->date('analytics_date')->index();
                $table->nullableMorphs('scope');
                $table->decimal('value_numeric', 18, 4)->nullable();
                $table->jsonb('value_json')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['kpi_definition_id', 'analytics_date'], 'kpi_snapshots_definition_date_index');
                $table->index(['scope_type', 'scope_id'], 'kpi_snapshots_scope_index');
            });
        }

        if (! Schema::hasTable('traffic_sources')) {
            Schema::create('traffic_sources', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('source')->index();
                $table->string('medium')->nullable()->index();
                $table->string('campaign')->nullable()->index();
                $table->string('referrer')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['source', 'medium', 'campaign'], 'traffic_sources_unique');
            });
        }

        if (! Schema::hasTable('page_view_events')) {
            Schema::create('page_view_events', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('traffic_source_id')->nullable()->constrained('traffic_sources')->nullOnDelete();
                $table->string('page_url');
                $table->string('page_type', 80)->nullable()->index();
                $table->nullableMorphs('viewable');
                $table->string('session_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->jsonb('event_context')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
                $table->index(['viewable_type', 'viewable_id'], 'page_view_events_viewable_index');
                $table->index('created_at', 'page_view_events_created_at_index');
            });
        }

        if (! Schema::hasTable('user_behavior_events')) {
            Schema::create('user_behavior_events', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->string('event_type')->index();
                $table->nullableMorphs('subject');
                $table->string('session_id')->nullable()->index();
                $table->jsonb('event_context')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
                $table->index(['buyer_profile_id', 'created_at'], 'behavior_events_buyer_created_index');
                $table->index(['subject_type', 'subject_id'], 'behavior_events_subject_index');
                $table->index('created_at', 'behavior_events_created_at_index');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('user_behavior_events');
        Schema::dropIfExists('page_view_events');
        Schema::dropIfExists('traffic_sources');
        Schema::dropIfExists('kpi_snapshots');
        Schema::dropIfExists('kpi_definitions');
        Schema::dropIfExists('report_exports');
        Schema::dropIfExists('report_runs');
        Schema::dropIfExists('report_definitions');
        Schema::dropIfExists('dashboard_widget_settings');
        Schema::dropIfExists('dashboard_widgets');
        Schema::dropIfExists('conversion_funnel_events');
        Schema::dropIfExists('conversion_funnels');
        Schema::dropIfExists('order_analytics_daily');
        Schema::dropIfExists('rfq_analytics_daily');
        Schema::dropIfExists('buyer_analytics_daily');
        Schema::dropIfExists('category_analytics_daily');
        Schema::dropIfExists('product_analytics_daily');
        Schema::dropIfExists('supplier_analytics_daily');
        Schema::dropIfExists('marketplace_analytics_daily');
        Schema::dropIfExists('search_index_logs');
        Schema::dropIfExists('search_synonyms');
        Schema::dropIfExists('saved_searches');
        Schema::dropIfExists('search_filters_used');
        Schema::dropIfExists('search_result_clicks');
        Schema::dropIfExists('search_queries');
    }
};
