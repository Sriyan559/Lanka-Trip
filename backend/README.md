# EcomLanka Laravel API

Production-oriented Laravel 11 REST API for the EcomLanka Sri Lankan export marketplace.

## Requirements

- PHP 8.2+
- Composer 2
- MySQL 8+
- Redis 7+
- Required PHP extensions: `pdo_mysql`, `mbstring`, `intl`, `zip`, `pcntl`

## Local installation

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan l5-swagger:generate
php artisan serve
```

Configure MySQL and Redis credentials in `.env`. The API defaults to Redis cache and queues.

## Docker

```bash
cp .env.production.example .env
docker compose build
docker compose up -d
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed --force
docker compose exec app php artisan storage:link
docker compose exec app php artisan l5-swagger:generate
```

The API is available at `http://localhost:8000`.

Services:

- `app`: PHP-FPM application
- `nginx`: web server
- `mysql`: database
- `redis`: cache and queue broker
- `queue`: Laravel queue worker
- `horizon`: Horizon supervisor

## Queue workers

For a non-Docker deployment:

```bash
php artisan queue:work redis --queue=default,notifications,emails --tries=3
```

Use Supervisor or systemd to keep workers alive. Restart workers after deployment:

```bash
php artisan queue:restart
```

## Horizon

Start Horizon with:

```bash
php artisan horizon
```

The admin status endpoint is `GET /api/admin/horizon/status`. The Horizon web dashboard uses the configured admin authorization gate.

## Swagger

Generate the OpenAPI file:

```bash
php artisan l5-swagger:generate
```

Swagger UI is available at:

```text
/api/documentation
```

## Backups

Daily backups are scheduled at 02:00:

```bash
php artisan schedule:work
```

Run a backup manually:

```bash
php artisan backup:run
```

Administrators can list generated backups through `GET /api/admin/backups`.

## Production deployment

1. Copy `.env.production.example` to `.env` and set secure credentials.
2. Set `APP_ENV=production`, `APP_DEBUG=false`, and generate `APP_KEY`.
3. Install optimized dependencies:

   ```bash
   composer install --no-dev --optimize-autoloader
   ```

4. Run deployment commands:

   ```bash
   php artisan migrate --force
   php artisan storage:link
   php artisan l5-swagger:generate
   php artisan optimize
   php artisan queue:restart
   php artisan horizon:terminate
   ```

5. Run the scheduler every minute using cron:

   ```cron
   * * * * * cd /var/www/ecomlanka-backend && php artisan schedule:run >> /dev/null 2>&1
   ```

6. Terminate TLS at the load balancer or Nginx and restrict database/Redis ports to the private network.

## Maintenance mode

Administrators may enable or disable maintenance mode through:

- `POST /api/admin/maintenance/enable`
- `POST /api/admin/maintenance/disable`

## Tests and quality checks

```bash
php artisan test
./vendor/bin/pint --test
php artisan l5-swagger:generate
composer validate --no-check-publish
```
