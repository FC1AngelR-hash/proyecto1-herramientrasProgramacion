-- Pegar y ejecutar en Supabase: SQL Editor
-- Sistema de administración: administradores + auditoría

create extension if not exists "pgcrypto";

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text not null,
  role text not null default 'admin' check (role in ('superadmin', 'admin', 'operator')),
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.admins (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists idx_admins_email on public.admins (email);
create index if not exists idx_admins_role on public.admins (role);
create index if not exists idx_audit_logs_admin_id on public.audit_logs (admin_id);
create index if not exists idx_audit_logs_created_at on public.audit_logs (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_admins_updated_at on public.admins;
create trigger trg_admins_updated_at
before update on public.admins
for each row
execute function public.set_updated_at();

-- El backend usa la service_role key (omite RLS).
-- Aun así se activa RLS para bloquear acceso anónimo desde el cliente.
alter table public.admins enable row level security;
alter table public.audit_logs enable row level security;

revoke all on public.admins from anon, authenticated;
revoke all on public.audit_logs from anon, authenticated;
