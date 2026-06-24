<?php

namespace App\Events;

class CatalogCacheInvalidated
{
    public function __construct(public array $groups) {}
}
