<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        $counts = match ($user->role) {
            'supplier' => [
                'products_count' => $user->supplier?->products()->active()->count() ?? 0,
                'quotations_count' => $user->supplier?->quotations()->count() ?? 0,
                'orders_count' => $this->countOwnedRowsForId(
                    ['orders'],
                    $user->supplier?->id ?? 0,
                    ['supplier_id'],
                ),
                'inquiries_count' => $this->countOwnedRowsForId(
                    ['inquiries'],
                    $user->supplier?->id ?? $user->id,
                    ['supplier_id'],
                ),
                'messages_count' => $this->countOwnedRows(
                    ['messages'],
                    $user,
                    ['supplier_id', 'recipient_id', 'receiver_id', 'sender_id', 'user_id'],
                ),
            ],
            'admin' => [
                'users_count' => User::count(),
                'products_count' => $this->countRows(['products']),
                'suppliers_count' => User::where('role', 'supplier')->count(),
                'rfqs_count' => RFQ::count(),
                'orders_count' => $this->countRows(['orders']),
            ],
            default => [
                'orders_count' => $this->countOwnedRows(['orders'], $user, ['buyer_id', 'user_id']),
                'rfqs_count' => $user->rfqs()->count(),
                'quotations_received_count' => Quotation::query()
                    ->whereHas('rfq', fn ($query) => $query->where('user_id', $user->id))
                    ->count(),
                'wishlist_count' => $this->countOwnedRows(
                    ['wishlist_items', 'wishlists'],
                    $user,
                    ['user_id', 'buyer_id'],
                ),
                'inquiries_count' => $this->countOwnedRows(
                    ['inquiries'],
                    $user,
                    ['buyer_id', 'requester_id', 'user_id'],
                ),
                'messages_count' => $this->countOwnedRows(
                    ['messages'],
                    $user,
                    ['receiver_id', 'sender_id', 'user_id'],
                ),
            ],
        };

        return $this->successResponse([
            'role' => $user->role,
            ...$counts,
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        return $this->successResponse([
            'user' => UserResource::make($request->user())->resolve($request),
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->update($request->safe()->only([
            'name',
            'phone',
            'company_name',
            'country',
        ]));

        return $this->successResponse([
            'user' => UserResource::make($user->refresh())->resolve($request),
        ], 'Profile updated successfully.');
    }

    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! Hash::check($request->validated('current_password'), $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => $request->validated('password'),
        ]);

        return $this->successResponse(message: 'Password updated successfully.');
    }

    private function countRows(array $tables): int
    {
        foreach ($tables as $table) {
            if (Schema::hasTable($table)) {
                return DB::table($table)->count();
            }
        }

        return 0;
    }

    private function countOwnedRows(array $tables, User $user, array $ownerColumns): int
    {
        return $this->countOwnedRowsForId($tables, $user->id, $ownerColumns);
    }

    private function countOwnedRowsForId(array $tables, int $ownerId, array $ownerColumns): int
    {
        foreach ($tables as $table) {
            if (! Schema::hasTable($table)) {
                continue;
            }

            $availableColumns = array_values(array_filter(
                $ownerColumns,
                static fn (string $column): bool => Schema::hasColumn($table, $column),
            ));

            if ($availableColumns === []) {
                continue;
            }

            return DB::table($table)
                ->where(function (Builder $query) use ($availableColumns, $ownerId): void {
                    foreach ($availableColumns as $index => $column) {
                        $index === 0
                            ? $query->where($column, $ownerId)
                            : $query->orWhere($column, $ownerId);
                    }
                })
                ->count();
        }

        return 0;
    }
}
