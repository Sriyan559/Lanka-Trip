<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse
{
    protected function successResponse(
        array $data = [],
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        return response()->json(array_filter([
            'success' => true,
            'message' => $message,
            ...$data,
        ], static fn (mixed $value): bool => $value !== null), $status);
    }

    protected function errorResponse(
        string $message,
        int $status = Response::HTTP_BAD_REQUEST,
        array $errors = [],
    ): JsonResponse {
        $message = match ($status) {
            Response::HTTP_UNAUTHORIZED => 'Unauthorized',
            Response::HTTP_FORBIDDEN => 'Forbidden',
            Response::HTTP_NOT_FOUND => 'Resource not found',
            default => $message,
        };

        return response()->json(array_filter([
            'success' => false,
            'message' => $message,
            'errors' => $errors ?: null,
        ], static fn (mixed $value): bool => $value !== null), $status);
    }
}
