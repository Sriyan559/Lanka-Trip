<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NotificationTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $channelIds = DB::table('notification_channels')->pluck('id', 'slug');
        $templates = [
            [
                'name' => 'New RFQ Published',
                'channel' => 'database',
                'notification_type' => 'new_rfq',
                'subject' => 'New RFQ available',
                'body_template' => 'A new RFQ {{rfq_number}} is available for matching suppliers.',
            ],
            [
                'name' => 'New Quotation Received',
                'channel' => 'database',
                'notification_type' => 'new_quotation',
                'subject' => 'New quotation received',
                'body_template' => '{{supplier_name}} submitted quotation {{quotation_number}}.',
            ],
            [
                'name' => 'Order Status Changed',
                'channel' => 'email',
                'notification_type' => 'order_status_changed',
                'subject' => 'Order {{order_number}} updated',
                'body_template' => 'Order {{order_number}} changed to {{status}}.',
            ],
            [
                'name' => 'Shipment Status Changed',
                'channel' => 'email',
                'notification_type' => 'shipment_status_changed',
                'subject' => 'Shipment {{shipment_number}} updated',
                'body_template' => 'Shipment {{shipment_number}} changed to {{status}}.',
            ],
            [
                'name' => 'New Message Received',
                'channel' => 'push',
                'notification_type' => 'new_message',
                'subject' => 'New message',
                'body_template' => '{{sender_name}} sent you a message.',
            ],
        ];

        foreach ($templates as $template) {
            $slug = Str::slug($template['name']);
            $existing = DB::table('notification_templates')->where('slug', $slug)->first();
            $payload = [
                'name' => $template['name'],
                'slug' => $slug,
                'notification_channel_id' => $channelIds[$template['channel']] ?? null,
                'notification_type' => $template['notification_type'],
                'subject' => $template['subject'],
                'body_template' => $template['body_template'],
                'variables' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('notification_templates')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('notification_templates')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
