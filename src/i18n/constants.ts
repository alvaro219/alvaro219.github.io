export const SUPPORTED_LOCALES = [
  'en',
  'es',
  'ca',
] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE = 'es' as const satisfies Locale;
