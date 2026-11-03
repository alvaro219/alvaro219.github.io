-- ════════════════════════════════════════════════════════════════════
-- 2026-11 · Fix public project listing + add Librachieve
-- Run once in Supabase → SQL Editor. Safe to re-run.
-- ════════════════════════════════════════════════════════════════════

-- ─── 1. Fix: anonymous visitors could not read projects ────────────
-- Every "Admins can ..." policy ran `exists (select ... from user_profiles ...)`.
-- Postgres evaluates all permissive policies, and the anon role has no access to
-- user_profiles, so the whole SELECT failed with "permission denied for table
-- user_profiles" and the public projects page came back empty.
-- A SECURITY DEFINER function does the admin check without that grant.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_profiles where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Point every policy that queries user_profiles (on other tables) at is_admin()
do $$
declare
  p record;
begin
  for p in
    select schemaname, tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and tablename <> 'user_profiles'
      and (qual like '%user_profiles%' or with_check like '%user_profiles%')
  loop
    if p.qual is not null then
      execute format('alter policy %I on %I.%I using (public.is_admin())',
                     p.policyname, p.schemaname, p.tablename);
    end if;
    if p.with_check is not null then
      execute format('alter policy %I on %I.%I with check (public.is_admin())',
                     p.policyname, p.schemaname, p.tablename);
    end if;
    raise notice 'policy fixed: %.%', p.tablename, p.policyname;
  end loop;
end $$;

-- ─── 2. Project links (repository / live site) ──────────────────────
alter table projects add column if not exists repo_url text;
alter table projects add column if not exists live_url text;
-- English columns already used by the admin form (kept here for fresh installs)
alter table projects add column if not exists role_en text;
alter table projects add column if not exists description_en text;
alter table projects add column if not exists highlights_en text[] default '{}';
alter table projects add column if not exists impact_en text;

-- ─── 3. Technologies used by Librachieve ────────────────────────────
insert into technologies (name, icon, category) values
  ('Python',         '/icons/python-icon.svg',         'language'),
  ('FastAPI',        '/icons/fastapi-icon.svg',        'backend'),
  ('GraphQL',        '/icons/graphql-icon.svg',        'backend'),
  ('Redis',          '/icons/redis-icon.svg',          'database'),
  ('Tailwind CSS',   '/icons/tailwind-icon.svg',       'frontend'),
  ('Docker',         '/icons/docker-icon.svg',         'devops'),
  ('Kubernetes',     '/icons/kubernetes-icon.svg',     'devops'),
  ('GitHub Actions', '/icons/github-actions-icon.svg', 'devops')
on conflict (name) do nothing;

-- ─── 4. Librachieve project ─────────────────────────────────────────
-- Shown right after the current job (sort_order 2); later projects move down one.
do $$
declare
  pid uuid;
begin
  select id into pid from projects where name = 'Librachieve';

  if pid is null then
    update projects set sort_order = sort_order + 1 where sort_order >= 2;
    insert into projects (name, sort_order) values ('Librachieve', 2) returning id into pid;
  end if;

  update projects set
    role = 'FullStack Developer · Proyecto personal',
    role_en = 'FullStack Developer · Personal project',
    description =
      'Aplicación web para gestionar tu biblioteca de videojuegos de todas las tiendas en un solo '
      'sitio. Sincroniza la biblioteca y los logros de Steam, importa Epic Games, GOG y Amazon '
      'Games (incluidas las exportaciones de Playnite), completa portadas y géneros desde IGDB y '
      'muestra estadísticas de tiempo de juego, progreso de logros y géneros favoritos.',
    description_en =
      'Web app to manage your video game library from every store in one place. It syncs your '
      'Steam library and achievements, imports Epic Games, GOG and Amazon Games (including '
      'Playnite exports), fills in covers and genres from IGDB and shows statistics on playtime, '
      'achievement progress and favourite genres.',
    period_start = '2026',
    period_end = 'Presente',
    importance = 'high',
    is_current = false,
    active = true,
    highlights = array[
      'Inicio de sesión con Steam (OpenID) y sincronización de biblioteca, horas y logros con la Steam Web API',
      'Emparejado exacto de metadatos con IGDB por ID de Steam y caché en Redis',
      'Importación de Epic, GOG y Amazon desde CSV/JSON y Playnite, con opción de deshacer',
      'Backend asíncrono en FastAPI con REST + GraphQL, PostgreSQL y cola de trabajos (ARQ + Redis)',
      'Sesiones con JWT y refresh tokens revocables, límite de intentos y cumplimiento RGPD',
      'CI/CD con GitHub Actions, Docker y despliegue con HTTPS en Oracle Cloud'
    ],
    highlights_en = array[
      'Steam sign-in (OpenID) and library, playtime and achievement sync with the Steam Web API',
      'Exact IGDB metadata matching by Steam app id, cached in Redis',
      'Epic, GOG and Amazon import from CSV/JSON and Playnite, with undo',
      'Async FastAPI backend with REST + GraphQL, PostgreSQL and a job queue (ARQ + Redis)',
      'JWT sessions with revocable refresh tokens, rate limiting and GDPR compliance',
      'CI/CD with GitHub Actions, Docker and HTTPS deployment on Oracle Cloud'
    ],
    impact =
      'Unifica en una sola vista más de 1.300 juegos de cuatro tiendas. Sincroniza 99 juegos de '
      'Steam con más de 4.100 logros en unos 12 segundos.',
    impact_en =
      'Brings 1,300+ games from four stores into a single view. Syncs 99 Steam games with '
      'over 4,100 achievements in about 12 seconds.',
    repo_url = 'https://github.com/alvaro219/librachieve',
    -- live_url is set once the production server is up (see section 5)

    updated_at = now()
  where id = pid;

  delete from project_technologies where project_id = pid;
  insert into project_technologies (project_id, technology_id)
  select pid, t.id
  from technologies t
  where t.name in (
    'React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'GraphQL',
    'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions'
  );
end $$;

-- ─── 5. When librachieve.duckdns.org is live, run: ───────────────────
-- update projects set live_url = 'https://librachieve.duckdns.org' where name = 'Librachieve';

-- Check: should list Librachieve with 11 technologies
select p.sort_order, p.name, count(pt.technology_id) as technologies
from projects p
left join project_technologies pt on pt.project_id = p.id
group by p.id
order by p.sort_order;
