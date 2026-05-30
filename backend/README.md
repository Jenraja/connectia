# Connectia Backend Starter

Recommended MVP backend stack:
- NestJS API
- PostgreSQL
- Prisma ORM
- JWT authentication
- Role-based access control: CLIENT, COMPANY_OWNER, COMPANY_EMPLOYEE, ADMIN

## Local start

```bash
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

API base URL: `http://localhost:3001/api`

## First backend modules to complete

1. Auth: register/login, password hashing, JWT, roles.
2. Organizations: company profile, employee seats, stop access, premium/free limits.
3. Requests: client requests, smart forms, priority score, strict matching.
4. Offers: offer creation, benchmark before send, accept/decline, expiry.
5. Admin metrics: revenue, partners, clients, company reports.
6. Reports: PDF table exports from dashboard metrics.
