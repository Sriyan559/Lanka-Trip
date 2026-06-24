<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\SupplierResource;
use App\Http\Resources\UserResource;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        [$user, $supplier] = DB::transaction(function () use ($request): array {
            $user = User::create([
                ...$request->safe()->only([
                    'name',
                    'email',
                    'password',
                    'role',
                    'phone',
                    'company_name',
                    'country',
                ]),
                'status' => 'active',
            ]);

            $supplier = null;

            if ($user->role === 'supplier') {
                $supplier = $user->supplier()->create([
                    'company_name' => $user->company_name,
                    'slug' => $this->uniqueSupplierSlug($user->company_name),
                    'country' => $user->country ?: 'Sri Lanka',
                    'phone' => $user->phone,
                    'email' => $user->email,
                    'verification_status' => 'pending',
                    'is_featured' => false,
                    'rating' => 0,
                    'status' => 'active',
                ]);
            }

            return [$user, $supplier];
        });

        $data = [
            'token' => $user->createToken('ecomlanka-web')->plainTextToken,
            'user' => UserResource::make($user)->resolve($request),
        ];

        if ($supplier) {
            $data['supplier'] = SupplierResource::make($supplier)->resolve($request);
        }

        return $this->successResponse(
            $data,
            'Account created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->first();

        if (! $user || ! Hash::check($request->validated('password'), $user->password)) {
            Log::channel('security')->warning('Failed login attempt', [
                'email' => $request->validated('email'),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return $this->errorResponse(
                'Invalid email or password.',
                Response::HTTP_UNAUTHORIZED,
            );
        }

        if ($user->status !== 'active') {
            return $this->errorResponse(
                'Your account is inactive.',
                Response::HTTP_FORBIDDEN,
            );
        }

        activity('authentication')
            ->causedBy($user)
            ->performedOn($user)
            ->event('login')
            ->log('User logged in');

        return $this->successResponse([
            'token' => $user->createToken('ecomlanka-web')->plainTextToken,
            'user' => UserResource::make($user)->resolve($request),
        ], 'Logged in successfully.');
    }

    public function logout(Request $request): JsonResponse
    {
        activity('authentication')
            ->causedBy($request->user())
            ->performedOn($request->user())
            ->event('logout')
            ->log('User logged out');

        $request->user()->currentAccessToken()?->delete();

        return $this->successResponse(message: 'Logged out successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        return $this->successResponse([
            'user' => UserResource::make($request->user())->resolve($request),
        ]);
    }

    private function uniqueSupplierSlug(string $companyName): string
    {
        $baseSlug = Str::slug($companyName) ?: 'supplier';
        $slug = $baseSlug;
        $suffix = 2;

        while (Supplier::query()->where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
