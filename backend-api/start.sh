#!/bin/bash
set -e

echo "==> Clearing stale config cache..."
php artisan config:clear

echo "==> Caching config with runtime env vars..."
php artisan config:cache

echo "==> Creating SQLite database file if not exists..."
touch /app/database/database.sqlite
chmod 664 /app/database/database.sqlite

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Running seeders..."
php artisan db:seed --force || true

echo "==> Starting Laravel server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT

