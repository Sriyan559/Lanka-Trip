<?php

namespace App\Http\Requests\Concerns;

trait DecodesFrontendPassword
{
    protected function decodeFrontendPassword(mixed $value): mixed
    {
        if (! is_string($value) || $value === '') {
            return $value;
        }

        $decoded = base64_decode($value, true);

        if (
            $decoded === false
            || base64_encode($decoded) !== $value
            || ! mb_check_encoding($decoded, 'UTF-8')
            || preg_match('/[^\P{C}\t]/u', $decoded)
        ) {
            return $value;
        }

        return $decoded;
    }
}
