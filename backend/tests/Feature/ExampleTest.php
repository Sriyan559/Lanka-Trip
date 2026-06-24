<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_api_health_endpoint_returns_frontend_compatible_json(): void
    {
        $response = $this
            ->withHeader('Origin', 'http://localhost:3000')
            ->getJson('/api/health');

        $response
            ->assertOk()
            ->assertHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->assertHeader('X-Frame-Options', 'DENY')
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertExactJson([
                'status' => 'ok',
                'app' => 'EcomLanka',
                'version' => '1.0.0',
            ]);
    }

    public function test_missing_api_route_returns_json(): void
    {
        $this->getJson('/api/not-a-real-route')
            ->assertNotFound()
            ->assertExactJson([
                'success' => false,
                'message' => 'Resource not found',
            ]);
    }
}
