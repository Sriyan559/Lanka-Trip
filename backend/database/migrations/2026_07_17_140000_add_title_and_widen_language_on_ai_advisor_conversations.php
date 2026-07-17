<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('ai_advisor_conversations', function (Blueprint $table) {
            $table->string('title', 160)->nullable()->after('status');
        });
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE ai_advisor_conversations ALTER COLUMN language TYPE VARCHAR(12)');
        }
        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE ai_advisor_conversations MODIFY language VARCHAR(12) NOT NULL DEFAULT 'en'");
        }
    }

    public function down(): void
    {
        Schema::table('ai_advisor_conversations', fn (Blueprint $table) => $table->dropColumn('title'));
        if (DB::getDriverName() === 'pgsql') DB::statement('ALTER TABLE ai_advisor_conversations ALTER COLUMN language TYPE VARCHAR(2)');
        if (DB::getDriverName() === 'mysql') DB::statement("ALTER TABLE ai_advisor_conversations MODIFY language VARCHAR(2) NOT NULL DEFAULT 'en'");
    }
};
