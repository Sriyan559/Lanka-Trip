<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('ai_advisor_conversations', function (Blueprint $table) {
            $table->string('language', 2)->default('en')->after('status');
            $table->string('stage', 40)->default('questionnaire')->after('language');
            $table->unsignedSmallInteger('prompt_version')->default(2)->after('stage');
        });
        Schema::table('ai_advisor_saved_plans', function (Blueprint $table) {
            $table->string('language', 2)->default('en')->after('title');
            $table->json('recommended_product_ids')->nullable()->after('routine_data');
            $table->decimal('estimated_total', 12, 2)->default(0)->after('recommended_product_ids');
            $table->string('currency', 3)->default('LKR')->after('estimated_total');
            $table->unsignedInteger('version')->default(1)->after('currency');
            $table->string('status', 20)->default('active')->index()->after('version');
            $table->timestamp('generated_at')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('ai_advisor_saved_plans', fn (Blueprint $table) => $table->dropColumn(['language','recommended_product_ids','estimated_total','currency','version','status','generated_at']));
        Schema::table('ai_advisor_conversations', fn (Blueprint $table) => $table->dropColumn(['language','stage','prompt_version']));
    }
};
