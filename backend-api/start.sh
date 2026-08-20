#!/bin/bash
set -e

echo "==> Waiting for MySQL to be ready..."
MAX_TRIES=30
TRIES=0

while [ $TRIES -lt $MAX_TRIES ]; do
    if php -r "
        try {
            \$pdo = new PDO(
                'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
                getenv('DB_USERNAME'),
                getenv('DB_PASSWORD'),
                [PDO::ATTR_TIMEOUT => 5, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            echo 'ok';
        } catch (Exception \$e) {
            exit(1);
        }
    " 2>/dev/null | grep -q 'ok'; then
        echo "==> MySQL is ready!"
        break
    fi
    TRIES=$((TRIES+1))
    echo "==> MySQL not ready ($TRIES/$MAX_TRIES), retrying in 3s..."
    sleep 3
done

if [ $TRIES -eq $MAX_TRIES ]; then
    echo "ERROR: Could not connect to MySQL after $MAX_TRIES attempts!"
    exit 1
fi

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Running seeders..."
php artisan db:seed --force || true

echo "==> Starting Laravel server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
