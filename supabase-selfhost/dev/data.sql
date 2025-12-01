-- Seed data for development
-- This file is executed when the database is initialized

-- Example: Create a test user profile table if needed
-- create table if not exists profiles (
--   id uuid references auth.users not null,
--   updated_at timestamp with time zone,
--   username text unique,
--   avatar_url text,
--   website text,
--   primary key (id),
--   unique(username),
--   constraint username_length check (char_length(username) >= 3)
-- );

-- alter table profiles enable row level security;

-- create policy "Public profiles are viewable by the owner."
--   on profiles for select
--   using ( auth.uid() = id );

-- create policy "Users can insert their own profile."
--   on profiles for insert
--   with check ( auth.uid() = id );

-- create policy "Users can update own profile."
--   on profiles for update
--   using ( auth.uid() = id );

