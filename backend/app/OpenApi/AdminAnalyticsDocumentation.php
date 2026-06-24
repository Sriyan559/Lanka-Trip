<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

class AdminAnalyticsDocumentation
{
    #[OA\Get(
        path: '/api/admin/dashboard',
        operationId: 'adminDashboard',
        summary: 'Get administrator dashboard counts',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Admin dashboard',
                content: new OA\JsonContent(example: ['success' => true, 'users_count' => 30, 'products_count' => 120, 'orders_count' => 18]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function adminDashboard(): void {}

    #[OA\Get(
        path: '/api/admin/users',
        operationId: 'adminUsersIndex',
        summary: 'Search and filter users',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'role', in: 'query', schema: new OA\Schema(type: 'string', enum: ['admin', 'buyer', 'supplier'])),
            new OA\Parameter(name: 'status', in: 'query', schema: new OA\Schema(type: 'string', enum: ['active', 'inactive'])),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function users(): void {}

    #[OA\Get(
        path: '/api/admin/users/{id}',
        operationId: 'adminUsersShow',
        summary: 'Show user details',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function user(): void {}

    #[OA\Put(
        path: '/api/admin/users/{id}/status',
        operationId: 'adminUsersStatus',
        summary: 'Activate or deactivate a user',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/StatusRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateUserStatus(): void {}

    #[OA\Get(
        path: '/api/admin/suppliers',
        operationId: 'adminSuppliersIndex',
        summary: 'Search and filter suppliers',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'verification_status', in: 'query', schema: new OA\Schema(type: 'string', enum: ['pending', 'verified', 'rejected'])),
            new OA\Parameter(name: 'status', in: 'query', schema: new OA\Schema(type: 'string', enum: ['active', 'inactive'])),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function suppliers(): void {}

    #[OA\Get(
        path: '/api/admin/suppliers/{id}',
        operationId: 'adminSuppliersShow',
        summary: 'Show supplier details and products',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function supplier(): void {}

    #[OA\Put(
        path: '/api/admin/suppliers/{id}/verify',
        operationId: 'adminSuppliersVerify',
        summary: 'Set supplier verification status',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/VerificationRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function verifySupplier(): void {}

    #[OA\Get(
        path: '/api/admin/products',
        operationId: 'adminProductsIndex',
        summary: 'Search and filter all products',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'category', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'status', in: 'query', schema: new OA\Schema(type: 'string', enum: ['active', 'inactive'])),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function products(): void {}

    #[OA\Get(
        path: '/api/admin/products/{id}',
        operationId: 'adminProductsShow',
        summary: 'Show product details',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function product(): void {}

    #[OA\Put(
        path: '/api/admin/products/{id}/status',
        operationId: 'adminProductsStatus',
        summary: 'Activate or deactivate a product',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/StatusRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateProductStatus(): void {}

    #[OA\Delete(
        path: '/api/admin/products/{id}',
        operationId: 'adminProductsDelete',
        summary: 'Soft-delete a product',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function deleteProduct(): void {}

    #[OA\Get(
        path: '/api/admin/rfqs',
        operationId: 'adminRfqsIndex',
        summary: 'List all RFQs',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function rfqs(): void {}

    #[OA\Get(
        path: '/api/admin/quotations',
        operationId: 'adminQuotationsIndex',
        summary: 'List all quotations',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function quotations(): void {}

    #[OA\Get(
        path: '/api/admin/orders',
        operationId: 'adminOrdersIndex',
        summary: 'List all orders',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function orders(): void {}

    #[OA\Get(
        path: '/api/admin/messages',
        operationId: 'adminMessagesIndex',
        summary: 'List all messages',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function messages(): void {}

    #[OA\Get(
        path: '/api/admin/horizon/status',
        operationId: 'adminHorizonStatus',
        summary: 'Get Horizon worker status and configured queues',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Horizon status',
                content: new OA\JsonContent(example: ['success' => true, 'status' => 'running', 'queues' => ['default', 'notifications', 'emails']]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function horizonStatus(): void {}

    #[OA\Get(
        path: '/api/admin/activity-logs',
        operationId: 'adminActivityLogs',
        summary: 'List paginated application activity logs',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        parameters: [new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function activityLogs(): void {}

    #[OA\Get(
        path: '/api/admin/system',
        operationId: 'adminSystem',
        summary: 'Get production system diagnostics',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Runtime and infrastructure status',
                content: new OA\JsonContent(example: [
                    'success' => true,
                    'php_version' => '8.3.0',
                    'laravel_version' => '11.54.0',
                    'database' => ['driver' => 'mysql', 'status' => 'connected'],
                    'cache' => 'redis',
                    'queue' => 'redis',
                    'redis' => 'connected',
                    'horizon' => 'running',
                ]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function system(): void {}

    #[OA\Get(
        path: '/api/admin/backups',
        operationId: 'adminBackups',
        summary: 'List generated backup archives',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Backup archives',
                content: new OA\JsonContent(example: ['success' => true, 'backups' => [], 'total' => 0]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function backups(): void {}

    #[OA\Post(
        path: '/api/admin/maintenance/enable',
        operationId: 'adminMaintenanceEnable',
        summary: 'Enable application maintenance mode',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function enableMaintenance(): void {}

    #[OA\Post(
        path: '/api/admin/maintenance/disable',
        operationId: 'adminMaintenanceDisable',
        summary: 'Disable application maintenance mode',
        security: [['sanctum' => []]],
        tags: ['Admin'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function disableMaintenance(): void {}

    #[OA\Get(
        path: '/api/analytics/dashboard',
        operationId: 'analyticsDashboard',
        summary: 'Get overall marketplace analytics',
        security: [['sanctum' => []]],
        tags: ['Analytics'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Cached dashboard analytics',
                content: new OA\JsonContent(
                    example: [
                        'success' => true,
                        'total_users' => 100,
                        'total_buyers' => 70,
                        'total_suppliers' => 25,
                        'total_products' => 300,
                        'total_orders' => 50,
                        'total_reviews' => 120,
                    ],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function analyticsDashboard(): void {}

    #[OA\Get(path: '/api/analytics/top-products', operationId: 'analyticsTopProducts', summary: 'Get top ten products', security: [['sanctum' => []]], tags: ['Analytics'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200), new OA\Response(ref: '#/components/responses/Unauthorized', response: 401), new OA\Response(ref: '#/components/responses/Forbidden', response: 403)])]
    public function topProducts(): void {}

    #[OA\Get(path: '/api/analytics/top-suppliers', operationId: 'analyticsTopSuppliers', summary: 'Get top ten suppliers', security: [['sanctum' => []]], tags: ['Analytics'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200), new OA\Response(ref: '#/components/responses/Unauthorized', response: 401), new OA\Response(ref: '#/components/responses/Forbidden', response: 403)])]
    public function topSuppliers(): void {}

    #[OA\Get(path: '/api/analytics/top-categories', operationId: 'analyticsTopCategories', summary: 'Get top ten categories', security: [['sanctum' => []]], tags: ['Analytics'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200), new OA\Response(ref: '#/components/responses/Unauthorized', response: 401), new OA\Response(ref: '#/components/responses/Forbidden', response: 403)])]
    public function topCategories(): void {}

    #[OA\Get(
        path: '/api/analytics/rfqs',
        operationId: 'analyticsRfqs',
        summary: 'Get RFQ status counts and latest twelve months',
        security: [['sanctum' => []]],
        tags: ['Analytics'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function analyticsRfqs(): void {}

    #[OA\Get(
        path: '/api/analytics/quotations',
        operationId: 'analyticsQuotations',
        summary: 'Get quotation status counts and latest twelve months',
        security: [['sanctum' => []]],
        tags: ['Analytics'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function analyticsQuotations(): void {}

    #[OA\Get(
        path: '/api/analytics/orders',
        operationId: 'analyticsOrders',
        summary: 'Get order status counts and latest twelve months',
        security: [['sanctum' => []]],
        tags: ['Analytics'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function analyticsOrders(): void {}

    #[OA\Get(
        path: '/api/analytics/revenue',
        operationId: 'analyticsRevenue',
        summary: 'Get completed-order revenue analytics',
        security: [['sanctum' => []]],
        tags: ['Analytics'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Daily, monthly and yearly completed-order revenue',
                content: new OA\JsonContent(
                    example: [
                        'success' => true,
                        'daily_revenue' => 1000,
                        'monthly_revenue' => 12500,
                        'yearly_revenue' => 90000,
                        'currency_breakdown' => ['USD' => 75000, 'LKR' => 15000],
                    ],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function revenue(): void {}
}
