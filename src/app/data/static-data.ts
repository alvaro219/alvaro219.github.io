export interface StaticSkill {
  name: string;
  icon: string;
}

export interface StaticProject {
  name: string;
  role: string;
  period: string;
  technologies: StaticSkill[];
  description: string;
  highlights: string[];
  impact: string;
  importance: 'high' | 'medium' | 'low';
  isCurrent: boolean;
}

export const PROFILE = {
  name: 'Álvaro Antón Maciá',
  title: 'FullStack Developer · UX/UI Designer',
  photo: '/images/alvaro_intro_photo.png',
  description:
    'Desarrollador Full Stack especializado en la creación de productos digitales end-to-end, combinando diseño UX/UI, desarrollo frontend y backend, APIs, bases de datos relacionales y despliegue continuo. Experiencia en automatización de procesos, sistemas administrativos, marketplaces y landing pages corporativas multilingües, con foco en rendimiento, accesibilidad, testing y experiencia de usuario. Capaz de comprender procesos reales, identificar cuellos de botella y convertirlos en software que ahorra tiempo, reduce errores y genera impacto directo en negocio.',
  education: [
    'Desarrollo FullStack — Formación Online — 2023-2024',
    'Diseño UX/UI — Academia Digital — 2023',
    'Formación autodidacta + práctica real en proyectos',
  ],
  social: {
    github: 'https://github.com/alvaro219',
    linkedin: 'https://www.linkedin.com/in/alvaroantonmacia/',
    email: 'alvaroxam72@gmail.com',
    phone: '+34 653 83 88 53',
  },
  location: 'Callosa de Segura, Alicante, España',
};

export const SKILLS: StaticSkill[] = [
  { name: 'Vue.js', icon: '/icons/vue-js-icon.svg' },
  { name: 'Angular', icon: '/icons/angular-js-icon.svg' },
  { name: 'React', icon: '/icons/preact-icon.svg' },
  { name: 'Solid.js', icon: '/icons/solid-js-icon.svg' },
  { name: 'Astro', icon: '/icons/astro-icon.svg' },
  { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
  { name: 'Flutter', icon: '/icons/flutter-icon.svg' },
  { name: 'StencilJS', icon: '/icons/stencil-icon.svg' },
  { name: 'Django', icon: '/icons/django-icon.svg' },
  { name: 'Laravel', icon: '/icons/laravel-icon.svg' },
  { name: 'Prisma', icon: '/icons/prisma-icon.svg' },
  { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
  { name: 'MySQL', icon: '/icons/mysql-icon.svg' },
  { name: 'Ruby', icon: '/icons/ruby-icon.svg' },
  { name: 'Liquid', icon: '/icons/liquid-icon.svg' },
  { name: 'Supabase', icon: '/icons/supabase-icon.svg' },
  { name: 'Figma', icon: '/icons/figma-icon.svg' },
  { name: 'Jest', icon: '/icons/jest-icon.svg' },
  { name: 'Vitest', icon: '/icons/jest-icon.svg' },
  { name: 'Sentry', icon: '/icons/sentry-icon.svg' },
  { name: 'GitHub', icon: '/icons/github-icon.svg' },
  { name: 'GitLab', icon: '/icons/github-icon.svg' },
  { name: 'Cloudflare', icon: '/icons/cloudflare-icon.svg' },
];

export const PROJECTS: StaticProject[] = [
  {
    name: 'Cementum',
    role: 'FullStack Developer',
    period: '2025 – Presente',
    importance: 'high',
    isCurrent: true,
    technologies: [
      { name: 'Angular', icon: '/icons/angular-js-icon.svg' },
      { name: 'PHP', icon: '/icons/php-icon.svg' },
      { name: 'Laravel', icon: '/icons/laravel-icon.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
      { name: 'WhatsApp Business API', icon: '/icons/whatsapp.svg' },
      { name: 'Make.com', icon: '/icons/make-icon.svg' },
      { name: 'Facebook Business', icon: '/icons/facebook-icon.svg' },
    ],
    description:
      'Sistema de gestión integral para empresas de transporte con automatización de comunicaciones.',
    highlights: [
      'Gestión integral de flotas y pedidos',
      'Automatización de WhatsApp Business',
      'Integración con Facebook Business y Make.com',
      'Panel administrativo con roles y permisos',
    ],
    impact: 'Reducción del 60% en tiempo de gestión de comunicaciones con clientes.',
  },
  {
    name: 'Abastores OS',
    role: 'Lead Frontend & UX/UI Tutor',
    period: '2024 – 2025',
    importance: 'high',
    isCurrent: false,
    technologies: [
      { name: 'Vue.js', icon: '/icons/vue-js-icon.svg' },
      { name: 'Django', icon: '/icons/django-icon.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
      { name: 'Sentry', icon: '/icons/sentry-icon.svg' },
      { name: 'Vitest', icon: '/icons/jest-icon.svg' },
    ],
    description:
      'Marketplace agrícola con funcionalidades avanzadas de compraventa entre productores y distribuidores. Rol como Lead Frontend y tutor UX/UI del equipo.',
    highlights: [
      'Marketplace con sistema de pujas y ofertas',
      'Mentoría técnica del equipo frontend',
      'Testing con Vitest y monitoreo con Sentry',
      'Diseño UX orientado al usuario rural',
    ],
    impact: 'Plataforma utilizada por productores agrícolas en fase piloto.',
  },
  {
    name: 'La Codicia del Sabio',
    role: 'FullStack Developer & Game Designer',
    period: '2024 – Presente',
    importance: 'high',
    isCurrent: true,
    technologies: [
      { name: 'Flutter', icon: '/icons/flutter-icon.svg' },
      { name: 'Supabase', icon: '/icons/supabase-icon.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
    ],
    description:
      'Aplicación companion todo-en-uno para juego de rol de mesa con sistema propio. Cubre desde la creación de personajes hasta la dirección de combates en tiempo real, pasando por un compendio completo de reglas, lore y herramientas para Directores de Juego.',
    highlights: [
      'Creación de personajes estándar y rápida con 12 razas y 9 clases con subclases por arma',
      'Ficha completa con inventario, 54 accesorios pregenerados con 4 rarezas y sistema de dinero',
      'Combate en tiempo real con iniciativa, turnos reordenables y control de vida/escudo/condiciones',
      'Generador de enemigos con 5 modos (automático, manual, avanzado, pregenerados, guardados)',
      'Generador de PNJs con trasfondo completo, filtrable por raza',
      'Compendium con manuales de Jugador y DM, bestiario, condiciones y lore de Magna',
      'Creador de contenido personalizado: razas, clases y subclases con importación/exportación',
      'Gestor de campañas con combate, campañas pregeneradas y generador de PNJs',
      'Intercambio de personajes entre amigos y sistema de registro de amigos',
      'Personalización con temas, paletas, secretos ocultos (código Konami y más)',
      'Versión Premium, comunidad Discord, web pública con guías PDF y enlace a Play Store',
    ],
    impact: 'Herramienta completa usada en partidas reales con comunidad activa en Discord. Web pública con guías descargables y presencia en Google Play Store.',
  },
  {
    name: 'Backoffice Administrativo',
    role: 'FullStack Developer',
    period: '2024 – 2024',
    importance: 'medium',
    isCurrent: false,
    technologies: [
      { name: 'Vue.js', icon: '/icons/vue-js-icon.svg' },
      { name: 'Prisma', icon: '/icons/prisma-icon.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
    ],
    description:
      'Sistema administrativo con roles, permisos avanzados y gestión de perfiles, diseñado para reducir errores y mejorar productividad.',
    highlights: [
      'Sistema de roles y permisos granular',
      'Gestión de perfiles y usuarios',
      'Auditoría de acciones del sistema',
    ],
    impact: 'Reducción de errores administrativos en un 40%.',
  },
  {
    name: 'Visualización y Exportación de Datos (Angular)',
    role: 'Frontend Developer',
    period: '2024 – 2024',
    importance: 'medium',
    isCurrent: false,
    technologies: [
      { name: 'Angular', icon: '/icons/angular-js-icon.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
    ],
    description:
      'Aplicación para visualizar rutas, aplicar filtros dinámicos y exportar datos con persistencia de estado y rendimiento optimizado.',
    highlights: [
      'Filtros dinámicos con persistencia de estado',
      'Exportación de datos en múltiples formatos',
      'Visualización de rutas en mapa interactivo',
    ],
    impact: 'Optimización del proceso de análisis de datos de rutas.',
  },
  {
    name: 'Landing Corporativas (Proactiva, Mort.es, Dcubo)',
    role: 'FullStack Developer',
    period: '2024 – 2025',
    importance: 'medium',
    isCurrent: false,
    technologies: [
      { name: 'Astro', icon: '/icons/astro-icon.svg' },
      { name: 'Cloudflare', icon: '/icons/cloudflare-icon.svg' },
    ],
    description:
      'Landing pages corporativas accesibles, multilingües, con integración CMS y despliegue CI/CD.',
    highlights: [
      'Accesibilidad WCAG 2.1 AA',
      'Soporte multilingüe',
      'Integración con CMS headless',
      'CI/CD con Cloudflare Pages',
    ],
    impact: 'Mejora de conversión y posicionamiento SEO.',
  },
  {
    name: 'Componente ChatBot IA',
    role: 'Frontend Developer',
    period: '2024 – 2024',
    importance: 'medium',
    isCurrent: false,
    technologies: [
      { name: 'StencilJS', icon: '/icons/stencil-icon.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-icon.svg' },
    ],
    description:
      'Componente frontend reutilizable con gestión modular, testing automatizado y diseño UX funcional.',
    highlights: [
      'Web Component reutilizable',
      'Testing automatizado con Jest',
      'Diseño UX conversacional',
    ],
    impact: 'Componente integrado en múltiples productos de la empresa.',
  },
  {
    name: 'Renovación Catálogo de Productos',
    role: 'FullStack Developer',
    period: '2024 – 2024',
    importance: 'medium',
    isCurrent: false,
    technologies: [
      { name: 'Ruby', icon: '/icons/ruby-icon.svg' },
      { name: 'Liquid', icon: '/icons/liquid-icon.svg' },
      { name: 'Figma', icon: '/icons/figma-icon.svg' },
    ],
    description:
      'Refactor de estructura de productos, lógica de precios, accesibilidad y nueva presentación UI.',
    highlights: [
      'Refactorización completa de lógica de precios',
      'Mejora de accesibilidad del catálogo',
      'Nuevo diseño UI en Figma',
    ],
    impact: 'Incremento del 25% en interacción con el catálogo.',
  },
  {
    name: 'Página desde Cero (Fullstack)',
    role: 'FullStack Developer',
    period: '2024 – 2024',
    importance: 'medium',
    isCurrent: false,
    technologies: [
      { name: 'Angular', icon: '/icons/angular-js-icon.svg' },
      { name: 'Django', icon: '/icons/django-icon.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-icon.svg' },
      { name: 'Figma', icon: '/icons/figma-icon.svg' },
    ],
    description:
      'Producto completo con sistema de gestión, arquitectura escalable y diseño UI/UX desde wireframes.',
    highlights: [
      'Arquitectura fullstack escalable',
      'Diseño UI/UX desde wireframes en Figma',
      'Sistema de gestión de contenidos',
    ],
    impact: 'Producto entregado en producción con éxito.',
  },
];
