-- users table and RLS policies
create table if not exists public.users (
  id uuid primary key default auth.uid(),
  email text unique not null,
  name text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- Select own row
create policy if not exists "users: select own" on public.users
for select using ( id = auth.uid() );

-- Insert only self (id must be auth.uid())
create policy if not exists "users: insert self" on public.users
for insert with check ( id = auth.uid() );

-- Update own row
create policy if not exists "users: update own" on public.users
for update using ( id = auth.uid() );

