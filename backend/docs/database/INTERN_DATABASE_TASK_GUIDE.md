# Intern Database Task Guide

This guide gives interns the standard steps for setting up and contributing to the backend database.

## Clone The Repository

```bash
git clone <repository-url>
cd ecom-in-sri-lanka/backend
```

If the repository is already cloned, go to:

```bash
cd /Users/techromz/Made-In-SL/ecom-in-sri-lanka/backend
```

## Checkout Integration

```bash
git checkout integration
git pull origin integration
```

## Create A Local PostgreSQL Database

Install PostgreSQL, start the service, then create the database:

```bash
createdb made_in_sl
```

If your PostgreSQL user needs an explicit owner:

```bash
createdb made_in_sl -O your_postgres_user
```

## Copy `.env.example` To `.env`

```bash
cp .env.example .env
```

Never commit `.env`.

## Update Database Username And Password

Open `.env` and set:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=made_in_sl
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Use your own local credentials.

## Install Composer Dependencies

```bash
composer install
```

## Generate The Laravel App Key

```bash
php artisan key:generate
```

## Run The Database

For local development:

```bash
php artisan migrate:fresh --seed
```

This deletes and rebuilds the local database. Do not run it on production or shared databases.

Verify migration status:

```bash
php artisan migrate:status
```

Verify PostgreSQL is active:

```bash
php artisan tinker --execute="echo DB::connection()->getDriverName();"
```

Expected output:

```text
pgsql
```

## Create A New Migration

Use Artisan:

```bash
php artisan make:migration create_example_table
php artisan make:migration add_example_fields_to_products_table
```

Migration rules:

- Do not recreate existing tables.
- Do not delete existing migrations.
- Use Laravel schema builder, not manual SQL.
- Use PostgreSQL-compatible column types.
- Use `jsonb` for flexible metadata.
- Use string status fields for new enterprise statuses.
- Add indexes and foreign keys where safe.

## Create A Feature Branch

Start from integration:

```bash
git checkout integration
git pull origin integration
git checkout -b feature/your-database-task
```

## Validate Your Work

Run:

```bash
php artisan migrate:fresh --seed
php artisan migrate:status
```

Check the changed files:

```bash
git status --short
```

Make sure `.env` is not listed.

## Commit And Push

Stage only the relevant files:

```bash
git add database/migrations database/seeders docs/database
```

Commit:

```bash
git commit -m "Add database task changes"
```

Push:

```bash
git push origin feature/your-database-task
```

## Create A Pull Request

1. Open the repository in GitHub or the Git provider.
2. Create a Pull Request from your feature branch into `integration`.
3. Include the migration files, seeders, and validation result.
4. Mention that `php artisan migrate:fresh --seed` and `php artisan migrate:status` passed.
5. Request review from the backend lead.

## Intern Safety Rules

- Never commit `.env`.
- Never change production database settings.
- Never run `migrate:fresh` on production.
- Never manually create tables with SQL.
- Never modify frontend files for database-only tasks.
- Ask for review before changing existing migrations or shared seeders.
