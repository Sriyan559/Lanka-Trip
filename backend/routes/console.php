<?php

use App\Models\CatalogueExportSchedule;
use App\Models\User;
use App\Services\Admin\CatalogueDataOperationsService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('backup:run')
    ->dailyAt('02:00')
    ->withoutOverlapping();

Schedule::call(function (CatalogueDataOperationsService $operations): void {
    CatalogueExportSchedule::where('enabled', true)->where('next_run_at', '<=', now())->orderBy('id')->each(function (CatalogueExportSchedule $schedule) use ($operations): void {
        $user = User::find($schedule->user_id);
        if (! $user) {
            $schedule->update(['enabled' => false]);

            return;
        }
        $operations->createExport(['data_type' => $schedule->data_type], $user, 'schedule-'.$schedule->id.'-'.$schedule->next_run_at->timestamp);
        $next = match ($schedule->frequency) {
            'weekly' => $schedule->next_run_at->addWeek(), 'monthly' => $schedule->next_run_at->addMonth(), default => $schedule->next_run_at->addDay()
        };
        $schedule->update(['last_run_at' => now(), 'next_run_at' => $next]);
    });
})->name('catalogue-export-schedules')->everyMinute()->withoutOverlapping();
