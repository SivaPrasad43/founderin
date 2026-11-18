-- FounderIn: member profiles
-- Run in Supabase SQL editor, or `supabase db push` with the CLI.

create type public.member_role as enum ('founder', 'investor', 'associate', 'mentor');

create table public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  email               text,
  full_name           text,
  avatar_url          text,
  role                public.member_role,
  investor_type       text,
  specialty           text,
  onboarded_at        timestamptz,
  community_joined_at timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint investor_type_only_for_investors
    check (investor_type is null or role = 'investor'),
  constraint specialty_only_for_associates
    check (specialty is null or role = 'associate'),
  constraint onboarded_requires_role
    check (onboarded_at is null or role is not null)
);

comment on table public.profiles is 'One row per auth user. Created by trigger on signup.';

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- create profile on signup, seeded from Google metadata
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row level security: members may read and update only their own row.
alter table public.profiles enable row level security;

create policy "Members can view own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Members can update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Column-level guard: clients may only change these columns.
-- (id, email, created_at etc. stay server/trigger controlled.)
revoke update on public.profiles from authenticated;
grant update (full_name, role, investor_type, specialty, onboarded_at, community_joined_at)
  on public.profiles to authenticated;
