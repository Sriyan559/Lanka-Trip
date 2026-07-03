# Database Handoff Guide

This guide explains how to set up, run, verify, and safely work with the Made in Sri Lanka B2B marketplace backend database.

## PostgreSQL Setup Overview

The backend uses PostgreSQL for local and integrated database development. The Laravel project is configured through environment variables and should be run from:

```bash
/Users/techromz/Made-In-SL/ecom-in-sri-lanka/backend
```

Do not edit or commit `.env` changes into Git. Use `.env.example` as the shared template and keep local credentials only in `.env`.

## Local Database Setup Steps

1. Install PostgreSQL locally.
2. Start the PostgreSQL service.
3. Create a local database:

```bash
createdb made_in_sl
```

4. Copy the example environment file:

```bash
cp .env.example .env
```

5. Update only your local `.env` database credentials.
6. Install PHP dependencies:

```bash
composer install
```

7. Generate the app key:

```bash
php artisan key:generate
```

8. Rebuild and seed the local database:

```bash
php artisan migrate:fresh --seed
```

## .env.example Database Configuration

The shared example file should stay PostgreSQL based:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=made_in_sl
DB_USERNAME=your_local_postgres_user
DB_PASSWORD=your_local_postgres_password
```

Use your own username and password in `.env`. Never commit `.env`.

## Migration Workflow

Create migrations with Artisan:

```bash
php artisan make:migration create_example_table
php artisan make:migration add_example_fields_to_products_table
```

Rules for this project:

- Use Laravel migrations only.
- Use lowercase plural table names.
- Use `id` primary keys.
- Prefer `uuid` columns for business entities.
- Use string status fields instead of database enums for new enterprise tables.
- Use `jsonb` for flexible PostgreSQL metadata, payloads, and settings.
- Add timestamps to business tables.
- Add soft deletes for business records where recovery matters.
- Add foreign keys where safe.
- Add indexes for common lookup fields such as `user_id`, `supplier_id`, `product_id`, `status`, and `created_at`.
- Do not recreate existing tables in new migrations.

## Seeder Workflow

Seeders are registered in `database/seeders/DatabaseSeeder.php`.

Run all seeders with:

```bash
php artisan db:seed
```

Rebuild the full local database with:

```bash
php artisan migrate:fresh --seed
```

Seeder rules:

- Keep seeders idempotent where possible.
- Use stable natural keys such as `code`, `slug`, `name`, `rule_key`, or `setting_key`.
- Seed configuration and lookup data before sample business data.
- Do not seed secrets, production credentials, or private data.

## Git Branch and PR Workflow

1. Start from the integration branch:

```bash
git checkout integration
git pull
```

2. Create a feature branch:

```bash
git checkout -b feature/database-your-task-name
```

3. Make migration and seeder changes.
4. Run validation:

```bash
php artisan migrate:fresh --seed
php artisan migrate:status
```

5. Confirm `.env` is not staged:

```bash
git status --short
```

6. Commit and push:

```bash
git add database/migrations database/seeders docs/database
git commit -m "Add database module changes"
git push origin feature/database-your-task-name
```

7. Open a Pull Request into integration.

## How Interns Should Run The Database

Interns should run the backend database locally only. The normal command is:

```bash
php artisan migrate:fresh --seed
```

This command deletes all local tables and rebuilds them. It is useful for local development, onboarding, and validation.

Never run `php artisan migrate:fresh` on production, staging, shared QA, or any database containing real data.

## How To Verify Tables

Use Laravel migration status:

```bash
php artisan migrate:status
```

Confirm the database driver:

```bash
php artisan tinker --execute="echo DB::connection()->getDriverName();"
```

Expected result:

```text
pgsql
```

Optional PostgreSQL table check:

```bash
psql made_in_sl -c "\dt"
```

## Common Errors And Fixes

`SQLSTATE[08006] connection refused`

- PostgreSQL is not running.
- Start PostgreSQL and rerun the command.

`database does not exist`

- Create the local database with `createdb made_in_sl`.
- Confirm `DB_DATABASE` in `.env`.

`password authentication failed`

- Update `DB_USERNAME` and `DB_PASSWORD` in local `.env`.
- Do not update `.env.example` with private credentials.

`relation already exists`

- A migration may be recreating an existing table or using a duplicate PostgreSQL index name.
- Use `Schema::hasTable`, `Schema::hasColumn`, or unique explicit index names where needed.

`class not found` for a seeder

- Confirm the seeder file name matches the class name.
- Confirm it is registered correctly in `DatabaseSeeder.php`.
- Run `composer dump-autoload` if class discovery is stale.

## Safety Warnings

- Do not commit `.env`.
- Do not manually create SQL tables outside Laravel migrations.
- Do not delete existing migrations to fix local issues.
- Do not run `php artisan migrate:fresh` on production or shared data environments.
- Do not use database enums for new enterprise status fields; use strings.
- Keep frontend files out of database-only branches.
