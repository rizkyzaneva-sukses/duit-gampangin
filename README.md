# Duit Gampangin

Pengelolaan keuangan rumah tangga untuk pasangan pegawai Indonesia.

## Tech Stack

- **Frontend:** Next.js 15 App Router + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL + Prisma 7
- **Auth:** iron-session + argon2
- **Bot:** WAHA (WhatsApp)
- **Deploy:** EasyPanel (Docker)

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL
- npm

### Installation

```bash
# Clone repo
git clone https://github.com/rizkyzaneva-sukses/duit-gampangin.git
cd duit-gampangin

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed template categories
npx tsx prisma/seed.ts

# Run development server
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `IRON_SESSION_SECRET` | Session encryption key (min 32 chars) |
| `NEXT_PUBLIC_APP_URL` | App URL |
| `WAHA_URL` | WAHA API URL |
| `WAHA_API_TOKEN` | WAHA API token |
| `OTP_WA_NUMBER` | WhatsApp number for OTP |
| `BOT_WA_NUMBER` | WhatsApp number for bot |

## Deploy

See [DEPLOY_EASYPANEL.md](./DEPLOY_EASYPANEL.md)

## License

Private — © 2026 Zaneva
