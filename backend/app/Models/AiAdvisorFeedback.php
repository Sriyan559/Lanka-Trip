<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiAdvisorFeedback extends Model
{
    protected $table = 'ai_advisor_feedback';
    protected $guarded = [];
    protected function casts(): array { return ['source_urls' => 'array']; }
}
