<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NotificationChannelSeeder extends Seeder
{
    public function run(): void
    {
        $channels = [
            ['name' => 'Database', 'channel_type' => 'database', 'description' => 'In-app notification center delivery.'],
            ['name' => 'Email', 'channel_type' => 'email', 'description' => 'Transactional email notification delivery.'],
            ['name' => 'SMS', 'channel_type' => 'sms', 'description' => 'Short message delivery for urgent updates.'],
            ['name' => 'Push', 'channel_type' => 'push', 'description' => 'Mobile and browser push notification delivery.'],
        ];

        foreach ($channels as $channel) {
            $slug = Str::slug($channel['name']);
            $existing = DB::table('notification_channels')->where('slug', $slug)->first();
            $payload = [
                ...$channel,
                'slug' => $slug,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('notification_channels')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('notification_channels')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
