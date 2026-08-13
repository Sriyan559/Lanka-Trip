<?php

namespace App\Repositories\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FinanceGovernanceRepository
{
    public function capabilities(): array
    {
        return ['dataJobs' => Schema::hasTable('admin_data_jobs'), 'audit' => Schema::hasTable('activity_log'), 'reconciliation' => false];
    }

    public function jobs(array $filters): LengthAwarePaginator
    {
        $query = DB::table('admin_data_jobs')->leftJoin('users', 'users.id', '=', 'admin_data_jobs.initiated_by')
            ->select('admin_data_jobs.*', 'users.name as initiated_by_name');
        if ($filters['search'] ?? null) $query->where(fn ($q) => $q->where('job_code', 'like', '%'.$filters['search'].'%')->orWhere('title', 'like', '%'.$filters['search'].'%'));
        foreach (['domain', 'job_type', 'status'] as $field) if ($filters[$field] ?? null) $query->where('admin_data_jobs.'.$field, $filters[$field]);
        if ($filters['from'] ?? null) $query->whereDate('admin_data_jobs.created_at', '>=', $filters['from']);
        if ($filters['to'] ?? null) $query->whereDate('admin_data_jobs.created_at', '<=', $filters['to']);
        return $query->orderBy('admin_data_jobs.'.($filters['sort'] ?? 'created_at'), $filters['direction'] ?? 'desc')->paginate($filters['per_page'] ?? 20);
    }

    public function job(string $uuid): ?object
    {
        return DB::table('admin_data_jobs')->leftJoin('users', 'users.id', '=', 'admin_data_jobs.initiated_by')
            ->where('admin_data_jobs.uuid', $uuid)->select('admin_data_jobs.*', 'users.name as initiated_by_name')->first();
    }

    public function audit(int $limit = 20): array
    {
        if (! Schema::hasTable('activity_log')) return [];
        return DB::table('activity_log')->leftJoin('users', 'users.id', '=', 'activity_log.causer_id')
            ->where(fn ($q) => $q->where('activity_log.log_name', 'like', '%finance%')->orWhere('activity_log.log_name', 'like', '%report%')->orWhere('activity_log.description', 'like', '%export%')->orWhere('activity_log.description', 'like', '%import%'))
            ->latest('activity_log.created_at')->limit($limit)->get(['activity_log.id','activity_log.log_name','activity_log.description','activity_log.event','activity_log.subject_id','activity_log.created_at','users.name as actor'])->all();
    }
}
