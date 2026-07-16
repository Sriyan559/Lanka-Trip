<?php

namespace App\Support\AI;

interface BeautyAdvisorProvider
{
    /**
     * Respond to the chat history and profile.
     *
     * @param array $history Messages list with role and content keys.
     * @param array $profile User skin profile parameters.
     * @param array $groundingProducts List of in-stock active products from DB.
     * @return array Response matching the structured JSON format.
     */
    public function respond(array $history, array $profile, array $groundingProducts): array;
}
