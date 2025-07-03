import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from './constants';
import translatedRoutes from './routes.json';

/**
 * Extrae el idioma desde una URL del sitio (por ejemplo, Astro.url)
 */
export function getLangFromUrl(currentUrl: URL): Locale {
  const [, lang] = currentUrl.pathname.split('/');
  if (SUPPORTED_LOCALES.includes(lang as any)) {
    return lang as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Hook de traducción básica por clave, según la URL
 */
export function useI18N<T extends { [lang in Locale]: { [key in keyof T[typeof DEFAULT_LOCALE]]: string } }>(
  translations: T,
  currentUrl: URL
) {
  const lang = getLangFromUrl(currentUrl);
  return function tr(key: keyof T[typeof DEFAULT_LOCALE]): string {
    return translations[lang][key] || translations[DEFAULT_LOCALE][key];
  };
}

/**
 * Devuelve contenido traducido según idioma detectado
 */
export function useI18NContent<T extends { [lang in Locale]: T[lang] }>(
  translations: T,
  currentUrl: URL
) {
  const lang = getLangFromUrl(currentUrl);
  return translations[lang] || translations[DEFAULT_LOCALE];
}

function filterUndefined(arr: (string | undefined)[]) {
  return arr.filter(e => e !== undefined);
}

function canonicalURL(parts: string[]) {
  return filterUndefined(["", ...parts]).join('/') || "/";
}

function translatedURL(language: Locale, parts: string[]) {
  const canonicalRoute = canonicalURL(parts);
  if (
    language &&
    Object.keys(translatedRoutes).includes(language) &&
    Object.keys(translatedRoutes[language]).includes(canonicalRoute)
  ) {
    const translatedRoute = translatedRoutes[language][canonicalRoute as keyof typeof translatedRoutes[typeof language]];
    if (language === DEFAULT_LOCALE) language = "" as any;
    else language = '/' + language;
    return `${language}${translatedRoute}`;
  }
}

/**
 * Devuelve una ruta con prefijo de idioma a partir de una URL base
 */
export function useI18NPath(path: string, currentUrl: URL, language?: Locale) {
  language ??= getLangFromUrl(currentUrl);
  path = new URL(path, currentUrl).pathname;
  const [_, base, ...rest] = path.split('/');

  if (SUPPORTED_LOCALES.includes(base as any)) {
    const translatedRoute = translatedURL(language, rest);
    if (translatedRoute) return translatedRoute;
    else return filterUndefined(["", language, ...rest]).join('/');
  } else {
    const translatedRoute = translatedURL(language, [base, ...rest]);
    if (translatedRoute) return translatedRoute;
    language = language === DEFAULT_LOCALE ? undefined : language;
    return filterUndefined(["", language, base, ...rest]).join('/');
  }
}
