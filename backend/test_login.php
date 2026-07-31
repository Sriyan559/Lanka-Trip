<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$email = 'thiyunuwan567@gmail.com';
$password = 'Dharana#1234';

$user = App\Models\User::where('email', $email)->first();
if (!$user) {
    echo "User not found!\n";
} else {
    echo "User found. Status: {$user->status}, Role: {$user->role}\n";
    if (Illuminate\Support\Facades\Hash::check($password, $user->password)) {
        echo "Hash matches!\n";
    } else {
        echo "Hash DOES NOT match!\n";
        echo "Stored Hash: " . $user->password . "\n";
    }
}
