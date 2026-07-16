<?php

namespace App\Support\AI;

use Illuminate\Support\Str;

class MockBeautyAdvisorProvider implements BeautyAdvisorProvider
{
    public function respond(array $history, array $profile, array $groundingProducts): array
    {
        $lastMessage = '';
        if (!empty($history)) {
            $lastMessage = strtolower(end($history)['content'] ?? '');
        }

        $skinType = strtolower($profile['skin_type'] ?? '');
        $concern = strtolower($profile['skin_concern'] ?? '');

        // Determine category/concern based on message contents
        $isSkincare = Str::contains($lastMessage, ['skin', 'routine', 'dry', 'oily', 'acne', 'moisturizer', 'cleanser']);
        $isMakeup = Str::contains($lastMessage, ['makeup', 'lipstick', 'foundation', 'mascara', 'shade']);
        $isFragrance = Str::contains($lastMessage, ['fragrance', 'perfume', 'scent', 'smell']);
        
        $recommendedIds = [];
        $routine = [];
        $reply = "Hello! I am your SL Beauty AI Advisor. Let's find the best products for your beauty routine.";
        $followUp = "What is your main skin concern or preferred product category?";
        $quickReplies = ["Build my skincare routine", "Recommend makeup for me", "Help me choose a fragrance"];

        // Select grounded products matching intent
        foreach ($groundingProducts as $prod) {
            $prodName = strtolower($prod['name']);
            $prodDesc = strtolower($prod['description'] ?? '');
            
            $matchesIntent = false;
            if ($isSkincare && (Str::contains($prodName, ['cream', 'serum', 'wash', 'cleanser', 'hydrat', 'skin', 'sun']) || Str::contains($prodDesc, ['skin', 'face']))) {
                $matchesIntent = true;
            } elseif ($isMakeup && Str::contains($prodName, ['lip', 'mascara', 'shadow', 'foundation', 'powder'])) {
                $matchesIntent = true;
            } elseif ($isFragrance && Str::contains($prodName, ['perfume', 'parfum', 'spray', 'cologne', 'fragrance'])) {
                $matchesIntent = true;
            } elseif (!$isSkincare && !$isMakeup && !$isFragrance) {
                // generic fallback matches
                $matchesIntent = true;
            }

            if ($matchesIntent) {
                $recommendedIds[] = (string) $prod['id'];
                if (count($recommendedIds) >= 3) {
                    break;
                }
            }
        }

        // If no matches, fall back to any available grounding products
        if (empty($recommendedIds) && !empty($groundingProducts)) {
            foreach (array_slice($groundingProducts, 0, 3) as $prod) {
                $recommendedIds[] = (string) $prod['id'];
            }
        }

        // Customise replies based on input
        if ($isSkincare || $skinType || $concern) {
            $typeStr = $skinType ? " {$skinType} skin type" : "";
            $concernStr = $concern ? " for {$concern}" : "";
            $reply = "Based on our curated list, I have put together a nourishing skincare routine tailored to your{$typeStr}{$concernStr}. Remember to always patch test new products.";
            $followUp = "Would you like me to adjust this based on your budget or preferred ingredients?";
            $quickReplies = ["Hydrating routine", "Gentle cleanser options", "Show my matches"];

            // routine steps
            $routine = [
                [
                    'step' => 1,
                    'title' => 'Cleanse',
                    'instruction' => 'Wash face gently with lukewarm water and a mild cleanser.',
                    'productId' => !empty($recommendedIds) ? $recommendedIds[0] : null,
                ],
                [
                    'step' => 2,
                    'title' => 'Hydrate',
                    'instruction' => 'Apply a damp layer of hydrating serum to lock in moisture.',
                    'productId' => count($recommendedIds) > 1 ? $recommendedIds[1] : null,
                ],
                [
                    'step' => 3,
                    'title' => 'Protect',
                    'instruction' => 'During the day, follow with a broad-spectrum SPF 30+ sunscreen.',
                    'productId' => count($recommendedIds) > 2 ? $recommendedIds[2] : null,
                ]
            ];
        } elseif ($isMakeup) {
            $reply = "Here are my top premium makeup selections from the SL Beauty collection. These will enhance your natural look with long-lasting wear.";
            $followUp = "Would you like help choosing a specific shade family?";
            $quickReplies = ["Lipstick shade guide", "Foundation matching", "Show my matches"];
        } elseif ($isFragrance) {
            $reply = "I've matched you with exquisite fragrance profiles from our collection. These feature beautiful balanced notes for everyday luxury.";
            $followUp = "Do you prefer floral, woody, fresh, or oriental scents?";
            $quickReplies = ["Floral fragrances", "Woody & fresh options", "Show current offers"];
        }

        return [
            'reply' => $reply,
            'followUpQuestion' => $followUp,
            'quickReplies' => $quickReplies,
            'recommendedProductIds' => $recommendedIds,
            'routine' => $routine,
            'disclaimer' => "Consult a dermatologist or medical professional for persistent skin diseases or allergic reactions. Always perform a patch test before using new topical products.",
        ];
    }
}
