<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiDocumentationTest extends TestCase
{
    public function test_swagger_documentation_route_loads_and_exposes_generated_specification(): void
    {
        $this->get('/api/documentation')
            ->assertOk()
            ->assertSee('EcomLanka REST API');

        $this->getJson('/docs')
            ->assertOk()
            ->assertJsonPath('info.title', 'EcomLanka REST API')
            ->assertJsonPath('components.securitySchemes.sanctum.type', 'http')
            ->assertJsonPath('paths./api/auth/login.post.tags.0', 'Authentication')
            ->assertJsonPath('paths./api/analytics/revenue.get.tags.0', 'Analytics');
    }
}
