# Connectia Online MVP

This folder contains:
- `frontend`: Vite React preview based on the latest Connectia JSX.
- `backend`: NestJS + Prisma + PostgreSQL backend starter.

## Recommended deployment path

1. Deploy frontend first for UI validation.
2. Start backend locally with Docker PostgreSQL.
3. Replace mock `initialAppState` calls with API calls screen by screen.
4. Deploy backend on OVH VPS behind Nginx + SSL.
5. Connect frontend to backend using `VITE_API_URL`.
