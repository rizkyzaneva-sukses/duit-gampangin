# AGENTS.md — Duit Gampangin

## Project Overview
Household finance SaaS for Indonesian couples. Multi-tenant (Household = tenant).

## Tech Stack
- Next.js 15 App Router + React 19 + TypeScript (strict)
- Tailwind CSS v4
- Prisma 7 + PostgreSQL
- iron-session 8 + argon2
- Vitest for testing

## Code Conventions
- Language: UI in Indonesian, code in English
- Naming: camelCase (functions/vars), PascalCase (components/classes)
- API routes: kebab-case
- Enums: UPPER_SNAKE_CASE
- Currency: Integer rupiah (no float, no decimal)
- Format: `Rp 1.250.000`, `20 Agu 2026`, WIB timezone

## Critical Rules
1. **Household isolation**: Every Prisma query MUST filter by `householdId`
2. **Visibility filtering**: `PRIBADI_TERTUTUP` transactions must NEVER leave the API for other members
3. **No float for money**: All money fields are `Int` (rupiah)
4. **Soft delete**: Use `deletedAt`, never hard-delete transactions
5. **Transfer ≠ Income/Expense**: Transfers between accounts are NOT income or expense

## File Structure
```
src/
  app/          # Next.js App Router pages
  lib/          # Shared utilities
  components/   # React components
  hooks/        # Custom hooks
  types/        # TypeScript types
prisma/
  schema.prisma # Database schema
  seed.ts       # Seed data
```

## Testing
```bash
npm test        # Run Vitest
```

Key test areas:
- WA message parser (50+ format variations)
- Budget calculation with rollover
- Saldo calculation
- Target nabung setoran
- DSR calculation
- Proyeksi "cukup sampai tanggal"
