<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'EcomLanka REST API',
    description: 'Laravel 11 REST API for the EcomLanka Sri Lankan export marketplace. All protected endpoints use Laravel Sanctum bearer tokens and return JSON.',
)]
#[OA\Server(url: '/', description: 'Current application')]
#[OA\SecurityScheme(
    securityScheme: 'sanctum',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Sanctum token',
    description: 'Use the token returned by login or registration.',
)]
#[OA\Tag(name: 'Health', description: 'API availability')]
#[OA\Tag(name: 'Authentication', description: 'Registration, login and authenticated identity')]
#[OA\Tag(name: 'User', description: 'User profile and dashboard')]
#[OA\Tag(name: 'Categories', description: 'Public export categories')]
#[OA\Tag(name: 'Products', description: 'Public product catalogue')]
#[OA\Tag(name: 'Suppliers', description: 'Public supplier catalogue')]
#[OA\Tag(name: 'Cart', description: 'Authenticated inquiry basket')]
#[OA\Tag(name: 'Wishlist', description: 'Authenticated product wishlist')]
#[OA\Tag(name: 'RFQs', description: 'Buyer requests for quotation')]
#[OA\Tag(name: 'Quotations', description: 'Supplier quotations')]
#[OA\Tag(name: 'Messaging', description: 'Conversations and messages')]
#[OA\Tag(name: 'Homepage', description: 'Homepage and navigation content')]
#[OA\Tag(name: 'Search', description: 'Product, supplier and global search')]
#[OA\Tag(name: 'Uploads', description: 'Image and document uploads')]
#[OA\Tag(name: 'Notifications', description: 'User notifications')]
#[OA\Tag(name: 'Orders', description: 'Order management')]
#[OA\Tag(name: 'Admin', description: 'Administrator management APIs')]
#[OA\Tag(name: 'Supplier Company Profile', description: 'Supplier company details, certificates, videos and capacity')]
#[OA\Tag(name: 'Reviews', description: 'Product and supplier ratings')]
#[OA\Tag(name: 'Analytics', description: 'Administrator analytics dashboards')]
#[OA\Schema(
    schema: 'ApiSuccess',
    type: 'object',
    required: ['success'],
    properties: [
        new OA\Property(property: 'success', type: 'boolean', example: true),
        new OA\Property(property: 'message', type: 'string', nullable: true, example: 'Request completed successfully.'),
    ],
    additionalProperties: true,
    example: ['success' => true, 'message' => 'Request completed successfully.'],
)]
#[OA\Schema(
    schema: 'ValidationError',
    type: 'object',
    required: ['message', 'errors'],
    properties: [
        new OA\Property(property: 'message', type: 'string', example: 'The given data was invalid.'),
        new OA\Property(
            property: 'errors',
            type: 'object',
            additionalProperties: new OA\AdditionalProperties(
                type: 'array',
                items: new OA\Items(type: 'string'),
            ),
            example: ['email' => ['The email field is required.']],
        ),
    ],
)]
#[OA\Schema(
    schema: 'User',
    type: 'object',
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'name', type: 'string', example: 'Nimal Perera'),
        new OA\Property(property: 'email', type: 'string', format: 'email', example: 'buyer@example.com'),
        new OA\Property(property: 'role', type: 'string', enum: ['admin', 'buyer', 'supplier'], example: 'buyer'),
        new OA\Property(property: 'phone', type: 'string', nullable: true, example: '+94 77 123 4567'),
        new OA\Property(property: 'company_name', type: 'string', nullable: true, example: 'Lanka Imports'),
        new OA\Property(property: 'country', type: 'string', nullable: true, example: 'Sri Lanka'),
        new OA\Property(property: 'status', type: 'string', enum: ['active', 'inactive'], example: 'active'),
    ],
)]
#[OA\Schema(
    schema: 'Category',
    type: 'object',
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'name', type: 'string', example: 'Ceylon Tea'),
        new OA\Property(property: 'slug', type: 'string', example: 'ceylon-tea'),
        new OA\Property(property: 'description', type: 'string', nullable: true),
        new OA\Property(property: 'image', type: 'string', nullable: true),
        new OA\Property(property: 'parent_id', type: 'integer', nullable: true),
        new OA\Property(property: 'sort_order', type: 'integer', example: 1),
        new OA\Property(property: 'status', type: 'string', example: 'active'),
    ],
)]
#[OA\Schema(
    schema: 'Product',
    type: 'object',
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'name', type: 'string', example: 'Pure Ceylon Black Tea'),
        new OA\Property(property: 'slug', type: 'string', example: 'pure-ceylon-black-tea'),
        new OA\Property(property: 'description', type: 'string', nullable: true),
        new OA\Property(property: 'price', type: 'number', format: 'float', example: 5.25),
        new OA\Property(property: 'moq', type: 'number', format: 'float', example: 100),
        new OA\Property(property: 'unit', type: 'string', example: 'kg'),
        new OA\Property(property: 'featured_image', type: 'string', nullable: true),
        new OA\Property(property: 'category', ref: '#/components/schemas/Category'),
        new OA\Property(property: 'views_count', type: 'integer', example: 1500),
        new OA\Property(property: 'average_rating', type: 'number', format: 'float', example: 4.8),
        new OA\Property(property: 'reviews_count', type: 'integer', example: 24),
    ],
    additionalProperties: true,
)]
#[OA\Schema(
    schema: 'Supplier',
    type: 'object',
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'company_name', type: 'string', example: 'Lanka Tea Exports'),
        new OA\Property(property: 'slug', type: 'string', example: 'lanka-tea-exports'),
        new OA\Property(property: 'country', type: 'string', example: 'Sri Lanka'),
        new OA\Property(property: 'business_type', type: 'string', nullable: true, example: 'Manufacturer / Exporter'),
        new OA\Property(property: 'verification_status', type: 'string', enum: ['pending', 'verified', 'rejected']),
        new OA\Property(property: 'rating', type: 'number', format: 'float', example: 4.9),
        new OA\Property(property: 'reviews_count', type: 'integer', example: 35),
        new OA\Property(property: 'products_count', type: 'integer', example: 12),
    ],
    additionalProperties: true,
)]
#[OA\Schema(
    schema: 'Pagination',
    type: 'object',
    properties: [
        new OA\Property(property: 'current_page', type: 'integer', example: 1),
        new OA\Property(property: 'per_page', type: 'integer', example: 20),
        new OA\Property(property: 'total', type: 'integer', example: 42),
        new OA\Property(property: 'last_page', type: 'integer', example: 3),
    ],
)]
#[OA\Response(
    response: 'Success',
    description: 'Successful JSON response',
    content: new OA\JsonContent(ref: '#/components/schemas/ApiSuccess'),
)]
#[OA\Response(
    response: 'Created',
    description: 'Resource created',
    content: new OA\JsonContent(
        type: 'object',
        additionalProperties: true,
        example: ['success' => true, 'message' => 'Resource created successfully.'],
    ),
)]
#[OA\Response(
    response: 'Unauthorized',
    description: 'Missing or invalid Sanctum token',
    content: new OA\JsonContent(
        type: 'object',
        example: ['success' => false, 'message' => 'Unauthorized'],
    ),
)]
#[OA\Response(
    response: 'Forbidden',
    description: 'Authenticated user does not have permission',
    content: new OA\JsonContent(
        type: 'object',
        example: ['success' => false, 'message' => 'Forbidden'],
    ),
)]
#[OA\Response(
    response: 'NotFound',
    description: 'Resource not found',
    content: new OA\JsonContent(
        type: 'object',
        example: ['success' => false, 'message' => 'Resource not found'],
    ),
)]
#[OA\Response(
    response: 'ValidationErrorResponse',
    description: 'Validation failed',
    content: new OA\JsonContent(ref: '#/components/schemas/ValidationError'),
)]
#[OA\RequestBody(
    request: 'RegisterRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['name', 'email', 'password', 'password_confirmation'],
        properties: [
            new OA\Property(property: 'name', type: 'string', example: 'Nimal Perera'),
            new OA\Property(property: 'email', type: 'string', format: 'email', example: 'nimal@example.com'),
            new OA\Property(property: 'password', type: 'string', format: 'password', example: 'Password123!'),
            new OA\Property(property: 'password_confirmation', type: 'string', format: 'password', example: 'Password123!'),
            new OA\Property(property: 'role', type: 'string', enum: ['buyer', 'supplier'], example: 'buyer'),
            new OA\Property(property: 'phone', type: 'string', example: '+94 77 123 4567'),
            new OA\Property(property: 'company_name', type: 'string', example: 'Lanka Imports'),
            new OA\Property(property: 'country', type: 'string', example: 'Sri Lanka'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'LoginRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['email', 'password'],
        properties: [
            new OA\Property(property: 'email', type: 'string', format: 'email', example: 'buyer@ecomlanka.lk'),
            new OA\Property(property: 'password', type: 'string', format: 'password', example: 'Password123!'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'ProfileRequest',
    required: true,
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'name', type: 'string', example: 'Nimal Perera'),
            new OA\Property(property: 'phone', type: 'string', nullable: true, example: '+94 77 123 4567'),
            new OA\Property(property: 'company_name', type: 'string', nullable: true, example: 'Lanka Imports'),
            new OA\Property(property: 'country', type: 'string', nullable: true, example: 'Sri Lanka'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'CartItemRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['product_id', 'quantity'],
        properties: [
            new OA\Property(property: 'product_id', type: 'integer', example: 1),
            new OA\Property(property: 'quantity', type: 'number', minimum: 1, example: 10),
            new OA\Property(property: 'note', type: 'string', nullable: true, example: 'Need FOB Colombo price'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'CartUpdateRequest',
    required: true,
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'quantity', type: 'number', minimum: 1, example: 20),
            new OA\Property(property: 'note', type: 'string', nullable: true, example: 'Include export packaging'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'ProductIdRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['product_id'],
        properties: [new OA\Property(property: 'product_id', type: 'integer', example: 1)],
    ),
)]
#[OA\RequestBody(
    request: 'RFQRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['title', 'destination_country', 'items'],
        properties: [
            new OA\Property(property: 'title', type: 'string', example: 'Need Ceylon Tea Suppliers'),
            new OA\Property(property: 'description', type: 'string', example: 'Export to Dubai'),
            new OA\Property(property: 'destination_country', type: 'string', example: 'UAE'),
            new OA\Property(property: 'expected_delivery_date', type: 'string', format: 'date', example: '2026-08-01'),
            new OA\Property(
                property: 'items',
                type: 'array',
                items: new OA\Items(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'product_id', type: 'integer', nullable: true, example: 1),
                        new OA\Property(property: 'product_name', type: 'string', example: 'Pure Ceylon Black Tea'),
                        new OA\Property(property: 'quantity', type: 'number', example: 1000),
                        new OA\Property(property: 'unit', type: 'string', example: 'kg'),
                        new OA\Property(property: 'specifications', type: 'string', nullable: true, example: 'Premium grade'),
                    ],
                ),
            ),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'QuotationRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['currency', 'items'],
        properties: [
            new OA\Property(property: 'currency', type: 'string', example: 'USD'),
            new OA\Property(property: 'lead_time', type: 'string', example: '15 days'),
            new OA\Property(property: 'payment_terms', type: 'string', example: '30% advance'),
            new OA\Property(property: 'shipping_terms', type: 'string', example: 'FOB Colombo'),
            new OA\Property(property: 'remarks', type: 'string', nullable: true, example: 'High quality products'),
            new OA\Property(
                property: 'items',
                type: 'array',
                items: new OA\Items(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'rfq_item_id', type: 'integer', nullable: true, example: 1),
                        new OA\Property(property: 'product_name', type: 'string', example: 'Pure Ceylon Black Tea'),
                        new OA\Property(property: 'quantity', type: 'number', example: 1000),
                        new OA\Property(property: 'unit_price', type: 'number', example: 5.25),
                    ],
                ),
            ),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'ConversationRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['supplier_id'],
        properties: [
            new OA\Property(property: 'supplier_id', type: 'integer', example: 1),
            new OA\Property(property: 'rfq_id', type: 'integer', nullable: true, example: 5),
            new OA\Property(property: 'quotation_id', type: 'integer', nullable: true, example: 2),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'MessageRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['conversation_id', 'message'],
        properties: [
            new OA\Property(property: 'conversation_id', type: 'integer', example: 1),
            new OA\Property(property: 'message', type: 'string', example: 'Please send FOB Colombo price.'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'OrderRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['quotation_id'],
        properties: [new OA\Property(property: 'quotation_id', type: 'integer', example: 1)],
    ),
)]
#[OA\RequestBody(
    request: 'OrderStatusRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['status'],
        properties: [
            new OA\Property(
                property: 'status',
                type: 'string',
                enum: ['confirmed', 'production', 'shipped', 'completed', 'cancelled'],
                example: 'confirmed',
            ),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'ReviewRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['rating'],
        properties: [
            new OA\Property(property: 'rating', type: 'integer', minimum: 1, maximum: 5, example: 5),
            new OA\Property(property: 'title', type: 'string', nullable: true, example: 'Excellent Quality'),
            new OA\Property(property: 'review', type: 'string', nullable: true, example: 'Very good products and packaging.'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'StatusRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['status'],
        properties: [
            new OA\Property(property: 'status', type: 'string', enum: ['active', 'inactive'], example: 'active'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'VerificationRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['verification_status'],
        properties: [
            new OA\Property(
                property: 'verification_status',
                type: 'string',
                enum: ['pending', 'verified', 'rejected'],
                example: 'verified',
            ),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'CompanyProfileRequest',
    required: true,
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'company_name', type: 'string', example: 'Lanka Tea Exports'),
            new OA\Property(property: 'description', type: 'string', nullable: true),
            new OA\Property(property: 'country', type: 'string', example: 'Sri Lanka'),
            new OA\Property(property: 'city', type: 'string', nullable: true, example: 'Colombo'),
            new OA\Property(property: 'address', type: 'string', nullable: true),
            new OA\Property(property: 'phone', type: 'string', nullable: true),
            new OA\Property(property: 'email', type: 'string', format: 'email'),
            new OA\Property(property: 'website', type: 'string', format: 'uri', nullable: true),
            new OA\Property(property: 'business_type', type: 'string', nullable: true, example: 'Manufacturer / Exporter'),
            new OA\Property(property: 'established_year', type: 'integer', nullable: true, example: 2005),
            new OA\Property(property: 'employee_count', type: 'integer', nullable: true, example: 80),
            new OA\Property(property: 'factory_size', type: 'string', nullable: true, example: '12,000 sqft'),
            new OA\Property(property: 'annual_revenue', type: 'number', nullable: true, example: 2500000),
            new OA\Property(property: 'export_percentage', type: 'number', nullable: true, example: 85),
            new OA\Property(property: 'main_markets', type: 'array', items: new OA\Items(type: 'string'), example: ['UAE', 'Qatar']),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'CertificateRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['certificate_name'],
        properties: [
            new OA\Property(property: 'certificate_name', type: 'string', example: 'ISO 9001'),
            new OA\Property(property: 'certificate_number', type: 'string', nullable: true, example: 'ISO-2026-001'),
            new OA\Property(property: 'issuing_authority', type: 'string', nullable: true, example: 'ISO'),
            new OA\Property(property: 'issue_date', type: 'string', format: 'date', nullable: true),
            new OA\Property(property: 'expiry_date', type: 'string', format: 'date', nullable: true),
            new OA\Property(property: 'file_url', type: 'string', format: 'uri', nullable: true),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'VideoRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['title', 'video_url'],
        properties: [
            new OA\Property(property: 'title', type: 'string', example: 'Factory Tour'),
            new OA\Property(property: 'video_url', type: 'string', format: 'uri', example: 'https://www.youtube.com/watch?v=example'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'StrengthRequest',
    required: true,
    content: new OA\JsonContent(
        required: ['strength_name'],
        properties: [new OA\Property(property: 'strength_name', type: 'string', example: 'Custom Packaging')],
    ),
)]
#[OA\RequestBody(
    request: 'ProductionCapacityRequest',
    required: true,
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'monthly_output', type: 'string', nullable: true, example: '50,000'),
            new OA\Property(property: 'output_unit', type: 'string', nullable: true, example: 'Kg'),
            new OA\Property(property: 'production_lines', type: 'integer', nullable: true, example: 6),
            new OA\Property(property: 'lead_time', type: 'string', nullable: true, example: '20 days'),
            new OA\Property(property: 'factory_size', type: 'string', nullable: true, example: '40,000 sqft'),
        ],
    ),
)]
#[OA\RequestBody(
    request: 'ImageUploadRequest',
    required: true,
    content: new OA\MediaType(
        mediaType: 'multipart/form-data',
        schema: new OA\Schema(
            required: ['file'],
            properties: [
                new OA\Property(property: 'file', type: 'string', format: 'binary', description: 'JPG, JPEG, PNG or WEBP, maximum 5MB.'),
                new OA\Property(property: 'category', type: 'string', nullable: true, example: 'product_image'),
            ],
        ),
    ),
)]
#[OA\RequestBody(
    request: 'DocumentUploadRequest',
    required: true,
    content: new OA\MediaType(
        mediaType: 'multipart/form-data',
        schema: new OA\Schema(
            required: ['file'],
            properties: [
                new OA\Property(property: 'file', type: 'string', format: 'binary', description: 'PDF, DOC, DOCX or XLSX, maximum 20MB.'),
                new OA\Property(property: 'category', type: 'string', nullable: true, example: 'document'),
            ],
        ),
    ),
)]
class OpenApiSpec {}
