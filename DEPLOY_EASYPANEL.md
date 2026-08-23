# Deploy Duit Gampangin ke EasyPanel

## Prerequisites

- EasyPanel running di VPS
- PostgreSQL service sudah dibuat

## Steps

### 1. Buat PostgreSQL Database

Di EasyPanel:
1. Project `creative` → Service → Postgres
2. Service Name: `duitgampangin-db`
3. Database Name: `duit_gampangin`
4. User: `duitgampangin`
5. Password: (generate secure password)

### 2. Buat App Service

1. Project `creative` → Service → App
2. Service Name: `duitgampangin-app`

### 3. Configure Source

Tab Source:
- Source: Git
- Repository URL: `https://github.com/rizkyzaneva-sukses/duit-gampangin.git`
- Branch: `main`
- Build Path: `/`

### 4. Configure Build

Tab Build:
- Build Method: Dockerfile
- Dockerfile: `Dockerfile` (default)

### 5. Configure Environment

Tab Environment:
```
DATABASE_URL=postgresql://duitgampangin:PASSWORD@creative_duitgampangin-db:5432/duit_gampangin
IRON_SESSION_SECRET=your-secret-min-32-chars
NEXT_PUBLIC_APP_URL=https://duit.gampangin.biz.id
NODE_ENV=production
```

### 6. Deploy

Klik tombol **Deploy** dan tunggu sampai selesai.

### 7. Run Database Migration

Setelah deploy berhasil, masuk ke Console dan jalankan:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 8. Setup Domain

Tab Domains → tambah domain `duit.gampangin.biz.id`
