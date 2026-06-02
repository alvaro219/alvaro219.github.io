import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en';

export interface Translations {
  nav: { home: string; projects: string };
  profile: {
    title: string;
    description: string;
    location: string;
    education: string[];
  };
  skillGroups: { front: string; backDb: string; tools: string };
  home: {
    aboutTitle: string;
    techTitle: string;
    techHighlighted: string;
    currentProjectTitle: string;
    currentProjectsTitle: string;
    currentBadge: string;
    projectsTitle: string;
    projectBadge: string;
    expandMore: string;
    expandLess: string;
    highlightsTitle: string;
    impactTitle: string;
    contactTitle: string;
    contactNameLabel: string;
    contactNamePlaceholder: string;
    contactEmailLabel: string;
    contactEmailPlaceholder: string;
    contactMessageLabel: string;
    contactMessagePlaceholder: string;
    contactPrivacy: string;
    contactPrivacyLink: string;
    contactSend: string;
    contactSending: string;
    contactSuccess: string;
    contactErrorPrivacy: string;
    contactErrorRequired: string;
    contactErrorSend: string;
    cvLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    filterTitle: string;
    clearFilters: string;
    currentBadge: string;
  };
  footer: {
    location1: string;
    location2: string;
    copyright: string;
    contactTitle: string;
    legalTitle: string;
    legalNotice: string;
    privacyPolicy: string;
    cookiePolicy: string;
  };
}

const ES: Translations = {
  nav: { home: 'Inicio', projects: 'Proyectos' },
  profile: {
    title: 'FullStack Developer · UX/UI Designer',
    description: 'Desarrollador Full Stack especializado en la creación de productos digitales end-to-end, combinando diseño UX/UI, desarrollo frontend y backend, APIs, bases de datos relacionales y despliegue continuo. Experiencia en automatización de procesos, sistemas administrativos, marketplaces y landing pages corporativas multilingües, con foco en rendimiento, accesibilidad, testing y experiencia de usuario. Capaz de comprender procesos reales, identificar cuellos de botella y convertirlos en software que ahorra tiempo, reduce errores y genera impacto directo en negocio.',
    location: 'Callosa de Segura, Alicante, España',
    education: [
      'Desarrollo FullStack — Formación Online — 2023-2024',
      'Diseño UX/UI — Academia Digital — 2023',
      'Formación autodidacta + práctica real en proyectos',
    ],
  },
  skillGroups: { front: 'Front', backDb: 'Back & DB', tools: 'Herramientas & DevOps' },
  home: {
    aboutTitle: '// sobre mí',
    techTitle: '// tecnologías',
    techHighlighted: 'Destacadas',
    currentProjectTitle: '// proyecto actual',
    currentProjectsTitle: '// proyectos actuales',
    currentBadge: 'En curso',
    projectsTitle: '// proyectos',
    projectBadge: 'destacado',
    expandMore: '[ ver más ]',
    expandLess: '[ ver menos ]',
    highlightsTitle: 'logros clave',
    impactTitle: 'impacto',
    contactTitle: '// contacto',
    contactNameLabel: 'nombre',
    contactNamePlaceholder: 'Tu nombre',
    contactEmailLabel: 'email / teléfono',
    contactEmailPlaceholder: 'tu@email.com',
    contactMessageLabel: 'mensaje',
    contactMessagePlaceholder: '¿En qué te puedo ayudar?',
    contactPrivacy: 'He leído y acepto la ',
    contactPrivacyLink: 'política de privacidad',
    contactSend: '→ enviar mensaje',
    contactSending: 'enviando...',
    contactSuccess: '¡Mensaje enviado correctamente! Te responderé pronto.',
    contactErrorPrivacy: 'Debes aceptar la política de privacidad',
    contactErrorRequired: 'Todos los campos son obligatorios',
    contactErrorSend: 'Error al enviar. Inténtalo de nuevo o escríbeme directamente.',
    cvLabel: 'CV',
  },
  projects: {
    title: 'Proyectos',
    subtitle: 'Una selección de los proyectos en los que he trabajado',
    filterTitle: 'Filtrar por tecnología:',
    clearFilters: 'Limpiar filtros',
    currentBadge: 'Presente',
  },
  footer: {
    location1: 'Callosa de Segura, Alicante',
    location2: 'España',
    copyright: 'Todos los derechos reservados',
    contactTitle: 'Contacto',
    legalTitle: 'Legal',
    legalNotice: 'Aviso legal',
    privacyPolicy: 'Política de Privacidad',
    cookiePolicy: 'Política de Cookies',
  },
};

const EN: Translations = {
  nav: { home: 'Home', projects: 'Projects' },
  profile: {
    title: 'FullStack Developer · UX/UI Designer',
    description: 'Full Stack Developer specializing in end-to-end digital product creation, combining UX/UI design, frontend and backend development, APIs, relational databases, and continuous deployment. Experience in process automation, administrative systems, marketplaces, and multilingual corporate landing pages, with focus on performance, accessibility, testing, and user experience. Able to understand real processes, identify bottlenecks, and turn them into software that saves time, reduces errors, and generates direct business impact.',
    location: 'Callosa de Segura, Alicante, Spain',
    education: [
      'FullStack Development — Online Training — 2023-2024',
      'UX/UI Design — Digital Academy — 2023',
      'Self-taught + hands-on practice in real projects',
    ],
  },
  skillGroups: { front: 'Front', backDb: 'Back & DB', tools: 'Tools & DevOps' },
  home: {
    aboutTitle: '// about me',
    techTitle: '// technologies',
    techHighlighted: 'Highlighted',
    currentProjectTitle: '// current project',
    currentProjectsTitle: '// current projects',
    currentBadge: 'Ongoing',
    projectsTitle: '// projects',
    projectBadge: 'featured',
    expandMore: '[ see more ]',
    expandLess: '[ see less ]',
    highlightsTitle: 'key achievements',
    impactTitle: 'impact',
    contactTitle: '// contact',
    contactNameLabel: 'name',
    contactNamePlaceholder: 'Your name',
    contactEmailLabel: 'email / phone',
    contactEmailPlaceholder: 'you@email.com',
    contactMessageLabel: 'message',
    contactMessagePlaceholder: 'How can I help you?',
    contactPrivacy: 'I have read and accept the ',
    contactPrivacyLink: 'privacy policy',
    contactSend: '→ send message',
    contactSending: 'sending...',
    contactSuccess: 'Message sent! I will get back to you soon.',
    contactErrorPrivacy: 'You must accept the privacy policy',
    contactErrorRequired: 'All fields are required',
    contactErrorSend: 'Error sending. Try again or write me directly.',
    cvLabel: 'CV',
  },
  projects: {
    title: 'Projects',
    subtitle: 'A selection of the projects I have worked on',
    filterTitle: 'Filter by technology:',
    clearFilters: 'Clear filters',
    currentBadge: 'Current',
  },
  footer: {
    location1: 'Callosa de Segura, Alicante',
    location2: 'Spain',
    copyright: 'All rights reserved',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    legalNotice: 'Legal notice',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>(this.getInitialLang());
  t = signal<Translations>(this.lang() === 'en' ? EN : ES);

  private getInitialLang(): Lang {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored === 'en' || stored === 'es') return stored;
    }
    return 'es';
  }

  toggle(): void {
    const next: Lang = this.lang() === 'es' ? 'en' : 'es';
    this.lang.set(next);
    this.t.set(next === 'en' ? EN : ES);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', next);
    }
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    this.t.set(lang === 'en' ? EN : ES);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }
}
