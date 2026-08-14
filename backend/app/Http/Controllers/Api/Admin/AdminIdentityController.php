<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Admin\AdminIdentityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminIdentityController extends Controller
{
    public function __construct(
        protected AdminIdentityService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'search', 'role', 'state', 'status', 'tenant', 'businessUnit',
            'privilege', 'authMethod', 'mfaStatus', 'reviewStatus', 'riskLevel'
        ]);

        $perPage = (int) $request->input('per_page', 20);
        $paginator = $this->service->listUsers($filters, $perPage);

        return $this->successResponse([
            'users' => $paginator->items(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function scorecard(Request $request): JsonResponse
    {
        $data = $this->service->getScorecardAndStats();

        return $this->successResponse($data);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'username' => 'nullable|string|max:100|unique:users,username',
            'role' => 'nullable|string|in:super_admin,admin,buyer,supplier,moderator,manager',
            'business_unit' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8',
            'phone' => 'nullable|string|max:50',
            'status' => 'nullable|string|in:active,suspended,locked,pending',
        ]);

        $user = $this->service->createUser($validated, $request->user());

        return $this->successResponse([
            'user' => $user,
        ], 'User created successfully.', Response::HTTP_CREATED);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $user = User::query()->findOrFail($id);

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
                'role' => $user->role,
                'company_name' => $user->company_name,
                'phone' => $user->phone,
                'country' => $user->country,
                'status' => $user->status ?: 'active',
                'created_at' => $user->created_at?->toIso8601String(),
                'last_login_at' => $user->last_login_at,
            ],
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::query()->findOrFail($id);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $user->id,
            'username' => 'nullable|string|max:100|unique:users,username,' . $user->id,
            'role' => 'nullable|string|in:super_admin,admin,buyer,supplier,moderator,manager',
            'business_unit' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'status' => 'nullable|string|in:active,suspended,locked,pending',
        ]);

        $updated = $this->service->updateUser($user, $validated, $request->user());

        return $this->successResponse([
            'user' => $updated,
        ], 'User details updated successfully.');
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $user = User::query()->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:active,suspended,locked,pending',
            'reason' => 'nullable|string|max:500',
        ]);

        $updated = $this->service->updateStatus($user, $validated['status'], $validated['reason'] ?? null, $request->user());

        return $this->successResponse([
            'user' => $updated,
        ], "User status updated to {$validated['status']} successfully.");
    }

    public function resetPassword(Request $request, int $id): JsonResponse
    {
        $user = User::query()->findOrFail($id);
        $tempPassword = $this->service->resetPassword($user, $request->input('password'), $request->user());

        return $this->successResponse([
            'temporary_password' => $tempPassword,
        ], 'Password reset generated successfully.');
    }

    public function export(Request $request)
    {
        $filters = $request->only(['search', 'role', 'state', 'status', 'tenant']);
        $csv = $this->service->exportUsersCsv($filters);

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="users_identity_registry_' . date('Ymd_His') . '.csv"',
        ]);
    }
}
