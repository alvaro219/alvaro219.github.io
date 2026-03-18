-- ═══════════════════════════════════════════════════════════
-- Supabase Schema for Álvaro Portfolio CRM
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── User Profiles ───────────────────────────────────────
create table if not exists user_profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'user' check (role in ('admin', 'user')),
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table user_profiles enable row level security;

drop policy if exists "Users can read own profile" on user_profiles;
create policy "Users can read own profile"
  on user_profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on user_profiles;
create policy "Users can update own profile"
  on user_profiles for update
  using (auth.uid() = id);

-- ─── Profiles (public info) ─────────────────────────────
create table if not exists profiles (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  title text,
  description text,
  photo text,
  education text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "Public can read profiles" on profiles;
create policy "Public can read profiles"
  on profiles for select using (true);

drop policy if exists "Admins can manage profiles" on profiles;
create policy "Admins can manage profiles"
  on profiles for all using (
    exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
  );

-- ─── Technologies ────────────────────────────────────────
create table if not exists technologies (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  icon text not null,
  category text,
  created_at timestamptz default now()
);

alter table technologies enable row level security;

drop policy if exists "Public can read technologies" on technologies;
create policy "Public can read technologies"
  on technologies for select using (true);

drop policy if exists "Admins can manage technologies" on technologies;
create policy "Admins can manage technologies"
  on technologies for all using (
    exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
  );

-- ─── Projects ────────────────────────────────────────────
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text,
  description text not null default '',
  period_start text,
  period_end text,
  importance text not null default 'medium' check (importance in ('high', 'medium', 'low')),
  highlights text[] default '{}',
  impact text,
  is_current boolean default false,
  sort_order int default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table projects enable row level security;

drop policy if exists "Public can read active projects" on projects;
create policy "Public can read active projects"
  on projects for select using (active = true);

drop policy if exists "Admins can read all projects" on projects;
create policy "Admins can read all projects"
  on projects for select using (
    exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admins can manage projects" on projects;
create policy "Admins can manage projects"
  on projects for all using (
    exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
  );

-- ─── Project Technologies (join table) ───────────────────
create table if not exists project_technologies (
  project_id uuid references projects on delete cascade,
  technology_id uuid references technologies on delete cascade,
  primary key (project_id, technology_id)
);

alter table project_technologies enable row level security;

drop policy if exists "Public can read project technologies" on project_technologies;
create policy "Public can read project technologies"
  on project_technologies for select using (true);

drop policy if exists "Admins can manage project technologies" on project_technologies;
create policy "Admins can manage project technologies"
  on project_technologies for all using (
    exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
  );

-- ─── Indexes ─────────────────────────────────────────────
create index if not exists idx_projects_active on projects (active);
create index if not exists idx_projects_sort on projects (sort_order);
create index if not exists idx_pt_project on project_technologies (project_id);
create index if not exists idx_pt_technology on project_technologies (technology_id);
