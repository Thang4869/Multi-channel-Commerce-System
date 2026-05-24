#!/usr/bin/env bash
set -euo pipefail

HOST=${1:-localhost}
CONTAINER=${2:-notification_service_canary}

echo "Stopping and removing $CONTAINER on $HOST"
ssh -o StrictHostKeyChecking=no "$HOST" "docker stop $CONTAINER || true && docker rm $CONTAINER || true"
