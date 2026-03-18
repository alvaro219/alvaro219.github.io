import { Routes } from '@angular/router';
import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Álvaro Antón — FullStack Developer',
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
    title: 'Proyectos — Álvaro Antón',
  },
  {
    path: 'proyectos/:id',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
    title: 'Detalle de Proyecto — Álvaro Antón',
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login').then((m) => m.Login),
    title: 'Admin Login',
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard').then((m) => m.Dashboard),
        title: 'CRM Dashboard',
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/admin/project-editor/project-editor').then((m) => m.ProjectEditor),
        title: 'Gestión de Proyectos',
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./pages/admin/project-form/project-form').then((m) => m.ProjectForm),
        title: 'Editar Proyecto',
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./pages/admin/project-form/project-form').then((m) => m.ProjectForm),
        title: 'Nuevo Proyecto',
      },
      {
        path: 'technologies',
        loadComponent: () =>
          import('./pages/admin/tech-editor/tech-editor').then((m) => m.TechEditor),
        title: 'Gestión de Tecnologías',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/admin/profile-editor/profile-editor').then((m) => m.ProfileEditor),
        title: 'Editar Perfil',
      },
    ],
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./pages/legal/legal-notice').then((m) => m.LegalNotice),
    title: 'Aviso Legal — Álvaro Antón',
  },
  {
    path: 'politica-privacidad',
    loadComponent: () => import('./pages/legal/privacy-policy').then((m) => m.PrivacyPolicy),
    title: 'Política de Privacidad — Álvaro Antón',
  },
  {
    path: 'politica-cookies',
    loadComponent: () => import('./pages/legal/cookie-policy').then((m) => m.CookiePolicy),
    title: 'Política de Cookies — Álvaro Antón',
  },
  { path: '**', redirectTo: '' },
];
