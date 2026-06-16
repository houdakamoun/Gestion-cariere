#!/bin/sh
set -e

echo "Waiting for database and applying migrations..."
attempt=0
until npx prisma migrate deploy; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo "Database not ready after 60 seconds."
    exit 1
  fi
  echo "Retrying in 2s..."
  sleep 2
done

if [ "${RUN_SEED:-false}" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed
fi

exec "$@"
