<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

class TradeDocumentation
{
    #[OA\Post(
        path: '/api/rfqs',
        operationId: 'rfqsStore',
        summary: 'Create an RFQ with items',
        security: [['sanctum' => []]],
        tags: ['RFQs'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/RFQRequest'),
        responses: [
            new OA\Response(
                response: 201,
                description: 'RFQ created',
                content: new OA\JsonContent(example: ['success' => true, 'message' => 'RFQ created successfully.', 'rfq' => ['id' => 1, 'rfq_number' => 'RFQ-2026-000001', 'status' => 'open']]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createRfq(): void {}

    #[OA\Get(
        path: '/api/rfqs',
        operationId: 'rfqsIndex',
        summary: 'List authenticated buyer RFQs',
        security: [['sanctum' => []]],
        tags: ['RFQs'],
        parameters: [new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function rfqs(): void {}

    #[OA\Get(
        path: '/api/rfqs/{id}',
        operationId: 'rfqsShow',
        summary: 'Show an owned RFQ, items and quotation count',
        security: [['sanctum' => []]],
        tags: ['RFQs'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function rfq(): void {}

    #[OA\Put(
        path: '/api/rfqs/{id}',
        operationId: 'rfqsUpdate',
        summary: 'Update an owned open RFQ',
        security: [['sanctum' => []]],
        tags: ['RFQs'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/RFQRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateRfq(): void {}

    #[OA\Delete(
        path: '/api/rfqs/{id}',
        operationId: 'rfqsDelete',
        summary: 'Soft-delete an owned RFQ',
        security: [['sanctum' => []]],
        tags: ['RFQs'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function deleteRfq(): void {}

    #[OA\Get(
        path: '/api/supplier/rfqs',
        operationId: 'supplierRfqs',
        summary: 'List open RFQs visible to suppliers',
        security: [['sanctum' => []]],
        tags: ['RFQs'],
        parameters: [new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function supplierRfqs(): void {}

    #[OA\Post(
        path: '/api/rfqs/{id}/quotations',
        operationId: 'quotationsStore',
        summary: 'Submit a supplier quotation for an RFQ',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'), description: 'RFQ ID')],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/QuotationRequest'),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Quotation created',
                content: new OA\JsonContent(example: ['success' => true, 'quotation' => ['id' => 1, 'quotation_number' => 'QT-2026-000001', 'total_amount' => 5250, 'status' => 'pending']]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createQuotation(): void {}

    #[OA\Get(
        path: '/api/rfqs/{id}/quotations',
        operationId: 'rfqQuotations',
        summary: 'List quotations received for an owned RFQ',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'), description: 'RFQ ID'),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function rfqQuotations(): void {}

    #[OA\Get(
        path: '/api/supplier/quotations',
        operationId: 'supplierQuotations',
        summary: 'List quotations submitted by the authenticated supplier',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function supplierQuotations(): void {}

    #[OA\Get(
        path: '/api/quotations/{id}',
        operationId: 'quotationsShow',
        summary: 'Show quotation details, RFQ, supplier and items',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function quotation(): void {}

    #[OA\Put(
        path: '/api/quotations/{id}',
        operationId: 'quotationsUpdate',
        summary: 'Update a pending owned supplier quotation',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/QuotationRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateQuotation(): void {}

    #[OA\Post(
        path: '/api/quotations/{id}/accept',
        operationId: 'quotationsAccept',
        summary: 'Accept a quotation as the RFQ owner',
        description: 'Accepts the selected quotation, rejects competing quotations and completes the RFQ.',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function acceptQuotation(): void {}

    #[OA\Post(
        path: '/api/quotations/{id}/reject',
        operationId: 'quotationsReject',
        summary: 'Reject a quotation as the RFQ owner',
        security: [['sanctum' => []]],
        tags: ['Quotations'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function rejectQuotation(): void {}

    #[OA\Get(
        path: '/api/conversations',
        operationId: 'conversationsIndex',
        summary: 'List conversations by latest activity',
        security: [['sanctum' => []]],
        tags: ['Messaging'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Conversation list with latest message and unread count',
                content: new OA\JsonContent(example: ['success' => true, 'data' => [['id' => 1, 'unread_count' => 2, 'last_message_at' => '2026-06-24T10:00:00Z']]]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function conversations(): void {}

    #[OA\Post(
        path: '/api/conversations',
        operationId: 'conversationsStore',
        summary: 'Create or return an existing conversation',
        security: [['sanctum' => []]],
        tags: ['Messaging'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ConversationRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createConversation(): void {}

    #[OA\Get(
        path: '/api/conversations/{id}',
        operationId: 'conversationsShow',
        summary: 'Show a participant conversation and paginated messages',
        security: [['sanctum' => []]],
        tags: ['Messaging'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function conversation(): void {}

    #[OA\Post(
        path: '/api/messages',
        operationId: 'messagesStore',
        summary: 'Send a message in a participant conversation',
        security: [['sanctum' => []]],
        tags: ['Messaging'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/MessageRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function sendMessage(): void {}

    #[OA\Put(
        path: '/api/messages/{id}/read',
        operationId: 'messagesRead',
        summary: 'Mark a received message as read',
        security: [['sanctum' => []]],
        tags: ['Messaging'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function readMessage(): void {}

    #[OA\Post(
        path: '/api/orders',
        operationId: 'ordersStore',
        summary: 'Create an order from an accepted quotation',
        security: [['sanctum' => []]],
        tags: ['Orders'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/OrderRequest'),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Order created',
                content: new OA\JsonContent(example: ['success' => true, 'order' => ['id' => 1, 'order_number' => 'ORD-2026-000001', 'status' => 'pending']]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createOrder(): void {}

    #[OA\Get(
        path: '/api/orders',
        operationId: 'ordersIndex',
        summary: 'List role-scoped orders',
        security: [['sanctum' => []]],
        tags: ['Orders'],
        parameters: [
            new OA\Parameter(name: 'status', in: 'query', schema: new OA\Schema(type: 'string', enum: ['pending', 'confirmed', 'production', 'shipped', 'completed', 'cancelled'])),
            new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer', minimum: 1)),
        ],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
        ],
    )]
    public function orders(): void {}

    #[OA\Get(
        path: '/api/orders/{id}',
        operationId: 'ordersShow',
        summary: 'Show an accessible order with related records',
        security: [['sanctum' => []]],
        tags: ['Orders'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function order(): void {}

    #[OA\Put(
        path: '/api/orders/{id}/status',
        operationId: 'ordersUpdateStatus',
        summary: 'Move an order through an allowed status transition',
        security: [['sanctum' => []]],
        tags: ['Orders'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/OrderStatusRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateOrderStatus(): void {}
}
