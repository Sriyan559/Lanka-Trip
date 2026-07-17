<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'beauty_advisor' => [
        'enabled' => env('AI_BEAUTY_ADVISOR_ENABLED', true),
        'mock_mode' => env('AI_BEAUTY_ADVISOR_MOCK_MODE', false),
        'prompt_version' => env('BEAUTY_ADVISOR_PROMPT_VERSION', 2),
        'provider' => env('AI_BEAUTY_ADVISOR_PROVIDER', 'gemini'),
        'gemini' => [
            'api_key' => env('AI_BEAUTY_ADVISOR_API_KEY'),
            'model' => env('AI_BEAUTY_ADVISOR_MODEL', 'gemini-2.5-flash'),
            'timeout' => env('AI_BEAUTY_ADVISOR_TIMEOUT_SECONDS', 30),
        ],
        'web' => [
            'enabled' => env('AI_BEAUTY_WEB_SEARCH_ENABLED', false),
            'provider' => env('AI_BEAUTY_WEB_SEARCH_PROVIDER'),
            'api_key' => env('AI_BEAUTY_WEB_SEARCH_API_KEY'),
            'endpoint' => env('AI_BEAUTY_WEB_SEARCH_ENDPOINT'),
            'max_results' => env('AI_BEAUTY_WEB_SEARCH_MAX_RESULTS', 6),
            'timeout' => env('AI_BEAUTY_WEB_SEARCH_TIMEOUT_SECONDS', 15),
            'cache_minutes' => env('AI_BEAUTY_WEB_SEARCH_CACHE_MINUTES', 60),
            'allowed_domains' => env('AI_BEAUTY_SEARCH_ALLOWED_DOMAINS', ''),
            'blocked_domains' => env('AI_BEAUTY_SEARCH_BLOCKED_DOMAINS', ''),
        ],
    ],

];
