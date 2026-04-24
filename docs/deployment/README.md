# Deployment Documentation

> Docker, CI/CD, Kubernetes, and production deployment

---

## 📋 Contents

1. [local-setup.md](./local-setup.md) - Local development setup
2. [docker-compose.md](./docker-compose.md) - Docker Compose guide
3. [kubernetes.md](./kubernetes.md) - Kubernetes deployment
4. [ci-cd-pipeline.md](./ci-cd-pipeline.md) - GitHub Actions CI/CD
5. [monitoring.md](./monitoring.md) - Monitoring & alerts
6. [logging.md](./logging.md) - Logging strategy
7. [scaling.md](./scaling.md) - Scaling guidelines
8. [environment-variables.md](./environment-variables.md) - Configuration
9. [troubleshooting.md](./troubleshooting.md) - Common issues

---

## Quick Start

### Local Development
```bash
docker-compose up -d
# See: local-setup.md
```

### Production Deployment
See [kubernetes.md](./kubernetes.md) or hosting provider docs

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Secrets stored securely
- [ ] Health checks passing
- [ ] Monitoring enabled
- [ ] Logging configured
- [ ] Backups configured

---

## Environments

| Environment | Purpose | Instructions |
|-------------|---------|--------------|
| Local | Development | [local-setup.md](./local-setup.md) |
| Docker | Testing | [docker-compose.md](./docker-compose.md) |
| Staging | Pre-production | [kubernetes.md](./kubernetes.md) |
| Production | Live | [kubernetes.md](./kubernetes.md) |

---

**Last Updated**: 2026-04-25
