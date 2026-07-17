<?php

namespace App\Support\AI;

class BeautyAdvisorLanguageService
{
    public const SUPPORTED = ['en', 'si', 'ta', 'zh-CN', 'zh-TW', 'ko', 'hi'];

    public function normalize(?string $language): string
    {
        return in_array($language, self::SUPPORTED, true) ? $language : 'en';
    }
}
