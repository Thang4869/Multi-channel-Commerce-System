#!/usr/bin/env bash
set -euo pipefail

TARGET=${1:-http://localhost:3009/api/notifications/health}
RETRIES=${2:-5}
SLEEP=${3:-2}

echo "Verifying canary at $TARGET"
for i in $(seq 1 $RETRIES); do
  if curl -sSf "$TARGET" -m 5 >/dev/null; then
    echo "Canary healthy"
    exit 0
  fi
  echo "Attempt $i failed, retrying in $SLEEP seconds..."
  sleep $SLEEP
done

echo "Canary verification failed"
exit 1
