# Database Migrations

This directory contains forward-looking database infrastructure for when
this site needs a backend. Current target: **Supabase (PostgreSQL 15+)**.

The site is currently 100% static: no database is connected.
Run these migrations only when adding a feature that requires persistence.

---

## Structure

```
db/
├── README.md              ← this file
├── migrate.sh             ← migration runner
└── migrations/
    ├── 0001_initial_schema.sql   ← contacts + waitlist tables
    └── 0002_leads_crm.sql        ← leads table for acquisition funnel
```

---

## Running Migrations

### Prerequisites
- `psql` installed (`brew install libpq` on macOS, or `apt install postgresql-client`)
- A Supabase project created at [supabase.com](https://supabase.com)
- The connection string from: Supabase Dashboard → Settings → Database → URI

### Steps

```bash
# 1. Export the connection string
export DATABASE_URL="postgres://postgres:[password]@[host]:5432/postgres"

# 2. Make the runner executable
chmod +x db/migrate.sh

# 3. Run
./db/migrate.sh
```

The runner is **idempotent**: re-running it skips already-applied migrations.

---

## Migration Naming Convention

```
NNNN_snake_case_description.sql
```

- `NNNN`: zero-padded sequence number (0001, 0002, …)
- `snake_case_description`: brief description of what it does
- Files are applied **in filename order**, so numbering is the only dependency mechanism

### Examples
```
0001_initial_schema.sql
0002_leads_crm.sql
0003_add_case_studies.sql
0004_add_testimonials.sql
```

---

## Creating a New Migration

```bash
# Create the file with the next sequence number
touch db/migrations/0003_your_feature.sql

# Write your SQL (CREATE TABLE, ALTER TABLE, INSERT seeds, etc.)
# Always include:
#   - IF NOT EXISTS guards (idempotent)
#   - RLS policies (Supabase security model)
#   - A comment block at the top explaining purpose and dependencies
```

---

## Rollback a Migration

PostgreSQL doesn't auto-rollback migrations. To undo:

1. Write a reverse migration file (e.g., `0003_rollback_your_feature.sql`)
2. Apply it via `./db/migrate.sh`
3. Remove the original migration's row from `_migrations` if re-applying later:

```sql
DELETE FROM _migrations WHERE filename = '0003_your_feature.sql';
```

---

## Current Migration Status

| File | Purpose | Status |
|------|---------|--------|
| `0001_initial_schema.sql` | `contacts` and `waitlist` tables | Not yet applied |
| `0002_leads_crm.sql` | `leads` table for acquisition funnel | Not yet applied |

Apply `0001` first: `0002` depends on the `_migrations` table it creates.

---

## Environment Variables Needed (when DB is live)

Add these to `.env.local` (never commit):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server-side only: never expose to browser
DATABASE_URL=postgres://postgres:...@db.xxxx.supabase.co:5432/postgres
```
