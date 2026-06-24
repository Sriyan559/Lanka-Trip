<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

class SupplierProfileDocumentation
{
    #[OA\Put(
        path: '/api/supplier/company-profile',
        operationId: 'supplierCompanyProfileUpdate',
        summary: 'Update the authenticated supplier company profile',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/CompanyProfileRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateCompanyProfile(): void {}

    #[OA\Get(
        path: '/api/supplier/certificates',
        operationId: 'supplierCertificatesIndex',
        summary: 'List owned supplier certificates',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function certificates(): void {}

    #[OA\Post(
        path: '/api/supplier/certificates',
        operationId: 'supplierCertificatesStore',
        summary: 'Add a supplier certificate',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/CertificateRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createCertificate(): void {}

    #[OA\Delete(
        path: '/api/supplier/certificates/{id}',
        operationId: 'supplierCertificatesDelete',
        summary: 'Delete an owned supplier certificate',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/NotFound', response: 404),
        ],
    )]
    public function deleteCertificate(): void {}

    #[OA\Get(
        path: '/api/supplier/videos',
        operationId: 'supplierVideosIndex',
        summary: 'List owned supplier videos',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function videos(): void {}

    #[OA\Post(
        path: '/api/supplier/videos',
        operationId: 'supplierVideosStore',
        summary: 'Add a supplier YouTube video',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/VideoRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createVideo(): void {}

    #[OA\Delete(
        path: '/api/supplier/videos/{id}',
        operationId: 'supplierVideosDelete',
        summary: 'Delete an owned supplier video',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function deleteVideo(): void {}

    #[OA\Get(
        path: '/api/supplier/strengths',
        operationId: 'supplierStrengthsIndex',
        summary: 'List owned supplier strengths',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function strengths(): void {}

    #[OA\Post(
        path: '/api/supplier/strengths',
        operationId: 'supplierStrengthsStore',
        summary: 'Add a supplier strength',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/StrengthRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Created', response: 201),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function createStrength(): void {}

    #[OA\Delete(
        path: '/api/supplier/strengths/{id}',
        operationId: 'supplierStrengthsDelete',
        summary: 'Delete an owned supplier strength',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function deleteStrength(): void {}

    #[OA\Get(
        path: '/api/supplier/production-capacity',
        operationId: 'supplierProductionCapacityShow',
        summary: 'Get owned supplier production capacity',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Production capacity',
                content: new OA\JsonContent(example: ['success' => true, 'production_capacity' => ['monthly_output' => '50,000', 'output_unit' => 'Kg', 'production_lines' => 6]]),
            ),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
        ],
    )]
    public function productionCapacity(): void {}

    #[OA\Put(
        path: '/api/supplier/production-capacity',
        operationId: 'supplierProductionCapacityUpdate',
        summary: 'Create or update owned supplier production capacity',
        security: [['sanctum' => []]],
        tags: ['Supplier Company Profile'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/ProductionCapacityRequest'),
        responses: [
            new OA\Response(ref: '#/components/responses/Success', response: 200),
            new OA\Response(ref: '#/components/responses/Unauthorized', response: 401),
            new OA\Response(ref: '#/components/responses/Forbidden', response: 403),
            new OA\Response(ref: '#/components/responses/ValidationErrorResponse', response: 422),
        ],
    )]
    public function updateProductionCapacity(): void {}
}
