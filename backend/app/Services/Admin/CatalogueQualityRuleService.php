<?php

namespace App\Services\Admin;

use App\Models\CatalogueDuplicateCandidate;
use App\Models\CatalogueQualityIssue;
use App\Models\CatalogueQualityValidationRun;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Str;

class CatalogueQualityRuleService
{
    public const COMPLETENESS_FIELDS = ['name', 'sku', 'description', 'category', 'supplier', 'media', 'unit', 'price'];

    public function execute(CatalogueQualityValidationRun $run): void
    {
        $started = now();
        $run->update(['status' => 'processing', 'progress' => 1, 'started_at' => $started, 'failure_message' => null]);
        $total = Product::count();
        $scanned = $created = $updated = 0;

        Product::query()->with(['beautyProfile:id,product_id,compliance_status,ingredients,warnings', 'variants:id,product_id,sku,barcode'])->withCount('images')->chunkById(200, function ($products) use ($run, $total, &$scanned, &$created, &$updated): void {
            foreach ($products as $product) {
                foreach ($this->rulesFor($product) as $rule) {
                    $fingerprint = hash('sha256', $rule['key'].'|'.$product->id);
                    $issue = CatalogueQualityIssue::firstOrNew(['fingerprint' => $fingerprint]);
                    $wasNew = ! $issue->exists;
                    $issue->fill([
                        'uuid' => $issue->uuid ?: (string) Str::uuid(), 'product_id' => $product->id,
                        'validation_run_id' => $run->id, 'source' => 'validation', 'issue_type' => $rule['type'],
                        'rule_key' => $rule['key'], 'title' => $rule['title'], 'description' => $rule['description'],
                        'evidence' => $rule['evidence'], 'severity' => $rule['severity'],
                        'status' => $issue->exists && ! in_array($issue->status, ['resolved', 'dismissed'], true) ? $issue->status : 'new',
                        'resolved_at' => null, 'resolved_by' => null, 'resolution_reason' => null, 'last_detected_at' => now(),
                    ])->save();
                    $wasNew ? $created++ : $updated++;
                }
                $scanned++;
            }
            $run->update(['products_scanned' => $scanned, 'issues_created' => $created, 'issues_updated' => $updated, 'progress' => min(80, 5 + (int) floor(75 * $scanned / max(1, $total)))]);
        });

        [$duplicateCreated, $duplicateUpdated] = $this->detectDuplicates($run);
        $created += $duplicateCreated;
        $updated += $duplicateUpdated;
        $resolved = CatalogueQualityIssue::where('source', 'validation')->whereNotIn('status', ['resolved', 'dismissed'])->where(fn ($query) => $query->whereNull('validation_run_id')->orWhere('validation_run_id', '!=', $run->id))->update(['status' => 'resolved', 'resolved_at' => now(), 'resolution_reason' => 'Underlying catalogue condition no longer detected.', 'updated_at' => now()]);
        $run->update(['status' => 'completed', 'progress' => 100, 'products_scanned' => $scanned, 'issues_created' => $created, 'issues_updated' => $updated, 'issues_resolved' => $resolved, 'completed_at' => now()]);
        activity('catalogue_quality')->performedOn($run)->withProperties(['products_scanned' => $scanned, 'issues_created' => $created, 'issues_updated' => $updated, 'issues_resolved' => $resolved])->log('catalogue.quality_validation_completed');
    }

    public function completeness(Product $product): int
    {
        $variantSku = $product->relationLoaded('variants') ? $product->variants->first()?->sku : $product->variants()->value('sku');
        $media = $product->featured_image || ($product->images_count ?? $product->images()->count());
        $values = [$product->name, $product->sku ?: $variantSku, $product->description, $product->category_id, $product->supplier_id, $media ? 1 : null, $product->unit, $product->price];

        return (int) round(100 * collect($values)->filter(fn ($value) => $value !== null && $value !== '')->count() / count(self::COMPLETENESS_FIELDS));
    }

    private function rulesFor(Product $product): array
    {
        $rules = [];
        $complete = $this->completeness($product);
        $media = (bool) ($product->featured_image || $product->images_count);
        $compliance = $product->beautyProfile?->compliance_status;
        $add = function (string $key, string $type, string $title, string $description, string $severity, string $evidence = '') use (&$rules): void {
            $rules[] = compact('key', 'type', 'title', 'description', 'severity', 'evidence');
        };
        if (! $product->sku && ! $product->variants->first()?->sku) {
            $add('required_sku', 'incomplete_record', 'Missing Product Master SKU', 'Neither the Product Master nor its first variant has an SKU.', 'high', 'sku is null');
        }
        if (! $product->description) {
            $add('required_description', 'incomplete_record', 'Missing product description', 'The Product Master description is required for catalogue completeness.', 'medium', 'description is null');
        }
        if (! $product->supplier_id) {
            $add('required_supplier', 'incomplete_record', 'Missing supplier relationship', 'No supplier is linked to this Product Master.', 'medium', 'supplier_id is null');
        }
        if (! $media) {
            $add('required_media', 'missing_mandatory_media', 'Missing mandatory media', 'No featured image or Product Image record is linked.', 'high', 'featured_image and product_images are empty');
        }
        if ($compliance === 'non_compliant') {
            $add('compliance_status', 'validation_failure', 'Product compliance validation failed', 'The Product Beauty Profile is marked non-compliant.', 'critical', 'compliance_status=non_compliant');
        }
        $blockers = [];
        if ($complete < 75) {
            $blockers[] = "completeness={$complete}%";
        }
        if (! $media) {
            $blockers[] = 'mandatory media missing';
        }
        if ($compliance === 'non_compliant') {
            $blockers[] = 'non-compliant beauty profile';
        }
        if (in_array($product->approval_status, ['rejected', 'blocked'], true)) {
            $blockers[] = "approval_status={$product->approval_status}";
        }
        if ($blockers) {
            $add('publication_readiness', 'publication_blocker', 'Publication readiness blocked', 'The Product Master does not meet the existing publication-readiness conditions.', 'high', implode('; ', $blockers));
        }

        return $rules;
    }

    private function detectDuplicates(CatalogueQualityValidationRun $run): array
    {
        $created = $updated = 0;
        $groups = Product::query()->select(['id', 'name', 'category_id'])->get()->groupBy(fn ($product) => $product->category_id.'|'.Str::lower(preg_replace('/[^a-z0-9]+/i', '', $product->name)))->filter(fn ($group) => $group->count() > 1);
        foreach ($groups as $group) {
            $items = $group->sortBy('id')->values();
            for ($index = 1; $index < $items->count(); $index++) {
                [$created, $updated] = $this->recordCandidate($items[0]->id, $items[$index]->id, 'normalized_name', 95, $run, $created, $updated);
            }
        }
        $barcodeGroups = ProductVariant::query()->whereNotNull('barcode')->where('barcode', '!=', '')->get(['product_id', 'barcode'])->groupBy('barcode')->filter(fn ($group) => $group->pluck('product_id')->unique()->count() > 1);
        foreach ($barcodeGroups as $group) {
            $ids = $group->pluck('product_id')->unique()->sort()->values();
            for ($index = 1; $index < $ids->count(); $index++) {
                [$created, $updated] = $this->recordCandidate((int) $ids[0], (int) $ids[$index], 'variant_barcode', 100, $run, $created, $updated);
            }
        }

        return [$created, $updated];
    }

    private function recordCandidate(int $a, int $b, string $signal, int $confidence, CatalogueQualityValidationRun $run, int $created, int $updated): array
    {
        [$a, $b] = $a < $b ? [$a, $b] : [$b, $a];
        $fingerprint = hash('sha256', "$signal|$a|$b");
        $candidate = CatalogueDuplicateCandidate::firstOrNew(['fingerprint' => $fingerprint]);
        $candidateNew = ! $candidate->exists;
        $candidate->fill(['uuid' => $candidate->uuid ?: (string) Str::uuid(), 'product_a_id' => $a, 'product_b_id' => $b, 'signal' => $signal, 'confidence_score' => $confidence, 'status' => $candidate->status === 'merged' ? 'merged' : 'open'])->save();
        $issue = CatalogueQualityIssue::firstOrNew(['fingerprint' => hash('sha256', "duplicate|$fingerprint")]);
        $issueNew = ! $issue->exists;
        $issue->fill(['uuid' => $issue->uuid ?: (string) Str::uuid(), 'product_id' => $b, 'duplicate_candidate_id' => $candidate->id, 'validation_run_id' => $run->id, 'source' => 'validation', 'issue_type' => 'duplicate_candidate', 'rule_key' => $signal, 'title' => 'Possible duplicate Product Master', 'description' => 'Two Product Masters share a canonical duplicate signal.', 'evidence' => Str::headline($signal), 'severity' => $confidence === 100 ? 'critical' : 'high', 'status' => $candidate->status === 'merged' ? 'resolved' : ($issue->status ?: 'new'), 'last_detected_at' => now()])->save();

        return [$created + ($candidateNew || $issueNew ? 1 : 0), $updated + ($candidateNew || $issueNew ? 0 : 1)];
    }
}
