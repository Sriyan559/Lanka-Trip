<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

class AccountDocumentation
{
    #[OA\Post(
        path: '/api/auth/register',
        operationId: 'authRegister',
        summary: 'Register a buyer or supplier account',
        tags: ['Authentication'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/RegisterRequest'),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Account and bearer token created',
                content: new OA\JsonContent(
                    example: [
                        'success' => true,
                        'message' => 'Registration successful.',
                        'user' => ['id' => 1, 'name' => 'Nimal Perera', 'role' => 'buyer'],
                        'token' => '1|sanctum-token',
                    ],
                ),
            ),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function register(): void {}

    #[OA\Post(
        path: '/api/auth/login',
        operationId: 'authLogin',
        summary: 'Login and create a Sanctum bearer token',
        tags: ['Authentication'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/LoginRequest'),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Authenticated',
                content: new OA\JsonContent(
                    example: [
                        'success' => true,
                        'message' => 'Login successful.',
                        'user' => ['id' => 1, 'email' => 'buyer@ecomlanka.lk', 'role' => 'buyer'],
                        'token' => '1|sanctum-token',
                    ],
                ),
            ),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function login(): void {}

    #[OA\Post(
        path: '/api/auth/logout',
        operationId: 'authLogout',
        summary: 'Revoke the current bearer token',
        security: [['sanctum' => []]],
        tags: ['Authentication'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function logout(): void {}

    #[OA\Get(
        path: '/api/auth/me',
        operationId: 'authMe',
        summary: 'Get the authenticated user',
        security: [['sanctum' => []]],
        tags: ['Authentication'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Authenticated user',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'success', type: 'boolean', example: true),
                        new OA\Property(property: 'user', ref: '#/components/schemas/User'),
                    ],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function me(): void {}

    #[OA\Get(
        path: '/api/user/dashboard',
        operationId: 'userDashboard',
        summary: 'Get role-specific dashboard counts',
        security: [['sanctum' => []]],
        tags: ['User'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Dashboard counts',
                content: new OA\JsonContent(
                    example: [
                        'success' => true,
                        'orders_count' => 3,
                        'rfqs_count' => 2,
                        'wishlist_count' => 5,
                        'messages_count' => 1,
                    ],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function dashboard(): void {}

    #[OA\Get(
        path: '/api/user/profile',
        operationId: 'userProfile',
        summary: 'Get authenticated user profile',
        security: [['sanctum' => []]],
        tags: ['User'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function profile(): void {}

    #[OA\Put(
        path: '/api/user/profile',
        operationId: 'userProfileUpdate',
        summary: 'Update allowed profile fields',
        security: [['sanctum' => []]],
        tags: ['User'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ProfileRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateProfile(): void {}

    #[OA\Get(
        path: '/api/cart',
        operationId: 'cartShow',
        summary: 'Get the authenticated user inquiry basket',
        security: [['sanctum' => []]],
        tags: ['Cart'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Inquiry basket',
                content: new OA\JsonContent(
                    example: ['success' => true, 'items' => [], 'items_count' => 0],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function cart(): void {}

    #[OA\Post(
        path: '/api/cart/items',
        operationId: 'cartItemsStore',
        summary: 'Add a product to the inquiry basket',
        security: [['sanctum' => []]],
        tags: ['Cart'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/CartItemRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function addCartItem(): void {}

    #[OA\Put(
        path: '/api/cart/items/{id}',
        operationId: 'cartItemsUpdate',
        summary: 'Update basket item quantity or note',
        security: [['sanctum' => []]],
        tags: ['Cart'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/CartUpdateRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateCartItem(): void {}

    #[OA\Delete(
        path: '/api/cart/items/{id}',
        operationId: 'cartItemsDelete',
        summary: 'Remove one basket item',
        security: [['sanctum' => []]],
        tags: ['Cart'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function deleteCartItem(): void {}

    #[OA\Delete(
        path: '/api/cart',
        operationId: 'cartClear',
        summary: 'Clear the inquiry basket',
        security: [['sanctum' => []]],
        tags: ['Cart'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function clearCart(): void {}

    #[OA\Get(
        path: '/api/wishlist',
        operationId: 'wishlistIndex',
        summary: 'List wishlist products',
        security: [['sanctum' => []]],
        tags: ['Wishlist'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Wishlist',
                content: new OA\JsonContent(example: ['success' => true, 'items' => [], 'items_count' => 0]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function wishlist(): void {}

    #[OA\Post(
        path: '/api/wishlist',
        operationId: 'wishlistStore',
        summary: 'Add a product to the wishlist',
        security: [['sanctum' => []]],
        tags: ['Wishlist'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ProductIdRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function addWishlist(): void {}

    #[OA\Delete(
        path: '/api/wishlist/{productId}',
        operationId: 'wishlistDelete',
        summary: 'Remove a product from the wishlist',
        security: [['sanctum' => []]],
        tags: ['Wishlist'],
        parameters: [new OA\Parameter(name: 'productId', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function deleteWishlist(): void {}

    #[OA\Post(
        path: '/api/uploads/image',
        operationId: 'uploadsImage',
        summary: 'Upload an image to public storage',
        security: [['sanctum' => []]],
        tags: ['Uploads'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ImageUploadRequest'),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Image uploaded',
                content: new OA\JsonContent(
                    example: ['success' => true, 'upload' => ['id' => 1, 'url' => 'http://localhost/storage/uploads/image.webp', 'path' => 'uploads/image.webp', 'type' => 'image']],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function uploadImage(): void {}

    #[OA\Post(
        path: '/api/uploads/document',
        operationId: 'uploadsDocument',
        summary: 'Upload a document to public storage',
        security: [['sanctum' => []]],
        tags: ['Uploads'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/DocumentUploadRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function uploadDocument(): void {}

    #[OA\Delete(
        path: '/api/uploads/{id}',
        operationId: 'uploadsDelete',
        summary: 'Delete an owned upload and physical file',
        security: [['sanctum' => []]],
        tags: ['Uploads'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function deleteUpload(): void {}

    #[OA\Get(
        path: '/api/notifications',
        operationId: 'notificationsIndex',
        summary: 'List paginated notifications and unread count',
        security: [['sanctum' => []]],
        tags: ['Notifications'],
        parameters: [new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1))],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Notifications',
                content: new OA\JsonContent(
                    example: ['success' => true, 'notifications' => [], 'unread_count' => 0, 'current_page' => 1],
                ),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function notifications(): void {}

    #[OA\Put(
        path: '/api/notifications/{id}/read',
        operationId: 'notificationsRead',
        summary: 'Mark one owned notification as read',
        security: [['sanctum' => []]],
        tags: ['Notifications'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function readNotification(): void {}

    #[OA\Put(
        path: '/api/notifications/read-all',
        operationId: 'notificationsReadAll',
        summary: 'Mark all owned notifications as read',
        security: [['sanctum' => []]],
        tags: ['Notifications'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function readAllNotifications(): void {}
}
