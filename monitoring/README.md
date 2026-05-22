# Monitoring scaffold

This directory contains a minimal Prometheus configuration and instructions to run Prometheus and Grafana locally for development.

## Run locally with Docker Compose

1. Add services to `docker-compose.yml` (Prometheus, Grafana).
2. Start stack: `docker-compose up -d prometheus grafana`

## Prometheus config
- `monitoring/prometheus/prometheus.yml` scrapes typical service ports. Adjust targets if ports differ.
