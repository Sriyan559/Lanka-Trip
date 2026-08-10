<?php

namespace App\Jobs;

use App\Models\CatalogueDataJob;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Throwable;

class ProcessCatalogueDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $timeout = 300;

    public array $backoff = [10, 30, 60];

    public function __construct(public readonly int $catalogueDataJobId) {}

    public function handle(): void
    {
        $job = CatalogueDataJob::findOrFail($this->catalogueDataJobId);
        if ($job->status === 'cancelled') {
            return;
        }
        $job->update(['status' => 'processing', 'current_stage' => 'file_inspection', 'started_at' => $job->started_at ?? now(), 'failure_message' => null]);
        $job->operation_type === 'import' ? $this->importProducts($job) : $this->exportProducts($job);
    }

    private function importProducts(CatalogueDataJob $job): void
    {
        if ($job->data_type !== 'products') {
            throw new \RuntimeException('Only Product Master CSV imports are supported by the current catalogue domain.');
        }
        $path = Storage::disk('local')->path($job->input_path);
        $handle = fopen($path, 'rb');
        if (! $handle) {
            throw new \RuntimeException('The stored import file cannot be opened.');
        }
        $rawHeaders = fgetcsv($handle) ?: [];
        $headers = array_map(fn ($value) => Str::snake(trim((string) $value)), $rawHeaders);
        $required = ['sku', 'name', 'category_id', 'price', 'unit'];
        if (count($headers) !== count(array_unique($headers)) || array_diff($required, $headers)) {
            fclose($handle);
            $this->recordError($job, 1, null, 'invalid_headers', 'Required unique columns: '.implode(', ', $required).'.');
            $job->update(['status' => 'failed', 'validation_status' => 'failed', 'current_stage' => 'schema_validation', 'failed_records' => 1, 'failure_message' => 'Import schema validation failed.', 'completed_at' => now()]);

            return;
        }

        $job->update(['validation_status' => 'validating', 'current_stage' => 'business_validation', 'progress' => 10]);
        $rows = [];
        $line = 1;
        $errors = [];
        while (($values = fgetcsv($handle)) !== false) {
            $line++;
            if (count($values) !== count($headers)) {
                $errors[] = [$line, null, 'malformed_row', 'Column count does not match the header.', null];

                continue;
            }
            $row = array_combine($headers, $values);
            if (! mb_check_encoding(implode('', $values), 'UTF-8')) {
                $errors[] = [$line, null, 'invalid_encoding', 'Row is not valid UTF-8.', null];

                continue;
            }
            $validator = validator($row, ['sku' => ['required', 'string', 'max:255'], 'name' => ['required', 'string', 'max:255'], 'category_id' => ['required', 'integer', 'exists:categories,id'], 'price' => ['required', 'numeric', 'min:0'], 'unit' => ['required', 'string', 'max:50'], 'status' => ['nullable', Rule::in(['active', 'inactive'])], 'approval_status' => ['nullable', 'string', 'max:30']]);
            if ($validator->fails()) {
                foreach ($validator->errors()->messages() as $field => $messages) {
                    foreach ($messages as $message) {
                        $errors[] = [$line, $field, 'domain_validation', $message, mb_substr((string) ($row[$field] ?? ''), 0, 500)];
                    }
                }

                continue;
            }
            $rows[] = $validator->validated();
        }
        fclose($handle);
        $job->update(['total_records' => count($rows) + count(array_unique(array_column($errors, 0))), 'failed_records' => count(array_unique(array_column($errors, 0)))]);
        foreach (array_chunk($errors, 500) as $chunk) {
            DB::table('catalogue_data_job_errors')->insert(array_map(fn ($e) => ['catalogue_data_job_id' => $job->id, 'row_number' => $e[0], 'field' => $e[1], 'error_code' => $e[2], 'severity' => 'error', 'message' => $e[3], 'reference_value' => $e[4], 'created_at' => now()], $chunk));
        }
        if ($errors) {
            $job->update(['status' => 'failed', 'validation_status' => 'failed', 'current_stage' => 'validation', 'progress' => 100, 'failure_message' => 'Validation failed; no catalogue records were changed.', 'completed_at' => now()]);

            return;
        }

        $job->update(['validation_status' => 'passed', 'current_stage' => 'database_commit', 'progress' => 35]);
        $processed = 0;
        $successful = 0;
        foreach (array_chunk($rows, 500) as $chunk) {
            if (CatalogueDataJob::whereKey($job->id)->value('status') === 'cancelled') {
                return;
            }
            DB::transaction(function () use ($chunk, &$successful): void {
                foreach ($chunk as $row) {
                    $existing = DB::table('products')->where('sku', $row['sku'])->whereNull('deleted_at')->first();
                    $payload = ['category_id' => (int) $row['category_id'], 'name' => $row['name'], 'slug' => $existing?->slug ?: Str::slug($row['name']).'-'.substr(hash('sha256', $row['sku']), 0, 8), 'price' => $row['price'], 'unit' => $row['unit'], 'status' => $row['status'] ?? 'active', 'approval_status' => $row['approval_status'] ?? ($existing?->approval_status ?? 'draft'), 'updated_at' => now()];
                    $existing ? DB::table('products')->where('id', $existing->id)->update($payload) : DB::table('products')->insert($payload + ['sku' => $row['sku'], 'moq' => 1, 'created_at' => now()]);
                    $successful++;
                }
            });
            $processed += count($chunk);
            $job->update(['processed_records' => $processed, 'successful_records' => $successful, 'progress' => 35 + (int) floor(60 * $processed / max(1, count($rows)))]);
        }
        $job->update(['status' => 'completed', 'current_stage' => 'completed', 'progress' => 100, 'processed_records' => $processed, 'successful_records' => $successful, 'completed_at' => now()]);
        activity('catalogue_data_operations')->causedBy($job->user)->performedOn($job)->withProperties(['records' => $successful])->log('catalogue.import_completed');
    }

    private function exportProducts(CatalogueDataJob $job): void
    {
        if ($job->data_type !== 'products') {
            throw new \RuntimeException('Only Product Master exports are supported by the current catalogue domain.');
        }
        $relative = 'catalogue-operations/exports/'.$job->uuid.'.csv';
        Storage::disk('local')->makeDirectory('catalogue-operations/exports');
        $handle = fopen(Storage::disk('local')->path($relative), 'wb');
        fputcsv($handle, ['id', 'sku', 'name', 'category_id', 'supplier_id', 'price', 'unit', 'status', 'approval_status', 'created_at', 'updated_at']);
        $total = DB::table('products')->whereNull('deleted_at')->count();
        $processed = 0;
        DB::table('products')->whereNull('deleted_at')->orderBy('id')->lazyById(500)->each(function ($row) use ($handle, $job, $total, &$processed): void {
            $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'".$value : $value;
            fputcsv($handle, array_map($safe, [$row->id, $row->sku, $row->name, $row->category_id, $row->supplier_id, $row->price, $row->unit, $row->status, $row->approval_status, $row->created_at, $row->updated_at]));
            $processed++;
            if ($processed % 500 === 0) {
                $job->update(['processed_records' => $processed, 'successful_records' => $processed, 'total_records' => $total, 'progress' => (int) floor(95 * $processed / max(1, $total)), 'current_stage' => 'file_generation']);
            }
        });
        fclose($handle);
        $job->update(['output_path' => $relative, 'original_name' => 'product-masters-'.now()->format('Ymd-His').'.csv', 'mime_type' => 'text/csv', 'file_size' => Storage::disk('local')->size($relative), 'total_records' => $total, 'processed_records' => $processed, 'successful_records' => $processed, 'status' => 'completed', 'validation_status' => 'passed', 'current_stage' => 'completed', 'progress' => 100, 'completed_at' => now()]);
        activity('catalogue_data_operations')->causedBy($job->user)->performedOn($job)->withProperties(['records' => $processed])->log('catalogue.export_completed');
    }

    private function recordError(CatalogueDataJob $job, ?int $row, ?string $field, string $code, string $message): void
    {
        $job->errors()->create(['row_number' => $row, 'field' => $field, 'error_code' => $code, 'severity' => 'error', 'message' => $message]);
    }

    public function failed(Throwable $exception): void
    {
        report($exception);
        CatalogueDataJob::whereKey($this->catalogueDataJobId)->where('status', '!=', 'cancelled')->update(['status' => 'failed', 'current_stage' => 'failed', 'failure_message' => 'Processing failed. Review the protected server log for technical details.', 'completed_at' => now()]);
    }
}
