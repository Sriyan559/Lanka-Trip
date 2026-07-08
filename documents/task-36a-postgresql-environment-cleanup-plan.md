# Task 36A: PostgreSQL Environment Cleanup Plan

Date: 2026-07-08  
Branch: `feature/sl-beauty-postgres-environment-cleanup`

## Summary

SL Beauty Platform is already using PostgreSQL in local example configuration and database handoff documentation, but several production and Docker files still describe or provision MySQL. This plan defines a safe, staged cleanup to make the backend PostgreSQL-first while avoiding application logic, migration, seeder, and frontend changes.

No configuration files are changed in this task. This is a planning document only.

## Files Reviewed

| File | Finding |
| --- | --- |
| `backend/.env.example` | Uses `DB_CONNECTION=pgsql`, `DB_PORT=5432`, but still uses legacy `DB_DATABASE=made_in_sl` and app name/token prefixes from EcomLanka. |
| `backend/.env.production.example` | Still MySQL-first with `DB_CONNECTION=mysql`, `DB_HOST=mysql`, `DB_PORT=3306`, `DB_DATABASE=ecomlanka`, and `DB_ROOT_PASSWORD`. |
| `backend/config/database.php` | Supports `pgsql`, but default fallback is `mysql`; MySQL and MariaDB connections still exist. |
| `backend/docker-compose.yml` | Provisions a `mysql` service and makes app/queue/horizon depend on MySQL. |
| `backend/Dockerfile` | Installs `mysql-client` and `pdo_mysql`; does not install PostgreSQL client/dev packages or `pdo_pgsql`. |
| `backend/README.md` | Describes EcomLanka, MySQL 8+, `pdo_mysql`, MySQL credentials, and a `mysql` Docker service. |
| `backend/composer.json` | No database-specific PHP package requirement; no direct MySQL/PostgreSQL constraint. |
| `backend/phpunit.xml` | Tests use in-memory SQLite via `DB_CONNECTION=sqlite`; no MySQL dependency in test config. |

## Current PostgreSQL Configuration

PostgreSQL is already established in these places:

| Area | Current state |
| --- | --- |
| Local env example | `backend/.env.example` uses `DB_CONNECTION=pgsql`, `DB_HOST=127.0.0.1`, `DB_PORT=5432`. |
| Local real env | Local `.env` was previously observed using `DB_CONNECTION=pgsql`, `DB_DATABASE=sl_beauty_platform`. Do not commit or modify `.env`. |
| Laravel config | `backend/config/database.php` defines a `pgsql` connection. |
| Database docs | `backend/docs/database/*` references PostgreSQL setup and `DB_CONNECTION=pgsql`. |
| Task history | Prior verification reports confirm local SL Beauty database should be PostgreSQL database `sl_beauty_platform`, not `made_in_sl`. |

## Remaining MySQL References

| File | MySQL reference | Cleanup need |
| --- | --- | --- |
| `backend/.env.production.example` | `DB_CONNECTION=mysql`, `DB_HOST=mysql`, `DB_PORT=3306`, `DB_DATABASE=ecomlanka`, `DB_ROOT_PASSWORD` | Convert production example to PostgreSQL and SL Beauty naming. |
| `backend/config/database.php` | Default fallback `env('DB_CONNECTION', 'mysql')` | Change fallback to `pgsql`; optionally keep MySQL/MariaDB connection arrays for compatibility. |
| `backend/docker-compose.yml` | `mysql` service, `mysql-data` volume, MySQL healthcheck, app/queue/horizon depend on MySQL | Replace with PostgreSQL service, volume, healthcheck, and dependency names. |
| `backend/Dockerfile` | `mysql-client`, `pdo_mysql` | Replace or supplement with PostgreSQL client/dev dependencies and `pdo_pgsql`. |
| `backend/README.md` | MySQL requirement, `pdo_mysql`, MySQL credentials, `mysql` service | Update to PostgreSQL-first SL Beauty backend documentation. |
| `backend/storage/api-docs/api-docs.json` | Example says database driver `mysql` | Generated artifact; do not hand-edit unless docs generation strategy is approved. |
| `backend/app/OpenApi/AdminAnalyticsDocumentation.php` | Example response says database driver `mysql` | Not part of environment cleanup unless API docs content cleanup is explicitly approved. |
| `backend/config/backup.php` | MySQL example snippets and fallback behavior | Review later; not required for first PostgreSQL environment cleanup unless backups are tested. |

## Files That Should Be Changed In Implementation

### `backend/.env.example`

Recommended updates:

- Keep `DB_CONNECTION=pgsql`.
- Change `DB_DATABASE=made_in_sl` to `DB_DATABASE=sl_beauty_platform`.
- Consider changing `APP_NAME=EcomLanka` to `APP_NAME="SL Beauty Platform"`.
- Consider changing `SANCTUM_TOKEN_PREFIX=ecomlanka_` to `SANCTUM_TOKEN_PREFIX=sl_beauty_`.
- Consider changing `HORIZON_PREFIX=ecomlanka_horizon:` to `HORIZON_PREFIX=sl_beauty_horizon:`.
- Consider changing `BACKUP_NAME=EcomLanka` to `BACKUP_NAME="SL Beauty Platform"`.

### `backend/.env.production.example`

Recommended PostgreSQL-first production values:

```text
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=sl_beauty_platform
DB_USERNAME=sl_beauty
DB_PASSWORD=change-me
```

Remove production-only MySQL root variable:

```text
DB_ROOT_PASSWORD=change-root-password
```

Optional PostgreSQL variables if Docker Compose uses them:

```text
POSTGRES_DB=sl_beauty_platform
POSTGRES_USER=sl_beauty
POSTGRES_PASSWORD=change-me
```

### `backend/config/database.php`

Recommended minimal change:

```php
'default' => env('DB_CONNECTION', 'pgsql'),
```

Do not remove MySQL/MariaDB connection arrays in the first cleanup unless there is a clear need. Laravel supports multiple connection definitions, and keeping them is less risky than removing supported config paths.

### `backend/docker-compose.yml`

Recommended changes:

- Rename `mysql` service to `postgres`.
- Use `postgres:16-alpine` or a project-approved PostgreSQL image.
- Replace MySQL env vars with PostgreSQL env vars:
  - `POSTGRES_DB`
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`
- Replace `mysql-data` volume with `postgres-data`.
- Replace MySQL healthcheck with:

```yaml
test: ["CMD-SHELL", "pg_isready -U ${DB_USERNAME:-sl_beauty} -d ${DB_DATABASE:-sl_beauty_platform}"]
```

- Update `depends_on` for `app`, `queue`, and `horizon` to depend on `postgres`.
- Consider renaming the Docker network from `ecomlanka` to `sl-beauty` in a later cleanup. Keep network rename out of the first PostgreSQL cleanup if minimizing blast radius is preferred.

### `backend/Dockerfile`

Recommended PostgreSQL extension change for Alpine PHP image:

- Add PostgreSQL runtime/dev packages such as:
  - `postgresql-client`
  - `postgresql-dev`
- Install:
  - `pdo_pgsql`
- Remove `mysql-client` and `pdo_mysql` only if no deployment still needs MySQL compatibility.

Conservative first pass:

- Add PostgreSQL support.
- Remove MySQL support only after Docker build and runtime checks pass.

Strict PostgreSQL-only pass:

- Replace `mysql-client` with `postgresql-client`.
- Replace `pdo_mysql` with `pdo_pgsql`.

### `backend/README.md`

Recommended updates:

- Rename EcomLanka/export marketplace references to SL Beauty Platform backend where in scope.
- Replace `MySQL 8+` with `PostgreSQL 16+` or project-approved PostgreSQL version.
- Replace `pdo_mysql` with `pdo_pgsql`.
- Replace "Configure MySQL and Redis credentials" with "Configure PostgreSQL and Redis credentials".
- Replace Docker service list item `mysql` with `postgres`.
- Update production deployment wording to reference PostgreSQL.

## What Should Not Be Changed Yet

- Do not modify local `backend/.env`.
- Do not commit any `.env` file.
- Do not modify migrations.
- Do not modify seeders.
- Do not modify frontend files.
- Do not modify routes, controllers, resources, requests, policies, or business logic.
- Do not change checkout, cart, payment, order, RFQ, quotation, dashboard, messaging, notification, admin, analytics, supplier, buyer, or internal B2B behavior.
- Do not remove MySQL/MariaDB connection arrays from `config/database.php` in the first pass unless explicitly approved.
- Do not hand-edit generated Swagger JSON unless OpenAPI generation is part of the task.
- Do not change PHPUnit from SQLite to PostgreSQL in the first cleanup. Keep the fast in-memory test configuration unless a dedicated DB integration test pass is requested.

## Local Development Impact

Expected positive impact:

- New developers will no longer copy a production example that starts MySQL.
- `.env.example` and Docker setup will align with local PostgreSQL usage.
- Fewer "works locally on pgsql but Docker starts mysql" mismatches.

Potential required local steps after implementation:

```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan migrate
```

If Docker is used:

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
docker compose exec app php artisan config:clear
docker compose exec app php artisan migrate --seed
```

If old MySQL Docker volume is no longer needed, remove it only after confirming no data is needed. Do not delete volumes automatically in the implementation task.

## Production Deployment Impact

Deployment environments using `.env.production.example` will need PostgreSQL credentials instead of MySQL credentials.

Checklist:

- Provision PostgreSQL database `sl_beauty_platform` or the production database name chosen by ops.
- Set `DB_CONNECTION=pgsql`.
- Set `DB_HOST`, `DB_PORT=5432`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.
- Ensure PHP runtime includes `pdo_pgsql`.
- Run `php artisan config:clear` and `php artisan config:cache` after updating env/config.
- Run `php artisan migrate --force`.
- Run smoke checks for `/api/health`, auth, products, brands, supplier/admin endpoints, and queues.

If production currently uses MySQL with data, this is not just an env cleanup; it becomes a database migration project. That must be handled as a separate data migration task.

## Docker Impact

Implementation will change Docker from MySQL-backed to PostgreSQL-backed.

Expected file-level impacts:

- `backend/docker-compose.yml` service names, env vars, healthcheck, volume names, and dependencies.
- `backend/Dockerfile` system packages and PHP extensions.

Operational impacts:

- Existing `mysql-data` volume will not be used by the new `postgres` service.
- New `postgres-data` volume will be created.
- Developers with old Docker state may need `docker compose down` and rebuild.
- Avoid automatic volume deletion in scripts or docs unless explicitly requested.

## Laravel Config And Cache Impact

Changing `config/database.php` default fallback and env examples is not enough if Laravel config is cached.

Implementation and deployment should include:

```bash
php artisan config:clear
php artisan cache:clear
php artisan optimize:clear
php artisan config:cache
```

For Docker:

```bash
docker compose exec app php artisan optimize:clear
docker compose exec app php artisan config:cache
```

If `php artisan config:cache` is run before `.env` is correct, Laravel may keep the wrong DB driver until cache is cleared again.

## Test Impact

Current `backend/phpunit.xml` uses:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
```

Recommended first pass:

- Keep PHPUnit on SQLite for speed and existing test behavior.
- Run `php artisan test` after config changes.
- Add a separate PostgreSQL integration test task only if the project wants migration tests against actual PostgreSQL.

Suggested checks after implementation:

```bash
php -l backend/config/database.php
php artisan config:clear
php artisan migrate --pretend
php artisan test
docker compose config
docker compose build
```

Run Docker build only when Docker is available and approved for the environment.

## Rollback Safety

Because this cleanup affects environment/deployment configuration, rollback should be file-based and straightforward.

Rollback plan:

1. Revert changes to:
   - `backend/.env.example`
   - `backend/.env.production.example`
   - `backend/config/database.php`
   - `backend/docker-compose.yml`
   - `backend/Dockerfile`
   - `backend/README.md`
2. Run:

```bash
php artisan config:clear
php artisan cache:clear
```

3. If Docker was rebuilt, switch back to the previous compose file and rebuild.
4. Do not delete PostgreSQL or MySQL volumes during rollback unless explicitly approved and backed up.

## Recommended Implementation Order

1. Update env examples:
   - `backend/.env.example`
   - `backend/.env.production.example`
2. Update Laravel default fallback in `backend/config/database.php` from `mysql` to `pgsql`.
3. Update Docker Compose service from MySQL to PostgreSQL.
4. Update Dockerfile to install PostgreSQL client/extension support.
5. Update README backend database instructions.
6. Run syntax/config checks:
   - `php -l backend/config/database.php`
   - `docker compose config`
7. Clear Laravel config/cache.
8. Run backend tests.
9. Run Docker build/smoke checks if Docker is part of the implementation task.
10. Create a verification report before removing deeper MySQL references such as generated API docs or optional backup config examples.

## Recommendation

Proceed with a narrow PostgreSQL-first environment cleanup task next. Focus on env examples, Docker, Dockerfile, README, and the Laravel database fallback. Keep migrations, seeders, application logic, frontend, local `.env`, PHPUnit SQLite, and generated API docs unchanged in the first implementation pass.
