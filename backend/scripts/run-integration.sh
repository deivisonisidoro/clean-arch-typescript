#!/usr/bin/env bash
# src/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
if [ "$#" -eq  "0" ]
  then
    vitest run -c ./vitest.config.integration.ts --coverage
else
    vitest -c ./vitest.config.integration.ts --ui
fi
