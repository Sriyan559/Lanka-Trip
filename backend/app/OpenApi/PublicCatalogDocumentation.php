<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

class PublicCatalogDocumentation
{
    #[OA\Get(
        path: '/api/health',
        operationId: 'health',
        summary: 'Check API health',
        tags: ['Health'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'API is available',
                content: new OA\JsonContent(example: ['status' => 'ok', 'app' => 'EcomLanka', 'version' => '1.0.0']),
            ),
        ],
    )]
    public function health(): void {}

    #[OA\Get(
        path: '/api/categories',
        operationId: 'categoriesIndex',
        summary: 'List active categories',
        tags: ['Categories'],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function categories(): void {}

    #[OA\Get(
        path: '/api/categories/trending',
        operationId: 'categoriesTrending',
        summary: 'List trending categories',
        tags: ['Categories', 'Homepage'],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function trendingCategories(): void {}

    #[OA\Get(
        path: '/api/categories/{slug}',
        operationId: 'categoriesShow',
        summary: 'Show category by slug',
        tags: ['Categories'],
        parameters: [
            new OA\Parameter(name: 'slug', in: 'path', required: true, schema: new OA\Schema(type: 'string'), example: 'ceylon-tea'),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function category(): void {}

    #[OA\Get(
        path: '/api/categories/{slug}/products',
        operationId: 'categoryProducts',
        summary: 'List paginated category products',
        tags: ['Categories', 'Products'],
        parameters: [
            new OA\Parameter(name: 'slug', in: 'path', required: true, schema: new OA\Schema(type: 'string'), example: 'ceylon-tea'),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function categoryProducts(): void {}

    #[OA\Get(
        path: '/api/products',
        operationId: 'productsIndex',
        summary: 'Search, filter and sort products',
        tags: ['Products'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'category', in: 'query', schema: new OA\Schema(type: 'string'), example: 'ceylon-tea'),
            new OA\Parameter(name: 'sort', in: 'query', schema: new OA\Schema(type: 'string', enum: ['latest', 'oldest', 'price_asc', 'price_desc', 'popular'])),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Paginated products',
                content: new OA\JsonContent(
                    type: 'object',
                    example: [
                        'data' => [['id' => 1, 'name' => 'Pure Ceylon Black Tea', 'price' => 5.25]],
                        'current_page' => 1,
                        'per_page' => 20,
                        'total' => 1,
                    ],
                ),
            ),
        ],
    )]
    public function products(): void {}

    #[OA\Get(
        path: '/api/products/featured',
        operationId: 'productsFeatured',
        summary: 'List featured products',
        tags: ['Products'],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function featuredProducts(): void {}

    #[OA\Get(
        path: '/api/products/trending',
        operationId: 'productsTrending',
        summary: 'List products ordered by views',
        tags: ['Products'],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function trendingProducts(): void {}

    #[OA\Get(
        path: '/api/products/{id}',
        operationId: 'productsShow',
        summary: 'Show product details and related products',
        tags: ['Products'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function product(): void {}

    #[OA\Get(
        path: '/api/products/{id}/reviews',
        operationId: 'productReviewsIndex',
        summary: 'List product reviews and rating aggregates',
        tags: ['Reviews', 'Products'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function productReviews(): void {}

    #[OA\Post(
        path: '/api/products/{id}/reviews',
        operationId: 'productReviewsStore',
        summary: 'Create or update the authenticated user product review',
        security: [['sanctum' => []]],
        tags: ['Reviews', 'Products'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ReviewRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function storeProductReview(): void {}

    #[OA\Get(
        path: '/api/suppliers',
        operationId: 'suppliersIndex',
        summary: 'Search and filter active suppliers',
        tags: ['Suppliers'],
        parameters: [
            new OA\Parameter(name: 'search', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'verification_status', in: 'query', schema: new OA\Schema(type: 'string', enum: ['pending', 'verified', 'rejected'])),
            new OA\Parameter(name: 'country', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'business_type', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function suppliers(): void {}

    #[OA\Get(
        path: '/api/suppliers/{id}',
        operationId: 'suppliersShow',
        summary: 'Show supplier details and latest products',
        tags: ['Suppliers'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function supplier(): void {}

    #[OA\Get(
        path: '/api/suppliers/{id}/products',
        operationId: 'supplierProducts',
        summary: 'List paginated supplier products',
        tags: ['Suppliers', 'Products'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function supplierProducts(): void {}

    #[OA\Get(
        path: '/api/suppliers/{id}/company-profile',
        operationId: 'supplierCompanyProfilePublic',
        summary: 'Show full public supplier company profile',
        tags: ['Supplier Company Profile', 'Suppliers'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function supplierCompanyProfile(): void {}

    #[OA\Get(
        path: '/api/suppliers/{id}/reviews',
        operationId: 'supplierReviewsIndex',
        summary: 'List supplier reviews and rating aggregates',
        tags: ['Reviews', 'Suppliers'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function supplierReviews(): void {}

    #[OA\Post(
        path: '/api/suppliers/{id}/reviews',
        operationId: 'supplierReviewsStore',
        summary: 'Create or update the authenticated user supplier review',
        security: [['sanctum' => []]],
        tags: ['Reviews', 'Suppliers'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ReviewRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function storeSupplierReview(): void {}

    #[OA\Get(
        path: '/api/nav/menus',
        operationId: 'navigationMenus',
        summary: 'Get navigation categories and menu entries',
        tags: ['Homepage'],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function menus(): void {}

    #[OA\Get(path: '/api/home/banners', operationId: 'homeBanners', summary: 'Get active homepage banners', tags: ['Homepage'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)])]
    public function banners(): void {}

    #[OA\Get(path: '/api/home/recommendations', operationId: 'homeRecommendations', summary: 'Get latest product recommendations', tags: ['Homepage'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)])]
    public function recommendations(): void {}

    #[OA\Get(path: '/api/home/featured-products', operationId: 'homeFeaturedProducts', summary: 'Get homepage featured products', tags: ['Homepage'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)])]
    public function homeFeaturedProducts(): void {}

    #[OA\Get(path: '/api/home/trending-products', operationId: 'homeTrendingProducts', summary: 'Get homepage trending products', tags: ['Homepage'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)])]
    public function homeTrendingProducts(): void {}

    #[OA\Get(path: '/api/home/verified-suppliers', operationId: 'homeVerifiedSuppliers', summary: 'Get verified active suppliers', tags: ['Homepage'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)])]
    public function verifiedSuppliers(): void {}

    #[OA\Get(path: '/api/home/trending-keywords', operationId: 'homeTrendingKeywords', summary: 'Get active trending keywords', tags: ['Homepage'], responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)])]
    public function trendingKeywords(): void {}

    #[OA\Get(
        path: '/api/search/products',
        operationId: 'searchProducts',
        summary: 'Search products',
        tags: ['Search'],
        parameters: [
            new OA\Parameter(name: 'q', in: 'query', required: true, schema: new OA\Schema(type: 'string'), example: 'Ceylon Tea'),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function searchProducts(): void {}

    #[OA\Get(
        path: '/api/search/suppliers',
        operationId: 'searchSuppliers',
        summary: 'Search suppliers',
        tags: ['Search'],
        parameters: [
            new OA\Parameter(name: 'q', in: 'query', required: true, schema: new OA\Schema(type: 'string'), example: 'Exporter'),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [new OA\Response(ref: '#/components/responses/Success', response: 200)],
    )]
    public function searchSuppliers(): void {}

    #[OA\Get(
        path: '/api/search/global',
        operationId: 'searchGlobal',
        summary: 'Search products, suppliers and categories',
        tags: ['Search'],
        parameters: [new OA\Parameter(name: 'q', in: 'query', required: true, schema: new OA\Schema(type: 'string'), example: 'Cinnamon')],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Global search results',
                content: new OA\JsonContent(
                    example: [
                        'success' => true,
                        'products' => [],
                        'suppliers' => [],
                        'categories' => [],
                    ],
                ),
            ),
        ],
    )]
    public function searchGlobal(): void {}
}
