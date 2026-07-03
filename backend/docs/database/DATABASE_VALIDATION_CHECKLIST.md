# Database Validation Checklist

Use this checklist before opening or approving database Pull Requests.

## Migration Status

- [ ] `php artisan migrate:fresh --seed` passes locally.
- [ ] `php artisan migrate:status` shows all migrations as `Ran`.
- [ ] New migrations do not recreate existing tables.
- [ ] Existing migrations were not deleted.
- [ ] Migration names are timestamped and descriptive.

## Seeder Success

- [ ] `DatabaseSeeder.php` registers required seeders in the correct order.
- [ ] Seeders complete successfully during `php artisan migrate:fresh --seed`.
- [ ] Seeders are idempotent where possible.
- [ ] Seeders do not include private credentials or production secrets.

## PostgreSQL Driver

- [ ] `.env.example` uses `DB_CONNECTION=pgsql`.
- [ ] Local `.env` uses `DB_CONNECTION=pgsql`.
- [ ] `php artisan tinker --execute="echo DB::connection()->getDriverName();"` returns `pgsql`.
- [ ] PostgreSQL-compatible types are used.

## Table Naming

- [ ] Table names are lowercase plural names.
- [ ] Pivot table names match established project conventions.
- [ ] Business tables use `id` primary keys.
- [ ] UUIDs are added where useful for public or business records.

## Foreign Keys

- [ ] Foreign keys are added where safe.
- [ ] Delete behavior is intentional: `cascadeOnDelete`, `nullOnDelete`, or `restrictOnDelete`.
- [ ] Foreign key targets exist before the migration runs.
- [ ] Polymorphic relationships are used where a single table supports multiple subject types.

## Indexes

- [ ] Common lookup columns are indexed.
- [ ] Status fields are indexed where used for filtering.
- [ ] Foreign key columns used in filters are indexed.
- [ ] Composite indexes support expected query patterns.
- [ ] PostgreSQL index names are unique across the schema.

## Soft Deletes

- [ ] Business records that may need recovery use `softDeletes`.
- [ ] Existing tables get `deleted_at` only through alter migrations.
- [ ] Soft deletes are not added to pure log tables unless there is a business reason.

## JSONB Fields

- [ ] Flexible metadata uses `jsonb`.
- [ ] Payload, rules, settings, scoring, audit, and event context fields use `jsonb` where appropriate.
- [ ] JSONB fields do not replace important relational foreign keys.

## Environment Safety

- [ ] `.env` is not staged.
- [ ] `.env` is not committed.
- [ ] `.env.example` contains only safe example values.
- [ ] No production credentials are present in migrations, seeders, or docs.

## PR Review

- [ ] Pull Request targets `integration`.
- [ ] PR description lists migrations and seeders added.
- [ ] PR description includes validation results.
- [ ] Reviewer confirms no frontend files changed for database-only work.
- [ ] Reviewer confirms no manual SQL table creation is required.
- [ ] Reviewer confirms `migrate:fresh` is not recommended for production.
