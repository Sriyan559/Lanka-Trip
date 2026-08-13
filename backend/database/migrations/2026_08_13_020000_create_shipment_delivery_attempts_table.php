<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {public function up():void{Schema::create('shipment_delivery_attempts',function(Blueprint$t){$t->id();$t->uuid('uuid')->unique();$t->foreignId('shipment_id')->constrained()->cascadeOnDelete();$t->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();$t->unsignedSmallInteger('attempt_number');$t->string('outcome',30)->index();$t->text('notes')->nullable();$t->timestamp('attempted_at')->index();$t->timestamps();$t->unique(['shipment_id','attempt_number']);$t->index(['shipment_id','attempted_at']);});}public function down():void{Schema::dropIfExists('shipment_delivery_attempts');}};
