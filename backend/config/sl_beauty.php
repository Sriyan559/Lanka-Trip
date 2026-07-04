<?php

return [
    'display_name' => env('SL_BEAUTY_DISPLAY_NAME', 'SL Beauty Platform'),
    'legal_name' => env('SL_BEAUTY_LEGAL_NAME', 'SL Beauty Platform'),
    'market' => env('SL_BEAUTY_MARKET', 'Sri Lanka'),
    'positioning' => 'Hybrid B2B and B2C beauty marketplace for Sri Lanka.',
    'support_email' => env('SL_BEAUTY_SUPPORT_EMAIL', 'support@slbeauty.lk'),
    'feature_flags' => [
        'beauty_taxonomy' => 'sl_beauty.taxonomy',
        'b2c_retail_features' => 'sl_beauty.b2c_retail',
        'brand_seller_verification' => 'sl_beauty.brand_seller_verification',
        'compliance_workflows' => 'sl_beauty.compliance_workflows',
    ],
];
