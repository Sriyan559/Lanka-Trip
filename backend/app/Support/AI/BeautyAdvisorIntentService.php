<?php

namespace App\Support\AI;

use Illuminate\Support\Str;

class BeautyAdvisorIntentService
{
    public function classify(string $message): array
    {
        $text = Str::lower($message);
        $current = Str::contains($text, ['latest', 'recent', 'current', 'today', 'new research', 'regulation', 'recall', 'announcement', 'web', 'online', 'verify']);
        $product = Str::contains($text, ['product', 'price', 'stock', 'available', 'under lkr', 'compare']);
        $ingredient = Str::contains($text, ['ingredient', 'inci', 'aha', 'bha', 'niacinamide', 'retinol']);

        return [
            'intent' => $product ? 'product_search' : ($ingredient ? 'ingredient_question' : 'beauty_question'),
            'requires_web' => $current,
        ];
    }
}
