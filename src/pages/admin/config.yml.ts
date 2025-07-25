import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../../i18n/constants";
import { stringify } from "yaml";

export function GET() {
  return new Response(stringify({
    backend: {
      name: 'test-repo',
    },
    i18n: {
      structure: 'multiple_files',
      locales: SUPPORTED_LOCALES,
      default_locale: DEFAULT_LOCALE,
    },
    local_backend: true,
    site_url: '/',
    publish_mode: 'simple',
    media_folder: 'public/assets/uploads',
    public_folder: '/assets/uploads',
    collections: [
      {
        name: 'config',
        label: 'Configuración',
        i18n: {
          structure: 'single_file',
        },
        files: [
          {
            name: 'links',
            label: 'Enlaces en la página principal',
            file: 'src/content/config/example-links.json',
            preview_path: '/',
            i18n: true,
            fields: [
              {
                name: 'links',
                label: 'Enlaces',
                widget: 'list',
                i18n: true,
                fields: [
                  {
                    name: 'href',
                    label: 'Enlace',
                    widget: 'string',
                  },
                  {
                    name: 'title',
                    label: 'Título',
                    widget: 'string',
                  },
                  {
                    name: 'body',
                    label: 'Mensaje',
                    widget: 'markdown',
                  },
                ],
              }
            ],
          },
        ],
      },
      {
        name: 'cases',
        label: 'Casos de éxito',
        folder: 'src/content/successes/',
        i18n: false,
        preview_path: '/',
        format: 'json',
        create: true,
        slug: '{{slug}}',
        extension: 'json',
        fields: [
          {
            name: 'successes',
            label: 'Éxitos',
            widget: 'list',
            i18n: true,
            fields: [
              { name: 'id', label: 'ID', widget: 'string', required: true },
              {
                name: 'card',
                label: 'Card',
                widget: 'object',
                required: false,
                fields: [
                  {
                    name: 'video',
                    label: 'Video',
                    widget: 'string',
                    required: false,
                  },
                  { name: 'playIcon', label: 'Ícono de reproducción', widget: 'string', required: false },
                  { name: 'logo', label: 'Logo', widget: 'string', required: false },
                  { name: 'quote', label: 'Cita', widget: 'text', required: false },
                  { name: 'name', label: 'Nombre del testimonio', widget: 'string', required: false },
                ],
              },
              {
                name: 'hastags',
                label: 'Hastags',
                widget: 'object',
                required: false,
                fields: [
                  { name: 'playIcon', label: 'Ícono de reproducción', widget: 'string', required: false },
                ],
              },
              { name: 'link', label: 'Enlace', widget: 'string' },
              { name: 'name', label: 'Nombre del caso', widget: 'string' },
              { name: 'description', label: 'Descripción', widget: 'text' },
              { name: 'intro', label: 'Introducción', widget: 'text' },
              {
                name: 'images',
                label: 'Imágenes',
                widget: 'list',
                required: false,
                fields: [
                  { name: 'url', label: 'Imagen', widget: 'image' },
                  { name: 'description', label: 'Descripción', widget: 'string' }
                ]
              },
              {
                name: 'project',
                label: 'Proyectos',
                widget: 'list',
                fields: [
                  { name: 'title', label: 'Título', widget: 'string' },
                  { name: 'description', label: 'Descripción', widget: 'text' },
                  {
                    name: 'tech',
                    label: 'Tecnologías',
                    widget: 'list',
                    fields: [
                      { name: 'name', label: 'Nombre', widget: 'string' },
                      { name: 'icon', label: 'Ícono', widget: 'string' },
                    ],
                  },
                ],
              },
            ],
          }
        ],
      },
      {
        name: 'about',
        label: 'Sobre mí',
        file: 'src/content/about.json',
        i18n: false,
        format: 'json',
        fields: [
          {
            name: 'intro',
            label: 'Introducción',
            widget: 'object',
            fields: [
              { name: 'first-name', label: 'Nombre corto', widget: 'string' },
              { name: 'name', label: 'Nombre completo', widget: 'string' },
              { name: 'title', label: 'Título', widget: 'string' },
              { name: 'description', label: 'Descripción', widget: 'text' },
              { name: 'photo', label: 'Foto', widget: 'image' }
            ]
          },
          {
            name: 'education',
            label: 'Educación',
            widget: 'list',
            fields: [{ label: 'Elemento', name: 'item', widget: 'string' }]
          },
          {
            name: 'skills',
            label: 'Habilidades',
            widget: 'list',
            fields: [
              { name: 'name', label: 'Tecnología', widget: 'string' },
              { name: 'icon', label: 'Icono', widget: 'string' }
            ]
          },
          {
            name: 'projects',
            label: 'Proyectos',
            widget: 'list',
            fields: [
              { name: 'name', label: 'Nombre', widget: 'string' },
              {
                name: 'period',
                label: 'Periodo',
                widget: 'object',
                fields: [
                  { name: 'start', label: 'Inicio', widget: 'string' },
                  { name: 'end', label: 'Fin', widget: 'string' },
                ],
              },
              {
                name: 'technologies',
                label: 'Tecnologías',
                widget: 'list',
                fields: [
                  { name: 'name', label: 'Tecnología', widget: 'string' },
                  { name: 'icon', label: 'Icono', widget: 'string' }
                ],
              },
              { name: 'description', label: 'Descripción', widget: 'text' },
            ],
          },
          {
            name: 'current',
            label: 'Actualidad',
            widget: 'object',
            fields: [
              { name: 'title', label: 'Título', widget: 'string' },
              {
                name: 'period',
                label: 'Periodo',
                widget: 'object',
                fields: [
                  { name: 'start', label: 'Inicio', widget: 'string' },
                  { name: 'end', label: 'Fin', widget: 'string' },
                ],
              },
              {
                name: 'technologies',
                label: 'Tecnologías',
                widget: 'list',
                fields: [
                  { name: 'name', label: 'Tecnología', widget: 'string' },
                  { name: 'icon', label: 'Icono', widget: 'string' }
                ],
              },
              { name: 'description', label: 'Descripción', widget: 'text' },
            ],
          },
          {
            name: 'goals',
            label: 'Objetivos',
            widget: 'list',
            fields: [
              { name: 'title', label: 'Título', widget: 'string' },
              { name: 'description', label: 'Descripción', widget: 'text' },
            ],
          },
        ],
      },
    ],

  }), {
    headers: {
      'Content-Type': 'text/yaml',
    },
  });
}
