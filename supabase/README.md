# Supabase Migrations

This folder contains database migrations for Supabase. These SQL files define your database schema and are part of your codebase.

## What's Here

- `migrations/` - SQL migration files that define your database schema
- `kong.yml` - Kong API gateway configuration
- `dev.env` - Development environment variables (for Supabase CLI)

## Migrations

Migrations in `migrations/` are applied to your database when you:
- Set up a new Supabase project (cloud or local)
- Run `supabase db reset` (if using Supabase CLI)
- Apply migrations manually to your database

## Using Supabase CLI

If you want to use the Supabase CLI for local development:

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Start Supabase**
   ```bash
   supabase start
   ```

3. **Create a new migration**
   ```bash
   supabase migration new migration_name
   ```

4. **Apply migrations**
   ```bash
   supabase db reset  # Resets and applies all migrations
   ```

## Using with Cloud Supabase

To apply migrations to your cloud Supabase project:

1. Use the Supabase Dashboard SQL Editor
2. Or use the Supabase CLI: `supabase db push`
3. Or use Prisma migrations (recommended): `npm run prisma:migrate`

## Note

The migrations in this folder define the database schema. The Prisma schema in `prisma/schema.prisma` should match these migrations. You can use either:
- Supabase migrations (SQL files) - for RLS policies, functions, etc.
- Prisma migrations - for schema management and type safety

Both can work together - Prisma for schema, Supabase migrations for RLS and advanced features.

