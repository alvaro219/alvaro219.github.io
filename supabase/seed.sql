-- ═══════════════════════════════════════════════════════════
-- Seed data for Álvaro Portfolio
-- Run this AFTER schema.sql in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- ─── Technologies ──────────────────────────────────────────
INSERT INTO technologies (id, name, icon, category) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Vue.js',       '/icons/vue-js-icon.svg',      'frontend'),
  ('a0000000-0000-0000-0000-000000000002', 'Angular',      '/icons/angular-js-icon.svg',  'frontend'),
  ('a0000000-0000-0000-0000-000000000003', 'React',        '/icons/preact-icon.svg',      'frontend'),
  ('a0000000-0000-0000-0000-000000000004', 'Solid.js',     '/icons/solid-js-icon.svg',    'frontend'),
  ('a0000000-0000-0000-0000-000000000005', 'Astro',        '/icons/astro-icon.svg',       'frontend'),
  ('a0000000-0000-0000-0000-000000000006', 'TypeScript',   '/icons/typescript-icon.svg',  'language'),
  ('a0000000-0000-0000-0000-000000000007', 'Flutter',      '/icons/flutter-icon.svg',     'mobile'),
  ('a0000000-0000-0000-0000-000000000008', 'StencilJS',    '/icons/stencil-icon.svg',     'frontend'),
  ('a0000000-0000-0000-0000-000000000009', 'Django',       '/icons/django-icon.svg',      'backend'),
  ('a0000000-0000-0000-0000-000000000010', 'Laravel',      '/icons/laravel-icon.svg',     'backend'),
  ('a0000000-0000-0000-0000-000000000011', 'Prisma',       '/icons/prisma-icon.svg',      'backend'),
  ('a0000000-0000-0000-0000-000000000012', 'PostgreSQL',   '/icons/postgresql-icon.svg',  'database'),
  ('a0000000-0000-0000-0000-000000000013', 'MySQL',        '/icons/mysql-icon.svg',       'database'),
  ('a0000000-0000-0000-0000-000000000014', 'Ruby',         '/icons/ruby-icon.svg',        'language'),
  ('a0000000-0000-0000-0000-000000000015', 'Liquid',       '/icons/liquid-icon.svg',      'language'),
  ('a0000000-0000-0000-0000-000000000016', 'Supabase',     '/icons/supabase-icon.svg',    'backend'),
  ('a0000000-0000-0000-0000-000000000017', 'Figma',        '/icons/figma-icon.svg',       'design'),
  ('a0000000-0000-0000-0000-000000000018', 'Jest',         '/icons/jest-icon.svg',        'testing'),
  ('a0000000-0000-0000-0000-000000000019', 'Vitest',       '/icons/jest-icon.svg',        'testing'),
  ('a0000000-0000-0000-0000-000000000020', 'Sentry',       '/icons/sentry-icon.svg',      'devops'),
  ('a0000000-0000-0000-0000-000000000021', 'GitHub',       '/icons/github-icon.svg',      'devops'),
  ('a0000000-0000-0000-0000-000000000022', 'GitLab',       '/icons/github-icon.svg',      'devops'),
  ('a0000000-0000-0000-0000-000000000023', 'Cloudflare',   '/icons/cloudflare-icon.svg',  'devops'),
  ('a0000000-0000-0000-0000-000000000024', 'PHP',          '/icons/php-icon.svg',         'language'),
  ('a0000000-0000-0000-0000-000000000025', 'WhatsApp Business API', '/icons/whatsapp.svg', 'integration'),
  ('a0000000-0000-0000-0000-000000000026', 'Make.com',     '/icons/make-icon.svg',        'integration'),
  ('a0000000-0000-0000-0000-000000000027', 'Facebook Business', '/icons/facebook-icon.svg','integration')
ON CONFLICT (name) DO NOTHING;

-- ─── Projects ──────────────────────────────────────────────
INSERT INTO projects (id, name, role, description, period_start, period_end, importance, highlights, impact, is_current, sort_order, active) VALUES
(
  'b0000000-0000-0000-0000-000000000001',
  'Cementum',
  'FullStack Developer',
  'Sistema de gestión integral para empresas de transporte con automatización de comunicaciones.',
  '2025', 'Presente', 'high',
  ARRAY['Gestión integral de flotas y pedidos', 'Automatización de WhatsApp Business', 'Integración con Facebook Business y Make.com', 'Panel administrativo con roles y permisos'],
  'Reducción del 60% en tiempo de gestión de comunicaciones con clientes.',
  true, 1, true
),
(
  'b0000000-0000-0000-0000-000000000002',
  'Abastores OS',
  'Lead Frontend & UX/UI Tutor',
  'Marketplace agrícola con funcionalidades avanzadas de compraventa entre productores y distribuidores. Rol como Lead Frontend y tutor UX/UI del equipo.',
  '2024', '2025', 'high',
  ARRAY['Marketplace con sistema de pujas y ofertas', 'Mentoría técnica del equipo frontend', 'Testing con Vitest y monitoreo con Sentry', 'Diseño UX orientado al usuario rural'],
  'Plataforma utilizada por productores agrícolas en fase piloto.',
  false, 2, true
),
(
  'b0000000-0000-0000-0000-000000000003',
  'Backoffice Administrativo',
  'FullStack Developer',
  'Sistema administrativo con roles, permisos avanzados y gestión de perfiles, diseñado para reducir errores y mejorar productividad.',
  '2024', '2024', 'medium',
  ARRAY['Sistema de roles y permisos granular', 'Gestión de perfiles y usuarios', 'Auditoría de acciones del sistema'],
  'Reducción de errores administrativos en un 40%.',
  false, 3, true
),
(
  'b0000000-0000-0000-0000-000000000004',
  'Visualización y Exportación de Datos (Angular)',
  'Frontend Developer',
  'Aplicación para visualizar rutas, aplicar filtros dinámicos y exportar datos con persistencia de estado y rendimiento optimizado.',
  '2024', '2024', 'medium',
  ARRAY['Filtros dinámicos con persistencia de estado', 'Exportación de datos en múltiples formatos', 'Visualización de rutas en mapa interactivo'],
  'Optimización del proceso de análisis de datos de rutas.',
  false, 4, true
),
(
  'b0000000-0000-0000-0000-000000000005',
  'Landing Corporativas (Proactiva, Mort.es, Dcubo)',
  'FullStack Developer',
  'Landing pages corporativas accesibles, multilingües, con integración CMS y despliegue CI/CD.',
  '2024', '2025', 'medium',
  ARRAY['Accesibilidad WCAG 2.1 AA', 'Soporte multilingüe', 'Integración con CMS headless', 'CI/CD con Cloudflare Pages'],
  'Mejora de conversión y posicionamiento SEO.',
  false, 5, true
),
(
  'b0000000-0000-0000-0000-000000000006',
  'Componente ChatBot IA',
  'Frontend Developer',
  'Componente frontend reutilizable con gestión modular, testing automatizado y diseño UX funcional.',
  '2024', '2024', 'medium',
  ARRAY['Web Component reutilizable', 'Testing automatizado con Jest', 'Diseño UX conversacional'],
  'Componente integrado en múltiples productos de la empresa.',
  false, 6, true
),
(
  'b0000000-0000-0000-0000-000000000007',
  'Renovación Catálogo de Productos',
  'FullStack Developer',
  'Refactor de estructura de productos, lógica de precios, accesibilidad y nueva presentación UI.',
  '2024', '2024', 'medium',
  ARRAY['Refactorización completa de lógica de precios', 'Mejora de accesibilidad del catálogo', 'Nuevo diseño UI en Figma'],
  'Incremento del 25% en interacción con el catálogo.',
  false, 7, true
),
(
  'b0000000-0000-0000-0000-000000000008',
  'Página desde Cero (Fullstack)',
  'FullStack Developer',
  'Producto completo con sistema de gestión, arquitectura escalable y diseño UI/UX desde wireframes.',
  '2024', '2024', 'medium',
  ARRAY['Arquitectura fullstack escalable', 'Diseño UI/UX desde wireframes en Figma', 'Sistema de gestión de contenidos'],
  'Producto entregado en producción con éxito.',
  false, 8, true
),
(
  'b0000000-0000-0000-0000-000000000009',
  'Aplicación Narrativa (La Codicia del Sabio)',
  'FullStack Developer',
  'Aplicación narrativa con backend completo, autenticación y despliegue end-to-end.',
  '2024', '2024', 'medium',
  ARRAY['App Flutter multiplataforma', 'Backend con Supabase y PostgreSQL', 'Autenticación y gestión de usuarios', 'Despliegue end-to-end'],
  'Proyecto personal completado como formación práctica.',
  false, 9, true
)
ON CONFLICT (id) DO NOTHING;

-- ─── Project ↔ Technology links ────────────────────────────
-- Cementum: Angular, PHP, Laravel, TypeScript, PostgreSQL, WhatsApp, Make.com, Facebook
INSERT INTO project_technologies (project_id, technology_id) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000024'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000012'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000025'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000026'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000027'),
  -- Abastores OS: Vue.js, Django, PostgreSQL, TypeScript, Sentry, Vitest
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000012'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000020'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000019'),
  -- Backoffice: Vue.js, Prisma, PostgreSQL, TypeScript
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000011'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000012'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006'),
  -- Visualización Angular: Angular, PostgreSQL, TypeScript
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002'),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000012'),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000006'),
  -- Landing Corporativas: Astro, Cloudflare
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005'),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000023'),
  -- ChatBot IA: StencilJS, TypeScript
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000008'),
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006'),
  -- Renovación Catálogo: Ruby, Liquid, Figma
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000014'),
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000015'),
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000017'),
  -- Página desde Cero: Angular, Django, PostgreSQL, Figma
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002'),
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000009'),
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000012'),
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000017'),
  -- La Codicia del Sabio: Flutter, Supabase, PostgreSQL, TypeScript
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000007'),
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000016'),
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000012'),
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000006')
ON CONFLICT DO NOTHING;

-- ─── Profile (public info) ─────────────────────────────────
INSERT INTO profiles (id, name, title, description, photo, education) VALUES
(
  'c0000000-0000-0000-0000-000000000001',
  'Álvaro Antón Maciá',
  'FullStack Developer · UX/UI Designer',
  'Desarrollador Full Stack especializado en la creación de productos digitales end-to-end, combinando diseño UX/UI, desarrollo frontend y backend, APIs, bases de datos relacionales y despliegue continuo. Experiencia en automatización de procesos, sistemas administrativos, marketplaces y landing pages corporativas multilingües, con foco en rendimiento, accesibilidad, testing y experiencia de usuario.',
  '/images/alvaro_intro_photo.webp',
  ARRAY['Desarrollo FullStack — Formación Online — 2023-2024', 'Diseño UX/UI — Academia Digital — 2023', 'Formación autodidacta + práctica real en proyectos']
)
ON CONFLICT (id) DO NOTHING;
