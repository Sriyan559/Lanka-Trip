<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AdminCustomerCreateController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'country' => $data['country'] ?? null,
            'role' => 'buyer',
        ]);

        // Format as CustomerRecord (reuse same shape as directory)
        $record = [
            'id' => 'CUST-' . str_pad($user->id, 6, '0', STR_PAD_LEFT),
            'name' => $user->name,
            'avatarInitials' => strtoupper(substr($user->name, 0, 2)),
            'customerType' => 'Individual',
            'email' => $user->email,
            'phone' => $user->phone ?? '—',
            'region' => $user->country ?? '—',
            'preferredChannel' => 'Website',
            'verificationStatus' => 'Unverified',
            'profileCompleteness' => 50,
            'lifecycleSegment' => 'New',
            'loyaltyTier' => 'Standard',
            'totalOrders' => 0,
            'lifetimeValue' => 0,
            'lastOrderDate' => '—',
            'returnsCount' => 0,
            'openCasesCount' => 0,
            'consentStatus' => 'Pending',
            'riskLevel' => 'Low',
            'restrictionStatus' => 'None',
            'owner' => 'System',
            'lastActivity' => $user->updated_at->format('M d, Y h:i A'),
            'updatedAt' => $user->updated_at->toIso8601String(),
        ];

        return response()->json(['customer' => $record], 201);
    }
}
